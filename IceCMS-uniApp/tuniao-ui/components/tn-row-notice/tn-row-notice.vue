<template>
  <view
    v-if="show"
    class="tn-row-notice-class tn-row-notice"
    :class="[backgroundColorClass]"
    :style="[noticeStyle]"
  >
    <view class="tn-row-notice__wrap">
      <!-- 左图标 -->
      <view class="tn-row-notice__icon">
        <view
          v-if="leftIcon"
          class="tn-row-notice__icon--left" 
          :class="[`tn-icon-${leftIconName}`,fontColorClass]"
          :style="[fontStyle('leftIcon')]"
          @tap="clickLeftIcon"></view>
      </view>
      
      <!-- 消息体 -->
      <view class="tn-row-notice__content-box" id="tn-row-notice__content-box">
        <view
          class="tn-row-notice__content"
          id="tn-row-notice__content"
          :style="{
            animationDuration: animationDuration,
            animationPlayState: animationPlayState
          }"
        >
          <text
            class="tn-row-notice__content--text"
            :class="[fontColorClass]"
            :style="[fontStyle()]"
            @tap="click"
          >{{ showText }}</text>
        </view>
      </view>
      
      <!-- 右图标 -->
      <view class="tn-row-notice__icon">
        <view
          v-if="rightIcon"
          class="tn-row-notice__icon--right" 
          :class="[`tn-icon-${rightIconName}`,fontColorClass]"
          :style="[fontStyle('rightIcon')]"
          @tap="clickRightIcon"></view>
        <view
          v-if="closeBtn"
          class="tn-row-notice__icon--right" 
          :class="[`tn-icon-close`,fontColorClass]"
          :style="[fontStyle('close')]"
          @tap="close"></view>
      </view>
    </view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-row-notice',
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
      // 水平滚动时的速度，即每秒滚动多少rpx
      speed: {
        type: Number,
        default: 160
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
      }
    },
    data() {
      return {
        // 滚动文字的宽度
        textWidth: 0,
        // 存放滚动文字的盒子的宽度
        textBoxWidth: 0,
        // 动画执行的时间
        animationDuration: '10s',
        // 动画执行状态
        animationPlayState: 'paused',
        // 当前显示的文本
        showText: ''
      }
    },
    watch: {
      list: {
        handler(value) {
          this.showText = value.join('，')
          this.$nextTick(() => {
            this.initNotice()
          })
        },
        immediate: true
      },
      playStatus(value) {
        if (value === 'play') this.animationPlayState = 'running'
        else this.animationPlayState = 'paused'
      },
      speed(value) {
        this.initNotice()
      }
    },
    methods: {
      // 初始化通知栏
      initNotice() {
        let query = [],
          textBoxWidth = 0,
          textWidth = 0;
        let textQuery = new Promise((resolve, reject) => {
          uni.createSelectorQuery()
            .in(this)
            .select(`#tn-row-notice__content`)
            .boundingClientRect()
            .exec(ret => {
              this.textWidth = ret[0].width
              resolve()
            })
        })
        query.push(textQuery)
        
        Promise.all(query).then(() => {
          // 根据t=s/v(时间=路程/速度)，这里为何不需要加上#tn-row-notice__content-box的宽度，因为设置了.tn-row-notice__content样式中设置了padding-left: 100%
          this.animationDuration = `${this.textWidth / uni.upx2px(this.speed)}s`
          // 这里必须这样开始动画，否则在APP上动画速度不会改变(HX版本2.4.6，IOS13)
          this.animationPlayState = 'paused'
          setTimeout(() => {
            if (this.autoplay && this.playStatus === 'play') this.animationPlayState = 'running'
          }, 10)
        })
      },
      // 点击了通知栏
      click() {
        this.$emit('click')
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-row-notice {
    width: 100%;
    overflow: hidden;
    
    &__wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    
    &__content {
      &-box {
        flex: 1;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        margin-left: 12rpx;
      }
      
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      text-align: right;
      // 为了能滚动起来
      padding-left: 100%;
      animation: tn-notice-loop-animation 10s linear infinite both;
      
      &--text {
        word-break: keep-all;
        white-space: nowrap;
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
  
  @keyframes tn-notice-loop-animation {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
