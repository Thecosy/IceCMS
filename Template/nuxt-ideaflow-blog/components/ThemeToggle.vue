<template>
  <button
    @click="appStore.toggleDark()"
    class="transform rounded-full p-1 text-gray-600 transition-all duration-300 ease-out hover:scale-110 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white"
    :title="appStore.isDark ? '切换到亮色模式' : '切换到暗色模式'"
  >
    <svg
      v-if="appStore.isDark"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <svg
      v-else
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<script setup>
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
</script>