<template>
  <view
    class="tn-tag-class tn-tag"
    :class="[
      tagClass,
      backgroundColorClass,
      fontColorClass
    ]"
    :style="[tagStyle]"
    @tap="handleClick"
  >
    <slot></slot>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    mixins: [ componentsColorMixin ],
    options: {
    	// 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    	virtualHost: true
    },
    name: 'tn-tag',
    props: {
      // 序号，用于区分多个标签
      index: {
        type: [Number, String],
        default: '0'
      },
      // 形状 圆角 radius 椭圆  circle 左半圆 circleLeft 右半圆 circleRight
      shape: {
        type: String,
        default: ''
      },
      // 标签大小 sm lg
      size: {
        type: String,
        default: ''
      },
      // 宽度
      width: {
        type: String,
        default: ''
      },
      // 高度
      height: {
        type: String,
        default: ''
      },
      // 内边距
      padding: {
        type: String,
        default: ''
      },
      // 外边距
      margin: {
        type: String,
        default: '0'
      },
      // 是否镂空
      plain: {
        type: Boolean,
        default: false
      },
      // 是否将元素基点设置在左边
      originLeft: {
        type: Boolean,
        default: false
      },
      // 是否将元素基点设置在右边
      originRight: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      tagClass() {
        let clazz = ''
        // 设置标签的形状
        switch(this.shape) {
          case 'radius':
            clazz += ' tn-radius'
            break
          case 'circle':
            clazz += ' tn-round'
            break
          case 'circleLeft':
            clazz += ' tn-tag--fillet-left'
            break
          case 'circleRight':
            clazz += ' tn-tag--fillet-right'
            break
        }
        
        // 设置为镂空并且设置镂空便可才进行设置
        if (this.plain) {
          clazz += ' tn-tag--plain tn-border-solid'
          if (this.backgroundColor !== '' && this.backgroundColor.includes('tn-bg')) {
            const color = this.backgroundColor.slice(this.backgroundColor.lastIndexOf('-') + 1)
            clazz += ` tn-border-${color}`
          }
        }
        
        // 设置基准点
        if (this.originLeft) {
          clazz += ' tn-tag--origin-left'
        }
        if (this.originRight) {
          clazz += ' tn-tag--origin-right'
        }
        
        return clazz
      },
      tagStyle() {
        let style = {}
        switch(this.size) {
          case 'sm':
            style.padding = '0 12rpx'
            style.fontSize = '20rpx'
            style.height = '32rpx'
            break
          case 'lg':
            style.padding = '0 20rpx'
            style.fontSize = '28rpx'
            style.height = '62rpx'
            break
          default:
            style.padding = '0 16rpx'
            style.fontSize = '24rpx'
            style.height = '48rpx'
            break
        }
        
        style.width = this.width || '120rpx'
        style.height = this.height || style.height
        
        style.padding = this.padding || style.padding
        if (this.margin) {
          style.margin = this.margin
        }
        
        if (this.fontColorStyle) {
          style.color = this.fontColorStyle
        }
        if (this.fontSize !== 0) {
          style.fontSize = this.fontSize + this.fontUnit
        }

        if (!this.backgroundColorClass) {
          style.backgroundColor = !this.plain ? (this.backgroundColorStyle || '#FFFFFF') : ''
          if (this.plain) {
            style.borderColor = (this.backgroundColorStyle || '#080808')
          }
        }
        
        
        
        return style
      },
    },
    data() {
      return {

      }
    },
    methods: {
      // 处理点击事件
      handleClick() {
        this.$emit('click', {
          index: Number(this.index)
        })
        this.$emit('tap', {
          index: Number(this.index)
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .tn-tag {
    vertical-align: middle;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-family: Helvetica Neue, Helvetica, sans-serif;
    white-space: nowrap;
    // color: #FFFFFF;
    
    &--fillet-left {
      border-radius: 50rpx 0 0 50rpx;
    }
    
    &--fillet-right {
      border-radius: 0 50rpx 50rpx 0;
    }
    
    &--plain {
      background-color: transparent !important;
      background-image: none;
      
      &.tn-round {
        border-radius: 1000rpx !important;
      }
      
      &.tn-radius {
        border-radius: 12rpx !important;
      }
    }
    
    &--origin-left {
      transform-origin: 0 center;
    }
    
    &--origin-right {
      transform-origin: 100% center;
    }
  }
  
</style>
