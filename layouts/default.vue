<template>
    <v-app>
        <Navbar />
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
</script>
