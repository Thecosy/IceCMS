// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // CSS配置
  css: ['~/assets/css/tailwind.css'],
  
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
      ],
      // 关键CSS内联，防止闪烁
      style: [
        {
          innerHTML: `
            html { height: 100%; }
            body { 
              margin: 0; 
              padding: 0; 
              min-height: 100%; 
              background-color: #f8fafc;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              transition: background-color 0.3s ease;
              line-height: 1.6;
            }
            .dark body { background-color: #1f2937; }
            
            /* 防止内容闪烁 */
            #__nuxt { opacity: 0; transition: opacity 0.3s ease; }
            #__nuxt.hydrated { opacity: 1; }
            
            /* 基础样式 */
            * { box-sizing: border-box; }
            .min-h-screen { min-height: 100vh; }
            .bg-base-100 { background-color: #f8fafc; }
            .dark .bg-base-100 { background-color: #1f2937; }
            
            /* 骨架屏动画 */
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: .5; }
            }
            .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            
            /* 基础布局 */
            .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .text-center { text-align: center; }
            .hidden { display: none; }
            .relative { position: relative; }
            .absolute { position: absolute; }
            .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
            
            /* 文字样式 */
            .text-white { color: #ffffff; }
            .text-gray-900 { color: #111827; }
            .text-gray-600 { color: #4b5563; }
            .text-gray-400 { color: #9ca3af; }
            .dark .text-white { color: #ffffff; }
            .dark .text-gray-900 { color: #f9fafb; }
            .dark .text-gray-600 { color: #d1d5db; }
            .dark .text-gray-400 { color: #9ca3af; }
            
            /* 背景样式 */
            .bg-white { background-color: #ffffff; }
            .bg-gray-800 { background-color: #1f2937; }
            .bg-gray-200 { background-color: #e5e7eb; }
            .bg-gray-700 { background-color: #374151; }
            .dark .bg-white { background-color: #1f2937; }
            .dark .bg-gray-800 { background-color: #111827; }
            
            /* 圆角 */
            .rounded { border-radius: 0.25rem; }
            .rounded-lg { border-radius: 0.5rem; }
            .rounded-full { border-radius: 9999px; }
            
            /* 阴影 */
            .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
            
            /* 间距 */
            .p-4 { padding: 1rem; }
            .p-6 { padding: 1.5rem; }
            .p-8 { padding: 2rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            
            /* 宽高 */
            .w-full { width: 100%; }
            .h-48 { height: 12rem; }
            .h-4 { height: 1rem; }
            .h-6 { height: 1.5rem; }
            .h-8 { height: 2rem; }
            .w-3\/4 { width: 75%; }
            .w-1\/2 { width: 50%; }
            
            /* Grid */
            .grid { display: grid; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .gap-6 { gap: 1.5rem; }
            
            /* Responsive */
            @media (min-width: 640px) {
              .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            }
            @media (min-width: 1024px) {
              .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            }
          `
        }
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
  
  // 路由配置
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  
  // 服务端渲染配置
  ssr: true,
  
  // 运行时配置
  runtimeConfig: {
    // 私有配置（仅服务端可用）
    apiSecret: process.env.API_SECRET,
    
    // 公共配置（客户端和服务端都可用）
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8181/',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Ideaflow Blog'
    }
  },
  
  // Vite配置
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/css/tailwind.css";'
        }
      }
    }
  },
  
  // Nitro配置
  nitro: {
    compressPublicAssets: true,
    minify: true
  },
  
  // 实验性特性
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: true
  },
  
  // PostCSS配置（替代postcss.config.js）
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
