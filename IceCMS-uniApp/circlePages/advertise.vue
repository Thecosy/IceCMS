<template>
  <view class="template-advertise">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back tn-navbg'
        @click="goBack">
        <text class='icon tn-icon-home-smile-fill'></text>
      </view>
    </tn-nav-bar>
    
    <!-- <view :style="{paddingTop: `${topInfo.height}px`}"></view> -->
    
    <view class="banner">
      
      <swiper class="card-swiper" :circular="true"
        :autoplay="true" duration="500" interval="5000" @change="cardSwiper"> 
        <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
          <view class="swiper-item image-banner">
            <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
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
    <!-- <view class="tn-padding" >
      <view class="tn-text-bold tn-text-xl tn-padding-top-sm">
        创新设计·全球首发
      </view>
      <view class="tn-padding-top-sm">
        <text class="tn-color-black tn-text-bold">北北</text>
        <text class="tn-color-grey tn-padding-left-sm">2022-05-21 10:03:45</text>
        <text class="tn-padding-left tn-color-indigo--dark" >投诉</text>
      </view>
    </view> -->
    
    <view class="adver-wrap tn-bg-white">
      <view class="tn-flex tn-flex-row-between tn-padding-top-lg" @tap="showLandscape">
        <view class="tn-flex-3 tn-padding tn-margin-left-sm">
          <view class="tn-flex">
            <view class="tn-flex tn-flex-row-center tn-flex-col-center">
              <view class="tn-padding-right tn-text-ellipsis tn-text-left">
                <view class="tn-padding-right tn-color-black tn-text-bold tn-text-xxl">
                  让我们一同探索未知
                </view>
                <view class="tn-padding-right tn-padding-top tn-text-df">一同前往无限可能</view>
              </view>
            </view>
          </view>
        </view>
        
        <view class="tn-flex-1 justify-content-item tn-padding tn-text-center">
          <view class="">
            <text class="tn-icon-qr-code" style="font-size: 70rpx;"></text>
          </view>
          <view class=" tn-padding-top-xs">
            探 索
          </view>
        </view>
      </view>
      
      <view class="detail-img tn-padding">
        <image src='https://resource.tuniaokj.com/images/advertise/1.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/2.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/3.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/4.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/5.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/tabbar1.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/tabbar2.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/tabbar3.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/tabbar4.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/tabbar5.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/7.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/8.jpg' mode='widthFix' class=''></image>
        <image src='https://resource.tuniaokj.com/images/advertise/10.jpg' mode='widthFix' class=''></image>
      </view>
      
    </view>
    
    
    
    <view id="top-info" class="tn-footerfixed tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-safe-area-inset-bottom dd-glass" :style="{transform: `translateY(${topInfoTranslateY}px)`}" @click="showModal">
      <view class="justify-content-item tn-padding-bottom">
        <view class="tn-flex tn-flex-col-center tn-flex-row-left">
          <view class="user-pic">
            <view class="user-image">
              <view class="tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg');width: 100rpx;height: 100rpx;background-size: cover;">
              </view>
            </view>
          </view>
          <view class="tn-padding-right tn-color-black">
            <view class="tn-padding-right tn-padding-left-sm">
              <text class="tn-text-lg tn-text-bold">IceCMS北北</text>
              <text class="tn-padding-left-sm">打杂UI</text>
            </view>
            <view class="tn-padding-right tn-padding-top-xs tn-padding-left-sm tn-text-ellipsis">
              <text class="tn-color-blue--dark tn-text-bold">抓住那只猪科技有限公司</text>
            </view>
          </view>
        </view>
      </view>
      <view class="justify-content-item tn-flex-col-center tn-flex-row-center tn-text-center tn-padding-bottom">
        <view class="">
          <text class="tn-icon-wechat-fill tn-color-green--dark" style="font-size: 50rpx;"></text>
        </view>
        <view class="">
          <text class="tn-text-sm">加微信</text>
        </view>
      </view>
    </view>
    
    <tn-modal v-model="show1" :custom="true">
      <view class="custom-modal-content">
        <image @tap="previewQRCodeImage" src='https://resource.tuniaokj.com/images/advertise/qrcode.jpg' mode='aspectFill' style="width: 100%;"></image>
        <view class="tn-text-center tn-padding-top">作者微信：tnkewo</view>
        <view class="tn-text-center tn-padding-top tn-text-lg">点击上图，可识别微信二维码</view>
      </view>
    </tn-modal>
    
    <!-- 压屏窗-->
    <tn-landscape :show="show2" @close="closeLandscape">
      <view class="tn-text-center" @click="navTuniaoUI">
        <image src="https://resource.tuniaokj.com/images/landscape/2022-new-year.png" mode="widthFix"></image>
        <text class="tn-text-lg tn-color-white tn-padding-top-lg">—— IceCMSUI，2022年已上线 ——</text>
      </view>
    </tn-landscape>
        
    <!-- <view class='tn-tabbar-height'></view> -->
    
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'templateAdvertise',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          title: 'BUG再多',
          name: '也别忘了',
          text: '我无限续杯',
          url: 'https://resource.tuniaokj.com/images/shop/cup1.jpg',
        }, {
          id: 1,
          type: 'image',
          title: 'IceCMS南南',
          name: '欢迎加入东东们',
          text: '如果你也有不错的作品',
          url: 'https://resource.tuniaokj.com/images/swiper/read.jpg',
        }, {
          id: 2,
          type: 'image',
          title: 'IceCMS西西',
          name: '一起玩转scss',
          text: '用最少的代码做最骚的效果',
          url: 'https://resource.tuniaokj.com/images/swiper/deer.jpg',
        }, {
          id: 3,
          type: 'image',
          title: 'IceCMS北北',
          name: '微信号 tnkewo',
          text: '商业合作请联系作者',
          url: 'https://resource.tuniaokj.com/images/swiper/swiper3.jpg',
        }, {
          id: 4,
          type: 'image',
          title: 'IceCMS猪猪',
          name: '努力成为大佬',
          text: '一起加油吖',
          url: 'https://resource.tuniaokj.com/images/shop/banner2.jpg',
        }],
        
        show1: false,
        
        show2: false,
        maskCloseable: true,
        
        topInfo: {
          height: 0,
        },
        topInfoTranslateY: 0,
        prevScrollTop: 0
      }
    },
    onLoad() {
      
    },
    onReady() {
      this.getTopInfoRect()
    },
    onPageScroll(e) {
      this.handlePageScroll(e.scrollTop)
    },
    methods: {
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
      // 预览作者图片
      previewQRCodeImage() {
        wx.previewImage({
          urls: ['https://resource.tuniaokj.com/images/advertise/qrcode.jpg']
        })
      },
      // 获取顶部销售信息容器相关信息
      getTopInfoRect() {
        this._tGetRect('#top-info').then((res) => {
          if (!res) {
            setTimeout(() => {
              this.getTopInfoRect()
            }, 50)
            return
          }
          this.topInfo.height = res.height
        })
      },
      // 处理页面滚动事件
      handlePageScroll(scrollTop) {
        console.log(scrollTop);
        if (this.prevScrollTop > scrollTop) {
         
         // 内容下滑，即手指从下往上滚
         this.topInfoTranslateY = 0
        } else {
        // 内容上滑，即手指从上往下滚
          if (scrollTop > this.topInfo.height) {
            this.topInfoTranslateY = this.topInfo.height
          }

        }
        
        this.prevScrollTop = scrollTop
      },
      
      // 弹出模态框
      showModal(event) {
        this.openModal()
      },
      // 打开模态框
      openModal() {
        this.show1 = true
      },
      
      // 弹出压屏窗
      showLandscape() {
        this.openLandscape()
      },
      // 打开压屏窗
      openLandscape() {
        this.show2 = true
      },
      // 关闭压屏窗
      closeLandscape() {
        this.show2 = false
      },
      
      // 跳转到IceCMSUI
      navTuniaoUI() {
        uni.navigateToMiniProgram({
          appId: 'wxf3d81a452b88ff4b'
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  /* 胶囊*/
  .tn-custom-nav-bar__back {
    width: 36%;
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
    
  }
  
  /* 渐变*/
  .tn-navbg {
      margin: 0; 
      color: #fff; 
      background: linear-gradient(-120deg, #F15BB5, #9A5CE5, #01BEFF, #00F5D4);
      /* background: linear-gradient(-120deg,  #9A5CE5, #01BEFF, #00F5D4, #43e97b); */
      /* background: linear-gradient(-120deg,#c471f5, #ec008c, #ff4e50,#f9d423); */
      /* background: linear-gradient(-120deg, #0976ea, #c471f5, #f956b6, #ea7e0a); */
      background-size: 500% 500%; 
      animation: gradientBG 15s ease infinite; 
  } 
   
  @keyframes gradientBG { 
      0% { 
          background-position: 0% 50%; 
      } 
      50% { 
          background-position: 100% 50%; 
      } 
      100% { 
          background-position: 0% 50%; 
      } 
  }
  
  /* 内容 */
  .adver-wrap {
    position: relative;
    z-index: 1;
    // padding: 20rpx 30rpx;
    margin-top: 700rpx;  
    border-radius: 80rpx 80rpx 0 0;
  }
  
  /* 毛玻璃*/
  .dd-glass {
     width: 100%;
     backdrop-filter: blur(20rpx);
    -webkit-backdrop-filter: blur(20rpx);
  }
  
  
  /* 用户头像 start */
  .user-image {
    width: 90rpx;
    height: 90rpx;
    position: relative;
  }
  
  .user-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    border-radius: 50%;
    overflow: hidden;
    background-color: #FFFFFF;
  }
  
  /* 富文本图示意 start */
  .detail-img {
    z-index: -1;
    padding-bottom: 40rpx;
  
    image {
      width: 100%;
      margin: 20rpx 0;
      // height: 3373rpx;
      // z-index: -1;
    }
  }
  
  
  .banner{
    position: fixed;
    top: 0;
    width: 100%;
    transition: all 0.25s ease-out;
    will-change: transform;
    z-index: -1;
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
    
  .card-swiper swiper-item .swiper-item-text {
    margin-top: -320rpx;
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
    margin-top: -380rpx;
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
    top: -150rpx;
    margin: 0 8rpx !important;
    position: relative;
  }
  
  .spot.active{
    opacity: 1;
    width: 30rpx;
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
    will-change: transform;
    z-index: 100;
  }
  
 
</style>
