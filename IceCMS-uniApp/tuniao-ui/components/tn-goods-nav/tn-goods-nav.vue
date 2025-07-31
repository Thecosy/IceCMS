<template>
  <view
    class="tn-goods-nav-class tn-goods-nav"
    :class="[
      backgroundColorClass,
      {
        'tn-goods-nav--fixed': fixed,
        'tn-safe-area-inset-bottom': safeAreaInsetBottom,
        'tn-goods-nav--shadow': shadow
      }
    ]"
    :style="[backgroundColorStyle, navStyle]"
  >
    <view class="options">
      <view
        v-for="(item, index) in optionsData"
        :key="index"
        class="options__item"
        :class="[{'options__item--avatar': item.showAvatar}]"
        @tap="handleOptionClick(index)"
      >
        <block v-if="item.showAvatar">
          <tn-avatar
            :src="item.avatar"
            size="sm"
            :badge="item.showBadge"
            :badgeText="item.count"
            :badgeBgColor="item.countBackgroundColor"
            :badgeColor="item.countFontColor"
            :badgeSize="26"
          ></tn-avatar>
        </block>
        <block v-else>
          <view class="options__item__icon" :class="[`tn-icon-${item.icon}`]" :style="[optionStyle(index, 'icon')]">
            <tn-badge v-if="item.showBadge" :absolute="true" :backgroundColor="item.countBackgroundColor" :fontColor="item.countFontColor" :fontSize="16" padding="2rpx 5rpx">{{ item.count }}</tn-badge>
          </view>
          <view class="options__item__text" :style="[optionStyle(index, 'text')]">{{ item.text }}</view>
        </block>
      </view>
    </view>
    <view class="buttons">
      <view
        v-for="(item, index) in buttonGroupsData"
        :key="index"
        class="buttons__item"
        :class="[buttonClass(index)]"
        :style="[buttonStyle(index)]"
        @tap="handleButtonClick(index)"
      >
        <view class="buttons__item__text">{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-goods-nav',
    props: {
      // 选项信息
      // 建议不超过3个
      // {
      //   icon: '', // 图标名称
      //   text: '', // 显示的文本
      //   count: '', // 角标的值
      //   countBackgroundColor: '', // 角标背景颜色
      //   countFontColor: '', // 角标字体颜色
      //   iconColor: '', // 图标颜色
      //   textColor: '', // 文本颜色
      //   avatar: '', // 显示头像（此时将不显示图标和文本）
      // }
      options: {
        type: Array,
        default() {
          return [{
            icon: 'shop',
            text: '店铺'
          },{
            icon: 'service',
            text: '客服'
          },{
            icon: 'star',
            text: '收藏'
          }]
        }
      },
      // 按钮组
      // 建议不超过2个
      // {
      //   text: '', // 显示的文本
      //   backgroundColor: '', // 按钮背景颜色
      //   color: '' // 文本颜色
      // }
      buttonGroups: {
        type: Array,
        default() {
          return [{
            text: '加入购物车',
            backgroundColor: '#FFA726',
            color: '#FFFFFF'
          },{
            text: '结算',
            backgroundColor: '#FF7043',
            color: '#FFFFFF'
          }]
        }
      },
      // 背景颜色
      backgroundColor: {
        type: String,
        default: ''
      },
      // 导航的高度，单位rpx
      height: {
        type: Number,
        default: 0
      },
      // 显示阴影
      shadow: {
        type: Boolean,
        default: false
      },
      // 导航的层级
      zIndex: {
        type: Number,
        default: 0
      },
      // 按钮类型
      // rect -> 方形 paddingRect -> 上下带边距方形 round -> 圆角
      buttonType: {
        type: String,
        default: 'rect'
      },
      // 是否固定在底部
      fixed: {
        type: Boolean,
        default: false
      },
      // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
      	type: Boolean,
      	default: false
      }
    },
    computed: {
      backgroundColorStyle() {
        return this.$t.color.getBackgroundColorStyle(this.backgroundColor)
      },
      backgroundColorClass() {
        return this.$t.color.getBackgroundColorInternalClass(this.backgroundColor)
      },
      navStyle() {
        let style = {}
        if (this.height) {
          style.height = this.height + 'rpx'
        }
        style.zIndex = this.zIndex ? this.zIndex : this.$t.zIndex.goodsNav
        return style
      },
      // 选项style
      optionStyle() {
        return (index, type) => {
          let style = {}
          const item = this.optionsData[index]
          if (type === 'icon' && item.iconColor) {
            style.color = item.iconColor
          } else if (type === 'text' && item.fontColor) {
            style.color = item.fontColor
          }
          return style
        }
      },
      // 按钮class
      buttonClass() {
        return (index) => {
          let clazz = ''
          const item = this.buttonGroupsData[index]
          if (item.backgroundColorClass) {
            clazz += ` ${item.backgroundColorClass}`
          }
          if (item.colorClass) {
            clazz += ` ${item.colorClass}`
          }
          
          clazz += ` buttons__item--${this.$t.string.humpConvertChar(this.buttonType, '-')}`
          
          return clazz
        }
      },
      // 按钮style
      buttonStyle() {
        return (index) => {
          let style = {}
          const item = this.buttonGroupsData[index]
          if (item.backgroundColorStyle) {
            style.backgroundColor = item.backgroundColorStyle
          }
          if (item.colorStyle) {
            style.color = item.colorStyle
          }
          return style
        }
      }
    },
    watch: {
      options(val) {
        this.initData()
      },
      buttonGroups(val) {
        this.initData()
      }
    },
    data() {
      return {
        // 保存选项数据
        optionsData: [],
        // 保存按钮组数据
        buttonGroupsData: []
      }
    },
    created() {
      this.initData()
    },
    methods: {
      // 初始化选项和按钮数据
      initData() {
        this.handleOptionsData()
        this.handleButtonGroupsData()
      },
      // 选项点击事件
      handleOptionClick(index) {
        this.$emit('optionClick', {
          index: index
        })
      },
      // 按钮点击事件
      handleButtonClick(index) {
        this.$emit('buttonClick', {
          index: index
        })
      },
      // 处理选项组数据
      handleOptionsData() {
        this.optionsData = this.options.map((item) => {
          let option = {...item}
          option.showAvatar = item.hasOwnProperty('avatar')
          if (item.hasOwnProperty('count')) {
            const count = this.$t.number.formatNumberString(item.count, 2)
            option.showBadge = true
            option.count = typeof count === 'number' ? String(count) : count
            option.countBackgroundColor = item.countBackgroundColor ? item.countBackgroundColor : '#01BEFF'
            option.countFontColor = item.countFontColor ? item.countFontColor : '#FFFFFF'
          }
          
          return option
        })
      },
      // 处理按钮组数据
      handleButtonGroupsData() {
        this.buttonGroupsData = this.buttonGroups.map((item) => {
          let button = {...item}
          if (item.hasOwnProperty('backgroundColor')) {
            button.backgroundColorClass = this.$t.color.getBackgroundColorInternalClass(item.backgroundColor)
            button.backgroundColorStyle = this.$t.color.getBackgroundColorStyle(item.backgroundColor)
          }
          if (item.hasOwnProperty('color')) {
            button.colorClass = this.$t.color.getBackgroundColorInternalClass(item.color)
            button.colorStyle = this.$t.color.getBackgroundColorStyle(item.color)
          }
          return button
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-goods-nav {
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 88rpx;
    width: 100%;
    box-sizing: content-box;
    
    &--shadow {
      box-shadow: 0rpx -10rpx 30rpx 0rpx rgba(0, 0, 0, 0.05);
      
      &::before {
        content: " ";
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-color: transparent;
        z-index: -1;
      }
    }
    
    &--fixed {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
    
    .options {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      color: #AAAAAA;
      
      &__item {
        padding: 0 26rpx;
        
        &--avatar {
          padding: 0rpx 0rpx 0rpx 26rpx !important;
        }
        
        &__icon {
          position: relative;
          font-size: 36rpx;
          margin-bottom: 6rpx;
        }
        
        &__text {
          font-size: 22rpx;
        }
      }
    }
    
    .buttons {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      
      &__item {
        flex: 1;
        padding: 0 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &--rect {
          height: 100%;
        }
        
        &--padding-rect {
          height: 80%;
        }
        
        &--round {
          height: 75%;
          &:first-child {
            border-top-left-radius: 100rpx;
            border-bottom-left-radius: 100rpx;
          }
          &:last-child {
            border-top-right-radius: 100rpx;
            border-bottom-right-radius: 100rpx;
          }
        }
        
        &__text {
          display: inline-block;
          font-weight: bold;
          font-size: 30rpx;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
</style>
