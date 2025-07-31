<template>
  <view class="tn-collapse-item-class tn-collapse-item" :style="[itemStyle]">
    <!-- 头部 -->
    <view
      class="tn-collapse-item__head"
      :style="[headStyle]"
      :hover-stay-time="200"
      :hover-class="hoverClass"
      @tap.stop="headClick"
    >
      <block v-if="!$slots['title-all'] || !$slots['$title-all']">
        <view
          v-if="!$slots.title || !$slots.$title"
          class="tn-collapse-item__head__title tn-text-ellipsis"
          :style="[
            { textAlign: align ? align : 'left'},
            isShow && activeStyle && !arrow ? activeStyle : ''
          ]"
        >{{ title }}</view>
        <view v-else>
          <slot name="title"></slot>
        </view>
        <view class="tn-collapse-item__head__icon__wrap">
          <view
            v-if="arrow"
            class="tn-icon-down tn-collapse-item__head__icon__arrow"
            :class="{'tn-collapse-item__head__icon__arrow--active': isShow}"
            :style="[arrowIconStyle]"
          ></view>
        </view>
      </block>
      <view v-else>
        <slot name="title-all"></slot>
      </view>
    </view>
    <!-- 内容 -->
    <view
      class="tn-collapse-item__body"
      :style="[{
        height: isShow ? height + 'px' : '0'
      }]"
    >
      <view class="tn-collapse-item__body__content" :id="elId" :style="[bodyStyle]">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-collapse-item',
    props: {
      // 展开
      open: {
        type: Boolean,
        default: false
      },
      // 唯一标识
      name: {
        type: String,
        default: ''
      },
      // 标题
      title: {
        type: String,
        default: ''
      },
      // 标题对齐方式
      align: {
        type: String,
        default: 'left'
      },
      // 点击不收起
      disabled: {
        type: Boolean,
        default: false
      },
      // 活动时样式
      activeStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 标识
      index: {
        type: [Number, String],
        default: ''
      }
    },
    computed: {
      arrowIconStyle() {
        let style = {}
        if (this.arrowColor) {
          style.color = this.arrowColor
        }
        return style
      }
    },
    data() {
      return {
        isShow: false,
        elId: this.$t.uuid(),
        // body高度
        height: 0,
        // 头部样式
        headStyle: {},
        // 主体样式
        bodyStyle: {},
        // item样式
        itemStyle: {},
        // 显示右边箭头
        arrow: true,
        // 箭头颜色
        arrowColor: '',
        // 点击头部时的效果样式
        hoverClass: ''
      }
    },
    watch: {
      open(value) {
        this.isShow = value
      }
    },
    created() {
      this.parent = false
      this.isShow = this.open
    },
    mounted() {
      this.init()
    },
    methods: {
      // 异步获取内容或者修改了内容时重新获取内容的信息
      init() {
        this.parent = this.$t.$parent.call(this, 'tn-collapse')
        if (this.parent) {
          this.nameSync = this.name ? this.name : this.parent.childrens.length
          // 不存在才添加对应实例
          !this.parent.childrens.includes(this) && this.parent.childrens.push(this)
          this.headStyle = this.parent.headStyle
          this.bodyStyle = this.parent.bodyStyle
          this.itemStyle = this.parent.itemStyle
          this.arrow = this.parent.arrow
          this.arrowColor = this.parent.arrowColor
          this.hoverClass = this.parent.hoverClass
        }
        this.$nextTick(() => {
          this.queryRect()
        })
      },
      // 点击头部
      headClick() {
        if (this.disabled) return
        if (this.parent && this.parent.accordion) {
          this.parent.childrens.map(child => {
            // 如果是手风琴模式，将其他的item关闭
            if (this !== child) {
              child.isShow = false
            }
          })
        }
        
        this.isShow = !this.isShow
        // 触发修改事件
        this.$emit('change', {
          index: this.index,
          show: this.isShow
        })
        // 只有在打开时才触发父元素的change
        if (this.isShow) this.parent && this.parent.onChange()
        this.$forceUpdate()
      },
      // 查询内容高度
      queryRect() {
        this._tGetRect('#'+this.elId).then(res => {
          this.height = res.height
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-collapse-item {
    
    &__head {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      color: $tn-font-color;
      font-size: 30rpx;
      line-height: 1;
      padding: 24rpx 0;
      padding-left: 24rpx;
      text-align: left;
      background-color: #FFFFFF;
      
      &__title {
        flex: 1;
        overflow: hidden;
      }
      
      &__icon {
        &__arrow {
          transition: all 0.3s;
          margin-right: 20rpx;
          margin-left: 14rpx;
          font-size: inherit;
          
          &--active {
            transform: rotate(180deg);
            transform-origin: center center;
          }
        }
      }
    }
    
    &__body {
      transition: all 0.3s;
      overflow: hidden;
      
      &__content {
        overflow: hidden;
        font-size: 28rpx;
        color: $tn-font-color;
        text-align: left;
        background-color: #FFFFFF;
        padding-left: 24rpx;
      }
    }
  }
</style>
