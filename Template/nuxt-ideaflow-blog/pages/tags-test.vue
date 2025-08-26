<template>
  <div class="min-h-screen bg-base-100">
    <Header />
    <main class="mx-auto max-w-6xl px-4 py-10">
      <h1 class="text-3xl font-bold mb-8">标签页测试</h1>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div v-if="blogStore.tags.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <router-link
              v-for="tag in blogStore.tags"
              :key="tag.id"
              :to="`/tag/${tag.id}`"
              class="group block"
            >
              <div class="rounded-lg border p-4 transition-all duration-200 hover:shadow-md">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-900 dark:text-white">
                      {{ tag.tagName || tag.spec?.displayName }}
                    </h3>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">暂无标签</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">还没有创建任何标签</p>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { useBlogStore } from '~/stores/blog'

const blogStore = useBlogStore()
</script>