<template>
  <view
    class="tn-grid-item-class tn-grid-item"
    :class="[
      backgroundColorClass
    ]"
    :hover-class="hoverClass"
    :hover-stay-time="150"
    :style="{
      backgroundColor: backgroundColorStyle,
      width: gridWidth
    }"
    @tap="click"
  >
    <view
      class="tn-grid-item__box"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    mixins: [ componentsColorMixin ],
    name: 'tn-grid-item',
    props: {
      // 序号
      index: {
        type: [Number, String],
        default: ''
      }
    },
    data() {
      return {
        // 父组件数据
        parentData: {
          // 按下去的样式
          hoverClass: '',
          col: 3
        }
      }
    },
    created() {
      // 父组件实例
      this.updateParentData()
      this.parent.children.push(this)
    },
    computed: {
      // 计算每个宫格的宽度
      gridWidth() {
        // #ifdef MP-WEIXIN
        return '100%'
        // #endif
        // #ifndef MP-WEIXIN
        return 100 / Number(this.parentData.col) + '%'
        // #endif
      },
      // 点击效果
      hoverClass() {
        return this.parentData.hoverClass !== 'none' 
                 ? this.parentData.hoverClass + ' tn-grid-item--hover' 
                 : this.parentData.hoverClass
      }
    },
    methods: {
      // 获取父组件参数
      updateParentData() {
        this.getParentData('tn-grid')
      },
      click() {
        this.$emit('click', this.index)
        this.parent && this.parent.click(this.index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-grid-item {
    box-sizing: border-box;
    background-color: #FFFFFF;
    /* #ifndef APP-NVUE */
    display: flex;
    flex-direction: row;
    /* #endif */
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: column;
    
    /* #ifdef MP */
    // float: left;
    /* #endif */
    
    &__box {
      /* #ifndef APP-NVUE */
      display: flex;
      flex-direction: row;
      /* #endif */
      align-items: center;
      justify-content: center;
      flex-direction: column;
      flex: 1;
      width: 100%;
      height: 100%;
    }
    
    &--hover {
      background: $tn-space-color !important;
    }
  }
</style>
