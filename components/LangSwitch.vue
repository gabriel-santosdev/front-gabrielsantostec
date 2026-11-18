<template>
    <nav class="lang" :aria-label="t('nav.language')">
        <NuxtLink v-for="item in locales" :key="item.code" :to="switchLocalePath(item.code)" :lang="item.language"
            :hreflang="item.language" :title="item.name" class="lang__item"
            :class="{ 'is-active': item.code === locale }" :aria-current="item.code === locale ? 'true' : undefined">
            {{ item.code }}
        </NuxtLink>
    </nav>
</template>

<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<style scoped>
.lang {
    display: inline-flex;
    padding: 3px;
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
}

.lang__item {
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1;
    text-transform: uppercase;
    color: var(--color-subtle);
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 5px;
    transition: color 0.2s ease, background-color 0.2s ease;
}

.lang__item:hover {
    color: var(--color-text);
}

.lang__item.is-active {
    color: #ffffff;
    background: var(--color-primary);
}
</style>
