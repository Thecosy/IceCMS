<template>
  <view v-if="show" class="tn-tabbar-class tn-tabbar" @touchmove.stop.prevent="() => {}">
    <!-- tabbar 内容-->
    <view
      class="tn-tabbar__content"
      :class="{
        'tn-tabbar--fixed': fixed,
        'tn-safe-area-inset-bottom': safeAreaInsetBottom,
        'tn-tabbar--shadow': shadow
      }"
      :style="{
        height: height + 'rpx',
        backgroundColor: bgColor
      }"
    >
      <!-- tabbar item -->
      <view
        v-for="(item, index) in list"
        :key="index"
        class="tn-tabbar__content__item"
        :id="`tabbar_item_${index}`"
        :class="{'tn-tabbar__content__item--out': item.out}"
        :style="{
          backgroundColor: bgColor
        }"
        @tap.stop="clickItemHandler(index)"
      >
        <!-- tabbar item的图片或者icon-->
        <view :class="[itemButtonClass(index)]"
          :style="[itemButtonStyle(index)]"
        >
          <image
            v-if="isImage(index)"
            :src="elIcon(index)"
            mode="scaleToFill"
            class="tn-tabbar__content__item__image"
            :style="{
              width: `${item.iconSize || iconSize}rpx`,
              height: `${item.iconSize || iconSize}rpx`
            }"
          ></image>
          <view
            v-else
            class="tn-tabbar__content__item__icon"
            :class="[`tn-icon-${elIcon(index)}`,elIconColor(index, false)]"
            :style="{
              fontSize: `${item.iconSize || iconSize}rpx`,
              color: elIconColor(index)
            }"
          ></view>
          
          <!-- 角标-->
          <tn-badge
            v-if="!item.out && (item.count || item.dot)"
            :dot="item.dot || false"
            backgroundColor="tn-bg-red"
            fontColor="#FFFFFF"
            :radius="item.dot ? 14 : 0"
            :fontSize="14"
            padding="2rpx 4rpx"
            :absolute="true"
            :top="2"
          >
            {{ $t.number.formatNumberString(item.count) }}
          </tn-badge>
        </view>
        
        <!-- tabbar item的文字-->
        <view
          class="tn-tabbar__content__item__text"
          :class="[elColor(index, false)]"
          :style="{
            color: elColor(index),
            fontSize: `${fontSize}rpx`
          }"
        >
          <text class="tn-text-ellipsis">{{ item.title }}</text>
        </view>
      </view>
      
      <!-- item 突起部分 -->
      <view
        v-if="outItemIndex !== -1"
        class="tn-tabbar__content__out"
        :class="[{
          'tn-tabbar__content__out--shadow': shadow
        }, animation && value === outItemIndex ? `tn-tabbar__content__out--animation--${animationMode}` : '']"
        :style="{
          backgroundColor: bgColor,
          left: outItemLeft,
          width: `${outHeight}rpx`,
          height: `${outHeight}rpx`,
          top: `-${outHeight * 0.3}rpx`
        }"
        @tap.stop="clickItemHandler(outItemIndex)"
      ></view>
    </view>
    
    <!-- 防止tabbar塌陷 -->
    <view class="tn-tabbar__placeholder" :class="{'tn-safe-area-inset-bottom': safeAreaInsetBottom}" :style="{
      height: `calc(${height}rpx)`
    }"></view>
  </view>
</template>

<script>
  export default {
    name: 'tn-tabbar',
    props: {
      // 绑定当前被选中的current值
      value: {
        type: [String, Number],
        default: 0
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 图标列表
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // 高度，单位rpx
      height: {
        type: Number,
        default: 100
      },
      // 突起的高度
      outHeight: {
        type: Number,
        default: 100
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: '#FFFFFF'
      },
      // 图标大小
      iconSize: {
        type: Number,
        default: 50
      },
      // 字体大小
      fontSize: {
        type: Number,
        default: 20
      },
      // 激活时的颜色
      activeColor: {
        type: String,
        default: '#01BEFF'
      },
      // 非激活时的颜色
      inactiveColor: {
        type: String,
        default: '#AAAAAA'
      },
      // 激活时图标的颜色
      activeIconColor: {
        type: String,
        default: '#01BEFF'
      },
      // 非激活时图标的颜色
      inactiveIconColor: {
        type: String,
        default: '#AAAAAA'
      },
      // 激活时的自定义样式
      activeStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 是否显示阴影
      shadow: {
        type: Boolean,
        default: true
      },
      // 点击时是否有动画
      animation: {
        type: Boolean,
        default: false
      },
      // 点击时的动画模式
      animationMode: {
        type: String,
        default: 'scale'
      },
      // 是否固定在底部
      fixed: {
        type: Boolean,
        default: true
      },
      // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
      	type: Boolean,
      	default: false
      },
      // 切换前回调
      beforeSwitch: {
        type: Function,
        default: null
      }
    },
    computed: {
      // 当前字体的颜色
      elColor() {
        return (index, style = true) => {
          let currentItem = this.list[index]
          let color = ''
          if (index === this.value) {
            color = currentItem['activeColor'] || this.activeColor
          } else {
            color = currentItem['inactiveColor'] || this.inactiveColor
          }
          // 判断是否获取内部样式
          if (style) {
            if (this.$t.color.getFontColorStyle(color) !== '') {
              return color
            } else {
              return ''
            }
          } else {
            if (this.$t.color.getFontColorStyle(color) === '') {
              return color
            } else {
              return ''
            }
          }
        }
      },
      // 当前图标的颜色
      elIconColor() {
        return (index, style = true) => {
          let currentItem = this.list[index]
          let color = ''
          if (index === this.value) {
            color = currentItem['activeIconColor'] || this.activeIconColor
          } else {
            color = currentItem['inactiveIconColor'] || this.inactiveIconColor
          }
          // 判断是否获取内部样式
          if (style) {
            if (this.$t.color.getFontColorStyle(color) !== '') {
              return color
            } else {
              return ''
            }
          } else {
            if (this.$t.color.getFontColorStyle(color) === '') {
              return color + ' tn-tabbar__content__item__icon--clip'
            } else {
              return ''
            }
          }
        }
      },
      // 当前的图标
      elIcon() {
        return (index) => {
          let currentItem = this.list[index]
          if (index === this.value) {
            return currentItem['activeIcon']
          } else {
            return currentItem['inactiveIcon']
          }
        }
      },
      // 突起部分item button对应的类
      itemButtonClass() {
        return (index) => {
          let clazz = ''
          if (this.list[index]['out']) {
            clazz += 'tn-tabbar__content__item__button--out'
            if (this.$t.color.getFontColorStyle(this.activeIconColor) === '') {
              clazz += ` ${this.activeIconColor}`
            }
            if (this.value === index) {
              clazz += ` tn-tabbar__content__item__button--out--animation--${this.animationMode}`
            }
          } else {
            clazz += 'tn-tabbar__content__item__button'
            if (this.value === index) {
              clazz += ` tn-tabbar__content__item__button--animation--${this.animationMode}`
            }
          }
          return clazz
        }
      },
      // 突起部分item button样式
      itemButtonStyle() {
        return (index) => {
          let style = {}
          if (this.list[index]['out']) {
            if (this.$t.color.getFontColorStyle(this.activeIconColor) !== '') {
              style.backgroundColor = this.activeIconColor
            }
            style.width = `${this.outHeight - 35}rpx`
            style.height = `${this.outHeight - 35}rpx`
            style.top = `-${this.outHeight * 0.15}rpx`
            
            return style
          }
          return style
        }
      },
      // 判断图标是否为图片
      isImage() {
        return (index) => {
          const icon = this.list[index]['activeIcon']
          // 只有包含了'/'就认为是图片
          return icon.indexOf('/') !== -1
        }
      }
    },
    data() {
      return {
        // 当前突起的位置
        outItemLeft: '50%',
        // 当前设置了突起按钮的index
        outItemIndex: -1,
        // 每一个item的信息
        tabbatItemInfo: []
      }
    },
    watch: {
      
    },
    created() {
      this.getOutItemIndex()
    },
    mounted() {
      this.$nextTick(() => {
        this.getTabbarItem()
      })
    },
    methods: {
      // 获取每一个item的信息
      getTabbarItem() {
        let query = uni.createSelectorQuery().in(this)
        // 遍历获取信息
        for (let i = 0; i < this.list.length; i++) {
          query.select(`#tabbar_item_${i}`).fields({
            size: true,
            rect: true
          })
        }
        query.exec(res => {
          if (!res) {
            setTimeout(() => {
              this.getTabbarItem()
            }, 10)
            return
          }
          this.tabbatItemInfo = res.map((item) => {
            return {
              left: item.left,
              width: item.width
            }
          })
          this.updateOutItemLeft()
        })
      },
      // 获取突起Item所在的index(如果存在)
      getOutItemIndex() {
        this.outItemIndex = this.list.findIndex((item) => {
          return item.hasOwnProperty('out') && item.out
        })
      },
      // 点击底部菜单时触发
      async clickItemHandler(index) {
        if (this.beforeSwitch && typeof(this.beforeSwitch) === 'function') {
          // 执行回调，同时传入索引当作参数
          // 在微信，支付宝等环境(H5正常)，会导致父组件定义的函数体中的this变成子组件的this
          // 通过bind()方法，绑定父组件的this，让this的this为父组件的上下文
          let beforeSwitch = this.beforeSwitch.bind(this.$t.$parent.call(this))(index)
          // 判断是否返回了Promise
          if (!!beforeSwitch && typeof beforeSwitch.then === 'function') {
            await beforeSwitch.then(res => {
              // Promise返回成功
              this.switchTab(index)
            }).catch(err => {
              
            })
          } else if (beforeSwitch === true) {
            this.switchTab(index)
          }
        } else {
          this.switchTab(index)
        }
      },
      // 切换tab
      switchTab(index) {
        // 发出事件和修改v-model绑定的值
        this.$emit('change', index)
        this.$emit('input', index)
      },
      // 设置突起的位置
      updateOutItemLeft() {
        // 查找出需要突起的元素
        const index = this.list.findIndex((item) => {
          return item.out
        })
        if (index !== -1) {
          this.outItemLeft = this.tabbatItemInfo[index].left + (this.tabbatItemInfo[index].width / 2) + 'px'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-tabbar {
    
    &__content {
      box-sizing: content-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      width: 100%;
      z-index: 1024;
      
      &__out {
        position: absolute;
        z-index: 4;
        border-radius: 100%;
        left: 50%;
        transform: translateX(-50%);
        
        &--shadow {
          box-shadow: 0rpx -10rpx 30rpx 0rpx rgba(0, 0, 0, 0.05);
          
          &::before {
            content: " ";
            position: absolute;
            width: 100%;
            height: 50rpx;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            background-color: inherit;
          }
        }
        
        &--animation {
          &--scale {
            transform-origin: 50% 100%;
            animation:tabbar-content-out-click 0.2s forwards 1 ease-in-out;
          }
        }
      }
      
      &__item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
        position: relative;
        
        &__button {
          margin-bottom: 10rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          
          &--out {
            margin-bottom: 10rpx;
            border-radius: 50%;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 6;
            
            &--animation {
              &--scale {
                transform-origin: 50% 100%;
                animation:tabbar-item-button-out-click 0.2s forwards 1;
              }
            }
          }
          
          &--animation {
            &--scale {
              .tn-tabbar__content__item__icon, .tn-tabbar__content__item__image {
                transform-origin: 50% 100%;
                animation:tabbar-item-button-click 0.2s forwards 1;
              }
            }
          }
        }
        
        &__icon {
          
          &--clip {
            -webkit-background-clip: text;
            color: transparent !important;
          }
        }
        
        &__text {
          width: 100%;
          font-size: 26rpx;
          line-height: 28rpx;
          text-align: center;
          margin-bottom: 10rpx;
          z-index: 10;
          transition: all 0.2s ease-in-out;
        }
        
        &--out {
          height: calc(100% - 1px);
        }
      }
    }
    
    &--fixed {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
    
    &--shadow {
      box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
    }
  }
  
  /* 点击动画 start */
  
  @keyframes tabbar-item-button-click{
    from{
      transform: scale(0.8);
    }
    to{
      transform: scale(1);
    }
  }
  
  @keyframes tabbar-item-button-out-click {
    0%{
      transform: translateY(0) scale(1);
    }
    50%{
      transform: translateY(-10rpx) scale(1.2);
    }
    100%{
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes tabbar-content-out-click {
    0%{
      transform: translateX(-50%) translateY(0) scale(1);
    }
    50% {
      transform: translateX(-50%) translateY(-10rpx) scale(1.1);
    }
    100% {
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }
  
  /* 点击动画 end */
</style>
