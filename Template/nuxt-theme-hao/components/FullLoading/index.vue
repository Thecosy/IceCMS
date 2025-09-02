<template>
  <!-- loading 页面 -->
  <div id="loading-box" :class="{ loaded: !isLoading }" @click="hideLoading">
    <div class="loading-bg">
      <div class="loading-content">
        <img class="loading-img" style="border-radius: 50%;" src="/static/picture/logo-doiw.png">
        <div class="loading-image-dot"></div>
        
        <!-- 加载文本 -->
        <!-- <div class="loading-text">
          <h3>{{ loadingText }}</h3>
          <div class="loading-progress">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: true
})

const emit = defineEmits<{
  hideLoading: []
}>()

// 加载文本和进度条
const loadingTexts = [
  '正在加载中...',
  '准备页面内容...',
  '加载样式文件...',
  '初始化组件...',
  '即将完成...'
]

const loadingText = ref(loadingTexts[0])
const progress = ref(0)
let textInterval: ReturnType<typeof setInterval> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null

// 动态更新加载文本和进度
onMounted(() => {
  let textIndex = 0
  let currentProgress = 0
  
  // 更新加载文本
  textInterval = setInterval(() => {
    textIndex = (textIndex + 1) % loadingTexts.length
    loadingText.value = loadingTexts[textIndex]
  }, 800)
  
  // 更新进度条
  progressInterval = setInterval(() => {
    if (currentProgress < 90) {
      currentProgress += Math.random() * 15 + 5
      progress.value = Math.min(currentProgress, 90)
    }
  }, 200)
  
  // 当加载完成时，快速完成进度条
  const completeProgress = () => {
    if (progressInterval) {
      clearInterval(progressInterval)
    }
    const finalInterval = setInterval(() => {
      if (progress.value < 100) {
        progress.value += 2
      } else {
        clearInterval(finalInterval)
      }
    }, 20)
  }
  
  // 监听isLoading变化
  watch(() => props.isLoading, (newVal) => {
    if (!newVal) {
      loadingText.value = '加载完成！'
      completeProgress()
    }
  })
})

onUnmounted(() => {
  if (textInterval) clearInterval(textInterval)
  if (progressInterval) clearInterval(progressInterval)
})

const hideLoading = () => {
  emit('hideLoading')
}
</script>

<style scoped>

/* Loading 页面样式 */
#loading-box {
  -webkit-user-select: none;
}

#loading-box .loading-bg {
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  background: var(--heo-card-bg);
  z-index: 1999;
  opacity: 1;
  transition: 0.2s;
  pointer-events: all;
  animation: showLoading 0.3s 0s backwards;
}

#loading-box.loaded .loading-bg {
  pointer-events: none;
  transition: 0.2s;
  animation: hideLoading 0.3s 0s forwards;
}

#loading-box .loading-img {
  width: 100px;
  margin: auto;
  animation-duration: 0.2s;
  animation-name: loadingAction;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

#loading-box .loading-image-dot {
  width: 30px;
  height: 30px;
  background: #6bdf8f;
  position: absolute;
  border-radius: 50%;
  border: 6px solid #fff;
  top: 50%;
  left: 50%;
  transform: translate(18px, 24px);
}

@keyframes loadingAction {
  from { opacity: 1; }
  to { opacity: 0.6; }
}

@keyframes hideLoading {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes showLoading {
  from { opacity: 0; }
  to { opacity: 1; }
}

</style>
 