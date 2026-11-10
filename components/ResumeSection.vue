<template>
    <section class="gs-section resume" id="cv">
        <div class="gs-container">
            <!-- Bloco editorial -->
            <div class="resume__intro">
                <p class="gs-kicker">Sobre mim</p>
                <h2 class="gs-heading">Full stack na prática.<br />Front-end como especialidade.</h2>
                <div class="resume__intro-body">
                    <p class="gs-body">
                        Sou Software Engineer Full Stack com mais de 4 anos de experiência entregando produtos web
                        completos. No back-end, desenvolvo <strong>APIs REST</strong>, regras de negócio complexas e
                        modelagem de dados com <strong>PHP e Laravel</strong>, além de camadas BFF em
                        <strong>Node.js</strong> integradas a microsserviços. No front-end, construo interfaces
                        escaláveis com <strong>Vue.js</strong>, <strong>React</strong>, <strong>Angular</strong> e
                        <strong>TypeScript</strong>.
                    </p>
                    <p class="gs-body">
                        Participei da criação de um sistema financeiro do zero, da arquitetura ao deploy, e do
                        desenvolvimento de aplicações de alta disponibilidade em micro frontends na Equifax | Boa
                        Vista. Também levo <strong>Inteligência Artificial</strong> para produtos reais: relatórios
                        financeiros gerados por chat a partir de consultas SQL e MCPs que conectam aplicações a agentes
                        de IA.
                    </p>
                    <p class="gs-body">
                        Cuido da qualidade em todas as camadas, com testes unitários e E2E (Jest, Vitest e Cypress),
                        design systems documentados em Storybook e code reviews. Já atuei como líder técnico e como
                        buddy de novos desenvolvedores. Hoje transformo essa experiência em skills que ensinam agentes de IA a escrever
                        front-end com qualidade de produção.
                    </p>
                </div>
            </div>

            <!-- Experiência -->
            <div class="resume__block">
                <h3 class="resume__block-title">Experiência</h3>

                <article v-for="job in experience" :key="job.company" class="job">
                    <header class="job__company">
                        <p class="job__company-name">{{ job.company }}</p>
                        <p class="gs-small">{{ job.meta }}</p>
                        <p class="gs-small">{{ job.location }}</p>
                    </header>

                    <ol class="job__roles">
                        <li v-for="role in job.roles" :key="role.title" class="role">
                            <p class="role__period">{{ role.period }}</p>
                            <h4 class="role__title">{{ role.title }}</h4>
                            <p class="gs-small role__summary">{{ role.summary }}</p>
                            <ul class="role__highlights">
                                <li v-for="item in role.highlights" :key="item">{{ item }}</li>
                            </ul>
                        </li>
                    </ol>
                </article>
            </div>

            <!-- Formação -->
            <div class="resume__block">
                <h3 class="resume__block-title">Formação</h3>
                <article v-for="item in education" :key="item.title" class="job">
                    <header class="job__company">
                        <p class="job__company-name">{{ item.title }}</p>
                    </header>
                    <div>
                        <p class="role__period">{{ item.period }}</p>
                        <p class="gs-small">{{ item.description }}</p>
                    </div>
                </article>

                <div class="resume__cta">
                    <a href="https://linkedin.com/in/devgabrielsantos" target="_blank" rel="noopener noreferrer"
                        class="gs-link">Currículo completo no LinkedIn</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
interface Role {
    title: string
    period: string
    summary: string
    highlights: string[]
}

interface Job {
    company: string
    meta: string
    location: string
    roles: Role[]
}

const experience: Job[] = [
    {
        company: 'Bússola Social',
        meta: 'Tempo integral · out. 2023 a nov. 2026',
        location: 'Itajaí, SC · Remoto',
        roles: [
            {
                title: 'Software Engineer Pleno II',
                period: 'nov. 2025 a nov. 2026',
                summary:
                    'Atuação full stack em um sistema financeiro, com Vue.js e TypeScript no front-end e PHP/Laravel no back-end.',
                highlights: [
                    'Funcionalidades financeiras, regras de negócio complexas, APIs REST e modelagem de dados com Laravel.',
                    'Integração de IA para geração de relatórios financeiros personalizados via interface de chat, com consultas SQL.',
                    'Desenvolvimento de MCPs (Model Context Protocol) conectando aplicações a ferramentas e agentes de IA.',
                    'Evolução do Design System com Storybook, Vue.js, SCSS e TypeScript; PWA e testes E2E com Cypress.',
                ],
            },
            {
                title: 'Front-End Engineer Pleno I',
                period: 'fev. 2025 a nov. 2025',
                summary:
                    'Construção de um projeto financeiro do zero, da definição da arquitetura às interfaces escaláveis e performáticas.',
                highlights: [
                    'Novas funcionalidades e melhorias em código legado com foco em legibilidade, organização e Clean Code.',
                    'Atuação em múltiplas squads no modelo de Job Rotation, com priorização dinâmica de demandas.',
                    'Buddy de novos desenvolvedores, apoiando a passagem de conhecimento e a integração ao time.',
                ],
            },
            {
                title: 'Front-End Engineer Júnior',
                period: 'out. 2023 a fev. 2025',
                summary: 'Desenvolvimento de features com Vue.js 2 e 3, TypeScript e JavaScript.',
                highlights: [
                    'Redesign completo do blog institucional no HubSpot, com templates e personalizações em HubL.',
                    'Testes unitários com Jest e Vitest e testes E2E com Cypress.',
                    'Componentes do Design System, aplicações PWA e manutenção de sistema legado em Laravel.',
                    'Code reviews, refinamentos técnicos com o Tech Lead e documentação de regras de negócio.',
                ],
            },
        ],
    },
    {
        company: 'Polo Trial',
        meta: 'Meio período · nov. 2025 a jul. 2026',
        location: 'Ribeirão Preto, SP · Remoto',
        roles: [
            {
                title: 'Software Engineer Mid-Level · Líder Técnico',
                period: 'nov. 2025 a jul. 2026',
                summary: 'Desenvolvimento e aprimoramento de interfaces com React, Angular e Material-UI, atuando como líder técnico.',
                highlights: [
                    'Criação e manutenção de Design System.',
                    'Otimização de performance com lazy loading e internacionalização (i18n).',
                    'Testes automatizados para garantir a estabilidade do código.',
                ],
            },
        ],
    },
    {
        company: 'Equifax | Boa Vista',
        meta: 'fev. 2022 a jun. 2023',
        location: 'Barueri, SP · Remoto',
        roles: [
            {
                title: 'Software Engineer',
                period: 'fev. 2022 a jun. 2023',
                summary:
                    'Aplicações web de alta disponibilidade com React.js e TypeScript em arquitetura de Micro Frontends, integradas a microsserviços via APIs REST.',
                highlights: [
                    'Construção e manutenção de camadas BFF (Backend for Frontend) em Node.js.',
                    'Testes unitários e de integração com Jest para aplicações em produção.',
                    'Atuação com times de DevOps em GCP, apoiando deploys, monitoramento e disponibilidade.',
                ],
            },
        ],
    },
]

const education = [
    {
        title: 'Análise e Desenvolvimento de Sistemas',
        period: 'Graduação',
        // TODO: adicionar a instituição de ensino e o ano de conclusão
        description: 'Tecnólogo em Análise e Desenvolvimento de Sistemas.',
    },
]
</script>

<style scoped>
.resume {
    background: var(--color-gallery-white);
}

.resume__intro {
    max-width: 820px;
}

.resume__intro-body {
    display: grid;
    gap: 20px;
    margin-top: 32px;
    max-width: 680px;
}

.resume__block {
    margin-top: 88px;
}

.resume__block-title {
    font-family: var(--font-display);
    font-size: 40px;
    font-weight: 600;
    line-height: 1.1;
    color: var(--color-ink);
    margin: 0 0 24px;
}

.job {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 40px;
    padding: 32px 0;
    border-top: 1px solid var(--color-hairline-silver);
}

.job p,
.job h4 {
    margin: 0;
}

.job__company {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.job__company-name {
    font-family: var(--font-display);
    font-size: 21px;
    font-weight: 600;
    line-height: 1.19;
    letter-spacing: 0.231px;
    color: var(--color-ink);
    margin-bottom: 4px !important;
}

.job__roles {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.role__period {
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: -0.12px;
    color: var(--color-slate);
    margin-bottom: 6px !important;
    text-transform: uppercase;
}

.role__title {
    font-size: 17px;
    font-weight: 600;
    line-height: 1.24;
    letter-spacing: -0.374px;
    color: var(--color-ink);
}

.role__summary {
    margin-top: 8px !important;
    color: var(--color-ink);
}

.role__highlights {
    margin: 12px 0 0;
    padding-left: 18px;
    display: grid;
    gap: 6px;
}

.role__highlights li {
    font-size: 14px;
    line-height: 1.43;
    letter-spacing: -0.224px;
    color: var(--color-slate);
}

.resume__cta {
    margin-top: 32px;
}

@media (max-width: 734px) {
    .resume__block {
        margin-top: 56px;
    }

    .resume__block-title {
        font-size: 32px;
    }

    .job {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}
</style>
