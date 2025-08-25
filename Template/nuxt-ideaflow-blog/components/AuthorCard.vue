<template>
  <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <div class="flex flex-col items-center text-center">
      <!-- 头像 -->
      <div class="mb-4">
        <img
          :src="blogger.avatar"
          :alt="blogger.nickname"
          class="h-20 w-20 rounded-full object-cover shadow-lg ring-4 ring-blue-500/20 dark:ring-blue-400/30"
        />
      </div>

      <!-- 昵称 -->
      <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        {{ blogger.nickname }}
      </h3>

      <!-- 个人简介 -->
      <p v-if="blogger.bio" class="mb-3 text-sm text-gray-600 dark:text-gray-400">
        {{ blogger.bio }}
      </p>

      <!-- 位置信息 -->
      <div v-if="blogger.location" class="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{{ blogger.location }}</span>
      </div>

      <!-- 社交链接 -->
      <div v-if="blogger.social_links && blogger.social_links.length > 0" class="flex space-x-3">
        <a
          v-for="social in blogger.social_links"
          :key="social.platform"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="transform rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:scale-110 hover:bg-blue-100 hover:text-blue-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-400"
          :title="`访问我的${social.platform}`"
        >
          <!-- 简单的图标占位，实际应该根据平台显示对应图标 -->
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()

const blogger = computed(() => appStore.themeConfig.blogger)
</script>