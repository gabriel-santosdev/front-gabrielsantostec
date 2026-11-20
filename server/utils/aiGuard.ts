import type { H3Event } from 'h3'

export const LIMITS = {
  bodyBytes: 8 * 1024,
  questionChars: 500,
  historyMessages: 6,
  historyChars: 1200,
}

export const CLIENT_HEADER = 'x-portfolio-client'
export const CLIENT_HEADER_VALUE = 'terminal'

/**
 * Marcador colocado no system prompt. Se ele aparecer numa resposta, o modelo
 * está repetindo as instruções e a resposta é cortada.
 */
export const CANARY = process.env.AI_CANARY || 'gs-canary-7f3a9c1e'

const PROMPT_LEAK_MARKERS = [CANARY, '<perfil>', '</perfil>', '<regras>', '</regras>', 'systemInstruction']

/* ------------------------------------------------------------ origem */

function allowedHosts(event: H3Event): Set<string> {
  const hosts = new Set<string>()
  const requestHost = getRequestHost(event, { xForwardedHost: true })
  if (requestHost) hosts.add(requestHost.toLowerCase())
  for (const url of [process.env.NUXT_PUBLIC_SITE_URL, ...(process.env.AI_ALLOWED_ORIGINS ?? '').split(',')]) {
    try {
      if (url?.trim()) hosts.add(new URL(url.trim()).host.toLowerCase())
    } catch {}
  }
  return hosts
}

/** Aceita só chamadas feitas pelo terminal do próprio site. */
export function isTrustedRequest(event: H3Event): boolean {
  if (getHeader(event, CLIENT_HEADER) !== CLIENT_HEADER_VALUE) return false
  if (!getHeader(event, 'content-type')?.toLowerCase().startsWith('application/json')) return false

  const origin = getHeader(event, 'origin') ?? getHeader(event, 'referer')
  if (!origin) return false
  try {
    return allowedHosts(event).has(new URL(origin).host.toLowerCase())
  } catch {
    return false
  }
}

export function clientIp(event: H3Event): string {
  return (
    getHeader(event, 'x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
    getHeader(event, 'x-real-ip')?.trim() ||
    getRequestIP(event, { xForwardedFor: true }) ||
    'unknown'
  )
}

/* ------------------------------------------------------------ limites de uso */
// Em memória: valem por instância serverless. Para um limite global, use Vercel KV/Upstash.

const PER_IP = { max: 12, windowMs: 10 * 60_000, minIntervalMs: 2_500 }
const GLOBAL = { max: 300, windowMs: 60 * 60_000 }

const ipHits = new Map<string, number[]>()
const inFlight = new Set<string>()
let globalHits: number[] = []

export type RateResult = 'ok' | 'too_fast' | 'busy' | 'limited' | 'global'

export function takeRateSlot(ip: string): RateResult {
  const now = Date.now()
  if (inFlight.has(ip)) return 'busy'

  const recent = (ipHits.get(ip) ?? []).filter((t) => now - t < PER_IP.windowMs)
  const last = recent.at(-1)
  if (last && now - last < PER_IP.minIntervalMs) return 'too_fast'
  if (recent.length >= PER_IP.max) return 'limited'

  globalHits = globalHits.filter((t) => now - t < GLOBAL.windowMs)
  if (globalHits.length >= GLOBAL.max) return 'global'

  recent.push(now)
  globalHits.push(now)
  if (ipHits.size > 5000) ipHits.clear()
  ipHits.set(ip, recent)
  inFlight.add(ip)
  return 'ok'
}

export function releaseRateSlot(ip: string) {
  inFlight.delete(ip)
}

/* ------------------------------------------------------------ entrada */

const INVISIBLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F­͏؜ᅟᅠ឴឵᠋-᠏​-‏‪-‮⁠-⁯ㅤ︀-️﻿ﾠ￰-￻]/g

/** Normaliza o texto do visitante: Unicode NFKC, sem caracteres invisíveis, sem tags. */
export function sanitizeText(raw: string, maxChars: number): string {
  return raw
    .normalize('NFKC')
    .replace(INVISIBLE, '')
    .replace(/[<>]/g, (c) => (c === '<' ? '‹' : '›'))
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxChars)
}

function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
}

const INJECTION_PATTERNS: RegExp[] = [
  /\b(ignore|ignora|ignorar|disregard|forget|esqueca|esquece|olvida|desconsidere|desconsidera)\b.{0,40}\b(instruc\w*|instruction\w*|regras?|reglas?|rules?|prompt\w*|diretriz\w*|directiv\w*|guidelines?)\b/,
  /\b(system|developer|sistema|desarrollador|desenvolvedor)\s+(prompt|message|mensagem|mensaje|instruc\w*)\b/,
  /\b(prompt|instruc\w*|instructions?)\s+(do|de|del|of the)\s+(sistema|system)\b/,
  /\b(reveal|show|print|repeat|output|display|leak|revele|revela|mostre|mostra|muestra|repita|repite|imprima|imprime|exiba|vaze)\b.{0,40}\b(prompt\w*|instruc\w*|instructions?|regras|reglas|rules|configurac\w*|configuration|canary)\b/,
  /\b(you are now|from now on you|a partir de agora voce|agora voce e|de ahora en adelante|ahora eres|a partir de ahora eres)\b/,
  /^(now )?(act as|aja como|atue como|actua como)\b/,
  /\b(pretend (to be|you are)|roleplay as|finja (ser|que voce)|haz de cuenta que eres|simula ser)\b/,
  /\b(jailbreak|dan mode|do anything now|developer mode|modo desenvolvedor|modo desarrollador|god mode|sudo mode)\b/,
  /\b(new|novas?|nuevas?) (instructions|instrucoes|instrucciones|rules|regras|reglas)\b/,
  /\b(override|bypass|burlar|contornar|evadir|desativ\w*|desactiv\w*|disable)\b.{0,30}\b(rules?|regras|reglas|filters?|filtros?|safety|seguranca|seguridad|restric\w*|guardrails?)\b/,
]

export function looksLikeInjection(text: string): boolean {
  const folded = fold(text)
  return INJECTION_PATTERNS.some((re) => re.test(folded))
}

/* ------------------------------------------------------------ saída */

/**
 * Filtra o texto do modelo antes de ir para o navegador. Segura os últimos
 * caracteres para que um marcador de vazamento dividido entre dois trechos
 * ainda seja detectado.
 */
export function createOutputGuard(write: (text: string) => void) {
  const hold = Math.max(...PROMPT_LEAK_MARKERS.map((m) => m.length))
  let full = ''
  let sent = 0
  let tripped = false

  const leaked = () => {
    const lower = full.toLowerCase()
    return PROMPT_LEAK_MARKERS.some((m) => lower.includes(m.toLowerCase()))
  }

  return {
    get tripped() {
      return tripped
    },
    get wrote() {
      return sent > 0
    },
    push(chunk: string) {
      if (tripped) return
      full += chunk.replace(INVISIBLE, '')
      if (leaked()) {
        tripped = true
        return
      }
      const safeEnd = full.length - hold
      if (safeEnd > sent) {
        write(full.slice(sent, safeEnd))
        sent = safeEnd
      }
    },
    flush() {
      if (tripped || leaked()) {
        tripped = true
        return
      }
      if (full.length > sent) write(full.slice(sent))
      sent = full.length
    },
  }
}
