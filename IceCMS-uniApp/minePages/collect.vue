<template>
  <view class="template-collect tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    
    <view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      
      <view class="" style="margin-bottom: 120rpx;">
        <block v-for="(item, index) in news" :key="index">
          <view class="tn-margin tn-padding-bottom-sm" @click="tn('/circlePages/news')">
            <view class="tn-flex">
              <view class="image-pic tn-shadow-blur tn-margin-right-sm" :style="'background-image:url(' + item.userAvatar + ')'">
                <view class="image-article">
                </view>
              </view>
              <view class="tn-margin-left-sm tn-margin-top-xs" style="width: 100%;">
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
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateCollect',
    mixins: [template_page_mixin],
    data(){
      return {
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
            label: ['后端开发计'],
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
            label: ['后端开发计'],
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
  
  /* 资讯主图 start*/
  .image-article {
    border-radius: 8rpx;
    border: 1rpx solid #F8F7F8;
    width: 180rpx;
    height: 200rpx;
    position: relative;
  }
  
  .image-pic {
    width: 200rpx;
    height: 200rpx;
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
