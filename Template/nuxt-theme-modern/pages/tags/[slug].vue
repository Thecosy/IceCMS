<template>
  <div class="min-h-screen">
    <div class="lg:ml-64 px-6 py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Tag Header -->
        <div v-if="currentTag" class="text-center mb-12">
          <div class="mb-6">
            <div 
              :style="{ backgroundColor: currentTag.color }"
              class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="tag" class="w-8 h-8 text-white" />
            </div>
            <h1 
              :style="{ color: currentTag.color }"
              class="text-4xl font-bold mb-2"
            >
              #{{ currentTag.name }}
            </h1>
            <span class="text-hao-text-secondary">{{ currentTag.postCount }} 篇文章</span>
          </div>
        </div>

        <!-- Posts Grid -->
        <div v-if="!blogStore.loading && posts.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
            class="animate-fade-in"
          />
        </div>

        <!-- Loading State -->
        <div v-else-if="blogStore.loading" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="i in 6" 
            :key="i"
            class="hao-card animate-pulse"
          >
            <div class="bg-gray-300 dark:bg-gray-600 h-48 rounded-lg mb-4"></div>
            <div class="bg-gray-300 dark:bg-gray-600 h-6 rounded mb-2"></div>
            <div class="bg-gray-300 dark:bg-gray-600 h-4 rounded w-3/4"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <Icon name="tag" class="w-16 h-16 text-hao-text-secondary mx-auto mb-4 opacity-50" />
          <h2 class="text-2xl font-bold text-hao-text mb-2">暂无文章</h2>
          <p class="text-hao-text-secondary mb-6">这个标签下还没有相关文章</p>
          <nuxt-link 
            to="/" 
            class="hao-button hao-button-primary"
          >
            浏览其他内容
          </nuxt-link>
        </div>

        <!-- Load More Button -->
        <div v-if="blogStore.posts.hasNext" class="text-center mt-12">
          <button
            @click="loadMore"
            :disabled="blogStore.loading"
            class="hao-button hao-button-primary px-8 py-3 text-lg"
          >
            {{ blogStore.loading ? '加载中...' : '加载更多' }}
          </button>
        </div>

        <!-- Back to Tags -->
        <div class="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <nuxt-link 
            to="/tags"
            class="flex items-center justify-center space-x-2 text-hao-primary hover:text-hao-accent transition-colors duration-200"
          >
            <Icon name="arrow-left" class="w-5 h-5" />
            <span>所有标签</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '~/stores/blog'

const route = useRoute()
const blogStore = useBlogStore()

const tagSlug = computed(() => route.params.slug)
const currentTag = computed(() => blogStore.currentTag)
const posts = computed(() => blogStore.posts.items)

// Fetch tag and posts
await Promise.all([
  blogStore.fetchTag(tagSlug.value),
  blogStore.fetchPosts(1, null, tagSlug.value)
])

const loadMore = async () => {
  if (blogStore.posts.hasNext && !blogStore.loading) {
    await blogStore.fetchPosts(blogStore.posts.page + 1, null, tagSlug.value)
  }
}

// SEO
useHead(() => ({
  title: currentTag.value ? `#${currentTag.value.name} - 标签` : '标签',
  meta: [
    { name: 'description', content: currentTag.value ? `查看所有关于 ${currentTag.value.name} 的文章` : '' },
    { property: 'og:title', content: currentTag.value ? `#${currentTag.value.name} - 标签` : '' },
    { property: 'og:description', content: currentTag.value ? `查看所有关于 ${currentTag.value.name} 的文章` : '' },
    { property: 'og:type', content: 'website' }
  ]
}))
</script>