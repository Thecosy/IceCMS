<template>
  <div class="home">
    <div class="homeContent">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="原密码：">
                    <el-input
                      style="width: 220px"
                      placeholder="请输入密码"
                      v-model="form.yuanPassWord"
                      show-password
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="新密码：">
                    <el-input
                      style="width: 220px"
                      placeholder="请输入密码"
                      v-model="form.NewPassWord"
                      show-password
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="确认密码:">
                    <el-input
                      style="width: 220px"
                      placeholder="请输入密码"
                      v-model="form.ShowPassWord"
                      show-password
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { GetUserInfoByid, ChangePassword } from '@/api/user'

export default {
  data() {
    return {
      form: {
        yuanPassWord: '',
        NewPassWord: '',
        ShowPassWord: '',
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      if (this.form.NewPassWord != this.form.ShowPassWord) {
        this.$notify({
          title: '失败',
          message: '两次输入密码不一致请重新输入',
          type: 'warning',
          offset: 50
        });
        this.form.NewPassWord = ''
        this.form.ShowPassWord = ''
      }
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      ChangePassword(user.data.token, this.form.yuanPassWord, this.form.NewPassWord, user.data.userid ).then(resp => {
        if(resp.data.code == 400){
               this.$notify({
            title: '失败',
            message: '原密码不正确，请重新输入',
            type: 'warning',
            offset: 50
          });
        }
        if (resp.data.code == 402 )  {
          this.$notify({
            title: '失败',
            message: '修改失败',
            type: 'warning',
            offset: 50
          });
        } else if (resp.data.code == 200) {
          //显示成功
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            offset: 50
          });
        }
      })
    },
    getList() {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.site-content {
  display: flex;
  padding: 20px;
  margin-left: 43px;
  margin-right: 43px;
}
.usertopName {
  display: flex;
}
.home {
  background-color: #ffffff;
  border-radius: 13px;
}
.homeContent {
  margin-top: 40px;
}
</style>