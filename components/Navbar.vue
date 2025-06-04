<template>
    <v-app>
        <!-- Menu lateral -->
        <v-navigation-drawer app v-model="drawer" :permanent="!isMobile" :temporary="isMobile" color="#191919"
            class="pa-2">
            <v-list-item subtitle="Desenvolvedor Front-End">
                <v-list-item-avatar>
                    <img src="../public/logo-gs.png" alt="Avatar" width="120" height="30" />
                </v-list-item-avatar>
            </v-list-item>
            <v-divider />
            <v-list>
                <v-list-item to="/" prepend-icon="mdi-home" title="Início" exact />
                <v-list-item to="/skills" prepend-icon="mdi-code-json" title="Habilidades" />
                <v-list-item to="/projects" prepend-icon="mdi-briefcase" title="Projetos" />
                <v-list-item to="/news" prepend-icon="mdi-newspaper" title="Notícias" />
                <v-list-item to="/contact" prepend-icon="mdi-email" title="Contato" />
                <v-list-item to="/about" prepend-icon="mdi-account" title="Sobre Mim" />
            </v-list>
        </v-navigation-drawer>

        <!-- Barra superior -->
        <v-app-bar app color="#31007f">
            <v-app-bar-nav-icon @click="drawer = !drawer" v-if="isMobile" />
            <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
        </v-app-bar>

        <!-- Conteúdo -->
        <v-main>
            <v-container class="py-4">
                <NuxtPage />
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'

const drawer = ref(false)

// Detectar se é mobile usando Vuetify breakpoints
const { mdAndDown } = useDisplay()
const isMobile = computed(() => mdAndDown.value)


const route = useRoute()
const pageTitle = computed(() => {
    // Obter o título da página atual

    const titles: Record<string, string> = {
        '/': 'Início',
        '/skills': 'Habilidades',
        '/projects': 'Projetos',
        '/news': 'Notícias',
        '/contact': 'Contato',
        '/about': 'Sobre Mim'
    }

    return titles[route.path] || 'Meu Portfólio'
})

// Ajustar automaticamente o estado do menu

onMounted(() => {
    drawer.value = !isMobile.value
})


watch(isMobile, (value) => {
    if (value) {
        drawer.value = false
    } else {
        drawer.value = true
    }
}, { immediate: true }) 
</script>