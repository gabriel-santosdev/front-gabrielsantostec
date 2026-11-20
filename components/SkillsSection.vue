<template>
    <section class="gs-section gs-section--deep stack" id="stack">
        <div class="gs-container">
            <div class="gs-section-header" v-reveal>
                <div>
                    <p class="gs-kicker">{{ t('stack.kicker') }}</p>
                    <h2 class="gs-heading">{{ t('stack.title') }}</h2>
                    <p class="gs-body gs-body--muted gs-section-header__lead">{{ t('stack.lead') }}</p>
                </div>
                <a href="https://github.com/gabriel-santosdev" target="_blank" rel="noopener noreferrer"
                    class="gs-link">{{ t('stack.github') }}</a>
            </div>
        </div>

        <div class="marquee" aria-hidden="true">
            <div class="marquee__track">
                <span v-for="(tech, i) in [...marquee, ...marquee]" :key="i" class="marquee__item">{{ tech }}</span>
            </div>
        </div>

        <div class="gs-container">
            <div class="stack__grid">
                <article v-for="(group, i) in portfolio.stackGroups" :key="group.title" v-reveal="(i % 3) * 80"
                    class="gs-card gs-card--interactive stack__card" @pointermove="spotlight">
                    <div class="stack__card-head">
                        <span class="stack__icon"><i :class="['mdi', group.icon]" aria-hidden="true"></i></span>
                        <span class="stack__file">{{ group.file }}</span>
                    </div>
                    <h3 class="gs-feature-heading">{{ group.title }}</h3>
                    <p class="gs-small stack__desc">{{ group.description }}</p>
                    <ul class="stack__list">
                        <li v-for="item in group.items" :key="item" class="gs-tag">{{ item }}</li>
                    </ul>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { marqueeTechs as marquee } from '~/data/portfolio'

const { t } = useI18n()
const portfolio = usePortfolio()

function spotlight(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
}
</script>

<style scoped>
.stack {
    overflow: hidden;
}

.marquee {
    position: relative;
    margin: 0 0 56px;
    overflow: hidden;
    border-block: 1px solid var(--color-border);
    padding: 18px 0;
    mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.marquee__track {
    display: flex;
    width: max-content;
    animation: marquee 48s linear infinite;
}

.marquee__item {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--color-subtle);
    padding: 0 28px;
    white-space: nowrap;
}

.marquee__item::after {
    content: '✦';
    font-size: 12px;
    color: var(--color-primary);
    margin-left: 56px;
    vertical-align: middle;
}

@keyframes marquee {
    to {
        transform: translateX(-50%);
    }
}

.stack__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--element-gap);
}

.stack__card {
    --spot-x: 50%;
    --spot-y: 0%;
    display: flex;
    flex-direction: column;
    padding: 28px;
}

.stack__card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(360px circle at var(--spot-x) var(--spot-y), rgba(111, 0, 255, 0.14), transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.stack__card:hover::before {
    opacity: 1;
}

.stack__card>* {
    position: relative;
}

.stack__card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
}

.stack__icon {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    font-size: 22px;
    color: var(--color-accent);
    background: var(--color-accent-soft);
    border: 1px solid rgba(187, 153, 255, 0.18);
    border-radius: var(--radius-md);
}

.stack__file {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-subtle);
}

.stack__desc {
    margin-top: 8px;
}

.stack__list {
    list-style: none;
    margin: 24px 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

@media (max-width: 1024px) {
    .stack__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 640px) {
    .stack__grid {
        grid-template-columns: 1fr;
    }

    .stack__card {
        padding: var(--card-padding);
    }

    .marquee {
        margin-bottom: 40px;
    }

    .marquee__item {
        font-size: 18px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .marquee__track {
        animation: none;
    }
}
</style>
