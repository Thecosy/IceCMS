<template>
  <header class="app-header" data-v-7cf0e7dc="">
    <!-- 登陆 -->
    <el-dialog
      class="dialogdeep"
      width="30%"
      top="30px"
      center
      title=""
      :visible.sync="dialogRegisterFormVisible"
    >
      <div class="box">
        <div class="login-logo">
          <img height="40" width="40" src="../../static/image/logo.svg" />
        </div>
        <div class="login-title">
          <span><b>立即注册</b></span>
        </div>
        <label class="login-form-item" style="display: none"
          ><input
            type="text"
            name="nickname"
            tabindex="1"
            spellcheck="false"
            autocomplete="off"
            class=""
          />
          <span><b>可爱的昵称</b></span></label
        >
        <el-form
          ref="RegisterForm"
          :model="RegisterForm"
          :rules="registerRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="RegisterForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="RegisterForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span> -->
          </el-form-item>
          <el-form-item prop="confirmpassword">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="RegisterForm.confirmpassword"
              :type="passwordType"
              placeholder="确认密码"
              name="confirmpassword"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span> -->
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            @click.native.prevent="userRegister"
            >立即注册</el-button
          >
          <div data-v-11bb2e85="" class="ss-login_statement">
            <span data-v-11bb2e85="">登陆注册即代表同意</span>
            <router-link to="/Protocol">
              <a data-v-11bb2e85="" target="_blank">用户协议</a></router-link
            ><span data-v-11bb2e85="">及</span>
            <router-link to="/Privacy">
              <a data-v-11bb2e85="" target="_blank">隐私条款</a></router-link
            >
          </div>
          <div data-v-11bb2e85="" class="line"></div>
          <div data-v-11bb2e85="" class="footer">
            <p data-v-11bb2e85="" class="text-align-center">
              其他登录方式
              <a style="text-decoration: none">或</a>
              {{ "\xa0" }}
                <a data-v-11bb2e85="" @click="ChangeLogin" class="text-align-center"
                  >立即登陆</a
                >
            </p>
            <div data-v-11bb2e85="" class="other-login">
              <button data-v-11bb2e85="" class="btn-login circle weixin">
                <img class="qqloginsvg" src="../../static/image/qq.svg" />
              </button>
              <button data-v-11bb2e85="" class="btn-login circle weibo">
                <img class="qqloginsvg" src="../../static/image/weixin.svg" />
              </button>
            </div>
          </div>

          <div class="tips">
            <span style="margin-right: 20px"></span>
            <span> </span>
          </div>
        </el-form>
      </div>
      <el-form :model="form"> </el-form>
    </el-dialog>
    <el-dialog
      class="dialogdeep"
      width="30%"
      top="30px"
      center
      title=""
      :visible.sync="dialogFormVisible"
    >
      <div class="box">
        <div class="login-logo">
          <img height="40" width="40" src="../../static/image/logo.svg" />
        </div>
        <div class="login-title">
          <span><b>快速登录</b></span>
        </div>
        <label class="login-form-item" style="display: none"
          ><input
            type="text"
            name="nickname"
            tabindex="1"
            spellcheck="false"
            autocomplete="off"
            class=""
          />
          <span><b>可爱的昵称</b></span></label
        >
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span> -->
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            @click.native.prevent="handleLogin"
            >登陆</el-button
          >
          <div data-v-11bb2e85="" class="ss-login_statement">
            <span data-v-11bb2e85="">登陆注册即代表同意</span>
            <router-link to="/Protocol">
              <a data-v-11bb2e85="" target="_blank">用户协议</a></router-link
            ><span data-v-11bb2e85="">及</span>
            <router-link to="/Privacy">
              <a data-v-11bb2e85="" target="_blank">隐私条款</a></router-link
            >
          </div>
          <div data-v-11bb2e85="" class="line"></div>
          <div data-v-11bb2e85="" class="footer">
            <p data-v-11bb2e85="" class="text-align-center">
              其他登录方式
              <a style="text-decoration: none">或</a>
              {{ "\xa0" }}
                <a data-v-11bb2e85="" @click="ChangeRegister" class="text-align-center"
                  >立即注册</a
                >
            </p>
            <div data-v-11bb2e85="" class="other-login">
              <button data-v-11bb2e85="" class="btn-login circle weixin">
                <img class="qqloginsvg" src="../../static/image/qq.svg" />
              </button>
              <button data-v-11bb2e85="" class="btn-login circle weibo">
                <img class="qqloginsvg" src="../../static/image/weixin.svg" />
              </button>
            </div>
          </div>

          <div class="tips">
            <span style="margin-right: 20px"></span>
            <span> </span>
          </div>
        </el-form>
      </div>
      <el-form :model="form"> </el-form>
    </el-dialog>
    <div
      class="app-header-navbar white shadow-4 border-bottom pc-model"
      data-v-122eae44=""
      data-v-7cf0e7dc=""
    >
      <div class="app-header-main" data-v-122eae44="">
        <router-link
          target="_self"
          data-v-122eae44=""
          aria-current="page"
          to="/"
        >
          <a
            class="app-header-logo active"
            data-v-122eae44=""
            aria-current="page"
          >
            <img src="../../static/image/logo.svg" />
            <span data-v-122eae44="">{{
              this.glabledata.glableSitTitle
            }}</span></a
          >
        </router-link>
        <div class="app-header-nav nav" data-v-122eae44="">
          <router-link
            target="_self"
            class="nav-link"
            :class="message1"
            data-v-122eae44=""
            aria-current="page"
            to="/"
            >首页</router-link
          >
          <router-link
            target="_self"
            class="nav-link"
            :class="message2"
            data-v-1f33282a=""
            to="/list"
            >资源</router-link
          >
          <router-link
            target="_self"
            class="nav-link"
            :class="message3"
            data-v-122eae44=""
            to="/post/all"
            >文章</router-link
          >
          <router-link
            target="_self"
            class="nav-link"
            :class="message5"
            data-v-1f33282a=""
            to="/planet"
            >星球</router-link
          >
          <router-link
            target="_self"
            class="nav-link"
            :class="message4"
            data-v-1f33282a=""
            to="/class"
            >分类</router-link
          >
        </div>
        <div
          class="app-header-search grid-list lazy-transition"
          data-v-122eae44=""
        >
          <div id="autosuggest" data-v-122eae44="">
            <div
              role="combobox"
              aria-expanded="false"
              aria-haspopup="listbox"
              aria-owns="autosuggest-autosuggest__results"
            >
              <el-input
                @keyup.native="keyup()"
                @focus="focus()"
                @blur="blur()"
                v-model="seachcontent"
                type="text"
                autocomplete="off"
                aria-autocomplete="list"
                aria-activedescendant=""
                aria-controls="autosuggest-autosuggest__results"
                id="autosuggest__input"
                placeholder="输入关键词搜索软件或文章…"
                value=""
                class=""
              />
            </div>
            <div
              class="popUp"
              v-show="searchshow"
              @mouseenter="enter"
              @mouseleave="leave"
            >
              <div aria-labelledby="autosuggest" class="autosuggest__results">
                <div data-v-6d6103b4="" class="overflow-hidden">
                  <div
                    data-v-6d6103b4=""
                    class="d-flex align-items-center px-5"
                  >
                    <a
                      @click="codeshows()"
                      data-v-6d6103b4=""
                      :class="{ 'active search-active': codeshow }"
                      class="flex flex-grow-1 text-center py-3 fs-16"
                      ><span data-v-6d6103b4="" class="fw-400">资源</span>
                      <span data-v-6d6103b4="" class="fs-12"
                        >({{ ResourceNumber }})</span
                      ></a
                    >
                    <a
                      @click="articleshows()"
                      data-v-6d6103b4=""
                      :class="{ 'active search-active': articleshow }"
                      class="flex flex-grow-1 text-center py-3 fs-16"
                      ><span data-v-6d6103b4="" class="">文章</span>
                      <span data-v-6d6103b4="" class="fs-12"
                        >({{ articleCount }})</span
                      ></a
                    >
                  </div>
                </div>
                <ul role="listbox">
                  <div v-for="(item, id) in this.tempdata" :key="id">
                    <div v-if="item.status.includes('published')">
                      <router-link :to="howto + item.id">
                        <li
                          role="option"
                          data-suggestion-index="0"
                          data-section-name="default"
                          id="autosuggest__results-item--0"
                          class="autosuggest__results-item"
                        >
                          <a
                            data-v-6d6103b4=""
                            class="macwk-app white border-top"
                            ><span data-v-6d6103b4="" class="snow-dot"></span>
                            <span data-v-6d6103b4="" class="snow-dot"></span>
                            <span data-v-6d6103b4="" class="snow-dot"></span>
                            <span data-v-6d6103b4="" class="snow-dot"></span>
                            <span data-v-6d6103b4="" class="snow-dot"></span>
                            <span data-v-6d6103b4="" class="snow-dot"></span>
                            <span data-v-6d6103b4="" class="snow-dot"></span>
                            <div
                              data-v-6d6103b4=""
                              class="macwk-app__hover--content"
                            ></div>
                            <div
                              data-v-6d6103b4=""
                              class="macwk-app__header--icon"
                            >
                              <div
                                data-v-6d6103b4=""
                                class="macwk-app__header--icon--content"
                              ></div>
                              <img
                                data-v-6d6103b4=""
                                :src="item.thumb"
                                lazy="loaded"
                              />
                            </div>
                            <div
                              data-v-6d6103b4=""
                              class="macwk-app__body py-1"
                            >
                              <h5
                                data-v-6d6103b4=""
                                class="macwk-app__body--title fs-14"
                                style="
                                  display: -webkit-box;
                                  -webkit-box-orient: vertical;
                                  overflow: hidden;
                                  word-break: break-all;
                                  text-overflow: ellipsis;
                                  -webkit-line-clamp: 1;
                                "
                              >
                                <span data-v-6d6103b4="">{{ item.title }}</span>
                                <!-- <span
                            data-v-6d6103b4=""
                            class="
                              macwk-app__body--title--version
                              text-muted
                              fs-14
                            "
                            ><span data-v-6d6103b4="" class="mx-1">-</span
                            >1.0.1</span
                          > -->
                              </h5>
                              <p
                                data-v-6d6103b4=""
                                class="macwk-app__body--info"
                                style="
                                  display: -webkit-box;
                                  -webkit-box-orient: vertical;
                                  overflow: hidden;
                                  word-break: break-all;
                                  text-overflow: ellipsis;
                                  -webkit-line-clamp: 1;
                                "
                              >
                                <span data-v-6d6103b4="">{{ item.intro }}</span>
                              </p>
                            </div>
                            <!---->
                            <div
                              data-v-6d6103b4=""
                              class="macwk-box__more fs-24"
                            >
                              <i
                                data-v-6d6103b4=""
                                class="light-icon-more icon-next-arrow"
                              ></i></div
                          ></a>
                        </li>
                      </router-link>
                    </div>
                  </div>
                </ul>
                <div data-v-6d6103b4="">
                  <button
                    data-v-6d6103b4=""
                    class="
                      btn btn-block
                      border-top
                      no-radius
                      py-3
                      hover-primary
                      cursor-pointer
                      fs-14
                    "
                  >
                    查看更多
                    <span data-v-6d6103b4="" class="fw-400"></span>
                    <!---->
                  </button>
                </div>
              </div>
            </div>

            <!---->
            <button
              class="btn search-to"
              @click="queryssubmit()"
              data-v-122eae44=""
            >
              <i class="icon-search" data-v-122eae44=""></i>
            </button>
            <div
              id="autosuggest-autosuggest__results"
              class="autosuggest__results-container"
            >
              <!---->
            </div>
          </div>
        </div>
        <el-popover placement="top-start" width="280" trigger="hover">
          <div class="top-user-info-box-names">
            <div class="topic-header-lefts">
              <div class="topic-avatars">
                <el-avatar :src="user.profile"></el-avatar>
              </div>
              <div class="topic-names">
                <div>
                  <div class="topic-name-datas">
                    <a target="_blank"
                      ><b>{{ user.name }}</b></a
                    >
                    <!---->
                    <!---->
                  </div>
                  <div class="topic-user-lvs">
                    <p>
                      <span class="user-vips"
                        ><i style="border-color: #ff8223"></i
                        ><b v-show="vipTrue" style="color: #ff8223">会员</b></span
                      >
                    </p>
                    <p>
                      <span class="user-lvs"><b>荣誉用户</b><i>lv5</i></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              data-title="退出登录"
              @click="loginout()"
              class="login-outs user-tips"
            >
              <a href="javascript:void(0)"
                ><i class="el-icon-caret-left"></i
              ></a>
            </div>
          </div>
          <!-- <div class="top-user-info-box-count">
                <p><span>文章</span> <b>0</b></p>
                <p><span>评论</span> <b>0</b></p>
                <p><span>关注</span> <b>0</b></p>
                <p><span>粉丝</span> <b>0</b></p>
                <a
                  href="https://www.zmki.cn/users/dCACBojqs"
                  target="_blank"
                  class="link-block"
                ></a>
              </div>
              <div class="user-w-gold">
                <div data-title="余额" class="user-money user-tips">
                  <a href="https://www.zmki.cn/gold" target="_blank"
                    ><i>￥</i>0.00</a
                  >
                </div>
                <div data-title="积分" class="user-credit user-tips">
                  <a href="https://www.zmki.cn/gold" target="_blank"
                    ><i class="b2font b2-coin-line"></i>20</a
                  >
                </div>
              </div>
              <div class="user-w-rw b2-radius">
                <div class="user-w-rw-bg" style="width: 0%"></div>
                <a
                  href="https://www.zmki.cn/task"
                  target="_blank"
                  class="link-block"
                  ><span>您已完成今天任务的<b>0%</b></span></a
                >
              </div> -->

          <!-- <ul>
              <li>
                <a href="https://www.zmki.cn/directmessage"
                  ><i class="b2font b2-mail-send-line"></i>
                  <p>
                    私信列表<span class="top-user-link-des">所有往来私信</span>
                  </p></a
                >
              </li>
              <li>
                <a href="https://www.zmki.cn/gold"
                  ><i class="b2font b2-bit-coin-line"></i>
                  <p>
                    财富管理<span class="top-user-link-des"
                      >余额、积分管理</span
                    >
                  </p></a
                >
              </li>
              <li>
                <a href="https://www.zmki.cn/distribution"
                  ><i class="b2font b2-share-line"></i>
                  <p>
                    推广中心<span class="top-user-link-des">推广有奖励</span>
                  </p>
                  <i class="menu-new">NEW</i></a
                >
              </li>
              <li>
                <a href="https://www.zmki.cn/task"
                  ><i class="b2font b2-task-line"></i>
                  <p>任务中心<span class="top-user-link-des">每日任务</span></p>
                  <i class="menu-new">NEW</i></a
                >
              </li>
              <li>
                <a href="https://www.zmki.cn/vips"
                  ><i class="b2font b2-vip-crown-2-line"></i>
                  <p>
                    成为会员<span class="top-user-link-des">购买付费会员</span>
                  </p></a
                >
              </li>
              <li>
                <a href="https://www.zmki.cn/verify"
                  ><i class="b2font b2-shield-user-line"></i>
                  <p>认证服务<span class="top-user-link-des">申请认证</span></p>
                  <i class="menu-new">NEW</i></a
                >
              </li>
              <li>
                <a href="https://www.zmki.cn/dark-room"
                  ><i class="b2font b2-skull-2-line"></i>
                  <p>
                    小黑屋<span class="top-user-link-des">关进小黑屋的人</span>
                  </p>
                  <i class="menu-new">NEW</i></a
                >
              </li>
              <li>
                <a href="https://www.zmki.cn/users/dCACBojqs/orders"
                  ><i class="b2font b2-file-list-2-line"></i>
                  <p>
                    我的订单<span class="top-user-link-des">查看我的订单</span>
                  </p></a
                >
              </li>
              <li>
                <a href="https://www.zmki.cn/users/dCACBojqs/settings"
                  ><i class="b2font b2-user-settings-line"></i>
                  <p>
                    我的设置<span class="top-user-link-des">编辑个人资料</span>
                  </p></a
                >
              </li>
              <li></li>
            </ul>
           -->
          <div slot="reference">
            <router-link to="/userinfo/index">
              <div v-if="!userJudje" class="avatartext">
                <el-avatar :src="user.profile"></el-avatar>
                <span class="spans">{{ user.name }}</span>
              </div>
            </router-link>
          </div>
        </el-popover>
        <a v-if="userJudje" class="actions" style="cursor: pointer">
          <div @click="showlogin()" class="app-header-user" data-v-122eae44="">
            <div class="login-button">
              <span class="logintext">登录/注册</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import { FindarticlesByNum } from '@/api/webarticle'
import { FindresourceByNum } from '@/api/webresource'
import { login } from '@/api/login'
import { register } from '@/api/register'

import { getAllResource, getAllResourceNumber } from '@/api/webresource'
import { getAllArticle, getAllArticleNumber } from '@/api/webarticle'

import { CheckVip } from '@/api/user'

import { mapState, mapMutations } from 'vuex'

export default ({
  name: 'Top',
  props: ['message1', 'message2', 'message3', 'message4', 'message5'],
  setup() {

  },
  computed: {
    ...mapState(['playlist', 'glabledata', 'count'])
  },
  created() {
    this.getUserInfo()
    //检测token是否有效
    this.fullnum()
  },

  methods: {//用户注册
    userRegister() {
      if (this.RegisterForm.username === "") {
        this.$message.error("用户名不能为空！")
        return false
      } else if (this.RegisterForm.password != this.RegisterForm.confirmpassword) {
        this.$message.error("两次密码输入不同，请检查后重新注册！")
        return false
      }
      // else if (this.isShowyan!=false){
      //   this.$message.error("请先验证！")
      //   return false
      // }
      else {
        let user = {};
        user.username = this.RegisterForm.username
        user.password = this.RegisterForm.password
        //  user.auditor = this.regUser.selectValue

        var that = this

        this.loading = true
        register(user).then(resp => {
          if (resp.data.code == 402 || resp.data.code == 400) {
            that.$message({
              message: '用户名已经存在',
              type: 'warning'
            })
            this.loading = false
          } else if (resp.data.code == 200) {
            that.$router.push({ path: '/' }) // 跳到主页
            that.$message({
              message: '注册成功',
              type: 'success'
            })
            this.loading = false
             // 关闭登录框
             that.dialogFormVisible = false
             this.dialogRegisterFormVisible = false
              // 关闭登陆按钮
              that.userJudje = true
            //登陆
            localStorage.setItem('access-admin', JSON.stringify(resp.data))
               //立即获取用户数据
            that.getUserInfo()
          }
        }).catch((e) => { })

      }
    },
    ChangeLogin(){
      this.dialogRegisterFormVisible = false
      this.dialogFormVisible = true
    },
    ChangeRegister(){
      this.dialogRegisterFormVisible = true
      this.dialogFormVisible = false
    },
    fullnum() {
      getAllResourceNumber().then(resp => {
        this.ResourceNumber = resp.data
      })
      getAllArticleNumber().then(resp => {
        this.articleCount = resp.data
      })
    },
    async loginout() {
      //退出登陆
      this.user = null
            //关闭用户头像
            this.userJudje = false
      //清除本地数据
      window.localStorage.removeItem('access-admin')
      console.log(this.userJudje)
      console.log(this.user)
      //跳转刷新
      // this.$router.push('/')
      location. reload()
this.$router.go(0)
      //显示退出成功
      this.$notify({
        title: '成功',
        message: '您已退出登陆',
        type: 'success',
        offset: 50
      });
    },
    getUserInfo() {
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      if(user != null){
      this.user = user.data
      this.userJudje = (user == null)
      //获取会员有效性
      CheckVip(user.data.userid).then(resp => {
        if(resp.data){ 
          this.vipTrue = true
        }
      })
    }
    },
    handleLogin() {
      var that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          login(that.loginForm).then(resp => {
            console.log(resp)
            if (resp.data.code == 402 || resp.data.code == 400) {
              that.$message({
                message: '登陆失败',
                type: 'warning'
              })
            } else if (resp.data.code == 200) {
              console.log(resp.data)
              localStorage.setItem('access-admin', JSON.stringify(resp.data))
              // 关闭登录框
              that.dialogFormVisible = false
              // 关闭登陆按钮
              that.userJudje = false
              //立即获取用户数据
              that.getUserInfo()
              console.log(that.dialogFormVisible)
              this.$notify({
                title: '成功',
                message: '您已成功登陆',
                type: 'success',
                offset: 50
              });
            }
          }).catch((e) => { })
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showlogin() {
      this.dialogFormVisible = true;
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    keyup() {
      this.searchshow = true
      this.search(this.seachcontent)
    },
    Findresource(seachcontents, num) {
      FindresourceByNum(seachcontents, num).then(resp => {
        this.tempdata = resp.data
      })
    },
    Findarticles(seachcontents, num) {
      FindarticlesByNum(seachcontents, num).then(resp => {
        this.tempdata = resp.data
      })
    },
    //临时查询
    search(seachcontents) {
      //限制查询五个数据
      if (!this.judgeNull(this.seachcontent)) {
        if (this.fundByresource) { 
          this.Findresource(seachcontents, 5) }
        else { 
          this.Findarticles(seachcontents, 5) }

      }
    },
    //判空
    judgeNull(str) {
      if (str == "") return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },

    queryssubmit() {
      //提交
      if (this.judgeNull(this.seachcontent)) {
        this.$notify({
          title: '提示',
          message: '输入的数据不能为空',
          type: 'warning'
        });
      } else {
        //   直接调用$router.push 实现携带参数的跳转
        if(this.fundByresource){
          this.$router.push({
          path: `/list/${this.seachcontent}/all`,
        })
        }else{this.$router.push({
          path: `/post/${this.seachcontent}/all`,
        })}
      }
    },
    articleshows() {
      // setTimeout(() => { this.focus() }, 219)
      // this.searchshow = true
      this.codeshow = false
      this.articleshow = true
      this.tempdata = ""
      this.fundByresource = false
      this.Findarticles(this.seachcontent, 5)
      this.howto = '/post/'

    },
    codeshows() {
      // setTimeout(() => { this.focus() }, 219)
      // this.searchshow = true
      this.codeshow = true
      this.articleshow = false
      this.tempdata = ""
      this.fundByresource = true
      this.Findresource(this.seachcontent, 5)
      this.howto = '/list/'
    },
    focus() {
      this.searchshow = true
    },
    blur() {
      // setTimeout(() => { this.searchshow = false }, 300)
      //设置300ms后让下拉框消失
    },
    enter() {
      this.searchshow = true
    },
    leave() {
      setTimeout(() => { this.searchshow = false }, 300)
    }

  },

  data() {
    return {
      vipTrue: false,
      articleCount: "",
      ResourceNumber: "",
      howto: '/list/',
      fundByresource: true,
      user: "",
      userJudje: true,
      loginForm: {
        username: '',
        password: ''
      },
      RegisterForm: {
        username: '',
        password: '',
        confirmpassword: '',
      },
      loginRules: {
        username: [{ required: true, message: '请您输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请您输入密码', trigger: 'blur' }]
      },
      registerRules: {
        username: [{ required: true, message: '请您输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请您输入密码', trigger: 'blur' }],
        confirmpassword: [{ required: true, message: '请您确认密码', trigger: 'blur' }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      dialogFormVisible: false,
      dialogRegisterFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '60px',
      tempdata: "",
      seen: false,
      codeshow: true,
      articleshow: false,
      searchshow: false,
      navlinks: "nav-link active",
      seachcontent: ''
    }
  },
})
</script>

<style scoped>
@import "../../static/mycss/margin_top.css";

.navbar .navbar-button,
.off-canvas .canvas-close {
  background: linear-gradient(125deg, #18cef2 0%, #448aff 100%);
  transition: transform 0.1s;
  box-shadow: 4px 3px 10px #2f6bd024;
  color: #fff;
}
.actions .login-btn {
  position: relative;
}
.navbar .login-btn {
  border-radius: 25px;
  width: 90px;
}
.login-button {
  height: 30px;
  width: 100px;
  color: #fff;
  background: linear-gradient(125deg, #18cef2 0%, #448aff 100%);
  line-height: 50px;
  transition: transform 0.1s;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 4px 3px 10px #2f6bd024;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 50px 50px 50px 50px;
}
.logintext {
  font-size: 15px;
  text-align: center;
  line-height: 90px;
  /* transform:translateY(-50%);
  transform:translateX(30px);  */
}
.login-title {
  image-rendering: -webkit-optimize-contrast;
  --bs-blue: #0d6efd;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #198754;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
  --bs-success: #198754;
  --bs-info: #0dcaf0;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
  --bs-light: #f8f9fa;
  --bs-dark: #212529;
  --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  --bs-gradient: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
  --web-color: #0a36fa;
  --web-light-color: rgba(10, 54, 250, 0.2);
  --border-radius: 4px;
  --wp--preset--font-size--normal: 16px;
  --wp--preset--font-size--huge: 42px;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  line-height: 1.4;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga" on;
  -webkit-font-smoothing: subpixel-antialiased;
  --wp--preset--color--black: #000000;
  --wp--preset--color--cyan-bluish-gray: #abb8c3;
  --wp--preset--color--white: #ffffff;
  --wp--preset--color--pale-pink: #f78da7;
  --wp--preset--color--vivid-red: #cf2e2e;
  --wp--preset--color--luminous-vivid-orange: #ff6900;
  --wp--preset--color--luminous-vivid-amber: #fcb900;
  --wp--preset--color--light-green-cyan: #7bdcb5;
  --wp--preset--color--vivid-green-cyan: #00d084;
  --wp--preset--color--pale-cyan-blue: #8ed1fc;
  --wp--preset--color--vivid-cyan-blue: #0693e3;
  --wp--preset--color--vivid-purple: #9b51e0;
  --wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(
    135deg,
    rgba(6, 147, 227, 1) 0%,
    rgb(155, 81, 224) 100%
  );
  --wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(
    135deg,
    rgb(122, 220, 180) 0%,
    rgb(0, 208, 130) 100%
  );
  --wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(
    135deg,
    rgba(252, 185, 0, 1) 0%,
    rgba(255, 105, 0, 1) 100%
  );
  --wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(
    135deg,
    rgba(255, 105, 0, 1) 0%,
    rgb(207, 46, 46) 100%
  );
  --wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(
    135deg,
    rgb(238, 238, 238) 0%,
    rgb(169, 184, 195) 100%
  );
  --wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(
    135deg,
    rgb(74, 234, 220) 0%,
    rgb(151, 120, 209) 20%,
    rgb(207, 42, 186) 40%,
    rgb(238, 44, 130) 60%,
    rgb(251, 105, 98) 80%,
    rgb(254, 248, 76) 100%
  );
  --wp--preset--gradient--blush-light-purple: linear-gradient(
    135deg,
    rgb(255, 206, 236) 0%,
    rgb(152, 150, 240) 100%
  );
  --wp--preset--gradient--blush-bordeaux: linear-gradient(
    135deg,
    rgb(254, 205, 165) 0%,
    rgb(254, 45, 45) 50%,
    rgb(107, 0, 62) 100%
  );
  --wp--preset--gradient--luminous-dusk: linear-gradient(
    135deg,
    rgb(255, 203, 112) 0%,
    rgb(199, 81, 192) 50%,
    rgb(65, 88, 208) 100%
  );
  --wp--preset--gradient--pale-ocean: linear-gradient(
    135deg,
    rgb(255, 245, 203) 0%,
    rgb(182, 227, 212) 50%,
    rgb(51, 167, 181) 100%
  );
  --wp--preset--gradient--electric-grass: linear-gradient(
    135deg,
    rgb(202, 248, 128) 0%,
    rgb(113, 206, 126) 100%
  );
  --wp--preset--gradient--midnight: linear-gradient(
    135deg,
    rgb(2, 3, 129) 0%,
    rgb(40, 116, 252) 100%
  );
  --wp--preset--duotone--dark-grayscale: url("#wp-duotone-dark-grayscale");
  --wp--preset--duotone--grayscale: url("#wp-duotone-grayscale");
  --wp--preset--duotone--purple-yellow: url("#wp-duotone-purple-yellow");
  --wp--preset--duotone--blue-red: url("#wp-duotone-blue-red");
  --wp--preset--duotone--midnight: url("#wp-duotone-midnight");
  --wp--preset--duotone--magenta-yellow: url("#wp-duotone-magenta-yellow");
  --wp--preset--duotone--purple-green: url("#wp-duotone-purple-green");
  --wp--preset--duotone--blue-orange: url("#wp-duotone-blue-orange");
  --wp--preset--font-size--small: 13px;
  --wp--preset--font-size--medium: 20px;
  --wp--preset--font-size--large: 36px;
  --wp--preset--font-size--x-large: 42px;
  visibility: visible;
  pointer-events: auto;
  -webkit-user-select: text !important;
  border: 0;
  font-family: inherit;
  font-style: inherit;
  font-weight: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  word-wrap: break-word;
  box-sizing: border-box;
  color: #b2bac2;
  font-size: 13px;
  margin-bottom: 20px;
  text-align: center;
}
.login-logo {
  image-rendering: -webkit-optimize-contrast;
  --bs-blue: #0d6efd;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #198754;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
  --bs-success: #198754;
  --bs-info: #0dcaf0;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
  --bs-light: #f8f9fa;
  --bs-dark: #212529;
  --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  --bs-gradient: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
  --web-color: #0a36fa;
  --web-light-color: rgba(10, 54, 250, 0.2);
  --border-radius: 4px;
  --wp--preset--font-size--normal: 16px;
  --wp--preset--font-size--huge: 42px;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  color: #121212;
  line-height: 1.4;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga" on;
  -webkit-font-smoothing: subpixel-antialiased;
  --wp--preset--color--black: #000000;
  --wp--preset--color--cyan-bluish-gray: #abb8c3;
  --wp--preset--color--white: #ffffff;
  --wp--preset--color--pale-pink: #f78da7;
  --wp--preset--color--vivid-red: #cf2e2e;
  --wp--preset--color--luminous-vivid-orange: #ff6900;
  --wp--preset--color--luminous-vivid-amber: #fcb900;
  --wp--preset--color--light-green-cyan: #7bdcb5;
  --wp--preset--color--vivid-green-cyan: #00d084;
  --wp--preset--color--pale-cyan-blue: #8ed1fc;
  --wp--preset--color--vivid-cyan-blue: #0693e3;
  --wp--preset--color--vivid-purple: #9b51e0;
  --wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(
    135deg,
    rgba(6, 147, 227, 1) 0%,
    rgb(155, 81, 224) 100%
  );
  --wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(
    135deg,
    rgb(122, 220, 180) 0%,
    rgb(0, 208, 130) 100%
  );
  --wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(
    135deg,
    rgba(252, 185, 0, 1) 0%,
    rgba(255, 105, 0, 1) 100%
  );
  --wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(
    135deg,
    rgba(255, 105, 0, 1) 0%,
    rgb(207, 46, 46) 100%
  );
  --wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(
    135deg,
    rgb(238, 238, 238) 0%,
    rgb(169, 184, 195) 100%
  );
  --wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(
    135deg,
    rgb(74, 234, 220) 0%,
    rgb(151, 120, 209) 20%,
    rgb(207, 42, 186) 40%,
    rgb(238, 44, 130) 60%,
    rgb(251, 105, 98) 80%,
    rgb(254, 248, 76) 100%
  );
  --wp--preset--gradient--blush-light-purple: linear-gradient(
    135deg,
    rgb(255, 206, 236) 0%,
    rgb(152, 150, 240) 100%
  );
  --wp--preset--gradient--blush-bordeaux: linear-gradient(
    135deg,
    rgb(254, 205, 165) 0%,
    rgb(254, 45, 45) 50%,
    rgb(107, 0, 62) 100%
  );
  --wp--preset--gradient--luminous-dusk: linear-gradient(
    135deg,
    rgb(255, 203, 112) 0%,
    rgb(199, 81, 192) 50%,
    rgb(65, 88, 208) 100%
  );
  --wp--preset--gradient--pale-ocean: linear-gradient(
    135deg,
    rgb(255, 245, 203) 0%,
    rgb(182, 227, 212) 50%,
    rgb(51, 167, 181) 100%
  );
  --wp--preset--gradient--electric-grass: linear-gradient(
    135deg,
    rgb(202, 248, 128) 0%,
    rgb(113, 206, 126) 100%
  );
  --wp--preset--gradient--midnight: linear-gradient(
    135deg,
    rgb(2, 3, 129) 0%,
    rgb(40, 116, 252) 100%
  );
  --wp--preset--duotone--dark-grayscale: url("#wp-duotone-dark-grayscale");
  --wp--preset--duotone--grayscale: url("#wp-duotone-grayscale");
  --wp--preset--duotone--purple-yellow: url("#wp-duotone-purple-yellow");
  --wp--preset--duotone--blue-red: url("#wp-duotone-blue-red");
  --wp--preset--duotone--midnight: url("#wp-duotone-midnight");
  --wp--preset--duotone--magenta-yellow: url("#wp-duotone-magenta-yellow");
  --wp--preset--duotone--purple-green: url("#wp-duotone-purple-green");
  --wp--preset--duotone--blue-orange: url("#wp-duotone-blue-orange");
  --wp--preset--font-size--small: 13px;
  --wp--preset--font-size--medium: 20px;
  --wp--preset--font-size--large: 36px;
  --wp--preset--font-size--x-large: 42px;
  visibility: visible;
  pointer-events: auto;
  -webkit-user-select: text !important;
  border: 0;
  font-family: inherit;
  font-style: inherit;
  font-weight: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  vertical-align: baseline;
  word-wrap: break-word;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 27px;
}
.box {
  /* image-rendering: -webkit-optimize-contrast;
  --bs-blue: #0d6efd;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #198754;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
  --bs-success: #198754;
  --bs-info: #0dcaf0;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
  --bs-light: #f8f9fa;
  --bs-dark: #212529;
  --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  --bs-gradient: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
  --web-color: #0a36fa;
  --web-light-color: rgba(10, 54, 250, 0.2);
  --border-radius: 4px;
  --wp--preset--font-size--normal: 16px;
  --wp--preset--font-size--huge: 42px;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  color: #121212;
  line-height: 1.4;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga" on;
  -webkit-font-smoothing: subpixel-antialiased;
  --wp--preset--color--black: #000000;
  --wp--preset--color--cyan-bluish-gray: #abb8c3;
  --wp--preset--color--white: #ffffff;
  --wp--preset--color--pale-pink: #f78da7;
  --wp--preset--color--vivid-red: #cf2e2e;
  --wp--preset--color--luminous-vivid-orange: #ff6900;
  --wp--preset--color--luminous-vivid-amber: #fcb900;
  --wp--preset--color--light-green-cyan: #7bdcb5;
  --wp--preset--color--vivid-green-cyan: #00d084;
  --wp--preset--color--pale-cyan-blue: #8ed1fc;
  --wp--preset--color--vivid-cyan-blue: #0693e3;
  --wp--preset--color--vivid-purple: #9b51e0;
  --wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(
    135deg,
    rgba(6, 147, 227, 1) 0%,
    rgb(155, 81, 224) 100%
  );
  --wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(
    135deg,
    rgb(122, 220, 180) 0%,
    rgb(0, 208, 130) 100%
  );
  --wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(
    135deg,
    rgba(252, 185, 0, 1) 0%,
    rgba(255, 105, 0, 1) 100%
  );
  --wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(
    135deg,
    rgba(255, 105, 0, 1) 0%,
    rgb(207, 46, 46) 100%
  );
  --wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(
    135deg,
    rgb(238, 238, 238) 0%,
    rgb(169, 184, 195) 100%
  );
  --wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(
    135deg,
    rgb(74, 234, 220) 0%,
    rgb(151, 120, 209) 20%,
    rgb(207, 42, 186) 40%,
    rgb(238, 44, 130) 60%,
    rgb(251, 105, 98) 80%,
    rgb(254, 248, 76) 100%
  );
  --wp--preset--gradient--blush-light-purple: linear-gradient(
    135deg,
    rgb(255, 206, 236) 0%,
    rgb(152, 150, 240) 100%
  );
  --wp--preset--gradient--blush-bordeaux: linear-gradient(
    135deg,
    rgb(254, 205, 165) 0%,
    rgb(254, 45, 45) 50%,
    rgb(107, 0, 62) 100%
  );
  --wp--preset--gradient--luminous-dusk: linear-gradient(
    135deg,
    rgb(255, 203, 112) 0%,
    rgb(199, 81, 192) 50%,
    rgb(65, 88, 208) 100%
  );
  --wp--preset--gradient--pale-ocean: linear-gradient(
    135deg,
    rgb(255, 245, 203) 0%,
    rgb(182, 227, 212) 50%,
    rgb(51, 167, 181) 100%
  );
  --wp--preset--gradient--electric-grass: linear-gradient(
    135deg,
    rgb(202, 248, 128) 0%,
    rgb(113, 206, 126) 100%
  );
  --wp--preset--gradient--midnight: linear-gradient(
    135deg,
    rgb(2, 3, 129) 0%,
    rgb(40, 116, 252) 100%
  );
  --wp--preset--duotone--dark-grayscale: url("#wp-duotone-dark-grayscale");
  --wp--preset--duotone--grayscale: url("#wp-duotone-grayscale");
  --wp--preset--duotone--purple-yellow: url("#wp-duotone-purple-yellow");
  --wp--preset--duotone--blue-red: url("#wp-duotone-blue-red");
  --wp--preset--duotone--midnight: url("#wp-duotone-midnight");
  --wp--preset--duotone--magenta-yellow: url("#wp-duotone-magenta-yellow");
  --wp--preset--duotone--purple-green: url("#wp-duotone-purple-green");
  --wp--preset--duotone--blue-orange: url("#wp-duotone-blue-orange");
  --wp--preset--font-size--small: 13px;
  --wp--preset--font-size--medium: 20px;
  --wp--preset--font-size--large: 36px;
  --wp--preset--font-size--x-large: 42px;
  visibility: visible;
  pointer-events: auto;
  -webkit-user-select: text !important;
  border: 0;
  font-family: inherit;
  font-size: 100%;
  font-style: inherit;
  font-weight: inherit;
  margin: 0;
  outline: 0;
  vertical-align: baseline;
  word-wrap: break-word;
  box-sizing: border-box;
  box-shadow: 0px 0px 2px rgb(98 124 153 / 10%);
  position: relative;
  padding: 30px 24px 24px;
  background-repeat: no-repeat;
  background: none; */
}
.footer {
  display: flex;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", helvetica neue, helvetica, ubuntu,
    roboto, noto, segoe ui, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  --sspaiRed: #d71a1b;
  --yellow: #ffbe16;
  --B0: #fff;
  --B10: #fbfbfb;
  --B20: #f7f7f8;
  --B30: #efefef;
  --B40: #e5e5e5;
  --B60: #8e8787;
  --B80: #655e5e;
  --B100: #292525;
  --text: #4c4e4d;
  --green: #3fd67e;
  --red: #fd281a;
  --pink: #ff2c78;
  --white: #f4f4f4;
  --sspai-red: #d71a1b;
  --blue: #44b9fb;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  word-break: break-all;
  outline: none !important;
  -webkit-user-select: text !important;
  -webkit-tap-highlight-color: transparent;
  color: #8e8787;
  align-content: center;
  align-items: stretch;
  flex-direction: column;
  flex-wrap: wrap;
}
.line {
  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", helvetica neue, helvetica, ubuntu,
    roboto, noto, segoe ui, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  --sspaiRed: #d71a1b;
  --yellow: #ffbe16;
  --B0: #fff;
  --B10: #fbfbfb;
  --B20: #f7f7f8;
  --B30: #efefef;
  --B40: #e5e5e5;
  --B60: #8e8787;
  --B80: #655e5e;
  --B100: #292525;
  --text: #4c4e4d;
  --green: #3fd67e;
  --red: #fd281a;
  --pink: #ff2c78;
  --white: #f4f4f4;
  --sspai-red: #d71a1b;
  --blue: #44b9fb;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  word-break: break-all;
  color: #292525;
  outline: none !important;
  -webkit-user-select: text !important;
  -webkit-tap-highlight-color: transparent;
  width: calc(100% - 40px);
  margin: 0 auto;
  height: 1px;
  background: #e5e5e5;
  margin-top: 20px;
  margin-bottom: 20px;
}
.ss-login_statement {
  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", helvetica neue, helvetica, ubuntu,
    roboto, noto, segoe ui, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  --sspaiRed: #d71a1b;
  --yellow: #ffbe16;
  --B0: #fff;
  --B10: #fbfbfb;
  --B20: #f7f7f8;
  --B30: #efefef;
  --B40: #e5e5e5;
  --B60: #8e8787;
  --B80: #655e5e;
  --B100: #292525;
  --text: #4c4e4d;
  --green: #3fd67e;
  --red: #fd281a;
  --pink: #ff2c78;
  --white: #f4f4f4;
  --sspai-red: #d71a1b;
  --blue: #44b9fb;
  -webkit-text-size-adjust: 100%;
  word-break: break-all;
  outline: none !important;
  -webkit-user-select: text !important;
  -webkit-tap-highlight-color: transparent;
  margin: 12px auto;
  font-size: 12px;
  padding: 0 20px;
  color: var(--B80);
}
.ss-login_statement a {
  padding: 0 0.5em;
  font-weight: 600;
  color: var(--red);
}
</style>
<style lang="scss" scoped>
.dialogdeep {
  ::v-deep .el-dialog--center {
    border-radius: 18px;
  }
}
.avatartext {
  display: flex;
}
.spans {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  margin-left: 5px;
  font-weight: bold;
}
.qqloginsvg {
  display: flex;
  width: 31px;
}
</style>
<style >
.el-dialog--center {
  border-radius: 10px;
}
.other-login {
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>