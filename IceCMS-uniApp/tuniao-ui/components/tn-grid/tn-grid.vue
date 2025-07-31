<template>
  <view
    class="tn-grid-class tn-grid"
    :style="{
      justifyContent: gridAlignStyle
    }"
  >
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: 'tn-grid',
    props: {
      // 分成几列
      col: {
        type: [Number, String],
        default: 3
      },
      // 宫格对齐方式 
      // left 左对齐 center 居中对齐 right 右对齐
      align: {
        type: String,
        default: 'left'
      },
      // 点击时的效果，none没有效果
      hoverClass: {
        type: String,
        default: 'tn-hover'
      }
    },
    data() {
      return {
        
      }
    },
    watch: {
      // 当父组件和子组件需要共享参数变化，通知子组件
      parentData() {
        if (this.children.length) {
          this.children.map(child => {
            // 判断子组件是否有updateParentData方式，有才执行
            typeof(child.updateParentData) === 'function' && child.updateParentData()
          })
        }
      }
    },
    created() {
      // 如果将children定义在data中，在微信小程序会造成循环引用而报错
      this.children = []
    },
    computed: {
      // 计算父组件的值是否发生变化
      parentData() {
        return [this.hoverClass, this.col, this.border]
      },
      // 宫格对齐方式
      gridAlignStyle() {
        switch(this.align) {
          case 'left':
            return 'flex-start'
          case 'center':
            return 'center'
          case 'right':
            return 'flex-end'
          default:
            return 'flex-start'
        }
      }
    },
    methods: {
      click(index) {
        this.$emit('click', index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  // 组件中兼容小程序的方式，不过不能使用对齐方式
  // .tn-grid {
  //   width: 100%;
  //   /* #ifdef MP */
  //   position: relative;
  //   box-sizing: border-box;
  //   overflow: hidden;
  //   /* #endif */
    
  //   /* #ifndef MP */
  //   /* #ifndef APP-NVUE */
  //   display: flex;
  //   flex-direction: row;
  //   /* #endif */
  //   flex-wrap: wrap;
  //   align-items: center;
  //   /* #endif */
  // }
  
  // 在使用组件时兼容小程序
  .tn-grid {
    width: 100%;
    
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
  
</style>
