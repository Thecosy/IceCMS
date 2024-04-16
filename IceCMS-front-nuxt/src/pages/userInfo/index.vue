<template>
  <div class="home">
    <div class="homeContent">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="昵称：">
                    <el-input
                      style="width: 220px"
                      v-model="form.name"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="邮箱：">
                    <el-input
                      style="width: 180px"
                      v-model="form.email"
                    ></el-input
                    >
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="积分：">
                    <el-input
                      :disabled="true"
                      style="width: 220px"
                      v-model="form.integral"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.busterday"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="author-page-left">
            <div class="author-page">
              <div id="author-index">
                <div class="user-info box b2-radius mg-b">
                  <p class="b2-pd">
                    <span class="user-info-title">昵称：</span><span >{{user.name}}</span>
                  </p>
                  <p class="b2-pd user-verify">
                    <span class="user-info-title">认证：</span>
                    <span ><b ></b><span
                        ></span></span>
                    <span  class="b2-hover">
                      未认证 <a href="https://www.zmki.cn/verify" target="_blank" >前往认证</a>
                    </span>
                  </p>
                  <p class="b2-pd">
                    <span class="user-info-title">描述：</span>
                    <span >本站第<b ></b>号会员</span>
                    入驻本站<b>0</b>天
                  </p>
                  <p class="b2-pd">
                    <span class="user-info-title">性别：</span>
                    <span ><i class="b2font b2-men-line "></i>男</span>
                    <span ><i class="b2font b2-women-line "></i>女</span>
                  </p>
                  <p class="b2-pd">
                    <span class="user-info-title">网址：</span>
                    <span ></span>
                    <span  class="b2-hover">
                      没有网址 <a href="https://www.zmki.cn/users/dCACBojqs/settings" >前往设置</a>
                    </span>
                  </p>
                  <p class="b2-pd">
                    <span class="user-info-title">简介：</span>
                    <span></span>
                    <span class="b2-hover" >
                      没有描述 <a href="https://www.zmki.cn/users/dCACBojqs/settings" >前往设置</a>
                    </span>
                  </p>
                </div>
                <div class="user-sidebar-gold box b2-radius mg-b">
                  <h2>财富</h2>
                  <div class="user-money-and-credit">
                    <div class="user-sidebar-money">
                      <div ></div>
                    </div>
                    <div class="user-sidebar-credit">
                      <div ></div>
                    </div>
                  </div>
                </div>
                <ul class="user-sidebar-count box b2-radius">
                  <li>
                    <i class="b2font b2-article-line "></i>
                    <div>
                      <div class="user-item-name">发布的文章</div>
                      <p class="user-item-count">0</p>
                      <div class="user-item-desc">在本站的投稿</div>
                      <a href=""></a>
                    </div>
                  </li>
                  <li>
                    <i class="b2font b2-flashlight-line "></i>
                    <div>
                      <div class="user-item-name">发布的快讯</div>
                      <p class="user-item-count">0</p>
                      <div class="user-item-desc">在本站发布的快讯</div>
                      <a href=""></a>
                    </div>
                  </li>
                  <li>
                    <i class="b2font b2-chat-smile-2-line "></i>
                    <div>
                      <div class="user-item-name">提交的评论</div>
                      <p class="user-item-count">0</p>
                      <div class="user-item-desc">在本站提交的评论</div>
                      <a href=""></a>
                    </div>
                  </li>
                  <li>
                    <i class="b2font b2-heart-add-line "></i>
                    <div>
                      <div class="user-item-name">关注</div>
                      <p class="user-item-count">0</p>
                      <div class="user-item-desc">关注的人数</div>
                      <a href=""></a>
                    </div>
                  </li>
                  <li>
                    <i class="b2font b2-heart-pulse-line "></i>
                    <div>
                      <div class="user-item-name">粉丝</div>
                      <p class="user-item-count">0</p>
                      <div class="user-item-desc">粉丝人数</div>
                      <a href=""></a>
                    </div>
                  </li>
                  <li>
                    <i class="b2font b2-star-line "></i>
                    <div>
                      <div class="user-item-name">收藏的文章</div>
                      <p class="user-item-count">0</p>
                      <div class="user-item-desc">收藏的文章数量</div>
                      <a href=""></a>
                    </div>
                  </li>
                  <li>
                    <i class="b2font b2-flashlight-line "></i>
                    <div>
                      <div class="user-item-name">收藏的快讯</div>
                      <p class="user-item-count">0</p>
                      <div class="user-item-desc">收藏的快讯数量</div>
                      <a href=""></a>
                    </div>
                  </li>
                  <li>
                    <i class="b2font b2-shopping-bag-line "></i>
                    <div>
                      <div class="user-item-name">收藏的商品</div>
                      <p class="user-item-count">0</p>
                      <div class="user-item-desc">收藏的商品数量</div>
                      <a href=""></a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div> -->
    </div>
  </div>
</template>
<script>
import { GetUserInfoByid, ChangeUser } from '@/api/user'

export default {
  data() {
    return {
      form: {
        userId: '',
        name: '',
        email: '',
        integral: '',
        intro: '',
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      ChangeUser(user.data.token, this.form).then(resp => {
        if (resp.data.code == 402 || resp.data.code == 400) {
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
    async getList() {
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      GetUserInfoByid(user.data.userid).then(resp => {
        this.form = resp.data
        console.log(resp)
      })
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