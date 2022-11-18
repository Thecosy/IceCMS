<template>
  <div class="base">
    <div class="backHui" v-show="showDialog"></div>
    <!-- 注册登录界面 -->
    <div class="loginAndRegist">
   
      <div class="popover" v-show="showDialog">
        <div class="checkHua">
          <i @click="closeDialog" style="margin-right:14px;margin-top:14px"  class="el-icon-close fs-18"/>
          <div style="z-index: 2147483647;transform: translate(-59px,273px);">{{msg}}</div>
        </div>
        <slide-verify ref="slideblock" @again="onAgain" @fulfilled="onFulfilled" @success="onSuccess" @fail="onFail"
          @refresh="onRefresh" :accuracy="accuracy" :slider-text="text"></slide-verify>
       
      </div>
      <!--登录表单-->
      <div class="loginArea">
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 标语 -->
          <div v-show="isShow" class="title">
            LOGIN
          </div>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 密码框和用户名框 -->
          <div v-show="isShow" class="pwdArea">
            <div style="flex: 1;justify-content: center;display: flex;align-items: center">
              <el-input size="medium" class="username" v-model="loginUser.username" style="width: 165px"
                placeholder="用户名"></el-input>
            </div>
            <div style="flex: 1;justify-content: center;display: flex;align-items: center">
              <el-input size="medium" placeholder="密码" v-model="loginUser.password" style="width: 165px" show-password>
              </el-input>
            </div>
            <div  style="flex: 1;justify-content: center;display: flex;align-items: center">
           
            <el-button v-show="isShowyan" type="primary"  @click="showemoge()">
              <div>  <a class="nav-link p-0 cursor-pointer"><i  class="icon-smile fs-18" />
             
            </a>
            <div>验证</div></div>
            </el-button>
            <el-button v-show="!isShowyan" type="success"  >
              <div>  <a class="nav-link p-0 cursor-pointer"><i  class="icon-smile fs-18" />
             
            </a>
            <div>成功</div></div>
            </el-button>
            </div>
 

          </div>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 登录注册按钮 -->
          <div v-show="isShow" class="btnArea">
            <el-button type="primary" round style="background-color: rgb(52 143 210);letter-spacing: 5px" @click="UserLogin">登录
            </el-button>
          </div>
        </transition>
      </div>
      <!-- 注册表单 -->
      <div class="registArea">
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!--  注册表头-->
          <div v-show="!isShow" class="rigestTitle">
            管理员注册
          </div>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!--            注册表单-->
          <div v-show="!isShow" class="registForm">
            <div style="flex: 1;display: flex;justify-content: center;align-items: center">
              用{{ "\xa0" }}{{ "\xa0" }}{{ "\xa0" }}户{{ "\xa0" }}{{ "\xa0" }}{{ "\xa0" }}名:
              <el-input size="medium" placeholder="请输入用户名" v-model="regUser.regUsername"
                style="width: 165px;margin-left: 10px" clearable>
              </el-input>
            </div>
            <div style="flex: 1;display: flex;justify-content: center;align-items: center">
              密{{ "\xa0" }}{{ "\xa0" }}{{ "\xa0" }}{{ "\xa0" }}{{ "\xa0" }}{{ "\xa0" }}{{ "\xa0" }}{{ "\xa0" }}{{ "\xa0"
              }}{{ "\xa0" }}码:
              <el-input size="medium" placeholder="请输入密码" style="width: 165px;margin-left: 10px"
                v-model="regUser.regPwd" show-password></el-input>
            </div>
            <div style="flex: 1;display: flex;justify-content: center;align-items: center;">
              确认密码:
              <el-input size="medium" placeholder="请再次输入密码" style="width: 165px;margin-left: 10px"
                v-model="regUser.regRePwd" show-password></el-input>
            </div>
            
            <!-- <div style="flex: 1;display: flex;align-items: center">
                    管理员审核:
                    <template>
                    <el-select id="elselect"  v-model="regUser.selectValue" filterable style="width: 100px;margin-left: 10px"  placeholder="请选择">
                        <el-option
                                v-for="item in admins"
                                :key="item.id"
                                :label="item.nickname"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </template>
                </div> -->
                <div  style="flex: 1;justify-content: center;display: flex;align-items: center">
           
           <el-button v-show="isShowyan" type="primary"  @click="showemoge()">
             <div>  <a class="nav-link p-0 cursor-pointer"><i  class="icon-smile fs-18" />
            
           </a>
           <div>验证</div></div>
           </el-button>
           <el-button v-show="!isShowyan" type="success"  >
             <div>  <a class="nav-link p-0 cursor-pointer"><i  class="icon-smile fs-18" />
            
           </a>
           <div>成功</div></div>
           </el-button>
           </div>
          </div>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!--            注册按钮-->
          <div v-show="!isShow" class="registBtn">
            <el-button type="primary" round style="background-color: rgb(52 143 210);letter-spacing: 5px" @click="userRegister">
              注册</el-button>
          </div>
        </transition>
      </div>
      <!-- 信息展示界面 -->
      <div id="aaa" class="showInfo" :style="{
       borderTopRightRadius:styleObj.bordertoprightradius,
       borderBottomRightRadius:styleObj.borderbottomrightradius,
       borderTopLeftRadius:styleObj.bordertopleftradius,
       borderBottomLeftRadius:styleObj.borderbottomleftradius,
       right:styleObj.rightDis
      }" ref="showInfoView">

        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 没有用户输入用户名或者找不到用户名的时候 -->
          <div v-show="isShow"
            style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%">
            <!-- 欢迎语 -->
            <div style="flex: 2;display: flex;align-items: center;font-size: 22px;color: #FFFFFF;font-weight: bold">
              欢迎登入后台管理系统
            </div>
            <!-- 欢迎图片 -->
            <div style="flex: 2">
              <el-button type="success" style="background-color: rgb(52 143 210);border: 1px solid #ffffff;" round
                @click="changeToRegiest">还没有账户？点击注册</el-button>
            </div>
          </div>
        </transition>
        <!-- 用户输入用户名时展示头像以及姓名 -->
        <!--           <div>-->

        <!--           </div>-->
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut" appear>
          <!-- 用户注册的时候展示信息 -->
          <div v-show="!isShow"
            style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%">
            <!-- 欢迎语 -->
            <div style="flex: 2;display: flex;align-items: center;font-size: 22px;color: #FFFFFF;font-weight: bold">
              欢迎注册
            </div>
            <!-- 欢迎图片 -->
            <div style="flex: 2">
              <el-button type="success" style="background-color: rgb(52 143 210);border: 1px solid #ffffff;" round
                @click="changeToLogin">已有账户？点击登录</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
import { loginAdmin } from '@/api/login'
import { register } from '@/api/register'
import 'animate.css';
// eslint-disable-next-line no-unused-vars
export default {

  name: 'Login',
  data() {
    return {
      isShowyan: true,
      showDialog: false,
      msg: '',
      text: '向右滑动验证',
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 1,
      //看看用不用转成用户对象
      loginUser: {
        username: "",
        password: ""
      },

      admins: {},
      ////看看用不用转成用户对象
      regUser: {
        regUsername: '',
        regRePwd: '',
        regPwd: '',
        selectValue: "",
      },
      styleObj: {
        bordertoprightradius: '15px',
        borderbottomrightradius: '15px',
        bordertopleftradius: '0px',
        borderbottomleftradius: '0px',
        rightDis: '0px'
      },
      isShow: true
    }
  },
  created() {

  },
  methods: {
    closeDialog(){
      this.showDialog = false;
    },

    showemoge() {
      // console.log("show")
      this.showDialog = !this.showDialog;
    },
    onSuccess(times) {
      console.log('验证通过，耗时 ' + times + '毫秒');
      this.msg = '验证通过，耗时 ' + times + '毫秒'
    
  //延时两秒
  setTimeout(() => {
        this.showDialog = false;
        this.isShowyan=false;
      }, 1000);
    },
    onFail() {
      console.log('验证不通过');
      this.msg = ''
    },
    onRefresh() {
      console.log('点击了刷新小图标');
      this.msg = ''
    },
    onFulfilled() {
      console.log('刷新成功啦！');
    },
    onAgain() {
      console.log('检测到非人为操作的哦！');
      this.msg = 'try again';
      // 刷新
      this.$refs.slideblock.reset();
    },
    handleClick() {
      // 父组件直接可以调用刷新方法
      this.$refs.slideblock.reset();
    },
    changeToRegiest() {
      this.styleObj.bordertoprightradius = '0px'
      this.styleObj.borderbottomrightradius = '0px'
      this.styleObj.bordertopleftradius = '15px'
      this.styleObj.borderbottomleftradius = '15px'
      this.styleObj.rightDis = '50%'
      this.isShow = !this.isShow
    },
    changeToLogin() {
      this.styleObj.bordertoprightradius = '15px'
      this.styleObj.borderbottomrightradius = '15px'
      this.styleObj.bordertopleftradius = '0px'
      this.styleObj.borderbottomleftradius = '0px'
      this.styleObj.rightDis = '0px'
      this.isShow = !this.isShow
    },
    //用户登录
    UserLogin() {
      
      if (this.loginUser.username === "") {
        this.$message.error("用户名不能为空！")
        return false
      } else if (this.loginUser.password.length < 6) {
        this.$message.error("密码长度不能小于6位！")
        return false
      }else if (this.isShowyan!=false){
        this.$message.error("请先验证！")
        return false
      }

      var that = this
      this.loading = true
      loginAdmin(that.loginUser).then(resp => {
        console.log(resp)
        if (resp.data.code == 402 || resp.data.code == 400) {
          that.$message({
            message: '登陆失败',
            type: 'warning'
          })
        } else if (resp.data.code == 200) {
          localStorage.setItem('access-admin', JSON.stringify(resp.data))
          that.$router.push({ path: '/admin' }) // 跳到账号管理
          that.$message({
            message: '登陆成功',
            type: 'success'
          })
        }
      }).catch((e) => { })
      this.loading = false

    },
    //加载管理员信息
    // loadInfoOfAdmin(){
    //     this.request.get("http://localhost:9090/user/listOfAdmin").then(res=>{
    //         if(res.code=="200"){
    //                 this.admins=res.data
    //             return true
    //         }
    //     })
    // },
    //用户注册
    userRegister() {
      if (this.regUser.regUsername === "") {
        this.$message.error("用户名不能为空！")
        return false
      } else if (this.regUser.regPwd != this.regUser.regRePwd) {
        this.$message.error("两次密码输入不同，请检查后重新注册！")
        return false
      }else if (this.isShowyan!=false){
        this.$message.error("请先验证！")
        return false
      }
      //  else if(this.regUser.selectValue===""){
      //      this.$message.error("未选择审核员!")
      //      return false
      //  }
      else {
        let user = {};
        user.username = this.regUser.regUsername
        user.password = this.regUser.regPwd
        //  user.auditor = this.regUser.selectValue

        var that = this

        this.loading = true
        register(user).then(resp => {
          if (resp.data.code == 402 || resp.data.code == 400) {
            that.$message({
              message: '用户名已经存在',
              type: 'warning'
            })
          } else if (resp.data.code == 200) {
            that.$router.push({ path: '/' }) // 跳到主页
            that.$message({
              message: '注册成功',
              type: 'success'
            })
            //登陆
            localStorage.setItem('access-admin', JSON.stringify(resp.data))
          }
        }).catch((e) => { })

      }
    }
  },

}
</script>

<style>
/* @import '../assets/css/Login.css' */
.base {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../static/image/background.png");
  background-size: 100%;
}

.loginAndRegist {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.loginArea {
  background-color: rgba(255, 255, 255, 0.8);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  height: 400px;
  width: 350px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.registArea {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  height: 400px;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.showInfo {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  position: absolute;
  height: 400px;
  width: 350px;
  z-index: 2;
  top: 0;
  right: 0;
  background-image: url("../../static/image/welcome.png");
  background-size: 90%;
}

.showInfo:hover {
  background-size: 100%;
  background-position: -50px -50px;
}

.title {
  width: 70%;
  flex: 1;
  border-bottom: 1px solid #257B5E;
  display: flex;
  align-items: center;
  color: #257B5E;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
}

#aaa {
  transition: 0.3s linear;
}

.pwdArea {
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;


}

.pwdArea input {
  outline: none;
  height: 30%;
  border-radius: 13px;
  padding-left: 10px;
  font-size: 12px;
  border: 1px solid gray;
}

.pwdArea input:focus {
  border: 2px solid #257B5E;
}

.btnArea {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.rigestTitle {
  width: 70%;
  flex: 1;
  color: #257B5E;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #257B5E;
}

.registForm {
  flex: 2;
  display: flex;
  flex-direction: column;
  color: #257B5E;
  font-size: 16px;
}

.registForm input {
  outline: none;
  height: 30%;
  border-radius: 13px;
  padding-left: 10px;
  font-size: 12px;
  border: 1px solid gray;
}

.registForm input:focus {
  border: 2px solid #257B5E;
}

#elselect:focus {
  border: 2px solid #257B5E;
}

.registBtn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popover {
  background-color: #f5f5f5;
  position: absolute;
  z-index: 999999999;
}
.checkHua{
  display: flex;
    position: absolute;
    /* -webkit-transform: translateX(-15px); */
    -webkit-transform: translate(-26px,-37px);
    transform: translate(-34px,-53px);
    border-radius: 14px;
    height: 314px;
    width: 370px;
    background-color: #FFF;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
}
.backHui{
  
 filter:alpha(opacity=50);
 -moz-opacity:0.5;
 opacity:0.5;

 
  z-index: 999999999;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #cfc2c2;
}
</style>