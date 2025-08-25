<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Header :is-overlay="false" />
    
    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- 欢迎区域 -->
      <div class="mb-8">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <img
                :src="currentUser?.avatar || appStore.themeConfig.common.defaultAvatar"
                :alt="currentUser?.displayName"
                class="h-16 w-16 rounded-full object-cover ring-4 ring-blue-500/20"
              />
              <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                  欢迎回来，{{ currentUser?.displayName || '用户' }}！
                </h1>
                <p class="text-gray-600 dark:text-gray-400">
                  管理您的博客内容和设置
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900 dark:text-white">今日访问量</p>
                <p class="text-2xl font-bold text-blue-600">1,234</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900 dark:text-white">总文章数</p>
                <p class="text-2xl font-bold text-green-600">{{ blogStore.posts.total }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 快捷操作区域 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  新建文章
                </dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">
                  写作
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-10 w-10 rounded-md bg-green-500 text-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  文章管理
                </dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">
                  编辑
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-500 text-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  标签管理
                </dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">
                  分类
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-10 w-10 rounded-md bg-purple-500 text-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  系统设置
                </dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">
                  配置
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- 最近文章 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">最近文章</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="post in recentPosts"
                :key="post.id"
                class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <img
                  :src="post.cover || '/assets/img/article-avatar.png'"
                  :alt="post.title"
                  class="h-12 w-12 rounded-lg object-cover"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ post.title }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(post.publishTime) }}
                  </p>
                </div>
                <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ post.stats.visit }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 系统信息 -->
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">系统信息</h3>
          </div>
          <div class="p-6">
            <dl class="space-y-4">
              <div class="flex justify-between">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">博客版本</dt>
                <dd class="text-sm text-gray-900 dark:text-white">Vue Ideaflow v1.0.0</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">运行时间</dt>
                <dd class="text-sm text-gray-900 dark:text-white">7 天 12 小时</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">文章总数</dt>
                <dd class="text-sm text-gray-900 dark:text-white">{{ blogStore.posts.total }} 篇</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">分类总数</dt>
                <dd class="text-sm text-gray-900 dark:text-white">{{ blogStore.categories.length }} 个</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">标签总数</dt>
                <dd class="text-sm text-gray-900 dark:text-white">{{ blogStore.tags.length }} 个</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAppStore } from '~/stores/app'
import { useBlogStore } from '~/stores/blog'
import { mockPosts } from '~/mock/data'

const appStore = useAppStore()
const blogStore = useBlogStore()

const currentUser = computed(() => appStore.currentUser)

// 最近文章（取前5篇）
const recentPosts = computed(() => {
  return [...mockPosts]
    .sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
    .slice(0, 5)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  // 如果没有用户数据，从localStorage恢复
  if (!currentUser.value) {
    const userData = localStorage.getItem('user_data')
    if (userData) {
      appStore.setCurrentUser(JSON.parse(userData))
    }
  }
})
</script>