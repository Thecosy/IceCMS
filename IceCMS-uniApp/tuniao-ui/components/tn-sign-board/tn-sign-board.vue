<template>
  <view v-if="show" class="tn-sign-board-class tn-sign-board" :style="{top: `${customBarHeight}px`, height: `calc(100% - ${customBarHeight}px)`}">
    <!-- 签名canvas -->
    <view class="tn-sign-board__content">
      <view class="tn-sign-board__content__wrapper">
        <canvas class="tn-sign-board__content__canvas" :canvas-id="canvasName" :disableScroll="true" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"></canvas>
      </view>
    </view>
    
    <!-- 底部工具栏 -->
    <view class="tn-sign-board__tools">
      <!-- 可选颜色 -->
      <view class="tn-sign-board__tools__color">
        <view
          v-for="(item, index) in signSelectColor"
          :key="index"
          class="tn-sign-board__tools__color__item"
          :class="[{'tn-sign-board__tools__color__item--active': currentSelectColor === item}]"
          :style="{backgroundColor: item}"
          @tap="colorSwitch(item)"
        ></view>
      </view>
      
      <!-- 按钮 -->
      <view class="tn-sign-board__tools__button">
        <view class="tn-sign-board__tools__button__item tn-bg-red" @tap="reDraw">清除</view>
        <view class="tn-sign-board__tools__button__item tn-bg-blue" @tap="save">保存</view>
        <view class="tn-sign-board__tools__button__item tn-bg-indigo" @tap="previewImage">预览</view>
        <view class="tn-sign-board__tools__button__item tn-bg-orange" @tap="closeBoard">关闭</view>
      </view>
    </view>
    
    <!-- 伪全屏生成旋转图片canvas容器，不在页面上展示 -->
    <view style="position: fixed; left: -2000px;width: 0;height: 0;overflow: hidden;">
      <canvas canvas-id="temp-tn-sign-canvas" :style="{width: `${canvasHeight}px`, height: `${canvasHeight}px`}"></canvas>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'tn-sign-board',
    props: {
      // 是否显示
      show: {
        type: Boolean,
        default: false
      },
      // 可选签名颜色
      signSelectColor: {
        type: Array,
        default() {
          return ['#080808', '#E83A30']
        }
      },
      // 是否旋转输出图片
      rotate: {
        type: Boolean,
        default: true
      },
      // 自定义顶栏的高度
      customBarHeight: {
        type: [String, Number],
        default: 0
      }
    },
    data() {
      return {
        canvasName: 'tn-sign-canvas',
        ctx: null,
        canvasWidth: 0,
        canvasHeight: 0,
        currentSelectColor: this.signSelectColor[0],
        // 第一次触摸
        firstTouch: false,
        // 透明度
        transparent: 1,
        // 笔迹倍数
        lineSize: 1.5,
        // 最小画笔半径
        minLine: 0.5,
        // 最大画笔半径
        maxLine: 4,
        // 画笔压力
        pressure: 1,
        // 顺滑度，用60的距离来计算速度
        smoothness: 60,
        // 当前触摸的点
        currentPoint: {},
        // 当前线条
        currentLine: [],
        // 画笔圆半径
        radius: 1,
        // 裁剪区域
        cutArea: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        // 所有线条， 生成贝塞尔点
        // bethelPoint: [],
        // 上一个点
        lastPoint: 0,
        // 笔迹
        chirography: [],
        // 当前笔迹
        // currentChirography: {},
        // 画线轨迹，生成线条的实际点
        linePrack: []
      }
    },
    watch: {
      show(value) {
        if (value && this.canvasWidth === 0 && this.canvasHeight === 0) {
          this.$nextTick(() => {
            this.getCanvasInfo()
          })
        }
      },
      signSelectColor(value) {
        if (value.length > 0) {
          this.currentSelectColor = value[0]
        }
      }
    },
    created() {
      // 创建canvas
      this.ctx = uni.createCanvasContext(this.canvasName, this)
    },
    mounted() {
      // 获取画板的相关信息
      // this.$nextTick(() => {
      //   this.getCanvasInfo()
      // })
    },
    methods: {
      // 获取画板的相关信息
      getCanvasInfo() {
        this._tGetRect('.tn-sign-board__content__canvas').then(res => {
         this.canvasWidth = res.width
         this.canvasHeight = res.height
         
         // 初始化Canvas
         this.$nextTick(() => {
           this.initCanvas('#FFFFFF')
         })
        })
      },
      // 初始化Canvas
      initCanvas(color) {
        /* 将canvas背景设置为 白底，不设置  导出的canvas的背景为透明 */
        // rect() 参数说明  矩形路径左上角的横坐标，左上角的纵坐标, 矩形路径的宽度, 矩形路径的高度
        // 矩形的宽高需要减去边框的宽度
        this.ctx.rect(0, 0, this.canvasWidth - uni.upx2px(4), this.canvasHeight - uni.upx2px(4))
        this.ctx.setFillStyle(color)
        this.ctx.fill()
        this.ctx.draw()
      },
      // 开始画
      onTouchStart(e) {
        if (e.type != 'touchstart') return false
        
        // 设置线条颜色
        this.ctx.setFillStyle(this.currentSelectColor)
        // 设置透明度
        this.ctx.setGlobalAlpha(this.transparent)
        let currentPoint = {
          x: e.touches[0].x,
          y: e.touches[0].y
        }
        let currentLine = this.currentLine
        currentLine.unshift({
          time: new Date().getTime(),
          dis: 0,
          x: currentPoint.x,
          y: currentPoint.y
        })
        this.currentPoint = currentPoint
        
        if (this.firstTouch) {
          this.cutArea = {
            top: currentPoint.y,
            right: currentPoint.x,
            bottom: currentPoint.y,
            left: currentPoint.x
          }
          this.firstTouch = false
        }
        
        this.pointToLine(currentLine)
      },
      // 正在画
      onTouchMove(e) {
        if (e.type != 'touchmove') return false
        if (e.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!e.defaultPrevented) {
            e.preventDefault()
          }
        }
        let point = {
          x: e.touches[0].x,
          y: e.touches[0].y
        }
        
        if (point.y < this.cutArea.top) {
          this.cutArea.top = point.y
        }
        if (point.y < 0) this.cutArea.top = 0
        
        if (point.x < this.cutArea.right) {
          this.cutArea.right = point.x
        }
        if (this.canvasWidth - point.x <= 0) {
          this.cutArea.right = this.canvasWidth
        }
        if (point.y > this.cutArea.bottom) {
          this.cutArea.bottom = this.canvasHeight
        }
        if (this.canvasHeight - point.y <= 0) {
          this.cutArea.bottom = this.canvasHeight
        }
        if (point.x < this.cutArea.left) {
          this.cutArea.left = point.x
        }
        if (point.x < 0) this.cutArea.left = 0
        
        this.lastPoint = this.currentPoint
        this.currentPoint = point
        
        let currentLine = this.currentLine
        currentLine.unshift({
          time: new Date().getTime(),
          dis: this.distance(this.currentPoint, this.lastPoint),
          x: point.x,
          y: point.y
        })
        
        this.pointToLine(currentLine)
      },
      // 移动结束
      onTouchEnd(e) {
        if (e.type != 'touchend') return false
        let point = {
          x: e.changedTouches[0].x,
          y: e.changedTouches[0].y
        }
        this.lastPoint = this.currentPoint
        this.currentPoint = point
        
        let currentLine = this.currentLine
        currentLine.unshift({
          time: new Date().getTime(),
          dis: this.distance(this.currentPoint, this.lastPoint),
          x: point.x,
          y: point.y
        })
        
        //一笔结束，保存笔迹的坐标点，清空，当前笔迹
        //增加判断是否在手写区域
        this.pointToLine(currentLine)
        let currentChirography = {
          lineSize: this.lineSize,
          lineColor: this.currentSelectColor
        }
        
        let chirography = this.chirography
        chirography.unshift(currentChirography)
        this.chirography = chirography
        
        let linePrack = this.linePrack
        linePrack.unshift(this.currentLine)
        this.linePrack = linePrack
        this.currentLine = []
      },
      // 重置绘画板
      reDraw() {
        this.initCanvas('#FFFFFF')
      },
      // 保存
      save() {
        // 在组件内使用需要第二个参数this
        uni.canvasToTempFilePath({
          canvasId: this.canvasName,
          fileType: 'png',
          quality: 1,
          success: (res) => {
            if (this.rotate) {
              this.getRotateImage(res.tempFilePath).then((res) => {
                this.$emit('save', res)
              }).catch(err => {
                this.$t.message.toast('旋转图片失败')
              })
            } else {
              this.$emit('save', res.tempFilePath)
            }
          },
          fail: () => {
            this.$t.message.toast('保存失败')
          }
        }, this)
      },
      // 预览图片
      previewImage() {
        // 在组件内使用需要第二个参数this
        uni.canvasToTempFilePath({
          canvasId: this.canvasName,
          fileType: 'png',
          quality: 1,
          success: (res) => {
            if (this.rotate) {
              this.getRotateImage(res.tempFilePath).then((res) => {
                uni.previewImage({
                  urls: [res]
                })
              }).catch(err => {
                this.$t.message.toast('旋转图片失败')
              })
            } else {
              uni.previewImage({
                urls: [res.tempFilePath]
              })
            }
          },
          fail: (e) => {
            this.$t.message.toast('预览失败')
          }
        }, this)
      },
      // 关闭签名板
      closeBoard() {
        this.$t.message.modal('提示信息','关闭后内容将被清除，是否确认关闭',() => {
          this.$emit('closed')
        }, true)
      },
      // 切换画笔颜色
      colorSwitch(color) {
        this.currentSelectColor = color
      },
      // 绘制两点之间的线条
      pointToLine(line) {
        this.calcBethelLine(line)
      },
      // 计算插值，让线条更加圆滑
      calcBethelLine(line) {
        if (line.length <= 1) {
          line[0].r = this.radius
          return
        }
        let x0,
          x1,
          x2,
          y0,
          y1,
          y2,
          r0,
          r1,
          r2,
          len,
          lastRadius,
          dis = 0,
          time = 0,
          curveValue = 0.5;
        if (line.length <= 2) {
          x0 = line[1].x
          y0 = line[1].y
          x2 = line[1].x + (line[0].x - line[1].x) * curveValue
          y2 = line[1].y + (line[0].y - line[1].y) * curveValue
          x1 = x0 + (x2 - x0) * curveValue
          y1 = y0 + (y2 - y0) * curveValue
        } else {
          x0 = line[2].x + (line[1].x - line[2].x) * curveValue
          y0 = line[2].y + (line[1].y - line[2].y) * curveValue
          x1 = line[1].x
          y1 = line[1].y
          x2 = x1 + (line[0].x - x1) * curveValue
          y2 = y1 + (line[0].y - y1) * curveValue
        }
        // 三个点分别是(x0,y0),(x1,y1),(x2,y2) ；(x1,y1)这个是控制点，控制点不会落在曲线上；实际上，这个点还会手写获取的实际点，却落在曲线上
        len = this.distance({
          x: x2,
          y: y2
        }, {
          x: x0,
          y: y0
        })
        lastRadius = this.radius
        for (let i = 0; i < line.length - 1; i++) {
          dis += line[i].dis
          time += line[i].time - line[i + 1].time
          if (dis > this.smoothness) break
        }
        
        this.radius = Math.min((time / len) * this.pressure + this.minLine, this.maxLine) * this.lineSize
        line[0].r = this.radius
        // 计算笔迹半径
        if (line.length <= 2) {
          r0 = (lastRadius + this.radius) / 2
          r1 = r0
          r2 = r1
        } else {
          r0 = (line[2].r + line[1].r) / 2
          r1 = line[1].r
          r2 = (line[1].r + line[0].r) / 2
        }
        let n = 5
        let point = []
        for (let i = 0; i < n; i++) {
          let t = i / (n - 1)
          let x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * x1 + t * t * x2
          let y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * y1 + t * t * y2
          let r = lastRadius + ((this.radius - lastRadius) / n) * i
          point.push({
            x,
            y,
            r
          })
          if (point.length === 3) {
            let a = this.ctaCalc(point[0].x, point[0].y, point[0].r, point[1].x, point[1].y, point[1].r, point[2].x, point[2].y, point[2].r)
            a[0].color = this.currentSelectColor
            
            this.drawBethel(a, true)
            point = [{
              x,
              y,
              r
            }]
          }
        }
        this.currentLine = line
      },
      // 求两点之间的距离
      distance(a, b) {
        let x = b.x - a.x
        let y = b.y - a.y
        return Math.sqrt(x * x + y * y)
      },
      // 计算点信息
      ctaCalc(x0, y0, r0, x1, y1, r1, x2, y2, r2) {
        let a = [],
          vx01,
          vy01,
          norm,
          n_x0,
          n_y0,
          vx21,
          vy21,
          n_x2,
          n_y2;
        vx01 = x1 - x0
        vy01 = y1 - y0
        norm = Math.sqrt(vx01 * vx01 + vy01 * vy01 + 0.0001) * 2
        vx01 = (vx01 / norm) * r0
        vy01 = (vy01 / norm) * r0
        n_x0 = vy01
        n_y0 = -vx01
        vx21 = x1 - x2
        vy21 = y1 - y2
        norm = Math.sqrt(vx21 * vx21 + vy21 * vy21 + 0.0001) * 2
        vx21 = (vx21 / norm) * r2
        vy21 = (vy21 / norm) * r2
        n_x2 = -vy21
        n_y2 = vx21
        a.push({
          mx: x0 + n_x0,
          my: y0 + n_y0,
          color: '#080808'
        })
        a.push({
          c1x: x1 + n_x0,
          c1y: y1 + n_y0,
          c2x: x1 + n_x2,
          c2y: y1 + n_y2,
          ex: x2 + n_x2,
          ey: y2 + n_y2
        })
        a.push({
          c1x: x2 + n_x2 - vx21,
          c1y: y2 + n_y2 - vy21,
          c2x: x2 - n_x2 - vx21,
          c2y: y2 - n_y2 - vy21,
          ex: x2 - n_x2,
          ey: y2 - n_y2
        })
        a.push({
          c1x: x1 - n_x2,
          c1y: y1 - n_y2,
          c2x: x1 - n_x0,
          c2y: y1 - n_y0,
          ex: x0 - n_x0,
          ey: y0 - n_y0
        })
        a.push({
          c1x: x0 - n_x0 - vx01,
          c1y: y0 - n_y0 - vy01,
          c2x: x0 + n_x0 - vx01,
          c2y: y0 + n_y0 - vy01,
          ex: x0 + n_x0,
          ey: y0 + n_y0
        })
        a[0].mx = a[0].mx.toFixed(1)
        a[0].mx = parseFloat(a[0].mx)
        a[0].my = a[0].my.toFixed(1)
        a[0].my = parseFloat(a[0].my)
        for (let i = 1; i < a.length; i++) {
          a[i].c1x = a[i].c1x.toFixed(1)
          a[i].c1x = parseFloat(a[i].c1x)
          a[i].c1y = a[i].c1y.toFixed(1)
          a[i].c1y = parseFloat(a[i].c1y)
          a[i].c2x = a[i].c2x.toFixed(1)
          a[i].c2x = parseFloat(a[i].c2x)
          a[i].c2y = a[i].c2y.toFixed(1)
          a[i].c2y = parseFloat(a[i].c2y)
          a[i].ex = a[i].ex.toFixed(1)
          a[i].ex = parseFloat(a[i].ex)
          a[i].ey = a[i].ey.toFixed(1)
          a[i].ey = parseFloat(a[i].ey)
        }
        return a
      },
      // 绘制贝塞尔曲线
      drawBethel(point, is_fill, color) {
        this.ctx.beginPath()
        this.ctx.moveTo(point[0].mx, point[0].my)
        if (color != undefined) {
          this.ctx.setFillStyle(color)
          this.ctx.setStrokeStyle(color)
        } else {
          this.ctx.setFillStyle(point[0].color)
          this.ctx.setStrokeStyle(point[0].color)
        }
        for (let i = 1; i < point.length; i++) {
          this.ctx.bezierCurveTo(point[i].c1x, point[i].c1y, point[i].c2x, point[i].c2y, point[i].ex, point[i].ey)
        }
        this.ctx.stroke()
        if (is_fill != undefined) {
          //填充图形 ( 后绘制的图形会覆盖前面的图形, 绘制时注意先后顺序 )
          this.ctx.fill()
        }
        this.ctx.draw(true)
      },
      // 旋转图片
      async getRotateImage(dataUrl) {
        // const url = await this.base64ToPath(dataUrl)
        const url = dataUrl
        
        // 创建新画布
        const tempCtx = uni.createCanvasContext('temp-tn-sign-canvas', this)
        const width = this.canvasWidth
        const height = this.canvasHeight
        tempCtx.restore()
        tempCtx.save()
        tempCtx.translate(0, height)
        tempCtx.rotate(270 * Math.PI / 180)
        tempCtx.drawImage(url, 0, 0, width, height)
        tempCtx.draw()
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            uni.canvasToTempFilePath({
              canvasId: 'temp-tn-sign-canvas',
              fileType: 'png',
              x: 0,
              y: height - width,
              width: height,
              height: width,
              success: res => resolve(res.tempFilePath),
              fail: reject
            }, this)
          }, 50)
        })
      },
      // 将base64转换为本地
      base64ToPath(dataUrl) {
        return new Promise((resolve, reject) => {
          // 判断地址是否包含bas64字样，不包含直接返回
          if (dataUrl.indexOf('base64') !== -1) {
            const data = uni.base64ToArrayBuffer(dataUrl.replace(/^data:image\/\w+;base64,/, ''))
            // #ifdef MP-WEIXIN
            const filePath = `${wx.env.USER_DATA_PATH}/${new Date().getTime()}-${Math.random().toString(32).slice(2)}.png`
            // #endif
            // #ifndef MP-WEIXIN
            const filePath = `${new Date().getTime()}-${Math.random().toString(32).slice(2)}.png`
            // #endif
            uni.getFileSystemManager().writeFile({
              filePath,
              data,
              encoding: 'base64',
              success: () => resolve(filePath),
              fail: reject
            })
          } else {
            resolve(dataUrl)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-sign-board {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #E6E6E6;
    z-index: 997;
    display: flex;
    flex-direction: row-reverse;
    
    &__content {
      width: 84%;
      height: 100%;
      
      &__wrapper {
        width: calc(100% - 60rpx);
        height: calc(100% - 60rpx);
        margin: 30rpx;
        border-radius: 20rpx;
        border: 2rpx dotted #AAAAAA;
        overflow: hidden;
      }
      
      &__canvas {
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
      }
    }
    
    &__tools {
      width: 16%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      
      &__color {
        margin-top: 30rpx;
        
        &__item {
          width: 70rpx;
          height: 70rpx;
          border-radius: 100rpx;
          margin: 20rpx auto;
          
          &--active {
            position: relative;
            
            &::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 40%;
              height: 40%;
              border-radius: 100rpx;
              background-color: #FFFFFF;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
      
      &__button {
        margin-bottom: 30rpx;
        display: flex;
        flex-direction: column;
        
        &__item {
          width: 130rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          margin: 60rpx auto;
          border-radius: 10rpx;
          color: #FFFFFF;
          transform-origin: center center;
          transform: rotateZ(90deg);
        }
      }
    }
  }
</style>
