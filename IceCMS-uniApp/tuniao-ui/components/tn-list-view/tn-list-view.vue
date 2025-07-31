<template>
  <view
    class="tn-list-view-class tn-list-view"
    :class="[
      backgroundColorClass,
      viewClass
    ]"
    :style="[viewStyle]"
  >
    <view
      v-if="showTitle"
      class="tn-list-view__title"
      :class="[
        fontColorClass
      ]"
      :style="[titleStyle]"
      @tap="handleClickTitle"
    >{{ title }}</view>
    
    <view
      v-else
      :class="[{'tn-list-view__title--card': card}]"
      @tap="handleClickTitle"
    >
      <slot name="title"></slot>
    </view>
    
    <view
      class="tn-list-view__content tn-border-solid-top tn-border-solid-bottom"
      :class="[contentClass]"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    mixins: [ componentsColorMixin ],
    name: 'tn-list-view',
    props: {
      // 标题
      title: {
        type: String,
        default: ''
      },
      // 去掉边框 上边框 top, 下边框 bottom, 所有边框 all
      unlined: {
        type: String,
        default: 'all'
      },
      // 上外边距
      marginTop: {
        type: String,
        default: ''
      },
      // 内容是否显示为卡片模式
      card: {
        type: Boolean,
        default: false
      },
      // 是否自定义标题
      customTitle: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      showTitle() {
        return !this.customTitle && this.title
      },
      viewClass() {
        let clazz = ''
        
        if (this.card) {
          clazz += ' tn-list-view--card'
        }
        
        return clazz
      },
      viewStyle() {
        let style = {}
        
        if (this.backgroundColorStyle) {
          style.backgroundColor = this.backgroundColorStyle
        }
        
        if (this.marginTop) {
          style.marginTop = this.marginTop
        }
        
        return style
      },
      titleStyle() {
        let style = {}
        
        if (this.fontColorStyle) {
          style.color = this.fontColorStyle
        }
        if (this.fontSize) {
          style.fontSize = this.fontSize + this.fontUnit
        }
        
        return style
      },
      contentClass() {
        let clazz = ''
        
        if (this.card) {
          clazz += ' tn-list-view__content--card'
        }
        
        switch(this.unlined) {
          case 'top':
            clazz += ' tn-none-border-top'
            break
          case 'bottom':
            clazz += ' tn-none-border-bottom'
            break
          case 'all':
            clazz += ' tn-none-border'
            break
        }
        
        return clazz
      }
    },
    data () {
      return {
        kindShowFlag: this.showKind
      }
    },
    methods: {
      // 处理标题点击事件
      handleClickTitle() {
        if (!this.kindList) return
        this.kindShowFlag = !this.kindShowFlag
        this.$emit("clickTitle", {})
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-list-view {
    background-color: #FFFFFF;
    
    &__title {
      width: 100%;
      padding: 30rpx;
      font-size: 30rpx;
      line-height: 30rpx;
      box-sizing: border-box;
      
      &--card {
        // margin: 0rpx 30rpx;
      }
    }
    
    &__content {
      width: 100%;
      position: relative;
      border-radius: 0;
      
      &--card {
        // width: auto;
        // overflow: hidden;
        // margin-right: 30rpx;
        // margin-left: 30rpx;
        // border-radius: 20rpx
      }
    }
    
    &--card {
      // padding-bottom: 30rpx;
      border-radius: 20rpx;
      overflow: hidden;
    }
    
  }
  
</style>
