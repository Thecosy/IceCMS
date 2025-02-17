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
            <div class="layout-min-full-height" style="width:900px;margin:0px auto;">
                    <div class="clearfix grid-list py-7">
                        <div class="text-center py-6 mb-4">
                            <h1 >MacWk 优化记录</h1>
                            <p class="fs-20 text-muted">了解 MacWk 在改进用户体验的过程中做了哪些努力。</p>
                        </div>
                        <div class="changelog-list">
                            <div class="changelog-item d-flex">
                                <div class="w-120 text-right"> 2024-06-01 </div>
                                <div class="mr-6 ml-6 position-relative"><span class="changelog-item__bullet"><i
                                            class="icon-clock"></i></span>
                                    <div class="changelog-item__line"></div>
                                </div>
                                <div class="article-content pb-5 flex">
                                    <h4 class="mt-0 mb-5 fs-22"> 2.0.0 - 终于上线啦！ </h4>
                                    <div class="blockquote"></div>
                                    <div>
                                        <h5><span class="badge px-4 py-2 btn-round badge-success">正式上线</span></h5>
                                        <ul>
                                            <li>
                                                <p>使用Nuxt.js和Vue.js技术栈重新开发</p>
                                            </li>
                                            <li>
                                                <p>支持SEO，搜索逻辑重新优化了</p>
                                            </li>
                                            <li>
                                                <p>增加了软件详情顶部导航栏</p>
                                            </li>
                                            <li>
                                                <p>重写了<a href="genuine.html" rel="noopener noreferrer" target="_blank"
                                                        class="">优惠正版</a>页面</p>
                                            </li>
                                            <li>
                                                <p>虽然还有小问题，慢慢优化吧</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="changelog-item d-flex">
                                <div class="w-120 text-right"> 2024-03-23 </div>
                                <div class="mr-6 ml-6 position-relative"><span class="changelog-item__bullet"><i
                                            class="icon-clock"></i></span>
                                    <div class="changelog-item__line"></div>
                                </div>
                                <div class="article-content pb-5 flex">
                                    <h4 class="mt-0 mb-5 fs-22"> 2.0.0 - 计划使用全新前端技术架构重写 </h4>
                                    <div class="blockquote"></div>
                                    <div>
                                        <h5><span class="badge px-4 py-2 btn-round badge-danger">重大决策</span></h5>
                                        <ul>
                                            <li>
                                                <p>本次重构希望借助Nuxt.js让本站具有SEO能力</p>
                                            </li>
                                            <li>
                                                <p>正式上线时间预计7月份之前，感谢大家的持续关注</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="changelog-item d-flex">
                                <div class="w-120 text-right"> 2024-01-01 </div>
                                <div class="mr-6 ml-6 position-relative"><span class="changelog-item__bullet"><i
                                            class="icon-clock"></i></span>
                                    <div class="changelog-item__line"></div>
                                </div>
                                <div class="article-content pb-5 flex">
                                    <h4 class="mt-0 mb-5 fs-22"> 1.0.2 - 内测结束，正式上线 </h4>
                                    <div class="blockquote"></div>
                                    <div>
                                        <h5><span class="badge px-4 py-2 btn-round badge-success">正式上线</span></h5>
                                        <ul>
                                            <li>
                                                <p>内测终于结束，终于迎来了上线，感谢大家的支持！</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="changelog-item d-flex">
                                <div class="w-120 text-right"> 2023-11-19 </div>
                                <div class="mr-6 ml-6 position-relative"><span class="changelog-item__bullet"><i
                                            class="icon-clock"></i></span>
                                    <div class="changelog-item__line"></div>
                                </div>
                                <div class="article-content pb-5 flex">
                                    <h4 class="mt-0 mb-5 fs-22"> 1.0.2 - 内部测试整站功能 </h4>
                                    <div class="blockquote"></div>
                                    <div>
                                        <h5><span class="badge px-4 py-2 btn-round badge-primary">内部测试</span></h5>
                                        <ul>
                                            <li>
                                                <p>基本功能已经完善，下载上传测试无问题，UI无重大问题</p>
                                            </li>
                                            <li>
                                                <p>后台管理系统测试完成，可以上传软件了</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="changelog-item d-flex">
                                <div class="w-120 text-right"> 2023-11-15 </div>
                                <div class="mr-6 ml-6 position-relative"><span class="changelog-item__bullet"><i
                                            class="icon-clock"></i></span>
                                    <div class="changelog-item__line"></div>
                                </div>
                                <div class="article-content pb-5 flex">
                                    <h4 class="mt-0 mb-5 fs-22"> 1.0.1 - 内部测试UI，UI无重大问题 </h4>
                                    <div class="blockquote"></div>
                                    <div>
                                        <h5><span class="badge px-4 py-2 btn-round badge-primary">内部测试</span></h5>
                                        <ul>
                                            <li>
                                                <p>使用Vue2.js SPA技术栈开发</p>
                                            </li>
                                            <li>
                                                <p>增加隐私政策页面，对于侵犯用户隐私的行为，macwk 说：不！<a href="privacy.html" target="_blank"
                                                        class="text-primary">点我查看</a></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <foot />
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <!-- <script>
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
  
  <style scoped>
  .changelog-item__bullet {
    align-items: center;
  background-size: cover;
  border: 3px solid #ff4954;
  border-radius: 100%;
  box-shadow: 0 1px 5px #eaf6ff;
  box-sizing: border-box;
  display: flex;
  font-size: 14px;
  height: 32px;
  justify-content: center;
  left: 50%;
  position: absolute;
  top: 0;
  transform: translate(-50%);
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  width: 32px;
  }
  .badge-success {
  background-color: #3cd458;
  color: #fff;
}
.badge {
  border-radius: .125rem;
  display: inline-block;
  font-size: 80%;
  font-weight: 400;
  line-height: 1;
  padding: .25em .5em;
  text-align: center;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  vertical-align: baseline;
  white-space: nowrap;
}
.btn-round {
  border-radius: 10rem;
}
.py-2 {
  padding-top: .5rem !important;
}
.py-2 {
  padding-bottom: .5rem !important;
}
.px-4 {
  padding-right: 1rem !important;
}
.px-4 {
  padding-left: 1rem !important;
}
.badge-danger {
  background-color: #ff4954;
  color: #fff;
}
.badge-primary {
  background-color: #50a1ff;
  color: #fff;
}
</style>