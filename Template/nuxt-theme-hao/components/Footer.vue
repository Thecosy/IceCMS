<template>
  <!-- 底部 -->
  <footer id="footer">
    <div id="footer_deal">
      <a class="deal_link" rel="external nofollow" target="_blank" href="lxw@cnkj.site" title="lxw@cnkj.site">
        <i class="iconfont icon-alimailaliyouxiang"></i>
      </a>
      <a class="deal_link" rel="external nofollow" target="_blank" href="https://github.com/carolcoral" title="https://github.com/carolcoral">
        <i class="iconfont icon-github"></i>
      </a>
      <!-- 更多社交链接... -->
      <img class="footer_mini_logo" src="~/assets/picture/65824a458b057.webp" title="返回顶部" @click="$emit('scroll-to-top')">
      <a class="deal_link" rel="external nofollow" target="_blank" href="https://steamcommunity.com/id/caroljack33/" title="Steam">
        <i class="iconfont icon-steam"></i>
      </a>
      <a class="deal_link" rel="external nofollow" target="_blank" href="rss.xml" title="RSS订阅">
        <i class="iconfont icon-RSS_flat"></i>
      </a>
    </div>
    
    <!-- 底部徽章 -->
    <p id="ghbdages" style="width:60%;margin: 0 auto;text-align:center;">
      <a class="github-badge" target="_blank" href="https://halo.run/" style="margin-inline:5px" title="博客框架为halo2.x">
        <img src="~/assets/picture/Frame-Halo 2.svg" alt="博客框架为halo2.x">
      </a>
      <a class="github-badge" target="_blank" href="https://beian.miit.gov.cn/" style="margin-inline:5px" title="蜀ICP备-2023016788号">
        <img src="~/assets/picture/蜀ICP备-2023016788号-blue.svg" alt="蜀ICP备-2023016788号">
      </a>
      <a class="github-badge" target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch" style="margin-inline:5px" title="蜀公网安备-51010702001753号">
        <img src="~/assets/picture/蜀公网安备-51010702001753号-blue.svg" alt="蜀公网安备-51010702001753号">
      </a>
    </p>

    <div id="footer-banner" style="padding:0rem">
      <div class="footer-banner-links">
        <div class="footer-banner-left">
          <div id="footer-banner-tips">
            <div style="display: flex;flex-direction: row;align-items: center;">
              ©2021 - 2025
              By <a class="footer-banner-link" href="" target="_blank">IceCMS</a>
            </div>
          </div>
        </div>
        <div class="footer-banner-right">
          <a class="footer-banner-link cloud" href="https://cloud.tencent.com/" rel="noopener external nofollow noreferrer noopener" target="_blank">
            <span>本网站由</span>&nbsp;&nbsp;
            &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
          </a>
          <a class="footer-banner-link cc" href="privacy.html" title="cc协议" data-pjax-state="load">
            <i class="haofont hao-icon-copyright-line"></i>
            <i class="haofont hao-icon-creative-commons-by-line"></i>
            <i class="haofont hao-icon-creative-commons-nc-line"></i>
            <i class="haofont hao-icon-creative-commons-nd-line"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 定义emits
const emit = defineEmits<{
  'scroll-to-top': []
}>()
</script>

<style scoped>
/* Footer组件样式可以在这里添加，或者依赖全局样式 */
</style> 