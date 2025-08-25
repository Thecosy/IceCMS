<template>
  <div class="space-y-8">
    <!-- 动态渲染侧边栏模块 -->
    <div
      v-for="component in sidebarComponents"
      :key="component"
    >
      <!-- 博主信息 -->
      <AuthorCard v-if="component === 'authorCard'" />
      
      <!-- 热门文章 -->
      <HotPosts v-else-if="component === 'hotPosts'" />
      
      <!-- 标签云 -->
      <TagCloud v-else-if="component === 'tagCloud'" />
      
      <!-- 赞助信息 (暂不实现) -->
      <div v-else-if="component === 'sponsor'" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">赞助</h3>
        <p class="text-xs text-gray-600 dark:text-gray-400">赞助功能敬请期待</p>
      </div>
      
      <!-- 随机视频 (暂不实现) -->
      <div v-else-if="component === 'randomVideo'" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">随机视频</h3>
        <p class="text-xs text-gray-600 dark:text-gray-400">随机视频功能敬请期待</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '~/stores/app'
import AuthorCard from './AuthorCard.vue'
import HotPosts from './HotPosts.vue'
import TagCloud from './TagCloud.vue'

const appStore = useAppStore()

const sidebarComponents = computed(() => {
  return appStore.themeConfig.sidebar.sidebarOrder || ['authorCard', 'hotPosts', 'tagCloud']
})
</script>