<template>
  <div class="min-h-screen bg-base-100">
    <Header :is-overlay="false" />
    
    <!-- 头图区域 -->
    <HeroBackground />
    
    <main class="px-4 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl">
        
        <!-- 分类信息 -->
        <div v-if="blogStore.currentCategory" class="mb-8 text-center">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4">
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-4H9m6 8H7" />
            </svg>
            分类
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {{ blogStore.currentCategory.spec.displayName }}
          </h1>
          <p v-if="blogStore.currentCategory.spec.description" class="text-gray-600 dark:text-gray-400">
            {{ blogStore.currentCategory.spec.description }}
          </p>
          <div class="mt-4">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              共 {{ blogStore.posts.total }} 篇文章
            </span>
          </div>
        </div>

        <!-- 骨架屏 -->
        <div v-if="blogStore.loading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PostCardSkeleton v-for="n in 6" :key="n" />
        </div>

        <!-- 文章列表 -->
        <div v-else-if="blogStore.posts.items.length > 0" class="bg-white dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PostCard 
              v-for="post in blogStore.posts.items" 
              :key="post.id" 
              :post="post" 
            />
          </div>

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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-white">暂无文章</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">该分类下还没有发布任何文章</p>
          <NuxtLink 
            to="/" 
            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            返回首页
          </NuxtLink>
        </div>

      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute()
const blogStore = useBlogStore()

const loadPosts = (page = 1) => {
  const categorySlug = route.params.slug
  blogStore.fetchPosts(page, categorySlug)
}

onMounted(() => {
  const categorySlug = route.params.slug
  blogStore.fetchCategory(categorySlug)
  loadPosts()
})
</script>