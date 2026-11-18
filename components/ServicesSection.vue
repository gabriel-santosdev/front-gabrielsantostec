<template>
    <section class="gs-section gs-section--deep services" id="services">
        <div class="gs-container">
            <div class="gs-section-header" v-reveal>
                <div>
                    <p class="gs-kicker">{{ t('services.kicker') }}</p>
                    <h2 class="gs-heading">{{ t('services.title') }}<br />{{ t('services.titleEnd') }}</h2>
                    <p class="gs-body gs-body--muted gs-section-header__lead">{{ t('services.lead') }}</p>
                </div>
            </div>

            <ul class="services__grid">
                <li v-for="(service, i) in portfolio.services" :key="service.title" v-reveal="(i % 3) * 80"
                    class="services__item">
                    <div class="services__head">
                        <i :class="['mdi', service.icon]" aria-hidden="true"></i>
                        <span class="services__index">{{ String(i + 1).padStart(2, '0') }}</span>
                    </div>
                    <h3 class="services__title">{{ service.title }}</h3>
                    <p class="gs-small">{{ service.description }}</p>
                </li>
            </ul>

            <div class="services__cta" v-reveal>
                <a :href="budgetLink" target="_blank" rel="noopener noreferrer" class="gs-btn gs-btn--primary">
                    <i class="mdi mdi-whatsapp" aria-hidden="true"></i>
                    {{ t('services.budget') }}
                </a>
                <a href="#contact" class="gs-link">{{ t('services.orMessage') }}</a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { whatsappLink } from '~/utils/whatsapp'

const { t } = useI18n()
const portfolio = usePortfolio()

const budgetLink = computed(() => whatsappLink(t('services.budgetMessage')))
</script>

<style scoped>
.services__grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--color-border);
    gap: 1px;
}

.services__item {
    position: relative;
    padding: 32px;
    background: var(--color-bg-deep);
    transition: background-color 0.3s ease;
}

.services__item::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: var(--gradient-brand);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s var(--ease-out);
}

.services__item:hover {
    background: var(--color-surface);
}

.services__item:hover::after {
    transform: scaleX(1);
}

.services__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
}

.services__head .mdi {
    font-size: 26px;
    line-height: 1;
    color: var(--color-accent);
}

.services__index {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-subtle);
}

.services__title {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: 1.25;
    color: var(--color-text);
    margin: 0 0 8px;
}

.services__cta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 48px;
}

@media (max-width: 834px) {
    .services__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 560px) {
    .services__grid {
        grid-template-columns: 1fr;
    }

    .services__item {
        padding: 24px;
    }

    .gs-heading br {
        display: none;
    }
}
</style>
