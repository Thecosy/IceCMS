<template>
  <view
    class="tn-switch-class tn-switch"
    :class="[
      value ? 'tn-switch--on' : '',
      disabled ? 'tn-switch--disabled' : '',
      `tn-switch--${shape}`
    ]"
    :style="[switchStyle]"
    @tap="click"
  >
    <view
      class="tn-switch__node"
      :class="[`tn-switch__node--${shape}`]"
      :style="[switchNodeStyle]"
    >
      <tn-loading class="tn-switch__node__loading" :show="loading" mode="flower" :size="size * 0.6" :color="loadingColor"></tn-loading>
    </view>
    <!-- 左图标 -->
    <view
      v-if="leftIcon !== ''"
      class="tn-switch__icon tn-switch__icon--left"
      :class="[
        `tn-icon-${leftIcon}`,
        value ? 'tn-switch__icon--show' : ''
      ]"
      :style="[iconStyle]"></view>
    <!-- 右图标 -->
    <view 
      v-if="rightIcon !== ''"
      class="tn-switch__icon tn-switch__icon--right"
      :class="[
        `tn-icon-${rightIcon}`,
        !value ? 'tn-switch__icon--show' : ''
      ]"
      :style="[iconStyle]"></view>
  </view>
</template>

<script>
  export default {
    name: 'tn-switch',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      // 按钮的样式
      // circle 圆角 square 方形
      shape: {
        type: String,
        default: 'circle'
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 尺寸
      size: {
        type: Number,
        default: 50
      },
      // 打开时的背景颜色
      activeColor: {
        type: String,
        default: ''
      },
      // 关闭时的背景颜色
      inactiveColor: {
        type: String,
        default: ''
      },
      // 激活时的值
      activeValue: {
        type: [Number, String, Boolean],
        default: true
      },
      // 关闭时的值
      inactiveValue: {
        type: [Number, String, Boolean],
        default: false
      },
      // 左图标
      leftIcon: {
        type: String,
        default: ''
      },
      // 右图标
      rightIcon: {
        type: String,
        default: ''
      },
      // 是否为加载状态
      loading: {
        type: Boolean,
        default: false
      },
      // 点击手机是否震动
      vibrateShort: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      switchStyle() {
        let style = {}
        style.fontSize = this.$t.string.getLengthUnitValue(this.size)
        style.backgroundColor = this.value ? 
          this.activeColor ? this.activeColor : '#01BEFF' : 
          this.inactiveColor ? this.inactiveColor : '#AAAAAA'
        return style
      },
      switchNodeStyle() {
        let style = {}
        style.width = this.$t.string.getLengthUnitValue(this.size)
        style.height = style.width
        return style
      },
      iconStyle() {
        let style = {}
        style.fontSize = this.$t.string.getLengthUnitValue(this.size - 20)
        style.lineHeight = this.$t.string.getLengthUnitValue(this.size)
        return style
      },
      loadingColor() {
        return this.value ? this.activeColor : ''
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      click() {
        if (!this.disabled && !this.loading) {
          if (this.vibrateShort) uni.vibrateShort()
          this.$emit('input', !this.value)
          // 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
          this.$nextTick(() => {
          	this.$emit('change', this.value ? this.activeValue : this.inactiveValue);
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-switch {
    /* #ifndef APP-NVUE */
    display: inline-block;
    /* #endif */
    position: relative;
    box-sizing: initial;
    width: 2em;
    height: 1em;
    font-size: 50rpx;
    background-color: #AAAAAA;
    transition: background-color 0.3s;
    
    &__node {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      background-color: #FFFFFF;
      transform: scale(0.9);
      box-shadow: 0 6rpx 2rpx 0 rgba(0, 0, 0, 0.05), 0 4rpx 4rpx 0 rgba(0, 0, 0, 0.1), 0 6rpx 6rpx 0 rgba(0, 0, 0, 0.05);
      transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
      -webkit-transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
      
      &__loading {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      
      &--circle {
        border-radius: 100%;
      }
      
      &--square {
        border-radius: 15%;
      }
    }
    
    &__icon {
      color: #FFFFFF;
      font-size: 30rpx;
      line-height: 50rpx;
      height: 100%;
      vertical-align: middle;
      position: absolute;
      transform: scale(0);
      transform-origin: 50% 50%;
      transition: transform 0.3s ease-in-out;
      
      &--left {
        top: 0;
        left: 10rpx;
      }
      
      &--right {
        top: 0;
        right: 10rpx;
      }
      
      &--show {
        transform: scale(1);
      }
    }
    
    &--circle {
      border-radius: 1em;
    }
    
    &--square {
      border-radius: 0.1em;
    }
    
    &--on {
      background-color: $tn-main-color;
      
      .tn-switch__node {
        transform: translateX(100%) scale(0.9);
      }
    }
    
    &--disabled {
      opacity: 0.4;
    }
  }
</style>
