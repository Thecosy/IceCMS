<template>
  <view class="tn-count-scroll-class tn-count-scroll">
    <view
      v-for="(item, index) in columns"
      :key="index"
      class="tn-count-scroll__box"
      :style="{
        width: $t.string.getLengthUnitValue(width),
        height: heightPxValue + 'px'
      }"
    >
      <view
        class="tn-count-scroll__column"
        :style="{
          transform: `translate3d(0, -${keys[index] * heightPxValue}px, 0)`,
          transitionDuration: `${duration}s`
        }"
      >
        <view
          v-for="(value, value_index) in item"
          :key="value_index"
          class="tn-count-scroll__column__item"
          :class="[fontColorClass]"
          :style="{
            height: heightPxValue + 'px',
            lineHeight: heightPxValue + 'px',
            fontSize: fontSizeStyle || '32rpx',
            fontWeight: bold ? 'bold': 'normal',
            color: fontColorStyle || '#080808'
          }"
        >
          {{ value }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-count-scroll',
    mixins: [componentsColorMixin],
    props: {
      value: {
        type: Number,
        default: 0
      },
      // 行高
      height: {
        type: Number,
        default: 32
      },
      // 单个字的宽度
      width: {
        type: [String, Number],
        default: 'auto'
      },
      // 是否加粗
      bold: {
        type: Boolean,
        default: false
      },
      // 持续时间
      duration: {
        type: Number,
        default: 1.2
      },
      // 十分位分割符
      decimalSeparator: {
        type: String,
        default: '.'
      },
      // 千分位分割符
      thousandthsSeparator: {
        type: String,
        default: ''
      }
    },
    computed: {
      heightPxValue() {
        return uni.upx2px(this.height || 0)
      }
    },
    data() {
      return {
        // 每列的数据
        columns: [],
        // 每列对应值所在的滚动位置
        keys: []
      }
    },
    watch: {
      value(val) {
        this.initColumn(val)
      }
    },
    created() {
      // 为了达到一进入就有滚动效果，延迟执行初始化
      this.initColumn()
      setTimeout(() => {
        this.initColumn(this.value)
      }, 20)
    },
    methods: {
      // 初始化每一列的数据
      initColumn(val) {
        val = val + ''
        let digit = val.length,
            columnArray = [],
            rows = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        for (let i = 0; i < digit; i++) {
          if (val[i] === this.decimalSeparator || val[i] === this.thousandthsSeparator) {
            columnArray.push(val[i])
          } else {
            columnArray.push(rows)
          }
        }
        this.columns = columnArray
        this.roll(val)
      },
      // 滚动处理
      roll(value) {
        let valueArray = value.toString().split(''),
            lengths = this.columns.length,
            indexs = [];
        
        while (valueArray.length) {
          let figure = valueArray.pop()
          if (figure === this.decimalSeparator || figure === this.thousandthsSeparator) {
            indexs.unshift(0)
          } else {
            indexs.unshift(Number(figure))
          }
        }
        while(indexs.length < lengths) {
          indexs.unshift(0)
        }
        this.keys = indexs
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-count-scroll {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    
    &__box {
      overflow: hidden;
    }
    
    &__column {
      transform: translate3d(0, 0, 0);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      transition-timing-function: cubic-bezier(0, 1, 0, 1);
      
      &__item {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
