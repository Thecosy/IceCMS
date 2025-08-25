<template>
  <footer>
    <!-- 动物装饰图 -->
    <div
      v-if="footerConfig.footerAnimalImage"
      class="sticky bottom-2 z-30 flex w-full translate-y-[25px] justify-center bg-cover bg-center after:absolute after:bottom-[25px] after:left-0 after:h-[60%] after:w-full after:content-[''] md:bottom-0"
    >
      <div class="mx-auto flex justify-center lg:w-[950px] xl:w-[1200px]">
        <img
          :src="footerConfig.footerAnimalImage"
          alt="动物装饰"
          width="660.34"
          height="79.99"
          :class="footerConfig.showFooterAnimalImageOnMobile ? 'relative z-40' : 'relative md:block'"
        />
      </div>
    </div>

    <!-- 底部内容区域 -->
    <div class="border-gray-200/50 bg-base-100 py-8 backdrop-blur-md transition-colors">
      <!-- 个性化标语 -->
      <div v-if="footerConfig.footerSlogan" class="animate-fade-in mb-1 text-center">
        <p class="transform bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text px-1 text-lg font-medium italic text-transparent transition-all duration-500 hover:scale-105 dark:from-teal-300 dark:to-blue-300">
          {{ footerConfig.footerSlogan }}
        </p>
      </div>

      <div class="animate-fade-in mt-1 flex flex-col items-center space-y-1">
        <!-- 底部链接信息 -->
        <div class="flex flex-col flex-wrap items-center justify-center gap-4 text-sm text-gray-500 sm:flex-row dark:text-gray-400">
          <!-- 联系邮箱 -->
          <div
            v-if="footerConfig.contactEmail"
            class="flex transform items-center px-2 transition-all duration-300 hover:scale-110"
          >
            <a
              :href="`mailto:${footerConfig.contactEmail}`"
              class="hover:text-primary-500 dark:hover:text-primary-400 text-sm text-gray-500 transition-colors dark:text-gray-400"
            >
              {{ footerConfig.contactText }}
            </a>
          </div>

          <!-- 支持信息 -->
          <div
            v-if="footerConfig.supportText"
            class="transform px-2 transition-all duration-300 hover:scale-110"
          >
            <a
              :href="footerConfig.supportLink"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              {{ footerConfig.supportText }}
            </a>
          </div>

          <!-- 备案信息 -->
          <div v-if="footerConfig.icp" class="transform px-2 transition-all duration-300 hover:scale-110">
            <a
              :href="footerConfig.icpLink"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              {{ footerConfig.icp }}
            </a>
          </div>

          <!-- 公安备案 -->
          <div v-if="footerConfig.ga" class="transform px-2 transition-all duration-300 hover:scale-110">
            <a
              :href="footerConfig.gaLink"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              {{ footerConfig.ga }}
            </a>
          </div>
        </div>

        <!-- 版权信息 -->
        <div class="mt-4 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>&copy; {{ new Date().getFullYear() }} {{ appStore.siteConfig.title }}. Powered by Vue 3</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()

const footerConfig = computed(() => appStore.themeConfig.footer)
</script>