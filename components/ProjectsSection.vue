<template>
    <section id="projects" ref="sectionRef" class="py-16">
        <h2 class="text-4xl font-bold text-center mb-12" :style="{ color: primary }">
            Meus Projetos
        </h2>

        <v-container>
            <v-row dense>
                <v-col v-for="(project, index) in projects" :key="index" cols="12" sm="6" md="4">
                    <v-card class="project-card" :class="{ visible: isVisible }"
                        :style="{ backgroundColor: cardBackground, animationDelay: `${index * 0.2}s` }">
                        <v-img :src="project.image" height="200" cover class="rounded-t-xl" />

                        <v-card-text class="text-white">
                            <h3 class="text-2xl font-semibold mb-2">
                                {{ project.title }}
                            </h3>
                            <p class="text-base opacity-80">
                                {{ project.description }}
                            </p>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-actions class="justify-end">
                            <v-btn icon :href="project.repo" target="_blank" class="hover-btn">
                                <v-icon color="white">mdi-github</v-icon>
                            </v-btn>
                            <v-btn icon :href="project.live" target="_blank" class="hover-btn">
                                <v-icon color="white">mdi-web</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const primary = '#6f00ff'
const cardBackground = 'rgba(25, 25, 25, 0.8)'

interface Project {
    title: string
    description: string
    image: string
    repo: string
    live: string
}

const projects: Project[] = [
    {
        title: 'Projeto 1',
        description: 'Descrição breve do projeto 1.',
        image: 'https://source.unsplash.com/random/800x600?technology',
        repo: 'https://github.com/exemplo/projeto1',
        live: 'https://exemplo.com/projeto1'
    },
    {
        title: 'Projeto 2',
        description: 'Descrição breve do projeto 2.',
        image: 'https://source.unsplash.com/random/800x600?design',
        repo: 'https://github.com/exemplo/projeto2',
        live: 'https://exemplo.com/projeto2'
    },
    {
        title: 'Projeto 3',
        description: 'Descrição breve do projeto 3.',
        image: 'https://source.unsplash.com/random/800x600?code',
        repo: 'https://github.com/exemplo/projeto3',
        live: 'https://exemplo.com/projeto3'
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
.text-white {
    color: #f2f2f2;
}

.project-card {
    cursor: pointer;
    border-radius: 1rem;
    overflow: hidden;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transform: translateY(50px);
    opacity: 0;
    transition: transform 0.8s ease, opacity 0.8s ease, box-shadow 0.5s ease;
}

.project-card.visible {
    transform: translateY(0);
    opacity: 1;
}

/* Hover sofisticado */
.project-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(111, 0, 255, 0.15), rgba(111, 0, 255, 0));
    opacity: 0;
    transition: opacity 0.5s ease;
}

.project-card:hover::before {
    opacity: 1;
}

.project-card:hover {
    transform: translateY(-12px) rotateZ(-0.8deg) scale(1.03);
    box-shadow: 0 16px 40px rgba(111, 0, 255, 0.5);
}

/* Ícones animados */
.hover-btn {
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.hover-btn:hover {
    background-color: rgba(111, 0, 255, 0.2);
    transform: scale(1.2);
}

.opacity-80 {
    opacity: 0.8;
}

@media (max-width: 600px) {
    .project-card {
        border-radius: 0.75rem;
    }

    .project-card:hover {
        transform: translateY(-6px) scale(1.015);
    }

    .text-white h3 {
        font-size: 1.25rem;
    }
}
</style>