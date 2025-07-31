<template>
  <view
    v-if="show"
    class="tn-loading-class tn-loading"
    :class="[
      `tn-loading-${mode}`,
      animation ? `tn-loading-${mode}--animation` : ''
    ]"
    :style="[loadStyle]"
  ></view>
</template>

<script>
  export default {
    name: 'tn-loading',
    props: {
      // 动画类型
      // circle 圆圈 flower 花朵形状
      mode: {
        type: String,
        default: 'circle'
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 是否显示加载动画
      animation: {
        type: Boolean,
        default: true
      },
      // 圆圈颜色
      color: {
        type: String,
        default: ''
      },
      // 图标大小
      size: {
        type: Number,
        default: 34
      }
    },
    computed: {
      // 加载动画圆圈的样式
      loadStyle() {
        let style = {}
        style.width = this.size + 'rpx'
        style.height = style.width
        if (this.mode === 'circle') style.borderColor = `#E6E6E6 #E6E6E6 #E6E6E6 ${this.color ? this.color : '#AAAAAA'}`
        
        return style
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-loading-circle {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    vertical-align: middle;
    width: 28rpx;
    height: 28rpx;
    background: 0 0;
    border-radius: 50%;
    border: 2px solid;
    border-color: #E6E6E6 #E6E6E6 #E6E6E6 #AAAAAA;
    
    &--animation {
      animation: tn-circle 1s linear infinite;
      -webkit-animation: tn-circle 1s linear infinite;
    }
  }
  
  .tn-loading-flower {
    display: inline-block;
    vertical-align: middle;
    width: 28rpx;
    height: 28rpx;
    background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;;
    background-size: 100%;
    
    &--animation {
      animation: tn-flower 1s steps(12) infinite;
      -webkit-animation: tn-flower 1s steps(12) infinite;
    }
  }
  
  @keyframes tn-flower {
  	0% {
  		transform: rotate(0deg);
  		-webkit-transform: rotate(0deg);
  	}
  
  	to {
  		transform: rotate(360deg);
  		-webkit-transform: rotate(360deg);
  	}
  }
  
  @keyframes tn-circle {
  	0% {
  		transform: rotate(0);
  		-webkit-transform: rotate(0);
  	}
  
  	100% {
  		transform: rotate(360deg);
  		-webkit-transform: rotate(360deg);
  	}
  }
</style>
