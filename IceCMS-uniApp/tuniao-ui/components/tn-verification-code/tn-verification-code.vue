<template>
  <view class="tn-code-class tn-code">
    
  </view>
</template>

<script>
  export default {
    name: 'tn-verification-code',
    props: {
      // 倒计时总秒数
      seconds: {
        type: Number,
        default: 60
      },
      // 开始时提示文字
      startText: {
        type: String,
        default: '获取验证码'
      },
      // 倒计时提示文字
      countDownText: {
        type: String,
        default: 's秒后重新获取'
      },
      // 结束时提示文字
      endText: {
        type: String,
        default: '重新获取'
      },
      // 是否在H5刷新或各端返回再进入时继续倒计时
      keepRunning: {
      	type: Boolean,
      	default: false
      },
      // 为了区分多个页面，或者一个页面多个倒计时组件本地存储的继续倒计时变了
      uniqueKey: {
      	type: String,
      	default: ''
      }
    },
    data() {
      return {
        timer: null,
        secNum: this.seconds,
        // 是否可以执行验证码操作
        canGetCode: true
      }
    },
    watch: {
      seconds: {
        handler(n) {
          this.secNum = n
        },
        immediate: true
      }
    },
    mounted() {
      this.checkKeepRunning()
    },
    beforeDestroy() {
      this.setTimeToStorage()
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    methods: {
      // 检查是否继续运行
      checkKeepRunning() {
        // 获取上一次退出页面时的时间戳，如果没有上次保存，该值为空
        let lastTimestamp = Number(uni.getStorageSync(this.uniqueKey + '_$tCountDownTimestamp'))
        if (!lastTimestamp) return this.changeEvent(this.startText)
        // 当前秒的时间戳
        // + new Date() 相当于 new Date().getTime()
        let nowTimestamp = Math.floor((+ new Date()) / 1000)
        // 判断当前的时间戳，是否小于上一次的设定结束的时间，提前于结束的时间戳
        if (this.keepRunning && lastTimestamp && lastTimestamp > nowTimestamp) {
          // 剩余尚未执行完倒计时秒数
          this.secNum = lastTimestamp - nowTimestamp
          // 清除本地保存的变量
          uni.removeStorageSync(this.uniqueKey + '_$tCountDownTimestamp')
          // 开始倒计时
          this.start()
        } else {
          // 如果不存在需要继续上一次的倒计时，执行正常的逻辑
          this.changeEvent(this.startText);
        }
      },
      // 开始倒计时
      start() {
        // 防止快速点击获取验证码按钮导致产生多个定时器导致混乱
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        this.$emit('start')
        this.canGetCode = false
        
        this.changeEvent(this.countDownText.replace(/s|S/, this.secNum))
        this.setTimeToStorage()
        this.timer = setInterval(() => {
          if (--this.secNum) {
            this.changeEvent(this.countDownText.replace(/s|S/, this.secNum))
          } else {
            // 倒计时结束，清空定时器、重置提示信息
            this.reset()
            this.$emit('end')
          }
        }, 1000)
      },
      // 重置倒计时
      reset() {
        this.canGetCode = true
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        this.secNum = this.seconds
        this.changeEvent(this.endText)
      },
      // 倒计时改变事件
      changeEvent(text) {
        this.$emit('change', text)
      },
      // 保存当前时间戳
      // 防止倒计时尚未结束，H5刷新或者各端的右上角返回上一页再进来
      setTimeToStorage() {
        if (!this.keepRunning ||!this.timer) return
        // 记录当前的时间戳，为了下次进入页面，如果还在倒计时内的话，继续倒计时
        // 倒计时尚未结束，结果大于0；倒计时已经开始，就会小于初始值，如果等于初始值，说明没有开始倒计时，无需处理
        if (this.secNum > 0 && this.secNum <= this.seconds) {
          let nowTimestamp = Math.floor((+ new Date()) / 1000)
          // 保存本次倒计时结束时候的时间戳
          uni.setStorageSync(this.uniqueKey + '_$tCountDownTimestamp', nowTimestamp + this.secNum)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-code {
    width: 0;
    height: 0;
    position: fixed;
    z-index: -1;
  }
</style>
