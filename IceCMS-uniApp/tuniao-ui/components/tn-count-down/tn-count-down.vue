<template>
  <view class="tn-countdown-class tn-countdown">
    <view
      v-if="showDays && (hideZeroDay || (!hideZeroDay && d != '00'))"
      class="tn-countdown__item"
      :class="[backgroundColorClass]"
      :style="[itemStyle]"
    >
      <view class="tn-countdown__item__time" :class="[fontColorClass]" :style="[letterStyle]">
        {{ d }}
      </view>
    </view>
    <view 
      v-if="showHours && (hideZeroDay || (!hideZeroDay && d != '00'))"
      class="tn-countdown__separator"
      :style="{
        fontSize: separatorSize + 'rpx',
        color: separatorColor,
        paddingBottom: separator === 'en' ? '4rpx' : 0
      }"
    >
      {{ separator === 'en' ? ':' : '天'}}
    </view>
    
    <view
      v-if="showHours"
      class="tn-countdown__item"
      :class="[backgroundColorClass]"
      :style="[itemStyle]"
    >
      <view class="tn-countdown__item__time" :class="[fontColorClass]" :style="[letterStyle]">
        {{ h }}
      </view>
    </view>
    <view 
      v-if="showMinutes"
      class="tn-countdown__separator"
      :style="{
        fontSize: separatorSize + 'rpx',
        color: separatorColor,
        paddingBottom: separator === 'en' ? '4rpx' : 0
      }"
    >
      {{ separator === 'en' ? ':' : '时'}}
    </view>
    
    <view
      v-if="showMinutes"
      class="tn-countdown__item"
      :class="[backgroundColorClass]"
      :style="[itemStyle]"
    >
      <view class="tn-countdown__item__time" :class="[fontColorClass]" :style="[letterStyle]">
        {{ m }}
      </view>
    </view>
    <view 
      v-if="showSeconds"
      class="tn-countdown__separator"
      :style="{
        fontSize: separatorSize + 'rpx',
        color: separatorColor,
        paddingBottom: separator === 'en' ? '4rpx' : 0
      }"
    >
      {{ separator === 'en' ? ':' : '分'}}
    </view>
    
    <view
      v-if="showSeconds"
      class="tn-countdown__item"
      :class="[backgroundColorClass]"
      :style="[itemStyle]"
    >
      <view class="tn-countdown__item__time" :class="[fontColorClass]" :style="[letterStyle]">
        {{ s }}
      </view>
    </view>
    <view 
      v-if="showSeconds && separator === 'cn'"
      class="tn-countdown__separator"
      :style="{
        fontSize: separatorSize + 'rpx',
        color: separatorColor,
        paddingBottom: separator === 'en' ? '4rpx' : 0
      }"
    >
      秒
    </view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-count-down',
    mixins: [componentsColorMixin],
    props: {
      // 倒计时时间，秒作为单位
      timestamp: {
        type: Number,
        default: 0
      },
      // 是否自动开始
      autoplay: {
        type: Boolean,
        default: true
      },
      // 数字框高度
      height: {
        type: [String, Number],
        default: 'auto'
      },
      // 分隔符类型
      // en -> 使用英文的冒号 cn -> 使用中文进行分割
      separator: {
        type: String,
        default: 'en'
      },
      // 分割符大小
      separatorSize: {
        type: Number,
        default: 30
      },
      // 分隔符颜色
      separatorColor: {
        type: String,
        default: '#080808'
      },
      // 是否显示边框
      showBorder: {
        type: Boolean,
        default: false
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: '#080808'
      },
      // 是否显示秒
      showSeconds: {
        type: Boolean,
        default: true
      },
      // 是否显示分
      showMinutes: {
        type: Boolean,
        default: true
      },
      // 是否显示时
      showHours: {
        type: Boolean,
        default: true
      },
      // 是否显示天
      showDays: {
        type: Boolean,
        default: true
      },
      // 如果当天的部分为0时，是否隐藏不显示
      hideZeroDay: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      // 倒计时item的样式
      itemStyle() {
        let style = {}
        if (this.height) {
          style.height = this.$t.string.getLengthUnitValue(this.height)
          style.width = style.height
        }
        if (this.showBorder) {
          style.borderStyle = 'solid'
          style.borderColor = this.borderColor
          style.borderWidth = '1rpx'
        }
        style.backgroundColor = this.backgroundColorStyle || '#FFFFFF'
        return style
      },
      // 倒计时数字样式
      letterStyle() {
        let style = {}
        style.fontSize = this.fontSizeStyle || '30rpx'
        style.color = this.fontColorStyle || '#080808'
        return style
      }
    },
    data() {
      return {
        d: '00',
        h: '00',
        m: '00',
        s: '00',
        // 定时器
        timer: null,
        // 记录倒计过程中变化的秒数
        seconds: 0
      }
    },
    watch: {
      // 监听时间戳变化
      timestamp(value) {
        this.clearTimer()
        this.start()
      }
    },
    mounted() {
      // 如果时自动倒计时，加载完成开始计时
      this.autoplay && this.timestamp && this.start()
    },
    beforeDestroy() {
      this.clearTimer()
    },
    methods: {
      // 开始倒计时
      start() {
        // 避免可能出现的倒计时重叠情况
        this.clearTimer()
        if (this.timestamp <= 0) return
        this.seconds = Number(this.timestamp)
        this.formatTime(this.seconds)
        this.timer = setInterval(() => {
          this.seconds--
          // 发出change事件
          this.$emit('change', this.seconds)
          if (this.seconds < 0) {
            return this.end()
          }
          this.formatTime(this.seconds)
        }, 1000)
      },
      // 格式化时间
      formatTime(seconds) {
        // 小于等于0的话，结束倒计时
        seconds <= 0 && this.end()
        let [day, hour, minute, second] = [0, 0, 0, 0]
        day = Math.floor(seconds / (60 * 60 * 24))
        // 如果不显示天，则将天对应的小时计入到小时中
        // 先把当前的hour计算出来供分和秒使用
        hour = Math.floor(seconds / (60 * 60)) - (day * 24)
        let showHour = null
        if (this.showDays) {
          showHour = hour
        } else {
          // 将天数对应的小时加入到时中进行显示
          showHour = Math.floor(seconds / (60 * 60))
        }
        minute = Math.floor(seconds / 60) - (hour * 60) - (day * 24 * 60)
        second = Math.floor(seconds) - (minute * 60) - (hour * 60 * 60) - (day * 24 * 60 * 60)
        // 如果小于0在前面进行补0操作
        showHour = this.$t.number.formatNumberAddZero(showHour)
        minute = this.$t.number.formatNumberAddZero(minute)
        second = this.$t.number.formatNumberAddZero(second)
        day = this.$t.number.formatNumberAddZero(day)
        
        this.d = day
        this.h = showHour
        this.m = minute
        this.s = second
      },
      // 倒计时结束
      end() {
        this.clearTimer()
        this.$emit('end')
      },
      // 清除倒计时
      clearTimer() {
        if (this.timer !== null) {
          clearInterval(this.timer)
          this.timer = null
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-countdown {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    align-items: center;
    
    &__item {
      box-sizing: content-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 2rpx;
      border-radius: 6rpx;
      white-space: nowrap;
      transform: translateZ(0);
      
      &__time {
        margin: 0;
        padding: 0;
        line-height: 1;
      }
    }
    
    &__separator {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0 5rpx;
      line-height: 1;
    }
  }
</style>
