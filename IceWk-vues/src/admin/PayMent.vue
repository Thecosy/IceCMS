<template>
  <div class="bg-fa of">
    <section id="index" class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">课程列表</span>
        </h2>
      </header>
      <ul>
        <li v-for="product in productList" :key="product.id">
          <a :class="['orderBtn', {current:payOrder.productId === product.id}]" 
            @click="selectItem(product.id)" 
            href="javascript:void(0);" >
            {{product.title}} 
            ¥{{product.price / 100}}
          </a>
        </li>
      </ul>

      
      <div class="PaymentChannel_payment-channel-panel">
        <h3 class="PaymentChannel_title"> 
          选择支付方式 
        </h3>
        <div class="PaymentChannel_channel-options" >

          <!-- 选择微信 -->
          <div :class="['ChannelOption_payment-channel-option', {current:payOrder.payType === 'wxpay'}]"
          @click="selectPayType('wxpay')">
            <div class="ChannelOption_channel-icon">
              <img src="../static/image/pay/wxpay.png" class="ChannelOption_icon">
            </div>
            <div class="ChannelOption_channel-info">
              <div class="ChannelOption_channel-label">
                <div class="ChannelOption_label">微信支付</div>
                <div class="ChannelOption_sub-label"></div>
                <div class="ChannelOption_check-option"></div>
              </div>
            </div>
          </div>

          <!-- 选择支付宝 -->
          <div :class="['ChannelOption_payment-channel-option', {current:payOrder.payType === 'alipay'}]"
          @click="selectPayType('alipay')">
            <div class="ChannelOption_channel-icon">
              <img src="../static/image/pay/alipay.png" class="ChannelOption_icon">
            </div>
            <div class="ChannelOption_channel-info">
              <div class="ChannelOption_channel-label">
                <div class="ChannelOption_label">支付宝</div>
                <div class="ChannelOption_sub-label"></div>
                <div class="ChannelOption_check-option"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="payButtom">
        <el-button 
        :disabled="payBtnDisabled"
        type="warning" 
        round 
        style="width: 180px;height: 44px;font-size: 18px;"
        @click="toPay()">
          确认支付
        </el-button>
        <!-- <el-button 
        :disabled="payBtnDisabled"
        type="warning" 
        round 
        style="width: 180px;height: 44px;font-size: 18px;"
        @click="toPayV2()">
          确认支付V2
        </el-button> -->
      </div>
    </section>

    <!-- 微信支付二维码 -->
    <div v-if="this.ok">
    <el-dialog
      :visible.sync="codeDialogVisible"
      :show-close="false"
      @close="closeDialog"
      width="320px"
      center>
      <h5
      class="outh5"> <img src="../static/image/pay/weixinbig.png" class="alipaybig_icon"> 
      </h5>
      <h5
      class="outh5">
      <div class="bottom alipay"> 使用扫码支付
        0.01元 </div>
        </h5>
       <h5
      class="outh5"> 
     <qriously :value="codeUrl" :size="190"/>
        </h5>
        <div style="height:40px">  </div>
        <h5
      class="outh7"> 
        <div  style="color:#E0E0E0;" class="bottom alipay"> 请使用微信扫一扫<br>扫描二维码支付<br> </div>
        </h5>
    </el-dialog>
    </div>
    <!-- 支付宝支付二维码 -->
    <div v-if="this.ok2">
    <el-dialog
      :visible.sync="codeDialogVisible"
      :show-close="false"
      @close="closeDialog"
      width="320px"
      center>
      <h5
      class="outh5"> <img src="../static/image/pay/alipaybig.png" class="alipaybig_icon"> 
      </h5>
      <h5
      class="outh5">
      <div class="bottom alipay"> 使用扫码支付
        0.01元 </div>
        </h5>
       <h5
      class="outh5"> 
     <qriously :value="codeUrl" :size="190"/>
        </h5>
        <div style="height:40px">  </div>
        <h5
      class="outh6"> 
        <div  style="color:#E0E0E0;" class="bottom alipay"> 请使用支付宝扫一扫<br>扫描二维码支付<br> </div>
        </h5>
    </el-dialog>
    </div>
  </div>
</template>


<script>
import productApi from '../api/payment/product'
import wxPayApi from '../api/payment/wxPay'
import aliPayApi from '../api/payment/aliPay'
import orderInfoApi from '../api/payment/orderInfo'

export default {
  data () {
    return {
      ok:false,
      ok2:false,
      payBtnDisabled: false, //确认支付按钮是否禁用
      codeDialogVisible: false, //微信支付二维码弹窗
      productList: [], //商品列表
      payOrder: { //订单信息
        productId: '', //商品id
        payType: 'wxpay' //支付方式
      },
      codeUrl: '', // 二维码
      orderNo: '', //订单号
      timer: null // 定时器
    }
  },

  //页面加载时执行
  created () {
    //获取商品列表
    productApi.list().then(response => {
      this.productList = response.data.data.productList
      this.payOrder.productId = this.productList[0].id
    })
  },
  
  methods: {
    //选择商品
    selectItem(productId) {
      console.log('商品id：' + productId)
      this.payOrder.productId = productId
      console.log(this.payOrder)
      //this.$router.push({ path: '/order' })
    },

    //选择支付方式
    selectPayType(type) {
      console.log('支付方式：' + type)
      this.payOrder.payType = type
      //this.$router.push({ path: '/order' })
    },

    //确认支付
    toPay(){
      // console.log("确认支付")
      //禁用按钮，防止重复提交
      this.payBtnDisabled = true

      //支付宝支付
      if(this.payOrder.payType === 'alipay'){ 
        this.ok = false
        this.ok2 = true
        console.log("zfb")
          //调用统一下单接口
        aliPayApi.ftofPay(this.payOrder.productId).then(response => {
          this.codeUrl = response.data.data.codeUrl
          this.orderNo = response.data.data.orderNo

          //TODO 根据商品id获取价格
          
          //打开二维码弹窗
          this.codeDialogVisible = true

          //启动定时器
          this.timer = setInterval(() => {
            //查询订单是否支付成功
            this.queryOrderStatus()
          }, 3000)

        })
      }
      //微信支付
      if(this.payOrder.payType === 'wxpay'){
        this.ok = true
        this.ok2 = false
          //调用统一下单接口
        wxPayApi.nativePay(this.payOrder.productId).then(response => {
          this.codeUrl = response.data.data.codeUrl
          this.orderNo = response.data.data.orderNo

          //打开二维码弹窗
          this.codeDialogVisible = true

          //启动定时器
          this.timer = setInterval(() => {
            //查询订单是否支付成功
            this.queryOrderStatus()
          }, 500)

        })
      }

    },

    //关闭微信支付二维码对话框时让“确认支付”按钮可用
    closeDialog(){
      console.log('close.................')
      this.payBtnDisabled = false
      console.log('清除定时器')
      clearInterval(this.timer)
    },


    // 查询订单状态
    queryOrderStatus() {

      orderInfoApi.queryOrderStatus(this.orderNo).then(response => {
        console.log('查询订单状态：' + response.data.code)

        // 支付成功后的页面跳转
        if (response.data.code === 0) {
          console.log('清除定时器')
          clearInterval(this.timer)
          // 三秒后跳转到订单列表
          setTimeout(() => {
            this.$router.push({ path: '/success' })
          }, 500)
        }
      })
    }
  }
}
</script>
<style  scoped>
#header {
    background-color: #fff;
    box-shadow: 0 2px 3px rgb(7 0 2 / 4%);
    padding: 30px 0;
    position: relative;
}
.container {
    margin-left: auto;
    margin-right: auto;
    width: 90%;
}
#logo {
    float: left;
    width: 220px;
    height: 72px;
    overflow: hidden;
    margin: 0 auto;
}
#logo a {
    display: table-cell;
    vertical-align: middle;
    height: 72px;
}
#logo a img {
    display: block;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
}
.nav, .nav li, .nav li a {
    float: left;
}
.nav {
    padding: 15px 0 0 50px;
}
.nav, .nav li, .nav li a {
    float: left;
}
.nav li a {
    border-bottom: 2px solid transparent;
    color: #666;
    display: block;
    font-size: 20px;
    line-height: 50px;
    padding: 0 10px;
    margin: 0 10px;
    transition: .3s;
    -webkit-transition: .3s;
}


.nav li a:hover, .nav li.current a {
    text-decoration: none;
}

#index {
    padding-bottom: 80px;
}

.comm-title {
    overflow: hidden;
    clear: both;
    margin: 40px 0 30px;
}

#footer {
    background-color: #323232;
    border-top-width: 5px;
    border-top-style: solid;
    color: #999;
    width: 100%;
    overflow: hidden;
    padding-top: 30px;
}

.clear {
    clear: both;
    display: block;
    overflow: hidden;
    visibility: hidden;
    width: 0;
    height: 0;
}

.bg-fa {
    background-color: #fafafa;
}

.of {
    overflow: hidden;
}


.hLh30 {
    height: 30px;
    line-height: 30px;
}

.c-999 {
    color: #999;
}

.fsize18 {
    font-size: 18px;
}

.f-fM {
    font-family: 'Microsoft YaHei';
}

.flink-list li {
    float: left;
    margin: 15px 30px 0 0;
}

.flink-list li a {
    color: #666;
    font-size: 12px;
}

.b-foot {
    border-top: 1px solid #393939;
    padding: 20px 0 40px 0;
    margin-top: 30px;
}

.b-f-link {
    color: #444;
    line-height: 12px;
    margin-left: -10px;
    line-height: 20px;
}

.b-f-link a, .b-f-link span {
    color: #666;
    display: block;
    margin: 0 10px 5px;
    display: inline-block;
    vertical-align: middle;
}


.col-7 {
    width: 75%;
}

.mr20 {
    margin-right: 20px;
}

.fl {
    float: left;
}



#index ul {
    list-style-type: none;
    padding: 0;
  }
  #index  li {
    display: inline-block;
    margin: 0 10px;
  }
  #index a.orderBtn {
    border: 1px solid #f3e2c6;
    background-color: #ffffff;
    color: #f39800;
    border-radius: 5px;
    width: 180px;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
  }
  
  #index a.current{
    border: 1px solid;
    background-color: #fffcf5;
  }
  
  .PaymentChannel_payment-channel-panel {
      position: relative;
      padding: 22px 0 0;
      margin-top: 20px;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 4px 30px 0 rgb(238 242 245 / 80%);
  }
  
  .PaymentChannel_title {
      position: relative;
      display: flex;
      height: 25px;
      padding-left: 30px;
      line-height: 25px;
      font-size: 18px;
      font-weight: 500;
      color: #353535;
  }
  
  .PaymentChannel_title:before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: calc(50% - 10px);
      width: 4px;
      height: 18px;
      background: #fa8919;
      border-radius: 0 4px 4px 0;
  }
  
  .PaymentChannel_channel-options {
      display: flex;
      flex-wrap: wrap;
      padding: 22px 20px 12px;
  }
  
  .ChannelOption_payment-channel-option {
      position: relative;
      display: flex;
      align-items: center;
      width: 207px;
      height: 58px;
      margin: 0 10px 16px;
      border: 1px solid #e7ecf0;
      border-radius: 4px;
      cursor: pointer;
  }
  
  
  .ChannelOption_payment-channel-option.current {
      border-color: #fa8919;
  }
  
  .ChannelOption_payment-channel-option.current:after {
      content: "";
      display: block;
      position: absolute;
      right: -1px;
      bottom: -1px;
      width: 28px;
      height: 28px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAOKADAAQAAAABAAAAOAAAAAANV2hTAAADnUlEQVRoBd3ZzUsUYRwH8O/zzK6llaZkm5mkWdEhN4KEgqKkDhpU9KJpNy/hKch/QK9BdRM7SAQeSnujDgUWXqKgyBBqISKDlswwETXzbZ15eubRGbZ1dp3dmdndmQd255nnZef34Tf7G2UBD7fIta3txKs+FcfA2jwJ1HBq8jwHjMZ5DhiL8xTQCOcZYDycJ4CJcK4HroZzNdAMzrVAszhXApPBuQ6YLM5VwFRwrgGminMF0Aou64FWcVkNtAOXtUC7cFkJtBOXdUC7cVkFdAKXNUCncFkBdBKXcaDTuIwC04HLGDBduIwA04lLOzDduLQCM4FLGzBTuLQAM4lTgZL65lRzGkerWyCduQX41oL9eGvIcOzXJcdxNe2Qqi8LFPv7G4sd+wyBPsNRi4OO4giFVHsdtKpRj1IZ7Nb7sR3bM+gojvohne4E3X1Sd8ivb0Dhr3jNVqCjOH8upLO3QcuPCgtjDEp/G5SBrng2MW4b0BRuTQEwP5kwIMNJvk+60A1aekBMM0WG/LwVLHTfcHn0oC1V1AxOqrsJ6VQnSH4p2NcX0TEk7q8rhu9iL2jJUhFhi/OQn7aAfX6SeN/yrOUiYwanXotsPwxCCEiwiZ9QkQGAJQ4yfxvH9YAUVoh1bGEG8uNmsO+vEu+LmrWUQbM49Xpsbgp0V624NAnsBdlQwjPZFxVKTLdoJ3xND0EKysQEm5uA3NsU93kXs1s/TRmYDE5cbTQEzIyDVh4XpyRQBbI+ADa08nYlgSB8jb18frNYy6ZHsXivHhj9qAdutpMSMGnccjTs1yAwNwm6o0aMkC1BIK8Y7NtLPV5SdhBS/V2Q3I1ijE2EOe48MD6kr0mmkzQwVZwWFBv5wCvpH9CKY2JIFI/cIo7sB6k8AencHZCcPDHHxr4s4aaGte1JH5MCWsVp0bGfA0BkRn+m0ZL9IPxFD10BkXLEMmVkEHJPA7+tx7RtKR1NA+3CaVGy4fcAL/m0/IgYUisl4dVVbUr4DeQHl3imp8S5lTdTQLtxWsBs+B0gR0D5I0RrCq+s8qNmjp/VhiwdVwU6hdOiFv/mRGZBNu2B8qkHyrOrPIURbdryMeGfak7jLEe/ygdw3PTSTW+w0O04lcQIwoZAL+BUIGG0b8Ut6hkc/yb7/P7gfxn0Ck5kj5BO0hoO6UCP4fql8sJWFSqAXsHx75tCCenwlRfWkYbQgsik23Hqo0CtlmpB8fmlLvW2VGFa+wcOncY5YWRXPQAAAABJRU5ErkJggg==) no-repeat;
      background-size: 28px 28px;
  }
  
  .ChannelOption_channel-icon {
      margin: 0 11px 0 15px;
  }
  
  .ChannelOption_icon {
      display: block;
      width: 24px;
      height: 24px;
  }
  
  .ChannelOption_channel-info {
      position: relative;
      flex: 1;
  }
  
  .ChannelOption_channel-label {
      align-items: center;
      height: 21px;
  }
  
  .ChannelOption_channel-label {
      display: flex;
      position: relative;
  }
  
  .ChannelOption_label {
      line-height: 1;
      font-weight: 400;
  }
  
  .ChannelOption_label {
      font-size: 16px;
      color: #353535;
  }
  
  .ChannelOption_sub-label {
      flex: 1;
      display: flex;
      align-items: center;
  }
  
  .ChannelOption_check-option {
      margin-right: 15px;
  }
  
  .payButtom{
    margin: 30px 0;
    float: right;
  }
</style>>

<style scoped>
.alipaybig_icon{
display:inline-block;
width:120px;
margin:0;
padding:0;
text-align:center;
}
.outh5{
  padding:0px;
  display:flex;
  align-content:flex-end;
  justify-content:center;
  flex-wrap:wrap;
}
.outh6{
  height:50px;
  text-align:center;
  position:absolute;
    bottom: -20px;
    left: 0;
    width: 320px;
  background-color: #01A7EF;
  padding:7px;
  display:flex;
  align-content:flex-end;
  justify-content:center;
  flex-wrap:wrap;
  border-radius:0 0 10px 10px;
}
.outh7{
  height:50px;
  text-align:center;
  position:absolute;
    bottom: -20px;
    left: 0;
    width: 320px;
  background-color:#09BB21;
  padding:7px;
  display:flex;
  align-content:flex-end;
  justify-content:center;
  flex-wrap:wrap;
  border-radius:0 0 10px 10px;
}
</style>
<style>
.el-dialog--center{
  border-radius:10px;
}
.el-dialog--center .el-dialog__body{
  border-radius:10px;
  text-align:initial;
  background-color:#FFF;
}
.el-dialog__header{
  display:none;
  background-color:#E0E0E0;
}
</style>
