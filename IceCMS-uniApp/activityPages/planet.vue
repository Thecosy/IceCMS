<template>
  <view class="template-planet tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    
    
    
    
    
    <swiper class="card-swiper" :current="cardCur" :circular="true"
        :autoplay="false" duration="500" interval="18000" @change="cardSwiper"> 
        <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
          <view class="swiper-item image-banner">
            <image :src="item.url" mode="heightFix" v-if="item.type=='image'" ></image>
          </view>
          <view class="swiper-item-text tn-text-center">
            <view class="tn-text-bold tn-padding-top-xs tn-color-white">
              <text class="tn-icon-copy tn-padding-right-xs"></text>
              {{item.name}}
              <text class="tn-icon-copy tn-padding-left-xs"></text>
            </view>
          </view>
      
        </swiper-item>
      </swiper>
      
      <view class="indication">
          <block v-for="(item,index) in swiperList" :key="index">
              <view class="spot tn-text-center tn-padding-top-sm tn-shadow-blur" :style="'color:'+ item.color + ';'" :class="cardCur==index?'active':''" @tap.stop="handleSwiperClick(index)">
                <view class="tn-text-xxl icon-text" :class="'tn-icon-'+ item.icon + ';' "></view>
                <view class="tn-text-sm">{{item.get}}</view>
              </view>
          </block>
      </view>
      
      
      <!-- 悬浮按钮-->
      <view class="tn-flex tn-footerfixed">
        <view class="tn-flex-1 justify-content-item tn-margin-sm tn-text-center" @click="tn('/activityPages/topic')">
          <tn-button shape="round" backgroundColor="#FFF00D" padding="40rpx 0" width="60%" shadow fontBold @tap="upload">
            <text class="tn-icon-light tn-padding-right-xs tn-color-black"></text>
            <text class="tn-color-black">前往答题</text>
            <text class="tn-icon-light tn-padding-left-xs tn-color-black"></text>
          </tn-button>
        </view>
      </view>
      
      <view class='tn-tabbar-height'></view>

  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplatePlanet',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          name: '累计64839人解锁此星球',
          get: '已解锁',
          icon: 'cube',
          url: 'https://resource.tuniaokj.com/images/planet/planet.png',
        }, {
          id: 1,
          type: 'image',
          name: '累计45353人解锁此星球',
          get: '已解锁',
          icon: 'cube',
          url: 'https://resource.tuniaokj.com/images/planet/planet.png',
        }, {
          id: 2,
          type: 'image',
          name: '累计2341人解锁此星球',
          get: '未解锁',
          icon: 'lock',
          url: 'https://resource.tuniaokj.com/images/planet/planet.png',
        }, {
          id: 3,
          type: 'image',
          name: '累计324人解锁此星球',
          get: '未解锁',
          icon: 'lock',
          url: 'https://resource.tuniaokj.com/images/planet/planet.png',
        }],
      }
    },
    methods: {
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
      // swiper点击事件
      handleSwiperClick(index) {
        this.cardCur = index
      },
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
    }
  }
</script>

<style lang="scss" scoped>
  .template-planet {
    margin: 0;
    width: 100%;
    height: 100vh;
    color: #fff;
    overflow: hidden;
    animation: color-loop 18s infinite;
  }
  
  @keyframes color-loop {
    0% {
      background: #F15BB5;
    }
  
    25% {
      background: #00F5D4;
    }
  
    50% {
      background: #01BEFF;
    }
  
    75% {
      background: #9A5CE5;
    }
  
    100% {
      background: #F15BB5;
    }
  }
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
    
    
    /* 视觉差轮播*/
    .card-swiper {
      height: 80vh !important;
    }
      
    .card-swiper swiper-item {
      width: 750rpx !important;
      left: 0rpx;
      box-sizing: border-box;
      overflow: initial;
    }
      
    .card-swiper swiper-item .swiper-item {
      margin-top: 15vh;
      width: 750rpx;
      height: 750rpx;
      border-radius: 0rpx;
      transform: translate(0rpx, 0rpx) scale(0.8);
      transition: all 0.2s ease-in 0s;
      will-change: transform;
      overflow: hidden;
      opacity: 1;
    }
      
    .card-swiper swiper-item.cur .swiper-item {
      transform: translate(0rpx, 0rpx) scale(1, 1);
      transition: all 0.2s ease-in 0s;
      will-change: transform;
      opacity: 1;
    }
    
    .card-swiper swiper-item .swiper-item-text {
      margin-top: -5vh;
      width: 100%;
      // height: 100%;
      display: block;
      border-radius: 10rpx;
      transform: scale(0.7, 0.7);
      transition: all 0.4s ease 0s;
      will-change: transform;
      overflow: hidden;
      opacity: 0;
    }
      
    .card-swiper swiper-item.cur .swiper-item-text {
      padding-left: 30rpx;
      transform: scale(1);
      transition: all 0.4s ease 0s;
      will-change: transform;
      opacity: 1;
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
      position: absolute;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:center;
    }
    
    .spot{
      opacity: 1;
      width: 100rpx;
      height: 80rpx;
      border-radius: 20rpx;
      margin: 20rpx 15rpx !important;
      left: 0rpx;
      right: 0;
      top: -65vh;
      position: relative;
    }
    
    .spot.active .icon-text{
      transform: scale(1.6);
      margin-bottom: 20rpx;
      opacity: 1;
    }
    
    /* 底部悬浮按钮 start*/
    .tn-tabbar-height {
    	min-height: 100rpx;
    	height: calc(120rpx + env(safe-area-inset-bottom) / 2);
    }
    .tn-footerfixed {
      position: fixed;
      width: 100%;
      bottom: calc(30rpx + env(safe-area-inset-bottom));
      z-index: 1024;
      box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);
      
    }
    /* 底部悬浮按钮 end*/
   
</style>
