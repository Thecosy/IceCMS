<template>
  <div class="relative min-h-screen bg-base-100">
    <!-- 背景图片 -->
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
        <h1 class="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">文章分类</h1>
        <p class="mb-8 max-w-2xl text-lg opacity-90 sm:text-xl">浏览所有分类下的精彩内容</p>
      </div>
    
    <main class="mx-auto max-w-6xl px-4 py-10">

      <!-- 分类列表 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <CategoryTree :categories="blogStore.categories" />
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