export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'credit-card-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  plugins: [

      ],
  

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [

  ],
  buildDir:"dist",
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },
  router: {
    extendRoutes(routes) {
      routes.push({
        name: 'not-found',
        path: '*',
        component: '~/pages/404.vue',
      }) // 404 yönlendirme
      /* routes.push({name: 'virgo-webview', path: '/virtual-oyunlar-webview', component: '~/pages/virgo-coming-soon/index.vue'}) // misli arena başkasının profili */
    },
  },
}
