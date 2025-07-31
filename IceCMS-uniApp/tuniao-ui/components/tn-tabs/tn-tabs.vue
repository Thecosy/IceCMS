<template>
  <view class="tn-tabs-class tn-tabs" :class="[backgroundColorClass]" :style="{backgroundColor: backgroundColorStyle, marginTop: $t.string.getLengthUnitValue(top, 'px')}">
    
    <!-- _tgetRect()对组件根节点无效，因为写了.in(this)，故这里获取内层接点尺寸 -->
    <view :id="id">
      <scroll-view scroll-x class="tn-tabs__scroll-view" :scroll-left="scrollLeft" scroll-with-animation>
        <view class="tn-tabs__scroll-view__box" :class="{'tn-tabs__scroll-view--flex': !isScroll}">
          <!-- item -->
          <view
            v-for="(item, index) in list"
            :key="index"
            :id="'tn-tabs__scroll-view__item-' + index"
            class="tn-tabs__scroll-view__item tn-text-ellipsis"
            :style="[tabItemStyle(index)]"
            @tap="clickTab(index)"
          >
            <tn-badge v-if="item[count] || item['count']" backgroundColor="tn-bg-red" fontColor="#FFFFFF" :absolute="true" :top="badgeOffset[0] || 0" :right="badgeOffset[1] || 0">{{ item[count] || item['count']}}</tn-badge>
            {{ item[name] || item['name'] }}
          </view>
          
          <!-- 底部滑块 -->
          <view v-if="showBar" class="tn-tabs__bar" :style="[tabBarStyle]"></view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import componentsColor from '../../libs/mixin/components_color.js'
  export default {
    mixins: [componentsColor],
    name: 'tn-tabs',
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
      // item的宽度
      itemWidth: {
        type: [String, Number],
        default: 'auto'
      },
      // 过渡动画时长
      duration: {
        type: Number,
        default: 0.3
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
      }
    },
    computed: {
      // 底部滑块样式
      tabBarStyle() {
        let style = {
          width: this.$t.string.getLengthUnitValue(this.barWidth),
          height: this.$t.string.getLengthUnitValue(this.barHeight),
          borderRadius: `${this.barHeight / 2}rpx`,
          backgroundColor: this.activeColor,
          opacity: this.barMoveFirst ? 0 : 1,
          transform: `translate(${this.scrollBarLeft}px, -100%)`,
          transitionDuration: this.barMoveFirst ? '0s' : `${this.duration}s`
        }
        Object.assign(style, this.barStyle)
        return style
      },
      // tabItem样式
      tabItemStyle() {
        return index => {
          let style = {
            width: this.$t.string.getLengthUnitValue(this.itemWidth),
            height: this.$t.string.getLengthUnitValue(this.height),
            lineHeight: this.$t.string.getLengthUnitValue(this.height),
            fontSize: this.fontSizeStyle || '28rpx',
            padding: this.isScroll ? `0 ${this.gutter}rpx` : '',
            flex: this.isScroll ? 'auto' : '1',
            transitionDuration: `${this.duration}s`
          }
          if (index === this.currentIndex) {
            if (this.bold) {
              style.fontWeight = 'bold'
            }
            style.color = this.activeColor
            Object.assign(style, this.activeItemStyle)
          } else {
            style.color = this.inactiveColor
          }
          return style
        }
      }
    },
    data() {
      return {
        // id值
        id: this.$t.uuid(),
        // 滚动scroll-view的左边距离
        scrollLeft: 0,
        // 存放查询后tab菜单的节点信息
        tabQueryInfo: [],
        // 组件宽度
        componentWidth: 0,
        // 底部滑块的移动距离
        scrollBarLeft: 0,
        // 组件到屏幕左边的巨鹿
        componentLeft: 0,
        // 当前选中的itemIndex
        currentIndex: this.current,
        // 标记底部滑块是否第一次移动，第一次移动的时候不触发动画
        barMoveFirst: true
      }
    },
    watch: {
      // 监听tab的变化，重新计算tab菜单信息
      list(newValue, oldValue) {
        // list变化时，重置内部索引，防止出现超过数据边界的问题
        if (newValue.length !== oldValue.length) this.currentIndex = 0
        this.$nextTick(() => {
          this.init()
        })
      },
      current: {
        handler(val) {
          this.$nextTick(() => {
            this.currentIndex = val
            this.scrollByIndex()
          })
        },
        immediate: true
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      // 初始化变量
      async init() {
        // 获取tabs组件的信息
        let tabRect = await this._tGetRect('#' + this.id)
        // 计算组件的宽度
        this.componentLeft = tabRect.left
        this.componentWidth = tabRect.width
        this.getTabRect()
      },
      // 点击tab菜单
      clickTab(index) {
        if (index === this.currentIndex) return
        this.$emit('change', index)
      },
      // 查询tab的布局信息
      getTabRect() {
        let query = uni.createSelectorQuery().in(this)
        // 遍历所有的tab
        for (let i = 0; i < this.list.length; i++) {
          query.select(`#tn-tabs__scroll-view__item-${i}`).fields({
            size: true,
            rect: true
          })
        }
        query.exec((res) => {
          this.tabQueryInfo = res
          // 初始滚动条和底部滑块的位置
          this.scrollByIndex()
        })
      },
      // 滚动scrollView，让活动的tab处于屏幕中间
      scrollByIndex() {
        // 当前获取tab的布局信息
        let tabInfo = this.tabQueryInfo[this.currentIndex]
        if (!tabInfo) return
        
        // 活动tab的宽度
        let tabWidth = tabInfo.width
        // 活动item的左边到组件左边的距离
        let offsetLeft = tabInfo.left - this.componentLeft
        // 计算scroll-view移动的距离
        let scrollLeft = offsetLeft - (this.componentWidth - tabWidth) / 2
        this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft
        
        // 计算当前滑块需要移动的距离，当前活动item的中点到左边的距离减去滑块宽度的一半
        let left = tabInfo.left + tabInfo.width / 2 - this.componentLeft
        
        // 计算当前活跃item到组件左边的距离
        this.scrollBarLeft = left - uni.upx2px(this.barWidth) / 2
        
        // 防止在计算时出错，所以延迟执行标记不是第一次移动
        if (this.barMoveFirst) {
          setTimeout(() => {
            this.barMoveFirst = false
          }, 100)
        }
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
  
  .tn-tabs {
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
