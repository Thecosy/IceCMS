<template>
  <article class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
    <nuxt-link :to="`/posts/${post.id}`" class="block">
      <!-- Cover Image -->
      <div class="relative h-48 overflow-hidden">
        <img
          :src="post.cover"
          :alt="post.title"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <!-- Pinned Badge -->
        <div 
          v-if="post.pinned"
          class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium"
        >
          置顶
        </div>
        <!-- Category -->
        <div 
          v-if="post.categories && post.categories.length > 0"
          class="absolute top-4 right-4"
        >
          <span
            :style="{ backgroundColor: post.categories[0].color }"
            class="text-white px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ post.categories[0].name }}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Title -->
        <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
          {{ post.title }}
        </h3>

        <!-- Summary -->
        <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {{ post.summary }}
        </p>

        <!-- Tags -->
        <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tag in post.tags.slice(0, 3)"
            :key="tag.slug"
            :style="{ color: tag.color }"
            class="text-xs font-medium hover:underline"
          >
            #{{ tag.name }}
          </span>
        </div>

        <!-- Meta Info -->
        <div class="flex items-center justify-between text-sm text-gray-500">
          <div class="flex items-center space-x-4">
            <!-- Author -->
            <div class="flex items-center space-x-2">
              <img
                :src="post.author.avatar"
                :alt="post.author.name"
                class="w-6 h-6 rounded-full"
              />
              <span>{{ post.author.name }}</span>
            </div>
            
            <!-- Date -->
            <time>{{ formatDate(post.publishTime) }}</time>
          </div>

          <!-- Stats -->
          <div class="flex items-center space-x-3">
            <span class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <span>{{ post.stats.views }}</span>
            </span>
            <span class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span>{{ post.stats.likes }}</span>
            </span>
          </div>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script setup>
// 使用普通的 props 定义避免 TypeScript 问题
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>