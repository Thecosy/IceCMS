<template>
  <div class="min-h-screen">
    <div class="lg:ml-64 px-6 py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-hao-text mb-4">文章标签</h1>
          <p class="text-xl text-hao-text-secondary">通过标签发现相关主题内容</p>
        </div>

        <!-- Tags Cloud -->
        <div v-if="!blogStore.loading" class="mb-12">
          <h2 class="text-2xl font-bold text-hao-text mb-6">热门标签</h2>
          <div class="flex flex-wrap gap-3">
            <nuxt-link
              v-for="tag in popularTags"
              :key="tag.slug"
              :to="`/tags/${tag.slug}`"
              :style="{ 
                color: tag.color,
                backgroundColor: tag.color + '20',
                borderColor: tag.color + '40'
              }"
              class="px-4 py-2 rounded-full border-2 font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              #{{ tag.name }}
              <span class="ml-2 opacity-75">({{ tag.postCount }})</span>
            </nuxt-link>
          </div>
        </div>

        <!-- All Tags Grid -->
        <div v-if="!blogStore.loading">
          <h2 class="text-2xl font-bold text-hao-text mb-6">所有标签</h2>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <nuxt-link
              v-for="tag in tags"
              :key="tag.slug"
              :to="`/tags/${tag.slug}`"
              class="group hao-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <!-- Tag Icon -->
              <div 
                :style="{ backgroundColor: tag.color }"
                class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <Icon name="tag" class="w-6 h-6 text-white" />
              </div>

              <!-- Tag Info -->
              <h3 
                :style="{ color: tag.color }"
                class="text-lg font-bold mb-2 group-hover:scale-105 transition-transform duration-200"
              >
                {{ tag.name }}
              </h3>
              
              <p class="text-hao-text-secondary text-sm">
                {{ tag.postCount }} 篇文章
              </p>
            </nuxt-link>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else class="space-y-8">
          <!-- Popular Tags Loading -->
          <div>
            <div class="bg-gray-300 dark:bg-gray-600 h-8 w-32 rounded mb-6 animate-pulse"></div>
            <div class="flex flex-wrap gap-3">
              <div 
                v-for="i in 8" 
                :key="i"
                class="bg-gray-300 dark:bg-gray-600 h-8 w-20 rounded-full animate-pulse"
              ></div>
            </div>
          </div>

          <!-- All Tags Loading -->
          <div>
            <div class="bg-gray-300 dark:bg-gray-600 h-8 w-24 rounded mb-6 animate-pulse"></div>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div 
                v-for="i in 12" 
                :key="i"
                class="hao-card text-center animate-pulse"
              >
                <div class="bg-gray-300 dark:bg-gray-600 w-12 h-12 rounded-full mx-auto mb-3"></div>
                <div class="bg-gray-300 dark:bg-gray-600 h-6 w-16 rounded mx-auto mb-2"></div>
                <div class="bg-gray-300 dark:bg-gray-600 h-4 w-12 rounded mx-auto"></div>
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
const tags = computed(() => blogStore.tagsOrderedByCount)
const popularTags = computed(() => blogStore.popularTags)

// SEO
useHead({
  title: '文章标签',
  meta: [
    { name: 'description', content: '浏览所有文章标签，通过标签发现相关主题内容' },
    { property: 'og:title', content: '文章标签' },
    { property: 'og:description', content: '浏览所有文章标签，通过标签发现相关主题内容' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>