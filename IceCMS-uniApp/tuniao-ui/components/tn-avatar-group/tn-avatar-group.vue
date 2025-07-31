<template>
  <view class="tn-avatar-group-class tn-avatar-group">
    <view v-for="(item, index) in lists" :key="index" class="tn-avatar-group__item" :style="[itemStyle(index)]">
      <tn-avatar
        :src="item.src || ''"
        :text="item.text || ''"
        :icon="item.icon || ''"
        :size="size"
        :shape="shape"
        :imgMode="imgMode"
        :border="true"
        backgroundColor="rgba(255, 255, 255, 0.4)"
        :borderSize="4"
      ></tn-avatar>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-avatar-group',
    props: {
      // 头像列表
      lists: {
        type: Array,
        default() {
          return []
        }
      },
      // 头像类型
      // square 带圆角正方形 circle 圆形
      shape: {
        type: String,
        default: 'circle'
      },
      // 大小
      // sm 小头像 lg 大头像 xl 加大头像
      // 如果为其他则认为是直接设置大小
      size: {
        type: [Number, String],
        default: ''
      },
      // 当设置为显示头像信息时，
      // 图片的裁剪模式
      imgMode: {
        type: String,
        default: 'aspectFill'
      },
      // 头像之间的遮挡比例
      // 0.4 代表 40%
      gap: {
        type: Number,
        default: 0.4
      }
    },
    computed: {
      itemStyle() {
        return (index) => {
          let style = {}
          if (this._checkSizeIsInline()) {
            switch(this.size) {
              case 'sm':
                style.marginLeft = index != 0 ? `${-48 * this.gap}rpx` : ''
                break
              case 'lg':
                style.marginLeft = index != 0 ? `${-96 * this.gap}rpx` : ''
                break
              case 'xl':
                style.marginLeft = index != 0 ? `${-128 * this.gap}rpx` : ''
                break
            }
          } else {
            const size = Number(this.size.replace(/(px|rpx)/g, '')) || 64
            style.marginLeft = index != 0 ? `-${size * this.gap}rpx` : ''
          }
          return style
        }
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      // 检查是否使用内置的大小进行设置
      _checkSizeIsInline() {
        if (/(xs|sm|md|lg|xl|xxl)/.test(this.size)) return true
        else return false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-avatar-group {
    display: flex;
    flex-direction: row;
    
    &__item {
      position: relative;
    }
  }
</style>
