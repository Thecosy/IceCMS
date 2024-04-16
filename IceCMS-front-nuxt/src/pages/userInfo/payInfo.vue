<template>
  <div class="bg-fa of">
    <section id="index" class="container">
      <el-table :data="list"  style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="orderNo" label="订单编号" width="230" ></el-table-column>
        <el-table-column prop="title" label="订单标题"></el-table-column>
        <el-table-column prop="totalFee" label="订单金额">
          <template slot-scope="scope">
              {{scope.row.totalFee / 100}} 元
          </template>  
        </el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.orderStatus === '未支付'">
              {{scope.row.orderStatus}}
            </el-tag>
            <el-tag v-if="scope.row.orderStatus === '支付成功'" type="success">
              {{ scope.row.orderStatus }}
            </el-tag>
            <el-tag v-if="scope.row.orderStatus === '超时已关闭'" type="warning">
              {{scope.row.orderStatus}}
            </el-tag>
            <el-tag v-if="scope.row.orderStatus === '用户已取消'" type="info">
              {{scope.row.orderStatus}}
            </el-tag>
            <el-tag v-if="scope.row.orderStatus === '退款中'" type="danger">
              {{scope.row.orderStatus}}
            </el-tag>
            <el-tag v-if="scope.row.orderStatus === '已退款'" type="info">
              {{scope.row.orderStatus}}
            </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="createTime" label="创建时间"></el-table-column> -->
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.orderStatus === '未支付'" type="text" @click="cancel(scope.row.orderNo)">取消</el-button>
            <el-button v-if="scope.row.orderStatus === '支付成功'" type="text" @click="refund(scope.row.orderNo)">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <!-- 退款对话框 -->
   <el-dialog
      :visible.sync="refundDialogVisible"
      @close="closeDialog"
      width="350px"
      center>
      <el-form>
        <el-form-item label="退款原因">
          <el-select v-model="reason" placeholder="请选择退款原因">
            <el-option label="不喜欢" value="不喜欢"></el-option>
            <el-option label="买错了" value="买错了"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toRefunds()" :disabled="refundSubmitBtnDisabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import orderInfoApi from "../../api/payment/orderInfo"
// import wxPayApi from "../api/wxPay"

export default {
  data() {
    return {
      list: [], //订单列表
      refundDialogVisible: false, //退款弹窗
      orderNo: '', //退款订单号
      reason: '', //退款原因,
      refundSubmitBtnDisabled: false, //防止重复提交
    };
  },

  created() {
    this.showOrderList()
  },

  methods: {

    //显示订单列表
    showOrderList(){
       const user = JSON.parse(window.localStorage.getItem('access-admin'))
      this.userJudje = (user == null)
       if (!this.userJudje) {
         this.userid = user.data.userid
          
       }
      orderInfoApi.PaylistById( this.userid).then((response) => {
        console.log(response)
        this.list = response.data.data.list;
      });
    },
    
    //用户取消订单
    cancel(orderNo){
      wxPayApi.cancel(orderNo).then(response => {
        this.$message.success(response.message)
        //刷新订单列表
        this.showOrderList()
      })
    },

    //退款对话框
    refund(orderNo){
      this.refundDialogVisible = true
      this.orderNo = orderNo
    },

    //关闭退款对话框
    closeDialog(){
      console.log('close.................')
      this.refundDialogVisible = false
      //还原组件状态
      this.orderNo = ''
      this.reason = ''
      this.refundSubmitBtnDisabled = false
    },

    //确认退款
    toRefunds(){
      this.refundSubmitBtnDisabled = true //禁用按钮，防止重复提交
      wxPayApi.refunds(this.orderNo, this.reason).then(response => {
        console.log('response', response)
        this.closeDialog()
        this.showOrderList()
      })
    }
  }
};
</script>
<style scoped>
.homeContent {
  margin-top: 40px;
}
.home {
  background-color: #ffffff;
  border-radius: 13px;
}
#header {
    background-color: #fff;
    box-shadow: 0 2px 3px rgb(7 0 2 / 4%);
    padding: 30px 0;
    position: relative;
}
.container {
    margin-left: auto;
    margin-right: auto;
    
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
</style>