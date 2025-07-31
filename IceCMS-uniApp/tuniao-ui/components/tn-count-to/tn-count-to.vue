<template>
  <view
    class="tn-count-num-class tn-count-num"
    :class="[fontColorClass]"
    :style="{
      fontSize: fontSizeStyle || '50rpx',
      fontWeight: bold ? 'bold' : 'normal',
      color: fontColorStyle || '#080808'
    }"
  >
    {{ displayValue }}
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-count-to',
    mixins: [componentsColorMixin],
    props: {
      // 开始的数值，默认为0
      startVal: {
        type: Number,
        default: 0
      },
      // 结束目标数值
      endVal: {
        type: Number,
        default: 0,
        required: true
      },
      // 是否自动开始
      autoplay: {
        type: Boolean,
        default: true
      },
      // 滚动到目标值的持续时间，单位为毫秒
      duration: {
        type: Number,
        default: 2000
      },
      // 是否在即将结束的时候使用缓慢滚动的效果
      useEasing: {
        type: Boolean,
        default: true
      },
      // 显示的小数位数
      decimals: {
        type: Number,
        default: 0
      },
      // 十进制的分割符
      decimalSeparator: {
        type: String,
        default: '.'
      },
      // 千分位的分隔符
      // 类似金额的分割(￥23,321.05中的",")
      thousandthsSeparator: {
        type: String,
        default: ''
      },
      // 是否显示加粗字体
      bold: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      countDown() {
        return this.startVal > this.endVal
      }
    },
    data() {
      return {
        localStartVal: this.startVal,
        localDuration: this.duration,
        // 显示的数值
        displayValue: this.formatNumber(this.startVal),
        // 打印的数值
        printValue: null,
        // 是否暂停
        paused: false,
        // 开始时间戳
        startTime: null,
        // 停留时间戳
        remainingTime: null,
        // 当前时间戳
        timestamp: null,
        // 上一次的时间戳
        lastTime: 0,
        rAF: null
      }
    },
    watch: {
      startVal() {
        this.autoplay && this.start()
      },
      endVal() {
        this.autoplay && this.start()
      }
    },
    mounted() {
      this.autoplay && this.start()
    },
    methods: {
      // 开始滚动
      start() {
        this.localStartVal = this.startVal
        this.startTime = null
        this.localDuration = this.duration
        this.paused = false
        this.rAF = this.requestAnimationFrame(this.count)
      },
      // 重新开始
      reStart() {
        if (this.paused) {
          this.resume()
          this.paused = false
        } else {
          this.stop()
          this.paused = true
        }
      },
      // 停止
      stop() {
        this.cancelAnimationFrame(this.rAF)
      },
      // 恢复
      resume() {
        this.startTime = null
        this.localDuration = this.remainingTime
        this.localStartVal = this.printValue
        this.requestAnimationFrame(this.count)
      },
      // 重置
      reset() {
        this.startTime = null
        this.cnacelAnimationFrame(this.rAF)
        this.displayValue = this.formatNumber(this.startVal)
      },
      // 销毁组件
      destroyed() {
        this.cancelAnimationFrame(this.rAF)
      },
      // 累加时间
      count(timestamp) {
        if (!this.startTime) this.startTime = timestamp
        this.timestamp = timestamp
        const progress = timestamp - this.startTime
        this.remainingTime = this.localDuration - progress
        if (this.useEasing) {
          if (this.countDown) {
            this.printValue = this.localStartVal - this.easingFn(progress, 0, this.localStartVal - this.endVal, this.localDuration)
          } {
            this.printValue = this.easingFn(progress, this.localStartVal, this.endVal - this.localStartVal, this.localDuration)
          }
        } else {
          if (this.countDown) {
            this.printValue = this.localStartVal - (this.localStartVal - this.endVal) * (progress / this.localDuration)
          } else {
            this.printValue = this.localStartVal + (this.endVal - this.localStartVal) * (progress / this.localDuration)
          }
        }
        if (this.countDown) {
          this.printValue = this.printValue < this.endVal ? this.endVal : this.printValue
        } else {
          this.printValue = this.printValue > this.endVal ? this.endVal : this.printValue
        }
        
        this.displayValue = this.formatNumber(this.printValue)
        if (progress < this.localDuration) {
          this.rAF = this.requestAnimationFrame(this.count)
        } else {
          this.$emit('end')
        }
      },
      // 缓动时间计算
      easingFn(t, b, c, d) {
        return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
      },
      // 请求帧动画
      requestAnimationFrame(cb) {
        const currentTime = new Date().getTime()
        // 为了使setTimteout的尽可能的接近每秒60帧的效果
        const timeToCall = Math.max(0, 16 - (currentTime - this.lastTime))
        const timerId = setTimeout(() => {
          cb && cb(currentTime + timeToCall)
        }, timeToCall)
        this.lastTime = currentTime + timeToCall
        return timerId
      },
      // 清除帧动画
      clearAnimationFrame(timerId) {
        clearTimeout(timerId)
      },
      // 格式化数值
      formatNumber(number) {
        const reg = /(\d+)(\d{3})/
        number = Number(number)
        number = number.toFixed(Number(this.decimals))
        number += ''
        const numberArray = number.split('.')
        let num1 = numberArray[0]
        const num2 = numberArray.length > 1 ? this.decimalSeparator + numberArray[1] : ''
        
        if (this.thousandthsSeparator && !this.isNumber(this.thousandthsSeparator)) {
          while(reg.test(num1)) {
            num1 = num1.replace(reg, '$1' + this.thousandthsSeparator + '$2')
          }
        }
        return num1 + num2
      },
      // 判断是否为数字
      isNumber(val) {
        return !isNaN(parseFloat(val))
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-count-num {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    text-align: center;
    line-height: 1;
  }
</style>
