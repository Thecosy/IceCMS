<template>
  <div class="post">
    <div id="__nuxt" data-server-rendered="true">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message3="acticve" />
          <div class="overflow-hidden">
            <div class="article-details white bg layout-min-full-height">
              <div class="py-6">
                <div class="article-details-fg">
                  <div class="article-banner">
                    <!-- <div class="imgBox">
                      <img alt="" />
                    </div> -->
                    <div class="section-head">
                <!-- <h2 class="heading-secondary">Lifestyle</h2> -->
                <ul class="c-bredcrumb">
                    <li><a href="#">主页 </a></li>
                    <li><a href="#">文章</a></li>
                    <li><a href="#">当前文章</a></li>
                </ul>
            </div>
                  </div>
                  <div class="article-contents">
                    <!-- <h1 id="article-top" class="b-0 mt-0 pb-0 mb-15">
                      {{ this.title }}
                    </h1>
                    <div class="d-flex mb-6 align-items-center">
                      <img
                        :src="profile"
                        class="w-50 mw-50 h-50 b-0 circle m-0 mr-4"
                      />
                      <div class="flex">
                        <h4 class="mb-0 mt-0">{{ this.author }}</h4>
                        <p class="mb-0 py-0 fs-14">
                          {{ this.addTime }} 阅读 {{ this.hits }}
                        </p>
                      </div>
                    </div>
                    <blockquote class="blockquote">
                      <div class="text-muted">
                        {{ this.intro }}
                      </div>
                    </blockquote>
                    <div class=".image-header-side">
                      <div class="imgBox">
                        <img
                          class="image-header"
                          alt=""
                          :data-src="thumb"
                          :src="thumb"
                          lazy="loaded"
                        />
                      </div>
                    </div>
                    <div class="content-markdown"> -->
                      <!-- 内容区域 -->
                     <div class="row gy-5">
                     <div class="col-lg-9">
                          <div class="left-content">
                        <!-- Post card -->
                        <div class="post-card">
                            <div >
                            <img class="card-thumb bg-cover" src="../static/img/post1.png" />
                            </div>
                            <div class="card-content">
                                <div class="card-meta mar-top">
                                    <div class="meta-item post-author"><span class="categorys">分类</span><a href="#"
                                            class="author-name">{{this.author}}</a></div><span class="meta-item">{{this.addTime}} </span><span class="meta-item"><i class="el-icon-chat-line-square"></i>13
                                    </span><span class="meta-item">{{this.hits}}点击</span><span class="meta-item"><i class="el-icon-share"></i></span>
                                </div>
                                <div class="post-content">
                                    <div>
                                        <h5 class="heading-primary">{{this.title}}</h5>
                                        <!-- Post quote -->
                                          <div v-show="this.intro" class="post-quote">
                                              <p class="body-text">{{this.intro}}</p>
                                              <div class="quote-bottom"><a href="#" class="author">{{this.author}}</a><span
                                                      class="gradient-bar small"></span></div><img class="quote-icon"
                                                  src="../static/img/quote-icon.png" alt="">
                                          </div>
                                            <div class="article-content ">
                                          <div class="post-txt" id="sidelist" v-html="this.content"></div>
                                          </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   <!-- Tags -->
                        <div class="tags">
                            <h3 class="heading-tertiary">文章标签</h3>
                            <div class="categories-tags"><a v-for="item in Mytag" :key="item.id"  :href="'/post/' + item + '/all'">{{item}} </a>
                             </div>
                        </div><!-- Post navigation -->
                        <div class="post-navigation">
                          <router-link :to="'/post/' + preArticle.id">
                            <div class="nav-prev">
                              <div  class="nav-button-left">
                              <span><img src="../static/img/long-arrow-2.png" alt="arrow"></span>
                                             <span>上一篇 </span> </div>
                                <div class="nav-post">
                                        <h3 class="heading-tertiary">{{preArticle.title}}</h3>
                                   <span class="date body-text">{{formatDate(preArticle.addTime)}}</span></div>
                            </div>
                          </router-link>
                              <router-link :to="'/post/' + nextArticle.id">

                            <div class="nav-next"><div class="nav-button-right">下一篇 <span><img
                                            src="../static/img/long-arrow.png" alt="arrow"></span></div>
                                <div class="nav-post">
                                        <h3 class="heading-tertiary">{{nextArticle.title}}</h3>
                                    <span class="date body-text">{{formatDate(nextArticle.addTime)}}</span></div>
                            </div>
                              </router-link>
                        </div><!-- Comments -->
                        <!-- <div class="post-comments">
                            <h3 class="heading-secondary">Comments(3)</h3>
                            <div class="comment-card">
                                <div class="card-top">
                                    <div class="card-meta">
                                        <div class="meta-item post-author">
                                            <div class="author-avatar bg-cover" style="
                                                        background-image: url('../static/img/post-author1.png');
                                                    "></div><a href="#" class="author-name">Terence Whittle</a>
                                        </div><span class="meta-item">Feb 06,2022 </span><span class="meta-item">6:15
                                            pm</span>
                                    </div><a href="#" class="button button-replay"><span><img
                                                src="../static/img/corner-left-down.png" alt=""></span>Replay </a>
                                </div>
                                <p class="body-text">My hands really liked it,it was absorbed easily and
                                    quickly,creating a feeling of hydration. And my hands really liked it,it was
                                    absorbed easily and quickly,creating a feeling of hydration. </p>
                            </div>
                            <div class="comment-card replay">
                                <div class="card-top">
                                    <div class="card-meta">
                                        <div class="meta-item post-author">
                                            <div class="author-avatar bg-cover" style="
                                                        background-image: url('../static/img/post-author1.png');
                                                    "></div><a href="#" class="author-name">Ruqayyah Povey</a>
                                        </div><span class="meta-item">Feb 06,2022 </span><span class="meta-item">6:15
                                            pm</span>
                                    </div><a href="#" class="button button-replay"><span><img
                                                src="../static/img/corner-left-down.png" alt=""></span>Replay </a>
                                </div>
                                <p class="body-text">My hands really liked it,it was absorbed easily and
                                    quickly,creating a feeling of hydration. And my hands really liked it,it was
                                    absorbed easily and quickly,creating a feeling of hydration. </p>
                            </div>
                            <div class="comment-card">
                                <div class="card-top">
                                    <div class="card-meta">
                                        <div class="meta-item post-author">
                                            <div class="author-avatar bg-cover" style="
                                                        background-image: url('../static/img/post-author1.png');
                                                    "></div><a href="#" class="author-name">Said Mclean</a>
                                        </div><span class="meta-item">Feb 06,2022 </span><span class="meta-item">6:15
                                            pm</span>
                                    </div><a href="#" class="button button-replay"><span><img
                                                src="../static/img/corner-left-down.png" alt=""></span>Replay </a>
                                </div>
                                <p class="body-text">My hands really liked it,it was absorbed easily and
                                    quickly,creating a feeling of hydration. And my hands really liked it,it was
                                    absorbed easily and quickly,creating a feeling of hydration. </p>
                            </div>
                        </div>
                        <div class="comment-box">
                            <h3 class="heading-secondary">Post a comment</h3>
                            <form class="comment-form">
                                <div class="row">
                                    <div class="col-md-4"><input type="text" placeholder="Your Name"></div>
                                    <div class="col-md-4"><input type="email" placeholder="Your Email"></div>
                                    <div class="col-md-4"><input type="text" placeholder="+1 (___) __ __ ___"></div>
                                    <div class="col-12"><textarea placeholder="Enter your comment"></textarea></div>
                                </div><button class="button button-primary">Post Comment</button>
                            </form>
                        </div> -->
                        <!-- ============= AD CAMPAIGN-2 ============= -->
                        <!-- <div class="ad-campaign-2 bg-cover mt-100"
                            style="background-image: url('../static/img/add-campign-3.png')">
                            <div class="row">
                                <div class="col-lg-6"></div>
                                <div class="col-lg-6">
                                    <div class="right-content">
                                        <div class="content"><span class="discount">20% off</span>
                                            <h2 class="heading-primary">Home furniture</h2>
                                        </div><a href="#" class="button icon-button active"><span class="icon"><i
                                                    class="fas fa-chevron-right"></i></span></a>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="right-content">
                        <!-- Widget search box -->
                        <div class="widget-search-box"><input type="text" v-model="seachcontent"  placeholder="输入内容">
                      <button
                      @click="queryssubmit()"
                    class="search-btn"
                  >
                    <i class="el-icon-search"></i>
                  </button>
                          </div>
                        <h3 class="heading-tertiary">推荐文章</h3>
                        <div v-for="item in newArticle" :key="item.id" class="recent-post-card">
                          <a href="">
                            <div>
                            <img class="card-thumb bg-cover" :src="item.thumb"  />
                            </div>
                            <div class="card-content">
                                <div class="post-meta"><span class="meta-item">{{item.author}} </span>
                                
                                <span  v-if="item.createTime != null"  class="meta-item"> {{formatDate(item.createTime)}} </span>
                                  <span  v-else  class="meta-item"> {{formatDate(item.addTime)}} </span>
                                <span class="meta-item"><i class="el-icon-chat-line-square"></i>{{item.hits}} </span>
                                </div>
                                    <h3 class="heading-secondary">{{item.title}}</h3>                      
                            </div>
                          </a>
                        </div>
                       <!-- Widget category -->
                        <div class="widget-categories">
                            <h3 class="heading-tertiary">标签云</h3>
                            <div class="categories-tags">
                              <a v-for="item in taglist" :key="item.id" 
                              :href="'/post/' + item.tagName + '/all'" >{{item.tagName}} </a>
                            </div>
                        </div><!-- Widget ad banner -->
                        <div class="widget-ad-banner bg-cover"
                            style="">
                            <div class="content"><span class="discount">20% off</span>
                                <h2 class="heading-secondary">会员折扣</h2>
                                <p class="body-text">开通会员享受更多优惠</p><a href="#"
                                    class="button icon-button active"><span><i
                                            class="el-icon-caret-right"></i></span></a>
                            </div>
                        </div><!-- Widget social profile -->
                        <div class="widget-social-profile">
                             <h3 class="heading-tertiary mb-20">关注我们</h3>
                            <p class="body-text">找到更多</p>
                            <div class="social-items"><a href="#" class="social-link"><span class="icon"><i
                                            class="el-icon-lollipop"></i>
                                            </span></a><a href="#"
                                    class="social-link"><span class="icon"><i
                                            class="el-icon-ice-cream-square"></i></span></a><a href="#"
                                    class="social-link"><span class="icon"><i class="el-icon-lollipop"></i></span></a>
                            </div>
                        </div><!-- Widget popular post -->
                        <!-- Widget popular post -->
                        <div class="widget-popular-post mt-30">
                            <h3 class="heading-tertiary mb-20">热门文章</h3><!-- Cat item -->
                            <div  v-for="item in newArticle" :key="item.id" class="widget-category">
                              <router-link
                              :to="'/post/' + item.id"
                            >

                                    <img class="cat-thumb bg-cover" :src="item.thumb" />
                                  </router-link>
                                  <router-link
                              :to="'/post/' + item.id"
                            >
                                <div class="cat-content"><a href="#">
                                        <h4 class="cat-title">{{item.title}}</h4>
                                    </a>
                                    <div class="cat-meta">
                                             <span  v-if="item.createTime != null"  class="post-date meta-item"> {{formatDate(item.createTime)}} </span>
                                  <span  v-else  class="post-date meta-item"> {{formatDate(item.addTime)}} </span>
                                  <span
                                            class="meta-item comment"><i class="el-icon-chat-line-square"></i>{{item.hits}} </span></div>
                                </div>
                              </router-link>
                            </div><!-- Cat item -->
                           <!-- Cat item -->
                        </div>
                    </div>
                </div>
            </div>
                      <!-- <div id="sidelist" v-html="this.content"></div> -->
                      <side-catalog class="catalog" v-bind="catalogProps">
                        <template #default="{ isActive }">
                          <i
                            :class="[
                              'line-style',
                              isActive ? 'line-style--active' : '',
                            ]"
                          ></i>
                        </template>
                      </side-catalog>
                      <div class="catalogleft">
                        <aside
                          class="crayons-layout__sidebar-left"
                          aria-label="Article actions"
                        >
                          <div class="crayons-article-actions print-hidden">
                            <div
                              style="
                                margin-bottom: 20px;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                              "
                              class="crayons-article-actions__inner"
                            >
                              <button
                                @click="loveClick()"
                                id="reaction-butt-like"
                                aria-label="Like"
                                aria-pressed="false"
                                class="
                                  reaction-butt-
                                  sogood
                                  crayons-reaction crayons-reaction--like
                                  activated
                                "
                                data-category="like"
                                title="Heart"
                              >
                               <span
                               v-if="!lovecheck"
                                  class="
                                    crayons-reaction__icon
                                    crayons-reaction__icon--inactive
                                  "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    
                                    aria-hidden="true"
                                    class="crayons-icon"
                                  >
                                    <path
                                       
                                      d="M21.179 12.794l.013.014L12 22l-9.192-9.192.013-.014A6.5 6.5 0 0112 3.64a6.5 6.5 0 019.179 9.154zM4.575 5.383a4.5 4.5 0 000 6.364L12 19.172l7.425-7.425a4.5 4.5 0 10-6.364-6.364L8.818 9.626 7.404 8.21l3.162-3.162a4.5 4.5 0 00-5.99.334l-.001.001z"
                                    ></path>
                                  </svg>
                                </span>
                                <span
                                v-else
                                  class="
                                    crayons-reaction__icon
                                    crayons-reaction__icon--inactive
                                  "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    
                                    aria-hidden="true"
                                    class="crayons-icon"
                                  >
                                    <path
                                       fill="red"
                                      d="M21.179 12.794l.013.014L12 22l-9.192-9.192.013-.014A6.5 6.5 0 0112 3.64a6.5 6.5 0 019.179 9.154zM4.575 5.383a4.5 4.5 0 000 6.364L12 19.172l7.425-7.425a4.5 4.5 0 10-6.364-6.364L8.818 9.626 7.404 8.21l3.162-3.162a4.5 4.5 0 00-5.99.334l-.001.001z"
                                    ></path>
                                  </svg>
                                </span>
                                <span
                                v-if="!lovecheck"
                                  class="crayons-reaction__count"
                                  id="reaction-number-like"
                                  >{{loveNum}}</span
                                >
                                <span
                                v-else
                                style="color:red"
                                  class="crayons-reaction__count"
                                  id="reaction-number-like"
                                  >{{loveNum}}</span
                                >
                              </button>

                              <button
                                style=""
                                id="reaction-butt-unicorn"
                                aria-label="React with unicorn"
                                aria-pressed="false"
                                class="
                                   reaction-butt-
                                  make
                                  crayons-reaction crayons-reaction--unicorn
                                "
                                data-category="unicorn"
                                title="Unicorn"
                              >
                                <span
                                  class="
                                    crayons-reaction__icon
                                    crayons-reaction__icon--inactive
                                  "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    role="img"
                                    aria-hidden="true"
                                    class="crayons-icon"
                                  >
                                    <path
                                      d="M5.645 8.013c.013-.265-.261-.323-.4-.183-1.16 1.17-1.822 3.865-.344 7.32.294.961 1.938 3.19.84 6.131l-.003.006c-.094.255.206.404.366.263 1.395-1.226 1.933-3.593 1.1-6.375-.488-1.657-1.955-4.226-1.559-7.162zm-3.22 2.738c.05-.137-.124-.417-.326-.225-.939.893-1.316 2.863-.976 4.605.547 2.878 2.374 3.526 2.066 6.629-.028.102.176.38.348.154 1.546-2.033.409-4.453-.241-6.006-1.005-2.386-1.087-4.118-.871-5.157z"
                                      fill="#08090A"
                                    ></path>
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M13.622 7.223l8.579-3.68c.598-.256 1.087.547.6.985l-6.618 5.941c.881 2.043 2.738 6.34 2.931 6.775 1.348 3.031-2.055 4.918-3.807 3.583a7.027 7.027 0 01-.623-.574c-.974-.965-2.419-2.398-5.207-1.877.284-2.115-.313-3.737-.883-5.288-.38-1.032-.747-2.032-.837-3.124-.346-3.329 3.763-8.23 4.696-7.953.386.115.326 1.229.266 2.319-.051.948-.102 1.88.143 2.12.145.142.428.43.76.773zM11.5 16.5l2.5.5 2.5 2 1-.5-2-4.5-1.5-4-1.5-1-1-1-1-1.5L10 8l-.5 1.5 1 2.5 1 4.5z"
                                    ></path>
                                  </svg>
                                </span>
                                <span
                                  class="crayons-reaction__count"
                                  id="reaction-number-unicorn"
                                  >0</span
                                >
                              </button>

                              <button
                                id="reaction-butt-readinglist"
                                aria-label="Add to reading list"
                                aria-pressed="false"
                                class="
                                reaction-butt-
                                  collect
                                  crayons-reaction crayons-reaction--readinglist
                                "
                                data-category="readinglist"
                                title="Save"
                              >
                                <span
                                  class="
                                    crayons-reaction__icon
                                    crayons-reaction__icon--inactive
                                  "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    aria-hidden="true"
                                    class="crayons-icon"
                                  >
                                    <path
                                      d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1zm13 2H6v15.432l6-3.761 6 3.761V4z"
                                    ></path>
                                  </svg>
                                </span>
                                <span
                                  class="crayons-reaction__count"
                                  id="reaction-number-readinglist"
                                  >0</span
                                >
                              </button>

                              <div
                                id="mod-actions-menu-btn-area"
                                class="print-hidden hidden align-center"
                              ></div>
                              <div class="align-center m:relative">
                                <button
                                  id="article-show-more-button"
                                  aria-controls="article-show-more-dropdown"
                                  aria-expanded="false"
                                  aria-haspopup="true"
                                  class="
                                  reaction-butt-
                                    more
                                    dropbtn
                                    crayons-btn
                                    crayons-btn--ghost-dimmed
                                    crayons-btn--icon-rounded
                                  "
                                  aria-label="Share post options"
                                  data-initialized="true"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    role="img"
                                    aria-labelledby="a6r3b1dohi4el9rjyuy41avu2a0sm5bz"
                                    aria-hidden="true"
                                    class="crayons-icon dropdown-icon"
                                  >
                                    <title
                                      id="a6r3b1dohi4el9rjyuy41avu2a0sm5bz"
                                    >
                                      More...
                                    </title>
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M7 12a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0zm5 2a2 2 0 100-4 2 2 0 000 4z"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </aside>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!---->
              <!---->
              <!-- v-on:click="show = !show"
                v-if="!show" -->
              <div class="myVEmojiPicker">
                <VEmojiPicker
                  v-show="showDialog"
                  :style="{ width: '340px', height: '200' }"
                  labelSearch="Search"
                  lang="pt-BR"
                  @select="onSelectEmoji"
                />
              </div>
              <!-- 后台控制是否显示评论 -->
              <div v-if="!this.glabledata.glableCommentShow">
              <div v-show="!judjeComment">
                <section
                  v-if="mycomment"
                  @click="sendMsg"
                  class="
                    fiexd-comments-bar
                    d-flex
                    align-items-center
                    is-scroll
                    macwk-animation
                    slow
                    pc-model
                    tinRightIn
                  "
                >
                  <div
                 
                    class="
                      d-flex
                      align-items-center
                      fs-20
                      fw-700
                      cursor-pointer
                      w-full
                      pl-3
                    "
                  >
                    <div class="flex">
                      共
                      <span class="fs-36 mx-1">{{ this.commentnum }}</span>
                      条评论
                    </div>
                    <svg
                      color="inherit"
                      viewbox="0 0 32 32"
                      class="w-32"
                      style="
                        width: 1.5em;
                        height: 1.5em;
                        font-size: 2rem;
                        vertical-align: -6px;"
                    >
                      <path
                        fill="#FFFFFF"
                        d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"
                      ></path>
                      <path
                        d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z"
                        class="comment-icon-path"
                      ></path>
                    </svg>
                  </div>
                </section>
              </div>
              </div>
              <comment
                :articleId="this.$route.params.id"
                :theEmoge="this.MyEmoge"
                ref="child"
                @closethecpmmentName="updateDate()"
                @openthecpmmentName="showemoge()"
              />
            </div>
          </div>
          <foot/>

          <div infos="0">
            <div
              class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "
            >
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";

import Prismjs from "prismjs"; //引入插件
import {
  getArticleById,
  FindProfileByName,
  viewarticle,
  lovearticle,
  getNewArticle,
  getPrenewsArticle,
  getLastnewsArticle,
} from "@/api/webarticle";
import { getArticleCommentnum } from "@/api/webarticleComment";

import "vue-side-catalog/lib/vue-side-catalog.css";
import SideCatalog from "vue-side-catalog";
import Sticky from "@/components/Sticky";

import { getAllTag, getTagByList } from "@/api/weballtag";

import top from "./components/Top.vue";
import foot from "./components/Foots.vue";
import comment from "./components/Comment.vue";

import { formatDate } from "@/utils/date.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Post",
  components: {
    SideCatalog,
    top,
    foot,
    comment,
    Sticky,
    Prismjs,
    VEmojiPicker,
  },
  computed: {
    ...mapState(["playlist", "glabledata", "count"]),
  },
  created() {
    //数据回填
    this.fetchData(this.$route.params.id);
    //获取文章评论数量
    getArticleCommentnum(this.$route.params.id).then((resp) => {
      this.commentnum = resp.data;
    });
    getAllTag().then((resp) => {
        //获取标签
        this.taglist = resp.data;
      });
    //文章浏览量+1，临时
    viewarticle(this.$route.params.id).then((resp) => {});
  },
  mounted() {
    setTimeout(() => {
      prismjs.highlightAll();
    }, 20000);
    //下面这行代码解决prismjs不能异步加载必须刷新一下才显示的问题
    process.browser&&document.querySelectorAll("pre code").forEach((block) => Prism.highlightElement(block));
  },

  methods: {
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
        console.log(this.fundByresource)
        //   直接调用$router.push 实现携带参数的跳转
        this.$router.push({
          path: `/post/${this.seachcontent}/all`,
        })
       
      }
    },
    formatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd  ");
    },
    loveClick() {
      if (!this.lovecheck) {
        if (this.firstLoveFlag) {
          lovearticle(this.$route.params.id).then((resp) => {});
          this.firstLoveFlag = false;
        }
        this.$notify({
          title: "点赞成功👍",
          message: "您的赞我们已经收到",
          type: "success",
          offset: 50,
        });
        this.loveNum += 1;
        this.lovecheck = true;
      } else {
        this.$notify({
          title: "取消点赞",
          message: "已取消点赞",
          type: "success",
          offset: 50,
        });
        this.loveNum -= 1;
        this.lovecheck = false;
      }
    },
    onSelectEmoji(emoji) {
      this.MyEmoge = emoji.data;
    },
    showemoge() {
      // console.log("show")
      this.showDialog = !this.showDialog;
    },
    sendMsg() {
      this.$refs.child.getMsg("true");
      this.mycomment = false;
    },
    updateDate() {
      //关闭表情
      this.showDialog = false;
      // console.log(data.show)
      this.mycomment = true;
      // console.log("调用了父组件的方法")
      // this.show1 = data.show;
      //改变了父组件的值
      // console.log('toCity:'+this.show1)
    },
    fetchData(id) {
      getArticleById(id).then((resp) => {
        // console.log(resp.data.intro);
        this.thumb = resp.data.thumb;
        this.title = resp.data.title;
        this.loveNum = resp.data.loveNum;
        this.author = resp.data.author;
        if (resp.data.commentDisabled == "true") {
          this.judjeComment = true;
        }
        FindProfileByName(this.author).then((resp) => {
          this.profile = resp.data;
        });
        //目录加载需要延时
        setTimeout(() => {
          this.content = resp.data.content;
          //代码高亮
          this.$nextTick(() => {
            Prism.highlightAll();
          });
        }, 500);
        //Prism.highlightAll()需要写在this.$nextTick()中，

        if (resp.data.createTime != null) {
          this.addTime = resp.data.createTime;
        } else {
          this.addTime = resp.data.addTime;
        }
        this.intro = resp.data.intro;
        this.hits = resp.data.hits;
        JSON.parse(resp.data.keyword).forEach((item) => {
          getTagByList(item).then((resp) => {
            this.Mytag.push(resp.data.tagName);
        });
        });
      });
      getNewArticle(2).then((resp) => {
        this.newArticle = resp.data;
      });
      getPrenewsArticle(id).then((resp) => {
        this.preArticle.title = resp.data.title;
        this.preArticle.id = resp.data.id;
        if(resp.data.createTime != null){
          this.preArticle.addTime = resp.data.createTime;
        } else {
          this.preArticle.addTime = resp.data.addTime;
        }
      });
      getLastnewsArticle(id).then((resp) => {
        this.nextArticle.title = resp.data.title;
        this.nextArticle.id = resp.data.id;
        if(resp.data.createTime != null){
          this.nextArticle.addTime = resp.data.createTime;
        } else {
          this.nextArticle.addTime = resp.data.addTime;
        }
      });
    },
  },
  data() {
    return {
      preArticle: {
        title: "",
        addTime: "",
        id: "",
      },
      nextArticle: {
        title: "",
        addTime: "",
        id: "",
      },
      Mytag: [],
      taglist: [],
      seachcontent: "",
      newArticle: [],
      firstLoveFlag: true,
      lovecheck: false,
      loveNum: "",
      judjeComment: false,
      profile: "",
      thumb: "",
      MyEmoge: "",
      showDialog: false,
      commentnum: "",
      mycomment: true,
      show1: "",
      acticve: "nav-link active",
      catalogProps: {
        // 内容容器selector(必需)
        container: "#sidelist",
        height: "calc(100% - 100px)",
        iconLeft: true,
        lineLeft: 0,
        watch: true,
      },
      intro: "",
      addTime: "",
      hits: "",
      author: "",
      content: "",
      title: "",
      show: false,
    };
  },
};
</script>
<style scoped>
  @import "../static/mycss/blog.css";
  </style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post-txt {
    font-size: 19px;
    font-weight: 440;
    color: #27222b;
    margin-top: 0;
    margin-bottom: 1rem;
}
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

.sogood {
  border-radius: 20px 20px 20px 20px;
  transition: background-color 0.5s linear 0s;
  /* 在原本元素上再加一个transition */
  transition: all 0.5s linear 0s;
}
.make {
  border-radius: 20px 20px 20px 20px;
  transition: background-color 0.5s linear 0s;
  /* 在原本元素上再加一个transition */
  transition: all 0.5s linear 0s;
}
.collect {
  border-radius: 20px 20px 20px 20px;
  transition: background-color 0.5s linear 0s;
  /* 在原本元素上再加一个transition */
  transition: all 0.5s linear 0s;
}
.more {
  border-radius: 20px 20px 20px 20px;
  transition: background-color 0.5s linear 0s;
  /* 在原本元素上再加一个transition */
  transition: all 0.5s linear 0s;
}
.sogood:hover {
  background-color: red;
  border-radius: 20px 20px 20px 20px;
}
.make:hover {
  background-color: rgb(0, 110, 255);
  border-radius: 20px 20px 20px 20px;
}
.collect:hover {
  background-color: rgb(255, 153, 0);
  border-radius: 20px 20px 20px 20px;
}
.more:hover {
  background-color: rgb(105, 98, 98);
  border-radius: 20px 20px 20px 20px;
}
.chat-container {
  z-index: 10000;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(620px);
  opacity: 0;
}
</style>


<style scoped>
.reaction-butt- {
    display: flex;
    padding: 10px;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;}
#sidelist {
  width: 739px;
  overflow: auto;
  padding: 20px;
  line-height: 1.5;
  margin-right: 50px;
}
p {
  text-indent: 2em;
}
.catalog {
  position: fixed;
  top: 70px;
  right: 5%;
  cursor: not-allowed;
  /* height: calc(100% - 100px); */
}
.catalogleft {
  position: fixed;
  top: 30%;
  left: 5%;
  cursor: not-allowed;
  /* height: calc(100% - 100px); */
  -webkit-text-size-adjust: 100%;
  --podcast-spinning-animation: spin 20s linear infinite;
  --header-height: 56px;
  --site-width: 1280px;
  --su-1: 0.25rem;
  --su-2: 0.5rem;
  --su-3: 0.75rem;
  --su-4: 1rem;
  --su-5: 1.25rem;
  --su-6: 1.5rem;
  --su-7: 2rem;
  --su-8: 3rem;
  --su-9: 4rem;
  --su-10: 8rem;
  --radius: 0.375rem;
  --radius-large: 0.75rem;
  --radius-auto: Max(0px, Min(var(--radius), calc((100vw - 4px - 100%) * 9999))) /
    var(--radius);
  --radius-large-auto: Max(
      0px,
      Min(var(--radius-large), calc((100vw - 4px - 100%) * 9999))
    ) / var(--radius-large);
  --transition-func: cubic-bezier(0.17, 0.67, 0.5, 0.71);
  --transition-time: 100ms;
  --transition-props: var(--transition-func) var(--transition-time);
  --focus-ring: 0 0 0 2px var(--base-inverted), 0 0 0 4px var(--focus);
  --ff-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  --ff-monospace: "SF Mono", SFMono-Regular, Consolas, "Liberation Mono", Menlo,
    Courier, monospace;
  --ff-serif: Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua",
    Georgia, serif;
  --ff-comic: "Comic Sans MS", cursive, sans-serif;
  --ff-dyslexic: OpenDyslexic, sans-serif;
  --fs-xs: 0.75rem;
  --fs-s: 0.875rem;
  --fs-base: 1rem;
  --fs-l: 1.125rem;
  --fs-xl: 1.25rem;
  --fs-2xl: 1.5rem;
  --fs-3xl: 1.875rem;
  --fs-4xl: 2.25rem;
  --fs-5xl: 3rem;
  --fw-normal: 400;
  --fw-medium: 500;
  --fw-bold: 700;
  --fw-heavy: 800;
  --lh-tight: 1.25;
  --lh-base: 1.5;
  --opacity-0: 0.00001;
  --opacity-25: 0.25;
  --opacity-50: 0.5;
  --opacity-75: 0.75;
  --opacity-100: 1;
  --z-negative: -1;
  --z-elevate: 1;
  --z-sticky: 100;
  --z-drawer: 200;
  --z-dropdown: 400;
  --z-modal: 500;
  --z-popover: 500;
  --white: 255, 255, 255;
  --black: 0, 0, 0;
  --grey-50: 250, 250, 250;
  --grey-100: 245, 245, 245;
  --grey-200: 229, 229, 229;
  --grey-300: 212, 212, 212;
  --grey-400: 163, 163, 163;
  --grey-500: 115, 115, 115;
  --grey-600: 82, 82, 82;
  --grey-700: 64, 64, 64;
  --grey-800: 38, 38, 38;
  --grey-900: 23, 23, 23;
  --red-50: 254, 242, 242;
  --red-100: 254, 226, 226;
  --red-200: 254, 202, 202;
  --red-300: 252, 165, 165;
  --red-400: 248, 113, 113;
  --red-500: 239, 68, 68;
  --red-600: 220, 38, 38;
  --red-700: 185, 28, 28;
  --red-800: 153, 27, 27;
  --red-900: 127, 29, 29;
  --yellow-50: 255, 251, 235;
  --yellow-100: 254, 243, 199;
  --yellow-200: 253, 230, 138;
  --yellow-300: 252, 211, 77;
  --yellow-400: 251, 191, 36;
  --yellow-500: 245, 158, 11;
  --yellow-600: 217, 119, 6;
  --yellow-700: 180, 83, 9;
  --yellow-800: 146, 64, 14;
  --yellow-900: 120, 53, 15;
  --green-50: 236, 253, 245;
  --green-100: 209, 250, 229;
  --green-200: 167, 243, 208;
  --green-300: 110, 231, 183;
  --green-400: 52, 211, 153;
  --green-500: 16, 185, 129;
  --green-600: 5, 150, 105;
  --green-700: 4, 120, 87;
  --green-800: 6, 95, 70;
  --green-900: 6, 78, 59;
  --indigo-50: 238, 242, 255;
  --indigo-100: 224, 231, 255;
  --indigo-200: 199, 210, 254;
  --indigo-300: 165, 180, 252;
  --indigo-400: 129, 140, 248;
  --indigo-500: 99, 102, 241;
  --indigo-600: 79, 70, 229;
  --indigo-700: 67, 56, 202;
  --indigo-800: 55, 48, 163;
  --indigo-900: 49, 46, 129;
  --base: #090909;
  --base-inverted: rgb(var(--white));
  --base-100: var(--base);
  --base-90: #242424;
  --base-80: #3d3d3d;
  --base-70: #575757;
  --base-60: #717171;
  --base-50: #8a8a8a;
  --base-40: #a3a3a3;
  --base-30: #bdbdbd;
  --base-20: #d6d6d7;
  --base-10: #efefef;
  --base-0: #f9f9f9;
  --accent-brand-lighter: rgb(var(--accent-brand-lighter-rgb));
  --accent-brand: rgb(var(--accent-brand-rgb));
  --accent-brand-darker: rgb(var(--accent-brand-darker-rgb));
  --accent-success: rgb(var(--green-600));
  --accent-success-darker: rgb(var(--green-700));
  --accent-success-lighter: rgb(var(--green-500));
  --accent-success-a10: rgba(var(--green-600), 0.1);
  --accent-warning: rgb(var(--yellow-500));
  --accent-warning-darker: rgb(var(--yellow-600));
  --accent-warning-lighter: rgb(var(--yellow-400));
  --accent-warning-a10: rgba(var(--yellow-500), 0.1);
  --accent-danger: rgb(var(--red-600));
  --accent-danger-darker: rgb(var(--red-700));
  --accent-danger-lighter: rgb(var(--red-500));
  --accent-danger-a10: rgba(var(--red-600), 0.1);
  --body-bg: rgb(var(--grey-100));
  --body-color: rgb(var(--grey-900));
  --body-color-inverted: rgb(var(--white));
  --card-bg: rgb(var(--white));
  --card-color: rgb(var(--grey-900));
  --card-color-secondary: rgb(var(--grey-700));
  --card-color-tertiary: rgb(var(--grey-600));
  --card-secondary-bg: rgb(var(--grey-50));
  --card-secondary-color: rgb(var(--grey-700));
  --card-border: rgba(var(--grey-900), 0.1);
  --card-secondary-border: rgba(var(--grey-900), 0.05);
  --header-bg: rgb(var(--white));
  --header-shadow: rgba(var(--black), 0.1);
  --footer-bg: rgb(var(--grey-200));
  --footer-color: rgb(var(--grey-700));
  --link-bg-hover-alt: var(--base-inverted);
  --link-color-current: var(--base-100);
  --link-color-secondary: var(--base-60);
  --link-color-secondary-hover: var(--base-70);
  --link-bg-current: var(--base-inverted);
  --button-primary-bg: var(--accent-brand);
  --button-primary-bg-hover: var(--accent-brand-darker);
  --button-primary-color: var(--base-0);
  --button-primary-color-hover: var(--base-0);
  --button-primary-inverted-bg: var(--accent-brand);
  --button-primary-inverted-bg-hover: var(--accent-brand-darker);
  --button-primary-inverted-color: var(--base-0);
  --button-primary-inverted-color-hover: var(--base-0);
  --button-secondary-bg: var(--base-20);
  --button-secondary-bg-hover: var(--base-30);
  --button-secondary-color: var(--base-80);
  --button-secondary-color-hover: var(--base-100);
  --button-outlined-bg: transparent;
  --button-outlined-bg-hover: rgba(0, 0, 0, 0.035);
  --button-outlined-border: var(--base-20);
  --button-outlined-border-hover: var(--base-40);
  --button-outlined-color: var(--base-80);
  --button-outlined-color-hover: var(--base-100);
  --button-ghost-bg: transparent;
  --button-ghost-bg-hover: rgba(0, 0, 0, 0.035);
  --button-ghost-color: var(--base-80);
  --button-ghost-color-hover: var(--base-100);
  --button-ghost-dimmed-color: var(--base-60);
  --button-ghost-dimmed-color-hover: var(--base-100);
  --button-ghost-inverted-bg: transparent;
  --button-ghost-inverted-bg-hover: rgba(255, 255, 255, 0.15);
  --button-ghost-inverted-color: var(--base-30);
  --button-ghost-inverted-color-hover: var(--base-10);
  --button-ghost-dimmed-inverted-color: var(--base-50);
  --button-ghost-dimmed-inverted-color-hover: var(--base-100);
  --form-bg: rgb(var(--white));
  --form-bg-focus: rgb(var(--white));
  --form-border: rgb(var(--grey-300));
  --form-border-hover: rgb(var(--grey-400));
  --form-border-focus: var(--focus);
  --form-placeholder-color: rgb(var(--grey-600));
  --label-primary: rgb(var(--grey-900));
  --label-secondary: rgb(var(--grey-600));
  --snackbar-bg: rgb(var(--grey-900));
  --snackbar-color: rgb(var(--white));
  --tab-color: rgb(var(--grey-700));
  --tab-color-hover: var(--accent-brand);
  --tab-color-current: rgb(var(--grey-900));
  --tab-bg-hover: rgba(var(--accent-brand-rgb), 0.1);
  --tab-bg-current: rgb(var(--accent-brand));
  --tag-color: rgb(var(--grey-700));
  --tag-color-hover: rgb(var(--grey-900));
  --tag-bg: rgba(var(--grey-900), 0.05);
  --tag-bg-hover: rgba(var(--grey-900), 0.05);
  --tag-prefix: rgba(var(--grey-900), 0.6);
  --tag-prefix-hover: rgb(var(--grey-900));
  --story-comments-bg: rgb(var(--grey-50));
  --story-comments-bg-top: rgba(var(--grey-50), 0);
  --story-comments-bg-bottom: rgba(var(--grey-50), 1);
  --select-icon: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDE2TDYgMTBIMThMMTIgMTZaIiBmaWxsPSIjMDgwOTBBIi8+Cjwvc3ZnPg==);
  --reaction-like-color: rgb(var(--red-600));
  --reaction-like-bg: rgba(var(--red-600), 0.1);
  --reaction-custom-color: rgb(var(--green-600));
  --reaction-custom-bg: rgb(var(--green-600), 0.1);
  --reaction-save-color: rgb(var(--indigo-600));
  --reaction-save-bg: rgba(var(--indigo-600), 0.1);
  --reaction-comment-color: rgb(var(--yellow-500));
  --reaction-comment-bg: rgba(var(--yellow-500), 0.1);
  --btn-bg: transparent;
  --btn-bg-hover: rgba(var(--accent-brand-rgb), 0.1);
  --btn-color: rgb(var(--grey-800));
  --btn-color-hover: var(--accent-brand-darker);
  --btn-current-bg: rgb(var(--grey-200));
  --btn-current-color: rgb(var(--grey-900));
  --btn-primary-bg: var(--accent-brand);
  --btn-primary-bg-hover: var(--accent-brand-darker);
  --btn-primary-color: rgb(var(--white));
  --btn-primary-color-hover: rgb(var(--white));
  --btn-secondary-bg: rgba(var(--accent-brand-rgb), 0.1);
  --btn-secondary-bg-hover: var(--accent-brand);
  --btn-secondary-color: var(--accent-brand);
  --btn-secondary-color-hover: rgb(var(--white));
  --btn-destructive-bg: transparent;
  --btn-destructive-bg-hover: rgba(var(--red-600), 0.1);
  --btn-destructive-color: rgb(var(--red-700));
  --btn-destructive-color-hover: rgb(var(--red-800));
  --btn-primary-destructive-bg: rgb(var(--red-600));
  --btn-primary-destructive-bg-hover: rgb(var(--red-700));
  --btn-primary-destructive-color: rgb(var(--white));
  --btn-primary-destructive-color-hover: rgb(var(--white));
  --link-bg: transparent;
  --link-bg-hover: rgba(var(--accent-brand-rgb), 0.1);
  --link-color: rgb(var(--grey-700));
  --link-color-hover: var(--accent-brand-darker);
  --link-current-bg: rgb(var(--grey-200));
  --link-current-color: rgb(var(--grey-900));
  --link-branded-bg: transparent;
  --link-branded-bg-hover: rgba(var(--accent-brand-rgb), 0.1);
  --link-branded-color: var(--accent-brand);
  --link-branded-color-hover: var(--accent-brand-darker);
  --cta-bg: transparent;
  --cta-bg-hover: rgba(var(--accent-brand-rgb), 0.1);
  --cta-color: rgb(var(--grey-800));
  --cta-color-hover: var(--accent-brand-darker);
  --cta-border: rgb(var(--grey-600));
  --cta-border-hover: var(--accent-brand-darker);
  --cta-branded-bg: transparent;
  --cta-branded-bg-hover: var(--accent-brand);
  --cta-branded-color: var(--accent-brand);
  --cta-branded-color-hover: rgb(var(--white));
  --cta-branded-border: var(--accent-brand);
  --cta-branded-border-hover: var(--accent-brand-darker);
  --tooltip-bg: rgba(var(--grey-900), 0.9);
  --tooltip-color: rgb(var(--white));
  --indicator-bg: rgb(var(--grey-300));
  --indicator-color: rgb(var(--grey-700));
  --indicator-success-bg: rgb(var(--green-400));
  --indicator-success-color: rgb(var(--green-900));
  --indicator-warning-bg: rgb(var(--yellow-300));
  --indicator-warning-color: rgb(var(--yellow-900));
  --indicator-danger-bg: rgb(var(--red-600));
  --indicator-danger-color: rgb(var(--white));
  --indicator-info-bg: var(--accent-brand);
  --indicator-info-color: rgb(var(--white));
  --list-item-bg-hover: rgb(var(--grey-50));
  --modal-bg: rgb(var(--white));
  --modal-backdrop: rgba(var(--black), 0.6);
  --modal-danger-border-color: rgb(var(--red-500));
  --color-primary: rgb(var(--grey-900));
  --color-secondary: rgb(var(--grey-500));
  --pill-bg: transparent;
  --pill-bg-hover: rgb(var(--grey-50));
  --pill-color: rgb(var(--grey-800));
  --pill-color-hover: rgb(var(--grey-900));
  --pill-border: rgb(var(--grey-200));
  --pill-border-hover: rgb(var(--grey-600));
  --swatch-border-color: rgb(var(--black), 0.2);
  --focus: var(--accent-brand);
  --divider: rgb(var(--grey-200));
  --shadow-1: 0 10px 15px -3px rgba(var(--black), 0.1),
    0 4px 6px -2px rgba(var(--black), 0.05), 0 0 0 1px rgba(var(--black), 0.1);
  --shadow-2: 0 20px 25px -5px rgba(var(--black), 0.1),
    0 10px 10px -5px rgba(var(--black), 0.05), 0 0 0 1px rgba(var(--black), 0.1);
  --layout-sidebar-left-display: block;
  --layout-sidebar-right-display: block;
  --layout-drawer-width: 300px;
  --layout-padding: var(--su-4);
  --content-padding-y: var(--su-7);
  --content-padding-x: var(--su-9);
  --content-tertiary-font-size: var(--fs-base);
  --content-rhythm: var(--content-font-size);
  --content-secondary-font-size: var(--fs-l);
  --content-font-size: var(--fs-xl);
  --reach-combobox: 1;
  --syntax-background-color: #08090a;
  --syntax-text-color: #f8f8f2;
  --syntax-comment-color: #808080;
  --syntax-declaration-color: #f39c12;
  --syntax-literal-color: #dda0dd;
  --syntax-error-color: #f9690e;
  --syntax-name-color: #7ed07e;
  --syntax-string-color: #f2ca27;
  --accent-brand-lighter-rgb: 80, 99, 301;
  --accent-brand-rgb: 59, 73, 223;
  --accent-brand-darker-rgb: 47, 58, 178;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  color: var(--body-color);
  font-family: var(--ff-sans-serif);
  -webkit-font-smoothing: antialiased;
  --content-font-family: var(--ff-sans-serif);
  visibility: visible;
  font-size: var(--fs-base);
  --layout-sidebar-left-width: var(--su-9);
  --layout-gap: var(--su-4);
  --layout-sidebar-right-width: 3fr;
  --layout-sidebar-left-row-end: initial;
  --layout-content-width: 7fr;
  --layout: var(--layout-sidebar-left-width) var(--layout-content-width)
  var(--layout-sidebar-right-width);
  box-sizing: border-box;
  display: var(--layout-sidebar-left-display);
  grid-row-end: var(--layout-sidebar-left-row-end);
  width: var(--layout-sidebar-left-width);
}
.line-style {
  display: inline-block;
  height: 20px;
  width: 3px;
  background: transparent;
}
.line-style--active {
  background: currentColor;
}
.fs-14 {
  transform: translateX(-30px);
}
.image-header {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(23, 23, 23, 0);
  --blue: #50a1ff;
  --indigo: #6610f2;
  --purple: #926dde;
  --pink: #e83e8c;
  --red: #ff4954;
  --orange: #ffbe00;
  --yellow: #ffba00;
  --green: #3cd458;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --gray: #868e96;
  --gray-dark: #343a40;
  --primary: #50a1ff;
  --secondary: #e9ecf0;
  --success: #3cd458;
  --info: #926dde;
  --warning: #ffba00;
  --danger: #ff4954;
  --light: #f8fafc;
  --dark: #16202f;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1260px;
  --breakpoint-xxl: 1500px;
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-family: Dosis, Open Sans, pingfang SC, helvetica neue, arial,
    hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
  font-size: 0.9375rem;
  line-height: 1.9;
  font-weight: 400;
  color: #757575;
  text-align: center;
  box-sizing: border-box;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
  border-style: none;
  border-radius: 10px;
}
.image-header-side {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(23, 23, 23, 0);
  --blue: #50a1ff;
  --indigo: #6610f2;
  --purple: #926dde;
  --pink: #e83e8c;
  --red: #ff4954;
  --orange: #ffbe00;
  --yellow: #ffba00;
  --green: #3cd458;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --gray: #868e96;
  --gray-dark: #343a40;
  --primary: #50a1ff;
  --secondary: #e9ecf0;
  --success: #3cd458;
  --info: #926dde;
  --warning: #ffba00;
  --danger: #ff4954;
  --light: #f8fafc;
  --dark: #16202f;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1260px;
  --breakpoint-xxl: 1500px;
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-family: Dosis, Open Sans, pingfang SC, helvetica neue, arial,
    hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
  font-size: 0.9375rem;
  line-height: 1.9;
  font-weight: 400;
  color: #757575;
  box-sizing: border-box;
  margin: auto;
  padding-top: 4rem;
  text-align: center;
  max-width: 1000px;
}
.category.active[data-v-6d975e7c] {
  border-bottom: 3px solid #52a1ff;
}
.myVEmojiPicker {
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 390px;
  bottom: 20px;
  z-index: 10;
}
.widget-ad-banner {
  background-image: url("../static/img/sidebar-add-banner.png");
}
.mar-top{
margin-top:20px;
}
@media screen and (max-width:991px){
  .col-lg-3{display:none; }
 .catalogleft{display:none; }
}
</style>
