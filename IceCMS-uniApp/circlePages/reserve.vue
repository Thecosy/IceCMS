<template>
  <view class="template-reserve tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    

    <!-- 页面内容 -->
    <view class="slideshow">
      <view class="slideshow-image" style="background-image: url('https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg')"></view>
      <view class="slideshow-image" style="background-image: url('https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg')"></view>
      <view class="slideshow-image" style="background-image: url('https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg')"></view>
      <view class="slideshow-image" style="background-image: url('https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg')"></view>
    </view>
    
    <view class="reserve tn-safe-area-inset-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="reserve-content tn-padding tn-color-black tn-text-lg dd-glass2" style="margin:71vh 30rpx 20vh 30rpx">
        <view class="tn-text-center tn-text-bold tn-padding-top tn-padding-bottom">
          活动详情
        </view>
        <view class="">
          
          <view class="blogger__desc tn-margin-top-sm tn-margin-bottom-sm tn-text-justify tn-flex-col-center tn-flex-row-left">
            <view class="blogger__desc__label tn-float-left tn-margin-right tn-bg-gray--light tn-round tn-text-sm tn-text-bold">
              <text class="blogger__desc__label--prefix">#</text> 
              <text class="tn-text-df">常回家看看</text>
            </view>
            <!-- 不用限制长度了，因为发布的时候限制长度了-->
            <text class="blogger__desc__content tn-flex-1 tn-text-justify tn-text-df">
               可爱的校友，让我们相约华软，来一场说看就看的木棉雨；通知将于活动前一晚送达，请查收！！
            </text>  
          </view>
          

        </view>
        
        <view class="tn-padding-top-lg">
          集合时间：2022年12月20日 12:00:00
        </view>
        <view class="">
          集合地点：喷泉广场
        </view>
        
        
        
       <!-- <view class="tn-margin-top tn-color-black tn-bg-white tn-radius" >
          <view class="tn-flex tn-flex-row-between tn-flex-col-center">
            <view class="justify-content-item">
              <view class="tn-flex tn-flex-col-center tn-flex-row-left">
                <view class="tn-padding tn-color-black">
                  <view class="tn-padding-right-sm tn-text-lg tn-text-bold clamp-text-1">
                    广东省广州市番禺祈福新村129号
                  </view>
                </view>
              </view>
            </view>
            <view class="tn-flex justify-content-item tn-flex-row-center tn-padding-right-xs">
              <view class="tn-bg-gray--light tn-padding-xs tn-margin-sm tn-color-black tn-round">
                <text class="tn-icon-location-fill" style="font-size: 50rpx;"></text>
              </view>
            </view>
          </view>
        </view> -->
        
        <view class="tn-text-center tn-text-bold tn-padding-top-xl">
          活动参与者
        </view>
        
        <tn-read-more :closeBtn="true" openText="查看更多参与者" openIcon="more-circle" closeText="折叠起来" closeIcon="close" :showHeight="300">
          
          <view class="tn-flex tn-flex-wrap tn-margin-top-xl">
            <block v-for="(item, index) in groupList" :key="index">
              <view class="tn-padding-bottom tn-padding-left" style="width: 20%;">
                <view class="tn-flex tn-flex-row-left tn-flex-col-center" style="">
                  <view class="user-pic">
                    <view class="user-image">
                      <view class="tn-shadow-blur" :style="'background-image:url('+ item.src +');width: 70rpx;height: 70rpx;background-size: cover;'">
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </block>
          </view>

        </tn-read-more>
        
        
      </view>
      
      
      <view class="tn-footerfixed tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-safe-area-inset-bottom dd-glass">
        <view class="justify-content-item tn-padding-bottom">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left">
            <view class="user-pic">
              <view class="user-image">
                <view class="tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg');width: 70rpx;height: 70rpx;background-size: cover;">
                </view>
              </view>
            </view>
          </view>
        </view>
        
        
        <!-- 按钮-->
        <view class="justify-content-item tn-flex-col-center tn-flex-row-center tn-text-center tn-padding-bottom">
          <view class="tn-flex tn-flex-row-between">
            <view class="justify-content-item tn-margin-xs tn-text-center" style="width: 300rpx;">
              <tn-button shape="round" backgroundColor="#00FFC6" padding="40rpx 0" width="90%" shadow fontBold>
                <text class="tn-icon-topic tn-padding-right-xs tn-color-black"></text>
                <text class="tn-color-black">参与活动</text>
              </tn-button>
            </view>
          </view>
        </view>
        
        
        
        <view class="justify-content-item tn-flex-col-center tn-flex-row-center tn-text-center tn-padding-bottom" @click="openLocation">
          <view class="tn-bg-gray--light tn-padding-xs tn-margin-sm tn-color-black tn-round">
            <text class="tn-icon-location-fill" style="font-size: 50rpx;"></text>
          </view>
        </view>
        
      </view>
      
      
    </view>
    
    
    
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateReserve',
    mixins: [template_page_mixin],
    data(){
      return {
        groupList: [
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/shop/cup1.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/shop/watch1.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
          {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
        ]
      }
    },
    methods: {
      openLocation() {
        uni.openLocation({
          longitude: 113.3298396012573,
          latitude: 22.961803525530176,
          name: '祈福新村',
          address: '祈福新村'
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .template-reserve {
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
  
  /* 内容*/
  .reserve{
    position: relative;
    z-index: 99;
  }
  
  .reserve-content{
    background-color: rgba(255,255,255,0.7);
    border-radius: 30rpx;
  }
  
  
  /* 标签 */
    .blogger {
      &__item {
        padding: 30rpx;
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
      }
  
    }
  
  
  /* 文字截取*/
  .clamp-text-1 {
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .clamp-text-2 {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  /* 毛玻璃*/
  .dd-glass {
     width: 100%;
     backdrop-filter: blur(20rpx);
    -webkit-backdrop-filter: blur(20rpx);
  }
  
  /* 毛玻璃*/
  .dd-glass2 {
    // width: 100%;
     backdrop-filter: blur(8rpx);
    -webkit-backdrop-filter: blur(8rpx);
  }
  
  /* 用户头像 start */
  .user-image {
    width: 70rpx;
    height: 70rpx;
    position: relative;
  }
  
  .user-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    border-radius: 100rpx;
    overflow: hidden;
    background-color: #FFFFFF;
  }
  
  /* 底部悬浮按钮 start*/
  .tn-tabbar-height {
  	min-height: 120rpx;
  	height: calc(140rpx + env(safe-area-inset-bottom) / 2);
  }
  .tn-footerfixed {
    position: fixed;
    background-color: rgba(255,255,255,0.5);
    box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
    bottom: 0;
    width: 100%;
    transition: all 0.25s ease-out;
    z-index: 100;
  }
  

  /* 相册 start*/
  .slideshow {
    top: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 0;
  }
  
  .slideshow-image {
    position: absolute;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50%;
    background-size: cover;
    -webkit-animation-name: kenburns;
            animation-name: kenburns;
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
    -webkit-animation-duration: 16s;
            animation-duration: 16s;
    opacity: 1;
    transform: scale(1.2);
  }
  .slideshow-image:nth-child(1) {
    -webkit-animation-name: kenburns-1;
            animation-name: kenburns-1;
    z-index: 3;
  }
  .slideshow-image:nth-child(2) {
    -webkit-animation-name: kenburns-2;
            animation-name: kenburns-2;
    z-index: 2;
  }
  .slideshow-image:nth-child(3) {
    -webkit-animation-name: kenburns-3;
            animation-name: kenburns-3;
    z-index: 1;
  }
  .slideshow-image:nth-child(4) {
    -webkit-animation-name: kenburns-4;
            animation-name: kenburns-4;
    z-index: 0;
  }
  
  @-webkit-keyframes kenburns-1 {
    0% {
      opacity: 1;
      transform: scale(1.2);
    }
    1.5625% {
      opacity: 1;
    }
    23.4375% {
      opacity: 1;
    }
    26.5625% {
      opacity: 0;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
    98.4375% {
      opacity: 0;
      transform: scale(1.2117647059);
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes kenburns-1 {
    0% {
      opacity: 1;
      transform: scale(1.2);
    }
    1.5625% {
      opacity: 1;
    }
    23.4375% {
      opacity: 1;
    }
    26.5625% {
      opacity: 0;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
    98.4375% {
      opacity: 0;
      transform: scale(1.2117647059);
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes kenburns-2 {
    23.4375% {
      opacity: 1;
      transform: scale(1.2);
    }
    26.5625% {
      opacity: 1;
    }
    48.4375% {
      opacity: 1;
    }
    51.5625% {
      opacity: 0;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
  @keyframes kenburns-2 {
    23.4375% {
      opacity: 1;
      transform: scale(1.2);
    }
    26.5625% {
      opacity: 1;
    }
    48.4375% {
      opacity: 1;
    }
    51.5625% {
      opacity: 0;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
  @-webkit-keyframes kenburns-3 {
    48.4375% {
      opacity: 1;
      transform: scale(1.2);
    }
    51.5625% {
      opacity: 1;
    }
    73.4375% {
      opacity: 1;
    }
    76.5625% {
      opacity: 0;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
  @keyframes kenburns-3 {
    48.4375% {
      opacity: 1;
      transform: scale(1.2);
    }
    51.5625% {
      opacity: 1;
    }
    73.4375% {
      opacity: 1;
    }
    76.5625% {
      opacity: 0;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
  @-webkit-keyframes kenburns-4 {
    73.4375% {
      opacity: 1;
      transform: scale(1.2);
    }
    76.5625% {
      opacity: 1;
    }
    98.4375% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
  @keyframes kenburns-4 {
    73.4375% {
      opacity: 1;
      transform: scale(1.2);
    }
    76.5625% {
      opacity: 1;
    }
    98.4375% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
    /* 相册 end*/
</style>
