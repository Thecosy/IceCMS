<template>
  <div class="home">
    <!-- 微信支付二维码 -->
    <div>
      <el-dialog
        :visible.sync="wxDialogVisible"
        :show-close="false"
        @close="closeDialog"
        width="320px"
        center
      >
        <h5 class="outh5">
          <img
            src="../../static/image/pay/weixinbig.png"
            class="alipaybig_icon"
          />
        </h5>
        <h5 class="outh5">
          <div class="bottom alipay">
            使用扫码支付 {{ this.form.integral  }}元
          </div>
        </h5>
        <h5 class="outh5">
          <qriously :value="codeUrl" :size="190" />
        </h5>
        <div style="height: 40px"></div>
        <h5 class="outh7">
          <div style="color: #e0e0e0" class="bottom alipay">
            请使用微信扫一扫<br />扫描二维码支付<br />
          </div>
        </h5>
      </el-dialog>
    </div>
    <!-- 支付宝支付二维码 -->
    <div>
      <el-dialog
        :visible.sync="aliDialogVisible"
        :show-close="false"
        @close="closeDialog"
        width="320px"
        center
      >
        <h5 class="outh5">
          <img
            src="../../static/image/pay/alipaybig.png"
            class="alipaybig_icon"
          />
        </h5>
        <h5 class="outh5">
          <div class="bottom alipay">
            使用扫码支付 {{ this.form.integral  }}元
          </div>
        </h5>
        <h5 class="outh5">
          <qriously :value="codeUrl" :size="190" />
        </h5>
        <div style="height: 40px"></div>
        <h5 class="outh6">
          <div style="color: #e0e0e0" class="bottom alipay">
            请使用支付宝扫一扫<br />扫描二维码支付<br />
          </div>
        </h5>
      </el-dialog>
    </div>
    <!-- 选择支付方式（登录） -->
    <el-dialog
      :visible.sync="PaymentDialogVisibleLogin"
      :show-close="false"
      @close="closeDialog"
      width="320px"
      center
    >
      <h6 class="outh5">请选择支付方式</h6>
      <div class="swal2-content">
        <div id="swal2-content" style="display: block">
          <div class="pay-button-box">
            <div
              @click="selectPayTypeLogin('alipay')"
              class="pay-item"
              id="alipay"
              data-type="1"
            >
              <img
                style="margin-right: 14px"
                height="40"
                width="40"
                src="../../static/image/pay/zhifubaorenzheng.svg"
              /><span>支付宝</span>
            </div>
            <div
              @click="selectPayTypeLogin('wxpay')"
              class="pay-item"
              id="weixinpay"
              data-type="2"
            >
              <img
                style="margin: 12px"
                height="40"
                width="40"
                src="../../static/image/pay/weixinzhifu.svg"
              /><span>微信支付</span>
            </div>
            <div
              @click="selectPayTypeLogin('wxpay')"
              class="pay-item"
              id="weixinpay"
              data-type="2"
            >
              <img
                style="margin: 12px"
                height="40"
                width="40"
                src="../../static/image/pay/jifen.svg"
              /><span>积分支付</span>
            </div>
          </div>
          <p style="font-size: 13px; padding: 0; margin: 0"></p>
        </div>
        <input class="swal2-input" style="display: none" /><input
          type="file"
          class="swal2-file"
          style="display: none"
        />
        <div class="swal2-range" style="display: none">
          <input type="range" /><output></output>
        </div>
        <select class="swal2-select" style="display: none"></select>
        <div class="swal2-radio" style="display: none"></div>
        <label for="swal2-checkbox" class="swal2-checkbox" style="display: none"
          ><input type="checkbox" /><span class="swal2-label"></span></label
        ><textarea class="swal2-textarea" style="display: none"></textarea>
        <div
          class="swal2-validation-message"
          id="swal2-validation-message"
          style="display: none"
        ></div>
      </div>
    </el-dialog>
    <div class="homeContent">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <div style="margin-left: 80px">输入充积分数量:</div>
                  <el-form-item>
                    <el-input
                      style="width: 220px"
                      v-model="form.integral"
                    ></el-input
                    >积分
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即充值</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import wxPayApi from '../../api/payment/wxPay'
import aliPayApi from '../../api/payment/aliPay'

import { UpdateIntegral } from '../../api/user'
export default {
  data() {
    return {
      payJudej: true,
      payBtnDisabled: false,
      orderNo: "",
      codeUrl: "url",
      payOrder: { //订单信息
        productId: '', //商品id
        payType: 'wxpay' //支付方式
      },
      PaymentDialogVisibleLogin: false, //支付方式弹窗
      wxDialogVisible: false, //微信支付二维码弹窗
      aliDialogVisible: false, //支付宝支付二维码弹窗
      form: {
        integral: '',
      }
    }
  },
  methods: {
    // 查询订单状态
    queryOrderStatus() {
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      console.log('查询订单状态')
      UpdateIntegral(user.data.userid, this.form.integral, this.orderNo).then(resp => {
        console.log(resp)
        if (resp.data.code == 402 || resp.data.code == 400) {
          // this.$notify({
          //   title: '失败',
          //   message: '修改失败',
          //   type: 'warning',
          //   offset: 50
          // });
        } else if (resp.data.code == 200) {
          //显示成功
          console.log('清除定时器')
          clearInterval(this.timer)
          // 关闭页面支付框
          this.wxDialogVisible = false
          this.aliDialogVisible = false
          this.$notify({
            title: '支付成功',
            message: '您已成功购买',
            type: 'success',
            offset: 50
          });
        }
      })
    },

    //关闭微信支付二维码对话框时让“确认支付”按钮可用
    closeDialog() {
      console.log('close.................')
      this.payBtnDisabled = false
      console.log('清除定时器')
      clearInterval(this.timer)
    },

    //选择支付方式(登录)
    selectPayTypeLogin(type) {
      console.log('支付方式：' + type)
      this.payOrder.payType = type
      //关闭支付方式选择
      this.PaymentDialogVisibleLogin = false
      //打开对应支付页面

      //支付宝支付
      if (this.payOrder.payType === 'alipay') {
        //打开支付二维码
        this.aliDialogVisible = true
        //调用统一下单接口
        const user = JSON.parse(window.localStorage.getItem('access-admin'))
        aliPayApi.ftofPayVipIntegralLogin(this.form.integral, user.data.userid).then(response => {
          console.log(response.data.data.codeUrl)
          this.codeUrl = response.data.data.codeUrl
          this.orderNo = response.data.data.orderNo

          //启动定时器
          this.timer = setInterval(() => {
            //查询订单是否支付成功
            this.queryOrderStatus()
          }, 3000)

        })
      }
      //微信支付
      if (this.payOrder.payType === 'wxpay') {
        //打开支付二维码
        this.wxDialogVisible = true
        //调用统一下单接口
        const user = JSON.parse(window.localStorage.getItem('access-admin'))
        wxPayApi.nativePayVipIntegralLogin(this.form.integral, user.data.userid).then(response => {
          console.log(response.data.data.codeUrl)
          this.codeUrl = response.data.data.codeUrl
          this.orderNo = response.data.data.orderNo

          //启动定时器
          this.timer = setInterval(() => {
            //查询订单是否支付成功
            this.queryOrderStatus()
          }, 3000)

        })

      }
    },
    onSubmit() {
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      this.userJudje = (user == null)
      if (!this.userJudje) { this.userid = user.data.userid }
      if (this.userJudje) {
        //未登录提醒登录
        this.$notify({
          title: '失败',
          message: '暂未登录请登录后重试',
          type: 'warning',
          offset: 50
        });
      }
      else {
        //登录用户购买
        console.log("登录用户购买")
        //禁用按钮，防止重复提交
        this.payBtnDisabled = true

        //打开支付方式选择
        this.PaymentDialogVisibleLogin = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  background-color: #ffffff;
  border-radius: 13px;
}
.homeContent {
  margin-top: 40px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-container {
  z-index: 20 !important;
  border-radius: 10px !important;
  -webkit-box-shadow: 0 5px 25px 0 rgb(0 0 0 / 13%) !important;
  box-shadow: 0 5px 25px 0 rgb(0 0 0 / 13%) !important;
  background-color: #fff !important;
  width: 360px !important;
  height: 80% !important;
  left: auto !important;
  right: 20px !important;
  bottom: 20px !important;
}
</style>

<style scoped>
.myVEmojiPicker     :deep(.category) {
  background: none;
}
.myVEmojiPicker     :deep(.border) {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}
.myVEmojiPicker     :deep(.myVEmojiPicker[data-v-3bfe90b7]) .border {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker     :deep(.category.active[data-v-6d975e7c])  {
  border-bottom: 3px solid #50a1ff;
}
.myVEmojiPicker     :deep(.grid-emojis[data-v-5c988bee])  {
  background: #ffffff;
}
.myVEmojiPicker     :deep(.emoji-picker[data-v-f1d527bc])  {
  --ep-color-bg: #ffffff;
  --ep-color-sbg: none;
}
.myVEmojiPicker {
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 390px;
  bottom: 20px;
  z-index: 10;
}
.alipaybig_icon {
  display: inline-block;
  width: 120px;
  margin: 0;
  padding: 0;
  text-align: center;
}
.outh5 {
  padding: 0px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
}
.outh6 {
  height: 66px;
  text-align: center;
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 320px;
  background-color: #01a7ef;
  padding: 7px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 0 0 10px 10px;
}
.outh7 {
  height: 66px;
  text-align: center;
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 320px;
  background-color: #09bb21;
  padding: 7px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 0 0 10px 10px;
}
</style>
<style>
.el-dialog--center {
  border-radius: 10px;
}
.el-dialog--center .el-dialog__body {
  border-radius: 10px;
  text-align: initial;
  background-color: #fff;
}
.el-dialog__header {
  display: none;
  background-color: #e0e0e0;
}
</style>
<style scoped>
.pay-button-box {
  padding: 12px 30px;
  z-index: 1;
  text-align: center;
}
.swal2-content {
  z-index: 1;
  justify-content: center;
  margin: 0;
  padding: 0;
  color: #545454;
  font-size: 1.125em;
  font-weight: 300;
  line-height: normal;
  text-align: center;
  word-wrap: break-word;
}
.pay-item {
  width: 100%;
  height: 60px;
  border: 0;
  cursor: pointer;
  font-size: 1.25rem;
  display: inline-block;
  line-height: 60px;
  text-align: center;
}
.device-macbook-pro .device-frame:before {
  bottom: 10px;
  color: #c8cacb;
  content: "IceCMS.com";
  font-size: 12px;
  height: 16px;
  left: 50%;
  line-height: 16px;
  margin-left: -100px;
  position: absolute;
  text-align: center;
  width: 200px;
  z-index: 1;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.dianzan {
  weight: 25px;
  height: 25px;
}
</style>
