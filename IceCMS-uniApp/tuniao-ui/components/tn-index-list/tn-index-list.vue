<template>
  <!-- 支付宝小程序使用_tGetRect()获取组件的根元素尺寸，所以在外面套一个"壳" -->
  <view>
    <view class="tn-index-list-class tn-index-list">
      <slot></slot>
      
      <!-- 侧边栏 -->
      <view
        v-if="showSidebar"
        class="tn-index-list__sidebar"
        @touchstart.stop.prevent="onTouchMove"
        @touchmove.stop.prevent="onTouchMove"
        @touchend.stop.prevent="onTouchStop"
        @touchcancel.stop.prevent="onTouchStop"
      >
        <view
          v-for="(item, index) in indexList"
          :key="index"
          class="tn-index-list__sidebar__item"
          :style="{
            zIndex: zIndex + 1,
            color: activeAnchorIndex === index ? activeColor : ''
          }"
        >
          {{ item }}
        </view>
      </view>
      
      <!-- 选中弹出框 -->
      <view
        v-if="touchMove && indexList[touchMoveIndex]"
        class="tn-index-list__alert"
        :style="{
          zIndex: selectAlertZIndex
        }"
      >
        <text>{{ indexList[touchMoveIndex] }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  // 生成 A-Z的字母列表
  let indexList = function() {
    let indexList = []
    let charCodeOfA = 'A'.charCodeAt(0)
    for (var i = 0; i < 26; i++) {
      indexList.push(String.fromCharCode(charCodeOfA + i))
    }
    return indexList
  }
  
  export default {
    name: 'tn-index-list',
    props: {
      // 索引列表
      indexList: {
        type: Array,
        default() {
          return indexList()
        }
      },
      // 是否自动吸顶
      sticky: {
        type: Boolean,
        default: true
      },
      // 自动吸顶时距离顶部的距离，单位px
      stickyTop: {
        type: Number,
        default: 0
      },
      // 自定义顶栏的高度，单位px
      customBarHeight: {
        type: Number,
        default: 0
      },
      // 当前滚动的高度
      // 由于自定义组件无法获取滚动高度，所以依赖传入
      scrollTop: {
        type: Number,
        default: 0
      },
      // 选中索引时的颜色
      activeColor: {
        type: String,
        default: '#01BEFF'
      },
      // 吸顶时的z-index
      zIndex: {
        type: Number,
        default: 0
      }
    },
    computed: {
      // 选中索引列表弹出提示框的z-index
      selectAlertZIndex() {
        return this.$t.zIndex.toast
      },
      // 吸顶的偏移高度
      stickyOffsetTop() {
        // #ifdef H5
        return this.stickyTop !== '' ? this.stickyTop : 44
        // #endif
        // #ifndef H5
        return this.stickyTop !== '' ? this.stickyTop : 0
        // #endif
      }
    },
    data() {
      return {
        // 当前激活的列表锚点的序号
        activeAnchorIndex: 0,
        // 显示侧边索引栏
        showSidebar: true,
        // 标记是否开始触摸移动
        touchMove: false,
        // 当前触摸移动到对应索引的序号
        touchMoveIndex: 0,
        // 滚动到对应锚点的序号
        scrollToAnchorIndex: 0,
        // 侧边栏的信息
        sidebar: {
          height: 0,
          top: 0
        },
        // 内容区域高度
        height: 0,
        // 内容区域top
        top: 0
      }
    },
    watch: {
      scrollTop() {
        this.updateData()
      }
    },
    created() {
      // 只能在created生命周期定义childrens，如果在data定义，会因为循环引用而报错
      this.childrens = []
    },
    methods: {
      // 更新数据
      updateData() {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.showSidebar = !!this.childrens.length
          this.getRect().then(() => {
            this.onScroll()
          })
        }, 0)
      },
      // 获取对应的信息
      getRect() {
        return Promise.all([
          this.getAnchorRect(),
          this.getListRect(),
          this.getSidebarRect()
        ])
      },
      // 获取列表内容子元素信息
      getAnchorRect() {
        return Promise.all(this.childrens.map((child, index) => {
          child._tGetRect('.tn-index-anchor__wrap').then((rect) => {
            Object.assign(child, {
              height: rect.height,
              top: rect.top - this.customBarHeight
            })
          })
        }))
      },
      // 获取列表信息
      getListRect() {
        return this._tGetRect('.tn-index-list').then(rect => {
          Object.assign(this, {
            height: rect.height,
            top: rect.top + this.scrollTop
          })
        })
      },
      // 获取侧边滚动栏信息
      getSidebarRect() {
        return this._tGetRect('.tn-index-list__sidebar').then(rect => {
          this.sidebar = {
            height: rect.height,
            top: rect.top
          }
        })
      },
      // 滚动事件
      onScroll() {
        const {
          childrens = []
        } = this
        if (!childrens.length) {
          return
        }
        const {
          sticky,
          stickyOffsetTop,
          zIndex,
          scrollTop,
          activeColor
        } = this
        const active = this.getActiveAnchorIndex()
        this.activeAnchorIndex = active
        if (sticky) {
          let isActiveAnchorSticky = false
          if (active !== -1) {
            isActiveAnchorSticky = childrens[active].top <= 0
          }
          childrens.forEach((item, index) => {
            if (index === active) {
              let wrapperStyle = ''
              let anchorStyle = {
                color: `${activeColor}`
              }
              if (isActiveAnchorSticky) {
                wrapperStyle = {
                  height: `${childrens[index].height}px`
                }
                anchorStyle = {
                  position: 'fixed',
                  top: `${stickyOffsetTop}px`,
                  zIndex: `${zIndex ? zIndex : this.$t.zIndex.indexListSticky}`,
                  color: `${activeColor}`
                }
              }
              item.active = true
              item.wrapperStyle = wrapperStyle
              item.anchorStyle = anchorStyle
            } else if (index === active - 1) {
              const currentAnchor = childrens[index]
              const currentOffsetTop = currentAnchor.top
              const targetOffsetTop = index === childrens.length - 1 ? this.top : childrens[index + 1].top
              const parentOffsetHeight = targetOffsetTop - currentOffsetTop
              const translateY = parentOffsetHeight - currentAnchor.height
              const anchorStyle = {
                position: 'relative',
                transform: `translate3d(0, ${translateY}px, 0)`,
                zIndex: `${zIndex ? zIndex : this.$t.zIndex.indexListSticky}`,
                color: `${activeColor}`
              }
              item.active = false
              item.anchorStyle = anchorStyle
            } else {
              item.active = false
              item.wrapperStyle = ''
              item.anchorStyle = ''
            }
          })
        }
      },
      // 触摸移动
      onTouchMove(event) {
        this.touchMove = true
        const sidebarLength = this.childrens.length
        const touch = event.touches[0]
        const itemHeight = this.sidebar.height / sidebarLength
        let clientY = touch.clientY
        let index = Math.floor((clientY - this.sidebar.top) / itemHeight)
        if (index < 0) {
          index = 0
        } else if (index > sidebarLength - 1) {
          index = sidebarLength - 1
        }
        this.touchMoveIndex = index
        this.scrollToAnchor(index)
      },
      // 触摸停止
      onTouchStop() {
        this.touchMove = false
        this.scrollToAnchorIndex = null
      },
      // 获取当前的锚点序号
      getActiveAnchorIndex() {
        const {
          childrens,
          sticky
        } = this
        for (let i = this.childrens.length - 1; i >= 0; i--) {
          const preAnchorHeight = i > 0 ? childrens[i - 1].height : 0
          const reachTop = sticky ? preAnchorHeight : 0
          if (reachTop >= childrens[i].top) {
            return i
          }
        }
        return -1
      },
      // 滚动到对应的锚点
      scrollToAnchor(index) {
        if (this.scrollToAnchorIndex === index) {
          return
        }
        this.scrollToAnchorIndex = index
        const anchor = this.childrens.find(item => item.index === this.indexList[index])
        if (anchor) {
          const scrollTop = anchor.top + this.scrollTop
          this.$emit('select', {
            index: anchor.index,
            scrollTop: scrollTop
          })
          uni.pageScrollTo({
            duration:0,
            scrollTop: scrollTop
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-index-list {
    position: relative;
    
    &__sidebar {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 50%;
      right: 0;
      text-align: center;
      transform: translateY(-50%);
      user-select: none;
      z-index: 99;
      
      &__item {
        font-weight: 500;
        padding: 8rpx 18rpx;
        font-size: 22rpx;
        line-height: 1;
      }
    }
    
    &__alert {
      display: flex;
      flex-direction: row;
      position: fixed;
      width: 120rpx;
      height: 120rpx;
      top: 50%;
      right: 90rpx;
      align-items: center;
      justify-content: center;
      margin-top: -60rpx;
      border-radius: 24rpx;
      font-size: 50rpx;
      color: #FFFFFF;
      background-color: $tn-font-sub-color;
      padding: 0;
      z-index: 9999999;
      
      text {
        line-height: 50rpx;
      }
    }
  }
</style>
