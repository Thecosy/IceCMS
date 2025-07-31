<template>
  <view class="tn-number-keyboard-class tn-number-keyboard" @touchmove.stop.prevent="() => {}">
    <view class="tn-number-keyboard__grids">
      <view
        v-for="(item, index) in dataList"
        :key="index"
        class="tn-number-keyboard__grids__item"
        :class="{
          'tn-bg-gray--light': showGaryBg(index),
          'tn-border-solid-top': index <= 2,
          'tn-border-solid-bottom': index < 9,
          'tn-border-solid-right': (index + 1) % 3 != 0
        }"
        :hover-class="hoverClass(index)"
        :hover-stay-time="150"
        @tap="keyboardClick(item)"
      >
        <view class="tn-number-keyboard__grids__btn">{{ item }}</view>
      </view>
      
      <view
        class="tn-number-keyboard__grids__item tn-bg-gray--light"
        hover-class="tn-hover"
        :hover-stay-time="150"
        @touchstart.stop="backspaceClick"
        @touchend="clearTimer"
      >
        <view class="tn-number-keyboard__grids__btn tn-number-keyboard__back">
          <view class="tn-icon-left-arrow tn-number-keyboard__back__icon"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-number-keyboard',
    props: {
      // 键盘类型
      // number -> 数字键盘 card -> 身份证键盘
      mode: {
        type: String,
        default: 'number'
      },
      // 是否显示键盘的'.'符号
      dotEnabled: {
        type: Boolean,
        default: true
      },
      // 是否为乱序键盘
      randomEnabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      // 键盘显示的内容
      dataList() {
        let tmp = []
        if (!this.dotEnabled && this.mode === 'number') {
          if (!this.randomEnabled) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
          } else {
            let data = this.$t.array.random([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
            data.splice(-1, 0, '')
            return data
          }
        } else if (this.dotEnabled && this.mode === 'number') {
          if (!this.randomEnabled) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0]
          } else {
            let data = this.$t.array.random([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
            data.splice(-1, 0, this.dot)
            return data
          }
        } else if (this.mode === 'card') {
          if (!this.randomEnabled) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0]
          } else {
            let data = this.$t.array.random([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
            data.splice(-1, 0, this.cardX)
            return data
          }
        }
      },
      // 按键的样式
      keyStyle() {
        return index => {
          let style = {}
          if (this.mode === 'number' && !this.dotEnabled && index === 9) style.flex = '0 0 66.6666666666%'
          return style
        }
      },
      // 是否让按键显示灰色，只在数字键盘和非乱序且在点击时
      showGaryBg() {
        return index => {
          if (!this.randomEnabled && index === 9 && (this.mode !== 'number' || (this.mode === 'number' && this.dotEnabled))) return true
          else return false
        }
      },
      // 手指停留的class
      hoverClass() {
        return index => {
          if (this.mode === 'number' && !this.dotEnabled && index === 9) return ''
          if (!this.randomEnabled && index === 9 && (this.mode === 'number' && this.dotEnabled || this.mode === 'card')) return 'tn-hover'
          else return 'tn-number-keyboard--hover'
        }
      }
    },
    data() {
      return {
        // 退格键内容
        backspace: 'backspace',
        // 点内容
        dot: '.',
        // 长按多次删除事件监听
        longPressDeleteTimer: null,
        // 身份证的X符号
        cardX: 'X'
      }
    },
    methods: {
      // 点击退格键
      backspaceClick() {
        this.$emit('backspace')
        this.clearTimer()
        this.longPressDeleteTimer = setInterval(() => {
          this.$emit('backspace')
        }, 250)
      },
      // 获取键盘显示的内容
      keyboardClick(value) {
        if (this.mode === 'number' && !this.dotEnabled && value === '') return
        // 允许键盘显示点模式和触发非点按键时，将内容转换为数字类型
        if (this.dotEnabled && value != this.dot && value != this.cardX) value = Number(value)
        this.$emit('change', value)
      },
      // 清除定时器
      clearTimer() {
        if (this.longPressDeleteTimer) {
          clearInterval(this.longPressDeleteTimer)
          this.longPressDeleteTimer = null
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-number-keyboard {
    position: relative;
    
    &__grids {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-end;
      
      &__item {
        display: flex;
        flex-direction: row;
        flex: 0 0 33.3333333333%;
        align-items: center;
        justify-content: center;
        height: 110rpx;
        text-align: center;
        font-size: 50rpx;
        color: $tn-font-color;
        font-weight: 500;
      }
    }
    
    &__back {
      font-size: 38rpx;
    }
    
    &--hover {
      background-color: $tn-font-holder-color;
    }
  }
</style>
