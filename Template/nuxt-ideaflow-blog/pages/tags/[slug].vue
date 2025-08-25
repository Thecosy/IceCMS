<template>
  <div class="min-h-screen bg-base-100">
    <Header :is-overlay="false" />
    
    <!-- 头图区域 -->
    <HeroBackground />
    
    <main class="px-4 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl">
        
        <!-- 标签信息 -->
        <div v-if="blogStore.currentTag" class="mb-8 text-center">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-4">
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
            </svg>
            标签
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {{ blogStore.currentTag.spec.displayName }}
          </h1>
          <p v-if="blogStore.currentTag.spec.description" class="text-gray-600 dark:text-gray-400 mb-4">
            {{ blogStore.currentTag.spec.description }}
          </p>
          <div class="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center">
              <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>共 {{ blogStore.posts.total }} 篇文章</span>
            </div>
            <div class="flex items-center">
              <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{{ getTotalViews() }} 次浏览</span>
            </div>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="blogStore.loading" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>

        <!-- 文章列表 -->
        <div v-else-if="blogStore.posts.items.length > 0" class="bg-white dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
          <PostList :posts="blogStore.posts.items" />

          <!-- 分页 -->
          <div v-if="blogStore.posts.total > blogStore.posts.size" class="mt-10 flex justify-center">
            <nav class="flex space-x-2">
              <button
                v-if="blogStore.posts.page > 1"
                @click="loadPosts(blogStore.posts.page - 1)"
                class="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                上一页
              </button>
              <span class="px-3 py-2 text-sm bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-lg">
                第 {{ blogStore.posts.page }} 页
              </span>
              <button
                v-if="blogStore.posts.hasNext"
                @click="loadPosts(blogStore.posts.page + 1)"
                class="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                下一页
              </button>
            </nav>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="text-center py-20">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
          </svg>
          <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-white">暂无文章</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">该标签下还没有发布任何文章</p>
          <router-link 
            to="/" 
            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            返回首页
          </router-link>
        </div>

      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '~/stores/blog'

const route = useRoute()
const blogStore = useBlogStore()

const loadPosts = (page = 1) => {
  const tagSlug = route.params.name
  blogStore.fetchPosts(page, null, tagSlug)
}

// 计算总浏览量
const getTotalViews = () => {
  return blogStore.posts.items.reduce((total, post) => total + (post.stats.visit || 0), 0)
}

onMounted(() => {
  const tagSlug = route.params.name
  blogStore.fetchTag(tagSlug)
  loadPosts()
})
</script>