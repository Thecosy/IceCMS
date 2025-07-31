<template>
  <view
    class="tn-list-cell-class tn-list-cell"
    :class="[
      backgroundColorClass,
      fontColorClass,
      cellClass
    ]"
    :hover-class="hover ? 'tn-hover' : ''"
    :hover-stay-time="150"
    :style="[cellStyle]"
    @tap="handleClick"
  >
    <slot></slot>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    mixins: [ componentsColorMixin ],
    name: 'tn-list-cell',
    props: {
      // 列表序号
      index: {
        type: [Number, String],
        default: '0'
      },
      // 内边距
      padding: {
        type: String,
        default: ''
      },
      // 是否有箭头
      arrow: {
        type: Boolean,
        default: false
      },
      //箭头是否有偏移距离
      arrowRight: {
      	type: Boolean,
      	default: true
      },
      // 是否有点击效果
      hover: {
        type: Boolean,
        default: false
      },
      // 隐藏线条
      unlined: {
        type: Boolean,
        default: false
      },
      //线条是否有左偏移距离
      lineLeft: {
      	type: Boolean,
      	default: true
      },
      //线条是否有右偏移距离
      lineRight: {
      	type: Boolean,
      	default: true
      },
      //是否加圆角
      radius: {
      	type: Boolean,
      	default: false
      }
    },
    computed: {
      cellClass() {
        let clazz = ''
        
        if (this.arrow) {
          clazz += ' tn-list-cell--arrow'
          if (!this.arrowRight) {
            clazz += ' tn-list-cell--arrow--none-right'
          }
        }
        
        if (this.unlined) {
          clazz += ' tn-list-cell--unlined'
        } else {
          if (this.lineLeft) {
            clazz += ' tn-list-cell--line-left'
          }
          if (this.lineRight) {
            clazz += ' tn-list-cell--line-right'
          }
        }
        
        if (this.radius) {
          clazz += ' tn-list-cell--radius'
        }
        
        return clazz
      },
      cellStyle() {
        let style = {}
        
        if (this.backgroundColorStyle) {
          style.backgroundColor = this.backgroundColorStyle
        }
        
        if (this.fontColorStyle) {
          style.color = this.fontColorStyle
        }
        
        if (this.fontSize) {
          style.fontSize = this.fontSize + this.fontUnit
        }
        
        if (this.padding) {
          style.padding = this.padding
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
        this.$emit("click", {
          index: Number(this.index)
        })
        this.$emit("tap", {
          index: Number(this.index)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-list-cell {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    background-color: #FFFFFF;
    color: $tn-font-color;
    font-size: 28rpx;
    padding: 26rpx 30rpx;
    
    &--radius {
      border-radius: 12rpx;
      overflow: hidden;
    }
    
    &--arrow {
      &::before {
        content: " ";
        position: absolute;
        top: 50%;
        right: 30rpx;
        width: 20rpx;
        height: 20rpx;
        margin-top: -12rpx;
        border-width: 4rpx 4rpx 0 0;
        border-color: $tn-font-holder-color;
        border-style: solid;
        transform: matrix(0.5, 0.5, -0.5, 0.5, 0, 0);
      }
      
      &--none-right {
        &::before {
          right: 0 !important;
        }
      }
    }
    
    &::after {
      content: " ";
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      pointer-events: none;
      border-bottom: 1px solid $tn-border-solid-color;
      transform: scaleY(0.5) translateZ(0);
      transform-origin: 0 100%;
    }
    
    &--line-left {
      &::after {
        left: 30rpx !important;
      }
    }
    
    &--line-right {
      &::after {
        right: 30rpx !important;
      }
    }
    
    &--unlined {
      &::after {
        border-bottom: 0 !important;
      }
    }
  }
  
</style>
