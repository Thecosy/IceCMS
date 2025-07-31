<template>
  <view class="tn-collapse-class tn-collapse">
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: 'tn-collapse',
    props: {
      // 是否为手风琴
      accordion: {
        type: Boolean,
        default: true
      },
      // 头部样式
      headStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 主题样式
      bodyStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 每一个item的样式
      itemStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 显示箭头
      arrow: {
        type: Boolean,
        default: true
      },
      // 箭头颜色
      arrowColor: {
        type: String,
        default: '#AAAAAA'
      },
      // 点击标题栏时的按压样式
      hoverClass: {
        type: String,
        default: 'tn-hover'
      }
    },
    computed: {
      parentData() {
        return [this.headStyle, this.bodyStyle, this.itemStyle, this.arrow, this.arrowColor, this.hoverClass]
      }
    },
    data() {
      return {
        
      }
    },
    watch: {
      parentData() {
        // 如果父组件的参数发生变化重新初始化子组件的信息
        if (this.childrens.length > 0) {
          this.init()
        }
      }
    },
    created() {
      this.childrens = []
    },
    methods: {
      // 重新初始化内部所有子元素计算高度，异步获取数据时重新渲染
      init() {
        this.childrens.forEach((child, index) => {
          child.init()
        })
      },
      // collapseItem被点击时由collapseItem调用父组件
      onChange() {
        let activeItem = []
        this.childrens.forEach((child, index) => {
          if (child.isShow) {
            activeItem.push(child.nameSync)
          }
        })
        // 如果时手风琴模式，只有一个匹配结果，即activeItem长度为1
        if (this.accordion) activeItem = activeItem.join(',')
        this.$emit('change', activeItem)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
