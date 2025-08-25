<template>
  <!-- 搜索模态框 -->
  <Teleport to="body">
    <div
      v-if="appStore.searchOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="handleBackdropClick"
    >
      <!-- 背景遮罩 -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
      
      <!-- 搜索框容器 -->
      <div class="relative min-h-full flex items-start justify-center p-4 pt-20">
        <div 
          class="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
          @click.stop
        >
          <!-- 搜索输入框 -->
          <div class="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章..."
              class="flex-1 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              @input="handleSearch"
              @keydown.escape="closeSearch"
              @keydown.enter="handleEnter"
              @keydown.up="handleArrowUp"
              @keydown.down="handleArrowDown"
            />
            <button
              @click="closeSearch"
              class="ml-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 搜索结果 -->
          <div class="max-h-96 overflow-y-auto">
            <div v-if="isSearching" class="flex items-center justify-center py-8">
              <div class="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
              <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">搜索中...</span>
            </div>

            <div v-else-if="searchResults.length === 0 && searchQuery.trim()" class="py-8 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">未找到结果</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">没有找到与 "{{ searchQuery }}" 相关的文章</p>
            </div>

            <div v-else-if="searchResults.length > 0">
              <div
                v-for="(result, index) in searchResults"
                :key="result.id"
                :class="[
                  'block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors',
                  { 'bg-gray-50 dark:bg-gray-700/50': selectedIndex === index }
                ]"
                @click="selectResult(result)"
                @mouseenter="selectedIndex = index"
              >
                <div class="flex items-start space-x-3">
                  <img
                    :src="result.cover || '/assets/img/article-avatar.png'"
                    :alt="result.title"
                    class="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                      {{ result.title }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                      {{ result.excerpt }}
                    </p>
                    <div class="flex items-center mt-2 space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{{ formatDate(result.publishTime) }}</span>
                      <span>•</span>
                      <span>{{ result.stats.visit }} 次阅读</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 默认状态：显示热门文章或搜索提示 -->
            <div v-else-if="!searchQuery.trim()" class="py-4">
              <div class="px-4 py-2">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">热门文章</h3>
                <div class="space-y-2">
                  <div
                    v-for="post in popularPosts"
                    :key="post.id"
                    class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                    @click="selectResult(post)"
                  >
                    <img
                      :src="post.cover || '/assets/img/article-avatar.png'"
                      :alt="post.title"
                      class="h-8 w-8 rounded object-cover flex-shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                        {{ post.title }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 搜索提示 -->
          <div class="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <span>输入关键词开始搜索</span>
              <div class="flex items-center space-x-2">
                <kbd class="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs">↑↓</kbd>
                <span>选择</span>
                <kbd class="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs">Enter</kbd>
                <span>打开</span>
                <kbd class="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs">Esc</kbd>
                <span>关闭</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '~/stores/app'
import { useBlogStore } from '~/stores/blog'
import { mockPosts } from '~/mock/data'

const router = useRouter()
const appStore = useAppStore()
const blogStore = useBlogStore()

// 搜索相关状态
const searchInput = ref(null)
const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const selectedIndex = ref(-1)

// 热门文章（按访问量排序）
const popularPosts = computed(() => {
  return [...mockPosts]
    .sort((a, b) => b.stats.visit - a.stats.visit)
    .slice(0, 5)
})

// 监听搜索框打开状态
watch(
  () => appStore.searchOpen,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        searchInput.value?.focus()
      })
    } else {
      // 重置搜索状态
      searchQuery.value = ''
      searchResults.value = []
      selectedIndex.value = -1
    }
  }
)

// 处理搜索
const handleSearch = async () => {
  const query = searchQuery.value.trim()
  
  if (!query) {
    searchResults.value = []
    selectedIndex.value = -1
    return
  }

  isSearching.value = true
  selectedIndex.value = -1

  // 模拟搜索延迟
  await new Promise(resolve => setTimeout(resolve, 300))

  // 简单的搜索实现：在标题和摘要中查找关键词
  searchResults.value = mockPosts.filter(post => {
    const searchText = query.toLowerCase()
    return (
      post.title.toLowerCase().includes(searchText) ||
      post.excerpt.toLowerCase().includes(searchText) ||
      post.categories.some(cat => cat.spec.displayName.toLowerCase().includes(searchText)) ||
      post.tags.some(tag => tag.spec.displayName.toLowerCase().includes(searchText))
    )
  })

  isSearching.value = false
}

// 选择搜索结果
const selectResult = (result) => {
  router.push(result.status.permalink)
  closeSearch()
}

// 关闭搜索
const closeSearch = () => {
  appStore.toggleSearch()
}

// 处理背景点击
const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    closeSearch()
  }
}

// 键盘导航
const handleEnter = () => {
  if (selectedIndex.value >= 0 && selectedIndex.value < searchResults.value.length) {
    selectResult(searchResults.value[selectedIndex.value])
  } else if (searchResults.value.length > 0) {
    selectResult(searchResults.value[0])
  }
}

const handleArrowUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  } else if (selectedIndex.value === 0) {
    selectedIndex.value = searchResults.value.length - 1
  }
}

const handleArrowDown = () => {
  if (selectedIndex.value < searchResults.value.length - 1) {
    selectedIndex.value++
  } else {
    selectedIndex.value = 0
  }
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

kbd {
  font-family: inherit;
  font-size: inherit;
}
</style>