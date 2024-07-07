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
                  </div> -->
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
                        <template>
                            <div v-for="item, index in list" :key="item.id"
                              class="mw-col list-animation-leftIn delay-3">
                              <div v-if="setting.imageFormat">
                                <div v-if="item.status.includes('published')">
                                  <nuxt-link :target="istarget" :to="'/list/' + item.id">
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
                                            <a class="author-name">{{ item.author }}</a>
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

                                              <i  class="light-icon-more icon-next-arrow"></i>
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
                                  </nuxt-link>
                                </div>
                              </div>
                              <div v-else>
                                <div @mouseover="dowmloadover(index)" @mouseleave="downloadleave(index)"
                                  v-if="item.status.includes('published')">
                                  <nuxt-link :target="istarget" :to="'/list/' + item.id">
                                    <a class="macwk-app border white cursor-pointer padding-xl">

                                      <div      class="soft-card">
                                        <div      class="li-card-img-div">
                                          <img      :src="item.thumb"
                                            class="budongImg img72 dingweiImg" />
                                          <transition name="fade">
                                            <img      v-if="isAcitive === index" :src="item.thumb"
                                              class="gaosiImg img72 dingweiImg" />
                                          </transition>
                                        </div>
                                        <div      class="size-12 text-B6BABF margin-top-90"
                                          style="min-height: 20px;">
                                          <span     >{{ item.subhead }}</span>
                                        </div>
                                        <div     
                                          class="margin-top size-18 text-bold  text-block card-hover-red">
                                          <span     >{{ item.title }} </span>
                                        </div>
                                        <div      class="margin-top1 size-14 text-B6BABF limitText">
                                          <span     >{{ item.intro }}</span>
                                        </div>
                                        <div      class="margin-top2 text-B6BABF flex-row size-12"
                                          style=" bottom: 20px; width: 100%;">
                                          <div     >
                                            <i      class="el-icon-view"></i>
                                            <span     >{{ item.hits }}</span>
                                          </div>
                                          <div      style="margin-left: 6px;" class="margin-left">
                                            <i      class="el-icon-user"></i>
                                            <span     >{{ item.author }}</span>
                                          </div>
                                          <div      style="position: absolute; right: 35px;">
                                            <span v-if="item.createTime != null"> {{ formatDate(item.createTime)
                                            }}</span>
                                            <span v-else> {{ formatDate(item.addTime) }}</span>
                                          </div>
                                        </div>
                                      </div>

                                    </a>

                                  </nuxt-link>
                                </div>
                              </div>

                            </div>
                          </template>
                      </div>
                    </div>
                    <!---->
                         <el-pagination
                     class="app-content-bottom"
                         @size-change="handleSizeChange" 
                           @current-change="handleCurrentChange" 
                          :current-page.sync="listQuery.page"
                          :page-size="listQuery.limit"
                           layout="prev, pager, next"
                          :total="total"
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
         <foot/>
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
import { getResourceClasslist } from '@/api/webresourceclass'

import { getAllResource, getAllResourceNumber } from '@/api/webresource'
import { getSetting } from '@/api/websetting'

import { formatDate, GetWeekdate } from '@/utils/date.js'

// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default ({
  name: 'List',
  components: {  
    top: () => import("./components/Top.vue"),
    foot: () => import("./components/Foots.vue"),
     },
  data() {
    return {
      setting: "",
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
      const date = new Date(time);
      const currentYear = new Date().getFullYear();
      const year = date.getFullYear();

      if (currentYear - year === 1) {
        return '去年 ' + date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
      } else if (currentYear - year === 2) {
        return '前年 ' + date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
      } else if (currentYear - year > 2) {
        return '多年前';
      } else {
        return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
      }
    },
    async getSetting() {

    let res1 = await getSetting();
    if (res1) {
      this.setting = res1.data
    }
    },
         // 分页
         // 每页显示的条数
        handleSizeChange(val) {
            // 改变每页显示的条数 
            this.listQuery.limit=val
            // 点击每页显示的条数时，显示第一页
            this.getData(val,1)
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.currentPage=1  
        },
          // 显示第几页
        handleCurrentChange(val) {
            // 改变默认的页数
            this.listQuery.page=val
            // 切换页码时，要获取每页显示的条数
            this.getList()
        },
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
    async getNumber() {
      let res = await  getAllResourceNumber();
      if (res) {
      this.ResourceNumber = res.data
      }
    },
    async getList() {
      this.allIndex = true
      this.clickIndex = false
      let res1 = await getAllResource(this.listQuery);
       if (res1) {
        console.log(res1)
        //获取文章
        this.list = res1.data.data
        this.template = res1.data.data
        this.total = res1.data.total
      }
       let res2 = await getResourceClasslist();
      if (res2) {
        //获取分类
        this.classlist = res2.data
      }
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
  },
  mounted() {
    // 判断是否在服务端
    if (process.client) {
      // this.lazyLoad();
      // 在浏览器端调接口，需要服务端做反向代理
        this.getList()
        this.getNumber()
    }
    // 顶部广告
    // (window.slotbydup = window.slotbydup || []).push({
    //   id: "u6324930",
    //   container: "_utrtw8kq5so",
    //   async: true,
    // });
  },
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
 
  :deep(.delay-3) {
    .el-image__inner {
      border-radius: 8px 8px 0px 0px;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 定义过渡效果 */
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在 Vue.js 2.1.8+ 中自动应用 */ {
  opacity: 0;
  visibility: hidden; /* 在过渡开始时隐藏元素 */
}

.gaosiImg {
  /* filter: blur(20px) opacity(70%) brightness(110%); */
  filter: blur(20px) opacity(0.7) brightness(110%);
  transition: filter 0.3s ease; /* 调整过渡时间和效果 */
  /* transition: .22s; */
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

:deep(.home)  {
  display: flex;
  flex-wrap: wrap;
}
:deep(.el-skeleton)  {
  display: flex;
  flex-wrap: wrap;
}
</style>