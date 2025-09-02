<template>
  <!-- 头部导航栏 -->
  <nav class="show" id="nav" :class="{ 'nav-scrolled': isScrolled }">
    <div id="nav-group">
      <!-- 导航栏左侧 -->
      <div id="blog_name">
        <div class="back-home-button" tabindex="-1">
          <i class="back-home-button-icon haofont hao-icon-apps-fill" style="font-size: 1rem"></i>
          <div class="back-menu-list-groups"></div>
        </div>
        <NuxtLink to="/" id="site-name" title="返回博客主页">
          <span>
            <img 
              :src="siteLogo" 
              alt="logo" 
              style="width: 2rem; height: 100%; margin: .5rem auto 0;">
          </span>
        </NuxtLink>
      </div>

      <div id="page-name-mask">
        <div id="page-name">
          <NuxtLink id="page-name-text" @click="$emit('scroll-to-top')">{{ siteTitle }} - Carol 小屋</NuxtLink>
        </div>
      </div>

      <!-- 导航栏中间 -->
      <div id="menus">
        <div class="menus_items">
          <div class="menus_item">
            <NuxtLink class="site-page" to="/">
              <svg style="width: 1.2em;
height: 1.2em;
vertical-align: -0.15em;
fill: currentColor;
overflow: hidden;
right: 0;" class="ali_icon" aria-hidden="true">
                <use href="#icon-shouye"></use>
              </svg>
              <span>首页</span>
            </NuxtLink>
          </div>
          <div class="menus_item">
            <NuxtLink class="site-page" to="/archives">
              <svg style="width: 1.2em;
height: 1.2em;
vertical-align: -0.15em;
fill: currentColor;
overflow: hidden;
right: 0;" class="ali_icon" aria-hidden="true">
                <use href="#icon-yuedu"></use>
              </svg>
              <span>文章</span>
            </NuxtLink>
          </div>
          <div class="menus_item">
            <a class="site-page" href="javascript:void(0);" rel="external nofollow">
              <svg style="width: 1.2em;
height: 1.2em;
vertical-align: -0.15em;
fill: currentColor;
overflow: hidden;
right: 0;" class="ali_icon" aria-hidden="true">
                <use href="#icon-wode"></use>
              </svg>
              <span>我的</span>
            </a>
            <ul class="menus_item_child">
              <li>
                <NuxtLink class="site-page child" to="/photos">
                  <svg class="ali_icon" aria-hidden="true">
                    <use href="#icon-tuku"></use>
                  </svg>
                  <span>图库</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="site-page child" to="/content">
                  <svg class="ali_icon" aria-hidden="true">
                    <use href="#icon-liuyanban"></use>
                  </svg>
                  <span>留言板</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="site-page child" to="/links">
                  <svg class="ali_icon" aria-hidden="true">
                    <use href="#icon-genealogy"></use>
                  </svg>
                  <span>友情链接</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="site-page child" to="/moments">
                  <svg class="ali_icon" aria-hidden="true">
                    <use href="#icon-shuoshuo"></use>
                  </svg>
                  <span>我的动态</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="site-page child" to="/subject-rsnmemom">
                  <svg class="ali_icon" aria-hidden="true">
                    <use href="#icon-PRODUCTIMAGE"></use>
                  </svg>
                  <span>产品反馈</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="site-page child" to="/about">
                  <svg class="ali_icon" aria-hidden="true">
                    <use href="#icon-guanyu-banben"></use>
                  </svg>
                  <span>关于</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="menus_item">
            <a class="site-page" href="javascript:void(0);" rel="external nofollow">
              <svg style="width: 1.2em;
height: 1.2em;
vertical-align: -0.15em;
fill: currentColor;
overflow: hidden;
right: 0;" class="ali_icon" aria-hidden="true">
                <use href="#icon-haowutuijian1"></use>
              </svg>
              <span>好物推荐</span>
            </a>
            <ul class="menus_item_child">
              <li>
                <NuxtLink class="site-page child" to="/product">
                  <svg class="ali_icon" aria-hidden="true">
                    <use href="#icon-haowutuijian1"></use>
                  </svg>
                  <span>有点东西</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 导航栏右侧 -->
      <div id="nav-right">
        <div class="nav-button" id="randomPost_button">
          <a class="site-page" href="javascript:void(0);" @click="$emit('random-post')" title="随机文章">
            <i class="haofont hao-icon-signal-tower-fill"></i>
          </a>
        </div>
        
        <div class="nav-button" id="search-button">
          <a class="site-page social-icon search" href="javascript:void(0);" @click="$emit('open-search')" rel="external nofollow" title="站内搜索">
            <i class="haofont hao-icon-search--line"></i>
          </a>
        </div>
        

        <!-- 登录按钮 -->
        <div class="console-button" tabindex="-1">
          <span class="site-page nav-login">
            <i class="haofont hao-icon-zhanghao1" style="font-size: 19.5px;"></i>
          </span>
          <div class="back-menu-list-groups">
            <div class="back-menu-list-group" style="margin: -4px -9px -4px -18px">
              <div class="back-menu-list">
                <a class="back-menu-item" rel="external nofollow" target="_blank" href="login" @click="$emit('redirect-login')">
                  <span class="back-menu-item-text">登录</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
     
        
        <!-- 中控台按钮 -->
        <div class="nav-button" id="nav-console">
          <a class="console_switchbutton" href="javascript:void(0);" @click="$emit('show-console')" rel="external nofollow" title="显示中控台">
            <i class="haofont hao-icon-dashboard"></i>
          </a>
        </div>
        <!-- 返回顶部按钮 -->
        <div v-show="isScrolled" class="nav-button" id="nav-totop" @click="$emit('scroll-to-top')">
          <a class="console_switchbutton" href="javascript:void(0);" title="返回顶部" rel="external nofollow">
            <i class="haofont hao-icon-arrow-up"></i>
            <span class="scroll-percent">{{ scrollPercent }}%</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, type Ref } from 'vue'
import { useBlogStore } from '~/stores/blog'

// 引入pinia store
const blogStore = useBlogStore()

// 使用computed来安全访问store数据
const siteLogo = computed(() => blogStore?.siteSettings?.sitLogo || '/static/picture/logo-zark.png')
const siteTitle = computed(() => blogStore?.siteSettings?.sitTitle || 'IceCMS')

// 定义emits
const emit = defineEmits<{
  'random-post': []
  'open-search': []
  'redirect-login': []
  'show-console': []
  'scroll-to-top': []
}>()

// 响应式数据
const scrollPercent: Ref<number> = ref(0)
const isScrolled: Ref<boolean> = ref(false)

// 生命周期
onMounted(() => {
  if (process.client) {
    updateScrollPercent()
    window.addEventListener('scroll', updateScrollPercent)
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('scroll', updateScrollPercent)
  }
})

// 方法
const updateScrollPercent = () => {
  if (process.client) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollPercentValue = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
    scrollPercent.value = Math.max(0, Math.min(100, scrollPercentValue))
    isScrolled.value = scrollTop > 10  // 滚动超过10px就改变背景
  }
}
</script>

<style scoped>

/* 导航栏背景变化样式 */
#nav {
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
  background-color: transparent;
}

#nav.nav-scrolled {
  background-color: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

/* 暗色模式下的导航栏背景 */
[data-theme=dark] #nav.nav-scrolled {
  background-color: rgba(0, 0, 0, 0.95) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* 滚动时导航栏文字和图标颜色变化 */
#nav.nav-scrolled #site-name,
#nav.nav-scrolled #page-name-text,
#nav.nav-scrolled .site-page,
#nav.nav-scrolled .menus_item .site-page span,
#nav.nav-scrolled .nav-button a,
#nav.nav-scrolled .console-button span {
  color: #333 !important;
  transition: color 0.3s ease;
}

#nav.nav-scrolled .ali_icon,
#nav.nav-scrolled .haofont,
#nav.nav-scrolled i {
  color: #333 !important;
  fill: #333 !important;
  transition: color 0.3s ease, fill 0.3s ease;
}

/* 暗色模式下的文字和图标颜色 */
[data-theme=dark] #nav.nav-scrolled #site-name,
[data-theme=dark] #nav.nav-scrolled #page-name-text,
[data-theme=dark] #nav.nav-scrolled .site-page,
[data-theme=dark] #nav.nav-scrolled .menus_item .site-page span,
[data-theme=dark] #nav.nav-scrolled .nav-button a,
[data-theme=dark] #nav.nav-scrolled .console-button span {
  color: #fff !important;
}

[data-theme=dark] #nav.nav-scrolled .ali_icon,
[data-theme=dark] #nav.nav-scrolled .haofont,
[data-theme=dark] #nav.nav-scrolled i {
  color: #fff !important;
  fill: #fff !important;
}

/* 导航栏下拉菜单样式 */
.menus_item {
  position: relative;
}

.menus_item_child {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--heo-card-bg);
  border: var(--style-border);
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
  min-width: 150px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.menus_item:hover .menus_item_child {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.menus_item_child li {
  margin: 0;
  padding: 0;
}

.menus_item_child .site-page.child {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #333 !important;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 6px;
  margin: 2px 8px;
}

.menus_item_child .site-page.child:hover {
  background: #8e44ad !important;
  color: #fff !important;
}

/* 暗色模式下的二级菜单 */
[data-theme=dark] .menus_item_child .site-page.child {
  color: #fff !important;
}

[data-theme=dark] .menus_item_child .site-page.child:hover {
  background: #8e44ad !important;
  color: #fff !important;
}

.menus_item_child .ali_icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  fill: currentColor;
}

.menus_item_child span {
  font-size: 0.9rem;
  font-weight: 500;
}

/* 主导航菜单图标与文字间距 */
.menus_item .site-page {
  display: flex;
  align-items: center;
}

.menus_item .site-page .ali_icon {
  margin-right: 8px;
}

.menus_item .site-page span {
  margin-left: 4px;
}

/* nav-button 基础样式 */
.nav-button {
  cursor: pointer;
  position: relative;
}

.nav-button a {
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
}

.nav-button a i {
  line-height: 1;
  font-size: 22px;
}

/* 返回顶部按钮样式 */
.console-button .totopbtn,
#nav-totop .totopbtn {
  padding-top: 0;
  width: 25px;
  height: 25px;
  border-radius: 40px;
  background: #333;
  color: #fff;
  position: absolute;
  top: 5px;
  right: 5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

/* 返回顶部按钮容器过渡效果 */
.console-button {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.console-button[style*="display: none"] {
  opacity: 0;
  transform: translateY(10px);
}

.console-button .totopbtn i,
#nav-totop .totopbtn i {
  position: absolute;
  display: flex;
  font-size: 0.8rem;
  opacity: 0;
}

.console-button:hover .totopbtn,
#nav-totop:hover .totopbtn {
  background: #555;
}

.console-button:hover .totopbtn i,
#nav-totop:hover .totopbtn i {
  opacity: 1;
  color: #fff;
  transition: 0.3s;
}

.console-button #percent,
#nav-totop #percent {
  font-size: 12px;
  font-weight: bold;
  transition: 0.3s ease-in;
}

.console-button:hover #percent,
#nav-totop:hover #percent {
  opacity: 0;
  font-weight: bold;
}

.console-button:not(.long):hover .totopbtn,
#nav-totop:not(.long):hover .totopbtn {
  width: 35px;
  height: 35px;
  top: 0;
  right: 0;
}

/* 新的返回顶部按钮样式 */
#nav-totop {
  position: relative;
}

#nav-totop .console_switchbutton {
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  flex-direction: column;
  padding: 0;
  color: #fff;
  text-decoration: none;
}

#nav-totop .console_switchbutton:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

#nav-totop .console_switchbutton i {
  font-size: 14px;
  line-height: 1;
  margin-bottom: -2px;
}

#nav-totop .scroll-percent {
  font-size: 8px;
  font-weight: bold;
  line-height: 1;
  opacity: 0.8;
}

/* 滚动时的颜色变化 */
#nav.nav-scrolled #nav-totop .console_switchbutton {
  background: rgba(51, 51, 51, 0.1);
  color: #333;
}

#nav.nav-scrolled #nav-totop .console_switchbutton:hover {
  background: rgba(51, 51, 51, 0.2);
}

/* 暗色模式 */
[data-theme=dark] #nav.nav-scrolled #nav-totop .console_switchbutton {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

[data-theme=dark] #nav.nav-scrolled #nav-totop .console_switchbutton:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style> 