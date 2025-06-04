<template>
    <v-container>
        <v-card v-for="article in news?.articles || []" :key="article.url" class="mb-3">
            <v-card-title>{{ article.title }}</v-card-title>
            <v-card-text>{{ article.description }}</v-card-text>
            <v-card-actions>
                <v-btn :href="article.url" target="_blank">Leia mais</v-btn>
            </v-card-actions>
        </v-card>


        <v-alert v-if="error" type="error">
            Ocorreu um erro ao carregar as notícias.
        </v-alert>
    </v-container>
</template>

<script setup lang="ts">
const { data: news, error } = await useNewsApi()
</script>
