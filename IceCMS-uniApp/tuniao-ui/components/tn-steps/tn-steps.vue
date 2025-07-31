<template>
  <view
    class="tn-steps-class tn-steps"
    :style="{
      flexDirection: direction
    }"
  >
    <view
      v-for="(item, index) in list"
      :key="index"
      class="tn-steps__item"
      :class="[`tn-steps__item--${direction}`]"
      @tap="clickStepItem(index)"
    >
      <!-- 数值模式 -->
      <view
        v-if="mode === 'number'"
        class="tn-steps__item__number"
        :style="{
          backgroundColor: currentIndex <= index ? 'transparent' : activeColor,
          borderColor: currentIndex <= index ? inActiveColor : activeColor
        }"
      >
        <text
          class="tn-steps__item__number__text"
          :class="[{'tn-steps__item__number__text--visible': currentIndex <= index}]"
          :style="{
            color: currentIndex <= index ? inActiveColor : activeColor
          }"
        >
          {{ index + 1}}
        </text>
        <view class="tn-steps__item__number__icon" :class="[`tn-icon-${item.icon || icon}`,{'tn-steps__item__number__icon--visible': currentIndex > index}]"></view>
      </view>
      
      <!-- 点模式 -->
      <view
        v-if="mode === 'dot'"
        class="tn-steps__item__dot"
        :style="{
          backgroundColor: currentIndex <= index ? inActiveColor : activeColor
        }"
      ></view>
      
      <!-- 图标模式 -->
      <view
        v-if="mode === 'icon'"
        class="tn-steps__item__icon"
        :class="[iconModeClass(index)]"
        :style="{
          color: currentIndex <= index ? inActiveColor : activeColor
        }"
      ></view>
      
      <!-- 点图标模式 -->
      <view v-if="mode === 'dotIcon'" class="tn-steps__item__dot-icon">
        <view v-if="currentIndex <= index" class="tn-steps__item__dot-icon--dot" :style="{backgroundColor: inActiveColor}"></view>
        <view v-else class="tn-steps__item__dot-icon--icon" :class="[iconModeClass(index)]" :style="{color: activeColor}"></view>
      </view>
      
      <!-- 步骤下的文字 -->
      <text
        v-if="showTitle"
        class="tn-steps__item__text tn-text-ellipsis"
        :class="[`tn-steps__item__text--${direction}`]"
        :style="{
          color: currentIndex <= index ? inActiveColor : activeColor
        }"
      >
        {{ item.name }}
      </text>
      
      <!-- 连接的横线 -->
      <view
        v-if="index < list.length - 1"
        class="tn-steps__item__line"
        :class="[`tn-steps__item__line--${mode}`]"
        :style="{
          borderColor: currentIndex <= index + 1 ? inActiveColor : activeColor
        }"
      ></view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-steps',
    props: {
      // 模式类型
      // dot -> 点 number -> 数字 icon -> 图标 dotIcon -> 点图标
      mode: {
        type: String,
        default: 'dot'
      },
      // 步骤条的方向
      // row -> 横向 column -> 竖向
      direction: {
        type: String,
        default: 'row'
      },
      // 步骤条数据
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // 当前激活的步数
      current: {
        type: Number,
        default: 0
      },
      // 激活步骤的颜色
      activeColor: {
        type: String,
        default: '#01BEFF'
      },
      // 未激活步骤的颜色
      inActiveColor: {
        type: String,
        default: '#AAAAAA'
      },
      // 激活后显示的图标，在数字模式下有效
      icon: {
        type: String,
        default: 'success'
      },
      // 是否显示标题
      showTitle: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      // icon模式下图标的值
      iconModeClass() {
        return (index) => {
          const item = this.list[index]
          // 状态被选中并且对应数据下存在selectIcon属性
          if (this.currentIndex > index && item.hasOwnProperty('selectIcon')) {
            return `tn-icon-${item.selectIcon}`
          } else {
            // 未选中
            return `tn-icon-${item.icon || this.icon}`
          }
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    watch: {
      current: {
        handler(val) {
          this.currentIndex = val
        },
        immediate: true
      }
    },
    methods: {
      // 点击了某一个选项
      clickStepItem(index) {
        const chooseIndex = index + 1
        this.currentIndex = chooseIndex
        this.$emit('click', { index: chooseIndex })
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  $tn-steps-item-number-width: 44rpx;
  $tn-steps-item-dot-width: 20rpx;
  
  .tn-steps {
    display: flex;
    flex-direction: row;
    
    &__item {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      min-width: 100rpx;
      font-size: 28rpx;
      text-align: center;
      
      &__number {
        // display: flex;
        // flex-wrap: wrap;
        // align-items: center;
        // justify-content: center;
        position: relative;
        width: $tn-steps-item-number-width;
        height: $tn-steps-item-number-width;
        line-height: calc(#{$tn-steps-item-number-width} - 2rpx);
        border: 1px solid #AAAAAA;
        border-radius: 50%;
        overflow: hidden;
        transition: all 0.3s linear;
        
        &__text {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          transition: inherit;
          transform: translateY(-#{$tn-steps-item-number-width});
          
          &--visible {
            transform: translateY(0);
          }
        }
        
        &__icon {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          color: #FFFFFF;
          transition: all 0.3s linear;
          transform: translateY(#{$tn-steps-item-number-width});
          
          &--visible {
            transform: translateY(0);
          }
        }
      }
      
      &__dot {
        width: $tn-steps-item-dot-width;
        height: $tn-steps-item-dot-width;
        display: flex;
        flex-direction: row;
        border-radius: 50%;
        transition: all 0.3s linear;
        
        &--icon {
          width: $tn-steps-item-number-width;
          height: $tn-steps-item-number-width;
        }
      }
      
      &__icon {
        width: $tn-steps-item-number-width;
        height: $tn-steps-item-number-width;
        font-size: $tn-steps-item-number-width;
        transition: all 0.3s linear;
      }
      
      &__dot-icon {
        width: $tn-steps-item-number-width;
        height: $tn-steps-item-number-width;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: all 0.3s linear;
        
        &--dot {
          width: $tn-steps-item-dot-width;
          height: $tn-steps-item-dot-width;
          border-radius: 50%;
          transition: inherit;
        }
        
        &--icon {
          width: $tn-steps-item-number-width;
          height: $tn-steps-item-number-width;
          font-size: $tn-steps-item-number-width;
          transition: inherit;
        }
      }
      
      &__text {
        transition: all 0.3s linear;
        &--row {
          margin-top: 14rpx;
        }
        
        &--column {
          margin-left: 14rpx;
        }
      }
      
      &__line {
        position: absolute;
        z-index: 0;
        vertical-align: middle;
        transition: all 0.3s linear;
      }
      
      &--row {
        display: flex;
        flex-direction: column;
        
        .tn-steps__item__line {
          border-bottom-width: 1px;
          border-bottom-style: solid;
          width: 50%;
          left: 75%;
          
          &--dot {
            top: calc(#{$tn-steps-item-dot-width} / 2);
          }
          
          &--number, &--icon, &--dotIcon {
            top: calc(#{$tn-steps-item-number-width} / 2);
          }
        }
      }
      
      &--column {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        min-height: 120rpx;
        
        .tn-steps__item__line {
          border-left-width: 1px;
          border-left-style: solid;
          height: 50%;
          top: 75%;
          
          &--dot {
            left: calc(#{$tn-steps-item-dot-width} / 2);
          }
          
          &--number, &--icon, &--dotIcon {
            left: calc(#{$tn-steps-item-number-width} / 2);
          }
        }
      }
    }
  }
</style>
