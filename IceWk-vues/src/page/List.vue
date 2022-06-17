<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message2="acticve" />
          <div class="app-main mobile-layout">
            <div
              class="w-full bg auto d-flex layout-min-full-height"
              :class="gridOrlist"
            >
              <div class="app-sidebar pc-model">
                <div class="pr-3 pl-2">
                  <p class="fs-12 opacity-40 mb-0 pt-1">分类</p>
                  <div class="macwk-sidebar mb-4 vsm_expanded">
                    <div class="vsm--scroll-wrapper">
                      <div class="vsm--list">
                        <div class="vsm--item" @click="getList()">
                          <span
                            role="link"
                            href="[object Object]"
                            class="vsm--link vsm--link_level-1"
                            :class="{ ' vsm--link_active': allIndex }"
                            ><span class="vsm--title">全部资源</span>
                            <!----></span
                          >
                          <!---->
                        </div>
                        <div
                          @click="getNewarticleclass(item.id)"
                          class="vsm--item"
                          v-for="(item, id) in this.classlist"
                          :key="id"
                        >
                          <span
                            role="link"
                            href="[object Object]"
                            class="vsm--link vsm--link_level-1"
                            :class="{
                              'vsm--link_active': item.id == clickIndex,
                            }"
                            ><span class="vsm--title">{{ item.name }}</span>
                            <div class="vsm--arrow vsm--arrow_slot">
                              <span
                                ><i class="icon-chevron-right"></i
                              ></span></div
                          ></span>
                          <!---->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-5">
                    <p class="fs-12 opacity-40 mb-3">兼容性</p>
                    <a class="d-block mb-2 fs-15 cursor-pointer active"
                      ><i class="fs-14 mr-1 icon-check-circle"></i>
                      <span class="el-tooltip item">全部</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">Silicon M1</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">Big Sur</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">Monterey</span></a
                    >
                  </div>
                  <div class="mb-5">
                    <p class="fs-12 opacity-40 mb-3">语言</p>
                    <a class="d-block mb-2 fs-15 cursor-pointer active"
                      ><i class="fs-14 mr-1 icon-check-circle"></i>
                      <span class="el-tooltip item">全部</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">中文</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">英文</span></a
                    >
                  </div>
                  <div class="mb-5">
                    <p class="fs-12 opacity-40 mb-3">类型</p>
                    <a class="d-block mb-2 fs-15 cursor-pointer active"
                      ><i class="fs-14 mr-1 icon-check-circle"></i>
                      <span class="el-tooltip item">全部</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">开源</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">破解</span></a
                    >
                  </div>
                  <div class="mb-5">
                    <p class="fs-12 opacity-40 mb-3">过滤</p>
                    <a class="d-block mb-2 fs-15 cursor-pointer active"
                      ><i class="fs-14 mr-1 icon-check-circle"></i>
                      <span class="el-tooltip item">全部</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">侵权</span></a
                    >
                  </div>
                </div>
              </div>
              <div class="app-content pc-model">
                <div class="app-content-main">
                  <div class="app-content-list">
                    <div class="app-content-header">
                      <div class="main-title">
                        <h5 class="i-con-h-a">
                          全部资源
                          <span class="text-muted fs-13 v-1 ml-1">
                            {{ this.ResourceNumber }}
                          </span>
                        </h5>
                      </div>
                      <nav
                        class="menu menu--macwk——list macwk-soft-list-menu flex"
                      >
                        <ul class="menu__list">
                          <li
                            class="menu__item"
                            @click="changeNews()"
                            :class="{
                              'menu__item--current': news === sortOrder,
                            }"
                          >
                            <a class="menu__link"> 最新 </a>
                          </li>
                          <li
                            class="menu__item"
                            @click="changeDownload()"
                            :class="{
                              'menu__item--current': download === sortOrder,
                            }"
                          >
                            <a class="menu__link"> 下载 </a>
                          </li>
                          <li
                            class="menu__item"
                            @click="changeDiscuss()"
                            :class="{
                              'menu__item--current': discuss === sortOrder,
                            }"
                          >
                            <a class="menu__link"> 评论 </a>
                          </li>
                          <li
                            class="menu__item"
                            @click="changeLove()"
                            :class="{
                              'menu__item--current': love === sortOrder,
                            }"
                          >
                            <a class="menu__link"> 喜欢 </a>
                          </li>
                          <li
                            class="menu__item"
                            @click="changeRecommend()"
                            :class="{
                              'menu__item--current': recommend === sortOrder,
                            }"
                          >
                            <a class="menu__link"> 推荐 </a>
                          </li>
                          <li class="menu__line"></li>
                        </ul>
                      </nav>
                      <div class="target-blank">
                        <div
                          role="switch"
                          class="el-switch mr-6"
                          style="margin-top: -3px"
                        >
                          <input
                            type="checkbox"
                            name=""
                            true-value="true"
                            class="el-switch__input"
                          />
                          <!---->
                          <div>
                            <el-switch
                              v-model="istargetjudje"
                              @change="istargetJudje()"
                              active-color="#13ce66"
                              inactive-color="#ff4949"
                            >
                            </el-switch>
                          </div>

                          <span class="el-switch__label el-switch__label--right"
                            ><!----><span aria-hidden="true"
                              >新窗口打开</span
                            ></span
                          >
                        </div>
                      </div>
                      <div class="d-flex justify-content-end">
                        <div class="grid-change">
                          <a
                            @click="changelayout()"
                            class="i-con-h-a position-relative cursor"
                            :class="layoutactive"
                            ><i class="i-con i-con-layout"><i></i></i></a
                          ><a
                            @click="changelist()"
                            class="i-con-h-a position-relative cursor"
                            :class="listactive"
                            ><i class="i-con i-con-list"><i></i></i></a
                          ><a
                            @click="changegrid()"
                            class="i-con-h-a position-relative cursor"
                            :class="gridactive"
                            ><i class="i-con i-con-grid"><i></i></i
                          ></a>
                        </div>
                      </div>
                    </div>
                    <!---->
                    <!---->
                    <div
                      id="listAppContainer"
                      class="app-content-body listAppContainer"
                    >
                      <div class="mw-row">
                        <div
                          v-for="item in list"
                          :key="item.id"
                          class="mw-col list-animation-leftIn delay-3"
                        >
                          <div v-if="item.status.includes('published')">
                            <router-link
                              :target="istarget"
                              :to="'/list/' + item.id"
                            >
                              <a class="macwk-app border white cursor-pointer">
                                <el-image
                                  v-if="item.thumb != null"
                                  class="listtitleimg delay-3"
                                  :src="item.thumb"
                                  lazy
                                >
                                  <div slot="placeholder" class="image-slot">
                                    <img
                                      style="
                                        width: 100%;
                                        height: 100%;
                                        object-fit: cover;
                                      "
                                      src="../static/image/loding.gif"
                                    />
                                  </div>
                                </el-image>

                                <div
                                  v-else
                                  class="delayImg"
                                  :style="getStyles()"
                                >
                                  <h3
                                    class="
                                      flex
                                      text-center text-white
                                      opacity-50
                                    "
                                  >
                                    NOPIC
                                  </h3>
                                </div>

                                <div class="macwk-app__body">
                                  <h5 class="macwk-app__body--title">
                                    <span
                                      class="el-tooltip today-update v-3 item"
                                    ></span>

                                    <span>{{ item.title | ellipsis }}</span>
                                    <span
                                      class="
                                        macwk-app__body--title--version
                                        text-muted
                                        fs-14
                                      "
                                      ><span class="mx-1">-</span>83.1</span
                                    >
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
                                  <div
                                    class="
                                      macwk-app__extend--update
                                      justify-content-end
                                    "
                                  >
                                    <i class="icon-clock"></i>

                                    <span> 02-10 </span>
                                  </div>
                                </div>
                                <div class="macwk-app__footer">
                                  <div
                                    v-show="showfootnext"
                                    class="macwk-app__footer--more"
                                  >
                                    <i
                                      class="light-icon-more icon-next-arrow"
                                    ></i>
                                  </div></div
                              ></a>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!---->
                    <pagination
                      class="app-content-bottom"
                      v-show="total > 0"
                      :background="false"
                      :total="total"
                      :page.sync="listQuery.page"
                      :limit.sync="listQuery.limit"
                      @pagination="getList"
                    />
                  </div>
                  <div class="app-content-info">
                    <div class="siderbar-apps border d-flex flex-column mb-5">
                      <div class="siderbar-apps__header">
                        <h6 class="mb-0">相关推荐</h6>
                      </div>
                      <div class="siderbar-apps__body min-h-415"></div>
                    </div>
                    <div class="siderbar-apps border d-flex flex-column">
                      <div class="van-tabs van-tabs--line">
                        <div class="van-tabs__wrap">
                          <div
                            role="tablist"
                            class="van-tabs__nav van-tabs__nav--line"
                          >
                            <div class="van-tabs__line"></div>
                          </div>
                        </div>
                        <div class="van-tabs__content">
                          <div
                            role="tabpanel"
                            class="van-tab__pane"
                            style="display: none"
                          >
                            <!---->
                          </div>
                          <div
                            role="tabpanel"
                            class="van-tab__pane"
                            style="display: none"
                          >
                            <!---->
                          </div>
                        </div>
                      </div>
                    </div>
                    <!---->
                  </div>
                </div>
              </div>
              <div class="app-content mobile-model">
                <div
                  class="
                    d-flex
                    layout-min-full-height
                    justify-content-center
                    align-items-center
                  "
                >
                  <div class="text-center" style="width: 80%; margin: 0 auto">
                    <h1 class="mb-4">哇，窗口太小啦</h1>
                    <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="macwk-footer white border-top pc-model"
            data-v-ea53b530=""
          >
            <div class="container" data-v-ea53b530="">
              <a href="index1.html" class="logo" data-v-ea53b530=""
                ><svg
                  id="macwk-svg-logo"
                  width="32"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                  data-v-6dd0b122=""
                  data-v-ea53b530=""
                >
                  <title data-v-6dd0b122="">ICEcms</title>
                  <defs data-v-6dd0b122="">
                    <lineargradient
                      x1="50%"
                      y1="0%"
                      x2="50%"
                      y2="100%"
                      id="a"
                      data-v-6dd0b122=""
                    >
                      <stop
                        offset="0%"
                        class="stop-color-circle"
                        data-v-6dd0b122=""
                      ></stop>
                      <stop
                        offset="100%"
                        class="stop-color-circle"
                        data-v-6dd0b122=""
                      ></stop>
                    </lineargradient>
                    <lineargradient
                      x1="100%"
                      y1="86.198%"
                      x2="-14.813%"
                      y2="-4.357%"
                      id="b"
                      data-v-6dd0b122=""
                    >
                      <stop
                        offset="0%"
                        class="stop-color-default"
                        data-v-6dd0b122=""
                      ></stop>
                      <stop
                        offset="40.927%"
                        class="stop-color-default"
                        data-v-6dd0b122=""
                      ></stop>
                      <stop
                        offset="100%"
                        class="stop-color-default"
                        data-v-6dd0b122=""
                      ></stop>
                    </lineargradient>
                    <lineargradient
                      x1="86.515%"
                      y1="24.533%"
                      x2="0%"
                      y2="24.533%"
                      id="c"
                      data-v-6dd0b122=""
                    >
                      <stop
                        stop-opacity="0"
                        offset="0%"
                        class="stop-color-default"
                        data-v-6dd0b122=""
                      ></stop>
                      <stop
                        offset="100%"
                        class="stop-color-default-linearGradient"
                        data-v-6dd0b122=""
                      ></stop>
                    </lineargradient>
                  </defs>
                  <g fill="none" fill-rule="evenodd" data-v-6dd0b122="">
                    <path
                      d="M29.952 16c0-1.933-1.562-3.5-3.488-3.5a3.494 3.494 0 0 0-3.488 3.5c0 1.933 1.561 3.5 3.488 3.5a3.494 3.494 0 0 0 3.488-3.5"
                      fill="url(#a)"
                      data-v-6dd0b122=""
                    ></path>
                    <path
                      d="M25.865 25.9a13.932 13.932 0 0 1-6.377 3.66c-1.115.286-2.284.44-3.488.44a13.893 13.893 0 0 1-10.512-4.797A13.968 13.968 0 0 1 2.048 16c0-3.523 1.298-6.742 3.44-9.203A13.893 13.893 0 0 1 16 2c1.204 0 2.373.154 3.488.44a13.932 13.932 0 0 1 6.377 3.66l-4.933 4.95A6.942 6.942 0 0 0 16 9c-3.852 0-6.976 3.134-6.976 7l.002.18C9.122 19.964 12.208 23 16 23c1.926 0 3.67-.784 4.932-2.05l4.933 4.95z"
                      fill="url(#b)"
                      data-v-6dd0b122=""
                    ></path>
                    <path
                      d="M20.932 11.05A6.942 6.942 0 0 0 16 9c-3.852 0-6.976 3.134-6.976 7a13.98 13.98 0 0 1 4.087-9.9 13.932 13.932 0 0 1 6.377-3.66l1.444 8.61z"
                      fill="url(#c)"
                      data-v-6dd0b122=""
                    ></path>
                  </g>
                </svg>
                <span class="ml-4" data-v-ea53b530="">MacWk</span></a
              >
              <div class="nav" data-v-ea53b530="">
                <a href="index1.html" class="nav-link" data-v-ea53b530=""
                  >首页</a
                >
                <a href="about.html" class="nav-link" data-v-ea53b530=""
                  >关于 </a
                ><a href="contact.html" class="nav-link" data-v-ea53b530=""
                  >联系 </a
                ><a href="privacy.html" class="nav-link" data-v-ea53b530=""
                  >隐私 </a
                ><a href="version.html" class="nav-link" data-v-ea53b530=""
                  >版本检测 </a
                ><a href="changelogs.html" class="nav-link" data-v-ea53b530=""
                  >更新日志
                </a>
              </div>
              <div class="copyright" data-v-ea53b530="">
                <p class="mb-0" data-v-ea53b530="">
                  <span class="mr-3" data-v-ea53b530=""
                    ><a href="javascript:;" target="_blank" data-v-ea53b530=""
                      >鲁ICP备19036164号</a
                    ></span
                  >
                  <span data-v-ea53b530=""
                    >Macwk.com © 2019. All rights reserved.</span
                  >
                </p>
              </div>
            </div>
          </div>
          <div infos="0">
            <div
              class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from './components/Top.vue'
import foot from './components/Foots.vue'

import { getResourceClasslist } from '@/api/webresourceclass'

import { getAllResource, getAllResourceNumber } from '@/api/webresource'

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default ({
  name: 'List',
  components: { top, foot, Pagination },
  data() {
    return {
      news: "new",
      download: "download",
      discuss: "discuss",
      love: "love",
      recommend: "recommend",
      sortOrder: "new",
      allIndex: true,
      classlist: "",
      istargetjudje: !true,
      istarget: "_self",
      ResourceNumber: "",
      list: "",
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      layoutactive: "",
      gridactive: "active",
      listactive: "",
      showfootnext: false,
      gridOrlist: "grid-grid",
      acticve: 'nav-link active',
    }
  },
  created() {
    this.getList()
    this.getNumber()
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 20) {
        return value.slice(0, 20) + "...";
      }
      return value;
    }
  },
  methods: {
    changeNews() {
      this.sortOrder = "news"
    },
    changeDownload() {
      this.sortOrder = "download"
    },
    changeDiscuss() {
      this.sortOrder = "discuss"
    },
    changeLove() {
      this.sortOrder = "love"
    },
    changeRecommend() {
      this.sortOrder = "recommend"
    },
    getNewarticleclass(id) {
      console.log("启动")
      this.clickIndex = id
      this.allIndex = false
      //重新请求全部列表
      this.list = this.template
      //过滤器，过滤sortclass为id的
      setTimeout(() => {
        let lists = this.list.filter(item => item.sortClass == id)
        this.list = lists
      })
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
    istargetJudje() {
      if (!this.istargetjudje) {
        this.istarget = "_self"
      } else {
        this.istarget = "_blank"
      }
    },
    getNumber() {
      getAllResourceNumber().then(resp => {
        this.ResourceNumber = resp.data
      })
    },
    getList() {
      this.allIndex = true
      this.clickIndex = false
      getAllResource(this.listQuery).then(resp => {
        //获取文章
        this.list = resp.data.data
        this.template = resp.data.data
        this.total = resp.data.total

      })
      getResourceClasslist().then(resp => {
        //获取分类

        this.classlist = resp.data

      })
    },
    changegrid() {
      this.layoutactive = ""
      this.gridactive = "active"
      this.listactive = ""
      this.gridOrlist = "grid-grid"

      this.showfootnext = false
    },
    changelist() {
      this.layoutactive = ""
      this.gridactive = ""
      this.listactive = "active"
      this.gridOrlist = "grid-list"

      this.showfootnext = true
    },
    changelayout() {
      this.layoutactive = "active"
      this.gridactive = ""
      this.listactive = ""


    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../static/mycss/top.css";
@import "../static/mycss/body.css";

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
</style>

<style lang="scss" scoped>
.delay-3 {
  ::v-deep {
    .el-image__inner {
      border-radius: 8px 8px 0px 0px;
    }
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
</style>