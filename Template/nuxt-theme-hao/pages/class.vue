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
          :page-title="`分类: ${currentCategory}`"
        />
      </header>

      <main class="layout" id="content-inner">
        <div id="category">
          <!-- 分类导航栏 -->
          <div id="category-bar">
            <div class="category-bar-items" id="category-bar-items">
              <div class="category-bar-item" id="category-bar-home">
                <a href="/">首页</a>
              </div>
              <div class="category-bar-item" 
                   v-for="category in categories" 
                   :key="category.id" 
                   :id="category.id"
                   :class="{ select: category.name === currentCategory }">
                <a :href="category.link">{{ category.name }}</a>
              </div>
            </div>
            <!-- 跳转到分类页 -->
            <a class="category-bar-more" href="/categories">更多</a>
          </div>

          <!-- 文章列表 -->
          <div class="recent-posts" id="recent-posts">
            <div class="recent-post-item"
                 v-for="(post, index) in posts" 
                 :key="post.id"
                 :class="getPostItemClass(index)"
                 @click="navigateToPost(post.link)">
              
              <div class="post_cover left_radius">
                <a :href="post.link" :title="post.title">
                  <img class="post_bg" :alt="post.title" :src="post.cover">
                </a>
              </div>
              
              <div class="recent-post-info">
                <div class="recent-post-info-top">
                  <div class="recent-post-info-top-tips">
                    <!-- 分类标签 -->
                    <span v-for="cat in post.categories" 
                          :key="cat" 
                          :href="`/categories/${cat}`" 
                          :title="cat" 
                          class="original">{{ cat }}</span>
                    <a class="unvisited-post" :href="post.link" :title="post.title" data-pjax-state="">未读</a>
                  </div>
                  <a class="article-title" :href="post.link" :title="post.title">{{ post.title }}</a>
                  <div class="content">{{ post.excerpt }}</div>
                </div>

                <div class="article-meta-wrap">
                  <!-- 标签 -->
                  <span class="article-meta tags" v-if="post.tags && post.tags.length > 0">
                    <a class="article-meta__tags" 
                       v-for="tag in post.tags" 
                       :key="tag.name"
                       @click="$event.stopPropagation()"
                       :href="tag.link" 
                       :title="tag.name">
                      <span class="tags-punctuation">{{ tag.name }}</span>
                    </a>
                  </span>
                  
                  <!-- 创建时间 -->
                  <span class="post-meta-date">
                    <i class="far fa-calendar-alt"></i>
                    <time style="display: inline;" :datetime="post.datetime" :title="post.dateTitle">{{ post.displayTime }}</time>
                  </span>
                </div>
              </div>
            </div>

            <!-- 分页 -->
            <nav id="pagination" v-if="pagination.total > 1">
              <div class="pagination">
                <!-- 页码按钮 -->
                <span v-for="page in pagination.pages" 
                      :key="page" 
                      :class="{ 'page-number': true, 'current': page === pagination.current }"
                      @click="goToPage(page)">{{ page }}</span>
              </div>
            </nav>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="aside-content" id="aside-content">
          <!-- 广告位 -->
          <div class="card-widget">
            <div class="item-headline"><span>微信赞赏码</span></div>
            <a href="https://www.lxware.cn?code=YkLIKMy8" target="_blank">
              <img src="/static/picture/placeholder.webp" alt="自定义广告">
            </a>
          </div>

          <!-- 最新评论 -->
          <div class="card-widget card-recent-post">
            <div class="item-headline">
              <i class="haofont hao-icon-chat--fill" style="font-size: 19px;"></i>
              <span>最新评论</span>
            </div>
            <div class="aside-list" id="newcomm">
              <div class="aside-list-item" v-for="comment in sidebarComments" :key="comment.id">
                <a class="thumbnail" :href="comment.link" data-pjax-state="">
                  <img :alt="comment.author" :src="comment.avatar">
                </a>
                <div class="content">
                  <a class="comment" 
                     style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;" 
                     :href="comment.link" 
                     :title="comment.content" 
                     data-pjax-state="">{{ comment.content }}</a>
                  <div class="name">
                    <span>{{ comment.author }} / </span>
                    <time :datetime="comment.datetime">{{ comment.formattedTime }}</time>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 最近发布 -->
          <div class="sticky_layout">
            <div class="card-widget card-recent-post">
              <div class="item-headline">
                <i class="haofont hao-icon-eicon_map-2-line1"></i>
                <span>最近发布</span>
              </div>
              <div class="aside-list">
                <div class="aside-list-item" v-for="recent in recentPosts" :key="recent.id">
                  <a class="thumbnail" :href="recent.link" :title="recent.title">
                    <img :alt="recent.title" :src="recent.cover">
                  </a>
                  <div class="content">
                    <a class="title" :href="recent.link" :title="recent.title">{{ recent.title }}</a>
                    <time :title="recent.datetime" :datetime="recent.datetime">{{ recent.displayTime }}</time>
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
  name: 'ClassPage',
  components: {
    HeaderNavigation,
    Footer
  },
  data() {
    return {
      isLoading: true,
      darkMode: false,
      currentCategory: '常用工具',
      categories: [
        { id: 'za-wen-xuan-ji', name: '杂文选集', link: '/categories/za-wen-xuan-ji' },
        { id: 'fu-fei-yue-du', name: '付费阅读', link: '/categories/fu-fei-yue-du' },
        { id: 'develop', name: '开发', link: '/categories/develop' },
        { id: 'server', name: '服务器', link: '/categories/server' },
        { id: 'shi-yong-jiao-cheng', name: '精选教程', link: '/categories/shi-yong-jiao-cheng' },
        { id: 'back-endrd', name: '后端', link: '/categories/back-endrd' },
        { id: 'you-hui', name: '优惠', link: '/categories/you-hui' },
        { id: 'html', name: '前端', link: '/categories/html' },
        { id: 'tools', name: '常用工具', link: '/categories/tools' }
      ],
      posts: [
        {
          id: '1755138269134',
          title: '家庭影院再升级-MOONTV',
          excerpt: '厌倦了繁琐的家庭影院搭建？这里有个轻松享受海量影视的新选择——无需折腾片源与下载，画质和广告要求不高的话，这款灵活部署的服务能让你的电视秒变在线影院，即刻开启观影自由！',
          cover: '/static/picture/tJBqDI.webp',
          link: '/archives/1755138269134',
          categories: ['精选教程', '常用工具', '付费阅读'],
          tags: [{ name: 'tv', link: '/tags/tv' }],
          datetime: '2025-08-14T03:19:39.429351314Z',
          dateTitle: '2025-08-14创建',
          displayTime: '4天前'
        },
        {
          id: '1746889673158',
          title: 'Twikoo评论系统部署及使用',
          excerpt: '通过Docker Compose的简便部署流程，确保服务在各类Linux系统上顺畅运行，同时对云服务器环境下可能遇到的访问障碍提供了解决策略。文章不仅覆盖了原生Linux命令行操作、1Panel及宝塔面板的图形化部署教程...',
          cover: '/static/picture/q9nPUO.webp',
          link: '/archives/1746889673158',
          categories: ['常用工具', '精选教程', '付费阅读'],
          tags: [
            { name: 'twikoo', link: '/tags/twikoo' },
            { name: '付费文章', link: '/tags/fu-fei-wen-zhang' },
            { name: 'comment', link: '/tags/comment' }
          ],
          datetime: '2025-05-10T15:22:38.735681746Z',
          dateTitle: '2025-05-10创建',
          displayTime: '2025-05-10'
        },
        {
          id: '1738978134138',
          title: '私有化部署Plausible Analytics',
          excerpt: 'Plausible Analytics 是一个以隐私为中心且轻量化的网站分析工具，旨在替代传统复杂的分析解决方案。其主要特点包括不使用 cookie、遵循隐私法规、实时数据反馈和开源特性...',
          cover: '/static/picture/jf9UX2.webp',
          link: '/archives/1738978134138',
          categories: ['常用工具'],
          tags: [{ name: 'docker', link: '/tags/docker' }],
          datetime: '2025-02-08T01:35:46.712394765Z',
          dateTitle: '2025-02-08创建',
          displayTime: '2025-02-08'
        }
      ],
      pagination: {
        current: 1,
        total: 1,
        pages: [1]
      },
      recentComments: [
        {
          id: 1,
          author: 'Zyx-2012',
          avatar: '/static/picture/avatar-blue.png',
          content: '昵称：折腾日记 网站地址：https://blog.zyx-2012.cn/ 头像图片url：https://blog.zyx-2012.cn/upload/450afd2435d73f8b0dd3fce81b64b913.jpeg 描述：专注于笔记、分享的博客',
          link: '/content#comment-7e09107e-3316-498c-96e4-47c0491a84ba',
          datetime: '2025-07-10 10:49:20',
          formattedTime: '2025-7-10'
        },
        {
          id: 2,
          author: '故河',
          avatar: '/static/picture/avatar-purple.png',
          content: '昵称：故河TTL 网站地址：https://blog.beyondsky.site 头像图片url：https://cdn.jsdelivr.net/gh/tongzanyang/PicGo@main/tx.jpg 描述：故河TTL - 分享技术与生活',
          link: '/content#comment-b718e36d-70aa-43ef-91e5-adc4743b049d',
          datetime: '2025-07-04 10:56:06',
          formattedTime: '2025-7-4'
        },
        {
          id: 3,
          author: 'James',
          avatar: '/static/picture/picture.webp',
          content: '我也是用NAS搭建的WP博客，看你在博客里做了些 赚钱的阅读方式。想了解下，真的有人会花钱么，你赚到钱了么',
          link: '/archives/1750037206574#comment-e4703467-924f-46cb-99ba-588f615c631d',
          datetime: '2025-07-01 11:19:35',
          formattedTime: '2025-7-1'
        }
      ],
      tags: [
        { name: '监控', link: '/tags/jian-kong', count: 1 },
        { name: 'rss', link: '/tags/rss', count: 1 },
        { name: 'docker', link: '/tags/docker', count: 6 },
        { name: 'homepage', link: '/tags/homepage', count: 4 },
        { name: 'reader', link: '/tags/reader', count: 1 },
        { name: 'twikoo', link: '/tags/twikoo', count: 1 },
        { name: 'linux', link: '/tags/linux', count: 6 },
        { name: '付费文章', link: '/tags/fu-fei-wen-zhang', count: 8 },
        { name: 'nginx', link: '/tags/nginx', count: 3 },
        { name: 'ssl', link: '/tags/ssl', count: 3 }
      ],
      archiveList: [
        { date: '八月 2025', link: '/archives/08', count: 1 },
        { date: '七月 2025', link: '/archives/07', count: 2 },
        { date: '六月 2025', link: '/archives/06', count: 5 }
      ],
      sidebarComments: [
        {
          id: 1,
          author: 'Zyx-2012',
          avatar: '/static/picture/avatar-blue.png',
          content: '昵称：折腾日记 网站地址：https://blog.zyx-2012.cn/ 头像图片url：https://blog.zyx-2012.cn/upload/450afd2435d73f8b0dd3fce81b64b913.jpeg 描述：专注于笔记、分享的博客',
          link: '/content#comment-7e09107e-3316-498c-96e4-47c0491a84ba',
          datetime: '2025-07-10 10:49:20',
          formattedTime: '2025-7-10'
        }
      ],
      recentPosts: [
        {
          id: 1,
          title: '家庭影院再升级-MOONTV',
          cover: '/static/picture/tJBqDI.webp',
          link: '/archives/1755138269134',
          datetime: '2025-08-14 11:19:39',
          displayTime: '2025-08-14 11:19:39'
        },
        {
          id: 2,
          title: '【群辉】群辉免费增加多个监控许可证',
          cover: '/static/picture/群辉免费增加多个监控许可证.png',
          link: '/archives/1753240296767',
          datetime: '2025-07-23 14:30:00',
          displayTime: '2025-07-23 14:30:00'
        }
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
      const permalink = "/archives/1697437943771"
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
    
    getPostItemClass(index) {
      return [
        'col1',
        'left',
        index % 2 === 0 ? 'odd' : 'even'
      ]
    },
    
    navigateToPost(link) {
      window.location.href = link
    },
    
    goToPage(page) {
      this.pagination.current = page
      // 这里可以添加实际的分页逻辑
      console.log('跳转到第', page, '页')
    }
  }
}
</script>

<style scoped>
/* 分类页面特有样式 */
#category-bar {
  background: var(--heo-card-bg);
  border-radius: 12px;
  padding: 1rem 2rem;
  margin: 2rem 0;
  box-shadow: var(--heo-shadow-border);
  border: var(--style-border);
}

.category-bar-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.category-bar-item {
  position: relative;
}

.category-bar-item a {
  display: inline-block;
  padding: 0.5rem 1rem;
  color: var(--heo-fontcolor);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.category-bar-item:hover a,
.category-bar-item.select a {
  background: var(--heo-theme);
  color: var(--heo-white);
  transform: translateY(-2px);
}

.category-bar-more {
  margin-left: auto;
  color: var(--heo-theme);
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.category-bar-more:hover {
  background: var(--heo-theme-op);
  transform: translateY(-2px);
}

/* 文章卡片样式 */
.recent-post-item {
  display: flex;
  background: var(--heo-card-bg);
  border-radius: 12px;
  margin-bottom: 2rem;
  padding: 1.5rem;
  box-shadow: var(--heo-shadow-border);
  border: var(--style-border);
  cursor: pointer;
  transition: all 0.3s ease;
}

.recent-post-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--heo-shadow-lightblack);
}

.post_cover {
  flex-shrink: 0;
  width: 200px;
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
  margin-right: 1.5rem;
}

.post_cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.recent-post-item:hover .post_cover img {
  transform: scale(1.05);
}

.recent-post-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.recent-post-info-top-tips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.recent-post-info-top-tips .original {
  background: var(--heo-theme-op);
  color: var(--heo-theme);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
}

.unvisited-post {
  background: var(--heo-theme);
  color: var(--heo-white);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  margin-left: auto;
}

.article-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--heo-fontcolor);
  text-decoration: none;
  margin-bottom: 1rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.article-title:hover {
  color: var(--heo-theme);
}

.content {
  color: var(--heo-secondtext);
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta-wrap {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.article-meta.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.article-meta__tags {
  background: var(--heo-secondbg);
  color: var(--heo-fontcolor);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.article-meta__tags:hover {
  background: var(--heo-theme);
  color: var(--heo-white);
}

.post-meta-date {
  color: var(--heo-secondtext);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* 分页样式 */
#pagination {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.pagination {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--heo-card-bg);
  color: var(--heo-fontcolor);
  text-decoration: none;
  border: var(--style-border);
  transition: all 0.3s ease;
  cursor: pointer;
}

.page-number:hover,
.page-number.current {
  background: var(--heo-theme);
  color: var(--heo-white);
  transform: translateY(-2px);
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  #category-bar {
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .category-bar-items {
    gap: 0.5rem;
  }
  
  .recent-post-item {
    flex-direction: column;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .post_cover {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .article-title {
    font-size: 1.2rem;
  }
}

/* 侧边栏样式优化 */
.aside-content {
  width: 300px;
  margin-left: 2rem;
}

.card-widget {
  background: var(--heo-card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--heo-shadow-border);
  border: var(--style-border);
}

.item-headline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--heo-fontcolor);
  margin-bottom: 1rem;
}

.aside-list-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--heo-card-border);
}

.aside-list-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.thumbnail {
  flex-shrink: 0;
}

.thumbnail img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

@media screen and (max-width: 1200px) {
  .aside-content {
    width: 100%;
    margin-left: 0;
    margin-top: 2rem;
  }
  
  main.layout {
    flex-direction: column;
  }
}
</style>