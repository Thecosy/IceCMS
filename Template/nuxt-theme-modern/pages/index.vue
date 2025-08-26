<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="text-2xl font-bold text-blue-600">
            <nuxt-link to="/">{{ siteConfig.title }}</nuxt-link>
          </div>
          
          <!-- 桌面导航 -->
          <div class="hidden md:flex space-x-8">
            <nuxt-link 
              v-for="item in menuItems" 
              :key="item.path"
              :to="item.path" 
              class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              active-class="text-blue-600"
            >
              {{ item.name }}
            </nuxt-link>
          </div>

          <!-- 右侧工具 -->
          <div class="flex items-center space-x-4">
            <!-- 搜索按钮 -->
            <button
              @click="showSearchModal = true"
              class="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              title="搜索"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            <!-- 主题切换 -->
            <button
              @click="toggleTheme"
              class="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
            >
              <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
            </button>

            <!-- 移动端菜单按钮 -->
            <button
              @click="showMobileMenu = !showMobileMenu"
              class="md:hidden p-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 移动端导航菜单 -->
        <div v-if="showMobileMenu" class="md:hidden mt-4 pb-4 border-t pt-4">
          <div class="flex flex-col space-y-2">
            <nuxt-link 
              v-for="item in menuItems" 
              :key="item.path"
              :to="item.path"
              @click="showMobileMenu = false"
              class="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
              active-class="text-blue-600"
            >
              {{ item.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Hero 区域 -->
      <section class="text-center mb-16">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {{ siteConfig.title }}
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            {{ siteConfig.subtitle }}
          </p>
          <p class="text-lg text-gray-500 leading-relaxed">
            {{ siteConfig.description }}
          </p>
        </div>
      </section>

      <!-- 文章列表区域 -->
      <section>
        <!-- 区域标题 -->
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">最新文章</h2>
          <nuxt-link 
            to="/archives"
            class="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            查看全部
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </nuxt-link>
        </div>

        <!-- 文章网格 -->
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <article 
            v-for="post in posts" 
            :key="post.id"
            class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <!-- 封面图片 -->
            <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
              <img 
                v-if="post.cover"
                :src="post.cover" 
                :alt="post.title"
                class="w-full h-full object-cover"
              />
              <!-- 分类标签 -->
              <div v-if="post.categories && post.categories.length > 0" class="absolute top-4 left-4">
                <span 
                  :style="{ backgroundColor: post.categories[0].color }"
                  class="px-3 py-1 rounded-full text-white text-sm font-medium"
                >
                  {{ post.categories[0].name }}
                </span>
              </div>
              <!-- 置顶标识 -->
              <div v-if="post.pinned" class="absolute top-4 right-4">
                <span class="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  置顶
                </span>
              </div>
            </div>

            <!-- 文章内容 -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                <nuxt-link :to="`/posts/${post.id}`">
                  {{ post.title }}
                </nuxt-link>
              </h3>
              
              <p class="text-gray-600 mb-4 leading-relaxed">
                {{ post.summary }}
              </p>

              <!-- 标签 -->
              <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
                <nuxt-link
                  v-for="tag in post.tags.slice(0, 3)"
                  :key="tag.slug"
                  :to="`/tags/${tag.slug}`"
                  :style="{ color: tag.color }"
                  class="text-sm hover:underline"
                >
                  #{{ tag.name }}
                </nuxt-link>
              </div>

              <!-- 文章元信息 -->
              <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center space-x-4">
                  <span>{{ formatDate(post.publishTime) }}</span>
                  <span>{{ post.stats.views }} 阅读</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  <span>{{ post.stats.likes }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- 加载更多按钮 -->
        <div v-if="hasMore" class="text-center mt-12">
          <button
            @click="loadMore"
            :disabled="loading"
            class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {{ loading ? '加载中...' : '加载更多' }}
          </button>
        </div>
      </section>
    </main>

    <!-- 搜索模态框 -->
    <div v-if="showSearchModal" class="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div @click="showSearchModal = false" class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div class="p-6">
          <div class="flex items-center space-x-4 mb-4">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章..."
              class="flex-1 text-xl outline-none"
              @keyup.enter="search"
              @keyup.escape="showSearchModal = false"
            />
            <button @click="showSearchModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="text-sm text-gray-500">
            按 Enter 搜索，ESC 关闭
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="bg-white border-t mt-20">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid md:grid-cols-4 gap-8">
          <!-- 站点信息 -->
          <div class="md:col-span-2">
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ siteConfig.title }}</h3>
            <p class="text-gray-600 mb-4">{{ siteConfig.description }}</p>
            <div class="flex space-x-4">
              <a 
                v-for="(url, platform) in siteConfig.author.social"
                :key="platform"
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-blue-600 transition-colors"
                :title="`访问${platform}`"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path v-if="platform === 'github'" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1.003.07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                  <path v-else-if="platform === 'twitter'" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23Z"/>
                  <circle v-else cx="12" cy="12" r="10"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- 快速链接 -->
          <div>
            <h4 class="font-semibold text-gray-900 mb-4">快速链接</h4>
            <ul class="space-y-2">
              <li><nuxt-link to="/categories" class="text-gray-600 hover:text-blue-600 transition-colors">分类</nuxt-link></li>
              <li><nuxt-link to="/tags" class="text-gray-600 hover:text-blue-600 transition-colors">标签</nuxt-link></li>
              <li><nuxt-link to="/archives" class="text-gray-600 hover:text-blue-600 transition-colors">归档</nuxt-link></li>
              <li><nuxt-link to="/about" class="text-gray-600 hover:text-blue-600 transition-colors">关于</nuxt-link></li>
            </ul>
          </div>

          <!-- 统计信息 -->
          <div>
            <h4 class="font-semibold text-gray-900 mb-4">统计信息</h4>
            <ul class="space-y-2 text-gray-600">
              <li>{{ posts.length }} 篇文章</li>
              <li>{{ totalViews }} 次阅读</li>
              <li>{{ totalLikes }} 个赞</li>
            </ul>
          </div>
        </div>

        <div class="border-t pt-8 mt-8 text-center text-gray-500">
          <p>{{ siteConfig.footer.copyright }}</p>
        </div>
      </div>
    </footer>

    <!-- 回到顶部按钮 -->
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-30"
      title="回到顶部"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
// 模拟数据
const siteConfig = {
  title: "Hao Blog",
  subtitle: "分享技术与生活",
  description: "一个基于Nuxt 3的现代化博客主题，专注于技术分享和生活记录。",
  author: {
    name: "Hao",
    bio: "热爱技术的前端开发者",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hao",
    social: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "mailto:hello@example.com"
    }
  },
  footer: {
    copyright: "© 2024 Hao Blog. All rights reserved."
  }
}

const menuItems = [
  { name: "首页", path: "/" },
  { name: "分类", path: "/categories" },
  { name: "标签", path: "/tags" },
  { name: "归档", path: "/archives" },
  { name: "关于", path: "/about" }
]

const posts = [
  {
    id: 1,
    title: "Hao主题：优雅的博客体验",
    summary: "介绍这个基于Nuxt 3开发的现代化博客主题，具有响应式设计、暗色模式、动画效果等特色功能。",
    cover: "https://picsum.photos/800/400?random=1",
    publishTime: "2024-08-25T10:00:00.000Z",
    categories: [{ name: "前端开发", slug: "frontend", color: "#3b82f6" }],
    tags: [
      { name: "Nuxt3", slug: "nuxt3", color: "#00dc82" },
      { name: "Vue3", slug: "vue3", color: "#4fc08d" },
      { name: "TailwindCSS", slug: "tailwindcss", color: "#06b6d4" }
    ],
    stats: { views: 1250, likes: 32, comments: 8 },
    pinned: true
  },
  {
    id: 2,
    title: "JavaScript高级特性解析",
    summary: "深入探讨JavaScript的高级特性，包括闭包、原型链、异步编程等核心概念。",
    cover: "https://picsum.photos/800/400?random=2",
    publishTime: "2024-08-24T14:30:00.000Z",
    categories: [{ name: "前端开发", slug: "frontend", color: "#3b82f6" }],
    tags: [
      { name: "JavaScript", slug: "javascript", color: "#f7df1e" },
      { name: "编程基础", slug: "programming", color: "#6366f1" }
    ],
    stats: { views: 890, likes: 23, comments: 5 },
    pinned: false
  },
  {
    id: 3,
    title: "现代CSS布局技巧",
    summary: "掌握Flexbox、Grid和现代CSS特性，打造响应式的精美界面。",
    cover: "https://picsum.photos/800/400?random=3",
    publishTime: "2024-08-23T09:15:00.000Z",
    categories: [{ name: "前端开发", slug: "frontend", color: "#3b82f6" }],
    tags: [
      { name: "CSS", slug: "css", color: "#1572b6" },
      { name: "响应式设计", slug: "responsive", color: "#ec4899" }
    ],
    stats: { views: 756, likes: 19, comments: 12 },
    pinned: false
  },
  {
    id: 4,
    title: "Vue 3 Composition API实战",
    summary: "通过实际案例学习Vue 3的Composition API，提升组件复用能力。",
    cover: "https://picsum.photos/800/400?random=4",
    publishTime: "2024-08-22T16:45:00.000Z",
    categories: [{ name: "Vue开发", slug: "vue", color: "#4fc08d" }],
    tags: [
      { name: "Vue3", slug: "vue3", color: "#4fc08d" },
      { name: "Composition API", slug: "composition-api", color: "#42b883" }
    ],
    stats: { views: 1123, likes: 28, comments: 7 },
    pinned: false
  },
  {
    id: 5,
    title: "TypeScript进阶教程",
    summary: "从基础到进阶，全面掌握TypeScript的类型系统和高级特性。",
    cover: "https://picsum.photos/800/400?random=5",
    publishTime: "2024-08-21T11:20:00.000Z",
    categories: [{ name: "前端开发", slug: "frontend", color: "#3b82f6" }],
    tags: [
      { name: "TypeScript", slug: "typescript", color: "#3178c6" },
      { name: "类型系统", slug: "type-system", color: "#7c3aed" }
    ],
    stats: { views: 945, likes: 35, comments: 9 },
    pinned: false
  },
  {
    id: 6,
    title: "Node.js全栈开发指南",
    summary: "使用Node.js构建现代Web应用，涵盖后端API开发和数据库操作。",
    cover: "https://picsum.photos/800/400?random=6",
    publishTime: "2024-08-20T13:30:00.000Z",
    categories: [{ name: "后端开发", slug: "backend", color: "#ef4444" }],
    tags: [
      { name: "Node.js", slug: "nodejs", color: "#339933" },
      { name: "全栈开发", slug: "fullstack", color: "#8b5cf6" }
    ],
    stats: { views: 667, likes: 16, comments: 4 },
    pinned: false
  }
]

// 响应式数据
const showSearchModal = ref(false)
const showMobileMenu = ref(false)
const searchQuery = ref('')
const loading = ref(false)
const hasMore = ref(false)
const isDark = ref(false)
const showBackToTop = ref(false)

// 计算属性
const totalViews = computed(() => posts.reduce((total, post) => total + post.stats.views, 0))
const totalLikes = computed(() => posts.reduce((total, post) => total + post.stats.likes, 0))

// 方法
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric'
  })
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('darkMode', isDark.value.toString())
}

const loadMore = () => {
  loading.value = true
  // 模拟加载更多
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

const search = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
    showSearchModal.value = false
    searchQuery.value = ''
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 生命周期
onMounted(() => {
  // 初始化主题
  const savedTheme = localStorage.getItem('darkMode')
  if (savedTheme !== null) {
    isDark.value = savedTheme === 'true'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  document.documentElement.classList.toggle('dark', isDark.value)
  
  // 滚动监听
  const handleScroll = () => {
    showBackToTop.value = window.scrollY > 300
  }
  window.addEventListener('scroll', handleScroll)
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

// SEO
useHead({
  title: siteConfig.title,
  meta: [
    { name: 'description', content: siteConfig.description },
    { property: 'og:title', content: siteConfig.title },
    { property: 'og:description', content: siteConfig.description },
    { property: 'og:type', content: 'website' }
  ]
})
</script>