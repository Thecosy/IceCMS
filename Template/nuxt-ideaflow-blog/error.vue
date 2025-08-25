<template>
  <div class="min-h-screen bg-base-100 flex items-center justify-center px-4">
    <div class="text-center">
      <!-- 404图标 -->
      <div class="mb-8">
        <div class="relative">
          <h1 class="text-9xl font-bold text-gray-200 dark:text-gray-700 select-none">404</h1>
          <div class="absolute inset-0 flex items-center justify-center">
            <svg class="h-24 w-24 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- 错误信息 -->
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">页面未找到</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        抱歉，您访问的页面不存在。可能是链接错误或页面已被删除。
      </p>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          返回首页
        </router-link>
        
        <button
          @click="goBack"
          class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回上页
        </button>
      </div>

      <!-- 搜索建议 -->
      <div class="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg max-w-md mx-auto">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">或者试试这些：</h3>
        <div class="space-y-2">
          <router-link
            to="/categories"
            class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            → 浏览文章分类
          </router-link>
          <router-link
            to="/tags"
            class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            → 查看标签云
          </router-link>
          <router-link
            to="/about"
            class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            → 关于我们
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>