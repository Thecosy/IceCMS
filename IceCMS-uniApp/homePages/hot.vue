<template>
  <view class="template-hot tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
     
    <view class="tn-margin-top-sm" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-between">
        <view class="justify-content-item tn-margin tn-text-bold tn-text-xl">
          热榜推荐
        </view>
        <view class="tn-margin" style="font-size: 50rpx;">
          <text class="tn-icon-data"></text>
        </view>
      </view>
    </view>
    
    <swiper class="card-swiper" :circular="true"
      :autoplay="true" duration="500" interval="5000" @change="cardSwiper"> 
      <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
        <!-- <view class="swiper-item image-banner">
          <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
        </view> -->
        <view class="swiper-item image-banner tn-shadow-blur" :style="'background-image:url('+ item.url + ');background-size: cover;border-radius: 15rpx;'">
        </view>
        <view class="swiper-item-text card-shadow">
          <view class="tn-text-xxl tn-text-bold">{{item.name}}</view>
          <view class="tn-text-sm tn-text-bold tn-padding-top-xs">{{item.text}}</view>
        </view>
      </swiper-item>
    </swiper>
    <view class="indication">
        <block v-for="(item,index) in swiperList" :key="index">
            <view class="spot" :class="cardCur==index?'active':''"></view>
        </block>
    </view>
    
    
    <view class="tn-margin-top-sm">
      <view class="tn-flex tn-flex-row-between">
        <view class="justify-content-item tn-margin tn-text-bold tn-text-xl">
          热门趋势
        </view>
        <view class="tn-margin" style="font-size: 50rpx;">
          <text class="tn-icon-data"></text>
        </view>
      </view>
    </view>
    <view class="">
      <block v-for="(item,index) in content" :key="index">
        <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin">
          <view class="justify-content-item tn-margin-top">
            <view class="tn-flex tn-flex-row-center tn-flex-col-center">
              <view class="tn-flex tn-flex-row-center tn-padding-right">
                <text class="tn-text-bold tn-text-xxl" :class="[`tn-color-${item.color}`]">{{ item.userNumber }}</text>
              </view>
              <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                <view class="tn-padding-right tn-text-ellipsis">
                  <view class="tn-padding-right tn-padding-left-sm tn-text-bold tn-text-lg">{{ item.userName }}</view>
                  <view class="tn-padding-right tn-padding-left-sm tn-color-gray">
                    <text>{{ item.desc }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="justify-content-item tn-flex-row-center tn-margin-top tn-text-xl">
            <text class="tn-icon-up-arrow tn-text-bold"></text>
            <text class="tn-padding-left">{{ item.collectionCount }}</text>
          </view>
        </view>
      </block>
    </view>
    
    
    
    <view class="" style="margin-top: -20rpx;">
      <view class="tn-flex tn-flex-row-between">
        <view class="justify-content-item tn-margin tn-text-bold tn-text-xl">
          热门话题
        </view>
        <view class="tn-margin" style="font-size: 50rpx;">
          <text class="tn-icon-data"></text>
        </view>
      </view>
    </view>
    
    <view class="tn-margin-left tn-text-sm tn-color-gray" style="margin-top: -25rpx;">
      <text>这是今日热门话题，请查收吖</text>
    </view>
    
    <view class="">
      <view class="tn-plan-content tn-margin tn-text-justify">
        <view v-for="(item,index) in planList" :key="index" class="tn-plan-content__item tn-margin-right tn-round tn-text-sm tn-text-bold" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
          <text class="tn-plan-content__item--prefix">#</text> {{item.name}}
        </view>
      </view>
    </view>
    
    <view class="" style="margin-top: 50rpx;">
      <view class="tn-flex tn-flex-row-between">
        <view class="justify-content-item tn-margin tn-text-bold tn-text-xl">
          热门资讯
        </view>
        <view class="tn-margin" style="font-size: 50rpx;">
          <text class="tn-icon-data"></text>
        </view>
      </view>
    </view>
    
    <view class="tn-margin-left tn-text-sm tn-color-gray" style="margin-top: -25rpx;">
      <text>这是今日热门资讯，请查收吖</text>
    </view>
    
    
    <!-- 不建议写时间，因为写了时间，你就要经常更新文章了鸭-->
    <view class="">
      <block v-for="(item, index) in news" :key="index">
        <view class="article-shadow tn-margin" @click="tn('/circlePages/news')">
          <view class="tn-flex">
            <view class="image-pic tn-margin-sm" :style="'background-image:url(' + item.userAvatar + ')'">
              <view class="image-article">
              </view>
            </view>
            <view class="tn-margin-sm tn-padding-top-xs" style="width: 100%;">
              <view class="tn-text-lg tn-text-bold clamp-text-1 tn-text-justify">
                {{ item.title }}
              </view>
              <view class="tn-padding-top-xs" style="min-height: 105rpx;">
                <text class="tn-text-df tn-color-gray clamp-text-2 tn-text-justify">
                  {{ item.desc }}
                </text>
              </view>
              <view class="tn-flex tn-flex-row-between tn-flex-col-between">
                <view v-for="(label_item,label_index) in item.label" :key="label_index"
                  class="justify-content-item tn-tag-content__item tn-margin-right tn-round tn-text-sm tn-text-bold" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
                  <text class="tn-tag-content__item--prefix">#</text> {{ label_item }}
                </view>
                <view class="justify-content-item tn-color-gray tn-text-center tn-color-gray--disabled" style="padding-top: 5rpx;">
                  <text class="tn-icon-footprint tn-padding-right-xs tn-text-lg"></text>
                  <text class="tn-padding-right tn-text-df">{{ item.collectionCount }}</text>
                  <text class="tn-icon-like tn-padding-right-xs tn-text-lg"></text>
                  <text class="tn-text-df">{{ item.likeCount }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
    

    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateHot',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          name: '看书20分钟',
          text: '静下心看《读者》',
          url: 'https://resource.tuniaokj.com/images/swiper/ad3.jpg',
        }, {
          id: 1,
          type: 'image',
          name: '创新一个轮播',
          text: '在IceCMSUI新增创意轮播',
          url: 'https://resource.tuniaokj.com/images/swiper/ad2.jpg',
        }, {
          id: 2,
          type: 'image',
          name: '坚持早起',
          text: '早上9点前起床',
          url: 'https://resource.tuniaokj.com/images/swiper/ad4.jpg',
        }, {
          id: 3,
          type: 'image',
          name: '和群友吹水',
          text: '技术的友情永不过时',
          url: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg',
        }, {
          id: 4,
          type: 'image',
          name: '散步找创意',
          text: '每天散步30分钟',
          url: 'https://resource.tuniaokj.com/images/new/banner1.jpg',
        }],
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
              color: 'gray',
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
              color: 'gray',
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
            }
          ],
        planList: [{
          name: '看书',
          color: 'red',
          time: '2021-12-13 06:20',
        }, {
          name: '早起',
          color: 'cyan',
          time: '8:37',
        }, {
          name: '做30个深蹲',
          color: 'blue',
        }, {
          name: '散步',
          color: 'green',
        }, {
          name: '写新的轮播效果',
          color: 'orange',
        }, {
          name: '吃早餐',
          color: 'purplered',
        }, {
          name: '陪猫猫玩',
          color: 'purple',
        }, {
          name: '睡午觉',
          color: 'brown',
        }, {
          name: '干饭饭',
          color: 'yellowgreen',
        }, {
          name: '蔡猪北',
          color: 'grey',
        }],
        news: [{
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
            userName: '可我会像',
            date: '2022年5月20日',
            color: 'red',
            label: ['小程序'],
            title: '全新出发，新版本已上线，欢迎三连',
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
            title: '3D模型了解一下？',
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
            label: ['后端开发'],
            title: '为什么资讯不显示时间',
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
            title: '创意一点点',
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
            label: ['后端开发'],
            title: '语雀素材地址资源',
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
            title: '最强的视频转GIF工具',
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
            title: '小程序粒子效果',
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
            title: '小程序任意页面生成二维码',
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
  .template-plan{
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
  
  /* 轮播 start*/
  .card-swiper {
    height: 570rpx !important;
  }
  
  .card-swiper swiper-item {
    width: 450rpx !important;
    left: 30rpx;
    box-sizing: border-box;
    padding: 0rpx 0rpx 80rpx 0rpx;
    overflow: initial;
  }
  
  .card-swiper swiper-item .swiper-item {
    width: 100%;
    display: block;
    height: 100%;
    border-radius: 10rpx;
    transform: scale(0.7) translate(0rpx,-104rpx);
    transition: all 0.3s ease-in 0s;
    will-change: transform;
    // overflow: hidden;
  }
  
  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.3s ease-in 0s;
    will-change: transform;
  }
  
  .card-swiper swiper-item .swiper-item-text {
    margin-top: -100rpx;
    width: 100%;
    display: block;
    height: 50%;
    border-radius: 10rpx;
    transform: translate(20rpx, -30rpx) scale(0.7, 0.7);
    transition: all 0.4s ease 0s;
    will-change: transform;
    overflow: hidden;
    color: #000000;
    // background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0));
    height: 140rpx;
  }
  
  .card-swiper swiper-item.cur .swiper-item-text {
    margin-top: -150rpx;
    padding-left: 30rpx;
    width: 500rpx !important;
    transform: translate(-25rpx, 20rpx) scale(0.9, 0.9);
    transition: all 0.4s ease 0s;
    will-change: transform;
    color: #FFFFFF;
    text-shadow: 0rpx 10rpx 20rpx rgba(0,0,0,0.1);
    // background-image: linear-gradient(rgba(255, 255, 255, 0.01), rgba(0, 0, 0, 0.4));
    height: 137rpx;
  }
  
  .image-banner{
    display: flex;
    align-items: center;
    justify-content: center;
    // border: 1rpx solid red;
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
    background-color: #000;
    opacity: 0.4;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    margin: 0 8rpx !important;
    right: -270rpx;
    top: -100rpx;
    position: relative;
  }
  
  .spot.active{
    opacity: 1;
    width: 10rpx;
    background-color: #000;
  }
  
  /* 计划内容 start*/
  .tn-plan-content {
    &__item {
      display: inline-block;
      line-height: 45rpx;
      padding: 10rpx 30rpx;
      margin: 20rpx 20rpx 5rpx 0rpx;
      
      &--prefix {
        padding-right: 10rpx;
      }  
    }
  }
  .tn-plan-content2 {
    &__item {
      line-height: 45rpx;
      padding: 15rpx 30rpx;
      margin: 30rpx 0rpx 10rpx 0rpx;
      
      &--prefix {
        padding-right: 10rpx;
      }  
    }
  }
  /* 计划内容 end*/
  
  /* 资讯主图 start*/
  .image-article {
    border-radius: 8rpx;
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
    border-radius: 10rpx;
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
</style>
