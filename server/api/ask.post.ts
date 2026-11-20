import {
  ApiError,
  FinishReason,
  GoogleGenAI,
  HarmBlockThreshold,
  HarmCategory,
  ThinkingLevel,
  type Content,
  type SafetySetting,
} from '@google/genai'
import { isLocale, type Locale } from '../../data/portfolio'
import {
  clientIp,
  createOutputGuard,
  isTrustedRequest,
  LIMITS,
  looksLikeInjection,
  releaseRateSlot,
  sanitizeText,
  takeRateSlot,
  type RateResult,
} from '../utils/aiGuard'
import { getPortfolioPrompt, wrapQuestion } from '../utils/portfolioPrompt'

/**
 * POST /api/ask
 * Body: { question: string, locale?: 'pt' | 'en' | 'es', history?: { role: 'user' | 'assistant', content: string }[] }
 * Resposta: texto puro em streaming, lido pelo terminal do hero.
 */

const DEFAULT_MODEL = 'gemini-3.8-flash'
// Tentados em ordem quando o anterior está sobrecarregado, sem cota ou descontinuado
const FALLBACK_MODELS = ['gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.1-flash-lite']
const RETRYABLE_STATUS = new Set([404, 429, 500, 503, 504])
const FIRST_CHUNK_TIMEOUT_MS = 20_000
const TOTAL_TIMEOUT_MS = 45_000

const SAFETY_SETTINGS: SafetySetting[] = [
  HarmCategory.HARM_CATEGORY_HARASSMENT,
  HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
].map((category) => ({ category, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE }))

const BLOCKED_FINISH = new Set<FinishReason | undefined>([
  FinishReason.SAFETY,
  FinishReason.PROHIBITED_CONTENT,
  FinishReason.BLOCKLIST,
  FinishReason.SPII,
  FinishReason.RECITATION,
])

const MESSAGES = {
  pt: {
    cantAnswer: 'Não consigo responder isso. Pergunte algo sobre a carreira ou os projetos do Gabriel.',
    quota: 'O assistente atingiu o limite de uso por agora. Tente de novo em instantes.',
    unavailable: 'O assistente está indisponível no momento.',
    empty: 'Digite uma pergunta.',
    tooLong: `Pergunta muito longa (máx. ${LIMITS.questionChars} caracteres).`,
    forbidden: 'Requisição não permitida.',
    rate: {
      too_fast: 'Calma! Espere um instante antes da próxima pergunta.',
      busy: 'Ainda estou respondendo a pergunta anterior.',
      limited: 'Muitas perguntas em pouco tempo. Tente de novo em alguns minutos.',
      global: 'O assistente está muito requisitado agora. Tente de novo mais tarde.',
    },
  },
  en: {
    cantAnswer: "I can't answer that. Ask something about Gabriel's career or projects.",
    quota: 'The assistant hit its usage limit for now. Please try again shortly.',
    unavailable: 'The assistant is unavailable right now.',
    empty: 'Type a question.',
    tooLong: `Question too long (max. ${LIMITS.questionChars} characters).`,
    forbidden: 'Request not allowed.',
    rate: {
      too_fast: 'Easy! Wait a moment before the next question.',
      busy: "I'm still answering the previous question.",
      limited: 'Too many questions in a short time. Try again in a few minutes.',
      global: 'The assistant is very busy right now. Please try again later.',
    },
  },
  es: {
    cantAnswer: 'No puedo responder eso. Pregunta algo sobre la carrera o los proyectos de Gabriel.',
    quota: 'El asistente alcanzó su límite de uso por ahora. Inténtalo de nuevo en unos instantes.',
    unavailable: 'El asistente no está disponible en este momento.',
    empty: 'Escribe una pregunta.',
    tooLong: `Pregunta demasiado larga (máx. ${LIMITS.questionChars} caracteres).`,
    forbidden: 'Solicitud no permitida.',
    rate: {
      too_fast: '¡Calma! Espera un momento antes de la próxima pregunta.',
      busy: 'Todavía estoy respondiendo la pregunta anterior.',
      limited: 'Demasiadas preguntas en poco tiempo. Inténtalo de nuevo en unos minutos.',
      global: 'El asistente está muy solicitado ahora. Inténtalo más tarde.',
    },
  },
}

class FirstChunkTimeout extends Error {}

let ai: GoogleGenAI | null = null
function getClient(apiKey: string): GoogleGenAI {
  ai ??= new GoogleGenAI({ apiKey })
  return ai
}

function fail(statusCode: number, message: string): never {
  throw createError({ statusCode, statusMessage: 'Request rejected', message, data: { message } })
}

const RATE_STATUS: Record<Exclude<RateResult, 'ok'>, number> = { too_fast: 429, busy: 429, limited: 429, global: 503 }

interface AskBody {
  question?: unknown
  history?: unknown
  locale?: unknown
}

async function readJsonBody(event: Parameters<typeof readRawBody>[0]): Promise<AskBody | null> {
  const declared = Number(getHeader(event, 'content-length') ?? 0)
  if (declared > LIMITS.bodyBytes) return null
  const raw = await readRawBody(event, 'utf8').catch(() => undefined)
  if (!raw || Buffer.byteLength(raw) > LIMITS.bodyBytes) return null
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

/**
 * O histórico vem do navegador e pode ser forjado: passa pela mesma limpeza da
 * pergunta e é descartado inteiro se alguma mensagem parecer uma tentativa de injeção.
 */
function sanitizeHistory(raw: unknown): Content[] {
  if (!Array.isArray(raw)) return []
  const items: Content[] = []
  for (const m of raw.slice(-LIMITS.historyMessages)) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') continue
    const text = sanitizeText(m.content, LIMITS.historyChars)
    if (!text) continue
    if (looksLikeInjection(text)) return []
    items.push(
      m.role === 'user'
        ? { role: 'user', parts: [{ text: wrapQuestion(text) }] }
        : { role: 'model', parts: [{ text }] }
    )
  }
  while (items.length && items[0].role !== 'user') items.shift()
  return items
}

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    'x-robots-tag': 'noindex',
  })

  const body = await readJsonBody(event)
  const locale: Locale = isLocale(body?.locale) ? body.locale : 'pt'
  const msg = MESSAGES[locale]

  if (!isTrustedRequest(event)) fail(403, msg.forbidden)
  if (!body) fail(400, msg.forbidden)

  const rawQuestion = typeof body.question === 'string' ? body.question : ''
  if (rawQuestion.length > LIMITS.questionChars * 2) fail(400, msg.tooLong)
  const question = sanitizeText(rawQuestion, LIMITS.questionChars + 1)
  if (!question) fail(400, msg.empty)
  if (question.length > LIMITS.questionChars) fail(400, msg.tooLong)

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) fail(503, msg.unavailable)

  const ip = clientIp(event)
  const slot = takeRateSlot(ip)
  if (slot !== 'ok') fail(RATE_STATUS[slot], msg.rate[slot])

  const encoder = new TextEncoder()
  let current: AbortController | null = null
  let cancelled = false

  if (looksLikeInjection(question)) {
    releaseRateSlot(ip)
    setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
    return msg.cantAnswer
  }

  const contents: Content[] = [
    ...sanitizeHistory(body.history),
    { role: 'user', parts: [{ text: wrapQuestion(question) }] },
  ]

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const write = (text: string) => {
        if (!cancelled) controller.enqueue(encoder.encode(text))
      }
      const guard = createOutputGuard(write)
      const models = [process.env.GEMINI_MODEL || DEFAULT_MODEL, ...FALLBACK_MODELS]
      let expired = false
      const deadline = setTimeout(() => {
        expired = true
        current?.abort(new FirstChunkTimeout())
      }, TOTAL_TIMEOUT_MS)

      try {
        for (const [i, model] of models.entries()) {
          if (cancelled || expired) break
          const abort = new AbortController()
          current = abort
          const firstChunk = setTimeout(() => abort.abort(new FirstChunkTimeout()), FIRST_CHUNK_TIMEOUT_MS)
          try {
            const response = await getClient(apiKey).models.generateContentStream({
              model,
              contents,
              config: {
                abortSignal: abort.signal,
                systemInstruction: getPortfolioPrompt(locale),
                safetySettings: SAFETY_SETTINGS,
                temperature: 0.4,
                maxOutputTokens: 1024,
                ...(model.startsWith('gemini-3') ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } } : {}),
              },
            })

            let finishReason: FinishReason | undefined
            let blocked = false
            for await (const chunk of response) {
              if (cancelled) return
              if (chunk.promptFeedback?.blockReason) blocked = true
              const text = chunk.text
              if (text) {
                clearTimeout(firstChunk)
                guard.push(text)
                if (guard.tripped) break
              }
              finishReason = chunk.candidates?.[0]?.finishReason ?? finishReason
            }

            if (guard.tripped) {
              console.warn('[ask] resposta cortada: possível vazamento do prompt')
              write(guard.wrote ? '…' : msg.cantAnswer)
            } else if (blocked || BLOCKED_FINISH.has(finishReason)) {
              guard.flush()
              write(guard.wrote ? '…' : msg.cantAnswer)
            } else {
              guard.flush()
              if (guard.tripped) write(guard.wrote ? '…' : msg.cantAnswer)
              else if (finishReason === FinishReason.MAX_TOKENS) write('…')
              else if (!guard.wrote) write(msg.cantAnswer)
            }
            return
          } catch (error) {
            const timedOut = abort.signal.aborted && !cancelled
            const retryable = timedOut || (error instanceof ApiError && RETRYABLE_STATUS.has(error.status))
            if (cancelled || expired || guard.wrote || !retryable || i === models.length - 1) throw error
            console.warn(`[ask] ${model} indisponível (${timedOut ? 'timeout' : (error as ApiError).status})`)
          } finally {
            clearTimeout(firstChunk)
          }
        }
      } catch (error) {
        if (cancelled) return
        if (error instanceof ApiError && error.status === 429) {
          write(msg.quota)
        } else {
          console.error('[ask] falha ao gerar resposta:', error instanceof ApiError ? error.status : (error as Error)?.name)
          write(guard.wrote ? '…' : msg.unavailable)
        }
      } finally {
        clearTimeout(deadline)
        releaseRateSlot(ip)
        if (!cancelled) controller.close()
      }
    },
    cancel() {
      cancelled = true
      current?.abort()
    },
  })

  setResponseHeaders(event, {
    'content-type': 'text/plain; charset=utf-8',
    'x-accel-buffering': 'no',
  })
  return stream
})
