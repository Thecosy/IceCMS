<template>
  <view class="tn-number-box-class tn-number-box">
    <!-- 减 -->
    <view
      class="tn-number-box__btn__minus"
      :class="[
        backgroundColorClass,
        fontColorClass,
        {'tn-number-box__btn--disabled': disabled || inputValue <= min}
      ]"
      :style="{
        backgroundColor: backgroundColorStyle,
        height: $t.string.getLengthUnitValue(inputHeight),
        color: fontColorStyle,
        fontSize: fontSizeStyle
      }"
      @touchstart.stop.prevent="touchStart('minus')"
      @touchend.stop.prevent="clearTimer"
    >
      <view class="tn-icon-reduce"></view>
    </view>
    
    <!-- 输入框 -->
    <input
      v-model="inputValue"
      :disabled="disabledInput || disabled"
      :cursor-spacing="getCursorSpacing"
      class="tn-number-box__input"
      :class="[
        fontColorClass,
        {'tn-number-box__input--disabled': disabledInput || disabled}
      ]"
      :style="{
        width: $t.string.getLengthUnitValue(inputWidth),
        height: $t.string.getLengthUnitValue(inputHeight),
        color: fontColorStyle,
        fontSize: fontSizeStyle,
        backgroundColor: backgroundColorStyle
      }"
      @blur="blurInput"
      @focus="focusInput"
    />
    
    <!-- 加 -->
    <view
      class="tn-number-box__btn__plus"
      :class="[
        backgroundColorClass,
        fontColorClass,
        {'tn-number-box__btn--disabled': disabled || inputValue >= max}
      ]"
      :style="{
        backgroundColor: backgroundColorStyle,
        height: $t.string.getLengthUnitValue(inputHeight),
        color: fontColorStyle,
        fontSize: fontSizeStyle
      }"
      @touchstart.stop.prevent="touchStart('plus')"
      @touchend.stop.prevent="clearTimer"
    >
      <view class="tn-icon-add"></view>
    </view>
  </view>
</template>

<script>
  import componentsColor from '../../libs/mixin/components_color.js'
  
  export default {
    mixins: [componentsColor],
    name: 'tn-number-box',
    props: {
      value: {
        type: Number,
        default: 1
      },
      // 索引
      index: {
        type: [Number, String],
        default: ''
      },
      // 最小值
      min: {
        type: Number,
        default: 0
      },
      // 最大值
      max: {
        type: Number,
        default: 99999
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
      // 是否禁用输入
      disabledInput: {
        type: Boolean,
        default: false
      },
      // 输入框的宽度
      inputWidth: {
        type: Number,
        default: 88
      },
      // 输入框的高度
      inputHeight: {
        type: Number,
        default: 50
      },
      // 输入框和键盘之间的距离
      cursorSpacing: {
        type: Number,
        default: 100
      },
      // 是否开启长按进行连续递增减
      longPress: {
        type: Boolean,
        default: true
      },
      // 长按触发间隔
      longPressTime: {
        type: Number,
        default: 250
      },
      // 是否只能输入正整数
      positiveInteger: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      getCursorSpacing() {
        return Number(uni.upx2px(this.cursorSpacing))
      }
    },
    data() {
      return {
        // 输入框的值
        inputValue: 1,
        // 长按定时器
        longPressTimer: null,
        // 标记值的改变是来自外部还是内部
        changeFromInner: false,
        // 内部定时器
        innerChangeTimer: null
      }
    },
    watch: {
      value(val) {
        // 只有value的改变是来自外部的时候，才去同步inputValue的值，否则会造成循环错误
        if (!this.changeFromInner) {
          this.updateInputValue()
          // 因为inputValue变化后，会触发this.handleChange()，在其中changeFromInner会再次被设置为true，
          // 造成外面修改值，也导致被认为是内部修改的混乱，这里进行this.$nextTick延时，保证在运行周期的最后处
          // 将changeFromInner设置为false
          this.$nextTick(() => {
          	this.changeFromInner = false
          })
        }
      },
      inputValue(newVal, oldVal) {
        // 为了让用户能够删除所有输入值，重新输入内容，删除所有值后，内容为空字符串
        if (newVal === '') return
        let value = 0
        // 首先判断是否数值，并且在min和max之间，如果不是，使用原来值
        let isNumber = this.$t.test.number(newVal)
        if (isNumber && newVal >= this.min && newVal <= this.max) value = newVal
        else value = oldVal
        
        // 判断是否只能输入大于等于0的整数
        if (this.positiveInteger) {
          // 小于0或者带有小数点
          if (newVal < 0 || String(newVal).indexOf('.') !== -1) {
            value = Math.floor(newVal)
            // 双向绑定input的值，必须要使用$nextTick修改显示的值
            this.$nextTick(() => {
            	this.inputValue = value
            })
          }
        }
        this.handleChange(value, 'change')
      },
      min() {
        this.updateInputValue()
      },
      max() {
        this.updateInputValue()
      }
    },
    created() {
      this.updateInputValue()
    },
    methods: {
      // 开始点击按钮
      touchStart(func) {
        // 先执行一遍方法，否则会造成松开手时，就执行了clearTimer，导致无法实现功能
        this[func]()
        // 如果没有开启长按功能，直接返回
        if (!this.longPress) return
        // 清空长按定时器，防止重复注册
        if (this.longPressTimer) {
          clearInterval(this.longPressTimer)
          this.longPressTimer = null
        }
        this.longPressTimer = setInterval(() => {
          // 执行加减操作
          this[func]()
        }, this.longPressTime)
      },
      // 清除定时器
      clearTimer() {
        this.$nextTick(() => {
          if (this.longPressTimer) {
            clearInterval(this.longPressTimer)
            this.longPressTimer = null
          }
        })
      },
      // 减
      minus() {
        this.computeValue('minus')
      },
      // 加
      plus() {
        this.computeValue('plus')
      },
      // 处理小数相加减出现溢出问题
      calcPlus(num1, num2) {
        let baseNum = 0, baseNum1 = 0, baseNum2 = 0
        try {
          baseNum1 = num1.toString().split('.')[1].length
        } catch(e) {
          baseNum1 = 0
        }
        try {
          baseNum2 = num2.toString().split('.')[1].length
        } catch(e) {
          baseNum2 = 0
        }
        
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
        // 精度
        let precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2
        return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(precision)
      },
      calcMinus(num1, num2) {
        let baseNum = 0, baseNum1 = 0, baseNum2 = 0
        try {
          baseNum1 = num1.toString().split('.')[1].length
        } catch(e) {
          baseNum1 = 0
        }
        try {
          baseNum2 = num2.toString().split('.')[1].length
        } catch(e) {
          baseNum2 = 0
        }
        
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
        // 精度
        let precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2
        return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
      },
      // 处理操作后的值
      computeValue(type) {
        uni.hideKeyboard()
        if (this.disabled) return
        let value = 0
        
        if (type === 'minus') {
          // 减
          value = this.calcMinus(this.inputValue, this.step)
        } else if (type === 'plus') {
          // 加
          value = this.calcPlus(this.inputValue, this.step)
        }
        // 判断是否比最小值小和操作最大值
        if (value < this.min || value > this.max) return
        
        this.inputValue = value
        this.handleChange(value, type)
      },
      // 处理用户手动输入
      blurInput(event) {
        let val = 0,
            value = event.detail.value
        // 如果为非0-9数字组成，或者其第一位数值为0，直接让其等于min值
        // 这里不直接判断是否正整数，是因为用户传递的props min值可能为0
        if (!/(^\d+$)/.test(value) || value[0] == 0) {
          val = this.min
        } else {
          val = +value
        }
        
        if (val > this.max) {
          val = this.max
        } else if (val < this.min) {
          val = this.min
        }
        this.$nextTick(() => {
          this.inputValue = val
        })
        this.handleChange(val, 'blur')
      },
      // 获取焦点
      focusInput() {
        this.$emit('focus')
      },
      // 初始化inputValue
      updateInputValue() {
        let value = this.value
        if (value <= this.min) {
          value = this.min
        } else if (value >= this.max) {
          value = this.max
        }
        
        this.inputValue = Number(value)
      },
      // 处理值改变状态
      handleChange(value, type) {
        if (this.disabled) return
        // 清除定时器，防止混乱
        if (this.innerChangeTimer) {
          clearTimeout(this.innerChangeTimer)
          this.innerChangeTimer = null
        }
        
        // 内部修改值
        this.changeFromInner = true
        // 一定时间内，清除changeFromInner标记，否则内部值改变后
        // 外部通过程序修改value值，将会无效
        this.innerChangeTimer = setTimeout(() => {
          this.changeFromInner = false
        }, 150)
        this.$emit('input', Number(value))
        this.$emit(type, {
          value: Number(value),
          index: this.index
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-number-box {
    display: inline-flex;
    align-items: center;
    
    &__btn {
      &__plus,&__minus {
        width: 60rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: $tn-font-holder-color;
      }
      
      &__plus {
        border-radius: 0 8rpx 8rpx 0;
      }
      
      &__minus {
        border-radius: 8rpx 0 0 8rpx;
      }
      
      &--disabled {
        color: $tn-font-sub-color !important;
        background: $tn-font-holder-color !important;
      }
    }
    
    &__input {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: relative;
      text-align: center;
      box-sizing: border-box;
      padding: 0 4rpx;
      margin: 0 6rpx;
      background-color: $tn-font-holder-color;
      
      &--disabled {
        color: $tn-font-sub-color !important;
        background: $tn-font-holder-color !important;
      }
    }
  }
</style>
