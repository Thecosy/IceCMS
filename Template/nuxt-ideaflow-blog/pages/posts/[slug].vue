<template>
  <div class="min-h-screen bg-base-100">
    <!-- Header -->
    <Header :is-overlay="false" />

    <!-- Main Content -->
    <main class="mx-auto max-w-4xl px-4 py-10">
      <div v-if="blogStore.loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="blogStore.currentPost" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <!-- 文章头部 -->
        <div class="relative">
          <div
            v-if="blogStore.currentPost.cover"
            class="h-64 bg-cover bg-center"
            :style="{ backgroundImage: `url(${blogStore.currentPost.cover})` }"
          >
            <div class="absolute inset-0 bg-black/40"></div>
          </div>
          <div class="p-8" :class="{ 'absolute bottom-0 left-0 right-0 text-white': blogStore.currentPost.cover }">
            <h1 class="text-3xl font-bold mb-4">{{ blogStore.currentPost.title }}</h1>
            <div class="flex items-center space-x-4 text-sm opacity-80">
              <span>发布于 {{ formatDate(blogStore.currentPost.publishTime) }}</span>
              <span>阅读量: {{ blogStore.currentPost.stats.visit }}</span>
              <span>评论: {{ blogStore.currentPost.stats.comment }}</span>
            </div>
          </div>
        </div>

        <!-- 文章内容 -->
        <div class="p-8">
          <div class="prose dark:prose-invert max-w-none">
            <p>{{ blogStore.currentPost.excerpt }}</p>
            <p>这里是文章的主要内容。在实际应用中，这里会显示完整的文章内容，支持Markdown渲染等功能。</p>
            <p>由于是演示项目，这里只显示简化的内容。</p>
          </div>

          <!-- 标签 -->
          <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in blogStore.currentPost.tags"
                :key="tag.spec.displayName"
                class="bg-primary-50 text-primary-600 dark:bg-primary-900/10 dark:text-primary-300 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
              >
                <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
                </svg>
                {{ tag.spec.displayName }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <p class="text-gray-500 dark:text-gray-400 text-lg">文章不存在</p>
        <router-link to="/" class="mt-4 inline-block text-primary-600 hover:text-primary-700">
          返回首页
        </router-link>
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '~/stores/blog'

const route = useRoute()
const blogStore = useBlogStore()

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  const postId = route.params.id
  blogStore.fetchPost(postId)
})
</script>