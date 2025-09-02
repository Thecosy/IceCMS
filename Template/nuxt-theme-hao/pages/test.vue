<template>
  <div class="test-page">
    <Header />
    
    <div class="test-container">
      <h1 class="test-title">API 调试页面</h1>
      
      <!-- API状态 -->
      <div class="status-card">
        <h2 class="status-title">API 状态</h2>
        <div class="status-controls">
          <div class="status-indicator">
            <div :class="blogStore.useApi ? 'status-dot active' : 'status-dot inactive'"></div>
            <span>{{ blogStore.useApi ? '真实API' : '模拟数据' }}</span>
          </div>
          <button 
            @click="toggleApiMode" 
            class="btn btn-primary"
          >
            切换到{{ blogStore.useApi ? '模拟数据' : '真实API' }}
          </button>
        </div>
        <div class="status-info">
          <p>API Base URL: {{ apiBaseUrl }}</p>
          <p>当前模式: {{ blogStore.useApi ? '真实API模式（失败时自动降级到模拟数据）' : '模拟数据模式' }}</p>
        </div>
      </div>

      <!-- 接口测试 -->
      <div class="test-grid">
        <!-- 文章列表测试 -->
        <div class="test-card">
          <h3 class="test-card-title">文章列表 API</h3>
          <button 
            @click="testPostsApi" 
            :disabled="loading.posts"
            class="btn btn-success"
            style="width: 100%;"
          >
            {{ loading.posts ? '测试中...' : '测试 /posts' }}
          </button>
          <div v-if="results.posts" class="test-result">
            <p class="test-result-text">
              <span :class="results.posts.success ? 'success' : 'error'">
                {{ results.posts.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.posts.message }}
            </p>
            <pre v-if="results.posts.data" class="result-data">{{ JSON.stringify(results.posts.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- 分类列表测试 -->
        <div class="test-card">
          <h3 class="test-card-title">分类列表 API</h3>
          <button 
            @click="testCategoriesApi" 
            :disabled="loading.categories"
            class="btn btn-info"
            style="width: 100%;"
          >
            {{ loading.categories ? '测试中...' : '测试 /categories' }}
          </button>
          <div v-if="results.categories" class="test-result">
            <p class="test-result-text">
              <span :class="results.categories.success ? 'success' : 'error'">
                {{ results.categories.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.categories.message }}
            </p>
            <pre v-if="results.categories.data" class="result-data">{{ JSON.stringify(results.categories.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- 标签列表测试 -->
        <div class="test-card">
          <h3 class="test-card-title">标签列表 API</h3>
          <button 
            @click="testTagsApi" 
            :disabled="loading.tags"
            class="btn btn-purple"
            style="width: 100%;"
          >
            {{ loading.tags ? '测试中...' : '测试 /tags' }}
          </button>
          <div v-if="results.tags" class="test-result">
            <p class="test-result-text">
              <span :class="results.tags.success ? 'success' : 'error'">
                {{ results.tags.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.tags.message }}
            </p>
            <pre v-if="results.tags.data" class="result-data">{{ JSON.stringify(results.tags.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- 热门文章测试 -->
        <div class="test-card">
          <h3 class="test-card-title">热门文章 API</h3>
          <button 
            @click="testHotPostsApi" 
            :disabled="loading.hotPosts"
            class="btn btn-warning"
            style="width: 100%;"
          >
            {{ loading.hotPosts ? '测试中...' : '测试 /posts/hot' }}
          </button>
          <div v-if="results.hotPosts" class="test-result">
            <p class="test-result-text">
              <span :class="results.hotPosts.success ? 'success' : 'error'">
                {{ results.hotPosts.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.hotPosts.message }}
            </p>
            <pre v-if="results.hotPosts.data" class="result-data">{{ JSON.stringify(results.hotPosts.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- 文章详情测试 -->
        <div class="test-card">
          <h3 class="test-card-title">文章详情 API</h3>
          <div class="test-input-group">
            <input 
              v-model="postDetailId" 
              type="number" 
              placeholder="输入文章ID"
              class="test-input small"
            >
            <button 
              @click="testPostDetailApi" 
              :disabled="loading.postDetail"
              class="btn btn-danger"
              style="flex: 1;"
            >
              {{ loading.postDetail ? '测试中...' : `测试 /post/${postDetailId}` }}
            </button>
          </div>
          <div v-if="results.postDetail" class="test-result">
            <p class="test-result-text">
              <span :class="results.postDetail.success ? 'success' : 'error'">
                {{ results.postDetail.success ? '✓ 成功' : '✗ 失败' }}
              </span>
              - {{ results.postDetail.message }}
            </p>
            <pre v-if="results.postDetail.data" class="result-data">{{ JSON.stringify(results.postDetail.data, null, 2) }}</pre>
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
      <div class="batch-card">
        <h3 class="batch-title">批量测试</h3>
        <button 
          @click="testAllApis" 
          :disabled="isTestingAll"
          class="btn btn-indigo"
          style="padding: 0.75rem 1.5rem;"
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

<style scoped>
.test-page {
  min-height: 100vh;
  background: var(--heo-background, #f8f9fa);
  padding: 2rem;
  color: var(--heo-fontcolor, #333);
}

.test-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 5rem;
}

.test-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: var(--heo-fontcolor, #333);
  text-align: center;
}

.status-card, .test-card, .batch-card {
  background: var(--heo-card-bg, #fff);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--heo-border-color, #e5e7eb);
}

.status-title, .test-card-title, .batch-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--heo-fontcolor, #333);
}

.status-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.status-indicator {
  display: flex;
  align-items: center;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.status-dot.active {
  background-color: #10b981;
}

.status-dot.inactive {
  background-color: #f59e0b;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn-success {
  background-color: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #059669;
}

.btn-info {
  background-color: #06b6d4;
  color: white;
}

.btn-info:hover:not(:disabled) {
  background-color: #0891b2;
}

.btn-warning {
  background-color: #f59e0b;
  color: white;
}

.btn-warning:hover:not(:disabled) {
  background-color: #d97706;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.btn-purple {
  background-color: #8b5cf6;
  color: white;
}

.btn-purple:hover:not(:disabled) {
  background-color: #7c3aed;
}

.btn-pink {
  background-color: #ec4899;
  color: white;
}

.btn-pink:hover:not(:disabled) {
  background-color: #db2777;
}

.btn-cyan {
  background-color: #06b6d4;
  color: white;
}

.btn-cyan:hover:not(:disabled) {
  background-color: #0891b2;
}

.btn-teal {
  background-color: #14b8a6;
  color: white;
}

.btn-teal:hover:not(:disabled) {
  background-color: #0d9488;
}

.btn-indigo {
  background-color: #6366f1;
  color: white;
}

.btn-indigo:hover:not(:disabled) {
  background-color: #4f46e5;
}

.status-info {
  font-size: 0.875rem;
  color: var(--heo-secondtext, #666);
  line-height: 1.5;
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.test-input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.test-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--heo-border-color, #e5e7eb);
  border-radius: 6px;
  font-size: 0.875rem;
  background: var(--heo-background, #fff);
  color: var(--heo-fontcolor, #333);
}

.test-input.small {
  width: 6rem;
}

.test-input.full {
  flex: 1;
}

.test-result {
  margin-top: 1rem;
}

.test-result-text {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.success {
  color: #10b981;
}

.error {
  color: #ef4444;
}

.result-data {
  font-size: 0.75rem;
  background: var(--heo-background, #f8f9fa);
  padding: 0.75rem;
  border-radius: 6px;
  max-height: 8rem;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
  border: 1px solid var(--heo-border-color, #e5e7eb);
  font-family: 'Courier New', monospace;
}

@media (max-width: 768px) {
  .test-page {
    padding: 1rem;
  }
  
  .test-container {
    padding-top: 2rem;
  }
  
  .test-title {
    font-size: 1.5rem;
  }
  
  .test-grid {
    grid-template-columns: 1fr;
  }
  
  .status-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .test-input-group {
    flex-direction: column;
  }
}

/* 深色模式适配 */
[data-theme="dark"] .status-card,
[data-theme="dark"] .test-card,
[data-theme="dark"] .batch-card {
  background: var(--heo-card-bg);
  border-color: var(--heo-border-color);
}

[data-theme="dark"] .test-input {
  background: var(--heo-background);
  border-color: var(--heo-border-color);
  color: var(--heo-fontcolor);
}

[data-theme="dark"] .result-data {
  background: var(--heo-background);
  border-color: var(--heo-border-color);
}
</style>