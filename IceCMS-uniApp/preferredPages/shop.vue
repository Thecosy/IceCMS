<template>
  <view class="template-shop tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    
    <swiper class="card-swiper" :circular="true"
      :autoplay="true" duration="500" interval="28000" @change="cardSwiper"> 
      <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
        <view class="swiper-item image-banner">
          <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- <view class="indication">
        <block v-for="(item,index) in swiperList" :key="index">
            <view class="spot" :class="cardCur==index?'active':''"></view>
        </block>
    </view> -->
    
    <!-- 店铺 start-->
    <view class="shop-function tn-margin-bottom-xl" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin">
        <view class="justify-content-item">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left">
            <view class="logo-pic tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg')">
              <view class="logo-image" >
              </view>
            </view>
            <view class="tn-padding-right tn-color-white">
              <view class="tn-padding-right tn-padding-left-sm tn-text-xl tn-text-bold">
                北北山庄（番禺店）
              </view>
              <view class="tn-padding-right tn-padding-top-xs tn-text-ellipsis tn-padding-left-sm tn-text-sm">
                <text class="tn-padding-right-sm">正常营业</text>
                <text>周一到周五 09:00 至 18:00</text>
              </view>
            </view>
          </view>
        </view>
        <view class="justify-content-item tn-flex-row-center">
          <view class="tn-padding-xs tn-color-white tn-round tn-shadow-blur">
            <text class="tn-icon-share-circle tn-padding-xs tn-text-xxl"></text>
          </view>
        </view>
      </view>
    </view>
    <!-- 店铺 end-->
    
    <!-- 更多信息-->
    <view class="shop-shadow tn-margin tn-color-black tn-bg-white" style="position: relative;z-index: 1;padding: 30rpx 6rpx;">
      <view class="tn-margin-bottom-sm">
        <tn-notice-bar :list="list" mode="vertical" leftIconName="sound"></tn-notice-bar>
      </view>
      
      <!-- 方式9 start-->
      <view class="tn-flex">
        <view class="tn-flex-1 tn-margin-xs tn-radius" @click="tn('/preferredPages/photo')">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon9__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-orange tn-color-white">
              <view class="tn-icon-image"></view>
            </view>  
            <view class="tn-color-black tn-text-sm tn-text-center">
              <text class="tn-text-ellipsis">山庄相册</text>
            </view>
          </view>
        </view>
        <view class="tn-flex-1 tn-margin-xs tn-radius">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon9__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-red tn-color-white">
              <view class="tn-icon-copy"></view>
            </view>  
            <view class="tn-color-black tn-text-sm tn-text-center">
              <text class="tn-text-ellipsis">服务预约</text>
            </view>
          </view>
        </view>
        <view class="tn-flex-1 tn-margin-xs tn-radius">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon9__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-cyan tn-color-white">
              <view class="tn-icon-comment"></view>
            </view>  
            <view class="tn-color-black tn-text-sm tn-text-center">
              <text class="tn-text-ellipsis">客户评价</text>
            </view>
          </view>
        </view>
        <view class="tn-flex-1 tn-margin-xs tn-radius">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon9__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-blue tn-color-white">
              <view class="tn-icon-signpost"></view>
            </view>  
            <view class="tn-color-black tn-text-sm tn-text-center">
              <text class="tn-text-ellipsis">打卡攻略</text>
            </view>
          </view>
        </view>
        <view class="tn-flex-1 tn-margin-xs tn-radius" @tap="showLandscape">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <view class="icon9__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-purple tn-color-white">
              <view class="tn-icon-level"></view>
            </view>  
            <view class="tn-color-black tn-text-sm tn-text-center">
              <text class="tn-text-ellipsis">资质证书</text>
            </view>
          </view>
        </view>
      </view>
      
    </view>
    
    
    <view class="shop-shadow tn-margin tn-color-black tn-bg-white" @click="openLocation">
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xs tn-padding-bottom-xs">
        <view class="justify-content-item">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left">
            <view class="tn-padding tn-color-black">
              <view class="tn-padding-right-sm tn-text-lg tn-text-bold">
                广东省广州市番禺祈福新村129号
              </view>
              <view class="tn-padding-right tn-padding-top-xs tn-text-ellipsis tn-text-xs tn-color-gray">
                <text class="">距离你12.8km</text>
                <text class="tn-padding-left-xs">驾车24分钟</text>
                <text class="tn-padding-left-xs">公交地铁2小时</text>
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
    </view>
    
    
    <view class="">
      <view class="nav_title--wrap">
        <view class="nav_title tn-bg-black">
          <!-- <text class="tn-icon-relation tn-padding-right-sm tn-text-xxl"></text> -->
          <text class="tn-text-xl">产品中心 · 优质项目</text>
          <!-- <text class="tn-icon-relation tn-padding-left-sm tn-text-xxl"></text> -->
        </view>
      </view>
    </view> 
    
    <!-- 商家商品 start-->
    <view class="tn-flex tn-flex-wrap tn-margin-left-sm tn-margin-bottom-sm tn-margin-right-sm tn-margin-top-xs">
      <block v-for="(item, index) in content" :key="index">
        <view class="" style="width: 50%;" @click="tn('/preferredPages/product')">
          <view class="tn-blogger-content__wrap">
            <view class="image-picbook" :style="'background-image:url(' + item.mainImage + ')'">
              <view class="image-book">
              </view>
            </view> 
            
            <view class="tn-blogger-content__label tn-text-justify tn-padding-sm">
              <text class="tn-blogger-content__label__desc">{{ item.desc }}</text>  
            </view>
            
            <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-left-sm tn-padding-right-sm tn-padding-bottom-sm">
              <view class="justify-content-item tn-flex tn-flex-col-center">
                <view>
                  <view class="">
                    <text class="tn-blogger-content__count-icon tn-color-purplered" style="font-size: 24rpx;">￥</text> 
                    <text class="tn-padding-right-sm tn-text-bold tn-color-purplered" style="font-size: 38rpx;">{{ item.collectionCount }}</text>
                    <!-- <text class="tn-blogger-content__count-icon tn-icon-message"></text>
                    <text class="tn-padding-right-sm">{{ item.commentCount }}</text> -->
                    <text class="tn-color-gray tn-text-sm" style="font-size: 24rpx;text-decoration: line-through">￥{{ item.likeCount }}</text>
                  </view>
                </view>
              </view>
              <!-- <view class="justify-content-item tn-text-center">
                <view v-for="(label_item,label_index) in item.label" :key="label_index" class="tn-blogger-content__label__item tn-float-left tn-margin-right tn-bg-gray--light tn-round tn-text-sm tn-text-bold">
                  <text class="tn-blogger-content__label__item--prefix">#</text> {{ label_item }}
                </view>
              </view> -->
            </view>
            
            <view class="tn-flex tn-flex-col-center tn-padding-left-sm tn-padding-right-sm tn-padding-bottom-sm">
              <view class="justify-content-item tn-flex tn-flex-col-center">
                <view style="margin-right: 10rpx;margin-left: 0rpx;">
                  <tn-avatar-group :lists="item.viewUser.latestUserAvatar" size="sm"></tn-avatar-group>
                </view>
                <text class="tn-color-gray">{{ item.viewUser.viewUserCount }}人查看</text>
              </view>
            </view>
            
            
            
          </view>
        </view>
      </block>
    </view>
    <!-- 商品 end-->

    <view class="">
      <view class="nav_title--wrap">
        <view class="nav_title tn-bg-black">
          <!-- <text class="tn-icon-relation tn-padding-right-sm tn-text-xxl"></text> -->
          <text class="tn-text-xl">品质服务 · 专业定制</text>
          <!-- <text class="tn-icon-relation tn-padding-left-sm tn-text-xxl"></text> -->
        </view>
      </view>
    </view> 
    
    <!-- 图文 -->
    <view class="tn-flex tn-flex-direction-column">
      
      <block v-for="(item,index) in content2" :key="index">
        <view class="tn-blogger-content2__wrap">
          <view class="tn-padding-top-xs">
            <!-- 方式一 -->
            <view class="tn-shadow-blur image-pic" :style="'background-image:url(' + item.mainImage + ')'">
              <view class="image-design">
              </view>
            </view>
            <!-- 方式二 -->
            <!-- <image 
              class="tn-blogger-content2__main-image tn-shadow tn-blogger-content2__main-image--1 tn-margin-bottom-sm"
              :src="item.mainImage"
              mode="aspectFill"
            ></image> -->
          </view>
          <view class="tn-blogger-content2__label tn-text-justify tn-margin-top tn-margin-bottom-sm">
            <text class="tn-blogger-content2__label__desc tn-text-bold tn-text-xl">{{ item.desc }}</text>  
          </view>
          
          <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-top-xs">
            <view class="justify-content-item tn-flex tn-flex-col-center">
              <view style="margin-right: 10rpx;margin-left: 0rpx;">
                <view class="tn-color-gray">
                  <text class="tn-blogger-content2__count-icon tn-icon-flower"></text> 
                  <text class="tn-padding-right">{{ item.collectionCount }}</text>
                  <text class="tn-blogger-content2__count-icon tn-icon-message"></text>
                  <text class="tn-padding-right">{{ item.commentCount }}</text>
                  <text class="tn-blogger-content2__count-icon tn-icon-like"></text>
                  <text class="">{{ item.likeCount }}</text>
                </view>
              </view>
            </view>
            <view class="justify-content-item tn-text-center">
              <view v-for="(label_item,label_index) in item.label" :key="label_index" class="tn-blogger-content2__label__item tn-float-left tn-margin-right tn-bg-gray--light tn-round tn-text-sm tn-text-bold">
                <text class="tn-blogger-content2__label__item--prefix">#</text> {{ label_item }}
              </view>
              
            </view>
          </view>
        </view>
        
      </block>
    </view>
    
    <view class="">
      <view class="nav_title--wrap">
        <view class="nav_title tn-bg-black">
          <!-- <text class="tn-icon-relation tn-padding-right-sm tn-text-xxl"></text> -->
          <text class="tn-text-xl">新闻中心 · 动态资讯</text>
          <!-- <text class="tn-icon-relation tn-padding-left-sm tn-text-xxl"></text> -->
        </view>
      </view>
    </view> 
    
    <!-- 不建议写时间，因为写了时间，你就要经常更新文章了鸭-->
    <view class="">
      <block v-for="(item, index) in content3" :key="index">
        <view class="article-shadow tn-margin">
          <view class="tn-flex">
            <view class="tn-margin-sm tn-padding-top-xs" style="width: 100%;">
              <view class="tn-text-lg tn-text-bold clamp-text-1 tn-text-justify">
                <text class="">{{ item.title }}</text>
              </view>
              <view class="tn-padding-top-xs" style="min-height: 90rpx;">
                <text class="tn-text-df tn-color-gray clamp-text-2 tn-text-justify">
                  {{ item.desc }}
                </text>
              </view>
              <view class="tn-flex tn-flex-row-between tn-flex-col-between">
                <view v-for="(label_item,label_index) in item.label" :key="label_index" style="transform: translate(0rpx,6rpx);"
                  class="justify-content-item tn-tag-content__item tn-margin-right-xs tn-round tn-text-sm tn-text-bold" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
                  <text class="tn-tag-content__item--prefix">#</text> {{ label_item }}
                </view>
                <view class="justify-content-item tn-color-gray tn-text-center tn-color-gray--disabled" style="padding-top: 15rpx;">
                  <text class="tn-icon-footprint tn-padding-right-xs tn-text-lg"></text>
                  <text class="tn-padding-right tn-text-df">{{ item.collectionCount }}</text>
                  <text class="tn-icon-like-lack tn-padding-right-xs tn-text-lg"></text>
                  <text class="tn-text-df">{{ item.likeCount }}</text>
                </view>
              </view>
            </view>
            <view class="image-pic tn-margin-sm" :style="'background-image:url(' + item.userAvatar + ')'">
              <view class="image-article">
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
    
    
    <view class="">
      <view class="nav_title--wrap">
        <view class="nav_title tn-bg-black">
          <!-- <text class="tn-icon-relation tn-padding-right-sm tn-text-xxl"></text> -->
          <text class="tn-text-xl">合作伙伴 · 战略互赢</text>
          <!-- <text class="tn-icon-relation tn-padding-left-sm tn-text-xxl"></text> -->
        </view>
      </view>
    </view> 
    
    <view class="tn-margin tn-info__container tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-between">
      <block v-for="(item, index) in partner" :key="index">
        <view class="tn-info__item tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between shop-shadow">
          <view class="tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
            <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur"
            :style="'background-image:url('+ item.url + ');background-size:100% 100%;'">
            </view>
            <view class="tn-padding-left-sm">
              <view class="tn-text-bold">{{ item.name }}</view>
              <view class="tn-padding-top-xs tn-text-xs">{{ item.title }}</view>
            </view>
          </view>
         <!-- <view class="">
            wwww
          </view> -->
        </view>
      </block>
    </view>
    
    
    
    <tn-modal v-model="show1" :custom="true">
      <view class="custom-modal-content">
        <image @tap="previewQRCodeImage" src='https://resource.tuniaokj.com/images/advertise/qrcode.jpg' mode='aspectFill' style="width: 100%;"></image>
        <view class="tn-text-center tn-padding-top">作者微信：tnkewo</view>
        <view class="tn-text-center tn-padding-top tn-text-lg">点击上图，可识别微信二维码</view>
      </view>
    </tn-modal>
    
    <!-- 压屏窗-->
    <tn-landscape :show="show2" @close="closeLandscape" closePosition="bottom">
      <swiper class="card-swiper2" :circular="true"
        :autoplay="false" duration="500" interval="18000" previous-margin="185rpx" next-margin="185rpx" @change="cardSwiper2"> 
        <swiper-item v-for="(item,index) in swiperList2" :key="index" :class="cardCur2==index?'cur':''">
          <!-- <view class="swiper-item image-banner">
            <image :src="item.url" mode="widthFix" v-if="item.type=='image'"></image>
          </view> -->
          <!-- <view class="swiper-item image-banner" :style="'background-image:url('+ item.url + ');width: 230rpx;height: 100%;background-size:100% 100%;'">
          </view> -->
          
          <view class="tnphone-black-min swiper-item  wow fadeInLeft2">
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
                <!-- <div class="talk"></div> -->
                
                <view class="image-banner2">
                  <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
                </view>
          
          		</view>
          	</view>
          </view>
          
        </swiper-item>
      </swiper>
      
      <view class="indication2">
          <block v-for="(item,index) in swiperList2" :key="index">
              <view class="spot2" :class="cardCur2==index?'active':''"></view>
          </block>
      </view>
      
    </tn-landscape>
    
    
    
    <!-- 底部tabbar start-->
    <view class="tabbar footerfixed dd-glass" style="border-radius: 100rpx;">
      <view class="action">
        <view class="bar-icon">
          <view class="tn-icon-company tn-color-grey--dark">
          </view>
          <!-- <image class="" src='https://resource.tuniaokj.com/images/logo/logo2.png'></image> -->
        </view>
        <view class="tn-color-grey--dark">北北山庄</view>
      </view>
      <view class="action" @click="callPhoneNumber" data-number="18219126666">
        <view class="bar-icon">
          <view class="tn-icon-tel tn-color-grey">
          </view>
          <!-- <image class="" src='https://resource.tuniaokj.com/images/tabbar/k2.png'></image> -->
        </view>
        <view class="tn-color-gray">电话</view>
      </view>
      <view class="action" @click="showModal">
        <view class="bar-icon">
          <view class="tn-icon-wechat tn-color-grey">
          </view>
          <!-- <image class="" src='https://resource.tuniaokj.com/images/tabbar/i2.png'></image> -->
        </view>
        <view class="tn-color-gray">微信</view>
      </view>
      <view class="action" @click="openLocation">
        <view class="bar-icon">
          <view class="tn-icon-map tn-color-grey">
          </view>
          <!-- <image class="" src='https://resource.tuniaokj.com/images/tabbar/d2.png'></image> -->
        </view>
        <view class="tn-color-gray">导航</view>
      </view>
    </view>
    <view class='tn-tabbar-height'></view>

    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateShop',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/swiper/adno3.jpg',
        }, {
          id: 1,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/swiper/adno4.jpg',
        }, {
          id: 2,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/swiper/adno5.jpg',
        }, {
          id: 3,
          type: 'image',
          url: 'https://resource.tuniaokj.com/images/swiper/adno2.jpg',
        }],
        cardCur2: 0,
        swiperList2: [{
          id: 0,
          type: 'image',
          name: '如虎添亿，其乐融融',
          url: 'https://resource.tuniaokj.com/images/new/honor.jpg'
        }, {
          id: 1,
          type: 'image',
          name: '新年快乐，恭喜发财',
          url: 'https://resource.tuniaokj.com/images/bless/bless-1.jpg'
        }, {
          id: 2,
          type: 'image',
          name: '年年有福，开门大红',
          url: 'https://resource.tuniaokj.com/images/bless/bless-2.jpg'
        }, {
          id: 3,
          type: 'image',
          name: '眼疾手快，票子多多',
          url: 'https://resource.tuniaokj.com/images/bless/bless-3.jpg'
        }, {
          id: 4,
          type: 'image',
          name: '如虎添亿，其乐融融',
          url: 'https://resource.tuniaokj.com/images/bless/bless-4.jpg'
        }],
        list: [
          '受疫情影响，仅支持预约包间，请理解！',
          '感谢各位新老顾客的支持与信任！',
          '十周年庆典，充10000送3000，活动仅此一次',
        ],
        content: [
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userName: '抓住那只猪',
            date: '2021年12月20日',
            label: ['烤肉','烤肉'],
            desc: '开源可商用组件',
            mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg',
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 325
            },
            collectionCount: 129,
            commentCount: 999,
            likeCount: 965
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
            userName: '五彩斑斓的黑',
            date: '2021年12月20日',
            label: ['炸串','火锅'],
            desc: '开源可商用组件',
            mainImage: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg',
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 36
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 622
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
            userName: '北北你真菜',
            date: '2021年12月20日',
            label: ['烤肉','烤肉'],
            desc: '开源可商用组件',
            mainImage: 'https://resource.tuniaokj.com/images/shop/computer2.jpg',
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 763
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 543
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
            userName: '你的小可爱',
            date: '2021年12月20日',
            label: ['烤肉','烤肉'],
            desc: '开源可商用组件',
            mainImage: 'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 89
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 873
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/shop/computer2.jpg',
            userName: '菜的一撇的北北',
            date: '2021年12月20日',
            label: ['烤肉','烤肉'],
            desc: '开源可商用组件',
            mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg',
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 289
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 899
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
            userName: '高产似母猪',
            date: '2021年12月20日',
            label: ['烤肉','烤肉'],
            desc: '我们都是好孩子',
            mainImage: 'https://resource.tuniaokj.com/images/shop/watch1.jpg',
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 642
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 765
          }
        ],
        content2: [
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '开源可商用组件',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
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
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '开源可商用组件',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
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
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['站点','链接'],
            desc: 'https://www.yuque.com/tuniao',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
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
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['开源','创意'],
            desc: '开源可商用组件',
            mainImage:[
              'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
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
        ],
        content3: [{
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'red',
            label: ['小程序'],
            title: '小程序官网源码，开源欢迎白嫖嗷嗷',
            desc: '小程序前端源码开源，欢迎白嫖嗷嗷，可以的话，插件市场三连支持一下',
            mainImage: 'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 567
            },
            collectionCount: 543,
            commentCount: 543,
            likeCount: 206
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            color: 'brown',
            label: ['工具'],
            title: '小程序任意页面生成二维码',
            desc: '二维码生成器',
            mainImage: 'https://resource.tuniaokj.com/images/shop/card.jpg',
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 129
            },
            collectionCount: 265,
            commentCount: 22,
            likeCount: 62
          }
        ],
        partner: [
          {
            name: '猪猪科技',
            title: '一个有肉的公司',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          },
          {
            name: '猪猪科技',
            title: '一个有肉的公司',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          },
          {
            name: '猪猪科技',
            title: '一个有肉的公司',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          },
          {
            name: '猪猪科技',
            title: '一个有肉的公司',
            url: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          },
          {
            name: '三国健康科技',
            title: '健康产业集团',
            url: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg'
          },
          {
            name: '猪猪科技',
            title: '一个有肉的公司',
            url: 'https://resource.tuniaokj.com/images/shop/watch1.jpg'
          }
        ],
        show1: false,
        show2: false,
      }
    },
    methods: {
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
      // cardSwiper
      cardSwiper2(e) {
        this.cardCur2 = e.detail.current
      },
      // 跳转
      tn(e) {
        uni.navigateTo({
          url: e,
        });
      },
      openLocation() {
        uni.openLocation({
          longitude: 113.3298396012573,
          latitude: 22.961803525530176,
          name: '祈福新村',
          address: '祈福新村'
        })
      },
      //拨打固定电话
      callPhoneNumber() {
        uni.makePhoneCall({
          phoneNumber: "18219126666",
        });
      },
      
      // 预览作者图片
      previewQRCodeImage() {
        wx.previewImage({
          urls: ['https://resource.tuniaokj.com/images/advertise/qrcode.jpg']
        })
      },
      
      // 弹出模态框1
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
      }

      
    }
  }
</script>

<style lang="scss" scoped>
  .template-shop{
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
  
  /* 轮播视觉差 start */
  .card-swiper {
    height: 600rpx !important;
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
  }
    
  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
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
    // opacity: 0;
  }
  
  .spot{
    background-color: #FFFFFF;
    opacity: 0.6;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    top: -60rpx;
    margin: 0 8rpx !important;
    position: relative;
  }
  
  .spot.active{
    opacity: 1;
    width: 30rpx;
    background-color: #FFFFFF;
  }
  
  /* 顶部店铺 */
  .shop-function {
      position: relative;
      z-index: 1;
      margin-top: -580rpx;
  }
  
  /* 阴影 start*/
  .shop-shadow {
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  /* 头像 start */
  .logo-image {
    width: 110rpx;
    height: 110rpx;
    position: relative;
  }
  
  .logo-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 10rpx;
    overflow: hidden;
    // background-color: #FFFFFF;
  }
  
  
  /* 资质轮播*/
  /* .tnphone-black-min 细边框*/
  .tnphone-black-min {width: 380rpx; height: 760rpx; border-radius: 40rpx; background: #C6D1D8; padding: 7rpx; display: table; color: #333;
  	box-sizing: border-box; box-shadow: 0rpx 0rpx 0rpx 5rpx rgba(80,80,80,.8) inset; margin: 70rpx auto; cursor: default; position: relative}
  .tnphone-black-min .skin {width: 100%; height: 100%; border-radius: 40rpx; background: #222; padding: 10rpx; box-shadow: 0rpx 0rpx 0rpx 7rpx rgba(68,68,68,.3)}
  .tnphone-black-min .screen {width: 100%; height: 100%; border-radius: 30rpx; background: #fff; position: relative; overflow: hidden}
  .tnphone-black-min .head {width: 100%; height: 90rpx; text-align: center; position: absolute; padding: 45rpx 15rpx 10rpx 15rpx;}
  .tnphone-black-min .peak {left: 22%;width: 56%; height: 27rpx; margin: -2rpx auto 0rpx; border-radius: 0 0 20rpx 20rpx; background: #222; position: absolute}
  .tnphone-black-min .sound {width: 48rpx; height: 6rpx; border-radius: 15rpx; background: #555; position: absolute; left: 50%; top: 50%; margin-left: -24rpx; margin-top: -10rpx;
  	box-shadow: 0rpx 4rpx 4rpx 0rpx #444 inset}
  .tnphone-black-min .lens {width: 6rpx; height: 6rpx; border-radius: 50%; background: #2c5487; position: absolute; left: 50%; top: 50%; margin-left: 34rpx; margin-top: -10rpx}
  .tnphone-black-min .talk {width: 50%; height: 6rpx; border-radius: 15rpx; background: rgba(0,0,0,.3); position: absolute; bottom: 8rpx; left: 50%; margin-left: -25%}
  .tnphone-black-min .area-l,.tnphone-black-min .area-r {width: 70rpx; height: 16rpx; position: absolute; top: 6rpx}
  .tnphone-black-min .area-l {left: 0; text-align: center; font-size: 12rpx; line-height: 22rpx; text-indent: 10rpx; font-weight: 600; padding-left: 20rpx;}
  .tnphone-black-min .area-r {right: 0; text-align: center; font-size: 12rpx; line-height: 22rpx; text-indent: 10rpx; font-weight: 600; padding-right: 20rpx;}
  .tnphone-black-min .fa-feed {float: left; font-size: 12rpx!important; transform:rotate(-45deg); margin-top: 4rpx; margin-right: 8rpx}
  .tnphone-black-min .fa-battery-full {float: left; font-size: 12rpx!important; margin-top: 6rpx}
  .tnphone-black-min .fa-chevron-left {float: left; margin-top: 4rpx}
  .tnphone-black-min .fa-cog {float: right; margin-top: 4rpx}
  .tnphone-black-min .btn01 {width: 3rpx; height: 28rpx; border-radius: 3rpx 0 0 3rpx; background: #222; position: absolute; top: 105rpx; left: -3rpx}
  .tnphone-black-min .btn02 {width: 3rpx; height: 54rpx; border-radius: 3rpx 0 0 3rpx; background: #222; position: absolute; top: 160rpx; left: -3rpx}
  .tnphone-black-min .btn03 {width: 3rpx; height: 54rpx; border-radius: 3rpx 0 0 3rpx; background: #222; position: absolute; top: 230rpx; left: -3rpx}
  .tnphone-black-min .btn04 {width: 3rpx; height: 86rpx; border-radius: 0 3rpx 3rpx 0; background: #222; position: absolute; top: 180rpx; right: -3rpx}
   
  /* 轮播样机样式 start*/
  .card-swiper2 {
    height: 70vh !important;
    width: 100vw !important;
    padding-top: 4vh;
  }
  
  .card-swiper2 swiper-item {
    width: 380rpx !important;
    left: -155rpx;
    box-sizing: border-box;
    padding: 0rpx 0rpx 90rpx 0rpx;
    overflow: initial;
  }
  
  .card-swiper2 swiper-item .swiper-item {
    display: block;
    transform: scale(0.7);
    transition: all 0.2s ease-in 0s;
    overflow: hidden;
  }
  
  .card-swiper2 swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
  }
  
  
  .image-banner2{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-banner2 image{
    width: 100%;
    height: 730rpx;
    // border: 1rpx solid red;
  }
  
  /* 轮播指示点 start*/
  .indication2{
    margin-top: 50vh;
    z-index: 9999;
    width: 100%;
    height: 36rpx;
    position: absolute;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
  }
  
  .spot2{
    background-color: #FFFFFF;
    opacity: 0.6;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    top: 0rpx;
    margin: 0 8rpx !important;
    position: relative;
  }
  
  .spot2.active{
    opacity: 1;
    width: 30rpx;
    background-color: #FFFFFF;
  }
  
  /* 商家商品 start*/
  .tn-blogger-content {
    &__wrap {
      box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
      border-radius: 20rpx;
      margin: 15rpx;
    }
    
    &__info {
      &__btn {
        margin-right: -12rpx;
        opacity: 0.5;
      }
    }
    
    &__label {
      &__item {
        line-height: 45rpx;
        padding: 0 10rpx;
        margin: 5rpx 18rpx 0 0;
        
        &--prefix {
          color: #E83A30;
          padding-right: 10rpx;
        }
      }
      
      &__desc {
        line-height: 35rpx;
      }
    }
    
    &__main-image {
      border-radius: 16rpx 16rpx 0 0;
      
      &--1 {
        max-width: 690rpx;
        min-width: 690rpx;
        max-height: 400rpx;
        min-height: 400rpx;
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
      font-size: 24rpx;
      padding-right: 5rpx;
    }
  }
  
  .image-book{
    padding: 150rpx 0rpx;
    font-size: 16rpx;
    font-weight: 300;
    position: relative;
  }
  .image-picbook{
    background-size: cover;
    background-repeat:no-repeat;
    // background-attachment:fixed;
    background-position:top;
    border-radius: 15rpx 15rpx 0 0;
  }
  
  /* 商家商品 end*/
  
  
  /* 文章内容 start*/
  .tn-blogger-content2 {
    &__wrap {
      padding: 30rpx;
    }
    
    &__info {
      &__btn {
        margin-right: -12rpx;
        opacity: 0.5;
      }
    }
    
    &__label {
      &__item {
        line-height: 45rpx;
        padding: 0 20rpx;
        margin: 5rpx 18rpx 0 0;
        
        &--prefix {
          color: #00FFC8;
          padding-right: 10rpx;
        }
      }
      
      &__desc {
        line-height: 55rpx;
      }
    }
    
    &__main-image {
      box-shadow: 0rpx 5rpx 40rpx 0rpx rgba(43, 158, 246, 0.2);
      border-radius: 16rpx;
      
      &--1 {
        max-width: 690rpx;
        min-width: 690rpx;
        max-height: 400rpx;
        min-height: 400rpx;
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
  }
  
  .image-design{
    padding: 180rpx 0rpx;
    font-size: 40rpx;
    font-weight: 300;
    position: relative;
  }
  .image-pic{
    background-size: cover;
    background-repeat:no-repeat;
    // background-attachment:fixed;
    background-position:top;
    border-radius: 10rpx;
  }
  /* 文章内容 end*/
  
  
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
      padding: 7rpx 25rpx 5rpx 25rpx;
  
      &--prefix {
        padding-right: 10rpx;
      }
    }
  }
  
/* 图标容器9 start */
    .icon9 {
      &__item {
        width: 30%;
        background-color: #FFFFFF;
        border-radius: 10rpx;
        transform: scale(1);
        transition: transform 0.3s linear;
        transform-origin: center center;
        
        &--icon {
          width: 80rpx;
          height: 80rpx;
          font-size: 50rpx;
          border-radius: 50%;
          margin-bottom: 18rpx;
          position: relative;
          z-index: 1;
          
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
            background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg6.png);
          }
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
      font-size: 46rpx;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      background-image: url(https://resource.tuniaokj.com/images/title_bg/title00.png);
      background-size: cover;
    }
  }
  /* 标题 end */  
  
  /* 信息展示 start */
  .tn-info {
    &__item {
      width: 48%;
      margin: 15rpx 0rpx;
      padding: 28rpx;
      border-radius: 15rpx;
      position: relative;
      z-index: 1;
    }
  }
  /* 信息展示 end */
  
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
        transform-origin: center center;
        
        &--icon {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          position: relative;
          z-index: 1;
        }
      }
    }
  

  /* 底部tabbar start*/
  .footerfixed{
   position: fixed;
   // margin: 20rpx;
   margin: 40rpx 30rpx;
   width: 690rpx;
   bottom: calc(env(safe-area-inset-bottom) / 2);
   z-index: 999;
   background-color: rgba(255,255,255,0.5);
   box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  .tabbar {
    display: flex;
    align-items: center;
    min-height: 110rpx;
    justify-content: space-between;
  	padding: 0;
  	height: calc(110rpx + env(safe-area-inset-bottom) / 2);
  	// padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  }
  
  .tabbar .action {
  	font-size: 22rpx;
  	position: relative;
  	flex: 1;
  	text-align: center;
  	padding: 0;
  	display: block;
  	height: auto;
  	line-height: 1;
  	margin: 0;
  	overflow: initial;
  }
  
  .tabbar .action .bar-icon {
  	width: 100rpx;
  	position: relative;
  	display: block;
  	height: auto;
  	margin: 0 auto 10rpx;
  	text-align: center;
  	font-size: 42rpx;
  }
  
  .tabbar .action .bar-icon image {
  	width: 50rpx;
  	height: 50rpx;
  	display: inline-block;
  }
  
  /* 毛玻璃*/
  .dd-glass {
     width: 690rpx;
     backdrop-filter: blur(20rpx);
    -webkit-backdrop-filter: blur(20rpx);
  }
    
</style>
