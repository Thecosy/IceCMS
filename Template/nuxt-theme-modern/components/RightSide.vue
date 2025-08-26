<template>
  <div class="fixed right-6 bottom-20 space-y-3 z-40">
    <!-- Menu Toggle (Mobile) -->
    <button
      @click="appStore.toggleSidebar"
      class="lg:hidden w-12 h-12 bg-hao-surface text-hao-text shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300"
    >
      <Icon name="menu" class="w-5 h-5" />
    </button>

    <!-- Search -->
    <button
      @click="appStore.toggleSearchModal"
      class="w-12 h-12 bg-hao-surface text-hao-text shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300"
    >
      <Icon name="search" class="w-5 h-5" />
    </button>

    <!-- Dark Mode Toggle -->
    <button
      @click="appStore.toggleTheme"
      class="w-12 h-12 bg-hao-surface text-hao-text shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300"
    >
      <Icon :name="appStore.isDark ? 'sun' : 'moon'" class="w-5 h-5" />
    </button>

    <!-- Random Post -->
    <button
      @click="goToRandomPost"
      class="w-12 h-12 bg-hao-surface text-hao-text shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300"
      title="随机文章"
    >
      <Icon name="shuffle" class="w-5 h-5" />
    </button>
  </div>

  <!-- Search Modal -->
  <SearchModal v-if="appStore.searchModalOpen" />
</template>

<script setup>
import { useAppStore } from '~/stores/app'
import { useBlogStore } from '~/stores/blog'

const appStore = useAppStore()
const blogStore = useBlogStore()

const goToRandomPost = () => {
  const posts = blogStore.posts.items
  if (posts.length > 0) {
    const randomPost = posts[Math.floor(Math.random() * posts.length)]
    navigateTo(`/posts/${randomPost.id}`)
  }
}
</script>