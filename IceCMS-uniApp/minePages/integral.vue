<template>
  <view class="template-integral tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    <view class="top-backgroup">
      <image src='https://resource.tuniaokj.com/images/swiper/summer.jpg' mode='widthFix' class='backgroud-image'></image>
    </view>
    
    <view class="tnwave waveAnimation">
      <view class="waveWrapperInner bgTop">
        <view class="wave waveTop" style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-2.png')"></view>
      </view>
      <view class="waveWrapperInner bgMiddle">
        <view class="wave waveMiddle" style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-2.png')"></view>
      </view>
      <view class="waveWrapperInner bgBottom">
        <view class="wave waveBottom" style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-1.png')"></view>
      </view>
    </view>
    
    <view class="integral-wrap" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <!-- 头像用户信息 -->
      <view class="tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">

        <view class="tn-text-bold tn-text-xxl tn-color-blue--dark">当前可用积分</view>
        <view class="tn-text-bold tn-text-xxl tn-color-blue tn-padding-top-sm">653596</view>
      </view>
      
    
      
      <!-- 消息&数据 -->
      <view class="shadow-warp" style="margin-top: 150rpx;background-color: rgba(255,255,255,1);">
        <view class="tn-flex tn-flex-row-around">
          <view class="tn-flex tn-flex-col-center tn-padding-sm tn-margin" @click="tn('/circlePages/ranking')">
            <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-orangered tn-color-white">
              <view class="tn-icon-sword"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1 tn-text-lg tn-text-bold tn-color-orangered">积分排行</view>
          </view>
          <view class="tn-flex tn-flex-col-center tn-padding-sm tn-margin" @click="tn('/preferredPages/redeem')">
            <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-purplered tn-color-white">
              <view class="tn-icon-gift"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1 tn-text-lg tn-text-bold tn-color-purplered">周边兑换</view>
          </view>
        </view>
      </view> 
    </view>
    
    <view class="tn-margin-top-lg tn-margin-bottom">
      <view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" v-for="(item,index) in integral" :key="index" >
        <view class="justify-content-item">
          <view class="tn-color-gray--dark tn-text-lg">
           {{item.name}}
          </view>
          <view class="tn-color-gray tn-padding-top-xs">
            {{item.time}}
          </view>
        </view>
        <view class="justify-content-item tn-text-xl tn-padding-top">
          <view :class="'tn-color-' + item.color + ';'"> {{item.integral}} </view>
        </view>
      </view>
    
    </view>

    
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateIntegral',
    mixins: [template_page_mixin],
    data(){
      return {
        
        integral: [{
          name: '每日签到',
          time: '2022-05-20 22:45:29',
          color: 'blue--dark',
          integral: '+10'
        },{
          name: '周边兑换 手机壳',
          time: '2022-05-18 20:20:50',
          color: 'purplered',
          integral: '-666'
        }, {
          name: '每日签到 连续签到7天',
          time: '2022-05-18 18:11:19',
          color: 'blue--dark',
          integral: '+100'
        }, {
          name: '每日签到 连续签到6天',
          time: '2022-05-17 13:42:42',
          color: 'blue--dark',
          integral: '+100'
        }, {
          name: '每日签到 连续签到5天',
          time: '2022-05-16 12:14:43',
          color: 'blue--dark',
          integral: '+50'
        }, {
          name: '每日签到 连续签到4天',
          time: '2022-05-15 10:21:08',
          color: 'blue--dark',
          integral: '+50'
        }, {
          name: '每日签到 连续签到3天',
          time: '2022-05-14 08:56:32',
          color: 'blue--dark',
          integral: '+50'
        }, {
          name: '每日签到',
          time: '2022-05-13 08:40:57',
          color: 'blue--dark',
          integral: '+10'
        }, {
          name: '每日签到',
          time: '2022-05-12 08:22:21',
          color: 'blue--dark',
          integral: '+10'
        }, {
          name: '每日签到',
          time: '2022-05-06 22:06:36',
          color: 'blue--dark',
          integral: '+10'
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
  
  /* 顶部背景图 start */
  .top-backgroup {
    height: 450rpx;
    z-index: -1;
  
    .backgroud-image {
      width: 100%;
      height: 450rpx;
      // z-index: -1;
    }
  }
  /* 顶部背景图 end */
  
  /* 页面 start*/
  .integral-shadow{
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  .integral-wrap {
    position: relative;
    z-index: 1;
    margin-top: -420rpx;
  }
  /* 页面 end*/
  
  /* 翘边阴影*/
  .shadow-warp {
  	position: relative;
  	box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, 0.01);
  }
  
  .shadow-warp:before,
  .shadow-warp:after {
  	position: absolute;
  	content: "";
  	top: 20rpx;
  	bottom: 30rpx;
  	left: 20rpx;
  	width: 50%;
  	box-shadow: 0 30rpx 20rpx rgba(0, 0, 0, 0.2);
  	transform: rotate(-3deg);
  	z-index: -1;
  }
  
  .shadow-warp:after {
  	right: 20rpx;
  	left: auto;
  	transform: rotate(3deg);
  }
  
  /* 图标容器1 start */
  .icon1 {
    &__item {
      // width: 30%;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      padding: 30rpx;
      margin: 20rpx 10rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;
  
      &--icon {
        width: 50rpx;
        height: 50rpx;
        font-size: 30rpx;
        border-radius: 50%;
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
  
  /* 图标容器1 end */
  
  /* 波浪*/
  @keyframes move_wave {
      0% {
          transform: translateX(0) translateZ(0) scaleY(1)
      }
      50% {
          transform: translateX(-25%) translateZ(0) scaleY(1)
      }
      100% {
          transform: translateX(-50%) translateZ(0) scaleY(1)
      }
  }
  .tnwave {
      overflow: hidden;
      position: absolute;
      z-index: 0;
      height: 200rpx;
      left: 0;
      right: 0;
      top: 290rpx;
      bottom: auto;
  }
  .waveWrapperInner {
      position: absolute;
      width: 100%;
      overflow: hidden;
      height: 100%;
  }
  .wave {
      position: absolute;
      left: 0;
      width: 200%;
      height: 100%;
      background-repeat: repeat no-repeat;
      background-position: 0 bottom;
      transform-origin: center bottom;
  }
  
  .bgTop {
      opacity: 0.4;
  }
  .waveTop {
      background-size: 50% 45px;
  }
  .waveAnimation .waveTop {
    animation: move_wave 4s linear infinite;
  }
  
  .bgMiddle {
      opacity: 0.6;
  }
  .waveMiddle {
      background-size: 50% 40px;
  }
  .waveAnimation .waveMiddle {
      animation: move_wave 3.5s linear infinite;
  }
  
  .bgBottom {
      opacity: 0.95;
  }
  .waveBottom {
      background-size: 50% 35px;
  }
  .waveAnimation .waveBottom {
      animation: move_wave 2s linear infinite;
  }
  /* 波浪*/

  
  /* 间隔线 start*/
  .tn-strip-bottom-min {
    width: 100%;
    border-bottom: 1rpx solid #F8F9FB;
  }
  
  .tn-strip-bottom {
   width: 100%;
   border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
  }
   /* 间隔线 end*/
</style>
