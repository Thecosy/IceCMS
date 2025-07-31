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
          <text class="tn-text-xl">红包奖励 · 优惠抵扣</text>
          <text class="tn-icon-science tn-padding-left-sm tn-text-xxl"></text>
        </view>
      </view>
      <view class="tn-text-center" style="color: #EF481F;padding: 30rpx 0;">
        <text class="tn-text-lg tn-text-bold tn-padding-left-xs" style="margin-left: -20rpx;">￥</text>
        <text style="font-size: 110rpx;">99.80</text>
      </view>
      <view class="tn-text-center tn-color-gray">
        红包可直接抵扣优惠
      </view>
      <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center tn-padding-top tn-padding-bottom-xl">
        <tn-button shape="round" :plain="true" backgroundColor="#EF481F" padding="40rpx 0" width="70%" shadow :fontSize="32">
          <text class="" style="color: #EF481F;">邀请好友赢免单</text>
          <text class="tn-icon-wechat tn-padding-right-xs tn-padding-left-xs" style="color: #EF481F;"></text>
        </tn-button>
      </view>  
    </view>
    
    <view class="tn-shadow tn-margin tn-bg-white">
      <view class="nav_title--wrap tn-padding-top-sm">
        <view class="nav_title tn-cool-bg-color-15">
          <text class="tn-icon-science tn-padding-right-sm tn-text-xxl"></text>
          <text class="tn-text-xl">赚红包攻略</text>
          <text class="tn-icon-science tn-padding-left-sm tn-text-xxl"></text>
        </view>
      </view>
      <view class="screenshot-img">
        <image src='https://cdn.nlark.com/yuque/0/2022/png/280373/1656249172300-assets/web-upload/74dd3336-ddf5-491f-87e0-5ff2ca4aae5f.png' mode='widthFix' class=''></image>
      </view> 
    </view>
    
    <view class="tn-shadow tn-margin tn-bg-white" id="page_tips">
      <view class="tn-bg-white  tn-margin-sm tn-padding-top-sm">
        <tn-sticky :offsetTop="0" :customNavHeight="vuex_custom_bar_height">
          <tn-tabs :list="fixedList" :current="current" :isScroll="false" activeColor="#E83A30" bold="true" backgroundColor="#FFFFFF" :fontSize="32" :badgeOffset="[20, 50]" @change="tabChange"></tn-tabs>
        </tn-sticky>  
      </view>
      
      
      <view class="" v-if="current==0">
        <block v-for="(item,index) in content" :key="index">
          <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin">
            <view class="justify-content-item tn-margin-top">
              <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                <view class="tn-flex tn-flex-row-center tn-padding-right">
                  <text class="tn-text-bold tn-text-xl tn-color-gray">{{ item.userNumber }}</text>
                </view>
                <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                  <view class="tn-padding-right tn-text-ellipsis">
                    <view class="tn-padding-right tn-padding-left-xs tn-text-bold tn-text-df">{{ item.userName }}</view>
                    <view class="tn-padding-xs tn-color-gray">
                      <text>{{ item.date }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="justify-content-item tn-flex-row-center">
              <view class="tn-padding-xs tn-round " :class="[`tn-color-${item.color}`]">
                <text class="tn-padding-left-xs">{{ item.desc }}</text>
                <text class="tn-icon-send-fill tn-padding-xs"></text>
              </view>
            </view>
          </view>
        </block>
      </view>
      
      <view class="" v-if="current==1">
        <block v-for="(item,index) in content1" :key="index">
          <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin">
            <view class="justify-content-item tn-margin-top">
              <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                <view class="tn-flex tn-flex-row-center tn-padding-right">
                  <text class="tn-text-bold tn-text-xl tn-color-gray">{{ item.userNumber }}</text>
                </view>
                <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                  <view class="tn-padding-right tn-text-ellipsis">
                    <view class="tn-padding-right tn-padding-left-xs tn-text-bold tn-text-df">{{ item.userName }}</view>
                    <view class="tn-padding-xs tn-color-gray">
                      <text>{{ item.date }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="justify-content-item tn-flex-row-center">
              <view class="tn-padding-xs tn-round " :class="[`tn-color-${item.color}`]">
                <text class="tn-padding-left-xs">{{ item.desc }}</text>
                <text class="tn-icon-send-fill tn-padding-xs"></text>
              </view>
            </view>
          </view>
        </block>
      </view>
      
      <view class="" v-if="current==2">
        <block v-for="(item,index) in content2" :key="index">
          <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin">
            <view class="justify-content-item tn-margin-top">
              <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                <view class="tn-flex tn-flex-row-center tn-padding-right">
                  <text class="tn-text-bold tn-text-xl tn-color-gray">{{ item.userNumber }}</text>
                </view>
                <view class="tn-flex tn-flex-row-center tn-flex-col-center">
                  <view class="tn-padding-right tn-text-ellipsis">
                    <view class="tn-padding-right tn-padding-left-xs tn-text-bold tn-text-df">{{ item.userName }}</view>
                    <view class="tn-padding-xs tn-color-gray">
                      <text>{{ item.date }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="justify-content-item tn-flex-row-center">
              <view class="tn-padding-xs tn-round " :class="[`tn-color-${item.color}`]">
                <text class="tn-padding-left-xs">{{ item.desc }}</text>
                <text class="tn-icon-send-fill tn-padding-xs"></text>
              </view>
            </view>
          </view>
        </block>
      </view>
      
    </view>

    
    <view id="top-info" class="tn-footerfixed tn-flex tn-flex-row-between tn-flex-col-center tn-padding tn-safe-area-inset-bottom dd-glass" :style="{transform: `translateY(${topInfoTranslateY}px)`}" @click="showModal">
      <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center tn-padding-bottom">
        <tn-button shape="round" backgroundColor="tn-cool-bg-color-15--reverse" padding="40rpx 0" width="90%" shadow :fontSize="32">
          <!-- <text class="tn-icon-lucky-money tn-padding-right-xs tn-color-white"></text> -->
          <text class="tn-color-white">合并红包</text>
        </tn-button>
      </view>  
    </view>
    
    <tn-modal v-model="show1" :custom="true" width="90%" :showCloseBtn="true">
      <view class="custom-modal-content">
        <view class="nav_title2--wrap">
          <view class="nav_title tn-cool-bg-color-15">
            <text class="tn-icon-science tn-padding-right-sm tn-text-xxl"></text>
            <text class="tn-text-xl">累计赚取红包奖励</text>
            <text class="tn-icon-science tn-padding-left-sm tn-text-xxl"></text>
          </view>
        </view>
        
        <!-- 空 -->
        <!-- <view class="tn-text-center tn-padding-lg">
          <view class="tn-icon-lucky-money-fill tn-color-gray--light" style="font-size: 150rpx;"></view>
          <view class="tn-text-center tn-padding-top tn-color-gray">暂无红包</view>
        </view>
        
        <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center tn-padding-top">
          <tn-button shape="round" :plain="true" backgroundColor="#EF481F" padding="40rpx 0" width="100%" shadow :fontSize="32">
            <text class="" style="color: #EF481F;">邀请好友获得红包</text>
            <text class="tn-icon-wechat tn-padding-right-xs tn-padding-left-xs" style="color: #EF481F;"></text>
          </tn-button>
        </view> -->  
        
        <!-- 有内容 -->
        <scroll-view scroll-y="true" style="height: 45vh;">
          
          <view class="tn-info__container tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-between">
            <block v-for="(item, index) in redpacket" :key="index">
              <view
                class="tn-info__item tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between tn-color-white tn-shadow-blur"
                :class="[
                  item.select ? 'tn-bg-red--light' : 'tn-bg-red--light'
                ]"
                @click="handleRedpacketClick(index)"
              >
                <view class="tn-info__item__left tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
                  <view class="tn-info__item__left__content">
                    <view class="tn-info__item__left__content--title" :style="{
                      color: item.select ? '#EF481F' : '#EF481F'
                    }">
                      <text class="tn-text-bold" style="font-size: 50rpx;">{{ item.number }}</text>
                      <text class="tn-padding-left-xs tn-text-bold">元</text>
                      <text class="tn-padding-left-sm" :style="{
                        color: item.select ? '#F96440' : '#F96440'
                      }">{{ item.desc }}</text>
                    </view>
                    <view class="tn-info__item__left__content--data tn-text-df" :style="{
                        color: item.select ? '#914F2C' : '#914F2C'
                      }">
                      {{ item.type }}
                      <text class="tn-icon-level tn-padding-left-xs"></text>
                    </view>
                  </view>
                </view>
                
                <view
                  class="tn-info__item__left--icon tn-flex tn-flex-col-center tn-flex-row-center"
                  :class="[
                    item.select ? 'tn-cool-bg-color-15' : 'tn-bg-gray--disabled'
                  ]"
                >
                  <view class="tn-icon-success tn-color-white tn-text-bold"></view>
                </view>
                <view class="tn-info__item__bottom">
                  <view class='name tn-text-xs tn-color-gray' style="margin-left: -10rpx;">
                    <text class="tn-icon-time tn-padding-right-xs"></text>
                    <text>{{ item.firstTime }} 至 {{ item.lastTime }}</text>
                  </view>
                </view>
              </view>
            </block>
          </view>
        </scroll-view>
        
        <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center tn-padding-top">
          <tn-button shape="round" :plain="true" backgroundColor="#EF481F" padding="40rpx 0" width="100%" shadow :fontSize="32">
            <text class="" style="color: #EF481F;">确定合并红包</text>
            <text class="tn-icon-level tn-padding-right-xs tn-padding-left-xs" style="color: #EF481F;"></text>
          </tn-button>
        </view>
        
      </view>
    </tn-modal>
    

        
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
          title: '好友下单你获得现金红包',
          name: '红包可以合并噢',
          url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1656245922049-assets/web-upload/0109be5b-ca50-4cea-a5a5-c2338d03e18e.jpeg',
        }, {
          id: 1,
          type: 'image',
          title: '好友下单你获得现金红包',
          name: '红包可以合并鸭',
          url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1656244807518-assets/web-upload/7d866c7f-789c-4fd0-980e-fbc79964ee6b.jpeg',
        }, {
          id: 2,
          type: 'image',
          title: '好友下单你获得现金红包',
          name: '红包可以合并吖',
          url: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1656245922049-assets/web-upload/0109be5b-ca50-4cea-a5a5-c2338d03e18e.jpeg',
        }],
        
        current: 0,
        fixedList: [
          {name: '在路上'},
          {name: '已赚取'},
          {name: '邀请失败'}
        ],
        redpacket: [
          {
            number: '1.6',
            desc: '张**使用点餐优惠',
            firstTime: '2022-06-22',
            lastTime: '2022-08-22',
            type: '支持合并使用',
            select: false
          },
          {
            number: '11.2',
            desc: '张**使用点餐优惠',
            firstTime: '2022-06-22',
            lastTime: '2022-08-22',
            type: '支持合并使用',
            select: false
          },
          {
            number: '3.5',
            desc: '陈*使用点餐优惠',
            firstTime: '2022-06-22',
            lastTime: '2022-08-22',
            type: '支持合并使用',
            select: false
          },
          {
            number: '11.2',
            desc: '张**使用点餐优惠',
            firstTime: '2022-06-22',
            lastTime: '2022-08-22',
            type: '支持合并使用',
            select: false
          },
          {
            number: '11.2',
            desc: '张**使用点餐优惠',
            firstTime: '2022-06-22',
            lastTime: '2022-08-22',
            type: '支持合并使用',
            select: false
          },
          {
            number: '11.2',
            desc: '张**使用点餐优惠',
            firstTime: '2022-06-22',
            lastTime: '2022-08-22',
            type: '支持合并使用',
            select: false
          }
        ],
        content: [
          {
            userNumber: '23',
            userName: '韩乐乐',
            date: '06-24 21:23',
            desc: '去使用',
            color: 'red'
          },
          {
            userNumber: '22',
            userName: '蔡东东',
            date: '06-23 09:33',
            desc: '已使用',
            color: 'gray'
          },
          {
            userNumber: '21',
            userName: '李某',
            date: '06-22 09:33',
            desc: '已使用',
            color: 'gray'
          },
          {
            userNumber: '20',
            userName: '韩乐乐',
            date: '06-24 21:23',
            desc: '去使用',
            color: 'red'
          },
          {
            userNumber: '19',
            userName: '蔡东东',
            date: '06-23 09:33',
            desc: '已使用',
            color: 'gray'
          },
          {
            userNumber: '18',
            userName: '李某',
            date: '06-22 09:33',
            desc: '已使用',
            color: 'gray'
          },
          {
            userNumber: '17',
            userName: '韩乐乐',
            date: '06-24 21:23',
            desc: '去使用',
            color: 'red'
          },
          {
            userNumber: '16',
            userName: '蔡东东',
            date: '06-23 09:33',
            desc: '去使用',
            color: 'red'
          },
          {
            userNumber: '15',
            userName: '李某',
            date: '06-22 09:33',
            desc: '去使用',
            color: 'red'
          }
        ],
        content1: [
          {
            userNumber: '15',
            userName: '陈速度',
            date: '06-24 21:23',
            desc: '去使用',
            color: 'red'
          },
          {
            userNumber: '14',
            userName: '蔡东东',
            date: '06-23 09:33',
            desc: '已使用',
            color: 'gray'
          },
          {
            userNumber: '13',
            userName: '蔡东东',
            date: '06-23 09:33',
            desc: '已使用',
            color: 'gray'
          },
          {
            userNumber: '12',
            userName: '李某',
            date: '06-22 09:33',
            desc: '已使用',
            color: 'gray'
          },
          {
            userNumber: '11',
            userName: '韩乐乐',
            date: '06-24 21:23',
            desc: '去使用',
            color: 'red'
          },
          {
            userNumber: '10',
            userName: '蔡东东',
            date: '06-23 09:33',
            desc: '去使用',
            color: 'red'
          },
          {
            userNumber: '09',
            userName: '李某',
            date: '06-22 09:33',
            desc: '去使用',
            color: 'red'
          }
        ],
        content2: [
          {
            userNumber: '06',
            userName: '凌零七',
            date: '06-24 21:23',
            desc: '去使用',
            color: 'red'
          },
          {
            userNumber: '05',
            userName: '凌零八',
            date: '06-23 09:33',
            desc: '已使用',
            color: 'gray'
          },
          {
            userNumber: '04',
            userName: '蔡东东',
            date: '06-23 09:33',
            desc: '已使用',
            color: 'gray'
          },
          {
            userNumber: '03',
            userName: '李某',
            date: '06-22 09:33',
            desc: '已使用',
            color: 'gray'
          },
          {
            userNumber: '02',
            userName: '韩乐乐',
            date: '06-24 21:23',
            desc: '去使用',
            color: 'red'
          },
          {
            userNumber: '01',
            userName: '蔡东东',
            date: '06-23 09:33',
            desc: '去使用',
            color: 'red'
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
        activeBgAnimation: {},
        currentSelectRedpacket: -1
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
      // tab选项卡切换
      tabChange(index) {
        this.current = index
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
      
      // 弹出模态框
      showModal(event) {
        this.openModal()
      },
      // 打开模态框
      openModal() {
        this.show1 = true
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
      
      // 处理红包点击事件
      handleRedpacketClick(index) {
        this.redpacket[index].select = !this.redpacket[index].select
      }
      
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
    margin-top: 600rpx;  
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
    will-change: transform;
    z-index: -1;
  }
  
  /* 轮播视觉差 start */
  .card-swiper {
    height: 654rpx !important;
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
    border-radius: 0 0 60rpx 60rpx;
  }
    
  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
    will-change: transform;
    border-radius: 0 0 60rpx 60rpx;
  }
    
  .card-swiper swiper-item .swiper-item-text {
    margin-top: -235rpx;
    width: 100%;
    display: block;
    height: 50%;
    transform: scale(0.8, 0.8);
    transition: all 0.6s ease 0s;
    will-change: transform;
    overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item-text {
    margin-top: -230rpx;
    margin-left: 10rpx;
    width: 100%;
    transform: scale(0.9, 0.9);
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
  
  /* 优惠券 start */
  .tn-info {
    
    &__container {
      margin-top: 10rpx;
      margin-bottom: 50rpx;
    }
    
    &__item {
      width: 100%;
      margin: 15rpx 0rpx 50rpx 0rpx;
      padding: 20rpx 30rpx;
      border-radius: 10rpx;
      
  
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
          background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/2.png);
        }
      
      &__left {
        
        &--icon {
          width: 50rpx;
          height: 50rpx;
          border-radius: 50%;
          font-size: 40rpx;
          margin-right: 0rpx;
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
            background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg5.png);
          }
        }
        
        &__content {
          font-size: 25rpx;          
          
          &--data {
            color: rgba(255,255,255,0.5);
            margin-top: 5rpx;
            // font-weight: bold;
          }
        }
      }
      
      &__bottom {
        box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.12);
        border-radius: 0 0 10rpx 10rpx;
        position: absolute;
        width: 85%;
        line-height: 36rpx;
        left: 50%;
        bottom: -36rpx;
        transform: translateX(-50%);
        z-index: -1;
        text-align: center;
      }
    }
  }
  /* 业务展示 end */

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
    will-change: transform;
    z-index: 100;
  }
  
 
</style>
