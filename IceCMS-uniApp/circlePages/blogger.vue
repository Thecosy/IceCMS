<template>
  <view class="template-blogger tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    <!-- 立体头像-->
    <view class='cube' :style="'background-image: url(https://resource.tuniaokj.com/images/blogger/bg_image_1.jpg);'">
      <view class="cube__container">
        <view class="cube__container__body">
          <view class="cube__container__body__item cube__container__body__item--front" :style="{backgroundImage: `url(${userInfo.avatar[0]})`}"></view>
          <view class="cube__container__body__item cube__container__body__item--back" :style="{backgroundImage: `url(${userInfo.avatar[0]})`}"></view>
          <view class="cube__container__body__item cube__container__body__item--right" :style="{backgroundImage: `url(${userInfo.avatar[1]})`}"></view>
          <view class="cube__container__body__item cube__container__body__item--left" :style="{backgroundImage: `url(${userInfo.avatar[1]})`}"></view>
          <view class="cube__container__body__item cube__container__body__item--top" :style="{backgroundImage: `url(${userInfo.avatar[2]})`}"></view>
          <view class="cube__container__body__item cube__container__body__item--bottom" :style="{backgroundImage: `url(${userInfo.avatar[2]})`}"></view>
        </view>
      </view>
      
      
      <view class='tn-text-center tn-margin-top-lg'>
        <view class="tn-padding tn-text-bold tn-text-lg">{{ userInfo.username }}</view>
        <view class="tn-padding-bottom-xl tn-text-lg">{{ userInfo.desc }}</view>
      </view>
    </view>
    
    <!-- 消息&数据 -->
    <view class="blogger-tips-data">
      <view class="blogger-tips-data__wrap tn-bg-white">
        <view class="blogger-tips-data__message tn-flex tn-flex-row-center" @click="tn('/minePages/message')">
          <view class="blogger-tips-data__message__container tn-flex tn-flex-row-center tn-flex-col-center tn-bg-gray--light">
            <view class="blogger-tips-data__message__avatar">
              <tn-avatar
                class=""
                :src="tipsDataMessage.latestMessageUserAvatar"
                size="sm">
              </tn-avatar>
            </view>
            <view class="tn-padding-right tn-padding-left">{{ tipsDataMessage.messageCount }} 条新消息</view>
          </view>
        </view>
        <view class="blogger-tips-data__info tn-flex">
          <view class="tn-flex-1 tn-padding-sm tn-margin-xs">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="">
                <view class="tn-text-xxl tn-color-orange">{{ $t.number.formatNumberAddPriceUnit(tipsDataMessage.likeCount) }}</view>
              </view>
              <view class="tn-margin-top-xs tn-color-gray tn-text-df tn-text-center">
                <text class="tn-icon-like"></text>
                <text class="tn-padding-left-xs">爱心</text>
              </view>
            </view>
          </view>
          <view class="tn-flex-1 tn-padding-sm tn-margin-xs">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="">
                <view class="tn-text-xxl tn-color-blue">{{ $t.number.formatNumberAddPriceUnit(tipsDataMessage.hotReviewsCount) }}</view>
              </view>
              <view class="tn-margin-top-xs tn-color-gray tn-text-df tn-text-center">
                <text class="tn-icon-message"></text>
                <text class="tn-padding-left-xs">热评</text>
              </view>
            </view>
          </view>
          <view class="tn-flex-1 tn-padding-sm tn-margin-xs">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="">
                <view class="tn-text-xxl tn-color-red">{{ $t.number.formatNumberAddPriceUnit(tipsDataMessage.fansCount) }}</view>
              </view>
              <view class="tn-margin-top-xs tn-color-gray tn-text-df tn-text-center">
                <text class="tn-icon-vip"></text>
                <text class="tn-padding-left-xs">粉丝</text>
              </view>
            </view>
          </view>
          <view class="tn-flex-1 tn-padding-sm tn-margin-xs">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="">
                <view class="tn-text-xxl tn-color-cyan">{{ $t.number.formatNumberAddPriceUnit(tipsDataMessage.focusCount) }}</view>
              </view>
              <view class="tn-margin-top-xs tn-color-gray tn-text-df tn-text-center">
                <text class="tn-icon-star"></text>
                <text class="tn-padding-left-xs">关注</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>      
    
    <!-- 内容 -->
    <view class="tn-flex tn-flex-direction-column tn-margin-top-sm tn-margin-bottom">
   
      <!-- 图文信息 -->
      <block v-for="(item,index) in content" :key="index">
        <view class="blogger__item">
          <view class="blogger__author tn-flex tn-flex-row-between tn-flex-col-center">
            <view class="justify__author__info">
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
              <text class="tn-icon-more-vertical tn-color-gray tn-text-bold tn-text-xxl"></text>
            </view>
          </view>
         
          <view class="blogger__desc tn-margin-top-sm tn-margin-bottom-sm tn-text-justify tn-flex-col-center tn-flex-row-left" @click="tn('/circlePages/details')">
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
          @click="tn('/circlePages/details')">
            <view
              class="blogger__content__data"
              :style="{
                height: `${item.contentContainerInit ? (!item.showAllContent ? contentHideShowHeight : item.contentContainerHeight) + 'px' : 'auto'}`
              }"
            >
              {{ item.content }}
            </view>
            <view v-if="item.hideContent" class="blogger__content__status" @tap="switchContentShowStatus(index)">{{ item.showAllContent ? '收起' : '全文'}}</view>
          </view> -->
          
          <block v-if="item.mainImage">
            <view v-if="[1,2,4].indexOf(item.mainImage.length) != -1" class="tn-padding-top-xs" @click="tn('/circlePages/details')">
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
            <view v-else class="tn-padding-top-xs" @click="tn('/circlePages/details')">
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
            <view class="justify-content-item tn-flex tn-flex-col-center">
              <view style="margin-right: 10rpx;margin-left: 20rpx;">
                <tn-avatar-group :lists="item.viewUser.latestUserAvatar" size="sm"></tn-avatar-group>
              </view>
              <text class="tn-color-gray">{{ item.viewUser.viewUserCount }}人</text>
            </view>
          </view>
        </view>
        
        <!-- 边距间隔 -->
        <view class="tn-strip-bottom" v-if="index != content.length - 1"></view>
      </block>
      
      <!-- 边距间隔 -->
      <view class="tn-strip-bottom"></view>
      
      <!-- 广告 -->
      <view class="blogger__item" @click="tn('/circlePages/advertise')">
        <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-bottom">
          <view class="justify-content-item">
            <view class="tn-flex tn-flex-col-center tn-flex-row-left">
              <!-- 图标logo -->
              <view class="ad-pic tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/logo/logo2.png')">
                <view class="ad-image">
                </view>
              </view>
              <view class="tn-padding-right" style="width: 65vw;">
                <view class="tn-padding-right tn-padding-left-sm tn-text-bold tn-text-lg">抓住那只猪科技有限公司</view>
                <view class="tn-padding-right tn-padding-left-sm tn-color-gray tn-text-ellipsis">我们都是好好孩子</view>
              </view>
              
            </view>
          </view>
          <view class="tn-color-gray">广告</view>
        </view>
        <tn-stack-swiper ref="stackSwiper" :list="adList" :switchRate="30" :height="360" width="92%" :autoplay="adAutoplay"></tn-stack-swiper>
      </view>
      
      <!-- 边距间隔 -->
      <view class="tn-strip-bottom"></view>
      
      <!-- 图文信息 -->
      <block v-for="(item,index) in content" :key="index">
        <view class="blogger__item">
          <view class="blogger__author tn-flex tn-flex-row-between tn-flex-col-center">
            <view class="justify__author__info">
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
              <text class="tn-icon-more-vertical tn-color-gray tn-text-bold tn-text-xxl"></text>
            </view>
          </view>
         
          <view class="blogger__desc tn-margin-top-sm tn-margin-bottom-sm tn-text-justify tn-flex-col-center tn-flex-row-left" @click="tn('/circlePages/details')">
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
          @click="tn('/circlePages/details')">
            <view
              class="blogger__content__data"
              :style="{
                height: `${item.contentContainerInit ? (!item.showAllContent ? contentHideShowHeight : item.contentContainerHeight) + 'px' : 'auto'}`
              }"
            >
              {{ item.content }}
            </view>
            <view v-if="item.hideContent" class="blogger__content__status" @tap="switchContentShowStatus(index)">{{ item.showAllContent ? '收起' : '全文'}}</view>
          </view> -->
          
          <block v-if="item.mainImage">
            <view v-if="[1,2,4].indexOf(item.mainImage.length) != -1" class="tn-padding-top-xs" @click="tn('/circlePages/details')">
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
            <view v-else class="tn-padding-top-xs" @click="tn('/circlePages/details')">
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
            <view class="justify-content-item tn-flex tn-flex-col-center">
              <view style="margin-right: 10rpx;margin-left: 20rpx;">
                <tn-avatar-group :lists="item.viewUser.latestUserAvatar" size="sm"></tn-avatar-group>
              </view>
              <text class="tn-color-gray">{{ item.viewUser.viewUserCount }}人</text>
            </view>
          </view>
        </view>
        
        <!-- 边距间隔 -->
        <view class="tn-strip-bottom" v-if="index != content.length - 1"></view>
      </block>
       
          
    </view>
    
    <!-- 悬浮按钮-->
    <!-- <view class="tn-flex tn-flex-row-between tn-footerfixed">
      <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
        <tn-button backgroundColor="#00FFC6" padding="40rpx 0" width="90%" shadow fontBold>
          <text class="tn-icon-add tn-padding-right-xs tn-color-black"></text>
          <text class="tn-color-black">关 注</text>
        </tn-button>
      </view>
      <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
        <tn-button backgroundColor="#FFF00D" padding="40rpx 0" width="90%" shadow fontBold open-type="share">
          <text class="tn-icon-share-triangle tn-padding-right-xs tn-color-black"></text>
          <text class="tn-color-black">分 享</text>
        </tn-button>
      </view>
    </view> -->
    
    
    <!-- <view class="edit tnxuanfu" @click="navEdit">
      <view class="bg0 pa">
        <view class="bg1">
          <image src="https://resource.tuniaokj.com/images/my/my6.png" class="button-shop shadow"></image>
        </view>
      </view>
      <view class="hx-box pa">
        <view class="pr">
          <view class="hx-k1 pa0">
            <view class="span"></view>
          </view>
          <view class="hx-k2 pa0">
            <view class="span"></view>
          </view>
          <view class="hx-k3 pa0">
            <view class="span"></view>
          </view>
          <view class="hx-k4 pa0">
            <view class="span"></view>
          </view>
          <view class="hx-k5 pa0">
            <view class="span"></view>
          </view>
          <view class="hx-k6 pa0">
            <view class="span"></view>
          </view>
        </view>
      </view>
    </view> -->
    
    
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateBlogger',
    mixins: [template_page_mixin],
    data() {
      return {
        // 内容默认隐藏显示的高度
        contentHideShowHeight: 0,
        userInfo: {
          avatar: [
            'https://resource.tuniaokj.com/images/blogger/blogger_avatar_1.jpeg',
            'https://resource.tuniaokj.com/images/blogger/blogger_avatar_2.jpeg',
            'https://resource.tuniaokj.com/images/blogger/blogger_avatar_3.jpeg',
          ],
          username: 'IceCMS北北',
          desc: '你是不是傻，菜的一撇的北北'
        },
        tipsDataMessage: {
          latestMessageUserAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
          messageCount: 3,
          likeCount: 1290,
          hotReviewsCount: 896,
          fansCount: 962,
          focusCount: 86
        },
        content: [
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userName: 'IceCMS北北',
            date: '2021年12月20日',
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
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userName: 'IceCMS北北',
            date: '2021年12月20日',
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
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userName: 'IceCMS北北',
            date: '2021年12月20日',
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
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userName: 'IceCMS北北',
            date: '2021年12月20日',
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
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userName: 'IceCMS北北',
            date: '2021年12月20日',
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
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userName: 'IceCMS北北',
            date: '2021年12月20日',
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
            likeCount: 62
          }
        ],
        // adSwiperCurrentIndex: 0,
        adList: [
          {image: 'https://resource.tuniaokj.com/images/swiper/ad1.jpg'},
          {image: 'https://resource.tuniaokj.com/images/swiper/ad2.jpg'},
          {image: 'https://resource.tuniaokj.com/images/swiper/ad3.jpg'},
          {image: 'https://resource.tuniaokj.com/images/swiper/ad4.jpg'},
          {image: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'}
        ],
        adAutoplay: false
      }
    },
    computed: {
      // adSwiperItemClass() {
      //   return (index) => {
      //     const adLength = this.adContent.length
      //     let activeIndex = 0
      //     if (index < this.adSwiperCurrentIndex) {
      //       activeIndex = adLength - this.adSwiperCurrentIndex + index
      //     } else if (index === this.adSwiperCurrentIndex) {
      //       activeIndex = 0
      //     } else if (index > this.adSwiperCurrentIndex) {
      //       activeIndex = index - this.adSwiperCurrentIndex
      //     }
      //     return `blogger__ad__item--${activeIndex}`
      //   }
      // },
      // adSwiperItemStyle() {
      //   return (index) => {
          
      //     let style = {
      //       transform: `translate3d(0%, 0px, 0px) scale(1)`,
      //       zIndex: 1
      //     }
          
      //     switch (index) {
      //       case 0:
      //         style.zIndex = 4
      //         break
      //       case 1:
      //         style.zIndex = 3
      //         style.transform = `translate3d(10%, 0px, 0px) scale(0.9)`
      //         break
      //       case 2:
      //         style.zIndex = 2
      //         style.transform = `translate3d(20%, 0px, 0px) scale(0.8)`
      //         break
      //       default:
      //         break
      //     }
          
      //     return style
      //   }
      // }
    },
    onLoad() {
      this.initContentData()
      this.contentHideShowHeight = uni.upx2px(56) * 3
    },
    onReady() {
      this.$nextTick(() => {
        this.getContentRectInfo()
      })
    },
    onShow() {
      this.adAutoplay = true
    },
    onHide() {
      this.adAutoplay = false
    },
    methods: {
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
      // 震动跳转
      navEdit(e) {
        wx.vibrateLong();
        uni.navigateTo({
          url: '/circlePages/edit'
        })
      },
      // 处理内容，给内容添加对应的标识信息
      initContentData() {
        this.content.forEach((item, index) => {
          // 是否需要隐藏内容
          item.hideContent = false
          // 显示所有内容
          item.showAllContent = false
          // 内容容器的实际高度
          item.contentContainerHeight = 0
          // 内容容器是否初始化完成
          item.contentContainerInit = false
          this.$set(this.content, index, item)
        })
      },
      // 获取内容容器的信息
      getContentRectInfo() {
        let contentRect = {}
        const query = uni.createSelectorQuery().in(this)
        // 筛选出存在内容的数据
        this.content.forEach((item, index) => {
          if (item?.content) {
            query.select(`#blogger__content--${index}`).boundingClientRect()
            contentRect[index] = item
          }
        })
        // 获取所有内容的宽高信息
        query.exec(res => {
          if (!res) {
            setTimeout(() => {
              this.getContentRectInfo()
            }, 10)
            return
          }
          // console.log(res);
          res.map((item) => {
            // console.log(item.height, this.contentHideShowHeight);
            // 获取对应的标号
            const id = item.id
            const idIndex = /blogger__content--(\d)/.exec(id)[1]
            let contentItem = this.content[idIndex]
            contentItem.hideContent = item.height > this.contentHideShowHeight
            contentItem.showAllContent = false
            contentItem.contentContainerHeight = item.height
            contentItem.contentContainerInit = true
            this.$set(this.content, idIndex, contentItem)
            
            // console.log(/blogger__content--(\d)/.exec(id)[1]);
          })
        })
      },
      // 切换内容的显示与隐藏
      switchContentShowStatus(index) {
        const contentItem = this.content[index]
        contentItem.showAllContent = !contentItem.showAllContent
        this.$set(this.content, index, contentItem)
      },
      
      
      // adSwiperChange(e) {
      //   // console.log(e);
      //   this.adSwiperCurrentIndex = e.detail.current
      // }
    }
  }
</script>

<style lang="scss" scoped>
  
  .template-blogger{
    
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
  
  $cube-size: 120rpx;
  $cube-split: 60rpx;
  
  /* 立体头像 start*/
  
  .cube {
    background: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    height: 550rpx;
    display: flex;
    justify-content: center;
    padding-top: 40rpx;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    align-items: center;
    font-weight: 300;
    
    &__container {
      margin-top: 180rpx;
      position: relative;
      width: $cube-size;
      height: $cube-size;
      -webkit-perspective: 500px;
      perspective: 500px;//透视太大会超过屏幕就不好了吖
      
      &:before {
        content: '';
        width: $cube-size;
        height: $cube-size;
        position: absolute;
        // top: calc(50% - ($cube-split - 30px));
        // left: calc(50% - $cube-split);
        background-color: #3c6496;
        filter: blur(60px);
        opacity: .8;
      }
      
      &__body {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transform: translateZ(-75px);
        animation: cubeFrame 35s cubic-bezier(0.36, -0.03, 0.46, 0.95) infinite alternate;
        will-change: transform;
        
        &__item {
          position: absolute;
          display: block;
          display: flex;
          align-items: center;
          justify-content: center;
          width: $cube-size;
          height: $cube-size;
          font-size: 30px;
          background-repeat: no-repeat;
          background-size: cover;
          
          &--front {
            transform: rotateY(0deg) translateZ($cube-split);
            background-color: #BEEBFF;
          }
          &--back {
            transform: rotateX(180deg) translateZ($cube-split);
            background-color: #BEEBFF;
          }
          &--right {
            transform: rotateY(90deg) translateZ($cube-split);
            background-color: #BEEBFF;
          }
          &--left {
            transform: rotateY(-90deg) translateZ($cube-split);
            background-color: #BEEBFF;
          }
          &--top {
            transform: rotateX(90deg) translateZ($cube-split);
            background-color: #BEEBFF;
          }
          &--bottom {
            transform: rotateX(-90deg) translateZ($cube-split);
            background-color: #BEEBFF;
          }
        }
      }
    }
  }
  
  @keyframes cubeFrame {
    10% {
      transform: translateZ(-75px) rotateX(40deg) rotateY(60deg);
    }
    15% {
      transform: translateZ(-75px) rotateX(80deg) rotateY(20deg);
    }
    20% {
      transform: translateZ(-75px) rotateX(-180deg) rotateY(-70deg);
    }
    30% {
      transform: translateZ(-75px) rotateX(90deg) rotateY(180deg);
    }
    40% {
      transform: translateZ(-75px) rotateX(-10deg) rotateY(-140deg);
    }
    45% {
      transform: translateZ(-75px) rotateX(-100deg) rotateY(20deg);
    }
    55% {
      transform: translateZ(-75px) rotateX(-10deg) rotateY(-35deg);
    }
    60% {
      transform: translateZ(-75px) rotateX(180deg) rotateY(360deg);
    }
    70% {
      transform: translateZ(-75px) rotateX(-180deg) rotateY(-360deg);
    }
    80% {
      transform: translateZ(-75px) rotateX(45deg) rotateY(-70deg);
    }
    90% {
      transform: translateZ(-75px) rotateX(-45deg) rotateY(70deg);
    }
    100% {
      transform: translateZ(-75px) rotateX(-360deg) rotateY(360deg);
    }
  }
  /* 立体头像 end*/
  
  /* 信息提示 start */
  .blogger-tips-data {
    background-color: #F8F7F3;
    
    &__wrap {
      border-radius: 60rpx 60rpx 0 0;
    }
    
    &__message {
      padding-top: 60rpx;
      
      &__container {
        padding: 5rpx;
        border-radius: 100rpx;
      }
      
      &__avatar {
        margin: 6rpx 0 0 6rpx;
      }
    }
    
    &__info {
      padding: 40rpx 0 0 0;
    }
  }
  /* 信息提示 end */
  
  /* 文章内容 start*/
  .blogger {
    &__item {
      padding: 30rpx;
    }
    
    &__author {
      &__btn {
        margin-right: -12rpx;
        opacity: 0.5;
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
  /* 底部悬浮按钮 start*/ 
  .tn-tabbar-height {
  	min-height: 100rpx;
  	height: calc(120rpx + env(safe-area-inset-bottom) / 2);
  }
  .tn-footerfixed {
    position: fixed;
    width: 100%;
    bottom: calc(30rpx + env(safe-area-inset-bottom));
    z-index: 1024;
    box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);
    
  }
  /* 底部悬浮按钮 end*/
  
  /* 广告内容 start */
  .ad-image{
    width: 80rpx;
    height: 80rpx;
    position: relative;
  }
  .ad-pic{
    background-size: cover;
    background-repeat:no-repeat;
    // background-attachment:fixed;
    background-position:top;
    border-radius: 20%;
  }
  /* 自定义导航栏内容 end */
  
  /* 悬浮 */
  .tnxuanfu{
    animation: suspension 3s ease-in-out infinite;
  }
  
  @keyframes suspension {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.8rem);
    }
  }
  /* 悬浮按钮 */
  .button-shop {
    width: 90rpx;
    height: 90rpx;
    display: flex;
    flex-direction: row;
    position: fixed;
    /* bottom:200rpx;
      right: 20rpx; */
    left: 5rpx;
    top: 5rpx;
    z-index: 1001;
    border-radius: 100px;
    opacity: 0.9;
  }
  
  
  /* 按钮 */
  .edit {
    bottom: 300rpx;
    right: 75rpx;
    position: fixed;
    z-index: 9999;
  }
  
  
  .pa,
  .pa0 {
    position: absolute
  }
  
  .pa0 {
    left: 0;
    top: 0
  }
  
  
  .bg0 {
    width: 100rpx;
    height: 100rpx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .bg1 {
    width: 100%;
    height: 100%;
  }
  
  
  
  
  .hx-box {
    top: 50%;
    left: 50%;
    width: 100rpx;
    height: 100rpx;
    transform-style: preserve-3d;
    transform: translate(-50%, -50%) rotateY(75deg) rotateZ(10deg);
  }
  
  .hx-box .pr {
    width: 100rpx;
    height: 100rpx;
    transform-style: preserve-3d;
    animation: hxz 20s linear infinite;
  }
  
  @keyframes hxz {
    0% {
      transform: rotateX(0deg);
    }
  
    100% {
      transform: rotateX(-360deg);
    }
  }
  
  
  
  .hx-box .pr .pa0 {
    width: 100rpx;
    height: 100rpx;
    /* border: 4px solid #5ec0ff; */
    border-radius: 1000px;
  }
  
  .hx-box .pr .pa0 .span {
    display: block;
    width: 100%;
    height: 100%;
    background: url(https://resource.tuniaokj.com/images/cool_bg_image/arc4.png) no-repeat center center;
    background-size: 100% 100%;
    animation: hx 4s linear infinite;
  }
  
  @keyframes hx {
    to {
      transform: rotate(360deg);
    }
  }
  
  .hx-k1 {
    transform: rotateX(-60deg) rotateZ(-60deg)
  }
  
  .hx-k2 {
    transform: rotateX(-30deg) rotateZ(-30deg)
  }
  
  .hx-k3 {
    transform: rotateX(0deg) rotateZ(0deg)
  }
  
  .hx-k4 {
    transform: rotateX(30deg) rotateZ(30deg)
  }
  
  .hx-k5 {
    transform: rotateX(60deg) rotateZ(60deg)
  }
  
  .hx-k6 {
    transform: rotateX(90deg) rotateZ(90deg)
  }
  
</style>
