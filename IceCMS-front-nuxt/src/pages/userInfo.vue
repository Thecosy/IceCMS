<template>
  <div class="home">
    <div id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message1="acticve" />
          <div>
            <section class="layout-index pc-model mt-5">
              <!-- class="banner-index mb-6" -->

              <div id="content" class="site-content">
                <div id="author" class="author wrapper">
                  <div class="box b2-radius author-header">
                   <!-- <div class="mask-wrapper" v-bind:style="{ backgroundImage: 'url(' + image + ')' }">-->
                      <div class="mask-wrapper">
                      <img src="https://i.328888.xyz/2023/05/05/iTmBvE.jpeg">
                      <!--<div class="user-cover-button">
                        <label class="empty button" for="cover-input"><i
                            class="b2font b2-image-fill"></i><span>上传封面图片</span></label>
                        <input id="cover-input" type="file" class="b2-hidden-always" ref="fileInput"
                          accept="image/jpg,image/jpeg,image/png,image/gif" />
                      </div>-->
                    </div>
                    <div class="user-panel">
                      <div class="avatar">
                        <el-avatar shape="square" :size="150" :src="user.profile"></el-avatar>
                        <label class="editor-avatar" for="avatar-input"><i
                            class="b2font b2-image-fill"></i><span>修改我的头像</span></label>
                        <input id="avatar-input" type="file" class="b2-hidden-always" ref="fileInput"
                          accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadFile" />
                      </div>
                      <div class="user-panel-info">
                        <div class="">
                          <h1>
                            <span id="userDisplayName" class="usertopName">{{
                              user.name
                            }}</span><span class="user-page-lv"><span class="lv-icon user-lv b2-lv0"><b>Lv0
                                  新手上路</b><i>lv0</i></span></span>
                          </h1>
                          <p>{{user.intro}}</p>
                        </div>
                        <div class="user-panel-editor-button">
                          <div class="user-follow">
                            <!-- <el-button type="primary" round>关注Ta</el-button>
                                <el-button type="primary" round>取消关注</el-button>
                                  <el-button  round>发私信</el-button> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="author-table mg-t">
                    <div class="author-page-right">
                      <div class="author-page-right-in box b2-radius">
                      <router-link to="/userinfo/index">
                          <div @click="ChanceGai()" class="user-sidebar">
                            <div :class="acticveChanceGai">
                              <a class="link-block"></a>
                              <p>
                                <i class="
                                      b2font
                                      b2-user-heart-line b2-light b2-color
                                    "></i>概览
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </div>
                        </router-link>
                        <router-link to="/userinfo/post">
                        <div @click="ChanceFa()" class="user-sidebar">
                              <div :class="acticveChanceFa">
                              <a class="link-block"></a>
                              <p>
                                <i class="
                                      b2font
                                      b2-quill-pen-line b2-light b2-color
                                    "></i>作品查看
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>

                        </div>
                      </router-link>

                        <div @click="ChanceHui()">
                          <router-link to="/userinfo/follow">
                            <div :class="acticveChanceHui">
                              <a class="link-block"></a>
                              <p>
                                <i class="
                                      b2font
                                      b2-hand-heart-line b2-light b2-color
                                    "></i>关注列表
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>
                        <!--订单-->
                        <div @click="ChanceDing()">
                          <router-link to="/userinfo/payInfo">
                            <div :class="acticveChanceDing">
                              <a class="link-block"></a>
                              <p>
                                <i
                                  class="
                                    b2font
                                    b2-file-list-2-line b2-light b2-color
                                  "
                                ></i
                                >订单
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>
                        <!--订单-->
                       <!-- <div @click="ChanceDing()">
                          <router-link to="/userinfo/payInfo">
                            <div :class="acticveChanceDing">
                              <a class="link-block"></a>
                              <p>
                                <i
                                  class="
                                    b2font
                                    b2-file-list-2-line b2-light b2-color
                                  "
                                ></i
                                >购物车
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>-->
                        <!--会员中心-->
                        <div @click="ChanceYuan()">
                          <router-link to="/userinfo/vip">
                            <div :class="acticveChanceYuan">
                              <a class="link-block"></a>
                              <p>
                                <i
                                  class="
                                    b2font
                                    b2-hands-heart-line b2-light b2-color
                                  "
                                ></i
                                >会员中心
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>



                        <div @click="ChanceChong()" class="user-sidebar">
                          <router-link to="/userinfo/charge">
                            <div :class="acticveChanceChong">
                              <a class="link-block"></a>
                              <p>
                                <i class="
                                      b2font
                                      b2-heart-add-line b2-light b2-color
                                    "></i>充值中心
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>
                        <div @click="hanceXiu()" class="user-sidebar">
                          <router-link to="/userinfo/changePw">
                            <div :class="acticveChanceXiu">
                              <a class="link-block"></a>
                              <p>
                                <i class="
                                      b2font
                                      b2-hearts-line b2-light b2-color
                                    "></i>修改密码
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>
                        <div @click="hanceSi()" class="user-sidebar">
                          <router-link to="/userinfo/chat/1">
                            <div :class="acticveChanceSi">
                              <a class="link-block"></a>
                              <p>
                                <i class="
                                      b2font
                                      b2-hearts-line b2-light b2-color
                                    "></i>私信
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>
                        <div @click="ChanceShou()" class="user-sidebar">
                          <router-link to="/userinfo/star">
                            <div :class="acticveChanceShou">
                              <a class="link-block"></a>
                              <p>
                                <i class="b2font b2-star-line b2-light b2-color"></i>发布作品
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>
                        <!--<router-link to="/userinfo/index">
                          <div @click="ChanceGai()" class="user-sidebar">
                            <div :class="acticveChanceGai">
                              <a class="link-block"></a>
                              <p>
                                <i class="
                                      b2font
                                      b2-user-heart-line b2-light b2-color
                                    "></i>修改个人信息
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </div>
                        </router-link>-->
                        <!-- <div class="user-sidebar h0">
                          <div class="user-sidebar-info">
                            <a class="link-block"></a>
                            <p>
                              <i
                                class="
                                  b2font
                                  b2-settings-3-line b2-light b2-color
                                "
                              ></i
                              >设置
                            </p>
                            <div class="author-sidebar-down">
                              <i class="b2font b2-arrow-right-s-line"></i>
                            </div>
                          </div>
                        </div> -->
                      </div>
                    </div>
                    <!--路由占位符-->

                    <router-view class="author-page-left"></router-view>
                  </div>
                </div>
              </div>
            </section>
            <div class="mobile-model">
              <div class="
                    d-flex
                    layout-min-full-height
                    justify-content-center
                    align-items-center
                  ">
                <div class="text-center" style="width: 80%; margin: 0px auto">
                  <h1 class="mb-4">哇，窗口太小啦</h1>
                  <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
                </div>
              </div>
            </div>
          </div>
          <foot />
          <div infos="0">
            <div class="
                  adBanner
                  pub_300x250 pub_300x250m pub_728x90
                  text-ad
                  textAd
                  text_ad text_ads text-ads text-ad-links
                "></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getNewResource } from '@/api/webresource'
// import { formatDate } from '@/utils/date.js'

import top from './components/Top.vue'
import foot from './components/Foots.vue'
import { addwatermarkimageUpload, updateImage } from '@/api/updateImage'
import {  ChangeUser } from '@/api/webuser'


export default ({
  name: 'Home',
  components: { top, foot },
  data() {
    return {
      form: {
        userId: '',
        profile: '',
      },
      acticveChanceGai: "user-sidebar-info active",
      acticveChanceFa: "user-sidebar-info",
      acticveChanceHui: "user-sidebar-info",
      acticveChanceDing: "user-sidebar-info",
      acticveChanceYuan: "user-sidebar-info",
      acticveChanceChong: "user-sidebar-info",
      acticveChanceXiu: "user-sidebar-info",
      acticveChanceSi: "user-sidebar-info",
      acticveChanceShou: "user-sidebar-info",
      image: "",
      acticve: 'nav-link active',
      user: "",
    }
  },
  created() {
    if (this.image == "") {
      this.image = "data:image/jpeg;base64,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"
    }
    this.getUserInfo()
    this.ChanceGai()

  },
  props: {

  },
  methods: {
    async uploadFile() {
      const file = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('editormd-image-file', file)


      // var form = new FormData();
      // form.append('editormd-image-file', file.file, file.file.name)
      try {

        updateImage(formData).then(resp => {
          this.$message({
            message: '上传成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.percentage = 100
          this.theprogress = false
          var imgUrl = resp.data.url;//根据返回值得不同这里要自己定义
          this.user.profile = imgUrl
          console.log(imgUrl)

          const user = this.$cookies.get('access-user')
          console.log("1123",user)
          this.form.userId = user.userid
          this.form.name = user.name
          this.form.profile = imgUrl
          console.log(this.form)
          ChangeUser(this.form).then(resp => {
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
              const user = this.$cookies.get('access-user')
              user.profile = imgUrl
              this.$cookies.set('access-user', user, 60 * 60 * 24 * 7)
              this.user = user
            }
          })

        }).catch((e) => {
          this.$message.error('抱歉,上传失败,请检查网络环境或图片大小');
          this.theprogress = false
          console.log("上传失败")
        })
        // const response = await axios.post('/api/upload', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // })
      } catch (e) {
        console.error(e)
      }
    },
    hanceSi() {
      this.acticveChanceGai = "user-sidebar-info"
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceYuan = "user-sidebar-info"
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceSi = "user-sidebar-info active"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceGai() {
      this.acticveChanceGai = "user-sidebar-info active"
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceYuan = "user-sidebar-info "
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceSi = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceFa() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info active"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceYuan = "user-sidebar-info "
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceSi = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceDing() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info active"
      this.acticveChanceYuan = "user-sidebar-info "
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceSi = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceYuan() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceYuan = "user-sidebar-info active"
      this.acticveChanceHui = "user-sidebar-info "
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceSi = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceHui() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceYuan = "user-sidebar-info "
      this.acticveChanceHui = "user-sidebar-info active"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceSi = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceChong() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceYuan = "user-sidebar-info "
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info active"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceSi = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    hanceXiu() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceYuan = "user-sidebar-info "
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info active"
      this.acticveChanceSi = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceShou() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceYuan = "user-sidebar-info "
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceSi = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info active"
    },
    getUserInfo() {
      const user = this.$cookies.get('access-user')
      this.user = user
    },
    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd hh:mm ')
    },
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../static/mycss/user_info.css";

@font-face {
  font-family: "OPPOSans2";
  src: url("https://cdn.jsdelivr.net/gh/liruchun/b2procdn/OPPOSans-Regular.woff");
}

body,
button,
select,
input,
textarea {
  font-family: OPPOSans2, -apple-system, BlinkMacSystemFont, Helvetica Neue,
    PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC,
    WenQuanYi Micro Hei, sans-serif;
}

.wrapper {
  width: 1300px;
  max-width: 100%;
  margin: 0 auto;
}

:root {
  --web-color: #51a1ff;
  --web-light-color: rgba(42, 189, 128, 0.2);
  --border-radius: 10px;
}

.news-item-date {
  border: 1px solid #51a1ff;
}

.author .news-item-date {
  border: 0;
}

.news-item-date p span:last-child {
  background: #51a1ff;
}

.widget-newsflashes-box ul::before {
  border-left: 1px dashed rgba(42, 189, 128, 0.2);
}

.widget-new-content::before {
  background: #51a1ff;
}

.modal-content {
  background-image: url(https://www.zmki.cn/wp-content/themes/b2/Assets/fontend/images/model-bg.png);
}

.d-weight button.picked.text,
.d-replay button.picked i,
.comment-type button.picked i {
  color: #51a1ff;
}

.d-replay button.text:hover i {
  color: #51a1ff;
}

.mybutton {
  background: #51a1ff;
  border: 1px solid #51a1ff;
  border-radius: 10px;
}

.b2-menu-4 ul ul li a img {
  border-radius: 10px;
}

input,
textarea {
  border-radius: 10px;
}

.post-carts-list-row .flickity-button {
  border-radius: 10px;
}

button.b2-loading:after {
  border-radius: 10px;
}

.bar-middle .bar-normal,
.bar-footer,
.bar-top,
.gdd-quick-link-buy-vip {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.entry-content a.button.empty,
.entry-content a.button.text {
  color: #51a1ff;
}

.coll-3-top img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.coll-3-bottom li:first-child img {
  border-bottom-left-radius: 10px;
}

.coll-3-bottom li:last-child img {
  border-bottom-right-radius: 10px;
}

.slider-info::after {
  border-radius: 10px;
}

.circle-info {
  border-radius: 10px 10px 0 0;
}

.b2-bg {
  background-color: #51a1ff;
}

.gdd-quick-link-buy-vip__hover-block,
.gdd-quick-link-buy-vip__popover--btn,
.gdd-quick-link-buy-vip,
.gdd-quick-link-buy-vip__popover {
  background-color: #51a1ff;
}

.b2-page-bg::before {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, #f3f5f7 100%);
}

.site {
  background-color: #f3f5f7;
}

.site {
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center top;
}

.b2-radius {
  border-radius: 10px;
}

.ads-box img {
  border-radius: 10px;
}

.post-style-4-top,
.post-style-2-top-header,
.tax-header .wrapper.box {
  border-radius: 10px 10px 0 0;
}

.entry-content blockquote,
.content-excerpt {
  border-radius: 10px;
}

.user-sidebar-info.active {
  border-radius: 10px;
}

.dmsg-header a {
  color: #51a1ff;
}

.user-edit-button {
  color: #51a1ff;
}

.b2-color {
  color: #51a1ff !important;
}

.b2-light,
.newsflashes-nav-in ul li.current-menu-item a {
  background-color: #40a0ffaf;
}

.b2-light-dark {
  background-color: rgba(42, 189, 128, 0.52);
}

.b2-light-bg {
  background-color: rgba(42, 189, 128, 0.12);
}

.b2-menu-1 .sub-menu-0 li a {
  background-color: rgba(42, 189, 128, 0.08);
}

.b2-menu-1 .sub-menu-0 li:hover a {
  background-color: rgba(42, 189, 128, 0.6);
  color: #fff;
}

.topic-footer-left button.picked,
.single .post-list-cat a,
.saf-z button.picked,
.news-vote-up .isset,
.news-vote-down .isset,
.w-d-list.gujia button,
.w-d-download span button {
  background-color: rgba(42, 189, 128, 0.1);
  color: #51a1ff !important;
}

.po-topic-tools-right .button-sm {
  color: #51a1ff;
}

.author-links .picked a,
.collections-menu .current {
  background-color: #51a1ff;
  color: #fff;
}

.b2-widget-hot-circle .b2-widget-title button.picked:before {
  border-color: transparent transparent #51a1ff !important;
}

.login-form-item input {
  border-radius: 10px;
}

.topic-child-list ul {
  border-radius: 10px;
}

.b2-loading path {
  fill: #51a1ff;
}

.header-search-tpye a.picked {
  border-color: #51a1ff;
}

button.empty,
.button.empty,
li.current-menu-item>a,
.top-menu-hide:hover .more,
.header .top-menu ul li.depth-0:hover>a .b2-jt-block-down,
button.text {
  color: #51a1ff;
}

input,
textarea {
  caret-color: #51a1ff;
}

.login-form-item input:focus {
  border-color: #51a1ff;
}

.login-form-item input:focus+span {
  color: #51a1ff;
}

.mobile-footer-center i {
  background: #51a1ff;
}

.login-box-content a {
  color: #51a1ff;
}

.verify-number.picked span {
  background: #51a1ff;
}

.verify-header::after {
  color: #51a1ff;
}

.top-user-box-drop li a i {
  color: #51a1ff;
}

#bigTriangleColor path {
  fill: #f3f5f7;
  stroke: #f3f5f7;
}

.post-list-cats a:hover {
  color: #51a1ff;
}

trix-toolbar .trix-button.trix-active {
  color: #51a1ff;
}

.picked.post-load-button:after {
  border-color: #51a1ff transparent transparent transparent;
}

.task-day-list li i {
  color: #51a1ff;
}

.task-day-list li .task-finish-icon i {
  background: #51a1ff;
}

.bar-item-desc {
  background: #51a1ff;
}

.bar-user-info-row-title>a span:first-child::before {
  background: #51a1ff;
}

.bar-item.active i {
  color: #51a1ff;
}

.bar-user-info .bar-mission-action {
  color: #51a1ff;
}

.gold-table.picked:after {
  border-color: #51a1ff;
}

.gold-table.picked {
  color: #51a1ff;
}

.user-sidebar-info p i {
  color: #51a1ff;
}

.user-sidebar-info.active p {
  color: #51a1ff;
}

.picked.post-load-button span {
  color: #ffffff;
  background-color: rgba(42, 189, 128, 1) !important;
}

.post-3 .post-list-cats a:hover span,
.post-4 .post-list-cats a:hover span,
.post-5 .post-list-cats a:hover span,
.post-6 .post-list-cats a:hover span,
.post-list-cats a:hover span {
  color: #51a1ff;
  background-color: #ffffff;
}

.post-carts-list-row .next svg,
.post-carts-list-row .previous svg {
  color: #51a1ff;
}

.picked.post-load-button:before {
  background-color: #51a1ff;
}

.aside-carts-price-left span {
  color: #51a1ff;
}

.top-user-avatar img,
.header-user .top-user-box,
.social-top .top-user-avatar img {
  border-radius: 10px;
}

@media screen and (max-width: 768px) {
  .aside-bar .bar-item:hover i {
    color: #51a1ff;
  }

  .post-video-list li.picked .post-video-list-link {
    color: #51a1ff;
    border-color: #51a1ff;
  }

  .post-style-2-top-header {
    border-bottom: 8px solid #f3f5f7;
  }

  .po-form-box {
    border-radius: 10px;
  }

  .circle-desc {
    border-radius: 0 0 10px 10px;
  }
}

.circle-admin-info>div:hover {
  border-color: #51a1ff;
}

.circle-admin-info>div:hover span,
.circle-admin-info>div:hover i {
  color: #51a1ff;
  opacity: 1;
}

.bar-top {
  background: #51a1ff;
}

.bar-item.bar-qrcode:hover i {
  color: #51a1ff;
}

.b2-color-bg {
  background-color: #51a1ff;
}

.b2-color {
  color: #51a1ff;
}

.b2-hover a {
  color: #51a1ff;
}

.b2-hover a:hover {
  text-decoration: underline;
}

.filter-items a.current,
.single-newsflashes .single-tags span {
  color: #51a1ff;
  background-color: rgba(13, 98, 194, 0.123);
}

.circle-vote {
  background: rgba(13, 98, 194, 0.123);
}

.user-sidebar-info.active {
  background: rgba(13, 98, 194, 0.123);
}

.user-w-qd-list-title {
  background-color: #51a1ff;
}

#video-list ul li>div:hover {
  background-color: rgba(13, 98, 194, 0.123);
}

.post-5 .post-info h2::before {
  background-color: #51a1ff;
}

.tox .tox-tbtn--enabled svg {
  fill: #51a1ff !important;
}

.entry-content a,
.entry-content .content-show-roles>p a,
.entry-content>ul li a,
.content-show-roles>li a,
.entry-content>ol li a {
  color: #51a1ff;
}

.entry-content .file-down-box a:hover {
  color: #51a1ff;
  border: 1px solid #51a1ff;
}

.entry-content h2::before {
  color: #51a1ff;
}

.header-banner-left .menu li.current-menu-item a:after {
  background: #51a1ff;
}

.user-w-announcement li a::before {
  background-color: #51a1ff;
}

.topic-footer-right button {
  color: #51a1ff;
}

.content-user-money span {
  color: #51a1ff;
  background: rgba(42, 189, 128, 0.08);
}

.vote-type button.picked {
  color: #51a1ff;
}

.post-video-table ul li.picked {
  border-bottom: 2px solid #51a1ff;
}

.create-form-item button.picked {
  border-color: #51a1ff;
}

.b2-widget-hot-circle .b2-widget-title button.picked {
  color: #51a1ff;
}

.topic-type-menu button.picked {
  color: #fff;
  background: #51a1ff;
}

.circle-topic-role {
  border: 1px solid rgba(42, 189, 128, 0.4);
}

.circle-topic-role:before {
  border-color: transparent transparent #51a1ff;
}

.topic-content-text p a {
  color: #51a1ff;
}

.home_row_0.module-search {
  margin-top: -16px;
}

.home_row_0.home_row_bg_img {
  margin-top: -16px;
}

.shop-cats .shop-cats-item {
  margin-right: 16px;
}

.mg-r {
  margin-right: 16px;
}

.mg-b {
  margin-bottom: 16px;
}

.mg-t {
  margin-top: 16px;
}

.mg-l {
  margin-left: 16px;
}

.b2-mg {
  margin: 16px;
}

.b2-pd {
  padding: 16px;
}

.b2_gap,
.shop-normal-list,
.shop-category,
.user-search-list,
.home-collection .collection-out {
  margin-right: -16px;
  margin-bottom: -16px;
  padding: 0;
}

.post-3-li-dubble .b2_gap {
  margin-right: -16px;
  margin-bottom: -16px;
}

.b2_gap>li .item-in,
.shop-list-item,
.shop-normal-item-in,
.user-search-list li>div,
.home-collection .home-collection-content,
.post-3.post-3-li-dubble .b2_gap>li .item-in {
  margin-bottom: 16px;
  margin-right: 16px;
  overflow: hidden;
}

.b2-pd-r {
  padding-right: 16px;
}

.widget-area section+section {
  margin-top: 16px;
}

.b2-pd,
.b2-padding {
  padding: 16px;
}

.single-post-normal .single-article {
  margin-right: 16px;
}

.site-footer .widget {
  padding: 0 16px;
}

.author-page-right {
  margin-right: 16px;
}

.single-article {
  margin-bottom: 16px;
}

.home-collection .flickity-prev-next-button.next {
  right: -16px;
}

.post-style-5-top {
  margin-top: -16px;
}

.home-collection-title {
  padding: 12px 16px;
}

.home_row_bg,
.home_row_bg_img {
  padding: 32px 0;
}

.shop-coupon-box {
  margin-right: -16px;
}

.shop-box-row .shop-coupon-item .stamp {
  margin-right: 16px;
  margin-bottom: 16px;
}

.mg-t- {
  margin-top: -16px;
}

.collection-box {
  margin: -8px;
}

.collection-item {
  padding: 8px;
}

.site-footer-widget-in {
  margin: 0 -16px;
}

.module-sliders.home_row_bg {
  margin-top: -16px;
}

.home_row_0.homw-row-full.module-sliders {
  margin-top: -16px;
}

.widget-area.widget-area-left {
  padding-right: 16px;
}

.widget-area {
  width: 300px;
  min-width: 300px;
  padding-left: 16px;
  max-width: 100%;
}

.widget-area-left.widget-area {
  width: 220px;
  max-width: 220px;
  min-width: 220px;
}

.post-type-archive-circle #secondary.widget-area,
.tax-circle_tags #secondary.widget-area,
.page-template-page-circle #secondary.widget-area {
  width: 280px;
  max-width: 280px;
  min-width: 280px;
}

.single .content-area,
.page .content-area {
  max-width: calc(100% - 316px);
  margin: 0 auto;
  width: 100%;
}

.page-template-pageTemplatespage-index-php .content-area {
  max-width: 100%;
}

.tax-collection .content-area,
.tax-newsflashes_tags .content-area,
.post-type-archive-newsflashes .content-area,
.page-template-page-newsflashes .content-area .all-circles.content-area,
.announcement-page.content-area,
.single-announcement .content-area,
.post-style-2.single .content-area,
.create-circle.content-area,
.mission-page.wrapper,
#carts .vip-page {
  max-width: 1040px;
  width: 100%;
}

.footer {
  color: #99a2aa;
}

.footer-links {
  color: #99a2aa;
}

.footer-bottom {
  color: #99a2aa;
}

body {
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
  --wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg,
      rgba(6, 147, 227, 1) 0%,
      rgb(155, 81, 224) 100%);
  --wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg,
      rgb(122, 220, 180) 0%,
      rgb(0, 208, 130) 100%);
  --wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg,
      rgba(252, 185, 0, 1) 0%,
      rgba(255, 105, 0, 1) 100%);
  --wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg,
      rgba(255, 105, 0, 1) 0%,
      rgb(207, 46, 46) 100%);
  --wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg,
      rgb(238, 238, 238) 0%,
      rgb(169, 184, 195) 100%);
  --wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg,
      rgb(74, 234, 220) 0%,
      rgb(151, 120, 209) 20%,
      rgb(207, 42, 186) 40%,
      rgb(238, 44, 130) 60%,
      rgb(251, 105, 98) 80%,
      rgb(254, 248, 76) 100%);
  --wp--preset--gradient--blush-light-purple: linear-gradient(135deg,
      rgb(255, 206, 236) 0%,
      rgb(152, 150, 240) 100%);
  --wp--preset--gradient--blush-bordeaux: linear-gradient(135deg,
      rgb(254, 205, 165) 0%,
      rgb(254, 45, 45) 50%,
      rgb(107, 0, 62) 100%);
  --wp--preset--gradient--luminous-dusk: linear-gradient(135deg,
      rgb(255, 203, 112) 0%,
      rgb(199, 81, 192) 50%,
      rgb(65, 88, 208) 100%);
  --wp--preset--gradient--pale-ocean: linear-gradient(135deg,
      rgb(255, 245, 203) 0%,
      rgb(182, 227, 212) 50%,
      rgb(51, 167, 181) 100%);
  --wp--preset--gradient--electric-grass: linear-gradient(135deg,
      rgb(202, 248, 128) 0%,
      rgb(113, 206, 126) 100%);
  --wp--preset--gradient--midnight: linear-gradient(135deg,
      rgb(2, 3, 129) 0%,
      rgb(40, 116, 252) 100%);
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
}

.has-black-color {
  color: var(--wp--preset--color--black) !important;
}

.has-cyan-bluish-gray-color {
  color: var(--wp--preset--color--cyan-bluish-gray) !important;
}

.has-white-color {
  color: var(--wp--preset--color--white) !important;
}

.has-pale-pink-color {
  color: var(--wp--preset--color--pale-pink) !important;
}

.has-vivid-red-color {
  color: var(--wp--preset--color--vivid-red) !important;
}

.has-luminous-vivid-orange-color {
  color: var(--wp--preset--color--luminous-vivid-orange) !important;
}

.has-luminous-vivid-amber-color {
  color: var(--wp--preset--color--luminous-vivid-amber) !important;
}

.has-light-green-cyan-color {
  color: var(--wp--preset--color--light-green-cyan) !important;
}

.has-vivid-green-cyan-color {
  color: var(--wp--preset--color--vivid-green-cyan) !important;
}

.has-pale-cyan-blue-color {
  color: var(--wp--preset--color--pale-cyan-blue) !important;
}

.has-vivid-cyan-blue-color {
  color: var(--wp--preset--color--vivid-cyan-blue) !important;
}

.has-vivid-purple-color {
  color: var(--wp--preset--color--vivid-purple) !important;
}

.has-black-background-color {
  background-color: var(--wp--preset--color--black) !important;
}

.has-cyan-bluish-gray-background-color {
  background-color: var(--wp--preset--color--cyan-bluish-gray) !important;
}

.has-white-background-color {
  background-color: var(--wp--preset--color--white) !important;
}

.has-pale-pink-background-color {
  background-color: var(--wp--preset--color--pale-pink) !important;
}

.has-vivid-red-background-color {
  background-color: var(--wp--preset--color--vivid-red) !important;
}

.has-luminous-vivid-orange-background-color {
  background-color: var(--wp--preset--color--luminous-vivid-orange) !important;
}

.has-luminous-vivid-amber-background-color {
  background-color: var(--wp--preset--color--luminous-vivid-amber) !important;
}

.has-light-green-cyan-background-color {
  background-color: var(--wp--preset--color--light-green-cyan) !important;
}

.has-vivid-green-cyan-background-color {
  background-color: var(--wp--preset--color--vivid-green-cyan) !important;
}

.has-pale-cyan-blue-background-color {
  background-color: var(--wp--preset--color--pale-cyan-blue) !important;
}

.has-vivid-cyan-blue-background-color {
  background-color: var(--wp--preset--color--vivid-cyan-blue) !important;
}

.has-vivid-purple-background-color {
  background-color: var(--wp--preset--color--vivid-purple) !important;
}

.has-black-border-color {
  border-color: var(--wp--preset--color--black) !important;
}

.has-cyan-bluish-gray-border-color {
  border-color: var(--wp--preset--color--cyan-bluish-gray) !important;
}

.has-white-border-color {
  border-color: var(--wp--preset--color--white) !important;
}

.has-pale-pink-border-color {
  border-color: var(--wp--preset--color--pale-pink) !important;
}

.has-vivid-red-border-color {
  border-color: var(--wp--preset--color--vivid-red) !important;
}

.has-luminous-vivid-orange-border-color {
  border-color: var(--wp--preset--color--luminous-vivid-orange) !important;
}

.has-luminous-vivid-amber-border-color {
  border-color: var(--wp--preset--color--luminous-vivid-amber) !important;
}

.has-light-green-cyan-border-color {
  border-color: var(--wp--preset--color--light-green-cyan) !important;
}

.has-vivid-green-cyan-border-color {
  border-color: var(--wp--preset--color--vivid-green-cyan) !important;
}

.has-pale-cyan-blue-border-color {
  border-color: var(--wp--preset--color--pale-cyan-blue) !important;
}

.has-vivid-cyan-blue-border-color {
  border-color: var(--wp--preset--color--vivid-cyan-blue) !important;
}

.has-vivid-purple-border-color {
  border-color: var(--wp--preset--color--vivid-purple) !important;
}

.has-vivid-cyan-blue-to-vivid-purple-gradient-background {
  background: var(--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple) !important;
}

.has-light-green-cyan-to-vivid-green-cyan-gradient-background {
  background: var(--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan) !important;
}

.has-luminous-vivid-amber-to-luminous-vivid-orange-gradient-background {
  background: var(--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange) !important;
}

.has-luminous-vivid-orange-to-vivid-red-gradient-background {
  background: var(--wp--preset--gradient--luminous-vivid-orange-to-vivid-red) !important;
}

.has-very-light-gray-to-cyan-bluish-gray-gradient-background {
  background: var(--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray) !important;
}

.has-cool-to-warm-spectrum-gradient-background {
  background: var(--wp--preset--gradient--cool-to-warm-spectrum) !important;
}

.has-blush-light-purple-gradient-background {
  background: var(--wp--preset--gradient--blush-light-purple) !important;
}

.has-blush-bordeaux-gradient-background {
  background: var(--wp--preset--gradient--blush-bordeaux) !important;
}

.has-luminous-dusk-gradient-background {
  background: var(--wp--preset--gradient--luminous-dusk) !important;
}

.has-pale-ocean-gradient-background {
  background: var(--wp--preset--gradient--pale-ocean) !important;
}

.has-electric-grass-gradient-background {
  background: var(--wp--preset--gradient--electric-grass) !important;
}

.has-midnight-gradient-background {
  background: var(--wp--preset--gradient--midnight) !important;
}

.has-small-font-size {
  font-size: var(--wp--preset--font-size--small) !important;
}

.has-medium-font-size {
  font-size: var(--wp--preset--font-size--medium) !important;
}

.has-large-font-size {
  font-size: var(--wp--preset--font-size--large) !important;
}

.has-x-large-font-size {
  font-size: var(--wp--preset--font-size--x-large) !important;
}

.site-content {
  display: flex;
  padding: 20px;
  margin-left: 43px;
  margin-right: 43px;
}

.usertopName {
  display: flex;
}
</style>