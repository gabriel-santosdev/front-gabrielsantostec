import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

const securityHeaders = {
  'Content-Security-Policy': "base-uri 'self'; object-src 'none'; frame-ancestors 'none'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
}

export default defineNuxtConfig({
  app: {
    head: {
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
  typescript: {
    tsConfig: { exclude: ['../video'] },
  },
  routeRules: {
    '/**': { headers: securityHeaders },
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'pt',
    locales: [
      { code: 'pt', language: 'pt-BR', name: 'Português', file: 'pt.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    detectBrowserLanguage: false,
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    // Alguns textos estáticos têm <strong> e são renderizados com v-html
    compilation: { strictMessage: false },
    bundle: { optimizeTranslationDirective: false },
  },
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
      formEndpoint: import.meta.env.NUXT_PUBLIC_FORMSPREE_ENDPOINT,
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
