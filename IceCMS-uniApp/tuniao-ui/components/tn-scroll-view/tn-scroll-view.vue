<template>
  <view class="tn-scroll-view-class tn-scroll-view">
    <scroll-view
      class="scroll-view"
      :style="[scrollViewStyle]"
      scroll-y
      scroll-anchoring
      enable-back-to-top
      :throttle="false"
      :scroll-top="scrollTop"
      :lower-threshold="lowerThreshold"
      @scroll="handleScroll"
      @touchend="handleTouchEnd"
      @touchmove.prevent.stop="handleTouchMove"
      @touchstart="handleTouchStart"
      @scrolltolower="handleScrollTolower"
    >
      <view class="scroll__content" :style="[scrollContentStyle]">
        <view class="scroll__pull-down">
          <slot name="pulldown">
            <view class="scroll__refresh" :style="[refreshStyle]">
              <view><tn-loading :animation="refreshing"></tn-loading></view>
              <view class="scroll__refresh--text" :style="[refreshTextStyle]">{{ refreshStateText }}</view>
            </view>
          </slot>
        </view>
        <view :id="elScrollDataId" class="scroll__data">
          <slot></slot>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import componentsColor from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-scroll-view',
    mixins: [ componentsColor ],
    props: {
      // H5顶部导航栏的高度
      h5NavHeight: {
        type: Number,
        default: 45
      },
      // 自定义顶部导航栏高度
      customNavHeight: {
        type: Number,
        default: 0
      },
      // 可滚动区域顶部偏移高度
      offsetTop: {
        type: Number,
        default: 0
      },
      // 可滚动区域底部偏移高度
      offsetBottom: {
        type: Number,
        default: 0
      },
      // 容器高度 (不设置则自动计算)
      height: {
        type: Number,
        default: null
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 禁用下拉刷新
      pullDownDisabled: {
        type: Boolean,
        default: false
      },
      // 下拉速率
      pullDownSpeed: {
        type: Number,
        default: 0.5
      },
      // 刷新延迟
      refreshDelayed: {
        type: Number,
        default: 800
      },
      // 刷新完成后延迟
      refreshFinishDelayed: {
        type: Number,
        default: 800
      },
      // 下拉刷新距离
      refresherThreshold: {
        type: Number,
        default: 70
      },
      // 上拉加载距离
      lowerThreshold: {
        type: Number,
        default: 40
      },
      // 刷新状态
      refreshState: {
        type: Boolean,
        default: false
      },
      // 正在刷新文字
      refreshingText: {
        type: String,
        default: '正在刷新'
      },
      // 刷新成功文字
      refreshSuccessText: {
        type: String,
        default: '刷新成功'
      },
      // 下拉中的文字
      pulldownText: {
        type: String,
        default: '下拉刷新'
      },
      // 下拉完成的文字
      pulldownFinishText: {
        type: String,
        default: '松开刷新'
      }
    },
    data() {
      return {
        // 滚动容器内容id
        elScrollDataId: '',
        // 系统信息
        systemInfo: {
          height: 0,
          statusBarHeight: 0
        },
        // 距离顶部滚动高度
        scrollTop: 0,
        // 滚动内容视图顶部位置
        scrollDataTop: -1,
        // 滚动内容视图顶部位置偏移
        scrollDataOffsetTop: -1,
        // 滚动区域的高度
        scrollViewHeight: 0,
        // 当前滚动高度
        currentScrollTop: 0,
        // 当前触摸点Y轴开始坐标
        currentTouchStartY: 0,
        // 刷新状态文字
        refreshStateText: '下拉刷新',
        // 是否刷新中
        refreshing: false,
        // 是否刷新完成
        refreshFinish: false,
        // 是否正在下拉
        pulldowning: false,
        // 下拉高度
        pullDownHeight: 0,
        // 是否显示下拉加载
        showPullDown: false
      }
    },
    computed: {
      scrollViewStyle() {
        let style = {}
        style.height = this.scrollViewHeight + 'px'
        if (!this.backgroundColorClass) {
          style.backgroundColor = this.backgroundColorStyle
        }
        return style
      },
      scrollContentStyle() {
        let style = {}
        style.transform = this.showPullDown ? `translateY(${this.pullDownHeight}px)` : `translateY(0px)`
        style.transition = this.pulldowning ? `transform 100ms ease-out` : `transform 500ms cubic-bezier(0.19,1.64,0.42,0.72)`
        return style
      },
      refreshStyle() {
        let style = {}
        style.opacity = this.showPullDown ? 1 : 0
        return style
      },
      refreshTextStyle() {
        let style = {}
        if (!this.fontColorClass) {
          style.color = this.fontColorStyle
        }
        return style
      },
      loadTextStyle() {
        let style = {}
        if (!this.fontColorClass) {
          style.color = this.fontColorStyle
        }
        return style
      }
    },
    watch: {
      refreshState(nVal, oVal) {
        if (!nVal) {
          if (this.showPullDown) {
            // 关闭正在下拉
            this.pulldowning = false
            // 隐藏下拉刷新
            this.showPullDown = false
            // 关闭正在刷新
            this.refreshing = false
          }
        }
      }
    },
    created() {
      this.elScrollDataId = this.$t.uuid()
      this.getSystemInfo()
    },
    mounted() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      // 组件初始化
      init() {
        this.refreshStateText = this.pulldownText
        // 初始化scrollView信息
        this.updateScrollViewInfo()
      },
      // 获取系统信息
      getSystemInfo() {
        const systemInfo = uni.getSystemInfoSync()
        this.systemInfo.height = systemInfo.safeArea.height
        this.systemInfo.statusBarHeight = systemInfo.statusBarHeight
      },
      // 更新scrollView信息
      updateScrollViewInfo() {
        if (this.height) {
          this.scrollViewHeight = this.height
        } else {
          // 设置scrollView的高度和组件顶部位置
          // console.log(this.systemInfo, this.offsetTop, this.customNavHeight);
          // #ifdef H5
          this.scrollViewHeight = this.systemInfo.height - (
            this.offsetTop + 
            (this.customNavHeight ? this.customNavHeight : this.h5NavHeight) + 
            this.offsetBottom)
          this.scrollDataOffsetTop = this.offsetTop + (this.customNavHeight ? this.customNavHeight : this.h5NavHeight)
          // #endif
          // #ifndef H5
          this.scrollViewHeight = this.systemInfo.height - (
            this.offsetTop + 
            this.systemInfo.statusBarHeight +
            this.offsetBottom)
          this.scrollDataOffsetTop = this.offsetTop + this.systemInfo.statusBarHeight
          // #endif
        }
      },
      // 获取scrollView内容信息
      async getScrollDataInfo() {
        const scrollInfo = await this._tGetRect(`#${this.elScrollDataId}`)
        this.scrollDataTop = scrollInfo.top
      },
      // 上拉触底事件
      handleScrollTolower(e) {
        if (this.pullUpDisabled) return
        this.$emit('scrolltolower', e)
      },
      // 滚动事件
      handleScroll(e) {
        this.currentScrollTop = e.detail.scrollTop
        this.$emit('scroll', e.detail)
      },
      // 触摸按下事件
      handleTouchStart(e) {
        if (this.disabled) return
        this.currentTouchStartY = e.touches[0].clientY
        this.getScrollDataInfo()
        this.$emit('touchStart', e)
      },
      // 触摸下滑事件
      handleTouchMove(e) {
        if (this.disabled) return
        if (this.currentScrollTop == 0 && e.touches[0].clientY >= this.currentTouchStartY) {
          // 容器滑动的偏移
          const moveOffset = this.scrollDataTop > 0 ?
            (this.scrollDataOffsetTop - this.scrollDataTop) :
            (Math.abs(this.scrollDataTop) + this.scrollDataOffsetTop)
          
          this.pulldowning = true
          this.showPullDown = true
          let pullDownDistance = ((e.touches[0].clientY - this.currentTouchStartY)  - moveOffset) * this.pullDownSpeed
          this.pullDownHeight = pullDownDistance
          // this.pullDownHeight = pullDownDistance > this.refresherThreshold ? this.refresherThreshold : pullDownDistance
          this.refreshStateText = this.pullDownHeight >= this.refresherThreshold ? this.pulldownFinishText : this.pulldownText
          if (pullDownDistance > this.refresherThreshold) {
            this.$emit('refreshReady')
          }
        }
        this.$emit('touchMove', e)
      },
      // 触摸松开处理
      handleTouchEnd(e) {
        if (this.disabled) return
        // 处理下拉刷新
        if (this.showPullDown) {
          // 当下拉高度小于下拉阈值
          if (this.pullDownHeight < this.refresherThreshold) {
            // 关闭正在下拉
            this.pulldowning = false
            // 重置下拉高度
            this.pullDownHeight = 0
            // 隐藏下拉刷新
            this.showPullDown = false
            // 触发下拉中断事件
            this.$emit('refreshStop')
          } else {
            this.pullDownHeight = this.pullDownHeight > this.refresherThreshold ? this.refresherThreshold : this.pullDownHeight
            this.refresh()
          }
        }
        
        // 触发下拉触摸松开事件
        this.$emit('touchEnd', e)
      },
      
      // 刷新数据
      refresh() {
        // 设置刷新未完成
        this.refreshFinish = false
        // 开启正在刷新
        this.refreshing = true
        // 设置正在刷新状态文字
        this.refreshStateText = this.refreshingText
        // 触发refresh事件
        setTimeout(() => {
          this.$emit('refresh')
        }, this.refreshDelayed)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .tn-scroll-view {
    
    .scroll-view {
      position: relative;
      touch-action: none;
      
      .scroll__content {
        display: flex;
        will-change: transform;
        flex-direction: column;
        
        .scroll {
          &__pull-down {
            position: absolute;
            left: 0;
            width: 100%;
            display: flex;
            padding: 30rpx 0;
            align-items: center;
            justify-content: center;
            transform: translateY(-100%);
          }
          
          &__refresh {
            display: flex;
            align-items: center;
            justify-content: center;
            &--text {
              margin-left: 10rpx;
            }
          }
          
          &__data {
            
          }
          
          &__pull-up {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateY(100%);
          }
          &__load {
            padding: 20rpx 0;
            display: flex;
            align-items: center;
            justify-content: center;
            &--text {
              margin-left: 10rpx;
            }
          }
        }
      }
    }
  }
</style>
