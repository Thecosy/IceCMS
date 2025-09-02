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
          page-title="隐私协议"
        />
      </header>

      <main class="layout hide-aside" id="content-inner">
        <div id="page">
          <div id="article-container" class="line-numbers">
            <h1>隐私政策</h1>
            <div>更新日期：<strong>2023/7/28</strong></div>
            <div>生效日期：<strong>2023/7/28</strong></div>
            
            <h2>导言</h2>
            <p>
              <i>Carol 小屋</i> 是一款由 <i>Carol</i> （以下简称"我们"）提供的产品。
              您在使用我们的服务时，我们可能会收集和使用您的相关信息。我们希望通过本《隐私政策》向您说明，在使用我们的服务时，我们如何收集、使用、储存和分享这些信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。
              本《隐私政策》与您所使用的 <i>Carol Blog</i> 服务息息相关，希望您仔细阅读，在需要时，按照本《隐私政策》的指引，作出您认为适当的选择。本《隐私政策》中涉及的相关技术词汇，我们尽量以简明扼要的表述，并提供进一步说明的链接，以便您的理解。
            </p>
            <p><strong>您使用或继续使用我们的服务，即意味着同意我们按照本《隐私政策》收集、使用、储存和分享您的相关信息。</strong></p>
            <p>如对本《隐私政策》或相关事宜有任何问题，请通过 <strong>lxw@cnkj.site</strong> 与我们联系。</p>
            
            <h2>1. 我们收集的信息</h2>
            <p>我们或我们的第三方合作伙伴提供服务时，可能会收集、储存和使用下列与您有关的信息。如果您不提供相关信息，可能无法注册成为我们的用户或无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。</p>
            <p>我们接入的第三方SDK：</p>
            <ul>
              <li>51la</li>
              <li>评论系统</li>
            </ul>
            
            <h2>2. 信息的存储</h2>
            <p><strong>2.1 信息存储的方式和期限</strong></p>
            <ul>
              <li>我们会通过安全的方式存储您的信息，包括本地存储（例如利用APP进行数据缓存）、数据库和服务器日志。</li>
              <li>一般情况下，我们只会在为实现服务目的所必需的时间内或法律法规规定的条件下存储您的个人信息。</li>
            </ul>
            <p><strong>2.2 信息存储的地域</strong></p>
            <ul>
              <li>我们会按照法律法规规定，将境内收集的用户个人信息存储于中国境内。</li>
              <li>目前我们不会跨境传输或存储您的个人信息。将来如需跨境传输或存储的，我们会向您告知信息出境的目的、接收方、安全保证措施和安全风险，并征得您的同意。</li>
            </ul>
            <p><strong>2.3 产品或服务停止运营时的通知</strong></p>
            <ul>
              <li>当我们的产品或服务发生停止运营的情况时，我们将以推送通知、公告等形式通知您，并在合理期限内删除您的个人信息或进行匿名化处理，法律法规另有规定的除外。</li>
            </ul>
            
            <h2>3. 信息安全</h2>
            <p>
              我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权阅览或披露。例如，在某些服务中，我们将利用加密技术（例如SSL）来保护您提供的个人信息。但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。
            </p>
            
            <h2>4. 我们如何使用信息</h2>
            <p>我们可能将在向您提供服务的过程之中所收集的信息用作下列用途：</p>
            <ul>
              <li>向您提供服务；</li>
              <li>在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性；</li>
              <li>帮助我们设计新服务，改善我们现有服务；</li>
              <li>使我们更加了解您如何接入和使用我们的服务，从而针对性地回应您的个性化需求，例如语言设定、位置设定、个性化的帮助服务和指示，或对您和其他用户作出其他方面的回应；</li>
              <li>向您提供与您更加相关的广告以替代普遍投放的广告；</li>
              <li>评估我们服务中的广告和其他促销及推广活动的效果，并加以改善；</li>
              <li>软件认证或管理软件升级；</li>
              <li>让您参与有关我们产品和服务的调查。</li>
            </ul>
            
            <h2>5. 信息共享</h2>
            <p>
              目前，我们不会主动共享或转让您的个人信息至第三方，如存在其他共享或转让您的个人信息或您需要我们将您的个人信息共享或转让至第三方情形时，我们会直接或确认第三方征得您对上述行为的明示同意。
            </p>
            <p>
              为了投放广告，评估、优化广告投放效果等目的，我们需要向广告主及其代理商等第三方合作伙伴共享您的部分数据，要求其严格遵守我们关于数据隐私保护的措施与要求，包括但不限于根据数据保护协议、承诺书及相关数据处理政策进行处理，避免识别出个人身份，保障隐私安全。
            </p>
            <p>
              我们不会向合作伙伴分享可用于识别您个人身份的信息（例如您的姓名或电子邮件地址），除非您明确授权。
            </p>
            <p>
              我们不会对外公开披露所收集的个人信息，如必须公开披露时，我们会向您告知此次公开披露的目的、披露信息的类型及可能涉及的敏感信息，并征得您的明示同意。
            </p>
            <p>
              随着我们业务的持续发展，我们有可能进行合并、收购、资产转让等交易，我们将告知您相关情形，按照法律法规及不低于本《隐私政策》所要求的标准继续保护或要求新的控制者继续保护您的个人信息。
            </p>
            <p>
              另外，根据相关法律法规及国家标准，以下情形中，我们可能会共享、转让、公开披露个人信息无需事先征得您的授权同意：
            </p>
            <ul>
              <li>与国家安全、国防安全直接相关的；</li>
              <li>与公共安全、公共卫生、重大公共利益直接相关的；</li>
              <li>犯罪侦查、起诉、审判和判决执行等直接相关的；</li>
              <li>出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</li>
              <li>个人信息主体自行向社会公众公开个人信息的；</li>
              <li>从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</li>
            </ul>
            
            <h2>6. 您的权利</h2>
            <p>
              在您使用我们的服务期间，我们可能会视产品具体情况为您提供相应的操作设置，以便您可以查询、删除、更正或撤回您的相关个人信息，您可参考相应的具体指引进行操作。此外，我们还设置了投诉举报渠道，您的意见将会得到及时的处理。如果您无法通过上述途径和方式行使您的个人信息主体权利，您可以通过本《隐私政策》中提供的联系方式提出您的请求，我们会按照法律法规的规定予以反馈。
            </p>
            
            <h2>7. 变更</h2>
            <p>
              我们可能适时修订本《隐私政策》的条款。当变更发生时，我们会在版本更新时向您提示新的《隐私政策》，并向您说明生效日期。请您仔细阅读变更后的《隐私政策》内容，<strong>若您继续使用我们的服务，即表示您同意我们按照更新后的《隐私政策》处理您的个人信息。</strong>
            </p>
            
            <h2>8. 未成年人保护</h2>
            <p>
              我们鼓励父母或监护人指导未满十八岁的未成年人使用我们的服务。我们建议未成年人鼓励他们的父母或监护人阅读本《隐私政策》，并建议未成年人在提交的个人信息之前寻求父母或监护人的同意和指导。
            </p>

            <hr>
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

    <!-- 协议提醒助手 -->
    <div class="needEndHide" id="cookies-window" v-show="showCookieNotice">
      <div class="cookies-window-title">协议提醒助手</div>
      <div class="cookies-window-content">
        <span class="cookies-tip">查看本站为你的个人隐私做出的努力</span>
        <a class="cookies-link" href="#" title="本站如何保护你的隐私" @click="showCookieNotice = false">
          <i class="bber-gotobb haofont hao-icon-circle-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNavigation from '../components/HeaderNavigation.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'PrivacyPage',
  components: {
    HeaderNavigation,
    Footer
  },
  data() {
    return {
      isLoading: true,
      darkMode: false,
      showCookieNotice: true,
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
      ]
    }
  },
  mounted() {
    this.initApp()
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
      const permalink = "/archives/1697175593762"
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
    }
  }
}
</script>

<style scoped>
/* 隐私政策页面特有样式 */
#article-container {
  background: var(--heo-card-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: var(--heo-shadow-border);
  border: var(--style-border);
  line-height: 1.6;
}

#article-container h1 {
  font-size: 2.2rem;
  color: var(--heo-theme);
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 700;
}

#article-container h2 {
  font-size: 1.5rem;
  color: var(--heo-fontcolor);
  margin: 2rem 0 1rem 0;
  font-weight: 600;
  border-bottom: 2px solid var(--heo-theme-op);
  padding-bottom: 0.5rem;
}

#article-container p {
  margin: 1rem 0;
  color: var(--heo-fontcolor);
  text-align: justify;
}

#article-container strong {
  color: var(--heo-theme);
  font-weight: 600;
}

#article-container i {
  color: var(--heo-theme);
  font-style: italic;
}

#article-container ul {
  margin: 1rem 0;
  padding-left: 2rem;
}

#article-container li {
  margin: 0.5rem 0;
  color: var(--heo-fontcolor);
  line-height: 1.6;
}

#article-container li::marker {
  color: var(--heo-theme);
}

#article-container hr {
  margin: 2rem 0;
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--heo-theme-op), transparent);
}

.line-numbers {
  position: relative;
}

/* 协议提醒助手样式 */
#cookies-window {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--heo-card-bg);
  border: var(--style-border);
  border-radius: 12px;
  box-shadow: var(--heo-shadow-border);
  padding: 1rem 1.5rem;
  z-index: 1000;
  max-width: 300px;
  animation: slideInRight 0.3s ease-out;
}

.cookies-window-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--heo-fontcolor);
  margin-bottom: 0.5rem;
}

.cookies-window-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.cookies-tip {
  font-size: 0.9rem;
  color: var(--heo-secondtext);
  flex: 1;
}

.cookies-link {
  color: var(--heo-theme);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cookies-link:hover {
  color: var(--heo-theme);
  transform: translateX(3px);
}

.cookies-link i {
  font-size: 1.2rem;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 响应式适配 */
@media screen and (max-width: 768px) {
  #article-container {
    padding: 1.5rem;
    margin: 1rem 0;
  }
  
  #article-container h1 {
    font-size: 1.8rem;
  }
  
  #article-container h2 {
    font-size: 1.3rem;
  }
  
  #cookies-window {
    bottom: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .cookies-window-content {
    flex-direction: column;
    text-align: center;
  }
}

/* 暗色模式下的文本对比度优化 */
[data-theme="dark"] #article-container p,
[data-theme="dark"] #article-container li {
  color: rgba(255, 255, 255, 0.85);
}

[data-theme="dark"] #article-container h2 {
  color: rgba(255, 255, 255, 0.9);
}
</style>