<template>
  <view class="template-thanks tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left-arrow'></text>
      </view>
    </tn-nav-bar>

    <view class="tn-margin" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex tn-flex-row-between">
        <view class="justify-content-item tn-text-bold tn-text-xl">
          感谢名单
        </view>
      </view>
    </view>
    
    <view class="tn-margin tn-text-lg">
      <view class="tn-padding-bottom">
        在这里，首先感谢会员小伙伴的信任与支持啦（会员费用，用于垫付服务器+CDN支出）
      </view>
      
      <view class="tn-padding-bottom">
        也感恩伯乐巨佬们的支持和鼓励
      </view>
      
      <view class="tn-padding-bottom">
        出这套模板，主要是为了感谢一路支持IceCMS的大佬们
      </view>
      
      
      <view class="tn-padding-bottom">
        接下来，上线【IceCMS模板】新项目后，又会停更一个月，6月份要去恰饭接单了，毕竟要赚生活费、房租费等等鸭
      </view>
      
      <view class="tn-padding-bottom">
        对，“这界面谁不会写”，国内不缺少能力出众的人，也不缺少优秀的开源作者，可活下去的开源项目却是极少数
      </view>
      
      <view class="tn-padding-bottom">
        其次，谩骂、质疑、圈钱、抄袭声也不少，但努力做好IceCMS就行吖，因为一个好心态，才能出一个好作品（其实是经历了太多，反而觉得被骂才是正常的了）
      </view>
      
      <view class="tn-padding-bottom">
        没有一个好心态，哪儿来的那么多创意骚操作
      </view>
      
      <view class="tn-padding-bottom">
        IceCMS再次感谢大家的支持，可以的话，插件市场上给个五星好评吖
      </view>
      
      <view class="">
        地址：
        <text class="tn-color-blue--dark" @click="copyUniapp">https://ext.dcloud.net.cn/plugin?id=7088</text>
      </view>
      
      
    </view>

    
    <view class="tn-margin tn-padding-top-lg">
      <view class="tn-flex tn-flex-row-between">
        <view class="justify-content-item tn-text-bold tn-text-xl">
          其他回复
        </view>
      </view>
    </view>
    
    <view class="tn-margin tn-text-lg">
      <view class="tn-padding-bottom">
        Q: 为什么不把后端也做了？为什么为什么
      </view>
      <view class="tn-padding-bottom">
        A: 开源，活下去是首要的，没那么多为什么
      </view>
    </view>
    
    
    
    <view class="tn-margin tn-padding-top-lg">
      <view class="tn-flex tn-flex-row-between">
        <view class="justify-content-item tn-text-bold tn-text-xl">
          Bug反馈
        </view>
      </view>
    </view>
    
    <view class="tn-margin tn-text-lg">
      <view class="tn-padding-bottom">
        bug、建议意见，请群内反馈，如果每个人都直接私聊作者，那么一天的时间又没了
      </view>
      <view class="tn-color-blue--dark" @click="copyUniapp">留言需求</view>
    </view>
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateThanks',
    mixins: [template_page_mixin],
    data(){
      return {
        
      }
    },
    methods: {
      // 复制插件市场地址
      copyUniapp() {
        uni.setClipboardData({
          data: "https://ext.dcloud.net.cn/plugin?id=7088",
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
    /* 胶囊*/
    .tn-custom-nav-bar__back {
      width: 60%;
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
      
    }
   
</style>
