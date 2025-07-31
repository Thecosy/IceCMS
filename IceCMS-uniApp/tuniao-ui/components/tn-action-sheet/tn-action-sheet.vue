<template>
  <view v-if="value" class="tn-action-sheet-class tn-action-sheet">
    <tn-popup
      v-model="value"
      mode="bottom"
      length="auto"
      :popup="false"
      :borderRadius="borderRadius"
      :maskCloseable="maskCloseable"
      :safeAreaInsetBottom="safeAreaInsetBottom"
      :zIndex="elZIndex"
      @close="close"
    >
      <!-- 提示信息 -->
      <view
        v-if="tips.text"
        class="tn-action-sheet__tips tn-border-solid-bottom"
        :style="[tipsStyle]"
      >
        {{tips.text}}
      </view>
      <!-- 按钮列表 -->
      <block v-for="(item, index) in list" :key="index">
        <view
          class="tn-action-sheet__item tn-text-ellipsis"
          :class="[ index < list.length - 1 ? 'tn-border-solid-bottom' : '']"
          :style="[itemStyle(index)]"
          hover-class="tn-hover-class"
          :hover-stay-time="150"
          @tap="itemClick(index)"
          @touchmove.stop.prevent
        >
          <text>{{item.text}}</text>
          <text v-if="item.subText" class="tn-action-sheet__item__subtext tn-text-ellipsis">{{item.subText}}</text>
        </view>
      </block>
      
      <!-- 取消按钮 -->
      <block v-if="cancelBtn">
        <view class="tn-action-sheet__cancel--gab"></view>
        <view
          class="tn-action-sheet__cancel tn-action-sheet__item"
          hover-class="tn-hover-class"
          :hover-stay-time="150"
          @tap="close"
        >{{cancelText}}</view>
      </block>
      
    </tn-popup>
  </view>
</template>

<script>
  export default {
    name: 'tn-action-sheet',
    props: {
      // 通过v-model控制弹出和收起
      value: {
        type: Boolean,
        default: false
      },
      // 按钮文字数组，可以自定义颜色和字体大小
      // return [{
      // 	text: '确定',
      //  subText: '这是一个确定按钮',
      // 	color: '',
      // 	fontSize: '',
      //  disabled: true
      // }]
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // 顶部提示文字
      tips: {
        type: Object,
        default() {
          return {
            text: '',
            color: '',
            fontSize: 26
          }
        }
      },
      // 弹出的顶部圆角值
      borderRadius: {
        type: Number,
        default: 0
      },
      // 点击遮罩可以关闭
      maskCloseable: {
        type: Boolean,
        default: true
      },
      // 底部取消按钮
      cancelBtn: {
        type: Boolean,
        default: true
      },
      // 底部取消按钮的文字
      cancelText: {
        type: String,
        default: '取消'
      },
      // 开启底部安全区域
      // 在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // z-index值
      zIndex: {
        type: Number,
        default: 0
      }
    },
    computed: {
      // 顶部提示样式
      tipsStyle() {
        let style = {}
        if (this.tips.color) style.color = this.tips.color
        if (this.tips.fontSize) style.fontSize = this.tips.fontSize + 'rpx'
        
        return style
      },
      // 操作项目的样式
      itemStyle() {
        return (index) => {
          let style = {}
          if (this.list[index].color) style.color = this.list[index].color
          if (this.list[index].fontSize) style.fontSize = this.list[index].fontSize + 'rpx'
          
          // 选项被禁用的样式
          if (this.list[index].disabled) style.color = '#AAAAAA'
          
          return style
        }
      },
      elZIndex() {
        return this.zIndex ? this.zIndex : this.$t.zIndex.popup
      }
    },
    methods: {
      // 点击取消按钮
      close() {
        // 发送input事件，并不会作用于父组件，而是要设置组件内部通过props传递的value参数
        this.popupClose();
        this.$emit('close');
      },
      // 关闭弹窗
      popupClose() {
        this.$emit('input', false)
      },
      // 点击对应的item
      itemClick(index) {
        // 如果是禁用项则不进行操作
        if (this.list[index].disabled) return
        this.$emit('click', index)
        this.popupClose()
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-action-sheet {
    &__tips {
      font-size: 26rpx;
      text-align: center;
      padding: 34rpx 0;
      line-height: 1;
      color: $tn-content-color;
    }
    
    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 32rpx;
      padding: 34rpx 0;
      
      &__subtext {
        font-size: 24rpx;
        color: $tn-content-color;
        margin-top: 20rpx;
      }
    }
    
    &__cancel {
      color: $tn-font-color;
      
      &--gab {
        height: 12rpx;
        background-color: #eaeaec;
      }
    }
  }
</style>
