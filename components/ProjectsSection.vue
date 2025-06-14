<template>
    <section id="projects" ref="sectionRef" class="py-16">
        <h2 class="text-4xl font-bold text-center mb-12 title-section-project" :style="{ color: primary }">
            Projetos Recentes
        </h2>

        <v-container>
            <v-row dense>
                <v-col v-for="(project, index) in projects" :key="index" cols="12" class="d-flex flex-column mb-6">
                    <v-card class="project-card gap-3" variant="text" :class="{ visible: isVisible }" :style="{
                        backgroundImage: `url(${project.image})`,
                        animationDelay: `${index * 0.2}s`
                    }">
                        <div class="info-overlay text-black">
                            <h3>{{ project.title }}</h3>
                            <p>{{ project.description }}</p>

                            <div class="flex justify-end gap-2">
                                <v-tooltip
                                    :text="project.repo ? 'Repositório no GitHub' : 'Repositório Privado por questões legais'"
                                    location="top">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" icon :href="project.repo" target="_blank"
                                            class="hover-btn mr-2">
                                            <v-icon>mdi-github</v-icon>
                                        </v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip
                                    :text="project.live ? 'Acessar site' : 'Site não disponível por questões legais'"
                                    location="top">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" icon :href="project.live" target="_blank"
                                            class="hover-btn">
                                            <v-icon>mdi-web</v-icon>
                                        </v-btn>
                                    </template>
                                </v-tooltip>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const primary = '#6f00ff'

interface Project {
    title: string
    description: string
    image: string
    repo: string
    live: string
}

const projects: Project[] = [
    {
        title: 'Acanto GR',
        description: 'Site institucional para a Acanto GR, com foco em design e performance.',
        image: 'acanto.png',
        repo: '',
        live: 'https://www.acantogr.com.br/'
    },
    {
        title: 'Marechal Segurança',
        description: 'Descrição breve do projeto 2.',
        image: 'marechal.png',
        repo: '',
        live: 'https://www.marechalseguranca.com.br/'
    },
    {
        title: 'Carvalho Freire',
        description: 'Descrição breve do projeto 3.',
        image: 'carvalho_freire.png',
        repo: '',
        live: 'https://carvalhofreire.com.br/'
    }
]

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

let observer: IntersectionObserver

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                isVisible.value = entry.isIntersecting
            })
        },
        {
            threshold: 0.2
        }
    )

    if (sectionRef.value) {
        observer.observe(sectionRef.value)
    }
})

onBeforeUnmount(() => {
    if (sectionRef.value) {
        observer.unobserve(sectionRef.value)
    }
})
</script>

<style scoped>
.title-section-project {
    font-weight: 600;
    font-size: 2.5rem;
}

.title-section-project::after {
    content: '';
    width: 60px;
    height: 4px;
    background: #191919;
    display: block;
    margin: 12px auto 0;
    border-radius: 2px;
}

.project-card {
    position: relative;
    height: 420px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-clip: border-box;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    transform: translateY(50px);
    opacity: 0;
    transition: transform 0.8s ease, opacity 0.8s ease, box-shadow 0.5s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.project-card.visible {
    transform: translateY(0);
    opacity: 1;
}

.project-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(111, 0, 255, 0.15), rgba(111, 0, 255, 0));
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 1;
}

.project-card:hover::before {
    opacity: 1;
}

.project-card:hover {
    transform: translateY(-12px) rotateZ(-0.8deg) scale(1.03);
    box-shadow: 0 16px 40px rgba(111, 0, 255, 0.5);
}

.info-overlay {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    padding: 1rem;
    backdrop-filter: blur(2px);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    z-index: 2;
    transition: all 0.3s ease;
}

.info-overlay h3 {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
}

.info-overlay p {
    font-size: 0.9rem;
    line-height: 1.3;
}

.hover-btn {
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.hover-btn:hover {
    background-color: rgba(111, 0, 255, 0.2);
    transform: scale(1.2);
}

@media (max-width: 600px) {
    .project-card {
        border-radius: 0.75rem;
    }

    .project-card:hover {
        transform: translateY(-6px) scale(1.015);
    }

    .info-overlay {
        padding: 0.75rem;
        font-size: 0.85rem;
    }
}
</style>