/**
 * Fonte única dos dados do portfólio, em português, inglês e espanhol.
 * Usada pelos componentes da página e pelo assistente de IA (server/api/ask.post.ts),
 * então tudo que mudar aqui aparece no site e nas respostas da IA.
 *
 * Os três idiomas têm o mesmo formato (PortfolioContent). Ao mudar um, mude os outros.
 */
import { en } from './content/en'
import { es } from './content/es'
import { pt } from './content/pt'

export const LOCALES = ['pt', 'en', 'es'] as const
export type Locale = (typeof LOCALES)[number]

export interface Role {
    title: string
    period: string
    summary: string
    highlights: string[]
}

export interface Job {
    company: string
    meta: string
    location: string
    roles: Role[]
}

export interface Education {
    title: string
    period: string
    description: string
}

export interface StackGroup {
    title: string
    file: string
    icon: string
    description: string
    items: string[]
}

export interface Project {
    title: string
    type: string
    description: string
    image: string
    stack: string[]
    repo?: string
    live?: string
}

export interface Service {
    icon: string
    title: string
    description: string
}

export interface PortfolioContent {
    experience: Job[]
    education: Education[]
    stackGroups: StackGroup[]
    projects: Project[]
    services: Service[]
}

export const content: Record<Locale, PortfolioContent> = { pt, en, es }

export function isLocale(value: unknown): value is Locale {
    return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

export function getContent(locale: string): PortfolioContent {
    return isLocale(locale) ? content[locale] : content.pt
}

// Nomes de tecnologias: iguais em todos os idiomas
export const marqueeTechs = [
    'TypeScript', 'Vue.js', 'Nuxt', 'React', 'Next.js', 'Angular', 'Laravel', 'PHP', 'Node.js', 'SQL',
    'Storybook', 'SCSS', 'Jest', 'Vitest', 'Cypress', 'GCP', 'MCP',
]
