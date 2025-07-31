<template>
  <view class="template-study tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    
    <swiper class="card-swiper" :circular="true"
      :autoplay="true" duration="500" interval="18000" @change="cardSwiper"> 
      <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
        <view class="swiper-item image-banner">
          <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
        </view>
        <view class="swiper-item2 image-banner">
          <image class="png-sussuspension" :src="item.pngurl" mode="heightFix" v-if="item.type=='image'"></image>
        </view>
        <view class="swiper-item-text">
          <view class="text-sussuspension">
            <view class="tn-text-xxl tn-text-bold tn-color-white">{{item.title}}</view>
            <view class="tn-text-bold tn-color-white tn-padding-top-xs" style="font-size: 60rpx;">{{item.name}}</view>
            <view class="tn-text-sm tn-text-bold tn-color-white tn-padding-top-sm tn-padding-bottom-sm">{{item.text}}</view>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="indication">
        <block v-for="(item,index) in swiperList" :key="index">
            <view class="spot" :class="cardCur==index?'active':''"></view>
        </block>
    </view>
    
    
    <!-- 方式10 start-->
    <view class="tn-flex tn-margin-top">
      <view class="tn-flex-1 tn-padding-sm tn-radius tn-margin-xs">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon10__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-blue tn-color-white">
            <view class="tn-icon-gloves-fill"></view>
          </view>  
          <view class="tn-color-black tn-text-df tn-text-center tn-padding-top-xs">
            <text class="tn-text-ellipsis">学习</text>
          </view>
        </view>
      </view>
      <view class="tn-flex-1 tn-padding-sm tn-radius tn-margin-xs">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon10__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-red tn-color-white">
            <view class="tn-icon-live-stream-fill"></view>
          </view>  
          <view class="tn-color-black tn-text-df tn-text-center tn-padding-top-xs">
            <text class="tn-text-ellipsis">视频</text>
          </view>
        </view>
      </view>
      <view class="tn-flex-1 tn-padding-sm tn-radius tn-margin-xs">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon10__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-orange tn-color-white">
            <view class="tn-icon-image-text-fill"></view>
          </view>  
          <view class="tn-color-black tn-text-df tn-text-center tn-padding-top-xs">
            <text class="tn-text-ellipsis">日志</text>
          </view>
        </view>
      </view>
      <view class="tn-flex-1 tn-padding-sm tn-radius tn-margin-xs">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon10__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-purple tn-color-white">
            <view class="tn-icon-topics-fill"></view>
          </view>  
          <view class="tn-color-black tn-text-df tn-text-center tn-padding-top-xs">
            <text class="tn-text-ellipsis">话题</text>
          </view>
        </view>
      </view>
      <view class="tn-flex-1 tn-padding-sm tn-radius tn-margin-xs">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon10__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-cyan tn-color-white">
            <view class="tn-icon-chemistry"></view>
          </view>  
          <view class="tn-color-black tn-text-df tn-text-center tn-padding-top-xs">
            <text class="tn-text-ellipsis">沉淀</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 方式10 end-->
    
    <view class="tn-margin study-shadow" v-for="(item, index) in 6" :key="index">
      <view class="tn-padding tn-flex tn-flex-col-center">
        <view class="tn-tag-content tn-shadow-blur tn-cool-bg-color-15 tn-margin-right tn-text-sm tn-text-bold">
          <text class="tn-padding-right-sm">#</text> 前端
        </view>
        <view class="tn-text-bold tn-text-lg">
          Flex前端基础布局知识一览
        </view>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-between tn-padding">
        <view class="tn-flex tn-flex-2 justify-content-item tn-text-bold tn-text-lg">
          <view class="">
            <tn-avatar-group :lists="groupList" size="sm"></tn-avatar-group>
          </view>
          <view class="tn-padding-left-sm">
            <text>286人已学习</text>
          </view>
        </view>
        <view class="tn-flex-1 justify-content-item tn-text-lg tn-text-right">
          <view class="tn-padding-bottom-xs tn-color-gray">
            免费
          </view>
        </view>
      </view>
      
    </view>
    
    
    

  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateStudy',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          title: '一起学习',
          name: '文案之类的',
          text: '小文案小文案小文案',
          url: 'https://resource.tuniaokj.com/images/swiper/banner-animate3.png',
          pngurl: 'https://resource.tuniaokj.com/images/login/1/login_top3.png'
        }, {
          id: 1,
          type: 'image',
          title: 'IceCMS南南',
          name: '欢迎加入东东们',
          text: '如果你也有不错的作品',
          url: 'https://resource.tuniaokj.com/images/swiper/banner-animate2.png',
          pngurl: 'https://resource.tuniaokj.com/images/swiper/c4d1.png'
        }, {
          id: 2,
          type: 'image',
          title: 'IceCMS西西',
          name: '一起玩转scss',
          text: '用最少的代码做最骚的效果',
          url: 'https://resource.tuniaokj.com/images/swiper/deer.jpg',
          pngurl: 'https://resource.tuniaokj.com/images/swiper/c4d1.png'
        }, {
          id: 3,
          type: 'image',
          title: 'IceCMS北北',
          name: '微信号 tnkewo',
          text: '商业合作请联系作者',
          url: 'https://resource.tuniaokj.com/images/swiper/banner-animate.png',
          pngurl: 'https://resource.tuniaokj.com/images/swiper/c4d1.png'
        }, {
          id: 4,
          type: 'image',
          title: 'IceCMS猪猪',
          name: '努力成为大佬',
          text: '一起加油吖',
          url: 'https://resource.tuniaokj.com/images/shop/banner2.jpg',
          pngurl: 'https://resource.tuniaokj.com/images/swiper/c4d1.png'
        }],
        groupList: [
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'},
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
    
    /* 内容 */
    .study-wrap {
      position: relative;
      z-index: 1;
      margin-top: -90rpx;  
    }
   
   /* 阴影 start*/
   .study-shadow {
     border-radius: 15rpx;
     box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
   }
   
   /* 悬浮 */
   .png-sussuspension{
     animation: suspension 3s ease-in-out infinite;
   }
   @keyframes suspension {
     0%, 100% {
       transform: translate(0 , 0);
     }
     50% {
       transform: translate(-0.8rem , 1rem);
     }
   }
   .text-sussuspension{
     animation: suspension2 4s ease-in-out infinite;
   }
   
   @keyframes suspension2 {
     0%, 100% {
       transform: translate(0 , 0);
     }
     50% {
       transform: translate(0rem , 1rem);
     }
   }
   
   
   /* 轮播视觉差 start */
   .card-swiper {
     height: 800rpx !important;
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
   
   .card-swiper swiper-item .swiper-item2 {
     margin-top: -540rpx;
     width: 100%;
     display: block;
     height: 100%;
     border-radius: 0rpx;
     transform: translate(140rpx, 20rpx) scale(0.3, 0.3);
     transition: all 0.6s ease 0s;
     will-change: transform;
     overflow: hidden;
   }
     
   .card-swiper swiper-item.cur .swiper-item2 {
     margin-top: -650rpx;
     width: 100%;
     transform: translate(180rpx, 0rpx) scale(0.5, 0.5);
     transition: all 0.6s ease 0s;
     will-change: transform;
   }
     
   .card-swiper swiper-item .swiper-item-text {
     margin-top: -550rpx;
     width: 100%;
     display: block;
     height: 50%;
     border-radius: 10rpx;
     transform: translate(100rpx, -60rpx) scale(0.9, 0.9);
     transition: all 0.6s ease 0s;
     will-change: transform;
     overflow: hidden;
   }
     
   .card-swiper swiper-item.cur .swiper-item-text {
     margin-top: -610rpx;
     width: 100%;
     transform: translate(0rpx, 60rpx) scale(0.9, 0.9);
     transition: all 0.6s ease 0s;
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
   }
   
   .spot{
     background-color: #FFFFFF;
     opacity: 0.6;
     width: 10rpx;
     height: 10rpx;
     border-radius: 20rpx;
     left: -265rpx;
     top: -150rpx;
     margin: 0 8rpx !important;
     position: relative;
   }
   
   .spot.active{
     opacity: 1;
     width: 30rpx;
     background-color: #FFFFFF;
   }
   
   /* 圆角*/
   .study-radius{
     border-radius: 15rpx;
   }
   
   /* 阴影*/
   .study-shadow{
     box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.07);
   }
   
   /* 图标容器10 start */
     .icon10 {
       &__item {
         width: 30%;
         background-color: #FFFFFF;
         border-radius: 10rpx;
         padding: 30rpx;
         margin: 20rpx 10rpx;
         transform: scale(1);
         transition: transform 0.3s linear;
         will-change: transform;
         transform-origin: center center;
         
         &--icon {
           width: 84rpx;
           height: 65rpx;
           font-size: 45rpx;
           border-radius: 200rpx;
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
             background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg6.png);
           }
         }
       }
     }
   /* 图标容器10 end */
   
   /* 标签内容 start*/
   .tn-tag-content {
       border-radius: 8rpx 25rpx 25rpx 8rpx;
       display: inline-block;
       line-height: 35rpx;
       padding: 8rpx 25rpx;
       color: rgba(255,255,255,0.8);
   }
   
</style>
