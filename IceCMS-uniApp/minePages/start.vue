<template>
  <view class="template-start">
    <!-- 顶部自定义导航 -->
    <!-- <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar> -->

    <swiper class="card-swiper" :circular="true"
      :autoplay="true" duration="500" interval="5000" @change="cardSwiper"> 
      <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
        <view class="swiper-item image-banner" :style="'background-color: '+ item.color +''">
          <image :src="item.url" mode="aspectFill" v-if="item.type=='image'" style="height: 100vh;width: 100vw;"></image>
        </view>
        <view class="swiper-item-png image-banner">
          <image :src="item.pngurl" mode="widthFix" v-if="item.type=='image'"></image>
        </view>
        <view class="swiper-item-text">
          <view class="tn-text-xxl tn-text-bold tn-color-white">{{item.text}}</view>
          <view class="tn-text-df tn-color-white tn-padding-top-sm">{{item.name}}</view>
        </view>
    
      </swiper-item>
    </swiper>
    <view class="indication">
        <block v-for="(item,index) in swiperList" :key="index">
            <view class="spot" :class="cardCur==index?'active':''"></view>
        </block>
    </view>
    <view class="go">
      <tn-button :plain="true" shape="round" backgroundColor="#FFFFFF" fontColor="#FFFFFF" width="40vw" height="70rpx" @click="tn('/pages/index')">
        立 即 体 验</tn-button>
    </view>

  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateStart',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          name: '总有你想不到的创意',
          text: '海量分享',
          color: '#00C3E3',
          url: 'https://resource.tuniaokj.com/images/swiper/guide-bg1.jpg',
          pngurl: 'https://resource.tuniaokj.com/images/swiper/c4d7.png'
        }, {
          id: 1,
          type: 'image',
          name: '寻找一起成长的小伙伴',
          text: '愉快玩耍',
          color: '#FE5141',
          url: 'https://resource.tuniaokj.com/images/swiper/guide-bg2.jpg',
          pngurl: 'https://resource.tuniaokj.com/images/swiper/c4d8.png'
        }, {
          id: 2,
          type: 'image',
          name: '更多彩蛋等你探索',
          text: '酷炫多彩',
          color: '#EF9A01',
          url: 'https://resource.tuniaokj.com/images/swiper/guide-bg3.jpg',
          pngurl: 'https://resource.tuniaokj.com/images/swiper/c4d9.png'
        }, {
          id: 3,
          type: 'image',
          name: '商业合作请联系作者',
          text: '悄悄来袭',
          color: '#D960C7',
          url: 'https://resource.tuniaokj.com/images/swiper/guide-bg4.jpg',
          pngurl: 'https://resource.tuniaokj.com/images/swiper/c4d10.png'
        }],
      }
    },
    methods: {
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
    }
  }
</script>

<style lang="scss" scoped>
  /* 胶囊*/
  /* .tn-custom-nav-bar__back {
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
  } */
    /* 轮播视觉差 start */
    .card-swiper {
      height: 100vh !important;
    }
  
    .card-swiper swiper-item {
      width: 750rpx !important;
      left: 0rpx;
      box-sizing: border-box;
      overflow: initial;
    }
  
    .card-swiper swiper-item .swiper-item {
      width: 100%;
      display: block;
      height: 100%;
      border-radius: 0rpx;
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
  
    .card-swiper swiper-item .swiper-item-png {
      margin-top: -85vh;
      display: block;
      border-radius: 0rpx;
      transform: translate(40rpx, 20rpx) scale(0.8, 0.8);
      transition: all 0.6s ease 0s;
      will-change: transform;
      overflow: hidden;
    }
  
    .card-swiper swiper-item.cur .swiper-item-png {
      margin-top: -85vh;
      transform: translate(0rpx, 0rpx) scale(1, 1);
      transition: all 0.6s ease 0s;
      will-change: transform;
    }
  
    .card-swiper swiper-item .swiper-item-text {
      margin-top: 0rpx;
      text-align: center;
      width: 100%;
      display: block;
      height: 50%;
      border-radius: 10rpx;
      transform: translate(0rpx, -40rpx) scale(0.7, 0.7);
      transition: all 0.6s ease 0s;
      will-change: transform;
      overflow: hidden;
    }
  
    .card-swiper swiper-item.cur .swiper-item-text {
      margin-top: -60rpx;
      width: 100%;
      transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
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
    }
    
    /* 轮播指示点 start*/
    .indication{
      z-index: 9999;
      width: 100%;
      height: 36rpx;
      position: fixed;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:center;
    }
    
    .spot{
      background-color: #FFF;
      opacity: 0.4;
      width: 10rpx;
      height: 10rpx;
      border-radius: 20rpx;
      margin: 0 8rpx !important;
      right: -270rpx;
      top: -180rpx;
      position: relative;
    }
    
    .spot.active{
      opacity: 1;
      width: 30rpx;
      background-color: #FFF;
    }
    
    /* 立即体验 start*/
    .go{
      z-index: 9999;
      width: 100%;
      position: fixed;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:center;
      bottom: 10vh;
    }
</style>
