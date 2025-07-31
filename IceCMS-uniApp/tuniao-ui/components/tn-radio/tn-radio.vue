<template>
  <view class="tn-radio-class tn-radio" :style="[radioStyle]">
    <view
      class="tn-radio__icon-wrap"
      :class="[iconClass]"
      :style=[iconStyle]
      @tap="toggle"
    >
      <view class="tn-icon-success tn-radio__icon-wrap__icon"></view>
    </view>
    
    <view
      class="tn-radio__label"
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
    name: 'tn-radio',
    props: {
      // radio名称
      name: {
        type: [String, Number],
        default: ''
      },
      // 是否禁用
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
      // 组件尺寸
      size: {
        type: Number,
        default: 0
      },
      // 图标大小
      iconSize: {
        type: Number,
        default: 0
      },
      // label字体大小
      labelSize: {
        type: Number,
        default: 0
      }
    },
    computed: {
      // 禁用，父组件会覆盖子组件的状态
      isDisabled() {
        return this.disabled ? this.disabled : (this.parentData.disabled ? this.parentData.disabled : false)
      },
      // 禁用label点击，父组件会覆盖子组件的状态
      isDisabledLabel() {
        return this.disabledLabel ? this.disabledLabel : (this.parentData.disabledLabel ? this.parentData.disabledLabel : false)
      },
      // 组件尺寸
      elSize() {
        return this.size ? this.size : (this.parentData.size ? this.parentData.size : 34)
      },
      // 组件选中时的颜色
      elActiveColor() {
        return this.activeColor ? this.activeColor : (this.parentData.activeColor ? this.parentData.activeColor : '#01BEFF')
      },
      // 组件形状
      elShape() {
        return this.shape ? this.shape : (this.parentData.shape ? this.parentData.shape : 'circle')
      },
      iconClass() {
        let clazz = ''
        clazz += (' tn-radio__icon-wrap--' + this.elShape)
        
        if (this.parentData.value === this.name) clazz += ' tn-radio__icon-wrap--checked'
        if (this.isDisabled) clazz += ' tn-radio__icon-wrap--disabled'
        if (this.parentData.value === this.name && this.isDisabled) clazz += ' tn-radio__icon-wrap--disabled--checked'
      
        return clazz
      },
      iconStyle() {
        // 当前radio的name等于parent的value才认为时选中
        let style = {}
        if (this.elActiveColor && this.parentData.value === this.name && !this.isDisabled) {
          style.borderColor = this.elActiveColor
          style.backgroundColor = this.elActiveColor
        }
        
        style.color = this.parentData.value === this.name ? '#FFFFFF' : 'transparent'
        
        style.width = this.elSize + 'rpx'
        style.height = style.width
        
        style.fontSize = (this.iconSize ? this.iconSize : (this.parentData.iconSize ? this.parentData.iconSize : 20)) + 'rpx'
        
        return style
      },
      radioStyle() {
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
      }
    },
    data() {
      return {
        // 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.xxx的形式
        // 故只能使用如此方法
        parentData: {
          value: null,
          disabled: null,
          disabledLabel: null,
          shape: null,
          activeColor: null,
          size: null,
          width: null,
          wrap: null,
          iconSize: null,
        }
      }
    },
    created() {
      // 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
      this.updateParentData()
      this.parent.children.push(this)
    },
    methods: {
      updateParentData() {
        this.getParentData('tn-radio-group')
      },
      onClickLabel() {
        if (!this.isDisabledLabel && !this.isDisabled) {
          this.setRadioCheckedStatus()
        }
      },
      toggle() {
        if (!this.isDisabled) {
          this.setRadioCheckedStatus()
        }
      },
      emitEvent() {
        // tn-radio的name不等于父组件的v-model的值时(意味着未选中)，才发出事件，避免多次点击触发事件
        if (this.parentData.value !== this.name) this.$emit('change', this.name)
      },
      // 改变选中的状态
      // 更改本组件的parentData.value的值为本组件的name值，同时通过父组件遍历所有的radio实例
      // 将本组件外的其他radio的parentData.value都设置为空
      setRadioCheckedStatus() {
        this.emitEvent()
        if (this.parent) {
          this.parent.setValue(this.name)
          this.parentData.value = this.name
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-radio {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    align-items: center;
    overflow: hidden;
    user-select: none;
    line-height: 1.8;
    
    &__icon-wrap {
      color: $tn-font-color;
      display: flex;
      flex-direction: row;
      flex: none;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 42rpx;
      height: 42rpx;
      color: transparent;
      text-align: center;
      transition-property: color, border-color, background-color;
      font-size: 20rpx;
      border: 1rpx solid $tn-font-sub-color;
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
