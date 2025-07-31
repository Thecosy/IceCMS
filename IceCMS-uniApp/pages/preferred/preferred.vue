<template>
  <view class="template-preferred tn-safe-area-inset-bottom">
    
    <!-- 顶部自定义导航 -->
    <tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#FFFFFF">
      <view class="" style="width: 72vw;overflow: hidden;">
        <tn-tabs :list="scrollList" :current="current" @change="tabChange" activeColor="#000" :bold="true" :fontSize="36"></tn-tabs>
      </view>
    </tn-nav-bar>
    
    <view class="" v-if="current==0">
    
      <view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}"> 
        <swiper class="card-swiper" :circular="true"
          :autoplay="false" duration="500" interval="6000" @change="cardSwiper"> 
          <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
            <view class="swiper-item image-banner">
              
              <!-- 方式5 start-->
              <view class="tn-flex tn-margin-sm">
                <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
                  <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                    <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" style="background-image: url(https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg);background-size:100% 100%;">
                    </view>
                    <view class="tn-color-black tn-text-sm tn-text-center" style="width: 100rpx;overflow: hidden;">
                      <text class="tn-text-ellipsis">商家名称</text>
                    </view>
                  </view>
                </view>
                <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
                  <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                    <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" style="background-image: url(https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg);background-size:100% 100%;">
                    </view>
                    <view class="tn-color-black tn-text-sm tn-text-center" style="width: 100rpx;overflow: hidden;">
                      <text class="tn-text-ellipsis">商家名称</text>
                    </view>
                  </view>
                </view>
                <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
                  <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                    <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" style="background-image: url(https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg);background-size:100% 100%;">
                    </view>
                    <view class="tn-color-black tn-text-sm tn-text-center" style="width: 100rpx;overflow: hidden;">
                      <text class="tn-text-ellipsis">商家名称</text>
                    </view>
                  </view>
                </view>
                <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
                  <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                    <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" style="background-image: url(https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg);background-size:100% 100%;">
                    </view>
                    <view class="tn-color-black tn-text-sm tn-text-center" style="width: 100rpx;overflow: hidden;">
                      <text class="tn-text-ellipsis">商家名称</text>
                    </view>
                  </view>
                </view>
              </view>
              
            </view>
          </swiper-item>
        </swiper>
      </view>
      
      
<!--      <view class="tn-flex tn-flex-row-between" @click="tn('/preferredPages/redeem')">
        <view class="justify-content-item tn-margin tn-text-bold tn-text-xl">
          积分兑换
        </view>
        <view class="justify-content-item tn-margin tn-text-lg tn-color-grey">
          <text class="tn-padding-xs">全部</text>
          <text class="tn-icon-topics"></text>
        </view>
      </view> -->
 <!--     
      <view class="tn-flex tn-flex-wrap tn-margin-sm">
        <block v-for="(item, index) in content2" :key="index">
          <view class="" style="width: 50%;" @click="tn('/preferredPages/product')">
            <view class="tn-blogger-content__wrap" style="background-color: rgba(255,255,255,0.6);">
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
                    <view class="tn-color-gray">
                      <text class="tn-blogger-content__count-icon tn-icon-flower"></text> 
                      <text class="tn-padding-right-sm">{{ item.collectionCount }}</text>
                      <text class="tn-blogger-content__count-icon tn-icon-message"></text>
                      <text class="tn-padding-right-sm">{{ item.commentCount }}</text>
                      <text class="tn-blogger-content__count-icon tn-icon-like"></text>
                      <text class="">{{ item.likeCount }}</text>
                    </view>
                  </view>
                </view> 
                <view class="justify-content-item tn-text-center">
                  <view v-for="(label_item,label_index) in item.label" :key="label_index" class="tn-blogger-content__label__item tn-float-left tn-margin-right tn-bg-gray--light tn-round tn-text-sm tn-text-bold">
                    <text class="tn-icon-funds tn-padding-right-xs tn-color-indigo"></text> {{ label_item }}
                  </view>
                </view>
              </view>
              
              
            </view>
          </view>
        </block>
      </view> -->

      
      <view class="tn-flex tn-flex-row-between" @click="tn('/preferredPages/website')">
        <view class="justify-content-item tn-margin tn-text-bold tn-text-xl">
          商家热卖
        </view>
        <view class="justify-content-item tn-margin tn-text-lg tn-color-grey">
          <text class="tn-padding-xs">全部</text>
          <text class="tn-icon-topics"></text>
        </view>
      </view>
      
      <!-- 商家商品 start-->
      <view class="tn-flex tn-flex-wrap tn-margin-left-sm tn-margin-bottom-sm tn-margin-right-sm tn-margin-top-xs">
        <block v-for="(item, index) in content" :key="index">
          <view class="" style="width: 50%;" @click="tn('/preferredPages/product?url='+ item.id)">
            <view class="tn-blogger-content__wrap">
              <view class="image-picbook" :style="'background-image:url(' + item.thumb + ')'">
                <view class="image-book">
                </view>
              </view> 
              
              <view class="tn-blogger-content__label tn-text-justify tn-padding-sm">
                <text class="tn-blogger-content__label__desc">{{ item.title }}</text>  
              </view>
              
              <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-left-sm tn-padding-right-sm tn-padding-bottom-sm">
                <view class="justify-content-item tn-flex tn-flex-col-center">
                  <view>
                    <view class="">
                      <text class="tn-blogger-content__count-icon tn-color-purplered" style="font-size: 24rpx;">￥</text> 
    <text class="tn-padding-right-sm tn-text-bold tn-color-purplered" style="font-size: 38rpx;">
        {{ item.price ? item.price : '免费' }}
      </text>                      <!-- <text class="tn-blogger-content__count-icon tn-icon-message"></text>
                      <text class="tn-padding-right-sm">{{ item.commentCount }}</text> -->
                      <text class="tn-color-gray tn-text-sm" style="font-size: 24rpx;">{{ item.hits ? item.hits : '0' }}人浏览</text>
                    </view>
                  </view>
                </view>
                <!-- <view class="justify-content-item tn-text-center">
                  <view v-for="(label_item,label_index) in item.label" :key="label_index" class="tn-blogger-content__label__item tn-float-left tn-margin-right tn-bg-gray--light tn-round tn-text-sm tn-text-bold">
                    <text class="tn-blogger-content__label__item--prefix">#</text> {{ label_item }}
                  </view>
                </view> -->
              </view>
              
              
              <!-- 图标logo/头像 -->
              <view class="tn-flex tn-flex-row-between tn-flex-col-center">
                <view class="justify-content-item tn-padding-left-sm tn-padding-bottom-sm">
                  <view class="tn-flex tn-flex-col-center tn-flex-row-left">
                    <view class="logo-pic tn-shadow">
                      <view class="logo-image">
                        <view class="tn-shadow-blur" :style="'background-image:url(' + item.userAvatar + ');width: 40rpx;height: 40rpx;background-size: cover;'">
                        </view>
                      </view>
                    </view>
                    <view class="tn-padding-xs tn-text-sm tn-color-black">
                      {{ item.userName }}
                    </view>
                  </view>
                </view>
              </view>
              
              
            </view>
          </view>
        </block>
      </view>
      <!-- 商品 end-->
      
      
      <view class="tn-flex tn-flex-row-between tn-margin-top-xl" @click="tn('/preferredPages/classify')">
        <view class="justify-content-item tn-margin tn-text-bold tn-text-xl">
          商品优选
        </view>
        <view class="justify-content-item tn-margin tn-text-lg tn-color-grey">
          <text class="tn-padding-xs">全部</text>
          <text class="tn-icon-topics"></text>
        </view>
      </view>
         
      
      <!-- 页面内容 -->
      <view>
        <view class="tn-padding-sm">
          <tn-waterfall ref="waterfall" v-model="list" @finish="handleWaterFallFinish">
            <template v-slot:left="{ leftList }">
              <view v-for="(item, index) in leftList" :key="item.id" class="product__item" @click="tn('/preferredPages/product')">
                <view class="item__image">
                  <tn-lazy-load :threshold="-450" height="100%" :image="item.mainImage" :index="item.id" imgMode="widthFix"></tn-lazy-load>
                </view>
                <view class="item__data">
                  <view class="item__title-container">
                    <view v-if="item.newProduct" class="item__store-type tn-cool-bg-color-8">IceCMS社区</view>
                    <view v-else-if="item.storeType === 1" class="item__store-type tn-cool-bg-color-1">自营</view>
                    <text class="item__title">{{ item.title }}</text>
                  </view>
                  <view v-if="item.tags && item.tags.length > 0" class="item__tags-container">
                    <view v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex" class="item__tag">{{ tagItem }}</view>
                  </view>
                  <view class="item__price-container tn-color-purplered">
                    <text class="item__price--unit">￥</text>
                    <text class="item__price--integer">{{ item.priceInteger }}</text>
                    <text class="item__price--dot">.</text>
                    <text class="item__price--decimal">{{ item.priceDecimal }}</text>
                  </view>
                </view>
              </view>
            </template>
            <template v-slot:right="{ rightList }">
              <view v-for="(item, index) in rightList" :key="item.id" class="product__item" @click="tn('/preferredPages/product')">
                <view class="item__image">
                  <tn-lazy-load :threshold="-450" height="100%" :image="item.mainImage" :index="item.id" imgMode="widthFix"></tn-lazy-load>
                </view>
                <view class="item__data">
                  <view class="item__title-container">
                    <view v-if="item.storeType === 1" class="item__store-type tn-cool-bg-color-1">自营</view>
                    <text class="item__title">{{ item.title }}</text>
                  </view>
                  <view class="item__tags-container">
                    <view v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex" class="item__tag">{{ tagItem }}</view>
                  </view>
                  <view class="item__price-container tn-color-purplered">
                    <text class="item__price--unit">￥</text>
                    <text class="item__price--integer">{{ item.priceInteger }}</text>
                    <text class="item__price--dot">.</text>
                    <text class="item__price--decimal">{{ item.priceDecimal }}</text>
                  </view>
                </view>
              </view>
            </template>
          </tn-waterfall>
        </view>
        
        <tn-load-more :status="loadStatus"></tn-load-more>
        

      </view>
     
    </view>
    
    <!-- 2-->
    <view class="" v-if="current==1">
      
      <view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}"> 
        
        <!-- 更多信息-->
        <view class="tn-padding-top-sm tn-padding-bottom-sm">
          <tn-scroll-list :indicatorWidth="100" :indicatorBarWidth="30" indicatorColor="#FFE2D9" indicatorActiveColor="#FF7043">
            <view class="tn-flex tn-margin-left-sm tn-margin-right-sm tn-margin-top">
              <block v-for="(item, index) in historyData" :key="index">
                <view class="tn-flex-1 tn-padding-sm tn-radius">
                  <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                    <view class="icon11__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
                      <view :class="[`tn-icon-${item.icon}`]"></view>
                    </view>  
                    <view class="tn-color-black tn-text-sm tn-text-center tn-margin-top-sm">
                      <text class="tn-text-ellipsis" >{{ item.title }}</text>
                    </view>
                  </view>
                </view>
              </block>
            </view>
          </tn-scroll-list>
        </view>
        
        <!-- 商品1 start-->
        <view class="tn-flex tn-flex-wrap tn-margin-sm">
          <block v-for="(item, index) in content" :key="index">
            <view class="" style="width: 50%;">
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
                        <text class="tn-color-gray tn-text-sm" style="font-size: 24rpx;">{{ item.likeCount }} 人购买</text>
                      </view>
                    </view>
                  </view>
                  <!-- <view class="justify-content-item tn-text-center">
                    <view v-for="(label_item,label_index) in item.label" :key="label_index" class="tn-blogger-content__label__item tn-float-left tn-margin-right tn-bg-gray--light tn-round tn-text-sm tn-text-bold">
                      <text class="tn-blogger-content__label__item--prefix">#</text> {{ label_item }}
                    </view>
                  </view> -->
                </view>
                
                
              </view>
            </view>
          </block>
        </view>
        <!-- 商品1 end-->
      
      </view>
      
    </view>
    
    <!-- 3-->
    <view class="" v-if="current==2">
      
      <view class="tn-margin-top tn-margin-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}"> 
        
        <!-- 商品1 start-->
        <view class="tn-flex tn-flex-wrap tn-margin-sm">
          <block v-for="(item, index) in content" :key="index">
            <view class="" style="width: 50%;">
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
                        <text class="tn-color-gray tn-text-sm" style="font-size: 24rpx;">{{ item.likeCount }} 人购买</text>
                      </view>
                    </view>
                  </view>
                  <!-- <view class="justify-content-item tn-text-center">
                    <view v-for="(label_item,label_index) in item.label" :key="label_index" class="tn-blogger-content__label__item tn-float-left tn-margin-right tn-bg-gray--light tn-round tn-text-sm tn-text-bold">
                      <text class="tn-blogger-content__label__item--prefix">#</text> {{ label_item }}
                    </view>
                  </view> -->
                </view>
                
                
              </view>
            </view>
          </block>
        </view>
        <!-- 商品1 end-->
        
      
      </view>
      
    </view>
    
    
    <!-- 4-->
    <view class="" v-if="current==3">
      
      <view class="tn-margin-top tn-margin-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}"> 
        
        <view class="tn-text-center" style="font-size: 200rpx;padding-top: 20vh;">
          <text class="tn-icon-empty-page tn-color-gray--disabled" ></text>
        </view>
        
      
      </view>
      
    </view>
    
    
    <!-- 5-->
    <view class="" v-if="current==4">
      
      <view class="tn-margin-top tn-margin-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}"> 
        
        
        <view class="tn-text-center" style="font-size: 200rpx;padding-top: 20vh;">
          <text class="tn-icon-empty-list tn-color-gray--disabled" ></text>
        </view>
        
      
      </view>
      
    </view>
    
    <!-- 6-->
    <view class="" v-if="current==5">
      
      <view class="tn-margin-top tn-margin-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}"> 
        
        
        <view class="tn-text-center" style="font-size: 200rpx;padding-top: 20vh;">
          <text class="tn-icon-empty-data tn-color-gray--disabled" ></text>
        </view>

        
      
      </view>
      
    </view>
    
    
    <view class='tn-tabbar-height'></view>
    
  </view>
</template>

<script>
  import request from '@/common/request.js';
  export default {
    name: 'Preferred',
    data() {
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
        IconList: [{
            title: 'discoverfill',
            name: '活动预约',
            color: 'red',
          },
          {
            title: 'camerafill',
            name: '直播抽奖',
            color: 'cyan',
          },
          {
            title: 'shopfill',
            name: 'IceCMS小店',
            color: 'orange',
          },
          {
            title: 'profilefill',
            name: '简历名片',
            color: 'blue',
          },
          {
            title: 'pay',
            name: '我的钱包',
            color: 'orange',
          },
          {
            title: 'settings',
            name: '应用设置',
            color: 'blue',
          },
          {
            title: 'goods',
            name: '便捷嗨购',
            color: 'orange',
          },
          {
            title: 'wifi',
            name: 'WLAN列表',
            color: 'blue',
          },
          {
            title: 'shopfill',
            name: 'IceCMS小店',
            color: 'orange',
          },
          {
            title: 'voice',
            name: '声音设置',
            color: 'blue',
          },
          {
            title: 'new',
            name: '消息通知',
            color: 'orange',
          },
          {
            title: 'baby',
            name: '育儿手册',
            color: 'blue',
          }
        ],
        historyData: [
          {
            title: '分销中心',
            icon: 'organizatio',
            color: 'orange',
          },
          {
            title: '积分商城',
            icon: 'level',
            color: 'purple',
          },
          {
            title: '限时秒杀',
            icon: 'clock',
            color: 'blue',
          },
          {
            title: '社区团购',
            icon: 'team',
            color: 'purplered',
          },
          {
            title: '大转盘',
            icon: 'group-circle',
            color: 'teal',
          },
          {
            title: '商品核销',
            icon: 'scan',
            color: 'orangered',
          },
          {
            title: '满减优惠',
            icon: 'coupon',
            color: 'indigo',
          },
          {
            title: '视频直播',
            icon: 'video',
            color: 'green',
          }
        ],
        current: 0,
        scrollList: [
          {name: '推荐', count: '10'},
          {name: '美食'},
          {name: '科技'},
          {name: '音乐'},
          {name: '电影'},
          {name: '游戏'}
        ],
        content2: [
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['99积分'],
            desc: '开源可商用组件',
            mainImage: 'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 129
            },
            collectionCount: 999,
            commentCount: 999,
            likeCount: 999
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['66积分'],
            desc: '开源可商用组件',
            mainImage: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg',
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
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['1266积分'],
            desc: '开源可商用组件',
            mainImage: 'https://resource.tuniaokj.com/images/shop/computer2.jpg',
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
          },
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userName: '可我会像',
            date: '2021年12月20日',
            label: ['888积分'],
            desc: '我们都是好孩子',
            mainImage: 'https://resource.tuniaokj.com/images/shop/watch1.jpg',
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
        content: [
          {
            userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
            userName: '抓住那只猪',
            date: '2021年12月20日',
            label: ['烤肉','烤肉'],
            title: '免费开源可商用组件',
            mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg',
            viewUser: {
              latestUserAvatar: [
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'},
                {src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'},
              ],
              viewUserCount: 129
            },
            collectionCount: 129,
            commentCount: 999,
            likeCount: 999
          }
        ],
        loadStatus: 'loadmore',
        list: [],
        data: [
          {
            title: 'IceCMS科技 设计师专属笔记本 告别卡慢热',
            mainImage: 'https://resource.tuniaokj.com/images/shop/computer1.jpg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: true, // 是否为新品
            tags: ['满1000减80','免息'],
            price: 6999
          },
          {
            title: 'IceCMS科技 开发便携笔记本 告别笨重外出',
            mainImage: 'https://resource.tuniaokj.com/images/shop/computer2.jpg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: ['免息'],
            price: 7999
          },
          {
            title: 'IceCMS科技 T10 宇宙9000 10G全网通',
            mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: true, // 是否为新品
            tags: [],
            price: 4999
          },
          {
            title: 'IceCMS科技 T10Pro 宇宙9010 10G全网通',
            mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: true, // 是否为新品
            tags: [],
            price: 6999
          },
          {
            title: 'IceCMS科技 运动手表 不用插卡即可通话',
            mainImage: 'https://resource.tuniaokj.com/images/shop/watch1.jpg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            price: 2999
          },
          {
            title: 'IceCMS科技 页面设计 专为第三方提供精美酷炫页面',
            mainImage: 'https://resource.tuniaokj.com/images/shop/card.jpg',
            storeType: 2, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: ['酷炫'],
            price: 10999
          },
          {
            title: 'IceCMS科技 海报设计 想不到就过来聊聊吧',
            mainImage: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg',
            storeType: 2, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: ['哎呀'],
            price: 399
          },
          {
            title: 'IceCMS科技 环保袋',
            mainImage: 'https://resource.tuniaokj.com/images/shop/bag1.jpg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: ['合作免费送'],
            price: 0
          },
          {
            title: 'IceCMS科技 纸杯',
            mainImage: 'https://resource.tuniaokj.com/images/shop/cup2.jpg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: ['合作免费送'],
            price: 0
          },
          {
            title: 'IceCMS科技 抱枕',
            mainImage: 'https://resource.tuniaokj.com/images/shop/pillow.jpg',
            storeType: 1, // 1 自营 2 第三方店铺
            newProduct: false, // 是否为新品
            tags: [],
            price: 99
          }
        ]
      }
    },
	created() {
		request(`/Mini/getNewResource/6/new`, {
			method: 'GET',
		}).then(response => {
			console.log(response);
			this.content = response;
		}).catch(error => {
			console.error('Request failed', error);
		});
	},
    mounted() {
      this.getRandomData()
    },
    // onReachBottom() {
    //   this.getRandomData()
    // },
    methods: {
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
      // tab选项卡切换
      tabChange(index) {
        this.current = index
      },
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
      // 获取随机数据
      getRandomData() {
        this.loadStatus = 'loading'
        for (let i = 0; i < 10; i++) {
          let index = this.$t.number.randomInt(0, this.data.length - 1)
          let item = JSON.parse(JSON.stringify(this.data[index]))
          let price = this.getPrice(item.price)
          item.id = this.$t.uuid()
          item.priceInteger = price[0]
          item.priceDecimal = price[1]
          this.list.push(item)
        }
      },
      // 瀑布流加载完毕事件
      handleWaterFallFinish() {
        this.loadStatus = 'loadmore'
      },
      // 获取价格整数和小数部分
      getPrice(price) {
        const priceStr = String(price)
        if (priceStr.indexOf('.') !== -1) {
          return priceStr.split('.')
        } else {
          return [priceStr, '00']
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .template-preferred {
    // background-color: $tn-bg-gray-color;
    max-height: 100vh;
  }
  .tn-tabbar-height {
  	min-height: 120rpx;
  	height: calc(140rpx + env(safe-area-inset-bottom) / 2);
  }
  

  /* 商家 start */
  .card-swiper {
    height: 260rpx !important;
    overflow: hidden;
    // background-color: #00C3FF;
  }
    
  .card-swiper swiper-item {
    width: 632rpx !important;
    left: -10rpx;
    box-sizing: border-box;
    overflow: initial;
    padding: 0 0rpx 40rpx 0;
  }
    
  .card-swiper swiper-item .swiper-item {
    width: 100%;
    display: block;
    height: 100%;
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
  }
    
  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
  }
  
  .card-swiper swiper-item .swiper-item-text {
    margin-top: -210rpx;
    width: 100%;
    display: block;
    height: 100%;
    border-radius: 10rpx;
    transform: translate(30rpx, -80rpx) scale(0.8, 0.8);
    transition: all 0.6s ease 0s;
    overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item-text {
    margin-top: -270rpx;
    width: 100%;
    transform: translate(20rpx, 0rpx) scale(0.9, 0.9);
    transition: all 0.6s ease 0s;
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
  
  /* 图标容器11 start */
  .icon11 {
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
        width: 100rpx;
        height: 100rpx;
        font-size: 60rpx;
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
          background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
        }
      }
    }
  }  
  
  /* 瀑布流商品*/
  .product__item {
    background-color: #FFFFFF;
    border-radius: 15rpx;
    overflow: hidden;
    margin: 0 15rpx 30rpx 15rpx;
    box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
    
    .item {
      /* 图片 start */
      &__image {
        width: 100%;
        height: auto;
        background-color: #FFFFFF;
      }
      /* 图片 end */
      
      /* 内容 start */
      &__data {
        padding: 20rpx 20rpx;
      }
      
      /* 标题 start */
      &__title-container {
        text-align: justify;
        line-height: 38rpx;
        vertical-align: middle;
      }
      &__store-type {
        height: 28rpx;
        font-size: 20rpx;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 4rpx;
        border-radius: 6rpx;
        white-space: nowrap;
        text-align: center;
        top: -2rpx;
        margin-right: 6rpx;
      }
      &__title {
        
      }
      /* 标题 end */
      
      /* 标签 start */
      &__tags-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
      }
      &__tag {
        margin: 10rpx;
        color: #FF7043;
        border: 2rpx solid #FF7043;
        padding: 0 6rpx;
        border-radius: 10rpx;
        font-size: 20rpx;
        
        &:first-child {
          margin-left: 0rpx !important;
        }
      }
      /* 标签 end */
      
      /* 价格 start */
      &__price-container {
        padding: 10rpx 0;
        font-size: 24rpx;
        font-weight: bold;
      }
      &__price {
        &--unit {
          
        }
        &--integer {
          font-size: 38rpx;
        }
        &--decimal {
          
        }
      }
      /* 价格 end */
      /* 内容 end */
    }
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
  
  
  /* 商家头像 start */
  .logo-image {
    width: 40rpx;
    height: 40rpx;
    position: relative;
  }
  
  .logo-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    border: 2rpx solid rgba(255,255,255,0.05);
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    overflow: hidden;
    // background-color: #FFFFFF;
  }
  
  /* 商家商品 end*/
  
</style>

