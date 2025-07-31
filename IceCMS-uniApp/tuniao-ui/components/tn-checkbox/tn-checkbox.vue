<template>
  <view class="tn-checkbox-class tn-checkbox" :style="[checkboxStyle]">
    <view
      class="tn-checkbox__icon-wrap"
      :class="[iconClass]"
      :style="[iconStyle]"
      @tap="toggle"
    >
      <view class="tn-checkbox__icon-wrap__icon" :class="[`tn-icon-${iconName}`]"></view>
    </view>
    
    <view
      class="tn-checkbox__label"
      :class="[labelClass]"
      :style="{
        fontSize: labelSize ? labelSize + 'rpx' : ''
      }"
      @tap="onClickLabel"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-checkbox',
    props: {
      // checkbox名称
      name: {
        type: [String, Number],
        default: ''
      },
      // 是否为选中状态
      value: {
        type: Boolean,
        default: false
      },
      // 禁用选择
      disabled: {
        type: Boolean,
        default: false
      },
      // 禁用点击标签进行选择
      disabledLabel: {
        type: Boolean,
        default: false
      },
      // 选择框的形状 square 方形 circle 圆形
      shape: {
        type: String,
        default: ''
      },
      // 选中时的颜色
      activeColor: {
        type: String,
        default: ''
      },
      // 组件大小
      size: {
        type: Number,
        default: 0
      },
      // 图标名称
      iconName: {
        type: String,
        default: 'success'
      },
      // 图标大小
      iconSize: {
        type: Number,
        default: 0
      },
      // label的字体大小
      labelSize: {
        type: Number,
        default: 0
      }
    },
    computed: {
      // 是否禁用选中，父组件的禁用会覆盖当前的禁用状态
      isDisabled() {
        return this.disabled ? this.disabled : (this.parent ? this.parentData.disabled : false)
      },
      // 是否禁用点击label选中，父组件的禁用会覆盖当前的禁用状态
      isDisabledLabel() {
        return this.disabledLabel ? this.disabledLabel : (this.parent ? this.parentData.disabledLabel : false)
      },
      // 尺寸
      checkboxSize() {
        return this.size ? this.size : (this.parent ? this.parentData.size : 34)
      },
      // 激活时的颜色
      elAvtiveColor() {
        return this.activeColor ? this.activeColor : (this.parent ? this.parentData.activeColor : '#01BEFF')
      },
      // 形状
      elShape() {
        return this.shape ? this.shape : (this.parent ? this.parentData.shape : 'square')
      },
      iconClass() {
        let clazz = ''
        clazz += (' tn-checkbox__icon-wrap--' + this.elShape)
        
        if (this.checkValue) clazz += ' tn-checkbox__icon-wrap--checked'
        if (this.isDisabled) clazz += ' tn-checkbox__icon-wrap--disabled'
        if (this.value && this.isDisabled) clazz += ' tn-checkbox__icon-wrap--disabled--checked'
        
        return clazz
      },
      iconStyle() {
        let style = {}
        // 判断是否用户手动禁用和传递的值
        if (this.elAvtiveColor && this.checkValue && !this.isDisabled) {
          style.borderColor = this.elAvtiveColor
          style.backgroundColor = this.elAvtiveColor
        }
        
        // checkbox内部的勾选图标，如果选中状态，为白色，否则为透明色即可
        style.color = this.checkValue ? '#FFFFFF' : 'transparent'
        
        style.width = this.checkboxSize + 'rpx'
        style.height = style.width
        
        style.fontSize = (this.iconSize ? this.iconSize : (this.parent ? this.parentData.iconSize : 20)) + 'rpx'
        
        return style
      },
      checkboxStyle() {
        let style = {}
        if (this.parent && this.parentData.width) {
          // #ifdef MP
          // 各家小程序因为它们特殊的编译结构，使用float布局
          style.float = 'left';
          // #endif
          // #ifndef MP
          // H5和APP使用flex布局
          style.flex = `0 0 ${this.parentData.width}`;
          // #endif
        }
        if(this.parent && this.parentData.wrap) {
        	style.width = '100%';
        	// #ifndef MP
        	// H5和APP使用flex布局，将宽度设置100%，即可自动换行
        	style.flex = '0 0 100%';
        	// #endif
        }
        
        return style
      },
      labelClass() {
        let clazz = ''
        if (this.isDisabled) {
          clazz += ' tn-checkbox__label--disabled'
        }
        return clazz
      }
    },
    data() {
      return {
        // 当前checkbox的value值
        checkValue: false,
        parentData: {
          value: null,
          max: null,
          disabled: null,
          disabledLabel: null,
          shape: null,
          activeColor: null,
          size: null,
          width: null,
          wrap: null,
          iconSize: null
        }
      }
    },
    watch: {
      value(val) {
        this.checkValue = val
      }
    },
    created() {
      // 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环应用
      // this.parent = this.$t.$parent.call(this, 'tn-checkbox-group')
      // // 如果存在u-checkbox-group，将本组件的this塞进父组件的children中
      // this.parent && this.parent.children.push(this)
      // // 初始化父组件的value值
      // this.parent && this.parent.emitEvent()
      this.updateParentData()
      this.parent && this.parent.children.push(this)
    },
    methods: {
      updateCheckValue() {
        // 更新当前checkbox的选中状态
        this.checkValue = (this.parent && this.parentData.value.includes(this.name)) || this.value === true
        if (this.parent) {
          if (this.value && !this.parentData.value.includes(this.name)) {
            this.parentData.value.push(this.name)
            this.parent.initValue(this.parentData.value)
          }
        }
      },
      updateParentData() {
        this.getParentData('tn-checkbox-group')
        this.updateCheckValue()
      },
      onClickLabel() {
        if (!this.isDisabled && !this.isDisabledLabel) {
          this.setValue()
        }
      },
      toggle() {
        if (!this.isDisabled) {
          this.setValue()
        }
      },
      emitEvent() {
        this.$emit('change', {
          name: this.name,
          value: !this.checkValue
        })
        if (this.parent) {
          this.checkValue = !this.checkValue
          // 执行父组件tn-checkbox-group的事件方法
          // 等待下一个周期再执行，因为this.$emit('input')作用于父组件，再反馈到子组件内部，需要时间
          setTimeout(() => {
            if(this.parent.emitEvent) this.parent.emitEvent();
          }, 80)
        }
      },
      // 设置input的值，通过v-modal绑定组件的值
      setValue() {
        // 判断是否为可选项组
        if (this.parent) {
          // 反转状态
          if (this.checkValue === true) {
            this.emitEvent()
            // this.$emit('input', !this.checkValue)
          } else {
            // 超出最大可选项，弹出提示
            if (this.parentData.value.length >= this.parentData.max) {
              return this.$t.message.toast(`最多可选${this.parent.max}项`)
            }
            // 如果原来为未选中状态，需要选中的数量少于父组件中设置的max值，才可以选中
            this.emitEvent();
            // this.$emit('input', !this.checkValue);
          }
        } else {
          // 只有一个可选项
          this.emitEvent()
          this.$emit('input', !this.checkValue)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-checkbox {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    align-items: center;
    overflow: hidden;
    user-select: none;
    line-height: 1.8;
    
    &__icon-wrap {
      color: $tn-font-color;
      flex: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 42rpx;
      height: 42rpx;
      color: transparent;
      text-align: center;
      transition-property: color, border-color, background-color;
      border: 1px solid $tn-font-sub-color;
      transition-duration: 0.2s;
      
      /* #ifdef MP-TOUTIAO */
      // 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
      &__icon {
      	line-height: 0;
      }
      /* #endif */
      
      &--circle {
        border-radius: 100%;
      }
      
      &--square {
        border-radius: 6rpx;
      }
      
      &--checked {
        color: #FFFFFF;
        background-color: $tn-main-color;
        border-color: $tn-main-color;
      }
      
      &--disabled {
        background-color: $tn-font-holder-color;
        border-color: $tn-font-sub-color;
      }
      
      &--disabled--checked {
        color: $tn-font-sub-color !important;
      }
    }
    
    &__label {
      word-wrap: break-word;
      margin-left: 10rpx;
      margin-right: 24rpx;
      color: $tn-font-color;
      font-size: 30rpx;
      
      &--disabled {
        color: $tn-font-sub-color;
      }
    }
  }
</style>
