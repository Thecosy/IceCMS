<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
           <top :message4="acticve" />
          <div>
            <div
              class="
                layout-min-full-height
                special-standard
                our-special
                py-7
                pc-model
              "
            >
              <div class="container">
                <div class="row">
                  <div v-for="item in classlist" :key="item.id" class="col-3 delay-0 list-animation-leftIn">
                      <router-link :target="istarget" :to="'/classdetal/' + item.id">
                    <a  class="cursor-pointer"
                      ><div class="single-special-member">
                        <div class="wrapper">
                          <div class="img-box">
                       

                            <el-image :src="item.imgclass" lazy>
                                <div slot="placeholder" class="image-slot">
                               <img  style="width:100%; height:100%; object-fit:cover;"  src="../static/image/loding.gif" />
                                </div>
                            </el-image>
                            </div>
                          <div class="info-meta">
                            <h6 class="name">
                              {{item.name}}
                              <span class="ml-2 text-muted fs-16"> (4款) </span>
                            </h6>
                          </div>
                        </div>
                        <div class="hover-content">
                          <p>
                            <span><i class="icon-weibo"></i></span>
                            <span><i class="icon-qq"></i></span>
                          </p>
                        </div></div
                    ></a>
                     </router-link >
                  </div>
                </div>
                <div class="clearfix pt-8"></div>
              </div>
            </div>
            <div class="mobile-model">
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
          <div class="macwk-footer white border-top pc-model" data-v-ea53b530>
            <div class="container" data-v-ea53b530>
              <a href="/" class="logo" data-v-ea53b530
                ><svg
                  id="macwk-svg-logo"
                  width="32"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                  data-v-6dd0b122
                  data-v-ea53b530
                >
                  <title data-v-6dd0b122>MacWK</title>
                  <defs data-v-6dd0b122>
                    <linearGradient
                      x1="50%"
                      y1="0%"
                      x2="50%"
                      y2="100%"
                      id="a"
                      data-v-6dd0b122
                    >
                      <stop
                        offset="0%"
                        class="stop-color-circle"
                        data-v-6dd0b122
                      ></stop>
                      <stop
                        offset="100%"
                        class="stop-color-circle"
                        data-v-6dd0b122
                      ></stop>
                    </linearGradient>
                    <linearGradient
                      x1="100%"
                      y1="86.198%"
                      x2="-14.813%"
                      y2="-4.357%"
                      id="b"
                      data-v-6dd0b122
                    >
                      <stop
                        offset="0%"
                        class="stop-color-default"
                        data-v-6dd0b122
                      ></stop>
                      <stop
                        offset="40.927%"
                        class="stop-color-default"
                        data-v-6dd0b122
                      ></stop>
                      <stop
                        offset="100%"
                        class="stop-color-default"
                        data-v-6dd0b122
                      ></stop>
                    </linearGradient>
                    <linearGradient
                      x1="86.515%"
                      y1="24.533%"
                      x2="0%"
                      y2="24.533%"
                      id="c"
                      data-v-6dd0b122
                    >
                      <stop
                        stop-opacity="0"
                        offset="0%"
                        class="stop-color-default"
                        data-v-6dd0b122
                      ></stop>
                      <stop
                        offset="100%"
                        class="stop-color-default-linearGradient"
                        data-v-6dd0b122
                      ></stop>
                    </linearGradient>
                  </defs>
                  <g fill="none" fill-rule="evenodd" data-v-6dd0b122>
                    <path
                      d="M29.952 16c0-1.933-1.562-3.5-3.488-3.5a3.494 3.494 0 0 0-3.488 3.5c0 1.933 1.561 3.5 3.488 3.5a3.494 3.494 0 0 0 3.488-3.5"
                      fill="url(#a)"
                      data-v-6dd0b122
                    ></path>
                    <path
                      d="M25.865 25.9a13.932 13.932 0 0 1-6.377 3.66c-1.115.286-2.284.44-3.488.44a13.893 13.893 0 0 1-10.512-4.797A13.968 13.968 0 0 1 2.048 16c0-3.523 1.298-6.742 3.44-9.203A13.893 13.893 0 0 1 16 2c1.204 0 2.373.154 3.488.44a13.932 13.932 0 0 1 6.377 3.66l-4.933 4.95A6.942 6.942 0 0 0 16 9c-3.852 0-6.976 3.134-6.976 7l.002.18C9.122 19.964 12.208 23 16 23c1.926 0 3.67-.784 4.932-2.05l4.933 4.95z"
                      fill="url(#b)"
                      data-v-6dd0b122
                    ></path>
                    <path
                      d="M20.932 11.05A6.942 6.942 0 0 0 16 9c-3.852 0-6.976 3.134-6.976 7a13.98 13.98 0 0 1 4.087-9.9 13.932 13.932 0 0 1 6.377-3.66l1.444 8.61z"
                      fill="url(#c)"
                      data-v-6dd0b122
                    ></path>
                  </g>
                </svg>
                <span class="ml-4" data-v-ea53b530>MacWk</span></a
              >
              <div class="nav" data-v-ea53b530>
                <a href="/" class="nav-link" data-v-ea53b530>首页</a>
                <a href="/about" class="nav-link" data-v-ea53b530>关于 </a
                ><a href="/contact" class="nav-link" data-v-ea53b530>联系 </a
                ><a href="/privacy" class="nav-link" data-v-ea53b530>隐私 </a
                ><a href="/version" class="nav-link" data-v-ea53b530
                  >版本检测 </a
                ><a href="/changelogs" class="nav-link" data-v-ea53b530
                  >更新日志
                </a>
              </div>
              <div class="copyright" data-v-ea53b530>
                <p class="mb-0" data-v-ea53b530>
                  <span class="mr-3" data-v-ea53b530
                    ><a
                      href="https://beian.miit.gov.cn/"
                      target="_blank"
                      data-v-ea53b530
                      >鲁ICP备19036164号</a
                    ></span
                  >
                  <span data-v-ea53b530
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
import { getNewArticle } from '@/api/webarticle'
import { formatDate } from '@/utils/date.js'
import { getCarousel } from '@/api/setting'
import { getResourceClasslist } from '@/api/webresourceclass'

import top from './components/Top.vue'
import foot from './components/Foots.vue'

export default ({
  name: 'Home',
  components: {top, foot},
  created() {
    this.getList()
    
  },
   methods: {
      getList() {
      
      getResourceClasslist().then(resp => {
        //获取分类
        this.classlist = resp.data

      })
    },
   },
  data() {
    return {
      classlist:"",
      acticve:'nav-link active',
    }
  },
  
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
}
</style>


<style>
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