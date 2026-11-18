<template>
    <v-app>
        <AppHeader />
        <main>
            <NuxtPage />
        </main>
        <AppFooter />
    </v-app>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

const { t, locale, locales } = useI18n()

// lang do <html> conforme o idioma (pt-BR, en-US, es-ES)
useHead(() => ({
    htmlAttrs: { lang: locales.value.find((l) => l.code === locale.value)?.language },
}))

// Links hreflang/canonical e og:locale só com a URL pública definida (NUXT_PUBLIC_SITE_URL):
// sem ela os endereços sairiam incompletos
const { siteUrl } = useRuntimeConfig().public
if (siteUrl) {
    const i18nHead = useLocaleHead({ seo: true })
    useHead(() => ({
        link: [...(i18nHead.value.link || [])],
        meta: [...(i18nHead.value.meta || [])],
    }))
}

useSeoMeta({
    title: () => t('meta.title'),
    description: () => t('meta.description'),
    ogTitle: () => t('meta.title'),
    ogDescription: () => t('meta.description'),
})
</script>
