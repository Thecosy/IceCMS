<template>
  <!-- #ifdef MP-WEIXIN -->
  <view
    class="tn-c-swiper-item"
    :style="[swiperStyle]"
    :itemData="itemData"
    :currentIndex="currentIndex"
    :containerData="containerData"
    :change:itemData="wxs.itemDataObserver"
    :change:currentIndex="wxs.currentIndexObserver"
    :change:containerData="wxs.containerDataObserver"
    @touchstart="wxs.touchStart"
    :catch:touchmove="touching?wxs.touchMove:''"
    :catch:touchend="touching?wxs.touchEnd:''"
  >
    <view class="item__container tn-c-swiper-item__container" :style="[containerStyle]">
      <slot></slot>
    </view>
  </view>
  <!-- #endif -->
  <!-- #ifndef MP-WEIXIN -->
  <view
    class="tn-c-swiper-item"
    :style="[swiperStyle]"
    :itemData="itemData"
    :currentIndex="currentIndex"
    :containerData="containerData"
    :change:itemData="wxs.itemDataObserver"
    :change:currentIndex="wxs.currentIndexObserver"
    :change:containerData="wxs.containerDataObserver"
    @touchstart="wxs.touchStart"
    @touchmove="wxs.touchMove"
    @touchend="wxs.touchEnd"
  >
    <view class="item__container tn-c-swiper-item__container" :style="[containerStyle]">
      <slot></slot>
    </view>
  </view>
  <!-- #endif -->
</template>

<script src="./index.wxs" lang="wxs" module="wxs"></script>
<script>
  export default {
    name: 'tn-custom-swiper-item',
    props: {
      
    },
    computed: {
      // swiperItem公共数据
      itemData() {
        return {
          index: this.index,
          itemWidth: this.itemWidth,
          itemHeight: this.itemHeight,
          itemTop: this.itemTop,
          itemLeft: this.itemLeft
        }
      },
      currentIndex() {
        return this.parentData.currentIndex
      },
      containerData() {
        return {
          duration: this.parentData.duration,
          animationFinish: this.parentData.swiperContainerAnimationFinish,
          circular: this.parentData.circular,
          swiperItemLength: this.swiperItemLength,
          vertical: this.parentData.vertical
        }
      },
      swiperStyle() {
        let style = {}
        style.transform = `translate3d(${this.translateX}%, ${this.translateY}%, 0px)`
        return style
      },
      containerStyle() {
        let style = {}
        if (this.parentData.customSwiperStyle && Object.keys(this.parentData.customSwiperStyle).length > 0) {
          style = this.parentData.customSwiperStyle
        }
        if ((this.currentIndex === 0 && this.index === this.swiperItemLength - 1) || (this.index === this.currentIndex - 1) && 
          (this.parentData.prevSwiperStyle && Object.keys(this.parentData.prevSwiperStyle).length > 0)
        ) {
          // 前一个swiperItem
          const copyStyle = JSON.parse(JSON.stringify(style))
          style = Object.assign(copyStyle, this.parentData.prevSwiperStyle)
        } 
        if ((this.currentIndex === this.swiperItemLength - 1 && this.index === 0) || (this.index === this.currentIndex + 1) &&
          (this.parentData.nextSwiperStyle && Object.keys(this.parentData.nextSwiperStyle).length > 0)
        ) {
          // 后一个swiperItem
          const copyStyle = JSON.parse(JSON.stringify(style))
          style = Object.assign(copyStyle, this.parentData.nextSwiperStyle)
        }
        return style
      }
    },
    data() {
      return {
        // 父组件参数
        parentData: {
          duration: 500,
          currentIndex: 0,
          swiperContainerAnimationFinish: false,
          circular: false,
          vertical: false,
          prevSwiperStyle: {},
          customSwiperStyle: {},
          nextSwiperStyle: {}
        },
        // 标记当前是否正在触摸
        touching: true,
        // 当前swiperItem的偏移位置
        translateX: 0,
        translateY: 0,
        // 当前swiperItem的宽高
        itemWidth: 0,
        itemHeight: 0,
        // 当前swiperItem的位置信息
        itemTop: 0,
        itemLeft: 0,
        // 当前swiperItem的状态 prev current next
        status: 'current',
        // 当前swiperItem的index序号
        index: 0,
        // swiperItem的的数量
        swiperItemLength: 0
      }
    },
    created() {
      this.parent = false
      this.updateParentData()
      // 获取当前父组件children的数量作为当前swiperItem的序号
      this.index = this.parent.children.length
      this.parent && this.parent.children.push(this)
    },
    mounted() {
      this.$nextTick(() => {
        this.initSwiperItem()
      })
    },
    methods: {
      // 初始化swiperItem
      initSwiperItem() {
        this.getSwiperItemRect(() => {
          this.parent.updateAllSwiperItemStyle()
          this.parentData.swiperContainerAnimationFinish = true
        })
      },
      // 获取swiperItem的信息
      async getSwiperItemRect(callback) {
        const swiperItemRes = await this._tGetRect('.tn-c-swiper-item')
        if (!swiperItemRes.height || !swiperItemRes.width) {
          setTimeout(() => {
            this.getSwiperItemRect()
          }, 30)
          return
        }
        
        this.itemWidth = swiperItemRes.width
        this.itemHeight = swiperItemRes.height
        this.itemTop = swiperItemRes.top
        this.itemLeft = swiperItemRes.left
        callback && callback()
      },
      // 更新swiperItem样式
      updateSwiperItemStyle(swiperItemLength, currentIndex = undefined) {
        currentIndex = currentIndex != undefined ? currentIndex : this.parentData.currentIndex
        this.swiperItemLength = swiperItemLength
        // 根据当前swiperItem的序号设置偏移位置
        // 判断当前swiperItem是否为第一个，如果是则将最后的swiperItem移动到当前的前一个位置（即最前面）
        if (currentIndex === 0 && this.index === swiperItemLength - 1) {
          if (this.parentData.vertical) {
            this.translateX = 0
            this.translateY = -100
          } else {
            this.translateX = -100
            this.translateY = 0
          }
        } 
        // 判断当前swiperItem是否为最后一个，如果是则将最前的swiperItem移动到当前的后一个位置（即最后面）
        else if (currentIndex === swiperItemLength - 1 && this.index === 0) {
          if (this.parentData.vertical) {
            this.translateX = 0
            this.translateY = swiperItemLength * 100
          } else {
            this.translateX = swiperItemLength * 100
            this.translateY = 0
          }
        }
        // 正常情况
        else {
          if (this.parentData.vertical) {
            this.translateX = 0
            this.translateY = this.index * 100
          } else {
            this.translateX = this.index * 100
            this.translateY = 0
          }
        }
      },
      // 更新父组件的偏移位置信息
      updateParentSwiperContainerStyle(e) {
        this.parent.updateSwiperContainerStyleWithValue(e.value)
      },
      // 根据方向更新父组件的偏移位置信息
      updateParentSwiperContainerStyleWithDirection(e) {
        this.parent.updateSwiperContainerStyleWithDirection(e.direction)
      },
      // 修改父组件的偏移位置的状态
      changeParentSwiperContainerStyleStatus(e) {
        // reset -> 重置 reload -> 重载
        this.parent.updateSwiperContainerStyleWithDirection(e.status)
      },
      // 更新父组件信息
      updateParentData() {
        this.getParentData('tn-custom-swiper')
      },
      // 更新触摸状态
      updateTouchingStatus(e) {
        this.touching = e.status
        if (e.status) {
          this.parent.stopAutoPlay()
        } else {
          this.parent.startAutoPlay()
        }
      },
      // 提取对应用户自定义样式
      extractCustomStyle(customStyle) {
        let data = {
          transform: {},
          style: {}
        }
        if (!customStyle) return data
        // 允许设置的transform参数
        const allowTransformProps = ['scale','scaleX','scaleY','scaleZ','rotate','rotateX','rotateY','rotateZ']
        for (let prop in customStyle) {
          if (prop.startsWith('transformProp')) {
            // transform里面的样式
            let transformProp = prop.substring('transformProp'.length)
            const index = allowTransformProps.findIndex((item) => {
              return item.toLowerCase() === transformProp.toLowerCase()
            })
            if (index !== -1) {
              transformProp = allowTransformProps[index]
              data.transform[transformProp] = customStyle[prop]
            }
          } else {
            // 普通样式
            data.style[prop] = customStyle[prop]
          }
        }
        return data
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-c-swiper-item {
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    will-change: transform;
    cursor: none;
    transform: translate3d(0px, 0px, 0px);
    
    .item__container {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
    }
  }
</style>
