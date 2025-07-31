<template>
  <view class="tn-time-line-item-class tn-time-line-item">
    <view>
      <slot name="content"></slot>
    </view>
    <view class="tn-time-line-item__node" :style="[nodeStyle]">
      <slot name="node">
        <view class="tn-time-line-item__node--dot"></view>
      </slot>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-time-line-item',
    props: {
      // 节点左边图标的绝对定位top值
      top: {
        type: [String, Number],
        default: ''
      }
    },
    computed: {
      nodeStyle() {
        let style = {}
        if (this.top !== '') style.top = this.top + 'rpx'
        
        return style
      }
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-time-line-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    margin-bottom: 32rpx;
    
    &__node {
      display: flex;
      flex-direction: row;
      position: absolute;
      top: 12rpx;
      left: -40rpx;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      transform-origin: 0;
      transform: translateX(-50%);
      z-index: 1;
      background-color: transparent;
      
      &--dot {
        width: 16rpx;
        height: 16rpx;
        border-radius: 100rpx;
        background-color: #AAAAAA;
      }
    }
  }
</style>
