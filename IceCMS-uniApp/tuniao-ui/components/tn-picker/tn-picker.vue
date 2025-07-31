<template>
  <view v-if="value" class="tn-picker-class tn-picker">
    <tn-popup
      v-model="value"
      mode="bottom"
      :popup="false"
      length="auto"
      :safeAreaInsetBottom="safeAreaInsetBottom"
      :maskCloseable="maskCloseable"
      :zIndex="elZIndex"
      @close="close"
    >
      <view class="tn-picker__content" :style="{ zIndex: elZIndex }">
        <!-- 顶部 -->
        <view class="tn-picker__content__header tn-border-solid-bottom" @touchmove.stop.prevent>
          <!-- 取消按钮 -->
          <view
            class="tn-picker__content__header__btn tn-picker__content__header--cancel"
            :style="{ color: cancelColor }"
            hover-class="tn-hover-class"
            :hover-stay-time="150"
            @tap="getResult('cancel')"
          >{{cancelText}}</view>
          <!-- 标题 -->
          <view class="tn-picker__content__header__title">{{ title }}</view>
          <!-- 确认按钮 -->
          <view
            class="tn-picker__content__header__btn tn-picker__content__header--confirm"
            :style="{ color: moving ? cancelColor : confirmColor}"
            hover-class="tn-hover-class"
            :hover-stay-time="150"
            @touchmove.stop
            @tap.stop="getResult('confirm')"
          >{{confirmText}}</view>
        </view>
        <!-- 主体 -->
        <view class="tn-picker__content__body">
          <!-- 地区选择 -->
          <picker-view
            v-if="mode === 'region'"
            class="tn-picker__content__body__view"
            :value="valueArr"
            @change="change"
            @pickstart="pickStart"
            @pickend="pickEnd"
          >
            <picker-view-column v-if="!reset && params.province">
              <view class="tn-picker__content__body__item" v-for="(item, index) in provinces" :key="index">
                <view class="tn-text-ellipsis">{{ item.label }}</view>
              </view>
            </picker-view-column>
            <picker-view-column v-if="!reset && params.city">
              <view class="tn-picker__content__body__item" v-for="(item, index) in citys" :key="index">
                <view class="tn-text-ellipsis">{{ item.label }}</view>
              </view>
            </picker-view-column>
            <picker-view-column v-if="!reset && params.area">
              <view class="tn-picker__content__body__item" v-for="(item, index) in areas" :key="index">
                <view class="tn-text-ellipsis">{{ item.label }}</view>
              </view>
            </picker-view-column>
          </picker-view>
          <!-- 时间选择 -->
          <picker-view
            v-else-if="mode === 'time'"
            class="tn-picker__content__body__view"
            :value="valueArr"
            @change="change"
            @pickstart="pickStart"
            @pickend="pickEnd"
          >
            <picker-view-column v-if="!reset && params.year">
              <view class="tn-picker__content__body__item" v-for="(item, index) in years" :key="index">
                {{ item }}
                <text v-if="showTimeTag" class="tn-picker__content__body__item__text">年</text>
              </view>
            </picker-view-column>
            <picker-view-column v-if="!reset && params.month">
              <view class="tn-picker__content__body__item" v-for="(item, index) in months" :key="index">
                {{ formatNumber(item) }}
                <text v-if="showTimeTag" class="tn-picker__content__body__item--text">月</text>
              </view>
            </picker-view-column>
            <picker-view-column v-if="!reset && params.day">
              <view class="tn-picker__content__body__item" v-for="(item, index) in days" :key="index">
                {{ formatNumber(item) }}
                <text v-if="showTimeTag" class="tn-picker__content__body__item--text">日</text>
              </view>
            </picker-view-column>
            <picker-view-column v-if="!reset && params.hour">
              <view class="tn-picker__content__body__item" v-for="(item, index) in hours" :key="index">
                {{ formatNumber(item) }}
                <text v-if="showTimeTag" class="tn-picker__content__body__item--text">时</text>
              </view>
            </picker-view-column>
            <picker-view-column v-if="!reset && params.minute">
              <view class="tn-picker__content__body__item" v-for="(item, index) in minutes" :key="index">
                {{ formatNumber(item) }}
                <text v-if="showTimeTag" class="tn-picker__content__body__item--text">分</text>
              </view>
            </picker-view-column>
            <picker-view-column v-if="!reset && params.second">
              <view class="tn-picker__content__body__item" v-for="(item, index) in seconds" :key="index">
                {{ formatNumber(item) }}
                <text v-if="showTimeTag" class="tn-picker__content__body__item--text">秒</text>
              </view>
            </picker-view-column>
          </picker-view>
          <!-- 单列选择 -->
          <picker-view
            v-else-if="mode === 'selector'"
            class="tn-picker__content__body__view"
            :value="valueArr"
            @change="change"
            @pickstart="pickStart"
            @pickend="pickEnd"
          >
            <picker-view-column v-if="!reset">
              <view class="tn-picker__content__body__item" v-for="(item, index) in range" :key="index">
                <view class="tn-text-ellipsis">{{ getItemValue(item, 'selector') }}</view>
              </view>
            </picker-view-column>
          </picker-view>
          <!-- 多列选择 -->
          <picker-view
            v-else-if="mode === 'multiSelector'"
            class="tn-picker__content__body__view"
            :value="valueArr"
            @change="change"
            @pickstart="pickStart"
            @pickend="pickEnd"
          >
            <picker-view-column v-if="!reset" v-for="(item, index) in range" :key="index">
              <view class="tn-picker__content__body__item" v-for="(sub_item, sub_index) in item" :key="sub_index">
                <view class="tn-text-ellipsis">{{ getItemValue(sub_item, 'multiSelector') }}</view>
              </view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </tn-popup>
  </view>
</template>

<script>
  import provinces from '../../libs/utils/province.js'
  import citys from '../../libs/utils/city.js'
  import areas from '../../libs/utils/area.js'
  
  export default {
    name: 'tn-picker',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      // 顶部标题
      title: {
        type: String,
        default: ''
      },
      // picker中显示的参数
      params: {
        type: Object,
        default() {
          return {
            year: true,
            month: true,
            day: true,
            hour: false,
            minute: false,
            second: false,
            province: true,
            city: true,
            area: true,
            timestamp: true
          }
        }
      },
      // 模式选择，region-地区类型，time-时间类型，selector-单列模式，multiSelector-多列模式
      mode: {
        type: String,
        default: 'time'
      },
      // 当mode=selector或者mode=multiSelector时，提供的数组
      range: {
        type: Array,
        default() {
          return []
        }
      },
      // 当mode=selector或者mode=multiSelector时，提供的默认项下标
      defaultSelector: {
        type: Array,
        default() {
          return [0]
        }
      },
      // 当range是一个Array<Object>时，通过rangeKey来指定Object中key的值作为显示的内容
      rangeKey: {
        type: String,
        default: ''
      },
      // 时间模式 ，是否显示时间后的单位
      showTimeTag: {
        type: Boolean,
        default: true
      },
      // 开始年份
      startYear: {
        type: [String, Number],
        default: 1950
      },
      // 结束年份
      endYear: {
        type: [String, Number],
        default: 2050
      },
      // 默认显示的时间
      // 2021-09-01 || 2021-09-01 13:00:23 || 2021/09/01
      defaultTime: {
        type: String,
         default: ''
      },
      // 默认显示的地区
      // 可传类似["广东省", "广州市", "天河区"]
      defaultRegin: {
        type: Array,
        default() {
          return []
        }
      },
      // 默认显示的地区编码
      // 可传类似["11", "1101", "110101"]
      // 如果defaultRegin和areaCode同时存在，优先使用areaCode的值
      areaCode: {
        type: Array,
        default() {
          return []
        }
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: '取消'
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: ''
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: '确认'
      },
      // 确认按钮的演示
      confirmColor: {
        type: String,
        default: ''
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // 是否允许通过点击遮罩关闭
      maskCloseable: {
        type: Boolean,
        default: true
      },
      zIndex: {
        type: Number,
        default: 0
      }
    },
    computed: {
      // 监听参数变化
      propsChange() {
        return [this.mode, this.defaultTime, this.startYear, this.endYear, this.defaultRegin, this.areaCode]
      },
      // 监听地区发生变化
      regionChange() {
        return [this.province, this.city]
      },
      // 监听年月发生变化
      yearAndMonth() {
        return [this.year, this.month]
      },
      elZIndex() {
        return this.zIndex ? this.zIndex : this.$t.zIndex.popup
      }
    },
    data() {
      return {
        years: [],
        months: [],
        days: [],
        hours: [],
        minutes: [],
        seconds: [],
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        reset: false,
        startDate: '',
        endDate: '',
        valueArr: [],
        provinces: provinces,
        citys: citys[0],
        areas: areas[0][0],
        province: 0,
        city: 0,
        area: 0,
        // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
        moving: false
      }
    },
    watch: {
      propsChange() {
        this.reset = true
        setTimeout(() => this.init(), 10)
      },
      regionChange() {
        // 如果地区发生变化，为了让picker联动起来，必须重置this.citys和this.areas
        this.citys = citys[this.province]
        this.areas = areas[this.province][this.city]
      },
      yearAndMonth() {
        // 月份的变化，实时变更日的天数，因为不同月份，天数不一样
        // 一个月可能有30，31天，甚至闰年2月的29天，平年2月28天
        if (this.params.year) this.setDays()
      },
      value(val) {
        // 微信和QQ小程序由于一些奇怪的原因(故同时对所有平台均初始化一遍)，需要重新初始化才能显示正确的值
        if (val) {
          this.reset = true
          setTimeout(() => this.init(), 10)
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      // 记录开始滑动
      pickStart() {
        // #ifdef MP-WEIXIN
        this.moving = true
        // #endif
      },
      // 记录滚动结束
      pickEnd() {
        // #ifdef MP-WEIXIN
        this.moving = false
        // #endif
      },
      // 根据传递的列表的数据获取显示的数据
      getItemValue(item, mode) {
        // 单列模式或者多列模式中的getItemValue同时被执行，故在这里再加一层判断
        if (this.mode === mode) {
          return typeof item === 'object' ? item[this.rangeKey] : item
        }
      },
      // 往数字前面补0
      formatNumber(num) {
        return this.$t.number.formatNumberAddZero(num)
      },
      // 生成递进的数组
      generateArray(start, end) {
        // 转为数值格式，否则用户给end-year等传递字符串值时，下面的end+1会导致字符串拼接，而不是相加
        start = Number(start)
        end = Number(end)
        end = end > start ? end : start
        // 生成数组并获取其中索引然后提取出来(获取开始和结束之间的数据)
        return [...Array(end+1).keys()].slice(start)
      },
      getIndex(arr, val) {
        let index = arr.indexOf(val)
        // 如果index为-1着找不到元素
        // ~(-1)=(-1)-1=0
        return ~index ? index : 0
      },
      // 日期时间处理
      initTimeValue() {
        // 格式化时间，在IE浏览器(uni不存在此情况)，无法识别日期间的"-"间隔符号
        let fdate = this.defaultTime.replace(/\-/g, '/')
        fdate = fdate && fdate.indexOf('/') == -1 ? `2021/01/01 ${fdate}` : fdate
        let time = null
        if (fdate) time = new Date(fdate)
        else time = new Date()
        // 获取年月日时分秒
        this.year = time.getFullYear()
        this.month = time.getMonth() + 1
        this.day = time.getDate()
        this.hour = time.getHours()
        this.minute = time.getMinutes()
        this.second = time.getSeconds()
      },
      // 初始化数据
      init() {
        this.valueArr = []
        this.reset = false
        if (this.mode === 'time') {
          this.initTimeValue()
          if (this.params.year) {
            this.valueArr.push(0)
            this.setYears()
          }
          if (this.params.month) {
            this.valueArr.push(0)
            this.setMonths()
          }
          if (this.params.day) {
            this.valueArr.push(0)
            this.setDays()
          }
          if (this.params.hour) {
            this.valueArr.push(0)
            this.setHours()
          }
          if (this.params.minute) {
            this.valueArr.push(0)
            this.setMinutes()
          }
          if (this.params.second) {
            this.valueArr.push(0)
            this.setSeconds()
          }
        } else if (this.mode === 'region') {
          if (this.params.province) {
            this.valueArr.push(0)
            this.setProvinces()
          }
          if (this.params.city) {
            this.valueArr.push(0)
            this.setCitys()
          }
          if (this.params.area) {
            this.valueArr.push(0)
            this.setAreas()
          }
        } else if (this.mode === 'selector') {
          this.valueArr = this.defaultSelector
        } else if (this.mode === 'multiSelector') {
          this.valueArr = this.defaultSelector
          this.multiSelectorValue = this.defaultSelector
        }
        this.$forceUpdate()
      },
      // 设置picker某一列的值
      setYears() {
        this.years = this.generateArray(this.startYear, this.endYear)
        // 设置this.valueArr某一项的值，是为了让picker预选中某一个值
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.years, this.year))
      },
      setMonths() {
        this.months = this.generateArray(1, 12)
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.months, this.month))
      },
      setDays() {
        let totalDays = new Date(this.year, this.month, 0).getDate()
        this.days = this.generateArray(1, totalDays)
        let index = 0
        // 避免多次触发导致值数组计算错误
        if (this.params.year && this.params.month) index = 2
        else if (this.params.month) index = 1
        else if (this.params.year) index = 1
        else index = 0
        
        // 当月份变化时，会导致日期的天数也会变化，如果原来选的天数大于变化后的天数，则重置为变化后的最大值
        // 比如原来选中3月31日，调整为2月后，日期变为最大29，这时如果day值继续为31显然不合理，于是将其置为29(picker-column从1开始)
        if (this.day > this.days.length) this.day = this.days.length
        this.valueArr.splice(index, 1, this.getIndex(this.days, this.day))
      },
      setHours() {
        this.hours = this.generateArray(0, 23)
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.hours, this.hour))
      },
      setMinutes() {
        this.minutes = this.generateArray(0, 59)
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.minutes, this.minute))
      },
      setSeconds() {
        this.seconds = this.generateArray(0, 59)
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.seconds, this.second))
      },
      setProvinces() {
        if (!this.params.province) return
        let tmp = ''
        let useCode = false
        // 如果同时配置了defaultRegion和areaCode，优先使用areaCode参数
        if (this.areaCode.length) {
          tmp = this.areaCode[0]
          useCode = true
        } else if (this.defaultRegin.length) {
          tmp = this.defaultRegin[0]
        } else {
          tmp = 0
        }
        // 遍历省份数组
        provinces.map((v, k) => {
          if (useCode ? v.value == tmp : v.label == tmp) {
            this.province = k
            return
          }
        })
        this.provinces = provinces
        this.valueArr.splice(0, 1, this.province)
      },
      setCitys() {
        if (!this.params.city) return
        let tmp = ''
        let useCode = false
        // 如果同时配置了defaultRegion和areaCode，优先使用areaCode参数
        if (this.areaCode.length) {
          tmp = this.areaCode[1]
          useCode = true
        } else if (this.defaultRegin.length) {
          tmp = this.defaultRegin[1]
        } else {
          tmp = 0
        }
        // 遍历省份数组
        citys[this.province].map((v, k) => {
          if (useCode ? v.value == tmp : v.label == tmp) {
            this.city = k
            return
          }
        })
        this.citys = citys[this.province]
        this.valueArr.splice(1, 1, this.city)
      },
      setAreas() {
        if (!this.params.area) return
        let tmp = ''
        let useCode = false
        // 如果同时配置了defaultRegion和areaCode，优先使用areaCode参数
        if (this.areaCode.length) {
          tmp = this.areaCode[2]
          useCode = true
        } else if (this.defaultRegin.length) {
          tmp = this.defaultRegin[2]
        } else {
          tmp = 0
        }
        // 遍历省份数组
        areas[this.province][this.city].map((v, k) => {
          if (useCode ? v.value == tmp : v.label == tmp) {
            this.area = k
            return
          }
        })
        this.areas = areas[this.province][this.city]
        this.valueArr.splice(2, 1, this.area)
      },
      close() {
        this.$emit('input', false)
      },
      // 监听用户修改了picker列选项
      change(event) {
        this.valueArr = event.detail.value
        let i = 0
        if (this.mode === 'time') {
          // 使用i++是因为不知道数组的长度
          if (this.params.year) this.year = this.years[this.valueArr[i++]]
          if (this.params.month) this.month = this.months[this.valueArr[i++]]
          if (this.params.day) this.day = this.days[this.valueArr[i++]]
          if (this.params.hour) this.hour = this.hours[this.valueArr[i++]]
          if (this.params.minute) this.minute = this.minutes[this.valueArr[i++]]
          if (this.params.second) this.second = this.seconds[this.valueArr[i++]]
        } else if (this.mode === 'region') {
          // 标记省市是否发生了变化
          let provinceChange = false,
              cityChange = false
          if (this.params.province) {
            let value = this.valueArr[i++]
            if (this.province != value) {
              // 如果省份发生了变化，则重置市区的索引为0
              this.city = 0
              this.area = 0
              provinceChange = true
            }
            this.province = value
          }
          if (this.params.city && !provinceChange) {
            let value = this.valueArr[i++]
            if (this.city != value) {
              // 如果市发生了变化，则重置区的索引为0
              this.area = 0
              cityChange = true
            }
            this.city = value
          }
          if (this.params.area && !provinceChange && !cityChange) this.area = this.valueArr[i++]
          
          // 如果有省市进行了改变，重新设置列表的值
          if (provinceChange || cityChange) {
            this.valueArr = [this.province, this.city, this.area]
          }
        } else if (this.mode === 'multiSelector') {
          let index = null
          // 对比前后两个数组，寻找变更的是哪一列，如果某一个元素不同，即可判定该列发生了变化
          this.defaultSelector.map((v, idx) => {
            if (v != event.detail.value[idx]) index = idx
          })
          // 为了让用户对多列变化时，动态设置其他列
          if (index != null) {
            this.$emit('columnchange', {
              column: index,
              index: event.detail.value[index]
            })
          }
        }
      },
      // 用户点击确定按钮
      getResult(event = null) {
        // #ifdef MP-WEIXIN
        if (this.moving) return
        // #endif
        let result = {}
        // 只返回用户需要的数据
        if (this.mode === 'time') {
          if (this.params.year) result.year = this.formatNumber(this.year || 0)
          if (this.params.month) result.month = this.formatNumber(this.month || 0)
          if (this.params.day) result.day = this.formatNumber(this.day || 0)
          if (this.params.hour) result.hour = this.formatNumber(this.hour || 0)
          if (this.params.minute) result.minute = this.formatNumber(this.minute || 0)
          if (this.params.second) result.second = this.formatNumber(this.second || 0)
          if (this.params.timestamp) result.timestamp = this.getTimestamp()
        } else if (this.mode === 'region') {
          if (this.params.province) result.province = provinces[this.province]
          if (this.params.city) result.city = citys[this.province][this.city]
          if (this.params.area) result.area = areas[this.province][this.city][this.area]
        } else if (this.mode === 'multiSelector') {
          result = this.valueArr
        } else if (this.mode === 'selector') {
          result = this.valueArr
        }
        
        if (event) this.$emit(event, result)
        this.close()
      },
      // 获取时间戳
      getTimestamp() {
      	// yyyy-mm-dd为安卓写法，不支持iOS，需要使用"/"分隔，才能二者兼容
      	let time = this.year + '/' + this.month + '/' + this.day + ' ' + this.hour + ':' + this.minute + ':' + this.second;
      	return new Date(time).getTime() / 1000;
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-picker {
    &__content {
      position: relative;
      
      &__header {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 90rpx;
        padding: 0 40rpx;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        font-size: 30rpx;
        background-color: #FFFFFF;
        
        &__btn {
          padding: 16rpx;
          box-sizing: border-box;
          text-align: center;
          text-decoration: none;
        }
        
        &__title {
          color: $tn-font-color;
        }
        
        &--cancel {
          color: $tn-font-sub-color;
        }
        
        &--confirm {
          color: $tn-main-color;
        }
      }
      
      &__body {
        width: 100%;
        height: 500rpx;
        overflow: hidden;
        background-color: #FFFFFF;
        
        &__view {
          height: 100%;
          box-sizing: border-box;
        }
        
        &__item {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 32rpx;
          color: $tn-font-color;
          padding: 0 8rpx;
          
          &--text {
            font-size: 24rpx;
            padding-left: 8rpx;
          }
        }
      }
    }
  }
</style>
