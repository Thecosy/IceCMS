<template>
  <view class="template-project">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    

    
    <!-- 移动背景 -->
    <view class="bg-contaniner tn-bg-blue">
      
    </view>
    
    
    <!-- 项目内容-->
    <view class="">
      <view class="tn-margin-top" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
        
        
        <swiper class="card-swiper tn-margin-top-sm" :circular="true"
          :autoplay="true" duration="500" interval="5000" @change="cardSwiper"> 
          <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
            <view class="swiper-item image-banner">
              <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
            </view>
            <view class="swiper-item-text">
              <view class="tn-text-xxl tn-text-bold tn-color-white">{{item.title}}</view>
              <view class="tn-text-bold tn-color-white tn-padding-top-xs" style="font-size: 60rpx;">{{item.name}}</view>
            </view>
          </swiper-item>
        </swiper>
        <view class="indication">
            <block v-for="(item,index) in swiperList" :key="index">
                <view class="spot" :class="cardCur==index?'active':''"></view>
            </block>
        </view>
        
        
      </view>
      
      
      
      <view class="tn-bg-white tn-safe-area-inset-bottom" style="border-radius: 50rpx 50rpx 0 0;">
        <view class="" style="padding: 30rpx 30rpx 0 30rpx;">
          <tn-notice-bar :list="list" mode="vertical" leftIconName="voice"></tn-notice-bar>
        </view>
        <!-- 方式12 start-->
        <view class="tn-flex tn-radius"> 
        <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-main-gradient-blue--light tn-color-blue">
              <view class="tn-icon-edit-form"></view>
            </view>  
            <view class="tn-color-black tn-text-center">
              <text class="tn-text-ellipsis">贡献项目</text>
            </view>
          </view>
        </view>
          <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-main-gradient-orange--light tn-color-orange">
                <view class="tn-icon-honor"></view>
              </view>  
              <view class="tn-color-black tn-text-center">
                <text class="tn-text-ellipsis">发布悬赏</text>
              </view>
            </view>
          </view>
          <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-main-gradient-purple--light tn-color-purple">
                <view class="tn-icon-reply"></view>
              </view>  
              <view class="tn-color-black tn-text-center">
                <text class="tn-text-ellipsis">站点收集</text>
              </view>
            </view>
          </view>
          <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-main-gradient-purplered--light tn-color-purplered">
                <view class="tn-icon-share-triangle"></view>
              </view>  
              <view class="tn-color-black tn-text-center">
                <text class="tn-text-ellipsis">分享好友</text>
              </view>
            </view>
          </view>
        </view>
        <!-- 方式12 end-->

      
      
      <!-- 图文 -->
        <view class="tn-padding-bottom-lg">
          <block v-for="(item,index) in content" :key="index">
            <view class="tn-blogger-content__wrap">
              <view class="">
                <!-- 方式一 -->
                <!-- <view class="tn-shadow-blur image-pic" :style="'background-image:url(' + item.mainImage + ')'">
                  <view class="image-qrcode">
                  </view>
                </view> -->
                <!-- 方式二 -->
                <image 
                  class="tn-blogger-content__main-image tn-blogger-content__main-image--1 tn-margin-bottom"
                  :src="item.mainImage[0]"
                  mode="aspectFill"
                ></image>
              </view>
              <view class="tn-blogger-content__label tn-text-justify">
                <text class="tn-blogger-content__label__desc tn-text-lg tn-text-bold tn-padding">{{ item.desc }}</text>  
              </view>
              
              <view class="tn-flex tn-flex-row-between tn-flex-col-center">
                <view class="justify-content-item tn-flex tn-flex-col-center">
                  <view style="margin-right: 10rpx;margin-left: 0rpx;">
                    <view class="tn-color-gray tn-padding">
                      <text class="tn-blogger-content__count-icon tn-icon-flower"></text> 
                      <text class="tn-padding-right">{{ item.collectionCount }}</text>
                      <text class="tn-blogger-content__count-icon tn-icon-message"></text>
                      <text class="tn-padding-right">{{ item.commentCount }}</text>
                      <text class="tn-blogger-content__count-icon tn-icon-like"></text>
                      <text class="">{{ item.likeCount }}</text>
                    </view>
                  </view>
                </view>
                <view class="justify-content-item tn-text-center">
                  <view v-for="(label_item,label_index) in item.label" :key="label_index" class="tn-blogger-content__label__item tn-float-left tn-margin-right tn-bg-gray--light tn-round tn-text-sm tn-text-bold">
                    <text class="tn-blogger-content__label__item--prefix">#</text> {{ label_item }}
                  </view>
                  
                </view>
              </view>
            </view>
            
          </block>
        </view>
        
      </view>
      
      
    </view>
    
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateProject',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          title: '',
          name: '',
          url: 'https://resource.tuniaokj.com/images/new/banner1.jpg',
        }, {
          id: 1,
          type: 'image',
          title: '',
          name: '',
          url: 'https://resource.tuniaokj.com/images/new/banner1.jpg',
        }, {
          id: 2,
          type: 'image',
          title: '',
          name: '',
          url: 'https://resource.tuniaokj.com/images/new/banner1.jpg',
        }, {
          id: 3,
          type: 'image',
          title: '',
          name: '',
          url: 'https://resource.tuniaokj.com/images/new/banner1.jpg',
        }],
        list: [
          '感谢内测群的20位小伙伴，感谢他们的不杀之恩！',
          '感谢DCloud以及Gitee官方的鼓励和认可！',
          '感谢各位开发者的问题反馈和慷慨赞赏！'
        ],
        content: [
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '开源可商用组件',
            mainImage:[
              'https://resource.tuniaokj.com/images/shop/prototype1.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '开源可商用组件',
            mainImage:[
              'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '开源可商用组件',
            mainImage:[
              'https://resource.tuniaokj.com/images/shop/computer2.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['站点','链接'],
            desc: 'https://www.yuque.com/tuniao',
            mainImage:[
              'https://resource.tuniaokj.com/images/shop/pillow2.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '开源可商用组件',
            mainImage:[
              'https://resource.tuniaokj.com/images/shop/phonecase1.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          }
        ]
      }
    },
    methods: {
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
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
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 1000rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.5);
    color: #FFFFFF;
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
      opacity: 0.7;
      background-color: #FFFFFF;
    }
  }
  
  /* 轮播视觉差 start */
  .card-swiper {
    height: 420rpx !important;
  }
    
  .card-swiper swiper-item {
    width: 750rpx !important;
    left: 0rpx;
    box-sizing: border-box;
    padding: 0rpx 30rpx 90rpx 30rpx;
    overflow: initial;
  }
    
  .card-swiper swiper-item .swiper-item {
    width: 100%;
    display: block;
    height: 100%;
    border-radius: 15rpx;
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
    overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
  }
    
  .card-swiper swiper-item .swiper-item-text {
    margin-top: -220rpx;
    width: 100%;
    display: block;
    height: 50%;
    border-radius: 10rpx;
    transform: translate(100rpx, -60rpx) scale(0.9, 0.9);
    transition: all 0.6s ease 0s;
    overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item-text {
    margin-top: -280rpx;
    width: 100%;
    transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
    transition: all 0.6s ease 0s;
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
  }
  
  .spot{
    background-color: #FFFFFF;
    opacity: 0.6;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    top: -130rpx;
    margin: 0 8rpx !important;
    position: relative;
  }
  
  .spot.active{
    opacity: 1;
    width: 30rpx;
    background-color: #FFFFFF;
  }
  
  /* 阴影*/
  .project-shadow{
      box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.07);
      border-radius: 20rpx;
  }
  
  /* 图标容器12 start */
  .icon12 {
    &__item {
      width: 30%;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      padding: 30rpx;
      margin: 20rpx 10rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;
      
      &--icon {
        width: 100rpx;
        height: 100rpx;
        font-size: 60rpx;
        border-radius: 50%;
        margin-bottom: 18rpx;
        position: relative;
        z-index: 1;
        
        &::after {
          content: " ";
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          left: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 1;
          transform: scale(1, 1);
          background-size: 100% 100%;
          background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
  
            
        }
      }
    }
  }
  
  
  
  /* 文章内容 start*/
  .tn-blogger-content {
    &__wrap {
      box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.09);
      border-radius: 20rpx;
      margin: 40rpx 30rpx;
    }
    
    &__info {
      &__btn {
        margin-right: -12rpx;
        opacity: 0.5;
      }
    }
    
    &__label {
      &__item {
        line-height: 45rpx;
        padding: 0 20rpx;
        margin: 5rpx 18rpx 0 0;
        
        &--prefix {
          color: #00FFC6;
          padding-right: 10rpx;
        }
      }
      
      &__desc {
        line-height: 55rpx;
      }
    }
    
    &__main-image {
      border-radius: 16rpx 16rpx 0 0;
      
      &--1 {
        max-width: 690rpx;
        min-width: 690rpx;
        max-height: 300rpx;
        min-height: 300rpx;
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
  }
  
  .image-qrcode{
    padding: 180rpx 0rpx;
    font-size: 40rpx;
    font-weight: 300;
    position: relative;
  }
  .image-pic{
    background-size: cover;
    background-repeat:no-repeat;
    // background-attachment:fixed;
    background-position:top;
    border-radius: 10rpx;
  }
  /* 文章内容 end*/
   
  
  /* 移动背景部分 start*/
  .bg-contaniner {
    position: fixed;
    top: -0rpx;
    left: -300rpx;
    --text-color: hsl(0 95% 60%);
    --bg-color: hsl(0 0% 100%);
    --bg-size: 200px;
    height: 100%;
    display: grid;
    place-items: center;
    place-content: center;
    overflow: hidden;
    background-color: var(--bg-color);
    z-index: -1;
  }
  
  .bg-contaniner::before {
    --size: 150vmax;
    content: "";
    inline-size: var(--size);
    block-size: var(--size);
    background-image: url("https://resource.tuniaokj.com/images/animate/animate3.png");
    background-size: var(--bg-size);
    background-repeat: repeat;
    transform: rotate(45deg);
    opacity: 0.25;
    animation: bg 6s linear infinite;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .bg-contaniner::before {
      animation-duration: 0s;
    }
  }
  
  @keyframes bg {
    to {
      background-position: 0 calc(var(--bg-size) * -1);
    }
  }
  /* 移动背景部分 end*/
  
</style>
