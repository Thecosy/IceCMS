<template>
  <div id="app" :class="{ 'dark': isDark }" class="min-h-screen bg-base-100 transition-colors duration-300">
    <NuxtPage />
    <!-- 搜索模态框 - 使用ClientOnly包装 -->
    <ClientOnly>
      <SearchModal />
    </ClientOnly>
  </div>
</template>

<script setup>
import { useAppStore } from '~/stores/app'
import { useBlogStore } from '~/stores/blog'

const appStore = useAppStore()
const blogStore = useBlogStore()
const isDark = computed(() => appStore?.isDark || false)

// 服务端渲染时预设主题
const colorMode = isDark.value ? 'dark' : 'light'

onMounted(() => {
  // 初始化主题
  if (appStore?.initTheme) {
    appStore.initTheme()
  }
  
  // 初始化博客数据
  blogStore.initializeData()
  
  // 确保hydration后显示内容
  nextTick(() => {
    const nuxtEl = document.getElementById('__nuxt')
    if (nuxtEl && !nuxtEl.classList.contains('hydrated')) {
      nuxtEl.classList.add('hydrated')
    }
  })
})

// 设置页面头部
useHead({
  htmlAttrs: {
    lang: 'zh-CN',
    'data-color-mode': colorMode
  },
  bodyAttrs: {
    class: () => isDark.value ? 'dark bg-gray-900' : 'bg-gray-50'
  }
})
</script>

<style>
#app {
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 确保背景色立即生效 */
html, body {
  transition: background-color 0.3s ease;
}

.dark {
  color-scheme: dark;
}

.light {
  color-scheme: light;
}
</style>