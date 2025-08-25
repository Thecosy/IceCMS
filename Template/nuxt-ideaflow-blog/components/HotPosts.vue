<template>
  <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">热门文章</h3>
    
    <div v-if="blogStore.hotPosts.length > 0" class="space-y-3">
      <router-link
        v-for="(post, index) in blogStore.hotPosts"
        :key="index"
        :to="`/post/${post.id}`"
        class="block group"
      >
        <div class="flex items-start space-x-3 p-2 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50">
          <!-- 序号 -->
          <div class="flex-shrink-0">
            <span 
              class="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
              :class="[
                index === 0 ? 'bg-red-500' : 
                index === 1 ? 'bg-orange-500' : 
                index === 2 ? 'bg-yellow-500' : 
                'bg-gray-400'
              ]"
            >
              {{ index + 1 }}
            </span>
          </div>
          
          <!-- 文章标题 -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {{ post.title }}
            </p>
          </div>
          
          <!-- 箭头图标 -->
          <div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </router-link>
    </div>
    
    <div v-else class="text-center py-4">
      <p class="text-sm text-gray-500 dark:text-gray-400">暂无热门文章</p>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '~/stores/blog'

const blogStore = useBlogStore()
</script>