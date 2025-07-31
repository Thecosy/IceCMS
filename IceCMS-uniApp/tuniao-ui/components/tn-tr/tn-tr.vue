<template>
  <view class="tn-tr-class tn-tr" :class="[trClass]" :style="[trStyle]">
    <slot></slot>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-tr',
    options: {
    	// 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    	virtualHost: true
    },
    mixins: [componentsColorMixin],
    props: {
      // 宽度
      width: {
        type: [String, Number],
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
      // 上边框
      borderTop: {
        type: Boolean,
        default: false
      },
      // 换行显示
      wrap: {
        type: Boolean,
        default: false
      },
      // 固定表格
      fixed: {
        type: Boolean,
        default: false
      },
      // left偏移值
      left: {
        type: [String, Number],
        default: 0
      },
      // right偏移值
      right: {
        type: [String, Number],
        default: 0
      },
      // top偏移值(自定义顶部导航栏时用到)
      top: {
        type: [String, Number],
        default: 0
      },
      // 外边距
      margin: {
        type: String,
        default: ''
      },
      // zIndex
      zIndex: {
        type: Number,
        default: 0
      },
      // 行数索引
      index: {
        type: [String, Number],
        default: 0
      },
      // 参数
      params: {
        type: String,
        default: ''
      }
    },
    computed: {
      borderWidthValue() {
        return this.borderWidth || this.parentData.borderWidth || ''
      },
      borderColorValue() {
        return this.borderColor || this.parentData.borderColor || ''
      },
      trClass() {
        let clazz = ''
        if (this.backgroundColorClass) {
          clazz += ` ${this.backgroundColorClass}`
        }
        if (this.fontColorClass) {
          clazz += ` ${this.fontColorClass}`
        }
        if (this.wrap) {
          clazz += ' tn-tr--wrap'
        }
        if (this.fixed) {
          clazz += ' tn-tr--fixed'
        }
        return clazz
      },
      trStyle() {
        let style = {}
        if (this.width) {
          style.width = this.$t.string.getLengthUnitValue(this.width)
        }
        if (this.backgroundColorStyle) {
          style.backgroundColor = this.backgroundColorStyle
        }
        if (this.fontColorStyle) {
          style.color = this.fontColorStyle
        }
        if (this.fontSizeStyle) {
          style.fontSize = this.fontSizeStyle
        }
        if (this.borderWidth !== '' || this.parentData.borderWidth !== '') {
          style.borderWidth = this.borderWidth !== '' ? this.$t.string.getLengthUnitValue(this.borderWidth) : this.$t.string.getLengthUnitValue(this.parentData.borderWidth)
        }
        if (this.borderColor || this.parentData.borderColor) {
          style.borderColor = this.borderColor || this.parentData.borderColor
        }
        if (this.borderLeft) {
          style.borderLeftStyle = 'solid'
        }
        if (this.borderTop) {
          style.borderTopStyle = 'solid'
        }
        if (this.fixed) {
          style.left = this.left ? this.$t.string.getLengthUnitValue(this.left) : 'auto'
          style.right = this.right ? this.$t.string.getLengthUnitValue(this.right) : 'auto'
          style.top = this.top ? this.$t.string.getLengthUnitValue(this.top) : 'auto'
        }
        if (this.margin) {
          style.margin = this.margin
        }
        style.zIndex = this.zIndex ? this.zIndex : this.$t.zIndex.tableTr
        return style
      }
    },
    data() {
      return {
        parentData: {
          borderColor: null,
          borderWidth: null
        }
      }
    },
    watch: {
      parentData: {
        handler() {
          // 更新子组件的数据
          if (this.children.length) {
            this.children.map((child) => {
              typeof(child.updateParentData) === 'function' && child.updateParentData()
            })
          }
        },
        deep: true
      }
    },
    created() {
      this.children = []
      this.parent = false
      this.updateParentData()
      this.parent && this.parent.children.push(this)
    },
    methods: {
      handleClick() {
        this.$emit('click', {
          index: this.index,
          params: this.params
        })
      },
      // 更新父组件信息
      updateParentData() {
        this.getParentData('tn-table')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-tr {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    background-color: #FFFFFF;
    
    border-width: 1rpx;
    border-style: none none solid none;
    border-color: #AAAAAA;
    
    &--wrap {
      flex-wrap: wrap;
    }
    
    &--fixed {
      position: fixed;
    }
  }
</style>
