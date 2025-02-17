<template>
  <div class="app-container">
    <el-radio-group v-model="selectedMenu" size="medium" class="menu-container">
      <el-radio-button label="siteConfig">网站配置</el-radio-button>
      <el-radio-button label="articleConfig">文章设置</el-radio-button>
      <el-radio-button label="resourceConfig">资源设置</el-radio-button>
      <el-radio-button label="homeConfig">首页设置</el-radio-button>
      <el-radio-button label="miniConfig">小程序设置</el-radio-button>
      <el-radio-button label="messageConfig">短信设置</el-radio-button>
    </el-radio-group>
    <div class="content-container">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SiteConfig from './components/SiteConfig.vue';
import ArticleConfig from './components/ArticleConfig.vue';
import ResourceConfig from './components/ResourceConfig.vue';
import HomeConfig from './components/HomeConfig.vue';
import MiniConfig from './components/MiniConfig.vue';
import MessageConfig from './components/MessageConfig.vue';

const selectedMenu = ref('siteConfig'); // 默认选中网站配置

const componentsMap = {
  siteConfig: SiteConfig,
  articleConfig: ArticleConfig,
  resourceConfig: ResourceConfig,
  homeConfig: HomeConfig,
  miniConfig: MiniConfig,
  messageConfig: MessageConfig,
};

const currentComponent = computed(() => componentsMap[selectedMenu.value]);
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}

.menu-container {
  margin-bottom: 10; /* 移除按钮和内容之间的间隔 */
}

.content-container {
  margin-top: -1px; /* 如果需要，可以进一步减少或移除间隔 */
}
</style>
