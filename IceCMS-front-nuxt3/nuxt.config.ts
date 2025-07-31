// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config.js

import { resolve } from 'path'

export default defineNuxtConfig({
  srcDir: 'src/',
  alias: {
    '@': resolve('./src') // 确保路径正确
  },
  // ssr: false,  // 确保启用服务端渲染（如果你需要）
  // pages: true,  // 确保页面功能没有被禁用
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL
    }
  },
  // mermaid fix
  vite: {
    optimizeDeps: {
      include: [
        'vue3-emoji-picker'
      ]
    }
  },
  app: {
    head: {
      title: 'IceCMS',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'content-language', content: 'zh-cn' },
        { hid: 'description', name: 'description', content: 'IceCMS内容管理系统。' },
        { hid: 'keywords', name: 'keywords', content: 'vuejs,web前端,前端开发,前端面试,web开发,个人博客,前端博客' },
        // { name: 'referrer', content: 'no-referrer-when-downgrade' }, // 解决其他开启网站防盗链功能,全局会导致百度统计失效

      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },
  nitro: {
    devProxy: {
      '/api/': {
        // target: BASIC_URL,
        changeOrigin: true
      }
    }
  },
  css: [
    './src/static/mycss/top.css',
    './src/static/mycss/body.css',
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css',
  ],
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt'

  ],
  compatibilityDate: '2024-11-01',
  plugins: ['./plugins/initSettings.ts',
    './plugins/main.ts', 
  ],

  devtools: { enabled: true }
})
