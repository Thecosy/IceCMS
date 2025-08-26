// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // 开发服务器配置
  devServer: {
    port: 3000
  },
  
  // 模块配置
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  
  // App配置
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    }
  },
  
  // 组件自动导入
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  
  // 自动导入
  imports: {
    dirs: ['stores/**']
  },
  
  // Pinia配置
  pinia: {
    storesDirs: ['./stores/**']
  },
  
  // 服务端渲染配置 - 暂时禁用避免hydration问题
  ssr: false,
  
  // 运行时配置
  runtimeConfig: {
    // 私有配置（仅服务端可用）
    apiSecret: process.env.API_SECRET,
    
    // 公共配置（客户端和服务端都可用）
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8181/',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3004',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Hao Blog'
    }
  },
  
  // Nitro配置
  nitro: {
    compressPublicAssets: true,
    minify: true,
    port: process.env.PORT || process.env.NUXT_PORT || 3004,
    host: process.env.HOST || '0.0.0.0'
  },
  
  // 实验性特性
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: true
  }
})
