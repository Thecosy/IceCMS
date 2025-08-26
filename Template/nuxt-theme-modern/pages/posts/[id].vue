<template>
  <div class="min-h-screen">
    <div class="lg:ml-64 px-6 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Loading State -->
        <div v-if="blogStore.loading" class="animate-pulse">
          <div class="bg-gray-300 dark:bg-gray-600 h-8 rounded w-3/4 mb-4"></div>
          <div class="bg-gray-300 dark:bg-gray-600 h-64 rounded mb-6"></div>
          <div class="space-y-3">
            <div class="bg-gray-300 dark:bg-gray-600 h-4 rounded"></div>
            <div class="bg-gray-300 dark:bg-gray-600 h-4 rounded w-5/6"></div>
            <div class="bg-gray-300 dark:bg-gray-600 h-4 rounded w-4/6"></div>
          </div>
        </div>

        <!-- Post Content -->
        <article v-else-if="post" class="animate-fade-in">
          <!-- Header -->
          <header class="mb-8">
            <h1 class="text-4xl md:text-5xl font-bold text-hao-text mb-6 leading-tight">
              {{ post.title }}
            </h1>
            
            <!-- Meta Info -->
            <div class="flex flex-wrap items-center gap-6 text-hao-text-secondary mb-6">
              <!-- Author -->
              <div class="flex items-center space-x-3">
                <img
                  :src="post.author.avatar"
                  :alt="post.author.name"
                  class="w-8 h-8 rounded-full"
                />
                <span>{{ post.author.name }}</span>
              </div>
              
              <!-- Date -->
              <time>{{ formatDate(post.publishTime) }}</time>
              
              <!-- Stats -->
              <div class="flex items-center space-x-4">
                <span class="flex items-center space-x-1">
                  <Icon name="user" class="w-4 h-4" />
                  <span>{{ post.stats.views }} 次阅读</span>
                </span>
                <span class="flex items-center space-x-1">
                  <Icon name="heart" class="w-4 h-4" />
                  <span>{{ post.stats.likes }}</span>
                </span>
              </div>
            </div>

            <!-- Categories and Tags -->
            <div class="flex flex-wrap items-center gap-4 mb-6">
              <!-- Categories -->
              <div v-if="post.categories && post.categories.length > 0" class="flex items-center space-x-2">
                <Icon name="folder" class="w-4 h-4 text-hao-text-secondary" />
                <nuxt-link
                  v-for="category in post.categories"
                  :key="category.slug"
                  :to="`/categories/${category.slug}`"
                  :style="{ backgroundColor: category.color }"
                  class="px-3 py-1 rounded-full text-white text-sm font-medium hover:opacity-80 transition-opacity duration-200"
                >
                  {{ category.name }}
                </nuxt-link>
              </div>

              <!-- Tags -->
              <div v-if="post.tags && post.tags.length > 0" class="flex items-center space-x-2">
                <Icon name="tag" class="w-4 h-4 text-hao-text-secondary" />
                <nuxt-link
                  v-for="tag in post.tags"
                  :key="tag.slug"
                  :to="`/tags/${tag.slug}`"
                  :style="{ color: tag.color }"
                  class="text-sm font-medium hover:opacity-80 transition-opacity duration-200"
                >
                  #{{ tag.name }}
                </nuxt-link>
              </div>
            </div>
          </header>

          <!-- Cover Image -->
          <div v-if="post.cover" class="mb-8">
            <img
              :src="post.cover"
              :alt="post.title"
              class="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>

          <!-- Content -->
          <div class="prose prose-lg max-w-none dark:prose-invert">
            <p class="text-xl text-hao-text-secondary mb-8 leading-relaxed">{{ post.summary }}</p>
            
            <div class="text-hao-text leading-relaxed">
              <p>{{ post.content }}</p>
              
              <!-- Placeholder for more content -->
              <p>这里可以放置文章的完整内容。在实际应用中，这部分内容会从 API 或 Markdown 文件中加载。</p>
              
              <h2>示例标题</h2>
              <p>这是一个示例段落，展示文章内容的样式。可以包含各种格式化内容，如粗体、斜体、链接等。</p>
              
              <ul>
                <li>列表项 1</li>
                <li>列表项 2</li>
                <li>列表项 3</li>
              </ul>
              
              <blockquote>
                <p>这是一个引用示例，用来展示引用内容的样式。</p>
              </blockquote>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              @click="$router.back()"
              class="flex items-center space-x-2 text-hao-primary hover:text-hao-accent transition-colors duration-200"
            >
              <Icon name="arrow-left" class="w-5 h-5" />
              <span>返回</span>
            </button>
            
            <div class="flex space-x-4">
              <button
                @click="toggleLike"
                :class="[
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
                  liked ? 'bg-red-100 text-red-600 dark:bg-red-900/20' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                ]"
              >
                <Icon name="heart" class="w-5 h-5" />
                <span>{{ post.stats.likes }}</span>
              </button>
            </div>
          </nav>
        </article>

        <!-- Not Found -->
        <div v-else class="text-center py-20">
          <Icon name="search" class="w-16 h-16 text-hao-text-secondary mx-auto mb-4 opacity-50" />
          <h1 class="text-2xl font-bold text-hao-text mb-2">文章未找到</h1>
          <p class="text-hao-text-secondary mb-6">抱歉，您要查找的文章不存在。</p>
          <nuxt-link 
            to="/" 
            class="hao-button hao-button-primary"
          >
            返回首页
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

const postId = computed(() => parseInt(route.params.id))
const post = computed(() => blogStore.currentPost)
const liked = ref(false)

// Fetch post data
await blogStore.fetchPost(postId.value)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const toggleLike = () => {
  liked.value = !liked.value
  // Here you would typically make an API call to update the like status
}

// SEO
useHead(() => ({
  title: post.value?.title || '文章详情',
  meta: [
    { name: 'description', content: post.value?.summary || '' },
    { property: 'og:title', content: post.value?.title || '' },
    { property: 'og:description', content: post.value?.summary || '' },
    { property: 'og:image', content: post.value?.cover || '' },
    { property: 'og:type', content: 'article' }
  ]
}))
</script>

<style scoped>
.prose {
  color: rgb(30 41 59 / var(--tw-text-opacity));
}

.dark .prose {
  color: rgb(241 245 249 / var(--tw-text-opacity));
}

.prose h1, .prose h2, .prose h3, .prose h4 {
  color: rgb(30 41 59 / var(--tw-text-opacity));
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.dark .prose h1, .dark .prose h2, .dark .prose h3, .dark .prose h4 {
  color: rgb(241 245 249 / var(--tw-text-opacity));
}

.prose blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  font-style: italic;
  background-color: rgb(248 250 252 / var(--tw-bg-opacity));
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

.dark .prose blockquote {
  background-color: rgb(30 41 59 / var(--tw-bg-opacity));
}
</style>