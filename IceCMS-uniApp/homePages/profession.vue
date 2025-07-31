<template>
  <view class="template-business tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>

    <!-- 顶部 -->
    <view>

      <view class="king-list" :style="{paddingTop: vuex_custom_bar_height + 'px'}">

        <view class="king-icon ">
          <text class='tn-icon-clip tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>开发</text>
        </view>
        <view class='king-item tn-color-indigo tn-icon-science'>
          <view class="resume2 tn-main-gradient-blue--light tn-shadow-blur" style="padding: 20rpx 20rpx;">
            <text class="tn-margin-top-sm">
              基Uniapp进行开发，适配APP、微信小程序、网页的应用
            </text>
          </view>

        </view>
        
        <view class="king-icon">
          <text class='tn-icon-clip tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>写在前面</text>
        </view>
        <view class='king-item tn-color-indigo tn-icon-science'>
          <view class="resume2 tn-main-gradient-blue--light tn-shadow-blur" style="padding: 20rpx 20rpx;">
            <text class="tn-margin-top-sm">
              初步了解，主要是看能不能聊得来，聊不来给高价也不接，毕竟追求的是合作愉快以及长期合作
            </text>
          </view>
        </view>
        <view class='king-item tn-color-indigo tn-icon-science'>
          <view class="resume2 tn-main-gradient-blue--light tn-shadow-blur" style="padding: 20rpx 20rpx;">
            <text class="tn-margin-top-sm">
              如果当月业务已满，可以群里找群友们合作
            </text>
          </view> 
        </view>
        
        <view class="king-icon">
          <text class='tn-icon-clip tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>初步沟通</text>
        </view>
        <view class='king-item tn-color-indigo tn-icon-science'>
          <view class="resume2 tn-main-gradient-blue--light tn-shadow-blur" style="padding: 20rpx 20rpx;">
            <text class="tn-margin-top-sm">
              是否有需求原型？如果没有原型或参考，是无法写前端的
            </text>
          </view> 
        </view>

        
        <view class="king-icon">
          <text class='tn-icon-clip tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>评估报价</text>
        </view>
        <view class='king-item tn-color-indigo tn-icon-science'>
          <view class="resume2 tn-main-gradient-blue--light tn-shadow-blur" style="padding: 20rpx 20rpx;">
            <text class="tn-margin-top-sm">
              简单报价，大概一个页面200+，简单的页面可以送，交互复杂度较高的需沟通确认
            </text>
          </view> 
        </view>


        <view class="king-icon">
          <text class='tn-icon-clip tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>支付定金</text>
        </view>



        <view class="king-icon">
          <text class='tn-icon-clip tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>开发测试</text>
        </view>
        
        <view class="king-icon">
          <text class='tn-icon-clip tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>项目交付</text>
        </view>
        
        
        
        <view class="king-icon">
          <text class='tn-icon-clip tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>项目交付</text>
        </view>
        
        
        
        <view class="king-icon">
          <text class='tn-icon-clip tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>注意事项</text>
        </view>
        
        
        <view class="king-icon">
          <text class='tn-icon-clip tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>支付尾款</text>
        </view>
        


        <!-- <view class="king-icon">
          <text class='tn-icon-brand tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>其他布局</text>
        </view>
        <view class='king-item tn-color-indigo tn-icon-science'>
          <view class="resume text-lg">
            <text>文字文字文字文字</text>
            <text class='fr'>1299</text>
          </view>
          <view class="bg-img-cont margin-top margin-bottom-sm img-solid radius"
            style="background-image:url(https://cdn.nlark.com/yuque/0/2021/jpeg/280373/1629527293242-assets/web-upload/b2fee5b4-8ec9-4a42-b101-fc93975298cd.jpeg);">
          </view>
          <view class="resume2">
            <text>内容内容内容内容内容内容内容内容内容内容</text>
          </view>
          <view class="resume2">
            <text>内容内容内容内容内容内容内容内容内容内容</text>
          </view>
        </view>
        <view class='king-item tn-color-indigo tn-icon-science'>
          <view class="resume text-lg">
            <text>文字文字文字文字</text>
            <text class='fr'>1299</text>
          </view>
          <view class="bg-img-cont margin-top margin-bottom-sm img-solid radius"
            style="background-image:url(https://cdn.nlark.com/yuque/0/2021/jpeg/280373/1629527293242-assets/web-upload/b2fee5b4-8ec9-4a42-b101-fc93975298cd.jpeg);">
          </view>
          <view class="resume2">
            <text>内容内容内容内容内容内容内容内容内容内容</text>
          </view>
          <view class="resume2">
            <text>内容内容内容内容内容内容内容内容内容内容</text>
          </view>
        </view>
        <view class='king-item tn-color-indigo tn-icon-science'>
          <view class="resume text-lg">
            <text>文字文字文字文字</text>
            <text class='fr'>1299</text>
          </view>
          <view class="bg-img-cont margin-top margin-bottom-sm img-solid radius"
            style="background-image:url(https://cdn.nlark.com/yuque/0/2021/jpeg/280373/1629527293242-assets/web-upload/b2fee5b4-8ec9-4a42-b101-fc93975298cd.jpeg);">
          </view>
          <view class="resume2">
            <text>内容内容内容内容内容内容内容内容内容内容</text>
          </view>
          <view class="resume2">
            <text>内容内容内容内容内容内容内容内容内容内容</text>
          </view>
        </view>

        <view class="king-icon">
          <text class='tn-icon-tag tn-color-white tn-text-lg tn-bg-indigo tn-round tn-padding-xs'></text>
          <text class='tn-text-xl tn-margin-left'>个性标签</text>
        </view>
        <view class='king-item tn-color-indigo tn-icon-science'>
          <view class="resume">
            
            <view class="tn-tag-content tn-text-justify">
              <view v-for="(item, index) in tagList" :key="index" class="tn-tag-content__item tn-margin-right tn-round tn-text-sm tn-text-bold" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
                <text class="tn-tag-content__item--prefix">#</text> {{ item.title }}
              </view>
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
    name: 'TemplateBusiness',
    mixins: [template_page_mixin],
    data(){
      return {
        tagList: [
          {
            color: 'red',
            title: "萌新求带",
          },
          {
            color: 'cyan',
            title: "简约美",
          },
          {
            color: 'blue',
            title: "开心吃货",
          },
          {
            color: 'green',
            title: "爱花草",
          },
          {
            color: 'orange',
            title: "产品经理",
          },
          {
            color: 'purplered',
            title: "手工王子",
          },
          {
            color: 'purple',
            title: "创意设计",
          },
          {
            color: 'brown',
            title: "腹黑",
          },
          {
            color: 'yellowgreen',
            title: "水果控",
          },
          {
            color: 'lime',
            title: "bug多多",
          },
          {
            color: 'grey',
            title: "蠢萌蠢萌",
          }
        ]
      }
    },
    methods: {
      
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

  /* 简历内容 */
  .king-list {
    display: block;
    background-color: #ffffff;
  }
  
  .king-list .king-icon {
    width: 100%;
    text-align: left;
    padding: 20rpx 0 20rpx 37rpx;
    font-size: 26rpx;
    color: #888;
    display: block;
  }
  
  .king-list>.king-item {
    padding: 30rpx 30rpx 30rpx 120rpx;
    position: relative;
    display: block;
    z-index: 0;
  }

  .king-list>.king-item::after {
    content: "";
    display: block;
    position: absolute;
    width: 1rpx;
    background-color: #E6E6E6;
    left: 60rpx;
    height: 100%;
    top: 0;
    z-index: 8;
  }

  .king-list>.king-item::before {
    display: block;
    position: absolute;
    top: 36rpx;
    z-index: 9;
    background-color: #ffffff;
    width: 50rpx;
    height: 50rpx;
    text-align: center;
    border: none;
    line-height: 50rpx;
    left: 36rpx;
  }


  /* 名片微调 */
  .img-solid {
    border: 2rpx solid #eee;
  }

  .share-img {
    position: fixed;
    /* padding: 10rpx; */
    width: 100rpx;
    height: 100rpx;
    /* top: 680rpx; */
    bottom: 200rpx;
    right: 20rpx;
    z-index: 1024;
    opacity: 0.8;
    box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.3);
    border: none;
    border: 6rpx solid rgba(255, 255, 255, 0);
  }

  .resume {
    display: flex;
    justify-content: space-between;
    padding-top: 10rpx;
    border-radius: 6rpx;
    color: #666;
    line-height: 1.6;
  }

  .resume+.resume {
    margin-top: 20rpx;
  }

  .resume2 {
    padding-top: 10rpx;
    border-radius: 6rpx;
    display: block;
    color: #666;
    line-height: 1.6;
    text-align: justify;
  }
  
  /* 间隔线 start*/
  .tn-strip-bottom {
   width: 100%;
   border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
  }
   /* 间隔线 end*/


  .bg-img-cont {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 350rpx;
    margin: 20rpx 0;
    border-radius: 8rpx;
  }



  // .button-no {
  //   border: none;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0, 0, 0, 0);
  // }
  
  
  /* 标签内容 start*/
  .tn-tag-content {
    &__item {
      display: inline-block;
      line-height: 45rpx;
      padding: 10rpx 30rpx;
      margin: 0rpx 20rpx 25rpx 0rpx;
      
      &--prefix {
        padding-right: 10rpx;
      }  
    }
  }
  /* 标签内容 end*/
  
  .see {
    display: flex;
    justify-content: space-between;
    padding-top: 10rpx;
    border-radius: 6rpx;
    color: #666;
    line-height: 1.6;
  }
</style>
