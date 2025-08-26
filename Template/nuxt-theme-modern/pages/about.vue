<template>
  <div class="min-h-screen">
    <div class="lg:ml-64 px-6 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <div class="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden bg-gradient-to-br from-hao-primary to-hao-accent shadow-xl">
            <img
              :src="siteConfig.author.avatar"
              :alt="siteConfig.author.name"
              class="w-full h-full object-cover"
            />
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-hao-text mb-4">
            关于 {{ siteConfig.author.name }}
          </h1>
          <p class="text-xl text-hao-text-secondary max-w-2xl mx-auto leading-relaxed">
            {{ siteConfig.author.bio }}
          </p>
        </div>

        <!-- About Content -->
        <div class="prose prose-lg max-w-none dark:prose-invert mx-auto">
          <div class="hao-card mb-8">
            <h2 class="text-2xl font-bold text-hao-text mb-4 flex items-center">
              <Icon name="user" class="w-6 h-6 mr-3 text-hao-primary" />
              关于博客
            </h2>
            <p class="text-hao-text-secondary leading-relaxed mb-4">
              欢迎来到{{ siteConfig.title }}！这里是我分享技术见解、学习笔记和生活感悟的地方。
            </p>
            <p class="text-hao-text-secondary leading-relaxed">
              {{ siteConfig.description }}
            </p>
          </div>

          <div class="hao-card mb-8">
            <h2 class="text-2xl font-bold text-hao-text mb-4 flex items-center">
              <Icon name="heart" class="w-6 h-6 mr-3 text-hao-primary" />
              技术栈
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-semibold text-hao-text mb-3">前端开发</h3>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-sm">Vue.js</span>
                  <span class="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full text-sm">Nuxt 3</span>
                  <span class="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-full text-sm">JavaScript</span>
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-sm">TypeScript</span>
                  <span class="px-3 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400 rounded-full text-sm">TailwindCSS</span>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-hao-text mb-3">后端开发</h3>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full text-sm">Node.js</span>
                  <span class="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-full text-sm">Java</span>
                  <span class="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 rounded-full text-sm">Spring Boot</span>
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-sm">MySQL</span>
                </div>
              </div>
            </div>
          </div>

          <div class="hao-card">
            <h2 class="text-2xl font-bold text-hao-text mb-4 flex items-center">
              <Icon name="link" class="w-6 h-6 mr-3 text-hao-primary" />
              联系方式
            </h2>
            <div class="grid md:grid-cols-3 gap-6">
              <a
                v-for="(url, platform) in siteConfig.author.social"
                :key="platform"
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200 group"
              >
                <div class="w-10 h-10 rounded-full bg-hao-primary/10 flex items-center justify-center text-hao-primary group-hover:bg-hao-primary group-hover:text-white transition-all duration-200">
                  <Icon :name="platform" class="w-5 h-5" />
                </div>
                <div>
                  <div class="font-medium text-hao-text capitalize">{{ platform }}</div>
                  <div class="text-sm text-hao-text-secondary">点击访问</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Blog Stats -->
        <div class="mt-12">
          <div class="bg-gradient-to-r from-hao-primary to-hao-accent rounded-2xl p-8 text-white text-center">
            <h3 class="text-2xl font-bold mb-6">博客统计</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div class="text-3xl font-bold mb-1">{{ totalPosts }}</div>
                <div class="text-sm opacity-90">篇文章</div>
              </div>
              <div>
                <div class="text-3xl font-bold mb-1">{{ totalCategories }}</div>
                <div class="text-sm opacity-90">个分类</div>
              </div>
              <div>
                <div class="text-3xl font-bold mb-1">{{ totalTags }}</div>
                <div class="text-sm opacity-90">个标签</div>
              </div>
              <div>
                <div class="text-3xl font-bold mb-1">{{ totalViews }}</div>
                <div class="text-sm opacity-90">次阅读</div>
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

const siteConfig = computed(() => blogStore.siteConfig)
const totalPosts = computed(() => blogStore.posts.items.length)
const totalCategories = computed(() => blogStore.categories.length)
const totalTags = computed(() => blogStore.tags.length)
const totalViews = computed(() => {
  return blogStore.posts.items.reduce((total, post) => total + post.stats.views, 0)
})

// SEO
useHead({
  title: '关于',
  meta: [
    { name: 'description', content: `了解更多关于${siteConfig.value.author.name}和${siteConfig.value.title}的信息` },
    { property: 'og:title', content: '关于' },
    { property: 'og:description', content: `了解更多关于${siteConfig.value.author.name}和${siteConfig.value.title}的信息` },
    { property: 'og:type', content: 'website' }
  ]
})
</script>

<style scoped>
.prose h2 {
  color: rgb(30 41 59 / var(--tw-text-opacity));
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1rem;
}

.dark .prose h2 {
  color: rgb(241 245 249 / var(--tw-text-opacity));
}
</style>