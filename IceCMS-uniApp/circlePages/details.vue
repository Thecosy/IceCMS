<template>
  <view class="template-details tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    <view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <!-- 图文信息 -->
      <block v-for="(item,index) in content" :key="index">
        <view class="blogger__item">
          <view class="blogger__author tn-flex tn-flex-row-between tn-flex-col-center">
            <view class="justify__author__info" @click="tn('/circlePages/blogger_other')">
              <view class="tn-flex tn-flex-row-center">
                <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                  <view class="">
                    <tn-avatar
                      class=""
                      shape="circle"
                      :src="item.userAvatar"
                      size="lg">
                    </tn-avatar>
                  </view>
                  <view class="tn-padding-right tn-text-ellipsis">
                    <view class="tn-padding-right tn-padding-left-sm tn-text-bold tn-text-lg">{{ item.userName }}</view>
                    <view class="tn-padding-right tn-padding-left-sm tn-padding-top-xs tn-color-gray">{{ item.date }}</view>
                  </view>
                </view>
              </view>
            </view>
            <view class="blogger__author__btn justify-content-item tn-flex-col-center tn-flex-row-center">
              <!-- 既然都点到详情里面了，加个关注按钮呗 -->
              <text class="tn-bg-brown--light tn-round tn-text-df tn-text-bold tn-color-brown" style="padding: 10rpx 24rpx;">+ 关注</text>
            </view>
          </view>
         
          <view class="blogger__desc tn-margin-top-sm tn-margin-bottom-sm tn-text-justify tn-flex-col-center tn-flex-row-left">
            <view v-for="(label_item,label_index) in item.label" :key="label_index" class="blogger__desc__label tn-float-left tn-margin-right tn-bg-gray--light tn-round tn-text-sm tn-text-bold">
              <text class="blogger__desc__label--prefix">#</text> 
              <text class="tn-text-df">{{ label_item }}</text>
            </view>
            <!-- 不用限制长度了，因为发布的时候限制长度了-->
            <text v-if="!item.label || item.label.length < 4" class="blogger__desc__content tn-flex-1 tn-text-justify tn-text-df">{{ item.desc }}</text>  
          </view>
          
          <!-- 内容太多疲劳了-->
          <!-- <view
            v-if="item.content"
            class="blogger__content"
            :id="`blogger__content--${index}`"
          >
            <view
              class="blogger__content__data clamp-text-2">
              {{ item.content }}
            </view>
          </view> -->
          
          <block v-if="item.mainImage">
            <view v-if="[1,2,4].indexOf(item.mainImage.length) != -1" class="tn-padding-top-xs">
              <image v-for="(image_item,image_index) in item.mainImage" :key="image_index" 
                class="blogger__main-image"
                :class="{
                  'blogger__main-image--1 tn-margin-bottom-sm': item.mainImage.length === 1,
                  'blogger__main-image--2 tn-margin-right-sm tn-margin-bottom-sm': item.mainImage.length === 2 || item.mainImage.length === 4
                }"
                :src="image_item"
                mode="aspectFill"
              ></image>
            </view>
            <view v-else class="tn-padding-top-xs">
              <tn-grid  hoverClass="none" :col="3">
                <block v-for="(image_item,image_index) in item.mainImage" :key="image_index">
                  <!-- #ifndef MP-WEIXIN -->
                  <tn-grid-item style="width: 30%;margin: 10rpx;">
                    <image
                      class="blogger__main-image blogger__main-image--3"
                      :src="image_item"
                      mode="aspectFill"
                    ></image>
                  </tn-grid-item>
                  <!-- #endif-->
                  <!-- #ifdef MP-WEIXIN -->
                  <tn-grid-item style="width: 30%;margin: 10rpx;">
                    <image
                      class="blogger__main-image blogger__main-image--3"
                      :src="image_item"
                      mode="aspectFill"
                    ></image>
                  </tn-grid-item>
                  <!-- #endif-->
                </block>
              </tn-grid>
            </view>
          </block>
         
          <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-top-xs">
            <view class="justify-content-item tn-flex tn-flex-col-center">
              <view style="margin-right: 10rpx;">
                <tn-avatar-group :lists="item.viewUser.latestUserAvatar" size="sm"></tn-avatar-group>
              </view>
              <text class="tn-color-gray">{{ item.viewUser.viewUserCount }}人</text>
            </view>
            <view class="justify-content-item tn-color-gray tn-text-center">
              <view class="">
                <text class="blogger__count-icon tn-icon-footprint"></text> 
                <text class="tn-padding-right">{{ item.collectionCount }}</text>
                <text class="blogger__count-icon tn-icon-message"></text>
                <text class="tn-padding-right">{{ item.commentCount }}</text>
                <text class="blogger__count-icon tn-icon-like"></text>
                <text class="">{{ item.likeCount }}</text>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 边距间隔 -->
        <!-- <view class="tn-strip-bottom" v-if="index != content.length - 1"></view> -->
      </block>
      
      <!-- 按钮-->
      <view class="tn-flex tn-flex-row-between" style="margin: 40rpx 0 60rpx 0;">
        <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
          <tn-button backgroundColor="#00FFC6" padding="40rpx 0" width="90%" shadow fontBold>
            <text class="tn-icon-like-lack tn-padding-right-xs tn-color-black"></text>
            <text class="tn-color-black">点 赞</text>
          </tn-button>
        </view>
        <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
          <tn-button backgroundColor="#FFF00D" padding="40rpx 0" width="90%" shadow fontBold open-type="share">
            <text class="tn-icon-share-triangle tn-padding-right-xs tn-color-black"></text>
            <text class="tn-color-black">分 享</text>
          </tn-button>
        </view>
      </view>
      
      
    </view>
    
    <!-- 评论 -->
    <view class="tn-margin" style="padding-bottom: 120rpx;">
      <!-- 图标logo/头像 -->
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-top-xl" @click="tn('/circlePages/blogger_other')">
        <view class="justify-content-item">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left">
            <view class="logo-pic tn-shadow">
              <view class="logo-image">
                <view class="tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg');width: 60rpx;height: 60rpx;background-size: cover;">
                </view>
              </view>
            </view>
            <view class="tn-padding-right tn-padding-left-sm">
              <view class="tn-padding-right tn-text-df tn-text-bold tn-color-black">
                抓住那只高产母猪
              </view>
              <view class="tn-padding-right tn-text-ellipsis tn-text-xs tn-color-gray" style="padding-top: 5rpx;">
                2022年5月26日
              </view>
            </view>
          </view>
        </view>
        <view class="justify-content-item tn-flex-row-center tn-flex-col-center tn-color-gray">
          <view class="tn-text-center">
            <text class="tn-icon-like-lack tn-padding-xs"></text>
          </view>
          <view class="tn-text-center">
            <text class="tn-text-xs">26</text>
          </view>
        </view>
      </view>
      
      <view class="" style="margin: 20rpx 30rpx 30rpx 80rpx;">
        说好的带我飞呢？？就这？？
      </view>
      <view class="tn-bg-gray--light tn-padding-sm" style="margin: 20rpx 30rpx 30rpx 80rpx;border-radius: 10rpx;">
        <text class="tn-text-bold tn-padding-right-xs">博主回复: </text>
        <text style="line-height: 40rpx;">设计师何必难为设计师？冤冤相报何时了，不如喝杯奶茶忘了那个仔</text>
        <view class="tn-flex tn-flex-row-between tn-margin-top-xs">
          <view class="justify-content-item tn-text-xs tn-color-gray" style="padding-top: 5rpx;">
            2022年5月26日
          </view>
          <view class="justify-content-item tn-text-xs tn-color-gray">
            <text class="tn-padding-xs">16</text>
            <text class="tn-icon-like-lack"></text>
          </view>
        </view>
      </view>
      
      <!-- 评论2-->
      <!-- 图标logo/头像 -->
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-top-xl" @click="tn('/circlePages/blogger_other')">
        <view class="justify-content-item">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left">
            <view class="logo-pic tn-shadow">
              <view class="logo-image">
                <view class="tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg');width: 60rpx;height: 60rpx;background-size: cover;">
                </view>
              </view>
            </view>
            <view class="tn-padding-right tn-padding-left-sm">
              <view class="tn-padding-right tn-text-df tn-text-bold tn-color-black">
                北染陌人
              </view>
              <view class="tn-padding-right tn-text-ellipsis tn-text-xs tn-color-gray" style="padding-top: 5rpx;">
                2022年5月25日
              </view>
            </view>
          </view>
        </view>
        <view class="justify-content-item tn-flex-row-center tn-flex-col-center tn-color-gray">
          <view class="tn-text-center">
            <text class="tn-icon-like-lack tn-padding-xs"></text>
          </view>
          <view class="tn-text-center">
            <text class="tn-text-xs">68</text>
          </view>
        </view>
      </view>
      
      <view class="" style="margin: 20rpx 30rpx 30rpx 80rpx;">
        求摄影师微信，谢谢
      </view>
      
      
      <!-- 评论3-->
      <!-- 图标logo/头像 -->
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-top-xl" @click="tn('/circlePages/blogger_other')">
        <view class="justify-content-item">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left">
            <view class="logo-pic tn-shadow">
              <view class="logo-image">
                <view class="tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg');width: 60rpx;height: 60rpx;background-size: cover;">
                </view>
              </view>
            </view>
            <view class="tn-padding-right tn-padding-left-sm">
              <view class="tn-padding-right tn-text-df tn-text-bold tn-color-black">
                原来是吖释鸭
              </view>
              <view class="tn-padding-right tn-text-ellipsis tn-text-xs tn-color-gray">
                2022年5月25日
              </view>
            </view>
          </view>
        </view>
        <view class="justify-content-item tn-flex-row-center tn-flex-col-center tn-color-gray">
          <view class="tn-text-center">
            <text class="tn-icon-like-lack tn-padding-xs"></text>
          </view>
          <view class="tn-text-center">
            <text class="tn-text-xs">43</text>
          </view>
        </view>
      </view>
      
      <view class="" style="margin: 20rpx 30rpx 30rpx 80rpx;">
        吃瓜群众到此一游，阿巴阿巴
      </view>
      
    </view>
    
    
    <view class="tabbar footerfixed dd-glass">
      <view class="tn-flex tn-flex-row-between tn-flex-col-center">
        <view class="justify-content-item tn-margin-top">
          <view class="tn-flex tn-flex-row-center tn-flex-col-center">
            
            
            <!-- <view class="tn-flex tn-flex-row-center tn-padding-right tn-padding-left">
              <text class="tn-icon-emoji-good tn-text-xxl"></text>
            </view> -->
            
            <view class="tn-flex tn-flex-row-center tn-flex-col-center tn-padding-right tn-padding-left-sm">
              <view class="avatar-all">
                <view class="tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/onepiece-1.jpg');width: 60rpx;height: 60rpx;background-size: cover;">
                </view>
              </view>
            </view>
            
            
            <view class="topic__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="topic__info__item__input__left-icon">
                <view class="tn-icon-emoji-good"></view>
              </view>
              <view class="topic__info__item__input__content">
                <input maxlength="20" placeholder-class="input-placeholder" :cursor-spacing="18" placeholder="不说点啥子吗？" />
              </view>
            </view>
            

            
          </view>
        </view>
        <view class="justify-content-item tn-flex-row-center tn-flex-col-center tn-margin-top tn-margin-right">
          <view class="topic__info__item__sure">
            <view class="tn-flex-1 justify-content-item tn-text-center">
              <tn-button shape="round" backgroundColor="tn-cool-bg-color-15--reverse" width="100%" shadow>
                <text class="tn-color-white" hover-class="tn-hover" :hover-stay-time="150">
                  发 送
                </text>
              </tn-button>
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateDetails',
    mixins: [template_page_mixin],
    data(){
      return {
        content: [
          /* {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
            userName: '可我会像',
            date: '2022年5月20日',
            label: ['开源','创意','UI框架'],
            desc: '开源可商用组件，助你开发酷炫UI一臂之力',
            content: '基础常用的布局元素，酷炫完善的配色体系，统一可增的图标 icon ，简便调用的功能组件，酷炫的前端页面，吖，编不下去了',
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 62
            },
            collectionCount: 439,
            commentCount: 46,
            likeCount: 83
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userName: '可我会像',
            date: '2022年5月20日',
            label: ['开源','创意','UI框架'],
            desc: '开源可商用组件，助你开发酷炫UI一臂之力',
            content: '基础常用的布局元素，酷炫完善的配色体系，统一可增的图标 icon ，简便调用的功能组件，酷炫的前端页面，吖，编不下去了',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/content_1.jpeg'
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 12
            },
            collectionCount: 902,
            commentCount: 64,
            likeCount: 83
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
            userName: '可我会像',
            date: '2022年5月20日',
            label: [],
            desc: '',
            content: '',
            mainImage:[
              'https://resource.tuniaokj.com/images/shop/computer2.jpg',
              'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
              ],
              viewUserCount: 56
            },
            collectionCount: 431,
            commentCount: 26,
            likeCount: 84
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
            userName: '可我会像',
            date: '2022年5月20日',
            label: ['开源','创意'],
            desc: '开源可商用组件',
            content: '基础常用的布局元素，酷炫完善的配色体系，统一可增的图标 icon ，简便调用的功能组件，酷炫的前端页面，吖，编不下去了 基础常用的布局元素，酷炫完善的配色体系，统一可增的图标 icon ，简便调用的功能组件，酷炫的前端页面，吖，编不下去了',
            mainImage:[
              'https://resource.tuniaokj.com/images/swiper/swiper2.jpg',
              'https://resource.tuniaokj.com/images/swiper/swiper3.jpg',
              'https://resource.tuniaokj.com/images/swiper/swiper4.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
              ],
              viewUserCount: 231
            },
            collectionCount: 780,
            commentCount: 89,
            likeCount: 82
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/content_1.jpeg',
            userName: '可我会像',
            date: '2022年5月20日',
            label: ['开源','链接'],
            desc: 'https://www.yuque.com/tuniao',
            mainImage:[
              'https://resource.tuniaokj.com/images/shop/watch1.jpg',
              'https://resource.tuniaokj.com/images/shop/watch2.jpg',
              'https://resource.tuniaokj.com/images/shop/pillow2.jpg',
              'https://resource.tuniaokj.com/images/shop/pillow.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
              ],
              viewUserCount: 28
            },
            collectionCount: 432,
            commentCount: 33,
            likeCount: 12
          }, */
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userName: '可我会像',
            date: '2022年5月20日',
            label: ['开源','创意'],
            desc: '开源可商用组件',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/y11.jpg',
              'https://resource.tuniaokj.com/images/blogger/y33.jpg',
              'https://resource.tuniaokj.com/images/blogger/y22.jpg',
              'https://resource.tuniaokj.com/images/blogger/y44.jpg',
              'https://resource.tuniaokj.com/images/blogger/y55.jpg',
            ],
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
              ],
              viewUserCount: 65
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 102
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
    
    /* 文章内容 start*/
      .blogger {
        &__item {
          padding: 30rpx;
        }
        
        &__author {
          &__btn {
            margin-right: -12rpx;
            padding: 0 20rpx;
          }
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
          &__content {
            
          }
        }
        
        &__content {
          margin-top: 18rpx;
          padding-right: 18rpx;
          
          &__data {
            line-height: 46rpx;
            text-align: justify;
            overflow: hidden;
            transition: all 0.25s ease-in-out;
    
          }
          
          &__status {
            margin-top: 10rpx;
            font-size: 26rpx;
            color: #82B2FF;
          }
        }
        
        &__main-image {
          border-radius: 16rpx;
          
          &--1 {
            max-width: 80%;
            max-height: 300rpx;
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
        
        &__ad {
          width: 100%;
          height: 500rpx;
          transform: translate3d(0px, 0px, 0px) !important;
          
          ::v-deep .uni-swiper-slide-frame {
            transform: translate3d(0px, 0px, 0px) !important;
          }
          .uni-swiper-slide-frame {
            transform: translate3d(0px, 0px, 0px) !important;
          }
          
          &__item {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-origin: left center;
            transform: translate3d(100%, 0px, 0px) scale(1) !important;
            transition: transform 0.25s ease-in-out;
            z-index: 1;
            
            &--0 {
              transform: translate3d(0%, 0px, 0px) scale(1) !important;
              z-index: 4;
            }
            &--1 {
              transform: translate3d(13%, 0px, 0px) scale(0.9) !important;
              z-index: 3;
            }
            &--2 {
              transform: translate3d(26%, 0px, 0px) scale(0.8) !important;
              z-index: 2;
            }
          }
          
          &__content {
            border-radius: 40rpx;
            width: 640rpx;
            height: 500rpx;
            overflow: hidden;
          }
          
          &__image {
            width: 100%;
            height: 100%;
          }
        }
      }
      /* 文章内容 end*/
       
       /* 间隔线 start*/
      .tn-strip-bottom {
       width: 100%;
       border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
      }
       /* 间隔线 end*/
       
    /* 头像 start */
    .logo-image {
      width: 60rpx;
      height: 60rpx;
      position: relative;
    }
    
    .logo-pic {
      background-size: cover;
      background-repeat: no-repeat;
      // background-attachment:fixed;
      background-position: top;
      box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
      border-radius: 50%;
      overflow: hidden;
      // background-color: #FFFFFF;
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
  
  /* 头像*/
  .avatar-all {
    width: 60rpx;
    height: 60rpx;
    border: 4rpx solid rgba(255,255,255,0.05);
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
  }
  
  /* 内容*/
  .topic {
    position: relative;
    height: 100%;
    z-index: 1;
    margin-bottom: 120rpx;
    
    
    /* 表单信息 start */
    &__info {
      margin: 0 50rpx;
      margin-top: 105rpx;
      padding: 30rpx 51rpx;
      border-radius: 20rpx;
      background-color: rgba(255,255,255,1);
      border: 2rpx solid rgba(255, 255, 255, 0.1);
      box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
      
      &__item {
        
        &__input {
          width: 400rpx;
          height: 60rpx;
          border: 1rpx solid #C6D1D8;
          border-radius: 39rpx;
          
          &__left-icon {
            width: 10%;
            font-size: 44rpx;
            margin-left: 20rpx;
            margin-right: 5rpx;
            color: #C6D1D8;
          }
          
          &__content {
            width: 80%;
            padding-left: 10rpx;
            
            &--verify-code {
              width: 56%;
            }
            
            input {
              font-size: 30rpx;
              color: #78909C;
              // letter-spacing: 0.1em;
            }
          }
          
          &__right-icon {
            width: 10%;
            font-size: 34rpx;
            margin-right: 20rpx;
            color: #78909C;
          }
          
          &__right-verify-code {
            width: 34%;
            margin-right: 20rpx;
          }
        }
        
        &__button {
          width: 100%;
          height: 60rpx;
          text-align: center;
          font-size: 31rpx;
          font-weight: bold;
          line-height: 77rpx;
          // text-indent: 1em;
          border-radius: 100rpx;
          color: #FFFFFF;
          background-color: rgba(255,255,255,0.2);
          // border: 2rpx solid #FFFFFF;
        }
        
        &__sure {
          height: 60rpx;
          width: 140rpx;
        }
        
      }
    }
    /* 表单信息 end */
    
    /* 内容 end */
    
  }
  
  /deep/.input-placeholder {
    font-size: 30rpx;
    color: #C6D1D8;
  }
  
</style>
