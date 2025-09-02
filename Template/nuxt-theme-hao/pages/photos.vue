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
          page-title="图库"
        />
      </header>

      <main class="layout hide-aside" id="content-inner">
        <div id="page">
          <!-- 相册集标题 -->
          <div class="author-content author-content-item essayPage single" style="background:url(/static/image/6572724f46a3c.webp) left 28% / cover no-repeat !important;">
            <div class="card-content">
              <div class="author-content-item-tips">相册集</div>
              <span class="author-content-item-title">全部</span>
              <div class="content-bottom">
                <div class="tips"></div>
              </div>
              <div class="banner-button-group">
                <a class="banner-button" target="_blank" href="javascript:void(0)" @click="goBack">
                  <i class="haofont hao-icon-circle-arrow-right"></i>
                  <span class="banner-button-text">返回</span>
                </a>
              </div>
            </div>
          </div>
          
          <div id="article-container">
            <section class="page-1" :class="{ loadings: isGalleryLoading }">
              <div class="type-gallery">
                <div id="photos" class="gallery">
                  <div class="fj-gallery-item" v-for="photo in photos" :key="photo.id">
                    <div class="tag-address">{{ photo.tag }}</div>
                    <img :src="photo.src" :alt="photo.tag">
                  </div>
                </div>
              </div>
            </section>
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
  name: 'PhotosPage',
  components: {
    HeaderNavigation,
    Footer
  },
  data() {
    return {
      isLoading: true,
      isGalleryLoading: false,
      darkMode: false,
      currentPage: 1,
      totalPages: 5,
      jumpPageInput: '',
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
      photos: [
        { id: 1, tag: '布达佩斯', src: '/static/picture/656d70128ee64.webp' },
        { id: 2, tag: '海边', src: '/static/picture/656d702eb1b2f.webp' },
        { id: 3, tag: '海边', src: '/static/picture/656d704e341eb.webp' },
        { id: 4, tag: '鸟', src: '/static/picture/656d7064d6d25.webp' },
        { id: 5, tag: '秋', src: '/static/picture/656d707de2375.webp' },
        { id: 6, tag: '鸟', src: '/static/picture/656d7092899d3.webp' },
        { id: 7, tag: '影', src: '/static/picture/656d70aceac67.webp' },
        { id: 8, tag: '节日', src: '/static/picture/656d70c4249e7.webp' },
        { id: 9, tag: '万圣节南瓜', src: '/static/picture/656d70d98cded.webp' },
        { id: 10, tag: '怪石', src: '/static/picture/656d70f6e0d02.webp' },
        { id: 11, tag: '峭壁', src: '/static/picture/656d710f09a5e.webp' },
        { id: 12, tag: '牛', src: '/static/picture/656d712f30ef7.webp' },
        { id: 13, tag: '鸥', src: '/static/picture/656d71456d8bd.webp' },
        { id: 14, tag: '晚', src: '/static/picture/656d715c4f3de.webp' },
        { id: 15, tag: '冬亭', src: '/static/picture/656d71780460b.webp' },
        { id: 16, tag: '狐', src: '/static/picture/656d718fccca7.webp' },
        { id: 17, tag: '山崖', src: '/static/picture/656d71b0f05e4.webp' },
        { id: 18, tag: '阿勒西', src: '/static/picture/656d71f203fec.webp' },
        { id: 19, tag: '北极熊', src: '/static/picture/656d71d4dd672.webp' },
        { id: 20, tag: '夜空', src: '/static/picture/656d6c35825f8.webp' },
        { id: 21, tag: '山间', src: '/static/picture/656d6d9370755.webp' }
      ]
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
  mounted() {
    this.initApp()
    this.initPhotoGallery()
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
      const permalink = "/archives/1719032927347"
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
    
    goBack() {
      this.$router.go(-1)
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
    },
    
    initPhotoGallery() {
      // 模拟图片加载完成后初始化图库
      setTimeout(() => {
        this.isGalleryLoading = false
        this.initLightGallery()
      }, 1000)
    },
    
    initLightGallery() {
      // 初始化图片查看器
      this.$nextTick(() => {
        const photoElements = document.querySelectorAll('#photos img')
        photoElements.forEach((img) => {
          img.setAttribute('data-src', img.src)
        })
        
        // 这里可以初始化LightGallery或其他图片查看器
        // 例如: lightGallery(document.getElementById('photos'), { selector: 'img' })
      })
    }
  }
}
</script>

<style scoped>
/* 图库页面特有样式 */
.gallery-groups {
  box-shadow: var(--heo-shadow-border);
  padding: 1rem 2rem;
  border-radius: 12px;
  background: var(--heo-card-bg);
  border: var(--style-border);
  width: 100%;
  align-self: flex-start;
  animation: slide-in 0.6s 0.1s backwards;
}

#content-inner .loadings .type-gallery {
  opacity: 0
}

.loadings {
  height: 60px;
  background-position: center;
  background-repeat: no-repeat;
  color: #504e4e;
  border: none;
  background-size: auto 100%;
  box-shadow: none;
  background-color: inherit;
  background-image: none;
  background-image: url(/static/image/rotating-ball-o.svg)
}

#article-container .type-gallery {
  overflow: hidden;
  margin-top: 40px;
}

#content-inner .gallery {
  margin: 0 0 16px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.fj-gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: var(--heo-card-bg);
  box-shadow: var(--heo-shadow-border);
}

.fj-gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--heo-shadow-main);
}

.fj-gallery-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.fj-gallery-item:hover img {
  transform: scale(1.05);
}

#article-container .tag-address {
  display: flex;
  position: absolute;
  left: 8px;
  top: 8px;
  padding: 4px 6px;
  border-radius: 8px;
  background: var(--heo-black-op);
  font-size: 12px;
  color: var(--heo-white);
  transition: .3s;
  z-index: 1;
  user-select: none;
}

.essayPage {
  margin: 2rem 0;
  padding: 2rem;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background-size: cover !important;
  background-position: center !important;
}

.essayPage::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.essayPage .card-content {
  position: relative;
  z-index: 2;
  color: white;
}

.author-content-item-tips {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.author-content-item-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
}

.banner-button-group {
  margin-top: 1.5rem;
}

.banner-button {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.banner-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.banner-button i {
  margin-right: 0.5rem;
  font-size: 1.1rem;
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
  cursor: pointer;
}

.toPageGroup a:hover {
  background: var(--heo-theme);
  color: white;
}

/* 响应式适配 */
@media screen and (max-width: 768px) {
  #content-inner .gallery {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    padding: 15px;
  }
  
  .fj-gallery-item img {
    height: 150px;
  }
  
  .pagination {
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  
  .toPageGroup {
    margin-left: 0;
    margin-top: 0.5rem;
  }
  
  .author-content-item-title {
    font-size: 1.5rem;
  }
  
  .essayPage {
    margin: 1rem 0;
    padding: 1.5rem;
  }
}

@media screen and (max-width: 480px) {
  #content-inner .gallery {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    padding: 10px;
  }
  
  .fj-gallery-item img {
    height: 120px;
  }
}
</style>