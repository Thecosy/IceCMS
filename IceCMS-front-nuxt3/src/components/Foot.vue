<script setup lang="ts">

const setting = ref<any>({});

import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();
setting.value = settingStore.settings
</script>

<template>
  <div class="macwk-footer white border-top pc-model">
    <div class="container">
      <a href="/" class="logo">
        <div class="login-logo">
          <div v-if="setting.sitLogo">
            <img :src="setting.sitLogo" />
          </div>
          <div v-else>
            <img src="../static/image/logo.svg" />
          </div>
        </div>
        <span class="ml-4">{{ setting.sitTitle }}</span>
      </a>
      <div class="nav">
        <NuxtLink to="/" class="nav-link">首页</NuxtLink>
        <NuxtLink to="/about" class="nav-link">关于 </NuxtLink>
        <NuxtLink to="/contact" class="nav-link">联系 </NuxtLink>
        <NuxtLink to="/privacy" class="nav-link">隐私 </NuxtLink>
        <NuxtLink href="/changelogs" class="nav-link">更新日志 </NuxtLink>
      </div>
      <div class="copyright">
        <p class="mb-0">
          <span class="mr-3">
            <NuxtLink to="https://beian.miit.gov.cn/" target="_blank">{{ setting.beian }}</NuxtLink>
          </span>
          <span>{{ setting.banquan }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-logo {
  image-rendering: -webkit-optimize-contrast;
  --bs-blue: #0d6efd;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #198754;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
  --bs-success: #198754;
  --bs-info: #0dcaf0;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
  --bs-light: #f8f9fa;
  --bs-dark: #212529;
  --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  --bs-gradient: linear-gradient(180deg,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0));
  --web-color: #0a36fa;
  --web-light-color: rgba(10, 54, 250, 0.2);
  --border-radius: 4px;
  --wp--preset--font-size--normal: 16px;
  --wp--preset--font-size--huge: 42px;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  color: #121212;
  line-height: 1.4;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga" on;
  -webkit-font-smoothing: subpixel-antialiased;
  --wp--preset--color--black: #000000;
  --wp--preset--color--cyan-bluish-gray: #abb8c3;
  --wp--preset--color--white: #ffffff;
  --wp--preset--color--pale-pink: #f78da7;
  --wp--preset--color--vivid-red: #cf2e2e;
  --wp--preset--color--luminous-vivid-orange: #ff6900;
  --wp--preset--color--luminous-vivid-amber: #fcb900;
  --wp--preset--color--light-green-cyan: #7bdcb5;
  --wp--preset--color--vivid-green-cyan: #00d084;
  --wp--preset--color--pale-cyan-blue: #8ed1fc;
  --wp--preset--color--vivid-cyan-blue: #0693e3;
  --wp--preset--color--vivid-purple: #9b51e0;
  --wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg,
      rgba(6, 147, 227, 1) 0%,
      rgb(155, 81, 224) 100%);
  --wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg,
      rgb(122, 220, 180) 0%,
      rgb(0, 208, 130) 100%);
  --wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg,
      rgba(252, 185, 0, 1) 0%,
      rgba(255, 105, 0, 1) 100%);
  --wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg,
      rgba(255, 105, 0, 1) 0%,
      rgb(207, 46, 46) 100%);
  --wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg,
      rgb(238, 238, 238) 0%,
      rgb(169, 184, 195) 100%);
  --wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg,
      rgb(74, 234, 220) 0%,
      rgb(151, 120, 209) 20%,
      rgb(207, 42, 186) 40%,
      rgb(238, 44, 130) 60%,
      rgb(251, 105, 98) 80%,
      rgb(254, 248, 76) 100%);
  --wp--preset--gradient--blush-light-purple: linear-gradient(135deg,
      rgb(255, 206, 236) 0%,
      rgb(152, 150, 240) 100%);
  --wp--preset--gradient--blush-bordeaux: linear-gradient(135deg,
      rgb(254, 205, 165) 0%,
      rgb(254, 45, 45) 50%,
      rgb(107, 0, 62) 100%);
  --wp--preset--gradient--luminous-dusk: linear-gradient(135deg,
      rgb(255, 203, 112) 0%,
      rgb(199, 81, 192) 50%,
      rgb(65, 88, 208) 100%);
  --wp--preset--gradient--pale-ocean: linear-gradient(135deg,
      rgb(255, 245, 203) 0%,
      rgb(182, 227, 212) 50%,
      rgb(51, 167, 181) 100%);
  --wp--preset--gradient--electric-grass: linear-gradient(135deg,
      rgb(202, 248, 128) 0%,
      rgb(113, 206, 126) 100%);
  --wp--preset--gradient--midnight: linear-gradient(135deg,
      rgb(2, 3, 129) 0%,
      rgb(40, 116, 252) 100%);
  --wp--preset--duotone--dark-grayscale: url("#wp-duotone-dark-grayscale");
  --wp--preset--duotone--grayscale: url("#wp-duotone-grayscale");
  --wp--preset--duotone--purple-yellow: url("#wp-duotone-purple-yellow");
  --wp--preset--duotone--blue-red: url("#wp-duotone-blue-red");
  --wp--preset--duotone--midnight: url("#wp-duotone-midnight");
  --wp--preset--duotone--magenta-yellow: url("#wp-duotone-magenta-yellow");
  --wp--preset--duotone--purple-green: url("#wp-duotone-purple-green");
  --wp--preset--duotone--blue-orange: url("#wp-duotone-blue-orange");
  --wp--preset--font-size--small: 13px;
  --wp--preset--font-size--medium: 20px;
  --wp--preset--font-size--large: 36px;
  --wp--preset--font-size--x-large: 42px;
  visibility: visible;
  pointer-events: auto;
  -webkit-user-select: text !important;
  /* WebKit 浏览器 (Chrome, Safari) */
  -moz-user-select: text !important;
  /* Firefox */
  -ms-user-select: text !important;
  /* 旧版 IE (10+) */
  user-select: text !important;
  /* 标准属性 */
  border: 0;
  font-family: inherit;
  font-style: inherit;
  font-weight: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  word-wrap: break-word;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 27px;
}
</style>
