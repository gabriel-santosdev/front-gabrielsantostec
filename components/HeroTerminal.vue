<template>
    <div class="term" @click="focusInput">
        <div class="term__bar">
            <span class="gs-window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="term__title">gabriel@portfolio: ~</span>
            <span class="term__badge"><i class="mdi mdi-creation" aria-hidden="true"></i> IA</span>
        </div>

        <div ref="bodyRef" class="term__body" role="log" aria-live="polite" :aria-label="t('terminal.label')">
            <template v-for="line in lines" :key="line.id">
                <p v-if="line.kind === 'cmd'" class="term__line">
                    <span class="term__prompt">{{ PROMPT }}</span>{{ line.text }}
                </p>

                <p v-else-if="line.kind === 'out'" class="term__line term__out">{{ line.text }}</p>

                <p v-else-if="line.kind === 'hint'" class="term__line term__hint">{{ line.text }}</p>

                <p v-else-if="line.kind === 'error'" class="term__line term__error">{{ line.text }}</p>

                <ul v-else-if="line.kind === 'list'" class="term__list">
                    <li v-for="item in line.items" :key="item.label">
                        <component :is="item.href ? 'a' : 'span'" :href="item.href"
                            :target="item.href?.startsWith('http') ? '_blank' : undefined"
                            :rel="item.href?.startsWith('http') ? 'noopener noreferrer' : undefined"
                            class="term__item-label">{{ item.label }}</component>
                        <span class="term__item-desc">{{ item.desc }}</span>
                    </li>
                </ul>

                <div v-else-if="line.kind === 'code'" class="term__code">
                    <p class="term__code-head">
                        <span>{{ line.file }}</span><span>{{ line.layer }}</span>
                    </p>
                    <!-- conteúdo estático de data/codeSamples.ts, realçado por utils/highlight.ts -->
                    <pre><code v-html="line.html"></code></pre>
                </div>

                <p v-else-if="line.kind === 'ai'" class="term__line term__ai">
                    <span class="term__ai-tag">ia ›</span>
                    <span v-if="!line.text && line.streaming" class="term__thinking">{{ t('terminal.thinking')
                        }}<span>.</span><span>.</span><span>.</span></span>
                    {{ line.text }}<span v-if="line.streaming && line.text" class="term__caret"></span>
                </p>
            </template>

            <form class="term__input-row" @submit.prevent="submit">
                <label for="term-input" class="term__prompt">{{ PROMPT }}</label>
                <input id="term-input" ref="inputRef" v-model="input" class="term__input" type="text"
                    autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="500" :disabled="busy"
                    :placeholder="busy ? '' : t('terminal.placeholder')" :aria-label="t('terminal.inputLabel')"
                    @keydown.up.prevent="historyNav(-1)" @keydown.down.prevent="historyNav(1)" />
            </form>
        </div>

        <div class="term__chips" :aria-label="t('terminal.suggestions')">
            <button v-for="chip in chips" :key="chip.label" type="button" class="term__chip"
                :class="{ 'term__chip--ai': chip.ai }" :disabled="busy" @click.stop="run(chip.cmd)">
                <i v-if="chip.ai" class="mdi mdi-creation" aria-hidden="true"></i>{{ chip.label }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { codeSamples } from '~/data/codeSamples'
import { highlight } from '~/utils/highlight'
import { whatsappLink } from '~/utils/whatsapp'

const PROMPT = 'gabriel@portfolio:~$ '

const { t, locale } = useI18n()
const portfolio = usePortfolio()

interface ListItem {
    label: string
    desc: string
    href?: string
}

type TextLine = { id: number; kind: 'cmd' | 'out' | 'hint' | 'error'; text: string }

type Line =
    | TextLine
    | { id: number; kind: 'list'; items: ListItem[] }
    | { id: number; kind: 'code'; file: string; layer: string; html: string }
    | { id: number; kind: 'ai'; text: string; streaming: boolean }

type NewLine = Line extends infer L ? (L extends Line ? Omit<L, 'id'> : never) : never

const lines = ref<Line[]>([])
const input = ref('')
const busy = ref(false)
const bodyRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

let nextId = 0
const typed: string[] = []
let historyIndex = 0
const conversation: { role: 'user' | 'assistant'; content: string }[] = []

const chips = computed(() => [
    { label: 'help', cmd: 'help' },
    { label: 'projects', cmd: 'projects' },
    { label: 'cat ReportController.php', cmd: 'cat ReportController.php' },
    { label: t('terminal.chips.react'), cmd: t('terminal.chips.react'), ai: true },
    { label: t('terminal.chips.hire'), cmd: t('terminal.chips.hireQuestion'), ai: true },
])

function push(line: NewLine): Line {
    lines.value.push({ ...line, id: nextId++ } as Line)
    scrollToEnd()
    return lines.value[lines.value.length - 1]
}

function scrollToEnd() {
    nextTick(() => {
        const el = bodyRef.value
        if (el) el.scrollTop = el.scrollHeight
    })
}

function focusInput() {
    // Não rouba o foco quando o visitante está selecionando texto
    if (window.getSelection()?.toString()) return
    inputRef.value?.focus({ preventScroll: true })
}

// Comandos em inglês valem em todos os idiomas; os apelidos aceitam as versões em pt e es
const commands: Record<string, { hidden?: boolean; run: (arg: string) => void }> = {
    help: {
        run: () =>
            push({
                kind: 'list',
                items: Object.entries(commands)
                    .filter(([, c]) => !c.hidden)
                    .map(([name]) => ({ label: name, desc: t(`terminal.commands.${name}`) }))
                    .concat({ label: t('terminal.anyQuestion'), desc: t('terminal.anyQuestionDesc') }),
            }),
    },
    whoami: {
        run: () => push({ kind: 'out', text: t('terminal.whoami') }),
    },
    experience: {
        run: () =>
            push({
                kind: 'list',
                items: portfolio.value.experience.flatMap((job) =>
                    job.roles.map((role) => ({ label: job.company, desc: `${role.title} · ${role.period}` }))
                ),
            }),
    },
    stack: {
        run: () =>
            push({
                kind: 'list',
                items: portfolio.value.stackGroups.map((g) => ({ label: g.title, desc: g.items.join(', ') })),
            }),
    },
    projects: {
        run: () =>
            push({
                kind: 'list',
                items: portfolio.value.projects.map((p) => ({ label: p.title, desc: p.type, href: p.live })),
            }),
    },
    ls: {
        run: () =>
            push({
                kind: 'list',
                items: codeSamples.map((s) => ({ label: s.name, desc: t(`terminal.files.${s.key}`) })),
            }),
    },
    cat: {
        run: (arg) => {
            const sample = codeSamples.find((s) => s.name.toLowerCase() === arg.toLowerCase())
            if (!sample) {
                push({
                    kind: 'error',
                    text: arg ? t('terminal.fileNotFound', { file: arg }) : t('terminal.catUsage'),
                })
                return
            }
            push({ kind: 'code', file: sample.name, layer: sample.layer, html: highlight(sample.code) })
        },
    },
    contact: {
        run: () =>
            push({
                kind: 'list',
                items: [
                    { label: 'form', desc: t('terminal.contact.form'), href: '#contact' },
                    { label: 'whatsapp', desc: t('terminal.contact.whatsapp'), href: whatsappLink(t('terminal.contact.whatsappMessage')) },
                    { label: 'linkedin', desc: 'in/devgabrielsantos', href: 'https://linkedin.com/in/devgabrielsantos' },
                    { label: 'github', desc: 'gabriel-santosdev', href: 'https://github.com/gabriel-santosdev' },
                ],
            }),
    },
    clear: {
        run: () => {
            lines.value = []
        },
    },
    sudo: {
        hidden: true,
        run: (arg) => {
            if (/hire|contratar/i.test(arg)) {
                push({ kind: 'out', text: t('terminal.sudoOk') })
                setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 600)
            } else {
                push({ kind: 'error', text: t('terminal.sudoNo') })
            }
        },
    },
}

const aliases: Record<string, string> = {
    '?': 'help',
    ajuda: 'help',
    ayuda: 'help',
    sobre: 'whoami',
    about: 'whoami',
    experiencia: 'experience',
    experiência: 'experience',
    exp: 'experience',
    projetos: 'projects',
    proyectos: 'projects',
    code: 'ls',
    contato: 'contact',
    contacto: 'contact',
    limpar: 'clear',
    limpiar: 'clear',
}

async function run(raw: string) {
    const text = raw.trim()
    if (!text || busy.value) return

    typed.push(text)
    historyIndex = typed.length
    input.value = ''
    push({ kind: 'cmd', text })

    const [head, ...rest] = text.split(/\s+/)
    const name = aliases[head.toLowerCase()] ?? head.toLowerCase()
    const command = commands[name]

    // Comando conhecido (sem cara de pergunta) roda local; o resto vai para a IA
    if (command && !/[?¿]/.test(text)) {
        command.run(rest.join(' '))
        scrollToEnd()
        return
    }

    await ask(text.replace(/^ask\s+/i, ''))
}

function submit() {
    run(input.value)
}

function historyNav(direction: number) {
    if (!typed.length) return
    historyIndex = Math.min(Math.max(historyIndex + direction, 0), typed.length)
    input.value = typed[historyIndex] ?? ''
}

async function ask(question: string) {
    busy.value = true
    const line = push({ kind: 'ai', text: '', streaming: true }) as Extract<Line, { kind: 'ai' }>

    try {
        const res = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'x-portfolio-client': 'terminal' },
            body: JSON.stringify({ question, history: conversation.slice(-6), locale: locale.value }),
        })

        if (!res.ok || !res.body) {
            const data = await res.json().catch(() => null)
            line.text = data?.message || data?.statusMessage || t('terminal.unavailable')
            return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            line.text += decoder.decode(value, { stream: true })
            scrollToEnd()
        }
        line.text += decoder.decode()

        conversation.push({ role: 'user', content: question }, { role: 'assistant', content: line.text })
    } catch {
        line.text = t('terminal.offline')
    } finally {
        line.streaming = false
        busy.value = false
        scrollToEnd()
        nextTick(() => inputRef.value?.focus({ preventScroll: true }))
    }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function typeCommand(text: string, animate: boolean) {
    const line = push({ kind: 'cmd', text: '' }) as TextLine
    if (!animate) {
        line.text = text
        return
    }
    for (const char of text) {
        line.text += char
        await sleep(55)
    }
    await sleep(250)
}

async function boot(animate: boolean) {
    busy.value = true
    lines.value = []
    await sleep(animate ? 600 : 0)
    await typeCommand('whoami', animate)
    commands.whoami.run('')
    await sleep(animate ? 400 : 0)
    push({ kind: 'hint', text: t('terminal.hint') })
    busy.value = false
}

onMounted(() => {
    boot(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
})

watch(locale, () => {
    if (!busy.value) {
        conversation.length = 0
        boot(false)
    }
})
</script>

<style scoped>
.term {
    position: relative;
    display: flex;
    flex-direction: column;
    background: rgba(18, 18, 18, 0.9);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: 0 40px 120px -30px rgba(111, 0, 255, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    cursor: text;
}

.term__bar {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    cursor: default;
}

.term__title {
    flex: 1;
    text-align: center;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-subtle);
}

.term__badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-accent);
    background: var(--color-accent-soft);
    border: 1px solid rgba(187, 153, 255, 0.24);
    padding: 3px 8px;
    border-radius: var(--radius-pill);
}

.term__body {
    height: 400px;
    overflow-y: auto;
    padding: 18px 20px 12px;
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.7;
    color: #d4d4d4;
    overscroll-behavior: contain;
}

.term__line {
    margin: 0 0 6px;
    white-space: pre-wrap;
    word-break: break-word;
}

.term__prompt {
    color: var(--color-success);
    white-space: pre;
}

.term__out {
    color: var(--color-text);
    margin-bottom: 14px;
}

.term__hint {
    color: var(--color-subtle);
    margin-bottom: 14px;
}

.term__error {
    color: var(--color-danger);
    margin-bottom: 14px;
}

.term__list {
    list-style: none;
    margin: 0 0 14px;
    padding: 0;
}

.term__list li {
    display: grid;
    grid-template-columns: minmax(120px, max-content) 1fr;
    gap: 16px;
}

.term__item-label {
    color: var(--color-accent);
    text-decoration: none;
}

a.term__item-label:hover {
    text-decoration: underline;
}

.term__item-desc {
    color: var(--color-muted);
}

.term__code {
    margin: 4px 0 14px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    overflow: hidden;
}

.term__code-head {
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 6px 12px;
    font-size: 11px;
    color: var(--color-subtle);
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
}

.term__code pre {
    margin: 0;
    padding: 12px;
    font-size: 12px;
    line-height: 1.65;
    overflow-x: auto;
}

.term__code :deep(.tk-key) {
    color: #c4a1ff;
}

.term__code :deep(.tk-str) {
    color: var(--color-syntax-string);
}

.term__code :deep(.tk-tag) {
    color: #ff8fa3;
}

.term__code :deep(.tk-var) {
    color: var(--color-syntax-var);
}

.term__code :deep(.tk-fn) {
    color: #8be9a8;
}

.term__code :deep(.tk-comment) {
    color: var(--color-syntax-comment);
    font-style: italic;
}

.term__ai {
    color: var(--color-text);
    margin-bottom: 14px;
    padding-left: 12px;
    border-left: 2px solid var(--color-primary);
}

.term__ai-tag {
    color: var(--color-accent);
    margin-right: 8px;
}

.term__thinking {
    color: var(--color-subtle);
}

.term__thinking span {
    animation: dot 1.2s infinite;
}

.term__thinking span:nth-child(2) {
    animation-delay: 0.2s;
}

.term__thinking span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes dot {

    0%,
    60%,
    100% {
        opacity: 0.2;
    }

    30% {
        opacity: 1;
    }
}

.term__caret {
    display: inline-block;
    width: 0.55em;
    height: 1.1em;
    margin-left: 2px;
    vertical-align: text-bottom;
    background: var(--color-accent);
    animation: blink 1s steps(1) infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

.term__input-row {
    display: flex;
    align-items: center;
}

.term__input {
    flex: 1;
    min-width: 0;
    font: inherit;
    color: var(--color-text);
    background: transparent;
    border: 0;
    outline: none;
    padding: 0;
    caret-color: var(--color-accent);
}

.term__input::placeholder {
    color: #4a4a4a;
}

.term__chips {
    display: flex;
    gap: 8px;
    padding: 12px 16px 14px;
    border-top: 1px solid var(--color-border);
    overflow-x: auto;
    scrollbar-width: none;
    cursor: default;
}

.term__chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-muted);
    background: rgba(242, 242, 242, 0.04);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-pill);
    padding: 6px 11px;
    cursor: pointer;
    transition: color 0.2s ease, border-color 0.2s ease;
}

.term__chip:hover:not(:disabled) {
    color: var(--color-text);
    border-color: var(--color-border-strong);
}

.term__chip--ai {
    color: var(--color-accent);
    border-color: rgba(187, 153, 255, 0.24);
}

.term__chip--ai:hover:not(:disabled) {
    color: var(--color-accent);
    border-color: var(--color-accent);
}

.term__chip:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

@media (max-width: 734px) {
    .term__body {
        height: 340px;
        padding: 14px 14px 10px;
        font-size: 12px;
    }

    .term__list li {
        grid-template-columns: 1fr;
        gap: 0;
        margin-bottom: 6px;
    }

    .term__title {
        text-align: left;
    }
}
</style>
