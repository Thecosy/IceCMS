<template>
  <view class="template-order">
    
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed :isBack="false" :bottomShadow="false" backgroundColor="#FFFFFF">
      <view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
        <!-- 返回按钮 -->
        <view class="custom-nav__back" @tap.stop="goBack">
          <view class="tn-icon-left"></view>
        </view>
        <!-- 搜索框 -->
        <view class="custom-nav__search tn-flex tn-flex-col-center tn-flex-row-center">
          <view class="custom-nav__search__box tn-flex tn-flex-col-center tn-flex-row-left tn-color-gray--dark">
            <view class="custom-nav__search__icon tn-icon-search"></view>
            <view class="custom-nav__search__text">搜索我的订单</view>
          </view>
        </view>
      </view>
    </tn-nav-bar>
    
    <view class="order--wrap" :style="{top: vuex_custom_bar_height + 'px'}">
      <!-- 顶部标签 -->
      <view class="tn-bg-white">
        <tn-tabs-swiper class="order__tabs" ref="tabs" activeColor="#3165CC" inactiveColor="#080808" :list="list" :current="tabsIndex" :isScroll="false" @change="tabsChange"></tn-tabs-swiper>
      </view>
      
      <!-- 标签内容 -->
      <swiper class="order__swiper" :style="{top: `${swiperTop}px`, height: `${swiperHeight}px`}" :current="swiperIndex" @transition="swiperTransition" @animationfinish="swiperAnimationFinish">
        
        <swiper-item class="order__swiper__item">
          <scroll-view :style="{height: `${swiperHeight}px`}" scroll-y>
            <view v-for="(item,index) in 6" :key="index" class="order__item">
              <view class="order__item__head tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between">
                <view class="order__item__head__title">IceCMS官方小店<text class="order__item__head__title--right-icon tn-icon-right"></text></view>
                <view class="order__item__head__status">完成</view>
              </view>
              
              <view class="order__item__content tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center">
                <view class="order__item__content__image">
                  <image src="https://resource.tuniaokj.com/images/shop/prototype2.jpg" mode="scaleToFill"></image>
                </view>
                <view class="order__item__content__title">
                  IceCMS官方设计 酷炫效果展示 让用户眼前一亮的赶脚
                </view>
                <view class="order__item__content__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
                  <view class="order__item__content__info__price">
                    <text class="order__item__content__info__price--unit">￥</text>
                    <text class="order__item__content__info__price__value--integer">1000</text>
                    <text class="order__item__content__info__price__value--decimal">.00</text>
                  </view>
                  <view class="order__item__content__info__count">
                    <text>共1件</text>
                  </view>
                </view>
              </view>
              
              <view class="order__item__operation tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
                <view class="order__item__operaation__left">
                  <text class="order__item__operaation__left--text">更多</text>
                </view>
                <view class="order__item__operation__right tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-right">
                  <view class="order__item__operaation__right__button">
                    <tn-button shadow shape="round" fontColor="#080808" backgroundColor="#E6E6E6" :fontSize="24" height="auto" padding="10rpx 18rpx">查看发票</tn-button>
                  </view>
                  <view class="order__item__operation__right__button">
                    <tn-button shadow shape="round" fontColor="#FFFFFF" backgroundColor="#080808" :fontSize="24" height="auto" padding="10rpx 18rpx">退换/售后</tn-button>
                  </view>
                  <view class="order__item__operation__right__button">
                    <tn-button shadow shape="round" fontColor="tn-color-white" backgroundColor="tn-cool-bg-color-1" :fontSize="24" height="auto" padding="10rpx 18rpx">再次购买</tn-button>
                  </view>
                </view>
              </view>
            </view>
            <view class="tn-padding-bottom"></view>
          </scroll-view>
        </swiper-item>
        
        <swiper-item class="order__swiper__item">
          <scroll-view :style="{height: `${swiperHeight}px`}" scroll-y>
            <view v-for="(item,index) in 6" :key="index" class="order__item">
              <view class="order__item__head tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between">
                <view class="order__item__head__title">IceCMS官方小店<text class="order__item__head__title--right-icon tn-icon-right"></text></view>
                <view class="order__item__head__status">完成</view>
              </view>
              
              <view class="order__item__content tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
                <view class="tn-flex tn-flex-nowrap tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
                  <view class="order__item__content__image">
                    <image src="https://resource.tuniaokj.com/images/shop/computer2.jpg" mode="scaleToFill"></image>
                  </view>
                  <view class="order__item__content__image">
                    <image src="https://resource.tuniaokj.com/images/shop/bag2.jpg" mode="scaleToFill"></image>
                  </view>
                </view>
                <view class="order__item__content__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
                  <view class="order__item__content__info__price">
                    <text class="order__item__content__info__price--unit">￥</text>
                    <text class="order__item__content__info__price__value--integer">2000</text>
                    <text class="order__item__content__info__price__value--decimal">.00</text>
                  </view>
                  <view class="order__item__content__info__count">
                    <text>共2件</text>
                  </view>
                </view>
              </view>
              
              <view class="order__item__operation tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
                <view class="order__item__operaation__left">
                  <text class="order__item__operaation__left--text">更多</text>
                </view>
                <view class="order__item__operation__right tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-right">
                  <view class="order__item__operaation__right__button">
                    <tn-button shadow shape="round" fontColor="#080808" backgroundColor="#E6E6E6" :fontSize="24" height="auto" padding="10rpx 18rpx">查看发票</tn-button>
                  </view>
                  <view class="order__item__operation__right__button">
                    <tn-button shadow shape="round" fontColor="#FFFFFF" backgroundColor="#080808" :fontSize="24" height="auto" padding="10rpx 18rpx">退换/售后</tn-button>
                  </view>
                  <view class="order__item__operation__right__button">
                    <tn-button shadow shape="round" fontColor="tn-color-white" backgroundColor="tn-cool-bg-color-1" :fontSize="24" height="auto" padding="10rpx 18rpx">再次购买</tn-button>
                  </view>
                </view>
              </view>
            </view>
            <view class="tn-padding-bottom"></view>
          </scroll-view>
        </swiper-item>
        
        <swiper-item class="order__swiper__item">
          <scroll-view :style="{height: `${swiperHeight}px`}" scroll-y>
            <view v-for="(item,index) in 6" :key="index" class="order__item">
              <view class="order__item__head tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between">
                <view class="order__item__head__title">IceCMS官方小店<text class="order__item__head__title--right-icon tn-icon-right"></text></view>
                <view class="order__item__head__status">完成</view>
              </view>
              
              <view class="order__item__content tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
                <view class="tn-flex tn-flex-nowrap tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
                  <view class="order__item__content__image">
                    <image src="https://resource.tuniaokj.com/images/shop/card.jpg" mode="scaleToFill"></image>
                  </view>
                  <view class="order__item__content__image">
                    <image src="https://resource.tuniaokj.com/images/shop/cup1.jpg" mode="scaleToFill"></image>
                  </view>
                  <view class="order__item__content__image">
                    <image src="https://resource.tuniaokj.com/images/shop/computer2.jpg" mode="scaleToFill"></image>
                  </view>
                </view>
                <view class="order__item__content__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
                  <view class="order__item__content__info__price">
                    <text class="order__item__content__info__price--unit">￥</text>
                    <text class="order__item__content__info__price__value--integer">3000</text>
                    <text class="order__item__content__info__price__value--decimal">.00</text>
                  </view>
                  <view class="order__item__content__info__count">
                    <text>共3件</text>
                  </view>
                </view>
              </view>
              
              <view class="order__item__operation tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
                <view class="order__item__operaation__left">
                  <text class="order__item__operaation__left--text">更多</text>
                </view>
                <view class="order__item__operation__right tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-right">
                  <view class="order__item__operaation__right__button">
                    <tn-button shadow shape="round" fontColor="#080808" backgroundColor="#E6E6E6" :fontSize="24" height="auto" padding="10rpx 18rpx">查看发票</tn-button>
                  </view>
                  <view class="order__item__operation__right__button">
                    <tn-button shadow shape="round" fontColor="#FFFFFF" backgroundColor="#080808" :fontSize="24" height="auto" padding="10rpx 18rpx">退换/售后</tn-button>
                  </view>
                  <view class="order__item__operation__right__button">
                    <tn-button shadow shape="round" fontColor="tn-color-white" backgroundColor="tn-cool-bg-color-1" :fontSize="24" height="auto" padding="10rpx 18rpx">再次购买</tn-button>
                  </view>
                </view>
              </view>
            </view>
            <view class="tn-padding-bottom"></view>
          </scroll-view>
        </swiper-item>
        
        <swiper-item class="order__swiper__item">
          <scroll-view :style="{height: `${swiperHeight}px`}" scroll-y>
            <view v-for="(item,index) in 6" :key="index" class="order__item">
              <view class="order__item__head tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between">
                <view class="order__item__head__title">IceCMS官方小店<text class="order__item__head__title--right-icon tn-icon-right"></text></view>
                <view class="order__item__head__status">完成</view>
              </view>
              
              <view class="order__item__content tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
                <view class="tn-flex tn-flex-nowrap tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
                  <view class="order__item__content__image">
                    <image src="https://resource.tuniaokj.com/images/shop/card.jpg" mode="scaleToFill"></image>
                  </view>
                  <view class="order__item__content__image">
                    <image src="https://resource.tuniaokj.com/images/shop/computer1.jpg" mode="scaleToFill"></image>
                  </view>
                  <view class="order__item__content__image">
                    <image src="https://resource.tuniaokj.com/images/shop/watch1.jpg" mode="scaleToFill"></image>
                  </view>
                </view>
                <view class="order__item__content__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
                  <view class="order__item__content__info__price">
                    <text class="order__item__content__info__price--unit">￥</text>
                    <text class="order__item__content__info__price__value--integer">4000</text>
                    <text class="order__item__content__info__price__value--decimal">.00</text>
                  </view>
                  <view class="order__item__content__info__count">
                    <text>共4件</text>
                  </view>
                </view>
              </view>
              
              <view class="order__item__operation tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
                <view class="order__item__operaation__left">
                  <text class="order__item__operaation__left--text">更多</text>
                </view>
                <view class="order__item__operation__right tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-right">
                  <view class="order__item__operaation__right__button">
                    <tn-button shadow shape="round" fontColor="#080808" backgroundColor="#E6E6E6" :fontSize="24" height="auto" padding="10rpx 18rpx">查看发票</tn-button>
                  </view>
                  <view class="order__item__operation__right__button">
                    <tn-button shadow shape="round" fontColor="#FFFFFF" backgroundColor="#080808" :fontSize="24" height="auto" padding="10rpx 18rpx">退换/售后</tn-button>
                  </view>
                  <view class="order__item__operation__right__button">
                    <tn-button shadow shape="round" fontColor="tn-color-white" backgroundColor="tn-cool-bg-color-1" :fontSize="24" height="auto" padding="10rpx 18rpx">再次购买</tn-button>
                  </view>
                </view>
              </view>
            </view>
            <view class="tn-padding-bottom"></view>
          </scroll-view>
        </swiper-item>
        
        <swiper-item class="order__swiper__item">
          <scroll-view :style="{height: `${swiperHeight}px`}" scroll-y>
            <view v-for="(item,index) in 6" :key="index" class="order__item">
              <view class="order__item__head tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between">
                <view class="order__item__head__title">IceCMS官方小店<text class="order__item__head__title--right-icon tn-icon-right"></text></view>
                <view class="order__item__head__status">完成</view>
              </view>
              
              <view class="order__item__content tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
                <view class="tn-flex tn-flex-nowrap tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
                  <view class="order__item__content__image">
                    <image src="https://resource.tuniaokj.com/images/shop/card.jpg" mode="scaleToFill"></image>
                  </view>
                  <view class="order__item__content__image">
                    <image src="https://resource.tuniaokj.com/images/shop/pillow.jpg" mode="scaleToFill"></image>
                  </view>
                  <view class="order__item__content__image">
                    <image src="https://resource.tuniaokj.com/images/shop/bag1.jpg" mode="scaleToFill"></image>
                  </view>
                </view>
                <view class="order__item__content__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
                  <view class="order__item__content__info__price">
                    <text class="order__item__content__info__price--unit">￥</text>
                    <text class="order__item__content__info__price__value--integer">5000</text>
                    <text class="order__item__content__info__price__value--decimal">.00</text>
                  </view>
                  <view class="order__item__content__info__count">
                    <text>共5件</text>
                  </view>
                </view>
              </view>
              
              <view class="order__item__operation tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
                <view class="order__item__operaation__left">
                  <text class="order__item__operaation__left--text">更多</text>
                </view>
                <view class="order__item__operation__right tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-right">
                  <view class="order__item__operaation__right__button">
                    <tn-button shadow shape="round" fontColor="#080808" backgroundColor="#E6E6E6" :fontSize="24" height="auto" padding="10rpx 18rpx">查看发票</tn-button>
                  </view>
                  <view class="order__item__operation__right__button">
                    <tn-button shadow shape="round" fontColor="#FFFFFF" backgroundColor="#080808" :fontSize="24" height="auto" padding="10rpx 18rpx">退换/售后</tn-button>
                  </view>
                  <view class="order__item__operation__right__button">
                    <tn-button shadow shape="round" fontColor="tn-color-white" backgroundColor="tn-cool-bg-color-1" :fontSize="24" height="auto" padding="10rpx 18rpx">再次购买</tn-button>
                  </view>
                </view>
              </view>
            </view>
            <view class="tn-padding-bottom"></view>
          </scroll-view>
        </swiper-item>
        
      </swiper>
    </view>
    
    
    
  </view>
</template>

<script>
  import templatePageMixin from '@/libs/mixin/template_page_mixin.js'
  
  export default {
    name: 'TemplateOrder',
    mixins: [templatePageMixin],
    data() {
      return {
        list: [
          {name: '全部'},
          {name: '待付款'},
          {name: '待发货', count: 10},
          {name: '待收货'},
          {name: '待评价', count: 5}
        ],
        tabsIndex: 0,
        swiperIndex: 0,
        swiperTop: 0,
        swiperHeight: 0
      }
    },
    onLoad() {
      
    },
    onReady() {
      this.$nextTick(() => {
        this.updateSwiperInfo()
      })
    },
    methods: {
      // 计算可滑动区域的高度信息
      updateSwiperInfo() {
        // 获取可滑动菜单的信息
        this._tGetRect('.order__tabs').then(res => {
          if (!res) {
            setTimeout(() => {
              this.updateSwiperInfo()
            }, 10)
            return
          }
          const systemInfo = uni.getSystemInfoSync()
          this.swiperTop = res.bottom - this.vuex_custom_bar_height
          this.swiperHeight = systemInfo.safeArea.height - res.bottom + systemInfo.statusBarHeight
        })
      },
      // 标签栏值发生改变
      tabsChange(index) {
        this.swiperIndex = index
      },
      // swiper-item位置发生改变
      swiperTransition(event) {
        this.$refs.tabs.setDx(event.detail.dx)
      },
      // swiper动画结束
      swiperAnimationFinish(event) {
        const current = event.detail.current
        this.$refs.tabs.setFinishCurrent(current)
        this.swiperIndex = current
        this.tabsIndex = current
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .template-order {
    background-color: #F7F7F7CC;
  }
  
  /* 自定义导航栏内容 start */
  .custom-nav {
    height: 100%;
    
    &__back {
      // margin: auto 5rpx;
      font-size: 40rpx;
      flex-basis: 5%;
      padding: 20rpx 40rpx 20rpx 30rpx;
    }
    
    &__search {
      flex-basis: 55%;
      width: 100%;
      height: 100%;
      
      &__box {
        width: 100%;
        height: 60%;
        padding: 28rpx 0;
        margin: 0 30rpx;
        border-radius: 60rpx;
        font-size: 24rpx;
        background-color: #FFFFFF;
        border: 1rpx solid #F8F7F8;
      }
      
      &__icon {
        padding-right: 10rpx;
        margin-left: 20rpx;
        font-size: 30rpx;
      }
      
      &__text {
        color: #AAAAAA;
      }
    }
  }
  /* 自定义导航栏内容 end */
  
  .order {
    &--wrap {
      position: fixed;
      left: 0;
      right: 0;
      width: 100%;
      background-color: inherit;
    }
    
    /* 导航栏 start */
    &__tabs {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: inherit;
    }
    /* 导航栏 end */
    
    /* swiper start */
    &__swiper {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      background-color: inherit;
      // padding: 0 16rpx;
    }
    /* swiper end */
    
    /* 订单内容 start */
    &__item {
      margin: 20rpx;
      padding: 36rpx 26rpx;
      background-color: #FFFFFF;
      border-radius: 18rpx;
      
      &:first-child {
        margin-top: 40rpx;
      }
      
      &:last-child {
        margin-bottom: 0;
      }
      
      /* 头部 start */
      &__head {
        
        &__title {
          font-weight: bold;
          line-height: normal;
          
          &--right-icon {
            font-size: 24rpx;
            margin-left: 8rpx;
          }
        }
        
        &__status {
          font-size: 22rpx;
          color: #AAAAAA;
        }
      }
      /* 头部 end */
      
      /* 内容 start */
      &__content {
        
        margin-top: 20rpx;
        
        &__image {
          margin-right: 20rpx;
          
          image {
            width: 140rpx;
            height: 140rpx;
            border-radius: 10rpx;
          }
        }
        
        &__title {
          padding-right: 40rpx;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        &__info {
          
          &__price {
            &--unit {
              font-size: 20rpx;
            }
            &__value--integer, &__value--decimal {
              font-weight: bold;
            }
            &__value--decimal {
              font-size: 20rpx;
            }
          }
          
          &__count {
            color: #AAAAAA;
            font-size: 24rpx;
          }
        }
      }
      /* 内容 end */
      
      /* 操作按钮 start */
      &__operation {
        margin-top: 30rpx;
        
        &__right {
          &__button {
            margin-left: 10rpx;
          }
        }
      }
      /* 操作按钮 end */
    }
    /* 订单内容 end */
  }
  
  
</style>
