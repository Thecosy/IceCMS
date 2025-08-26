<template>
  <div class="min-h-screen bg-green-100 flex items-center justify-center">
    <div class="max-w-2xl mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-green-600 mb-4">✅ 项目正常运行!</h1>
      <p class="text-xl mb-4">如果你看到这个页面，说明Nuxt项目已经正常工作了</p>
      
      <div class="text-left bg-gray-100 p-4 rounded mb-6">
        <h3 class="font-bold mb-2">调试信息:</h3>
        <ul class="space-y-1 text-sm">
          <li>✅ Nuxt 3 正常运行</li>
          <li>✅ TailwindCSS 样式加载</li>
          <li>✅ Vue 组件渲染正常</li>
          <li>✅ 路由系统工作</li>
        </ul>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-bold">导航测试:</h3>
        <div class="grid grid-cols-2 gap-4">
          <nuxt-link to="/" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            返回首页
          </nuxt-link>
          <a href="/about" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            关于页面
          </a>
          <a href="/categories" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            分类页面
          </a>
          <a href="/tags" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            标签页面
          </a>
        </div>
      </div>

      <div class="mt-8 p-4 bg-yellow-100 rounded">
        <p class="text-sm text-yellow-800">
          <strong>注意:</strong> 请确保访问 <code class="bg-yellow-200 px-1">http://localhost:3004</code> 而不是 3000 端口
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '测试页面 - Nuxt Theme Hao',
  meta: [
    { name: 'description', content: '测试页面，验证项目是否正常运行' }
  ]
})
</script>