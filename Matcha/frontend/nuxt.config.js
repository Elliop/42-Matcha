export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@plugins/vuetify',
    { src: '@plugins/socket' , ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // Simple usage
    'cookie-universal-nuxt',
 
    // With options
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],
  /*
  ** Build configuration
  */
 build: {
  /*
  ** You can extend webpack config here
  */
  axios: { baseURL: 'http://localhost:6937/auth' },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'data.token' },
          user: { url: 'me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    }
  },
  extend (config, ctx) {},
  babel: {
    presets({isServer}) {
      const targets = isServer ? { node: 'current' } : { ie: 11 }
      return [
        [ require.resolve("@babel/preset-env"), { targets }  ]
      ]
    },
    plugins: [
      "@babel/syntax-dynamic-import",
      "@babel/transform-runtime",
      "@babel/transform-async-to-generator"
    ]
  },
}
}
