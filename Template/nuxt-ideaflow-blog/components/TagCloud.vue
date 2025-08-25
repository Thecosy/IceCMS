<template>
  <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">标签</h3>
    
    <div v-if="blogStore.tags.length > 0" class="flex flex-wrap gap-2">
      <router-link
        v-for="tag in blogStore.tags"
        :key="tag.id || tag.spec?.displayName"
        :to="`/tag/${tag.id}`"
        class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 hover:scale-105"
        :class="[
          tag.color ? `border-[${tag.color}] bg-[${tag.color}]/10 text-[${tag.color}] hover:bg-[${tag.color}]/20` :
          'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-400'
        ]"
      >
        <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
        </svg>
        {{ tag.tagName || tag.spec?.displayName || tag.name }}
      </router-link>
    </div>
    
    <div v-else class="text-center py-4">
      <p class="text-sm text-gray-500 dark:text-gray-400">暂无标签</p>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '~/stores/blog'

const blogStore = useBlogStore()
</script>