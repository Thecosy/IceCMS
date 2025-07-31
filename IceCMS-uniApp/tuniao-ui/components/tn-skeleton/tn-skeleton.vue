<template>
  <view
    v-if="show"
    class="tn-skeleton-class tn-skeleton"
    :class="[backgroundColorClass]"
    :style="[skeletonStyle]"
    @touchmove.stop.prevent
  >
    <view
      v-for="(item, index) in rectNodes"
      :key="$t.uuid()"
      class="tn-skeleton__item tn-skeleton__item--rect"
      :class="[elBackgroundColorClass, {'tn-skeleton__item--fade': animation}]"
      :style="[itemStyle('rect', item)]"
    ></view>
    <view
      v-for="(item, index) in circleNodes"
      :key="$t.uuid()"
      class="tn-skeleton__item tn-skeleton__item--circle"
      :class="[elBackgroundColorClass, {'tn-skeleton__item--fade': animation}]"
      :style="[itemStyle('circle', item)]"
    ></view>
    <view
      v-for="(item, index) in filletNodes"
      :key="$t.uuid()"
      class="tn-skeleton__item tn-skeleton__item--fillet"
      :class="[elBackgroundColorClass, {'tn-skeleton__item--fade': animation}]"
      :style="[itemStyle('fillet', item)]"
    ></view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-skeleton',
    mixins: [ componentsColorMixin ],
    props: {
      // 显示骨架屏
      show: {
        type: Boolean,
        default: false
      },
      // 需要渲染的元素背景颜色
      elBackgroundColor: {
        type: String,
        default: ''
      },
      // 开启加载动画
      animation: {
        type: Boolean,
        default: true
      },
      // 矩形元素自定义样式
      rectCustomStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 圆形元素自定义样式
      circleCustomStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 圆角元素自定义样式
      filletCustomStyle: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      elBackgroundColorStyle() {
        return this.$t.color.getBackgroundColorStyle(this.elBackgroundColor)
      },
      elBackgroundColorClass() {
        return this.$t.color.getBackgroundColorInternalClass(this.elBackgroundColor)
      },
      // 骨架屏样式
      skeletonStyle() {
        let style = {}
        style.width = this.skeletonWidth + 'px'
        style.height = this.skeletonHeight + 'px'
        if (this.backgroundColorStyle) {
          style.backgroundColor = this.backgroundColorStyle
        }
        style.left = this.left + 'px'
        style.top = this.top + 'px'
        return style
      },
      // 元素样式
      itemStyle() {
        return (type, item) => {
          let style = {}
          style.width = item.width + 'px'
          style.height = item.height + 'px'
          if (this.elBackgroundColorStyle) {
            style.backgroundColor = this.elBackgroundColorStyle
          }
          style.left = (item.left - this.left) + 'px'
          style.top = (item.top - this.top) + 'px'
          if (type === 'rect') {
            Object.assign(style, this.rectCustomStyle)
          } else if (type === 'circle') {
            style.borderRadius = (item.width / 2) + 'px'
            Object.assign(style, this.circleCustomStyle)
          } else if (type === 'fillet') {
            Object.assign(style, this.filletCustomStyle)
          }
          return style
        }
      }
    },
    data() {
      return {
        // 骨架屏宽度
        skeletonWidth: 750,
        // 骨架屏高度
        skeletonHeight: 1500,
        // 圆角元素
        filletNodes: [],
        // 圆形元素
        circleNodes: [],
        // 矩形元素
        rectNodes: [],
        // 元素偏移位置
        top: 0,
        left: 0
      }
    },
    mounted() {
      this.$nextTick(() => {
        // 获取系统信息
        const systemInfo = uni.getSystemInfoSync()
        this.skeletonWidth = systemInfo.safeArea.width
        this.skeletonHeight = systemInfo.safeArea.height
        this.selectQueryInfo()
      })
    },
    methods: {
      // 查询节点信息
      selectQueryInfo() {
        // 获取整个父容器的宽高作为骨架屏的宽高
        // 在微信小程序中，如果把骨架屏放入组件使用，需要in(this)上下文为父组件才有效
        let query = null
        // 在微信小程序中，如果把骨架屏放入组件使用，需要in(this)上下文为父组件才有效
        // #ifdef MP-WEIXIN
        query = uni.createSelectorQuery().in(this.$parent)
        // #endif
        // #ifndef MP-WEIXIN
        query = uni.createSelectorQuery()
        // #endif
        query.selectAll('.tn-skeleton').boundingClientRect().exec((res) => {
          console.log(res);
          this.skeletonWidth = res[0][0].width
          this.skeletonHeight = res[0][0].height
          this.top = res[0][0].bottom - res[0][0].height
          this.left = res[0][0].left
        })
        
        // 获取元素列表
        this.getRectElements()
        this.getCircleElements()
        this.getFillteElements()
      },
      // 矩形元素列表
      getRectElements() {
        let query = null
        // 在微信小程序中，如果把骨架屏放入组件使用，需要in(this)上下文为父组件才有效
        // #ifdef MP-WEIXIN
        query = uni.createSelectorQuery().in(this.$parent)
        // #endif
        // #ifndef MP-WEIXIN
        query = uni.createSelectorQuery()
        // #endif
        query.selectAll('.tn-skeleton-rect').boundingClientRect().exec((res) => {
          this.rectNodes = res[0]
        })
      },
      // 圆形元素列表
      getCircleElements() {
        let query = null
        // 在微信小程序中，如果把骨架屏放入组件使用，需要in(this)上下文为父组件才有效
        // #ifdef MP-WEIXIN
        query = uni.createSelectorQuery().in(this.$parent)
        // #endif
        // #ifndef MP-WEIXIN
        query = uni.createSelectorQuery()
        // #endif
        query.selectAll('.tn-skeleton-circle').boundingClientRect().exec((res) => {
          this.circleNodes = res[0]
        })
      },
      // 圆角元素列表
      getFillteElements() {
        let query = null
        // 在微信小程序中，如果把骨架屏放入组件使用，需要in(this)上下文为父组件才有效
        // #ifdef MP-WEIXIN
        query = uni.createSelectorQuery().in(this.$parent)
        // #endif
        // #ifndef MP-WEIXIN
        query = uni.createSelectorQuery()
        // #endif
        query.selectAll('.tn-skeleton-fillet').boundingClientRect().exec((res) => {
          this.filletNodes = res[0]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-skeleton {
    position: absolute;
    z-index: 9998;
    overflow: hidden;
    background-color: #FFFFFF;
    
    &__item {
      position: absolute;
      background-color: #F0F0F0;
      
      &--fillet {
        border-radius: 10rpx;
      }
      
      &--fade {
        width: 100%;
        height: 100%;
        background-color: #E6E6E6;
        animation-duration: 1.5s;
        animation-name: blink;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }
    }
  }
  
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
</style>
