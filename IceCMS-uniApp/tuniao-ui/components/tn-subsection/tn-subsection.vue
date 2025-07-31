<template>
  <view
    class="tn-subsection-class tn-subsection"
    :class="[subsectionBackgroundColorClass]"
    :style="[subsectionStyle]"
  >
    <!-- 滑块 -->
    <block v-for="(item, index) in listInfo" :key="index">
      <view
        class="tn-subsection__item tn-text-ellipsis"
        :class="[
          'section-item-' + index,
          noBorderRight(index)
        ]"
        :style="[itemStyle(index)]"
        @tap="click(index)"
      >
        <view class="tn-subsection__item--text tn-text-ellipsis" :style="[textStyle(index)]">
          {{ item.name }}
        </view>
      </view>
    </block>
    <!-- 背景 -->
    <view
      class="tn-subsection__bg"
      :class="[itemBarClass]"
      :style="[itemBarStyle]"
    ></view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    mixins: [componentsColorMixin],
    name: 'tn-subsection',
    props: {
      // 模式选择
      // button 按钮模式 subsection 分段模式
      mode: {
        type: String,
        default: 'subsection'
      },
      // 组件高度
      height: {
        type: Number,
        default: 60
      },
      // tab的数据
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // 当前活动tab的index
      current: {
        type: [Number, String],
        default: 0
      },
      // 激活时的字体颜色
      activeColor: {
        type: String,
        default: '#FFFFFF'
      },
      // 未激活时的字体颜色
      inactiveColor: {
        type: String,
        default: '#AAAAAA'
      },
      // 激活tab的字体是否加粗
      bold: {
        type: Boolean,
        default: false
      },
      backgroundColor: {
        type: String,
        default: '#F4F4F4'
      },
      // 滑块的颜色
      buttonColor: {
        type: String,
        default: '#01BEFF'
      },
      // 当mode为button时生效，圆角的值，单位rpx
      borderRadius: {
        type: Number,
        default: 10
      },
      // 是否开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 动画类型
      // cubic-bezier -> 贝塞尔曲线
      animationType: {
        type: String,
        default: ''
      },
      // 滑动滑块的是否，是否触发震动
      vibrateShort: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 列表数据
        listInfo: [],
        // 子元素的背景样式
        itemBgStyle: {
          width: 0,
          left: 0,
          backgroundColor: '#ffffff',
          height: '100%'
        },
        // 当前选中的滑块
        currentIndex: this.current,
        buttonPadding: 3,
        // 组件初始化的是否current变换不应该震动
        firstVibrateShort: true
      }
    },
    watch: {
      current: {
        handler(val) {
          this.currentIndex = val
          this.changeSectionStatus(val)
        },
        immediate: true
      }
    },
    created() {
      // 将list的数据，传入listInfo数组
      // 接受直接数组形式，或者数组元素为对象的形式，如：['开启', '关闭'],或者[{name: '开启'}, {name: '关闭'}]
      this.listInfo = this.list.map((item, index) => {
        if (typeof item !== 'object') {
          let obj = {
            width: 0,
            name: item
          }
          return obj
        } else {
          item.width = 0
          return obj
        }
      })
    },
    computed: {
      // 设置mode=subsection时，滑块没有样式
      noBorderRight() {
        return index => {
          if (this.mode !== 'subsection') return
          let clazz = ''
          // 不显示右边的边距
          if (index < this.list.length - 1) clazz += ' tn-subsection__item--none-border-right'
          // 显示整个组件的左右边圆角
          if (index === 0) clazz += ' tn-subsection__item--first'
          if (index === this.list.length - 1) clazz += ' tn-subsection__item--last'
          return clazz
        }
      },
      // 文字的样式
      textStyle() {
        return index => {
          let style = {}
          // 设置字体颜色
          if (index === this.currentIndex) {
            style.color = this.activeColor
          } else {
            style.color = this.inactiveColor
          }
          // 字体加粗
          if (index === this.currentIndex && this.bold) style.fontWeight = 'bold'
          // 文字大小
          style.fontSize = (this.fontSize || 26) + this.fontUnit
          return style
        }
      },
      // 每个分段器item的样式
      itemStyle() {
        return index => {
          let style = {}
          if (this.fontSizeStyle) {
            style.fontSize = this.fontSizeStyle
          }
          if (this.mode === 'subsection') {
            // 设置border的样式
            style.borderColor = this.buttonColor
            style.borderWidth = '1rpx'
            style.borderStyle = 'solid'
          }
          return style
        }
      },
      // mode = button时，设置外层view的样式
      subsectionStyle() {
        let style = {}
        style.height = this.height + 'rpx'
        if (this.mode === 'button') {
          style.backgroundColor = this.backgroundColorStyle
          style.padding = `${this.buttonPadding}px`
          style.borderRadius = `${this.borderRadius}rpx`
        }
        return style
      },
      // mode = button时，设置外层view的背景class
      subsectionBackgroundColorClass() {
        let clazz = ''
        if (this.mode === 'button' && this.backgroundColorClass) {
          clazz = this.backgroundColorClass
        }
        return clazz
      },
      itemBarClass() {
        let clazz = ''
        const buttonBgClass = this.$t.color.getBackgroundColorInternalClass(this.buttonColor)
        if (this.animation) {
          clazz += ' tn-subsection__bg__animation'
          if (this.animationType) {
            clazz += ` tn-subsection__bg__animation--${this.animationType}`
          }
        }
        if (buttonBgClass) {
          clazz += ` ${buttonBgClass}`
        }
        return clazz
      },
      // 滑块样式
      itemBarStyle() {
        let style = {}
        const buttonBgStyle = this.$t.color.getBackgroundColorStyle(this.buttonColor)
        if (buttonBgStyle) {
          style.backgroundColor = this.buttonColor
        }
        style.zIndex = 1
        if (this.mode === 'button') {
          style.borderRadius = `${this.borderRadius}rpx`
          style.bottom = `${this.buttonPadding}px`
          style.height = (this.height - (this.buttonPadding * 4)) + 'rpx'
          style.zIndex = 0
        }
        return Object.assign(this.itemBgStyle, style)
      }
    },
    mounted() {
      // 等待加载组件完成
      setTimeout(() => {
        this.getTabsInfo()
      }, 10)
    },
    methods: {
      // 改变滑块样式
      changeSectionStatus(val) {
        if (this.mode === 'subsection') {
          // 根据滑块在最左和最右时，显示对应的圆角
          if (val === this.list.length - 1) {
            this.itemBgStyle.borderRadius = `0 ${this.buttonPadding}px ${this.buttonPadding}px 0`
          }
          if (val === 0) {
            this.itemBgStyle.borderRadius = `${this.buttonPadding}px 0 0 ${this.buttonPadding}px`
          }
          if (val > 0 && val < this.list.length - 1) {
            this.itemBgStyle.borderRadius = '0'
          }
        }
        // 更新滑块的位置
        setTimeout(() => {
          this.itemBgLeft()
        }, 10)
        if (this.vibrateShort && !this.firstVibrateShort) {
          // 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
          // #ifndef H5
          uni.vibrateShort();
          // #endif
        }
        this.firstVibrateShort = false
      },
      // 获取各个tab的节点信息
      getTabsInfo() {
        let view = uni.createSelectorQuery().in(this)
        for (let i = 0; i < this.list.length; i++) {
          view.select('.section-item-' + i).boundingClientRect()
        }
        view.exec(res => {
          // 如果没有获取到，则重新获取
          if (!res.length) {
            setTimeout(() => {
              this.getTabsInfo()
              return
            }, 10)
          }
          // 将每个分段器的宽度放入listInfo中
          res.map((item, index) => {
            this.listInfo[index].width = item.width
          })
          // 初始化滑块的宽度
          if (this.mode === 'subsection') {
            this.itemBgStyle.width = this.listInfo[0].width + 'px'
          } else if (this.mode === 'button') {
            this.itemBgStyle.width = this.listInfo[0].width + 'px'
          }
          
          // 初始化滑块的位置
          this.itemBgLeft()
        })
      },
      // 设置滑块的位置
      itemBgLeft() {
        let left = 0
        // 计算当前活跃item到组件左边的距离
        this.listInfo.map((item, index) => {
          if (index < this.currentIndex) left += item.width
        })
        // 根据不同的模式，计算滑块的位置
        if (this.mode === 'subsection') {
          this.itemBgStyle.left = left + 'px'
        } else if (this.mode === 'button') {
          this.itemBgStyle.left = left + this.buttonPadding + 'px'
        }
      },
      
      // 点击事件
      click(index) {
        // 不允许点击当前激活的选项
        if (index === this.currentIndex) return
        this.currentIndex = index
        this.changeSectionStatus(index)
        this.$emit('change', {
          index: Number(index),
          name: this.listInfo[index]['name']
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-subsection {
    /* #ifndef APP-PLUS */
    display: flex;
    flex-direction: row;
    /* #endif */
    align-items: center;
    overflow: hidden;
    position: relative;
    
    &__item {
      /* #ifndef APP-PLUS */
      display: flex;
      flex-direction: row;
      /* #endif */
      flex: 1;
      text-align: center;
      font-size: 26rpx;
      height: 100%;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      padding: 0 6rpx;
      
      
      &--text {
        transition: all 0.3s;
        color: #FFFFFF;
        /* #ifndef APP-PLUS */
        display: flex;
        flex-direction: row;
        /* #endif */
        align-items: center;
        position: relative;
        z-index: 3;
      }
      
      &--first {
        border-top-left-radius: 8rpx;
        border-bottom-left-radius: 8rpx;
      }
      
      &--last {
        border-top-right-radius: 8rpx;
        border-bottom-right-radius: 8rpx;
      }
      
      &--none-border-right {
        border-right: none !important;
      }
    }
    
    &__bg {
      background-color: $tn-main-color;
      position: absolute;
      z-index: -1;
      transition-property: all;
      transition-duration: 0s;
      transition-timing-function: linear;
      
      &__animation {
        transition-duration: 0.25s !important;
        
        &--cubic-bezier {
          transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
        }
      }
    }
  }
  
</style>
