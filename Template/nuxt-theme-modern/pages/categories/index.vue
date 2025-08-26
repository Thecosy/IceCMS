<template>
  <div class="min-h-screen">
    <div class="lg:ml-64 px-6 py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-hao-text mb-4">文章分类</h1>
          <p class="text-xl text-hao-text-secondary">探索不同主题的精彩内容</p>
        </div>

        <!-- Categories Grid -->
        <div v-if="!blogStore.loading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <nuxt-link
            v-for="category in categories"
            :key="category.slug"
            :to="`/categories/${category.slug}`"
            class="group hao-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <!-- Cover Image -->
            <div class="relative h-40 overflow-hidden rounded-t-lg -m-6 mb-4">
              <img
                :src="category.cover"
                :alt="category.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div 
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              />
              <div class="absolute bottom-4 left-4">
                <h3 
                  :style="{ color: category.color }"
                  class="text-2xl font-bold text-white"
                >
                  {{ category.name }}
                </h3>
              </div>
            </div>

            <!-- Content -->
            <div class="pt-2">
              <p class="text-hao-text-secondary mb-4 leading-relaxed">
                {{ category.description }}
              </p>

              <!-- Stats -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-hao-text-secondary">
                  {{ category.postCount }} 篇文章
                </span>
                <div 
                  :style="{ backgroundColor: category.color }"
                  class="w-8 h-8 rounded-full flex items-center justify-center"
                >
                  <Icon name="folder" class="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>

        <!-- Loading State -->
        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="i in 6" 
            :key="i"
            class="hao-card animate-pulse"
          >
            <div class="bg-gray-300 dark:bg-gray-600 h-40 rounded-lg -m-6 mb-4"></div>
            <div class="pt-2">
              <div class="bg-gray-300 dark:bg-gray-600 h-6 rounded mb-2"></div>
              <div class="bg-gray-300 dark:bg-gray-600 h-4 rounded w-3/4 mb-4"></div>
              <div class="bg-gray-300 dark:bg-gray-600 h-4 rounded w-1/2"></div>
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
const categories = computed(() => blogStore.categoriesOrderedByCount)

// SEO
useHead({
  title: '文章分类',
  meta: [
    { name: 'description', content: '浏览所有文章分类，发现感兴趣的内容主题' },
    { property: 'og:title', content: '文章分类' },
    { property: 'og:description', content: '浏览所有文章分类，发现感兴趣的内容主题' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>