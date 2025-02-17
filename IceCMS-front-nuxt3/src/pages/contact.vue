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
                    <section class="layout-index mt-5 pb-7">
                        <div class="container">
                            <div class="text-center pt-8 pb-5">
                                <h1>联系 IceCMS.cn</h1>
                                <p class="fs-20 text-muted">软件版权及合作请发邮件，每周处理一次，谢谢合作。</p>
                            </div>
                            <div class="row mb-8">
                                <div class="col-xl-6 offset-xl-3">
                                    <div
                                        class="form-group input-group rss-input-group radius-top-left-5x radius-bottom-left-5x">
                                        <input type="text" value="IceCMS.com.cn@gmail.com" disabled
                                            class="form-control radius-top-left-5x radius-bottom-left-5x">
                                        <div class="input-group-append"><button type="button"
                                                class="btn btn-theme px-5 radius-top-right-5x radius-bottom-right-5x">复制
                                            </button></div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-r" style="margin-left:-15px;margin-right:-15px;">
                                <div class="list-animation-leftIn w-c w-c-6 delay-0"
                                    style="padding-left:15px;padding-right:15px;padding-bottom:30px;"><a
                                        href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&amp;k=QMe6PjtKnzoMnXd3qWHGDsFyAjnHC_HY&amp;authKey=sgkvrRw1Z4UC0zDAGgiY9XGXr%2FCSAlq0i6VKmpFEaiRkX64Isr2L%2BHIFgt6mo3lm&amp;noverify=0&amp;group_code=623760607"
                                        target="_blank"
                                        class="macwk-app white border mb-0 macwk-box__animation delay-0"><span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span>
                                        <div class="macwk-app__header--icon delay-0">
                                            <div class="macwk-app__header--icon--content"></div><img class="delay-0"
                                                >
                                            <div class="flex-grow-1 text-right fs-14"></div>
                                        </div>
                                        <div class="macwk-app__body pt-6 pb-5">
                                            <h5 class="macwk-app__body--title"
                                                style="display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;word-break:break-all;text-overflow:ellipsis;-webkit-line-clamp:1;">
                                                <span class="fw-600">MacWk官方交流①群</span></h5>
                                            <p class="text-truncate mb-6"><span class="text-muted">未满员</span></p>
                                            <div class="btn btn-outline-theme px-6 btn-round"> 加入群聊 </div>
                                        </div>
                                    </a></div>
                                <div class="list-animation-leftIn w-c w-c-6 delay-1"
                                    style="padding-left:15px;padding-right:15px;padding-bottom:30px;"><a
                                        href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&amp;k=nLT0zJmFvWTBZi0ad6xfgipbfPykUsO_&amp;authKey=O7IhlOBJ%2BFSvy9MH2qU9SEg1OYai5Eg8rUkPP6fYJJhhogE3t6N4Lq424NWTJKvh&amp;noverify=0&amp;group_code=780792337"
                                        target="_blank"
                                        class="macwk-app white border cursor-pointer mb-0 macwk-box__animation delay-1"><span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span>
                                        <div class="macwk-app__header--icon delay-1">
                                            <div class="macwk-app__header--icon--content"></div><img class="delay-1"
                                               alt="QQ群">
                                            <div class="flex-grow-1 text-right fs-14"></div>
                                        </div>
                                        <div class="macwk-app__body pt-6 pb-5">
                                            <h5 class="macwk-app__body--title"
                                                style="display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;word-break:break-all;text-overflow:ellipsis;-webkit-line-clamp:1;">
                                                <span class="fw-600">MacWk官方交流②群</span></h5>
                                            <p class="text-truncate mb-6"><span class="text-muted">未满员</span></p>
                                            <div class="btn btn-outline-theme px-6 btn-round"> 加入群聊 </div>
                                        </div>
                                    </a></div>
                                <div class="list-animation-leftIn w-c w-c-6 delay-2"
                                    style="padding-left:15px;padding-right:15px;padding-bottom:30px;"><a
                                        href="https://qm.qq.com/q/fzdsRqvq2Q" target="_blank"
                                        class="macwk-app white border cursor-pointer mb-0 macwk-box__animation delay-2"><span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span>
                                        <div class="macwk-app__header--icon delay-2">
                                            <div class="macwk-app__header--icon--content"></div><img class="delay-2"
                                              >
                                            <div class="flex-grow-1 text-right fs-14"></div>
                                        </div>
                                        <div class="macwk-app__body pt-6 pb-5">
                                            <h5 class="macwk-app__body--title"
                                                style="display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;word-break:break-all;text-overflow:ellipsis;-webkit-line-clamp:1;">
                                                <span class="fw-600">MacWk官方交流③群</span></h5>
                                            <p class="text-truncate mb-6"><span class="text-muted">未满员</span></p>
                                            <div class="btn btn-outline-theme px-6 btn-round"> 加入群聊 </div>
                                        </div>
                                    </a></div>
                                <div class="list-animation-leftIn w-c w-c-6 delay-3"
                                    style="padding-left:15px;padding-right:15px;padding-bottom:30px;"><a
                                        href="https://qm.qq.com/q/tzJsg0nmeW" target="_blank"
                                        class="macwk-app white border cursor-pointer mb-0 macwk-box__animation delay-3"><span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span> <span class="snow-dot"></span> <span
                                            class="snow-dot"></span>
                                        <div class="macwk-app__header--icon delay-2">
                                            <div class="macwk-app__header--icon--content"></div><img class="delay-3"
                                               >
                                            <div class="flex-grow-1 text-right fs-14"></div>
                                        </div>
                                        <div class="macwk-app__body pt-6 pb-5">
                                            <h5 class="macwk-app__body--title"
                                                style="display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;word-break:break-all;text-overflow:ellipsis;-webkit-line-clamp:1;">
                                                <span class="fw-600">MacWk官方交流④群</span></h5>
                                            <p class="text-truncate mb-6"><span class="text-muted">未满员</span></p>
                                            <div class="btn btn-outline-theme px-6 btn-round"> 加入群聊 </div>
                                        </div>
                                    </a></div>
                            </div>
                        </div>
                    </section>
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
  </script>
   -->
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  
  