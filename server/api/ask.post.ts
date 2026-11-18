import { ApiError, FinishReason, GoogleGenAI, ThinkingLevel, type Content } from '@google/genai'
import { isLocale } from '../../data/portfolio'
import { getPortfolioPrompt } from '../utils/portfolioPrompt'

/**
 * POST /api/ask
 * Body: { question: string, locale?: 'pt' | 'en' | 'es', history?: { role: 'user' | 'assistant', content: string }[] }
 * Resposta: texto puro em streaming (text/plain), lido pelo terminal do hero.
 *
 * Variáveis de ambiente (na Vercel: Settings > Environment Variables):
 * - GEMINI_API_KEY: chave gratuita do Google AI Studio (https://aistudio.google.com/apikey)
 * - GEMINI_MODEL (opcional): modelo a usar; padrão abaixo.
 */

const DEFAULT_MODEL = 'gemini-3.8-flash'
// Usados em ordem quando o modelo anterior está sobrecarregado (503), sem cota
// gratuita (429) ou foi descontinuado (404). Cada modelo tem a própria cota grátis.
const FALLBACK_MODELS = ['gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.1-flash-lite']
const RETRYABLE_STATUS = new Set([404, 429, 500, 503, 504])
// Tempo máximo esperando o primeiro trecho da resposta antes de tentar o próximo modelo
const FIRST_CHUNK_TIMEOUT_MS = 20_000

// Mensagens que o próprio servidor escreve no terminal, no idioma da página
const MESSAGES = {
  pt: {
    cantAnswer: 'Não consigo responder isso. Pergunte algo sobre a carreira ou os projetos do Gabriel.',
    quota: 'O assistente atingiu o limite de uso por agora. Tente de novo em instantes.',
    unavailable: 'O assistente está indisponível no momento.',
  },
  en: {
    cantAnswer: "I can't answer that. Ask something about Gabriel's career or projects.",
    quota: 'The assistant hit its usage limit for now. Please try again shortly.',
    unavailable: 'The assistant is unavailable right now.',
  },
  es: {
    cantAnswer: 'No puedo responder eso. Pregunta algo sobre la carrera o los proyectos de Gabriel.',
    quota: 'El asistente alcanzó su límite de uso por ahora. Inténtalo de nuevo en unos instantes.',
    unavailable: 'El asistente no está disponible en este momento.',
  },
}

class FirstChunkTimeout extends Error {}
const MAX_QUESTION_CHARS = 500
const MAX_HISTORY_MESSAGES = 6
const MAX_HISTORY_CHARS = 1500

// Limite simples por IP para não estourar a cota gratuita. Em serverless ele vale
// por instância; para um limite global use Vercel KV/Upstash.
const RATE_LIMIT = 12
const RATE_WINDOW_MS = 10 * 60 * 1000
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > RATE_LIMIT
}

let ai: GoogleGenAI | null = null
function getClient(apiKey: string): GoogleGenAI {
  ai ??= new GoogleGenAI({ apiKey })
  return ai
}

interface AskBody {
  question?: unknown
  history?: unknown
  locale?: unknown
}

// Converte o histórico do terminal para o formato do Gemini (user/model)
function sanitizeHistory(raw: unknown): Content[] {
  if (!Array.isArray(raw)) return []
  const items = raw
    .filter(
      (m): m is { role: 'user' | 'assistant'; content: string } =>
        !!m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content.slice(0, MAX_HISTORY_CHARS) }],
    }))

  // A conversa precisa começar por uma mensagem do usuário
  while (items.length && items[0].role !== 'user') items.shift()
  return items
}

export default defineEventHandler(async (event) => {
  const body = await readBody<AskBody>(event).catch(() => ({}) as AskBody)
  const question = typeof body?.question === 'string' ? body.question.trim() : ''

  if (!question) {
    throw createError({ statusCode: 400, statusMessage: 'Pergunta vazia.' })
  }
  if (question.length > MAX_QUESTION_CHARS) {
    throw createError({
      statusCode: 400,
      statusMessage: `Pergunta muito longa (máx. ${MAX_QUESTION_CHARS} caracteres).`,
    })
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (rateLimited(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Muitas perguntas em pouco tempo. Tente de novo em alguns minutos.',
    })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 503, statusMessage: 'Assistente de IA não configurado.' })
  }

  const contents: Content[] = [
    ...sanitizeHistory(body.history),
    { role: 'user', parts: [{ text: question }] },
  ]

  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const write = (text: string) => controller.enqueue(encoder.encode(text))

      const msg = MESSAGES[isLocale(body.locale) ? body.locale : 'pt']
      const models = [process.env.GEMINI_MODEL || DEFAULT_MODEL, ...FALLBACK_MODELS]
      let wrote = false

      try {
        for (const [i, model] of models.entries()) {
          // Se o modelo não começar a responder a tempo, cancela e tenta o próximo
          const abort = new AbortController()
          const timer = setTimeout(() => abort.abort(new FirstChunkTimeout()), FIRST_CHUNK_TIMEOUT_MS)
          try {
            const response = await getClient(apiKey).models.generateContentStream({
              model,
              contents,
              config: {
                abortSignal: abort.signal,
                systemInstruction: getPortfolioPrompt(body.locale),
                maxOutputTokens: 1024, // respostas curtas por design (o prompt pede ~90 palavras)
                // Perguntas simples: pouco raciocínio deixa a resposta mais rápida.
                // thinkingLevel só existe na família Gemini 3; o 2.5 usa o padrão dele.
                ...(model.startsWith('gemini-3')
                  ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
                  : {}),
              },
            })

            let finishReason: FinishReason | undefined
            for await (const chunk of response) {
              const text = chunk.text
              if (text) {
                clearTimeout(timer)
                write(text)
                wrote = true
              }
              finishReason = chunk.candidates?.[0]?.finishReason ?? finishReason
            }

            if (finishReason === FinishReason.MAX_TOKENS) {
              write('…')
            } else if (!wrote) {
              write(msg.cantAnswer)
            }
            return
          } catch (error) {
            // Só troca de modelo se nada foi enviado ainda e o erro for temporário
            const timedOut = abort.signal.aborted
            const retryable = timedOut || (error instanceof ApiError && RETRYABLE_STATUS.has(error.status))
            if (wrote || !retryable || i === models.length - 1) throw error
            const reason = timedOut ? 'timeout' : (error as ApiError).status
            console.warn(`[ask] ${model} indisponível (${reason}), tentando o próximo modelo`)
          } finally {
            clearTimeout(timer)
          }
        }
      } catch (error) {
        if (error instanceof ApiError && error.status === 429) {
          write(msg.quota)
        } else if (error instanceof ApiError) {
          console.error(`[ask] erro da API Gemini ${error.status}:`, error.message)
          write(msg.unavailable)
        } else {
          console.error('[ask] erro inesperado:', error)
          write(msg.unavailable)
        }
      } finally {
        controller.close()
      }
    },
  })

  setResponseHeaders(event, {
    'content-type': 'text/plain; charset=utf-8',
    'cache-control': 'no-store',
    'x-accel-buffering': 'no',
  })
  return stream
})
