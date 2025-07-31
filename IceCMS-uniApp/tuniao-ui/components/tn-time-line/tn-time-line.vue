<template>
  <view class="tn-time-line-class tn-time-line">
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: 'tn-time-line',
    props: {
      
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-time-line {
    padding-left: 40rpx;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      width: 1px;
      left: 0;
      top: 12rpx;
      bottom: 0;
      border-left: 1px solid #AAAAAA;
      transform-origin: 0 0;
      transform: scaleX(0.5);
    }
  }
</style>
