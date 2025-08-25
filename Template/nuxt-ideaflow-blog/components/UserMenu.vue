<template>
  <div class="relative">
    <button
      @click="open = !open"
      class="flex items-center space-x-2 transition-transform duration-300 focus:outline-none hover:scale-105"
    >
      <img
        class="h-8 w-8 transform rounded-full object-cover shadow-lg ring-2 ring-white/30 transition-all duration-300 hover:shadow-xl hover:ring-blue-500/50 dark:ring-gray-700/30 dark:hover:ring-blue-400/50"
        :src="currentUser?.avatar || appStore.themeConfig.common.defaultAvatar"
        :alt="currentUser?.displayName || '访客'"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-gray-500 transition-transform duration-200"
        :class="{'rotate-180': open}"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div
      v-show="open"
      @click.away="open = false"
      class="absolute right-0 z-20 mt-2 w-48 origin-top-right overflow-hidden rounded-xl border border-gray-100/10 bg-white/90 shadow-lg backdrop-blur-lg dark:border-gray-700/30 dark:bg-gray-800/90"
    >
      <div class="divide-y divide-gray-100/10 dark:divide-gray-700/30">
        <!-- 已登录用户菜单 -->
        <div v-if="appStore.isAuthenticated" class="space-y-1 p-2">
          <a
            href="/console"
            target="_blank"
            class="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100/50 dark:text-gray-200 dark:hover:bg-gray-700/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
              />
            </svg>
            <span>控制台</span>
          </a>
          <button
            @click="logout"
            class="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100/50 dark:text-gray-200 dark:hover:bg-gray-700/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clip-rule="evenodd"
              />
            </svg>
            <span>退出登录</span>
          </button>
        </div>
        <!-- 未登录用户菜单 -->
        <div v-else class="p-2">
          <a
            href="/console/login"
            class="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100/50 dark:text-gray-200 dark:hover:bg-gray-700/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span>登录</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
const open = ref(false)

const currentUser = computed(() => appStore.currentUser)

const logout = () => {
  appStore.logout()
  open.value = false
}
</script>