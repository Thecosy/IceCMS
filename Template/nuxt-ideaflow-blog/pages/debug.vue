<template>
  <div class="min-h-screen bg-base-100 p-8">
    <Header />
    
    <div class="max-w-4xl mx-auto pt-20">
      <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">API 调试页面</h1>
      
      <!-- API状态 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">API 状态</h2>
        <div class="flex items-center gap-4 mb-4">
          <div class="flex items-center">
            <div :class="blogStore.useApi ? 'bg-green-500' : 'bg-yellow-500'" class="w-3 h-3 rounded-full mr-2"></div>
            <span>{{ blogStore.useApi ? '真实API' : '模拟数据' }}</span>
          </div>
          <button 
            @click="toggleApiMode" 
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            切换到{{ blogStore.useApi ? '模拟数据' : '真实API' }}
          </button>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <p>API Base URL: {{ apiBaseUrl }}</p>
          <p>当前模式: {{ blogStore.useApi ? '真实API模式（失败时自动降级到模拟数据）' : '模拟数据模式' }}</p>
        </div>
      </div>

      <!-- 接口测试 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- 文章列表测试 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">文章列表 API</h3>
          <button 
            @click="testPostsApi" 
            :disabled="loading.posts"
            class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {{ loading.posts ? '测试中...' : '测试 /posts' }}
          </button>
          <div v-if="results.posts" class="mt-4">
            <p class="text-sm">
              <span :class="results.posts.success ? 'text-green-600' : 'text-red-600'">
                {{ results.posts.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.posts.message }}
            </p>
            <pre v-if="results.posts.data" class="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 overflow-auto max-h-32">{{ JSON.stringify(results.posts.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- 分类列表测试 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">分类列表 API</h3>
          <button 
            @click="testCategoriesApi" 
            :disabled="loading.categories"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ loading.categories ? '测试中...' : '测试 /categories' }}
          </button>
          <div v-if="results.categories" class="mt-4">
            <p class="text-sm">
              <span :class="results.categories.success ? 'text-green-600' : 'text-red-600'">
                {{ results.categories.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.categories.message }}
            </p>
            <pre v-if="results.categories.data" class="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 overflow-auto max-h-32">{{ JSON.stringify(results.categories.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- 标签列表测试 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">标签列表 API</h3>
          <button 
            @click="testTagsApi" 
            :disabled="loading.tags"
            class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {{ loading.tags ? '测试中...' : '测试 /tags' }}
          </button>
          <div v-if="results.tags" class="mt-4">
            <p class="text-sm">
              <span :class="results.tags.success ? 'text-green-600' : 'text-red-600'">
                {{ results.tags.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.tags.message }}
            </p>
            <pre v-if="results.tags.data" class="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 overflow-auto max-h-32">{{ JSON.stringify(results.tags.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- 热门文章测试 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">热门文章 API</h3>
          <button 
            @click="testHotPostsApi" 
            :disabled="loading.hotPosts"
            class="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            {{ loading.hotPosts ? '测试中...' : '测试 /posts/hot' }}
          </button>
          <div v-if="results.hotPosts" class="mt-4">
            <p class="text-sm">
              <span :class="results.hotPosts.success ? 'text-green-600' : 'text-red-600'">
                {{ results.hotPosts.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.hotPosts.message }}
            </p>
            <pre v-if="results.hotPosts.data" class="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 overflow-auto max-h-32">{{ JSON.stringify(results.hotPosts.data, null, 2) }}</pre>
          </div>
        </div>
      <!-- 文章详情测试 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">文章详情 API</h3>
          <div class="flex items-center gap-2 mb-4">
            <input 
              v-model="postDetailId" 
              type="number" 
              placeholder="输入文章ID"
              class="px-3 py-1 border rounded w-24 text-black"
            >
            <button 
              @click="testPostDetailApi" 
              :disabled="loading.postDetail"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex-1"
            >
              {{ loading.postDetail ? '测试中...' : `测试 /post/${postDetailId}` }}
            </button>
          </div>
          <div v-if="results.postDetail" class="mt-4">
            <p class="text-sm">
              <span :class="results.postDetail.success ? 'text-green-600' : 'text-red-600'">
                {{ results.postDetail.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.postDetail.message }}
            </p>
            <pre v-if="results.postDetail.data" class="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 overflow-auto max-h-32">{{ JSON.stringify(results.postDetail.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- 分类详情测试 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">分类详情 API</h3>
          <div class="flex items-center gap-2 mb-4">
            <input 
              v-model="categoryDetailId" 
              type="number" 
              placeholder="输入分类ID"
              class="px-3 py-1 border rounded w-24 text-black"
            >
            <button 
              @click="testCategoryDetailApi" 
              :disabled="loading.categoryDetail"
              class="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 flex-1"
            >
              {{ loading.categoryDetail ? '测试中...' : `测试 /category/${categoryDetailId}` }}
            </button>
          </div>
          <div v-if="results.categoryDetail" class="mt-4">
            <p class="text-sm">
              <span :class="results.categoryDetail.success ? 'text-green-600' : 'text-red-600'">
                {{ results.categoryDetail.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.categoryDetail.message }}
            </p>
            <pre v-if="results.categoryDetail.data" class="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 overflow-auto max-h-32">{{ JSON.stringify(results.categoryDetail.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- 标签详情测试 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">标签详情 API</h3>
          <div class="flex items-center gap-2 mb-4">
            <input 
              v-model="tagDetailId" 
              type="number" 
              placeholder="输入标签ID"
              class="px-3 py-1 border rounded w-24 text-black"
            >
            <button 
              @click="testTagDetailApi" 
              :disabled="loading.tagDetail"
              class="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 flex-1"
            >
              {{ loading.tagDetail ? '测试中...' : `测试 /tag/${tagDetailId}` }}
            </button>
          </div>
          <div v-if="results.tagDetail" class="mt-4">
            <p class="text-sm">
              <span :class="results.tagDetail.success ? 'text-green-600' : 'text-red-600'">
                {{ results.tagDetail.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.tagDetail.message }}
            </p>
            <pre v-if="results.tagDetail.data" class="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 overflow-auto max-h-32">{{ JSON.stringify(results.tagDetail.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- 文章总数测试 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">文章总数 API</h3>
          <button 
            @click="testArticleCountApi" 
            :disabled="loading.articleCount"
            class="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            {{ loading.articleCount ? '测试中...' : '测试 /getAllArticleNumber' }}
          </button>
          <div v-if="results.articleCount" class="mt-4">
            <p class="text-sm">
              <span :class="results.articleCount.success ? 'text-green-600' : 'text-red-600'">
                {{ results.articleCount.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.articleCount.message }}
            </p>
            <pre v-if="results.articleCount.data" class="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 overflow-auto max-h-32">{{ JSON.stringify(results.articleCount.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- 搜索功能测试 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">搜索功能 API</h3>
          <div class="flex items-center gap-2 mb-4">
            <input 
              v-model="searchKeyword" 
              type="text" 
              placeholder="输入搜索关键词"
              class="px-3 py-1 border rounded flex-1 text-black"
            >
            <button 
              @click="testSearchApi" 
              :disabled="loading.search"
              class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
            >
              {{ loading.search ? '测试中...' : '搜索测试' }}
            </button>
          </div>
          <div v-if="results.search" class="mt-4">
            <p class="text-sm">
              <span :class="results.search.success ? 'text-green-600' : 'text-red-600'">
                {{ results.search.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.search.message }}
            </p>
            <pre v-if="results.search.data" class="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2 overflow-auto max-h-32">{{ JSON.stringify(results.search.data, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- 一键测试所有API -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold mb-4">批量测试</h3>
        <button 
          @click="testAllApis" 
          :disabled="isTestingAll"
          class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ isTestingAll ? '测试中...' : '测试所有 API' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '~/stores/blog'
import { postApi, categoryApi, tagApi } from '~/utils/apiService'

const blogStore = useBlogStore()

// 获取API基础URL
const getApiBaseUrl = () => {
  const config = useRuntimeConfig()
  return config.public.apiBase
}

const apiBaseUrl = getApiBaseUrl()

const loading = ref({
  posts: false,
  categories: false,
  tags: false,
  hotPosts: false,
  postDetail: false,
  categoryDetail: false,
  tagDetail: false,
  search: false,
  articleCount: false
})

const results = ref({
  posts: null,
  categories: null,
  tags: null,
  hotPosts: null,
  postDetail: null,
  categoryDetail: null,
  tagDetail: null,
  search: null,
  articleCount: null
})

// 测试用的ID和关键词
const postDetailId = ref(237)
const categoryDetailId = ref(20)
const tagDetailId = ref(1)
const searchKeyword = ref('vue')

const isTestingAll = ref(false)

const toggleApiMode = () => {
  blogStore.toggleApiMode(!blogStore.useApi)
}

const testPostsApi = async () => {
  loading.value.posts = true
  try {
    const data = await postApi.getPosts({ page: 1, size: 3 })
    results.value.posts = {
      success: true,
      message: `获取成功，共 ${data.data?.length || data.length || 0} 篇文章`,
      data: data
    }
  } catch (error) {
    results.value.posts = {
      success: false,
      message: error.toString(),
      data: null
    }
  } finally {
    loading.value.posts = false
  }
}

const testCategoriesApi = async () => {
  loading.value.categories = true
  try {
    const data = await categoryApi.getCategories()
    results.value.categories = {
      success: true,
      message: `获取成功，共 ${data.data?.length || data.length || 0} 个分类`,
      data: data
    }
  } catch (error) {
    results.value.categories = {
      success: false,
      message: error.toString(),
      data: null
    }
  } finally {
    loading.value.categories = false
  }
}

const testTagsApi = async () => {
  loading.value.tags = true
  try {
    const data = await tagApi.getTags()
    results.value.tags = {
      success: true,
      message: `获取成功，共 ${data.data?.length || data.length || 0} 个标签`,
      data: data
    }
  } catch (error) {
    results.value.tags = {
      success: false,
      message: error.toString(),
      data: null
    }
  } finally {
    loading.value.tags = false
  }
}

const testHotPostsApi = async () => {
  loading.value.hotPosts = true
  try {
    const data = await postApi.getHotPosts(5)
    results.value.hotPosts = {
      success: true,
      message: `获取成功，共 ${data.data?.length || data.length || 0} 篇热门文章`,
      data: data
    }
  } catch (error) {
    results.value.hotPosts = {
      success: false,
      message: error.toString(),
      data: null
    }
  } finally {
    loading.value.hotPosts = false
  }
}

const testAllApis = async () => {
  isTestingAll.value = true
  await Promise.all([
    testPostsApi(),
    testCategoriesApi(),
    testTagsApi(),
    testHotPostsApi(),
    testPostDetailApi(),
    testCategoryDetailApi(),
    testTagDetailApi(),
    testSearchApi(),
    testArticleCountApi()
  ])
  isTestingAll.value = false
}

// 新增的测试方法
const testPostDetailApi = async () => {
  if (!postDetailId.value) {
    results.value.postDetail = {
      success: false,
      message: '请输入有效的文章ID',
      data: null
    }
    return
  }
  
  loading.value.postDetail = true
  try {
    const data = await postApi.getPost(postDetailId.value)
    results.value.postDetail = {
      success: true,
      message: `获取成功，文章标题: ${data.title || '无标题'}`,
      data: data
    }
  } catch (error) {
    results.value.postDetail = {
      success: false,
      message: error.toString(),
      data: null
    }
  } finally {
    loading.value.postDetail = false
  }
}

const testCategoryDetailApi = async () => {
  if (!categoryDetailId.value) {
    results.value.categoryDetail = {
      success: false,
      message: '请输入有效的分类ID',
      data: null
    }
    return
  }
  
  loading.value.categoryDetail = true
  try {
    const data = await categoryApi.getCategory(categoryDetailId.value)
    results.value.categoryDetail = {
      success: true,
      message: `获取成功，分类名称: ${data.name || data || '无名称'}`,
      data: data
    }
  } catch (error) {
    results.value.categoryDetail = {
      success: false,
      message: error.toString(),
      data: null
    }
  } finally {
    loading.value.categoryDetail = false
  }
}

const testTagDetailApi = async () => {
  if (!tagDetailId.value) {
    results.value.tagDetail = {
      success: false,
      message: '请输入有效的标签ID',
      data: null
    }
    return
  }
  
  loading.value.tagDetail = true
  try {
    const data = await tagApi.getTag(tagDetailId.value)
    results.value.tagDetail = {
      success: true,
      message: `获取成功，标签名称: ${data.tagName || data || '无名称'}`,
      data: data
    }
  } catch (error) {
    results.value.tagDetail = {
      success: false,
      message: error.toString(),
      data: null
    }
  } finally {
    loading.value.tagDetail = false
  }
}

const testSearchApi = async () => {
  if (!searchKeyword.value.trim()) {
    results.value.search = {
      success: false,
      message: '请输入搜索关键词',
      data: null
    }
    return
  }
  
  loading.value.search = true
  try {
    const data = await postApi.searchPosts(searchKeyword.value, { page: 1, size: 5 })
    results.value.search = {
      success: true,
      message: `搜索关键词“${searchKeyword.value}”，找到 ${data.data?.length || data.length || 0} 篇相关文章`,
      data: data
    }
  } catch (error) {
    results.value.search = {
      success: false,
      message: error.toString(),
      data: null
    }
  } finally {
    loading.value.search = false
  }
}

const testArticleCountApi = async () => {
  loading.value.articleCount = true
  try {
    const data = await postApi.getArticleCount()
    results.value.articleCount = {
      success: true,
      message: `获取成功，数据库中共有 ${data.count || data || 0} 篇文章`,
      data: data
    }
  } catch (error) {
    results.value.articleCount = {
      success: false,
      message: error.toString(),
      data: null
    }
  } finally {
    loading.value.articleCount = false
  }
}
</script>