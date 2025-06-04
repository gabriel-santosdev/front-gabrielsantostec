<template>
    <v-container>
        <v-card v-for="repo in repos" :key="repo.id" class="mb-3">
            <v-card-title>{{ repo.name }}</v-card-title>
            <v-card-text>{{ repo.description }}</v-card-text>
            <v-card-actions>
                <v-btn :href="repo.html_url" target="_blank">Ver no GitHub</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
const { data: repos } = await useGithubApi('gabriel-santosdev')
</script>