<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { formatDate } from '../utils/date.js'
import { useContentStore } from '../../stores/HomeResContent';
import { useResourceStore } from '../../stores/HomePostContent.js';

import { getNewResource } from '../../api/webresource';
import { getNewArticle } from '../../api/webarticle';
import { storeToRefs } from 'pinia';

// Props
const props = defineProps({
  dataHeight: {
    type: String,
    default: '450px'
  }
});

// Reactive state with types
const FourKingKong = ref<any>(""); // Could define a more specific type for the API response
const isAcitive = ref<number | null>(null);
const rlist = ref<any[]>([]); // Define proper types for API response (if possible)
const acticve = ref<string>("nav-link active");
const Carousel = ref<any>({}); // Define proper types for API response (if possible)
const list = ref<any | null>(null); // `any` or a specific type depending on the API response
const leftArr = ref<any[]>([]);
const rightArr = ref<any[]>([]);
const setting = ref<any>({});

const contentStore = useContentStore();
const { activeTab, contentList } = storeToRefs(contentStore);

const resourceStore = useResourceStore();

// 监听 `activeTab` 变化，自动获取数据
watchEffect(() => {
  if (!resourceStore.rlist[resourceStore.activeTab] || resourceStore.rlist[resourceStore.activeTab].length === 0) {
    resourceStore.fetchResources(resourceStore.activeTab);
  }
});

// 监听 activeTab 变化，并自动请求数据
watchEffect(() => {
  if (!rlist.value[activeTab.value] || rlist.value[activeTab.value].length === 0) {
    handlegetNewResource(activeTab.value);
  }
});

// 鼠标移入赋值index 
async function dowmloadover(index: number) {
  isAcitive.value = index;
}
// 鼠标移出 
async function downloadleave() {
  isAcitive.value = null;
}

await handlegetNewResource(activeTab.value); // 传入 activeTab 的值

// 获取不同类别的数据
async function handlegetNewResource(tab: string) {
  try {
    const result = await getNewResource(10, tab);
    rlist.value[tab] = result;
  } catch (error) {
    console.error(`获取 ${tab} 数据出错:`, error);
  }
}


// Get the settings
import { getCarousel, getFourKingKong } from '../../api/websetting';

await handlegetCarousel();

async function handlegetCarousel() {
  try {
    const result = await getCarousel("");
    Carousel.value = result;
  } catch (error) {
    console.error('获取Carousel出错:', error);
  }
};

await handlegetFourKingKong();

async function handlegetFourKingKong() {
  try {
    const result = await getFourKingKong("");
    FourKingKong.value = result
  } catch (error) {
    console.error('获取FourKingKong出错:', error);
  }
};

import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();
setting.value = settingStore.settings

// Mounted lifecycle hook
onMounted(() => {
  // getList()
});

// Utility function to add background styles
// const addBackgroundStyles = (items: any[]): any[] => {
//   const backgroundColors = [
//     "linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)",
//     "linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)",
//     "linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)",
//     "linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%)",
//     "linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)",
//     "linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%)",
//     "linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%)",
//     "linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)"
//   ];
//   return items.map(item => {
//     if (!item.thumb) {
//       const index = Math.floor(Math.random() * backgroundColors.length);
//       item.backgroundStyle = `background-image: ${backgroundColors[index]};`;
//     }
//     return item;
//   });
// };
// async function getList() {
//   leftArr.value = list.value.filter((_item: any, index: number) => index % 2 === 0);
//   rightArr.value = list.value.filter((_item: any, index: number) => index % 2 !== 0);
//   leftArr.value = addBackgroundStyles(leftArr.value);
//   rightArr.value = addBackgroundStyles(rightArr.value);
// };
</script>

<template>
  <div class="home">
    <div id="__nuxt">
      <div id="__layout">
        <div data-fetch-key="0" class="app macwk-animation">
          <top :message1="acticve" />
          <div>
            <section class="layout-index pc-model mt-5">
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
                  <div v-for="item, index in FourKingKong" :key="item.id" class="col-3">
                    <router-link :to="'/' + item.featureSrc" class="allad" target="_blank">

                      <div class="
                          macwk-card
                          hover-shadow-6
                          py-3
                          text-center
                        " :style="{
                          backgroundImage: `linear-gradient(45deg, ${item.colorLeft}, ${item.colorRight})`,
                          willChange: 'transform',
                          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
                        }">
                        <!---->
                        <div class="
                            macwk-card__collapsible-content
                            vs-con-loading__container
                          ">
                          <div class="macwk-card__body">
                            <h6 class="mb-0 text-white">
                              <i class="icon-office fs-22 mr-3 v-m-3"></i>
                              <span>{{ item.featureTitle }}</span>
                            </h6>
                          </div>
                          <!---->
                        </div>
                      </div>
                    </router-link>
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
                   <!-- 选项卡 -->
                   <nav class="nav nav-title flex-grow-1">
                    <button 
                      v-for="tab in ['new', 'hot', 'recommend', 'comments']" 
                      :key="tab" 
                      :class="{ active: activeTab === tab }"
                      @click="contentStore.setActiveTab(tab)"
                    >
                      {{ tab === 'new' ? '新鲜发布' : tab === 'hot' ? '热门下载' : tab === 'recommend' ? '站长推荐' : '最多评论' }}
                    </button>
                  </nav>
                  
                  <div class="more-action">
                    <nuxt-link to="/alllist" class="btn btn-more active">

                      更多资源 <i class="icon-arrow-right fw-600 fs-12 v-2"></i></nuxt-link>
                  </div>
                </div>
                <div id="listAppContainer" class="app-content-body listAppContainer">

                  <div class="mw-row">
                    <div v-for="item, index in rlist[activeTab] || []" :key="item?.id || index" class="mw-col list-animation-leftIn delay-3">
                      <nuxt-link v-if="item && item.id" :to="'/List/' + item.id">
                        <div v-if="!setting.imageFormat">
                          <div>
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
                                    {{ formatDate(item.createTime) }}</span>
                                  <span v-else class="meta-item"> {{ formatDate(item.addTime) }}</span>

                                </div>
                                <h3 class="heading-tertiary-list">{{ item.title }}</h3>
                              </div>
                              <div class="extend">
                                <div class="button">
                                  <div style="margin-left:12px">
                                    <span style="font-size: 36px;line-height: 1;">

                                      <i class="light-icon-more icon-next-arrow"></i>
                                    </span>
                                  </div>

                                  <div style="margin-right:12px">
                                    <span class="value">￥{{ item.price }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <div @mouseover="dowmloadover(index)" @mouseleave="downloadleave()">
                            <div class="macwk-app border white cursor-pointer padding-xl">
                              <div class="soft-card">
                                <div class="li-card-img-div">
                                  <img :src="item.thumb" class="budongImg img72 dingweiImg" />
                                  <transition name="fade">
                                    <img v-show="isAcitive == index" :src="item.thumb"
                                      class="gaosiImg img72 dingweiImg" />
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
                                <div class="margin-top2 text-B6BABF flex-row size-12"
                                  style="display: flex; flex-wrap: wrap; justify-content: space-between; width: 100%;">
                                  <div style="margin-left: 0px; display: flex; align-items: center;">
                                    <img class="view-icon--right" src="../static/image/con-view.svg" />
                                    <span>{{ item.hits || 0 }}</span>
                                  </div>
                                  <div style="margin: auto; display: flex; align-items: center;">
                                    <span>{{ item.author }}</span>
                                  </div>
                                  <div style="position: relative; right: 0px; display: flex; align-items: center;">
                                    <span v-if="item.createTime != null">{{ formatDate(item.createTime) }}</span>
                                    <span v-else>{{ formatDate(item.addTime) }}</span>
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
                   <!-- 选项卡 -->
    <nav class="nav nav-title flex-grow-1">
      <a
        v-for="tab in ['new', 'recommend', 'comment']"
        :key="tab"
        class="nav-link"
        :class="{ active: resourceStore.activeTab === tab }"
        @click="resourceStore.activeTab = tab"
      >
        {{ tab === 'new' ? '新鲜发布' : tab === 'recommend' ? '站长推荐' : '最多评论' }}
      </a>
    </nav>
                    <div class="more-action">

                      <nuxt-link to="/allpost" class="btn btn-more active">

                        更多文章 <i class="icon-arrow-right fw-600 fs-12 v-2"></i></nuxt-link>

                    </div>
                  </div>
                  <div class="row gap-a">
                  
  <div class="com-md-12 col-lg-6">
    <nuxt-link
      :to="'/post/' + item.id"
      v-for="(item, index) in resourceStore.rlist[resourceStore.activeTab]"
      :key="item.id"
      v-show="index % 2 === 0"
      class="feature-block-three border white dk hover-shadow-6 delay-0 list-animation-leftIn"
    >
      <div class="d-flex align-items-center">
        <div class="icon-box icon-one">
          <el-image v-if="item.thumb" class="delayImg" :src="item.thumb" lazy>
            <div slot="placeholder" class="image-slot">
              <img style="width:100%; height:100%; object-fit:cover;" src="../static/image/loding.gif" />
            </div>
          </el-image>
          <div v-else class="delayImg" :style="item.backgroundStyle">
            <h3 class="flex text-center text-white opacity-50">NOPIC</h3>
          </div>
        </div>
        <div class="text">
          <h5 class="ellipsis-text">
            {{ item.title }}
          </h5>
          <div class="text-muted fs-16 mr-3">
            <span v-if="item.createTime">{{ item.createTime }}</span>
            <span v-else>{{ item.addTime }}</span>
          </div>
        </div>
        <div class="read-more d-flex justify-content-end w-80 pr-3">
          <i class="light-icon-more icon-next-arrow"></i>
        </div>
      </div>
    </nuxt-link>
  </div>

  <div class="com-md-12 col-lg-6">
    <nuxt-link
      :to="'/post/' + item.id"
      v-for="(item, index) in resourceStore.rlist[resourceStore.activeTab]"
      :key="item.id"
      v-show="index % 2 !== 0"
      class="feature-block-three border white dk hover-shadow-6 delay-5 list-animation-leftIn"
    >
      <div class="d-flex align-items-center">
        <div class="icon-box icon-one">
          <el-image v-if="item.thumb" class="delayImg" :src="item.thumb" lazy>
            <div slot="placeholder" class="image-slot">
              <img style="width:100%; height:100%; object-fit:cover;" src="../static/image/loding.gif" />
            </div>
          </el-image>
          <div v-else class="delayImg" :style="item.backgroundStyle">
            <h3 class="flex text-center text-white opacity-50">NOPIC</h3>
          </div>
        </div>
        <div class="text">
          <h5 class="ellipsis-text">
            {{ item.title }}
          </h5>
          <div class="text-muted fs-16 mr-3">
            <span v-if="item.createTime">{{ item.createTime }}</span>
            <span v-else>{{ item.addTime }}</span>
          </div>
        </div>
        <div class="read-more d-flex justify-content-end w-80 pr-3">
          <i class="light-icon-more icon-next-arrow"></i>
        </div>
      </div>
    </nuxt-link>
  </div>
                  </div>
                </div>
              </div>
            </section>
            <mobile />
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
<style scoped>
.gaosiImg {
  animation-delay: 50ms;
  animation-fill-mode: backwards !important;
  /* filter: blur(20px) opacity(70%) brightness(110%); */
  filter: blur(20px) opacity(0.7) brightness(110%);
  /* transition: filter 0.22s ease; 调整过渡时间和效果 */
  transition: all 90ms;
  /* transition: .22s; */
  z-index: 20;
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

.view-icon--right {
  margin-right: 5px;
  width: 20px;
  height: 20px;
  transform: rotate(180deg);
}
.active {
  color: #3E9EFF;
}
</style>
