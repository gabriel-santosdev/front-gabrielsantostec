<template>
    <section class="gs-section projects" id="projects">
        <div class="gs-container--wide">
            <div class="gs-section-header" v-reveal>
                <div>
                    <p class="gs-kicker">03. projetos</p>
                    <h2 class="gs-heading">Projetos recentes.</h2>
                    <p class="gs-body gs-body--muted gs-section-header__lead">
                        Sites no ar, feitos para clientes reais, com foco em design, performance e SEO.
                    </p>
                </div>
                <a href="#contact" class="gs-link">Quero um projeto assim</a>
            </div>

            <div class="projects__grid">
                <article v-for="(project, index) in projects" :key="project.title" v-reveal="index === 0 ? 0 : (index - 1) * 100"
                    class="project" :class="{ 'project--featured': index === 0 }">
                    <!-- Mockup de navegador -->
                    <a class="browser" :href="project.live" target="_blank" rel="noopener noreferrer"
                        :aria-label="`Abrir o site ${project.title}`" tabindex="-1">
                        <div class="browser__bar">
                            <span class="gs-window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
                            <span class="browser__url">
                                <i class="mdi mdi-lock-outline" aria-hidden="true"></i>{{ domain(project.live) }}
                            </span>
                        </div>
                        <div class="browser__view">
                            <img :src="`/projects/${project.image}-1600.webp`"
                                :srcset="`/projects/${project.image}-800.webp 800w, /projects/${project.image}-1600.webp 1600w`"
                                :sizes="index === 0 ? '(max-width: 1024px) 100vw, 680px' : '(max-width: 834px) 100vw, (max-width: 1024px) 50vw, 400px'"
                                :alt="`Site ${project.title} exibido em notebook e celular`" width="1600" height="1103"
                                :loading="index === 0 ? 'eager' : 'lazy'" decoding="async" />
                        </div>
                    </a>

                    <div class="project__text">
                        <p class="project__meta">
                            <span class="project__index">{{ String(index + 1).padStart(2, '0') }}</span>
                            {{ project.type }}
                        </p>
                        <h3 class="project__title">{{ project.title }}</h3>
                        <p class="gs-body gs-body--muted project__desc">{{ project.description }}</p>
                        <ul class="project__stack">
                            <li v-for="tech in project.stack" :key="tech" class="gs-tag">{{ tech }}</li>
                        </ul>
                        <div class="project__links">
                            <a v-if="project.live" :href="project.live" target="_blank" rel="noopener noreferrer"
                                class="project__link" :aria-label="`Visitar o site ${project.title}`">
                                <i class="mdi mdi-open-in-new" aria-hidden="true"></i> Visitar site
                            </a>
                            <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer"
                                class="project__link" :aria-label="`Código de ${project.title} no GitHub`">
                                <i class="mdi mdi-github" aria-hidden="true"></i> Código
                            </a>
                        </div>
                    </div>
                </article>
            </div>

            <div class="projects__more" v-reveal>
                <p class="gs-small">Mais código e experimentos no GitHub.</p>
                <a href="https://github.com/gabriel-santosdev" target="_blank" rel="noopener noreferrer"
                    class="gs-btn gs-btn--outline gs-btn--sm"><i class="mdi mdi-github" aria-hidden="true"></i>
                    github.com/gabriel-santosdev</a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { projects } from '~/data/portfolio'

function domain(url?: string): string {
    if (!url) return ''
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}
</script>

<style scoped>
.projects__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
}

.project {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: border-color 0.3s ease, transform 0.3s var(--ease-out);
}

.project:hover {
    border-color: rgba(187, 153, 255, 0.35);
}

/* ---------- Mockup de navegador ---------- */
.browser {
    display: block;
    margin: 16px 16px 0;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    border: 1px solid var(--color-border);
    border-bottom: 0;
    overflow: hidden;
    background: var(--color-bg-deep);
    text-decoration: none;
}

.browser__bar {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 14px;
    background: var(--color-surface-2);
    border-bottom: 1px solid var(--color-border);
}

.browser__url {
    flex: 1;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-muted);
    background: var(--color-bg);
    border-radius: 6px;
    padding: 5px 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.browser__url .mdi {
    color: var(--color-success);
    font-size: 12px;
}

.browser__view {
    overflow: hidden;
    background: #d0d0d0;
}

.browser__view img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1600 / 1103;
    object-fit: cover;
    transform: scale(1.001);
    transition: transform 0.8s var(--ease-out);
}

.project:hover .browser__view img {
    transform: scale(1.04);
}

/* ---------- Texto ---------- */
.project__text {
    padding: 28px 32px 32px;
    display: flex;
    flex-direction: column;
    flex: 1;
    border-top: 1px solid var(--color-border);
}

.project__meta {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-muted);
    margin: 0 0 10px;
}

.project__index {
    color: var(--color-accent);
}

.project__index::after {
    content: '/';
    color: var(--color-subtle);
    margin-left: 10px;
}

.project__title {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.025em;
    color: var(--color-text);
    margin: 0;
}

.project__desc {
    margin-top: 12px;
    font-size: 15px;
}

.project__stack {
    list-style: none;
    margin: 20px 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.project__links {
    display: flex;
    gap: 20px;
    margin-top: auto;
    padding-top: 24px;
}

.project__link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.2s ease;
}

.project__link .mdi {
    font-size: 16px;
    color: var(--color-accent);
}

.project__link:hover {
    color: var(--color-accent);
}

/* ---------- Destaque ---------- */
.project--featured {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
}

.project--featured .browser {
    order: 2;
    margin: 24px 0 0 0;
    border-right: 0;
    border-radius: var(--radius-md) 0 0 0;
    align-self: end;
}

.project--featured .project__text {
    padding: 48px;
    justify-content: center;
    border-top: 0;
}

.project--featured .project__title {
    font-size: clamp(32px, 3.4vw, 44px);
}

.project--featured .project__desc {
    font-size: 17px;
}

.projects__more {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 48px;
}

@media (max-width: 1024px) {
    .project--featured {
        display: flex;
    }

    .project--featured .browser {
        order: 0;
        margin: 16px 16px 0;
        border-right: 1px solid var(--color-border);
        border-radius: var(--radius-md) var(--radius-md) 0 0;
    }

    .project--featured .project__text {
        padding: 32px;
        border-top: 1px solid var(--color-border);
    }
}

@media (max-width: 1024px) {
    .projects__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 834px) {
    .projects__grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 734px) {

    .project__text,
    .project--featured .project__text {
        padding: 24px var(--card-padding) var(--card-padding);
    }

    .browser,
    .project--featured .browser {
        margin: 12px 12px 0;
    }

    .project__title,
    .project--featured .project__title {
        font-size: 26px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .browser__view img {
        transition: none;
    }
}
</style>
