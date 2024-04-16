<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message3="acticve" />
          <div class="app-main">
            <div class="w-full bg grid-list layout-min-full-height d-flex">
              <div class="w-full pc-model">
                <div>
                  <!-- /** */ -->
                <!-- <div class="featured-posts mb-6">
                
                  <div><a :href="MatterArticleFirst.id" target="_self" class="post-item post-item--featured"
                      style="background:linear-gradient(#5aa94580,#59ab4e8f,#58ac569e,#57ad5dad,#57ae65bd,#57af6ccc);background-size:100%;"><img
                        src="../static/picture/jetbrains.svg"
                        style="position:absolute;left:30px;top:30px;width:256px;height:256px;">
                      <div class="post-item__content">
                        <h3 :title="MatterArticleFirst.title">{{MatterArticleFirst.title}}</h3>
                        <div class="post-meta">
                          <div class="category category--inspiring">
                           {{MatterArticleFirst.className}}
                          </div>
                          <div class="post-meta__avatars"><img :src="MatterArticleFirst.profile" class="avatar"></div>
                          <div class="post-meta__info fw-600"><span>{{MatterArticleFirst.author}}</span> <span>•</span> 
                          <span
                                    v-if="MatterArticleFirst.createTime != null"
                                    v-text="formatDate(MatterArticleFirst.createTime)"
                                  >
                                  </span>
                                  <span
                                    v-else
                                    v-text="formatDate(MatterArticleFirst.addTime)"
                                  >
                                  </span> 
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="CS CS--lg"><button class="comment"><i class="icon-bubble"></i></button>
                          <p class="CS-count">
                            {{MatterArticleFirst.commentNum}}
                          </p> <button class="share"><i class="icon-share"></i></button>
                        </div>
                      </div>
                    </a></div>
                  <div><a :href="MatterArticles[0].id" target="_self" class="post-item post-item--featured"
                      style="background:linear-gradient(#c956d880,#d94ec68f,#e547b49e,#ed43a1ad,#f2438fbd,#f3467ecc);">
                      <div class="post-item__content">
                        <h3 :title="MatterArticles[0].title">{{MatterArticles[0].title}}</h3>
                        <div class="post-meta">
                          <div class="category category--inspiring">
                            {{MatterArticles[0].className}}
                          </div>
                          <div class="post-meta__avatars"><img :src="MatterArticles[0].profile" class="avatar"></div>
                          <div class="post-meta__info fw-600"><span>{{MatterArticles[0].author}}</span> <span>•</span> 
                               <span
                                    v-if="MatterArticles[0].createTime != null"
                                    v-text="formatDate(MatterArticles[0].createTime)"
                                  >
                                  </span>
                                  <span
                                    v-else
                                    v-text="formatDate(MatterArticles[0].addTime)"
                                  >
                                  </span> 
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="CS CS--lg"><button class="comment"><i class="icon-bubble"></i></button>
                          <p class="CS-count">
                            {{MatterArticles[0].commentNum}}
                          </p> <button class="share"><i class="icon-share"></i></button>
                        </div>
                      </div>
                    </a><a :href="MatterArticles[1].id" target="_self" class="post-item post-item--featured"
                      style="background:linear-gradient(#7470d180,#8368c78f,#8f60bd9e,#9858b1ad,#a051a5bd,#a64999cc);">
                      <div class="post-item__content">
                        <h3 :title="MatterArticles[1].title">{{MatterArticles[1].title}}</h3>
                        <div class="post-meta">
                          <div class="category category--tools">
                            {{MatterArticles[1].className}}
                          </div>
                          <div class="post-meta__avatars"><img :src="MatterArticles[1].profile" class="avatar"></div>
                          <div class="post-meta__info fw-600"><span>{{MatterArticles[1].author}}</span> <span>•</span> 
                           <span
                                    v-if="MatterArticles[1].createTime != null"
                                    v-text="formatDate(MatterArticles[1].createTime)"
                                  >
                                  </span>
                                  <span
                                    v-else
                                    v-text="formatDate(MatterArticles[1].addTime)"
                                  >
                                  </span> 
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="CS CS--lg"><button class="comment"><i class="icon-bubble"></i></button>
                          <p class="CS-count">
                            {{MatterArticles[1].commentNum}}
                          </p> <button class="share"><i class="icon-share"></i></button>
                        </div>
                      </div>
                    </a><a :href="MatterArticles[2].id" target="_self" class="post-item post-item--featured"
                      style="background:linear-gradient(#8771e780,#c358c38f,#e144959e,#e84265ad,#dc5437bd,#c16a00cc);">
                      <div class="post-item__content">
                        <h3 :title="MatterArticles[2].title">{{MatterArticles[2].title}}</h3>
                        <div class="post-meta">
                          <div class="category category--tools">
                            {{MatterArticles[2].className}}
                          </div>
                          <div class="post-meta__avatars"><img :src="MatterArticles[2].profile" class="avatar"></div>
                          <div class="post-meta__info fw-600"><span>{{MatterArticles[2].author}}</span> <span>•</span>
                           <span
                                    v-if="MatterArticles[2].createTime != null"
                                    v-text="formatDate(MatterArticles[2].createTime)"
                                  >
                                  </span>
                                  <span
                                    v-else
                                    v-text="formatDate(MatterArticles[2].addTime)"
                                  >
                                  </span> 
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="CS CS--lg"><button class="comment"><i class="icon-bubble"></i></button>
                          <p class="CS-count">
                            {{MatterArticles[2].commentNum}}
                          </p> <button class="share"><i class="icon-share"></i></button>
                        </div>
                      </div>
                    </a></div>
                </div> -->
                <!-- /** */ -->
                  <div class="d-flex">
                    <div class="flex">
                      <div class="app-content-header mb-5">
                        <div class="main-title">
                          <h5 class="fs-24 fw-600 i-con-h-a">
                            全部文章
                            <span class="text-muted fs-13 v-1 ml-1">
                              {{this.articleCount}}
                            </span>
                          </h5>
                        </div>
                        <nav class="menu menu--macwk——list article-menu flex">
                          <ul class="menu__list">
                            <li @click="getList()" class="menu__item"  :class="{'menu__item--current':allIndex}">
                              <a class="menu__link"> 全部文章 </a>
                              
                            </li>
                             <!-- <el-tabs v-model="activeName">
                               <el-tab-pane @click="getList()" label="全部文章" name="first"></el-tab-pane>
                                <el-tab-pane @click="getNewarticleclass(item.id)" v-for="(item, id) in this.classlist" :key="id" :label="item.name" :name="item.name">

                                  <component :is="item.name">123</component>
                                </el-tab-pane>
                                
                              </el-tabs>  -->
                            <div @click="getNewarticleclass(item.id)" v-for="(item, id) in this.classlist" :key="id" >
                            <li class="menu__item "
                           
                            :class="{'menu__item--current':item.id==clickIndex}"
                            >
                              <a class="menu__link"> {{item.name}} </a>
                            </li>
                            </div>
                            <!-- <li class="menu__line"></li> -->
                          </ul>
                        </nav>
                        <div>
                          <div
                            role="switch"
                            class="el-switch"
                            style="margin-top: -3px"
                          >
                            <input
                              type="checkbox"
                              name=""
                              true-value="true"
                              class="el-switch__input"
                            />
                            <!---->
                            <div   >
                            <el-switch
                                v-model="istargetjudje"
                              @change="istargetJudje()"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                              </el-switch>
                              </div><span
                              class="el-switch__label el-switch__label--right"
                            >
                              <!----><span aria-hidden="true">新窗口打开</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <!---->
                      <div v-for="(item, id) in this.list" :key="id">
                        <div v-if="item.status.includes('published')" >
                        <nuxt-link :target="istarget" :to="'/post/' + item.id">
                          <!---->
                          <a
                            target="_self"
                            class="
                              post-item
                              white
                              delay-0
                              list-animation-leftIn
                            "
                          >
                        
                              <el-image  v-if="item.thumb != null"
                                  class="post-item__preview delay-0" :src="item.thumb" lazy>
                                <div slot="placeholder" class="image-slot">
                               <img  style="width:100%; height:100%; object-fit:cover;"  src="../static/image/loding.gif" />
                                </div>
                            </el-image>
                            <div
                              v-else
                              class="
                                post-item__preview
                                align-items-center
                                d-flex
                                delay-5
                              "
                              :style="item.backgroundStyle"
                            >
                              <h3
                                class="flex text-center text-white opacity-50"
                              >
                                NOPIC
                              </h3>
                            </div>
                            <div class="post-item__content">
                              <h3 :title="item.title">{{ item.title }}</h3>
                              <div class="post-meta">
                                <div class="category category--inspiring">
                                  {{item.className}}
                                </div>
                                <div class="post-meta__avatars">
                                  <img
                                    :src="item.profile"
                                    class="avatar"
                                  />
                                </div>
                                <div class="post-meta__info fw-600">
                                  <span>{{ item.author }}</span> <span>•</span>

                                  <span
                                    v-if="item.createTime != null"
                                    v-text="formatDate(item.createTime)"
                                  >
                                  </span>
                                  <span
                                    v-else
                                    v-text="formatDate(item.addTime)"
                                  >
                                  </span> <span> • </span><span> 阅读 {{ item.hits }}</span> 
                                </div>
                              </div>
                            </div>
                            <div>
                              <div class="CS CS--lg">
                                <button class="comment">
                                  <i class="icon-bubble"></i>
                                </button>
                                <p class="CS-count">{{item.commentNum}}</p>
                                <button class="share">
                                  <i class="icon-share"></i>
                                </button>
                              </div>
                            </div>
                          </a>
                        </nuxt-link>
                        </div>
                      </div>
                      <!---->
                    <el-pagination
                     class="app-content-bottom"
                         @size-change="handleSizeChange" 
                           @current-change="handleCurrentChange" 
                          :current-page.sync="listQuery.page"
                          :page-size="listQuery.limit"
                           layout="prev, pager, next"
                          :total="total"
                    />
                    </div>
                    <!---->
                    <div class="ml-6 w-380 d-md-none d-lg-none d-xl-block">
                      <div class="d-block siderbar-apps new-post">
                        <div class="siderbar-apps__header">
                          <h4 class="fs-24 fw-600 mb-0">最新评论</h4>
                        </div>
                        <!-- --------- -->
                        <div  v-for="item in Newarticlecomment"
                          :key="item.id" class="siderbar-apps__body-item bg bt-1 pt-4 hover-shadow-5"><a target="_blank" :href="item.articleId" class="fs-14 opacity-50 text-truncate mb-3 d-block hover-opacity-normal">{{item.articleName}}</a> <p class="article-comment-quote fs-15"><span style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; word-break: break-all; text-overflow: ellipsis; -webkit-line-clamp: 3;">
                   {{item.content}}
                  </span></p> <div class="d-flex align-items-center"><div class="mr-3"><svg viewBox="0 0 264 280" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-20 h-20"><desc>Created with getavataaars.com</desc> <defs><circle id="path-1" cx="120" cy="120" r="120"></circle> <path d="M12,160 C12,226.27417 65.72583,280 132,280 C198.27417,280 252,226.27417 252,160 L264,160 L264,-1.42108547e-14 L-3.19744231e-14,-1.42108547e-14 L-3.19744231e-14,160 L12,160 Z" id="path-2"></path> <path d="M124,144.610951 L124,163 L128,163 L128,163 C167.764502,163 200,195.235498 200,235 L200,244 L0,244 L0,235 C-4.86974701e-15,195.235498 32.235498,163 72,163 L72,163 L76,163 L76,144.610951 C58.7626345,136.422372 46.3722246,119.687011 44.3051388,99.8812385 C38.4803105,99.0577866 34,94.0521096 34,88 L34,74 C34,68.0540074 38.3245733,63.1180731 44,62.1659169 L44,56 L44,56 C44,25.072054 69.072054,5.68137151e-15 100,0 L100,0 L100,0 C130.927946,-5.68137151e-15 156,25.072054 156,56 L156,62.1659169 C161.675427,63.1180731 166,68.0540074 166,74 L166,88 C166,94.0521096 161.51969,99.0577866 155.694861,99.8812385 C153.627775,119.687011 141.237365,136.422372 124,144.610951 Z" id="path-silhouette"></path></defs> <g id="Avataaar" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-825.000000, -1100.000000)" id="Avataaar/Circle"><g transform="translate(825.000000, 1100.000000)"><g id="Circle" stroke-width="1" fill-rule="evenodd" transform="translate(12.000000, 40.000000)"><mask id="mask-1" fill="white"><use xlink:href="#path-1"></use></mask> <use id="Circle-Background" fill="#E6E6E6" xlink:href="#path-1"></use> <g id="Color/Palette/Blue-01" mask="url(#mask-1)" fill="#6fb8e0"><rect id="🖍Color" x="0" y="0" width="240" height="240"></rect></g></g> <mask id="mask-2" fill="white"><use xlink:href="#path-2"></use></mask> <g id="Mask"></g> <g id="Avataaar" stroke-width="1" fill-rule="evenodd" fill="black" mask="url(#mask-2)"><g id="Body" transform="translate(32.000000, 36.000000)"><mask id="mask-silhouette" fill="white"><use xlink:href="#path-silhouette"></use></mask> <use fill="#FD9841" xlink:href="#path-silhouette"></use> <path d="M156,79 L156,102 C156,132.927946 130.927946,158 100,158 C69.072054,158 44,132.927946 44,102 L44,79 L44,94 C44,124.927946 69.072054,150 100,150 C130.927946,150 156,124.927946 156,94 L156,79 Z" id="Neck-Shadow" fill-opacity="0.100000001" fill="#000000" mask="url(#mask-silhouette)"></path></g> <svg>
      <g id="Clothing/Blazer-+-Shirt" transform="translate(0.000000, 170.000000)">
        <defs>
          <path d="M133.960472,0.294916112 C170.936473,3.32499816 200,34.2942856 200,72.0517235 L200,81 L0,81 L0,72.0517235 C1.22536245e-14,33.9525631 29.591985,2.76498122 67.0454063,0.219526408 C67.0152598,0.593114549 67,0.969227185 67,1.34762511 C67,13.2107177 81.9984609,22.8276544 100.5,22.8276544 C119.001539,22.8276544 134,13.2107177 134,1.34762511 C134,0.994669088 133.986723,0.64370138 133.960472,0.294916112 Z" id="path1"></path>
        </defs>
        <g id="Shirt" transform="translate(32.000000, 29.000000)">
          <mask id="BlazerShirt-mask1" fill="white">
            <use href="#BlazerShirt-path1"></use>
          </mask>
          <use class="CustomColor" fill="#E6E6E6" href="#BlazerShirt-path1"></use>
          <g id="Color/Palette/Black" mask="url(&quot;#BlazerShirt-mask1&quot;)" fill="#262E33">
            <g transform="translate(-32.000000, -29.000000)" id="🖍Color">
              <rect x="0" y="0" width="264" height="110"></rect>
            </g>
          </g>
          <g id="Shadowy" opacity="0.16" mask="url(&quot;#BlazerShirt-mask1&quot;)" fill="#000000">
            <g transform="translate(60.000000, -25.000000)" id="Hola-👋🏼">
              <ellipse cx="40.5" cy="27.8476251" rx="39.6351047" ry="26.9138272"></ellipse>
            </g>
          </g>
        </g>
        <g id="Blazer" transform="translate(32.000000, 28.000000)">
          <path d="M68.784807,1.12222847 C30.512317,2.80409739 -1.89486556e-14,34.3646437 -1.42108547e-14,73.0517235 L0,73.0517235 L0,82 L69.3616767,82 C65.9607412,69.9199941 64,55.7087296 64,40.5 C64,26.1729736 65.7399891,12.7311115 68.784807,1.12222847 Z M131.638323,82 L200,82 L200,73.0517235 C200,34.7067641 170.024954,3.36285166 132.228719,1.17384225 C135.265163,12.7709464 137,26.1942016 137,40.5 C137,55.7087296 135.039259,69.9199941 131.638323,82 Z" id="Saco" fill="#3A4C5A"></path>
          <path d="M149,58 L158.555853,50.83311 L158.555853,50.83311 C159.998897,49.7508275 161.987779,49.7682725 163.411616,50.8757011 L170,56 L149,58 Z" id="Pocket-hanky" fill="#E6E6E6"></path>
          <path d="M69,1.13686838e-13 C65,19.3333333 66.6666667,46.6666667 74,82 L58,82 L44,46 L50,37 L44,31 L63,1 C65.027659,0.369238637 67.027659,0.0359053037 69,1.13686838e-13 Z" id="Wing" fill="#2F4351"></path>
          <path d="M151,1.13686838e-13 C147,19.3333333 148.666667,46.6666667 156,82 L140,82 L126,46 L132,37 L126,31 L145,1 C147.027659,0.369238637 149.027659,0.0359053037 151,1.13686838e-13 Z" id="Wing" fill="#2F4351" transform="translate(141.000000, 41.000000) scale(-1, 1) translate(-141.000000, -41.000000) "></path>
        </g>
      </g>
</svg> <svg>
  <g transform="translate(76.000000, 82.000000)">
      <g id="Eyes/Side-😒" transform="translate(0.000000, 8.000000)" opacity="0.599999964">
        <path d="M27.2409577,20.3455337 C26.462715,21.3574913 26,22.6247092 26,24 C26,27.3137085 28.6862915,30 32,30 C35.3137085,30 38,27.3137085 38,24 C38,23.7097898 37.9793961,23.4243919 37.9395713,23.1451894 C37.9474218,22.9227843 37.9097825,22.6709538 37.8153518,22.4071242 C37.7703692,22.2814477 37.7221152,22.1572512 37.6706873,22.0345685 C37.3370199,21.0717264 36.7650456,20.2202109 36.0253277,19.550585 C33.898886,17.3173253 30.5064735,16 26.9975803,16 C22.1644225,16 18.006676,18.648508 16.1601674,22.4473116 C15.6201012,23.5583844 16.5467928,24.3002944 17.4375392,23.5716412 C19.8737584,21.5787519 23.2572061,20.3437884 26.9975803,20.3437884 C27.0788767,20.3437884 27.1600045,20.3443718 27.2409577,20.3455337 Z" id="Eye"></path>
        <path d="M85.2409577,20.3455337 C84.462715,21.3574913 84,22.6247092 84,24 C84,27.3137085 86.6862915,30 90,30 C93.3137085,30 96,27.3137085 96,24 C96,23.7097898 95.9793961,23.4243919 95.9395713,23.1451894 C95.9474218,22.9227843 95.9097825,22.6709538 95.8153518,22.4071242 C95.7703692,22.2814477 95.7221152,22.1572512 95.6706873,22.0345685 C95.3370199,21.0717264 94.7650456,20.2202109 94.0253277,19.550585 C91.898886,17.3173253 88.5064735,16 84.9975803,16 C80.1644225,16 76.006676,18.648508 74.1601674,22.4473116 C73.6201012,23.5583844 74.5467928,24.3002944 75.4375392,23.5716412 C77.8737584,21.5787519 81.2572061,20.3437884 84.9975803,20.3437884 C85.0788767,20.3437884 85.1600045,20.3443718 85.2409577,20.3455337 Z" id="Eye"></path>
      </g>
    </g>
</svg> <svg>
  <g transform="translate(76.000000, 82.000000)">
      <g id="Mouth/Default" transform="translate(2.000000, 52.000000)" opacity="0.699999988">
        <path d="M40,15 C40,22.7319865 46.2680135,29 54,29 L54,29 C61.7319865,29 68,22.7319865 68,15" id="Mouth"></path>
      </g>
    </g>
</svg> <svg>
  <g transform="translate(76.000000, 82.000000)">
      <g id="Eyebrow/Natural/Default-Natural" opacity="0.599999964">
        <path d="M26.0390934,6.21012364 C20.2775554,6.98346216 11.2929313,12.0052479 12.04426,17.8178111 C12.0689481,18.0080543 12.3567302,18.0673468 12.4809077,17.9084937 C14.9674041,14.7203351 34.1927973,10.0365481 41.1942673,11.0147151 C41.8350523,11.1044465 42.2580662,10.4430343 41.8210501,10.0302067 C38.0765663,6.49485426 31.2003792,5.51224825 26.0390934,6.21012364" class="CustomColor" transform="translate(27.000000, 12.000000) rotate(5.000000) translate(-27.000000, -12.000000) "></path>
        <path d="M85.0390934,6.21012364 C79.2775554,6.98346216 70.2929313,12.0052479 71.04426,17.8178111 C71.0689481,18.0080543 71.3567302,18.0673468 71.4809077,17.9084937 C73.9674041,14.7203351 93.1927973,10.0365481 100.194267,11.0147151 C100.835052,11.1044465 101.258066,10.4430343 100.82105,10.0302067 C97.0765663,6.49485426 90.2003792,5.51224825 85.0390934,6.21012364" class="CustomColor" transform="translate(86.000000, 12.000000) scale(-1, 1) rotate(5.000000) translate(-86.000000, -12.000000) "></path>
      </g>
    </g>
</svg> <svg><g fill="black" transform="translate(76.000000, 82.000000)"><g id="Nose/Default" transform="translate(28.000000, 40.000000)" opacity="0.16"><path d="M16,8 C16,12.418278 21.372583,16 28,16 L28,16 C34.627417,16 40,12.418278 40,8" id="Nose"></path></g></g></svg> <svg style="--avataaar-hair-color:#A55728; --avataaar-facial-hair-color:#724133; --avataaar-hat-color:#E6E6E6; --avataaar-shirt-color:#929598;">
      <g id="Top" strokewidth="1" fillrule="evenodd">
        <defs>
          <rect id="LongHairStraight2-path1" x="0" y="0" width="264" height="280"></rect>
          <path d="M21,157.540812 L21,69.046252 C21,65.5140485 21.3981158,62.0748299 22.1519234,58.7710202 C25.205041,38.7314193 36.7752683,22.8108863 50,13 C69.9046441,-1.75961713 103.441939,-6.01828252 115.047069,11.5221046 C123.698343,7.68103538 136.519049,11.1821114 146,20 C155.565156,29.4150438 163.19967,50.1973768 158.657409,67.2035172 C158.762104,68.4691962 158.815476,69.7490355 158.815476,71.0408963 L158.815476,92.8921195 C157.934142,87.9183006 153.988995,84.0029116 149,83.1659169 L149,83 C142.963851,61.4642087 125.229516,51.5800472 114.429684,41.777113 C97.5353566,60.6732583 44.8226408,60.7398069 27,98 L27,108 C27,114.018625 31.4308707,119.002364 37.2085808,119.867187 C38.9518066,140.114792 51.4692178,157.282984 69,165.610951 L69,166 C71.9303712,209.855112 62.358462,264.797432 0,248 C13.6057325,240.037752 20.8081123,189.055563 21,157.540812 Z M117,165.610951 C134.530782,157.282984 147.048193,140.114792 148.791419,119.867187 C153.87876,119.105701 157.921895,115.150816 158.815476,110.107881 L158.815476,111.47039 L158.815476,111.47039 C158.815476,127.298552 162.572711,142.900645 169.7782,156.993609 L196.726668,209.701177 C203.689761,223.320048 201.645562,239.173573 192.790715,250.468968 C189.966212,213.288807 158.90349,184 121,184 L121,184 L117,184 L117,165.610951 Z" id="LongHairStraight2-path2"></path>
          <path d="M65.1802189,77.7372986 C67.3631845,76.1045334 80.4065113,75.4786511 82.757829,74.0894494 C83.4916461,73.6553857 84.0610723,73.215719 84.4997781,72.7800074 C84.938814,73.215719 85.5085703,73.6553857 86.2423874,74.0894494 C88.593375,75.4786511 101.636702,76.1045334 103.819667,77.7372986 C106.030032,79.3908276 107.643571,83.1846831 107.466966,86.15095 C107.255041,89.7101408 103.361486,98.2028927 93.6723269,99.1811016 C91.5576925,96.8281927 88.2368647,95.3104528 84.4997781,95.3104528 C80.7633517,95.3104528 77.4421938,96.8281927 75.3275594,99.1811016 C65.6387308,98.2028927 61.7451757,89.7101408 61.5332501,86.15095 C61.3566455,83.1846831 62.9701849,79.3908276 65.1802189,77.7372986 M103.141638,94.9063813 C103.142958,94.9057221 103.144609,94.905063 103.145929,94.9047334 C103.144278,94.905063 103.142958,94.9057221 103.141638,94.9063813 M65.8453747,94.9014375 C65.8493359,94.9030855 65.8565982,94.9057221 65.8618798,94.9076997 C65.8565982,94.9057221 65.8509864,94.9034151 65.8453747,94.9014375 M144.86259,55.9853335 C144.47439,50.0303878 143.277769,44.1519058 142.233986,38.2862777 C141.952739,36.7072349 140.423706,26 139.734783,26 C139.502391,35.1094058 138.701893,44.0803858 137.669664,53.1393651 C137.361018,55.8475668 137.037848,58.5564277 136.825262,61.2741874 C136.653609,63.4695546 136.959614,66.1220564 136.427819,68.2455739 C135.749129,70.9524573 132.348087,73.4783984 129.702978,74.410795 C123.102915,76.7373371 117.597802,67.1077689 111.960977,64.2911336 C104.643272,60.6347152 92.0637391,59.7639895 84.5816434,64.5297918 C76.9361472,59.7639895 64.356614,60.6347152 57.0389092,64.2911336 C51.4024147,67.1077689 45.8969708,76.7373371 39.2972383,74.410795 C36.6521296,73.4783984 33.2504268,70.9524573 32.572397,68.2455739 C32.0402723,66.1220564 32.346277,63.4695546 32.174954,61.2741874 C31.9623682,58.5564277 31.6388681,55.8475668 31.3302226,53.1393651 C30.2983232,44.0803858 29.4974953,35.1094058 29.2654335,26 C28.5761802,26 27.0468169,36.7072349 26.7658999,38.2862777 C25.7221169,44.1519058 24.5258266,50.0303878 24.1376265,55.9853335 C23.738533,62.1047422 24.2148704,68.1674622 25.4695887,74.1632765 C26.0687242,77.0277016 26.7685407,79.8756475 27.518863,82.7041478 C28.352701,85.8467429 27.198994,91.9661516 27.5723395,95.1921317 C28.2787581,101.29572 31.1542781,113.199679 34.3833375,118.45096 C35.9440605,120.989096 37.7734867,122.573742 39.816489,124.619148 C41.7825775,126.58809 42.6038717,129.640049 44.7260985,131.73687 C48.6820428,135.645092 54.4456266,137.971304 60.3656788,138.543134 C65.6773527,143.050212 74.505605,146 84.4997781,146 C94.4946114,146 103.322534,143.050212 108.634538,138.543134 C114.55393,137.971304 120.317843,135.645092 124.274118,131.73687 C126.396015,129.640049 127.217309,126.58809 129.183727,124.619148 C131.2264,122.573742 133.055826,120.989096 134.616879,118.45096 C137.845608,113.199679 140.721458,101.29572 141.427547,95.1921317 C141.800892,91.9661516 140.647185,85.8467429 141.481353,82.7041478 C142.231676,79.8756475 142.931162,77.0277016 143.530628,74.1632765 C144.784686,68.1674622 145.261353,62.1047422 144.86259,55.9853335 Z" id="LongHairStraight2-path3"></path>
        </defs>
        <mask id="LongHairStraight2-mask1" fill="white">
          <use href="#LongHairStraight2-path1"></use>
        </mask>
        <g id="Mask"></g>
        <g id="Top/Long-Hair/Straight" mask="url(&quot;#LongHairStraight2-mask1&quot;)">
          <g transform="translate(-1.000000, 0.000000)">
            <g id="Hair" strokewidth="1" fill="none" fillrule="evenodd" transform="translate(40.000000, 15.000000)">
              <mask id="LongHairStraight2-mask2" fill="white">
                <use href="#LongHairStraight2-path2"></use>
              </mask>
              <use class="CustomColor" fill="var(--avataaar-hair-color)" href="#LongHairStraight2-path2"></use>
            </g>
            <path d="M67,113 C84.8226408,80.6646674 137.535357,80.6069148 154.429684,64.2083647 C165.207546,72.6982916 182.891727,79.2665518 188.963018,97.8687161 C182.891727,76.423995 165.207546,66.5601054 154.429684,56.777113 C137.535357,75.6732583 84.8226408,75.7398069 67,113 Z" id="Shadow" opacity="0.16" fill="#000000" fillrule="evenodd"></path>
          </g>
        </g>
      </g>
</svg> <svg style="--avataaar-hair-color:#A55728; --avataaar-facial-hair-color:#724133; --avataaar-hat-color:#E6E6E6; --avataaar-shirt-color:#929598;">
      <g id="Facial-Hair/Moustache-Magnum" transform="translate(49.000000, 72.000000)">
        <defs>
          <path d="M83.9980103,74.839711 C83.4569991,75.6087366 82.761047,76.2496937 81.949688,76.6891498 C73.0477917,81.5102869 63.8767499,77.3322546 58.8763101,77.6298353 C56.459601,77.7739966 53.3405442,79.4153191 52.2155358,77.6791014 C50.9768736,75.7669804 55.0680827,65.2207224 64.7214121,63.4643353 C71.7310704,62.1893309 81.4972391,63.6024033 83.9980103,66.9380109 C86.4987814,63.6024033 96.2649453,62.1893309 103.274279,63.4643353 C112.927938,65.2207224 117.019147,75.7669804 115.780485,77.6791014 C114.655476,79.4153191 111.53642,77.7739966 109.119711,77.6298353 C104.118941,77.3322546 94.948229,81.5102869 86.0463327,76.6891498 C85.2349736,76.2496937 84.5390216,75.6087366 83.9980103,74.839711 Z" id="MoustacheMagnum-path1"></path>
        </defs>
        <mask id="MoustacheMagnum-mask1" fill="white">
          <use href="#MoustacheMagnum-path1"></use>
        </mask>
        <use class="CustomColor" fill="var(--avataaar-facial-hair-color)" fillrule="evenodd" href="#MoustacheMagnum-path1"></use>
      </g>
</svg> <svg>
      <g id="Top/_Resources/Prescription-02" fill="none" transform="translate(62.000000, 85.000000)" stroke-width="1">
    <defs>
        <filter x="-0.8%" y="-2.4%" width="101.5%" height="109.8%" filterUnits="objectBoundingBox" id="react-filter-1166">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.2 0" type="matrix" in="shadowOffsetOuter1" result="shadowMatrixOuter1"></feColorMatrix>
            <feMerge>
                <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
    </defs>
      <g id="Wayfarers" filter="url(#react-filter-1166)" transform="translate(6.000000, 7.000000)" fill="#252C2F">
          <path d="M34,41 L31.2421498,41 C17.3147125,41 9,33.3359286 9,20.5 C9,10.127 10.8170058,0 32.5299306,0 L35.4700694,0 C57.1829942,0 59,10.127 59,20.5 C59,32.5686429 48.7212748,41 34,41 Z M32.3853606,6 C13,6 13,12.8410159 13,21.5015498 C13,28.5719428 16.116254,37 30.9709365,37 L34,37 C46.3649085,37 55,30.6270373 55,21.5015498 C55,12.8410159 55,6 35.6146394,6 L32.3853606,6 Z" id="Left" fill-rule="nonzero"></path>
          <path d="M96,41 L93.2421498,41 C79.3147125,41 71,33.3359286 71,20.5 C71,10.127 72.8170058,0 94.5299306,0 L97.4700694,0 C119.182994,0 121,10.127 121,20.5 C121,32.5686429 110.721275,41 96,41 Z M94.3853606,6 C75,6 75,12.8410159 75,21.5015498 C75,28.5719428 78.1194833,37 92.9709365,37 L96,37 C108.364909,37 117,30.6270373 117,21.5015498 C117,12.8410159 117,6 97.6146394,6 L94.3853606,6 Z" id="Right" fill-rule="nonzero"></path>
          <path d="M2.95454545,5.77156439 C3.64590909,5.09629136 11.2095455,0 32.5,0 C50.3513636,0 54.1302273,1.85267217 59.8502273,4.6518809 L60.2689233,4.85850899 C60.6666014,4.99901896 62.7002447,5.68982981 65.0790606,5.76579519 C67.2462948,5.67278567 69.1000195,5.08540191 69.641698,4.89719767 C76.1703915,1.7220864 82.5610971,0 97.5,0 C118.790455,0 126.354091,5.09629136 127.045455,5.77156439 C128.679318,5.77156439 130,7.06150904 130,8.65734659 L130,11.5431288 C130,13.1389663 128.679318,14.428911 127.045455,14.428911 C127.045455,14.428911 120.143997,14.428911 120.143997,17.3146932 C120.143997,20.2004754 118.181818,13.1389663 118.181818,11.5431288 L118.181818,8.73240251 C114.578575,7.35340151 108.128411,4.78617535 97.5,4.78617535 C85.6584651,4.78617535 79.7610984,6.88602813 74.7022935,8.97112368 L74.7588636,9.10752861 L74.7563667,11.0937608 L72.5391666,16.4436339 L69.8004908,15.3608351 C69.5558969,15.2641292 69.0281396,15.090392 68.2963505,14.9099044 C66.256272,14.4067419 64.1589087,14.253569 62.3040836,14.6343084 C61.6235903,14.7739931 60.9922286,14.9836085 60.4128127,15.266732 L57.7704824,16.5578701 L55.1266751,11.3962031 L55.2440909,9.10175705 L55.3248203,8.90683855 C50.9620526,6.87386374 46.9392639,4.78617535 32.5,4.78617535 C21.8721459,4.78617535 15.422131,7.3524397 11.8181818,8.7314671 L11.8181818,11.5431288 C11.8181818,13.1389663 8.86363636,20.2004754 8.86363636,17.3146932 C8.86363636,14.428911 2.95454545,14.428911 2.95454545,14.428911 C1.32363636,14.428911 0,13.1389663 0,11.5431288 L0,8.65734659 C0,7.06150904 1.32363636,5.77156439 2.95454545,5.77156439 Z" id="Stuff" fill-rule="nonzero"></path>
      </g>
  </g>
  </svg></g></g></g></g></svg></div> <div class="d-flex flex-column flex-grow-1"><p class="d-flex title fw-400 fs-14 text-ellipsis mb-0"><span class="flex">{{item.username}}</span> <span class="d-flex justify-content-end align-items-center"><small class="text-muted">{{item.addTime}}</small></span></p></div></div></div>
                          <!-- --------- -->
                        <div class="siderbar-apps__body mh-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="app-content mobile-model">
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
              <div
                id="sidetools"
                class="macwk-animation tinUpIn"
                style="display: none"
              >
                <div class="sidetools-item">
                  <div class="sidetools-wrapper">
                    <a class="cursor"
                      ><span class="sidetools-icon kfwx"></span
                    ></a>
                  </div>
                </div>
                <div class="sidetools-item">
                  <div class="sidetools-wrapper">
                    <a class="cursor"
                      ><span class="sidetools-icon kfqq"></span
                    ></a>
                  </div>
                </div>
                <div class="sidetools-item">
                  <div class="sidetools-wrapper">
                    <a class="el-tooltip cursor"
                      ><span class="sidetools-icon back-top"></span
                    ></a>
                  </div>
                </div>
                <span>
                  <div
                    role="tooltip"
                    id="el-popover-3962"
                    aria-hidden="true"
                    class="el-popover el-popper"
                    style="width: 200px; display: none"
                  >
                    <!---->
                    <div class="text-center">
                      <a href="feedback.html" class="mt-15 mb-0">在线留言</a>
                    </div>
                  </div>
                  <span class="el-popover__reference-wrapper"></span>
                </span>
                <span>
                  <div
                    role="tooltip"
                    id="el-popover-1793"
                    aria-hidden="true"
                    class="el-popover el-popper"
                    style="width: 200px; display: none"
                  >
                    <!---->
                    <div class="text-center">
                      <a href="feedback.html" class="mt-15 mb-0">在线留言</a>
                    </div>
                  </div>
                  <span class="el-popover__reference-wrapper"></span>
                </span>
              </div>
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
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetArticleBtmatte } from "../asyncApi/webarticle";
import { getAllArticle, getAllArticleNumber} from '@/api/webarticle'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { formatDate } from '@/utils/date.js'
import { getArticleClasslist} from '@/api/webarticleclass'
import { getNewArticleComment }from '@/api/webarticleComment'
export default {
  name: 'ArticleList',
  components: { 
    top: () => import("./components/Top.vue"),
    foot: () => import("./components/Foots.vue"),
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      MatterArticleFirst:"",
      MatterArticles:"",
      Newarticlecomment: "",
      activeName: 'first',
      allIndex: true,
      classlist: "",
      acticve:'nav-link active',
      articleCount: "",
      istarget:"_self",
      istargetjudje:!true,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 8,
        click: 0 
      }
    }
  },
    // 当你想要动态页面内容有利于SEO或者是提升首屏渲染速度的时候，就在asyncData中请求数据
    // 所有接口通过服务端调用渲染
    // 只有列表通过服务端调用渲染，分类跟推荐接口在浏览器调用
  async asyncData({ route }) {
    let [MatterArticleFirst] = await Promise.all([
      GetArticleBtmatte({ page: route.params.id || 1 }),
    ]);
    return {
      MatterArticleFirst: MatterArticleFirst[0],
      MatterArticles: MatterArticleFirst,
      page: parseInt(route.params.id || 1),
    };
  },
  methods: {
     // 分页
         // 每页显示的条数
        handleSizeChange(val) {
            // 改变每页显示的条数 
            this.listQuery.limit=val
            // 点击每页显示的条数时，显示第一页
            this.getData(val,1)
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.currentPage=1  
        },
          // 显示第几页
        handleCurrentChange(val) {
            // 改变默认的页数
            this.listQuery.page=val
            // 切换页码时，要获取每页显示的条数
            this.getList()
        },
    getNewarticleclass(id) {
      console.log("启动")
      this.clickIndex = id
      this.allIndex = false
      //重新请求全部列表
       this.list = this.template
      //过滤器，过滤sortclass为id的
      setTimeout(() => {
        let lists  =  this.list.filter ( item => item.sortClass == id)
      this.list = lists
      this.list = this.addBackgroundStyles(this.list);
      }, )
    },
    istargetJudje(){
      if(!this.istargetjudje){
        this.istarget="_self"
      }else{
        this.istarget="_blank"
      }
    },
    addBackgroundStyles(items) {
      const backgroundColors = [
        "linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);",
        "linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);",
        "linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);",
        "linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);",
        "linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);",
        "linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%);",
        "linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);",
        "linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
      ];
      return items.map(item => {
        if (!item.thumb) {
          const index = Math.floor(Math.random() * backgroundColors.length);
          item.backgroundStyle = `background-image: ${backgroundColors[index]};`;
        }
        return item;
      });
    },
    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd hh:mm ')
    },
    async  getList() {
      //获取重要文章
      // let res1 = await  GetArticleBtmatte();
      // if (res1) {
      //  this.MatterArticleFirst = res1.data[0]
      //   this.MatterArticles = res1.data
      // }

       this.MatterArticles.shift();
      this.allIndex = true
      this.clickIndex = false
      this.listLoading = true
      let res2 = await getAllArticle(this.listQuery, 0);
       if (res2) {
          //获取文章
        this.list = res2.data.data
        this.list = this.addBackgroundStyles(this.list);
        this.template = res2.data.data
        this.total = res2.data.total
      }
    this.listLoading = false
      let res3 = await getArticleClasslist();
      if (res3) {
        //获取分类    
        this.classlist = res3.data
      }
     let res4 = await  getNewArticleComment(9);
      if (res4) {
        //获取最新评论
        this.Newarticlecomment = res4.data
      }
    },
    async getNumber() {
      let res = await getAllArticleNumber();
      if (res) {
       this.articleCount = res.data
      }
      }
  },
mounted() {
    // 判断是否在服务端
    if (process.client) {
      // this.lazyLoad();
      // 在浏览器端调接口，需要服务端做反向代理
        this.getList()
      this.getNumber()
    }

    // 顶部广告
    // (window.slotbydup = window.slotbydup || []).push({
    //   id: "u6324930",
    //   container: "_utrtw8kq5so",
    //   async: true,
    // });
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../static/mycss/top.css";
@import "../static/mycss/body.css";
</style>
<style scoped>
.menu__link {
  font-weight:bold;
}
/* 去掉中间数据的分割线 */
.el-table__row > td {
  border: none;
}
/* 去掉上面的线 */
.el-table th.is-leaf {
  border: none;
}
/* 去掉最下面的那一条线 */
.el-table::before {
  height: 0px;
}
/* 去掉页数选择 */
.el-select el-select--mini {
  visibility: hidden;
}
.el-pagination__total {
  visibility: hidden;
}
/* 圆角 */
.pagination-container {
  border-radius: 20px;
}
.delay-0{
  border-radius: 8px;
}
</style>

<style lang="scss" scoped>
.delay-0 {
  :deep(.el-image__inner) {
     border-radius: 8px;
    }
  
}
</style>