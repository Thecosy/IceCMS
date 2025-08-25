<template>
  <header
    :class="[
      'left-0 right-0 z-40 transition-all duration-300',
      isOverlay ? 'fixed top-0' : 'relative',
      {
        'translate-y-0': isVisible,
        '-translate-y-full': !isVisible,
        'bg-white/70 dark:bg-black/70 shadow-lg': isScrolledPastHero || isHovered,
        'bg-white/70 dark:bg-black/70': !isScrolledPastHero && !isHovered
      }
    ]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <nav class="mx-auto">
      <div class="flex h-14 items-center justify-between">
        <!-- Logo 区域 -->
        <div class="flex pl-4">
          <div class="flex flex-shrink-0">
            <router-link
              to="/"
              class="flex transform items-center transition-transform duration-200 hover:scale-105"
            >
              <img
                :src="appStore.siteConfig.logo"
                alt="网站Logo"
                class="h-8 w-8 rounded-full object-cover shadow-lg ring-2 ring-white/50 dark:shadow-gray-700 dark:ring-gray-800/50"
              />
              <span class="ml-3 text-xl tracking-tight text-gray-800 dark:text-white">
                {{ appStore.siteConfig.title }}
              </span>
            </router-link>
          </div>

          <!-- 移动端菜单按钮 -->
          <button
            @click="appStore.toggleMobileMenu()"
            class="ml-4 rounded-md p-1 text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 sm:hidden"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- 桌面端菜单 -->
          <div class="ml-8 hidden sm:flex sm:space-x-2">
            <div
              v-for="menuItem in blogStore.primaryMenuItems"
              :key="menuItem.status.href"
              class="relative group"
              @mouseenter="hoveredMenu = menuItem.status.href"
              @mouseleave="hoveredMenu = null"
            >
              <router-link
                :to="menuItem.status.href"
                class="relative inline-flex items-center px-3 py-2 text-base text-gray-600 transition-all duration-200 hover:scale-105 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white"
              >
                {{ menuItem.status.displayName }}
              </router-link>
              
              <!-- 子菜单 -->
              <div
                v-if="menuItem.children && menuItem.children.length > 0"
                v-show="hoveredMenu === menuItem.status.href"
                class="absolute left-0 z-20 mt-1 min-w-[200px] origin-top-left overflow-hidden rounded-xl border border-gray-100/10 bg-white/90 shadow-lg backdrop-blur-lg dark:border-gray-700/30 dark:bg-gray-800/90"
              >
                <div class="py-1">
                  <router-link
                    v-for="subMenuItem in menuItem.children"
                    :key="subMenuItem.status.href"
                    :to="subMenuItem.status.href"
                    class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100/50 dark:text-gray-200 dark:hover:bg-gray-700/50"
                  >
                    {{ subMenuItem.status.displayName }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧功能区 -->
        <div class="relative flex items-center space-x-2 pr-4">
          <!-- 搜索按钮 -->
          <button
            @click="appStore.toggleSearch()"
            class="transform rounded-full p-1 text-gray-600 transition-all duration-300 ease-out hover:scale-110 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M18 18L21 21" />
            </svg>
          </button>

          <!-- 主题切换按钮 -->
          <ThemeToggle />

          <!-- 用户菜单 -->
          <UserMenu />
        </div>
      </div>
    </nav>

    <!-- 移动端菜单 -->
    <MobileMenu />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '~/stores/app'
import { useBlogStore } from '~/stores/blog'
import ThemeToggle from './ThemeToggle.vue'
import UserMenu from './UserMenu.vue'
import MobileMenu from './MobileMenu.vue'

defineProps({
  isOverlay: {
    type: Boolean,
    default: true
  }
})

const appStore = useAppStore()
const blogStore = useBlogStore()

const isVisible = ref(true)
const lastScrollY = ref(0)
const isHovered = ref(false)
const isScrolledPastHero = ref(false)
const hoveredMenu = ref(null)

const handleScroll = () => {
  const currentScrollY = window.scrollY
  isVisible.value = currentScrollY === 0 || currentScrollY < lastScrollY.value
  lastScrollY.value = currentScrollY
  isScrolledPastHero.value = currentScrollY > 600
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>