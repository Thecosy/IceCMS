<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { useBlogStore } from '~/stores/blog'
import { postApi, categoryApi } from '~/utils/apiService'

// 类型定义
interface Moment {
  content: string
}

interface Post {
  id: number
  title: string
  intro: string
  thumb: string
  authorName: string
  className: string
  hits: number
  loveNum: number
  commentNum: number
  addTime: string
  keyword?: string
}

interface Category {
  id: number
  name: string
  father: string | null
  otherName: string
  describes: string
  imgclass: string
  num: number
  top: boolean
}

interface Greeting {
  start: number
  end: number
  text: string
}

// 响应式数据
const isLoading: Ref<boolean> = ref(true)
const darkMode: Ref<boolean> = ref(false)
const blogStore = useBlogStore()

// 文章数据
const posts: Ref<Post[]> = ref([])
const pagination = ref({
  current: 1,
  total: 0,
  pages: 0,
  size: 10
})
const postsLoading: Ref<boolean> = ref(false)

// 分类数据
const categories: Ref<Category[]> = ref([])
const categoriesLoading: Ref<boolean> = ref(true)
const selectedCategory: Ref<string> = ref('')

const moments: Ref<Moment[]> = ref([
  { content: "目前近200篇文章仅6篇为付费阅读，考虑是否增加一些付费阅读文章~~~~看各位对哪方面的内容比较感兴趣" },
  { content: "没人爱发电和赞赏，都没钱吃饭啦/(ㄒoㄒ)/~~" },
  { content: "最近在研究Vue3的新特性，感觉很有意思！" },
  { content: "今天天气不错，适合写代码～" },
  { content: "分享一些实用的开发技巧，希望对大家有帮助" }
])

// 生命周期
onMounted(() => {
  initApp()
})

// 方法
const initApp = () => {
  initTheme()
  initGreeting()
  initSubtitle()
  endLoading()
  fetchCategories()
  fetchPosts()
  // 初始化博客数据（包含网站设置）
  blogStore.initializeData()
}

const initTheme = () => {
  if (process.client) {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme)
      darkMode.value = savedTheme === 'dark'
    } else {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      const theme = isDarkMode ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', theme)
      darkMode.value = isDarkMode
    }
  }
}

const initGreeting = () => {
  if (process.client) {
    setTimeout(() => {
      const greetingBox = document.getElementById('greetingBox')
      if (greetingBox) {
        const greeting = document.createElement('div')
        greeting.id = 'greeting'
        greeting.innerHTML = getGreetingText()
        greetingBox.appendChild(greeting)
        
        setTimeout(() => {
          greeting.classList.add('shown')
        }, 1000)
        
        setTimeout(() => {
          greeting.classList.remove('shown')
          setTimeout(() => {
            greetingBox.remove()
          }, 500)
        }, 3000)
      }
    }, 100)
  }
}

const getGreetingText = (): string => {
  const hour = new Date().getHours()
  const greetings: Greeting[] = [
    { start: 0, end: 5, text: "晚安😴" },
    { start: 6, end: 9, text: "早上好鸭👋, 祝你一天好心情！" },
    { start: 10, end: 10, text: "上午好👋, 状态很好，鼓励一下～" },
    { start: 11, end: 11, text: "11点多啦, 在坚持一下就吃饭啦～" },
    { start: 12, end: 14, text: "午安👋, 宝贝" },
    { start: 14, end: 18, text: "🌈充实的一天辛苦啦！" },
    { start: 19, end: 19, text: "19点喽, 奖励一顿丰盛的大餐吧🍔。" },
    { start: 20, end: 24, text: "晚上好👋, 在属于自己的时间好好放松😌~" }
  ]
  
  for (const greeting of greetings) {
    if (hour >= greeting.start && hour <= greeting.end) {
      return greeting.text
    }
  }
  return "晚上好👋"
}

const initSubtitle = () => {
  if (process.client) {
    setTimeout(() => {
      if ((window as any).Typed) {
        startTyped()
      } else {
        loadTypedJS().then(() => {
          startTyped()
        })
      }
    }, 1800)
  }
}

const loadTypedJS = (): Promise<void> => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://npm.elemecdn.com/typed.js@2.0.12/lib/typed.min.js'
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

const startTyped = () => {
  fetch("https://v1.hitokoto.cn")
    .then(response => response.json())
    .then(data => {
      const strings = [
        "Welcome to IceCMS ～",
        data.hitokoto,
        "出自 " + data.from
      ]
      
      new (window as any).Typed("#subtitle", {
        strings: strings,
        startDelay: 300,
        typeSpeed: 100,
        loop: true,
        backSpeed: 50
      })
    })
    .catch(() => {
      new (window as any).Typed("#subtitle", {
        strings: ["Welcome to IceCMS ～"],
        startDelay: 300,
        typeSpeed: 100,
        loop: true,
        backSpeed: 50
      })
    })
}

const endLoading = () => {
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}

const hideLoading = () => {
  isLoading.value = false
}

// 获取文章列表
const fetchPosts = async (page: number = 1, categoryName?: string) => {
  postsLoading.value = true
  try {
    console.log('获取文章列表, 页码:', page, '分类:', categoryName)
    const response = await postApi.getPosts({ 
      page: page, 
      size: pagination.value.size 
    })
    
    if (response.data) {
      let filteredPosts = response.data
      
      // 如果选择了特定分类，过滤文章
      if (categoryName && categoryName !== '') {
        filteredPosts = response.data.filter((post: Post) => 
          post.className === categoryName
        )
        console.log('过滤后的文章:', filteredPosts.length, '篇')
      }
      
      posts.value = filteredPosts
      pagination.value.total = response.total || 0
      pagination.value.pages = response.pages || 1
      pagination.value.current = page
      console.log('文章列表更新完成, 共', posts.value.length, '篇文章')
    }
  } catch (error) {
    console.error('获取文章列表失败:', error)
  } finally {
    postsLoading.value = false
  }
}

// 格式化时间
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 3600 * 24))
  
  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`
  if (days < 30) return `${Math.floor(days / 7)}周前`
  if (days < 365) return `${Math.floor(days / 30)}个月前`
  return `${Math.floor(days / 365)}年前`
}

// 获取文章标签
const getPostTags = (keyword: string) => {
  if (!keyword) return []
  return keyword.split(',').filter(tag => tag.trim())
}

// 获取可见页码
const getVisiblePages = () => {
  const current = pagination.value.current
  const total = pagination.value.pages
  const pages = []
  
  let start = Math.max(2, current - 1)
  let end = Math.min(total - 1, current + 1)
  
  if (current <= 3) {
    end = Math.min(5, total - 1)
  }
  if (current >= total - 2) {
    start = Math.max(2, total - 4)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
}

// 切换页面
const changePage = async (page: number) => {
  if (page === pagination.value.current || page < 1 || page > pagination.value.pages) {
    return
  }
  
  await fetchPosts(page, selectedCategory.value)
  scrollToPost()
}

const hideConsole = () => {
  if (process.client) {
    const console = document.getElementById('console')
    if (console) {
      console.style.display = 'none'
      console.classList.remove('show')
    }
  }
}

const switchDarkMode = () => {
  if (process.client) {
    darkMode.value = !darkMode.value
    const theme = darkMode.value ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }
}

const scrollToTop = () => {
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

const toRandomPost = () => {
  if (process.client) {
    const permalink = "/archives/1718891841850"
    window.location.href = permalink
  }
}

const openSearch = () => {
  if (process.client && (window as any).SearchWidget) {
    (window as any).SearchWidget.open()
  }
}

const goToMoments = () => {
  if (process.client) {
    window.location.href = '/moments'
  }
}

const goToPost = (url: string) => {
  if (process.client) {
    window.location.href = url
  }
}

const goToTag = (tag: string) => {
  if (process.client) {
    window.location.href = `/${tag}.html`
  }
}

const scrollToPost = () => {
  if (process.client) {
    if (document.querySelector(".pl-container")) {
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })
      }, 1000)
    }
  }
}

const validatePageInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.value = target.value.replace(/[^0-9]/g, '')
  if (target.value === '0') {
    target.value = ''
  }
}

const checkPageJump = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    jumpToPage()
  }
}

const jumpToPage = async () => {
  if (process.client) {
    const pageInput = document.getElementById('toPageText') as HTMLInputElement
    const page = parseInt(pageInput.value)
    if (page && page > 0 && page <= pagination.value.pages) {
      await changePage(page)
      pageInput.value = ''
    } else {
      alert(`请输入1到${pagination.value.pages}之间的页码`)
    }
  }
}

const changeSayHelloText = () => {
  if (process.client) {
    const sayHi = document.getElementById('author-info__sayhi')
    if (sayHi) {
      const texts = ['你好啊！我是', '欢迎来到我的博客', '很高兴认识你', '一起来学习吧']
      const currentIndex = texts.indexOf(sayHi.textContent || '')
      const nextIndex = (currentIndex + 1) % texts.length
      sayHi.textContent = texts[nextIndex]
    }
  }
}

const toggleAside = () => {
  if (process.client) {
    document.documentElement.classList.toggle('hide-aside')
  }
}

const hideTodayCard = () => {
  if (process.client) {
    const todayCard = document.getElementById('todayCard')
    if (todayCard) {
      todayCard.style.display = 'none'
    }
  }
}

const redirectToLogin = () => {
  if (process.client) {
    const currentUrl = encodeURIComponent(window.location.href)
    window.location.href = `/login?redirect_uri=${currentUrl}`
  }
}

const showConsole = () => {
  if (process.client) {
    const console = document.getElementById('console')
    if (console) {
      console.style.display = 'block'
      console.classList.add('show')
    }
  }
}

const hideAsideBtn = () => {
  if (process.client) {
    document.documentElement.classList.toggle('hide-aside')
  }
}

const switchCommentBarrage = () => {
  console.log('切换热评开关')
}

// 获取分类列表
const fetchCategories = async () => {
  categoriesLoading.value = true
  try {
    console.log('正在获取分类列表...')
    const response = await categoryApi.getCategories({ page: 1, limit: 50 })
    console.log('分类API响应:', response)
    console.log('response类型:', typeof response, 'Array.isArray:', Array.isArray(response))
    
    if (Array.isArray(response)) {
      // API直接返回数组
      categories.value = response.slice(0, 5)
      console.log('分类数据(直接数组):', categories.value)
    } else if (response.data && Array.isArray(response.data)) {
      // API返回包含data字段的对象
      categories.value = response.data.slice(0, 5)
      console.log('分类数据(data字段):', categories.value)
    } else {
      console.log('分类数据格式异常:', response)
      categories.value = []
    }
  } catch (error) {
    console.error('获取分类列表失败:', error)
    categories.value = []
  } finally {
    categoriesLoading.value = false
  }
}

// 切换分类
const changeCategory = async (categoryName: string) => {
  selectedCategory.value = categoryName
  console.log('切换分类:', categoryName)
  await fetchPosts(1, categoryName)
}
</script>

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
              <div class="aside-list-item">
                <NuxtLink to="/content#comment-7e09107e-3316-498c-96e4-47c0491a84ba" class="thumbnail">
                  <img src="/static/picture/avatar-blue.png" alt="Zyx-2012">
                  <div class="name"><span>stonewu</span></div>
                </NuxtLink>
                <div class="content">
                  <NuxtLink class="comment" to="/content#comment-7e09107e-3316-498c-96e4-47c0491a84ba" title="昵称：折腾日记">
                    昵称：折腾日记 网站地址：https://blog.zyx-2012.cn/ 头像图片url：https://blog.zyx-2012.cn/upload/450afd2435d73f8b0dd3fce81b64b913.jpeg 描述：专注于笔记、分享的博客
                  </NuxtLink>
                  <time datetime="2025-07-10 10:49:20"></time>
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
              <NuxtLink style="font-size:1em;color:#d3d3d3" to="/jian-kong">监控<sup>1</sup></NuxtLink>
              <NuxtLink style="font-size:1em;color:#d3d3d3" to="/rss">rss<sup>1</sup></NuxtLink>
              <NuxtLink style="font-size:1em;color:#d3d3d3" to="/docker">docker<sup>6</sup></NuxtLink>
            </div>
          </div>
        </div>
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
      </div>
    </div>

    <!-- 内容 -->
    <div class="page" id="body-wrap">
      <!-- 头部导航栏组件 -->
      <header class="full_page" id="page-header">
        <HeaderNavigation 
          @random-post="toRandomPost"
          @open-search="openSearch"
          @redirect-login="redirectToLogin"
          @show-console="showConsole"
          @scroll-to-top="scrollToTop"
        />
        
        <!-- 问候语 -->
        <div id="greetingBox"></div>
        
        <!-- 第一屏 -->
        <div class="pl-container" :class="{ 'start-animation': !isLoading }">
          <div class="pl-img pl-blur pl-visible"></div>
          <div class="pl-img pl-visible"></div>
          <video class="video"></video>
        </div>

        <div id="site-info">
          <h1 id="site-title">IceCMS</h1>
          <div id="site-subtitle">
            <span id="subtitle"></span>
            <span class="typed-cursor" aria-hidden="true"></span>
          </div>
        </div>
        <div id="scroll-down"><i class="haofont hao-icon-angle-down scroll-down-effects"></i></div>
      </header>
      
      <div id="home_top">
        <!-- 每日说说 -->
        <div class="bbTimeList container" id="bbTimeList">
          <i class="haofont hao-icon-logo-moment" style="font-size: 1.3rem;" title="瞬间"></i>
          <div class="swiper-container swiper-no-swiping" id="bbtalk" tabindex="-1">
            <div class="swiper-wrapper" id="bber-talk" @click="goToMoments">
              <div class="li-style swiper-slide" v-for="(moment, index) in moments" :key="index">
                <p>{{ moment.content }}</p>
              </div>
            </div>
          </div>
          <i class="bber-gotobb haofont hao-icon-circle-arrow-right" @click="goToMoments" title="查看全文"></i>
        </div>

        <!-- 置顶内容 -->
        <div class="recent-top-post-group" id="recent-top-post-group">
          <div class="recent-post-top" id="recent-post-top">
            <!-- banner -->
            <div id="bannerGroup">
              <div id="banners">
                <div class="tags-group-all">
                  <div class="tags-group-wrapper">
                    <!-- 技术图标组 -->
                    <div class="tags-group-icon-pair">
                      <div class="tags-group-icon" style="background:#989bf8">
                        <img src="/static/picture/AfterEffect.png" title="AfterEffect">
                      </div>
                      <div class="tags-group-icon" style="background:#fff">
                        <img src="/static/picture/Sketch.png" title="Sketch">
                      </div>
                    </div>
                    <div class="tags-group-icon-pair">
                      <div class="tags-group-icon" style="background:#57b6e6">
                        <img src="/static/picture/Docker.png" title="Docker">
                      </div>
                      <div class="tags-group-icon" style="background:#4082c3">
                        <img src="/static/picture/Photoshop.png" title="Photoshop">
                      </div>
                    </div>
                    <div class="tags-group-icon-pair">
                      <div class="tags-group-icon" style="background:#f7cb4f">
                        <img src="/static/picture/JS.png" title="JS">
                      </div>
                      <div class="tags-group-icon" style="background:#e9572b">
                        <img src="/static/picture/HTML.png" title="HTML">
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="banners-title">
                  <div class="banners-title-big">Carol 小屋</div>
                  <div class="banners-title-small">更多信息请关注 <a href='https://github.com/carolcoral'>GitHub</a></div>
                </div>
                
                <div class="banners-link">
                  <div>
                    <NuxtLink class="banners-link-btn blb-hot" to="/tags">
                      <i class="haofont hao-icon-book"></i>
                      <div class="banners-link-title">文章标签</div>
                    </NuxtLink>
                  </div>
                  <div>
                    <NuxtLink class="banners-link-btn blb-top" to="/archives">
                      <i class="haofont hao-icon-fire"></i>
                      <div class="banners-link-title">最新文章</div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- 今日推荐 -->
            <div class="todayCard" id="todayCard" @click="window.open('/')">
              <div class="todayCard-info">
                <div class="todayCard-tips"></div>
                <div class="todayCard-title"></div>
              </div>
              <div class="todayCard-cover todayCard-background">
              </div>
              <div class="banner-button-group">
                <a class="banner-button" @click.stop="hideTodayCard()">
                  <i class="haofont hao-icon-circle-plus"></i>
                  <span class="banner-button-text">更多推荐</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <main class="layout right-aside" id="content-inner">
        <div class="recent-posts" id="recent-posts">
          <!-- 分类导航栏 -->
          <div id="category-bar">
            <div class="category-bar-items" id="category-bar-items">
              <div class="category-bar-item" 
                   :class="{ select: selectedCategory === '' }" 
                   id="category-bar-home">
                <a href="javascript:void(0)" @click="changeCategory('')">首页</a>
              </div>
              <!-- 调试信息 -->
              <div v-if="categoriesLoading" class="category-bar-item">
                <a href="javascript:void(0)">加载中...</a>
              </div>
              <div v-else-if="categories.length === 0" class="category-bar-item">
                <a href="javascript:void(0)">暂无分类</a>
              </div>
              <div v-else 
                   v-for="category in categories" 
                   :key="category.id"
                   class="category-bar-item" 
                   :class="{ select: selectedCategory === category.name }"
                   :id="category.name">
                <a href="javascript:void(0)" @click="changeCategory(category.name)">{{ category.name }}</a>
              </div>
            </div>
            <NuxtLink class="category-bar-more" to="/categories">更多</NuxtLink>
          </div>
          
          <!-- 文章列表 -->
          <div v-if="postsLoading" class="loading-posts">
            <div class="loading-spinner">加载中...</div>
          </div>
          
          <div v-for="(post, index) in posts" 
               :key="post.id" 
               :class="['recent-post-item', 'col1', 'left', index % 2 === 0 ? 'odd' : 'even']" 
               @click="goToPost(`/detail/${post.id}`)">
            <div class="post_cover left_radius">
              <NuxtLink :to="`/detail/${post.id}`" :title="post.title">
                <img class="post_bg" :alt="post.title" :src="post.thumb || '/static/picture/placeholder.webp'">
              </NuxtLink>
            </div>
            <div class="recent-post-info">
              <div class="recent-post-info-top">
                <div class="recent-post-info-top-tips">
                  <span class="original">{{ post.className || '未分类' }}</span>
                  <span v-for="tag in getPostTags(post.keyword)" :key="tag" class="original">{{ tag }}</span>
                  <NuxtLink class="unvisited-post" :to="`/detail/${post.id}`" :title="post.title">未读</NuxtLink>
                </div>
                <NuxtLink class="article-title" :to="`/detail/${post.id}`" :title="post.title">{{ post.title }}</NuxtLink>
                <div class="content">{{ post.intro || '暂无简介' }}</div>
              </div>
              <div class="article-meta-wrap">
                <span class="article-meta tags" v-if="post.keyword">
                  <NuxtLink v-for="tag in getPostTags(post.keyword)" 
                           :key="tag" 
                           class="article-meta__tags" 
                           @click.stop="goToTag(tag)" 
                           :to="`/tag/${tag}`" 
                           :title="tag">
                    <span class="tags-punctuation">{{ tag }}</span>
                  </NuxtLink>
                </span>
                <span class="post-meta-date">
                  <i class="far fa-calendar-alt"></i>
                  <time style="display: inline;" :datetime="post.addTime" :title="`${formatDate(post.addTime)}创建`">
                    {{ formatDate(post.addTime) }}
                  </time>
                </span>
              </div>
            </div>
          </div>
          
          <!-- 分页 -->
          <nav id="pagination" v-if="pagination.pages > 1">
            <div class="pagination">
              <span v-if="pagination.current === 1" class="page-number current">1</span>
              <NuxtLink v-else class="page-number" @click="changePage(1)">1</NuxtLink>
              
              <template v-if="pagination.pages > 1">
                <span v-if="pagination.current > 3" class="space">…</span>
                
                <template v-for="page in getVisiblePages()" :key="page">
                  <span v-if="page === pagination.current" class="page-number current">{{ page }}</span>
                  <NuxtLink v-else class="page-number" @click="changePage(page)">{{ page }}</NuxtLink>
                </template>
                
                <span v-if="pagination.current < pagination.pages - 2" class="space">…</span>
                
                <NuxtLink v-if="pagination.pages > 1 && pagination.current < pagination.pages" 
                         class="page-number" 
                         @click="changePage(pagination.pages)">{{ pagination.pages }}</NuxtLink>
              </template>
              
              <NuxtLink v-if="pagination.current < pagination.pages" 
                       class="extend next" 
                       rel="next" 
                       @click="changePage(pagination.current + 1)">
                <div class="pagination_tips_next">下页</div>
                <i class="haofont hao-icon-chevron-right fa-fw"></i>
              </NuxtLink>
              
              <div class="toPageGroup">
                <input id="toPageText" maxlength="3" title="跳转到指定页面" @input="validatePageInput" @keyup="checkPageJump">
                <a id="toPageButton" @click="jumpToPage">
                  <i class="haofont hao-icon-angles-right"></i>
                </a>
              </div>
            </div>
          </nav>
        </div>
        
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
              <NuxtLink class="banner-button" to="/about">
                <i class="haofont hao-icon-circle-arrow-right"></i>
                <span class="banner-button-text">了解更多</span>
              </NuxtLink>
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
              <NuxtLink class="tag-item" style="font-size:1em" to="/jian-kong" title="监控">监控<sup>1</sup></NuxtLink>
              <NuxtLink class="tag-item" style="font-size:1em" to="/rss" title="rss">rss<sup>1</sup></NuxtLink>
              <NuxtLink class="tag-item" style="font-size:1em" to="/docker" title="docker">docker<sup>6</sup></NuxtLink>
            </div>
          </div>
          
          <!-- 公告卡片 -->
          <div class="card-widget card-announcement">
            <div class="item-headline">
              <div style='display: inline-flex; padding-bottom:0.5em;'>
                <span style='align-items: center;'>微信赞赏</span>
              </div>
            </div>
                            <img src="/static/picture/vZWztN.webp" alt="赞赏二维码">
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
        <NuxtLink id="to_comment" to="#post-comment" title="直达评论">
          <i class="haofont hao-icon-chat--fill" style="font-size: 17px;"></i>
        </NuxtLink>
        <button id="go-up" type="button" title="回到顶部" @click="scrollToTop">
          <i class="haofont hao-icon-arrow-up"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Vue组件特定样式，其他样式已通过index.html导入 */

/* 背景图片样式 */
@media screen and (min-width: 1300px) {
  .global_background_img {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 1;
    position: fixed;
    z-index: -999;
    background: var(--heo-background);
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

@media screen and (max-width: 1300px) {
  .global_background_img {
    display: none;
  }
}

/* 问候语样式已移至全局CSS (loading.css) 中 */

/* 首屏样式 */
#site-title {
  width: max-content;
  max-width: 100%;
  position: relative;
  color: rgba(255, 255, 255, 0);
  animation: 1.5s linear 1s 1 normal both running show;
  margin: 0px auto !important;
}

#site-title::after {
  content: "";
  position: absolute;
  left: 0px;
  margin: auto;
  border-radius: 12px;
  top: 11px;
  height: 55px;
  width: 110%;
  animation: 2s cubic-bezier(0.62, 0.21, 0.25, 1) 1.5s 1 normal both running color_change, 
             2s cubic-bezier(0.62, 0.21, 0.25, 1) 1.5s 1 normal both running swipe_box;
}


/* pl-container 首屏容器样式 */


.pl-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(/static/image/6572722f229c4.webp);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* 默认状态：不播放动画 */
  filter: blur(20px);
  transform: scale(1.1);
  opacity: 0.8;
}

.pl-img.pl-blur {
  filter: blur(20px);
  transform: scale(1.1);
}

.pl-img.pl-visible {
  opacity: 1;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
}

/* 只有在loading完成后才开始动画 */
.pl-container.start-animation .pl-img {
  animation: blur-to-clear 2s cubic-bezier(.62, .21, .25, 1) 0s 1 normal forwards, 
             scale 1.5s cubic-bezier(.62, .21, .25, 1) 0s 1 forwards;
}

@media screen and (max-width: 768px) {
  .pl-img {
    background-image: url(/static/image/6572b1468f937.webp);
  }
}

/* 打字机效果 */
.typed-cursor {
  opacity: 1;
}

.typed-cursor.typed-cursor--blink {
  animation: typedjsBlink 0.7s infinite;
}

@keyframes typedjsBlink {
  50% { opacity: 0.0; }
}

/* 各种动画关键帧 */
@keyframes color_change {
  0% { background: rgb(255, 255, 255); }
  100% { background: var(--xlfd-main); }
}

@keyframes swipe_box {
  0% { left: 0px; width: 0%; }
  50% { left: 0px; width: 100%; }
  100% { left: 100%; width: 0%; }
}

@keyframes show {
  0% { color: rgba(255, 255, 255, 0); }
  81% { color: rgba(255, 255, 255, 0); }
  100% { color: rgb(255, 255, 255); }
}

@keyframes blur-to-clear {
  0% { 
    filter: blur(20px);
    opacity: 0.8;
  }
  100% { 
    filter: blur(0px);
    opacity: 1;
  }
}

@keyframes scale {
  0% { 
    transform: scale(1.1);
  }
  100% { 
    transform: scale(1);
  }
}

/* Banner链接按钮样式 */
.banners-link {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.banners-link-btn {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  background-size: 200%;
  background-position: 0% 0;
}

.banners-link-btn:hover {
  background-position: 100% 0;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.banners-link-btn i {
  margin-right: 8px;
  font-size: 1.2rem;
}

.banners-link-title {
  font-size: 0.9rem;
}

/* 文章标签按钮 - 蓝色渐变 */
.banners-link-btn.blb-hot {
  background: linear-gradient(to right, #358bff, #15c6ff);
  background-size: 200%;
}

/* 最新文章按钮 - 橙色渐变 */
.banners-link-btn.blb-top {
  background: linear-gradient(to right, #ff6655, #ffbf37);
  background-size: 200%;
}

/* 暗色模式下的按钮样式 */
[data-theme=dark] .banners-link-btn.blb-hot {
  background: linear-gradient(to right, #0653b8, #2fcbff);
  background-size: 200%;
}

[data-theme=dark] .banners-link-btn.blb-top {
  background: linear-gradient(to right, #e22a16, #da980c);
  background-size: 200%;
}

/* 移动端按钮适配 */
@media screen and (max-width: 768px) {
  .banners-link {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .banners-link-btn {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
}

/* 今日推荐卡片样式 */
.todayCard {
  width: calc(50% - .5rem);
  height: calc(328px + .5rem);
  background: var(--heo-card-bg);
  border: var(--style-border);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.todayCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.todayCard-info {
  padding: 1rem;
  z-index: 2;
  position: relative;
}

.todayCard-tips {
  font-size: 0.8rem;
  color: var(--heo-fontcolor);
  opacity: 0.7;
  margin-bottom: 0.5rem;
}

.todayCard-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--heo-fontcolor);
  line-height: 1.4;
}

.todayCard-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.8;
}

.todayCard-background {
  background: url('/static/image/6572722f229c4.webp') no-repeat center/cover;
}

.todayCard .banner-button-group {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 3;
}

.todayCard .banner-button {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  color: var(--heo-theme);
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
}

.todayCard .banner-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-1px);
}

.todayCard .banner-button i {
  margin-right: 6px;
  font-size: 1rem;
}

/* 大屏幕显示布局 - banner和todayCard左右排列 */
@media screen and (min-width: 1200px) {
  .recent-post-top {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  
  #bannerGroup {
    width: calc(50% - .5rem);
    margin-right: 0;
  }
  
  .todayCard {
    display: flex;
    flex-shrink: 0;
  }
}

/* 小屏幕隐藏今日推荐 */
@media screen and (max-width: 1199px) {
  .todayCard {
    display: none;
  }
}

/* 底部徽章样式 */
#ghbdages {
  text-align: center;
  padding: 1rem 0;
  margin-top: 1rem;
}

.github-badge {
  display: inline-block;
  transition: all 0.3s ease;
}

.github-badge:hover {
  transform: translateY(-2px);
  opacity: 0.8;
}

.github-badge img {
  height: 20px;
  border-radius: 4px;
}

/* 导航栏下拉菜单样式 */
.menus_item {
  position: relative;
}

.menus_item_child {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--heo-card-bg);
  border: var(--style-border);
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
  min-width: 150px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.menus_item:hover .menus_item_child {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.menus_item_child li {
  margin: 0;
  padding: 0;
}

.menus_item_child .site-page.child {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #333 !important;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 6px;
  margin: 2px 8px;
}

.menus_item_child .site-page.child:hover {
  background: #8e44ad !important;
  color: #fff !important;
}

/* 暗色模式下的二级菜单 */
[data-theme=dark] .menus_item_child .site-page.child {
  color: #fff !important;
}

[data-theme=dark] .menus_item_child .site-page.child:hover {
  background: #8e44ad !important;
  color: #fff !important;
}

.menus_item_child .ali_icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  fill: currentColor;
}

.menus_item_child span {
  font-size: 0.9rem;
  font-weight: 500;
}

/* 主导航菜单图标与文字间距 */
.menus_item .site-page {
  display: flex;
  align-items: center;
}

.menus_item .site-page .ali_icon {
  margin-right: 8px;
}

.menus_item .site-page span {
  margin-left: 4px;
}

/* 说说滚动动画 */
.bbTimeList {
  position: relative;
  overflow: hidden;
  height: 50px;
  display: flex;
  align-items: center;
}

.swiper-container {
  height: 50px;
  overflow: hidden;
  flex: 1;
  display: flex;
  align-items: center;
}

.swiper-wrapper {
  display: flex;
  flex-direction: column;
  animation: momentScroll 18s linear infinite;
  width: 100%;
}

.li-style.swiper-slide {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 100%;
  padding: 8px 0;
  margin: 4px 0;
}

.li-style.swiper-slide p {
  margin: 0;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  width: 100%;
  max-width: 100%;
  padding: 0 20px;
}

/* 滚动动画关键帧 - 无缝循环显示 */
@keyframes momentScroll {
  0% {
    transform: translateY(0);
  }
  16% {
    transform: translateY(0);
  }
  17% {
    transform: translateY(-58px);
  }
  33% {
    transform: translateY(-58px);
  }
  34% {
    transform: translateY(-116px);
  }
  50% {
    transform: translateY(-116px);
  }
  51% {
    transform: translateY(-174px);
  }
  67% {
    transform: translateY(-174px);
  }
  68% {
    transform: translateY(-232px);
  }
  84% {
    transform: translateY(-232px);
  }
  85% {
    transform: translateY(-290px);
  }
  100% {
    transform: translateY(-290px);
  }
}

/* 鼠标悬停暂停动画 */
.bbTimeList:hover .swiper-wrapper {
  animation-play-state: paused;
}

/* 技术图标组样式和动画 */
#bannerGroup {
  display: flex;
}

div#banners {
  display: flex;
  width: 100%;
  height: 100%;
  background: var(--heo-card-bg);
  border: var(--style-border);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

@media screen and (min-width: 1200px) {
  div#bannerGroup {
    height: calc(328px + .5rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  div#banners {
    display: flex;
    width: 100%;
    height: 100%;
    background: var(--heo-card-bg);
    border: var(--style-border);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }
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

.tags-group-all {
  display: flex;
  transform: rotate(0);
  height: 100%;
  overflow: hidden;
  position: relative;
}

.tags-group-all.nowrapMove {
  transform: rotate(0);
  padding-bottom: 2rem;
}

#bannerGroup .tags-group-wrapper {
  margin-top: 0;
  display: flex;
  flex-wrap: wrap;
  animation: rowup 120s linear infinite;
  width: 320px;
  margin-left: auto;
  flex-direction: column;
  /* 确保有足够的高度来实现循环 */
  height: 200%;
}

.nowrapMove .tags-group-wrapper {
  margin-top: 7rem;
  animation: rowleft 120s linear infinite;
  display: flex;
}

.tags-group-icon-pair .tags-group-icon:nth-child(even) {
  margin-top: 1rem;
  transform: translate(-60px);
}

#bannerGroup .tags-group-icon-pair {
  display: flex;
}

#bannerGroup .tags-group-icon-pair .tags-group-icon:nth-child(even) {
  margin-left: 4rem;
}

.tags-group-icon-pair {
  margin-left: 1rem;
  user-select: none;
}

.tags-group-icon-pair a img {
  border-radius: 50%!important;
}

.nowrapMove .tags-group-icon {
  border-radius: 50%;
}

.tags-group-icon img {
  width: 60%;
}

.nowrapMove .tags-group-icon img {
  min-width: 100%;
  min-height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

/* rowup 动画 - 技术图标向上移动，无缝循环 */
@keyframes rowup {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

/* rowleft 动画 - 技术图标向左移动 */
@keyframes rowleft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
  }

/* 加载状态样式 */
.loading-posts {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loading-spinner {
  font-size: 1.1rem;
  color: var(--heo-fontcolor);
  opacity: 0.7;
}
</style>