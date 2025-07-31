<template>
  <view class="template-content">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    
    <view class=" tn-text-center" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      
      
      <view class='nav-list'>
        
        <block v-for="(item, index) in redpacket" :key="index">
          <view class="nav-list-item tn-shadow-blur tn-cool-bg-image tn-flex tn-flex-col-center tn-flex-row-between"
          :class="[item.select ? 'tn-cool-bg-color-15' : 'tn-bg-gray--disabled']"  @click="handleRedpacketClick(index)">
            <view class="nav-link tn-flex-1">
              <view class='title'>{{item.title}}</view>
            </view>
            <view class="icon">
              <view :class="['tn-icon-' + item.icon]"></view>
            </view>
          </view>
        </block>
        
      </view>
      
      
      <view>
        <view class="main">
          <view class="stand"></view>
          <view class="cat">
            <view class="body"></view>
            <view class="head">
              <view class="ear"></view>
              <view class="ear"></view>
            </view>
            <view class="face">
              <view class="nose"></view>
              <view class="whisker-container">
                <view class="whisker"></view>
                <view class="whisker"></view>
              </view>
              <view class="whisker-container">
                <view class="whisker"></view>
                <view class="whisker"></view>
              </view>
            </view>
            <view class="tail-container">
              <view class="tail">
                <view class="tail">
                  <view class="tail">
                    <view class="tail">
                      <view class="tail">
                        <view class="tail">
                          <view class="tail"></view>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      
        
        
        
        
      
        <!-- <view class="cu-dialog" style="z-index:999">
          <view class="cu-bar bg-white">
            <view class='action text-gray' @click.stop='closeAppreciateModal'><text style="font-size:36rpx"></text></view>
            <view class='action text-xl text-blod' @click.stop="deterAppreciateSelect">
              <button class='cu-btn bg-blue shadow'>
                投 币
              </button>
            </view>
          </view>
          <view class='grid col-2 padding-sm margin-top'>
            <view v-for="(item, index) in dongdong" :key="index" class='padding-xs margin-bottom social-btns'>
              <button :class="['cu-btn red lg block TNbtn', index == appreciateSelectIndex ? 'btn' : 'line-red']"
                @click.stop="appreciateSelect" :data-index="index" :data-amount="(index + 1)*0.99+(index)*2"><text class="fa">{{item.name}}</text></button>
            </view>
          </view>
        </view> -->
      
      </view>
      
    </view>
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateContent',
    mixins: [template_page_mixin],
    data(){
      return {
        redpacket: [
          {
            icon: "computer",
            title: "一个香吻",
            select: false
          },
          {
            icon: "computer",
            title: "一包辣条",
            select: false
          },
          {
            icon: "computer",
            title: "一片西瓜",
            select: false
          },
          {
            icon: "computer",
            title: "一罐汽水",
            select: false
          },
          {
            icon: "computer",
            title: "一条雪糕",
            select: false
          },
          {
            icon: "computer",
            title: "一杯奶茶",
            select: false
          }
        ],
      }
    },
    methods: {
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
  
  /* 组件导航列表 start*/
  .nav-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0rpx 12rpx 0rpx;
    justify-content: space-between;
    
    /* 列表元素 start */
    .nav-list-item {
      padding: 30rpx 30rpx 20rpx 30rpx;
      border-radius: 12rpx;
      width: 45%;
      margin: 0 18rpx 40rpx;
      background-size: cover;
      background-position: 50%;
      position: relative;
      z-index: 99;
      
      /* 元素标题 start */
      .nav-link {
        font-size: 32rpx;
        line-height: 1.2;
        text-transform: capitalize;
        padding: 0rpx 10rpx 0rpx 0;
        position: relative;
        
        .title {
          color: #FFFFFF;
          text-align: left;
        }
      }
      /* 元素标题 end */
      
      /* 元素图标 start */
      .icon {
        font-variant: small-caps;
        width: 70rpx;
        height: 70rpx;
        line-height: 70rpx;
        margin: 0;
        padding: 0;
        display: inline-flex;
        text-align: center;
        justify-content: center;
        vertical-align: middle;
        font-size: 45rpx;
        color: #FFFFFF;
        white-space: nowrap;
        opacity: 0.9;
        background-color: rgba(0, 0, 0, 0.05);
        background-size: cover;
        background-position: 50%;
        border-radius: 5000rpx;
      }
      /* 元素图标 end */
    }
    /* 列表元素 end */
  }
  /* 组件导航列表 end*/
  
  /* 猫 */
  @keyframes tail {
    6.6666666667% {
      transform: rotate(0);
    }
    10% {
      transform: rotate(10deg);
    }
    16.6666666667% {
      transform: rotate(-5deg);
    }
    20% {
      transform: rotate(30deg);
    }
    26.6666666667% {
      transform: rotate(-2deg);
    }
    46.6666666667% {
      transform: rotate(10deg);
    }
    53.3333333333% {
      transform: rotate(-5deg);
    }
    56.6666666667% {
      transform: rotate(10deg);
    }
  }
  @keyframes body {
    6.6666666667% {
      transform: scaleY(1);
    }
    10% {
      transform: scaleY(1.15);
    }
    16.6666666667% {
      transform: scaleY(1);
    }
    20% {
      transform: scaleY(1.25);
    }
    26.6666666667% {
      transform: scaleY(1);
    }
    46.6666666667% {
      transform: scaleY(1.15);
    }
    53.3333333333% {
      transform: scaleY(1);
    }
    56.6666666667% {
      transform: scaleY(1.15);
    }
  }
  @keyframes left-whisker {
    6.6666666667% {
      transform: rotate(0);
    }
    10% {
      transform: rotate(0deg);
    }
    16.6666666667% {
      transform: rotate(-5deg);
    }
    20% {
      transform: rotate(0deg);
    }
    26.6666666667% {
      transform: rotate(0deg);
    }
    46.6666666667% {
      transform: rotate(10deg);
    }
    53.3333333333% {
      transform: rotate(-5deg);
    }
    56.6666666667% {
      transform: rotate(10deg);
    }
  }
  @keyframes right-whisker {
    6.6666666667% {
      transform: rotate(180deg);
    }
    10% {
      transform: rotate(190deg);
    }
    16.6666666667% {
      transform: rotate(180deg);
    }
    20% {
      transform: rotate(175deg);
    }
    26.6666666667% {
      transform: rotate(190deg);
    }
    46.6666666667% {
      transform: rotate(180deg);
    }
    53.3333333333% {
      transform: rotate(185deg);
    }
    56.6666666667% {
      transform: rotate(175deg);
    }
  }
  @keyframes left-ear {
    0% {
      transform: rotate(-20deg);
    }
    6.6666666667% {
      transform: rotate(-6deg);
    }
    13.3333333333% {
      transform: rotate(-15deg);
    }
    26.6666666667% {
      transform: rotate(-15deg);
    }
    33.3333333333% {
      transform: rotate(-30deg);
    }
    40% {
      transform: rotate(-30deg);
    }
    46.6666666667% {
      transform: rotate(0deg);
    }
    53.3333333333% {
      transform: rotate(0deg);
    }
    60% {
      transform: rotate(-15deg);
    }
    80% {
      transform: rotate(-15deg);
    }
    93.3333333333% {
      transform: rotate(-6deg);
    }
    100% {
      transform: rotateZ(-6deg);
    }
  }
  @keyframes right-ear {
    0% {
      transform: rotateZ(-16deg);
    }
    6.6666666667% {
      transform: rotateZ(-16deg);
    }
    13.3333333333% {
      transform: rotateZ(-19deg);
    }
    26.6666666667% {
      transform: rotateZ(-19deg);
    }
    33.3333333333% {
      transform: rotateZ(-30deg);
    }
    36.6666666667% {
      transform: rotateZ(-19deg);
    }
    37.3333333333% {
      transform: rotateZ(-30deg);
    }
    38% {
      transform: rotateZ(-19deg);
    }
    40% {
      transform: rotateZ(-19deg);
    }
    40.6666666667% {
      transform: rotateZ(-30deg);
    }
    41.3333333333% {
      transform: rotateZ(-19deg);
    }
    46.6666666667% {
      transform: rotateZ(-9deg);
    }
    53.3333333333% {
      transform: rotateZ(-9deg);
    }
    60% {
      transform: rotateZ(-19deg);
    }
    60.6666666667% {
      transform: rotateZ(-30deg);
    }
    61.3333333333% {
      transform: rotateZ(-19deg);
    }
    62.6666666667% {
      transform: rotateZ(-19deg);
    }
    63.3333333333% {
      transform: rotateZ(-30deg);
    }
    64% {
      transform: rotateZ(-19deg);
    }
    80% {
      transform: rotateZ(-19deg);
    }
    93.3333333333% {
      transform: rotateZ(-16deg);
    }
    100% {
      transform: rotateZ(-16deg);
    }
  }
  
  
  .main {
    height: 250px;
    width: 300px;
    position: absolute;
    bottom: 200px;
    left: 0px;
  }
  .main .stand {
    position: absolute;
    top: 50%;
    left: 100px;
    transform: translate(-50%);
    height: 20px;
    width: 180px;
    border-radius: 20px;
    background-color: #fd6e72;
    z-index: 2;
  }
  .main .stand::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translate(-50%);
    height: 20px;
    width: 50px;
    border-radius: 20px;
    background-color: #fdf9de;
    box-shadow: 0 10px 0 #fdf9de, 0 20px 0 #fdf9de, 0 30px 0 #fdf9de, 0 40px 0 #fdf9de, 0 50px 0 #fdf9de, 0 60px 0 #fdf9de, 0 70px 0 #fdf9de, 0 80px 0 #fdf9de, 0 90px 0 #fdf9de, 0 100px 0 #fdf9de, 0 110px 0 #fdf9de, 0 120px 0 #fdf9de, 0 130px 0 #fdf9de, 0 140px 0 #fdf9de, 0 150px 0 #fdf9de, 0 160px 0 #fdf9de, 0 170px 0 #fdf9de;
  
  }
  .main .cat {
    width: 110px;
    height: 50px;
    position: absolute;
    top: calc(50% - 50px);
    right: 130px;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
  }
  .main .cat .body {
    width: 110px;
    height: 50px;
    background-color: #5F4852;
    position: absolute;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    animation: body 12s none infinite;
  }
  .main .cat .head {
    content: "";
    width: 70px;
    height: 35px;
    background-color: #5F4852;
    position: absolute;
    top: calc(50% - 10px);
    left: -40px;
    border-top-left-radius: 80px;
    border-top-right-radius: 80px;
  }
  
  .tail-container {
    position: absolute;
    right: 0;
    bottom: -13px;
    z-index: 999;
  }
  
  .tail {
    z-index: 999;
    position: absolute;
    height: 30px;
    width: 14px;
    bottom: -10px;
    right: 0;
    border-bottom-right-radius: 5px;
    background: #5F4852;
  }
  .tail > .tail {
    animation: tail 12s none infinite;
    height: 100%;
    width: 14px;
    transform-origin: left;
    border-bottom-left-radius: 20px 20px;
    border-bottom-right-radius: 20px 20px;
    border-top-right-radius: 40px;
  }
  
  .ear {
    position: absolute;
    left: 4px;
    top: -4px;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 20px solid #5F4852;
    transform: rotate(-30deg);
    animation: left-ear 12s both infinite;
  }
  .ear + .ear {
    animation: right-ear 12s both infinite;
    top: -12px;
    left: 30px;
  }
  
  .nose {
    position: absolute;
    bottom: 10px;
    left: -10px;
    background-color: #fd6e72;
    height: 5px;
    width: 5px;
    border-radius: 50%;
  }
  
  .whisker-container {
    position: absolute;
    bottom: 5px;
    left: -36px;
    width: 20px;
    height: 10px;
    transform-origin: right;
    animation: left-whisker 12s both infinite;
  }
  .whisker-container:nth-child(2) {
    left: -20px;
    bottom: 12px;
    transform-origin: right;
    transform: rotate(180deg);
    animation: right-whisker 12s both infinite;
  }
  
  .whisker {
    position: absolute;
    top: 0;
    width: 100%;
    border: 1px solid #fdf9de;
    transform-origin: 100% 0;
    transform: rotate(10deg);
  }
  .whisker:last-child {
    top: 0;
    transform: rotate(-20deg);
  }
</style>
