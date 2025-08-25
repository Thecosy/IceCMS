<template>
  <div class="relative h-screen w-full overflow-hidden">
    <!-- 背景图片 -->
    <div
      v-if="backgroundImages.length > 0"
      class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
      :style="{ backgroundImage: `url(${currentBackground})` }"
    >
      <!-- 渐变遮罩 -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
    </div>

    <!-- 星空效果 - 使用ClientOnly避免hydration不匹配 -->
    <ClientOnly>
      <div
        v-if="appStore.themeConfig.common.showStarryEffect"
        class="absolute inset-0"
      >
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
    </ClientOnly>

    <!-- 波浪效果 -->
    <div
      v-if="appStore.themeConfig.common.showRippleEffect"
      class="absolute bottom-0 left-0 w-full h-20"
    >
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

    <!-- 内容区域 -->
    <div class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
      <h1 class="mb-4 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
        {{ appStore.siteConfig.title }}
      </h1>
      <p class="mb-8 max-w-2xl text-lg opacity-90 sm:text-xl">
        {{ appStore.siteConfig.description }}
      </p>
      
      <!-- 向下滚动提示 -->
      <div class="absolute bottom-8 animate-bounce">
        <svg class="h-6 w-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
const currentBackgroundIndex = ref(0)

// 背景图片
const backgroundImages = computed(() => appStore.backgroundImages)

// 当前背景
const currentBackground = computed(() => {
  if (backgroundImages.value.length === 0) return ''
  return backgroundImages.value[currentBackgroundIndex.value]?.url || ''
})

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

// 切换背景图片
const switchBackground = () => {
  if (backgroundImages.value.length > 1) {
    setInterval(() => {
      currentBackgroundIndex.value = (currentBackgroundIndex.value + 1) % backgroundImages.value.length
    }, 10000) // 10秒切换一次
  }
}

onMounted(() => {
  generateStars()
  switchBackground()
})
</script>