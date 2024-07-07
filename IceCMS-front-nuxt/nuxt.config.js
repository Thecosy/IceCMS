export default {
  srcDir: 'src/',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'IceCMS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'content-language', content: 'zh-cn' },
      { hid: 'description', name: 'description', content: '书写心得,分享感悟。' },
      { hid: 'keywords', name: 'keywords', content: 'javascript技术分享,js技术,vuejs,web前端,前端开发,前端面试,web开发,dsiab,个人博客,前端博客' },
      // { name: 'referrer', content: 'no-referrer-when-downgrade' }, // 解决其他开启网站防盗链功能,全局会导致百度统计失效

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  server: {
    port: 3001,
    host: "0.0.0.0" // 默认为当前ip
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    './assets/css/common.css',
    'element-ui/lib/theme-chalk/index.css',
    './src/static/mycss/top.css',
    './src/static/mycss/body.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    { src: '~/plugins/initial-request', ssr: false }, // 注册插件并启用服务器端渲染 (ssr)
    { src: '~/plugins/global.js', ssr: true },
    { src: '@/plugins/qriously', ssr: false },
    { src: './plugins/tongji.js' },
    { src: '~/plugins/vue-coreVideo-player.js', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'cookie-universal-nuxt',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    '@nuxtjs/proxy',
    '@nuxtjs/component-cache',
    // 缓存配置选项
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }]
  ],
  hooks:{
    // 去除window._nuxt文件
    // 'vue-renderer:ssr:context'(context){
    //   const routePath = JSON.stringify(context.nuxt.routePath)
    //   context.nuxt = {serverRendered: true,routePath}
    // }
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/bootService': {
      // target: 'http://localhost:8091/'
      target: 'http://admin.dsiab.com/'
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel:{        //配置按需引入规则
      "plugins":[
          [
              "component",
              {
                  "libraryName":"element-ui",
                  "styleLibraryName":"theme-chalk"
              }
          ]
      ]
  },


    transpile: [/^element-ui/],
    cssSourceMap: false,
    extractCSS: true, // 将页面css单独打包
  },
  // loading: '~/components/common/loading.vue'
}
