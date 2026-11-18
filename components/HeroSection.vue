<template>
    <section ref="sectionRef" class="hero gs-grid-bg" id="hero" @pointermove="onPointerMove">
        <div class="hero__glow" aria-hidden="true"></div>
        <div class="hero__blob" aria-hidden="true"></div>

        <div class="hero__inner">
            <div class="hero__text">
                <p class="hero__prompt"><span class="hero__prompt-sign">$</span> whoami</p>
                <h1 class="gs-display hero__name">
                    Gabriel<br /><span class="gs-gradient-text">Santos</span>
                </h1>

                <p class="hero__role">
                    <span class="hero__role-sign" aria-hidden="true">&gt;</span>
                    <span class="sr-only">{{ t('hero.role') }}</span>
                    <span aria-hidden="true">{{ typed }}<span class="hero__caret"></span></span>
                </p>

                <!-- texto estático de i18n/locales, com <strong> -->
                <p class="hero__lead" v-html="t('hero.lead')"></p>

                <div class="hero__actions">
                    <a href="#projects" class="gs-btn gs-btn--primary">
                        {{ t('hero.ctaProjects') }} <i class="mdi mdi-arrow-down" aria-hidden="true"></i>
                    </a>
                    <a href="#cv" class="gs-btn gs-btn--outline">{{ t('hero.ctaAbout') }}</a>
                </div>

                <ul class="hero__social" :aria-label="t('hero.social')">
                    <li>
                        <a href="https://github.com/gabriel-santosdev" target="_blank" rel="noopener noreferrer"
                            aria-label="GitHub"><i class="mdi mdi-github" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a href="https://linkedin.com/in/devgabrielsantos" target="_blank" rel="noopener noreferrer"
                            aria-label="LinkedIn"><i class="mdi mdi-linkedin" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a :href="whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i
                                class="mdi mdi-whatsapp" aria-hidden="true"></i></a>
                    </li>
                </ul>
            </div>

            <HeroTerminal class="hero__terminal" />
        </div>

        <!-- Números rápidos -->
        <dl class="hero__stats">
            <div v-for="stat in stats" :key="stat.label" class="hero__stat">
                <dt>{{ stat.label }}</dt>
                <dd>{{ stat.value }}</dd>
            </div>
        </dl>
    </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { whatsappLink } from '~/utils/whatsapp'

const { t, locale } = useI18n()

const whatsapp = computed(() => whatsappLink(t('hero.whatsappMessage')))

const stats = computed(() =>
    (['years', 'fullstack', 'companies', 'ai'] as const).map((key) => ({
        value: t(`hero.stats.${key}.value`),
        label: t(`hero.stats.${key}.label`),
    }))
)

/* ---------- Efeito de digitação ---------- */
const rolesRef = computed(() =>
    (['fullstack', 'frontend', 'backend', 'ai'] as const).map((key) => t(`hero.roles.${key}`))
)
const typed = ref(rolesRef.value[0])
let typingTimer: ReturnType<typeof setTimeout> | undefined
let animate = false

function startTyping() {
    clearTimeout(typingTimer)
    const roles = rolesRef.value
    let roleIndex = 0
    let charIndex = roles[0].length
    let deleting = true

    const tick = () => {
        const role = roles[roleIndex]
        if (deleting) {
            charIndex--
            if (charIndex <= 0) {
                deleting = false
                roleIndex = (roleIndex + 1) % roles.length
            }
        } else {
            charIndex++
        }
        typed.value = roles[roleIndex].slice(0, Math.max(charIndex, 0))

        let delay = deleting ? 28 : 55
        if (!deleting && charIndex >= roles[roleIndex].length) {
            deleting = true
            delay = 2400
        }
        if (role !== roles[roleIndex] && !deleting) delay = 300
        typingTimer = setTimeout(tick, delay)
    }

    typingTimer = setTimeout(tick, 2600)
}

/* ---------- Glow que segue o mouse ---------- */
const sectionRef = ref<HTMLElement | null>(null)

function onPointerMove(e: PointerEvent) {
    const el = sectionRef.value
    if (!el || e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
}

onMounted(() => {
    animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (animate) startTyping()
})

// Troca de idioma: recomeça a animação com os cargos traduzidos
watch(locale, () => {
    clearTimeout(typingTimer)
    typed.value = rolesRef.value[0]
    if (animate) startTyping()
})

onBeforeUnmount(() => clearTimeout(typingTimer))

</script>

<style scoped>
.hero {
    --glow-x: 70%;
    --glow-y: 30%;
    position: relative;
    overflow: hidden;
    padding: calc(var(--header-height) + 40px) 24px 40px;
    display: flex;
    flex-direction: column;
    gap: 56px;
}

/* Desbota a grade nas bordas */
.hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 70% at 50% 40%, transparent 30%, var(--color-bg) 85%);
    pointer-events: none;
}

.hero__glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(111, 0, 255, 0.16), transparent 60%);
    pointer-events: none;
    z-index: 1;
}

.hero__blob {
    position: absolute;
    top: -260px;
    right: -160px;
    width: 720px;
    height: 720px;
    border-radius: 50%;
    background: var(--gradient-brand);
    filter: blur(140px);
    opacity: 0.35;
    pointer-events: none;
}

.hero__inner,
.hero__stats {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.hero__inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: 64px;
    align-items: center;
}

/* ---------- Texto ---------- */
.hero__prompt {
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--color-muted);
    margin: 0 0 12px;
}

.hero__prompt-sign {
    color: var(--color-accent);
}

.hero__name {
    font-size: clamp(56px, 8.4vw, 112px);
}

.hero__role {
    font-family: var(--font-mono);
    font-size: clamp(15px, 1.6vw, 19px);
    color: var(--color-text);
    margin: 28px 0 0;
    min-height: 1.6em;
}

.hero__role-sign {
    color: var(--color-accent);
    margin-right: 10px;
}

.hero__caret {
    display: inline-block;
    width: 0.55em;
    height: 1.15em;
    margin-left: 3px;
    vertical-align: text-bottom;
    background: var(--color-accent);
    animation: blink 1s steps(1) infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

.hero__lead {
    font-size: 17px;
    line-height: 1.7;
    color: var(--color-muted);
    max-width: 540px;
    margin: 20px 0 0;
}

.hero__lead strong {
    color: var(--color-text);
    font-weight: 500;
}

.hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 36px;
}

.hero__social {
    display: flex;
    gap: 8px;
    list-style: none;
    margin: 28px 0 0;
    padding: 0;
}

.hero__social a {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    font-size: 20px;
    color: var(--color-muted);
    border-radius: var(--radius-sm);
    text-decoration: none;
    transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s var(--ease-out);
}

.hero__social a:hover {
    color: var(--color-accent);
    background: var(--color-accent-soft);
    transform: translateY(-2px);
}

/* ---------- Números ---------- */
.hero__stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-top: 0;
    margin-bottom: 0;
    border-top: 1px solid var(--color-border);
}

.hero__stat {
    display: flex;
    flex-direction: column-reverse;
    gap: 4px;
    padding: 24px 24px 0 0;
}

.hero__stat dd {
    margin: 0;
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--color-text);
}

.hero__stat dt {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-subtle);
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
}

@media (max-width: 1024px) {
    .hero__inner {
        grid-template-columns: 1fr;
        gap: 56px;
    }

    .hero__terminal {
        max-width: 720px;
    }

    .hero__stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 734px) {
    .hero {
        padding: calc(var(--header-height) + 28px) 16px 32px;
        gap: 48px;
    }

    .hero__blob {
        width: 420px;
        height: 420px;
        top: -180px;
        right: -200px;
        filter: blur(100px);
    }


    .hero__stat {
        padding-right: 12px;
    }

    .hero__stat dd {
        font-size: 20px;
    }
}
</style>
