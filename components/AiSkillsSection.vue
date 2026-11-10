<template>
    <section class="gs-section gs-section--mist" id="ai-skills">
        <div class="gs-container--wide">
            <div class="ai__header">
                <p class="gs-kicker">Skills para IA</p>
                <h2 class="gs-display ai__title">Ensine seu agente de IA<br />a escrever front-end de verdade.</h2>
                <p class="ai__lead">
                    Pacotes de instruções prontos para agentes de código, com os padrões que uso em produção: design
                    systems, componentes, testes, acessibilidade e performance. Seu agente passa a seguir as mesmas
                    regras em todo o projeto.
                </p>
            </div>

            <ol class="ai__steps">
                <li v-for="(step, i) in steps" :key="step.title">
                    <span class="ai__step-number">{{ i + 1 }}</span>
                    <p class="ai__step-title">{{ step.title }}</p>
                    <p class="gs-small">{{ step.description }}</p>
                </li>
            </ol>

            <div class="ai__grid">
                <article v-for="skill in skills" :key="skill.title" class="gs-card ai-skill">
                    <span v-if="skill.status === 'em-breve'" class="gs-launch-label">Em breve</span>
                    <span v-else-if="skill.badge" class="gs-launch-label">{{ skill.badge }}</span>

                    <i :class="['mdi', skill.icon, 'ai-skill__icon']" aria-hidden="true"></i>
                    <p class="gs-small">{{ skill.category }}</p>
                    <h3 class="gs-feature-heading ai-skill__title">{{ skill.title }}</h3>
                    <p class="gs-body ai-skill__desc">{{ skill.description }}</p>

                    <ul class="ai-skill__rules">
                        <li v-for="rule in skill.rules" :key="rule">{{ rule }}</li>
                    </ul>

                    <div class="ai-skill__footer">
                        <template v-if="skill.status === 'disponivel' && skill.checkoutUrl">
                            <p class="ai-skill__price">{{ skill.price }}</p>
                            <a :href="skill.checkoutUrl" target="_blank" rel="noopener noreferrer"
                                class="gs-btn gs-btn--primary gs-btn--sm">Comprar</a>
                        </template>
                        <template v-else>
                            <p class="gs-small">Lista de espera aberta</p>
                            <a :href="waitlistLink(skill.title)" target="_blank" rel="noopener noreferrer"
                                class="gs-btn gs-btn--outline gs-btn--sm">Quero ser avisado</a>
                        </template>
                    </div>
                </article>
            </div>

            <div class="ai__callout">
                <div>
                    <p class="ai__callout-title">Precisa de uma skill sob medida?</p>
                    <p class="gs-small">Crio skills com o design system, a arquitetura e as convenções do seu time.</p>
                </div>
                <a :href="customLink" target="_blank" rel="noopener noreferrer" class="gs-link">Pedir uma skill
                    personalizada</a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { whatsappLink } from '~/utils/whatsapp'

/**
 * Catálogo de skills para IA. Para lançar uma skill, edite esta lista:
 * - status 'em-breve': mostra o selo "Em breve" e o botão de lista de espera.
 * - status 'disponivel' + price + checkoutUrl: mostra o preço e o botão "Comprar".
 */
interface AiSkill {
    title: string
    category: string
    icon: string
    description: string
    rules: string[]
    status: 'em-breve' | 'disponivel'
    badge?: string
    price?: string
    checkoutUrl?: string
}

const steps = [
    { title: 'Escolha a skill', description: 'Cada skill cobre uma área do front-end com regras claras e exemplos.' },
    { title: 'Adicione ao projeto', description: 'Um arquivo Markdown que você coloca no repositório, sem dependências.' },
    { title: 'Seu agente segue o padrão', description: 'O código gerado sai consistente com o seu design e a sua arquitetura.' },
]

const skills: AiSkill[] = [
    {
        title: 'Design de produto minimalista',
        category: 'Design',
        icon: 'mdi-palette-outline',
        description: 'Tokens, tipografia, espaçamento e componentes para interfaces limpas e editoriais.',
        rules: ['Paleta e tokens em CSS', 'Escala tipográfica', 'Cards, botões e navegação', 'O que fazer e o que evitar'],
        status: 'em-breve',
    },
    {
        title: 'Vue 3 + TypeScript',
        category: 'Componentes',
        icon: 'mdi-vuejs',
        description: 'Componentes tipados, composables reutilizáveis e organização de projeto.',
        rules: ['Composition API', 'Props e emits tipados', 'Composables', 'Estrutura de pastas'],
        status: 'em-breve',
    },
    {
        title: 'Design System com Storybook',
        category: 'Design System',
        icon: 'mdi-book-open-variant',
        description: 'Componentes documentados, variantes e histórias prontas para o time.',
        rules: ['Anatomia de componentes', 'Stories e controles', 'Tokens com SCSS', 'Versionamento'],
        status: 'em-breve',
    },
    {
        title: 'Testes com Vitest e Cypress',
        category: 'Qualidade',
        icon: 'mdi-check-decagram-outline',
        description: 'Testes unitários e E2E que realmente protegem as entregas.',
        rules: ['O que testar e o que não testar', 'Mocks e fixtures', 'Fluxos E2E críticos', 'Seletores estáveis'],
        status: 'em-breve',
    },
    {
        title: 'Acessibilidade',
        category: 'Qualidade',
        icon: 'mdi-human',
        description: 'Interfaces que funcionam para todo mundo, seguindo as diretrizes WCAG.',
        rules: ['HTML semântico', 'Foco e teclado', 'Contraste e ARIA', 'Formulários acessíveis'],
        status: 'em-breve',
    },
    {
        title: 'Nuxt, SEO e performance',
        category: 'Performance',
        icon: 'mdi-speedometer',
        description: 'Páginas rápidas e bem indexadas, do SSR às imagens.',
        rules: ['SSR e SSG', 'Meta tags e SEO', 'Imagens otimizadas', 'Lazy loading'],
        status: 'em-breve',
    },
]

function waitlistLink(skillTitle: string): string {
    return whatsappLink(`Olá, Gabriel! Quero ser avisado quando a skill para IA "${skillTitle}" for lançada.`)
}

const customLink = whatsappLink('Olá, Gabriel! Tenho interesse em uma skill para IA personalizada para o meu time.')
</script>

<style scoped>
.ai__header {
    text-align: center;
    max-width: 900px;
    margin: 0 auto 56px;
}

.ai__title {
    font-size: clamp(40px, 6vw, 64px);
}

.ai__lead {
    font-size: 21px;
    line-height: 1.38;
    letter-spacing: 0.011em;
    color: var(--color-slate);
    max-width: 680px;
    margin: 24px auto 0;
}

.ai__steps {
    list-style: none;
    margin: 0 0 56px;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 40px;
}

.ai__steps li {
    padding-top: 20px;
    border-top: 1px solid var(--color-hairline-silver);
}

.ai__step-number {
    display: block;
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 600;
    line-height: 1;
    color: var(--color-ink);
    margin-bottom: 12px;
}

.ai__step-title {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.374px;
    color: var(--color-ink);
    margin: 0 0 6px;
}

.ai__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--element-gap);
}

.ai-skill {
    display: flex;
    flex-direction: column;
}

.ai-skill__icon {
    display: block;
    font-size: 40px;
    line-height: 1;
    color: var(--color-ink);
    margin: 20px 0 24px;
}

.ai-skill__title {
    margin-top: 6px;
}

.ai-skill__desc {
    margin-top: 12px;
}

.ai-skill__rules {
    list-style: none;
    margin: 20px 0 0;
    padding: 0;
}

.ai-skill__rules li {
    font-size: 14px;
    line-height: 1.29;
    letter-spacing: -0.224px;
    color: var(--color-ink);
    padding: 10px 0;
    border-top: 1px solid var(--color-control-gray);
}

.ai-skill__footer {
    margin-top: auto;
    padding-top: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
}

.ai-skill__price {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.224px;
    color: var(--color-ink);
    margin: 0;
}

.ai__callout {
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid var(--color-hairline-silver);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
}

.ai__callout-title {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.374px;
    color: var(--color-ink);
    margin: 0 0 4px;
}

@media (max-width: 1024px) {
    .ai__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 734px) {
    .ai__header {
        text-align: left;
        margin-bottom: 40px;
    }

    .ai__header br {
        display: none;
    }

    .ai__lead {
        font-size: 19px;
        margin-left: 0;
    }

    .ai__steps,
    .ai__grid {
        grid-template-columns: 1fr;
    }

    .ai__steps {
        gap: 24px;
    }
}
</style>
