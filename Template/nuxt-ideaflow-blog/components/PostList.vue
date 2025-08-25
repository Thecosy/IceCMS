<template>
  <div class="space-y-4">
    <article
      v-for="(post, index) in posts"
      :key="post.id"
      class="group relative flex h-[190px] overflow-hidden rounded-lg bg-black md:h-60 lg:h-52 xl:h-60 dark:bg-gray-900"
    >
      <!-- 左侧图片 (偶数索引) -->
      <div
        v-if="index % 2 === 0"
        class="relative z-10 hidden min-w-[45%] scale-100 transform transition-all duration-500 hover:scale-125 sm:block"
        style="clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);"
      >
        <img 
          :src="post.cover || '/assets/img/article-avatar.png'" 
          :alt="post.title" 
          class="h-full w-full object-cover"
        />
      </div>

      <!-- 文章信息区域 -->
      <div class="relative z-20 w-full px-5 py-5 sm:w-[65%] sm:px-10 lg:px-5 xl:px-10">
        <router-link :to="`/post/${post.id}`" class="flex h-full flex-col justify-between text-center sm:text-start">
          <div>
            <h3 class="hover:text-primary-500 relative mb-2 line-clamp-1 w-full overflow-hidden text-lg text-white transition-colors md:text-xl lg:text-[22px] xl:text-2xl">
              {{ post.title }}
            </h3>

            <p class="line-clamp-2 text-sm leading-7 text-gray-300 sm:indent-8 sm:text-[15px] xl:line-clamp-3">
              {{ post.excerpt }}
            </p>
          </div>

          <!-- 文章元信息 -->
          <div class="flex flex-wrap items-center justify-center gap-2 space-x-4 pt-5">
            <!-- 发布时间 -->
            <div class="flex items-center text-xs text-white">
              <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time>{{ formatDate(post.publishTime) }}</time>
            </div>

            <!-- 浏览量 -->
            <div class="flex items-center text-xs text-white">
              <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{{ post.stats.visit }}</span>
            </div>

            <!-- 评论数 -->
            <div class="flex items-center text-xs text-white">
              <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{{ post.stats.comment }}</span>
            </div>

            <!-- 标签列表 -->
            <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <div
                v-for="tag in post.tags"
                :key="tag.spec.displayName"
                class="flex items-center whitespace-nowrap rounded-full bg-white bg-opacity-20 px-2 py-1 text-xs text-white transition-all duration-300 hover:bg-opacity-30"
              >
                <svg class="mr-1 h-2 w-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
                </svg>
                <span>{{ tag.spec.displayName }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <!-- 模糊背景 -->
      <div class="absolute h-60 w-full bg-cover bg-center brightness-[0.8] sm:blur-[2.5rem] sm:brightness-[0.6] dark:brightness-[0.5]">
        <img 
          :src="post.cover || '/assets/img/article-avatar.png'" 
          :alt="post.title"
          class="h-full w-full object-cover"
        />
      </div>

      <!-- 右侧图片 (奇数索引) -->
      <div
        v-if="index % 2 !== 0"
        class="relative z-10 hidden min-w-[45%] scale-100 transform bg-cover bg-center bg-no-repeat transition-all duration-500 hover:scale-125 sm:block"
        style="clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);"
      >
        <img
          :src="post.cover || '/assets/img/article-avatar.png'"
          :alt="post.title"
          class="h-full w-full object-cover"
        />
      </div>
    </article>

    <!-- 空状态展示 -->
    <div v-if="posts.length === 0" class="py-10 text-center text-gray-500 dark:text-gray-400">
      暂无文章
    </div>
  </div>
</template>

<script setup>
defineProps({
  posts: {
    type: Array,
    required: true
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>