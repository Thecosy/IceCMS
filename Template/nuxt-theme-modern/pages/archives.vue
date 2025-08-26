<template>
  <div class="min-h-screen">
    <div class="lg:ml-64 px-6 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-hao-text mb-4">文章归档</h1>
          <p class="text-xl text-hao-text-secondary">按时间浏览所有文章</p>
        </div>

        <!-- Stats -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center space-x-8 bg-hao-surface rounded-2xl px-8 py-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-hao-text">{{ totalPosts }}</div>
              <div class="text-sm text-hao-text-secondary">篇文章</div>
            </div>
            <div class="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div class="text-center">
              <div class="text-2xl font-bold text-hao-text">{{ totalCategories }}</div>
              <div class="text-sm text-hao-text-secondary">个分类</div>
            </div>
            <div class="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div class="text-center">
              <div class="text-2xl font-bold text-hao-text">{{ totalTags }}</div>
              <div class="text-sm text-hao-text-secondary">个标签</div>
            </div>
          </div>
        </div>

        <!-- Archives Timeline -->
        <div v-if="!blogStore.loading" class="space-y-8">
          <div 
            v-for="(group, year) in groupedPosts" 
            :key="year"
            class="relative"
          >
            <!-- Year Header -->
            <div class="sticky top-4 z-10 mb-8">
              <div class="inline-flex items-center bg-hao-primary text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                <Icon name="archive" class="w-5 h-5 mr-2" />
                {{ year }}
                <span class="ml-2 text-sm opacity-80">({{ group.length }} 篇)</span>
              </div>
            </div>

            <!-- Posts List -->
            <div class="space-y-4 pl-8 border-l-2 border-hao-primary/30">
              <article 
                v-for="post in group" 
                :key="post.id"
                class="relative group"
              >
                <!-- Timeline Dot -->
                <div class="absolute -left-[37px] top-6 w-3 h-3 bg-hao-primary rounded-full border-4 border-white dark:border-gray-900 shadow-md group-hover:scale-125 transition-transform duration-200"></div>
                
                <!-- Post Card -->
                <nuxt-link 
                  :to="`/posts/${post.id}`"
                  class="block hao-card hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1"
                >
                  <div class="flex items-start space-x-4">
                    <!-- Cover Image -->
                    <div v-if="post.cover" class="flex-shrink-0">
                      <img
                        :src="post.cover"
                        :alt="post.title"
                        class="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0">
                      <!-- Title -->
                      <h3 class="text-lg font-bold text-hao-text mb-2 line-clamp-1 group-hover:text-hao-primary transition-colors duration-200">
                        {{ post.title }}
                      </h3>

                      <!-- Summary -->
                      <p class="text-hao-text-secondary mb-3 line-clamp-2 text-sm leading-relaxed">
                        {{ post.summary }}
                      </p>

                      <!-- Meta -->
                      <div class="flex flex-wrap items-center gap-4 text-xs text-hao-text-secondary">
                        <!-- Date -->
                        <time class="flex items-center space-x-1">
                          <Icon name="user" class="w-3 h-3" />
                          <span>{{ formatDate(post.publishTime) }}</span>
                        </time>

                        <!-- Categories -->
                        <div v-if="post.categories && post.categories.length > 0" class="flex items-center space-x-1">
                          <Icon name="folder" class="w-3 h-3" />
                          <span
                            v-for="(category, index) in post.categories"
                            :key="category.slug"
                            :style="{ color: category.color }"
                            class="font-medium"
                          >
                            {{ category.name }}{{ index < post.categories.length - 1 ? ',' : '' }}
                          </span>
                        </div>

                        <!-- Stats -->
                        <div class="flex items-center space-x-3">
                          <span class="flex items-center space-x-1">
                            <Icon name="user" class="w-3 h-3" />
                            <span>{{ post.stats.views }}</span>
                          </span>
                          <span class="flex items-center space-x-1">
                            <Icon name="heart" class="w-3 h-3" />
                            <span>{{ post.stats.likes }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
              </article>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else class="space-y-8">
          <div class="bg-gray-300 dark:bg-gray-600 h-12 w-32 rounded-full animate-pulse"></div>
          <div class="space-y-4 pl-8">
            <div 
              v-for="i in 8" 
              :key="i"
              class="hao-card animate-pulse"
            >
              <div class="flex items-start space-x-4">
                <div class="bg-gray-300 dark:bg-gray-600 w-20 h-20 rounded-lg flex-shrink-0"></div>
                <div class="flex-1 space-y-2">
                  <div class="bg-gray-300 dark:bg-gray-600 h-6 rounded w-3/4"></div>
                  <div class="bg-gray-300 dark:bg-gray-600 h-4 rounded"></div>
                  <div class="bg-gray-300 dark:bg-gray-600 h-4 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '~/stores/blog'

const blogStore = useBlogStore()

const allPosts = computed(() => blogStore.posts.items)
const totalPosts = computed(() => allPosts.value.length)
const totalCategories = computed(() => blogStore.categories.length)
const totalTags = computed(() => blogStore.tags.length)

// Group posts by year
const groupedPosts = computed(() => {
  const groups = {}
  allPosts.value.forEach(post => {
    const year = new Date(post.publishTime).getFullYear()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(post)
  })
  
  // Sort years in descending order
  const sortedYears = Object.keys(groups).sort((a, b) => b - a)
  const result = {}
  sortedYears.forEach(year => {
    // Sort posts within each year by date (newest first)
    result[year] = groups[year].sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
  })
  
  return result
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric'
  })
}

// SEO
useHead({
  title: '文章归档',
  meta: [
    { name: 'description', content: '按时间顺序浏览所有发布的文章' },
    { property: 'og:title', content: '文章归档' },
    { property: 'og:description', content: '按时间顺序浏览所有发布的文章' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>