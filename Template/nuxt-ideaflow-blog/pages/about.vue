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
        <h1 class="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">关于我们</h1>
        <p class="mb-8 max-w-2xl text-lg opacity-90 sm:text-xl">了解我们的技术栈与特性</p>
      </div>
      
      <main class="mx-auto max-w-4xl px-4 py-10">
        
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div class="prose dark:prose-invert max-w-none">
          <p>欢迎来到 Ideaflow Blog！</p>
          
          <p>这是一个基于Vue 3构建的现代博客平台，灵感来源于Halo博客系统的Ideaflow主题。</p>
          
          <h2>技术栈</h2>
          <ul>
            <li>Vue 3 - 渐进式JavaScript框架</li>
            <li>Pinia - Vue状态管理库</li>
            <li>Vue Router - 官方路由管理器</li>
            <li>Tailwind CSS - 实用优先的CSS框架</li>
            <li>Vite - 快速的构建工具</li>
          </ul>
          
          <h2>特性</h2>
          <ul>
            <li>🌙 深色/浅色主题切换</li>
            <li>📱 响应式设计</li>
            <li>✨ 星空背景特效</li>
            <li>🎨 现代化的UI设计</li>
            <li>⚡ 快速的页面加载</li>
          </ul>
          
          <p>这个项目展示了如何将传统的服务端渲染模板转换为现代的Vue.js单页应用。</p>
        </div>
      </div>
    </main>
    <Footer />
    </div>
  </div>
</template>

<script setup>
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
