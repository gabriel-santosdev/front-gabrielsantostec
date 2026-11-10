import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Gabriel Santos | Software Engineer Full Stack',
      meta: [
        {
          name: 'description',
          content: 'Gabriel Santos, Software Engineer Full Stack com mais de 4 anos de experiência em Laravel, Node.js, Vue, React, Angular e TypeScript. Currículo, projetos, serviços e skills de front-end para agentes de IA.'
        },
        { name: 'theme-color', content: '#ffffff' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', sizes: '16x16', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap' }
      ],
      htmlAttrs: {
        lang: 'pt-BR',
      }
    }
  },
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {
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
      }),
      ['@vueuse/motion/nuxt'],
      ['motion-v/nuxt']
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
