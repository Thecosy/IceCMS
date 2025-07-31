<template>
  <view
    class="tn-avatar-class tn-avatar"
    :class="[backgroundColorClass,avatarClass]"
    :style="[avatarStyle]"
    @tap="click"
  >
    <image
      v-if="showImg"
      class="tn-avatar__img"
      :class="[imgClass]"
      :src="src"
      :mode="imgMode || 'aspectFill'"
      @error="loadImageError"
    ></image>
    <view v-else class="tn-avatar__text" >
      <view v-if="text">{{ text }}</view>
      <view v-else :class="[`tn-icon-${icon}`]"></view>
    </view>
    
    <!-- 角标 -->
    <tn-badge
      v-if="badge && (badgeIcon || badgeText)"
      :radius="badgeSize"
      :backgroundColor="badgeBgColor"
      :fontColor="badgeColor"
      :fontSize="badgeSize - 8"
      :absolute="true"
      :top="badgePosition[0]"
      :right="badgePosition[1]"
    >
      <view v-if="badgeIcon && badgeText === ''">
        <view :class="[`tn-icon-${badgeIcon}`]"></view>
      </view>
      <view v-else>
        {{ badgeText }}
      </view>
    </tn-badge>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    mixins: [componentsColorMixin],
    name: 'tn-avatar',
    props: {
      // 序号
      index: {
        type: [Number, String],
        default: 0
      },
      // 头像类型
      // square 带圆角正方形 circle 圆形
      shape: {
        type: String,
        default: 'circle'
      },
      // 大小 
      // sm 小头像 lg 大头像 xl 加大头像
      // 如果为其他则认为是直接设置大小
      size: {
        type: [Number, String],
        default: ''
      },
      // 是否显示阴影
      shadow: {
        type: Boolean,
        default: false
      },
      // 是否显示边框
      border: {
        type: Boolean,
        default: false
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.1)'
      },
      // 边框大小, rpx
      borderSize: {
        type: Number,
        default: 2
      },
      // 头像路径
      src: {
        type: String,
        default: ''
      },
      // 文字
      text: {
        type: String,
        default: ''
      },
      // 图标
      icon: {
        type: String,
        default: ''
      },
      // 当设置为显示头像信息时，
      // 图片的裁剪模式
      imgMode: {
        type: String,
        default: 'aspectFill'
      },
      // 是否显示角标
      badge: {
        type: Boolean,
        default: false
      },
      // 设置显示角标后，角标大小
      badgeSize: {
        type: Number,
        default: 0
      },
      // 角标背景颜色
      badgeBgColor: {
        type: String,
        default: '#AAAAAA'
      },
      // 角标字体颜色
      badgeColor: {
        type: String,
        default: '#FFFFFF'
      },
      // 角标图标
      badgeIcon: {
        type: String,
        default: ''
      },
      // 角标文字，优先级比icon高
      badgeText: {
        type: String,
        default: ''
      },
      // 角标坐标
      // [top, right]
      badgePosition: {
        type: Array,
        default() {
          return [0, 0]
        }
      }
    },
    data() {
      return {
        // 图片显示是否发生错误
        imgLoadError: false
      }
    },
    computed: {
      showImg() {
        // 如果设置了图片地址，则为显示图片，否则为显示文本
        return this.text === '' && this.icon === ''
      },
      avatarClass() {
        let clazz = ''
        clazz += ` tn-avatar--${this.shape}`
        
        if (this._checkSizeIsInline()) {
          clazz += ` tn-avatar--${this.size}`
        }
        
        if (this.shadow) {
          clazz += ' tn-avatar--shadow'
        }
        
        return clazz
      },
      avatarStyle() {
        let style = {}
        
        if (this.backgroundColorStyle) {
          style.background = this.backgroundColorStyle
        } else if (this.shadow && this.showImg) {
          style.backgroundImage = `url(${this.src})`
        }
        
        if (this.border) {
          style.border = `${this.borderSize}rpx solid ${this.borderColor}`
        }
        
        if (!this._checkSizeIsInline()) {
          style.width = this.size
          style.height = this.size
        }
        
        return style
      },
      imgClass() {
        let clazz = ''
        clazz += ` tn-avatar__img--${this.shape}`
        
        return clazz
      }
    },
    methods: {
      // 加载图片失败
      loadImageError() {
        this.imgLoadError = true
      },
      // 点击事件
      click() {
        this.$emit("click", this.index)
      },
      
      // 检查是否使用内置的大小进行设置
      _checkSizeIsInline() {
        if (/^(xs|sm|md|lg|xl|xxl)$/.test(this.size)) return true
        else return false
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-avatar {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    margin: 0;
    padding: 0;
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color: $tn-font-holder-color;
    // color: #FFFFFF;
    white-space: nowrap;
    position: relative;
    width: 64rpx;
    height: 64rpx;
    z-index: 1;
    
    &--sm {
      width: 48rpx;
      height: 48rpx;
    }
    &--lg {
      width: 96rpx;
      height: 96rpx;
    }
    &--xl {
      width: 128rpx;
      height: 128rpx;
    }
    
    &--square {
      border-radius: 10rpx;
    }
    
    &--circle {
      border-radius: 5000rpx;
    }
    
    &--shadow {
      position: relative;
      
      &::after {
        content: " ";
        display: block;
        background: inherit;
        filter: blur(10rpx);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 10rpx;
        left: 10rpx;
        z-index: -1;
        opacity: 0.4;
        transform-origin: 0 0;
        border-radius: inherit;
        transform: scale(1, 1);
      }
    }
    
    &__img {
      width: 100%;
      height: 100%;
      
      &--square {
        border-radius: 10rpx;
      }
      
      &--circle {
        border-radius: 5000rpx;
      }
    }
    
    &__text {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
</style>
