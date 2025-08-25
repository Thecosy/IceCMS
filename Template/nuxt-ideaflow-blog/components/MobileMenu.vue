<template>
  <!-- 移动端菜单遮罩 -->
  <Teleport to="body">
    <div
      v-show="appStore.mobileMenuOpen"
      class="fixed inset-0 z-50 sm:hidden"
      @click="appStore.closeMobileMenu()"
    >
      <!-- 背景遮罩 -->
      <div
        class="fixed inset-0 bg-black/50 transition-opacity"
        :class="appStore.mobileMenuOpen ? 'opacity-100' : 'opacity-0'"
      ></div>

      <!-- 菜单面板 -->
      <div
        class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-xl transform transition-transform"
        :class="appStore.mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
        @click.stop
      >
        <!-- 菜单头部 -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <img
              :src="appStore.siteConfig.logo"
              :alt="appStore.siteConfig.title"
              class="h-8 w-8 rounded-full"
            />
            <span class="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
              {{ appStore.siteConfig.title }}
            </span>
          </div>
          <button
            @click="appStore.closeMobileMenu()"
            class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 菜单列表 -->
        <nav class="py-4">
          <div v-for="menuItem in blogStore.primaryMenuItems" :key="menuItem.status.href">
            <!-- 主菜单项 -->
            <router-link
              :to="menuItem.status.href"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              @click="appStore.closeMobileMenu()"
            >
              {{ menuItem.status.displayName }}
            </router-link>
            
            <!-- 子菜单项 -->
            <div v-if="menuItem.children && menuItem.children.length > 0" class="pl-8">
              <router-link
                v-for="subMenuItem in menuItem.children"
                :key="subMenuItem.status.href"
                :to="subMenuItem.status.href"
                class="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50"
                @click="appStore.closeMobileMenu()"
              >
                {{ subMenuItem.status.displayName }}
              </router-link>
            </div>
          </div>
        </nav>

        <!-- 菜单底部 -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">主题模式</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useAppStore } from '~/stores/app'
import { useBlogStore } from '~/stores/blog'
import ThemeToggle from './ThemeToggle.vue'

const appStore = useAppStore()
const blogStore = useBlogStore()
</script>