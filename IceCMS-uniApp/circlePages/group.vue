<template>
  <view class="template-group tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" :backgroundColor="navBarBackgroundColor" id="navbar">
      <view slot="back" class='tn-custom-nav-bar__back' @click="goBack" :style="[navBarStyle]">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-discover-fill'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center" :style="[navBarStyle2]">
        <view class="tn-text-bold tn-text-xl">热血动漫</view>
      </view>
    </tn-nav-bar>
    
    <swiper class="card-swiper" :circular="true"
      :autoplay="true" duration="500" interval="28000" @change="cardSwiper"> 
      <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
        <view class="swiper-item image-banner">
          <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
        </view>
      </swiper-item>
    </swiper>
    <view class="indication">
        <block v-for="(item,index) in swiperList" :key="index">
            <view class="spot" :class="cardCur==index?'active':''"></view>
        </block>
    </view>
    
    <!-- 头部start-->
    <view class="shop-function tn-margin-bottom-xl" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin">
        <view class="justify-content-item">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left">
            <view class="logo-pic tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/content_1.jpeg')">
              <view class="logo-image" >
              </view>
            </view>
            <view class="tn-color-white" style="width: 50vw;">
              <view class="tn-padding-right tn-padding-left-sm tn-text-xl tn-text-bold">
                热血动漫
              </view>
              <view class="tn-padding-right tn-padding-top-xs tn-text-ellipsis tn-padding-left-sm tn-text-sm">
                <text class="tn-padding-right-sm">快到碗里来</text>
                <text>二次元大大的福利圈子</text>
              </view>
            </view>
          </view>
        </view>
        <view class="justify-content-item tn-flex-row-center" @click="showModal">
          <view class="tn-padding-xs tn-color-white tn-round tn-shadow-blur">
            <text class="tn-icon-qr-code tn-padding-xs tn-text-xxl"></text>
          </view>
        </view>
      </view>
    </view>
    <!-- 头部 end-->
    
    <tn-modal v-model="show1" :custom="true">
      <view class="custom-modal-content">
        <image @tap="previewQRCodeImage" src='https://resource.tuniaokj.com/images/advertise/qrcode.jpg' mode='aspectFill' style="width: 100%;"></image>
        <view class="tn-text-center tn-padding-top">欢迎加入【热血动漫】圈子群</view>
        <view class="tn-text-center tn-padding-top tn-text-lg">点击上图，可识别微信二维码</view>
      </view>
    </tn-modal>
    
    <view class="group-wrap tn-bg-white" id="page_tips">
      
      <!-- 悬浮按钮-->
      <view class="tn-flex tn-flex-row-between" style="padding: 60rpx 0 30rpx 0;">
        <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
          <tn-button backgroundColor="#00FFC6" padding="40rpx 0" width="90%" shadow fontBold>
            <text class="tn-icon-add tn-padding-right-xs tn-color-black"></text>
            <text class="tn-color-black">关 注</text>
          </tn-button>
        </view>
        <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
          <tn-button backgroundColor="#FFF00D" padding="40rpx 0" width="90%" shadow fontBold open-type="share">
            <text class="tn-icon-share-triangle tn-padding-right-xs tn-color-black"></text>
            <text class="tn-color-black">分 享</text>
          </tn-button>
        </view>
      </view>
      <!-- <view class="tn-flex tn-flex-row-between tn-padding-top-lg">
        <view class="tn-flex-3 tn-padding tn-margin-left-sm">
          <view class="tn-flex">
            <view class="tn-flex tn-flex-row-center tn-flex-col-center">
              <view class="tn-padding-right tn-text-ellipsis tn-text-left">
                <view class="tn-padding-right tn-color-black tn-text-bold tn-text-xxl">
                  放点东西在这里
                </view>
                <view class="tn-padding-right tn-padding-top tn-text-df">写点什么来着</view>
              </view>
            </view>
          </view>
        </view>
        
        <view class="tn-flex-1 justify-content-item tn-padding tn-text-center">
          <view class="">
            <text class="tn-icon-qr-beibei" style="font-size: 70rpx;"></text>
          </view>
          <view class=" tn-padding-top-xs">
            入 群
          </view>
        </view>
      </view> -->
      
      <view class="">
        <!-- 图文信息 -->
        <block v-for="(item,index) in content" :key="index">
          <view class="blogger__item">
            <view class="blogger__author tn-flex tn-flex-row-between tn-flex-col-center">
              <view class="justify__author__info" @click="tn('/circlePages/blogger_other')">
                <view class="tn-flex tn-flex-row-center">
                  <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                    <view class="">
                      <tn-avatar
                        class=""
                        shape="circle"
                        :src="item.userAvatar"
                        size="lg">
                      </tn-avatar>
                    </view>
                    <view class="tn-padding-right tn-text-ellipsis">
                      <view class="tn-padding-right tn-padding-left-sm tn-text-bold tn-text-lg">{{ item.userName }}</view>
                      <view class="tn-padding-right tn-padding-left-sm tn-padding-top-xs tn-color-gray">{{ item.date }}</view>
                    </view>
                  </view>
                </view>
              </view>
              <view class="blogger__author__btn justify-content-item tn-flex-col-center tn-flex-row-center">
                <!-- 为什么不放关注按钮，因为快餐文化的世界，关注按钮放在外面没必要 -->
                <text class="tn-icon-more-vertical tn-color-gray tn-text-bold tn-text-xxl"></text>
              </view>
            </view>
           
            <view class="blogger__desc tn-margin-top-sm tn-margin-bottom-sm tn-text-justify  tn-flex-col-center tn-flex-row-left" @click="tn('/circlePages/details')">
              <view v-for="(label_item,label_index) in item.label" :key="label_index" class="blogger__desc__label tn-float-left tn-margin-right tn-bg-gray--light tn-round tn-text-sm tn-text-bold">
                <text class="blogger__desc__label--prefix">#</text> 
                <text class="tn-text-df">{{ label_item }}</text>
              </view>
              <!-- 不用限制长度了，因为发布的时候限制长度了-->
              <text v-if="!item.label || item.label.length < 4" class="blogger__desc__content tn-flex-1 tn-text-justify tn-text-df">{{ item.desc }}</text>  
            </view>
            
            <!-- 详情放在里面显示，内容太多疲劳了-->
            <!-- <view
              v-if="item.content"
              class="blogger__content"
              :id="`blogger__content--${index}`"
            >
              <view
                class="blogger__content__data clamp-text-2">
                {{ item.content }}
              </view>
            </view> -->
            
            <block v-if="item.mainImage">
              <view v-if="[1,2,4].indexOf(item.mainImage.length) != -1" class="tn-padding-top-xs" @click="tn('/circlePages/details')">
                <image v-for="(image_item,image_index) in item.mainImage" :key="image_index" 
                  class="blogger__main-image"
                  :class="{
                    'blogger__main-image--1 tn-margin-bottom-sm': item.mainImage.length === 1,
                    'blogger__main-image--2 tn-margin-right-sm tn-margin-bottom-sm': item.mainImage.length === 2 || item.mainImage.length === 4
                  }"
                  :src="image_item"
                  mode="aspectFill"
                ></image>
              </view>
              <view v-else class="tn-padding-top-xs" @click="tn('/circlePages/details')">
                <tn-grid  hoverClass="none" :col="3">
                  <block v-for="(image_item,image_index) in item.mainImage" :key="image_index">
                    <!-- #ifndef MP-WEIXIN -->
                    <tn-grid-item style="width: 30%;margin: 10rpx;">
                      <image
                        class="blogger__main-image blogger__main-image--3"
                        :src="image_item"
                        mode="aspectFill"
                      ></image>
                    </tn-grid-item>
                    <!-- #endif-->
                    <!-- #ifdef MP-WEIXIN -->
                    <tn-grid-item style="width: 30%;margin: 10rpx;">
                      <image
                        class="blogger__main-image blogger__main-image--3"
                        :src="image_item"
                        mode="aspectFill"
                      ></image>
                    </tn-grid-item>
                    <!-- #endif-->
                  </block>
                </tn-grid>
              </view>
            </block>
           
            <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-top-xs">
              <view class="justify-content-item tn-color-gray tn-text-center">
                <view class="">
                  <text class="blogger__count-icon tn-icon-footprint"></text> 
                  <text class="tn-padding-right">{{ item.collectionCount }}</text>
                  <text class="blogger__count-icon tn-icon-message"></text>
                  <text class="tn-padding-right">{{ item.commentCount }}</text>
                  <text class="blogger__count-icon tn-icon-like"></text>
                  <text class="">{{ item.likeCount }}</text>
                </view>
              </view>
              <view class="justify-content-item tn-flex tn-flex-col-center">
                <view style="margin-right: 10rpx;margin-left: 20rpx;">
                  <tn-avatar-group :lists="item.viewUser.latestUserAvatar" size="sm"></tn-avatar-group>
                </view>
                <text class="tn-color-gray">{{ item.viewUser.viewUserCount }}人</text>
              </view>
            </view>
          </view>
          
          <!-- 边距间隔 -->
          <view class="tn-strip-bottom" v-if="index != content.length - 1"></view>
        </block>
      </view>

    </view>
    
    
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateGroup',
    mixins: [template_page_mixin],
    data(){
      return {
        show1: false,
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/blogger/content_1.jpeg',
        }, {
          id: 1,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/swiper/adno4.jpg',
        }, {
          id: 2,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/swiper/adno5.jpg',
        }, {
          id: 3,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/swiper/adno2.jpg',
        },
        {
          id: 4,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/swiper/adno3.jpg',
        }],
        content: [
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/onepiece-3.jpg',
            userName: 'IceCMS北北',
            date: '2022年5月20日',
            label: ['开源','创意','UI框架'],
            desc: '开源可商用组件，助你开发酷炫UI一臂之力',
            content: '基础常用的布局元素，酷炫完善的配色体系，统一可增的图标 icon ，简便调用的功能组件，酷炫的前端页面，吖，编不下去了',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/onepiece-1.jpg',
              'https://resource.tuniaokj.com/images/blogger/onepiece-2.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 62
            },
            collectionCount: 439,
            commentCount: 46,
            likeCount: 83
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userName: 'IceCMS北北',
            date: '2022年5月20日',
            label: ['开源','创意','UI框架'],
            desc: '开源可商用组件，助你开发酷炫UI一臂之力',
            content: '基础常用的布局元素，酷炫完善的配色体系，统一可增的图标 icon ，简便调用的功能组件，酷炫的前端页面，吖，编不下去了',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/content_1.jpeg'
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 12
            },
            collectionCount: 902,
            commentCount: 64,
            likeCount: 83
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
            userName: 'IceCMS北北',
            date: '2022年5月20日',
            label: [],
            desc: '',
            content: '',
            mainImage:[
              'https://resource.tuniaokj.com/images/shop/computer2.jpg',
              'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
              ],
              viewUserCount: 56
            },
            collectionCount: 431,
            commentCount: 26,
            likeCount: 84
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
            userName: 'IceCMS北北',
            date: '2022年5月20日',
            label: ['开源','创意'],
            desc: '开源可商用组件',
            content: '基础常用的布局元素，酷炫完善的配色体系，统一可增的图标 icon ，简便调用的功能组件，酷炫的前端页面，吖，编不下去了 基础常用的布局元素，酷炫完善的配色体系，统一可增的图标 icon ，简便调用的功能组件，酷炫的前端页面，吖，编不下去了',
            mainImage:[
              'https://resource.tuniaokj.com/images/swiper/swiper2.jpg',
              'https://resource.tuniaokj.com/images/swiper/swiper3.jpg',
              'https://resource.tuniaokj.com/images/swiper/swiper4.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
              ],
              viewUserCount: 231
            },
            collectionCount: 780,
            commentCount: 89,
            likeCount: 82
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userName: 'IceCMS北北',
            date: '2022年5月20日',
            label: ['开源','链接'],
            desc: 'https://www.yuque.com/tuniao',
            mainImage:[
              'https://resource.tuniaokj.com/images/shop/watch1.jpg',
              'https://resource.tuniaokj.com/images/shop/watch2.jpg',
              'https://resource.tuniaokj.com/images/shop/pillow2.jpg',
              'https://resource.tuniaokj.com/images/shop/pillow.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
              ],
              viewUserCount: 28
            },
            collectionCount: 432,
            commentCount: 33,
            likeCount: 12
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/content_1.jpeg',
            userName: 'IceCMS北北',
            date: '2022年5月20日',
            label: ['开源','创意'],
            desc: '开源可商用组件',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/y11.jpg',
              'https://resource.tuniaokj.com/images/blogger/y33.jpg',
              'https://resource.tuniaokj.com/images/blogger/y22.jpg',
              'https://resource.tuniaokj.com/images/blogger/y44.jpg',
              'https://resource.tuniaokj.com/images/blogger/y55.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          }
        ],
        /* 导航*/
        navBarRectInfo: {},
        navBarChangebaseLineHeight: 0,
        navBarStyle: {
          color:'#FFFFFF',
          opacity: 1,
          display: 'flex'
        },
        navBarStyle2: {
          color:'rgba(255,255,255,0)',
          opacity: 1,
          display: 'flex'
        },
        navBarBackgroundColor: 'rgba(255, 255, 255, 0)',
        activeBgAnimation: {}
      }
    },
    onReady() {
      this.$nextTick(() => {
        this.initNavBarRectInfo()
      })
    },
    onPageScroll() {
      this.updateNavBarRectInfo()
    },
    methods: {
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
      // 预览圈子管理员微信图片
      previewQRCodeImage() {
        wx.previewImage({
          urls: ['https://resource.tuniaokj.com/images/advertise/qrcode.jpg']
        })
      },
      // 弹出模态框
      showModal(event) {
        this.openModal()
      },
      // 打开模态框
      openModal() {
        this.show1 = true
      },
      // 初始化导航栏信息
      async initNavBarRectInfo() {
        const navBarRectInfo = await this._tGetRect('#navbar')
        const pageTipsRectInfo = await this._tGetRect('#page_tips')
        // console.log(navBarRectInfo, pageTipsRectInfo, navBarRectInfo?.top, pageTipsRectInfo?.top);
        if (!navBarRectInfo.hasOwnProperty('top') || !pageTipsRectInfo.hasOwnProperty('top')) {
          setTimeout(() => {
            this.initNavBarRectInfo()
          }, 10)
          return
        }
        this.navBarRectInfo = {
          top: navBarRectInfo.top
        }
        this.navBarChangebaseLineHeight = pageTipsRectInfo.top - navBarRectInfo.top
      },
      // 更新导航栏信息
      updateNavBarRectInfo() {
        this._tGetRect('#page_tips').then((res) => {
          const top = res?.top || 0
          if (!top) {
            return
          }
          const differHeight = top - this.navBarRectInfo.top
          const opacity = differHeight / this.navBarChangebaseLineHeight
          if (opacity < 0) {
            // this.navBarStyle.opacity = 1
            // this.navBarStyle.display = 'flex'
            this.navBarStyle.color = `rgba(0, 0, 0, 1)`
            this.navBarStyle2.color = `rgba(0, 0, 0, 1)`
            this.navBarBackgroundColor = `rgba(255, 255, 255, 1)`
          } else {
            // this.navBarStyle.opacity = 1 - opacity
            // this.navBarStyle.display = 'flex'
            this.navBarStyle.color = 'rgba(255, 255, 255, 1)'
            this.navBarStyle2.color = `rgba(255, 255, 255, ${1 - opacity})`
            this.navBarBackgroundColor = `rgba(255, 255, 255, ${1 - opacity})`
          }
          
          // console.log(top, differHeight, opacity);
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  /* 胶囊*/
  .tn-custom-nav-bar__back {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 1000rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.5);
    // color: #FFFFFF;
    font-size: 18px;
    
    .icon {
      display: block;
      flex: 1;
      margin: auto;
      text-align: center;
    }
    
    &:before {
      content: " ";
      width: 1rpx;
      height: 110%;
      position: absolute;
      top: 22.5%;
      left: 0;
      right: 0;
      margin: auto;
      transform: scale(0.5);
      transform-origin: 0 0;
      pointer-events: none;
      box-sizing: border-box;
      opacity: 0.05;
      background-color: #000000;
    }
  }
  
  
  /* 轮播视觉差 start */
  .card-swiper {
    height: 500rpx !important;
  }
    
  .card-swiper swiper-item {
    width: 750rpx !important;
    left: 0rpx;
    box-sizing: border-box;
    // padding: 0rpx 30rpx 90rpx 30rpx;
    overflow: initial;
  }
    
  .card-swiper swiper-item .swiper-item {
    width: 100%;
    display: block;
    height: 100%;
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
    will-change: transform;
    overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
    will-change: transform;
  }
  
  .image-banner{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-banner image{
    width: 100%;
    height: 100%;
  }
  
  /* 轮播指示点 start*/
  .indication{
    z-index: 9999;
    width: 100%;
    height: 36rpx;
    position: absolute;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    opacity: 0;
  }
  
  .spot{
    background-color: #FFFFFF;
    opacity: 0.6;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    top: -60rpx;
    margin: 0 8rpx !important;
    position: relative;
  }
  
  .spot.active{
    opacity: 1;
    width: 30rpx;
    background-color: #FFFFFF;
  }
  
  /* 顶部店铺 */
  .shop-function {
      position: relative;
      z-index: 1;
      margin-top: -450rpx;
      padding-bottom: 110rpx;
      background-image: linear-gradient(rgba(255, 255, 255, 0.01), rgba(0, 0, 0, 0.4));
  }
  
  /* 阴影 start*/
  .group-shadow {
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  /* 头像 start */
  .logo-image {
    width: 110rpx;
    height: 110rpx;
    position: relative;
  }
  
  .logo-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    overflow: hidden;
    // background-color: #FFFFFF;
  }
  
  /* 内容*/
  .group-wrap {
    position: relative;
    z-index: 1;
    // padding: 20rpx 30rpx;
    margin-top: -130rpx;  
    margin-bottom: 40rpx;
    border-radius: 30rpx 30rpx 0 0;
  }
  
  /* 文章内容 start*/
    .blogger {
      &__item {
        padding: 30rpx;
      }
      
      &__author {
        &__btn {
          margin-right: -12rpx;
          opacity: 0.5;
        }
      }
      
      &__desc {
        line-height: 55rpx;
        
        &__label {
          padding: 0 20rpx;
          margin: 0rpx 18rpx 0 0;
          
          &--prefix {
            color: #00FFC8;
            padding-right: 10rpx;
          }
        }
        &__content {
          
        }
      }
      
      &__content {
        margin-top: 18rpx;
        padding-right: 18rpx;
        
        &__data {
          line-height: 46rpx;
          text-align: justify;
          overflow: hidden;
          transition: all 0.25s ease-in-out;
          will-change: transform;
  
        }
        
        &__status {
          margin-top: 10rpx;
          font-size: 26rpx;
          color: #82B2FF;
        }
      }
      
      &__main-image {
        border-radius: 16rpx;
        
        &--1 {
          max-width: 80%;
          max-height: 300rpx;
        }
        
        &--2 {
          max-width: 260rpx;
          max-height: 260rpx;
        }
        
        &--3 {
          height: 212rpx;
          width: 100%;
        }
      }
      
      &__count-icon {
        font-size: 40rpx;
        padding-right: 5rpx;
      }
      
      &__ad {
        width: 100%;
        height: 500rpx;
        transform: translate3d(0px, 0px, 0px) !important;
        
        ::v-deep .uni-swiper-slide-frame {
          transform: translate3d(0px, 0px, 0px) !important;
        }
        .uni-swiper-slide-frame {
          transform: translate3d(0px, 0px, 0px) !important;
        }
        
        &__item {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-origin: left center;
          transform: translate3d(100%, 0px, 0px) scale(1) !important;
          transition: transform 0.25s ease-in-out;
          will-change: transform;
          z-index: 1;
          
          &--0 {
            transform: translate3d(0%, 0px, 0px) scale(1) !important;
            z-index: 4;
          }
          &--1 {
            transform: translate3d(13%, 0px, 0px) scale(0.9) !important;
            z-index: 3;
          }
          &--2 {
            transform: translate3d(26%, 0px, 0px) scale(0.8) !important;
            z-index: 2;
          }
        }
        
        &__content {
          border-radius: 40rpx;
          width: 640rpx;
          height: 500rpx;
          overflow: hidden;
        }
        
        &__image {
          width: 100%;
          height: 100%;
        }
      }
    }
    /* 文章内容 end*/
  
  /* 间隔线 start*/
  .tn-strip-bottom {
   width: 100%;
   border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
  }
   /* 间隔线 end*/
</style>
