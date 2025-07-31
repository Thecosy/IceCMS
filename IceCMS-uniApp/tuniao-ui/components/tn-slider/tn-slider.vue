<template>
  <view
    class="tn-slider-class tn-slider"
    :class="{'tn-slider--disabled': disabled}"
    :style="{
      backgroundColor: inactiveColor
    }"
    @tap="click"
  >
    <!-- slider滑动线 -->
    <view
      class="tn-slider__gap"
      :style="[
        barStyle,
        {
          height: this.$t.string.getLengthUnitValue(lineHeight),
          backgroundColor: activeColor
        }
      ]"
    >
      <!-- slider滑块 -->
      <view
        class="tn-slider__button-wrap"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @touchcancel="touchEnd"
      >
        <view v-if="$slots.default || $slots.$default">
          <slot></slot>
        </view>
        <view
          v-else
          class="tn-slider__button"
          :style="[blockStyle, {
            height: this.$t.string.getLengthUnitValue(blockWidth),
            width: this.$t.string.getLengthUnitValue(blockWidth),
            backgroundColor: blockColor
          }]"
        ></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-slider',
    props: {
      // 进度值
      value: {
        type: [Number, String],
        default: 0
      },
      // 最小值
      min: {
        type: Number,
        default: 0
      },
      // 最大值
      max: {
        type: Number,
        default: 100
      },
      // 步进值
      step: {
        type: Number,
        default: 1
      },
      // 禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 滑块宽度
      blockWidth: {
        type: Number,
        default: 30
      },
      // 滑动条高度
      lineHeight: {
        type: Number,
        default: 8
      },
      // 滑动条激活的颜色
      activeColor: {
        type: String,
        default: '#01BEFF'
      },
      // 滑动条未被激活的颜色
      inactiveColor: {
        type: String,
        default: '#E6E6E6'
      },
      // 滑块的颜色
      blockColor: {
        type: String,
        default: '#FFFFFF'
      },
      // 自定义滑块的样式
      blockStyle: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        startX: 0,
        status: 'end',
        newValue: 0,
        distanceX: 0,
        startValue: 0,
        barStyle: {},
        sliderRect: {
          left: 0,
          width: 0
        }
      }
    },
    watch: {
      value(val) {
        // 只有在非滑动状态时，才可以通过value更新滑块值，这里监听，是为了让用户触发
        if (this.status === 'end') this.updateValue(val, false)
      }
    },
    created() {
      this.updateValue(this.value, false)
    },
    mounted() {
      this._tGetRect('.tn-slider').then(res => {
        this.sliderRect = res
      })
    },
    methods: {
      // 开始滑动
      touchStart(event) {
        if (this.disabled) return
        if (!event.changedTouches[0]) return
        
        this.startX = 0
        // 触摸点
        this.startX = event.changedTouches[0].pageX
        this.startValue = this.format(this.value)
        
        // 标识当前开始触摸
        this.status = 'start'
      },
      // 滑动移动中
      touchMove(event) {
        if (this.disabled) return
        if (!event.changedTouches[0]) return
        
        // 连续触摸的过程会一直触发本方法，但只有手指触发且移动了才被认为是拖动了，才发出事件
        // 触摸后第一次移动已经将status设置为moving状态，故触摸第二次移动不会触发本事件
        if (this.status === 'start') this.$emit('start')
        let movePageX = event.changedTouches[0].pageX
        // 滑块的左边不一定跟屏幕左边接壤，所以需要减去最外层父元素的左边值
        this.distanceX = movePageX - this.sliderRect.left
        // 获得移动距离对整个滑块的百分比值，此为带有多位小数的值，不能用此更新视图
        // 否则造成通信阻塞，需要每改变一个step值时修改一次视图
        this.newValue = ((this.distanceX / this.sliderRect.width) * (this.max - this.min)) + this.min
        this.status = 'moving'
        this.$emit('moving')
        
        this.updateValue(this.newValue, true)
      },
      // 滑动结束
      touchEnd() {
        if(this.disabled) return
        if (this.status === 'moving') {
          this.updateValue(this.newValue, false)
          this.$emit('end')
        }
        this.status = 'end'
      },
      // 更新数值
      updateValue(value, drag) {
        // 去掉小数部分，对step进行步进处理
        value = this.format(value)
        const width = Math.round((value - this.min) / (this.max - this.min) * 100)
        // 不允许滑动的距离小于0和超过100
        if (width < 0 || width > 100) return
        // 设置移动的百分比
        let barStyle = {
          width: width + '%'
        }
        // 移动期间取消动画
        if (drag === true) {
          barStyle.transition = 'none'
        } else {
          // 非移动期间，删掉对过渡为空的声明，让css中的声明起效
          delete barStyle.transition
        }
        
        // 修改value值
        this.$emit('input', value)
        this.barStyle = barStyle
      },
      // 点击事件
      click(event) {
        if (this.disabled) return
        // 直接点击的情况，计算方式和touchMove方法一致
        const value = (((event.detail.x - this.sliderRect.left) / this.sliderRect.width) * (this.max - this.min)) + this.min
        this.updateValue(value, false)
      },
      // 格式化滑动的值
      format(value) {
        return Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-slider {
    width: 100%;
    position: relative;
    border-radius: 1000rpx;
    // 增加点击的范围
    border-width: 20rpx;
    border-style: solid;
    border-color: transparent;
    background-color: $tn-font-holder-color;
    background-clip: content-box;
    
    &__gap {
      position: relative;
      border-radius: inherit;
      transition: width 0.2s;
      background-color: #01BEFF;
    }
    
    &__button {
      width: 30rpx;
      height: 30rpx;
      border-radius: 50%;
      box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.6);
      background-color: #FFFFFF;
      cursor: pointer;
      
      &-wrap {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate3d(50%, -50%, 0);
      }
    }
    
    &--disabled {
      opacity: 0.6;
    }
  }
</style>
