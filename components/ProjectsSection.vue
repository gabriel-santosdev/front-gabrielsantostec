<template>
    <section class="gs-section projects" id="projects">
        <div class="gs-container--wide">
            <div class="gs-section-header">
                <div>
                    <p class="gs-kicker">Portfólio</p>
                    <h2 class="gs-heading">Projetos recentes.</h2>
                </div>
                <a href="#contact" class="gs-link">Quero um projeto assim</a>
            </div>

            <div class="projects__grid">
                <article v-for="(project, index) in projects" :key="project.title" class="project"
                    :class="{ 'project--featured': index === 0 }">
                    <div class="project__text">
                        <p class="gs-small project__type">{{ project.type }}</p>
                        <h3 class="project__title">{{ project.title }}</h3>
                        <p class="gs-body gs-body--muted project__desc">{{ project.description }}</p>
                        <ul class="project__stack">
                            <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
                        </ul>
                        <div class="project__links">
                            <a v-if="project.live" :href="project.live" target="_blank" rel="noopener noreferrer"
                                class="gs-link">Visitar site</a>
                            <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer"
                                class="gs-link">Código</a>
                        </div>
                    </div>
                    <a class="project__media" :href="project.live" target="_blank" rel="noopener noreferrer"
                        :aria-label="`Abrir o site ${project.title}`" tabindex="-1">
                        <img :src="`/projects/${project.image}-1600.webp`"
                            :srcset="`/projects/${project.image}-800.webp 800w, /projects/${project.image}-1600.webp 1600w`"
                            :sizes="index === 0 ? '(max-width: 834px) 100vw, 720px' : '(max-width: 834px) 100vw, 580px'"
                            :alt="`Site ${project.title} exibido em notebook e celular`" width="1600" height="1103"
                            :loading="index === 0 ? 'eager' : 'lazy'" decoding="async" />
                    </a>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
interface Project {
    title: string
    type: string
    description: string
    image: string
    stack: string[]
    repo?: string
    live?: string
}

const projects: Project[] = [
    {
        title: 'Acanto GR',
        type: 'Site institucional',
        description: 'Site institucional para a Acanto GR, com foco em design, clareza da informação e performance.',
        image: 'acanto',
        stack: ['Vue', 'Responsivo', 'SEO'],
        live: 'https://www.acantogr.com.br/',
    },
    {
        title: 'Marechal Segurança',
        type: 'Landing page',
        description:
            'Landing page que destaca serviços e soluções da Marechal Segurança e direciona clientes para o sistema de acompanhamento.',
        image: 'marechal',
        stack: ['Landing page', 'Conversão', 'Responsivo'],
        live: 'https://www.marechalseguranca.com.br/',
    },
    {
        title: 'Carvalho Freire',
        type: 'Site institucional',
        description: 'Site institucional para a Carvalho Freire, com foco em design e performance.',
        image: 'carvalho_freire',
        stack: ['Institucional', 'Performance', 'SEO'],
        live: 'https://carvalhofreire.com.br/',
    },
]
</script>

<style scoped>
.projects {
    background: var(--color-gallery-white);
}

.projects__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--element-gap);
}

.project {
    display: flex;
    flex-direction: column;
    background: var(--color-studio-mist);
    border-radius: var(--radius-cards);
    overflow: hidden;
}

/* Mídia: fundo igual ao estúdio do mockup para a imagem "sumir" na borda */
.project__media {
    order: -1;
    display: block;
    background: #d0d0d0;
    overflow: hidden;
}

.project__media img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1600 / 1103;
    object-fit: cover;
    transform: scale(1.001);
    transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.project:hover .project__media img {
    transform: scale(1.04);
}

.project__text {
    padding: 32px 40px 40px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.project--featured {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
}

.project--featured .project__media {
    order: 2;
}

.project--featured .project__media img {
    height: 100%;
    aspect-ratio: auto;
    min-height: 420px;
}

.project--featured .project__text {
    padding: 56px;
    justify-content: center;
}

.project__type {
    margin-bottom: 8px;
}

.project__title {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 600;
    line-height: 1.125;
    letter-spacing: 0.004em;
    color: var(--color-ink);
    margin: 0;
}

.project--featured .project__title {
    font-size: 40px;
    line-height: 1.1;
}

.project__desc {
    margin-top: 12px;
}

.project__stack {
    list-style: none;
    margin: 20px 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
}

.project__stack li {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.12px;
    color: var(--color-slate);
}

.project__links {
    display: flex;
    gap: 24px;
    margin-top: auto;
    padding-top: 24px;
}

@media (max-width: 834px) {
    .projects__grid {
        grid-template-columns: 1fr;
    }

    .project--featured {
        display: flex;
    }

    .project--featured .project__media {
        order: -1;
    }

    .project--featured .project__media img {
        height: auto;
        min-height: 0;
        aspect-ratio: 1600 / 1103;
    }

    .project__text,
    .project--featured .project__text {
        padding: 28px var(--card-padding) var(--card-padding);
    }

    .project__title,
    .project--featured .project__title {
        font-size: 28px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .project__media img {
        transition: none;
    }
}
</style>
