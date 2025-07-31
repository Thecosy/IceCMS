<template>
  <view class="tn-load-more-class tn-load-more">
    <view
      class="tn-load-more__wrap"
      :class="[backgroundColorClass]"
      :style="[loadStyle]"
    >
      <view class="tn-load-more__line"></view>
      <view
        class="tn-load-more__content"
        :class="[{'tn-load-more__content--more': (status === 'loadmore' || status === 'nomore')}]"
      >
        <view class="tn-load-more__loading">
          <tn-loading
            class="tn-load-more__loading__icon"
            :mode="loadingIconType"
            :show="status === 'loading' && loadingIcon"
            :color="loadingIconColor"
          ></tn-loading>
        </view>
        <view
          class="tn-load-more__text"
          :class="[fontColorClass, {'tn-load-more__text--dot': (status === 'nomore' && dot)}]"
          :style="[loadTextStyle]"
        >{{ showText }}</view>
      </view>
      <view class="tn-load-more__line"></view>
    </view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-load-more',
    mixins: [componentsColorMixin],
    props: {
      // 加载状态
      // loadmore -> 加载更多
      // loading -> 加载中
      // nomore -> 没有更多
      status: {
        type: String,
        default: 'loadmore'
      },
      // 显示加载图标
      loadingIcon: {
        type: Boolean,
        default: true
      },
      // 加载图标样式，参考tn-loading组件的加载类型
      loadingIconType: {
        type: String,
        default: 'circle'
      },
      // 在圆圈加载状态下，圆圈的颜色
      loadingIconColor: {
        type: String,
        default: ''
      },
      // 显示的文字
      loadText: {
        type: Object,
        default() {
          return {
            loadmore: '加载更多',
            loading: '正在加载...',
            nomore: '没有更多了'
          }
        }
      },
      // 是否显示粗点，在nomore状态下生效
      dot: {
        type: Boolean,
        default: false
      },
      // 自定义组件样式
      customStyle: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      loadStyle() {
        let style = {}
        if (this.backgroundColorStyle) {
          style.backgroundColor = this.backgroundColorStyle
        }
        // 合并用户自定义样式
        if (Object.keys(this.customStyle).length > 0) {
          Object.assign(style, this.customStyle)
        }
        return style
      },
      loadTextStyle() {
        let style = {}
        if (this.fontColorStyle) {
          style.color = this.fontColorStyle
        }
        if (this.fontSizeStyle) {
          style.fontSize = this.fontSizeStyle
          style.lineHeight = this.$t.string.getLengthUnitValue(this.fontSize + 2, this.fontUnit)
        }
        return style
      },
      // 显示的提示文字
      showText() {
        let text = ''
        if (this.status === 'loadmore') text = this.loadText.loadmore || '加载更多'
        else if (this.status === 'loading') text = this.loadText.loading || '正在加载...'
        else if (this.status === 'nomore' && this.dot) text = this.dotText
        else text = this.loadText.nomore || '没有更多了'
        
        return text
      }
    },
    data() {
      return {
        // 粗点
        dotText: '●'
      }
    },
    methods: {
      // 处理加载更多事件
      loadMore() {
        // 只有在 loadmore 状态下点击才会发送点击事件，内容不满一屏时无法触发底部上拉事件，所以需要点击来触发
        if (this.status === 'loadmore') this.$emit('loadmore')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-load-more {
    
    &__wrap {
      background-color: transparent;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: $tn-content-color;
    }
    
    &__line {
      vertical-align: middle;
      border: 1px solid $tn-content-color;
      width: 50rpx;
      transform: scaleY(0.5);
    }
    
    &__content {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 0 12rpx;
      
      &--more {
        position: relative;
      }
    }
    
    &__loading {
      margin-right: 8rpx;
      
      &__icon {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
    
    &__text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 30rpx;
      
      &--dot {
        font-size: 28rpx;
      }
    }
  }
</style>
