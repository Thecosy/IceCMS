<template>
  <div>
    <!-- Overlay -->
    <Transition name="fade">
      <div
        v-if="appStore.sidebarOpen"
        @click="appStore.toggleSidebar"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed left-0 top-0 h-full w-80 bg-hao-surface shadow-2xl transform transition-transform duration-300 z-50',
        'lg:translate-x-0 lg:shadow-none lg:bg-transparent lg:w-64',
        appStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="h-full overflow-y-auto p-6 space-y-8">
        <!-- Site Info -->
        <div class="text-center">
          <div class="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-hao-primary to-hao-accent">
            <img
              :src="siteConfig.author.avatar"
              :alt="siteConfig.author.name"
              class="w-full h-full object-cover"
            />
          </div>
          <h2 class="text-xl font-bold text-hao-text mb-2">{{ siteConfig.title }}</h2>
          <p class="text-sm text-hao-text-secondary">{{ siteConfig.subtitle }}</p>
          <p class="text-xs text-hao-text-secondary mt-2">{{ siteConfig.author.bio }}</p>
        </div>

        <!-- Navigation Menu -->
        <nav class="space-y-2">
          <nuxt-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg text-hao-text-secondary hover:text-hao-primary hover:bg-hao-primary/10 transition-all duration-200"
            active-class="text-hao-primary bg-hao-primary/10"
          >
            <Icon :name="item.icon" class="w-5 h-5" />
            <span>{{ item.name }}</span>
          </nuxt-link>
        </nav>

        <!-- Social Links -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 class="text-sm font-medium text-hao-text mb-4">关注我</h3>
          <div class="flex space-x-4">
            <a
              v-for="(url, platform) in siteConfig.author.social"
              :key="platform"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-full bg-hao-primary/10 flex items-center justify-center text-hao-primary hover:bg-hao-primary hover:text-white transition-all duration-200"
            >
              <Icon :name="platform" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Theme Toggle -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <button
            @click="appStore.toggleTheme"
            class="flex items-center justify-between w-full px-4 py-3 rounded-lg text-hao-text-secondary hover:text-hao-primary hover:bg-hao-primary/10 transition-all duration-200"
          >
            <div class="flex items-center space-x-3">
              <Icon :name="appStore.isDark ? 'sun' : 'moon'" class="w-5 h-5" />
              <span>{{ appStore.isDark ? '浅色模式' : '深色模式' }}</span>
            </div>
            <div class="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors duration-200">
              <div
                :class="[
                  'w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200',
                  appStore.isDark ? 'translate-x-6' : 'translate-x-0'
                ]"
              />
            </div>
          </button>
        </div>

        <!-- Close Button (Mobile) -->
        <button
          @click="appStore.toggleSidebar"
          class="lg:hidden absolute top-4 right-4 w-8 h-8 rounded-full bg-hao-surface shadow-lg flex items-center justify-center text-hao-text-secondary hover:text-hao-primary transition-colors duration-200"
        >
          <Icon name="x" class="w-4 h-4" />
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useAppStore } from '~/stores/app'
import { useBlogStore } from '~/stores/blog'

const appStore = useAppStore()
const blogStore = useBlogStore()

const siteConfig = computed(() => blogStore.siteConfig)
const menuItems = computed(() => blogStore.menuItems)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>