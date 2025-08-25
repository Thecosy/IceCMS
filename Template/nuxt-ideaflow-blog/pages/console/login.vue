<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <!-- 星空背景效果 -->
    <div class="absolute inset-0 overflow-hidden">
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

    <div class="relative max-w-md w-full space-y-8">
      <!-- Logo和标题 -->
      <div class="text-center">
        <router-link to="/" class="inline-flex items-center justify-center mb-6">
          <img
            :src="appStore.siteConfig.logo"
            alt="Logo"
            class="h-12 w-12 rounded-full shadow-lg ring-2 ring-white/50"
          />
          <h1 class="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
            {{ appStore.siteConfig.title }}
          </h1>
        </router-link>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">控制台登录</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          登录以管理您的博客内容
        </p>
      </div>

      <!-- 登录表单 -->
      <div class="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="error" class="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div class="flex">
              <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                  登录失败
                </h3>
                <div class="mt-2 text-sm text-red-700 dark:text-red-300">
                  {{ error }}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              用户名或邮箱
            </label>
            <div class="mt-1 relative">
              <input
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                required
                v-model="form.username"
                :disabled="loading"
                class="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="请输入用户名或邮箱"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              密码
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                v-model="form.password"
                :disabled="loading"
                class="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="请输入密码"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="form.rememberMe"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                记住我
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                忘记密码？
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <div class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              </span>
              <span v-else class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-blue-300 group-hover:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </span>
              {{ loading ? '登录中...' : '登录' }}
            </button>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              还没有账号？
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                立即注册
              </a>
            </p>
          </div>
        </form>
      </div>

      <!-- 返回首页链接 -->
      <div class="text-center">
        <router-link
          to="/"
          class="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '~/stores/app'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

// 表单数据
const form = ref({
  username: '',
  password: '',
  rememberMe: false
})

// 组件状态
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

// 星空效果
const stars = ref([])

// 表单验证
const isFormValid = computed(() => {
  return form.value.username.trim() && form.value.password.trim()
})

// 生成星空效果
const generateStars = () => {
  stars.value = []
  for (let i = 0; i < 20; i++) {
    stars.value.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3
    })
  }
}

// 处理登录
const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    // 模拟登录请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 简单的模拟登录验证
    if (form.value.username === 'admin' && form.value.password === 'admin') {
      // 设置用户认证状态
      const userData = {
        id: 1,
        username: form.value.username,
        displayName: '管理员',
        avatar: appStore.themeConfig.common.defaultAvatar,
        email: 'admin@ideaflow.com'
      }
      
      // 保存到localStorage
      localStorage.setItem('user_token', 'mock_token_123')
      localStorage.setItem('user_data', JSON.stringify(userData))
      
      // 更新app状态
      appStore.setCurrentUser(userData)
      
      // 跳转到控制台或之前的页面
      const redirect = route.query.redirect || '/console'
      router.push(redirect)
    } else {
      error.value = '用户名或密码错误'
    }
  } catch (err) {
    error.value = '登录过程中发生错误，请稍后重试'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  generateStars()
  
  // 如果已经登录，直接跳转到控制台
  if (appStore.isAuthenticated) {
    router.push('/console')
  }
})
</script>

<style scoped>
.star {
  animation: startwinkle 2s infinite;
}

@keyframes startwinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
</style>