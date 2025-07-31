<template>
  <view class="tn-cropper-class tn-cropper" @touchmove.stop.prevent="stop">
    <image
      v-if="imageUrl"
      :src="imageUrl"
      class="tn-cropper__image"
      :style="{
        width: (imgWidth ? imgWidth : width) + 'px',
        height: (imgHeight ? imgHeight : height) + 'px',
        transitionDuration: (animation ? 0.3 : 0) + 's'
      }"
      mode="widthFix"
      :data-minScale="minScale"
      :data-maxScale="maxScale"
      @load="imageLoad"
      @error="imageLoad"
      @touchstart="wxs.touchStart"
      @touchmove="wxs.touchMove"
      @touchend="wxs.touchEnd"
    ></image>
    
    <view
      class="tn-cropper__wrapper"
      :style="{
        width: width + 'px',
        height: height + 'px',
        borderRadius: isRound ? '50%' : '0'
      }"
    >
      <view
        class="tn-cropper__border"
        :style="{
          border: borderStyle,
          borderRadius: isRound ? '50%' : '0',
        }"
        :prop="props"
        :change:prop="wxs.propsChange"
        :data-width="width"
        :data-height="height"
        :data-windowHeight="systemInfo.windowHeight || 600"
        :data-windowWidth="systemInfo.windowWidth || 400"
        :data-imgTop="imgTop"
        :data-imgWidth="imgWidth"
        :data-imgHeight="imgHeight"
        :data-angle="angle"
      ></view>
    </view>
    
    <canvas
      class="tn-cropper__canvas"
      :style="{
        width: width * scaleRatio + 'px',
        height: height * scaleRatio + 'px'
      }"
      :canvas-id="CANVAS_ID"
      :id="CANVAS_ID"
      :disable-scroll="true"
    ></canvas>
    
    <view
      v-if="!custom"
      class="tn-cropper__tabbar"
    >
      <view class="tn-cropper__tabbar__btn tn-cropper__tabber__cancel" @tap.stop="back">取消</view>
      <view class="tn-cropper__tabbar__rotate" :class="[`tn-icon-${rotateIcon}`]" @tap.stop="setAngle"></view>
      <view class="tn-cropper__tabbar__btn tn-cropper__tabber__confirm" @tap.stop="getCutImage">完成</view>
    </view>
  </view>
</template>

<script src="./index.wxs" lang="wxs" module="wxs"></script>
<script>
  export default {
    name: 'tn-cropper',
    props: {
      // 图片路径
      imageUrl: {
        type: String,
        default: ''
      },
      // 裁剪框高度 px
      height: {
        type: Number,
        default: 280
      },
      // 裁剪框的宽度 px
      width: {
        type: Number,
        default: 280
      },
      // 是否为圆形裁剪框
      isRound: {
        type: Boolean,
        default: false
      },
      // 裁剪框边框样式
      borderStyle: {
        type: String,
        default: '1rpx solid #FFF'
      },
      // 生成的图片尺寸相对于裁剪框的比例
      scaleRatio: {
        type: Number,
        default: 1
      },
      // 裁剪后的图片质量
      // 取值范围为：(0, 1]
      quality: {
        type: Number,
        default: 0.8
      },
      // 是否返回base64(H5默认为base64)
      returnBase64: {
        type: Boolean,
        default: false
      },
      // 图片旋转角度
      rotateAngle: {
        type: Number,
        default: 0
      },
      // 图片最小缩放比
      minScale: {
        type: Number,
        default: 0.5
      },
      // 图片最大缩放比
      maxScale: {
        type: Number,
        default: 2
      },
      // 自定义操作栏(设置后会隐藏默认的底部操作栏)
      custom: {
        type: Boolean,
        default: false
      },
      // 是否在值发生改变的时候开始裁剪
      // custom为true时生效
      startCutting: {
        type: Boolean,
        default: false
      },
      // 裁剪时是否显示loading
      loading: {
        type: Boolean,
        default: true
      },
      // 旋转图片图标
      rotateIcon: {
        type: String,
        default: 'circle-arrow'
      }
    },
    data() {
      return {
        // canvas容器id
        CANVAS_ID: 'tn-cropper-canvas',
        // 移动裁剪超时时间定时器
        TIME_CUT_CENTER: null,
        // canvas容器
        ctx: null,
        // 画布x轴起点
        cutX: 0,
        // 画布y轴起点
        cutY: 0,
        // 图片宽度
        imgWidth: 0,
        // 图片高度
        imgHeight: 0,
        // 图片底部位置
        imgTop: 0,
        // 图片左边位置
        imgLeft: 0,
        // 图片缩放比
        scale: 1,
        // 图片旋转角度
        angle: 0,
        // 开启动画过渡效果
        animation: false,
        // 动画定时器
        animationTime: null,
        // 系统信息
        systemInfo: {},
        // 传递的参数
        props: '',
        // 标记是否发生改变
        sizeChange: 0,
        angleChange: 0,
        resetChange: 0,
        centerChange: 0
      }
    },
    watch: {
      imageUrl(val) {
        this.imageReset()
        this.showLoading()
        uni.getImageInfo({
          src: val,
          success: (res) => {
            // 计算图片尺寸
            this.imgComputeSize(res.width, res.height)
            this.angleChange++
            this.props = `3,${this.angleChange}`
          },
          fail: (err) => {
            console.log(err);
            this.imgComputeSize()
            this.angleChange++
            this.props = `3,${this.angleChange}`
          }
        })
      },
      rotateAngle(val) {
        this.animation = true
        this.angle = val
        this.angleChanged(val)
      },
      animation(val) {
        clearTimeout(this.animationTime)
        if (val) {
          this.animationTime = setTimeout(() => {
            this.animation = false
          }, 200)
        }
      },
      startCutting(val) {
        if (this.custom && val) {
          this.getCutImage()
        }
      }
    },
    mounted() {
      this.systemInfo = uni.getSystemInfoSync()
      this.imgTop = this.systemInfo.windowHeight / 2
      this.imgLeft = this.systemInfo.windowWidth / 2
      this.ctx = uni.createCanvasContext(this.CANVAS_ID, this)
      // 初始化
      this.$nextTick(() => {
        this.props = '1,1'
      })
      setTimeout(() => {
        this.$emit('ready', {})
      }, 200)
    },
    methods: {
      // 将网络图片转换为本地图片【同步执行】
      async getLocalImage(url) {
        return await new Promise((resolve, reject) => {
          uni.downloadFile({
            url: url,
            success: (res) => {
              resolve(res.tempFilePath)
            },
            fail: (err) => {
              reject(false)
            }
          })
        })
      },
      // 返回裁剪后的图片信息
      getCutImage() {
        if (!this.imageUrl) {
          uni.showToast({
            title: '请选择图片',
            icon: 'none'
          })
          return
        }
        this.loading && this.showLoading()
        const draw = async () => {
          // 图片实际大小
          let imgWidth = this.imgWidth * this.scale * this.scaleRatio
          let imgHeight = this.imgHeight * this.scale * this.scaleRatio
          // canvas和图片的相对距离
          let xpos = this.imgLeft - this.cutX
          let ypos = this.imgTop - this.cutY
          
          
          let imgUrl = this.imageUrl
          // #ifdef APP-PLUS || MP-WEIXIN
          if (~this.imageUrl.indexOf('https:')) {
            imgUrl = await this.getLocalImage(this.imageUrl)
          }
          // #endif
          // 旋转画布
          this.ctx.translate(xpos * this.scaleRatio, ypos * this.scaleRatio)
          // 如果时圆形则截取圆形
          if (this.isRound) {
            const r = this.width > this.height ? Math.floor(this.height / 2) : Math.floor(this.width / 2)
            let translateX = Math.floor(this.width / 2)
            let translateY = Math.floor(this.height / 2)
            this.ctx.beginPath()
            this.ctx.arc(translateX - (xpos * this.scaleRatio), translateY - (ypos * this.scaleRatio), r, 0, (360 * Math.PI) / 180)
            this.ctx.closePath()
            this.ctx.stroke()
            this.ctx.clip()
          }
          
          this.ctx.rotate((this.angle * Math.PI) / 180)
          this.ctx.drawImage(imgUrl, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight)
          
          // 清空后再继续绘制
          this.ctx.draw(false, () => {
            let params = {
              width: this.width * this.scaleRatio,
              height: Math.round(this.height * this.scaleRatio),
              destWidth: this.width * this.scaleRatio,
              destHeight: Math.round(this.height) * this.scaleRatio,
              fileType: 'png',
              quality: this.quality
            }
            let data = {
              url: '',
              base64: '',
              width: this.width * this.scaleRatio,
              height: this.height * this.scaleRatio
            }
            
            // #ifdef MP-ALIPAY
            if (this.returnBase64) {
              this.ctx.toDataURL(params).then((urlData) => {
                data.base64 = urlData
                this.loading && uni.hideLoading()
                this.$emit('cropper', data)
              })
            } else {
              this.ctx.toTempFilePath({
                ...params,
                success: (res) => {
                  data.url = res.apFilePath
                  this.loading && uni.hideLoading()
                  this.$emit('cropper', data)
                }
              })
            }
            // #endif
            
            let base64Flag = this.returnBase64
            // #ifndef MP-ALIPAY
            // #ifdef MP-BAIDU || MP-TOUTIAO || H5
            base64Flag = false
            // #endif
            
            if (base64Flag) {
              uni.canvasGetImageData({
                canvasId: this.CANVAS_ID,
                x: 0,
                y: 0,
                width: this.width * this.scaleRatio,
                height: Math.round(this.height * this.scaleRatio),
                success: (res) => {
                  const arrayBuffer = new Uint8Array(res.data)
                  const base64 = uni.arrayBufferToBase64(arrayBuffer)
                  data.base64 = base64
                  this.loading && uni.hideLoading()
                  this.$emit('cropper', data)
                }
              }, this)
            } else {
              uni.canvasToTempFilePath({
                ...params,
                canvasId: this.CANVAS_ID,
                success: (res) => {
                  data.url = res.tempFilePath
                  // #ifdef H5
                  data.base64 = res.tempFilePath
                  // #endif
                  this.loading && uni.hideLoading()
                  this.$emit('cropper', data)
                }
              }, this)
            }
            // #endif
          })
        }
        draw()
      },
      // 修改图片后触发的函数
      change(e) {
        this.cutX = e.cutX || 0
        this.cutY = e.cutY || 0
        this.imgWidth = e.imgWidth || this.imgWidth
        this.imgHeight = e.imgHeight || this.imgHeight
        this.scale = e.scale || 1
        this.angle = e.angle || 0
        this.imgTop = e.imgTop || 0
        this.imgLeft = e.imgLeft || 0
      },
      // 重置图片
      imageReset() {
        this.scale = 1
        this.angle = 0
        let systemInfo = this.systemInfo.windowHeight ? this.systemInfo : uni.getSystemInfoSync()
        this.imgTop = systemInfo.windowHeight / 2
        this.imgLeft = systemInfo.windowWidth / 2
        this.resetChange++
        this.props = `4,${this.resetChange}`
        // 初始旋转角度
        this.$emit('initAngle', {})
      },
      // 图片的生成的尺寸
      imgComputeSize(width, height) {
        // 默认按图片的最小边 = 对应的裁剪框尺寸
        let imgWidth = width,
          imgHeight = height;
        if (imgWidth && imgHeight) {
          if (imgWidth / imgHeight > this.width / this.height) {
            imgHeight = this.height
            imgWidth = (width / height) * imgHeight
          } else {
            imgWidth = this.width
            imgHeight = (height / width) * imgWidth
          }
        } else {
          let systemInfo = this.systemInfo.windowHeight ? this.systemInfo : uni.getSystemInfoSync()
          imgWidth = systemInfo.windowWidth
          imgHeight = 0
        }
        this.imgWidth = imgWidth
        this.imgHeight = imgHeight
        this.sizeChange++
        this.props = `2,${this.sizeChange}`
      },
      // 图片加载完毕
      imageLoad(e) {
        this.imageReset()
        uni.hideLoading()
        this.$emit('imageLoad', {})
      },
      // 移动结束
      moveStop() {
        clearTimeout(this.TIME_CUT_CENTER)
        this.TIME_CUT_CENTER = setTimeout(() => {
          this.centerChange++
          this.props = `5,${this.centerChange}`
        }, 688)
      },
      // 移动中
      moveDuring() {
        clearTimeout(this.TIME_CUT_CENTER)
      },
      // 显示加载框
      showLoading() {
        uni.showLoading({
          title: '请稍等......',
          mask: true
        })
      },
      // 停止
      stop() {},
      // 取消/返回
      back() {
        uni.navigateBack()
      },
      // 角度改变
      angleChanged(val) {
        this.moveStop()
        if (val % 90) {
          this.angle = Math.round(val / 90) * 90
        }
        this.angleChange++
        this.props = `3,${this.angleChange}`
      },
      // 设置角度
      setAngle() {
        this.animation = true
        this.angle = this.angle + 90
        this.angleChanged(this.angle)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-cropper {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(-120deg, #F15BB5, #9A5CE5, #01BEFF, #00F5D4);
    // background: linear-gradient(-120deg,  #9A5CE5, #01BEFF, #00F5D4, #43e97b);
    // background: linear-gradient(-120deg,#c471f5, #ec008c, #ff4e50,#f9d423);
    // background: linear-gradient(-120deg, #0976ea, #c471f5, #f956b6, #ea7e0a);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    
    &__image {
      width: 100%;
      border-style: none;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      transform-origin: center;
    }
    
    &__canvas {
      position: fixed;
      z-index: 10;
      left: -2000px;
      top: -2000px;
      pointer-events: none;
    }
    
    &__wrapper {
      position: fixed;
      z-index: 4;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border: 3000px solid rgba(0, 0, 0, 0.55);
      pointer-events: none;
      box-sizing: content-box;
    }
    
    &__border {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      pointer-events: none;
    }
    
    &__tabbar {
      width: 100%;
      height: 120rpx;
      padding: 0 40rpx;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #FFFFFF;
      font-size: 32rpx;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        border-top: 1rpx solid rgba(255, 255, 255, 0.2);
        -webkit-transform: scaleY(0.5) translateZ(0);
        transform: scaleY(0.5) translateZ(0);
        transform-origin: 0 100%;
      }
      
      &__btn {
        height: 80rpx;
        display: flex;
        align-items: center;
      }
      
      &__rotate {
        width: 44rpx;
        height: 44rpx;
        font-size: 40rpx;
        text-align: center;
      }
    }
  }
</style>
