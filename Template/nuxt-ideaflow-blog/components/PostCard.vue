<template>
  <article class="group">
    <div class="rounded-lg overflow-hidden relative block cursor-pointer border border-gray-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <router-link :to="`/post/${post.id}`">
        <!-- 封面图片 -->
        <div class="relative flex h-48 items-center justify-center overflow-hidden rounded-br-lg">
          <!-- 置顶标识 -->
          <div
            v-if="post.ontop || post.isTop"
            class="absolute left-0 top-0 z-10 bg-gradient-to-r from-violet-500/90 to-purple-400/90 px-2 py-1 text-xs rounded-br-lg text-white"
          >
            置顶
          </div>

          <!-- 有封面图片 -->
          <template v-if="post.thumb || post.cover">
            <ImageLazy
              :src="post.thumb || post.cover"
              :alt="post.title"
              container-class="h-48"
              image-class="h-full w-full transform object-cover filter transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-105 dark:brightness-75 dark:contrast-125"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          </template>
          
          <!-- 无封面图片 -->
          <template v-else>
            <div class="flex h-full w-full transform items-center justify-center bg-gradient-to-br from-blue-50 to-violet-50 transition-all duration-500 ease-out group-hover:scale-105 dark:from-gray-700 dark:to-gray-600">
              <p class="font-title text-center text-lg text-gray-600 transition-colors group-hover:text-primary dark:text-gray-300">
                遇事不决，可问春风
              </p>
            </div>
          </template>
        </div>

        <!-- 文章内容 -->
        <div class="bg-base-100 p-5">
          <!-- 标题 -->
          <h2 class="group-hover:text-primary-500 mb-3 truncate text-lg text-gray-900 transition-colors md:text-xl dark:text-white">
            {{ post.title }}
          </h2>

          <!-- 摘要 -->
          <p class="mb-4 line-clamp-1 text-sm text-gray-600 dark:text-gray-400">
            {{ post.intro || post.excerpt || '暨无摘要' }}
          </p>

          <!-- 元信息 -->
          <div class="mb-4 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <!-- 发布时间 -->
            <div class="flex items-center">
              <svg class="mr-1 h-4 w-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time>{{ formatDate(post.createTime || post.addTime) }}</time>
            </div>

            <!-- 浏览量 -->
            <div class="flex items-center">
              <svg class="mr-1 h-4 w-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{{ post.hits || 0 }}</span>
            </div>

            <!-- 评论数 -->
            <div class="flex items-center">
              <svg class="mr-1 h-4 w-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{{ post.commentNum || 0 }}</span>
            </div>
          </div>

          <!-- 标签列表 -->
          <div v-if="postTags.length > 0" class="flex flex-wrap gap-2">
            <span
              v-for="tag in postTags"
              :key="tag.id || tag.spec?.displayName"
              class="bg-primary-50 text-primary-600 dark:bg-primary-900/10 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 flex items-center rounded-full px-2 py-1 text-xs font-medium transition-colors cursor-pointer"
              @click.prevent="$router.push(`/tag/${tag.id || tag.spec?.slug}`)"
            >
              <svg class="mr-1 h-3 w-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
              </svg>
              <span>{{ tag.tagName || tag.spec?.displayName || tag.name }}</span>
            </span>
          </div>
        </div>

        <!-- 底部装饰线 -->
        <div class="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-green-300 via-cyan-300 to-blue-300 transition-all duration-300 group-hover:left-0 group-hover:w-full dark:from-green-400 dark:via-cyan-400 dark:to-blue-400"></div>
      </router-link>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBlogStore } from '~/stores/blog'

const blogStore = useBlogStore()

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// 处理标签数据 - 将keyword字符串转换为标签对象
const postTags = computed(() => {
  if (!props.post.keyword) return []
  
  // 如果是旧数据结构，直接返回
  if (props.post.tags && Array.isArray(props.post.tags)) {
    return props.post.tags
  }
  
  // 处理新API的keyword字符串
  const keywordIds = props.post.keyword.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
  const allTags = blogStore.tags || []
  
  return keywordIds.map(id => {
    const tag = allTags.find(t => t.id === id)
    return tag || { id, tagName: `Tag${id}`, name: `Tag${id}` }
  })
})

const fallbackDiv = ref(null)

const handleImageError = (event) => {
  event.target.style.display = 'none'
  if (fallbackDiv.value) {
    fallbackDiv.value.style.display = 'flex'
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>