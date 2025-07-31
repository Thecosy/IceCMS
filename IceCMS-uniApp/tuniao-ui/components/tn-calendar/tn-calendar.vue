<template>
  <tn-popup
    v-model="value"
    mode="bottom"
    :popup="false"
    length="auto"
    :borderRadius="borderRadius"
    :safeAreaInsetBottom="safeAreaInsetBottom"
    :maskCloseable="maskCloseable"
    :closeBtn="closeBtn"
    :zIndex="elIndex"
    @close="close"
  >
    <view class="tn-calendar-class tn-calendar">
      <!-- 头部 -->
      <view class="tn-calendar__header">
        <view v-if="!$slots.tooltip || !$slots.$tooltip" class="tn-calendar__header__text">
          {{ toolTips }}
        </view>
        <view v-else>
          <slot name="tooltip"></slot>
        </view>
      </view>
      
      <!-- 操作提示信息 -->
      <view class="tn-calendar__action">
        <view v-if="changeYear" class="tn-calendar__action__icon" :style="{backgroundColor: yearArrowColor}" @tap.stop="changeYearHandler(false)">
          <view><text class="tn-icon-left"></text></view>
        </view>
        <view v-if="changeMonth" class="tn-calendar__action__icon" :style="{backgroundColor: monthArrowColor}" @tap.stop="changeMonthHandler(false)">
          <view><text class="tn-icon-left"></text></view>
        </view>
        <view class="tn-calendar__action__text">{{ dateTitle }}</view>
        <view v-if="changeMonth" class="tn-calendar__action__icon" :style="{backgroundColor: monthArrowColor}" @tap.stop="changeMonthHandler(true)">
          <view><text class="tn-icon-right"></text></view>
        </view>
        <view v-if="changeYear" class="tn-calendar__action__icon" :style="{backgroundColor: yearArrowColor}" @tap.stop="changeYearHandler(true)">
          <view><text class="tn-icon-right"></text></view>
        </view>
      </view>
      
      <!-- 星期中文标识 -->
      <view class="tn-calendar__week-day-zh">
        <view v-for="(item,index) in weekDayZh" :key="index" class="tn-calendar__week-day-zh__text">{{ item }}</view>
      </view>
      
      <!-- 日历主体 -->
      <view class="tn-calendar__content">
        <!-- 前置空白部分 -->
        <block v-for="(item, index) in weekdayArr" :key="index">
          <view class="tn-calendar__content__item"></view>
        </block>
        <view
          v-for="(item, index) in daysArr"
          :key="index"
          class="tn-calendar__content__item"
          :class="{
            'tn-hover': disabledChoose(year, month, index + 1),
            'tn-calendar__content--start-date': (mode === 'range' && startDate == `${year}-${month}-${index+1}`) || mode === 'date',
            'tn-calendar__content--end-date': (mode === 'range' && endDate == `${year}-${month}-${index+1}`) || mode === 'date'
          }"
          :style="{
            backgroundColor: colorValue(index, 'bg')
          }"
          @tap.stop="dateClick(index)"
        >
          <view class="tn-calendar__content__item__text" :style="{color: colorValue(index, 'text')}">
            <view>{{ item.day }}</view>
          </view>
          <view class="tn-calendar__content__item__tips" :style="{color: item.color}">
            {{ item.bottomInfo }}
          </view>
        </view>
        
        <view class="tn-calendar__content__month--bg">{{ month }}</view>
      </view>
      
      <!-- 底部 -->
      <view class="tn-calendar__bottom">
        <view class="tn-calendar__bottom__choose">
          <text>{{ mode === 'date' ? activeDate : startDate }}</text>
          <text v-if="endDate">至{{ endDate }}</text>
        </view>
        <view class="tn-calendar__bottom__btn" :style="{backgroundColor: btnColor}" @click="handleBtnClick(false)">
          <view class="tn-calendar__bottom__btn--text">确定</view>
        </view>
      </view>
    </view>
  </tn-popup>
</template>

<script>
  import Calendar from '../../libs/utils/calendar.js'
  
  export default {
    name: 'tn-calendar',
    props: {
      // 双向绑定控制组件弹出与收起
      value: {
        type: Boolean,
        default: false
      },
      // 模式
      // date -> 单日期 range -> 日期范围
      mode: {
        type: String,
        default: 'date'
      },
      // 是否允许切换年份
      changeYear: {
        type: Boolean,
        default: true
      },
      // 是否允许切换月份
      changeMonth: {
        type: Boolean,
        default: true
      },
      // 可切换的最大年份
      maxYear: {
        type: [Number, String],
        default: 2100
      },
      // 可切换的最小年份
      minYear: {
        type: [Number, String],
        default: 1970
      },
      // 最小日期(不在范围被不允许选择)
      minDate: {
        type: String,
        default: '1970-01-01'
      },
      // 最大日期，如果为空则默认为今天
      maxDate: {
        type: String,
        default: ''
      },
      // 切换月份按钮的颜色
      monthArrowColor: {
        type: String,
        default: '#AAAAAA'
      },
      // 切换年份按钮的颜色
      yearArrowColor: {
        type: String,
        default: '#C8C8C8'
      },
      // 默认字体颜色
      color: {
        type: String,
        default: '#080808'
      },
      // 选中|起始结束日期背景颜色
      activeBgColor: {
        type: String,
        default: '#01BEFF'
      },
      // 选中|起始结束日期文字颜色
      activeColor: {
        type: String,
        default: '#FFFFFF'
      },
      // 范围日期内的背景颜色
      rangeBgColor: {
        type: String,
        default: '#E6E6E655'
      },
      // 范围日期内的文字颜色
      rangeColor: {
        type: String,
        default: '#01BEFF'
      },
      // 起始日期显示的文字，mode=range时生效
      startText: {
        type: String,
        default: '开始'
      },
      // 结束日期显示的文字，mode=range时生效
      endText: {
        type: String,
        default: '结束'
      },
      // 按钮背景颜色
      btnColor: {
        type: String,
        default: '#01BEFF'
      },
      // 农历文字的颜色
      lunarColor: {
        type: String,
        default: '#AAAAAA'
      },
      // 选中日期是否有选中效果
      isActiveCurrent: {
        type: Boolean,
        default: true
      },
      // 切换年月是否触发事件，mode=date时生效
      isChange: {
        type: Boolean,
        default: false
      },
      // 是否显示农历
      showLunar: {
        type: Boolean,
        default: true
      },
      // 顶部提示文字
      toolTips: {
        type: String,
        default: '请选择日期'
      },
      // 显示圆角的大小
      borderRadius: {
        type: Number,
        default: 8
      },
      // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
      	type: Boolean,
      	default: false
      },
      // 是否可以通过点击遮罩进行关闭
      maskCloseable: {
      	type: Boolean,
      	default: true
      },
      // zIndex
      zIndex: {
        type: Number,
        default: 0
      },
      // 是否显示关闭按钮
      closeBtn: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      dateChange() {
        return `${this.mode}-${this.minDate}-${this.maxDate}`
      },
      elIndex() {
        return this.zIndex ? this.zIndex : this.$t.zIndex.popup
      },
      colorValue() {
        return (index, type) => {
          let color = type === 'bg' ? '' : this.color
          let day = index + 1
          let date = `${this.year}-${this.month}-${day}`
          let timestamp = new Date(date.replace(/\-/g,'/')).getTime()
          let start = this.startDate.replace(/\-/g,'/')
          let end = this.endDate.replace(/\-/g,'/')
          if ((this.mode === 'date' && this.isActiveCurrent && this.activeDate == date) || this.startDate == date || this.endDate == date) {
            color = type === 'bg' ? this.activeBgColor : this.activeColor
          } else if (this.endDate && timestamp > new Date(start).getTime() && timestamp < new Date(end).getTime()) {
            color = type === 'bg' ? this.rangeBgColor : this.rangeColor
          }
          return color
        }
      }
    },
    data() {
      return {
        // 星期几，1-7
        weekday: 1,
        weekdayArr: [],
        // 星期对应的中文
        weekDayZh: ['日','一','二','三','四','五','六'],
        // 当前月有多少天
        days: 0,
        daysArr: [],
        year: 2021,
        month: 0,
        day: 0,
        startYear: 0,
        startMonth: 0,
        startDay: 0,
        endYear: 0,
        endMonth: 0,
        endDay: 0,
        today: '',
        activeDate: '',
        startDate: '',
        endDate: '',
        min: null,
        max: null,
        // 日期标题
        dateTitle: '',
        // 标记是否已经选择了开始日期
        chooseStart: false
      }
    },
    watch: {
      dateChange() {
        this.init()
      }
    },
    created() {
      this.init()
    },
    methods: {
      // 初始化
      init() {
        let now = new Date()
        this.year = now.getFullYear()
        this.month = now.getMonth() + 1
        this.day = now.getDate()
        this.today = `${this.year}-${this.month}-${this.day}`
        this.activeDate = this.today
        this.min = this.initDate(this.minDate)
        this.max = this.initDate(this.maxDate || this.today)
        this.startDate = ''
        this.startYear = 0
        this.startMonth = 0
        this.startDay = 0
        this.endDate = ''
        this.endYear = 0
        this.endMonth = 0
        this.endDay = 0
        this.chooseStart = false
        this.changeData()
      },
      // 切换月份
      changeMonthHandler(add) {
        if (add) {
          let month = this.month + 1
          let year = month > 12 ? this.year + 1 : this.year
          if (!this.checkRange(year)) {
            this.month = month > 12 ? 1 : month
            this.year = year
            this.changeData()
          }
        } else {
          let month = this.month - 1
          let year = month < 1 ? this.year - 1 : this.year
          if (!this.checkRange(year)) {
            this.month = month < 1 ? 12 : month
            this.year = year
            this.changeData()
          }
        }
      },
      // 切换年份
      changeYearHandler(add) {
        let year = add ? this.year + 1 : this.year - 1
        if (!this.checkRange(year)) {
          this.year = year
          this.changeData()
        }
      },
      // 日期点击事件
      dateClick(day) {
        day += 1
        if (!this.disabledChoose(this.year, this.month, day)) {
          this.day = day
          let date = `${this.year}-${this.month}-${day}`
          if (this.mode === 'date') {
            this.activeDate = date
          } else {
            let startTimeCompare = new Date(date.replace(/\-/g,'/')).getTime() < new Date(this.startDate.replace(/\-/g,'/')).getTime()
            if (!this.chooseStart || startTimeCompare) {
              this.startDate = date
              this.startYear = this.year
              this.startMonth = this.month
              this.startDay = this.day
              this.endYear = 0
              this.endMonth = 0
              this.endDay = 0
              this.endDate = ''
              this.activeDate = ''
              this.chooseStart = true
            } else {
              this.endDate = date
              this.endYear = this.year
              this.endMonth = this.month
              this.endDay = this.day
              this.chooseStart = false
            }
          }
          this.daysArr = this.handleDaysArr()
        }
      },
      // 修改日期数据
      changeData() {
        this.days = this.getMonthDay(this.year, this.month)
        this.daysArr = this.handleDaysArr()
        this.weekday = this.getMonthFirstWeekDay(this.year, this.month)
        this.weekdayArr = this.generateArray(1, this.weekday)
        this.dateTitle = `${this.year}年${this.month}月`
        if (this.isChange && this.mode === 'date') {
          this.handleBtnClick(true)
        }
      },
      // 处理按钮点击
      handleBtnClick(show) {
        if (!show) {
          this.close()
        }
        if (this.mode === 'date') {
          let arr = this.activeDate.split('-')
          let year = this.isChange ? this.year : Number(arr[0])
          let month = this.isChange ? this.month : Number(arr[1])
          let day = this.isChange ? this.day : Number(arr[2])
          let days = this.getMonthDay(year, month)
          let result = `${year}-${this.formatNumber(month)}-${this.formatNumber(day)}`
          let weekText = this.getWeekText(result)
          let isToday = false
          if (`${year}-${month}-${day}` === this.today) {
            isToday = true
          }
          this.$emit('change', {
            year,
            month,
            day,
            days,
            week: weekText,
            isToday,
            date: result,
            // 是否为切换年月操作
            switch: show
          })
        } else {
          if (!this.startDate || !this.endDate) return
          
          let startMonth = this.formatNumber(this.startMonth)
          let startDay = this.formatNumber(this.startDay)
          let startDate = `${this.startYear}-${startMonth}-${startDay}`
          let startWeek = this.getWeekText(startDate)
          
          let endMonth = this.formatNumber(this.endMonth)
          let endDay = this.formatNumber(this.endDay)
          let endDate = `${this.endYear}-${endMonth}-${endDay}`
          let endWeek = this.getWeekText(endDate)
          
          this.$emit('change', {
            startYear: this.startYear,
            startMonth: this.startMonth,
            startDay: this.startDay,
            startDate,
            startWeek,
            endYear: this.endYear,
            endMonth: this.endMonth,
            endDay: this.endDay,
            endDate,
            endWeek
          })
        }
      },
      // 判断是否允许选择
      disabledChoose(year, month, day) {
        let flag = true
        let date = `${year}/${month}/${day}`
        let min = `${this.min.year}/${this.min.month}/${this.min.day}`
        let max = `${this.max.year}/${this.max.month}/${this.max.day}`
        let timestamp = new Date(date).getTime()
        if (timestamp >= new Date(min).getTime() && timestamp <= new Date(max).getTime()) {
          flag = false
        }
        return flag
      },
      // 检查是否在日期范围内
      checkRange(year) {
        let overstep = false
        if (year < this.minYear || year > this.maxYear) {
          uni.showToast({
            title: '所选日期超出范围',
            icon: 'none'
          })
          overstep = true
        }
        return overstep
      },
      // 处理日期
      initDate(date) {
        let fdate = date.split('-')
        return {
          year: Number(fdate[0] || 1970),
          month: Number(fdate[1] || 1),
          day: Number(fdate[2] || 1)
        }
      },
      // 处理日期数组
      handleDaysArr() {
        let days = this.generateArray(1, this.days)
        let daysArr = days.map((item) => {
          let bottomInfo = this.showLunar ? Calendar.solar2lunar(this.year, this.month, item).IDayCn : ''
          let color = this.showLunar ? this.lunarColor : this.activeColor
          if (
            (this.mode === 'date' && this.day == item) || 
            (this.mode === 'range' && (this.startDay == item || this.endDay == item))
          ) {
            color = this.activeColor
          }
          if (this.mode === 'range') {
            if (this.startDay == item && this.startDay != this.endDay) {
              bottomInfo = this.startText
            }
            if (this.endDay == item) {
              bottomInfo = this.endText
            }
          }
          
          return {
            day: item,
            color: color,
            bottomInfo: bottomInfo
          }
        })
        return daysArr
      },
      // 获取对应月有多少天
      getMonthDay(year, month) {
        return new Date(year, month, 0).getDate()
      },
      // 获取对应月的第一天时星期几
      getMonthFirstWeekDay(year, month) {
        return new Date(`${year}/${month}/01 00:00:00`).getDay()
      },
      // 获取对应星期的文本
      getWeekText(date) {
        date = new Date(`${date.replace(/\-/g, '/')} 00:00:00`)
        let week = date.getDay()
        return '星期' + this.weekDayZh[week]
      },
      // 生成日期天数数组
      generateArray(start, end) {
        return Array.from(new Array(end + 1).keys()).slice(start)
      },
      // 格式化数字
      formatNumber(num) {
        return num < 10 ? '0' + num : num + ''
      },
      // 关闭窗口
      close() {
        this.$emit('input', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-calendar {
    color: $tn-font-color;
    
    &__header {
      width: 100%;
      box-sizing: border-box;
      font-size: 30rpx;
      background-color: #FFFFFF;
      color: $tn-main-color;
      
      &__text {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 30rpx;
        padding: 0 60rpx;
      }
    }
    
    &__action {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 40rpx 0 40rpx 0;
      
      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 16rpx;
        width: 32rpx;
        height: 32rpx;
        font-size: 20rpx;
        // line-height: 32rpx;
        border-radius: 50%;
        color: #FFFFFF;
      }
      
      &__text {
        padding: 0 16rpx;
        color: $tn-font-color;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
    
    &__week-day-zh {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 12rpx 0;
      overflow: hidden;
      box-shadow: 16rpx 6rpx 8rpx 0 #E6E6E6;
      margin-bottom: 2rpx;
      
      &__text {
        flex: 1;
        text-align: center;
      }
    }
    
    &__content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      padding: 12rpx 0;
      box-sizing: border-box;
      background-color: #F7F7F7;
      position: relative;
      
      &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 14.2857%;
        padding: 12rpx 0;
        margin: 6rpx 0;
        overflow: hidden;
        position: relative;
        z-index: 2;
        // box-shadow: inset 0rpx 0rpx 22rpx 4rpx rgba(255,255,255, 0.52);
        
        &__text {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 80rpx;
          font-size: 32rpx;
          position: relative;
        }
        
        &__tips {
          position: absolute;
          width: 100%;
          line-height: 24rpx;
          left: 0;
          bottom: 8rpx;
          text-align: center;
          z-index: 2;
          transform-origin: center center;
          transform: scale(0.8);
        }
      }
      
      &--start-date {
        border-top-left-radius: 8rpx;
        border-bottom-left-radius: 8rpx;
      }
      
      &--end-date {
        border-top-right-radius: 8rpx;
        border-bottom-right-radius: 8rpx;
      }
      
      &__month {
        &--bg {
          position: absolute;
          font-size: 200rpx;
          line-height: 200rpx;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: $tn-font-holder-color;
          z-index: 1;
        }
      }
    }
    
    &__bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      background-color: #F7F7F7;
      padding: 0 40rpx 30rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      color: $tn-font-sub-color;
      
      &__choose {
        height: 50rpx;
      }
      
      &__btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 60rpx;
        border-radius: 40rpx;
        color: #FFFFFF;
        font-size: 28rpx;
      }
    }
  }
</style>
