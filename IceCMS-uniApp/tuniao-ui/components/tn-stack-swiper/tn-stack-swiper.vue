<template>
  <view
    class="tn-stack-swiper-class tn-stack-swiper"
    :style="{
      width: $t.string.getLengthUnitValue(width),
      height: $t.string.getLengthUnitValue(height)
    }"
    :list="swiperList"
    :itemData="itemData"
    :currentIndex="swiperIndex"
    :autoplayFlag="autoplayFlag"
    :change:list="wxs.listObserver"
    :change:itemData="wxs.itemDataObserver"
    :change:currentIndex="wxs.swiperIndexChange"
    :change:autoplayFlag="wxs.autoplayFlagChange"
  >
    <block v-for="(item, index) in list" :key="index">
      <!-- #ifdef MP-WEIXIN -->
      <view
        class="tn-stack-swiper__item tn-stack-swiper__item__transition"
        :class="[`tn-stack-swiper__item--${direction}`]"
        :data-index="index"
        :data-switchRate="switchRate"
        @touchstart="wxs.touchStart"
        :catch:touchmove="touching?wxs.touchMove:''"
        :catch:touchend="touching?wxs.touchEnd:''"
      >
        <image class="tn-stack-swiper__image" :src="item.image"></image>
      </view>
      <!-- #endif -->
      
      <!-- #ifndef MP-WEIXIN -->
      <view
        class="tn-stack-swiper__item"
        :class="[`tn-stack-swiper__item--${direction}`]"
        :data-index="index"
        :data-switchRate="switchRate"
        @touchstart="wxs.touchStart"
        @touchmove="wxs.touchMove"
        @touchend="wxs.touchEnd"
      >
        <image class="tn-stack-swiper__image" :src="item.image"></image>
      </view>
      <!-- #endif -->
    </block>
  </view>
</template>

<!-- #ifdef MP-WEIXIN -->
<script src="./index.wxs" lang="wxs" module="wxs"></script>
<!-- #endif -->
<!-- #ifndef MP-WEIXIN -->
<script src="./index-h5.wxs" lang="wxs" module="wxs"></script>
<!-- #endif -->
<script>
  export default {
    name: 'tn-stack-swiper',
    props: {
      // 显示图片的列表数据
      // {
      //   // 图片地址
      //   image: 'xxx'
      // }
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // 轮播容器的宽度 rpx
      width: {
        type: [String, Number],
        default: '100%'
      },
      // 轮播容器的高度 rpx
      height: {
        type: [String, Number],
        default: 500
      },
      // 自动切换
      autoplay: {
        type: Boolean,
        default: false
      },
      // 自动切换时长 ms
      interval: {
        type: Number,
        default: 5000
      },
      // 滑动切换移动比例, [0 - 100]
      // 比例相对于item的宽度
      switchRate: {
        type: Number,
        default: 30
      },
      // 缩放比例 [0-1]
      scaleRate: {
        type: Number,
        default: 0.1
      },
      // 下一轮播偏移比例
      translateRate: {
        type: Number,
        default: 16
      },
      // 下一轮播透明比例
      opacityRate: {
        type: Number,
        default:10
      },
      // 滑动方向
      // horizontal -> 水平 vertical -> 垂直
      direction: {
        type: String,
        default: 'horizontal'
      }
    },
    data() {
      return {
        autoplayTimer: null,
        // window窗口的宽度
        windowWidth: 0,
        // 轮播item的宽度
        swiperItemWidth: 0,
        // 轮播item的高度
        swiperItemHeight: 0,
        // 当前选中的轮播item
        swiperIndex: -1,
        // 标记是否开始触摸
        touching: true,
        // 轮播列表信息
        swiperList: [],
        // 标记当前是否为自动播放
        autoplayFlag: false
      }
    },
    computed: {
      itemData() {
        return {
          windowWidth: this.windowWidth,
          itemWidth: this.swiperItemWidth,
          itemHeight: this.swiperItemHeight,
          direction: this.direction,
          autoplaying: this.autoplayFlag
        }
      }
    },
    watch: {
      list(val) {
        this.swiperList = []
        this.$nextTick(() => {
          this.initSwiperRectInfo()
        })
      },
      autoplay(val) {
        if (!val) {
          this.clearAutoPlayTimer()
        } else {
          this.setAutoPlay()
        }
      }
    },
    created() {
      this.autoplayFlag = this.autoplay
    },
    mounted() {
      this.$nextTick(() => {
        this.initSwiperRectInfo()
      })
    },
    destroyed() {
      this.clearAutoPlayTimer()
    },
    methods: {
      // 初始化轮播容器信息
      async initSwiperRectInfo() {
        // 用于一开始绑定事件
        // this.touching = true
        // 获取轮播item的宽度
        const swiperItemRect = await this._tGetRect('.tn-stack-swiper__item')
        if (!swiperItemRect || !swiperItemRect.width || !swiperItemRect.height) {
          setTimeout(() => {
            this.initSwiperRectInfo()
          }, 50)
          return
        }
        this.swiperItemWidth = swiperItemRect.width
        this.swiperItemHeight = swiperItemRect.height
        // this.touching = false
        
        // 获取系统的窗口宽度信息
        const systemInfo = uni.getSystemInfoSync()
        this.windowWidth = systemInfo.windowWidth
        this.swiperIndex = 0
        
        // 设置对应swiper元素的位置和层级信息
        this.swiperList = this.list.map((item, index) => {
          
          const scale = 1 - (this.scaleRate * index)
          
          if (this.direction === 'horizontal') {
            item.translateX = ((index * this.translateRate) * 0.01 * this.swiperItemWidth)
          } else if (this.direction === 'vertical') {
            item.translateY = ((index * this.translateRate) * 0.01 * this.swiperItemHeight)
          }
          item.opacity = (1 - ((index * this.opacityRate) * 0.01))
          item.zIndex = this.list.length - index
          item.scale = scale <= 0 ? 0 : scale
          
          return item
        })
        
        this.setAutoPlay()
      },
      // 设置自动切换轮播
      setAutoPlay() {
        if (this.autoplay) {
          this.clearAutoPlayTimer()
          this.autoplayFlag = true
          this.autoplayTimer = setInterval(() => {
            this.swiperIndex = this.swiperIndex + 1 > this.swiperList.length - 1 ? 0 : this.swiperIndex + 1
          }, this.interval)
        }
      },
      // 清除自动切换定时器
      clearAutoPlayTimer() {
        if (this.autoplayTimer != null) {
          this.autoplayFlag = false
          clearInterval(this.autoplayTimer)
        }
      },
      // 修改轮播选中index
      changeSwiperIndex(e) {
        // console.log(e.index);
        this.swiperIndex = e.index
        this.$emit('change', { index: e.index })
      },
      // 修改触摸状态
      changeTouchState(e) {
        this.touching = e.touching
      },
      // 打印日志
      printLog(data) {
        console.log("log", data);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-stack-swiper {
    position: relative;
    
    &__item {
      position: absolute;
      border-radius: 20rpx;
      overflow: hidden;
      
      &--horizontal {
        width: 88%;
        height: 100%;
        transform-origin: left center;
      }
      
      &--vertical {
        width: 100%;
        height: 88%;
        transform-origin: top center;
      }
      
      &__transition {
        transition-property: transform,opacity;
        transition-duration: 0.25s;
        transition-timing-function: ease-out;
        // transition: transform, opacity 0.25s ease-in-out !important;
      }
    }
    
    &__image {
      width: 100%;
      height: 100%;
    }
  }
</style>
