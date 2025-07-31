<template>
  <view
    class="tn-custom-nav-bar-class tn-custom-nav-bar"
    :style="[navBarStyle]"
  >
  	<view
      class="tn-custom-nav-bar__bar"
      :class="[barClass]"
      :style="[barStyle]"
    >
      <view v-if="isBack">
        <view v-if="customBack">
          <view 
            :style="{
              width: customBackStyleInfo.width + 'px',
              height: customBackStyleInfo.height + 'px',
              marginLeft: customBackStyleInfo.left + 'px'
            }"
          >
            <slot name="back"></slot>
          </view>
        </view>
        <view v-else class="tn-custom-nav-bar__bar__action" @tap="handlerBack">
        	<text class="tn-custom-nav-bar__bar__action--nav-back" :class="[`tn-icon-${backIcon}`]"></text>
        	<text class="tn-custom-nav-bar__bar__action--nav-back-text" v-if="backTitle">{{ backTitle }}</text>
        </view>
      </view>
  		<view class="tn-custom-nav-bar__bar__content" :style="[contentStyle]">
  			<slot></slot>
  		</view>
  		<view>
        <slot name="right"></slot>
      </view>
  	</view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-nav-bar',
    mixins: [componentsColorMixin],
    props: {
      // 层级
      zIndex: {
        type: Number,
        default: 0
      },
      // 导航栏的高度
      height: {
        type: Number,
        default: 0
      },
      // 高度单位
      unit: {
        type: String,
        default: 'px'
      },
      // 是否显示返回按钮
      isBack: {
        type: Boolean,
        default: true
      },
      // 返回按钮的图标
      backIcon: {
        type: String,
        default: 'left'
      },
      // 返回按钮旁显示的文字
      backTitle: {
        type: String,
        default: '返回'
      },
      // 透明状态栏
      alpha: {
        type: Boolean,
        default: false
      },
      // 是否固定在顶部
      fixed: {
        type: Boolean,
        default: true
      },
      // 是否显示底部阴影
      bottomShadow: {
        type: Boolean,
        default: true
      },
      // 是否自定义返回按钮
      customBack: {
        type: Boolean,
        default: false
      },
      // 返回前回调
      beforeBack: {
        type: Function,
        default: null
      }
    },
    computed: {
      navBarStyle() {
        let style = {}
        style.height = this.height === 0 ? this.customBarHeight + this.unit : this.height + this.unit
        if (this.fixed) {
          style.position = 'fixed'
        }
        style.zIndex = this.elZIndex
        
        return style
      },
      barClass() {
        let clazz = ''
        if (this.backgroundColorClass) {
          clazz += ` ${this.backgroundColorClass}`
        }
        if (this.fontColorClass) {
          clazz += `${this.fontColorClass}`
        }
        if (this.fixed) {
          clazz += ' tn-custom-nav-bar__bar--fixed'
        }
        if (this.alpha) {
          clazz += ' tn-custom-nav-bar__bar--alpha'
        }
        if (this.bottomShadow) {
          clazz += ' tn-custom-nav-bar__bar--bottom-shadow'
        }
        
        return clazz
      },
      barStyle() {
        let style = {}
        style.height = this.height === 0 ? this.customBarHeight + this.unit : this.height + this.unit
        
        if (this.fixed) {
          style.paddingTop = this.statusBarHeight + 'px'
        }
        
        if(!this.backgroundColorClass) {
          style.backgroundColor = this.backgroundColor !== '' ? this.backgroundColor : '#FFFFFF'
        }
        if (!this.fontColorClass && this.fontColor) {
          style.color= this.fontColor
        }
        
        style.zIndex = this.elZIndex
        
        return style
      },
      contentStyle() {
        let style = {}
        style.top = this.fixed ? this.statusBarHeight + 'px' : '0px'
        style.height = this.height === 0 ? (this.customBarHeight - this.statusBarHeight) + this.unit : this.height + this.unit
        style.lineHeight = style.height
        
        if (this.isBack) {
          if (this.customBack) {
            const width = (this.customBackStyleInfo.width + this.customBackStyleInfo.left) * 2
            style.width = `calc(100% - ${width}px)`
          } else {
            style.width = 'calc(100% - 340rpx)'
          }
        } else {
          style.width = '100%'
        }
        
        return style
      },
      elZIndex() {
        return this.zIndex ? this.zIndex : this.$t.zIndex.navbar
      }
    },
    data() {
      return {
        // 状态栏的高度
        statusBarHeight: 0,
        // 自定义导航栏的高度
        customBarHeight: 0,
        // 自定义返回按钮时，返回容器的宽高边距信息
        customBackStyleInfo: {
          width: 86,
          height: 32,
          left: 15
        }
      }
    },
    mounted() {
      // 获取vuex中的自定义顶栏的高度
      this.updateNavBarInfo()
    },
    created() {
      // 获取胶囊信息
      // #ifdef MP-WEIXIN
      let custom = wx.getMenuButtonBoundingClientRect()
      this.customBackStyleInfo.width = custom.width
      this.customBackStyleInfo.height = custom.height
      this.customBackStyleInfo.left = uni.upx2px(750) - custom.right
      // #endif
    },
    methods: {
      // 更新导航栏的高度
      async updateNavBarInfo() {
        // 获取vuex中的自定义顶栏的高度
        let customBarHeight = this.vuex_custom_bar_height
        let statusBarHeight = this.vuex_status_bar_height
        // 如果获取失败则重新获取
        if (!customBarHeight) {
          try {
            const navBarInfo = await this.$t.updateCustomBar()
            customBarHeight = navBarInfo.customBarHeight
            statusBarHeight = navBarInfo.statusBarHeight
          } catch(e) {
            setTimeout(() => {
              this.updateNavBarInfo()
            }, 10)
            return
          }
        }
        
        // 更新vuex中的导航栏信息
        this && this.$t.vuex('vuex_status_bar_height', statusBarHeight)
        this && this.$t.vuex('vuex_custom_bar_height', customBarHeight)
        
        this.customBarHeight = customBarHeight
        this.statusBarHeight = statusBarHeight
      },
      // 处理返回事件
      async handlerBack() {
        if (this.beforeBack && typeof(this.beforeBack) === 'function') {
          // 执行回调，同时传入索引当作参数
          // 在微信，支付宝等环境(H5正常)，会导致父组件定义的函数体中的this变成子组件的this
          // 通过bind()方法，绑定父组件的this，让this的this为父组件的上下文
          let beforeBack = this.beforeBack.bind(this.$t.$parent.call(this))()
          // 判断是否返回了Promise
          if (!!beforeBack && typeof beforeBack.then === 'function') {
            await beforeBack.then(res => {
              // Promise返回成功
              this.navBack()
            }).catch(err => {})
          } else if (beforeBack === true) {
            this.navBack()
          }
        } else {
          this.navBack()
        }
      },
      // 返回上一页
      navBack() {
        
        // 通过判断当前页面的页面栈信息，是否有上一页进行返回，如果没有则跳转到首页
        const pages = getCurrentPages()
        if (pages && pages.length > 0) {
          const firstPage = pages[0]
          if (pages.length == 1 && (!firstPage.route || firstPage.route != 'pages/index/index')) {
            uni.reLaunch({
              url: '/pages/index/index'
            })
          } else {
            uni.navigateBack({
              delta: 1
            })
          }
        } else {
          uni.reLaunch({
            url: '/pages/index/index'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-custom-nav-bar {
    display: block;
    position: relative;
    
    &__bar {
      display: flex;
      position: relative;
      align-items: center;
      min-height: 100rpx;
      justify-content: space-between;
      min-height: 0px;
      /* #ifdef MP-WEIXIN */
      padding-right: 220rpx;
      /* #endif */
      /* #ifdef MP-ALIPAY */
      padding-right: 150rpx;
      /* #endif */
      box-shadow: 0rpx 0rpx 0rpx;
      z-index: 9999;
      
      &--fixed {
        position: fixed;
        width: 100%;
        top: 0;
      }
      
      &--alpha {
        background: transparent !important;
        box-shadow: none !important;
      }
      
      &--bottom-shadow {
        box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.05);
      }
      
      &__action {
        display: flex;
        align-items: center;
        height: 100%;
        justify-content: center;
        max-width: 100%;
        
        &--nav-back {
          /* position: absolute; */
          /* top: 50%; */
          /* left: 20rpx; */
          /* margin-top: -15rpx; */
          // width: 25rpx;
          // height: 25rpx;
          padding: 20rpx;
          font-size: 38rpx;
          line-height: 100%;
          // border-width: 0 0 4rpx 4rpx;
          // border-color: #000000;
          // border-style: solid;
          // transform: matrix(0.5, 0.5, -0.5, 0.5, 0, 0);
        }
        
        &--nav-back-text {
          padding: 20rpx 20rpx 20rpx 0rpx;
        }
      }
      
      &__content {
        position: absolute;
        text-align: center;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        font-size: 32rpx;
        // cursor: none;
        // pointer-events: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  
</style>
