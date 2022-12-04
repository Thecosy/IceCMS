<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message2="acticve" />
          <div class="app-main mobile-layout">
            <div class="w-full bg auto d-flex layout-min-full-height" :class="gridOrlist">
              <div class="app-sidebar pc-model">
                <div class="pr-3 pl-2">
                  <p class="fs-12 opacity-40 mb-0 pt-1">分类</p>
                  <div class="macwk-sidebar mb-4 vsm_expanded">
                    <div class="vsm--scroll-wrapper">
                      <div class="vsm--list">
                        <div class="vsm--item" @click="getList()">
                          <span role="link" href="[object Object]" class="vsm--link vsm--link_level-1"
                            :class="{ ' vsm--link_active': allIndex }"><span class="vsm--title">全部资源</span>
                            <!----></span>
                          <!---->
                        </div>
                        <div @click="getNewarticleclass(item.id)" class="vsm--item" v-for="(item, id) in this.classlist"
                          :key="id">
                          <span role="link" href="[object Object]" class="vsm--link vsm--link_level-1" :class="{
                            'vsm--link_active': item.id == clickIndex,
                          }"><span class="vsm--title">{{ item.name }}</span>
                            <div class="vsm--arrow vsm--arrow_slot">
                              <span><i class="icon-chevron-right"></i></span>
                            </div>
                          </span>
                          <!---->
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="mb-5">
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
                  </div> -->
                  <div class="mb-5">
                    <p class="fs-12 opacity-40 mb-3">语言</p>
                    <a class="d-block mb-2 fs-15 cursor-pointer active"><i class="fs-14 mr-1 icon-check-circle"></i>
                      <span class="el-tooltip item">全部</span></a><a class="d-block mb-2 fs-15 cursor-pointer"><i
                        class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">中文</span></a><a class="d-block mb-2 fs-15 cursor-pointer"><i
                        class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">英文</span></a>
                  </div>
                  <div class="mb-5">
                    <p class="fs-12 opacity-40 mb-3">类型</p>
                    <a class="d-block mb-2 fs-15 cursor-pointer active"><i class="fs-14 mr-1 icon-check-circle"></i>
                      <span class="el-tooltip item">全部</span></a><a class="d-block mb-2 fs-15 cursor-pointer"><i
                        class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">开源</span></a><a class="d-block mb-2 fs-15 cursor-pointer"><i
                        class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">破解</span></a>
                  </div>
                  <!-- <div class="mb-5">
                    <p class="fs-12 opacity-40 mb-3">过滤</p>
                    <a class="d-block mb-2 fs-15 cursor-pointer active"
                      ><i class="fs-14 mr-1 icon-check-circle"></i>
                      <span class="el-tooltip item">全部</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">侵权</span></a
                    >
                  </div>  -->
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
                      <nav class="menu menu--macwk——list macwk-soft-list-menu flex">
                        <ul class="menu__list">
                          <li class="menu__item" @click="changeNews()" :class="{
                            'menu__item--current': news === sortOrder,
                          }">
                            <a class="menu__link"> 最新 </a>
                          </li>
                          <li class="menu__item" @click="changeDownload()" :class="{
                            'menu__item--current': download === sortOrder,
                          }">
                            <a class="menu__link"> 下载 </a>
                          </li>
                          <li class="menu__item" @click="changeLove()" :class="{
                            'menu__item--current': love === sortOrder,
                          }">
                            <a class="menu__link"> 喜欢 </a>
                          </li>
                          <!-- <li
                            class="menu__item"
                            @click="changeDiscuss()"
                            :class="{
                              'menu__item--current': discuss === sortOrder,
                            }"
                          >
                            <a class="menu__link"> 评论 </a>
                          </li> -->
                          <li class="menu__item" @click="changeRecommend()" :class="{
                            'menu__item--current': recommend === sortOrder,
                          }">
                            <a class="menu__link"> 推荐 </a>
                          </li>
                          <li class="menu__line"></li>
                        </ul>
                      </nav>
                      <div class="target-blank">
                        <div role="switch" class="el-switch mr-6" style="margin-top: -3px">
                          <input type="checkbox" name="" true-value="true" class="el-switch__input" />
                          <!---->
                          <div>
                            <el-switch v-model="istargetjudje" @change="istargetJudje()" active-color="#13ce66"
                              inactive-color="#ff4949">
                            </el-switch>
                          </div>

                          <span class="el-switch__label el-switch__label--right"><!----><span
                              aria-hidden="true">新窗口打开</span></span>
                        </div>
                      </div>
                      <div class="d-flex justify-content-end">
                        <div class="grid-change">
                          <a @click="changelayout()" class="i-con-h-a position-relative cursor" :class="layoutactive"><i
                              class="i-con i-con-layout"><i></i></i></a><a @click="changelist()"
                            class="i-con-h-a position-relative cursor" :class="listactive"><i
                              class="i-con i-con-list"><i></i></i></a><a @click="changegrid()"
                            class="i-con-h-a position-relative cursor" :class="gridactive"><i
                              class="i-con i-con-grid"><i></i></i></a>
                        </div>
                      </div>
                    </div>
                    <!---->
                    <!---->
                    <div id="listAppContainer" class="app-content-body listAppContainer">
                      <div class="mw-row">
                        <!-- 骨架屏 -->
                        <el-skeleton style="width:100%;display: flex;
    flex-wrap: wrap;" :loading="loading" animated :rows="4" :count="6"
                          :throttle="500">
                          <template slot="template">
                            <div class="mw-col list-animation-leftIn delay-3">
                              <div>

                                <a class="macwk-app border white cursor-pointer padding-xl">

                                  <div data-v-2661c954="" class="soft-card">
                                    <div data-v-2661c954="" class="li-card-img-div">
                                      <el-skeleton-item variant="image" style="width: 100%; height: 140px;" />

                                    </div>
                                    <el-skeleton-item variant="h3" style="margin-top:10px;width: 40%;" />
                                    <div data-v-2661c954=""
                                      class="margin-top size-18 text-bold  text-block card-hover-red">
                                      <el-skeleton-item variant="text" style="width: 70%;" />

                                    </div>
                                    <el-skeleton-item variant="text" />
                                  </div>
                                </a>
                              </div>
                            </div>
                          </template>
                          <template>
                            <div v-for="item, index in list" :key="item.id"
                              class="mw-col list-animation-leftIn delay-3">
                              <div v-if="!glabledata.glableImageFormat">
                                <div v-if="item.status.includes('published')">
                                  <router-link :target="istarget" :to="'/list/' + item.id">
                                    <a class="macwk-app border white cursor-pointer">
                                      <el-image v-if="item.thumb != null" class="listtitleimg delay-3" :src="item.thumb"
                                        lazy>
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
                                        <div class="card-meta">
                                          <div class="meta-item post-author">
                                            <el-avatar style=" margin-bottom: 3px;  margin-right: 3px;"
                                              :src="item.authorThumb"></el-avatar>
                                            <a href="blog-list.html" class="author-name">天天</a>
                                          </div>
                                          <span v-if="item.createTime != null" class="meta-item">
                                            {{ formatDate(item.createTime) }}</span>
                                          <span v-else class="meta-item"> {{ formatDate(item.addTime) }}</span>

                                          <span class="meta-item"><i class="el-icon-share"></i></span>
                                        </div>
                                        <h3 class="heading-tertiary-list">{{ item.title }}</h3>
                                      </div>
                                      <div class="extend">
                                        <div class="button">
                                          <div style="margin-left:12px">
                                            <span style="font-size: 36px;line-height: 1;">

                                              <i data-v-1c369514="" class="light-icon-more icon-next-arrow"></i>
                                            </span>
                                          </div>

                                          <div style="margin-right:12px">
                                            <span class="value">${{ item.price }}</span>
                                          </div>
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
                              </div>
                              <div v-else>
                                <div @mouseover="dowmloadover(index)" @mouseleave="downloadleave(index)"
                                  v-if="item.status.includes('published')">
                                  <router-link :target="istarget" :to="'/list/' + item.id">
                                    <a class="macwk-app border white cursor-pointer padding-xl">

                                      <div data-v-2661c954="" class="soft-card">
                                        <div data-v-2661c954="" class="li-card-img-div">
                                          <img data-v-2661c954="" :src="item.thumb"
                                            class="budongImg img72 dingweiImg" />
                                          <transition name="fade">
                                            <img data-v-2661c954="" v-if="isAcitive === index" :src="item.thumb"
                                              class="gaosiImg img72 dingweiImg" />
                                          </transition>
                                        </div>
                                        <div data-v-2661c954="" class="size-12 text-B6BABF margin-top-90"
                                          style="min-height: 20px;">
                                          <span data-v-2661c954="">{{ item.subhead }}</span>
                                        </div>
                                        <div data-v-2661c954=""
                                          class="margin-top size-18 text-bold  text-block card-hover-red">
                                          <span data-v-2661c954="">{{ item.title }} </span>
                                        </div>
                                        <div data-v-2661c954="" class="margin-top1 size-14 text-B6BABF limitText">
                                          <span data-v-2661c954="">{{ item.intro }}</span>
                                        </div>
                                        <div data-v-2661c954="" class="margin-top2 text-B6BABF flex-row size-12"
                                          style=" bottom: 20px; width: 100%;">
                                          <div data-v-2661c954="">
                                            <i data-v-2661c954="" class="el-icon-view"></i>
                                            <span data-v-2661c954="">34.5k</span>
                                          </div>
                                          <div data-v-2661c954="" style="margin-left: 6px;" class="margin-left">
                                            <i data-v-2661c954="" class="el-icon-download"></i>
                                            <span data-v-2661c954="">1500</span>
                                          </div>
                                          <div data-v-2661c954="" style="position: absolute; right: 35px;">
                                            <span v-if="item.createTime != null"> {{ formatDate(item.createTime)
                                            }}</span>
                                            <span v-else> {{ formatDate(item.addTime) }}</span>
                                          </div>
                                        </div>
                                      </div>

                                    </a>

                                  </router-link>
                                </div>
                              </div>

                            </div>
                          </template>
                        </el-skeleton>
                      </div>
                    </div>
                    <!---->
                    <pagination class="app-content-bottom" v-show="total > 0" :background="false" :total="total"
                      :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListByClass" />
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
                          <div role="tablist" class="van-tabs__nav van-tabs__nav--line">
                            <div class="van-tabs__line"></div>
                          </div>
                        </div>
                        <div class="van-tabs__content">
                          <div role="tabpanel" class="van-tab__pane" style="display: none">
                            <!---->
                          </div>
                          <div role="tabpanel" class="van-tab__pane" style="display: none">
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
                <div class="
                    d-flex
                    layout-min-full-height
                    justify-content-center
                    align-items-center
                  ">
                  <div class="text-center" style="width: 80%; margin: 0 auto">
                    <h1 class="mb-4">哇，窗口太小啦</h1>
                    <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
                  </div>
                </div>
              </div>
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
import top from './components/Top.vue'
import foot from './components/Foots.vue'
import { formatDate, GetWeekdate } from '@/utils/date.js'

import { getResourceClasslist } from '@/api/webresourceclass'

import { getAllResource, getAllResourceNumber, getResourceFilter } from '@/api/webresource'

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { mapState, mapMutations } from 'vuex'

export default ({
  name: 'List',
  components: { top, foot, Pagination },
  computed: {
    ...mapState(['playlist', 'glabledata', 'count'])
  },
  data() {
    return {
      loading: true,
      isAcitive: false,
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
      listQueryClass: {
        page: 1,
        limit: 20,
        class: ""
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
    // 鼠标移入赋值index 
    dowmloadover(index) {
      this.isAcitive = index
    },
    // 鼠标移出 
    downloadleave(index) {
      this.isAcitive = false
    },

    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd ')
    },
    changeNews() {
      this.sortOrder = "news"
      if (this.allIndex == true) {
        this.listQueryClass.class = 0
      }
      this.listQueryClass.page = this.listQuery.page
      this.listQueryClass.limit = this.listQuery.limit
      getResourceFilter(this.listQueryClass, this.sortOrder).then(resp => {
        //获取文章
        this.list = resp.data.data
        this.template = resp.data.data
        this.total = resp.data.total
      })

    },
    changeDownload() {
      this.sortOrder = "download"
      if (this.allIndex == true) {
        this.listQueryClass.class = 0
      }
      this.listQueryClass.page = this.listQuery.page
      this.listQueryClass.limit = this.listQuery.limit
      getResourceFilter(this.listQueryClass, this.sortOrder).then(resp => {
        //获取文章
        this.list = resp.data.data
        this.template = resp.data.data
        this.total = resp.data.total
      })
    },
    changeDiscuss() {
      this.sortOrder = "discuss"
      if (this.allIndex == true) {
        this.listQueryClass.class = 0
      }
      this.listQueryClass.page = this.listQuery.page
      this.listQueryClass.limit = this.listQuery.limit
      getResourceFilter(this.listQueryClass, this.sortOrder).then(resp => {
        //获取文章
        this.list = resp.data.data
        this.template = resp.data.data
        this.total = resp.data.total
      })
    },
    changeLove() {
      this.sortOrder = "love"
      if (this.allIndex == true) {
        this.listQueryClass.class = 0
      }
      this.listQueryClass.page = this.listQuery.page
      this.listQueryClass.limit = this.listQuery.limit
      getResourceFilter(this.listQueryClass, this.sortOrder).then(resp => {
        //获取文章
        this.list = resp.data.data
        this.template = resp.data.data
        this.total = resp.data.total
      })
    },
    changeRecommend() {
      this.sortOrder = "recommend"
      if (this.allIndex == true) {
        this.listQueryClass.class = 0
      }
      this.listQueryClass.page = this.listQuery.page
      this.listQueryClass.limit = this.listQuery.limit
      getResourceFilter(this.listQueryClass, this.sortOrder).then(resp => {
        //获取文章
        this.list = resp.data.data
        this.template = resp.data.data
        this.total = resp.data.total
      })
    },
    getNewarticleclass(id) {
      this.clickIndex = id
      this.allIndex = false
      // //重新请求全部列表
      // this.list = this.template
      // //过滤器，过滤sortclass为id的
      // setTimeout(() => {
      //   let lists = this.list.filter(item => item.sortClass == id)
      //   this.list = lists
      // })
      this.listQueryClass.class = id
      this.listQueryClass.page = 1
      this.listQuery.page = 1
      getResourceFilter(this.listQueryClass, this.sortOrder).then(resp => {
        //获取文章
        this.list = resp.data.data
        this.template = resp.data.data
        this.total = resp.data.total
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
    getListByClass() {
      if (this.allIndex == true) {
        this.listQueryClass.class = 0
      }
      this.listQueryClass.page = this.listQuery.page
      this.listQueryClass.limit = this.listQuery.limit
      getResourceFilter(this.listQueryClass, this.sortOrder).then(resp => {
        //获取文章
        this.list = resp.data.data
        this.template = resp.data.data
        this.total = resp.data.total
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
        this.loading = false
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
.macwk-app__body {
  padding: 13px 9px 5px;
}

.macwk-animation .delay-3 {
  border-radius: 8px 8px 0px 0px;
}

.listtitleimg {
  height: 155px;
  width: 100%;
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
  width: 100%;
  border-radius: 8px 8px 0px 0px;
}

.app-content-main .app-content-bottom {
  border-radius: 15px;
}

.heading-tertiary-list {
  font-size: 15px;
  line-height: 23px;
  font-weight: 670;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-meta {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 1px;
  margin-bottom: 3px;
}

.post-author {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.meta-item {
  margin-right: 18px;
  position: relative;
  font-size: 14px;
}

.author-name {
  font-size: 12px;
  font-weight: 600;
  font-family: "Advent Pro", sans-serif;
  color: #222;
}

.value {
  font-size: 15px;
  font-weight: 700;
  line-height: 10px;
  letter-spacing: 0.0015em;
  color: #50A0FF;
}

.button {
  display: flex;
  font-size: 16px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
}

.meta-item:not(:last-child)::after {
  content: "";
  width: 5px;
  height: 5px;
  background-color: #177ef7;
  border-radius: 50%;
  position: absolute;
  right: -15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
<style  scoped>
.gaosiImg {
  filter: blur(20px) opacity(70%) brightness(110%);
  transition: .3s;
  ;
  z-index: 8
}

.dingweiImg,
.recommendDingweiImg {
  position: absolute;
  top: 15px !important;
  left: 20px !important
}

.img72,
.imgQueXing3 {
  width: 72px;
  height: 72px;
}

.margin-top-90 {
  margin-top: 90px;
}

.text-block {
  color: #3c4248;
}

.text-bold {
  font-weight: 700;
}

.size-18 {
  font-size: 18px;
}

.margin-top {
  margin-top: 10px;
}

.cursor {
  cursor: pointer;
}

.padding-xl {
  padding: 20px;
}

.text-B6BABF {
  color: #b6babf;
}

.size-14 {
  font-size: 14px;
}

.margin-top {
  margin-top: 10px;
}

.limitText {
  max-width: 180px;
  height: 20px;
  overflow: hidden;
}

.flex-row {
  display: flex;
  flex-direction: row !important;
}

.size-12 {
  font-size: 12px;
}

.margin-top2 {
  margin-top: 20px;
}

.home /deep/ .el-skeleton {
  display: flex;
  flex-wrap: wrap;
}
</style>