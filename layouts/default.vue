<template>
    <v-app>
        <AppHeader />
        <v-main>
            <NuxtPage />
        </v-main>
        <AppFooter />
    </v-app>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>
