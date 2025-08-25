<template>
  <ul v-if="categories && categories.length > 0" class="space-y-2">
    <li v-for="category in categories" :key="category.id">
      <div class="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        <router-link 
          :to="`/category/${category.id}`"
          class="flex items-center flex-1 group"
        >
          <!-- 分类图标 -->
          <div class="flex-shrink-0 mr-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-4H9m6 8H7m8-8V7a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h6a3 3 0 003-3v-4z" />
              </svg>
            </div>
          </div>
          
          <!-- 分类信息 -->
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ category.name || category.spec?.displayName }}
            </h3>
            <p v-if="category.describes || category.spec?.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ category.describes || category.spec?.description }}
            </p>
          </div>
          
          <!-- 文章数量 -->
          <div class="flex-shrink-0 ml-3">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {{ category.num || category.status?.postCount || 0 }} 篇
            </span>
          </div>
        </router-link>
      </div>

      <!-- 子分类 -->
      <div v-if="category.children && category.children.length > 0" class="ml-6 mt-2">
        <CategoryTree :categories="category.children" />
      </div>
    </li>
  </ul>

  <!-- 空状态 -->
  <div v-else class="text-center py-8">
    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-4H9m6 8H7" />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">暂无分类</h3>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">还没有创建任何分类</p>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>