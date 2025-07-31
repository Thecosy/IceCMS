<template>
  <view
    v-if="visibleSync"
    class="tn-tips-class tn-tips"
    :class="[tipsClass]"
    :style="[tipsStyle]"
  >
    <view
      class="tn-tips__content"
      :class="[
        backgroundColorClass,
        fontColorClass
      ]"
      :style="{
        backgroundColor: backgroundColorStyle,
        color: fontColorStyle
      }"
    >{{ msg }}</view>
  </view>
</template>

<script>
  
  export default {
    name: 'tn-tips',
    props: {
      // 层级
      zIndex: {
        type: Number,
        default: 0
      },
      // 提示框显示位置 top center bottom
      position: {
        type: String,
        default: 'top'
      },
      // 当位置设置为top的时候，设置距离顶部的距离
      top: {
        type: Number,
        default: 0
      }
    },
    computed: {
      tipsClass() {
        let clazz = ''
        switch (this.position) {
          case 'top':
            clazz += ' tn-tips--top'
            break
          case 'center':
            clazz += ' tn-tips--center'
            break
          case 'bottom':
            clazz += ' tn-tips--bottom'
            break
          default:
            clazz += ' tn-tips--top'
        }
        if (this.showTips) {
          clazz += ' tn-tips--show'
        }
        
        return clazz
      },
      tipsStyle() {
        let style = {}
        if ((this.position === 'top' || this.position === '') && this.top) {
          style.top = this.top + 'px'
        }
        style.zIndex = (this.zIndex ? this.zIndex : this.$t.zIndex.tips) + 1
        
        return style
      },
      backgroundColorStyle() {
        return this.$t.color.getBackgroundColorStyle(this.backgroundColor)
      },
      backgroundColorClass() {
        return this.$t.color.getBackgroundColorInternalClass(this.backgroundColor)
      },
      fontColorStyle() {
        return this.$t.color.getFontColorStyle(this.fontColor)
      },
      fontColorClass() {
        return this.$t.color.getFontColorInternalClass(this.fontColor)
      },
    },
    data() {
      return {
        //关闭提示框定时器
        timer: null,
        // 是否渲染组件
        visibleSync: false,
        // 是否显示内容
        showTips: false,
        // 提示信息
        msg: '',
        // 背景颜色
        backgroundColor: '',
        // 字体颜色
        fontColor: ''
      }
    },
    methods: {
      show(options = {}) {
        const {
          duration = 2000,
          msg = '',
          backgroundColor = '',
          fontColor = ''
        } = options
        
        if (this.timer !== null) clearTimeout(this.timer)
        
        // 如果没有设置内容则不弹出
        if (!msg) {
          this._clearOptions()
          this.$emit('close')
          return
        }
        
        this.msg = msg
        this.backgroundColor = backgroundColor || '#01BEFF'
        this.fontColor = fontColor || '#FFFFFF'
        
        this.change('visibleSync', 'showTips', true)
        
        this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          this.timer = null
          this.change('showTips', 'visibleSync', false)
        }, duration)
      },
      
      // 关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
      // 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
      change(param1, param2, status) {
        this[param1] = status
        if (status) {
          // #ifdef H5 || MP
          this.timer = setTimeout(() => {
            this[param2] = status
            this.$emit(status ? 'open' : 'close')
          }, 50)
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
            this._clearOptions()
          }, 300)
        }
      },
      
      // 清除传递的参数
      _clearOptions() {
        this.msg = ''
        this.backgroundColor = ''
        this.fontColor = ''
      },
    }
  }
</script>

<style lang="scss" scoped>
  
  /*注意问题：
   1、fixed 元素宽度无法自适应，所以增加了子元素
   2、fixed 和 display冲突导致动画效果消失，暂时使用visibility替代
  */
  .tn-tips {
    height: auto;
    position: fixed;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    
    &__content {
      word-wrap: break-word;
      word-break: break-all;
      width: 100%;
      height: auto;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.7);
      color: #FFFFFF;
    }
    
    &--top {
      width: 100% !important;
      /* padding: 18rpx 30rpx; */
      top: 0;
      left: 0;
      transform: translateY(-100%) translateZ(0);
      word-break: break-all;
    }
    
    &--center {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    
    &--bottom {
      bottom: 120rpx;
      left: 50%;
      transform: translateX(-50%);
    }
    
    &--center, &--bottom {
      .content {
        border-radius: 8rpx;
        padding: 0;
      }
    }
    
    &--center, &--bottom {
      .tn-tips__content {
        padding: 18rpx 30rpx !important;
      }
    }
    
    &--show {
      opacity: 1;
      
      &.tn-tips--top {
        transform: translateY(0) translateZ(0) !important;
      }
    }
    
  }
  
</style>
