<template>
  <view class="tn-verification-code-class tn-verification-code">
    <view class="tn-code__container">
      <input class="tn-code__input" :disabled="disabledKeyboard" :value="valueModel" type="number" :focus="focus" :maxlength="maxLength" @input="getValue" />
      <view v-for="(item, index) in loopCharArr" :key="index">
        <view
          class="tn-code__item"
          :class="[{
            'tn-code__item--breathe': breathe && charArrLength === index,
            'tn-code__item__box': mode === 'box',
            'tn-code__item__box--active': mode === 'box' && charArrLength === index
          }]"
          :style="[itemStyle(index)]"
        >
          <view
            v-if="mode !== 'middleLine'"
            class="tn-code__item__line tn-code__item__line--placeholder"
            :style="[placeholderLineStyle(index)]"
          ></view>
          <view
            v-if="mode === 'middleLine' && charArrLength <= index"
            class="tn-code__item__line tn-code__item__line--middle"
            :class="[{
              'tn-code__item__line--bold': bold,
              'tn-code__item--breathe': breathe && charArrLength === index,
              'tn-code__item__line--active': charArrLength === index
            }]"
            :style="[lineStyle(index)]"
          ></view>
          <view
            v-if="mode === 'bottomLine'"
            class="tn-code__item__line tn-code__item__line--bottom"
            :class="[{
              'tn-code__item__line--bold': bold,
              'tn-code__item--breathe': breathe && charArrLength === index,
              'tn-code__item__line--active': charArrLength === index
            }]"
            :style="[lineStyle(index)]"
          ></view>
          <block v-if="!dotFill">
            <text>{{ charArr[index] ? charArr[index] : '' }}</text>
          </block>
          <block v-else>
            <text class="tn-code__item__dot">{{ charArr[index] ? '●' : '' }}</text>
          </block>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-verification-code',
    props: {
      // 验证码的值
      value: {
        type: [String, Number],
        default: ''
      },
      // 最大输入长度
      maxLength: {
        type: Number,
        default: 4
      },
      // 显示模式
      // box -> 盒子 bottomLine -> 底部横线 middleLine -> 中间横线
      mode: {
        type: String,
        default: 'box'
      },
      // 用圆点填充空白位置
      dotFill: {
        type: Boolean,
        default: false
      },
      // 字体加粗
      bold: {
        type: Boolean,
        default: false
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: ''
      },
      // 激活时颜色
      activeColor: {
        type: String,
        default: ''
      },
      // 未激活时颜色
      inactiveColor: {
        type: String,
        default: ''
      },
      // 输入框宽度，单位rpx
      inputWidth: {
        type: Number,
        default: 80
      },
      // 当前激活的item带呼吸效果
      breathe: {
        type: Boolean,
        default: true
      },
      // 自动获取焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 隐藏原生键盘，当使用自定义键盘的时候设置该参数未true即可
      disabledKeyboard: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      // 拆分要显示的字符
      charArr() {
        return this.valueModel.split('')
      },
      // 当前输入字符的长度
      charArrLength() {
        return this.charArr.length
      },
      // 输入框的个数
      loopCharArr() {
        return new Array(this.maxLength)
      },
      itemStyle() {
        return (index) => {
          let style = {}
          style.fontWeight = this.bold ? 'bold' : 'normal'
          if (this.fontSize) {
            style.fontSize = this.fontSize + 'rpx'
          }
          if (this.inputWidth) {
            style.width = this.inputWidth + 'rpx'
            style.height = this.inputWidth + 'rpx'
            style.lineHeight = this.inputWidth + 'rpx'
          }
          if (this.inactiveColor) {
            style.color = this.inactiveColor
            style.borderColor = this.inactiveColor
          }
          if (this.mode === 'box' && this.charArrLength === index) {
            style.borderColor = this.activeColor
          }
          return style
        }
      },
      placeholderLineStyle() {
        return (index) => {
          let style = {}
          style.display = this.charArrLength === index ? 'block' : 'none'
          if (this.inputWidth) {
            style.height = (this.inputWidth * 0.5) + 'rpx'
          }
          return style
        }
      },
      lineStyle() {
        return (index) => {
          let style = {}
          if (this.inactiveColor) {
            style.backgroundColor = this.inactiveColor
          }
          if (this.charArrLength === index && this.activeColor) {
            style.backgroundColor = this.activeColor
          }
          return style
        }
      }
    },
    watch: {
      value: {
        handler(val) {
          // 转换为字符串
          val = String(val)
          // 截掉超出的部分
          this.valueModel = val.substring(0, this.maxLength)
        },
        immediate: true
      }
    },
    data() {
      return {
        valueModel: ''
      }
    },
    methods: {
      // 获取填写的值
      getValue(e) {
        const {
          value
        } = e.detail
        this.valueModel = value
        // 判断输入的长度是否超出了maxlength的值
        if (String(value).length > this.maxLength) return
        // 未达到maxlength之前，触发change事件，否则触发finish事件
        this.$emit('change', value)
        this.$emit('input', value)
        if (String(value).length == this.maxLength) {
          this.$emit('finish', value)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-verification-code {
    text-align: center;
    
    .tn-code {
      &__container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        position: relative;
      }
      
      &__input {
        position: absolute;
        top: 0;
        left: -100%;
        width: 200%;
        height: 100%;
        text-align: left;
        z-index: 9;
        opacity: 0;
        background: none;
      }
      
      &__item {
        position: relative;
        width: 80rpx;
        height: 80rpx;
        line-height: 80rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 10rpx 10rpx;
        font-size: 60rpx;
        font-weight: bold;
        color: #838383;
        
        &--breathe {
          animation: breathe 2s infinite ease;
        }
        
        &__box {
          border: 2rpx solid #AAAAAA;
          border-radius: 6rpx;
          
          &--active {
            animation-timing-function: ease-in-out;
            animation-duration: 1500ms;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            overflow: hidden;
            border: 2rpx solid #01BEFF;
          }
        }
        
        &__line {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #AAAAAA;
          
          &--bold {
            height: 4px !important;
          }
          
          &--placeholder {
            display: none;
            width: 2rpx;
            height: 40rpx;
          }
          
          &--middle, &--bottom {
            width: 80%;
            height: 2px;
            border-radius: 2px;
          }
          &--bottom {
            top: auto !important;
            bottom: 0;
            transform: translateX(-50%) !important;
          }
          
          &--active {
            background-color: #01BEFF !important;
          }
        }
        
        &__dot {
          font-size: 34rpx;
          line-height: 34rpx;
        }
      }
    }
  }
  
  @keyframes breathe {
    0% {
      opacity: 0.3;
    }
    
    50% {
      opacity: 1;
    }
    
    100% {
      opacity: 0.3;
    }
  }
</style>
