<template>
  <view v-if="show" class="tn-empty-class tn-empty" :style="[emptyStyle]">
    <view
      v-if="!isImage"
      class="tn-empty__icon"
      :class="[icon ? `tn-icon-${icon}` : `tn-icon-empty-${mode}`]"
      :style="[iconStyle]"
    ></view>
    <image
      v-else
      class="tn-empty__image"
      :style="[imageStyle]"
      :src="icon"
      mode="widthFix"
    ></image>
    
    <view
      class="tn-empty__text"
      :style="[textStyle]"
    >{{ text ? text : icons[mode]}}</view>
    <view v-if="$slots.default || $slots.$default" class="tn-empty__slot">
      <slot/>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-empty',
    props: {
      // 显示空白页
      show: {
        type: Boolean,
        default: true
      },
      // 内置icon的名称
      // 图片路径，建议使用绝对路径
      icon: {
        type: String,
        default: ''
      },
      // 预置图标类型
      mode: {
        type: String,
        default: 'data'
      },
      // 提示文字
      text: {
        type: String,
        default: ''
      },
      // 文字颜色
      textColor: {
        type: String,
        default: ''
      },
      // 文字大小，单位rpx
      textSize: {
        type: Number,
        default: 0
      },
      // 图标颜色
      iconColor: {
        type: String,
        default: ''
      },
      // 图标大小，单位rpx
      iconSize: {
        type: Number,
        default: 0
      },
      // 图片宽度（当图标为图片时生效），单位rpx
      imgWidth: {
        type: Number,
        default: 0
      },
      // 图片高度（当图标为图片时生效），单位rpx
      imgHeight: {
        type: Number,
        default: 0
      },
      // 自定义组件样式
      customStyle: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      emptyStyle() {
        let style = {}
        Object.assign(style, this.customStyle)
        return style
      },
      iconStyle() {
        let style = {}
        if (this.iconSize) {
          style.fontSize = this.iconSize + 'rpx'
        }
        if (this.iconColor) {
          style.color = this.iconColor
        }
        return style
      },
      imageStyle() {
        let style = {}
        if (this.imgWidth) {
          style.width = this.imgWidth + 'rpx'
        }
        if (this.imgHeight) {
          style.height = this.imgHeight + 'rpx'
        }
        return style
      },
      textStyle() {
        let style = {}
        if (this.textColor) {
          style.color = this.textColor
        }
        if (this.textSize) {
          style.fontSize = this.textSize + 'rpx'
        }
        return style
      },
      // 判断传递的icon是否为图片
      isImage() {
        return this.icon.indexOf('/') >= 0
      }
    },
    data() {
      return {
        icons: {
          cart: '购物车为空',
          page: '页面不存在',
          search: '搜索结果为空',
          address: '地址为空',
          network: '网络不通',
          order: '订单为空',
          coupon: '优惠券为空',
          favor: '暂无收藏',
          permission: '无权限',
          history: '历史记录为空',
          message: '暂无消息',
          list: '列表为空',
          data: '暂无数据',
          comment: '暂无评论'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    &__icon {
      margin-top: 14rpx;
      color: #AAAAAA;
      font-size: 90rpx;
    }
    
    &__image {
      width: 160rpx;
      height: 160rpx;
    }
    
    &__text {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 20rpx;
      color: #AAAAAA;
      font-size: 30rpx;
    }
    
    &__slot {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 20rpx;
    }
  }
</style>
