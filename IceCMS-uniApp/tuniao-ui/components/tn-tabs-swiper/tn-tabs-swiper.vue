<template>
  <view class="tn-tabs-swiper-class tn-tabs-swiper" :class="[backgroundColorClass]" :style="{backgroundColor: backgroundColorStyle, marginTop: $t.string.getLengthUnitValue(top, 'px'), zIndex: zIndex}">
    
    <scroll-view scroll-x class="tn-tabs-swiper__scroll-view" :scroll-left="scrollLeft" scroll-with-animation :style="{zIndex: zIndex + 1}">
      <view class="tn-tabs-swiper__scroll-view__box" :class="{'tn-tabs-swiper__scroll-view--flex': !isScroll}">
        
        <!-- item -->
        <view
          v-for="(item, index) in list"
          :key="index"
          :id="'tn-tabs-swiper__scroll-view__item-' + index"
          class="tn-tabs-swiper__scroll-view__item tn-text-ellipsis"
          :style="[tabItemStyle(index)]"
          @tap="emit(index)"
        >
          <tn-badge v-if="item[count] || item['count']" backgroundColor="tn-bg-red" fontColor="#FFFFFF" :absolute="true" :top="badgeOffset[0] || 0" :right="badgeOffset[1] || 0">{{ item[count] || item['count']}}</tn-badge>
          {{ item[name] || item['name'] }}
        </view>
        
        <!-- 底部滑块 -->
        <view v-if="showBar" class="tn-tabs-swiper__bar" :style="[tabBarStyle]"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import componentsColor from '../../libs/mixin/components_color.js'
  const { windowWidth } = uni.getSystemInfoSync()
  
  export default {
    mixins: [componentsColor],
    name: 'tn-tabs-swiper',
    props: {
      // 标签列表
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // 列表数据tab名称的属性
      name: {
        type: String,
        default: 'name'
      },
      // 列表数据微标数量的属性
      count: {
        type: String,
        default: 'count'
      },
      // 当前活动的tab索引
      current: {
        type: Number,
        default: 0
      },
      // 菜单是否可以滑动
      isScroll: {
        type: Boolean,
        default: true
      },
      // 高度
      height: {
        type: Number,
        default: 80
      },
      // 距离顶部的距离(px)
      top: {
        type: Number,
        default: 0
      },
      // item的高度
      itemWidth: {
        type: [String, Number],
        default: 'auto'
      },
      // swiper的宽度
      swiperWidth: {
        type: Number,
        default: 750
      },
      // 选中时的颜色
      activeColor: {
        type: String,
        default: '#01BEFF'
      },
      // 未被选中时的颜色
      inactiveColor: {
        type: String,
        default: '#080808'
      },
      // 选中的item样式
      activeItemStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 是否显示底部滑块
      showBar: {
        type: Boolean,
        default: true
      },
      // 底部滑块的宽度
      barWidth: {
        type: Number,
        default: 40
      },
      // 底部滑块的高度
      barHeight: {
        type: Number,
        default: 6
      },
      // 自定义底部滑块的样式
      barStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 单个tab的左右内边距
      gutter: {
        type: Number,
        default: 30
      },
      // 微标的偏移数[top, right]
      badgeOffset: {
        type: Array,
        default() {
          return [20, 22]
        }
      },
      // 是否加粗字体
      bold: {
        type: Boolean,
        default: false
      },
      // 滚动至中心目标类型
      autoCenterMode: {
        type: String,
        default: 'window'
      },
      zIndex: {
        type: Number,
        default: 1
      }
    },
    computed: {
      currentIndex() {
        const current = Number(this.current)
        // 判断是否超出
        if (current > this.list.length - 1) {
          return this.list.length - 1
        }
        if (current < 0) return 0
        return current
      },
      // 滑块需要移动的距离
      scrollBarLeft() {
        return Number(this.tabLineDx) + Number(this.tabLineAddDx)
      },
      // 滑块宽度转换为px
      barWidthPx() {
        return uni.upx2px(this.barWidth)
      },
      // 将swiper宽度转换为px
      swiperWidthPx() {
        return uni.upx2px(this.swiperWidth)
      },
      // tab样式
      tabItemStyle() {
        return index => {
          let style = {
            height: this.$t.string.getLengthUnitValue(this.height),
            lineHeight: this.$t.string.getLengthUnitValue(this.height),
            fontSize: this.fontSizeStyle || '28rpx',
            color: this.tabsInfo.length > 0 ? (this.tabsInfo[index] ? this.tabsInfo[index].color : this.activeColor) : this.inactiveColor,
            padding: this.isScroll ? `0 ${this.gutter}rpx` : '',
            flex: this.isScroll ? 'auto' : '1',
            zIndex: this.zIndex + 2
          }
          if (index === this.currentIndex) {
            if (this.bold) {
              style.fontWeight = 'bold'
            }
            Object.assign(style, this.activeItemStyle)
          }
          return style
        }
      },
      // 底部滑块样式
      tabBarStyle() {
        let style = {
          width: this.$t.string.getLengthUnitValue(this.barWidth),
          height: this.$t.string.getLengthUnitValue(this.barHeight),
          borderRadius: `${this.barHeight / 2}rpx`,
          backgroundColor: this.activeColor,
          left: this.scrollBarLeft + 'px'
        }
        Object.assign(style, this.barStyle)
        return style
      },
    },
    data() {
      return {
        // 滚动scroll-view的左边滚动距离
        scrollLeft: 0,
        // 存放tab菜单节点信息
        tabsInfo: [],
        // 屏幕宽度
        windowWidth: 0,
        // 滑动动画结束后对应的标签Index
        animationFinishCurrent: this.current,
        // 组件的宽度
        componentsWidth: 0,
        // 移动距离
        tabLineAddDx: 0,
        tabLineDx: 0,
        // 颜色渐变数组
        colorGradientArr: [],
        // 两个颜色之间的渐变等分
        colorStep: 100,
      }
    },
    watch: {
      current(value) {
        this.change(value)
        this.setFinishCurrent(value)
      },
      list() {
        this.$nextTick(() => {
          this.init()
        })
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      // 初始化
      async init() {
        await this.getTabsInfo()
        this.countLine3Dx()
        this.getQuery(() => {
          this.setScrollViewToCenter()
        })
        // 获取渐变颜色数组
        this.colorGradientArr = this.$t.color.colorGradient(this.inactiveColor, this.activeColor, this.colorStep)
      },
      // 发送事件
      emit(index) {
        this.$emit('change', index)
      },
      // tabs发生变化
      change() {
        this.setScrollViewToCenter()
      },
      // 获取各个tab的节点信息
      getTabsInfo() {
        return new Promise((resolve, reject) => {
          let view = uni.createSelectorQuery().in(this)
          for (let i = 0; i < this.list.length; i++) {
            view.select('#tn-tabs-swiper__scroll-view__item-'+i).boundingClientRect()
          }
          view.exec(res => {
            const arr = []
            for (let i = 0; i < res.length; i++) {
              // 添加颜色属性
              res[i].color = this.inactiveColor
              if (i === this.currentIndex) res[i].color = this.activeColor
              arr.push(res[i])
            }
            this.tabsInfo = arr
            resolve()
          })
        })
      },
      // 查询components信息
      getQuery(cb) {
        try {
          let view = uni.createSelectorQuery().in(this).select('.tn-tabs-swiper')
          view.fields({
              size: true
            },
            data => {
              if (data) {
                this.componentsWidth = data.width
                if (cb && typeof cb === 'function') cb(data)
              } else {
                this.getQuery(cb)
              }
            }
          ).exec()
        } catch (e) {
          this.componentsWidth = windowWidth
        }
      },
      // 当swiper滑动结束的时候，计算滑块最终停留的位置
      countLine3Dx() {
        const tab = this.tabsInfo[this.animationFinishCurrent]
        // 让滑块中心点和当前tab中心重合
        if (tab) this.tabLineDx = tab.left + tab.width / 2 - this.barWidthPx / 2 - this.tabsInfo[0].left
      },
      // 把活动的tab移动到屏幕中心
      setScrollViewToCenter() {
        let tab = this.tabsInfo[this.animationFinishCurrent]
        if (tab) {
          let tabCenter = tab.left + tab.width / 2
          let parentWidth
          // 活动tab移动到中心时，以屏幕还是tab组件宽度为基准
          if (this.autoCenterMode === 'window') {
            parentWidth = windowWidth
          } else {
            parentWidth = this.componentsWidth
          }
          this.scrollLeft = tabCenter - parentWidth / 2
        }
      },
      // 设置偏移位置
      setDx(dx) {
        
        // 计算下一个标签的步进值
        let nextIndexStep = Math.ceil(Math.abs(dx / this.swiperWidthPx))
        let nextTabIndex = dx > 0 ? this.animationFinishCurrent + 1 : this.animationFinishCurrent - 1
        // 处理索引超出边界问题
        nextTabIndex = nextTabIndex <= 0 ? 0 : nextTabIndex
        nextTabIndex = nextTabIndex >= this.list.length ? this.list.length - 1 : nextTabIndex
        
        // 当前tab中心点x轴坐标
        let currentTab = this.tabsInfo[this.animationFinishCurrent]
        let currentTabX = currentTab.left + currentTab.width / 2
        
        // 下一个tab中心点x轴坐标
        let nextTab = this.tabsInfo[nextTabIndex]
        let nextTabX = nextTab.left + nextTab.width / 2
        
        // 两个tab之间的距离
        let distanceX = Math.abs(nextTabX - currentTabX)
        this.tabLineAddDx = (dx / this.swiperWidthPx) * distanceX
        this.setTabColor(this.animationFinishCurrent, nextTabIndex, dx)
      },
      // 设置tab的颜色
      setTabColor(currentTabIndex, nextTabIndex, dx) {
        let nextIndexStep = Math.ceil(Math.abs(dx / this.swiperWidthPx))
        if (Math.abs(dx) > this.swiperWidthPx) {
          dx = dx > 0 ? dx - (this.swiperWidthPx * (nextIndexStep - 1)) : dx + (this.swiperWidthPx * (nextIndexStep - 1))
        }
        let colorIndex = Math.abs(Math.ceil((dx / this.swiperWidthPx) * 100))
        let colorLength = this.colorGradientArr.length
        // 处理超出索引边界
        colorIndex = colorIndex >= colorLength ? colorLength - 1 : colorIndex <= 0 ? 0 : colorIndex
        if (nextIndexStep > 1) {
          // 设置下一个tab的颜色
          // 设置之前tab的颜色为默认颜色
          if (dx > 0) {
            this.tabsInfo[nextTabIndex + (nextIndexStep - 1) > this.tabsInfo.length - 1 ? this.tabsInfo.length - 1 : nextTabIndex + (nextIndexStep - 1)].color = this.colorGradientArr[colorIndex]
            this.tabsInfo[nextTabIndex + (nextIndexStep - 2) > this.tabsInfo.length - 1 ? this.tabsInfo.length - 1 : nextTabIndex + (nextIndexStep - 2)].color = this.colorGradientArr[colorLength - 1 - colorIndex]
          } else {
            this.tabsInfo[nextTabIndex - (nextIndexStep - 1) < 0 ? 0 : nextTabIndex - (nextIndexStep - 1)].color = this.colorGradientArr[colorIndex]
            this.tabsInfo[nextTabIndex - (nextIndexStep - 2) < 0 ? 0 : nextTabIndex - (nextIndexStep - 2)].color = this.colorGradientArr[colorLength - 1 - colorIndex]
          }
        } else {
          // 设置下一个tab的颜色
          this.tabsInfo[nextTabIndex].color = this.colorGradientArr[colorIndex]
          // 设置当前tab的颜色
          this.tabsInfo[currentTabIndex].color = this.colorGradientArr[colorLength - 1 - colorIndex]
        }
        
      },
      // swiper滑动结束
      setFinishCurrent(current) {
        // 如果滑动的索引不一致，修改tab颜色变化，因为可能会有直接点击tab的情况
        this.tabsInfo.map((item, index) => {
          if (current == index) item.color = this.activeColor
          else item.color = this.inactiveColor
          return item
        })
        this.tabLineAddDx = 0
        this.animationFinishCurrent = current
        this.countLine3Dx()
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  /* #ifndef APP-NVUE */
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
  }
  /* #endif */
  
  /* #ifdef H5 */
  // 通过样式穿透，隐藏H5下，scroll-view下的滚动条
  scroll-view ::v-deep ::-webkit-scrollbar {
  	display: none;
  	width: 0 !important;
  	height: 0 !important;
  	-webkit-appearance: none;
  	background: transparent;
  }
  /* #endif */
  
  .tn-tabs-swiper {
    &__scroll-view {
      position: relative;
      width: 100%;
      white-space: nowrap;
      
      &__box {
        position: relative;
        /* #ifdef MP-TOUTIAO */
        white-space: nowrap;
        /* #endif */
      }
      
      &__item {
        position: relative;
        /* #ifndef APP-NVUE */
        display: inline-block;
        /* #endif */
        text-align: center;
        transition-property: background-color, color;
      }
      
      &--flex {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
    
    &__bar {
      position: absolute;
      bottom: 0;
    }
  }
  
</style>
