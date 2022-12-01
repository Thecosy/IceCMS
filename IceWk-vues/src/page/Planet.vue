<template>
  <div class="content">
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
                      <section id="b2-widget-circle-info-2" class="
                          mobile-hidden
                          widget
                          b2-widget-circle-info
                          mg-b
                          box
                          b2-radius-aside-left
                        ">
                        <div class="b2-widget-title">
                          <h2 class="widget-title">找到你自己的星球</h2>
                        </div>
                        <div class="b2-widget-box">
                          <div class="about-widget">
                            <div class="user-w-announcement">
                              <ul class="planet-aside-ul">
                                <li class="
                                    planet-aside-li
                                    el-icon-ice-cream-round
                                  ">
                                  <a href="#">怎么创建星球？</a>
                                </li>
                                <li class="
                                    planet-aside-li
                                    el-icon-ice-cream-round
                                  ">
                                  <a href="#">如何进行沟通？</a>
                                </li>
                                <li class="
                                    planet-aside-li
                                    el-icon-ice-cream-round
                                  ">
                                  <a href="#">星球条款</a>
                                </li>
                              </ul>
                            </div>
                            <div class="circle-widget-button">
                              <button class="text-great"
                                onclick="postPoBox.go('https://www.zmki.cn/create-circle','create_circle')">
                                创建星球
                              </button>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div class="sidebar-innter widget-ffixed">
                      <section id="b2-widget-circle-info-2" class="
                          mobile-hidden
                          widget
                          b2-widget-circle-info
                          mg-b
                          box
                          b2-radius-aside-left-plant
                        ">
                        <div class="b2-widget-title">
                          <h2 class="widget-title-plant">推荐星球</h2>
                        </div>
                        <div class="b2-widget-box">
                          <div class="about-widget">
                            <div class="PlanetListCare">
                              <div v-for="item in classlist" :key="item.id" class="PlanetListItem">
                                <router-link :to="'/planet/' + item.otherName">
                                  <div style="margin-left: 10px" class="PlanetListItems">
                                    <div class="PlanetListItem-img">
                                      <el-avatar shape="square" :size="38" :src="item.imgclass"></el-avatar>
                                    </div>
                                    <div class="PlanetListItem-info">
                                      <div class="PlanetListItem-title">
                                        <a class="planetTitletext" href="#">
                                          <span>{{ item.name }}</span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </router-link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="widget-mission-footer">
                          <a class="allad" href="https://7b2.com/announcement" target="_blank">全部星球</a>
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
                                  <img data-src="" alt="" :src="planetInfo.imgclass" data-was-processed="true"
                                    class="topimg" />
                                  <h1 class="planeth1">
                                    <p>
                                      <b>{{ planetInfo.name }}</b><span class="mobile-show"><i class="
                                            b2font
                                            b2-arrow-right-s-line
                                            picked
                                          "></i></span>
                                    </p>
                                    <a target="_blank"><span>Alextao</span>
                                      <span>(圈主)</span></a>
                                  </h1>
                                  <div class="mobile-show po-top-submit">
                                    <button class="empty">发布话题</button>
                                  </div>
                                </div>
                                <div class="circle-admin-info" style="">
                                  <div>
                                    <a href="https://www.zmki.cn/circle-users?circle_id=850" target="_blank"
                                      class="link-block"></a>
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
                                    <span class="b2-color">所有星球</span>
                                    <i class="b2font b2-donut-chart-fill"></i>
                                  </div>
                                  <!---->
                                  <span class="mobile-show close-admin-box"><i class="b2font b2-close-line"></i></span>
                                </div>
                              </div>
                              <p class="circle-desc tip-radius">
                                公共区域，请文明发言!
                              </p>
                              <div v-if="shownologin" class="nologin">
                                <div class="nologintext">
                                  <h5>您还未登录</h5>
                                </div>
                                <div class="nologintext">
                                  <p class="circle-desc">
                                    登录后可阅读更多话题
                                  </p>
                                </div>
                              </div>
                              <div v-else>
                                <!-- <Tinymce
                                  ref="editor"
                                  v-model="postForm.content"
                                  :height="200"
                                /> -->
                                <div class="postFormDiv" style="padding: 14px">
                                  <div class="avatar">
                                    <el-avatar :size="58" :src="user.profile"></el-avatar>
                                  </div>
                                  <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 12 }" :rows="5"
                                    placeholder="发表你的看法" v-model="postForm.content">
                                  </el-input>
                                </div>
                                <div class="PutContent">
                                  <div class="leftMenu">

                                    <a class="nav-link p-0 cursor-pointer">
                                      <i @click="showemoge()"
                                        class="icon-smile fs-18" />
                                      <div class="myVEmojiPicker">

                                        <el-popover placement="left" trigger="manual" v-model="showDialog">
                                          <VEmojiPicker :style="{ width: '340px', height: '200' }" labelSearch="Search"
                                            lang="pt-BR" @select="onSelectEmoji" />
                                        </el-popover>

                                      </div>
                                    </a>

                                    <a class="nav-links p-0 cursor-pointer">
                                      <el-popover placement="bottom-start" title="身份名牌" width="200" trigger="hover"
                                        content="独树一帜的名牌,让你眼前一亮。">

                                        <i slot="reference" @click="MainLock()" class="el-icon-postcard" />
                                      </el-popover>
                                    </a>

                                    <a v-if="postForm.isLock" class="nav-links p-0 cursor-pointer">
                                      <el-popover placement="bottom-start" title="私密圈子" width="200" trigger="hover"
                                        content="选择之后,你所发布的内容只有你自己可见。">

                                        <i slot="reference" @click="MainLock()" class="el-icon-lock" />
                                      </el-popover>
                                    </a>

                                    <a v-else class="nav-links p-0 cursor-pointer">
                                      <el-popover placement="bottom-start" title="私密圈子" width="200" trigger="hover"
                                        content="选择之后,你所发布的内容只有你自己可见。">

                                        <i slot="reference" @click="MainLock()" class="el-icon-unlock" />
                                      </el-popover>
                                    </a>
                                  </div>
                                  <el-button @click="sitmap()" class="PutContentBut" type="success" round>发布</el-button>
                                </div>
                              </div>
                            </div>
                            <div id="show-form" class="po-form-box">
                              <div class="po-form-box-in" style="opacity: 1"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="topic-type-menu">
                        <ul class="planetul">
                          <li class="planetli">
                            <el-button type="primary" round>全部</el-button>
                          </li>
                          <!-- <li class="planetli">
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
                          </li> -->
                        </ul>
                        <div class="topic-drop">
                          <button class="planettext">
                            <i class="el-icon-lollipop"></i><span>筛选</span>
                          </button>
                          <!---->
                        </div>
                      </div>

                      <div v-for="item in squaredata" :key="item.id" class="circle-contenr-out">
                        <div class="circle-contenr">
                          <div class="topic-header">
                            <div class="topic-header-left">
                              <div class="topic-avatar">
                                <el-avatar :src="item.authorImg"></el-avatar>
                              </div>
                              <div class="topic-name">
                                <div>
                                  <div class="topic-name-data">
                                    <a target="_blank"><b>{{ item.author }}</b></a>
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="topic-user-lv">
                                    <!-- <p>
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
                                    </p> -->
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="topic-header-right">
                            <span class="topic-date topic-circle"><a href="https://www.zmki.cn/circle/square"
                                target="_blank"><b class="circle-hash"><svg width="16" height="16" viewBox="0 0 36 36">
                                    <g fill-rule="evenodd">
                                      <path
                                        d="M18 0c9.941 0 18 8.059 18 18 0 2.723-.604 5.304-1.687 7.617v6.445a2.25 2.25 0 0 1-2.096 2.245l-.154.005-6.446.001A17.932 17.932 0 0 1 18 36C8.059 36 0 27.941 0 18S8.059 0 18 0z"
                                        fill-opacity=".1"></path>
                                      <path
                                        d="M23.32 7.875c.517 0 .948.18 1.293.54.296.294.444.632.444 1.015a.589.589 0 0 1-.037.202l-.258 2.17c0 .18.087.27.259.27h.96c.592 0 1.097.185 1.516.557.419.372.628.828.628 1.369 0 .54-.21 1.003-.628 1.386a2.166 2.166 0 0 1-1.515.574h-1.478c-.197 0-.308.09-.333.27l-.517 3.684c-.025.158.049.237.221.237h1.22c.591 0 1.096.191 1.515.574.419.384.628.845.628 1.386 0 .54-.21 1.003-.628 1.386a2.166 2.166 0 0 1-1.515.574h-1.7c-.172 0-.27.08-.296.237l-.273 2.062c-.05.495-.283.912-.702 1.25a2.282 2.282 0 0 1-1.478.507c-.518 0-.949-.18-1.294-.54-.295-.294-.443-.632-.443-1.015 0-.067.012-.135.037-.202l.236-2.062c.025-.158-.049-.237-.221-.237h-3.732c-.198 0-.296.08-.296.237l-.31 2.062a1.96 1.96 0 0 1-.721 1.25c-.407.338-.88.507-1.423.507-.517 0-.948-.18-1.293-.54-.296-.294-.444-.632-.444-1.015v-.202l.274-2.062c.025-.158-.062-.237-.259-.237h-.739a2.166 2.166 0 0 1-1.515-.574c-.419-.383-.628-.845-.628-1.386 0-.54.21-1.002.628-1.386a2.166 2.166 0 0 1 1.515-.574h1.257c.172 0 .27-.079.295-.237l.48-3.684c.025-.18-.06-.27-.258-.27h-.924a2.166 2.166 0 0 1-1.515-.574c-.419-.383-.628-.84-.628-1.37 0-.529.21-.985.628-1.368a2.166 2.166 0 0 1 1.515-.575h1.515c.197 0 .308-.09.333-.27L13.01 9.6c.074-.474.314-.88.72-1.217.407-.338.881-.507 1.423-.507.518 0 .949.18 1.294.54.27.294.406.62.406.98v.237l-.294 2.17c-.025.18.061.27.259.27h3.769c.172 0 .27-.09.295-.27l.295-2.203c.074-.474.314-.88.72-1.217.407-.338.881-.507 1.423-.507zm-3.316 7.875h-3.49c-.157 0-.256.071-.296.213l-.014.077-.45 3.956c-.02.145.029.228.144.249l.064.005h3.524c.134 0 .22-.059.26-.176l.016-.078.484-3.956c.02-.166-.037-.26-.17-.284l-.072-.006z"
                                        fill-rule="nonzero"></path>
                                    </g>
                                  </svg></b>
                                <b>{{item.sortName}}</b></a></span>
                          </div>
                        </div>
                        <div class="topic-content">
                          <div v-html="item.content" class="topic-content-text"></div>
                        </div>
                        <div class="topic-footer">
                          <div class="topic-footer-left">
                            <button v-if="!item.isLike" @click="likeClickMains(item)" class="planettext ">
                              <i class="el-icon-caret-top"></i><span class="el-icon-caret-planettext">{{item.loveNum > 0
                              ? '\xa0' + item.loveNum + '\xa0\xa0赞' : '赞'}}</span><b></b>
                            </button>
                            <button v-else @click="likeClickMains(item)" class="planettext active">
                              <i class="el-icon-caret-top"></i><span class="el-icon-caret-planettext">{{item.loveNum > 0
                              ? item.loveNum + '赞' : '赞'}}</span><b></b>
                            </button>
                            <button v-if="!item.isLose" class="planettext" @click="LoseClickMains(item)">
                              <i class="el-icon-caret-bottom"></i>
                            </button>
                            <button v-else class="planettext active" @click="LoseClickMains(item)">
                              <i class="el-icon-caret-bottom"></i>
                            </button>
                            <span class="topic-date"><b><time class="b2timeago" datetime="2021-12-27 21:58:17"
                                  itemprop="datePublished"><span v-text="getTime(item.addTime)">
                                  </span> </time></b></span>
                            <!---->
                            <div class="topic-meta-more-box">
                              <el-popover placement="bottom" title="标题" width="200" trigger="hover"
                                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                                <button slot="reference" class="topic-date topic-meta-more">
                                  <i class="el-icon-more-outline"></i>
                                </button>
                              </el-popover>
                            </div>
                          </div>
                          <div class="topic-footer-right">
                            <el-button v-if="!item.isShow" icon="el-icon-caret-bottom" @click="setPullDown(item)"
                              size="small" type="success" plain>
                              <span><b>{{ item.commentNum }}</b>条讨论</span>
                            </el-button>
                            <el-button v-if="item.isShow" icon="el-icon-caret-top" @click="setPullDown(item)"
                              size="small" type="success" plain>
                              <span>收起评论</span>
                            </el-button>
                          </div>
                        </div>
                        <div v-show="item.isShow">
                          <div class="reply-box-root">
                            <el-input type="textarea" :rows="2" placeholder="写评论" v-model="postReplyForm.content">
                            </el-input>
                            <div class="form-group-button">
                              <el-button size="mini" class="replyBut" type="success" round
                                @click="setUpPostReply(item)">发布</el-button>
                            </div>
                          </div>
                          <div class="commentBox">
                            <div class="css-we6n55">
                              <div class="css-vpssrj">
                                <div class="css-1k10w8f">
                                  {{ item.commentNum }} 条评论
                                </div>
                              </div>
                            </div>
                            <div>
                              <p class="commentCons" v-if="comment.length == 0">
                                暂无评论，我来发表第一篇评论！
                              </p>
                              <div v-else>
                                <div class="comments" v-for="(item, index) in comment" :key="index">
                                  <div v-if="item">
                                    <div class="circle-contenr">
                                      <div class="topic-header">
                                        <div class="topic-header-left">
                                          <div class="topic-avatar">
                                            <el-avatar :src="item.profile"></el-avatar>
                                          </div>
                                          <div class="topic-name">
                                            <div>
                                              <div class="topic-name-data" v-once>
                                                <a target="_blank"><b>{{
                                                item.reviewers
                                                }}</b></a>
                                                <!---->
                                                <!---->
                                              </div>
                                              <div class="topic-user-lv">
                                                <p>
                                                  <span class="
                                                      lv-icon
                                                      user-vip
                                                      b2-vip3
                                                    "><i style="
                                                        border-color: #ff8223;
                                                      "></i><b style="color: #ff8223">永久会员</b></span>
                                                </p>
                                                <p>
                                                  <span class="
                                                      lv-icon
                                                      user-lv
                                                      b2-lv5
                                                    "><b>荣誉用户</b><i>lv5</i></span>
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div v-once class="topic-content">
                                      <div v-html="item.content" class="topic-content-text"></div>
                                    </div>
                                    <div class="topic-footer">
                                      <div class="topic-footer-left">
                                        <span v-once class="topic-date"><b><time class="b2timeago"
                                              datetime="2021-12-27 21:58:17" itemprop="datePublished"><span
                                                v-text="getTime(item.addTime)">
                                              </span> </time></b></span>
                                        <!---->
                                        <!-- <div class="topic-meta-more-box">
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
                                              <i
                                                class="el-icon-more-outline"
                                              ></i>
                                            </button>
                                          </el-popover>
                                        </div> -->
                                      </div>
                                      <div class="chat-dot-round">
                                        <span @click="setReplayPullDown(item)" class="comment-reply"><i
                                            class="iconfont icon-comment"></i><b>
                                            <span>回复</span>
                                          </b></span>
                                        <div>
                                          <span @click="likeClick(item)" v-if="!item.isLike" class="like">
                                            <i class="iconfont icon-like"></i>
                                            <span class="like-num">{{item.loveNum > 0 ? item.loveNum + '人赞' :
                                            '赞'}}</span>
                                          </span>
                                          <span @click="likeClick(item)" v-else class="like active">
                                            <i class="iconfont icon-like"></i>
                                            <span class="like-num">{{item.loveNum > 0 ? item.loveNum + '人赞' :
                                            '赞'}}</span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div v-show="item.isShow" class="reply-box">
                                      <el-input type="textarea" :rows="2" placeholder="请输入内容"
                                        v-model="postReplysForm.content">
                                      </el-input>
                                      <el-button size="mini" class="replyBut" type="success" round @click="
                                        setUpPostReplys(
                                          item.responderId,
                                          item.id,
                                          item.postId
                                        )
                                      ">发布</el-button>
                                    </div>
                                    <div class="comments" v-if="item.reply.length > 0">
                                      <div class="reply" v-for="reply in item.reply" :key="reply.id">
                                        <div class="circle-contenr">
                                          <div class="topic-header">
                                            <div class="topic-header-left">
                                              <div class="topic-avatar">
                                                <el-avatar :src="reply.profile"></el-avatar>
                                              </div>
                                              <div class="topic-name">
                                                <div>
                                                  <div v-if="
                                                    reply.responder != null && reply.responder != item.reviewers
                                                  " class="topic-name-data">
                                                    <a target="_blank"><b>{{ reply.reviewers }}{{ "\xa0" }} <i class="
                                                            el-icon-caret-right " style="
                                                            font-size: 12px;
                                                            font-weight: 500;
                                                          "></i>{{ "\xa0" }}{{ reply.responder}}</b></a>
                                                    <!---->
                                                    <!---->
                                                  </div>
                                                  <div v-else class="topic-name-data">
                                                    <a target="_blank"><b>{{
                                                    reply.reviewers
                                                    }}</b></a>
                                                    <!---->
                                                    <!---->
                                                  </div>
                                                  <div class="topic-user-lv">
                                                    <p>
                                                      <span class="
                                                          lv-icon
                                                          user-vip
                                                          b2-vip3
                                                        "><i style="
                                                            border-color: #ff8223;
                                                          "></i><b style="color: #ff8223">永久会员</b></span>
                                                    </p>
                                                    <p>
                                                      <span class="
                                                          lv-icon
                                                          user-lv
                                                          b2-lv5
                                                        "><b>荣誉用户</b><i>lv5</i></span>
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="topic-content">
                                          <div v-html="reply.content" class="topic-content-text"></div>
                                        </div>
                                        <div class="topic-footer">
                                          <div class="topic-footer-left">
                                            <span class="topic-date"><b><time class="b2timeago"
                                                  datetime="2021-12-27 21:58:17" itemprop="datePublished"><span v-text="
                                                    getTime(reply.addTime)
                                                  ">
                                                  </span> </time></b></span>
                                            <!---->
                                            <!-- <div class="topic-meta-more-box">
                                              <el-popover
                                                placement="bottom"
                                                title="标题"
                                                width="200"
                                                trigger="hover"
                                                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                                              >
                                                <button
                                                  slot="reference"
                                                  class="
                                                    topic-date topic-meta-more
                                                  "
                                                >
                                                  <i
                                                    class="el-icon-more-outline"
                                                  ></i>
                                                </button>
                                              </el-popover>
                                            </div> -->
                                          </div>
                                          <div class="chat-dot-round">
                                            <span @click="setReplaysPullDown(reply)" class="comment-reply"><i
                                                class="iconfont icon-comment"></i><b>
                                                <span>回复</span>
                                              </b></span>
                                            <div>
                                              <span @click="likeClicks(reply)" v-if="!reply.isLike" class="like">
                                                <i class="iconfont icon-like"></i>
                                                <span class="like-num">{{reply.loveNum > 0 ? reply.loveNum + '人赞' :
                                                '赞'}}</span>
                                              </span>
                                              <span @click="likeClicks(reply)" v-else class="like active">
                                                <i class="iconfont icon-like"></i>
                                                <span class="like-num">{{reply.loveNum > 0 ? reply.loveNum + '人赞' :
                                                '赞'}}</span>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div v-show="reply.isShow" class="reply-box">
                                          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="
                                            postReplysToUserForm.content
                                          ">
                                          </el-input>
                                          <el-button size="mini" class="replyBut" type="success" round @click="
                                            setUpPostReplysTouser(
                                              reply.responderId,
                                              item.id,
                                              reply.postId,
                                              reply.userId
                                            )
                                          ">发布</el-button>
                                        </div>
                                      </div>
                                    </div>
                                    <div></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-row>
                  </el-main>
                  <el-aside width="260px">
                    <section id="b2-widget-user-6" class="
                        mobile-hidden
                        widget
                        b2-widget-user
                        mg-b
                        box
                        b2-radius b2-radius-aside-right
                      ">
                      <div class="b2-widget-box">
                        <div id="user-widget" class="user-widget">
                          <div class="user-widget-content">
                            <div class="widget-gujia-user" style="display: none">
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
                                    念念不忘，必有回响
                                  </p>
                                  <p class="user-w-logon-titlep">
                                    尽情畅所欲言吧
                                  </p>
                                </div>
                                <div>
                                  <div class="oauth-login-button">
                                    <a href="javascript:void(0)" class="login-weixin">微信登录</a><a
                                      href="https://api.weibo.com/oauth2/authorize?client_id=2224666867&amp;response_type=code&amp;redirect_uri=https%3A%2F%2F7b2.com%2Fopen%3Ftype%3Dweibo"
                                      class="login-weibo">微博登录</a><a
                                      href="https://graph.qq.com/oauth2.0/authorize?client_id=101057247&amp;state=6b96c86f14fab2f3ce7af8fc5d72c943&amp;response_type=code&amp;redirect_uri=https%3A%2F%2F7b2.com%2Fopen%3Ftype%3Dqq"
                                      class="login-qq">QQ登录</a>
                                  </div>
                                </div>
                              </div>
                              <div class="user-w-announcement">
                                <div>
                                  <ul class="planet-aside-ul">
                                    <li class="planet-aside-li-ad">
                                      <b>通知：</b>
                                      <span href="#">这是一条公告1</span>
                                    </li>
                                    <li class="planet-aside-li-ad">
                                      <b>通知：</b>
                                      <span href="#">这是一条公告2</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div class="widget-mission-footer">
                              <a class="allad" href="https://7b2.com/announcement" target="_blank">全部公告</a>
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
        </div>
        <!-- <foot /> -->
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
</template>

<script>
import { createSquare, getAllSquare, likeClickComments } from "@/api/websquare";
import { formatDate } from "@/utils/date.js";
import { getCarousel } from "@/api/setting";
import { getPlanetIdComment, addPlanetComment, likeClickComment } from "@/api/WebSquareComment";
import {
  getSquareClasslist,
  getArticleClassByotherName,
} from "@/api/websquareClass";

import Tinymce from "@/components/Tinymce";
import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";
import top from "./components/Top.vue";
import foot from "./components/Foots.vue";

export default {
  name: "Home",
  components: {
    top, foot, Tinymce, VEmojiPicker
  },
  created() {
    //数据回填
    this.fetchData();
    //检测token是否有效
    this.getUserInfo();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData",
    
    MyEmoge(val) {
      // this.$router.go(0);
      this.postForm.content += val
    }
  },
  mounted() {
    this.getNextUser();
  },
  methods: {
    getNextUser() {
      window.onscroll = () => {
    var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
        // let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight) - document.body.scrollHeight;
       let bottomOfWindow = (scrollTop +windowHeight) - scrollHeight;
        // console.log(bottomOfWindow)
        if (bottomOfWindow == 0.5 || bottomOfWindow == 0) {
          this.page++;
          this.getSquare();
          // console.log("滚动条到底部的条件");
        }
      }
    },
    MainLock() {
      this.postForm.isLock = !this.postForm.isLock;
    },
    onSelectEmoji(emoji) {
      this.MyEmoge = emoji.data;
    },
    showemoge() {
      // console.log("show")
      this.showDialog = !this.showDialog;
    },
    LoseClickMains(item) {
      if (item.isLike) {
        item.isLike = false;
        item.loveNum--
      }
      if (!item.isLose) {
        this.$set(item, "isLose", false);
        item.isLose = !item.isLose;

      } else {
        item.isLose = !item.isLose;
      }
    },
    likeClickMains(item) {
      if (item.isLose) {
        item.isLose = false;
      }
      if (!item.isLike) {
        this.$set(item, "isLike", false);
        item.isLike = !item.isLike;
        likeClickComments(item.id).then((res) => {
        });
        item.loveNum++
      } else {
        item.loveNum--
        item.isLike = !item.isLike;
      }
    },
    likeClicks(item) {

      if (!item.isLike) {
        this.$set(item, "isLike", false);
        item.isLike = !item.isLike;
        likeClickComment(item.id).then((res) => {
        });
        item.loveNum++
      } else {
        item.loveNum--
        item.isLike = !item.isLike;
      }
    },
    likeClick(item) {
      if (!item.isLike) {
        this.$set(item, "isLike", false);
        item.isLike = !item.isLike;
        likeClickComment(item.id).then((res) => {
        });
        item.loveNum++
      } else {
        item.loveNum--
        item.isLike = !item.isLike;
      }
    },
    formatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd");
    },
    setUpPostReply(item) {
      this.postReplyForm.postId = item.id;
      const user = JSON.parse(window.localStorage.getItem("access-admin"));
      this.userJudje = user == null;
      if (this.userJudje) {
        console.log("未登陆");
        //显示需要登陆
        this.shownologin = true;
      } else {
        console.log("已登陆");
        this.postReplyForm.userId = this.user.userid;
        //显示需要登陆
        this.shownologin = false;
      }
      addPlanetComment(this.postReplyForm).then((res) => {
        this.postReplyForm.content = null;
      });
    },
    setUpPostReplys(userId, id, postId) {
      this.postReplysForm.postId = postId;
      this.postReplysForm.parentId = id;
      const user = JSON.parse(window.localStorage.getItem("access-admin"));
      this.userJudje = user == null;
      if (this.userJudje) {
        console.log("未登陆");
        //显示需要登陆
        this.shownologin = true;
      } else {
        console.log("已登陆");
        this.postReplysForm.userId = this.user.userid;
        //显示需要登陆
        this.shownologin = false;
      }
      addPlanetComment(this.postReplysForm).then((res) => {
        if (res.code == 0) {
          // this.$message.success("评论成功");
          this.fetchData();
        } else {
          // this.$message.error(res.msg);
        }
      });
    },
    setUpPostReplysTouser(usersId, id, postId, uId) {
      this.postReplysToUserForm.postId = postId;
      this.postReplysToUserForm.parentId = id;
      this.postReplysToUserForm.toUserId = uId;
      const user = JSON.parse(window.localStorage.getItem("access-admin"));
      this.userJudje = user == null;
      if (this.userJudje) {
        console.log("未登陆");
        //显示需要登陆
        this.shownologin = true;
      } else {
        console.log("已登陆");
        this.postReplysToUserForm.userId = this.user.userid;
        //显示需要登陆
        this.shownologin = false;
      }
      console.log(this.postReplysToUserForm);
      addPlanetComment(this.postReplysToUserForm).then((res) => {
        if (res.code == 0) {
          // this.$message.success("评论成功");
          this.fetchData();
        } else {
          // this.$message.error(res.msg);
        }
      });
    },
    setReplayPullDown(item) {
      if (!item.isShow) {
        this.$set(item, "isShow", false);
        item.isShow = !item.isShow;
      } else {
        item.isShow = !item.isShow;
      }
    },
    setReplaysPullDown(reply) {
      if (!reply.isShow) {
        this.$set(reply, "isShow", false);

        reply.isShow = !reply.isShow;
      } else {
        reply.isShow = !reply.isShow;
      }
    },
    setPullDown(item) {
      //设置this.commen为空
      this.comment = [];
      if (!item.isShow) {
        getPlanetIdComment(item.id).then((res) => {
          this.comment = res.data;
        });
        this.$set(item, "isShow", false);
        item.isShow = !item.isShow;
      } else {
        item.isShow = !item.isShow;
      }
    },
    getSquare() {
      //判断this.$route.params.square是否存在
      if (this.$route.params.square) {
        getArticleClassByotherName(this.$route.params.square).then(
          (response) => {
            this.planetInfo = response.data;
          }
        );
        //获取全部评论
        getAllSquare(this.$route.params.square, this.page, 6).then((response) => {
          console.log(response);
          this.squaredata = this.squaredata.concat(response.data.data)
        });
      } else {
        getArticleClassByotherName("circle").then((response) => {
          this.planetInfo = response.data;
        });
        //获取全部评论
        getAllSquare("circle", this.page, 6).then((response) => {
          this.squaredata = this.squaredata.concat(response.data.data)
        });
      }

    },
    fetchData() {
      //数据置空
      this.squaredata = [];
      this.getSquare();
      //获取当前this.$route.params.square的数据

      //获取星球列表
      getSquareClasslist().then((res) => {
        this.classlist = res.data;
      });
    },
    sitmap() {
      if (this.$route.params.square) {
        createSquare(this.postForm, this.$route.params.square).then((response) => {
          this.fetchData();
          this.postForm.content = null;
        });
      } else {
        createSquare(this.postForm, "circle").then((response) => {
          this.fetchData();
        });
      }

    },
    //时间如果是最近一天，则显示时间，如果是最近一周，则显示周几
    getTime(time) {
      let now = new Date();
      let nowTime = now.getTime();
      let timeTime = new Date(time).getTime();
      let timeDiff = nowTime - timeTime;
      let dayDiff = Math.floor(timeDiff / (24 * 3600 * 1000));
      let weekDiff = Math.floor(timeDiff / (24 * 3600 * 1000 * 7));
      let monthDiff = Math.floor(timeDiff / (24 * 3600 * 1000 * 30));
      let yearDiff = Math.floor(timeDiff / (24 * 3600 * 1000 * 365));
      //如果时间在最近一天显示小时
      if (dayDiff == 0) {

        //显示分钟
        if (Math.floor(timeDiff / (3600 * 1000)) == 0) {
          if (Math.floor(timeDiff / (60 * 1000)) == 0) {
            return "刚刚";
          } else {
            return Math.floor(timeDiff / (60 * 1000)) + "分钟前";
          }
        } else { return Math.floor(timeDiff / (3600 * 1000)) + "小时前"; }
      } else if (dayDiff == 1) {
        return "昨天";
      } else if (dayDiff == 2) {
        return "前天";
      } else if (dayDiff > 2 && dayDiff < 7) {
        return "最近一周";
        return formatDate(data, "yyyy-MM-dd");
      } else if (dayDiff >= 7 && dayDiff < 30) {
        return "一个月内";
        return formatDate(data, "yyyy-MM-dd");
      } else if (dayDiff >= 30 && dayDiff < 60) {
        return "一个月前";
        return formatDate(data, "yyyy-MM-dd");
      } else if (dayDiff >= 60 && dayDiff < 90) {
        return "二个月前";
        return formatDate(data, "yyyy-MM-dd");
      } else if (dayDiff >= 90 && dayDiff < 120) {
        return "三个月前";
        return formatDate(data, "yyyy-MM-dd");
      } else if (dayDiff >= 120 && dayDiff < 160) {
        return "四个月前";
        return formatDate(data, "yyyy-MM-dd");
      } else if (dayDiff >= 160 && dayDiff < 180) {
        return "五个月前";
        return formatDate(data, "yyyy-MM-dd");
      } else if (dayDiff >= 180 && dayDiff < 210) {
        return "六个月前";
        return formatDate(data, "yyyy-MM-dd");
      } else if (dayDiff >= 240 && dayDiff < 270) {
        return "七个月前";
        return formatDate(data, "yyyy-MM-dd");
      } else if (dayDiff >= 300 && dayDiff < 330) {
        return "八个月前";
        return formatDate(data, "yyyy-MM-dd");
      } else if (dayDiff >= 330 && dayDiff < 365) {
        return "九个月前";
        return formatDate(data, "yyyy-MM-dd");
      } else if (dayDiff >= 365) {
        let data = new Date(time);
        return formatDate(data, "yyyy-MM-dd");
      }
    },
    getUserInfo() {
      const user = JSON.parse(window.localStorage.getItem("access-admin"));
      this.userJudje = user == null;
      if (this.userJudje) {
        console.log("未登陆");
        //显示需要登陆
        this.shownologin = true;
      } else {
        console.log("已登陆");
        this.user = user.data;
        this.postForm.author = this.user.userid;
        //显示需要登陆
        this.shownologin = false;
      }
    },
  },

  data() {
    return {
      page: 1,
      MyEmoge: "",
      showDialog: false,
      planetInfo: {},
      classlist: "",
      //二级回复
      postReplysToUserForm: {
        content: "",
        parentId: "",
        userId: "",
        toUserId: "",
        postId: "",
      },
      //一级回复
      postReplysForm: {
        content: "",
        parentId: "",
        userId: "",
        postId: "",
      },
      //一级评论
      postReplyForm: {
        content: "",
        parentId: "",
        userId: "",
        postId: "",
      },
      squaredata: [],
      //星球
      postForm: {
        isLock: false,
        content: "",
        author: "",
        sortClass: "",
      },
      shownologin: false,
      acticve: "nav-link active",
      comment: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

body>.el-container {
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
  margin-right: 12px;
  margin-left: 86px;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
}

.PutContentBut {
  margin-top: 10px;
  display: flex;
}

.circle-desc {
  display: flex;
}

.reply {
  margin: 15px 0 10px 34px;
}

.commentBox {
  margin: 10px;
}

.commentBox {
  border: 1px solid rgb(235, 235, 235);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.css-we6n55 {
  border-bottom: 1px solid rgb(235, 235, 235);
  box-sizing: border-box;
  margin-top: 0px;
  min-width: 0px;
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  padding-left: 20px;
  padding-right: 20px;
  height: 50px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  display: flex;
}

.css-vpssrj {
  box-sizing: border-box;
  margin-top: 0px;
  min-width: 0px;
  font-size: 15px;
  color: rgb(68, 68, 68);
  font-weight: 600;
}

.topic-footer-left {
  margin-left: 30px;
}

.topic-footer {
  padding: 15px 20px 0px;
}

.reply-box {
  margin-top: 10px;
  margin-left: 68px;
  margin-right: 10px;
}

.replyBut {
  margin-left: auto;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.commentCons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.reply-box-root {
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  margin-left: 50px;
  margin-top: 8px;
}

.form-group-button {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}

.postFormDiv {
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  margin-top: 10px;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: flex-start;
}

.avatar {
  margin-left: 5px;
  margin-right: 7px;
}

.PlanetListItems {
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
}

.PlanetListItem-img {
  margin-top: 5px;
  padding: 4px;
}

.PlanetListItem:hover {
  box-shadow: 0px 0px 2px #ccc;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: #f5f6f7;
  border-radius: 4px;
}

.planetTitletext {
  font-size: 15px;
  font-weight: 600;
  margin-left: 5px;
}

.PlanetListCare {
  margin-top: 5px;
}

.b2-widget-circle-info .user-w-announcement {
  padding: 0 0px;
}

.planet-aside-li-ad {
  margin-left: 10px;
  margin-left: 20px;
  padding: 8px;
  font-size: 13px;

  font-style: inherit;
  font-weight: inherit;
  color: inherit;
}
</style>
<style lang="scss">
.active {
  color: #409EFF;
}

.chat-dot-round {

  display: flex;
  align-items: center;
  font-size: 14px;
  color: #909399;

  .like {
    display: flex;
    align-items: center;
    margin-left: 8px;
    cursor: pointer;

    &.active,
    &:hover {
      color: #409EFF;
    }

    .iconfont {
      font-size: 14px;
      margin-right: 5px;
    }
  }

  .comment-reply {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: #333;
    }

    .iconfont {
      font-size: 16px;
      margin-right: 5px;
    }
  }
}

.active {
  color: #3E9EFF;

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

/* .myVEmojiPicker ::v-deep .grid-emojis[data-v-5c988bee] {
  background: #ffffff;
}
.myVEmojiPicker ::v-deep .emoji-picker[data-v-f1d527bc] {
  --ep-color-bg: #ffffff;
  --ep-color-sbg: none;
} */
/* .myVEmojiPicker {
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 390px;
  bottom: 20px;
  z-index: 10;
} */
.myVEmojiPicker ::v-deep .emoji-picker[data-v-f1d527bc] {
  background-color: #FFFFFF;
  border-radius: 0px;
}

.myVEmojiPicker ::v-deep .emoji-picker[data-v-f1d527bc] {
  --ep-color-border: #FFFFFF;
  --ep-color-bg: #FFFFFF;
}

.leftMenu {
  display: flex;
}

.nav-links {
  margin-left: 8px;
  font-weight: 900;
  ;
  font-size: 19px;
}

.p-0 {

  display: flex;
  padding: 0 !important;
  align-content: center;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
}
@media screen and (max-width:991px){
  .el-aside{display:none; }
}

</style>