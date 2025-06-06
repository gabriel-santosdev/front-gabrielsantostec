// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#6f00ff',
            secondary: '#31007f',
            background: '#f2f2f2',
            surface: '#ffffff',
            dark: '#191919'
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})