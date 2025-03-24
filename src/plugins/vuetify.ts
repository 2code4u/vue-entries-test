import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { ru } from 'vuetify/locale'

import "@mdi/font/css/materialdesignicons.css"



const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput
  },
  directives,
  ...{
    locale: {
      // locale: 'ru',
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#4272cf',
            secondary: '#603333',
            accent: '#58B873',
            error: '#FFD5D6'
          }
        }
      }
    }
  }
})

export default vuetify
