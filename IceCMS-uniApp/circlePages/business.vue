<template>
  <view class="template-business tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    <view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <swiper class="card-swiper tn-margin-top-sm" :circular="true"
        :autoplay="true" duration="500" interval="5000" previous-margin="75rpx" next-margin="75rpx" @change="cardSwiper"> 
        <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
          <!-- <view class="swiper-item image-banner">
            <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
          </view> -->
          
          <view class="swiper-item image-banner tn-shadow-blur" :style="'background-image:url('+ item.url + ');background-size: cover;border-radius: 15rpx;'">
          </view>
          
          <view class="swiper-item-text">
            <view class="tn-text-xxl tn-text-bold tn-color-white">{{item.title}}</view>
            <view class="tn-text-bold tn-color-white tn-padding-top-xs" style="font-size: 60rpx;">{{item.name}}</view>
            <view class="tn-text-sm tn-text-bold tn-color-white tn-padding-top-sm tn-padding-bottom-sm">{{item.text}}</view>
          </view>
        </swiper-item>
      </swiper>
      <view class="indication">
          <block v-for="(item,index) in swiperList" :key="index">
              <view class="spot" :class="cardCur==index?'active':''"></view>
          </block>
      </view>
      
    </view>
    
    
    <!-- 方式5 start-->
          <view class="tn-flex tn-margin-sm">
            <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
              <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" style="background-image: url(https://resource.tuniaokj.com/images/icon/1.jpg);background-size:100% 100%;">
                </view>
                <view class="tn-color-black tn-text-center">
                  <text class="tn-text-ellipsis">求职招聘</text>
                </view>
              </view>
            </view>
            <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
              <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" style="background-image: url(https://resource.tuniaokj.com/images/icon/2.jpg);background-size:100% 100%;">
                </view>
                <view class="tn-color-black tn-text-center">
                  <text class="tn-text-ellipsis">考研学习</text>
                </view>
              </view>
            </view>
            <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
              <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" style="background-image: url(https://resource.tuniaokj.com/images/icon/3.jpg);background-size:100% 100%;">
                </view>
                <view class="tn-color-black tn-text-center">
                  <text class="tn-text-ellipsis">名片王者</text>
                </view>
              </view>
            </view>
            <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
              <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" style="background-image: url(https://resource.tuniaokj.com/images/icon/4.jpg);background-size:100% 100%;">
                </view>
                <view class="tn-color-black tn-text-center">
                  <text class="tn-text-ellipsis">扫名片码</text>
                </view>
              </view>
            </view>
          </view>
          <!-- 方式5 end-->
          
          
    <view class='nav-list tn-margin-bottom tn-margin-top'>
      
      <block v-for="(item, index) in list1" :key="index">
        <view class="nav-list-item tn-shadow-blur tn-cool-bg-image" :class="['tn-main-gradient-' + item.color + '--light']">
          <view class="nav-link">
            <view class='title tn-text-bold' style="color: #080808;">{{ item.title }}</view>
            <view class='join tn-color-grey tn-text-sm clamp-text-2'>{{ item.content }}</view>
          </view>
          <view class="icon tn-shadow-blur" :class="['tn-bg-' + item.color]" style="opacity: 0.5;">
            <!-- <view class="" :class="['tn-icon-' + item.icon]"></view> -->
          </view>
          <view class="icon17__item--icon icon tn-flex tn-flex-row-center tn-flex-col-center"
          :style="'background-image:url('+ item.url + ');background-size:100% 100%;'">
          </view>
        </view>
      </block>
      
    </view>      
    
     
     <!-- <view class="background">
       <image src="https://resource.tuniaokj.com/images/gravity/1/5.png"></image>
     </view> -->
     
     <!-- 保留 -->
     <!-- <view class="item__1 item__animation" :style="{transform: `translateX(${translateInfo[0].x}rpx)`}">
       <image src="https://resource.tuniaokj.com/images/gravity/1/1.png" mode="widthFix"></image>
     </view> -->
     
     <!-- <view class="item__2 item__animation" :style="{transform: `translateX(${translateInfo[1].x}rpx)`}" @longtap.stop="toggleDirection">
       <image src="https://resource.tuniaokj.com/images/gravity/1/2.png" mode="widthFix"></image>
     </view> -->
     
     <!-- 保留 -->
    <!-- <view class="item__3 item__animation" :style="{transform: `translateX(${translateInfo[2].x}rpx)`}">
       <image src="https://resource.tuniaokj.com/images/gravity/1/3.png" mode="widthFix"></image>
     </view> -->
     
    <!-- <view class="item__4 item__animation" :style="{transform: `translateX(${translateInfo[3].x}rpx)`}">
       <image src="https://resource.tuniaokj.com/images/gravity/1/4.png" mode="widthFix"></image>
     </view> -->
     
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateBusiness',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          title: '海量分享',
          name: '总有你想不到的创意',
          text: '用最少的代码做最骚的效果',
          url: 'https://resource.tuniaokj.com/images/swiper/adno4.jpg',
        }, {
          id: 1,
          type: 'image',
          title: '愉快玩耍',
          name: '寻找一起成长的小伙伴',
          text: '欢迎加入东东们',
          url: 'https://resource.tuniaokj.com/images/swiper/adno2.jpg',
        }, {
          id: 2,
          type: 'image',
          title: '酷炫多彩',
          name: '更多彩蛋等你探索',
          text: '开启全新的探索之旅',
          url: 'https://resource.tuniaokj.com/images/swiper/adno5.jpg',
        }, {
          id: 3,
          type: 'image',
          title: '悄悄开源',
          name: '商业合作请联系作者',
          text: '微信号 tnkewo',
          url: 'https://resource.tuniaokj.com/images/swiper/adno3.jpg',
        }],
        
        list1: [
          {
            icon: 'honor-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            color: 'purple'
          },
          {
            icon: 'count-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
            color: 'purplered'
          },
          {
            icon: 'gloves-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
            color: 'bluepurple'
          },
          {
            icon: 'trusty-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
            color: 'red'
          },
          {
            icon: 'hardware-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            color: 'aquablue'
          },
          {
            icon: 'baby-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
            color: 'orangered'
          },
          {
            icon: 'safe-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            color: 'blue'
          },
          {
            icon: 'flag-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
            color: 'orange'
          },
          {
            icon: 'topics-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
            color: 'indigo'
          },
          {
            icon: 'light-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            color: 'orangeyellow'
          },
          {
            icon: 'hardware-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            color: 'cyan'
          },
          {
            icon: 'baby-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
            color: 'yellow'
          },
          {
            icon: 'safe-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            color: 'teal'
          },
          {
            icon: 'flag-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
            color: 'lime'
          },
          {
            icon: 'topics-fill',
            title: '蔡北北',
            content: '菜的一撇的北北，前端是真的菜吖',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
            color: 'green'
          },
          {
            icon: 'light-fill',
            title: '蔡北北',
            content: '会员大佬催着上线了，懒得造文案了',
            url: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            color: 'yellowgreen'
          }
        ],
        
        /* 重力*/
        acceleronmeterX: 0,
        acceleronmeterY: 0,
        acceleronmeterZ: 0,
        translateInfo: [
          {max: 60, min: -60, speed: 0.8, x: 0},
          {max: 45, min: -45, speed: 0.6, x: 0},
          {max: 33.75, min: -33.75, speed: 0.45, x: 0},
          {max: 25.31, min: -25.31, speed: 0.3375, x: 0}
        ],
        positiveDirection: true
      }
    },
    onLoad() {
      this.initAccelerometer()
    },
    onUnload() {
      this.stopAccelerometer()
    },
    methods: {
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
      
      // 初始化加速度并设置监听函数
      initAccelerometer() {
        uni.onAccelerometerChange(this.listenerAccelerometerData)
      },
      // 停止监听加速度数据
      stopAccelerometer() {
        uni.stopAccelerometer()
      },
      listenerAccelerometerData(res) {
        // console.log(res.x, res.y, res.z);
        this.acceleronmeterX = res.x.toFixed(2)
        this.acceleronmeterY = res.y.toFixed(2)
        this.acceleronmeterZ = res.z.toFixed(2)
        
        // let acceleronmeterX = Math.abs(this.acceleronmeterX) > 0.05 ? this.acceleronmeterX < 0 ? -0.05 : 0.05 : this.acceleronmeterX
        
        // if (acceleronmeterX < 0) {
        //   for (let index in this.translateInfo) {
        //     let item = this.translateInfo[index]
        //     const x = item.speed * Math.abs(acceleronmeterX)
        //     item.x = item.x + x > item.max ? item.max : item.x + x
        //     this.$set(this.translateInfo, index, item)
        //   }
        // } else if (acceleronmeterX > 0) {
        //   for (let index in this.translateInfo) {
        //     let item = this.translateInfo[index]
        //     const x = item.speed * acceleronmeterX
        //     item.x = item.x - x < item.min ? item.min : item.x - x
        //     this.$set(this.translateInfo, index, item)
        //   }
        // }
        
        if (this.positiveDirection) {
          if (this.acceleronmeterX > 0) {
            // 手机向左倾斜，图像向左移动
            this.translateRightMove()
          } else if (this.acceleronmeterX < 0) {
            // 手机向右倾斜，图像向右移动
            this.translateLeftMove()
          }
        } else {
          if (this.acceleronmeterX < 0) {
            // 手机向左倾斜，图像向左移动
            this.translateRightMove()
          } else if (this.acceleronmeterX > 0) {
            // 手机向右倾斜，图像向右移动
            this.translateLeftMove()
          }
        }
      },
      // 长按切换移动方向
      toggleDirection() {
        this.positiveDirection = !this.positiveDirection
      },
      // 向左移动
      translateLeftMove() {
        for (let index in this.translateInfo) {
          let item = this.translateInfo[index]
          // 计算当前图片位置和允许移动的边距距离
          const distance = Math.abs(item.min - item.x)
          const x = item.speed * (distance / 2)
          item.x = item.x - x < item.min ? item.min : item.x - x
          this.$set(this.translateInfo, index, item)
        }
      },
      // 向右移动
      translateRightMove() {
        for (let index in this.translateInfo) {
          let item = this.translateInfo[index]
          // 计算当前图片位置和允许移动的边距距离
          const distance = Math.abs(item.max - item.x)
          const x = item.speed * (distance / 2)
          item.x = item.x + x > item.max ? item.max : item.x + x
          this.$set(this.translateInfo, index, item)
        }
      }
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
      height: 400rpx !important;
    }
      
    .card-swiper swiper-item {
      width: 600rpx !important;
      box-sizing: border-box;
      padding: 0rpx 0rpx 40rpx 0rpx;
      overflow: initial;
    }
    
    .card-swiper swiper-item .swiper-item {
      width: 100%;
      display: block;
      height: 100%;
      border-radius: 10rpx;
      transform: scale(0.85);
      transition: all 0.2s ease-in 0s;
      will-change: transform;
      // 图片背景阴影形式不能要这个
      // overflow: hidden;
    }
    
    .card-swiper swiper-item.cur .swiper-item {
      transform: none;
      transition: all 0.2s ease-in 0s;
      will-change: transform;
    }
      
    .card-swiper swiper-item .swiper-item-text {
      text-align: center;
      margin-top: -220rpx;
      width: 100%;
      display: block;
      height: 70%;
      border-radius: 10rpx;
      transform: translate(0rpx, -60rpx) scale(0.8);
      transition: all 0.6s ease 0s;
      will-change: transform;
      overflow: hidden;
    }
      
    .card-swiper swiper-item.cur .swiper-item-text {
      text-align: center;
      margin-top: -280rpx;
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
      height: 100%;
    }
    
    /* banner start */
    .banner-image {
      height: 500rpx;
      position: relative;
    }
    
    .banner-pic {
      background-size: cover;
      background-repeat: no-repeat;
      // background-attachment:fixed;
      background-position: top;
      box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
      overflow: hidden;
      // background-color: #FFFFFF;
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
      background-color: #E6E6E6;
      opacity: 0.6;
      width: 10rpx;
      height: 10rpx;
      border-radius: 20rpx;
      top: -20rpx;
      margin: 0 8rpx !important;
      position: relative;
    }
    
    .spot.active{
      opacity: 1;
      width: 30rpx;
      background-color: #FFA726;
    }
    
    
     /* 图标容器5 start */
        .icon5 {
          &__item {
            // width: 30%;
            background-color: #FFFFFF;
            border-radius: 10rpx;
            padding: 0rpx;
            margin: 0rpx;
            transform: scale(1);
            transition: transform 0.3s linear;
            will-change: transform;
            transform-origin: center center;
            
            &--icon {
              width: 100rpx;
              height: 100rpx;
              border-radius: 50%;
              margin-bottom: 18rpx;
              position: relative;
              z-index: 1;
            }
          }
        }
    
    /* 图标容器5 start */
       .icon17 {
         &__item {
           // width: 30%;
           background-color: #FFFFFF;
           border-radius: 10rpx;
           padding: 0rpx;
           margin: 0rpx;
           transform: scale(1);
           transition: transform 0.3s linear;
           will-change: transform;
           transform-origin: center center;
           
           &--icon {
             width: 90rpx;
             height: 90rpx;
             border-radius: 50%;
             margin-bottom: 18rpx;
             position: relative;
             z-index: 1;
           }
         }
       }    
        
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
            margin-top: 80rpx;
            text-align: center;
          }
          .join {
            color: #FFFFFF;
            margin-top: 30rpx;
            margin-bottom: 40rpx;
            padding: 10rpx;
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
    
    /* 重力*/
    .item {
      &__1 {
        position: absolute;
        top: 210rpx;
        left: 84rpx;
        width: 100%;
        // height: 100%;
        z-index: 5;
      }
      
      &__2 {
        position: absolute;
        top: 885rpx;
        left: 84rpx;
        width: 100%;
        // height: 100%;
        z-index: 4;
      }
      
      &__3 {
        position: absolute;
        top: 138rpx;
        left: 88rpx;
        width: 100%;
        // height: 100%;
        z-index: 3;
      }
      
      &__4 {
        position: absolute;
        top: 390rpx;
        left: 84rpx;
        width: 100%;
        // height: 100%;
        z-index: 2;
      }
      
      &__animation {
        transition: transform 0.6s ease;
        will-change: transform;
      }
    }
</style>
