<template>
  <view
    class="tn-c-swiper-class tn-c-swiper"
  >
    <!-- 轮播item容器-->
    <view class="tn-swiper__container" :style="[swiperContainerStyle]" :animation="containerAnimation">
      <slot></slot>
    </view>
    
    <!-- 轮播指示器-->
    <view v-if="indicator" class="tn-swiper__indicator" :class="[`tn-swiper__indicator--${vertical ? 'vertical' : 'horizontal'}`]" :style="[indicatorStyle]">
      <!-- 方形 -->
      <block v-if="indicatorType === 'rect'">
        <view
          v-for="(item, index) in children.length"
          :key="index"
          class="tn-swiper__indicator__rect"
          :class="[
            `tn-swiper__indicator__rect--${vertical ? 'vertical' : 'horizontal'}`, 
            currentIndex === index ? `tn-swiper__indicator__rect--active tn-swiper__indicator__rect--active--${vertical ? 'vertical' : 'horizontal'}` : ''
          ]"
          :style="[indicatorPointStyle(index)]"
        ></view>
      </block>
      <!-- 点 -->
      <block v-if="indicatorType === 'dot'">
        <view
          v-for="(item, index) in children.length"
          :key="index"
          class="tn-swiper__indicator__dot"
          :class="[
            `tn-swiper__indicator__dot--${vertical ? 'vertical' : 'horizontal'}`,
            currentIndex === index ? `tn-swiper__indicator__dot--active tn-swiper__indicator__dot--active--${vertical ? 'vertical' : 'horizontal'}` : ''
          ]"
          :style="[indicatorPointStyle(index)]"
        ></view>
      </block>
      <!-- 圆角方形 -->
      <block v-if="indicatorType === 'round'">
        <view
          v-for="(item, index) in children.length"
          :key="index"
          class="tn-swiper__indicator__round"
          :class="[
            `tn-swiper__indicator__round--${vertical ? 'vertical' : 'horizontal'}`,
            currentIndex === index ? `tn-swiper__indicator__round--active tn-swiper__indicator__round--active--${vertical ? 'vertical' : 'horizontal'}` : ''
          ]"
          :style="[indicatorPointStyle(index)]"
        ></view>
      </block>
      <!-- 序号 -->
      <block v-if="indicatorType === 'number' && !vertical">
        <view class="tn-swiper__indicator__number">{{ currentIndex + 1 }}/{{ children.length }}</view>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-custom-swiper',
    props: {
      // 当前所在的轮播位置
      current: {
        type: Number,
        default: 0
      },
      // 自动切换
      autoplay: {
        type: Boolean,
        default: false
      },
      // 自动切换时间间隔
      interval: {
        type: Number,
        default: 5000
      },
      // 滑动动画时长
      duration: {
        type: Number,
        default: 500
      },
      // 是否采用衔接滑动
      circular: {
        type: Boolean,
        default: false
      },
      // 滑动方向为纵向
      vertical: {
        type: Boolean,
        default: false
      },
      // 显示指示点
      indicator: {
        type: Boolean,
        default: false
      },
      // 指示点类型
      // rect -> 方形 round -> 圆角方形 dot -> 点 number -> 轮播图下标
      indicatorType: {
        type: String,
        default: 'dot'
      },
      // 指示点的位置
      // topLeft \ topCenter \ topRight \ bottomLeft \ bottomCenter \ bottomRight
      indicatorPosition: {
        type: String,
        default: 'bottomCenter'
      },
      // 指示点激活时颜色
      indicatorActiveColor: {
        type: String,
        default: ''
      },
      // 指示点未激活时颜色
      indicatorInactiveColor: {
        type: String,
        default: ''
      },
      // 前一个轮播的自定义样式
      prevSwiperStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 当前轮播的自定义样式
      customSwiperStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 后一个轮播的自定义样式
      nextSwiperStyle: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      parentData() {
        return [
          this.duration,
          this.currentIndex,
          this.swiperContainerAnimationFinish,
          this.circular,
          this.vertical,
          this.prevSwiperStyle,
          this.customSwiperStyle,
          this.nextSwiperStyle
        ]
      },
      indicatorStyle() {
        let style = {}
        if (this.vertical) {
          if (this.indicatorPosition === 'topLeft' || this.indicatorPosition === 'bottomLeft') style.justifyContent = 'flex-start'
          if (this.indicatorPosition === 'topCenter' || this.indicatorPosition === 'bottomCenter') style.justifyContent =  'center'
          if (this.indicatorPosition === 'topRight' || this.indicatorPosition === 'bottomRight') style.justifyContent =  'flex-end'
          if (['topLeft','topCenter','topRight'].indexOf(this.indicatorPosition) >= 0) {
            if (this.vertical) {
              style.right = '12rpx'
              style.left = 'auto'
            } else {
              style.top = '12rpx'
              style.bottom = 'auto'
            }
          } else {
            if (this.vertical) {
              style.right = 'auto'
              style.left = '12rpx'
            } else {
              style.top = 'auto'
              style.bottom = '12rpx'
            }
          }
        } else {
          if (this.indicatorPosition === 'topLeft' || this.indicatorPosition === 'bottomLeft') style.justifyContent = 'flex-start'
          if (this.indicatorPosition === 'topCenter' || this.indicatorPosition === 'bottomCenter') style.justifyContent =  'center'
          if (this.indicatorPosition === 'topRight' || this.indicatorPosition === 'bottomRight') style.justifyContent =  'flex-end'
          if (['topLeft','topCenter','topRight'].indexOf(this.indicatorPosition) >= 0) {
            style.top = '12rpx'
            style.bottom = 'auto'
          } else {
            style.top = 'auto'
            style.bottom = '12rpx'
          }
        }
        return style
      },
      indicatorPointStyle() {
        return (index) => {
          let style = {}
          if (index === this.currentIndex && this.indicatorActiveColor !== '') {
            style.backgroundColor = this.indicatorActiveColor
          } else if (this.indicatorInactiveColor !== '') {
            style.backgroundColor = this.indicatorInactiveColor
          }
          return style
        }
      }
    },
    watch: {
      parentData() {
        if (this.children.length) {
          this.children.forEach((item) => {
            // 判断子组件如果有updateParentData方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
            typeof(item.updateParentData) === 'function' && item.updateParentData()
          })
        }
      },
      current(nVal, oVal) {
        if (this.currentIndex === nVal) return
        this.currentIndex = nVal > this.children.length ? this.children.length - 1 : nVal
        this.swiperContainerAnimationFinish = false
        // 设置动画过渡时间
        this.swiperContainerStyle.transitionDuration = `${this.duration + 90}ms`
        this.updateSwiperContainerItem(oVal)
      }
    },
    data() {
      return {
        // 清除动画定时器
        clearAnimationTimer: null,
        // 前后衔接执行定时器
        convergeTimer: null,
        // 自动轮播Timer
        autoPlayTimer: null,
        // 当前选中的轮播
        currentIndex: this.current,
        // swiperContainer样式
        swiperContainerStyle: {
          transform: 'translate3d(0px, 0px, 0px)',
          transitionDuration: '0ms'
        },
        // swiperContainer动画
        containerAnimation: {},
        // 滑动动画结束标记
        swiperContainerAnimationFinish: false
      }
    },
    created() {
      this.children = []
    },
    mounted() {
      this.$nextTick(() => {
        const index = this.currentIndex > this.children.length ? this.children.length - 1 : this.currentIndex
        this.updateSwiperContainerStyle(index)
        this.startAutoPlay()
      })
    },
    methods: {
      // 更新全部swiperItem的样式
      updateAllSwiperItemStyle() {
        this.children.forEach((item, index) => {
          typeof(item.updateSwiperItemStyle) === 'function' && item.updateSwiperItemStyle(this.children.length)
        })
        
      },
      // 根据swiperIndex更新swiperItemContainer的样式
      updateSwiperContainerStyle(index) {
        if (this.vertical) {
          this.swiperContainerStyle.transform = `translate3d(0px, ${-index * 100}%, 0px)`
        } else {
          this.swiperContainerStyle.transform = `translate3d(${-index * 100}%, 0px, 0px)`
        }
      },
      // 根据传递的值更新swiperItemContainer的位置
      updateSwiperContainerStyleWithValue(value) {
        if (this.vertical) {
          this.swiperContainerStyle.transform = `translate3d(0px, ${(-this.currentIndex * 100) + value * 100}%, 0px)`
        } else {
          this.swiperContainerStyle.transform = `translate3d(${(-this.currentIndex * 100) + value * 100}%, 0px, 0px)`
        }
      },
      // 根据传递的方向更新swiperItemContainer的位置
      updateSwiperContainerStyleWithDirection(direction) {
        const oldCurrent = this.currentIndex
        const childrenLength = this.children.length
        const lastSwiperItemIndex = childrenLength - 1
        this.swiperContainerAnimationFinish = false
        
        
        // 向后切换一个SwiperItem
        if (direction === 'reset') {
          // 设置动画过渡时间
          this.swiperContainerStyle.transitionDuration = `${this.duration}ms`
          this.updateSwiperContainerStyle(this.currentIndex)
          this.clearAnimationTimer = setTimeout(() => {
            this.clearSwiperContainerAnimation()
          }, this.duration)
        } else if (direction === 'reload') {
          this.clearConvergeSwiperItemTimer()
          this.clearSwiperContainerAnimation()
          this.updateSwiperItemStyle(0)
          this.updateSwiperItemStyle(lastSwiperItemIndex)
        } else {
          if (direction === 'left' || direction === 'up') {
            if (oldCurrent === childrenLength - 1 && !this.circular) {
              this.clearSwiperContainerAnimation()
              this.clearConvergeSwiperItemTimer()
              return
            } 
            this.currentIndex = oldCurrent + 1 >= childrenLength ? 0 : oldCurrent + 1
          } else if (direction === 'right' || direction === 'down') {
            if (oldCurrent === 0 && !this.circular) {
              this.clearSwiperContainerAnimation()
              this.clearConvergeSwiperItemTimer()
              return
            } 
            this.currentIndex = oldCurrent - 1 < 0 ? childrenLength - 1 : oldCurrent - 1
          }
          // 设置动画过渡时间
          this.swiperContainerStyle.transitionDuration = `${this.duration + 90}ms`
          // this.updateSwiperItemContainerRect(this.currentIndex)
        }
        
        // console.log(direction, oldCurrent, this.currentIndex);
        this.updateSwiperContainerItem(oldCurrent)
        
        // 切换轮播时触发事件
        this.$emit('change', {
          current: this.currentIndex
        })
      },
      // 设置自动轮播
      startAutoPlay() {
        if (this.autoplay && !this.autoPlayTimer && this.circular) {
          this.autoPlayTimer = setInterval(() => {
            this.updateSwiperContainerStyleWithDirection('left')
          }, this.interval)
        }
      },
      // 停止自动轮播
      stopAutoPlay() {
        if (this.autoPlayTimer) {
          clearInterval(this.autoPlayTimer)
          this.autoPlayTimer = null
        }
      },
      // 更新swiperContainer和swiperItem相关联信息
      updateSwiperContainerItem(oldCurrent) {
        const childrenLength = this.children.length
        const lastSwiperItemIndex = childrenLength - 1
        // 判断当前是否为头尾，如果是更新对应的头尾SwiperItem样式
        // 更新swiperItemContainer的样式
        if (oldCurrent === 0 && this.currentIndex === lastSwiperItemIndex) {
          // 先移动到最左边然后再去除动画偏移到正常的位置
          // this.swiperContainerStyle.transform = `translate3d(100%, 0px, 0px)`
          this.updateSwiperContainerStyle(-1)
          this.clearSwiperContainerAnimationTimer()
          this.clearAnimationTimer = setTimeout(() => {
            this.convergeSwiperItem()
          }, this.duration)
        } else if (oldCurrent === lastSwiperItemIndex && this.currentIndex === 0) {
          // 先移动到最右边然后再去除动画偏移到正常的位置
          // this.swiperContainerStyle.transform = `translate3d(${-childrenLength * 100}%, 0px, 0px)`
          this.updateSwiperContainerStyle(childrenLength)
          this.clearSwiperContainerAnimationTimer()
          this.clearAnimationTimer = setTimeout(() => {
            this.convergeSwiperItem()
          }, this.duration)
        } else {
          this.updateSwiperContainerStyle(this.currentIndex)
          this.updateSwiperItemStyle(0)
          this.updateSwiperItemStyle(lastSwiperItemIndex)
          this.clearAnimationTimer = setTimeout(() => {
            this.clearSwiperContainerAnimation()
          }, this.duration)
        }
      },
      // 更新对应swiperItem的信息
      updateSwiperItemStyle(index) {
        const childrenLength = this.children.length
        if (index < 0) index = 0
        if (index > childrenLength - 1) index = childrenLength - 1
        
        typeof(this.children[index].updateSwiperItemStyle) === 'function' && this.children[index].updateSwiperItemStyle(childrenLength, this.currentIndex)
      },
      // 更新对应swiperItem的容器信息
      updateSwiperItemContainerRect(index) {
        const childrenLength = this.children.length
        if (index < 0) index = 0
        if (index > childrenLength - 1) index = childrenLength - 1
        
        typeof(this.children[index].getSwiperItemRect) === 'function' && this.children[index].getSwiperItemRect()
      },
      // 执行前后衔接
      convergeSwiperItem() {
        const lastSwiperItemIndex = this.children.length - 1
        this.clearSwiperContainerAnimation()
        this.clearConvergeSwiperItemTimer()
        this.convergeTimer = setTimeout(() => {
          this.updateSwiperItemStyle(0)
          this.updateSwiperItemStyle(lastSwiperItemIndex)
          this.updateSwiperContainerStyle(this.currentIndex)
          this.clearConvergeSwiperItemTimer()
        }, 30)
      },
      // 停止/清除切换动画
      clearSwiperContainerAnimation() {
        this.swiperContainerStyle.transitionDuration = `0ms`
        this.swiperContainerAnimationFinish = true
        this.clearSwiperContainerAnimationTimer()
      },
      // 停止/清除执行前后衔接定时器
      clearConvergeSwiperItemTimer() {
        if (this.convergeTimer) {
          clearTimeout(this.convergeTimer)
          this.convergeTimer = null
        }
      },
      // 停止/清除切换动画定时器
      clearSwiperContainerAnimationTimer() {
        if (this.clearAnimationTimer) {
          clearTimeout(this.clearAnimationTimer)
          this.clearAnimationTimer = null
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-c-swiper {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    
    .tn-swiper {
      &__container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        
        will-change: transform;
        transition-property: all;
        transition-timing-function: ease-out;
      }
      
      &__indicator {
        position: absolute;
        display: flex;
        z-index: 1;
        
        &--horizontal {
          padding: 0 24rpx;
          flex-direction: row;
          width: 100%;
        }
        &--vertical {
          padding: 24rpx 0;
          flex-direction: column;
          height: 100%;
        }
        
        &__rect {
          background-color: rgba(0, 0, 0, 0.3);
          transition: all 0.5s;
          
          &--horizontal {
            width: 26rpx;
            height: 8rpx;
          }
          &--vertical {
            width: 8rpx;
            height: 26rpx;
          }
          
          &--active {
            background-color: rgba(255, 255, 255, 0.8);
          }
        }
        
        &__dot {
          width: 14rpx;
          height: 14rpx;
          border-radius: 20rpx;
          background-color: rgba(0, 0, 0, 0.3);
          transition: all 0.5s;
          
          &--horizontal {
            margin: 0 6rpx;
          }
          &--vertical {
            margin: 6rpx 0;
          }
          
          &--active {
            background-color: rgba(255, 255, 255, 0.8);
          }
        }
        
        &__round {
          width: 14rpx;
          height: 14rpx;
          border-radius: 20rpx;
          background-color: rgba(0, 0, 0, 0.3);
          transition: all 0.5s;
          
          &--horizontal {
            margin: 0 6rpx;
          }
          &--vertical {
            margin: 6rpx 0;
          }
          
          &--active {
            background-color: rgba(255, 255, 255, 0.8);
            
            &--horizontal {
              width: 34rpx;
            }
            &--vertical {
              height: 34rpx;
            }
          }
        }
        
        &__number {
          padding: 6rpx 16rpx;
          line-height: 1;
          background-color: rgba(0, 0, 0, 0.3);
          color: rgba(255, 255, 255, 0.8);
          border-radius: 100rpx;
          font-size: 26rpx;
        }
      }
    }
  }
</style>
