<template>
  <view>
    <view class="tn-read-more-class tn-read-more">
      <!-- 内容 -->
      <view
        :id="elId"
        class="tn-read-more__content"
        :style="[contentStyle]"
      >
        <slot></slot>
      </view>
      
      <!-- 展开收起按钮 -->
      <view
        v-if="isLongContent"
        class="tn-read-more__show-more__wrap"
        :class="{'tn-read-more__show-more': showMore}"
        :style="[innerShadowStyle]"
        @tap="toggleReadMore">
        <text class="tn-read-more__show-more--text" :style="[fontStyle]">{{ showMore ? closeText : openText }}</text>
        <view class="tn-read-more__show-more--icon">
          <view :class="[tipIconClass]" :style="[fontStyle]"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-read-more',
    mixins: [componentsColorMixin],
    props: {
      // 默认占位高度
      showHeight: {
        type: Number,
        default: 400
      },
      // 显示收起按钮
      closeBtn: {
        type: Boolean,
        default: false
      },
      // 展开提示文字
      openText: {
        type: String,
        default: '展开阅读全文'
      },
      // 收起提示文字
      closeText: {
        type: String,
        default: '收起'
      },
      // 展开提示图标
      openIcon: {
        type: String,
        default: 'down'
      },
      // 收起提示图标
      closeIcon: {
        type: String,
        default: 'up'
      },
      // 阴影样式
      shadowStyle: {
        type: Object,
        default () {
        	return {
        		backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
        		paddingTop: "300rpx",
        		marginTop: "-300rpx"
        	}
        }
      },
      // 组件标识
      index: {
        type: [Number, String],
        default: ''
      }
    },
    computed: {
      paramsChange() {
        return `${this.open}-${this.showHeight}`
      },
      contentStyle() {
        let style = {}
        if (this.isLongContent && !this.showMore) {
          style.height = `${this.showHeight}rpx`
        } else {
          if (!this.initHeight) {
            style.height = 'auto'
          } else {
            style.height = `${this.contentHeight}px`
          }
        }
        
        return style
      },
      innerShadowStyle() {
        let style = {}
        // 折叠时才需要阴影样式
        if (!this.showMore) {
          style = Object.assign(style, this.shadowStyle)
        }
        
        return style
      },
      fontStyle() {
        let style = {}
        style.color = this.fontColorStyle ? this.fontColorStyle : '#01BEFF'
        style.fontSize = this.fontSizeStyle ? this.fontSizeStyle : '28rpx'
        
        return style
      },
      tipIconClass() {
        if (this.showMore) {
          if (this.closeIcon) {
            return `tn-icon-${this.closeIcon}`
          }
        } else {
          if (this.openIcon) {
            return `tn-icon-${this.openIcon}`
          }
        }
      }
    },
    data() {
      return {
        elId: this.$t.uuid(),
        // 标记是否已经初始化高度完成
        initHeight: false,
        // 是否需要隐藏一部分内容
        isLongContent: false,
        // 当前展开的打开、关闭状态
        showMore: false,
        // 内容的高度
        contentHeight: 0
      }
    },
    watch: {
      paramsChange(value) {
        this.initHeight = false
        this.isLongContent = false
        this.showMore = true
        this.$nextTick(() => {
          this.init()
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      // 初始化组件
      init() {
        // 判断高度，如果真实内容的高度大于占位高度，则显示展开与收起的控制按钮
        this._tGetRect('#' + this.elId).then(res => {
          this.contentHeight = res.height
          this.initHeight = true
          if (res.height > uni.upx2px(this.showHeight)) {
            this.isLongContent = true
            this.showMore = false
          }
        })
      },
      // 展开或者收起内容
      toggleReadMore() {
        this.showMore = !this.showMore
        // 是否显示收起按钮
        if (!this.closeBtn) this.isLongContent = false
        
        this.$emit(this.showMore ? 'open' : 'closed', this.index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-read-more {
    
    &__content {
      font-size: 28rpx;
      color: $tn-font-color;
      line-height: 1.8;
      text-align: left;
      overflow: hidden;
      transition: all 0.3s linear;
    }
    
    &__show-more {
      padding-top: 0;
      background: none;
      margin-top: 20rpx;
      
      &__wrap {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-bottom: 26rpx;
      }
      
      &--text {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
      
      &--icon {
        margin-left: 14rpx;
      }
    }
  }
</style>
