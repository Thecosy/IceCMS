<template>
  <view v-if="visible">
    <view
      class="tn-toast-class tn-toast"
      :class="[toastClass]"
      :style="[toastStyle]"
    >
      <image v-if="image" :src="image" class="tn-toast__img" :class="{'tn-margin-bottom-sm': title || content}"></image>
      <view v-if="icon" class="tn-toast__icon">
        <view :class="['tn-icon-' + icon]"></view>
      </view>
      <view
        v-if="title"
        class="tn-toast__text"
        :class="[haveIcon || haveContent ? '' : 'tn-toast--unicon']"
      >{{ title }}</view>
      <view
        v-if="haveContent"
        class="tn-toast__text tn-toast__content"
      >{{ content }}</view>
    </view>
    
    <view class="tn-toast__mask" :class="[visible ? 'tn-toast__mask--show' : '']" :style="[maskStyle]"></view>
  </view>
</template>

<script>
  
  export default {
    name: 'tn-toast',
    props: {
      // 层级
      zIndex: {
        type: Number,
        default: 0
      }
    },
    computed: {
      toastClass() {
        let clazz = ''
        if (this.visible) {
          clazz += ' tn-toast--show'
        }
        
        if (this.content) {
          clazz += ' tn-toast--padding'
        }
        if (this.icon || this.image) {
          clazz += ' tn-toast--unicon'
        }
        
        return clazz
      },
      toastStyle() {
        let style = {}
        style.width = 'auto'
        if (this.icon || this.image) {
          // style.width = this.content ? '420rpx' : '360rpx'
        }

        style.zIndex = this.zIndex ? this.zIndex : this.$t.zIndex.toast
        
        return style
      },
      maskStyle() {
        let style = {}
        const zIndex = this.zIndex ? this.zIndex : this.$t.zIndex.toast
        style.zIndex = zIndex - 1
        return style
      },
      haveIcon() {
        return this.icon || this.image
      },
      haveContent() {
        return this.content
      }
    },
    data() {
      return {
        // 自动关闭定时器
        timer: null,
        // 是否显示
        visible: false,
        // 显示的标题
        title: '操作成功',
        // 显示的内容
        content: "",
        // 是否显示icon (icon库的图标)
        icon: '',
        // 是否显示图片 (图片地址)
        image: ''
      }
    },
    methods: {
      // 显示弹框
      show(options = {}) {
        const {
          duration = 2000,
          title = '',
          content = '',
          icon = '',
          image = ''
        } = options
        if (this.timer !== null ){
          clearTimeout(this.timer)
        }
        // 如果没有设置任何内容就不弹出
        if (!icon && !image && !title && !content) {
          this._clearOptions()
          this.$emit('closed')
          return
        }
        
        this.visible = true
        this.title = title
        this.content = content
        this.icon = icon
        if (!icon) {
          this.image = image
        }
        
        this.timer = setTimeout(() => {
          this.visible = false
          clearTimeout(this.timer)
          this.timer = null
          this._clearOptions()
          this.$emit('closed')
        }, duration)
      },
      
      
      // 清除传递的参数
      _clearOptions() {
        this.title = ''
        this.content = ''
        this.icon = ''
        this.image = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-toast {
    height: auto;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 10rpx;
    opacity: 0;
    position: fixed;
    left: 50%;
    top: 48%;
    transform: translate(-50%, -50%);
    transition: 0.3 ease-in-out;
    transition-property: opacity, visibility;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20rpx 20rpx 20rpx 20rpx;
    box-sizing: border-box;
    
    &--show {
      opacity: 1;
      
      &.tn-toast--padding {
        padding-top: 50rpx !important;
        padding-bottom: 50rpx !important;
      }
      
      &.tn-toast--unicon {
        padding: 20rpx 20rpx 20rpx 20rpx !important;
      }
    }
    
    &__img {
      width: 120rpx;
      height: 120rpx;
      display: block;
    }
    
    &__text {
      font-size: 28rpx;
      line-height: 28rpx;
      color: #ffffff;
      text-align: center;
    }
    
    &__icon {
      color: #FFFFFF;
      font-size: 64rpx;
    }
    
    &__content {
      padding-top: 10rpx;
      font-size: 24rpx !important;
    }
    
    &--unicon {
      padding: 0;
      word-break: break-all;
    }
    
    &--padding {
      padding: 10rpx;
    }
    
    &__mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      border: 0;
      background-color: rgba(0, 0, 0, 0);
      transition: 0.3s ease-in-out;
      transition-property: opacity;
      opacity: 0;
      
      &--show {
        height: 100%;
        opacity: 1;
      }
    }
  }
  
</style>
