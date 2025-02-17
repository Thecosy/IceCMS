<script setup lang="ts">

// 标题栏默认值为 'nav-link active'
const acticve = ref<string>("nav-link active");
const setting = ref<any>({});

import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();
setting.value = settingStore.settings
</script>

<template>
  <div class="about">
    <div id="__nuxt" data-server-rendered="true">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app macwk-animation">
          <top :message11="acticve" />
          <div class="layout-min-full-height">
            <div class="macwk-about-section">
              <img src="../static/picture/downie-4.png" alt="" class="people">
              <img src="../static/picture/xmin-zen.png" alt="" class="people">
              <img src="../static/picture/sketch-1.png" alt="" class="people">
              <img src="../static/picture/imazing.png" alt="" class="people">
              <img src="../static/picture/alfred-powerpack.png" alt="" class="people">
              <img src="../static/picture/movist.png" alt="" class="people">
              <div class="container">
                <h1 class="fw-600 text-center">IceCMS - 为工作而生。</h1>
                <p class="sub-title text-center fs-20">只提供精品Mac应用，站长款款测试，免费、安全、无广告、不限速。</p>
                <div class="inner-container">
                  <div class="main-content">
                    <div class="macwk-about-slider">
                      <div class="item">
                        <p>在 <span class="fw-600 text-primary fs-22">IceCMS.cn</span>，</p>
                        <p>不但有众多业界所推崇的主流软件，</p>
                        <p>还有许多你不曾了解的小众精品软件。</p>
                        <p>它们是工具，</p>
                        <p>可以帮助你轻松学习、高效工作；</p>
                        <p>它们又不仅仅是工具，</p>
                        <p>或许还可以成为和你一路成长并肩作战的“好朋友、好兄弟”。</p>
                        <p>够精品，才高效！</p>
                        <p>IceCMS.cn，为你精选！</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="sidetools" class="macwk-animation tinUpIn" style="display:none;">
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a class="cursor"><span class="sidetools-icon kfwx" /></a>
                </div>
              </div>
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a class="cursor"><span class="sidetools-icon kfqq" /></a>
                </div>
              </div>
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a class="el-tooltip cursor"><span class="sidetools-icon back-top" /></a>
                </div>
              </div>
              <span>
                <div id="el-popover-1306" role="tooltip" aria-hidden="true" class="el-popover el-popper"
                  style="width:200px;display:none;">
                  <!---->
                  <div class="text-center">
                    <a href="feedback.html" class="mt-15 mb-0">在线留言</a>
                  </div>
                </div><span class="el-popover__reference-wrapper" />
              </span>
              <span>
                <div id="el-popover-762" role="tooltip" aria-hidden="true" class="el-popover el-popper"
                  style="width:200px;display:none;">
                  <!---->
                  <div class="text-center">
                    <a href="feedback.html" class="mt-15 mb-0">在线留言</a>
                  </div>
                </div><span class="el-popover__reference-wrapper" />
              </span>
            </div>
          </div>
          <foot />
        </div>
      </div>
    </div>

  </div>
</template>
<!-- 
<script>
import { getNewArticle } from '@/api/webarticle'
import { formatDate } from '@/utils/date.js'
import { getCarousel } from '@/api/setting'

import top from './components/Top.vue'
import foot from './components/Foots.vue'

export default ({
  name: 'Home',
  components: { top, foot },
  data() {
    return {
      isDark: false,
      acticve: 'nav-link active',
    }
  },
  computed: {
  themeClass() {
      console.log(this.isDark)
      return this.isDark ? 'black' : 'light';
    }
  },
  mounted() {
    // 检查是否在客户端环境
    if (process.client) {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === 'true') {
        this.isDark = true;
      } else {
        this.isDark = false;
      }
    }
  },
})
</script> -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../static/mycss/top.css';
@import '../static/mycss/body.css'
</style>
