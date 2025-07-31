<template>
  <view class="template-ranking tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    
    <!-- 流星-->
    <view class="tn-satr">
      <view class="sky"></view>
      <view class="stars">
        <view class="falling-stars">
          <view class="star-fall"></view>
          <view class="star-fall"></view>
          <view class="star-fall"></view>
          <view class="star-fall"></view>
        </view>
        <view class="small-stars">
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
        </view>
        <view class="medium-stars">
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
          <view class="star"></view>
        </view>
      </view>
    </view>
    
    
    <view class="top-backgroup">
      <image src='https://cdn.nlark.com/yuque/0/2022/png/280373/1647679210798-assets/web-upload/7db252b9-c9b0-44da-be4a-801830c6387e.png' mode='widthFix' class='backgroud-image'></image>
    </view>
    
    <!-- 头像用户信息 -->
    <view class="tn-flex tn-flex-row-around">
      <view class="user-info__container justify-content-item">
        <view class="user-info__avatar-two tn-flex-col-center tn-flex-row-center">
          <view class="tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg');width: 140rpx;height: 140rpx;background-size: cover;">
          </view>
        </view>
        <view class="user-info__nick-name-two clamp-text-1">Jaylen</view>
        <view class="user-info__nick-number-two clamp-text-1" style="margin-left: -8rpx;"> 
          <text class="tn-icon-sword tn-padding-right-xs"></text> 203432
        </view>
      </view>
      <view class="user-info__container justify-content-item">
        <view class="user-info__avatar-one tn-flex-col-center tn-flex-row-center">
          <view class="tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg');width: 180rpx;height: 180rpx;background-size: cover;">
          </view>
        </view>
        <view class="user-info__nick-name-one clamp-text-1">可我会像</view>
        <view class="user-info__nick-number-one clamp-text-1" style="margin-left: -8rpx;">
          <text class="tn-icon-sword tn-padding-right-xs"></text> 540980
        </view>
      </view>
      <view class="user-info__container justify-content-item">
        <view class="user-info__avatar-three tn-flex-col-center tn-flex-row-center">
          <view class="tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg');width: 120rpx;height: 120rpx;background-size: cover;">
          </view>
        </view>
        <view class="user-info__nick-name-three clamp-text-1">福哥</view>
        <view class="user-info__nick-number-three clamp-text-1" style="margin-left: -8rpx;">
          <text class="tn-icon-sword tn-padding-right-xs"></text> 129641
        </view>
      </view>
    </view>

    <!-- 组件对应可选项容器 -->
    <view class="" style="background-color: rgba(255,255,255,1);position: relative;color: #3A4F72;border-radius: 50rpx 50rpx 0 0;margin-top: 21vh;padding: 20rpx 10rpx 130rpx 10rpx;">
      <view class="" style="padding-top: 20rpx;">
        <view class="nav_title--wrap">
          <view class="nav_title tn-cool-bg-color-15">
            <text class="tn-icon-sword tn-padding-right-sm tn-text-xxl"></text>
            <text class="tn-text-xl">战力榜单 · 全球排行</text>
            <text class="tn-icon-sword tn-padding-left-sm tn-text-xxl"></text>
          </view>
        </view>
      </view>
      <block v-for="(item,index) in content" :key="index">
        <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin">
          <view class="justify-content-item tn-margin-top">
            <view class="tn-flex tn-flex-row-center tn-flex-col-center">
              <view class="tn-flex tn-flex-row-center tn-padding-right">
                <text class="tn-text-bold tn-text-xxl" style="color: #B0B7C6;">{{ item.userNumber }}</text>
              </view>
              <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                <!-- <tn-avatar
                  class=""
                  shape="circle"
                  :src="item.userAvatar">
                </tn-avatar> -->
                <view class="avatar-all">
                  <view class="tn-shadow-blur" :style="'background-image:url('+ item.userAvatar + ');width: 80rpx;height: 80rpx;background-size: cover;'">
                  </view>
                </view>
                <view class="tn-padding-right tn-text-ellipsis">
                  <view class="tn-padding-right tn-padding-left-sm tn-text-bold tn-text-lg">{{ item.userName }}</view>
                  <view class="tn-padding-right tn-padding-left-sm" :class="[`tn-color-${item.color}`]">
                    <text>{{ item.desc }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="justify-content-item tn-flex-row-center tn-margin-top">
            <text class="tn-text-xl tn-padding-right">{{ item.collectionCount }}</text>
            <text class="tn-icon-sword icon-ranking"></text> 
          </view>
        </view>
      </block>
    </view>  
    
          
    <view class="tabbar footerfixed dd-glass" @click="tn('/minePages/integral')">
      <view class="tn-flex tn-flex-row-between tn-flex-col-center">
        <view class="justify-content-item tn-margin-top">
          <view class="tn-flex tn-flex-row-center tn-flex-col-center">
            <view class="tn-flex tn-flex-row-center tn-padding-right tn-padding-left">
              <text class="tn-text-bold tn-text-xxl" style="color: #B0B7C6;">09</text>
            </view>
            <view class="tn-flex tn-flex-row-center tn-flex-col-center">
              <!-- <tn-avatar
                class=""
                shape="circle"
                :src="item.userAvatar">
              </tn-avatar> -->
              <view class="avatar-all">
                <view class="tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg');width: 80rpx;height: 80rpx;background-size: cover;">
                </view>
              </view>
              <view class="tn-padding-right tn-text-ellipsis">
                <view class="tn-padding-right tn-padding-left-sm tn-text-bold tn-text-lg">北北猪吖</view>
                <view class="tn-padding-right tn-padding-left-sm tn-color-grey">
                  <text>坚韧黑铁</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="justify-content-item tn-flex-row-center tn-margin-top tn-padding-right">
          <text class="tn-text-xl tn-padding-right">265</text>
          <text class="tn-icon-sword icon-ranking"></text> 
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateRanking',
    mixins: [template_page_mixin],
    data(){
      return {
        content: [
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userNumber: '01',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '最强王者',
            color: 'orangeyellow',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/content_1.jpeg'
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 12
            },
            collectionCount: 540980,
            commentCount: 64,
            likeCount: 83
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
            userNumber: '02',
            userName: 'Jaylen',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '傲视宗师',
            color: 'indigo',
            mainImage:[
              'https://resource.tuniaokj.com/images/shop/computer2.jpg',
              'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 56
            },
            collectionCount: 203432,
            commentCount: 26,
            likeCount: 84
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
            userNumber: '03',
            userName: '福哥',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '超凡大师',
            color: 'brown',
            mainImage:[
              'https://resource.tuniaokj.com/images/swiper/swiper2.jpg',
              'https://resource.tuniaokj.com/images/swiper/swiper3.jpg',
              'https://resource.tuniaokj.com/images/swiper/swiper4.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
              ],
              viewUserCount: 231
            },
            collectionCount: 129641,
            commentCount: 89,
            likeCount: 82
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
            userNumber: '04',
            userName: '浅浅遇',
            date: '2021年12月20日',
            label: ['站点','链接'],
            desc: '璀璨钻石',
            color: 'grey',
            mainImage:[
              'https://resource.tuniaokj.com/images/shop/watch1.jpg',
              'https://resource.tuniaokj.com/images/shop/watch2.jpg',
              'https://resource.tuniaokj.com/images/shop/pillow2.jpg',
              'https://resource.tuniaokj.com/images/shop/pillow.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 28
            },
            collectionCount: 89432,
            commentCount: 33,
            likeCount: 12
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/content_1.jpeg',
            userNumber: '05',
            userName: '锋哥',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '华贵铂金',
            color: 'grey',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/y11.jpg',
              'https://resource.tuniaokj.com/images/blogger/y33.jpg',
              'https://resource.tuniaokj.com/images/blogger/y22.jpg',
              'https://resource.tuniaokj.com/images/blogger/y44.jpg',
              'https://resource.tuniaokj.com/images/blogger/y55.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 80762,
            commentCount: 22,
            likeCount: 62
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/y11.jpg',
            userNumber: '05',
            userName: '你的名字',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '荣耀黄金',
            color: 'grey',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/y11.jpg',
              'https://resource.tuniaokj.com/images/blogger/y33.jpg',
              'https://resource.tuniaokj.com/images/blogger/y22.jpg',
              'https://resource.tuniaokj.com/images/blogger/y44.jpg',
              'https://resource.tuniaokj.com/images/blogger/y55.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 80762,
            commentCount: 22,
            likeCount: 62
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userNumber: '07',
            userName: '北北猪吖',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '不屈白银',
            color: 'grey',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/y11.jpg',
              'https://resource.tuniaokj.com/images/blogger/y33.jpg',
              'https://resource.tuniaokj.com/images/blogger/y22.jpg',
              'https://resource.tuniaokj.com/images/blogger/y44.jpg',
              'https://resource.tuniaokj.com/images/blogger/y55.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userNumber: '08',
            userName: '北北猪吖',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '英勇黄铜',
            color: 'grey',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/y11.jpg',
              'https://resource.tuniaokj.com/images/blogger/y33.jpg',
              'https://resource.tuniaokj.com/images/blogger/y22.jpg',
              'https://resource.tuniaokj.com/images/blogger/y44.jpg',
              'https://resource.tuniaokj.com/images/blogger/y55.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userNumber: '09',
            userName: '北北猪吖',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '坚韧黑铁',
            color: 'grey',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/y11.jpg',
              'https://resource.tuniaokj.com/images/blogger/y33.jpg',
              'https://resource.tuniaokj.com/images/blogger/y22.jpg',
              'https://resource.tuniaokj.com/images/blogger/y44.jpg',
              'https://resource.tuniaokj.com/images/blogger/y55.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userNumber: '10',
            userName: '北北猪吖',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '暂无段位',
            color: 'grey',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/y11.jpg',
              'https://resource.tuniaokj.com/images/blogger/y33.jpg',
              'https://resource.tuniaokj.com/images/blogger/y22.jpg',
              'https://resource.tuniaokj.com/images/blogger/y44.jpg',
              'https://resource.tuniaokj.com/images/blogger/y55.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userNumber: '11',
            userName: '北北猪吖',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '暂无段位',
            color: 'grey',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/y11.jpg',
              'https://resource.tuniaokj.com/images/blogger/y33.jpg',
              'https://resource.tuniaokj.com/images/blogger/y22.jpg',
              'https://resource.tuniaokj.com/images/blogger/y44.jpg',
              'https://resource.tuniaokj.com/images/blogger/y55.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userNumber: '12',
            userName: '北北猪吖',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '暂无段位',
            color: 'grey',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/y11.jpg',
              'https://resource.tuniaokj.com/images/blogger/y33.jpg',
              'https://resource.tuniaokj.com/images/blogger/y22.jpg',
              'https://resource.tuniaokj.com/images/blogger/y44.jpg',
              'https://resource.tuniaokj.com/images/blogger/y55.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          }
        ]
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
  /* 背景*/
  .template-ranking {
    margin: 0;
    width: 100%;
    height: 100%;
    /* background: linear-gradient(-120deg, #5969f6, #0976ea, #01BEFF, #00F5D4); */
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
  
  /* 图标 start */
    .icon-ranking {
      background-color: #EDEEF2;
      font-variant: small-caps;
      width: 50rpx;
      height: 50rpx;
      line-height: 50rpx;
      margin-top: -10rpx;
      display: inline-flex;
      text-align: center;
      justify-content: center;
      vertical-align: middle;
      font-size: 30rpx;
      color: #B0B7C6;
      white-space: nowrap;
      opacity: 0.9;
      background-size: cover;
      background-position: 50%;
      border-radius: 5000rpx;  
    }
  
  
/* 用户信息 start */
  .user-info {
    &__container {
      margin-top: -10vh;
    }
    
    &__avatar-one {
      margin-top: -90rpx;
      width: 180rpx;
      height: 180rpx;
      border: 8rpx solid rgba(255,255,255,0.05);
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    }
    &__avatar-two {
      width: 140rpx;
      height: 140rpx;
      border: 8rpx solid rgba(255,255,255,0.05);
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    }
    &__avatar-three {
      margin-top: 60rpx;
      width: 120rpx;
      height: 120rpx;
      border: 8rpx solid rgba(255,255,255,0.05);
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    }
    
    &__nick-name-one {
      width: 180rpx;
      color: #FFFFFF;
      margin-top: 26rpx;
      font-size: 26rpx;
      font-weight: 600;
      text-align: center;
    }
    &__nick-name-two {
      width: 140rpx;
      color: #FFFFFF;
      margin-top: 26rpx;
      font-size: 24rpx;
      font-weight: 600;
      text-align: center;
    }
    &__nick-name-three {
      width: 120rpx;
      color: #FFFFFF;
      margin-top: 26rpx;
      font-size: 24rpx;
      font-weight: 600;
      text-align: center;
    }
    &__nick-number-one {
      width: 180rpx;
      color: #FFFFFF;
      margin-top: 13rpx;
      font-size: 26rpx;
      font-weight: 600;
      text-align: center;
    }
    &__nick-number-two {
      width: 140rpx;
      color: #FFFFFF;
      margin-top: 13rpx;
      font-size: 24rpx;
      font-weight: 600;
      text-align: center;
    }
    &__nick-number-three {
      width: 120rpx;
      color: #FFFFFF;
      margin-top: 13rpx;
      font-size: 24rpx;
      font-weight: 600;
      text-align: center;
    }
  }
  .avatar-all {
    width: 80rpx;
    height: 80rpx;
    border: 4rpx solid rgba(255,255,255,0.05);
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
  }
  /* 用户信息 end */
  
  
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
  
  /* 顶部背景图 start */
  .top-backgroup {
    opacity: 0.8;
    height: 450rpx;
    z-index: -1;
    padding-top: 27vh;
  
    .backgroud-image {
      width: 100%;
      height: 450rpx;
      z-index: -1;
    }
  }
  /* 顶部背景图 end */
  
  /* 流星*/
  .tn-satr {
    position: fixed;
    width: 100%;
    height: 600px;
    overflow: hidden;
    flex-shrink: 0;
    z-index: 999;
  }
  
  .stars {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 400px;
  }
  
  .star {
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(255, 255, 255, 0.8);
  }
  
  .small-stars .star {
    position: absolute;
    width: 3px;
    height: 3px;
  }
  .small-stars .star:nth-child(2n) {
    opacity: 0;
    -webkit-animation: star-blink 1.2s linear infinite alternate;
            animation: star-blink 1.2s linear infinite alternate;
  }
  .small-stars .star:nth-child(1) {
    left: 40px;
    bottom: 50px;
  }
  .small-stars .star:nth-child(2) {
    left: 200px;
    bottom: 40px;
  }
  .small-stars .star:nth-child(3) {
    left: 60px;
    bottom: 120px;
  }
  .small-stars .star:nth-child(4) {
    left: 140px;
    bottom: 250px;
  }
  .small-stars .star:nth-child(5) {
    left: 400px;
    bottom: 300px;
  }
  .small-stars .star:nth-child(6) {
    left: 170px;
    bottom: 80px;
  }
  .small-stars .star:nth-child(7) {
    left: 200px;
    bottom: 360px;
    -webkit-animation-delay: .2s;
            animation-delay: .2s;
  }
  .small-stars .star:nth-child(8) {
    left: 250px;
    bottom: 320px;
  }
  .small-stars .star:nth-child(9) {
    left: 300px;
    bottom: 340px;
  }
  .small-stars .star:nth-child(10) {
    left: 130px;
    bottom: 320px;
    -webkit-animation-delay: .5s;
            animation-delay: .5s;
  }
  .small-stars .star:nth-child(11) {
    left: 230px;
    bottom: 330px;
    -webkit-animation-delay: 7s;
            animation-delay: 7s;
  }
  .small-stars .star:nth-child(12) {
    left: 300px;
    bottom: 360px;
    -webkit-animation-delay: .3s;
            animation-delay: .3s;
  }
  @-webkit-keyframes star-blink {
    50% {
      width: 3px;
      height: 3px;
      opacity: 1;
    }
  }
  @keyframes star-blink {
    50% {
      width: 3px;
      height: 3px;
      opacity: 1;
    }
  }
  .medium-stars .star {
    position: absolute;
    width: 3px;
    height: 3px;
    opacity: 0;
    -webkit-animation: star-blink 1.2s ease-in infinite alternate;
            animation: star-blink 1.2s ease-in infinite alternate;
  }
  .medium-stars .star:nth-child(1) {
    left: 300px;
    bottom: 50px;
  }
  .medium-stars .star:nth-child(2) {
    left: 400px;
    bottom: 40px;
    -webkit-animation-delay: .4s;
            animation-delay: .4s;
  }
  .medium-stars .star:nth-child(3) {
    left: 330px;
    bottom: 300px;
    -webkit-animation-delay: .2s;
            animation-delay: .2s;
  }
  .medium-stars .star:nth-child(4) {
    left: 460px;
    bottom: 300px;
    -webkit-animation-delay: .9s;
            animation-delay: .9s;
  }
  .medium-stars .star:nth-child(5) {
    left: 300px;
    bottom: 150px;
    -webkit-animation-delay: 1.2s;
            animation-delay: 1.2s;
  }
  .medium-stars .star:nth-child(6) {
    left: 440px;
    bottom: 120px;
    -webkit-animation-delay: 1s;
            animation-delay: 1s;
  }
  .medium-stars .star:nth-child(7) {
    left: 200px;
    bottom: 140px;
    -webkit-animation-delay: .8s;
            animation-delay: .8s;
  }
  .medium-stars .star:nth-child(8) {
    left: 30px;
    bottom: 480px;
    -webkit-animation-delay: .3s;
            animation-delay: .3s;
  }
  .medium-stars .star:nth-child(9) {
    left: 460px;
    bottom: 400px;
    -webkit-animation-delay: 1.2s;
            animation-delay: 1.2s;
  }
  .medium-stars .star:nth-child(10) {
    left: 150px;
    bottom: 10px;
    -webkit-animation-delay: 1s;
            animation-delay: 1s;
  }
  .medium-stars .star:nth-child(11) {
    left: 420px;
    bottom: 450px;
    -webkit-animation-delay: 1.2s;
            animation-delay: 1.2s;
  }
  .medium-stars .star:nth-child(12) {
    left: 340px;
    bottom: 180px;
    -webkit-animation-delay: 1.1s;
            animation-delay: 1.1s;
  }
  @keyframes star-blink {
    50% {
      width: 4px;
      height: 4px;
      opacity: 1;
    }
  }
  .star-fall {
    position: relative;
    border-radius: 2px;
    width: 80px;
    height: 2px;
    overflow: hidden;
    -webkit-transform: rotate(-20deg);
            transform: rotate(-20deg);
  }
  .star-fall:after {
    content: "";
    position: absolute;
    width: 50px;
    height: 2px;
    background: -webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0)), to(rgba(255, 255, 255, 0.4)));
    background: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.4) 100%);
    left: 100%;
    -webkit-animation: star-fall 3.6s linear infinite;
            animation: star-fall 3.6s linear infinite;
  }
  
  .star-fall:nth-child(1) {
    left: 80px;
    bottom: -100px;
  }
  .star-fall:nth-child(1):after {
    -webkit-animation-delay: 2.4s;
            animation-delay: 2.4s;
  }
  
  .star-fall:nth-child(2) {
    left: 200px;
    bottom: -200px;
  }
  .star-fall:nth-child(2):after {
    -webkit-animation-delay: 2s;
            animation-delay: 2s;
  }
  
  .star-fall:nth-child(3) {
    left: 430px;
    bottom: -50px;
  }
  .star-fall:nth-child(3):after {
    -webkit-animation-delay: 3.6s;
            animation-delay: 3.6s;
  }
  
  .star-fall:nth-child(4) {
    left: 400px;
    bottom: 100px;
  }
  .star-fall:nth-child(4):after {
    -webkit-animation-delay: .2s;
            animation-delay: .2s;
  }
  
  @-webkit-keyframes star-fall {
    20% {
      left: -100%;
    }
    100% {
      left: -100%;
    }
  }
  
  @keyframes star-fall {
    20% {
      left: -100%;
    }
    100% {
      left: -100%;
    }
  }


  /* 底部 start*/
  .footerfixed{
   position: fixed;
   width: 100%;
   bottom: 0;
   z-index: 999;
   background-color: rgba(255,255,255,0.5);
   box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  .tabbar {
    align-items: center;
    min-height: 130rpx;
  	padding: 0;
  	height: calc(130rpx + env(safe-area-inset-bottom) / 2);
  	padding-bottom: calc(30rpx + env(safe-area-inset-bottom) / 2);
    padding-left: 10rpx;
    padding-right: 10rpx;
  }
  
    /* 毛玻璃*/
  .dd-glass {
     width: 100%;
     backdrop-filter: blur(20rpx);
    -webkit-backdrop-filter: blur(20rpx);
  }
  
</style>
