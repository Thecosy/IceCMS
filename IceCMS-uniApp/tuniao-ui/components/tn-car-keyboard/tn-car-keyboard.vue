<template>
  <view class="tn-car-keyboard-class tn-car-keyboard" @touchmove.stop.prevent="() => {}">
    <view class="tn-car-keyboard__grids">
      
      <view
        v-for="(data, index) in inputCarNumber ? endKeyBoardList : areaList"
        :key="index"
        class="tn-car-keyboard__grids__item"
      >
        <view
          v-for="(sub_data, sub_index) in data"
          :key="sub_index"
          class="tn-car-keyboard__grids__btn"
          :class="{'tn-car-keyboard__grids__btn--disabled': sub_data === 'I'}"
          :hover-class="sub_data !== 'I' ? 'tn-car-keyboard--hover' : ''"
          :hover-stay-time="100"
          @tap="click(index, sub_index)"
        >
          {{ sub_data }}
        </view>
      </view>
      
      <view
        class="tn-car-keyboard__back"
        hover-class="tn-hover-class"
        :hover-stay-time="150"
        @touchstart.stop="backspaceClick"
        @touchend="clearTimer"
      >
        <view class="tn-icon-left-arrow tn-car-keyboard__back__icon"></view>
      </view>
      
      <view
        class="tn-car-keyboard__change"
        hover-class="tn-car-keyboard--hover"
        :hover-stay-time="150"
        @tap="changeMode"
      >
        <text class="tn-car-keyboard__mode--zh" :class="[`tn-car-keyboard__mode--${!inputCarNumber ? 'active' : 'inactive'}`]">中</text>
        /
        <text class="tn-car-keyboard__mode--en" :class="[`tn-car-keyboard__mode--${inputCarNumber ? 'active' : 'inactive'}`]">英</text>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-car-keyboard',
    props: {
      // 是否打乱键盘顺序
      randomEnabled: {
        type: Boolean,
        default: false
      },
      // 切换中英文输入
      switchEnMode: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      areaList() {
        let data = [
          '京',
          '沪',
          '粤',
          '津',
          '冀',
          '豫',
          '云',
          '辽',
          '黑',
          '湘',
          '皖',
          '鲁',
          '苏',
          '浙',
          '赣',
          '鄂',
          '桂',
          '甘',
          '晋',
          '陕',
          '蒙',
          '吉',
          '闽',
          '贵',
          '渝',
          '川',
          '青',
          '琼',
          '宁',
          '藏',
          '港',
          '澳',
          '新',
          '使',
          '学',
          '临',
          '警'
        ]
        // 打乱顺序
        if (this.randomEnabled) data = this.$t.array.random(data)
        // 切割二维数组
        let showData = []
        showData[0] = data.slice(0, 10)
        showData[1] = data.slice(10, 20)
        showData[2] = data.slice(20, 30)
        showData[3] = data.slice(30, 37)
        return showData
      },
      endKeyBoardList() {
        let data = [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          0,
          'Q',
          'W',
          'E',
          'R',
          'T',
          'Y',
          'U',
          'I',
          'O',
          'P',
          'A',
          'S',
          'D',
          'F',
          'G',
          'H',
          'J',
          'K',
          'L',
          'Z',
          'X',
          'C',
          'V',
          'B',
          'N',
          'M'
        ]
        // 打乱顺序
        if (this.randomEnabled) data = this.$t.array.random(data)
        // 切割二维数组
        let showData = []
        showData[0] = data.slice(0, 10)
        showData[1] = data.slice(10, 20)
        showData[2] = data.slice(20, 29)
        showData[3] = data.slice(29, 36)
        return showData
      }
    },
    data() {
      return {
        // 标记是否输入车牌号码
        inputCarNumber: false,
        // 长按多次删除事件监听
        longPressDeleteTimer: null
      }
    },
    watch:{
      switchEnMode: {
        handler(value) {
          if (value) {
            this.inputCarNumber = true
          } else {
            this.inputCarNumber = false
          }
        },
        immediate: true
      }
    },
    methods: {
      // 点击键盘按钮
      click(i, j) {
        let value = ''
        // 根据不同模式获取不同数组的值
        if (this.inputCarNumber) value = this.endKeyBoardList[i][j]
        else value = this.areaList[i][j]
        
        // 车牌里不包含I
        if (value === 'I') return
        
        this.$emit('change', value)
      },
      // 修改输入模式
      // 中文/英文
      changeMode() {
        this.inputCarNumber = !this.inputCarNumber
      },
      // 点击退格
      backspaceClick() {
        this.$emit('backspace')
        this.clearTimer()
        this.longPressDeleteTimer = setInterval(() => {
          this.$emit('backspace')
        }, 250)
      },
      // 清空定时器
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
  
  .tn-car-keyboard {
    position: relative;
    padding: 24rpx 0;
    background-color: #E6E6E6;
    
    &__grids {
      
      &__item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      
      &__btn {
        display: inline-flex;
        justify-content: center;
        flex: 0 0 64rpx;
        width: 62rpx;
        height: 80rpx;
        font-size: 38rpx;
        line-height: 80rpx;
        font-weight: 500;
        text-decoration: none;
        text-align: center;
        background-color: #FFFFFF;
        margin: 8rpx 5rpx;
        border-radius: 8rpx;
        box-shadow: 0 2rpx 0rpx $tn-box-shadow-color;
        
        &--disabled {
          opacity: 0.6;
        }
      }
    }
    
    &__back {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 96rpx;
      height: 80rpx;
      right: 22rpx;
      bottom: 32rpx;
      background-color: #E6E6E6;
      border-radius: 8rpx;
      box-shadow: 0 2rpx 0rpx $tn-box-shadow-color;
    }
    
    &__change {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 96rpx;
      height: 80rpx;
      left: 22rpx;
      bottom: 32rpx;
      line-height: 1;
      background-color: #FFFFFF;
      border-radius: 8rpx;
      box-shadow: 0 2rpx 0rpx $tn-box-shadow-color;
    }
    
    &__mode {
      &--zh {
        transform: translateY(-10rpx);
      }
      &--en {
        transform: translateY(10rpx);
      }
      
      &--active {
        color: $tn-main-color;
        font-size: 30rpx;
      }
      
      &--inactive {
        &.tn-car-keyboard__mode--zh {
          transform: scale(0.85) translateY(-10rpx);
        }
      }
      
      &--inactive {
        &.tn-car-keyboard__mode--en {
          transform: scale(0.85) translateY(10rpx);
        }
      }
    }
    
    &--hover {
      background-color: #E6E6E6 !important;
    }
  }
</style>
