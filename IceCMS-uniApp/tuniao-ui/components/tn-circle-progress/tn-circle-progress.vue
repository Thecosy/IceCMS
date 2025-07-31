<template>
  <view
    class="tn-circle-progress-class tn-circle-progress"
    :style="{
      width: widthPx + 'px',
      height: widthPx + 'px'
    }"
  >
    <!-- 支付宝小程序不支持canvas-id属性，必须用id属性 -->
    <!-- 默认圆环 -->
    <canvas
      class="tn-circle-progress__canvas-bg"
      :canvas-id="elBgId"
      :id="elBgId"
      :style="{
        width: widthPx + 'px',
        height: widthPx + 'px'
      }"
    ></canvas>
    <!-- 进度圆环 -->
    <canvas
      class="tn-circle-progress__canvas"
      :canvas-id="elId"
      :id="elId"
      :style="{
        width: widthPx + 'px',
        height: widthPx + 'px'
      }"
    ></canvas>
    <view class="tn-circle-progress__content">
      <slot v-if="$slots.default || $slots.$default"></slot>
      <view v-else-if="showPercent" class="tn-circle-progress__content__percent">{{ percent + '%' }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-circle-progress',
    props: {
      // 进度（百分比）
      percent: {
        type: Number,
        default: 0,
        validator: val => {
          return val >= 0 && val <= 100
        }
      },
      // 圆环线宽
      borderWidth: {
        type: Number,
        default: 14
      },
      // 整体圆的宽度
      width: {
        type: Number,
        default: 200
      },
      // 是否显示条纹
      striped: {
        type: Boolean,
        default: false
      },
      // 条纹是否运动
      stripedActive: {
        type: Boolean,
        default: true
      },
      // 激活部分颜色
      activeColor: {
        type: String,
        default: '#01BEFF'
      },
      // 非激活部分颜色
      inactiveColor: {
        type: String,
        default: '#f0f0f0'
      },
      // 是否显示进度条内部百分比值
      showPercent: {
        type: Boolean,
        default: false
      },
      // 圆环执行动画的时间，ms
      duration: {
        type: Number,
        default: 1500
      }
    },
    data() {
      return {
        // 微信小程序中不能使用this.$t.uuid()形式动态生成id值，否则会报错
        // #ifdef MP-WEIXIN
        elBgId: 'tCircleProgressBgId',
        elId: 'tCircleProgressElId',
        // #endif
        // #ifndef MP-WEIXIN
        elBgId: this.$t.uuid(),
        elId: this.$t.uuid(),
        // #endif
        // 活动圆上下文
        progressContext: null,
        // 转换成px为单位的背景宽度
        widthPx: uni.upx2px(this.width || 200),
        // 转换成px为单位的圆环宽度
        borderWidthPx: uni.upx2px(this.borderWidth || 14),
        // canvas画圆的起始角度，默认为-90度，顺时针
        startAngle: -90 * Math.PI / 180,
        // 动态修改进度值的时候，保存进度值的变化前后值
        newPercent: 0,
        oldPercent: 0
      }
    },
    watch: {
      percent(newVal, oldVal = 0) {
        if (newVal > 100) newVal = 100
        if (oldVal < 0) oldVal = 0
        
        this.newPercent = newVal
        this.oldPercent = oldVal
        setTimeout(() => {
        	// 无论是百分比值增加还是减少，需要操作还是原来的旧的百分比值
        	// 将此值减少或者新增到新的百分比值
        	this.drawCircleByProgress(oldVal)
        }, 50)
      }
    },
    created() {
      // 赋值，用于加载后第一个画圆使用
      this.newPercent = this.percent;
      this.oldPercent = 0;
    },
    mounted() {
      setTimeout(() => {
      	this.drawProgressBg()
      	this.drawCircleByProgress(this.oldPercent)
      }, 50)
    },
    methods: {
      // 绘制进度条背景
      drawProgressBg() {
        let ctx = uni.createCanvasContext(this.elBgId, this)
        // 设置线宽
        ctx.setLineWidth(this.borderWidthPx)
        // 设置颜色
        ctx.setStrokeStyle(this.inactiveColor)
        ctx.beginPath()
        let radius = this.widthPx / 2
        ctx.arc(radius, radius, radius - this.borderWidthPx, 0, 360 * Math.PI / 180, false)
        ctx.stroke()
        ctx.draw()
      },
      // 绘制圆弧的进度
      drawCircleByProgress(progress) {
        // 如果已经存在则拿来使用
        let ctx = this.progressContext
        if (!ctx) {
          ctx =uni.createCanvasContext(this.elId, this)
          this.progressContext = ctx
        }
        ctx.setLineCap('round')
        // 设置线条宽度和颜色
        ctx.setLineWidth(this.borderWidthPx)
        ctx.setStrokeStyle(this.activeColor)
        // 将总过渡时间除以100，得出每修改百分之一进度所需的时间
        let preSecondTime = Math.floor(this.duration / 100)
        // 结束角的计算依据为：将2π分为100份，乘以当前的进度值，得出终止点的弧度值，加起始角，为整个圆从默认的
        let endAngle = ((360 * Math.PI / 180) / 100) * progress + this.startAngle
        let radius = this.widthPx / 2
        ctx.beginPath()
        ctx.arc(radius, radius, radius - this.borderWidthPx, this.startAngle, endAngle, false)
        ctx.stroke()
        ctx.draw()
        
        // 如果变更后新值大于旧值，意味着增大了百分比
        if (this.newPercent > this.oldPercent) {
          // 每次递增百分之一
          progress++
          // 如果新增后的值，大于需要设置的值百分比值，停止继续增加
          if (progress > this.newPercent) return
        } else {
          progress--
          if (progress < this.newPercent) return
        }
        setTimeout(() => {
          // 定时器，每次操作间隔为time值，为了让进度条有动画效果
          this.drawCircleByProgress(progress)
        }, preSecondTime)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-circle-progress {
    position: relative;
    /* #ifndef APP-NVUE */
    display: inline-flex;		
    /* #endif */
    align-items: center;
    justify-content: center;
    background-color: transparent;
    
    &__canvas {
      position: absolute;
      
      &-bg {
        position: absolute;
      }
    }
    
    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
      
      &__percent {
        font-size: 28rpx;
      }
    }
  }
</style>
