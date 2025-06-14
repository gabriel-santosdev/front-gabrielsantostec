<template>
    <v-footer color="dark" dark class="py-6" id="footer">
        <v-container class="text-center">
            &copy; {{ currentYear }} gabrielsantos.tec Todos os direitos reservados.
        </v-container>
    </v-footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>