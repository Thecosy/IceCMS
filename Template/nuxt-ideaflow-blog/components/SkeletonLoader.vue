<template>
  <div class="animate-pulse">
    <slot>
      <!-- 默认骨架屏 -->
      <div class="bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4 mb-2"></div>
      <div class="bg-gray-200 dark:bg-gray-700 rounded h-4 w-1/2"></div>
    </slot>
  </div>
</template>

<script setup>
// 可选的props用于自定义骨架屏
defineProps({
  rows: {
    type: Number,
    default: 2
  },
  height: {
    type: String,
    default: 'h-4'
  }
})
</script>