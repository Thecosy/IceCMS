<template>
  <view
    v-if="visibleSync"
    class="tn-popup-class tn-popup"
    :style="[customStyle, popupStyle, { zIndex: elZIndex - 1}]"
    hover-stop-propagation
  >
    <!-- mask -->
    <view
      class="tn-popup__mask"
      :class="[{'tn-popup__mask--show': showPopup && mask}]"
      :style="{zIndex: elZIndex - 2}"
      @tap="maskClick"
      @touchmove.stop.prevent = "() => {}"
      hover-stop-propagation
    ></view>
    <!-- 弹框内容 -->
    <view
      class="tn-popup__content"
      :class="[
        mode !== 'center' ? backgroundColorClass : '',
        safeAreaInsetBottom ? 'tn-safe-area-inset-bottom' : '',
        'tn-popup--' + mode,
        showPopup ? 'tn-popup__content--visible' : '',
        zoom && mode === 'center' ? 'tn-popup__content__center--animation-zoom' : ''
      ]"
      :style="[contentStyle]"
      @tap="modeCenterClose"
      @touchmove.stop.prevent
      @tap.stop.prevent
    >
      <!-- 居中时候的内容 -->
      <view
        v-if="mode === 'center'"
        class="tn-popup__content__center_box"
        :class="[backgroundColorClass]"
        :style="[centerStyle]"
        @touchmove.stop.prevent
        @tap.stop.prevent
      >
        <!-- 关闭按钮 -->
        <view
          v-if="closeBtn"
          class="tn-popup__close"
          :class="[`tn-icon-${closeBtnIcon}`, `tn-popup__close--${closeBtnPosition}`]"
          :style="[closeBtnStyle, {zIndex: elZIndex}]"
          @tap="close"
        ></view>
        <scroll-view class="tn-popup__content__scroll-view">
          <slot></slot>
        </scroll-view>
      </view>
      
      <!-- 除居中外的其他情况 -->
      <scroll-view v-else class="tn-popup__content__scroll-view">
        <slot></slot>
      </scroll-view>
      <!-- 关闭按钮 -->
      <view
        v-if="mode !== 'center' && closeBtn"
        class="tn-popup__close"
        :class="[`tn-popup__close--${closeBtnPosition}`]"
        :style="{zIndex: elZIndex}"
        @tap="close"
      >
        <view :class="[`tn-icon-${closeBtnIcon}`]" :style="[closeBtnStyle]"></view>
      </view>
    </view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    mixins: [componentsColorMixin],
    name: 'tn-popup',
    props: {
      value: {
      	type: Boolean,
      	default: false
      },
      // 弹出方向
      // left/right/top/bottom/center
      mode: {
        type: String,
        default: 'left'
      },
      // 是否显示遮罩
      mask: {
        type: Boolean,
        default: true
      },
      // 抽屉的宽度（mode=left/right）,高度（mode=top/bottom）
      length: {
        type: [Number, String],
        default: 'auto'
      },
      // 宽度，只对左，右，中部弹出时起作用，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
      width: {
      	type: String,
      	default: ''
      },
      // 高度，只对上，下，中部弹出时起作用，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
      height: {
      	type: String,
      	default: ''
      },
      // 是否开启动画，只在mode=center有效
      zoom: {
        type: Boolean,
        default: true
      },
      // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
      	type: Boolean,
      	default: false
      },
      // 是否可以通过点击遮罩进行关闭
      maskCloseable: {
      	type: Boolean,
      	default: true
      },
      // 用户自定义样式
      customStyle: {
      	type: Object,
      	default() {
      		return {}
      	}
      },
      // 显示圆角的大小
      borderRadius: {
        type: Number,
        default: 0
      },
      // zIndex
      zIndex: {
        type: Number,
        default: 0
      },
      // 是否显示关闭按钮
      closeBtn: {
        type: Boolean,
        default: false
      },
      // 关闭按钮的图标
      closeBtnIcon: {
        type: String,
        default: 'close'
      },
      // 关闭按钮显示的位置
      // top-left/top-right/bottom-left/bottom-right
      closeBtnPosition: {
        type: String,
        default: 'top-right'
      },
      // 关闭按钮图标颜色
      closeIconColor: {
        type: String,
        default: '#AAAAAA'
      },
      // 关闭按钮图标的大小
      closeIconSize: {
        type: Number,
        default: 30
      },
      // 给一个负的margin-top，往上偏移，避免和键盘重合的情况，仅在mode=center时有效
      negativeTop: {
      	type: Number,
      	default: 0
      },
      // marginTop，在mode = top,left,right时生效，避免用户使用了自定义导航栏，组件把导航栏遮挡了
      marginTop: {
        type: Number,
        default: 0
      },
      // 此为内部参数，不在文档对外使用，为了解决Picker和keyboard等融合了弹窗的组件
      // 对v-model双向绑定多层调用造成报错不能修改props值的问题
      popup: {
      	type: Boolean,
      	default: true
      },
    },
    computed: {
      // 处理使用了自定义导航栏时被遮挡的问题
      popupStyle() {
        let style = {}
        if ((this.mode === 'top' || this.mode === 'left' || this.mode === 'right') && this.marginTop) {
          style.marginTop = this.$t.string.getLengthUnitValue(this.marginTop, 'px')
        }
        
        return style
      },
      // 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
      contentStyle() {
        let style = {}
        // 如果是左边或者上边弹出时，需要给translate设置为负值，用于隐藏
        if (this.mode === 'left' || this.mode === 'right') {
          style = {
            width: this.width ? this.$t.string.getLengthUnitValue(this.width) : this.$t.string.getLengthUnitValue(this.length),
            height: '100%',
            transform: `translate3D(${this.mode === 'left' ? '-100%' : '100%'}, 0px, 0px)`
          }
        } else if (this.mode === 'top' || this.mode === 'bottom') {
          style = {
            width: '100%',
            height: this.height ? this.$t.string.getLengthUnitValue(this.height) : this.$t.string.getLengthUnitValue(this.length),
            transform: `translate3D(0px, ${this.mode === 'top' ? '-100%': '100%'}, 0px)`
          }
        }
        style.zIndex = this.elZIndex
        // 如果设置了圆角的值，添加弹窗的圆角
        if (this.borderRadius) {
          switch(this.mode) {
            case 'left':
              style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`
              break
            case 'top':
              style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`
              break
            case 'right':
              style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`
              break
            case 'bottom':
              style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`
              break
          }
          style.overflow = 'hidden'
        }
        
        if (this.backgroundColorStyle && this.mode !== 'center') {
          style.backgroundColor = this.backgroundColorStyle
        }
        
        return style
      },
      // 中部弹窗的样式
      centerStyle() {
        let style = {}
        style.width = this.width ? this.$t.string.getLengthUnitValue(this.width) : this.$t.string.getLengthUnitValue(this.length)
        // 中部弹出的模式，如果没有设置高度，就用auto值，由内容撑开
        style.height = this.height ? this.$t.string.getLengthUnitValue(this.height) : 'auto'
        style.zIndex = this.elZIndex
        if (this.negativeTop) {
          style.marginTop = `-${this.$t.string.getLengthUnitValue(this.negativeTop)}`
        }
        if (this.borderRadius) {
          style.borderRadius = `${this.borderRadius}rpx`
          style.overflow='hidden'
        }
        if (this.backgroundColorStyle) {
          style.backgroundColor = this.backgroundColorStyle
        }
        return style
      },
      // 关闭按钮样式
      closeBtnStyle() {
        let style = {}
        if (this.closeIconColor) {
          style.color = this.closeIconColor
        }
        if (this.closeIconSize) {
          style.fontSize = this.closeIconSize + 'rpx'
        }
        
        return style
      },
      elZIndex() {
        return this.zIndex ? this.zIndex : this.$t.zIndex.popup
      }
    },
    data() {
      return {
        timer: null,
        visibleSync: false,
        showPopup: false,
        closeFromInner: false
      }
    },
    watch: {
      value(val) {
        if (val) {
          // console.log(this.visibleSync);
          if (this.visibleSync) {
            this.visibleSync = false
            return
          }
          this.open()
        } else if (!this.closeFromInner) {
          this.close()
        }
        this.closeFromInner = false
      }
    },
    mounted() {
      // 组件渲染完成时，检查value是否为true，如果是，弹出popup
      this.value && this.open()
    },
    methods: {
      // 点击遮罩
      maskClick() {
        if (!this.maskCloseable) return
        this.close()
      },
      open() {
        this.change('visibleSync', 'showPopup', true)
      },
      // 关闭弹框
      close() {
        // 标记关闭是内部发生的，否则修改了value值，导致watch中对value检测，导致再执行一遍close
        // 造成@close事件触发两次
        this.closeFromInner = true
        this.change('showPopup', 'visibleSync', false)
      },
      // 中部弹出时，需要.tn-drawer-content将内容居中，此元素会铺满屏幕，点击需要关闭弹窗
      // 让其只在mode=center时起作用 
      modeCenterClose() {
        if (this.mode != 'center' || !this.maskCloseable) return
        this.close()
      },
      // 关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
      // 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
      change(param1, param2, status) {
        // 如果this.popup为false，意味着为picker，actionsheet等组件调用了popup组件
        if (this.popup === true) {
          this.$emit('input', status)
        }
        this[param1] = status
        if (status) {
          // #ifdef H5 || MP
          this.timer = setTimeout(() => {
            this[param2] = status
            this.$emit(status ? 'open' : 'close')
            clearTimeout(this.timer)
          }, 10)
          // #endif
          // #ifndef H5 || MP
          this.$nextTick(() => {
            this[param2] = status
            this.$emit(status ? 'open' : 'close')
          })
          // #endif
        } else {
          this.timer = setTimeout(() => {
            this[param2] = status
            this.$emit(status ? 'open' : 'close')
            clearTimeout(this.timer)
          }, 250)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-popup {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    
    &__content {
      /* #ifndef APP-NVUE */
      display: block;
      /* #endif */
      position: absolute;
      transition: all 0.25s linear;
      
      &--visible {
        transform: translate3D(0px, 0px, 0px) !important;
        &.tn-popup--center {
          transform: scale(1);
          opacity: 1;
        }
      }
      
      &__center_box {
        min-width: 100rpx;
        min-height: 100rpx;
        /* #ifndef APP-NVUE */
        display: block;
        /* #endif */
        position: relative;
        background-color: #FFFFFF;
      }
      
      &__scroll-view {
        width: 100%;
        height: 100%;
      }
      
      &__center--animation-zoom {
        transform: scale(1.15);
      }
    }
    
    &__scroll_view {
      width: 100%;
      height: 100%;
    }
    
    &--left {
      top: 0;
      bottom: 0;
      left: 0;
      background-color: #FFFFFF;
    }
    
    &--right {
      top: 0;
      bottom: 0;
      right: 0;
      background-color: #FFFFFF;
    }
    
    &--top {
      left: 0;
      right: 0;
      top: 0;
      background-color: #FFFFFF;
    }
    
    &--bottom {
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #FFFFFF;
    }
    
    &--center {
      display: flex;
      flex-direction: column;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      justify-content: center;
      align-items: center;
      opacity: 0;
    }
    
    &__close {
      position: absolute;
      
      &--top-left {
        top: 30rpx;
        left: 30rpx;
      }
      
      &--top-right {
        top: 30rpx;
        right: 30rpx;
      }
      
      &--bottom-left {
        bottom: 30rpx;
        left: 30rpx;
      }
      
      &--bottom-right {
        bottom: 30rpx;
        right: 30rpx;
      }
    }
    
    &__mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      border: 0;
      background-color: $tn-mask-bg-color;
      transition: 0.25s linear;
      transition-property: opacity;
      opacity: 0;
      
      &--show {
        opacity: 1;
      }
    }
  }
</style>
