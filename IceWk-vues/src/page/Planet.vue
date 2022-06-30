<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message5="acticve" />
          <div>
            <div class="body">
              <div class="container">
                <div class="row">
                  <el-aside width="260px">
                    <div class="sidebar-innter widget-ffixed">
                      <section
                        id="b2-widget-circle-info-2"
                        class="
                          mobile-hidden
                          widget
                          b2-widget-circle-info
                          mg-b
                          box
                          b2-radius-aside-left
                        "
                      >
                        <div class="b2-widget-title">
                          <h2 class="widget-title">创建自己的圈子</h2>
                        </div>
                        <div class="b2-widget-box">
                          <div class="about-widget">
                            <div class="user-w-announcement">
                              <ul class="planet-aside-ul">
                                <li
                                  class="
                                    planet-aside-li
                                    el-icon-ice-cream-round
                                  "
                                >
                                  <a href="#">什么是圈子？</a>
                                </li>
                                <li
                                  class="
                                    planet-aside-li
                                    el-icon-ice-cream-round
                                  "
                                >
                                  <a href="#">我可以做什么？</a>
                                </li>
                                <li
                                  class="
                                    planet-aside-li
                                    el-icon-ice-cream-round
                                  "
                                >
                                  <a href="#">圈子规则</a>
                                </li>
                              </ul>
                            </div>
                            <div class="circle-widget-button">
                              <button
                                class="text-great"
                                onclick="postPoBox.go('https://www.zmki.cn/create-circle','create_circle')"
                              >
                                创建圈子
                              </button>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </el-aside>
                  <el-main>
                    <el-row :gutter="20">
                      <div class="circle-top">
                        <div id="po-topic-box" class="box b2-radius">
                          <div class="po-topic">
                            <div class="circle-info">
                              <div class="circle-info-in">
                                <div class="circle-info-left">
                                  <img
                                    data-src=""
                                    alt=""
                                    src="https://www.zmki.cn/wp-content/uploads/2021/06/1bd160d7cbf317_1_avatar.png"
                                    data-was-processed="true"
                                    class="topimg"
                                  />
                                  <h1 class="planeth1">
                                    <p>
                                      <b>广场</b
                                      ><span class="mobile-show"
                                        ><i
                                          class="
                                            b2font
                                            b2-arrow-right-s-line
                                            picked
                                          "
                                        ></i
                                      ></span>
                                    </p>
                                    <a target="_blank"
                                      ><span>Alextao</span>
                                      <span>(圈主)</span></a
                                    >
                                  </h1>
                                  <div class="mobile-show po-top-submit">
                                    <button class="empty">发布话题</button>
                                  </div>
                                </div>
                                <div class="circle-admin-info" style="">
                                  <div>
                                    <a
                                      href="https://www.zmki.cn/circle-users?circle_id=850"
                                      target="_blank"
                                      class="link-block"
                                    ></a>
                                    <b>4987</b> <span>圈友</span>
                                    <i class="b2font b2-parent-line"></i>
                                  </div>
                                  <div>
                                    <b>52</b> <span>话题</span>
                                    <i class="b2font b2-chat-smile-3-line"></i>
                                  </div>
                                  <div>
                                    <a target="_blank" class="link-block"></a>
                                    <b>46</b>
                                    <span class="b2-color">所有圈子</span>
                                    <i class="b2font b2-donut-chart-fill"></i>
                                  </div>
                                  <!---->
                                  <span class="mobile-show close-admin-box"
                                    ><i class="b2font b2-close-line"></i
                                  ></span>
                                </div>
                              </div>
                              <p class="circle-desc tip-radius">
                                公共区域，请文明发言!
                              </p>
                              <div v-if="shownologin" class="nologin">
                                
                              <div class="nologintext">
                                   <h5 >您还未登录</h5>
                                </div>
                              <div class="nologintext">
                                 
                                  <p class="circle-desc">
                                    登录后可阅读更多话题
                                  </p>
                                </div>
                              </div>
                              <div v-else>
                                <Tinymce
                                  ref="editor"
                                  v-model="postForm.content"
                                  :height="200"
                                />
                                <div class="PutContent">
                                  <el-button
                                    @click="sitmap()"
                                    class="PutContentBut"
                                    type="success"
                                    round
                                    >发表</el-button
                                  >
                                </div>
                              </div>
                            </div>
                            <div id="show-form" class="po-form-box">
                              <div
                                class="po-form-box-in"
                                style="opacity: 1"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="topic-type-menu">
                        <ul class="planetul">
                          <li class="planetli">
                            <el-button type="primary" round>全部</el-button>
                          </li>
                          <li class="planetli">
                            <el-button round>我说</el-button>
                          </li>
                          <li class="planetli">
                            <el-button round>提问</el-button>
                          </li>
                          <li class="planetli">
                            <el-button round>投票</el-button>
                          </li>
                          <li class="planetli">
                            <el-button round>你猜</el-button>
                          </li>
                        </ul>
                        <div class="topic-drop">
                          <button class="planettext">
                            <i class="el-icon-lollipop"></i><span>筛选</span>
                          </button>
                          <!---->
                        </div>
                      </div>
                      <div
                        v-for="item in squaredata"
                        :key="item.id"
                        class="circle-contenr-out"
                      >
                        <div class="circle-contenr">
                          <div class="topic-header">
                            <div class="topic-header-left">
                              <div class="topic-avatar">
                                <el-avatar :src="item.authorImg"></el-avatar>
                              </div>
                              <div class="topic-name">
                                <div>
                                  <div class="topic-name-data">
                                    <a target="_blank"
                                      ><b>{{ item.author }}</b></a
                                    >
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="topic-user-lv">
                                    <p>
                                      <span class="lv-icon user-vip b2-vip3"
                                        ><i style="border-color: #ff8223"></i
                                        ><b style="color: #ff8223"
                                          >永久会员</b
                                        ></span
                                      >
                                    </p>
                                    <p>
                                      <span class="lv-icon user-lv b2-lv5"
                                        ><b>荣誉用户</b><i>lv5</i></span
                                      >
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="topic-header-right">
                            <span class="topic-date topic-circle"
                              ><a
                                href="https://www.zmki.cn/circle/square"
                                target="_blank"
                                ><b class="circle-hash"
                                  ><svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 36 36"
                                  >
                                    <g fill-rule="evenodd">
                                      <path
                                        d="M18 0c9.941 0 18 8.059 18 18 0 2.723-.604 5.304-1.687 7.617v6.445a2.25 2.25 0 0 1-2.096 2.245l-.154.005-6.446.001A17.932 17.932 0 0 1 18 36C8.059 36 0 27.941 0 18S8.059 0 18 0z"
                                        fill-opacity=".1"
                                      ></path>
                                      <path
                                        d="M23.32 7.875c.517 0 .948.18 1.293.54.296.294.444.632.444 1.015a.589.589 0 0 1-.037.202l-.258 2.17c0 .18.087.27.259.27h.96c.592 0 1.097.185 1.516.557.419.372.628.828.628 1.369 0 .54-.21 1.003-.628 1.386a2.166 2.166 0 0 1-1.515.574h-1.478c-.197 0-.308.09-.333.27l-.517 3.684c-.025.158.049.237.221.237h1.22c.591 0 1.096.191 1.515.574.419.384.628.845.628 1.386 0 .54-.21 1.003-.628 1.386a2.166 2.166 0 0 1-1.515.574h-1.7c-.172 0-.27.08-.296.237l-.273 2.062c-.05.495-.283.912-.702 1.25a2.282 2.282 0 0 1-1.478.507c-.518 0-.949-.18-1.294-.54-.295-.294-.443-.632-.443-1.015 0-.067.012-.135.037-.202l.236-2.062c.025-.158-.049-.237-.221-.237h-3.732c-.198 0-.296.08-.296.237l-.31 2.062a1.96 1.96 0 0 1-.721 1.25c-.407.338-.88.507-1.423.507-.517 0-.948-.18-1.293-.54-.296-.294-.444-.632-.444-1.015v-.202l.274-2.062c.025-.158-.062-.237-.259-.237h-.739a2.166 2.166 0 0 1-1.515-.574c-.419-.383-.628-.845-.628-1.386 0-.54.21-1.002.628-1.386a2.166 2.166 0 0 1 1.515-.574h1.257c.172 0 .27-.079.295-.237l.48-3.684c.025-.18-.06-.27-.258-.27h-.924a2.166 2.166 0 0 1-1.515-.574c-.419-.383-.628-.84-.628-1.37 0-.529.21-.985.628-1.368a2.166 2.166 0 0 1 1.515-.575h1.515c.197 0 .308-.09.333-.27L13.01 9.6c.074-.474.314-.88.72-1.217.407-.338.881-.507 1.423-.507.518 0 .949.18 1.294.54.27.294.406.62.406.98v.237l-.294 2.17c-.025.18.061.27.259.27h3.769c.172 0 .27-.09.295-.27l.295-2.203c.074-.474.314-.88.72-1.217.407-.338.881-.507 1.423-.507zm-3.316 7.875h-3.49c-.157 0-.256.071-.296.213l-.014.077-.45 3.956c-.02.145.029.228.144.249l.064.005h3.524c.134 0 .22-.059.26-.176l.016-.078.484-3.956c.02-.166-.037-.26-.17-.284l-.072-.006z"
                                        fill-rule="nonzero"
                                      ></path>
                                    </g></svg
                                ></b>
                                <b>广场</b></a
                              ></span
                            >
                          </div>
                        </div>
                        <div class="topic-content">
                          <!-- <h2 class="planeth2">
                            <span>哼</span>
                           
                          </h2> -->
                          <!---->
                          <div
                            v-html="item.content"
                            class="topic-content-text"
                          ></div>
                          <!---->
                          <!---->
                          <!---->
                          <!---->
                          <!---->
                          <!---->
                        </div>
                        <div class="topic-footer">
                          <div class="topic-footer-left">
                            <button class="planettext">
                              <i class="el-icon-caret-top"></i><span>赞</span
                              ><b>0</b>
                            </button>
                            <button class="planettext">
                              <i class="el-icon-caret-bottom"></i>
                            </button>
                            <span class="topic-date"
                              ><b
                                ><time
                                  class="b2timeago"
                                  datetime="2021-12-27 21:58:17"
                                  itemprop="datePublished"
                                  >21年12月27日</time
                                ></b
                              ></span
                            >
                            <!---->
                            <div class="topic-meta-more-box">
                              <el-popover
                                placement="bottom"
                                title="标题"
                                width="200"
                                trigger="hover"
                                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                              >
                                <button
                                  slot="reference"
                                  class="topic-date topic-meta-more"
                                >
                                  <i class="el-icon-more-outline"></i>
                                </button>
                              </el-popover>
                            </div>
                          </div>
                          <div class="topic-footer-right">
                            <el-button size="small" type="success" plain>
                              <span><b>1</b>条讨论</span></el-button
                            >
                          </div>
                        </div>
                      </div>
                    </el-row>
                  </el-main>
                  <el-aside width="260px">
                    <section
                      id="b2-widget-user-6"
                      class="
                        mobile-hidden
                        widget
                        b2-widget-user
                        mg-b
                        box
                        b2-radius
                        b2-radius-aside-right
                      "
                    >
                      <div class="b2-widget-box">
                        <div id="user-widget" class="user-widget">
                          <div class="user-widget-content">
                            <div
                              class="widget-gujia-user"
                              style="display: none"
                            >
                              <div class="user-widget-info">
                                <div class="user-w-avatar"></div>
                                <div class="user-w-name"></div>
                              </div>
                              <div class="user-w-tj">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                              <div class="user-w-rw"></div>
                              <div class="user-w-announcement">
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                            </div>
                            <div style="">
                              <!---->
                              <div>
                                <div class="user-w-logon">
                                  <p class="user-w-logon-title b2-color">
                                    嗨！朋友
                                  </p>
                                  <p class="user-w-logon-titlep ">所有的伟大，都源于一个勇敢的开始</p>
                                </div>
                                <div>
                                  <div class="oauth-login-button">
                                    <a
                                      href="javascript:void(0)"
                                      class="login-weixin"
                                      >微信登录</a
                                    ><a
                                      href="https://api.weibo.com/oauth2/authorize?client_id=2224666867&amp;response_type=code&amp;redirect_uri=https%3A%2F%2F7b2.com%2Fopen%3Ftype%3Dweibo"
                                      class="login-weibo"
                                      >微博登录</a
                                    ><a
                                      href="https://graph.qq.com/oauth2.0/authorize?client_id=101057247&amp;state=6b96c86f14fab2f3ce7af8fc5d72c943&amp;response_type=code&amp;redirect_uri=https%3A%2F%2F7b2.com%2Fopen%3Ftype%3Dqq"
                                      class="login-qq"
                                      >QQ登录</a
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="user-w-announcement">
                                <div>
                                  <ul>
                                    <li class="user-w-announcementli">
                                      <a
                                      class="adtext"
                                        href="https://7b2.com/announcement/55512.html"
                                        target="_blank"
                                        ><b>公告：</b
                                        ><span
                                          >WordPress轻社交购物主题：B2Pro_3.4.1
                                          +
                                          APP插件_1.1.0+uniapp源码_1.1.0（微信小程序）更新通知</span
                                        ></a
                                      >
                                    </li>
                                    <li>
                                      <a
                                        class="adtext"
                                        href="https://7b2.com/announcement/54519.html"
                                        target="_blank"
                                        ><b>公告：</b
                                        ><span
                                          >B2Pro_3.3.56 +
                                          APP插件_1.0.9+uniapp源码_1.0.9更新公告</span
                                        ></a
                                      >
                                    </li>
                                    <li>
                                      <a
                                        class="adtext"
                                        href="https://7b2.com/announcement/54127.html"
                                        target="_blank"
                                        ><b>公告：</b
                                        ><span
                                          >B2PRO_3.3.3发布了，请小伙伴们去更新体验</span
                                        ></a
                                      >
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div class="widget-mission-footer">
                              <a
                              class="allad"
                                href="https://7b2.com/announcement"
                                target="_blank"
                                >全部公告</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </el-aside>
                </div>
              </div>
              <div class="clearfix pt-8"></div>
            </div>
          </div>
          <div class="mobile-model">
            <div
              class="
                d-flex
                layout-min-full-height
                justify-content-center
                align-items-center
              "
            >
              <div class="text-center" style="width: 80%; margin: 0 auto">
                <h1 class="mb-4">哇，窗口太小啦</h1>
                <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
              </div>
            </div>
          </div>
        </div>
        <div class="macwk-footer white border-top pc-model" data-v-ea53b530>
          <div class="container" data-v-ea53b530>
            <a href="/" class="logo" data-v-ea53b530
              ><svg
                id="macwk-svg-logo"
                width="32"
                height="32"
                xmlns="http://www.w3.org/2000/svg"
                data-v-6dd0b122
                data-v-ea53b530
              >
                <title data-v-6dd0b122>MacWK</title>
                <defs data-v-6dd0b122>
                  <linearGradient
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                    id="a"
                    data-v-6dd0b122
                  >
                    <stop
                      offset="0%"
                      class="stop-color-circle"
                      data-v-6dd0b122
                    ></stop>
                    <stop
                      offset="100%"
                      class="stop-color-circle"
                      data-v-6dd0b122
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    x1="100%"
                    y1="86.198%"
                    x2="-14.813%"
                    y2="-4.357%"
                    id="b"
                    data-v-6dd0b122
                  >
                    <stop
                      offset="0%"
                      class="stop-color-default"
                      data-v-6dd0b122
                    ></stop>
                    <stop
                      offset="40.927%"
                      class="stop-color-default"
                      data-v-6dd0b122
                    ></stop>
                    <stop
                      offset="100%"
                      class="stop-color-default"
                      data-v-6dd0b122
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    x1="86.515%"
                    y1="24.533%"
                    x2="0%"
                    y2="24.533%"
                    id="c"
                    data-v-6dd0b122
                  >
                    <stop
                      stop-opacity="0"
                      offset="0%"
                      class="stop-color-default"
                      data-v-6dd0b122
                    ></stop>
                    <stop
                      offset="100%"
                      class="stop-color-default-linearGradient"
                      data-v-6dd0b122
                    ></stop>
                  </linearGradient>
                </defs>
                <g fill="none" fill-rule="evenodd" data-v-6dd0b122>
                  <path
                    d="M29.952 16c0-1.933-1.562-3.5-3.488-3.5a3.494 3.494 0 0 0-3.488 3.5c0 1.933 1.561 3.5 3.488 3.5a3.494 3.494 0 0 0 3.488-3.5"
                    fill="url(#a)"
                    data-v-6dd0b122
                  ></path>
                  <path
                    d="M25.865 25.9a13.932 13.932 0 0 1-6.377 3.66c-1.115.286-2.284.44-3.488.44a13.893 13.893 0 0 1-10.512-4.797A13.968 13.968 0 0 1 2.048 16c0-3.523 1.298-6.742 3.44-9.203A13.893 13.893 0 0 1 16 2c1.204 0 2.373.154 3.488.44a13.932 13.932 0 0 1 6.377 3.66l-4.933 4.95A6.942 6.942 0 0 0 16 9c-3.852 0-6.976 3.134-6.976 7l.002.18C9.122 19.964 12.208 23 16 23c1.926 0 3.67-.784 4.932-2.05l4.933 4.95z"
                    fill="url(#b)"
                    data-v-6dd0b122
                  ></path>
                  <path
                    d="M20.932 11.05A6.942 6.942 0 0 0 16 9c-3.852 0-6.976 3.134-6.976 7a13.98 13.98 0 0 1 4.087-9.9 13.932 13.932 0 0 1 6.377-3.66l1.444 8.61z"
                    fill="url(#c)"
                    data-v-6dd0b122
                  ></path>
                </g>
              </svg>
              <span class="ml-4" data-v-ea53b530>MacWk</span></a
            >
            <div class="nav" data-v-ea53b530>
              <a href="/" class="nav-link" data-v-ea53b530>首页</a>
              <a href="/about" class="nav-link" data-v-ea53b530>关于 </a
              ><a href="/contact" class="nav-link" data-v-ea53b530>联系 </a
              ><a href="/privacy" class="nav-link" data-v-ea53b530>隐私 </a
              ><a href="/version" class="nav-link" data-v-ea53b530>版本检测 </a
              ><a href="/changelogs" class="nav-link" data-v-ea53b530
                >更新日志
              </a>
            </div>
            <div class="copyright" data-v-ea53b530>
              <p class="mb-0" data-v-ea53b530>
                <span class="mr-3" data-v-ea53b530
                  ><a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    data-v-ea53b530
                    >鲁ICP备19036164号</a
                  ></span
                >
                <span data-v-ea53b530
                  >Macwk.com © 2019. All rights reserved.</span
                >
              </p>
            </div>
          </div>
        </div>
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
</template>

<script>
import { createSquare, getAllSquare } from '@/api/websquare'
import { formatDate } from '@/utils/date.js'
import { getCarousel } from '@/api/setting'

import Tinymce from '@/components/Tinymce'

import top from './components/Top.vue'
import foot from './components/Foots.vue'

export default ({
  name: 'Home',
  components: { top, foot, Tinymce },
  created() {
    //数据回填
    this.fetchData()
    //检测token是否有效
    this.getUserInfo()
  },
  methods: {
    fetchData() {
      getAllSquare(this.postForm).then(response => {
        console.log(response)
        this.squaredata = response.data
      })
    },
    sitmap() {
      createSquare(this.postForm).then(response => {
        this.fetchData()
      })
    },
    getUserInfo() {
      const user = JSON.parse(window.localStorage.getItem('access-admin'))
      this.userJudje = (user == null)
      if (this.userJudje) {
        console.log("未登陆")
        //显示需要登陆
        this.shownologin = true
      } else {
        console.log("已登陆")
        this.user = user.data
        this.postForm.author = this.user.userid
        //显示需要登陆
        this.shownologin = false

      }
    }
  },


  data() {
    return {
      squaredata: "",
      postForm: {
        content: "",
        author: "",

      },
      shownologin: false,
      acticve: 'nav-link active',
    }
  },

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../static/mycss/top.css";
@import "../static/mycss/body.css";
@import "../static/mycss/planet.css";
@import "../static/mycss/user_info.css";

</style>

<style scoped>
.delayImg {
  height: 100px;
  width: 145px;
}
.body {
  background-color: #f3f5f7;
}
</style>


<style scoped>
.container {
}
.white1 {
  background-color: rgb(255, 255, 255);
  z-index: -1;
}
.index1 {
  z-index: 555;
}
.index {
  z-index: -1;
}
.outsection {
  display: flex;
  align-items: center;
  justify-content: center;
}
.Thecarousel {
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  width: 1435px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  margin-top: 8px;
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

<style scoped>
.py-7 {
  padding-top: 3px;
}
.tip-radius {
  margin-left: 30px;
  position: relative;
  margin-top: 8px;
}
.nologin {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.nologintext {
  display: flex;
}
.PutContent {
  display: flex;
  flex-direction: row-reverse;
}
.PutContentBut {
  margin-top: 10px;
  display: flex;
}
.circle-desc{
  display: flex;
}
</style>
