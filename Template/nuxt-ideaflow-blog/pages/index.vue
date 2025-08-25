<template>
  <div class="min-h-screen bg-base-100">
    <!-- Header -->
    <Header />

    <!-- 大型头图区域 -->
    <HeroBackground />

    <!-- Main Content -->
    <main class="mx-auto w-full px-4 py-10">
      <div class="flex flex-col md:flex-row md:gap-8">
        <!-- Posts List - Left Side -->
        <div class="w-full md:w-[76%]">
          <div v-if="blogStore.loading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <PostCardSkeleton v-for="n in 6" :key="n" />
          </div>
          
          <div v-else-if="blogStore.posts.items.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <PostCard 
              v-for="post in blogStore.posts.items" 
              :key="post.id" 
              :post="post" 
            />
          </div>
          
          <div v-else class="text-center py-10">
            <p class="text-gray-500 dark:text-gray-400">暂无文章</p>
          </div>

          <!-- Pagination (简化版) -->
          <div v-if="blogStore.posts.items.length > 0" class="mt-10 flex justify-center">
            <nav class="flex space-x-2">
              <button
                v-if="blogStore.posts.page > 1"
                @click="loadPosts(blogStore.posts.page - 1)"
                class="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                上一页
              </button>
              <span class="px-3 py-2 text-sm bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-lg">
                第 {{ blogStore.posts.page }} 页
              </span>
              <button
                v-if="blogStore.posts.hasNext"
                @click="loadPosts(blogStore.posts.page + 1)"
                class="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                下一页
              </button>
            </nav>
          </div>
        </div>

        <!-- Sidebar - Right Side -->
        <div class="hidden md:block md:w-[24%]">
          <div class="sticky top-8">
            <Sidebar />
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { useBlogStore } from '~/stores/blog'

const blogStore = useBlogStore()

const loadPosts = (page = 1) => {
  blogStore.fetchPosts(page)
}

onMounted(() => {
  loadPosts()
})
</script>
