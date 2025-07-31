<template>
  <view class="components-map">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    
    
    
    
    <swiper class="card-swiper" :current="cardCur" :circular="true"
        :autoplay="false" duration="500" interval="12000" @change="cardSwiper"> 
      <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
        <!-- <view class="swiper-item image-banner">
          <image :src="item.url" mode="widthFix" v-if="item.type=='image'" ></image>
        </view> -->
        <!-- 用背景形式，大图加载的时候，用户体验会好一点-->
        <view class="swiper-item image-banner tn-shadow-blur" :style="'background-image:url('+ item.url + ');width: 750rpx;height: 100%;background-size: cover;'">
        </view>
      </swiper-item>
    </swiper>
      
   <view class="indication">
        <block v-for="(item,index) in swiperList" :key="index">
            <view class="spot" :class="cardCur==index?'active':''">
            </view>
        </block>
    </view>
    
    <view class="map">
        <view class="map-location-1" @click="showModal">
          <image class="map-house-img" mode="widthFix" src="https://resource.tuniaokj.com/images/new/place1.png">
          </image>

          <!-- <view class="map-house-title">
            <text>打卡点1</text>
          </view> -->
        </view>
        
        <view class="map-location-2" @click="showModal">
          <image class="map-house-img" mode="widthFix" src="https://resource.tuniaokj.com/images/new/place2.png">
          </image>

          <!-- <view class="map-house-title">
            <text>打卡点2</text>
          </view> -->
        </view>
        
        <view class="map-location-3" @click="showModal">
          <image class="map-house-img" mode="widthFix" src="https://resource.tuniaokj.com/images/new/place3.png">
          </image>

          <!-- <view class="map-house-title">
            <text>打卡点3</text>
          </view> -->
        </view>
       
        <view class="map-location-4" @click="showModal">
          <image class="map-house-img" mode="widthFix" src="https://resource.tuniaokj.com/images/new/place4.png">
          </image>

          <!-- <view class="map-house-title">
            <text>打卡点4</text>
          </view> -->
        </view>
        
        <view class="map-location-5 punch-no tnxuanfu-map" @click="showModal">
          <image class="map-house-img" mode="widthFix" src="https://resource.tuniaokj.com/images/new/place5.png">
          </image>

          <!-- <view class="map-house-title">
            <text>打卡点5</text>
          </view> -->
        </view>
        
    </view>
    
    <tn-modal v-model="show1" :custom="true">
      <view class="custom-modal-content">
        <view class="tn-text-center tn-padding-top-sm tn-text-xxl tn-text-bold">提 示</view>
        <view class="tn-text-center tn-padding-top tn-text-lg tn-color-gray">你暂未在打卡点范围内，无法打卡</view>
        <view class="tn-flex tn-flex-row-between tn-margin-top-xl">
          <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
            <tn-button backgroundColor="#00FFC6" padding="40rpx 0" width="90%" shadow fontBold shape="round">
              <text class="tn-color-black">取 消</text>
            </tn-button>
          </view>
          <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
            <tn-button backgroundColor="#FFF00D" padding="40rpx 0" width="90%" shadow fontBold shape="round">
              <text class="tn-color-black">确 定</text>
            </tn-button>
          </view>
        </view>
      </view>
    </tn-modal>

  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateMap',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          name: '春节期间累计获得64839积分',
          text: '0.56元',
          get: '已领取',
          url: 'https://resource.tuniaokj.com/images/new/map1.jpg',
        }, {
          id: 1,
          type: 'image',
          name: '春节期间累计获得231345积分',
          text: '1.29元',
          get: '已领取',
          url: 'https://resource.tuniaokj.com/images/new/map2.jpg',
        }, {
          id: 2,
          type: 'image',
          name: '春节期间累计获得342432积分',
          text: '5.??元',
          get: '未领取',
          url: 'https://resource.tuniaokj.com/images/new/map3.jpg',
        }, {
          id: 3,
          type: 'image',
          name: '春节期间累计获得231345积分',
          text: '1.29元',
          get: '已领取',
          url: 'https://resource.tuniaokj.com/images/new/map4.jpg',
        }],
        show1: false,
      }
    },

      methods: {
        // cardSwiper
        cardSwiper(e) {
          this.cardCur = e.detail.current
        },
        // 弹出模态框
        showModal(event) {
          this.openModal()
        },
        // 打开模态框
        openModal() {
          this.show1 = true
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
  
  /* 视觉差轮播*/
  .card-swiper {
    height: 3472rpx !important;
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
    border-radius: 0rpx;
    transform: translate(0rpx, 0rpx) scale(0.95);
    transition: all 0.2s ease-in 0s;
    will-change: transform;
    overflow: hidden;
    opacity: 1;
  }
    
  .card-swiper swiper-item.cur .swiper-item {
    transform: translate(0rpx, 0rpx) scale(1);
    transition: all 0.2s ease-in 0s;
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
    position: fixed;
    bottom: 100rpx;
    z-index: 9999;
    width: 100%;
    height: 36rpx;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
  }
  
  .spot{
    width: 15rpx;
    height: 15rpx;
    border-radius: 100rpx;
    margin: 0 8rpx !important;
    position: relative;
    border: 2rpx solid rgba(255,255,255,0.6);
  }
  
  .spot.active{
    width: 30rpx;
    height: 30rpx;
    padding: 10rpx;
    border: 5rpx solid rgba(255,255,255,1);
  }
  
  /* 地图 */
  .map {
    position: relative;
    margin-top: -3630rpx;
    z-index: 1;
  }
  
  
  .map-house-img {
    width: 55vw;
    z-index: -1;
  }
  .map-house-title {
    background-color: #FFFD55;
    color: #6C2D0F;
    border-radius: 12px;
    font-size: 11px;
    padding: 2px 8px;
    margin-top: -18px;
    text-align: center;
  }
  
  /* 未打卡*/
  .punch-no{
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
  }
  
  .map-location-1 {
    position: absolute;
    top: 500rpx;
    right: 0vw;
  }
  
  .map-location-2 {
    position: absolute;
    top: 775rpx;
    left: 0vw;
  }
  
  .map-location-3 {
    position: absolute;
    top: 1855rpx;
    right: 0vw;
  }
  
  .map-location-4 {
    position: absolute;
    top: 2265rpx;
    left: 0vw;
  }
  
  .map-location-5 {
    position: absolute;
    top: 2665rpx;
    right: 0vw;
  }
  
  /* 悬浮 */
  .tnxuanfu-map{
    animation: suspension-map 4s ease-in-out infinite;
  }
  
  @keyframes suspension-map {
    0%, 100% {
      transform: translateY(0.1rem);
    }
    50% {
      transform: translateY(-1.5rem);
    }
  }

</style>
