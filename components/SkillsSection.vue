<template>
    <section class="gs-section gs-section--mist" id="stack">
        <div class="gs-container">
            <div class="gs-section-header">
                <h2 class="gs-heading">Stack.</h2>
                <a href="https://github.com/gabriel-santosdev" target="_blank" rel="noopener noreferrer"
                    class="gs-link">Ver código no GitHub</a>
            </div>

            <div class="skills__grid">
                <article v-for="group in groups" :key="group.title" class="gs-card skills__card">
                    <i :class="['mdi', group.icon, 'skills__icon']" aria-hidden="true"></i>
                    <h3 class="gs-feature-heading">{{ group.title }}</h3>
                    <p class="gs-small skills__desc">{{ group.description }}</p>
                    <ul class="skills__list">
                        <li v-for="item in group.items" :key="item">{{ item }}</li>
                    </ul>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const groups = [
    {
        title: 'Linguagens',
        icon: 'mdi-code-tags',
        description: 'A base de toda interface web.',
        items: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'HTML', 'CSS'],
    },
    {
        title: 'Back-end e arquitetura',
        icon: 'mdi-server-outline',
        description: 'APIs, regras de negócio e integração entre serviços.',
        items: ['PHP e Laravel', 'Node.js (BFF)', 'APIs REST', 'SQL e modelagem de dados', 'Micro Frontends', 'GCP'],
    },
    {
        title: 'Front-end',
        icon: 'mdi-layers-outline',
        description: 'Aplicações reativas, SSR, SSG e PWA.',
        items: ['Vue.js 2 e 3', 'Nuxt', 'React', 'Next.js', 'Angular'],
    },
    {
        title: 'UI e Design Systems',
        icon: 'mdi-palette-outline',
        description: 'Componentes consistentes, documentados e escaláveis.',
        items: ['Storybook', 'SCSS', 'Material-UI', 'Vuetify', 'i18n', 'HubSpot / HubL'],
    },
    {
        title: 'Qualidade',
        icon: 'mdi-check-decagram-outline',
        description: 'Código confiável do primeiro commit ao deploy.',
        items: ['Jest', 'Vitest', 'Cypress (E2E)', 'Code review', 'Clean Code', 'Performance'],
    },
    {
        title: 'Inteligência Artificial',
        icon: 'mdi-creation-outline',
        description: 'IA aplicada a produtos reais.',
        items: ['MCP (Model Context Protocol)', 'Chat com IA', 'Relatórios com IA'],
    },
]
</script>

<style scoped>
.skills__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--element-gap);
}

.skills__card {
    padding: 40px;
}

.skills__icon {
    display: block;
    font-size: 32px;
    line-height: 1;
    color: var(--color-ink);
    margin-bottom: 20px;
}

.skills__desc {
    margin-top: 8px;
}

.skills__list {
    list-style: none;
    margin: 28px 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skills__list li {
    font-size: 14px;
    line-height: 1.29;
    letter-spacing: -0.224px;
    color: var(--color-ink);
    padding: 8px 14px;
    border-radius: var(--radius-buttons);
    box-shadow: inset 0 0 0 1px var(--color-hairline-silver);
}

@media (max-width: 734px) {
    .skills__grid {
        grid-template-columns: 1fr;
    }

    .skills__card {
        padding: var(--card-padding);
    }
}
</style>
