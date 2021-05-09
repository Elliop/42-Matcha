import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader version "^2.1.1" ,
Vue.use(Vuetify)

export default function (ctx) {
  const vuetify = new Vuetify({
    theme: {
      themes: {
        dark: {
          primary: '#E0234E',
          secondary: '#FCF2F6',
          accent: '#131313',
          info: '#131313'
        },
        light: {
          primary: '#E0234E',
          secondary: '#131313',
          accent: '#f3f2f5',
          info: '#656'
        },
      }
    }
  })
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}