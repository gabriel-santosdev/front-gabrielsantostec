<template>
    <v-container class="text-center py-10">
        <v-row justify="center">
            <v-col cols="12" md="4">
                <div v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, scale: 1 }"
                    :variants="{ custom: { scale: 2 } }" :hovered="{ scale: 1.2 }" :delay="200" :duration="1200" />
                <v-hover v-slot:default="{ isHovering, props }">
                    <div v-motion-slide-visible-once-bottom="props">
                        <v-avatar size="250" class="elevation-5" :class="{ 'scale-up': isHovering }"
                            image="../public/profile_2.jpeg">
                        </v-avatar>
                    </div>
                </v-hover>


            </v-col>
            <v-col cols="12" md="8" class="d-flex flex-column justify-center">
                <h1 class="mb-4">Sobre Mim</h1>
                <p>
                    Olá! Sou Gabriel Santos, um desenvolvedor Front-End apaixonado por criar interfaces intuitivas e
                    acessíveis.
                    Tenho experiência com Vue.js, Nuxt e Vuetify, focando sempre em boas práticas e performance.
                </p>
                <blockquote class="mt-4">
                    "Transformo ideias em interfaces intuitivas e funcionais."
                </blockquote>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-timeline>
                    <v-timeline-item dot-color="primary" icon="mdi-school">
                        <strong>2020 - 2022</strong>: Graduação em Sistemas de Informação.
                    </v-timeline-item>
                    <v-timeline-item dot-color="success" icon="mdi-briefcase">
                        <strong>2023 - atual</strong>: Desenvolvedor Front-End na Empresa X.
                    </v-timeline-item>
                    <v-timeline-item dot-color="success" icon="mdi-briefcase">
                        <strong>2023 - atual</strong>: Desenvolvedor Front-End na Empresa X.
                    </v-timeline-item>
                    <v-timeline-item dot-color="success" icon="mdi-briefcase">
                        <strong>2023 - atual</strong>: Desenvolvedor Front-End na Empresa X.
                    </v-timeline-item>
                    <v-timeline-item dot-color="success" icon="mdi-briefcase">
                        <strong>2023 - atual</strong>: Desenvolvedor Front-End na Empresa X.
                    </v-timeline-item>
                </v-timeline>

            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
// Nada extra necessário aqui por enquanto.
</script>

<style scoped>
.scale-up {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}
</style>