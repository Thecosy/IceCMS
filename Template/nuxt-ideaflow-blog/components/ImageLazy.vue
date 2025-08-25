<template>
  <div 
    ref="imageContainer" 
    class="relative overflow-hidden"
    :class="containerClass"
  >
    <!-- 占位符 -->
    <div 
      v-if="!imageLoaded" 
      class="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse"
    >
      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    </div>
    
    <!-- 实际图片 -->
    <img
      v-show="imageLoaded"
      ref="image"
      :src="actualSrc"
      :alt="alt"
      :class="imageClass"
      @load="onImageLoad"
      @error="onImageError"
    />
    
    <!-- 错误状态 -->
    <div 
      v-if="imageError" 
      class="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800"
    >
      <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span class="text-sm text-gray-500 dark:text-gray-400">图片加载失败</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  containerClass: {
    type: String,
    default: ''
  },
  imageClass: {
    type: String,
    default: 'w-full h-full object-cover'
  },
  lazy: {
    type: Boolean,
    default: true
  }
})

const imageContainer = ref(null)
const image = ref(null)
const imageLoaded = ref(false)
const imageError = ref(false)
const isIntersecting = ref(false)
const actualSrc = ref('')

// 懒加载逻辑
const setupIntersectionObserver = () => {
  if (!process.client || !props.lazy) {
    actualSrc.value = props.src
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isIntersecting.value) {
          isIntersecting.value = true
          actualSrc.value = props.src
          observer.disconnect()
        }
      })
    },
    {
      rootMargin: '50px'
    }
  )

  if (imageContainer.value) {
    observer.observe(imageContainer.value)
  }
}

const onImageLoad = () => {
  imageLoaded.value = true
  imageError.value = false
}

const onImageError = () => {
  imageError.value = true
  imageLoaded.value = false
}

onMounted(() => {
  if (!props.lazy) {
    actualSrc.value = props.src
  } else {
    setupIntersectionObserver()
  }
})

// 监听src变化
watch(() => props.src, (newSrc) => {
  if (!props.lazy) {
    actualSrc.value = newSrc
    imageLoaded.value = false
    imageError.value = false
  }
})
</script>