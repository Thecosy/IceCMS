<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <div class="layout-min-full-height overflow-hidden special-content pb-8">
            <top :message4="acticve" />
            <div class="container">
              <div class="row">
                <div class="col-sm-12 col-xxl-10 offset-xxl-1">
                  <header class="text-center py-8">
                    <h1 class="fw-600 fs-60">
                      Best Tools for
                      <span @click="moreaction()"  class="text-primary hover-text-underline cursor">{{ className }} <i
                          class="icon-chevron-down"></i></span>
                    </h1>
                    <span>
                      <div v-show="moreIndex" role="tooltip" id="el-popover-4430" aria-hidden="true" class="el-popover el-popper" 
                        style="width: 300px; ">
                        <!---->
                        <div>
                          <a href="/special/gif" aria-current="page"
                            class="px-5 py-3 fs-26 d-block active text-primary">Gif动画制作</a><a href="/special/adobe"
                            class="px-5 py-3 fs-26 d-block">Adobe 2021</a><a href="/special/photo"
                            class="px-5 py-3 fs-26 d-block">图像处理</a><a href="/special/pm"
                            class="px-5 py-3 fs-26 d-block">产品经理</a><a href="/special/mindmap"
                            class="px-5 py-3 fs-26 d-block">思维导图</a><a href="/special/manage"
                            class="px-5 py-3 fs-26 d-block">项目管理</a><a href="/special/prototype"
                            class="px-5 py-3 fs-26 d-block">原型设计</a><a href="/special/novice"
                            class="px-5 py-3 fs-26 d-block">新人必备</a>
                        </div>
                      </div>
                      <span class="el-popover__reference-wrapper"></span>
                    </span>
                    <h5 class="text-muted">
                      在这里，您可以找到面向{{ className }}的最佳应用工具。<br />
                      如果您认为我们有所遗漏，请在<a href="/feedback" target="_blank" class="mx-1 text-primary">意见建议</a>处提交给我们，谢谢。
                    </h5>
                  </header>
                  <div class="clearfix special-box-list">
                    <div class="w-r" style="margin-left: -15px; margin-right: -15px">
                      <div
                        v-for="item in rlist"
                        :key="item.id"
                        class="list-animation-leftIn w-c w-c-6 delay-0"
                        style="padding-left: 15px;padding-right: 15px;padding-bottom: 30px;"
                      >
                      <router-link
                              :to="'/list/' + item.id"
                            >
                        <a
                          href=""
                          target="_blank"
                          class="
                            macwk-app
                            white
                            border
                            cursor-pointer
                            mb-0
                            macwk-box__animation
                            delay-0
                          "
                          ><span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <div class="macwk-app__header--icon delay-0">
                            <div class="macwk-app__header--icon--content"></div>
                            <img class="delay-0" :src="item.thumb" />
                            <div class="flex-grow-1 text-right fs-14"></div>
                          </div>
                          <div class="macwk-app__body pt-6 pb-7">
                            <h4 class="macwk-app__body--title">
                              <span class="fw-600">{{ item.title }}</span>
                            </h4>
                            <p class="macwk-app__body--info">
                              <span>{{item.subhead}}</span>
                            </p>
                            <p class="text-muted text-truncate mb-0">
                              {{ item.intro }}
                            </p>
                          </div>
                          <div class="macwk-app__extend">
                            <div class="macwk-app__extend--download">
                              <i class="icon-download2"></i> <span>18002</span>
                            </div>
                            <div class="macwk-app__extend--comment">
                              <i class="icon-bubble"></i> <span>39</span>
                            </div>
                            <div class="macwk-app__extend--like">
                              <i class="icon-heart"></i> <span>144</span>
                            </div>
                            <div class="macwk-app__extend--os">
                              <i class="icon-disc fw-600"></i>
                              <span>&gt;= 10.12</span>
                            </div>
                            <div class="macwk-app__extend--update">
                              <i class="icon-clock"></i> 
                              <span v-if="item.createTime != null"  > {{formatDate(item.createTime)}}</span>
                                        <span v-else  > {{formatDate(item.addTime)}}</span>
                            </div>
                          </div>
                        </a>
                      </router-link>
                      </div>
                      <!-- <div v-for="item in rlist" :key="item.id" class="list-animation-leftIn w-c w-c-6 delay-0">
                        <div v-if="item.status.includes('published')">
                          <router-link :to="'/list/' + item.id">
                            <a class="macwk-app border white cursor-pointer">
                              <el-image v-if="item.thumb != null" class="listtitleimg delay-3" :src="item.thumb" lazy>
                                <div slot="placeholder" class="image-slot">
                                  <img style="
                                        width: 100%;
                                        height: 100%;
                                        object-fit: cover;
                                      " src="../static/image/loding.gif" />
                                </div>
                              </el-image>

                              <div v-else class="delayImg" :style="getStyles()">
                                <h3 class="
                                      flex
                                      text-center text-white
                                      opacity-50
                                    ">
                                  NOPIC
                                </h3>
                              </div>

                              <div class="macwk-app__body">
                                <h5 class="macwk-app__body--title">
                                  <span class="el-tooltip today-update v-3 item"></span>

                                  <span>{{ item.title | ellipsis }}</span>
                                  <span class="
                                        macwk-app__body--title--version
                                        text-muted
                                        fs-14
                                      "><span class="mx-1">-</span>83.1</span>
                                </h5>
                                <p class="macwk-app__body--info">
                                  <span>{{ item.intro }}</span>
                                </p>
                              </div>
                              <div class="macwk-app__extend">
                                <div class="macwk-app__extend--download">
                                  <i class="icon-download2"></i>
                                  <span>366.4k</span>
                                </div>
                                <div class="macwk-app__extend--comment">
                                  <i class="icon-bubble"></i> <span>800</span>
                                </div>
                                <div class="macwk-app__extend--os">
                                  <i class="icon-disc fw-600"></i>
                                  <span>&gt;= 10.12</span>
                                </div>
                                <div class="
                                      macwk-app__extend--update
                                      justify-content-end
                                    ">
                                  <i class="icon-clock"></i>

                                  <span> 02-10 </span>
                                </div>
                              </div>
                              <div class="macwk-app__footer">
                                <div v-show="showfootnext" class="macwk-app__footer--more">
                                  <i class="light-icon-more icon-next-arrow"></i>
                                </div>
                              </div>
                            </a>
                          </router-link>
                        </div>
                      </div> -->
                      <!-- ----- -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="sidetools" class="macwk-animation tinUpIn" style="display: none">
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a href="https://t.me/macwk" target="_blank" class="cursor"><span
                      class="sidetools-icon kfqq"></span></a>
                </div>
              </div>
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a class="el-tooltip cursor"><span class="sidetools-icon back-top"></span></a>
                </div>
              </div>
              <span>
                <div role="tooltip" id="el-popover-3162" aria-hidden="true" class="el-popover el-popper"
                  style="width: 200px; display: none">
                  <!---->
                  <div class="text-center">
                    <a href="/feedback" class="mt-15 mb-0">在线留言</a>
                  </div>
                </div>
                <span class="el-popover__reference-wrapper"></span>
              </span>
              <span>
                <div role="tooltip" id="el-popover-2721" aria-hidden="true" class="el-popover el-popper"
                  style="width: 200px; display: none">
                  <!---->
                  <div class="text-center">
                    <a href="/feedback" class="mt-15 mb-0">在线留言</a>
                  </div>
                </div>
                <span class="el-popover__reference-wrapper"></span>
              </span>
            </div>
          </div>
          <foot />
          <div infos="0">
            <div class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getResourceByClass } from '@/api/webresource'
import { formatDate, GetWeekdate } from '@/utils/date.js'

import { getResourceClassNameByid } from '@/api/webresourceclass'

export default ({
  name: 'ClassDetal',
  components: {
    top: () => import("../components/Top.vue"),
    foot: () => import("../components/Foots.vue"),
  },
  data() {
    return {
      moreIndex: false,
      className: '',
      rlist: '',
      acticve: 'nav-link active',
    }
  },
  created() {
    this.getList()
    this.getClassName()
  },

  methods: {
    moreaction() {
      this.moreIndex = !this.moreIndex
    },
    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd ')
    },
    getStyles() {
      //生成随机颜色
      let max = 8;
      let min = 1;

      let x = Math.floor(Math.random() * (max - min + 1)) + min;

      const backcolor = "randomColor" + x;

      if (backcolor == "randomColor1") {
        return "background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);"
      }
      if (backcolor == "randomColor2") {
        return "background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);"
      }
      if (backcolor == "randomColor3") {
        return "background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);"
      }
      if (backcolor == "randomColor4") {
        return "background-image: linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);"
      }
      if (backcolor == "randomColor5") {
        return "background-image: linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);"
      }
      if (backcolor == "randomColor6") {
        return "background-image: linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%);"
      }
      if (backcolor == "randomColor7") {
        return "background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);"
      }
      if (backcolor == "randomColor8") {
        return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
      }


      return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
    },
    getClassName() {
      getResourceClassNameByid(this.$route.params.id).then(resp => {
        console.log(resp.data)
        this.className = resp.data

      })
    },
    getList() {
      getResourceByClass(this.$route.params.id).then(resp => {
        console.log(resp.data)
        this.rlist = resp.data

      })
    }
  }
})
</script>
<style scoped>
.macwk-animation .delay-0{
  padding: 5px;
}
.delayImg {
  height: 100px;
  width: 145px;
  border-radius: 8px;
}
</style>


<style scoped>
.white1 {
  background-color: rgb(255, 255, 255);
  z-index: -1;
}

.index1 {
  z-index: 555;
}

.index {
  z-index: -1;
}

.outsection {
  display: flex;
  align-items: center;
  justify-content: center;
}

.Thecarousel {
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  width: 1435px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style lang="scss" scoped>
.delayImg {
  :v-deep(.el-image__inner) {
      border-radius: 8px;
  }
}

.delay-3 {
  :v-deep(.el-image__inner) {
      width: 224px;
      height: 128px;
      border-radius: 8px 8px 0px 0px;
  }
}

.delayImgs {
  width: 224px;
  height: 128px;
  border-radius: 8px 8px 0px 0px;
}

.h-150 {
  margin-top: -20px;
  margin-bottom: -55px;
  height: 150px !important;
}
</style>


<style lang="scss" scoped>
.macwk-app__body {
  padding: 13px 9px 5px;
}

.macwk-animation .delay-3 {
  border-radius: 8px 8px 0px 0px;
}

.listtitleimg {
  height: 155px;
  width: 260.5px;
}

.delay-3 {
  :v-deep(.el-image__inner) {
      border-radius: 8px 8px 0px 0px;
  }
}

.delayImg {
  height: 155px;
  width: 260.5px;
  border-radius: 8px 8px 0px 0px;
}

.app-content-main .app-content-bottom {
  border-radius: 15px;
}
.el-popover{
  right: 300px;
    position: absolute;
    background: #FFF;
    min-width: 165px;
    border: 1px solid #EBEEF5;
    padding: 12px;
    z-index: 2000;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    word-break: break-all;
}
</style>