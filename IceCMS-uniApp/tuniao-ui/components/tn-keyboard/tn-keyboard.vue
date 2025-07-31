<template>
  <view v-if="value" class="tn-keyboard-class tn-keyboard">
    <tn-popup
      v-model="value"
      mode="bottom"
      :popup="false"
      length="auto"
      :mask="mask"
      :maskCloseable="maskCloseable"
      :safeAreaInsetBottom="safeAreaInsetBottom"
      :zIndex="elZIndex"
      @close="popupClose"
    >
      <view>
        <slot></slot>
      </view>
      
      <!-- 提示信息 -->
      <view v-if="tooltip" class="tn-keyboard__tooltip">
        <view
          v-if="cancelBtn"
          class="tn-keyboard__tooltip__item tn-keyboard__tooltip__cancel"
          hover-class="tn-keyboard__tooltip__cancel--hover"
          :hover-stay-time="150"
          @tap="onCancel"
        >
          {{ cancelBtn ? cancelText : ''}}
        </view>
        <view v-if="showTips" class="tn-keyboard__tooltip__item tn-keyboard__tooltip__tips">
          {{ tips ? tips : mode === 'number' ? '数字键盘' : mode === 'card' ? '身份证键盘' : '车牌号码键盘'}}
        </view>
        <view
          v-if="confirmBtn"
          class="tn-keyboard__tooltip__item tn-keyboard__tooltip__confirm"
          hover-class="tn-keybord__tooltip__confirm--hover"
          :hover-stay-time="150"
          @tap="onConfirm"
        >
          {{ confirmBtn ? confirmText : ''}}
        </view>
      </view>
      
      <!-- 键盘内容 -->
      <block v-if="mode === 'number' || mode === 'card'">
        <tn-number-keyboard :mode="mode" :dotEnabled="dotEnabled" :randomEnabled="randomEnabled" @change="change" @backspace="backspaceClick"></tn-number-keyboard>
      </block>
      <block v-if="mode === 'car'">
        <tn-car-keyboard :randomEnabled="randomEnabled" :switchEnMode="switchEnMode" @change="change" @backspace="backspaceClick"></tn-car-keyboard>
      </block>
    </tn-popup>
  </view>
</template>

<script>
  export default {
    name: 'tn-keyboard',
    props: {
      // 控制键盘弹出收回
      value: {
        type: Boolean,
        default: false
      },
      // 键盘类型
      // number - 数字键盘 card - 身份证键盘 car - 车牌号码
      mode: {
        type: String,
        default: 'number'
      },
      // 当mode = number时，是否显示'.'符号
      dotEnabled: {
        type: Boolean,
        default: true
      },
      // 是否打乱顺序
      randomEnabled: {
        type: Boolean,
        default: false
      },
      // 当mode = car，设置键盘中英文状态
      switchEnMode: {
        type: Boolean,
        default: false
      },
      // 显示顶部工具条
      tooltip: {
        type: Boolean,
        default: true
      },
      // 是否显示提示信息
      showTips: {
        type: Boolean,
        default: true
      },
      // 提示文字
      tips: {
        type: String,
        default: ''
      },
      // 是否显示取消按钮
      cancelBtn: {
        type: Boolean,
        default: true
      },
      // 是否显示确认按钮
      confirmBtn: {
        type: Boolean,
        default: true
      },
      // 取消按钮文字
      cancelText: {
        type: String,
        default: '取消'
      },
      // 确认按钮文字
      confirmText: {
        type: String,
        default: '确认'
      },
      // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
      	type: Boolean,
      	default: false
      },
      // 是否可以通过点击遮罩进行关闭
      maskCloseable: {
      	type: Boolean,
      	default: true
      },
      // 是否显示遮罩
      mask: {
        type: Boolean,
        default: true
      },
      // z-index
      zIndex: {
        type: Number,
        default: 0
      }
    },
    computed: {
      elZIndex() {
        return this.zIndex ? this.zIndex : this.$t.zIndex.popup
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      change(e) {
        this.$emit('change', e)
      },
      // 关闭键盘
      popupClose() {
        // 修改value的值
        this.$emit('input', false)
      },
      // 输入完成
      onConfirm() {
        this.popupClose()
        this.$emit('confirm')
      },
      // 输入取消
      onCancel() {
        this.popupClose()
        this.$emit('cancel')
      },
      // 点击退格
      backspaceClick() {
        this.$emit('backspace')
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-keyboard {
    position: relative;
    
    &__tooltip {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      
      &__item {
        color: $tn-font-color;
        flex: 0 0 33.3333333333%;
        text-align: center;
        font-size: 28rpx;
        padding: 20rpx 10rpx;
      }
      
      &__cancel {
        text-align: left;
        flex-grow: 1;
        flex-wrap: 0;
        padding-left: 40rpx;
        color: $tn-content-color;
        
        &--hover {
          color: $tn-font-color;
        }
      }
      
      &__confirm {
        text-align: right;
        flex-grow: 1;
        flex-wrap: 0;
        padding-right: 40rpx;
        color: $tn-main-color;
        
        &--hover {
          color: $tn-color-blue;
        }
      }
    }
  }
</style>
