<template>
  <!-- 支付宝小程序使用_tGetRect()获取组件的根元素尺寸，所以在外面套一个"壳" -->
  <view>
    <view :id="elId" class="tn-index-anchor__wrap" :style="[wrapperStyle]">
      <view class="tn-index-anchor" :class="[active ? 'tn-index-anchor--active' : '']" :style="[customAnchorStyle]">
        <view v-if="useSlot">
          <slot></slot>
        </view>
        <block v-else>
          <text>{{ index }}</text>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-index-anchor',
    props: {
      // 使用自定义内容
      useSlot: {
        type: Boolean,
        default: false
      },
      // 索引字符
      index: {
        type: String,
        default: ''
      },
      // 自定义样式
      customStyle: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      customAnchorStyle() {
        return Object.assign(this.anchorStyle, this.customStyle)
      }
    },
    data() {
      return {
        elId: this.$t.uuid(),
        // 内容的高度
        height: 0,
        // 内容的top
        top: 0,
        // 是否被激活
        active: false,
        // 样式（父组件外部提供）
        wrapperStyle: {},
        anchorStyle: {}
      }
    },
    created() {
      this.parent = false
    },
    mounted() {
      this.parent = this.$t.$parent.call(this, 'tn-index-list')
      if (this.parent) {
        this.parent.childrens.push(this)
        this.parent.updateData()
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-index-anchor {
    width: 100%;
    box-sizing: border-box;
    padding: 8rpx 24rpx;
    color: $tn-font-color;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 1.2;
    background-color: rgb(245, 245, 245);
    
    &--active {
      right: 0;
      left: 0;
      color: $tn-main-color;
      background-color: #FFFFFF;
    }
  }
</style>
