<template>
  <div>

    <!-- 网站背景 -->
    <div id="web_bg">
      <div>
        <img class="global_background_img" src="/static/picture/656d71d4dd672.webp">
      </div>
    </div>

    <!-- 网站背景 -->
    <div id="an_music_bg"></div>

    <!-- 控制台 -->
    <div id="console">
      <div class="close-btn" @click="hideConsole">
        <i class="haofont hao-icon-circle-xmark"></i>
      </div>
      <div class="console-card-group">
        <!-- 评论，需要使用评论插件，获取最近评论 -->
        <div class="console-card-group-left">
          <div class="console-card" id="card-newest-comments" @click="hideConsole">
            <div class="card-content">
              <div class="author-content-item-tips">互动</div>
              <span class="author-content-item-title">最近评论</span>
            </div>
            <div class="aside-list">
              <div class="aside-list-item" v-for="comment in recentComments" :key="comment.id">
                <a :href="comment.link" class="thumbnail" data-pjax-state="">
                  <img :src="comment.avatar" :alt="comment.author">
                  <div class="name"><span>{{ comment.author }}</span></div>
                </a>
                <div class="content">
                  <a class="comment" :href="comment.link" :title="comment.content" data-pjax-state="">{{ comment.content }}</a>
                  <time :datetime="comment.datetime">{{ comment.formattedTime }}</time>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧展示 tag -->
        <div class="console-card-group-right">
          <div class="console-card tags" @click="hideConsole">
            <div class="card-content">
              <div class="author-content-item-tips">标签</div>
              <span class="author-content-item-title">寻找感兴趣的领域</span>
            </div>
            <div class="card-tag-cloud">
              <a v-for="tag in tags" :key="tag.name" style="font-size:1em;color:#d3d3d3" :href="tag.link">
                {{ tag.name }}<sup>{{ tag.count }}</sup>
              </a>
            </div>
          </div>
          <!-- 底部展示时间归档 -->
          <div class="console-card history" @click="hideConsole">
            <div class="item-headline"><i class="fas fa-archive"></i><span>文章</span></div>
            <ul class="card-archive-list">
              <li class="card-archive-list-item" v-for="archive in archiveList" :key="archive.link">
                <a class="card-archive-list-link" :href="archive.link">
                  <span class="card-archive-list-date">{{ archive.date }}</span>
                  <div class="card-archive-list-count-group">
                    <span class="card-archive-list-count">{{ archive.count }}</span>
                    <span class="card-archive-list-count-unit">篇</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="console-card-group-reward">
        <ul class="reward-all console-card">
          <li class="reward-item">
            <a href="/static/picture/vZWztN.webp" rel="external nofollow noreferrer" target="_blank" draggable="false">
              <img class="entered loaded" alt="微信" src="/static/picture/vZWztN.webp">
            </a>
            <div class="post-qr-code-desc">微信</div>
          </li>
          <li class="reward-item">
            <a href="/static/picture/UJ6Np5.webp" rel="external nofollow noreferrer" target="_blank" draggable="false">
              <img class="entered loaded" alt="支付宝" src="/static/picture/UJ6Np5.webp">
            </a>
            <div class="post-qr-code-desc">支付宝</div>
          </li>
        </ul>
      </div>

      <div class="button-group">
        <div class="console-btn-item">
          <a class="darkmode_switchbutton" href="javascript:void(0);" @click="switchDarkMode" rel="external nofollow" title="显示模式切换">
            <i class="haofont hao-icon-moon-clear-fill" style="font-size:1rem"></i>
          </a>
        </div>
        <div class="console-btn-item on" id="consoleHideAside" @click="hideAsideBtn" title="边栏显示控制">
          <a class="asideSwitch"><i class="haofont hao-icon-arrows-left-right"></i></a>
        </div>
        <div class="console-btn-item on" id="consoleCommentBarrage" @click="switchCommentBarrage" title="热评开关">
          <a class="commentBarrage"><i class="haofont hao-icon-chat--fill"></i></a>
        </div>
      </div>

      <div class="console-mask" @click="hideConsole"></div>
    </div>

    <!-- 侧栏，主要是手机端时会使用 -->
    <div id="sidebar">
      <div id="menu-mask"></div>
      <div id="sidebar-menus">
        <span class="sidebar-menu-item-title">功能</span>
        <div class="sidebar-menu-item">
          <a class="darkmode_switchbutton menu-child" href="javascript:void(0);" @click="switchDarkMode" rel="external nofollow" title="显示模式切换">
            <i class="haofont hao-icon-moon" style="font-size: 0.9rem;"></i>
            <span>显示模式</span>
          </a>
        </div>
        <!-- 菜单项... -->
      </div>
    </div>

    <!-- 内容 -->
    <div class="page" id="body-wrap">
      <!-- 头部导航栏组件 -->
      <header class="not-top-img" id="page-header">
        <HeaderNavigation 
          @random-post="toRandomPost"
          @open-search="openSearch"
          @redirect-login="redirectToLogin"
          @show-console="showConsole"
          @scroll-to-top="scrollToTop"
          page-title="关于"
        />
      </header>

      <main class="layout hide-aside" id="content-inner">
        <div id="page">
          <div id="about-page">
            <!-- 作者信息 -->
            <div class="author-info">
              <div class="author-img">
                <img src="/static/picture/logo-doiw.png">
              </div>
            </div>
            <div class="author-title">关于</div>
            
            <!-- 我的介绍&我的想法 -->
            <div class="author-content">
              <div class="author-content-item myInfoAndSayHello">
                <div class="title1">你好，很高兴认识你👋</div>
                <div class="title2">我叫 <span class="inline-word">Carol</span></div>
                <div class="title1">是一名 后端开发工程师</div>
              </div>
              <div class="aboutsiteTips author-content-item">
                <font color="#009966">
                  <span>
                    道可道，非常道；<br>
                    名可名，非常名。<br>
                    无名，天地之始；有名，万物之母。<br>
                    故常无欲，以观其妙；常有欲，以观其徼。<br>
                    此两者同出而异名，同谓之玄。<br>
                    玄之又玄，众妙之门。
                  </span>
                </font>
              </div>
            </div>

            <!-- hello -->
            <div class="hello-about">
              <div class="cursor" ref="cursor"></div>
              <div class="shapes">
                <div class="shape shape-1" ref="shape1"></div>
                <div class="shape shape-2" ref="shape2"></div>
                <div class="shape shape-3" ref="shape3"></div>
              </div>
              <div class="content">
                <h1>Hello there!</h1>
              </div>
            </div>

            <!-- 技能&职业生涯 -->
            <div class="author-content">
              <div class="author-content-item skills">
                <div class="card-content">
                  <div class="author-content-item-tips">技能</div>
                  <span class="author-content-item-title">开启创造力</span>
                  <div class="skills-style-group">
                    <div class="tags-group-all">
                      <div class="tags-group-wrapper">
                        <!-- 重复技术图标 -->
                        <div class="tags-group-icon-pair" v-for="(pair, index) in skillPairs" :key="index">
                          <div class="tags-group-icon" v-for="skill in pair" :key="skill.name" :style="{ background: skill.bg }">
                            <img :src="skill.image" :title="skill.name">
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="skills-list">
                      <div class="skill-info" v-for="skill in skills" :key="skill.name">
                        <div class="skill-icon" :style="{ background: skill.bg }">
                          <img :src="skill.image" :title="skill.name">
                        </div>
                        <div class="skill-name"><span>{{ skill.name }}</span></div>
                      </div>
                      <div class="etc">...</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="author-content-item careers">
                <div class="card-content">
                  <div class="author-content-item-tips">生涯</div>
                  <span class="author-content-item-title">无限进步</span>
                  <div class="careers-group">
                    <div class="careers-item">
                      <div class="circle" style="background:#7f7df2"></div>
                      <div class="name">Work</div>
                    </div>
                  </div>
                  <img alt="生涯" class="author-content-img" src="/static/picture/656d48723b0e2.webp">
                </div>
              </div>
            </div>

            <!-- personalities -->
            <div class="author-content">
              <div class="author-content-item personalities">
                <div class="author-content-item-tips">性格</div>
                <span class="author-content-item-title">调停者</span>
                <div class="title2" style="color: #33a474;">INFP</div>
                <div class="image">
                  <img src="/static/picture/infp.svg" style="transform: rotateY(180deg);">
                </div>
                <div class="post-tips">
                  在 <a href="https://www.16personalities.com/" rel="noopener nofollow" target="_blank">16personalities</a>
                  了解更多关于 <a rel="noopener external nofollow" target="_blank" href="https://www.16personalities.com/ch/INFP-人格">调停者</a>
                </div>
              </div>
              <div class="author-content-item myphoto">
                <img alt="自拍" class="author-content-img" src="/static/picture/6569a42c313e4.webp">
              </div>
            </div>

            <!-- 座右铭 -->
            <div class="author-content">
              <div class="author-content-item maxim">
                <div class="author-content-item-tips">座右铭</div>
                <span class="maxim-title">
                  <span style="opacity: 0.6;margin-bottom:8px;">一个实现梦想的人，</span>
                  <span>就是一个成功的人。</span>
                </span>
              </div>

              <div class="author-content-item buff">
                <div class="card-content">
                  <div class="author-content-item-tips">想一想</div>
                  <span class="buff-title">
                    <span style="opacity: 0.6;margin-bottom:8px;">尽力做好一件事，</span>
                    <span>实乃人生之首务。</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- 心路历程 -->
            <div class="author-content">
              <div class="create-site-post author-content-item single">
                <div class="author-content-item-tips">心路历程</div>
                <span class="author-content-item-title">为什么建站？</span>
                <br>创建这个站的时候，想要就是能够有一个自己能够<b>积累知识、积累兴趣</b>的地方。和他人分享，会让这些成为积累和沉淀。如果能够帮助到更多的人，帮助更多人解决问题，那一定是非常棒的事情。
                <br>分享这件事我从很早就开始了，起初做的微信公众号，现在做的网站。因为我比较喜欢研究数码和软件，想要探究在互联网上的事物是如何被创造和发展。网络给我带来了非常多的知识和眼界，我也想力所能及的分享一些我生活的琐碎知识。
                <br>与大多数垂直类的技术博客不同，这里的种类会非常的繁杂，有<b>技能的教程干货</b>、有<b>生活上的吐槽和妙招</b>、有<b>话题上的思考和想法</b>。一般我研究什么、发现了什么都会分享在这里。
                <br>这些就是创造这个小站的本意，<b>也是我分享生活的方式</b>。有幸能和你相遇在这里，相信我们能共同留下一段美好记忆。
              </div>
            </div>

            <!-- 十年之约 -->
            <div class="author-content">
              <div class="create-site-post author-content-item single">
                <div class="author-content-item-tips">始终如一，不离不弃</div>
                <span class="author-content-item-title">十年之约</span>
                <p>在这个十年中，我会用心感受生活的美好，用努力书写工作的篇章，用行动诠释人生的意义。这个进度条，不仅是数字的积累，更是我心中的期许和承诺。我相信，经过十年的坚持和努力，我会收获更多，成为一个更好的自己。</p>
                <div class="timeline">
                  <div class="progress" ref="progress"></div>
                  <div class="past-time" ref="pastTime"></div>
                  <div class="percentage-label" ref="percentageLabel"></div>
                </div>
                <div class="time-labels">
                  <div class="start-time" ref="startTime"></div>
                  <div class="end-time" ref="endTime"></div>
                </div>
              </div>
            </div>

            <!-- 赞赏名单 -->
            <div class="author-content">
              <div class="author-content-item single reward" id="about-reward">
                <div class="author-content-item-tips">致谢</div>
                <span class="author-content-item-title">赞赏名单</span>
                <div class="author-content-item-description">
                  感谢赞赏的人，因为你们，让我感受到写博客这件事情能够给你们创造价值。这会让我在这条路上走得更远。
                </div>

                <div class="about-reward">
                  <div id="con"></div>
                  <div id="TA-con" @click="showRewardConsole">
                    <div id="text-con">
                      <div id="linght"></div>
                      <div id="TA">赞赏作者</div>
                    </div>
                  </div>
                  <div id="tube-con">
                    <!-- SVG 管道图 -->
                    <svg viewbox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 77H234.226L307.006 24H790" stroke="#e5e9ef" stroke-width="20"></path>
                      <path d="M0 140H233.035L329.72 71H1028" stroke="#e5e9ef" stroke-width="20"></path>
                      <path d="M1 255H234.226L307.006 307H790" stroke="#e5e9ef" stroke-width="20"></path>
                      <path d="M0 305H233.035L329.72 375H1028" stroke="#e5e9ef" stroke-width="20"></path>
                      <rect y="186" width="236" height="24" fill="#e5e9ef"></rect>
                      <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#e5e9ef"></ellipse>
                      <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white"></circle>
                      <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#e5e9ef"></ellipse>
                      <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white"></circle>
                    </svg>
                    <div id="mask">
                      <svg viewbox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 77H234.226L307.006 24H790" stroke="#f25d8e" stroke-width="20"></path>
                        <path d="M0 140H233.035L329.72 71H1028" stroke="#f25d8e" stroke-width="20"></path>
                        <path d="M1 255H234.226L307.006 307H790" stroke="#f25d8e" stroke-width="20"></path>
                        <path d="M0 305H233.035L329.72 375H1028" stroke="#f25d8e" stroke-width="20"></path>
                        <rect y="186" width="236" height="24" fill="#f25d8e"></rect>
                        <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#f25d8e"></ellipse>
                        <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white"></circle>
                        <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#f25d8e"></ellipse>
                        <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white"></circle>
                      </svg>
                    </div>
                    <div id="orange-mask">
                      <svg viewbox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 77H234.226L307.006 24H790" stroke="#ffd52b" stroke-width="20"></path>
                        <path d="M0 140H233.035L329.72 71H1028" stroke="#ffd52b" stroke-width="20"></path>
                        <path d="M1 255H234.226L307.006 307H790" stroke="#ffd52b" stroke-width="20"></path>
                        <path d="M0 305H233.035L329.72 375H1028" stroke="#ffd52b" stroke-width="20"></path>
                        <rect y="186" width="236" height="24" fill="#ffd52b"></rect>
                        <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#ffd52b"></ellipse>
                        <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white"></circle>
                        <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#ffd52b"></ellipse>
                        <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white"></circle>
                      </svg>
                    </div>
                    <p id="people">共<b>{{ totalDonors }}</b>人</p>
                  </div>
                </div>
                
                <div class="reward-list-all">
                  <div class="reward-list-item" v-for="reward in rewardList" :key="reward.name">
                    <div>
                      <div>
                        <div class="reward-list-item-avatar">
                          <img :src="reward.avatar" :alt="reward.name">
                        </div>
                        <div style="z-index:20;float: left;" class="reward-list-item-avatar-group">
                          <div class="reward-list-item-name">{{ reward.name }}</div>
                        </div>
                      </div>
                      <div class="reward-list-bottom-group">
                        <div class="reward-list-item-money">¥{{ reward.amount }}</div>
                        <time class="datatime reward-list-item-time">{{ reward.datatime }}</time>
                      </div>
                    </div>
                  </div>
                </div>

                <a href="https://afdian.com/a/carolcoral" target="_blank">
                  <span class="sponar_afdian">爱发电</span>
                </a>
                
                <div class="reward-list-all">
                  <div class="reward-list-item" v-for="afdian in afdianRewards" :key="afdian.name">
                    <div>
                      <div>
                        <div class="reward-list-item-avatar">
                          <img :src="afdian.avatar" :alt="afdian.name">
                        </div>
                        <div style="z-index:20;float: left;" class="reward-list-item-avatar-group">
                          <div class="reward-list-item-name">{{ afdian.name }}</div>
                        </div>
                      </div>
                      <div class="reward-list-bottom-group">
                        <div class="reward-list-item-money" :style="afdian.vip ? { background: 'var(--heo-vip)' } : {}">
                          ¥{{ afdian.amount }}
                        </div>
                        <time class="datatime reward-list-item-time">{{ afdian.time }}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer 组件 -->
      <Footer @scroll-to-top="scrollToTop" />
    </div>

    <!-- 右下角悬浮操作按钮 -->
    <div id="rightside">
      <div id="rightside-config-hide">
        <button id="translateLink" type="button" title="简繁转换">繁</button>
        <button id="darkmode" type="button" title="浅色和深色模式转换" @click="switchDarkMode">
          <i class="haofont hao-icon-circle-half-stroke"></i>
        </button>
        <button id="hide-aside-btn" type="button" title="单栏和双栏切换" @click="toggleAside">
          <i class="haofont hao-icon-arrows-left-right"></i>
        </button>
      </div>
      <div id="rightside-config-show">
        <button id="rightside-config" type="button" title="设置">
          <i class="haofont hao-icon-gear"></i>
        </button>
        <a id="to_comment" href="#post-comment" title="直达评论">
          <i class="haofont hao-icon-chat--fill" style="font-size: 17px;"></i>
        </a>
        <button id="go-up" type="button" title="回到顶部" @click="scrollToTop">
          <i class="haofont hao-icon-arrow-up"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNavigation from '../components/HeaderNavigation.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'AboutPage',
  components: {
    HeaderNavigation,
    Footer
  },
  data() {
    return {
      isLoading: true,
      darkMode: false,
      totalDonors: 23,
      recentComments: [
        {
          id: 1,
          author: 'Zyx-2012',
          avatar: '/static/picture/avatar-blue.png',
          content: '昵称：折腾日记 网站地址：https://blog.zyx-2012.cn/ 头像图片url：https://blog.zyx-2012.cn/upload/450afd2435d73f8b0dd3fce81b64b913.jpeg 描述：专注于笔记、分享的博客',
          link: 'content.html#comment-7e09107e-3316-498c-96e4-47c0491a84ba',
          datetime: '2025-07-10 10:49:20',
          formattedTime: '2025-7-10'
        },
        {
          id: 2,
          author: '故河',
          avatar: '/static/picture/avatar-purple.png',
          content: '昵称：故河TTL 网站地址：https://blog.beyondsky.site 头像图片url：https://cdn.jsdelivr.net/gh/tongzanyang/PicGo@main/tx.jpg 描述：故河TTL - 分享技术与生活',
          link: 'content.html#comment-b718e36d-70aa-43ef-91e5-adc4743b049d',
          datetime: '2025-07-04 10:56:06',
          formattedTime: '2025-7-4'
        },
        {
          id: 3,
          author: 'James',
          avatar: '/static/picture/picture.webp',
          content: '我也是用NAS搭建的WP博客，看你在博客里做了些 赚钱的阅读方式。想了解下，真的有人会花钱么，你赚到钱了么',
          link: '1750037206574.html#comment-e4703467-924f-46cb-99ba-588f615c631d',
          datetime: '2025-07-01 11:19:35',
          formattedTime: '2025-7-1'
        }
      ],
      tags: [
        { name: '监控', link: 'jian-kong.html', count: 1 },
        { name: 'rss', link: 'rss.html', count: 1 },
        { name: 'docker', link: 'docker.html', count: 6 },
        { name: 'homepage', link: 'homepage.html', count: 4 },
        { name: 'reader', link: 'reader.html', count: 1 },
        { name: 'twikoo', link: 'twikoo.html', count: 1 },
        { name: 'linux', link: 'linux.html', count: 6 },
        { name: '付费文章', link: 'fu-fei-wen-zhang.html', count: 8 },
        { name: 'nginx', link: 'nginx.html', count: 3 },
        { name: 'ssl', link: 'ssl.html', count: 3 }
      ],
      archiveList: [
        { date: '八月 2025', link: '08.html', count: 1 },
        { date: '七月 2025', link: '07.html', count: 2 },
        { date: '六月 2025', link: '06.html', count: 5 }
      ],
      skills: [
        { name: 'AfterEffect', bg: '#989bf8', image: '/static/picture/AfterEffect.png' },
        { name: 'Sketch', bg: '#ffffff', image: '/static/picture/Sketch.png' },
        { name: 'Docker', bg: '#57b6e6', image: '/static/picture/Docker.png' },
        { name: 'Photoshop', bg: '#4082c3', image: '/static/picture/Photoshop.png' },
        { name: 'FinalCutPro', bg: '#ffffff', image: '/static/picture/FinalCutPro.png' },
        { name: 'Python', bg: '#ffffff', image: '/static/picture/Python.png' },
        { name: 'Swift', bg: '#eb6840', image: '/static/picture/Swift.png' },
        { name: 'Principle', bg: '#8f55ba', image: '/static/picture/Principle.png' },
        { name: 'illustrator', bg: '#f29e39', image: '/static/picture/illustrator.png' },
        { name: 'CSS3', bg: '#2c51db', image: '/static/picture/CSS3.png' },
        { name: 'JS', bg: '#f7cb4f', image: '/static/picture/JS.png' },
        { name: 'HTML', bg: '#e9572b', image: '/static/picture/HTML.png' },
        { name: 'Git', bg: '#df5b40', image: '/static/picture/Git.webp' },
        { name: 'Apifox', bg: '#1f1f1f', image: '/static/picture/Apifox.webp' }
      ],
      rewardList: [
        { name: '木木', amount: '1', datatime: '2024-11-15', avatar: '/static/picture/点赞、赞.png' },
        { name: '氵青一色', amount: '3', datatime: '2024-12-01', avatar: '/static/picture/点赞、赞.png' },
        { name: 'ZOM', amount: '13.2', datatime: '2025-03-21', avatar: '/static/picture/点赞、赞.png' }
      ],
      afdianRewards: [
        { name: 'Txiao Meng', amount: '4.00', time: '2025-05-05', avatar: '/static/picture/2df1eab78ecd2679a893b1ff6801a8f0_w1008_h997_s111.jpeg' },
        { name: '天空铃音', amount: '5.00', time: '2025-04-21', avatar: '/static/picture/8a2d42370040f8229b8ba2112db7944c_w500_h500_s184.jpg' },
        { name: 'ZOM', amount: '10.00', time: '2025-03-21', avatar: '/static/picture/652f4bbf2e8578d41237b674ccaf0a25_w132_h132_s4.jpeg' },
        { name: 'Halo', amount: '108.80', time: '2024-05-06', avatar: '/static/picture/dce7df712c32c8b607c44478c3c68144_w1024_h1024_s422.png', vip: true }
      ]
    }
  },
  computed: {
    skillPairs() {
      const pairs = []
      for (let i = 0; i < this.skills.length; i += 2) {
        pairs.push(this.skills.slice(i, i + 2))
      }
      // 重复一遍用于无缝循环
      return [...pairs, ...pairs]
    }
  },
  mounted() {
    this.initApp()
    this.initHelloAbout()
    this.initTenYearProgress()
  },
  methods: {
    initApp() {
      this.initTheme()
      this.endLoading()
    },
    
    initTheme() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme)
        this.darkMode = savedTheme === 'dark'
      } else {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        const theme = isDarkMode ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', theme)
        this.darkMode = isDarkMode
      }
    },
    
    endLoading() {
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    
    hideLoading() {
      this.isLoading = false
    },
    
    hideConsole() {
      const console = document.getElementById('console')
      if (console) {
        console.style.display = 'none'
      }
    },
    
    switchDarkMode() {
      this.darkMode = !this.darkMode
      const theme = this.darkMode ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    },
    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    
    toRandomPost() {
      const permalink = "/archives/1697437261206"
      window.location.href = permalink
    },
    
    openSearch() {
      if (window.SearchWidget) {
        window.SearchWidget.open()
      }
    },
    
    redirectToLogin() {
      const currentUrl = encodeURIComponent(window.location.href)
      window.location.href = `/login?redirect_uri=${currentUrl}`
    },
    
    showConsole() {
      const console = document.getElementById('console')
      if (console) {
        console.style.display = 'block'
        console.classList.add('show')
      }
    },
    
    hideAsideBtn() {
      document.documentElement.classList.toggle('hide-aside')
    },
    
    switchCommentBarrage() {
      console.log('切换热评开关')
    },
    
    toggleAside() {
      document.documentElement.classList.toggle('hide-aside')
    },
    
    showRewardConsole() {
      this.showConsole()
    },
    
    initHelloAbout() {
      const helloAboutEl = document.querySelector(".hello-about")
      if (helloAboutEl && this.$refs.cursor) {
        helloAboutEl.addEventListener("mousemove", (evt) => {
          const mouseX = evt.offsetX
          const mouseY = evt.offsetY
          
          if (this.$refs.cursor) {
            this.$refs.cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`
          }
          
          if (this.$refs.shape1) {
            this.$refs.shape1.style.transform = `translate(${mouseX}px, ${mouseY}px)`
          }
          if (this.$refs.shape2) {
            this.$refs.shape2.style.transform = `translate(${mouseX}px, ${mouseY}px)`
          }
          if (this.$refs.shape3) {
            this.$refs.shape3.style.transform = `translate(${mouseX}px, ${mouseY}px)`
          }
        })
      }
    },
    
    initTenYearProgress() {
      const startDate = new Date("2022-11-22").getTime()
      const endDate = new Date("2033-11-22").getTime()
      const progress = ((new Date().getTime() - startDate) / (endDate - startDate)) * 100
      const progressPercent = progress <= 100 ? progress + "%" : "100%"
      const labelText = progress <= 100 ? progress.toFixed(0) + "%" : "已达标 "
      
      if (this.$refs.pastTime) {
        this.$refs.pastTime.style.setProperty("--past-time-percentage", progress + "%")
      }
      if (this.$refs.progress) {
        this.$refs.progress.style.setProperty("--progress-percentage", progressPercent)
      }
      if (this.$refs.percentageLabel) {
        this.$refs.percentageLabel.textContent = progress < 10 ? "" : labelText
        this.$refs.percentageLabel.style.left = `calc(${progress}% - 3rem)`
        setTimeout(() => {
          this.$refs.percentageLabel.style.visibility = "visible"
        }, 2500)
      }
      if (this.$refs.startTime) {
        this.$refs.startTime.textContent = new Date(startDate).toLocaleDateString()
      }
      if (this.$refs.endTime) {
        this.$refs.endTime.textContent = new Date(endDate).toLocaleDateString()
      }
    }
  }
}
</script>

<style scoped>
/* 关于页面特有样式 */
.hello-about {
  margin: 20px auto 0;
  width: 100%;
  border-radius: 24px;
  background: var(--heo-card-bg);
  border: var(--style-border-always);
  box-shadow: var(--heo-shadow-border);
  position: relative;
  overflow: hidden;
  user-select: none;
}

.shapes {
  position: relative;
  height: 315px;
  width: 100%;
  background: #2128bd;
  overflow: hidden;
}

.shape {
  will-change: transform;
  position: absolute;
  border-radius: 50%;
}

.shape.shape-1 {
  background: #005ffe;
  width: 650px;
  height: 650px;
  margin: -325px 0 0 -325px;
}

.shape.shape-2 {
  background: #ffe5e3;
  width: 440px;
  height: 440px;
  margin: -220px 0 0 -220px;
}

.shape.shape-3 {
  background: #ffcc57;
  width: 270px;
  height: 270px;
  margin: -135px 0 0 -135px;
}

.hello-about .content {
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 315px;
  width: 100%;
  background: #fff;
  mix-blend-mode: screen;
}

[data-theme="dark"] .hello-about .content {
  background: transparent;
}

[data-theme="dark"] .hello-about h1 {
  color: var(--heo-white);
}

.hello-about h1 {
  font-size: 200px;
  color: #000;
  margin: 0;
  text-align: center;
  font: inherit;
  vertical-align: baseline;
  line-height: 1;
  font-size: calc((0.0989119683 * 100vw + (58.5558852621px)));
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 419px) {
  .hello-about h1 {
    font-size: calc((0.0989119683 * 100vw + (58.5558852621px)));
  }
}

@media (max-width: 768px) {
  .hello-about {
    margin: 20px 0 auto;
  }
}

.cursor {
  position: absolute;
  background: #2128bd;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border-radius: 50%;
  will-change: transform;
  user-select: none;
  pointer-events: none;
  z-index: 3;
}

/* 技能标签动画 */
.tags-group-wrapper {
  display: flex;
  flex-direction: column;
  animation: rowup 120s linear infinite;
  width: 320px;
  margin-left: auto;
  height: 200%;
}

.tags-group-icon-pair {
  display: flex;
  margin-left: 1rem;
  user-select: none;
}

.tags-group-icon-pair .tags-group-icon:nth-child(even) {
  margin-left: 4rem;
}

.tags-group-icon {
  width: 120px;
  height: 120px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 66px;
  font-weight: 700;
  box-shadow: var(--heo-shadow-blackdeep);
}

.tags-group-icon img {
  width: 60%;
}

@keyframes rowup {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.skill-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.skill-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.skill-icon img {
  width: 60%;
}

.skill-name span {
  font-size: 0.8rem;
  color: var(--heo-fontcolor);
}

/* 十年之约进度条样式 */
.timeline {
  position: relative;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  margin: 2rem 0;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #ffa500, #32cd32);
  border-radius: 10px;
  width: var(--progress-percentage, 0%);
  transition: width 2s ease-in-out;
}

.past-time {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: var(--past-time-percentage, 0%);
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.percentage-label {
  position: absolute;
  top: -30px;
  font-weight: bold;
  color: var(--heo-theme);
  visibility: hidden;
  transition: all 0.3s ease;
}

.time-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--heo-secondtext);
}

/* 赞赏相关样式 */
.about-reward {
  margin: 2rem 0;
  position: relative;
}

#tube-con {
  position: relative;
  width: 100%;
  height: 200px;
}

#tube-con svg {
  width: 100%;
  height: 100%;
}

#people {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: var(--heo-fontcolor);
}

.reward-list-all {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.reward-list-item {
  background: var(--heo-card-bg);
  border-radius: 12px;
  padding: 1rem;
  border: var(--style-border);
  box-shadow: var(--heo-shadow-border);
}

.reward-list-item-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  float: left;
  margin-right: 1rem;
}

.reward-list-item-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reward-list-item-name {
  font-weight: 600;
  color: var(--heo-fontcolor);
  margin-bottom: 0.5rem;
}

.reward-list-bottom-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.reward-list-item-money {
  background: var(--heo-theme);
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
  font-weight: 600;
}

.reward-list-item-time {
  color: var(--heo-secondtext);
  font-size: 0.9rem;
}

.sponar_afdian {
  font-size: 2em;
  color: antiquewhite;
  display: inline-block;
  margin: 2rem 0;
  text-decoration: none;
}

/* 其他样式继承 */
@media screen and (max-width: 768px) {
  .author-content {
    flex-direction: column;
  }
  
  .reward-list-all {
    grid-template-columns: 1fr;
  }
}
</style>