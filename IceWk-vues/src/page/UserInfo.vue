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
                    <div
                      class="mask-wrapper"
                      v-bind:style="{ backgroundImage: 'url(' + image + ')' }"
                    >
                      <div class="user-cover-button">
                        <label class="empty button" for="cover-input"
                          ><i class="b2font b2-image-fill"></i
                          ><span>上传封面图片</span></label
                        >
                        <input
                          id="cover-input"
                          type="file"
                          class="b2-hidden-always"
                          ref="fileInput"
                          accept="image/jpg,image/jpeg,image/png,image/gif"
                        />
                      </div>
                    </div>
                    <div class="user-panel">
                      <div class="avatar">
                        <el-avatar
                          shape="square"
                          :size="150"
                          :src="user.profile"
                        ></el-avatar>
                        <label class="editor-avatar" for="avatar-input"
                          ><i class="b2font b2-image-fill"></i
                          ><span>修改我的头像</span></label
                        >
                        <input
                          id="avatar-input"
                          type="file"
                          class="b2-hidden-always"
                          ref="fileInput"
                          accept="image/jpg,image/jpeg,image/png,image/gif"
                        />
                      </div>
                      <div class="user-panel-info">
                        <div class="">
                          <h1>
                            <span id="userDisplayName" class="usertopName">{{
                              user.name
                            }}</span
                            ><span class="user-page-lv"
                              ><span class="lv-icon user-lv b2-lv0"
                                ><b>Lv0 新手上路</b><i>lv0</i></span
                              ></span
                            >
                          </h1>
                          <p>这个人很懒，什么都没有留下！</p>
                        </div>
                        <div class="user-panel-editor-button">
                          <div class="user-follow">
                              <el-button type="primary" round>关注Ta</el-button>
                                <el-button type="primary" round>取消关注</el-button>
                                  <el-button  round>发私信</el-button>
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
                                <i
                                  class="
                                    b2font
                                    b2-user-heart-line b2-light b2-color
                                  "
                                ></i
                                >概览
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </div>
                        </router-link>
                        <div @click="ChanceFa()" class="user-sidebar">
                          <router-link to="/userinfo/post">
                            <div :class="acticveChanceFa">
                              <a class="link-block"></a>
                              <p>
                                <i
                                  class="
                                    b2font
                                    b2-quill-pen-line b2-light b2-color
                                  "
                                ></i
                                >发布文章
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>

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

                        <div @click="ChanceHui()">
                          <router-link to="/userinfo/vip">
                            <div :class="acticveChanceHui">
                              <a class="link-block"></a>
                              <p>
                                <i
                                  class="
                                    b2font
                                    b2-hand-heart-line b2-light b2-color
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
                                <i
                                  class="
                                    b2font
                                    b2-heart-add-line b2-light b2-color
                                  "
                                ></i
                                >充值中心
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
                                <i
                                  class="
                                    b2font
                                    b2-hearts-line b2-light b2-color
                                  "
                                ></i
                                >修改密码
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
                                <i
                                  class="b2font b2-star-line b2-light b2-color"
                                ></i
                                >收藏
                              </p>
                              <div class="author-sidebar-down">
                                <i class="b2font b2-arrow-right-s-line"></i>
                              </div>
                            </div>
                          </router-link>
                        </div>
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
              <div
                class="
                  d-flex
                  layout-min-full-height
                  justify-content-center
                  align-items-center
                "
              >
                <div class="text-center" style="width: 80%; margin: 0px auto">
                  <h1 class="mb-4">哇，窗口太小啦</h1>
                  <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
                </div>
              </div>
            </div>
          </div>
          <foot />
          <div infos="0">
            <div
              class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "
            ></div>
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

export default ({
  name: 'Home',
  components: { top, foot },
  data() {
    return {
      acticveChanceGai: "user-sidebar-info active",
      acticveChanceFa: "user-sidebar-info",
      acticveChanceDing: "user-sidebar-info",
      acticveChanceHui: "user-sidebar-info",
      acticveChanceChong: "user-sidebar-info",
      acticveChanceXiu: "user-sidebar-info",
      acticveChanceShou: "user-sidebar-info",
      image: "http://api.ahsubway.com/",
      acticve: 'nav-link active',
      user: "",
    }
  },
  created() {
    this.getUserInfo()
    this.ChanceGai()
  },
  props: {

  },
  methods: {
    ChanceGai() {
      this.acticveChanceGai = "user-sidebar-info active"
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceFa() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info active"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceDing() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info active"
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceHui() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceHui = "user-sidebar-info active"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceChong() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info active"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info"
    },
    hanceXiu() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info active"
      this.acticveChanceShou = "user-sidebar-info"
    },
    ChanceShou() {
      this.acticveChanceGai = "user-sidebar-info "
      this.acticveChanceFa = "user-sidebar-info"
      this.acticveChanceDing = "user-sidebar-info"
      this.acticveChanceHui = "user-sidebar-info"
      this.acticveChanceChong = "user-sidebar-info"
      this.acticveChanceXiu = "user-sidebar-info"
      this.acticveChanceShou = "user-sidebar-info active"
    },
    getUserInfo() {
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      this.user = user.data
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

.header-banner {
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
li.current-menu-item > a,
.top-menu-hide:hover .more,
.header .top-menu ul li.depth-0:hover > a .b2-jt-block-down,
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

.login-form-item input:focus + span {
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

.bar-user-info-row-title > a span:first-child::before {
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

.circle-admin-info > div:hover {
  border-color: #51a1ff;
}

.circle-admin-info > div:hover span,
.circle-admin-info > div:hover i {
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

#video-list ul li > div:hover {
  background-color: rgba(13, 98, 194, 0.123);
}

.post-5 .post-info h2::before {
  background-color: #51a1ff;
}

.tox .tox-tbtn--enabled svg {
  fill: #51a1ff !important;
}

.entry-content a,
.entry-content .content-show-roles > p a,
.entry-content > ul li a,
.content-show-roles > li a,
.entry-content > ol li a {
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

.b2_gap > li .item-in,
.shop-list-item,
.shop-normal-item-in,
.user-search-list li > div,
.home-collection .home-collection-content,
.post-3.post-3-li-dubble .b2_gap > li .item-in {
  margin-bottom: 16px;
  margin-right: 16px;
  overflow: hidden;
}

.b2-pd-r {
  padding-right: 16px;
}

.widget-area section + section {
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
  background: var(
    --wp--preset--gradient--vivid-cyan-blue-to-vivid-purple
  ) !important;
}

.has-light-green-cyan-to-vivid-green-cyan-gradient-background {
  background: var(
    --wp--preset--gradient--light-green-cyan-to-vivid-green-cyan
  ) !important;
}

.has-luminous-vivid-amber-to-luminous-vivid-orange-gradient-background {
  background: var(
    --wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange
  ) !important;
}

.has-luminous-vivid-orange-to-vivid-red-gradient-background {
  background: var(
    --wp--preset--gradient--luminous-vivid-orange-to-vivid-red
  ) !important;
}

.has-very-light-gray-to-cyan-bluish-gray-gradient-background {
  background: var(
    --wp--preset--gradient--very-light-gray-to-cyan-bluish-gray
  ) !important;
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