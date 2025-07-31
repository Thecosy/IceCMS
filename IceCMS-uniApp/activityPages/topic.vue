<template>
  <view class="template-topic tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
    
    <canvas canvas-id="star_canvas" class="mycanvas" :style="'width:' + screenWidth + 'px;height:' + screenHeight + 'px;'"></canvas>
    
    <view class="topic" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-padding-top-xl">
      
        <!-- 答题切换 -->
        <view class="tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center">
          <view class="" style="opacity: 0.95;" v-if="currentModeIndex === 0">
            <tn-circle-progress :percent="30" :striped="true" activeColor="#9EBEFF">
              <view class="tn-color-white">第6题</view>
            </tn-circle-progress>
          </view>
          <view class="" style="opacity: 0.95;" v-if="currentModeIndex === 1">
            <tn-circle-progress :percent="35" :striped="true" activeColor="#9EBEFF">
              <view class="tn-color-white">第7题</view>
            </tn-circle-progress>
          </view>
        </view>
        
        <!-- 输入框内容-->
        <view class="topic__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
          <view class="tn-color-grey ">
            <text class="tn-icon-creative tn-padding-right-xs"></text>
            小提示
          </view>
          <!-- 问题 -->
          <block v-if="currentModeIndex === 0">
            <view class="tn-text-lg tn-text-bold tn-color-grey--dark tn-padding-top">
              我要问一个很难很难的问题，我家吴姐美不美？
            </view>
            
            <view class="topic__info__item__button tn-bg-gray--light" hover-class="tn-hover" :hover-stay-time="150">
              <text class="tn-color-grey">不回答</text>
            </view>
          
            <view class="topic__info__item__button tn-bg-orangered" hover-class="tn-hover" :hover-stay-time="150">
              <text class="tn-icon-close tn-padding-right-xs tn-color-white"></text>
              <text>一般般</text>
            </view>
            
            <view class="topic__info__item__button tn-bg-cyan" hover-class="tn-hover" :hover-stay-time="150">
              <text class="tn-icon-success tn-padding-right-xs tn-color-white"></text>
              <text>贼漂酿</text>
            </view>

          
          </block>
          
          <!-- 问题 -->
          <block v-if="currentModeIndex === 1">
            <view class="tn-text-lg tn-text-bold tn-color-grey--dark tn-padding-top">
              老板嘛，总想要点别人的信息
            </view>
            
            <view class="topic__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="topic__info__item__input__left-icon">
                <view class="tn-icon-my"></view>
              </view>
              <view class="topic__info__item__input__content">
                <input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入姓名" />
              </view>
            </view>
            
            <view class="topic__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="topic__info__item__input__left-icon">
                <view class="tn-icon-phone"></view>
              </view>
              <view class="topic__info__item__input__content">
                <input maxlength="11" placeholder-class="input-placeholder" placeholder="请输入手机号码" />
              </view>
            </view>
            
            
            
            <view class="topic__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              
              <view class="topic__info__item__input__left-icon">
                <view class="tn-icon-calendar"></view>
              </view>
              
              <view class="topic__info__item__input__content">
                <input placeholder-class="input-placeholder" placeholder="请选择年月日" disabled />
              </view>
              <view class="topic__info__item__input__right-icon">
                <view class="tn-icon-down"></view>
              </view>
            </view>
            
          
          </block>
          
          <!-- 从产品的建议就是，单选不用这个提交按钮,如果你要用，那去去掉注释用起来叭 -->
          <!-- <view class="tn-flex topic__info__item__sure">
            <view class="tn-flex-1 justify-content-item tn-text-center">
              <tn-button shape="round" backgroundColor="tn-cool-bg-color-7--reverse" padding="40rpx 0" width="100%" shadow fontBold>
                <text class="tn-color-white" hover-class="tn-hover" :hover-stay-time="150">
                  确定
                </text>
              </tn-button>
            </view>
          </view> -->
          

        </view>
        
        
        <view class="tn-flex tn-flex-row-around tn-margin-top-sm">
          <view class="justify-content-item tn-padding tn-text-center tn-margin-xs tn-color-white" @tap.stop="modeSwitch(0)">
            <text class="tn-icon-left tn-padding-right-sm"></text>
            <text>上一题</text>
          </view>
          <view class="justify-content-item tn-padding tn-text-center tn-margin-xs tn-color-white" @tap.stop="modeSwitch(1)">
            <text>下一题</text>
            <text class="tn-icon-right tn-padding-left-sm"></text>
          </view>
        </view>
        
      </view>
      
      
    </view>

  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  
  const Point = class {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.r = 1 + Math.random() * 2
      this.sx = Math.random() * 2 - 1
      this.sy = Math.random() * 2 - 1
    }
  
    draw(ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = '#fff'
      ctx.fill()
    }
  
    move(w, h) {
      this.x += this.sx
      this.y += this.sy
      if (this.x > w || this.x < 0) this.sx = -this.sx
      if (this.y > h || this.y < 0) this.sy = -this.sy
    }
  
    drawLine(ctx, p) {
      const dx = this.x - p.x
      const dy = this.y - p.y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < 100) {
        var alpha = (100 - d) / 300 * 1
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(p.x, p.y)
        ctx.closePath()
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')'
        ctx.strokeWidth = 1
        ctx.stroke()
      }
    }
  }
  
  const sysinfo = uni.getSystemInfoSync()
  const w = 400
  const h = 1000
  
  
  export default {
    name: 'TemplateTopic',
    mixins: [template_page_mixin],
    data() {
      return {
        // 当前选中的模式
        currentModeIndex: 0,
        // 粒子
        ctx: null,
        screenWidth: sysinfo.screenWidth,
        screenHeight: sysinfo.screenHeight,
        timer: null,
        points: [],
      }
    },
    onLoad(options) {
      this.from = options.from || ''
      
      for (let i = 0; i < 80; i++) {
        this.points.push(new Point(Math.random() * w, Math.random() * h))
      }
      this.ctx = uni.createCanvasContext('star_canvas')
      // console.log(points)
    
      this.gameloop() //进行
      // this.ctx.setFillStyle('red')
      // this.ctx.fillRect(200, 300, 50, 50)
      // this.ctx.draw()
    },
    onUnload() {
      clearTimeout(this.timer)
    },
    
    methods: {
      // 切换模式
      modeSwitch(index) {
        this.currentModeIndex = index
        this.showPassword = false
      },
      /**粒子进行*/
      gameloop() {
        this.timer = setTimeout(this.gameloop, 100);
        // console.log('gameloop')
        this.paint();
      },
      /**清空画布*/
      paint() {
        this.ctx.clearRect(0, 0, w, h)
        for (var i = 0; i < this.points.length; i++) {
          this.points[i].move(w, h)
          this.points[i].draw(this.ctx)
          for (var j = i + 1; j < this.points.length; j++) {
            this.points[i].drawLine(this.ctx, this.points[j])
          }
        }
        this.ctx.draw();
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  /* 胶囊*/
  .tn-custom-nav-bar__back {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 1000rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.5);
    color: #FFFFFF;
    font-size: 18px;
    
    .icon {
      display: block;
      flex: 1;
      margin: auto;
      text-align: center;
    }
    
    &:before {
      content: " ";
      width: 1rpx;
      height: 110%;
      position: absolute;
      top: 22.5%;
      left: 0;
      right: 0;
      margin: auto;
      transform: scale(0.5);
      transform-origin: 0 0;
      pointer-events: none;
      box-sizing: border-box;
      opacity: 0.7;
      background-color: #FFFFFF;
    }
  }
  
  /* 粒子背景 start*/
  .template-topic {
    background: linear-gradient(90deg, #892FE8, #3D7EFF);
    min-height: 100vh
  }
  
  .mycanvas {
    position: fixed;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
    color: #fff;
  }
  
  

  .topic {
    position: relative;
    height: 100%;
    z-index: 1;
    margin-bottom: 120rpx;
    
    
    /* 表单信息 start */
    &__info {
      margin: 105rpx 50rpx 0rpx 50rpx;
      padding: 30rpx 50rpx 50rpx 50rpx;
      border-radius: 20rpx;
      background-color: rgba(255,255,255,1);
      border: 2rpx solid rgba(255, 255, 255, 0.1);
      box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
      
      &__item {
        
        &__input {
          margin-top: 59rpx;
          width: 100%;
          height: 77rpx;
          border: 1rpx solid #C6D1D8;
          border-radius: 39rpx;
          
          &__left-icon {
            width: 10%;
            font-size: 44rpx;
            margin-left: 20rpx;
            color: #78909C;
          }
          
          &__content {
            width: 80%;
            padding-left: 10rpx;
            
            &--verify-code {
              width: 56%;
            }
            
            input {
              font-size: 30rpx;
              color: #78909C;
              // letter-spacing: 0.1em;
            }
          }
          
          &__right-icon {
            width: 10%;
            font-size: 34rpx;
            margin-right: 20rpx;
            color: #78909C;
          }
          
          &__right-verify-code {
            width: 34%;
            margin-right: 20rpx;
          }
        }
        
        &__button {
          margin-top: 59rpx;
          width: 100%;
          height: 77rpx;
          text-align: center;
          font-size: 31rpx;
          font-weight: bold;
          line-height: 77rpx;
          // text-indent: 1em;
          border-radius: 100rpx;
          color: #FFFFFF;
          background-color: rgba(255,255,255,0.2);
          // border: 2rpx solid #FFFFFF;
        }
        
        &__sure {
          margin-top: 75rpx;
          margin-bottom: 39rpx;
          width: 100%;
          letter-spacing: 0.5em;
        }
        
      }
    }
    /* 表单信息 end */
    
    /* 内容 end */
    
  }
  
  /deep/.input-placeholder {
    font-size: 30rpx;
    color: #C6D1D8;
  }
  
</style>
