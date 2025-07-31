<template>
  <view class="tn-table-class tn-table" :class="[tableClass]" :style="[tableStyle]">
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: 'tn-table',
    props: {
      // 边框宽度
      borderWidth: {
        type: [String, Number],
        default: ''
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: ''
      },
      // 显示上边框
      borderTop: {
        type: Boolean,
        default: true
      },
      // 显示右边框
      borderRight: {
        type: Boolean,
        default: false
      },
      // 显示下边框
      borderBottom: {
        type: Boolean,
        default: false
      },
      // 显示左边框
      borderLeft: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      parentData() {
        return [this.borderWidth, this.borderColor]
      },
      tableClass() {
        let clazz = ''
        return clazz
      },
      tableStyle() {
        let style = {}
        if (this.borderWidth !== '') {
          style.borderWidth = this.$t.string.getLengthUnitValue(this.borderWidth)
        }
        if (this.borderColor) {
          style.borderColor = this.borderColor
        }
        if (this.borderLeft) {
          style.borderLeftStyle = 'solid'
        }
        if (this.borderRight) {
          style.borderRightStyle = 'solid'
        }
        if (this.borderTop) {
          style.borderTopStyle = 'solid'
        }
        if (this.borderBottom) {
          style.borderBottomStyle = 'solid'
        }
        return style
      }
    },
    data() {
      return {}
    },
    created() {
      this.children = []
    },
    watch: {
      parentData() {
        // 更新子组件的数据
        if (this.children.length) {
          this.children.map((child) => {
            typeof(child.updateParentData) === 'function' && child.updateParentData()
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-table {
    box-sizing: border-box;
    
    border-width: 1rpx;
    border-style: none;
    border-color: #AAAAAA;
  }
</style>
