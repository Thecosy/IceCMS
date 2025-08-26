<template>
  <div class="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
    <!-- Overlay -->
    <div 
      @click="appStore.toggleSearchModal"
      class="absolute inset-0 bg-black/50 backdrop-blur-sm"
    />
    
    <!-- Modal -->
    <div class="relative w-full max-w-2xl bg-hao-surface rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
      <!-- Search Input -->
      <div class="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <Icon name="search" class="w-6 h-6 text-hao-text-secondary mr-4" />
        <input
          ref="searchInput"
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          @keyup.esc="appStore.toggleSearchModal"
          type="text"
          placeholder="搜索文章、标签、分类..."
          class="flex-1 text-lg bg-transparent text-hao-text placeholder-hao-text-secondary outline-none"
        />
        <button
          @click="appStore.toggleSearchModal"
          class="ml-4 p-2 text-hao-text-secondary hover:text-hao-text transition-colors duration-200"
        >
          <Icon name="x" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Search Results -->
      <div class="max-h-96 overflow-y-auto">
        <div v-if="blogStore.loading" class="p-6 text-center">
          <div class="inline-block w-6 h-6 border-2 border-hao-primary border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-2 text-hao-text-secondary">搜索中...</p>
        </div>
        
        <div v-else-if="searchResults.length === 0 && searchQuery" class="p-6 text-center">
          <Icon name="search" class="w-12 h-12 text-hao-text-secondary mx-auto mb-3 opacity-50" />
          <p class="text-hao-text-secondary">未找到相关内容</p>
        </div>
        
        <div v-else-if="searchResults.length > 0" class="py-2">
          <nuxt-link
            v-for="post in searchResults"
            :key="post.id"
            :to="`/posts/${post.id}`"
            @click="appStore.toggleSearchModal"
            class="flex items-center px-6 py-4 hover:bg-hao-primary/5 transition-colors duration-200"
          >
            <div class="flex-1">
              <h3 class="font-medium text-hao-text mb-1">{{ post.title }}</h3>
              <p class="text-sm text-hao-text-secondary line-clamp-2">{{ post.summary }}</p>
              <div class="flex items-center space-x-4 mt-2 text-xs text-hao-text-secondary">
                <span>{{ formatDate(post.publishTime) }}</span>
                <span>{{ post.stats.views }} 次阅读</span>
              </div>
            </div>
            <Icon name="link" class="w-4 h-4 text-hao-text-secondary ml-4" />
          </nuxt-link>
        </div>
        
        <div v-else class="p-6 text-center">
          <Icon name="search" class="w-12 h-12 text-hao-text-secondary mx-auto mb-3 opacity-50" />
          <p class="text-hao-text-secondary">输入关键词开始搜索</p>
          <div class="mt-4 flex flex-wrap gap-2 justify-center">
            <button
              v-for="tag in popularTags"
              :key="tag.slug"
              @click="searchQuery = tag.name; handleSearch()"
              class="px-3 py-1 bg-hao-primary/10 text-hao-primary rounded-full text-sm hover:bg-hao-primary/20 transition-colors duration-200"
            >
              {{ tag.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '~/stores/app'
import { useBlogStore } from '~/stores/blog'

const appStore = useAppStore()
const blogStore = useBlogStore()

const searchInput = ref(null)
const searchQuery = ref('')
const searchResults = ref([])

const popularTags = computed(() => blogStore.popularTags.slice(0, 6))

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  await blogStore.searchPosts(searchQuery.value)
  searchResults.value = blogStore.posts.items
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Auto focus when modal opens
onMounted(() => {
  nextTick(() => {
    searchInput.value?.focus()
  })
})

// Clear results when query is empty
watch(searchQuery, (newQuery) => {
  if (!newQuery.trim()) {
    searchResults.value = []
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>