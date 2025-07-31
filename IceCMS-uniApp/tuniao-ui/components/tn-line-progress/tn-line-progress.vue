<template>
  <view
    class="tn-line-progress-class tn-line-progress"
    :style="[progressStyle]"
  >
    <view
      class="tn-line-progress--active"
      :class="[
        $t.color.getBackgroundColorInternalClass(activeColor),
        striped ? stripedAnimation ? 'tn-line-progress__striped tn-line-progress__striped--active' : 'tn-line-progress__striped' : '',
      ]"
      :style="[progressActiveStyle]"
    >
      <slot v-if="$slots.default || $slots.$default"></slot>
      <block v-else-if="showPercent">{{ percent + '%' }}</block>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-line-progress',
    props: {
      // 进度（百分比）
      percent: {
        type: Number,
        default: 0,
        validator: val => {
          return val >= 0 && val <= 100
        }
      },
      // 高度
      height: {
        type: Number,
        default: 0
      },
      // 是否显示为圆角
      round: {
        type: Boolean,
        default: true
      },
      // 是否显示条纹
      striped: {
        type: Boolean,
        default: false
      },
      // 条纹是否运动
      stripedAnimation: {
        type: Boolean,
        default: true
      },
      // 激活部分颜色
      activeColor: {
        type: String,
        default: ''
      },
      // 非激活部分颜色
      inactiveColor: {
        type: String,
        default: ''
      },
      // 是否显示进度条内部百分比值
      showPercent: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      progressStyle() {
        let style = {}
        style.borderRadius = this.round ? '100rpx' : 0
        if (this.height) {
          style.height = this.$t.string.getLengthUnitValue(this.height)
        }
        if (this.inactiveColor) {
          style.backgroundColor = this.inactiveColor
        }
        return style
      },
      progressActiveStyle() {
        let style = {}
        style.width = this.percent + '%'
        if (this.$t.color.getBackgroundColorStyle(this.activeColor)) {
          style.backgroundColor = this.$t.color.getBackgroundColorStyle(this.activeColor)
        }
        return style
      }
    },
    data() {
      return {
        
      }
    },
    
  }
</script>

<style lang="scss" scoped>
  
  .tn-line-progress {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    align-items: center;
    width: 100%;
    height: 28rpx;
    overflow: hidden;
    border-radius: 100rpx;
    background-color: $tn-progress-bg-color;
    
    &--active {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-items: flex-end;
      justify-content: space-around;
      width: 0;
      height: 100%;
      font-size: 20rpx;
      color: #FFFFFF;
      background-color: $tn-main-color;
      transition: all 0.3s ease;
    }
    
    &__striped {
      background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
      background-size: 80rpx 80rpx;
      
      &--active {
        animation: progress-striped 2s linear infinite;
      }
    }
  }
  
  @keyframes progress-striped {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 80rpx 0;
    }
  }
</style>
