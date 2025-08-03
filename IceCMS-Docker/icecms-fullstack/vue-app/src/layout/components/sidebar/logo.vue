<script setup lang="ts">
import { getTopMenu } from "@/router/utils";
import { useNav } from "@/layout/hooks/useNav";
import { getSettingInfo, setSettingInfo } from '@/api/setting/webinfo';
import { ref, onMounted } from 'vue'; // 确保正确导入

const logoUrl = ref(""); // 存储 logo 的 URL

/** 获取 `logo` */
async function getWebLogo() {
  try {
    const response = await getSettingInfo();
    if (response.data && response.data.sitLogo) {
      // 生成绝对路径 URL
      const logo = new URL(response.data.sitLogo, window.location.origin).href;
      console.log("Final logo URL:", logo);
      logoUrl.value = logo;
    } else {
      // 如果没有 sitLogo，使用默认 logo
      logoUrl.value = new URL("/logo.svg", window.location.origin).href;
    }
  } catch (error) {
    console.error("Error fetching logo:", error);
    // 设置默认 logo
    logoUrl.value = new URL("/logo.svg", window.location.origin).href;
  }
}

// 在组件加载时调用 getLogo 函数
onMounted(() => {
  getWebLogo();
});

const props = defineProps({
  collapse: Boolean
});

const { title, getLogo } = useNav();
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapses: props.collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="props.collapse" key="props.collapse" :title="title" class="sidebar-logo-link"
        :to="getTopMenu()?.path ?? '/'">
        <img :src="logoUrl" alt="logo" />
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
      <router-link v-else key="expand" :title="title" class="sidebar-logo-link" :to="getTopMenu()?.path ?? '/'">
        <img :src="logoUrl" alt="logo" />
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 48px;
  overflow: hidden;

  .sidebar-logo-link {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 100%;

    img {
      display: inline-block;
      height: 40px;
      width: 40px;
      border-radius: 8px;
      /* 设置圆角，8px 可调整 */
      /* 或者使用 50% 来使图像完全圆形 */
    }

    .sidebar-title {
      display: inline-block;
      height: 32px;
      margin: 2px 0 0 12px;
      overflow: hidden;
      font-size: 18px;
      font-weight: 600;
      line-height: 32px;
      color: $subMenuActiveText;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
