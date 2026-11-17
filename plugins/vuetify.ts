// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'portfolio',
      themes: {
        portfolio: {
          dark: true,
          colors: {
            primary: '#6f00ff',
            secondary: '#31007f',
            accent: '#bb99ff',
            background: '#191919',
            surface: '#202020',
            dark: '#191919'
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})
