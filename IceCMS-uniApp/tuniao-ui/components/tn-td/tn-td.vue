<template>
  <view class="tn-td-class tn-td" :class="[tdClass]" :style="[tdStyle]" @tap.stop="handleClick">
    <slot></slot>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-td',
    options: {
    	// 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    	virtualHost: true
    },
    mixins: [componentsColorMixin],
    props: {
      // 占整个表格的宽度跨度
      // [1-24]
      span: {
        type: Number,
        default: 24
      },
      // 宽度
      // 优先级比span高
      width: {
        type: [String, Number],
        default: ''
      },
      // 高度
      height: {
        type: [String, Number],
        default: ''
      },
      // 字体加粗
      bold: {
        type: Boolean,
        default: false
      },
      // 格内边距
      padding: {
        type: String,
        default: ''
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: ''
      },
      // 边框宽度
      borderWidth: {
        type: [String, Number],
        default: ''
      },
      // 左边框
      borderLeft: {
        type: Boolean,
        default: false
      },
      // 下边框
      borderBottom: {
        type: Boolean,
        default: false
      },
      // 右边框
      borderRight: {
        type: Boolean,
        default: true
      },
      // 文字超出隐藏
      ellipsis: {
        type: Boolean,
        default: false
      },
      // 文本对齐方式
      // left center right
      textAlign: {
        type: String,
        default: 'left'
      },
      // 排列方式
      // left center right
      alignItems: {
        type: String,
        default: 'left'
      },
      // 收缩表格
      shrink: {
        type: Boolean,
        default: true
      },
      // 铺满剩余空间
      grow: {
        type: Boolean,
        default: false
      },
      // 隐藏
      hidden: {
        type: Boolean,
        default: false
      },
      // 固定列数据
      fixed: {
        type: Boolean,
        default: false
      },
      // zIndex
      zIndex: {
        type: Number,
        default: 0
      },
      // 列数
      index: {
        type: [String, Number],
        default: 0
      },
      // keys
      keys: {
        type: [String, Number],
        default: ''
      }
    },
    computed: {
      tdClass() {
        let clazz = ''
        clazz += `${this.ellipsis ? 'tn-td--ellipsis' : 'tn-td--normal'}`
        if (this.backgroundColorClass) {
          clazz += ` ${this.backgroundColorClass}`
        }
        if (this.fontColorClass) {
          clazz += ` ${this.fontColorClass}`
        }
        if (this.alignItems) {
          clazz += ` tn-td--${this.alignItems}`
        }
        if (this.textAlign) {
          clazz += ` tn-td__text--${this.textAlign}`
        }
        if (!this.shrink) {
          clazz += ' tn-td--shrink'
        }
        if (this.grow) {
          clazz += ' tn-td--grow'
        }
        if (this.hidden) {
          clazz += ' tn-td--hidden'
        }
        return clazz
      },
      tdStyle() {
        let style = {}
        if (this.backgroundColorStyle) {
          style.backgroundColor = this.backgroundColorStyle
        }
        if (this.fontColorStyle) {
          style.color = this.fontColorStyle
        }
        if (this.fontSizeStyle) {
          style.fontSize = this.fontSizeStyle
        }
        style.width = this.getWidth()
        if (this.height) {
          style.height = this.$t.string.getLengthUnitValue(this.height)
        }
        style.fontWeight = this.bold ? 'bold' : 'normal'
        if (this.padding) {
          style.padding = this.padding
        }
        if (this.borderWidth !== '' || this.parentData.borderWidthValue !== '') {
          style.borderWidth = this.borderWidth !== '' ? this.$t.string.getLengthUnitValue(this.borderWidth) : this.$t.string.getLengthUnitValue(this.parentData.borderWidthValue)
        }
        if (this.borderColor || this.parentData.borderColorValue) {
          style.borderColor = this.borderColor || this.parentData.borderColorValue
        }
        if (this.borderLeft) {
          style.borderLeftStyle = 'solid'
        }
        if (this.borderRight) {
          style.borderRightStyle = 'solid'
        }
        if (this.borderBottom) {
          style.borderBottomStyle = 'solid'
        }
        if (this.fixed) {
          style.zIndex = this.zIndex ? this.zIndex : this.$t.zIndex.tableTd
        }
        return style
      }
    },
    data() {
      return {
        parentData: {
          borderColorValue: null,
          borderWidthValue: null
        }
      }
    },
    created() {
      this.parent = false
      this.updateParentData()
      this.parent && this.parent.children.push(this)
    },
    methods: {
      // 获取表格宽度
      getWidth() {
        if (this.width) {
          return this.$t.string.getLengthUnitValue(this.width)
        }
        return [
          '4.16666667%',
          '8.33333333%',
          '12.5%',
          '16.66666667%',
          '20.83333333%',
          '25%',
          '29.16666667%',
          '33.33333333%',
          '37.5%',
          '41.66666667%',
          '45.83333333%',
          '50%',
          '54.16666667%',
          '58.33333333%',
          '62.5%',
          '66.66666667%',
          '70.83333333%',
          '75%',
          '79.16666667%',
          '83.33333333%',
          '87.5%',
          '91.66666667%',
          '95.83333333%',
          '100%'
        ][this.span - 1]
      },
      // 点击事件
      handleClick() {
        this.$emit('click', {
          index: this.index,
          key: this.keys
        })
      },
      // 更新父组件信息
      updateParentData() {
        this.getParentData('tn-tr')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-td {
    box-sizing: border-box;
    position: relative;
    word-break: break-all;
    background-color: transparent;
    height: auto;
    padding: 12rpx;
    
    border-width: 1rpx;
    border-style: none;
    border-color: #AAAAAA;
    
    &--normal {
      display: inline-flex;
      align-items: center;
    }
    &--ellipsis {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap !important;
      text-overflow: ellipsis;
    }
    
    &--shrink {
      flex-shrink: 0;
    }
    &--grow {
      flex-grow: 1;
    }
    
    &--left {
      justify-content: flex-start;
    }
    &--center {
      justify-content: center;
    }
    &--right {
      justify-content: flex-end;
    }
    
    &__text {
      &--left {
        text-align: left;
      }
      &--center {
        text-align: center;
      }
      &--right {
        text-align: right;
      }
    }
    
    &--hidden {
      visibility: hidden;
    }
  }
</style>
