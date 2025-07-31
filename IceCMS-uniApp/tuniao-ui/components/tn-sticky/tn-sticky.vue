<template>
  <view class="tn-sticky-class">
    <view
      class="tn-sticky__wrap"
      :class="[stickyClass]"
      :style="[stickyStyle]"
    >
      <view
        class="tn-sticky__item"
        :style="{
          position: fixed ? 'fixed' : 'static',
          top: stickyTop + 'px',
          left: left + 'px',
          width: width === 'auto' ? 'auto' : width + 'px',
          zIndex: elZIndex
        }"
      >
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-sticky',
    props: {
      // 吸顶容器到顶部某个距离的时候进行吸顶
      // 在H5中，customNavBar的高度为45px
      offsetTop: {
        type: Number,
        default: 0
      },
      // H5顶部导航栏的高度
      h5NavHeight: {
        type: Number,
        default: 45
      },
      // 自定义顶部导航栏高度
      customNavHeight: {
        type: Number,
        default: 0
      },
      // 是否开启吸顶
      enabled: {
        type: Boolean,
        default: true
      },
      // 吸顶容器的背景颜色
      backgroundColor: {
        type: String,
        default: '#FFFFFF'
      },
      // z-index
      zIndex: {
        type: Number,
        default: 0
      },
      // 索引值，区分不同的吸顶组件
      index: {
        type: [String, Number],
        default: ''
      }
    },
    computed: {
      elZIndex() {
        return this.zIndex ? this.zIndex : this.$t.zIndex.sticky
      },
      backgroundColorStyle() {
        return this.$t.color.getBackgroundColorStyle(this.backgroundColor)
      },
      backgroundColorClass() {
        return this.$t.color.getBackgroundColorInternalClass(this.backgroundColor)
      },
      stickyClass() {
        let clazz = ''
        clazz += this.elClass
        if (this.backgroundColorClass) {
          clazz += ` ${this.backgroundColorClass}`
        }
        return clazz
      },
      stickyStyle() {
        let style = {}
        style.height = this.fixed ? this.height + 'px' : 'auto'
        if (this.backgroundColorStyle) {
          style.color = this.backgroundColorStyle
        }
        if (this.elZIndex) {
          style.zIndex = this.elZIndex
        }
        return style
      }
    },
    data() {
      return {
        // 监听组件别名
        stickyObserverName: 'tnStickyObserver',
        // 组件的唯一编号
        elClass: this.$t.uuid(),
        // 是否固定
        fixed: false,
        // 高度
        height: 'auto',
        // 宽度
        width: 'auto',
        // 距离顶部的距离
        stickyTop: 0,
        // 左边距离
        left: 0
      }
    },
    watch: {
      offsetTop(val) {
        this.initObserver()
      },
      enabled(val) {
        if (val === false) {
          this.fixed = false
          this.disconnectObserver(this.stickyObserverName)
        } else {
          this.initObserver()
        }
      },
      customNavHeight(val) {
        this.initObserver()
      }
    },
    mounted() {
      this.initObserver()
    },
    methods: {
      // 初始化监听组件的布局状态
      initObserver() {
        if (!this.enabled) return
        // #ifdef H5
        this.stickyTop = this.offsetTop != 0 ? uni.upx2px(this.offsetTop) + this.h5NavHeight : this.h5NavHeight
        // #endif
         // #ifndef H5
         this.stickyTop = this.offsetTop != 0 ? uni.upx2px(this.offsetTop) + this.customNavHeight : this.customNavHeight
         // #endif
         
         this.disconnectObserver(this.stickyObserverName)
         this._tGetRect('.' + this.elClass).then((res) => {
           this.height = res.height
           this.left = res.left
           this.width = res.width
           this.$nextTick(() => {
             this.connectObserver()
           })
         })
      },
      // 监听组件的布局状态
      connectObserver() {
        this.disconnectObserver(this.stickyObserverName)
        // 组件内获取布局状态，不能用uni.createIntersectionObserver，而必须用this.createIntersectionObserver
        const contentObserver = this.createIntersectionObserver({
          thresholds: [0.95, 0.98, 1]
        })
        contentObserver.relativeToViewport({
          top: -this.stickyTop
        })
        contentObserver.observe('.' + this.elClass, res => {
          if (!this.enabled) return
          this.setFixed(res.boundingClientRect.top)
        })
        this[this.stickyObserverName] = contentObserver
      },
      // 设置是否固定
      setFixed(top) {
        const fixed = top < this.stickyTop
        if (fixed) this.$emit('fixed', this.index)
        else if (this.fixed) this.$emit('unfixed', this.index)
        this.fixed = fixed
      },
      // 停止监听组件的布局状态
      disconnectObserver(observerName) {
        const observer = this[observerName]
        observer && observer.disconnect()
      }
    }
  }
</script>

<style>
</style>
