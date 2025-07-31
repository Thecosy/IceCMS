<template>
  <view class="tn-fab-class tn-fab" @touchmove.stop.prevent>
    <view
      class="tn-fab__box"
      :class="{'tn-fab--right': left === 'auto'}"
      :style="{
        left: $t.string.getLengthUnitValue(fabLeft || left),
        right: $t.string.getLengthUnitValue(fabRight || right),
        bottom: $t.string.getLengthUnitValue(fabBottom || bottom),
        zIndex: elZIndex
      }"
    >
      <view
        v-if="visibleSync"
        class="tn-fab__btns"
        :class="[`tn-fab__btns__animation--${animationType}`, 
          showFab ? `tn-fab__btns--visible--${animationType}` : ''
        ]"
      >
        <view
          v-for="(item, index) in btnList"
          :key="index"
          class="tn-fab__item"
          :class="[
            `tn-fab__item__animation--${animationType}`, 
            {'tn-fab__item--left': right === 'auto'}
          ]"
          :style="[fabItemStyle(index)]"
          @tap.stop="handleClick(index)"
        >
          <!-- 带图标或者图片时显示的文字信息 -->
          <view
            v-if="animationType !== 'around' && (item.imgUrl || item.icon)"
            :class="[left === 'auto' ? 'tn-fab__item__text--right' : 'tn-fab__item__text--left']"
            :style="{
              color: item.textColor || '#FFF',
              fontSize: $t.string.getLengthUnitValue(item.textSize || 28)
            }"
          >{{ item.text || '' }}</view>
          
          <!-- 带图片或者图标时的图片、图标信息 -->
          <view
            class="tn-fab__item__btn"
            :class="[!item.bgColor ? backgroundColorClass : '']"
            :style="{
              width: $t.string.getLengthUnitValue(width),
              height: $t.string.getLengthUnitValue(height),
              lineHeight: $t.string.getLengthUnitValue(height),
              backgroundColor: item.bgColor || backgroundColorStyle || '#01BEFF',
              borderRadius: $t.string.getLengthUnitValue(radius)
            }"
          >
            <!-- 无图片和无图标时只显示文字 -->
            <view
              v-if="!item.imgUrl && !item.icon"
              class="tn-fab__item__btn__title"
              :style="{
                color: item.textColor || '#fff',
                fontSize: $t.string.getLengthUnitValue(item.textSize || 28)
              }"
            >{{ item.text || '' }}</view>
            <!-- 图标 -->
            <view
              v-if="item.icon"
              class="tn-fab__item__btn__icon"
              :class="[`tn-icon-${item.icon}`]"
              :style="{
                color: item.iconColor || '#fff',
                fontSize: $t.string.getLengthUnitValue(item.iconSize || iconSize || 64)
              }"
            ></view>
            <!-- 图片 -->
            <image
              v-else-if="!item.icon && item.imgUrl"
              class="tn-fab__item__btn__image"
              :style="{
                width: $t.string.getLengthUnitValue(item.imgWidth || 64),
                height: $t.string.getLengthUnitValue(item.imgHeight || 64),
              }"
              :src="item.imgUrl"
            ></image>
          </view>
        </view>
      </view>
      
      <view
        class="tn-fab__item__btn tn-fab__item__btn--fab"
        :class="[backgroundColorClass, fontColorClass, {'tn-fab__item__btn--active': showFab}]"
        :style="{
          width: $t.string.getLengthUnitValue(width),
          height: $t.string.getLengthUnitValue(height),
          backgroundColor: backgroundColorStyle || !backgroundColorClass ? '#01BEFF' : '',
          color: fontColorStyle || '#fff',
          borderRadius: $t.string.getLengthUnitValue(radius),
          zIndex: elZIndex - 1
        }"
        @tap.stop="fabClick"
      >
        <slot>
          <view class="tn-fab__item__btn__icon" :class="[`tn-icon-${icon}`]" :style="{fontSize: $t.string.getLengthUnitValue(iconSize || 64)}"></view>
        </slot>
      </view>
    </view>
    <view v-if="visibleSync && showMask" class="tn-fab__mask" :class="{'tn-fab__mask--visible': showFab}" :style="{zIndex: elZIndex - 3}" @tap="clickMask()"></view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-fab',
    mixins: [componentsColorMixin],
    props: {
      // 按钮列表
      // {
      //   // 背景颜色
      //   bgColor: '#fff',
      //   // 图片地址
      //   imgUrl: '',
      //   // 图片宽度
      //   imgWidth: 60,
      //   // 图片高度
      //   imgHeight: 60,
      //   // 图标名称
      //   icon: '',
      //   // 图标尺寸
      //   iconSize: 60,
      //   // 图标颜色
      //   iconColor: '#fff',
      //   // 提示文字
      //   text: '',
      //   // 文字大小
      //   textSize: 30,
      //   // 字体颜色
      //   textColor: '#fff'
      // }
      btnList: {
        type: Array,
        default() {
          return []
        }
      },
      // 自定义悬浮按钮内容
      customBtn: {
        type: Boolean,
        default: false
      },
      // 悬浮按钮的宽度
      width: {
        type: [String, Number],
        default: 88
      },
      // 悬浮按钮的高度
      height: {
        type: [String, Number],
        default: 88
      },
      // 图标大小
      iconSize: {
        type: [String, Number],
        default: 64
      },
      // 图标名称
      icon: {
        type: String,
        default: 'open'
      },
      // 按钮圆角
      radius: {
        type: [String, Number],
        default: '50%'
      },
      // 按钮距离左边的位置
      left: {
        type: [String, Number],
        default: 'auto'
      },
      // 按钮距离右边的位置
      right: {
        type: [String, Number],
        default: 'auto'
      },
      // 按钮距离底部的位置
      bottom: {
        type: [String, Number],
        default: 100
      },
      // 展示动画类型 up 往上展示 around 环绕
      animationType: {
        type: String,
        default: 'up'
      },
      // 当动画为圆环时，每个弹出按钮之间的距离, 单位px
      aroundBtnDistance: {
        type: Number,
        default: 10
      },
      zIndex: {
        type: Number,
        default: 0
      },
      // 显示遮罩
      showMask: {
        type: Boolean,
        default: true
      },
      // 点击遮罩是否可以关闭
      maskCloseable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        showFab: false,
        visibleSync: false,
        timer: null,
        fabLeft: 0,
        fabRight: 0,
        fabBottom: 0,
        fabBtnInfo: {
          width: 0,
          height: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        systemInfo: {
          width: 0,
          height: 0
        },
        updateProps: false
      }
    },
    computed: {
      elZIndex() {
        return this.zIndex || this.$t.zIndex.fab
      },
      propsData() {
        return [this.width, this.height, this.left, this.right, this.bottom]
      },
      fabItemStyle() {
        return (index) => {
          let style = {
            zIndex: this.elZIndex - 2
          }
          if (this.animationType === 'up' || !this.showFab) {
            return style
          }
          let base = 1 
          if (this.left === 'auto') {
            base = 1
          } else if (this.right === 'auto') {
            base = -1
          }
          style.transform = `rotate(${base * index * 60}deg) translateX(${(this.aroundBtnDistance + this.fabBtnInfo.width) * (-(base))}px)`
          return style
        }
      }
    },
    watch: {
      propsData() {
        // 更新按钮信息
        this.updateProps = true
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getFabBtnRectInfo()
      })
    },
    beforeDestroy() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    methods: {
      // 按钮点击事件
      handleClick(index) {
        this.close()
        this.$emit('click', {index: index})
      },
      // 点击悬浮按钮
      fabClick() {
        if (this.showFab) {
          this.close()
        } else {
          // console.log(this.visibleSync);
          if (this.visibleSync) {
            this.visibleSync = false
            return
          }
          this.open()
        }
      },
      // 点击遮罩
      clickMask() {
        if (!this.showMask || !this.maskCloseable) return
        this.close()
      },
      
      open() {
        this.change('visibleSync', 'showFab', true)
        this.translateFabPosition()
      },
      close() {
        this.change('showFab', 'visibleSync', false)
        this.fabLeft = 0
        this.fabRight = 0
        this.fabBottom = 0
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
      },
      
      /******************** 旋转动画相关函数 ********************/
      // 获取按钮的信息
      async getFabBtnRectInfo() {
        const systemInfo = uni.getSystemInfoSync()
        const btnRectInfo = await this._tGetRect('.tn-fab__item__btn--fab')
        if (!btnRectInfo) {
          setTimeout(() => {
            this.getFabBtnRectInfo()
          }, 10)
          return
        }
        console.log(btnRectInfo);
        this.systemInfo = {
          width: systemInfo.windowWidth,
          height: systemInfo.windowHeight
        }
        this.fabBtnInfo.width = btnRectInfo.width
        this.fabBtnInfo.height = btnRectInfo.height
        this.fabBtnInfo.left = btnRectInfo.left
        this.fabBtnInfo.right = btnRectInfo.right
        this.fabBtnInfo.bottom = btnRectInfo.bottom
      },
      // 更新悬浮按钮的位置
      translateFabPosition() {
        if (this.updateProps) {
          this.getFabBtnRectInfo()
          this.updateProps = false
        }
        if (this.animationType === 'up') return 
        // 按钮组的宽度
        const btnGroupWidth = this.fabBtnInfo.width + this.aroundBtnDistance + 10
        // 判断当前按钮是在左边还是右边
        if (this.left === 'auto' && btnGroupWidth > this.systemInfo.width - this.fabBtnInfo.right) {
          // 距离不够需要移动
          this.fabRight = btnGroupWidth + 'px'
        } else if (this.right === 'auto' && btnGroupWidth > this.fabBtnInfo.left) {
          this.fabLeft = btnGroupWidth + 'px'
        }
        
        if (btnGroupWidth > this.systemInfo.height - this.fabBtnInfo.bottom) {
          this.fabBottom = btnGroupWidth + 'px'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-fab {
    &__box {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      position: fixed;
      transition: all 0.25s ease-in-out;
    }
    
    &--right {
      align-items: flex-end;
    }
    
    &__btns {
      transition: all 0.25s cubic-bezier(0,.13,0,1.43);
      transform-origin: 80% bottom;
      
      &__animation--up {
        opacity: 0;
        transform: translateY(100%);
      }
      &__animation--around {
        position: absolute;
        top: 0;
        left: 0;
      }
      
      &--visible--up {
        // visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
      &--visible--around {
        // visibility: visible;
        // opacity: 1;
      }
    }
    
    &__item {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 20rpx;
      
      &__animation--around {
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 0.25s ease-in-out;
        transform-origin: 50% 50%;
        padding-bottom: 0 !important;
      }
      
      &--left {
        flex-flow: row-reverse;
      }
      
      &__text {
        &--left {
          padding-left: 14rpx;
        }
        &--right {
          padding-right: 14rpx;
        }
      }
      
      &__btn {
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 5rpx 2rpx rgba(0, 0, 0, 0.07);
        transition: all 0.2s linear;
        
        &--active {
          animation-name: fab-button-animation;
          animation-duration: 0.2s;
          animation-timing-function: cubic-bezier(0,.13,0,1.43);
        }
        
        &__title {
          width: 90%;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        &__icon {
          text-align: center;
          font-size: 64rpx;
        }
        
        &__image {
          display: block;
        }
      }
    }
    
    &__mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $tn-mask-bg-color;
      transition: all 0.2s ease-in-out;
      opacity: 0;
      
      &--visible {
        opacity: 1;
      }
    }
  }
  
  @keyframes fab-button-animation {
    0% {
      transform: scale(0.6);
    }
    // 20% {
    //   transform: scale(1.8);
    // }
    // 40% {
    //   transform: scale(0.4);
    // }
    // 50% {
    //   transform: scale(1.4);
    // }
    // 80% {
    //   transform: scale(0.8);
    // }
    100% {
      transform: scale(1);
    }
  }
</style>
