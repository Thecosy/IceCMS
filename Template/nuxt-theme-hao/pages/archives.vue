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
          page-title="文章归档"
        />
      </header>

      <main class="layout" id="content-inner">
        <!-- archive -->
        <div id="archive">
          <div class="article-sort-title">文章<sup>{{ totalArticles }}</sup></div>
          <div class="article-sort" v-for="year in archiveData" :key="year.year">
            <div class="article-sort-item year">{{ year.year }}</div>
            <div class="article-sort" v-for="month in year.months" :key="month.month">
              <div class="article-sort-item" v-for="article in month.articles" :key="article.id">
                <a class="article-sort-item-img" :href="article.link" :title="article.title">
                  <img :alt="article.title" :src="article.image">
                </a>
                <div class="article-sort-item-info">
                  <div class="article-sort-item-time">
                    <i class="far fa-calendar-alt"></i>
                    <time class="post-meta-date-created" :title="'创建于' + article.datetime" :datetime="article.datetime">
                      {{ article.date }}
                    </time>
                  </div>
                  <a class="article-sort-item-title" @click="$event.stopPropagation()" :href="article.link" :title="article.title">
                    {{ article.title }}
                  </a>
                  <div class="article-sort-item-tags">
                    <a v-for="tag in article.tags" :key="tag.name" class="article-meta__tags" :href="tag.link">
                      <span class="tags-punctuation">{{ tag.name }}</span>
                    </a>
                    <span class="article-meta__link">•</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <nav id="pagination">
            <div class="pagination">
              <span v-if="currentPage === 1" class="page-number current">1</span>
              <a v-else class="page-number" href="#" @click="goToPage(1)">1</a>

              <a v-for="page in visiblePages" :key="page" 
                 :class="{ 'page-number': true, 'current': page === currentPage }" 
                 :href="page === currentPage ? '#' : `#page-${page}`" 
                 @click="goToPage(page)">
                {{ page }}
              </a>

              <span v-if="showEllipsis" class="space">…</span>
              <a v-if="totalPages > 1" class="page-number" :href="`#page-${totalPages}`" @click="goToPage(totalPages)">
                {{ totalPages }}
              </a>

              <a v-if="currentPage < totalPages" class="extend next" rel="next" :href="`#page-${currentPage + 1}`" @click="goToPage(currentPage + 1)">
                <div class="pagination_tips_next">下页</div>
                <i class="haofont hao-icon-chevron-right fa-fw"></i>
              </a>

              <div class="toPageGroup">
                <input id="toPageText" maxlength="3" title="跳转到指定页面" v-model="jumpPageInput" @input="validatePageInput" @keyup="checkPageJump">
                <a id="toPageButton" @click="jumpToPage">
                  <i class="haofont hao-icon-angles-right"></i>
                </a>
              </div>
            </div>
          </nav>
        </div>

        <!-- sidebar -->
        <div class="aside-content" id="aside-content">
          <!-- 侧边栏自我介绍 -->
          <div class="card-widget card-info">
            <div class="card-content" style="background-image: url();">
              <div class="card-info-avatar is-center">
                <div class="author-info__top-group">
                  <div class="author-info__sayhi" id="author-info__sayhi" @click="changeSayHelloText">你好啊！我是</div>
                  <img class="avatar-img" src="/static/picture/logo-zark.png">
                </div>
                <div class="author-info__name">IceCMS</div>
                <div class="author-info__description">🤖️ 数码科技爱好者, 🔍 分享与热心帮助, 🏠 智能家居小能手, 🔨 设计开发一条龙, 🤝 专修交互与设计, 🏃 脚踏实地行动派, 🧱 团队小组发动机, 💢 壮汉人狠话不多</div>
              </div>
            </div>
            <div class="banner-button-group">
              <router-link class="banner-button" to="/about">
                <i class="haofont hao-icon-circle-arrow-right"></i>
                <span class="banner-button-text">了解更多</span>
              </router-link>
            </div>
            <div class="card-info-social-icons is-center">
              <a class="social-icon" rel="external nofollow" target="_blank" href="https://github.com/carolcoral" title="GitHub">
                <i class="iconfont icon-github"></i>
              </a>
              <a class="social-icon" rel="external nofollow" target="_blank" href="https://blog.csdn.net/carolcoral" title="CSDN">
                <i class="iconfont icon-csdn"></i>
              </a>
            </div>
          </div>

          <!-- 标签云 -->
          <div class="card-widget card-tags">
            <div class="item-headline"></div>
            <div class="card-tag-cloud">
              <a v-for="tag in tags" :key="tag.name" class="tag-item" style="font-size:1em" :href="tag.link" :title="tag.name">
                {{ tag.name }}<sup>{{ tag.count }}</sup>
              </a>
            </div>
          </div>

          <!-- 最新评论 -->
          <div class="card-widget card-recent-post">
            <a title="查看更多" class="card-more-btn" style="cursor:pointer" draggable="false">
              <i class="haofont hao-icon-chevron-right"></i>
            </a>
            <div class="item-headline">
              <i class="haofont hao-icon-chat--fill" style="font-size: 19px;"></i>
              <span>最新评论</span>
            </div>
            <div class="aside-list" id="newcomm">
              <div class="aside-list-item" v-for="comment in recentComments" :key="comment.id">
                <span></span>
                <a class="thumbnail" :href="comment.link">
                  <img alt="头像" :src="comment.avatar">
                </a>
                <div class="content">
                  <a class="comment" style="display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;" 
                     :href="comment.link" :title="comment.content">{{ comment.content }}</a>
                  <div class="name">
                    <span>{{ comment.author }} / </span>
                    <time :datetime="comment.datetime">{{ comment.formattedDate }}</time>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 公告卡片 -->
          <div class="card-widget card-announcement">
            <div class="item-headline">
              <div style='display: inline-flex; padding-bottom:0.5em;'>
                <svg t="1745395900406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em">
                  <path d="M0 488.96v-30.72C2.56 430.08 7.68 404.48 15.36 378.88c20.48-66.56 53.76-122.88 99.84-171.52C179.2 138.24 256 94.72 340.48 66.56c48.64-15.36 97.28-23.04 145.92-25.6 40.96-2.56 79.36 0 120.32 7.68 33.28 5.12 64 12.8 97.28 25.6 79.36 28.16 148.48 71.68 207.36 133.12 7.68 7.68 12.8 15.36 20.48 23.04-2.56 0-2.56 2.56-5.12 2.56-20.48 10.24-40.96 20.48-61.44 28.16-143.36 66.56-286.72 133.12-430.08 197.12-28.16 12.8-56.32 10.24-81.92-5.12-20.48-12.8-38.4-25.6-58.88-38.4-12.8-10.24-25.6-17.92-40.96-28.16-12.8-7.68-20.48-2.56-20.48 12.8v2.56c2.56 12.8 5.12 25.6 10.24 38.4 25.6 61.44 51.2 120.32 76.8 181.76 7.68 17.92 20.48 25.6 35.84 23.04 10.24 0 20.48-2.56 28.16-7.68 30.72-15.36 58.88-33.28 87.04-51.2 156.16-92.16 309.76-184.32 465.92-276.48 10.24-7.68 23.04-12.8 33.28-20.48 0 2.56 2.56 2.56 2.56 5.12 5.12 10.24 10.24 17.92 12.8 28.16 28.16 61.44 40.96 125.44 35.84 192-2.56 28.16-7.68 56.32-15.36 84.48-17.92 61.44-48.64 115.2-92.16 163.84-51.2 56.32-115.2 99.84-184.32 128-40.96 15.36-81.92 28.16-122.88 35.84-28.16 5.12-56.32 7.68-81.92 7.68h-46.08c-20.48-2.56-40.96-2.56-58.88-5.12-30.72-5.12-61.44-12.8-89.6-23.04H322.56c-12.8 7.68-23.04 15.36-35.84 23.04-28.16 17.92-53.76 33.28-81.92 48.64-5.12 2.56-12.8 5.12-17.92 5.12s-10.24-2.56-10.24-10.24c0-5.12 0-12.8 2.56-17.92 5.12-38.4 12.8-74.24 20.48-112.64 0-5.12 0-7.68-5.12-10.24-15.36-12.8-30.72-23.04-46.08-38.4-51.2-46.08-92.16-102.4-117.76-166.4C20.48 599.04 12.8 568.32 7.68 537.6c-2.56-12.8-2.56-25.6-2.56-40.96-5.12 0-5.12-2.56-5.12-7.68z" fill="#6BCC03"></path>
                </svg>
                <span style='align-items: center;'>微信赞赏</span>
              </div>
            </div>
                          <img src="/static/picture/vZWztN.webp" alt="667a746b11da6.webp">
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
import { postApi, tagApi } from '../utils/apiService.js'

export default {
  name: 'ArchivesPage',
  components: {
    HeaderNavigation,
    Footer
  },
  data() {
    return {
      isLoading: true,
      darkMode: false,
      currentPage: 1,
      totalPages: 1,
      jumpPageInput: '',
      totalArticles: 0,
      archiveData: [],
      apiBaseUrl: 'http://localhost:8080/api',
      allArticles: [],
      tagsMap: new Map(),
      recentComments: [
        {
          id: 1,
          author: 'Zyx-2012',
          avatar: '/static/picture/avatar-blue.png',
          content: '昵称：折腾日记 网站地址：https://blog.zyx-2012.cn/ 头像图片url：https://blog.zyx-2012.cn/upload/450afd2435d73f8b0dd3fce81b64b913.jpeg 描述：专注于笔记、分享的博客',
          link: 'content.html#comment-7e09107e-3316-498c-96e4-47c0491a84ba',
          datetime: '2025-07-10 10:49:20',
          formattedTime: '2025-7-10',
          formattedDate: '2025-7-10'
        },
        {
          id: 2,
          author: '故河',
          avatar: '/static/picture/avatar-purple.png',
          content: '昵称：故河TTL 网站地址：https://blog.beyondsky.site 头像图片url：https://cdn.jsdelivr.net/gh/tongzanyang/PicGo@main/tx.jpg 描述：故河TTL - 分享技术与生活 背景: https://cdn.jsdelivr.net/gh/tongzanyang/PicGo@main/GH_logo.png',
          link: 'content.html#comment-b718e36d-70aa-43ef-91e5-adc4743b049d',
          datetime: '2025-07-04 10:56:06',
          formattedTime: '2025-7-4',
          formattedDate: '2025-7-4'
        },
        {
          id: 3,
          author: 'James',
          avatar: '/static/picture/6640face352a720c4552ff8d60d0d0ecca12f901740e174b77b2940618d5a4d1.webp',
          content: '我也是用NAS搭建的WP博客，看你在博客里做了些 赚钱的阅读方式。想了解下，真的有人会花钱么，你赚到钱了么',
          link: '1750037206574.html#comment-e4703467-924f-46cb-99ba-588f615c631d',
          datetime: '2025-07-01 11:19:35',
          formattedTime: '2025-7-1',
          formattedDate: '2025-7-1'
        }
      ],
      tags: [],
      archiveList: []
    }
  },
  computed: {
    visiblePages() {
      const pages = []
      const start = Math.max(2, this.currentPage - 1)
      const end = Math.min(this.totalPages - 1, this.currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    },
    showEllipsis() {
      return this.totalPages > 4 && this.currentPage < this.totalPages - 2
    }
  },
  async mounted() {
    await this.initApp()
  },
  methods: {
    async initApp() {
      this.initTheme()
      await this.loadApiData()
      this.endLoading()
    },
    
    async loadApiData() {
      try {
        // 获取标签数据
        await this.fetchTags()
        
        // 获取所有文章数据
        await this.fetchAllArticles()
        
        // 转换数据为按年份排序的格式
        this.convertToArchiveFormat()
        
        // 生成归档统计
        this.generateArchiveList()
      } catch (error) {
        console.error('加载API数据失败:', error)
        // 保持模拟数据作为降级方案
      }
    },
    
    async fetchTags() {
      try {
        const response = await fetch(`${this.apiBaseUrl}/tags`)
        const tagsData = await response.json()
        
        // 创建标签映射
        tagsData.forEach(tag => {
          this.tagsMap.set(tag.id.toString(), {
            name: tag.tagName,
            color: tag.color,
            effect: tag.effect,
            link: `tag/${tag.id}.html`
          })
        })
        
        this.tags = tagsData.map(tag => ({
          name: tag.tagName,
          link: `tag/${tag.id}.html`,
          count: 0 // 暂时设为0，后续会更新
        }))
      } catch (error) {
        console.error('获取标签失败:', error)
      }
    },
    
    async fetchAllArticles() {
      try {
        let allArticles = []
        let currentPage = 1
        let totalPages = 1
        
        // 获取第一页以了解总页数
        const firstData = await postApi.getPosts({ page: 1, size: 20 })
        totalPages = firstData.pages || 1
        this.totalArticles = firstData.total || 0
        allArticles = [...firstData.data]
        
        // 获取剩余页面的数据
        for (let page = 2; page <= totalPages; page++) {
          const data = await postApi.getPosts({ page: page, size: 20 })
          allArticles = [...allArticles, ...data.data]
        }
        
        this.allArticles = allArticles
        
        // 更新标签计数
        this.updateTagCounts()
      } catch (error) {
        console.error('获取文章列表失败:', error)
        throw error
      }
    },
    
    updateTagCounts() {
      const tagCounts = new Map()
      
      this.allArticles.forEach(article => {
        if (article.keyword) {
          const tagIds = article.keyword.split(',').filter(id => id.trim())
          tagIds.forEach(id => {
            const count = tagCounts.get(id) || 0
            tagCounts.set(id, count + 1)
          })
        }
      })
      
      // 更新标签计数
      this.tags = this.tags.map(tag => {
        const tagId = tag.link.split('/').pop()
        return {
          ...tag,
          count: tagCounts.get(tagId) || 0
        }
      })
    },
    
    convertToArchiveFormat() {
      const articlesByYear = new Map()
      
      // 按年份分组文章
      this.allArticles.forEach(article => {
        const addTime = new Date(article.addTime)
        const year = addTime.getFullYear()
        const month = addTime.getMonth() + 1
        
        if (!articlesByYear.has(year)) {
          articlesByYear.set(year, new Map())
        }
        
        if (!articlesByYear.get(year).has(month)) {
          articlesByYear.get(year).set(month, [])
        }
        
        // 处理标签
        const tags = this.parseArticleTags(article.keyword)
        
        const formattedArticle = {
          id: article.id,
          title: article.title,
          link: `/detail/${article.id}`,
          image: article.thumb || '/static/picture/placeholder.webp',
          datetime: article.addTime,
          date: addTime.toISOString().split('T')[0],
          tags: tags,
          hits: article.hits,
          className: article.className,
          author: article.authorName
        }
        
        articlesByYear.get(year).get(month).push(formattedArticle)
      })
      
      // 转换为组件需要的格式并按年份倒序排列
      this.archiveData = []
      const sortedYears = Array.from(articlesByYear.keys()).sort((a, b) => b - a)
      
      sortedYears.forEach(year => {
        const monthsMap = articlesByYear.get(year)
        const months = []
        
        // 按月份倒序排列
        const sortedMonths = Array.from(monthsMap.keys()).sort((a, b) => b - a)
        
        sortedMonths.forEach(month => {
          const articles = monthsMap.get(month)
          // 按时间倒序排列文章
          articles.sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
          
          months.push({
            month: month,
            articles: articles
          })
        })
        
        this.archiveData.push({
          year: year,
          months: months
        })
      })
    },
    
    parseArticleTags(keyword) {
      if (!keyword) return []
      
      const tagIds = keyword.split(',').filter(id => id.trim())
      return tagIds.map(id => {
        const tag = this.tagsMap.get(id.trim())
        return tag || { name: `标签${id}`, link: `tag/${id}.html` }
      })
    },
    
    generateArchiveList() {
      const monthMap = new Map()
      
      this.allArticles.forEach(article => {
        const addTime = new Date(article.addTime)
        const year = addTime.getFullYear()
        const month = addTime.getMonth() + 1
        const key = `${year}-${month.toString().padStart(2, '0')}`
        
        if (!monthMap.has(key)) {
          monthMap.set(key, {
            year: year,
            month: month,
            count: 0
          })
        }
        
        monthMap.get(key).count++
      })
      
      // 转换为归档列表格式并按时间倒序
      this.archiveList = Array.from(monthMap.values())
        .sort((a, b) => {
          if (a.year !== b.year) return b.year - a.year
          return b.month - a.month
        })
        .map(item => {
          const monthNames = ['', '一月', '二月', '三月', '四月', '五月', '六月', 
                            '七月', '八月', '九月', '十月', '十一月', '十二月']
          return {
            date: `${monthNames[item.month]} ${item.year}`,
            link: `archives/${item.year}/${item.month.toString().padStart(2, '0')}.html`,
            count: item.count
          }
        })
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
      const permalink = "/archives/1753240296767"
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
    
    changeSayHelloText() {
      const sayHi = document.getElementById('author-info__sayhi')
      const texts = ['你好啊！我是', '欢迎来到我的博客', '很高兴认识你', '一起来学习吧']
      const currentIndex = texts.indexOf(sayHi.textContent)
      const nextIndex = (currentIndex + 1) % texts.length
      sayHi.textContent = texts[nextIndex]
    },
    
    goToPage(page) {
      if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        this.scrollToPost()
      }
    },
    
    scrollToPost() {
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })
      }, 100)
    },
    
    validatePageInput() {
      this.jumpPageInput = this.jumpPageInput.replace(/[^0-9]/g, '')
      if (this.jumpPageInput === '0') {
        this.jumpPageInput = ''
      }
    },
    
    checkPageJump(event) {
      if (event.key === 'Enter') {
        this.jumpToPage()
      }
    },
    
    jumpToPage() {
      const page = parseInt(this.jumpPageInput)
      if (page && page > 0 && page <= this.totalPages) {
        this.goToPage(page)
        this.jumpPageInput = ''
      }
    }
  }
}
</script>

<style scoped>
/* 归档页面特有样式 */
.article-sort-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--heo-fontcolor);
}

.article-sort-title sup {
  font-size: 0.8rem;
  color: var(--heo-secondtext);
}

.article-sort-item.year {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--heo-theme);
  margin: 2rem 0 1rem 0;
  padding-left: 2rem;
  position: relative;
}

.article-sort-item.year::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--heo-theme);
}

.article-sort-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--heo-card-border);
  transition: all 0.3s ease;
}

.article-sort-item:hover {
  background: var(--heo-secondbg);
  transform: translateX(10px);
}

.article-sort-item-img {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 1rem;
  flex-shrink: 0;
}

.article-sort-item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-sort-item-img:hover img {
  transform: scale(1.1);
}

.article-sort-item-info {
  flex: 1;
}

.article-sort-item-time {
  color: var(--heo-secondtext);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.article-sort-item-time i {
  margin-right: 0.5rem;
}

.article-sort-item-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--heo-fontcolor);
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: block;
  line-height: 1.4;
}

.article-sort-item-title:hover {
  color: var(--heo-theme);
}

.article-sort-item-tags {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  text-align: left;
}

.article-meta__tags {
  background: var(--heo-theme-op);
  color: var(--heo-theme);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.article-meta__tags:hover {
  background: var(--heo-theme);
  color: white;
}

.article-meta__link {
  color: var(--heo-secondtext);
  font-size: 0.8rem;
}

/* 分页样式优化 */
#pagination {
  margin: 3rem 0;
  text-align: center;
}

.pagination {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--heo-card-bg);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: var(--heo-shadow-border);
}

.page-number {
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--heo-fontcolor);
  transition: all 0.3s ease;
  min-width: 36px;
  text-align: center;
}

.page-number:hover,
.page-number.current {
  background: var(--heo-theme);
  color: white;
}

.extend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--heo-fontcolor);
  background: var(--heo-secondbg);
  transition: all 0.3s ease;
}

.extend:hover {
  background: var(--heo-theme);
  color: white;
  transform: translateX(5px);
}

.toPageGroup {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
}

.toPageGroup input {
  width: 60px;
  padding: 0.5rem;
  border: 1px solid var(--heo-card-border);
  border-radius: 6px;
  text-align: center;
  background: var(--heo-card-bg);
  color: var(--heo-fontcolor);
}

.toPageGroup a {
  padding: 0.5rem 0.8rem;
  background: var(--heo-theme-op);
  color: var(--heo-theme);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.toPageGroup a:hover {
  background: var(--heo-theme);
  color: white;
}

/* 响应式适配 */
@media screen and (max-width: 768px) {
  .article-sort-item {
    flex-direction: column;
    text-align: left;
  }
  
  .article-sort-item-img {
    width: 100%;
    max-width: 300px;
    height: 200px;
    margin-right: 0;
    margin-bottom: 1rem;
    align-self: center;
  }
  
  .article-sort-item-info {
    width: 100%;
    text-align: left;
  }
  
  .article-sort-item-tags {
    justify-content: flex-start !important;
  }
  
  .pagination {
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  
  .toPageGroup {
    margin-left: 0;
    margin-top: 0.5rem;
  }
  }
</style>