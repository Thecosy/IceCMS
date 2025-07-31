<template>
  <view
    class="tn-badge-class tn-badge"
    :class="[
      backgroundColorClass,
      fontColorClass,
      badgeClass
    ]"
    :style="[badgeStyle]"
    @click="handleClick"
  >
    <slot v-if="!dot"></slot>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    mixins: [componentsColorMixin],
    name: 'tn-badge',
    props: {
      // 序号
      index: {
        type: [Number, String],
        default: '0'
      },
      // 徽章的大小 rpx
      radius: {
        type: Number,
        default: 0
      },
      // 内边距
      padding: {
        type: String,
        default: ''
      },
      // 外边距
      margin: {
        type: String,
        default: ''
      },
      // 是否为一个点
      dot: {
        type: Boolean,
        default: false
      },
      // 是否使用绝对定位
      absolute: {
        type: Boolean,
        default: false
      },
      // top
      top: {
        type: [String, Number],
        default: ''
      },
      // right
      right: {
        type: [String, Number],
        default: ''
      },
      // 居中 对齐右上角
      translateCenter: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      badgeClass() {
        let clazz = ''
        if (this.dot) {
          clazz += ' tn-badge--dot'
        }
        if (this.absolute) {
          clazz += ' tn-badge--absolute'
          
          if (this.translateCenter) {
            clazz += ' tn-badge--center-position'
          }
        }
        
        return clazz
      },
      badgeStyle() {
        let style = {}
        
        if (this.radius !== 0) {
          style.width = this.radius + 'rpx'
          style.height = this.radius + 'rpx'
          style.lineHeight = this.radius + 'rpx'
          
          // style.borderRadius = (this.radius * 8) + 'rpx'
        }
        
        if (this.padding) {
          style.padding = this.padding
        }
        if (this.margin) {
          style.margin = this.margin
        }
        if (this.fontColorStyle) {
          style.color = this.fontColorStyle
        }
        if (this.fontSize) {
          style.fontSize = this.fontSize + this.fontUnit
        }
        
        if (this.backgroundColorStyle) {
          style.backgroundColor = this.backgroundColorStyle
        }
        
        if (this.top) {
          style.top = this.$t.string.getLengthUnitValue(this.top)
        }
        if (this.right) {
          style.right = this.$t.string.getLengthUnitValue(this.right)
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
  .tn-badge {
    width: auto;
    height: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    font-size: 20rpx;
    background-color: #FFFFFF;
    // color: #FFFFFF;
    border-radius: 100rpx;
    padding: 4rpx 8rpx;
    line-height: initial;
    
    &--dot {
      width: 8rpx;
      height: 8rpx;
      border-radius: 50%;
      padding: 0;
    }
    &--absolute {
      position: absolute;
      top: 0;
      right: 0;
    }
    &--center-position {
      transform: translate(50%, -50%);
    }
  }
</style>
