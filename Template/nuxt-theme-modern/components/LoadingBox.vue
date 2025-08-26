<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-hao-background">
    <div class="text-center">
      <!-- Loading Animation -->
      <div class="relative w-20 h-20 mx-auto mb-8">
        <div class="absolute inset-0 border-4 border-hao-primary/20 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-hao-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      <!-- Loading Text -->
      <div class="space-y-2">
        <h3 class="text-xl font-medium text-hao-text">{{ siteConfig.title }}</h3>
        <p class="text-hao-text-secondary animate-pulse">{{ loadingText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '~/stores/blog'

const blogStore = useBlogStore()
const siteConfig = computed(() => blogStore.siteConfig)

const loadingTexts = [
  '正在加载中...',
  '加载精彩内容...',
  '准备就绪...',
  '即将呈现...'
]

const loadingText = ref(loadingTexts[0])
let textIndex = 0

onMounted(() => {
  const interval = setInterval(() => {
    textIndex = (textIndex + 1) % loadingTexts.length
    loadingText.value = loadingTexts[textIndex]
  }, 1000)
  
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
</style>