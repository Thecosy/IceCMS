<template>
  <div class="min-h-screen bg-base-100">
    <Header />
    
    <main class="mx-auto max-w-4xl px-4 py-10">
      <!-- 骨架屏 -->
      <PostDetailSkeleton v-if="pending" />
      
      <article v-else-if="post" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <!-- 文章头图 -->
        <div v-if="post.thumb || post.cover" class="relative h-64 sm:h-80">
          <ImageLazy 
            :src="post.thumb || post.cover" 
            :alt="post.title" 
            container-class="h-64 sm:h-80"
            image-class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        <!-- 文章内容 -->
        <div class="p-8">
          <!-- 标题 -->
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {{ post.title }}
          </h1>
          
          <!-- 文章信息 -->
          <div class="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
            <time :datetime="post.createTime || post.addTime">
              {{ formatDate(post.createTime || post.addTime) }}
            </time>
            <span>{{ post.hits || 0 }} 次阅读</span>
            <span>{{ post.commentNum || 0 }} 评论</span>
            <span v-if="post.loveNum">{{ post.loveNum }} 点赞</span>
            <span v-if="post.authorName" class="flex items-center">
              <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {{ post.authorName }}
            </span>
          </div>
          
          <!-- 分类和标签 -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span v-if="post.className || post.sortClass" 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
              <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-4H9m6 8H7" />
              </svg>
              {{ post.className || post.sortClass }}
            </span>
            <template v-for="tag in postTags" :key="tag.id">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :style="{ 
                      backgroundColor: tag.color ? (tag.color + '20') : '#f3f4f6',
                      color: tag.color || '#374151'
                    }">
                <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
                </svg>
                {{ tag.tagName || tag.name }}
              </span>
            </template>
          </div>
          
          <!-- 文章摘要/内容 -->
          <div class="prose dark:prose-invert max-w-none">
            <!-- 文章摘要 -->
            <div v-if="post.intro" class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <p class="text-blue-800 dark:text-blue-300 font-medium">{{ post.intro }}</p>
            </div>
            
            <!-- 文章正文 -->
            <div v-if="post.content" class="article-content" v-html="post.content"></div>
            
            <!-- 如果没有正文，显示摘要 -->
            <div v-else-if="post.intro" class="text-gray-600 dark:text-gray-400">
              <p>{{ post.intro }}</p>
            </div>
            
            <!-- 如果都没有，显示默认内容 -->
            <div v-else class="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p class="text-gray-600 dark:text-gray-400">
                这篇文章暂时没有详细内容。
              </p>
            </div>
          </div>
        </div>
      </article>
      
      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">文章未找到</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">抱歉，您访问的文章不存在或已被删除。</p>
        <NuxtLink to="/" class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </NuxtLink>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { useBlogStore } from '~/stores/blog'

const route = useRoute()
const blogStore = useBlogStore()

// 获取文章ID
const postId = computed(() => parseInt(route.params.id))

// 查找文章
const { data: post, pending } = await useLazyAsyncData(`post-${postId.value}`, () => {
  return blogStore.getPostById(postId.value)
})

// 处理标签数据 - 将keyword字符串转换为标签对象
const postTags = computed(() => {
  if (!post.value?.keyword) return []
  
  // 处理API的keyword字符串
  const keywordIds = post.value.keyword.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
  const allTags = blogStore.tags || []
  
  return keywordIds.map(id => {
    const tag = allTags.find(t => t.id === id)
    return tag || { id, tagName: `Tag${id}`, name: `Tag${id}` }
  })
})

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 设置页面标题
useHead(() => ({
  title: post.value ? `${post.value.title} - Ideaflow Blog` : '文章未找到 - Ideaflow Blog'
}))
</script>

<style scoped>
/* 文章内容样式 */
.article-content {
  @apply text-gray-800 dark:text-gray-200;
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4,
.article-content h5,
.article-content h6 {
  @apply font-bold text-gray-900 dark:text-white mb-4 mt-6;
}

.article-content h1 { @apply text-2xl; }
.article-content h2 { @apply text-xl; }
.article-content h3 { @apply text-lg; }

.article-content p {
  @apply mb-4 leading-relaxed;
}

.article-content blockquote {
  @apply border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg my-4 italic text-blue-800 dark:text-blue-300;
}

.article-content pre {
  @apply bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4;
}

.article-content code {
  @apply bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm;
}

.article-content ul,
.article-content ol {
  @apply mb-4 pl-6;
}

.article-content li {
  @apply mb-2;
}

.article-content a {
  @apply text-blue-600 dark:text-blue-400 hover:underline;
}

.article-content img {
  @apply max-w-full h-auto rounded-lg shadow-md my-4;
}
</style>