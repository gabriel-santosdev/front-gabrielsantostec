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
            primary: '#0071e3',
            secondary: '#0066cc',
            background: '#ffffff',
            surface: '#ffffff',
            dark: '#1d1d1f'
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})