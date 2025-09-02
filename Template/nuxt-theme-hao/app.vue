<template>
  <div id="app">
    <!-- 首屏加载全屏动画 -->
    <FullLoading v-if="isFullLoading" :isLoading="isFullLoading" @hideLoading="hideLoading" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Nuxt App 入口
console.log('App.vue loaded')

const nuxtApp = useNuxtApp()

// 是否首次加载 - 初始为true显示加载动画，防止FOUC
const isFullLoading = ref(true)

// 页面加载钩子
nuxtApp.hook('page:start', () => {
  console.log('Page start - showing loading')
  isFullLoading.value = true
})

nuxtApp.hook('page:finish', () => {
  console.log('Page finish - hiding loading')
  // 检查是否为首页，首页显示更长时间的loading
  const currentRoute = useRoute()
  const isHomePage = currentRoute.path === '/' || currentRoute.path === ''
  
  const delay = isHomePage ? 2000 : 500 // 首页2秒，其他页面0.5秒
  
  setTimeout(() => {
    isFullLoading.value = false
  }, delay)
})

// 监听CSS样式表加载完成
onMounted(() => {
  // 检查关键CSS是否已加载
  const checkCSSLoaded = () => {
    const testElement = document.createElement('div')
    testElement.className = 'test-css-loading'
    testElement.style.position = 'absolute'
    testElement.style.visibility = 'hidden'
    document.body.appendChild(testElement)
    
    const computedStyle = window.getComputedStyle(testElement)
    const hasCSS = computedStyle.getPropertyValue('--heo-theme') || 
                   document.querySelector('link[href*="zhheoblog.css"]')
    
    document.body.removeChild(testElement)
    return hasCSS
  }
  
     const waitForCSS = () => {
     if (checkCSSLoaded()) {
       console.log('CSS loaded - hiding loading')
       // 显示页面内容，检查是否为首页决定loading时间
       document.documentElement.style.visibility = 'visible'
       document.documentElement.style.opacity = '1'
       
       const currentPath = window.location.pathname
       const isHomePage = currentPath === '/' || currentPath === ''
       const delay = isHomePage ? 1800 : 300 // 首页1.8秒，其他页面0.3秒
       
       setTimeout(() => {
         isFullLoading.value = false
       }, delay)
     } else {
       setTimeout(waitForCSS, 50)
     }
   }
  
     // 根据是否为首页设置不同的超时时间
   const currentPath = window.location.pathname
   const isHomePage = currentPath === '/' || currentPath === ''
   const maxTimeout = isHomePage ? 4000 : 3000 // 首页4秒，其他页面3秒
   
   setTimeout(() => {
     if (isFullLoading.value) {
       console.log('Timeout - force hiding loading')
       // 强制显示页面内容
       document.documentElement.style.visibility = 'visible'
       document.documentElement.style.opacity = '1'
       isFullLoading.value = false
     }
   }, maxTimeout)
  
  waitForCSS()
})

// 手动隐藏加载动画的方法
const hideLoading = () => {
  console.log('Manual hide loading')
  isFullLoading.value = false
}

// 设置页面标题和meta
useHead({
  bodyAttrs: {
    id: 'app'
  }
})

// 主题初始化
onMounted(() => {
  // 主题初始化脚本
  const saveToLocal = {
    set: function setWithExpiry(key: string, value: any, ttl: number) {
      if (ttl === 0) return
      const now = new Date()
      const expiryDay = ttl * 86400000
      const item = {
        value: value,
        expiry: now.getTime() + expiryDay,
      }
      localStorage.setItem(key, JSON.stringify(item))
    },
    get: function getWithExpiry(key: string) {
      try {
        const itemStr = localStorage.getItem(key)
        if (!itemStr) {
          return undefined
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        if (now.getTime() > item.expiry) {
          localStorage.removeItem(key)
          return undefined
        }
        return item.value
      } catch (error) {
        // 如果JSON解析失败，清除这个键并返回undefined
        console.warn(`Failed to parse localStorage item "${key}":`, error)
        localStorage.removeItem(key)
        return undefined
      }
    }
  }

  const activateDarkMode = function () {
    document.documentElement.setAttribute('data-theme', 'dark')
    document.documentElement.classList.add('color-scheme-dark')
  }
  const activateLightMode = function () {
    document.documentElement.setAttribute('data-theme', 'light')
    document.documentElement.classList.remove('color-scheme-dark')
  }

  const t = saveToLocal.get('theme')
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
  const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified

  if (t === undefined) {
    if (isLightMode) activateLightMode()
    else if (isDarkMode) activateDarkMode()
    else if (isNotSpecified || hasNoSupport) {
      const now = new Date()
      const hour = now.getHours()
      const isNight = hour <= 6 || hour >= 18
      isNight ? activateDarkMode() : activateLightMode()
    }
    window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
      if (saveToLocal.get('theme') === undefined) {
        e.matches ? activateDarkMode() : activateLightMode()
      }
    })
  } else if (t === 'light') activateLightMode()
  else activateDarkMode()

  const asideStatus = saveToLocal.get('aside-status')
  if (asideStatus !== undefined) {
    if (asideStatus === 'hide') {
      document.documentElement.classList.add('hide-aside')
    } else {
      document.documentElement.classList.remove('hide-aside')
    }
  }
})
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 主题色设置 */
:root,
[data-theme=light] {
  --heo-theme: #425AEF !important;
  --heo-theme-op: #425AEF23 !important;
  --heo-theme-op-deep: #425AEFdd !important;
  --heo-theme-none: #425AEF00 !important;
  --heo-main: var(--heo-theme);
  --heo-card-bg: #fff;
  --heo-background: #f7f9fe;
  --heo-white: #fff;
  --heo-fontcolor: #363636;
  --heo-secondtext: #999;
  --heo-lighttext: #666;
  --heo-secondbg: #f5f5f5;
  --heo-card-border: rgba(0,0,0,.1);
  --heo-shadow-border: rgba(0,0,0,.1);
  --heo-shadow-black: rgba(0,0,0,.1);
}

[data-theme=dark] {
  --heo-theme: #f2b94b !important;
  --heo-theme-op: #f2b94b23 !important;
  --heo-theme-op-deep: #f2b94bdd !important;
  --heo-theme-none: #f2b94b00 !important;
  --heo-main: var(--heo-theme);
  --heo-card-bg: #1d1b26;
  --heo-background: #0d0d0d;
  --heo-white: #fff;
  --heo-fontcolor: #f7f7fa;
  --heo-secondtext: #a3a3a3;
  --heo-lighttext: #ccc;
  --heo-secondbg: #18171d;
  --heo-card-border: rgba(255,255,255,.1);
  --heo-shadow-border: rgba(255,255,255,.1);
  --heo-shadow-black: rgba(0,0,0,.3);
}

/* Halo组件变量 */
:root {
  --halo-comment-widget-component-card-bg: var(--heo-card-bg);
  --halo-comment-widget-component-theme-op: var(--heo-theme-op);
  --halo-comment-widget-component-card-border: var(--heo-card-border);
  --halo-comment-widget-component-shadow-border: var(--heo-shadow-border);
  --halo-comment-widget-component-secondtext: var(--heo-secondtext);
  --halo-comment-widget-component-lighttext: var(--heo-lighttext);
  --halo-comment-widget-component-secondbg: var(--heo-secondbg);
  --halo-comment-widget-component-fontcolor: var(--heo-fontcolor);
  --halo-comment-widget-component-main: var(--heo-main);
  --halo-comment-widget-component-background: var(--heo-background);
  --halo-comment-widget-component-white: var(--heo-white);
  --halo-comment-widget-component-shadow-black: var(--heo-shadow-black);
}

/* 滚动条样式 */
*::-webkit-scrollbar-thumb {
  background-color: var(--heo-main);
  background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.4) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.4) 50%,rgba(255,255,255,.4) 75%,transparent 75%,transparent);
  border-radius: 2em;
}

#app {
  min-height: 100vh;
  width: 100%;
  /* background-color: var(--heo-background); */
  color: var(--heo-fontcolor);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  background-color: var(--heo-background);
  color: var(--heo-fontcolor);
}

/* 布局过渡效果 */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
