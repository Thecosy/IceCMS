<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* TailwindCSS base styles */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 基础样式重置 */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "PingFang SC", "Source Han Sans SC", "Noto Sans CJK SC", "WenQuanYi Micro Hei", sans-serif;
}

/* 暗色主题 */
.dark .bg-hao-background { background-color: #0f172a; }
.dark .bg-hao-surface { background-color: #1e293b; }
.dark .text-hao-text { color: #f1f5f9; }
.dark .text-hao-text-secondary { color: #94a3b8; }

/* 自定义组件样式 */
@layer components {
  .hao-card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6;
  }
  
  .hao-button {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;
  }
  
  .hao-button-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }
  
  .hao-text-gradient {
    @apply bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent;
  }
}

/* 动画效果 */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
</style>
