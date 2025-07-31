<template>
  <view class="template-award">
    <!-- 顶部自定义导航 -->
    <!-- <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar> -->
    
    <!-- 顶部自定义导航2 -->
    <tn-nav-bar fixed customBack :bottomShadow="false" :backgroundColor="navBarBackgroundColor" id="navbar">
      <view slot="back" class='tn-custom-nav-bar__back' @click="goBack" :style="[navBarStyle]">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-discover-fill'></text>
      </view>
      <view class="tn-flex tn-flex-col-center tn-flex-row-center" :style="[navBarStyle2]">
        <view class="tn-text-bold tn-text-xl">红包活动</view>
      </view>
    </tn-nav-bar>
    
    
    <view class="banner">
      
      <swiper class="card-swiper" :circular="true"
        :autoplay="false" duration="500" interval="5000" @change="cardSwiper"> 
        <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
          <view class="swiper-item image-banner">
            <image :src="item.url" mode="widthFix" v-if="item.type=='image'"></image>
          </view>
          <view class="swiper-item-text">
            <view class="tn-text-xl tn-color-white">{{item.title}}</view>
            <view class="tn-text-xl tn-color-white tn-padding-top-xs">{{item.name}}</view>
          </view>
        </swiper-item>
      </swiper>
      <view class="indication">
          <block v-for="(item,index) in swiperList" :key="index">
              <view class="spot" :class="cardCur==index?'active':''"></view>
          </block>
      </view>
    </view>
    
   <view class="adver-wrap tn-shadow tn-margin tn-bg-white">
      <view class="nav_title--wrap tn-padding-top">
        <view class="nav_title tn-cool-bg-color-15">
          <text class="tn-icon-science tn-padding-right-sm tn-text-xxl"></text>
          <text class="tn-text-xl">我获得的红包奖励</text>
          <text class="tn-icon-science tn-padding-left-sm tn-text-xxl"></text>
        </view>
      </view>
      <view class="tn-text-center" style="color: #EF481F;padding: 30rpx 0;">
        <text style="font-size: 110rpx;margin-left: -20rpx;">0.80</text>
        <text class="tn-text-lg tn-text-bold tn-padding-left-xs" style="">元</text>
      </view>
      <view class="tn-text-center tn-color-gray">
        红包可直接抵扣优惠
      </view>
      <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center tn-padding-top tn-padding-bottom-xl">
        <tn-button shape="round" :plain="true" backgroundColor="#EF481F" padding="40rpx 0" width="70%" shadow :fontSize="32">
          <text class="" style="color: #EF481F;">分享给好友赚红包</text>
          <text class="tn-icon-wechat tn-padding-right-xs tn-padding-left-xs" style="color: #EF481F;"></text>
        </tn-button>
      </view>  
    </view>
    
    <view class="tn-shadow tn-margin tn-bg-white" id="page_tips">
      <view class="nav_title--wrap tn-padding-top-sm">
        <view class="nav_title tn-cool-bg-color-15">
          <text class="tn-icon-science tn-padding-right-sm tn-text-xxl"></text>
          <text class="tn-text-xl">如何使用红包</text>
          <text class="tn-icon-science tn-padding-left-sm tn-text-xxl"></text>
        </view>
      </view>
      <view class="screenshot-img">
        <image src='https://cdn.nlark.com/yuque/0/2022/png/280373/1656311438998-assets/web-upload/06ec314b-b02a-4819-9b17-063c3d8c3d1b.png' mode='widthFix' class=''></image>
      </view> 
    </view>
    
    <view class="tn-bg-white" style="border-radius: 40rpx 40rpx 0 0;">
      <view class="nav_title--wrap tn-padding-top-sm">
        <view class="nav_title tn-cool-bg-color-15">
          <text class="tn-icon-science tn-padding-right-sm tn-text-xxl"></text>
          <text class="tn-text-xl">推荐商家</text>
          <text class="tn-icon-science tn-padding-left-sm tn-text-xxl"></text>
        </view>
      </view>
      <block v-for="(item, index) in shop" :key="index">
        <view class="article-shadow tn-margin">
          <view class="tn-flex">
            <view class="image-pic tn-margin-sm" :style="'background-image:url(' + item.userAvatar + ')'">
              <view class="image-article">
              </view>
            </view>
            <view class="tn-margin-sm tn-padding-top-xs" style="width: 100%;">
              <view class="tn-text-lg tn-text-bold clamp-text-1 tn-text-justify">
                {{ item.title }}
              </view>
              <view class="tn-flex tn-flex-row-between tn-flex-col-between tn-padding-top-xs" style="min-height: 50rpx;">
                <view class="justify-content-item tn-text-df">
                  <text class="tn-color-orange tn-icon-star-fill tn-text-justify"></text>
                  <text class="tn-color-orange tn-padding-left-xs">4.6</text>
                  <text class="tn-color-gray tn-padding-left-sm">月销1209</text>
                </view>
                <view class="justify-content-item tn-text-xs tn-bg-orangeyellow" style="border-radius: 20rpx 0 20rpx 0;height: 40rpx;line-height: 40rpx;">
                  <view style="margin: 3rpx 15rpx 5rpx 15rpx;">闪电侠配送</view>
                </view>
              </view>
              
              
              <view class="tn-flex tn-flex-row-between tn-flex-col-between" style="min-height: 55rpx;">
                <view class="justify-content-item tn-padding-top-xs" >
                  <text class="tn-text-xs tn-color-gray clamp-text-1 tn-text-justify">
                    起送价 ￥18.00 | 配送费 ￥1
                  </text>
                </view>
                <view class="justify-content-item tn-padding-top-xs" >
                  <text class="tn-text-xs tn-color-gray clamp-text-1 tn-text-justify">
                    15分钟 | 8814米
                  </text>
                </view>
              </view>
              
              
              <view class="tn-flex">
                <view v-for="(label_item,label_index) in item.label" :key="label_index"
                  class="tn-tag-content__item tn-margin-right tn-round tn-text-sm tn-text-bold" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
                  <text class="tn-tag-content__item--prefix">#</text> {{ label_item }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </block>
      
    </view>

    
    <view id="top-info" class="tn-footerfixed tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-safe-area-inset-bottom dd-glass" :style="{transform: `translateY(${topInfoTranslateY}px)`}">
      <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center tn-padding-bottom">
        <tn-button shape="round" backgroundColor="tn-cool-bg-color-9--reverse" padding="40rpx 0" width="90%" shadow :fontSize="32">
          <text class="tn-color-white">立即分享赚红包</text>
          <text class="tn-icon-wechat tn-padding-right-xs tn-padding-left-xs"></text>
        </tn-button>
      </view>  
    </view>

        
    <view class='tn-tabbar-height'></view>
    
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'templateAward',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          title: '',
          name: '',
          url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1656311246144-assets/web-upload/984344ea-bada-4e41-ad61-a61028cb07b1.jpeg',
        }, {
          id: 1,
          type: 'image',
          title: '',
          name: '',
          url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1656311246144-assets/web-upload/984344ea-bada-4e41-ad61-a61028cb07b1.jpeg',
        }, {
          id: 2,
          type: 'image',
          title: '',
          name: '',
          url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1656311246144-assets/web-upload/984344ea-bada-4e41-ad61-a61028cb07b1.jpeg',
        }],
        
        shop: [{
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
            userName: '可我会像',
            date: '2022年5月20日',
            color: 'red',
            label: ['满20减10','送饮品'],
            title: '仙味麻辣烫·米粉',
            desc: '小程序前端源码，免费开源，欢迎白嫖嗷嗷，可以的话，插件市场三连支持一下',
            mainImage: 'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 567
            },
            collectionCount: 543,
            commentCount: 543,
            likeCount: 206
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userName: '可我会像',
            date: '2022年5月20日',
            color: 'cyan',
            label: ['模型'],
            title: '仙味麻辣烫·米粉',
            desc: '一个拥有大量3D模型的网站',
            mainImage: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 987
            },
            collectionCount: 567,
            commentCount: 69,
            likeCount: 65
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
            userName: '可我会像',
            date: '2022年5月20日',
            color: 'blue',
            label: ['后端开发计'],
            title: '仙味麻辣烫·米粉',
            desc: '你确定你经常更新文章吗？',
            mainImage: 'https://resource.tuniaokj.com/images/shop/computer2.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 321
            },
            collectionCount: 654,
            commentCount: 232,
            likeCount: 543
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
            userName: '可我会像',
            date: '2022年5月20日',
            color: 'green',
            label: ['创意'],
            title: '仙味麻辣烫·米粉',
            desc: '创意灵感从这里开始',
            mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 230
            },
            collectionCount: 987,
            commentCount: 236,
            likeCount: 342
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg',
            userName: '可我会像',
            date: '2022年5月20日',
            color: 'orange',
            label: ['后端开发计'],
            title: '仙味麻辣烫·米粉',
            desc: 'IceCMSUI素材免费可商用',
            mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 106
            },
            collectionCount: 765,
            commentCount: 32,
            likeCount: 91
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/shop/watch1.jpg',
            userName: '可我会像',
            date: '2022年5月20日',
            color: 'purplered',
            label: ['神器'],
            title: '仙味麻辣烫·米粉',
            desc: '神器推荐',
            mainImage: 'https://resource.tuniaokj.com/images/shop/watch1.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 232
            },
            collectionCount: 776,
            commentCount: 48,
            likeCount: 86
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/shop/sticker.jpg',
            userName: '可我会像',
            date: '2022年5月20日',
            color: 'purple',
            label: ['粒子'],
            title: '仙味麻辣烫·米粉',
            desc: '酷炫的小程序粒子效果一览',
            mainImage: 'https://resource.tuniaokj.com/images/shop/sticker.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 456
            },
            collectionCount: 342,
            commentCount: 42,
            likeCount: 76
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userName: '可我会像',
            date: '2022年5月20日',
            color: 'brown',
            label: ['工具'],
            title: '仙味麻辣烫·米粉',
            desc: '二维码生成器',
            mainImage: 'https://resource.tuniaokj.com/images/shop/card.jpg',
            viewUser: {
              latestUserAvatar: [{
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
                },
                {
                  src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
                },
              ],
              viewUserCount: 129
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          }
        ],
        
        show1: false,
        
        topInfo: {
          height: 0,
        },
        topInfoTranslateY: 0,
        prevScrollTop: 0,
        
        /* 导航*/
        navBarRectInfo: {},
        navBarChangebaseLineHeight: 0,
        navBarStyle: {
          color:'#FFFFFF',
          opacity: 1,
          display: 'flex'
        },
        navBarStyle2: {
          color:'rgba(255,255,255,0)',
          opacity: 1,
          display: 'flex'
        },
        navBarBackgroundColor: 'rgba(255, 255, 255, 0)',
        activeBgAnimation: {}
      }
    },
    onLoad() {
      
    },
    onReady() {
      /* 顶部导航*/
      this.$nextTick(() => {
        this.initNavBarRectInfo()
      }),
      /* 底部按钮*/
      this.getTopInfoRect()
    },
    onPageScroll(e) {
      /* 顶部导航*/
      this.updateNavBarRectInfo(),
      /* 底部按钮*/
      this.handlePageScroll(e.scrollTop)
    },
    methods: {
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },

      // 获取顶部信息容器相关信息
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
         
         // 下滑
         this.topInfoTranslateY = 0
        } else {
          // 上滑
          if (scrollTop > this.topInfo.height) {
            this.topInfoTranslateY = this.topInfo.height
          }

        }
        
        this.prevScrollTop = scrollTop
      },

      
      // 初始化导航栏信息
      async initNavBarRectInfo() {
        const navBarRectInfo = await this._tGetRect('#navbar')
        const pageTipsRectInfo = await this._tGetRect('#page_tips')
        // console.log(navBarRectInfo, pageTipsRectInfo, navBarRectInfo?.top, pageTipsRectInfo?.top);
        if (!navBarRectInfo.hasOwnProperty('top') || !pageTipsRectInfo.hasOwnProperty('top')) {
          setTimeout(() => {
            this.initNavBarRectInfo()
          }, 10)
          return
        }
        this.navBarRectInfo = {
          top: navBarRectInfo.top
        }
        this.navBarChangebaseLineHeight = pageTipsRectInfo.top - navBarRectInfo.top
      },
      // 更新导航栏信息
      updateNavBarRectInfo() {
        this._tGetRect('#page_tips').then((res) => {
          const top = res?.top || 0
          if (!top) {
            return
          }
          const differHeight = top - this.navBarRectInfo.top
          const opacity = differHeight / this.navBarChangebaseLineHeight
          if (opacity < 0) {
            // this.navBarStyle.opacity = 1
            // this.navBarStyle.display = 'flex'
            this.navBarStyle.color = 'rgba(0, 0, 0, ${opacity})'
            this.navBarStyle2.color = 'rgba(0, 0, 0, ${opacity})'
            this.navBarBackgroundColor = `rgba(255, 255, 255, 1)`
          } else {
            // this.navBarStyle.opacity = 1 - opacity
            // this.navBarStyle.display = 'flex'
            this.navBarStyle.color = 'rgba(255, 255, 255, 1)'
            this.navBarStyle2.color = 'rgba(255, 255, 255, 0)'
            this.navBarBackgroundColor = `rgba(255, 255, 255, ${1 - opacity})`
          }
          
          // console.log(top, differHeight, opacity);
        })
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
  .adver-wrap {
    position: relative;
    z-index: 1;
    // padding: 20rpx 30rpx;
    margin-top: 420rpx;  
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
  
  
  /* 截图图片 start */
  .screenshot-img {
    z-index: -1;
    padding: 20rpx;
  
    image {
      width: 100%;
      display: block;
    }
  }
  
  
  .banner{
    position: fixed;
    top: 0;
    width: 100%;
    transition: all 0.25s ease-out;
    z-index: -1;
  }
  
  /* 轮播视觉差 start */
  .card-swiper {
    height: 480rpx !important;
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
    overflow: hidden;
    border-radius: 0 0 60rpx 60rpx;
  }
    
  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
    border-radius: 0 0 60rpx 60rpx;
  }
    
  .card-swiper swiper-item .swiper-item-text {
    margin-top: -235rpx;
    width: 100%;
    display: block;
    height: 50%;
    transform: scale(0.8, 0.8);
    transition: all 0.6s ease 0s;
    overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item-text {
    margin-top: -230rpx;
    margin-left: 10rpx;
    width: 100%;
    transform: scale(0.9, 0.9);
    transition: all 0.6s ease 0s;
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
    top: -50rpx;
    margin: 0 8rpx !important;
    position: relative;
  }
  
  .spot.active{
    opacity: 1;
    width: 30rpx;
    background-color: #FFFFFF;
  }
  
  /* 阴影 start*/
  .tn-shadow {
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  /* 标题 start */
  .nav_title {
    -webkit-background-clip: text;
    color: transparent;
    
    &--wrap {
      position: relative;
      display: flex;
      height: 120rpx;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      background-image: url(https://resource.tuniaokj.com/images/title_bg/title44.png);
      background-size: cover;
    }
  }
  /* 标题 end */
  /* 标题2 start */
  .nav_title2 {
    -webkit-background-clip: text;
    color: transparent;
    
    &--wrap {
      position: relative;
      display: flex;
      height: 120rpx;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      // background-image: url(https://resource.tuniaokj.com/images/title_bg/title44.png);
      background-size: cover;
    }
  }
  /* 标题2 end */
  
 /* 店铺主图 start*/
  .image-article {
    border-radius: 16rpx;
    border: 1rpx solid #F8F7F8;
    width: 200rpx;
    height: 200rpx;
    position: relative;
  }
  
  .image-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    border-radius: 20rpx;
  }
  
  .article-shadow {
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
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
  
  /* 标签内容 start*/
  .tn-tag-content {
    &__item {
      display: inline-block;
      line-height: 35rpx;
      padding: 5rpx 25rpx;
  
      &--prefix {
        padding-right: 10rpx;
      }
    }
  }

  /* 底部悬浮按钮 start*/
  .tn-tabbar-height {
  	min-height: 120rpx;
  	height: calc(140rpx + env(safe-area-inset-bottom) / 2);
  }
  .tn-footerfixed {
    border-radius: 50rpx 50rpx 0 0;
    position: fixed;
    background-color: rgba(255,255,255,0.5);
    box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
    bottom: 0;
    width: 100%;
    transition: all 0.25s ease-out;
    z-index: 100;
  }
  
 
</style>
