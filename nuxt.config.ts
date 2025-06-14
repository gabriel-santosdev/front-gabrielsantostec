import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Gabriel Santos - Desenvolvedor Frontend',
      link: [
        { rel: 'icon', type: 'image/x-icon', sizes: '16x16', href: '/favicon.png' }
      ],
      htmlAttrs: {
        lang: 'pt-BR',
      }
    }
  },
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
