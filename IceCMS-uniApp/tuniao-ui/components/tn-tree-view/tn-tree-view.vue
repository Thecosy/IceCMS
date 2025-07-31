<template>
  <view class="tn-tree-view-class tn-tree-view">
    <tn-tree-node
      v-for="(item, index) in treeData"
      :key="index"
      :node="item"
      :collapsible="collapsible"
      :triangle="triangle"
      @click="handleClick"
    ></tn-tree-node>
  </view>
</template>

<script>
  //如果未开启easycom模式，请自行引入tn-tree-node组件
  export default {
    name: 'tn-tree-view',
    props: {
      // 节点信息
      treeData: {
        type: Array,
        default() {
          return []
        }
      },
      // 可以折叠
      collapsible: {
        type: Boolean,
        default: true
      },
      // 显示三角形
      triangle: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      handleClick(e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-tree-view {
    width: 100%;
    position: relative;
  }
</style>
