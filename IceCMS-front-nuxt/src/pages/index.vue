<template>
  <div class="home">
    <div id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message1="acticve" />
          <div>
            <section class="layout-index pc-model mt-5">
              <!-- class="banner-index mb-6" -->
              <div class="outsection">
                <el-carousel indicator-position="outside" class="index1 banner-index mb-6 Thecarousel"
                  :height="dataHeight" :interval="3000" arrow="always">
                  <el-carousel-item style="" v-for="(item, id) in Carousel" :key="id">
                    <div>
                      <div class="index-banner el-carousel el-carousel--horizontal">
                        <div class="el-carousel__container" style="height: 450px">
                          <i class="el-icon-arrow-right"></i>

                          <div class="el-carousel__item is-active is-animating"
                            style="transform: translateX(0px) scale(1)">
                            <div class="
                                index
                                section
                                white1
                                h-450
                                position-relative
                                radius-4x
                                d-flex
                                align-items-center
                              ">
                              <div class="bg-shape-holder">
                                <img src="../static/image/shape-1.svg" class="shape-three" />
                                <img src="../static/image/shape-55.svg" class="shape-four" />
                                <img src="../static/image/shape-56.svg" class="shape-five" />
                                <img src="../static/image/shape-57.svg" class="shape-six" />
                                <img src="../static/image/shape-58.svg" class="shape-seven" />
                                <img src="../static/image/shape-59.svg" class="shape-eight" />
                                <img src="../static/image/shape-60.svg" class="shape-nine" />
                                <img src="../static/image/shape-61.svg" class="shape-ten" />
                                <img src="../static/image/shape-62.svg" class="shape-eleven" />
                                <img src="../static/image/shape-10.svg" class="shape-10" />
                                <img src="../static/image/shape-11.svg" class="shape-11" />
                                <span class="big-round-one"></span>
                                <span class="big-round-two"></span>
                                <span class="big-round-three"></span>
                              </div>
                              <div class="
                                  w-600
                                  pl-10
                                  position-relative
                                  z-index-9999
                                ">
                                <h2>{{ item.title }}</h2>
                                <p class="text-muted fs-18">
                                  {{ item.introduce }}
                                </p>
                                <a class="btn btn-theme btn-round px-6">
                                  {{ item.button }}</a>
                              </div>
                              <div class="index-banner-image-two">
                                <img :src="item.img" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <!-- class="container" -->
              <div class="container">
                <div class="index-special row mb-6">
                  <div class="col-3">

                    <div class="
                          macwk-card
                          bg-gradient-green
                          hover-shadow-6
                          py-3
                          text-center
                        " style="
                          will-change: transform;
                          transform: perspective(1000px) rotateX(0deg)
                            rotateY(0deg) scale3d(1, 1, 1);
                        ">
                      <!---->
                      <div class="
                            macwk-card__collapsible-content
                            vs-con-loading__container
                          ">
                        <div class="macwk-card__body">
                          <h6 class="mb-0 text-white">
                            <i class="icon-office fs-22 mr-3 v-m-3"></i>
                            <span>新人必备</span>
                          </h6>
                        </div>
                        <!---->
                      </div>
                    </div>

                  </div>
                  <div class="col-3">

                    <div class="
                          macwk-card
                          bg-gradient-orange
                          hover-shadow-6
                          py-3
                          text-center
                        ">
                      <!---->
                      <div class="
                            macwk-card__collapsible-content
                            vs-con-loading__container
                          ">
                        <div class="macwk-card__body">
                          <h6 class="mb-0 text-white">
                            <i class="icon-gallery fs-22 mr-3 v-m-3"></i>
                            <span>图像处理工具</span>
                          </h6>
                        </div>
                        <!---->
                      </div>
                    </div>

                  </div>
                  <div class="col-3">

                    <div class="
                          macwk-card
                          bg-gradient-blue
                          hover-shadow-6
                          py-3
                          text-center
                        ">
                      <!---->
                      <div class="
                            macwk-card__collapsible-content
                            vs-con-loading__container
                          ">
                        <div class="macwk-card__body">
                          <h6 class="mb-0 text-white">
                            <i class="icon-cp fs-22 mr-3 v-m-3"></i>
                            <span>产品经理工具</span>
                          </h6>
                        </div>
                        <!---->
                      </div>
                    </div>

                  </div>
                  <div class="col-3">

                    <div class="
                          macwk-card
                          bg-gradient-purple
                          hover-shadow-6
                          py-3
                          text-center
                        ">
                      <!---->
                      <div class="
                            macwk-card__collapsible-content
                            vs-con-loading__container
                          ">
                        <nuxt-link to="/class">
                          <div class="macwk-card__body">
                            <h6 class="mb-0 text-white">
                              <i class="icon-code fs-22 mr-3 v-m-3"></i>
                              <span>更多专题</span>
                            </h6>
                          </div>
                        </nuxt-link>
                        <!---->
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="container mb-5">
                <div class="d-flex app-content-header mb-6">
                  <div class="main-title">
                    <h4 class="i-con-h-a mb-0">
                      <i class="mr-1 text-muted i-con i-con-calendar v-m-4"><i></i></i>
                      <span>精品资源</span>
                    </h4>
                  </div>
                  <nav class="nav nav-title flex-grow-1">
                    <a class="nav-link active">新鲜发布</a>
                    <a class="nav-link">热门下载</a>
                    <a class="nav-link">站长推荐</a>
                    <a class="nav-link">最多评论</a>
                  </nav>
                  <div class="more-action">
                    <nuxt-link to="/list" class="btn btn-more active">

                      更多软件 <i class="icon-arrow-right fw-600 fs-12 v-2"></i></nuxt-link>

                  </div>
                </div>
                <div id="listAppContainer" class="app-content-body listAppContainer">

                  <div class="mw-row">
                    <div v-for="item, index in rlist" :key="item.id" class="mw-col list-animation-leftIn delay-3">
                      <nuxt-link :to="'/List/' + item.id">

                      <div v-if="!setting.imageFormat">
                        <div v-if="item.status.includes('published')">
                            <div class="macwk-app border white cursor-pointer">
                              <el-image v-show="item.thumb != null" class="listtitleimg delay-3" :src="item.thumb" lazy>
                                <div slot="placeholder" class="image-slot">
                                  <img style="
                                        width: 100%;
                                        height: 100%;object-fit: cover;
                                      " src="../static/image/loding.gif" />
                                </div>
                              </el-image>
                              <div v-show="item.thumb == null" class="delayImgss" :style="item.backgroundStyle">
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
                                    <div class="author-name">{{ item.author }}</div>
                                  </div>
                                  <span v-if="item.createTime != null" class="meta-item">
                                    {{ rformatDate(item.createTime) }}</span>
                                  <span v-else class="meta-item"> {{ rformatDate(item.addTime) }}</span>

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
                            </div>
                        </div>
                      </div>
                      <div v-else>
                        <div @mouseover="dowmloadover(index)" @mouseleave="downloadleave(index)"
                          v-if="item.status.includes('published')">
                            <div class="macwk-app border white cursor-pointer padding-xl">

                              <div class="soft-card">
                                <div class="li-card-img-div">
                                  <img :src="item.thumb" class="budongImg img72 dingweiImg" />
                                  <transition name="fade">
                                    <img v-show="isAcitive == index" :src="item.thumb" class="gaosiImg img72 dingweiImg" />
                                  </transition>
                                </div>
                                <div class="size-12 text-B6BABF margin-top-90" style="min-height: 20px;">
                                  <span>{{ item.subhead }}</span>
                                </div>
                                <div class="margin-top size-18 text-bold  text-block card-hover-red">
                                  <span>{{ item.title }} </span>
                                </div>
                                <div class="margin-top1 size-14 text-B6BABF limitText">
                                  <span>{{ item.intro }}</span>
                                </div>
                                <div class="margin-top2 text-B6BABF flex-row size-12" style=" bottom: 20px; width: 100%;">
                                  <div>
                                    <i class="el-icon-view"></i>
                                    <span>34.5k</span>
                                  </div>
                                  <div style="margin-left: 6px;" class="margin-left">
                                    <i class="el-icon-download"></i>
                                    <span>1500</span>
                                  </div>
                                  <div style="position: absolute; right: 35px;">
                                    <span v-if="item.createTime != null"> {{ formatDate(item.createTime) }}</span>
                                    <span v-else> {{ formatDate(item.addTime) }}</span>
                                  </div>
                                </div>
                              </div>

                            </div>

                        </div>
                      </div>
                      </nuxt-link>
                    </div>


                  </div>
                </div>
              </div>
              <div class="white dk py-7">
                <div class="container">
                  <div class="d-flex app-content-header mb-6">
                    <div class="main-title">
                      <h4 class="i-con-h-a mb-0">
                        <i class="mr-1 text-muted i-con i-con-layer v-m-4"><i></i></i>
                        <span>教程文章</span>
                      </h4>
                    </div>
                    <nav class="nav nav-title flex-grow-1">
                      <a class="nav-link active">新鲜发布</a>
                      <a class="nav-link">站长推荐</a>
                      <a class="nav-link">最多评论</a>
                    </nav>
                    <div class="more-action">
                      <a target="_self" class="nav-link" href="post/all">
                        更多文章
                        <i class="icon-arrow-right fw-600 fs-12 v-2"></i></a>
                    </div>
                  </div>
                  <div class="row gap-a">
                    <div class="com-md-12 col-lg-6">
                      <a v-for="(item, id) in this.leftArr" :key="id" class="
                          feature-block-three
                          border
                          white
                          dk
                          hover-shadow-6
                          delay-0
                          list-animation-leftIn
                        ">
                        <div v-show="item.status.includes('published')">
                          <nuxt-link :to="'/post/' + item.id">
                            <div class="d-flex align-items-center">
                              <div class="icon-box icon-one">
                                <el-image v-if="item.thumb != null" class="delayImg" :src="item.thumb" lazy>
                                  <div slot="placeholder" class="image-slot">
                                    <img style="width:100%; height:100%; object-fit:cover;"
                                      src="../static/image/loding.gif" />
                                  </div>
                                </el-image>
                                <div v-else class="delayImg" :style="item.backgroundStyle">
                                  <h3 class="
                                      flex
                                      text-center text-white
                                      opacity-50
                                    ">
                                    NOPIC
                                  </h3>
                                </div>
                              </div>
                              <div class="text">
                                <h5 style="
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    word-break: break-all;
                                    text-overflow: ellipsis;
                                    -webkit-line-clamp: 2;
                                  ">
                                  {{ item.title }}
                                </h5>
                                <div class="text-muted fs-16 mr-3">
                                  <span v-show="item.createTime != null" v-text="formatDate(item.createTime)">
                                  </span>
                                  <span v-show="item.createTime = null" v-text="formatDate(item.addTime)">
                                  </span>
                                </div>
                              </div>
                              <div class="
                                  read-more
                                  d-flex
                                  justify-content-end
                                  w-80
                                  pr-3
                                ">
                                <i class="light-icon-more icon-next-arrow"></i>
                              </div>
                            </div>
                          </nuxt-link>
                        </div>
                      </a>
                    </div>

                    <div class="com-md-12 col-lg-6">
                      <a v-for="(item, id) in this.rightArr" :key="id" class="
                          feature-block-three
                          border
                          white
                          dk
                          hover-shadow-6
                          delay-5
                          list-animation-leftIn
                        ">
                        <div v-show="item.status.includes('published')">
                          <nuxt-link :to="'/post/' + item.id">
                            <div class="d-flex align-items-center">
                              <div class="icon-box icon-one">
                                <el-image v-if="item.thumb != null" class="delayImg" :src="item.thumb" lazy>
                                  <div slot="placeholder" class="image-slot">
                                    <img style="width:100%; height:100%; object-fit:cover;"
                                      src="../static/image/loding.gif" />
                                  </div>
                                </el-image>
                                <div v-else class="delayImg" :style="item.backgroundStyle">
                                  <h3 class="
                                      flex
                                      text-center text-white
                                      opacity-50
                                    ">
                                    NOPIC
                                  </h3>
                                </div>
                              </div>
                              <div class="text">
                                <h5 style="
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    word-break: break-all;
                                    text-overflow: ellipsis;
                                    -webkit-line-clamp: 2;
                                  ">
                                  {{ item.title }}
                                </h5>
                                <div class="text-muted fs-16 mr-3">
                                  <span v-show="item.createTime != null" v-text="formatDate(item.createTime)">
                                  </span>
                                  <span v-show="item.createTime = null" v-text="formatDate(item.addTime)">
                                  </span>
                                </div>
                              </div>
                              <div class="
                                  read-more
                                  d-flex
                                  justify-content-end
                                  w-80
                                  pr-3
                                ">
                                <i class="light-icon-more icon-next-arrow"></i>
                              </div>
                            </div>
                          </nuxt-link>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div class="mobile-model">
              <div class="
                  d-flex
                  layout-min-full-height
                  justify-content-center
                  align-items-center
                ">
                <div class="text-center" style="width: 80%; margin: 0px auto">
                  <h1 class="mb-4">哇，窗口太小啦</h1>
                  <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
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
import { getNewResource } from "../asyncApi/webresource";
import { getNewArticle } from '../asyncApi/webarticle'

import { formatDate } from '@/utils/date.js'
import { getCarousel } from '@/api/websetting'

export default ({
  name: 'Home',
  components: {
    top: () => import("./components/Top.vue"),
    foot: () => import("./components/Foots.vue"),
  },
  data() {
    return {
      isAcitive: false,
      r_sortOrder: "new",
      r_news: "new",
      r_download: "download",
      r_discuss: "discuss",
      r_recommend: "recommend",
      a_sortOrder: "new",
      a_news: "new",
      a_download: "download",
      a_discuss: "discuss",
      a_recommend: "recommend",
      rlist: "",
      acticve: "nav-link active",
      Carousel: {},
      list: null,
      leftArr: null,
      rightArr: null,
      setting: {},
    }
  },
  /**
 * 设置标题及页面关键字
 */
  // head() {
  //   return {
  //     title: this.detailData.title + "-javascript技术分享",
  //     meta: [
  //       {
  //         hid: "description",
  //         name: "description",
  //         content: this.detailData.title,
  //       },
  //       {
  //         hid: "keywords",
  //         name: "keywords",
  //         content: this.detailData.keywords || this.detailData.title,
  //       },
  //     ],
  //   };
  // },
  /**
 * 请求接口，可同时请求多个接口，详情在服务端请求，分类跟推荐接口在浏览器调用
 */
  async asyncData({ route }) {
    let [rlist, list] = await Promise.all([
      getNewResource(10, 'new'),
      getNewArticle(6, 'new')
    ]);
    return {
      rlist: rlist,
      list: list,
      page: parseInt(route.params.id || 1),
    };
  },
  props: {
    dataHeight: {
      type: String,
      default: '450px'
    }
  },
  methods: {
    a_changeDiscuss() {
      this.a_sortOrder = "discuss"
      this.listLoading = true;
      getNewArticle(6, this.a_sortOrder).then((resp) => {
        this.list = resp.data;
        this.total = resp.data.total;
        this.listLoading = false;
        //将array进行处理,他的index索引余2===0的就放到一个新数组中leftArr
        this.leftArr = this.list.filter((_item, index) => index % 2 === 0);
        //将array进行处理,他的index索引余2 ！===0的就放到一个新数组中rightArr
        this.rightArr = this.list.filter((_item, index) => index % 2 !== 0);
        this.leftArr = this.addBackgroundStyles(fetchedData);
        this.rightArr = this.addBackgroundStyles(fetchedData);
      });
      this.listLoading = false;
    },
    a_changeRecommend() {
      this.a_sortOrder = "recommend"
      this.listLoading = true;
      getNewArticle(6, this.a_sortOrder).then((resp) => {
        this.list = resp.data;
        this.total = resp.data.total;
        this.listLoading = false;
        //将array进行处理,他的index索引余2===0的就放到一个新数组中leftArr
        this.leftArr = this.list.filter((_item, index) => index % 2 === 0);
        //将array进行处理,他的index索引余2 ！===0的就放到一个新数组中rightArr
        this.rightArr = this.list.filter((_item, index) => index % 2 !== 0);
        this.leftArr = this.addBackgroundStyles(fetchedData);
        this.rightArr = this.addBackgroundStyles(fetchedData);
      });
      this.listLoading = false;
    },
    a_changeNews() {
      this.a_sortOrder = "new"
      this.listLoading = true;
      getNewArticle(6, this.a_sortOrder).then((resp) => {
        this.list = resp.data;
        this.total = resp.data.total;
        this.listLoading = false;
        //将array进行处理,他的index索引余2===0的就放到一个新数组中leftArr
        this.leftArr = this.list.filter((_item, index) => index % 2 === 0);
        //将array进行处理,他的index索引余2 ！===0的就放到一个新数组中rightArr
        this.rightArr = this.list.filter((_item, index) => index % 2 !== 0);
        this.leftArr = this.addBackgroundStyles(fetchedData);
        this.rightArr = this.addBackgroundStyles(fetchedData);
      });
      this.listLoading = false;
    },
    // 鼠标移入赋值index 
    dowmloadover(index) {
      this.isAcitive = index
    },
    // 鼠标移出 
    downloadleave(index) {
      this.isAcitive = false
    },
    r_changeRecommend() {
      this.r_sortOrder = "recommend"
      this.listLoading = true;
      getNewResource(10, this.r_sortOrder).then((resp) => {
        this.rlist = resp.data;
      });
      this.listLoading = false;
    },
    r_changeNews() {
      this.r_sortOrder = "new"
      this.listLoading = true;
      getNewResource(10, this.r_sortOrder).then((resp) => {
        this.rlist = resp.data;
      });
      this.listLoading = false;
    },
    r_changeDiscuss() {
      this.r_sortOrder = "discuss"
      this.listLoading = true;
      getNewResource(10, this.r_sortOrder).then((resp) => {
        this.rlist = resp.data;
      });
      this.listLoading = false;
    },
    r_changeDownload() {
      this.r_sortOrder = "download"
      this.listLoading = true;
      getNewResource(10, this.r_sortOrder).then((resp) => {
        this.rlist = resp.data;
      });
      this.listLoading = false;
    },
    addBackgroundStyles(items) {
      const backgroundColors = [
        "linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);",
        "linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);",
        "linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);",
        "linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);",
        "linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);",
        "linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%);",
        "linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);",
        "linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
      ];
      return items.map(item => {
        if (!item.thumb) {
          const index = Math.floor(Math.random() * backgroundColors.length);
          item.backgroundStyle = `background-image: ${backgroundColors[index]};`;
        }
        return item;
      });
    },
    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd hh:mm ')
    },
    rformatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd ");
    },
    async getSetting() {
        this.setting = this.$cookies.get("setting")
      let res = await getCarousel();
      if (res) {
        this.Carousel = res.data
      }
    },
    async getList() {
      this.listLoading = true
      this.total = this.list.total
      this.listLoading = false
      //将array进行处理,他的index索引余2===0的就放到一个新数组中leftArr
      this.leftArr = this.list.filter((_item, index) => index % 2 === 0);
      //将array进行处理,他的index索引余2 ！===0的就放到一个新数组中rightArr
      this.rightArr = this.list.filter((_item, index) => index % 2 !== 0);
      this.leftArr = this.addBackgroundStyles(this.leftArr);
      this.rightArr = this.addBackgroundStyles(this.rightArr);
    }
  },
  mounted() {    
    // alert(this.comsys.val(1));
    // 判断是否在服务端
    if (process.client) {
      // this.lazyLoad();
      // 在浏览器端调接口，需要服务端做反向代理
      this.getList()
      this.getSetting()
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

<style scoped>
.delayImg {
  height: 100px;
  width: 145px;
  border-radius: 8px;
}

.delayImgss {
  height: 128px;
  width: 100%;
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
 
  :deep(.delayImg) {
    .el-image__inner {
      border-radius: 8px;
    }
  }


 
  :deep(.delayImgss) {
    .el-image__inner {
      border-radius: 8px;
    }
  }


  :deep(.delay-3) {
    .el-image__inner {
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

.backimg {
  background-image: url("../static/image/home/homeimg.png");
}

.search-header {
  position: relative;
  z-index: 1;
  padding: 100px 0;
}

.search-header::after {
  position: absolute;
  left: 0;
  top: 0;
  content: "";
  height: 100%;
  background: rgba(0, 0, 0, 0) linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%) repeat scroll 0 0;
  width: 100%;
  z-index: -1;
}

.containers {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
}

.containers {
  width: 1170px;
  padding: 0;
  // width: 100%;
  //     padding-right: 15px;
  //     padding-left: 15px;
  //     margin-right: auto;
  //     margin-left: auto;
}

.bg-fixed {
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
}

.text-center {
  text-align: center;
}

.index-special {

  margin-top: 35px;
}

.search-header .hero-box h2 {
  font-size: 44px;
  font-weight: 600;
  line-height: 1.3;
  margin-top: -8px;
  margin-bottom: 25px;
  letter-spacing: 0.6px;
}

.text-light h2 {
  color: #ffffff;
}

.col-md-offset-2 {
  margin-left: 16.66666667%;
}

.col-md-8 {
  width: 66.66666667%;
}

.col-md-8 {
  float: left;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

.hero-box ul {
  margin-bottom: -5px;
}

.hero-box ul li {
  color: #ffffff;
  display: inline-block;
  text-transform: capitalize;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.6px;
  margin: 0 7px;
  padding: 0 7px;
  position: relative;
  z-index: 1;
}

// .hero-box ul li::before {
// position: absolute;
// right: -12px;
// top: 12px;
// content: "";
// height: 7px;
// width: 7px;
// background: #ffffff;
// -webkit-border-radius: 50%;
// -moz-border-radius: 50%;
// border-radius: 50%;
// }
.search-box {
  position: relative;
  z-index: 1;
  padding-top: 25px;
  margin-top: 20px;
}

.search-box::after {
  position: absolute;
  left: 0;
  top: 0;
  content: "";
  height: 1px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  z-index: -1;
}

.search-box form {
  position: relative;
  z-index: 1;
  max-width: 70%;
  margin: auto;
}

.search-box form input {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  min-height: 60px;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.search-box form button {
  position: absolute;
  right: 5px;
  top: 5px;
  min-height: 50px;
  min-width: 50px;
  background: #0078ff;
  border: none;
  color: #ffffff;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.fas {
  font-weight: 900;
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

  :deep(.delay-3) {
    .el-image__inner {
      border-radius: 8px 8px 0px 0px;
    }
  }

.app-content-main .app-content-bottom {
  border-radius: 15px;
}

.macwk-app__body {
  padding: 13px 9px 5px;
}
</style>
<style  scoped>
.gaosiImg {
  filter: blur(20px) opacity(70%) brightness(110%);
  transition: .22s;
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
</style>