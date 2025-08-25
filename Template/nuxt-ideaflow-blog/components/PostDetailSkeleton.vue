<template>
  <div class="min-h-screen bg-base-100">
    <Header />
    
    <main class="mx-auto max-w-4xl px-4 py-10">
      <article class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
        <!-- 头图占位符 -->
        <div class="h-64 sm:h-80 bg-gray-200 dark:bg-gray-700"></div>
        
        <!-- 文章内容占位符 -->
        <div class="p-8">
          <!-- 标题占位符 -->
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
          
          <!-- 文章信息占位符 -->
          <div class="flex gap-4 mb-6">
            <div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          
          <!-- 分类标签占位符 -->
          <div class="flex gap-2 mb-6">
            <div class="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div class="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div class="h-6 w-18 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
          
          <!-- 文章内容占位符 -->
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            
            <!-- 内容区块占位符 -->
            <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/5"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
// 文章详情页骨架屏组件
</script>