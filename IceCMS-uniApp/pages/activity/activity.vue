<template>
  <view class="template-activity tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <!-- <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'>
        <text class='icon tn-icon-notice'></text>
        <text class='icon tn-icon-caring'></text>
      </view>
    </tn-nav-bar> -->
    
    <view class="top-backgroup">
      <image src='https://resource.tuniaokj.com/images/index_bg/tuniao2.jpg' mode='widthFix' class='backgroud-image'></image>
    </view>
    
    <swiper class="card-swiper" :circular="true"
      :autoplay="false" duration="500" interval="5000" previous-margin="170rpx" next-margin="170rpx" @change="cardSwiper"  style="margin-top: -280rpx;"> 
      <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
        <!-- <view class="swiper-item image-banner">
          <image :src="item.url" mode="widthFix" v-if="item.type=='image'"></image>
        </view> -->
        <!-- <view class="swiper-item image-banner" :style="'background-image:url('+ item.url + ');width: 230rpx;height: 100%;background-size:100% 100%;'">
        </view> -->
        
        <view class="tnphone-white-min swiper-item  wow fadeInLeft2">
        	<view class="skin wow fadeInRight2">
        	  <view class="screen wow fadeInUp2">
        		  <!-- <view class="head">
        			  <text>{{item.name}}</text>
        		  </view> -->
        		  <view class="peak wow">
        			  <view class="sound"></view>
        			  <view class="lens"></view>
        		  </view>
        		  <!-- <view class="area-l">
        			  <view class="">
                  <text class="tn-icon-all"></text>
                  <text class="tn-icon-wifi tn-padding-left-xs"></text>
        			  </view>
        		  </view>
        		  <view class="area-r">
        			  <view class="">
                  <text class="tn-icon-light"></text>
                  <text class="tn-icon-time tn-padding-left-xs"></text>
                </view>
        		  </view> -->
              <!-- <view class="talk"></view> -->
              
              <view class="image-banner">
                <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
              </view>
        
        		</view>
        	</view>
        </view>
      </swiper-item>
    </swiper>
    
    <!-- <swiper class="card-swiper" :circular="true"
      :autoplay="true" duration="500" interval="5000" @change="cardSwiper"  style="margin-top: -80rpx;"> 
      <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
        <view class="swiper-item image-banner" :style="'background-image:url('+ item.url + ');width: 230rpx;height: 100%;background-size:100% 100%;'">
        </view>
      </swiper-item>
    </swiper>
    <view class="indication">
        <block v-for="(item,index) in swiperList" :key="index">
            <view class="spot" :class="cardCur==index?'active':''"></view>
        </block>
    </view> -->
    
    <!-- 方式4 start-->
    <view class="tn-flex">
      <view class="tn-flex-1 tn-padding-sm tn-radius" @click="tn('/activityPages/planet')">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon4__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur">
            <view class="tn-icon-discover-planet-fill tn-cool-color-icon4 tn-cool-bg-color-5"></view>
          </view>  
          <view class="tn-color-gray--dark tn-text-center">
            <text class="tn-text-ellipsis">知识星球</text>
          </view>
        </view>
      </view>
      <view class="tn-flex-1 tn-padding-sm tn-radius" @click="tn('/activityPages/project')">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon4__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur">
            <view class="tn-icon-trophy-fill tn-cool-color-icon4 tn-cool-bg-color-15"></view>
          </view>  
          <view class="tn-color-gray--dark tn-text-center">
            <text class="tn-text-ellipsis">开源项目</text>
          </view>
        </view>
      </view>
      <view class="tn-flex-1 tn-padding-sm tn-radius" @click="tn('/activityPages/map')">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon4__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur">
            <view class="tn-icon-map-fill tn-cool-color-icon4 tn-cool-bg-color-8"></view>
          </view>  
          <view class="tn-color-gray--dark tn-text-center">
            <text class="tn-text-ellipsis">地图打卡</text>
          </view>
        </view>
      </view>
      <view class="tn-flex-1 tn-padding-sm tn-radius" @click="tn('/activityPages/study')">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon4__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur">
            <view class="tn-icon-creative-fill tn-cool-color-icon4 tn-cool-bg-color-3"></view>
          </view>  
          <view class="tn-color-gray--dark tn-text-center">
            <text class="tn-text-ellipsis">课程学习</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 方式4 end-->
    
    <view class="tn-margin-top-lg">
      <view class="nav_title--wrap">
        <view class="nav_title tn-cool-bg-color-15">
          <text class="tn-icon-star tn-padding-right-sm"></text>
            工 / 具 / 集 / 合
          <text class="tn-icon-star tn-padding-left-sm"></text>
        </view>
      </view>
    </view>
    
    <view class='nav-list tn-margin-bottom tn-margin-top'>
      
      <block v-for="(item, index) in list1" :key="index">
        <view class="nav-list-item tn-shadow-blur tn-cool-bg-image" :class="['tn-main-gradient-' + item.color + '--light']">
          <view class="nav-link">
            <view class='title tn-text-bold' style="color: #080808;">{{ item.title }}</view>
            <view class='join tn-color-grey tn-text-sm'>{{ item.join }} 人参与</view>
          </view>
          <view class="icon tn-shadow-blur" :class="['tn-bg-' + item.color]">
            <view class="" :class="['tn-icon-' + item.icon]"></view>
          </view>
        </view>
      </block>
      
    </view>
    
    <view class="tn-margin-top-lg">
      <view class="nav_title--wrap">
        <view class="nav_title tn-cool-bg-color-15">
          <text class="tn-icon-star tn-padding-right-sm"></text>
          友 / 情 / 链 / 接
          <text class="tn-icon-star tn-padding-left-sm"></text>
        </view>
      </view>
    </view>
    
    <view class='nav-list tn-margin-bottom tn-margin-top'>
      
      <navigator class="nav-list-item tn-shadow-blur tn-cool-bg-image" :class="['tn-main-gradient-' + item.color + '--light']" target="miniProgram" :app-id="item.appid" :path="item.path" version="release" delta="1" hover-class="none" v-for="(item, index) in linksData" :key="index">
        <view class="nav-link">
          <view class='title tn-text-bold' style="color: #080808;">{{ item.title }}</view>
          <view class='join tn-color-grey tn-text-sm'>{{ item.join }} 人查看</view>
        </view>
        <view class="icon tn-shadow-blur" :class="['tn-bg-' + item.color]">
          <view class="" :class="['tn-icon-' + item.icon]"></view>
        </view>  
      </navigator>
      
    </view>
    
    
    <view class='tn-tabbar-height'></view>
    
  </view>
</template>

<script>
  export default {
    name: 'Discovery',
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/index_bg/pro1.jpg',
        }, {
          id: 1,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/index_bg/pro2.jpg',
        }, {
          id: 2,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/index_bg/pro3.jpg',
        }, {
          id: 3,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/index_bg/pro4.jpg',
        },{
          id: 4,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/index_bg/pro5.jpg',
        },{
          id: 5,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/index_bg/pro6.jpg',
        }],
        list1: [
          {
            icon: 'honor-fill',
            title: '称呼计算器',
            join: '629',
            color: 'blue'
          },
          {
            icon: 'count-fill',
            title: '支付宝语音生成',
            join: '268',
            color: 'purplered'
          },
          {
            icon: 'gloves-fill',
            title: '一周天气预报',
            join: '332',
            color: 'cyan'
          },
          {
            icon: 'trusty-fill',
            title: '今日星座运势',
            join: '106',
            color: 'orangeyellow'
          },
          {
            icon: 'hardware-fill',
            title: '来碗毒鸡汤',
            join: '98',
            color: 'indigo'
          },
          {
            icon: 'baby-fill',
            title: '垃圾分一分',
            join: '57',
            color: 'red'
          },
          {
            icon: 'safe-fill',
            title: '手持弹幕',
            join: '76',
            color: 'green'
          },
          {
            icon: 'flag-fill',
            title: '孩子取名',
            join: '225',
            color: 'orange'
          },
          {
            icon: 'topics-fill',
            title: '午餐吃什么',
            join: '422',
            color: 'teal'
          },
          {
            icon: 'light-fill',
            title: '朋友圈文案',
            join: '983',
            color: 'orangered'
          }
        ],
        linksData: [
          {
            icon: 'honor-fill',
            join: '629',
            color: 'purplered',
            url: '',
            title: '司命',
            appid: 'wx734d93edc5b48019',
            path: 'pages/index/index'
          },
          {
            icon: 'count-fill',
            join: '268',
            color: 'blue',
            url: '',
            title: '爱小睡眠',
            appid: 'wx65880bde88b32037',
            path: 'pages/index/index'
          },
          {
            icon: 'gloves-fill',
            join: '332',
            color: 'orangeyellow',
            url: '',
            title: '群友作品',
            appid: '',
            path: 'pages/index/index'
          },
          {
            icon: 'trusty-fill',
            join: '106',
            color: 'cyan',
            url: '',
            title: '群友作品',
            appid: '',
            path: 'pages/index/index'
          },
          {
            icon: 'hardware-fill',
            join: '98',
            color: 'red',
            url: '',
            title: '群友作品',
            appid: '',
            path: 'pages/index/index'
          },
          {
            icon: 'baby-fill',
            join: '57',
            color: 'indigo',
            url: '',
            title: '群友作品',
            appid: '',
            path: 'pages/index/index'
          },
          {
            icon: 'safe-fill',
            join: '76',
            color: 'orange',
            url: '',
            title: '群友作品',
            appid: '',
            path: 'pages/index/index'
          },
          {
            icon: 'flag-fill',
            join: '225',
            color: 'green',
            url: '',
            title: '群友作品',
            appid: '',
            path: 'pages/index/index'
          },
          {
            icon: 'topics-fill',
            join: '422',
            color: 'orangered',
            url: '',
            title: '群友作品',
            appid: '',
            path: 'pages/index/index'
          },
          {
            icon: 'light-fill',
            join: '983',
            color: 'teal',
            url: '',
            title: '表情包制作',
            appid: 'wx096589e82af2ffa5',
            path: 'pages/index/index'
          }
        ],
        
      }
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
    }
  }
</script>

<style lang="scss" scoped>
  .template-activity{
    max-height: 100vh;
  }
  .tn-tabbar-height {
  	min-height: 120rpx;
  	height: calc(140rpx + env(safe-area-inset-bottom) / 2);
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
  
/* .tnphone-white-min 细边框*/
  .tnphone-white-min {width: 380rpx; height: 800rpx; border-radius: 40rpx; background: #E9E5F3; padding: 7rpx; display: table; color: #333;
  	box-sizing: border-box; box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0,0,0,0.15); margin: 70rpx auto; cursor: default; position: relative}
  .tnphone-white-min .skin {width: 100%; height: 100%; border-radius: 40rpx; background: #E9E5F3; padding: 10rpx;}
  .tnphone-white-min .screen {width: 100%; height: 100%; border-radius: 30rpx; background: #E9E5F3; position: relative; overflow: hidden}
  .tnphone-white-min .head {width: 100%; height: 90rpx; text-align: center; position: absolute; padding: 45rpx 15rpx 10rpx 15rpx;}
  .tnphone-white-min .peak {left: 22%;width: 56%; height: 27rpx; margin: -2rpx auto 0rpx; border-radius: 0 0 20rpx 20rpx; background: #E9E5F3; position: absolute}
  .tnphone-white-min .sound {width: 48rpx; height: 6rpx; border-radius: 15rpx; background: #555; position: absolute; left: 50%; top: 50%; margin-left: -24rpx; margin-top: -10rpx;
  	box-shadow: 0rpx 4rpx 4rpx 0rpx #444 inset}
  .tnphone-white-min .lens {width: 6rpx; height: 6rpx; border-radius: 50%; background: #2c5487; position: absolute; left: 50%; top: 50%; margin-left: 34rpx; margin-top: -10rpx}
  .tnphone-white-min .talk {width: 50%; height: 6rpx; border-radius: 15rpx; background: rgba(0,0,0,.3); position: absolute; bottom: 8rpx; left: 50%; margin-left: -25%}
  .tnphone-white-min .area-l,.tnphone-white-min .area-r {width: 70rpx; height: 16rpx; position: absolute; top: 6rpx}
  .tnphone-white-min .area-l {left: 0; text-align: center; font-size: 12rpx; line-height: 22rpx; text-indent: 10rpx; font-weight: 600; padding-left: 20rpx;}
  .tnphone-white-min .area-r {right: 0; text-align: center; font-size: 12rpx; line-height: 22rpx; text-indent: 10rpx; font-weight: 600; padding-right: 20rpx;}
  .tnphone-white-min .fa-feed {float: left; font-size: 12rpx!important; transform:rotate(-45deg); margin-top: 4rpx; margin-right: 8rpx}
  .tnphone-white-min .fa-battery-full {float: left; font-size: 12rpx!important; margin-top: 6rpx}
  .tnphone-white-min .fa-chevron-left {float: left; margin-top: 4rpx}
  .tnphone-white-min .fa-cog {float: right; margin-top: 4rpx}
  .tnphone-white-min .btn01 {width: 3rpx; height: 28rpx; border-radius: 3rpx 0 0 3rpx; background: #222; position: absolute; top: 105rpx; left: -3rpx}
  .tnphone-white-min .btn02 {width: 3rpx; height: 54rpx; border-radius: 3rpx 0 0 3rpx; background: #222; position: absolute; top: 160rpx; left: -3rpx}
  .tnphone-white-min .btn03 {width: 3rpx; height: 54rpx; border-radius: 3rpx 0 0 3rpx; background: #222; position: absolute; top: 230rpx; left: -3rpx}
  .tnphone-white-min .btn04 {width: 3rpx; height: 86rpx; border-radius: 0 3rpx 3rpx 0; background: #222; position: absolute; top: 180rpx; right: -3rpx}

  
  /* 顶部背景图 start */
  .top-backgroup {
    height: 450rpx;
    z-index: -1;
  
    .backgroud-image {
      width: 100%;
      height: 667rpx;
      // z-index: -1;
    }
  }
  /* 顶部背景图 end */
  
  /* 轮播样机样式 start*/
  .card-swiper {
    height: 830rpx !important;
  }
  
  .card-swiper swiper-item {
    width: 260rpx !important;
    // left: 170rpx;
    // width: 380rpx !important;
    // left: 185rpx;
    box-sizing: border-box;
    padding: 0rpx 15rpx 90rpx 15rpx;
    overflow: initial;
  }
  
  .card-swiper swiper-item .swiper-item {
    display: block;
    transform: scale(0.45);
    transition: all 0.2s ease-in 0s;
    overflow: hidden;
  }
  
  .card-swiper swiper-item.cur .swiper-item {
    transform: scale(0.65);
    transition: all 0.2s ease-in 0s;
  }
  
  .image-banner{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-banner image{
    width: 100%;
    height: 770rpx;
    // border: 1rpx solid red;
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
    background-color: #000;
    opacity: 0;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    margin: 0 8rpx !important;
    top: -80rpx;
    position: relative;
  }
  
  .spot.active{
    opacity: 0;
    width: 30rpx;
    background-color: #000;
  }
  
  /* 图标容器4 start */
    .tn-cool-color-icon4{
      // background-image: -webkit-linear-gradient(135deg, #ED1C24, #FECE12);   16
      // background-image: linear-gradient(135deg, #ED1C24, #FECE12);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }
    .icon4 {
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
          width: 110rpx;
          height: 110rpx;
          font-size: 55rpx;
          border-radius: 50%;
          margin-bottom: 18rpx;
          position: relative;
          z-index: 1;
          box-shadow: 0px 10px 30px rgba(70,23,129, 0.12),
            0px -8px 40px rgba(255, 255, 255, 1),
            inset 0px -10px 10px rgba(70,23,129, 0.05),
            inset 0px 10px 20px rgba(255, 255, 255, 1);
        }
      }
    }
    
    /* 标题 start */
    .nav_title {
      -webkit-background-clip: text;
      color: transparent;
      
      &--wrap {
        position: relative;
        display: flex;
        height: 120rpx;
        font-size: 42rpx;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        background-image: url(https://resource.tuniaokj.com/images/title_bg/title44.png);
        background-size: cover;
      }
    }
    /* 标题 end */
    
    /* 组件导航列表 start*/
    .nav-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0rpx 12rpx 0rpx;
      justify-content: space-between;
      
      /* 列表元素 start */
      .nav-list-item {
        padding: 95rpx 30rpx 5rpx 30rpx;
        border-radius: 12rpx;
        width: 45%;
        margin: 0 18rpx 40rpx;
        background-size: cover;
        background-position: center;
        position: relative;
        z-index: 99;
        
        /* 元素标题 start */
        .nav-link {
          font-size: 32rpx;
          text-transform: capitalize;
          padding: 0 0 10rpx 0;
          position: relative;
          
          .title {
            color: #FFFFFF;
            margin-top: 100rpx;
            text-align: center;
          }
          .join {
            color: #FFFFFF;
            margin-top: 20rpx;
            margin-bottom: 40rpx;
            text-align: center;
          }
        }
        /* 元素标题 end */
        
        /* 元素图标 start */
        .icon {
          font-variant: small-caps;
          position: absolute;
          top: 60rpx;
          right: 50rpx;
          left: 37%;
          width: 90rpx;
          height: 90rpx;
          line-height: 90rpx;
          margin: 0;
          padding: 0;
          display: inline-flex;
          text-align: center;
          justify-content: center;
          vertical-align: middle;
          font-size: 50rpx;
          color: #FFFFFF;
          white-space: nowrap;
          opacity: 0.9;
          background-color: rgba(0, 0, 0, 0.05);
          background-size: cover;
          background-position: 50%;
          border-radius: 5000rpx;
          
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
            background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg2.png);
          }
        }
        /* 元素图标 end */
      }
      /* 列表元素 end */
    }
    /* 组件导航列表 end*/
    
</style>
