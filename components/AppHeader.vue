<template>
    <v-app-bar app color="dark" dark elevate-on-scroll fixed>
        <v-container class="d-flex align-center justify-space-between">
            <v-img src="../public/logo-gs.png" alt="Logo" class="logo" contain />

            <!-- Navegação Desktop -->
            <div class="d-none d-lg-flex">
                <v-btn v-for="item in navItems" :key="item.href" :href="item.href" text class="text-uppercase mx-2">
                    {{ item.label }}
                </v-btn>
            </div>

            <!-- Menu Mobile -->
            <v-menu class="d-flex d-lg-none">
                <template #activator="{ props }">
                    <v-btn icon v-bind="props" class="d-lg-none d-flex">
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="item in navItems" :key="item.href" :href="item.href" class="text-uppercase">
                        <v-list-item-title>{{ item.label }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-container>
    </v-app-bar>
</template>

<script setup lang="ts">
const navItems = [
    { label: 'Início', href: '#hero' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Serviços', href: '#services' },
    { label: 'Contato', href: '#contact' },
]
</script>

<style scoped>
.logo {
    height: 40px;
    max-width: 120px;
}

@media (max-width: 600px) {
    .logo {
        height: 30px;
        max-width: 80px;
    }
}
</style>