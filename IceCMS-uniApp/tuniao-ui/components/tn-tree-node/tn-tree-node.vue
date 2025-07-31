<template>
  <view class="tn-tree-node-class tn-tree-node">
    <view class="tn-tree__label" @tap="handleClick">
      <view
        v-if="node.children && node.children.length > 0 && triangle"
        class="tn-tree__triangle"
        :class="[{'tn-tree__triangle--90deg': !collapsed}]"
      ></view>
      <view class="tn-tree__label__item">
        <view v-if="collapsed && node.image" class="tn-tree__label__item__image">
          <image :src="node.image" mode="widthFix"></image>
        </view>
        <view v-if="!collapsed && node.activeImage" class="tn-tree__label__item__image">
          <image :src="node.activeImage" mode="widthFix"></image>
        </view>
        <view class="tn-tree__label__item__text">{{ node.text }}</view>
      </view>
    </view>
    <view v-if="!collapsed && node.children && node.children.length > 0" class="tn-tree__children">
      <tn-tree-node
        v-for="(item, index) in node.children"
        :key="index"
        :node="item"
        :collapsible="collapsible"
        :triangle="triangle"
        @click="nodeClick"
      ></tn-tree-node>
    </view>
  </view>
</template>

<script>
  //如果未开启easycom模式，请自行引入tn-tree-node组件
  export default {
    name: 'tn-tree-node',
    props: {
      // 节点信息
      node: {
        type: Object,
        default() {
          return {}
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
    watch: {
      node(val) {
        if (val.collapsed !== this.collapsed && this.node.children && this.node.children.length > 0) {
          this.collapsed = val.collapsed
        }
      }
    },
    data() {
      return {
        // 标记是否折叠
        collapsed: true
      }
    },
    created() {
      if (this.node.collapsed === false) {
        this.collapsed = false
      }
    },
    methods: {
      // 处理点击
      handleClick(e) {
        if (this.collapsible && this.node.children && this.node.children.length > 0) {
          this.collapsed = !this.collapsed
        }
        this.$emit('click', this.node)
      },
      nodeClick(e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-tree-node {
    
    .tn-tree {
      &__label {
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 20rpx 30rpx;
        background-color: transparent;
        /* #ifdef H5 */
        cursor: pointer;
        /* #endif */
        // 字体抗锯齿
        -webkit-font-smoothing: antialiased;
        
        &__item {
          display: flex;
          flex-direction: row;
          align-items: center;
          
          &__image {
            width: 40rpx;
            height: 40rpx;
            margin-right: 16rpx;
            
            image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      
      &__children {
        padding-left: 60rpx;
        position: relative;
      }
      
      &__triangle {
        width: 0;
        height: 0;
        border-top: 12rpx solid transparent;
        border-bottom: 12rpx solid transparent;
        border-left: 16rpx solid #080808;
        margin-right: 20rpx;
        transition:  transform 0.25s ease-out;
        flex-shrink: 0;
        
        &--90deg {
          transform:rotate(90deg) translate3d(0, 0, 0);
        }
      }
    }
  }
</style>
