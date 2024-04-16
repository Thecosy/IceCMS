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
                      <nuxt-link :to="'/classdetal/' + item.id">
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
                              <span class="ml-2 text-muted fs-16"> ({{ item.num }}) </span>
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
                     </nuxt-link >
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
import { getNewArticle } from '@/api/webarticle'
import { formatDate } from '@/utils/date.js'
import { getCarousel } from '@/api/setting'
import { getResourceClasslist } from '@/api/webresourceclass'
export default ({
  name: 'Home',
  components: {
    top: () => import("./components/Top.vue"),
    foot: () => import("./components/Foots.vue"),
  },
  created() {
    this.getList()
    
  },
   methods: {
      getList() {
      
      getResourceClasslist().then(resp => {
        //获取分类
        console.log(resp)
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