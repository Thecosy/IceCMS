<template>
  <view
    class="tn-input-class tn-input"
    :class="{
      'tn-input--border': border,
      'tn-input--error': validateState
    }"
    :style="{
      padding: `0 ${border ? 20 : 0}rpx`,
      borderColor: borderColor,
      textAlign: inputAlign
    }"
    @tap.stop="inputClick"
  >
    <textarea
      v-if="type === 'textarea'"
      class="tn-input__input tn-input__textarea"
      :style="[inputStyle]"
      :value="defaultValue"
      :placeholder="placeholder"
      :placeholderStyle="placeholderStyle"
      :disabled="disabled || type === 'select'"
      :maxlength="maxLength"
      :fixed="fixed"
      :focus="focus"
      :autoHeight="autoHeight"
      :selectionStart="elSelectionStart"
      :selectionEnd="elSelectionEnd"
      :cursorSpacing="cursorSpacing"
      :showConfirmBar="showConfirmBar"
      @input="handleInput"
      @blur="handleBlur"
      @focus="onFocus"
      @confirm="onConfirm"
    />
    <input
      v-else
      class="tn-input__input"
      :type="type === 'password' ? 'text' : type"
      :style="[inputStyle]"
      :value="defaultValue"
      :password="type === 'password' && !showPassword"
      :placeholder="placeholder"
      :placeholderStyle="placeholderStyle"
      :disabled="disabled || type === 'select'"
      :maxlength="maxLength"
      :focus="focus"
      :confirmType="confirmType"
      :selectionStart="elSelectionStart"
      :selectionEnd="elSelectionEnd"
      :cursorSpacing="cursorSpacing"
      :showConfirmBar="showConfirmBar"
      @input="handleInput"
      @blur="handleBlur"
      @focus="onFocus"
      @confirm="onConfirm"
    />
    
    <!-- 右边的icon -->
    <view class="tn-input__right-icon tn-flex tn-flex-col-center">
      <!-- 清除按钮 -->
      <view
        v-if="clearable && value !== '' && focused"
        class="tn-input__right-icon__item tn-input__right-icon__clear"
        @tap="onClear"
      >
        <view class="icon tn-icon-close"></view>
      </view>
      <view
        v-else-if="type === 'text' && !focused && showRightIcon && rightIcon !== ''"
        class="tn-input__right-icon__item tn-input__right-icon__clear"
      >
        <view class="icon" :class="[`tn-icon-${rightIcon}`]"></view>
      </view>
      <!-- 显示密码按钮 -->
      <view
        v-if="passwordIcon && type === 'password'"
        class="tn-input__right-icon__item tn-input__right-icon__clear"
        @tap="showPassword = !showPassword"
      >
        <view v-if="!showPassword" class="tn-icon-eye-hide"></view>
        <view v-else class="icon tn-icon-eye"></view>
      </view>
      <!-- 可选项箭头 -->
      <view
        v-if="type === 'select'"
        class="tn-input__right-icon__item tn-input__right-icon__select"
        :class="{
          'tn-input__right-icon__select--reverse': selectOpen
        }"
      >
        <view class="icon tn-icon-up-triangle"></view>
      </view>
    </view>
  </view>
</template>

<script>
  import Emitter from '../../libs/utils/emitter.js'
  
  export default {
    mixins: [Emitter],
    name: 'tn-input',
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      // 输入框的类型
      type: {
        type: String,
        default: 'text'
      },
      // 输入框文字对齐方式
      inputAlign: {
        type: String,
        default: 'left'
      },
      // 文本框为空时显示的信息
      placeholder: {
        type: String,
        default: ''
      },
      placeholderStyle: {
        type: String,
        default: 'color: #AAAAAA'
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: false
      },
      // 可输入文字的最大长度
      maxLength: {
        type: Number,
        default: 255
      },
      // 输入框高度
      height: {
        type: Number,
        default: 0
      },
      // 根据内容自动调整高度
      autoHeight: {
        type: Boolean,
        default: true
      },
      // 键盘右下角显示的文字，仅在text时生效
      confirmType: {
        type: String,
        default: 'done'
      },
      // 输入框自定义样式
      customStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 是否固定输入框
      fixed: {
        type: Boolean,
        default: false
      },
      // 是否自动获取焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 当type为password时，是否显示右侧密码图标
      passwordIcon: {
        type: Boolean,
        default: true
      },
      // 当type为 input或者textarea时是否显示边框
      border: {
        type: Boolean,
        default: false
      },
      // 边框的颜色
      borderColor: {
        type: String,
        default: '#dcdfe6'
      },
      // 当type为select时，旋转右侧图标，标记当时select是打开还是关闭
      selectOpen: {
        type: Boolean,
        default: false
      },
      // 是否可清空
      clearable: {
        type: Boolean,
        default: true
      },
      // 光标与键盘的距离
      cursorSpacing: {
        type: Number,
        default: 0
      },
      // selectionStart和selectionEnd需要搭配使用，自动聚焦时生效
      // 光标起始位置
      selectionStart: {
        type: Number,
        default: -1
      },
      // 光标结束位置
      selectionEnd: {
        type: Number,
        default: -1
      },
      // 自动去除两端空格
      trim: {
        type: Boolean,
        default: true
      },
      // 是否显示键盘上方的完成按钮
      showConfirmBar: {
        type: Boolean,
        default: true
      },
      // 是否在输入框内最右边显示图标
      showRightIcon: {
        type: Boolean,
        default: false
      },
      // 最右边图标的名称
      rightIcon: {
        type: String,
        default: ''
      }
    },
    computed: {
      // 输入框样式
      inputStyle() {
        let style = {}
        // 如果没有设置高度，根据不同的类型设置一个默认值
        style.minHeight = this.height ? this.height + 'rpx' : 
          this.type === 'textarea' ? this.textareaHeight + 'rpx' : this.inputHeight + 'rpx'
        
        style = Object.assign(style, this.customStyle)
        
        return style
      },
      // 光标起始位置
      elSelectionStart() {
        return String(this.selectionStart)
      },
      // 光标结束位置
      elSelectionEnd() {
        return String(this.selectionEnd)
      }
    },
    data() {
      return {
        // 默认值
        defaultValue: this.value,
        // 输入框高度
        inputHeight: 70,
        // textarea的高度
        textareaHeight: 100,
        // 标记验证的状态
        validateState: false,
        // 标记是否获取到焦点
        focused: false,
        // 是否预览密码
        showPassword: false,
        // 用于头条小程序，判断@input中，前后的值是否发生了变化，因为头条中文下，按下键没有输入内容，也会触发@input事件
        lastValue: '',
      }
    },
    watch: {
      value(newVal, oldVal) {
        this.defaultValue = newVal
        // 当值发生变化时，并且type为select时，不会触发input事件
        // 模拟input事件
        if (newVal !== oldVal && this.type === 'select') {
          this.handleInput({
            detail: {
              value: newVal
            }
          })
        }
      }
    },
    created() {
      // 监听form-item发出的错误事件，将输入框变成红色
      this.$on("on-form-item-error", this.onFormItemError)
    },
    methods: {
      /**
       * input事件
       */
      handleInput(event) {
        let value = event.detail.value
        // 是否需要去掉空格
        if (this.trim) value = this.$t.string.trim(value)
        // 原生事件
        this.$emit('input', value)
        // model赋值
        this.defaultValue = value
        // 过一个生命周期再发送事件给tn-form-item，否则this.$emit('input')更新了父组件的值，但是微信小程序上
        // 尚未更新到tn-form-item，导致获取的值为空，从而校验混论
        // 这里不能延时时间太短，或者使用this.$nextTick，否则在头条上，会造成混乱
        setTimeout(() => {
          // 头条小程序由于自身bug，导致中文下，每按下一个键(尚未完成输入)，都会触发一次@input，导致错误，这里进行判断处理
          // #ifdef MP-TOUTIAO
          if (this.$t.string.trim(value) === this.lastValue) return
          this.lastValue = value
          // #endif
          
          // 发送当前的值到form-item进行校验
          this.dispatch('tn-form-item','on-form-change', value)
        }, 40)
      },
      /**
       * blur事件
       */
      handleBlur(event) {
        let value = event.detail.value
        
        // 由于点击清除图标也会触发blur事件，导致图标消失从而无法点击
        setTimeout(() => {
          this.focused = false
        }, 100)
        
        // 原生事件
        this.$emit('blur', value)
        // 过一个生命周期再发送事件给tn-form-item，否则this.$emit('blur')更新了父组件的值，但是微信小程序上
        // 尚未更新到tn-form-item，导致获取的值为空，从而校验混论
        // 这里不能延时时间太短，或者使用this.$nextTick，否则在头条上，会造成混乱
        setTimeout(() => {
          // 头条小程序由于自身bug，导致中文下，每按下一个键(尚未完成输入)，都会触发一次@input，导致错误，这里进行判断处理
          // #ifdef MP-TOUTIAO
          if (this.$t.string.trim(value) === this.lastValue) return
          this.lastValue = value
          // #endif
          
          // 发送当前的值到form-item进行校验
          this.dispatch('tn-form-item','on-form-blur', value)
        }, 40)
      },
      // 处理校验错误
      onFormItemError(status) {
        this.validateState = status
      },
      // 聚焦事件
      onFocus(event) {
        this.focused = true
        this.$emit('focus')
      },
      // 点击确认按钮事件
      onConfirm(event) {
        this.$emit('confirm', event.detail.value)
      },
      // 清除事件
      onClear(event) {
        this.$emit('input', '')
      },
      // 点击事件
      inputClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-input {
    display: flex;
    flex-direction: row;
    position: relative;
    flex: 1;
    
    &__input {
      font-size: 28rpx;
      color: $tn-font-color;
      flex: 1;
    }
    
    &__textarea {
      width: auto;
      font-size: 28rpx;
      color: $tn-font-color;
      padding: 10rpx 0;
      line-height: normal;
      flex: 1;
    }
    
    &--border {
      border-radius: 6rpx;
      border: 2rpx solid $tn-border-solid-color;
    }
    
    &--error {
      border-color: $tn-color-red !important;
    }
    
    &__right-icon {
      line-height: 1;
      .icon {
        color: $tn-font-sub-color;
      }
      
      &__item {
        margin-left: 10rpx;
      }
      
      &__clear {
        .icon {
          font-size: 32rpx;
        }
      }
      
      &__select {
        transition: transform .4s;
        
        .icon {
          font-size: 26rpx;
        }
        
        &--reverse {
          transform: rotate(-180deg);
        }
      }
    }
  }
</style>
