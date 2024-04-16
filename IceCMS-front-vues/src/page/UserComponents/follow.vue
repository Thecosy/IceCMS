<template>
  <div class="home">
    <div>
    <el-table :data="dataList" style="width: 500px">
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.followprofile" :size="40">
</el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="关注者" prop="followername"></el-table-column>
      <el-table-column label="被关注者" prop="followname"></el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="showDialog(scope.row)">取消关注</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
    ></el-pagination> -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handleDialogClose"
    >
      <span>确定要取消关注吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmCancel">确定</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>
<script>
import wxPayApi from '../../api/payment/wxPay'
import { followers } from '../../api/webfollow'

export default {
  data() {
    return {
      dataList: [
        { follower: '张三', following: '李四' },
        { follower: '王五', following: '赵六' },
        { follower: '小明', following: '小红' },
        { follower: '小李', following: '小张' },
        { follower: '小王', following: '小赵' },
        { follower: '小七', following: '小八' },
        { follower: '小九', following: '小十' },
        { follower: '小A', following: '小B' },
        { follower: '小C', following: '小D' },
        { follower: '小E', following: '小F' },
      ],
      currentPage: 1,
      pageSize: 5,
      total: 10,
      dialogVisible: false,
      currentRow: null
      
    }
  },
  created() {
    this.getFollowList()

  },
  methods: {

    getFollowList(){
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      followers(user.data.userid).then(res => {
        console.log(res)
        this.dataList = res.data
      })
    },
    onSubmit() {
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      this.userJudje = (user == null)
      if (!this.userJudje) { this.userid = user.data.userid }
      if (this.userJudje) {
        //未登录提醒登陆
        this.$notify({
          title: '失败',
          message: '暂未登陆请登陆后重试',
          type: 'warning',
          offset: 50
        });
      }
      else {
        //登陆用户购买
        console.log("登陆用户购买")
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
.myVEmojiPicker ::v-deep.category {
  background: none;
}
.myVEmojiPicker ::v-deep .border {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}
.myVEmojiPicker ::v-deep .myVEmojiPicker[data-v-3bfe90b7] .border {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker ::v-deep .category.active[data-v-6d975e7c] {
  border-bottom: 3px solid #50a1ff;
}
.myVEmojiPicker ::v-deep .grid-emojis[data-v-5c988bee] {
  background: #ffffff;
}
.myVEmojiPicker ::v-deep .emoji-picker[data-v-f1d527bc] {
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