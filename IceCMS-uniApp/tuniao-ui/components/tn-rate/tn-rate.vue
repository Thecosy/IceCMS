<template>
  <view
    :id="elId"
    class="tn-rate-class tn-rate"
    @touchmove.stop.prevent="touchMove"
  >
    <view class="tn-rate__wrap" :class="[elClass]" v-for="(item, index) in count" :key="index">
      <view
        class="tn-rate__wrap__icon"
        :class="[`tn-icon-${(allowHalf && halfIcon ? activeIndex > index + 1 : activeIndex > index) ? elActionIcon : elInactionIcon}`]"
        :style="[iconStyle(index)]"
        @tap="click(index + 1, $event)"
      >
        <!-- 半图标 -->
        <view
          v-if="showHalfIcon(index)"
          class="tn-rate__wrap__icon--half"
          :class="[`tn-icon-${elActionIcon}`]"
          :style="[halfIconStyle]"
        ></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-rate',
    props: {
      // 选中星星的数量
      value: {
        type: Number,
        default: 0
      },
      // 显示的星星数
      count: {
        type: Number,
        default: 5
      },
      // 最小能选择的星星数
      minCount: {
        type: Number,
        default: 0
      },
      // 禁用状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否可以选择半星
      allowHalf: {
        type: Boolean,
        default: false
      },
      // 星星大小
      size: {
        type: Number,
        default: 32
      },
      // 被选中的图标
      activeIcon: {
        type: String,
        default: 'star-fill'
      },
      // 未被选中的图标
      inactiveIcon: {
        type: String,
        default: 'star'
      },
      // 被选中的颜色
      activeColor: {
        type: String,
        default: '#01BEFF'
      },
      // 默认颜色
      inactiveColor: {
        type: String,
        default: '#AAAAAA'
      },
      // 星星之间的距离
      gutter: {
        type: Number,
        default: 10
      },
      // 自定义颜色
      colors: {
        type: Array,
        default() {
          return []
        }
      },
      // 自定义图标
      icons: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      // 图标显示的比例
      showHalfIcon(index) {
        return index => {
          return this.allowHalf && Math.ceil(this.activeIndex) === index + 1 && this.halfIcon
        }
      },
      // 被激活的图标
      elActionIcon() {
        const len = this.icons.length
        // icons参数传递了3个图标，当选中2个时，用第一个图标，4个时，用第二个图标
        // 5个时，用第三个图标作为激活的图标
        if (len && len <= this.count) {
          const step = Math.round(Math.ceil(this.activeIndex) / Math.round(this.count / len))
          if (step < 1) return this.icons[0]
          if (step > len) return this.icons[len - 1]
          return this.icons[step - 1]
        }
        return this.activeIcon
      },
      // 未被激活的图标
      elInactionIcon() {
        const len = this.icons.length
        // icons参数传递了3个图标，当选中2个时，用第一个图标，4个时，用第二个图标
        // 5个时，用第三个图标作为激活的图标
        if (len && len <= this.count) {
          const step = Math.round(Math.ceil(this.activeIndex) / Math.round(this.count / len))
          if (step < 1) return this.icons[0]
          if (step > len) return this.icons[len - 1]
          return this.icons[step - 1]
        }
        return this.inactiveIcon
      },
      // 被激活的颜色
      elActionColor() {
        const len = this.colors.length
        // 如果有设置colors参数(此参数用于将图标分段，比如一共5颗星，colors传3个颜色值，那么根据一定的规则，2颗星可能为第一个颜色
        // 4颗星为第二个颜色值，5颗星为第三个颜色值)
        if (len && len <= this.count) {
          const step = Math.round(Math.ceil(this.activeIndex) / Math.round(this.count / len))
          if (step < 1) return this.colors[0]
          if (step > len) return this.colors[len - 1]
          return this.colors[step - 1]
        }
        return this.activeColor
      },
      // 图标的样式
      iconStyle() {
        return index => {
          let style = {}
          
          style.fontSize = this.$t.string.getLengthUnitValue(this.size)
          style.padding = `0 ${this.$t.string.getLengthUnitValue(this.gutter / 2)}`
          // 当前图标的颜色
          if (this.allowHalf && this.halfIcon) {
            style.color = this.activeIndex > index + 1 ? this.elActionColor : this.inactiveColor
          } else {
            style.color = this.activeIndex > index ? this.elActionColor : this.inactiveColor
          }
          return style
        }
      },
      // 半图标样式
      halfIconStyle() {
        let style = {}
        
        style.fontSize = this.$t.string.getLengthUnitValue(this.size)
        style.padding = `0 ${this.$t.string.getLengthUnitValue(this.gutter / 2)}`
        style.color = this.elActionColor
        return style
      }
    },
    data() {
      return {
        // 保证控件的唯一性
        elId: this.$t.uuid(),
        elClass: this.$t.uuid(),
        // 评分盒子左边到屏幕左边的距离，用于滑动选择时计算距离
        starBoxLeft: 0,
        // 当前激活的星星的序号
        activeIndex: this.value,
        // 每个星星的宽度
        starWidth: 0,
        // 每个星星最右边到盒子组件最左边的距离
        starWidthArr: [],
        // 标记是否为半图标
        halfIcon: false,
      }
    },
    watch: {
      value(val) {
        this.activeIndex = val
        if (this.allowHalf && (val % 1 === 0.5)) {
          this.halfIcon = true
        } else {
          this.halfIcon = false
        }
      },
      size() {
        // 当尺寸修改的时候重新获取布局尺寸信息
        this.$nextTick(() => {
          this.getElRectById()
          this.getElRectByClass()
        })
      }
    },
    mounted() {
      this.getElRectById()
      this.getElRectByClass()
    },
    methods: {
      // 获取评分组件盒子的布局信息
      getElRectById() {
        this._tGetRect('#'+this.elId).then(res => {
          this.starBoxLeft = res.left
        })
      },
      // 获取单个星星的尺寸
      getElRectByClass() {
        this._tGetRect('.'+this.elClass).then(res => {
          this.starWidth = res.width
          // 把每个星星最右边到盒子最左边的距离
          for (let i = 0; i < this.count; i++) {
            this.starWidthArr[i] = (i + 1) * this.starWidth
          }
        })
      },
      // 手指滑动
      touchMove(e) {
        if (this.disabled) return
        if (!e.changedTouches[0]) return
        
        const movePageX = e.changedTouches[0].pageX
        // 滑动点相对于评分盒子左边的距离
        const distance = movePageX - this.starBoxLeft
        
        // 如果滑动到了评分盒子的左边界，设置为0星
        if (distance <= 0) {
          this.activeIndex = 0
        }
        
        // 计算滑动的距离相当于点击多少颗星星
        let index = Math.ceil(distance / this.starWidth)
        if (this.allowHalf) {
          const iconHalfWidth = this.starWidthArr[index - 1] - (this.starWidth / 2)
          if (distance < iconHalfWidth) {
            this.halfIcon = true
            index -= 0.5
          } else {
            this.halfIcon = false
          }
        }
        this.activeIndex = index > this.count ? this.count : index
        
        if (this.activeIndex < this.minCount) this.activeIndex = this.minCount
        
        this.emitEvent()
      },
      // 通过点击直接选中
      click(index, e) {
        if (this.disabled) return
        // 半星选择
        if (this.allowHalf) {
          if (!e.changedTouches[0]) return
          const movePageX = e.changedTouches[0].pageX
          // 点击点相对于当前图标左边的距离
          const distance = movePageX - this.starBoxLeft
          const iconHalfWidth = this.starWidthArr[index - 1] - (this.starWidth / 2)
          if (distance < iconHalfWidth) {
            this.halfIcon = true
          } else {
            this.halfIcon = false
          }
        }
        
        // 对第一个星星特殊处理，只有一个的时候，点击可以取消，否则无法作0星评价
        if (index == 1) {
          if (this.allowHalf && this.allowHalf) {
            if ((this.activeIndex === 0.5 && this.halfIcon) || 
                (this.activeIndex === 1 && !this.halfIcon)) {
              this.activeIndex = 0
            } else {
              this.activeIndex = this.halfIcon ? 0.5 : 1
            }
          } else {
            if (this.activeIndex == 1) {
              this.activeIndex = 0
            } else {
              this.activeIndex = 1
            }
          }
        } else {
          this.activeIndex = (this.allowHalf && this.halfIcon) ? index - 0.5 : index
        }
        
        if (this.activeIndex < this.minCount) this.activeIndex = this.minCount
        
        this.emitEvent()
      },
      // 发送事件
      emitEvent() {
        this.$emit('change', this.activeIndex)
        // 修改v-model的值
        this.$emit('input', this.activeIndex)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-rate {
    display: inline-flex;
    align-items: center;
    margin: 0;
    padding: 0;
    
    &__wrap {
      
      &__icon {
        position: relative;
        box-sizing: border-box;
        
        &--half {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          overflow: hidden;
          width: 50%;
        }
      }
    }
  }
</style>
