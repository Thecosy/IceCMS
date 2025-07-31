<template>
  <view
    class="tn-column-notice-class tn-column-notice"
    :class="[backgroundColorClass]"
    :style="[noticeStyle]"
  >
    <!-- 左图标 -->
    <view class="tn-column-notice__icon">
      <view
        v-if="leftIcon"
        class="tn-column-notice__icon--left" 
        :class="[`tn-icon-${leftIconName}`,fontColorClass]"
        :style="[fontStyle('leftIcon')]"
        @tap="clickLeftIcon"></view>
    </view>
    
    <!-- 滚动显示内容 -->
    <swiper class="tn-column-notice__swiper" :style="[swiperStyle]" :vertical="vertical" circular :autoplay="autoplay && playStatus === 'play'" :interval="duration" @change="change">
      <swiper-item v-for="(item, index) in list" :key="index" class="tn-column-notice__swiper--item">
        <view
          class="tn-column-notice__swiper--content tn-text-ellipsis"
          :class="[fontColorClass]"
          :style="[fontStyle()]"
          @tap="click(index)"
        >{{ item }}</view>
      </swiper-item>
    </swiper>
    
    <!-- 右图标 -->
    <view class="tn-column-notice__icon">
      <view
        v-if="rightIcon"
        class="tn-column-notice__icon--right" 
        :class="[`tn-icon-${rightIconName}`,fontColorClass]"
        :style="[fontStyle('rightIcon')]"
        @tap="clickRightIcon"></view>
      <view
        v-if="closeBtn"
        class="tn-column-notice__icon--right" 
        :class="[`tn-icon-close`,fontColorClass]"
        :style="[fontStyle('close')]"
        @tap="close"></view>
    </view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-column-notice',
    mixins: [componentsColorMixin],
    props: {
      // 显示的内容
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 播放状态
      // play -> 播放 paused -> 暂停
      playStatus: {
        type: String,
        default: 'play'
      },
      // 滚动方向
      // horizontal -> 水平滚动 vertical -> 垂直滚动
      mode: {
        type: String,
        default: 'horizontal'
      },
      // 是否显示左边图标
      leftIcon: {
        type: Boolean,
        default: true
      },
      // 左边图标的名称
      leftIconName: {
        type: String,
        default: 'sound'
      },
      // 左边图标的大小
      leftIconSize: {
        type: Number,
        default: 34
      },
      // 是否显示右边的图标
      rightIcon: {
        type: Boolean,
        default: false
      },
      // 右边图标的名称
      rightIconName: {
        type: String,
        default: 'right'
      },
      // 右边图标的大小
      rightIconSize: {
        type: Number,
        default: 26
      },
      // 是否显示关闭按钮
      closeBtn: {
        type: Boolean,
        default: false
      },
      // 圆角
      radius: {
        type: Number,
        default: 0
      },
      // 内边距
      padding: {
        type: String,
        default: '18rpx 24rpx'
      },
      // 自动播放
      autoplay: {
        type: Boolean,
        default: true
      },
      // 滚动周期
      duration: {
        type: Number,
        default: 2000
      }
    },
    computed: {
      fontStyle() {
        return (type) => {
          let style = {}
          style.color = this.fontColorStyle ? this.fontColorStyle : ''
          style.fontSize = this.fontSizeStyle ? this.fontSizeStyle : ''
          if (type === 'leftIcon' && this.leftIconSize) {
            style.fontSize = this.leftIconSize + 'rpx'
          }
          if (type === 'rightIcon' && this.rightIconSize) {
            style.fontSize = this.rightIconSize + 'rpx'
          }
          if (type === 'close') {
            style.fontSize = '24rpx'
          }
          
          return style
        }
      },
      noticeStyle() {
        let style = {}
        style.backgroundColor = this.backgroundColorStyle ? this.backgroundColorStyle : 'transparent'
        if (this.padding) style.padding = this.padding
        return style
      },
      swiperStyle() {
        let style = {}
        style.height = this.fontSize ? this.fontSize + 6 + this.fontUnit : '32rpx'
        style.lineHeight = style.height
        
        return style
      },
      // 标记是否为垂直
      vertical() {
        if (this.mode === 'horizontal') return false
        else return true
      }
    },
    data() {
      return {
        
      }
    },
    watch: {
      
    },
    methods: {
      // 点击了通知栏
      click(index) {
        this.$emit('click', index)
      },
      // 点击了关闭按钮
      close() {
        this.$emit('close')
      },
      // 点击了左边图标
      clickLeftIcon() {
        this.$emit('clickLeft')
      },
      // 点击了右边图标
      clickRightIcon() {
        this.$emit('clickRight')
      },
      // 切换消息时间
      change(event) {
        let index = event.detail.current
        if (index === this.list.length - 1) {
          this.$emit('end')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-column-notice {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    overflow: hidden;
    
    &__swiper {
      height: auto;
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 12rpx;
      
      &--item {
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow: hidden;
      }
      
      &--content {
        overflow: hidden;
      }
    }
    
    &__icon {
      &--left {
        display: inline-flex;
        align-items: center;
      }
      
      &--right {
        margin-left: 12rpx;
        display: inline-flex;
        align-items: center;
      }
    }
  }
</style>
