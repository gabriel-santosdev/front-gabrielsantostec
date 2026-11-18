import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      // título, descrição e lang vêm do i18n (layouts/default.vue)
      meta: [
        { name: 'theme-color', content: '#191919' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', sizes: '16x16', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap' }
      ],
    }
  },
  css: ['~/assets/css/main.css'],
  i18n: {
    // pt sem prefixo (/), inglês em /en e espanhol em /es
    strategy: 'prefix_except_default',
    defaultLocale: 'pt',
    locales: [
      { code: 'pt', language: 'pt-BR', name: 'Português', file: 'pt.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    // Sempre abre em português; inglês e espanhol só pelo seletor de idioma
    detectBrowserLanguage: false,
    // URL pública do site, usada nas tags hreflang/canonical (defina na Vercel)
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    // Alguns textos (estáticos, nossos) têm <strong> e são renderizados com v-html
    compilation: { strictMessage: false },
    bundle: { optimizeTranslationDirective: false },
  },
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {
      // URL pública (ex.: https://seudominio.com). Sem ela, as tags hreflang não são geradas.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
      newsApiKey: import.meta.env.NEWS_API_KEY,
      formEndpoint: import.meta.env.NUXT_PUBLIC_FORMSPREE_ENDPOINT,
      motion: {
        directives: {
          'pop-bottom': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            }
          }
        }
      }
    }
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/i18n',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
