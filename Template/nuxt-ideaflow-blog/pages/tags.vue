<template>
  <div class="relative min-h-screen bg-base-100">
    <!-- 背景图片和遮罩 -->
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000" style="background-image: url('/assets/img/imbg.avif');">
      <!-- 渐变遮罩 -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
    </div>

    <!-- 星空效果 -->
    <div class="absolute inset-0">
      <div
        v-for="star in stars"
        :key="star.id"
        class="absolute h-1 w-1 rounded-full bg-white star"
        :style="{ 
          left: star.x + '%', 
          top: star.y + '%',
          animationDelay: star.delay + 's',
          animationDuration: star.duration + 's'
        }"
      ></div>
    </div>

    <!-- 波浪效果 -->
    <div class="absolute bottom-0 left-0 w-full h-20">
      <svg
        class="absolute bottom-0 w-full h-20 text-white/10"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill="currentColor"
          class="wave"
        ></path>
      </svg>
    </div>
    
    <!-- 内容层 -->
    <div class="relative z-10">
      <Header :is-overlay="true" />
      
      <!-- 页面标题 - 类似首页Hero区域 -->
      <div class="flex h-96 flex-col items-center justify-center px-4 text-center text-white">
        <h1 class="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">标签云</h1>
        <p class="mb-8 max-w-2xl text-lg opacity-90 sm:text-xl">通过标签发现更多感兴趣的内容</p>
      </div>
    
      <main class="mx-auto max-w-6xl px-4 py-10">
        <!-- 标签列表 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div v-if="blogStore.tags.length > 0">
            <!-- 热门标签 -->
            <div class="mb-8">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg class="mr-2 h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                热门标签
              </h2>
              <div class="flex flex-wrap gap-3 mb-6">
                <router-link
                  v-for="tag in blogStore.tags.slice(0, 6)"
                  :key="tag.id"
                  :to="`/tag/${tag.id}`"
                  class="group relative"
                >
                  <div class="flex items-center space-x-2 rounded-full border-2 px-4 py-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
                       :style="{ 
                         borderColor: tag.color || '#f97316', 
                         backgroundColor: tag.color ? (tag.color + '20') : '#fed7aa',
                         color: tag.effect === 'dark' ? '#fff' : (tag.color || '#ea580c')
                       }">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
                    </svg>
                    <span class="font-medium">{{ tag.tagName || tag.spec?.displayName }}</span>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- 所有标签 -->
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg class="mr-2 h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
                </svg>
                全部标签
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <router-link
                  v-for="tag in blogStore.tags"
                  :key="tag.id"
                  :to="`/tag/${tag.id}`"
                  class="group block"
                >
                  <div class="rounded-lg border p-4 transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
                       :style="{ 
                         borderColor: tag.color || '#e5e7eb',
                         backgroundColor: tag.effect === 'dark' ? (tag.color ? tag.color + '10' : '#ffffff') : '#ffffff'
                       }">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3">
                        <!-- 标签图标 -->
                        <div class="flex-shrink-0">
                          <div class="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                               :style="{ backgroundColor: tag.color || '#3b82f6' }">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
                            </svg>
                          </div>
                        </div>
                        
                        <!-- 标签信息 -->
                        <div class="flex-1 min-w-0">
                          <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                            {{ tag.tagName || tag.spec?.displayName }}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-else class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5l7 7-7 7-5-5V3z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">暂无标签</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">还没有创建任何标签</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '~/stores/blog'

const blogStore = useBlogStore()

// 星空效果的星星
const stars = ref([])

// 生成随机星星
const generateStars = () => {
  stars.value = []
  for (let i = 0; i < 50; i++) {
    stars.value.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3
    })
  }
}

onMounted(() => {
  generateStars()
})
</script>

<style scoped>
.star {
  animation: startwinkle 2s infinite;
}

.wave {
  animation: wave 6s ease-in-out infinite;
}

@keyframes startwinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes wave {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-25px);
  }
}
</style>