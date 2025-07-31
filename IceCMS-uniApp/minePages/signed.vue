<template>
  <view class="template-screen tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <!-- <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar> -->
    
    <!-- 顶部自定义导航 -->
    <tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="none">
      <view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left" @tap.stop="goBack">
        <!-- 返回按钮 -->
        <view class="custom-nav__back">
          <view class="tn-icon-backspace tn-color-white" style="font-size: 60rpx;"></view>
        </view>
        <!-- 字 -->
        <view class="custom-nav__search tn-flex tn-flex-col-center tn-flex-row-center ">
          <view class="custom-nav__search__box tn-flex tn-flex-col-center tn-flex-row-center tn-color-white">
            <text class="tn-text-bold tn-text-xl">积分签到</text>
          </view>
        </view>
      </view>
    </tn-nav-bar>
    
    <!-- 页面内容 -->
    <view class="bg-contaniner">
      
    </view>
    
    
    
    
    

    <view class="">
      <view class="tn-margin-top" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
        <view class="tn-bg-white tn-margin tn-text-center" style="border-radius: 20rpx">
          <view class="tn-flex tn-flex-row-around tn-padding-sm tn-bg-blue--light" style="border-radius: 20rpx 20rpx 0 0;">
            <text>你已连续签到十天</text>
          </view>
          <view class="">
            <view class="tn-margin-top-xl tn-text-xl">累计获得积分</view>
            <view class="tn-text-bold tn-margin-top-sm tn-text-xxl">43545323233</view>
            
            <view class="tn-margin-bottom-lg">
              <!-- 方式18 start-->
              <view class="tn-flex tn-flex-row-center tn-radius tn-padding-top">
                <view class="tn-padding-xs tn-radius" v-for="(item, index) in 7" :key="index">
                  <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                    <view class="icon18__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-orange">
                      <view class="tn-icon-success tn-color-white"></view>
                    </view>
                    <view class="tn-text-center">
                      <text class="tn-text-ellipsis tn-text-sm tn-color-gray">第{{index+1}}天</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>

            <view class="tn-padding">
              <text class="tn-icon-calendar tn-padding-right-sm"></text>
              <text>签到明细</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 方式12 start-->
      <view class="tn-flex tn-margin-xs">
        <view class="tn-flex-1 screen-shadow tn-bg-white" style="margin: 30rpx 20rpx;padding: 40rpx 0;" @click="tn('/circlePages/ranking')">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-orangered tn-color-white">
              <view class="tn-icon-sword tn-three"></view>
            </view>  
            <view class="tn-text-center">
              <view class="tn-text-ellipsis tn-text-xl tn-color-orangered">积分排行</view>
            </view>
          </view>
        </view>
        <view class="tn-flex-1 screen-shadow tn-bg-white" style="margin: 30rpx 20rpx;padding: 40rpx 0;" @click="tn('/preferredPages/redeem')">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-purplered tn-color-white">
              <view class="tn-icon-gift tn-three"></view>
            </view>  
            <view class="tn-text-center">
              <view class="tn-text-ellipsis tn-text-xl tn-color-purplered">周边兑换</view>
            </view>
          </view>
        </view>
      </view>
      
      <view class="tn-margin">
        <view class="screen-shadow tn-bg-white tn-padding tn-color-gray">
          <view class="tn-text-center tn-text-lg tn-padding-xs tn-text-bold tn-color-black">
            积分规则
          </view>
          <view class="tn-padding-top">
            1.签到可获取10积分
          </view>
          <view class="tn-padding-top-xs">
            2.连续签到三天，第三天可获得50积分
          </view>
          <view class="tn-padding-top-xs">
            3.连续签到六天，第六天可获得100积分
          </view>
          <view class="tn-padding-top-xs">
            4.当天最多可获得200积分，请自行探索，不多BB
          </view>
          <view class="tn-padding-top-xs">
            5.积分可用于兑换周边，不可退换
          </view>
          
        </view>
      </view>
      
    </view>
    
    
    <!-- 底部tabbar start-->
    <view class="tabbar footerfixed">
      <view class="action">
        <view class="bar-icon">
          <view class="tn-icon-search-menu tn-color-gray--dark">
          </view>
          <!-- <image class="" src='https://resource.tuniaokj.com/images/tabbar/home_tnnew.png'></image> -->
        </view>
        <view class="tn-color-gray">统计</view>
      </view>
      <view class="action">
        <view class="bar-circle tn-shadow-blur">
          <view class="tn-icon-fingerprint tn-color-white">
          </view>
          <!-- <image class="" src='https://resource.tuniaokj.com/images/tabbar/information_tn.png'></image> -->
        </view>
        <!-- <view class="tn-color-gray">积分签到</view> -->
      </view>
      <view class="action">
        <view class="bar-icon">
          <view class="tn-icon-clock tn-color-gray--dark">
          </view>
          <!-- <image class="" src='https://resource.tuniaokj.com/images/tabbar/my_tn.png'></image> -->
        </view>
        <view class="tn-color-gray">提醒</view>
      </view>
    </view>
    
    <view class='tn-tabbar-height'></view>
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateScreen',
    mixins: [template_page_mixin],
    data(){
      return {
      }
    },
    methods: {
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
  /* 自定义导航栏内容 start */
  .custom-nav {
    height: 100%;
    
    &__back {
      margin: auto 5rpx;
      font-size: 40rpx;
      margin-right: 10rpx;
      margin-left: 30rpx;
      flex-basis: 5%;
    }
    
    &__search {
      flex-basis: 71%;
      width: 100%;
      height: 100%;
      
      &__box {
        width: 100%;
        height: 70%;
        padding: 10rpx 0;
        margin: 0 30rpx;
        border-radius: 60rpx 60rpx 60rpx 0;
        font-size: 24rpx;
        // background-color: rgba(255,255,255,0.1);
      }
      
      &__icon {
        padding-right: 10rpx;
        margin-left: 20rpx;
        font-size: 30rpx;
      }
      
      &__text {
      }
    }
  }
  /* 自定义导航栏内容 end */
  
  .tn-tabbar-height {
  	min-height: 120rpx;
  	height: calc(140rpx + env(safe-area-inset-bottom) / 2);
  }
  
  .screen-shadow{
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
  
  
  /* 图标容器18 start */
  .icon18 {
    &__item {
      width: 20%;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      padding: 10rpx;
      margin: 20rpx 0rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;
      
      &--icon {
        width: 50rpx;
        height: 50rpx;
        margin: 10rpx;
        font-size: 40rpx;
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
      margin: 30rpx;
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
          color: #00FFC8;
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
        max-height: 400rpx;
        min-height: 400rpx;
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
    top: 0rpx;
    left: 0rpx;
    --text-color: hsl(0 95% 60%);
    --bg-color: hsl(0 0% 100%);
    --bg-size: 750rpx;
    height: 100%;
    display: grid;
    place-items: center;
    place-content: center;
    overflow: hidden;
    background-color: #4392F4;
    z-index: -1;
  }
  
  .bg-contaniner::before {
    --size: 150vmax;
  
    grid-area: body;
    content: "";
    inline-size: var(--size);
    block-size: var(--size);
    background-image: url("https://resource.tuniaokj.com/images/animate/health.png");
    background-size: var(--bg-size);
    background-repeat: repeat;
    transform: rotate(0deg);
    opacity: 0.15;
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
  
  /* 底部tabbar start*/
  .footerfixed{
   position: fixed;
   width: 100%;
   bottom: 0;
   z-index: 999;
   background-color: #FFFFFF;
   box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  .tabbar {
    display: flex;
    align-items: center;
    min-height: 110rpx;
    justify-content: space-between;
  	padding: 0;
  	height: calc(110rpx + env(safe-area-inset-bottom) / 2);
  	padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  }
  
  .tabbar .action {
  	font-size: 22rpx;
  	position: relative;
  	flex: 1;
  	text-align: center;
  	padding: 0;
  	display: block;
  	height: auto;
  	line-height: 1;
  	margin: 0;
  	overflow: initial;
  }
  
  .tabbar .action .bar-icon {
  	width: 100rpx;
  	position: relative;
  	display: block;
  	height: auto;
  	margin: 0 auto 10rpx;
  	text-align: center;
  	font-size: 42rpx;
    // line-height: 50rpx;
  }
  
  .tabbar .action .bar-icon image {
  	width: 50rpx;
  	height: 50rpx;
  	display: inline-block;
  }
  
  .tabbar .action .bar-circle {
    position: relative;
    display: block;
    margin: -60rpx auto 20rpx;
    text-align: center;
    font-size: 82rpx;
    line-height: 150rpx;
    background-color: #01BEFF;
    width: 150rpx !important;
    height: 150rpx !important;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(1, 190, 255, 0.5);
  }
  
  .tabbar .action .bar-circle image {
    width: 60rpx;
  	height: 60rpx;
  	display: inline-block;
    margin: 15rpx auto 15rpx;
  }
</style>
