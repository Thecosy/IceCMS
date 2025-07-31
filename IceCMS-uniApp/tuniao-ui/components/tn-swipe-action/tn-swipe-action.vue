<template>
  <view class="tn-swipe-action-class tn-swipe-action">
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: 'tn-swipe-action',
    props: {
      // 是否自动关闭其他swipe按钮组
      autoClose: {
        type: Boolean,
        default: true
      }
    },
    provide() {
      return {
        swipeAction: this
      }
    },
    computed: {
      // 用于监听父组件参数变化
      parentData() {
        return [this.autoClose]
      }
    },
    data() {
      return {}
    },
    watch: {
      parentData() {
        if (this.children.length) {
          this.children.map(child => {
            // 判断子组件(tn-swipe-action-item)如果有updateParentData方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
            typeof(child.updateParentData) === 'function' && child.updateParentData()
          })
        }
      }
    },
    created() {
      this.children = []
    },
    methods: {
      // 关闭其他单元格
      closeOther(child) {
        if (this.autoClose) {
          // 历遍所有的单元格，找出非当前操作中的单元格，进行关闭
          this.children.map((item, index) => {
            if (child !== item) {
              item.closeHandler()
            }
          })
        }
      }
    }
  }
</script>

<style>
</style>
