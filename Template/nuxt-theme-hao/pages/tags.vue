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
          page-title="标签"
        />
      </header>

      <main class="layout hide-aside" id="content-inner">
        <div id="page">
          <h1 class="page-title" style="display: inline;">标签</h1>
          <div class="tag-cloud-title is-center">标签 - <span class="tag-cloud-amount">{{ totalTags }}</span></div>
          <div class="tag-cloud-list is-center">
            <a v-for="tag in allTags" :key="tag.id" 
               :href="tag.link" 
               :id="tag.id" 
               :style="getTagStyle(tag)"
               @click="navigateToTag(tag, $event)">
              <span class="tags-punctuation">{{ tag.name }}</span>
              <span class="tagsPageCount">{{ tag.count }}</span>
            </a>
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
  name: 'TagsPage',
  components: {
    HeaderNavigation,
    Footer
  },
  data() {
    return {
      isLoading: true,
      darkMode: false,
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
      allTags: [
        { id: 'tv', name: 'tv', link: 'tv.html', count: 1 },
        { id: 'SurveillanceStation', name: 'SurveillanceStation', link: 'surveillancestation.html', count: 1 },
        { id: '监控', name: '监控', link: 'jian-kong.html', count: 1 },
        { id: '邮箱', name: '邮箱', link: 'you-xiang.html', count: 0 },
        { id: 'aipan', name: 'aipan', link: 'aipan.html', count: 1 },
        { id: '旅游', name: '旅游', link: 'lu-you.html', count: 0 },
        { id: 'reader', name: 'reader', link: 'reader.html', count: 1 },
        { id: 'wordpress', name: 'wordpress', link: 'wordpress.html', count: 1 },
        { id: 'rss', name: 'rss', link: 'rss.html', count: 1 },
        { id: 'comment', name: 'comment', link: 'comment.html', count: 2 },
        { id: 'artalk', name: 'artalk', link: 'artalk.html', count: 1 },
        { id: '民航', name: '民航', link: 'min-hang.html', count: 1 },
        { id: '推广', name: '推广', link: 'tui-guang.html', count: 0 },
        { id: '付费文章', name: '付费文章', link: 'fu-fei-wen-zhang.html', count: 8 },
        { id: 'html', name: 'html', link: 'html1.html', count: 2 },
        { id: 'twikoo', name: 'twikoo', link: 'twikoo.html', count: 1 },
        { id: 'redis', name: 'redis', link: 'redis.html', count: 2 },
        { id: 'plugin', name: 'plugin', link: 'plugin.html', count: 1 },
        { id: 'javascript', name: 'javascript', link: 'javascript.html', count: 2 },
        { id: 'php', name: 'php', link: 'php.html', count: 1 },
        { id: 'database', name: 'database', link: 'database.html', count: 2 },
        { id: '1panel', name: '1panel', link: '1panel.html', count: 1 },
        { id: 'windows', name: 'windows', link: 'windows.html', count: 2 },
        { id: 'aliyun', name: 'aliyun', link: 'aliyun.html', count: 2 },
        { id: 'nginx', name: 'nginx', link: 'nginx.html', count: 3 },
        { id: 'ssl', name: 'ssl', link: 'ssl.html', count: 3 },
        { id: 'docker', name: 'docker', link: 'docker.html', count: 6 },
        { id: 'alist', name: 'alist', link: 'alist.html', count: 2 },
        { id: 'linux', name: 'linux', link: 'linux.html', count: 6 },
        { id: 'lsky', name: 'lsky', link: 'lsky.html', count: 2 },
        { id: 'moviepilot', name: 'moviepilot', link: 'moviepilot.html', count: 1 },
        { id: 'openresty', name: 'openresty', link: 'openresty.html', count: 2 },
        { id: 'halo', name: 'halo', link: 'halo.html', count: 6 },
        { id: 'thymeleaf', name: 'thymeleaf', link: 'thymeleaf.html', count: 1 },
        { id: 'elasticsearch', name: 'elasticsearch', link: 'elasticsearch.html', count: 5 },
        { id: 'kafka', name: 'kafka', link: 'kafka.html', count: 3 },
        { id: 'python', name: 'python', link: 'python.html', count: 18 },
        { id: 'afdian', name: 'afdian', link: 'afdian.html', count: 1 },
        { id: 'homepage', name: 'homepage', link: 'homepage.html', count: 4 },
        { id: 'synology', name: 'synology', link: 'synology.html', count: 10 },
        { id: 'minio', name: 'minio', link: 'minio.html', count: 1 },
        { id: 'git', name: 'git', link: 'git.html', count: 2 },
        { id: 'java', name: 'java', link: 'java.html', count: 91 }
      ]
    }
  },
  computed: {
    totalTags() {
      return this.allTags.length
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
      const permalink = "/archives/1719033024311"
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
    
    getTagStyle(tag) {
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#F4D03F'
      ]
      const randomColor = colors[Math.abs(tag.name.charCodeAt(0)) % colors.length]
      
      // 根据标签文章数量调整字体大小
      let fontSize = '1em'
      if (tag.count >= 10) {
        fontSize = '1.4em'
      } else if (tag.count >= 5) {
        fontSize = '1.2em'
      } else if (tag.count >= 3) {
        fontSize = '1.1em'
      }
      
      return {
        fontSize: fontSize,
        color: randomColor
      }
    },
    
    navigateToTag(tag, event) {
      // 如果标签文章数为0，阻止跳转
      if (tag.count === 0) {
        event.preventDefault()
        console.log(`标签 "${tag.name}" 暂无文章`)
        return false
      }
      // 继续正常跳转
      return true
    }
  }
}
</script>

<style scoped>
/* 标签页面特有样式 */
.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--heo-fontcolor);
  margin-bottom: 2rem;
  text-align: center;
}

.tag-cloud-title {
  font-size: 1.2rem;
  color: var(--heo-secondtext);
  margin-bottom: 2rem;
  font-weight: 500;
}

.tag-cloud-title .tag-cloud-amount {
  color: var(--heo-theme);
  font-weight: bold;
}

.is-center {
  text-align: center;
}

.tag-cloud-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background: var(--heo-card-bg);
  border-radius: 12px;
  border: var(--style-border);
  box-shadow: var(--heo-shadow-border);
  margin: 2rem 0;
}

.tag-cloud-list a {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.tag-cloud-list a:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.2);
}

.tags-punctuation {
  font-weight: 500;
  margin-right: 0.3rem;
}

.tagsPageCount {
  background: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.1rem 0.4rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}

/* 暗色模式下的标签样式 */
[data-theme="dark"] .tag-cloud-list a {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .tag-cloud-list a:hover {
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .tagsPageCount {
  background: rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.8);
}

/* 响应式适配 */
@media screen and (max-width: 768px) {
  .page-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .tag-cloud-list {
    padding: 1.5rem;
    gap: 0.8rem;
    margin: 1.5rem 0;
  }
  
  .tag-cloud-list a {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .tags-punctuation {
    margin-right: 0.2rem;
  }
  
  .tagsPageCount {
    font-size: 0.7rem;
    padding: 0.1rem 0.3rem;
  }
}

@media screen and (max-width: 480px) {
  .tag-cloud-list {
    padding: 1rem;
    gap: 0.6rem;
  }
  
  .tag-cloud-list a {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
}

/* 标签云动画效果 */
.tag-cloud-list a {
  animation: tagFadeIn 0.6s ease-out backwards;
}

.tag-cloud-list a:nth-child(1) { animation-delay: 0.1s; }
.tag-cloud-list a:nth-child(2) { animation-delay: 0.15s; }
.tag-cloud-list a:nth-child(3) { animation-delay: 0.2s; }
.tag-cloud-list a:nth-child(4) { animation-delay: 0.25s; }
.tag-cloud-list a:nth-child(5) { animation-delay: 0.3s; }
.tag-cloud-list a:nth-child(6) { animation-delay: 0.35s; }
.tag-cloud-list a:nth-child(7) { animation-delay: 0.4s; }
.tag-cloud-list a:nth-child(8) { animation-delay: 0.45s; }
.tag-cloud-list a:nth-child(9) { animation-delay: 0.5s; }
.tag-cloud-list a:nth-child(10) { animation-delay: 0.55s; }

@keyframes tagFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 零文章标签特殊样式 */
.tag-cloud-list a[data-count="0"] {
  opacity: 0.5;
  cursor: not-allowed;
}

.tag-cloud-list a[data-count="0"]:hover {
  transform: none;
  box-shadow: none;
}
</style>