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
                <el-carousel
                  indicator-position="outside"
                  class="index1 banner-index mb-6 Thecarousel"
                  :height="dataHeight"
                  :interval="3000"
                  arrow="always"
                >
                  <el-carousel-item
                    style=""
                    v-for="(item, id) in Carousel"
                    :key="id"
                  >
                    <div>
                      <div
                        data-v-bffc9160=""
                        class="index-banner el-carousel el-carousel--horizontal"
                      >
                        <div
                          class="el-carousel__container"
                          style="height: 450px"
                        >
                          <i class="el-icon-arrow-right"></i>

                          <div
                            data-v-bffc9160=""
                            class="el-carousel__item is-active is-animating"
                            style="transform: translateX(0px) scale(1)"
                          >
                            <div
                              data-v-bffc9160=""
                              class="
                                index
                                section
                                white1
                                h-450
                                position-relative
                                radius-4x
                                d-flex
                                align-items-center
                              "
                            >
                              <div data-v-bffc9160="" class="bg-shape-holder">
                                <img
                                  data-v-bffc9160=""
                                  src="../static/image/shape-1.svg"
                                  class="shape-three"
                                />
                                <img
                                  data-v-bffc9160=""
                                  src="../static/image/shape-55.svg"
                                  class="shape-four"
                                />
                                <img
                                  data-v-bffc9160=""
                                  src="../static/image/shape-56.svg"
                                  class="shape-five"
                                />
                                <img
                                  data-v-bffc9160=""
                                  src="../static/image/shape-57.svg"
                                  class="shape-six"
                                />
                                <img
                                  data-v-bffc9160=""
                                  src="../static/image/shape-58.svg"
                                  class="shape-seven"
                                />
                                <img
                                  data-v-bffc9160=""
                                  src="../static/image/shape-59.svg"
                                  class="shape-eight"
                                />
                                <img
                                  data-v-bffc9160=""
                                  src="../static/image/shape-60.svg"
                                  class="shape-nine"
                                />
                                <img
                                  data-v-bffc9160=""
                                  src="../static/image/shape-61.svg"
                                  class="shape-ten"
                                />
                                <img
                                  data-v-bffc9160=""
                                  src="../static/image/shape-62.svg"
                                  class="shape-eleven"
                                />
                                <img
                                  data-v-bffc9160=""
                                  src="../static/image/shape-10.svg"
                                  class="shape-10"
                                />
                                <img
                                  data-v-bffc9160=""
                                  src="../static/image/shape-11.svg"
                                  class="shape-11"
                                />
                                <span
                                  data-v-bffc9160=""
                                  class="big-round-one"
                                ></span>
                                <span
                                  data-v-bffc9160=""
                                  class="big-round-two"
                                ></span>
                                <span
                                  data-v-bffc9160=""
                                  class="big-round-three"
                                ></span>
                              </div>
                              <div
                                data-v-bffc9160=""
                                class="
                                  w-600
                                  pl-10
                                  position-relative
                                  z-index-9999
                                "
                              >
                                <h2 data-v-bffc9160="">{{ item.title }}</h2>
                                <p data-v-bffc9160="" class="text-muted fs-18">
                                  {{ item.introduce }}
                                </p>
                                <a
                                  data-v-bffc9160=""
                                  
                                  class="btn btn-theme btn-round px-6"
                                >
                                  {{ item.button }}</a
                                >
                              </div>
                              <div
                                data-v-bffc9160=""
                                class="index-banner-image-two"
                              >
                                <img data-v-bffc9160="" :src="item.img" />
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
                <div data-v-0a1f67c4="" class="index-special row mb-6">
                  <div data-v-0a1f67c4="" class="col-3">
                    <a
                      data-v-0a1f67c4=""
                     
                      class=""
                    >
                      <div
                        data-v-0a1f67c4=""
                        class="
                          macwk-card
                          bg-gradient-green
                          hover-shadow-6
                          py-3
                          text-center
                        "
                        style="
                          will-change: transform;
                          transform: perspective(1000px) rotateX(0deg)
                            rotateY(0deg) scale3d(1, 1, 1);
                        "
                      >
                        <!---->
                        <div
                          class="
                            macwk-card__collapsible-content
                            vs-con-loading__container
                          "
                        >
                          <div class="macwk-card__body">
                            <h6 data-v-0a1f67c4="" class="mb-0 text-white">
                              <i
                                data-v-0a1f67c4=""
                                class="icon-office fs-22 mr-3 v-m-3"
                              ></i>
                              <span data-v-0a1f67c4="">新人必备</span>
                            </h6>
                          </div>
                          <!---->
                        </div>
                      </div>
                    </a>
                  </div>
                  <div data-v-0a1f67c4="" class="col-3">
                    <a
                      data-v-0a1f67c4=""
                     
                      class=""
                    >
                      <div
                        data-v-0a1f67c4=""
                        class="
                          macwk-card
                          bg-gradient-orange
                          hover-shadow-6
                          py-3
                          text-center
                        "
                      >
                        <!---->
                        <div
                          class="
                            macwk-card__collapsible-content
                            vs-con-loading__container
                          "
                        >
                          <div class="macwk-card__body">
                            <h6 data-v-0a1f67c4="" class="mb-0 text-white">
                              <i
                                data-v-0a1f67c4=""
                                class="icon-gallery fs-22 mr-3 v-m-3"
                              ></i>
                              <span data-v-0a1f67c4="">图像处理工具</span>
                            </h6>
                          </div>
                          <!---->
                        </div>
                      </div>
                    </a>
                  </div>
                  <div data-v-0a1f67c4="" class="col-3">
                    <a
                      data-v-0a1f67c4=""
                   
                      class=""
                    >
                      <div
                        data-v-0a1f67c4=""
                        class="
                          macwk-card
                          bg-gradient-blue
                          hover-shadow-6
                          py-3
                          text-center
                        "
                      >
                        <!---->
                        <div
                          class="
                            macwk-card__collapsible-content
                            vs-con-loading__container
                          "
                        >
                          <div class="macwk-card__body">
                            <h6 data-v-0a1f67c4="" class="mb-0 text-white">
                              <i
                                data-v-0a1f67c4=""
                                class="icon-cp fs-22 mr-3 v-m-3"
                              ></i>
                              <span data-v-0a1f67c4="">产品经理工具</span>
                            </h6>
                          </div>
                          <!---->
                        </div>
                      </div>
                    </a>
                  </div>
                  <div data-v-0a1f67c4="" class="col-3">
                    <a
                      data-v-0a1f67c4=""
                      
                      class=""
                    >
                      <div
                        data-v-0a1f67c4=""
                        class="
                          macwk-card
                          bg-gradient-purple
                          hover-shadow-6
                          py-3
                          text-center
                        "
                      >
                        <!---->
                        <div
                          class="
                            macwk-card__collapsible-content
                            vs-con-loading__container
                          "
                        >
                        <router-link to="/class">
                          <div class="macwk-card__body">
                            <h6 data-v-0a1f67c4="" class="mb-0 text-white">
                              <i
                                data-v-0a1f67c4=""
                                class="icon-code fs-22 mr-3 v-m-3"
                              ></i>
                              <span data-v-0a1f67c4="">更多专题</span>
                            </h6>
                          </div>
                          </router-link>
                          <!---->
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="container mb-5">
                <div class="d-flex app-content-header mb-6">
                  <div class="main-title">
                    <h4 class="i-con-h-a mb-0">
                      <i class="mr-1 text-muted i-con i-con-calendar v-m-4"
                        ><i></i
                      ></i>
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
                    <router-link to="/list">
                    <a
                     
                      class="btn btn-more active"
                    >
                      更多软件 <i class="icon-arrow-right fw-600 fs-12 v-2"></i
                    ></a>
                    </router-link>
                  </div>
                </div>
                <div
                  class="soft-index lazy-transition w-r"
                  style="margin-left: -10px; margin-right: -10px"
                >
                  <div
                    v-for="item in rlist" :key="item.id"
                    class="list-animation-leftIn w-c w-c-4 delay-0"
                    style="
                      padding-left: 10px;
                      padding-right: 10px;
                      padding-bottom: 20px;
                    "
                  >
                   <div v-if="item.status.includes('published')" >
                            <router-link  :to="'/list/' + item.id">
                    <a
                     
                      target="_self"
                      class="macwk-app border white cursor-pointer mb-0"
                    >
                      <div class="macwk-app__header--icon">
                        <div
                          class="macwk-app__header--icon--content"
                          
                        ></div>
                       
                          <el-image v-if="item.thumb != null" class="listtitleimg delay-3"  :src="item.thumb" lazy>
                                <div slot="placeholder" class="image-slot">
                                  
                               <img  style="width:100%; height:100%; object-fit:cover;"  src="../static/image/loding.gif" />
                                </div>
                            </el-image>
                           
                               <div
                                  v-else
                                  class="delayImgs"
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
                       
                      </div>
                      <div class="macwk-app__body h-150">
                        <h5
                          class="macwk-app__body--title"
                          style="
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            word-break: break-all;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 1;
                          "
                        >
                          <!---->
                          <!---->
                          <span>{{item.title}}</span>
                        </h5>
                        <p
                          class="macwk-app__body--info"
                          style="
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            word-break: break-all;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 1;
                          "
                        >
                          <!---->
                          <!---->
                          <!---->
                          <span>{{item.intro}}</span>
                          <!---->
                        </p>
                      </div>
                      <!---->
                      <div class="macwk-app__footer macwk-app__footer--margin">
                        <div class="macwk-app__footer--more">
                          <i class="light-icon-more icon-next-arrow"></i>
                        </div>
                      </div>
                    </a>
                      </router-link>
                        </div>
                  </div>
                 
                 
                </div>
              </div>
              <div class="white dk py-7">
                <div class="container">
                  <div class="d-flex app-content-header mb-6">
                    <div class="main-title">
                      <h4 class="i-con-h-a mb-0">
                        <i class="mr-1 text-muted i-con i-con-layer v-m-4"
                          ><i></i
                        ></i>
                        <span>教程文章</span>
                      </h4>
                    </div>
                    <nav class="nav nav-title flex-grow-1">
                      <a class="nav-link active">新鲜发布</a>
                      <a class="nav-link">站长推荐</a>
                      <a class="nav-link">最多评论</a>
                    </nav>
                    <div class="more-action">
                      <router-link
                        target="_self"
                        class="nav-link"
                        data-v-122eae44=""
                        to="post/all"
                      >
                        更多文章
                        <i class="icon-arrow-right fw-600 fs-12 v-2"></i
                      ></router-link>
                    </div>
                  </div>
                  <div class="row gap-a">
                    <div class="com-md-12 col-lg-6">
                      <a
                        v-for="(item, id) in this.leftArr"
                        :key="id"
                        
                        class="
                          feature-block-three
                          border
                          white
                          dk
                          hover-shadow-6
                          delay-0
                          list-animation-leftIn
                        "
                      >
                        <div v-if="item.status.includes('published')">
                          <router-link :to="'/post/' + item.id">
                            <div class="d-flex align-items-center">
                              <div class="icon-box icon-one">
                            <el-image  v-if="item.thumb != null"
                                  class="delayImg"  :src="item.thumb" lazy>
                                <div slot="placeholder" class="image-slot">
                               <img  style="width:100%; height:100%; object-fit:cover;"  src="../static/image/loding.gif" />
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
                              </div>
                              <div class="text">
                                <h5
                                  style="
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    word-break: break-all;
                                    text-overflow: ellipsis;
                                    -webkit-line-clamp: 2;
                                  "
                                >
                                  {{ item.title }}
                                </h5>
                                <div class="text-muted fs-16 mr-3">
                                  <span
                                    v-if="item.createTime != null"
                                    v-text="formatDate(item.createTime)"
                                  >
                                  </span>
                                  <span
                                    v-else
                                    v-text="formatDate(item.addTime)"
                                  >
                                  </span>
                                </div>
                              </div>
                              <div
                                class="
                                  read-more
                                  d-flex
                                  justify-content-end
                                  w-80
                                  pr-3
                                "
                              >
                                <i class="light-icon-more icon-next-arrow"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>
                      </a>
                    </div>

                    <div class="com-md-12 col-lg-6">
                      <a
                        v-for="(item, id) in this.rightArr"
                        :key="id"
                       
                        class="
                          feature-block-three
                          border
                          white
                          dk
                          hover-shadow-6
                          delay-5
                          list-animation-leftIn
                        "
                      >
                        <div v-if="item.status.includes('published')">
                          <router-link :to="'/post/' + item.id">
                            <div class="d-flex align-items-center">
                              <div class="icon-box icon-one">
                                 <el-image  v-if="item.thumb != null"
                                  class="delayImg"  :src="item.thumb" lazy>
                                <div slot="placeholder" class="image-slot">
                               <img  style="width:100%; height:100%; object-fit:cover;"  src="../static/image/loding.gif" />
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
                              </div>
                              <div class="text">
                                <h5
                                  style="
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    word-break: break-all;
                                    text-overflow: ellipsis;
                                    -webkit-line-clamp: 2;
                                  "
                                >
                                  {{ item.title }}
                                </h5>
                                <div class="text-muted fs-16 mr-3">
                                  <span
                                    v-if="item.createTime != null"
                                    v-text="formatDate(item.createTime)"
                                  >
                                  </span>
                                  <span
                                    v-else
                                    v-text="formatDate(item.addTime)"
                                  >
                                  </span>
                                </div>
                              </div>
                              <div
                                class="
                                  read-more
                                  d-flex
                                  justify-content-end
                                  w-80
                                  pr-3
                                "
                              >
                                <i class="light-icon-more icon-next-arrow"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div class="mobile-model">
              <div
                class="
                  d-flex
                  layout-min-full-height
                  justify-content-center
                  align-items-center
                "
              >
                <div class="text-center" style="width: 80%; margin: 0px auto">
                  <h1 class="mb-4">哇，窗口太小啦</h1>
                  <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
                </div>
              </div>
            </div>
          </div>
          <foot />
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
import { getNewResource } from '@/api/webresource'
import { getNewArticle } from '@/api/webarticle'
import { formatDate } from '@/utils/date.js'
import { getCarousel } from '@/api/websetting'

import top from './components/Top.vue'
import foot from './components/Foots.vue'

export default ({
  name: 'Home',
  components: {top, foot},
  data() {
    return {
      rlist:"",
      acticve:'nav-link active',
      Carousel: {},
      list: null,
      leftArr: null,
      rightArr: null,
    }
  },
  created() {
    this.getList()
    this.getSetting()
  },
  props: {
    dataHeight: {
      type: String,
      default: '450px'
    }
  },
  methods: {
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
    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd hh:mm ')
    },
    getSetting() {
      getCarousel().then(resp => {
        this.Carousel = resp.data
      })
    },
    getList() {
      this.listLoading = true
      getNewResource(6).then(resp => {
        this.rlist = resp.data
      })
      getNewArticle(6).then(resp => {
        this.list = resp.data
        this.total = resp.data.total
        this.listLoading = false
        //将array进行处理,他的index索引余2===0的就放到一个新数组中leftArr
        this.leftArr = this.list.filter((_item, index) => index % 2 === 0);
        //将array进行处理,他的index索引余2 ！===0的就放到一个新数组中rightArr
        this.rightArr = this.list.filter((_item, index) => index % 2 !== 0);

      })
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../static/mycss/top.css";
@import "../static/mycss/body.css";
</style>
<style scoped>
.delayImg {
  height: 100px;
  width: 145px;
  border-radius: 8px ;
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
  ::v-deep {
    .el-image__inner {
       
     border-radius: 8px ;
    }
  }
}
.delay-3{
  ::v-deep {
    
    .el-image__inner {
     width: 224px;
    height: 128px;
     border-radius: 8px 8px 0px 0px;
    }
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
    height: 150px!important;
}
</style>