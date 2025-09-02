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
    <div class="post" id="body-wrap">
      <header class="post-bg" id="page-header">
        <HeaderNavigation 
          @random-post="toRandomPost"
          @open-search="openSearch"
          @redirect-login="redirectToLogin"
          @show-console="showConsole"
          @scroll-to-top="scrollToTop"
          :page-title="article.title"
        />
        
        <!-- 文章封面 -->
        <div class="coverdiv loaded" id="coverdiv">
          <img alt="cover" class="nolazyload" id="post-cover" :src="article.thumb">
        </div>

        <!-- 文章信息 -->
        <div id="post-info">
          <div id="post-firstinfo">
            <div class="meta-firstline">
              <!-- 原创标识 -->
              <a class="post-meta-original" title="该文章为原创文章，注意版权协议" href="/privacy">原创</a>
              
              <!-- 分类 -->
              <span class="post-meta-categories" v-if="article.sortClass">
                <a class="post-meta-categories" 
                   :href="`/categories/${article.sortClass}`" 
                   :title="article.sortClass">{{ article.sortClass }}</a>
              </span>
              
              <!-- 标签 -->
              <div class="tag_share">
                <div class="post-meta__tag-list">
                  <a class="post-meta__tags" 
                     v-for="tag in articleTags" 
                     :key="tag.name"
                     :href="tag.link" 
                     :title="tag.name">
                    <span class="tags-name tags-punctuation">{{ tag.name }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 文章标题 -->
          <h1 class="post-title">{{ article.title }}</h1>
          
          <!-- 文章元信息 -->
          <div id="post-meta">
            <div class="meta-secondline">
              <!-- 作者 -->
              <span class="post-meta-author" data-flag-title="文章作者" title="文章作者">
                <i class="haofont hao-icon-zuozhe post-meta-icon"></i>{{ article.authorName }}
              </span>
              
              <!-- 字数统计 -->
              <span class="post-meta-wordcount">
                <i class="haofont hao-icon-file-word post-meta-icon" title="字数"></i>
                <span class="post-meta-label">字数:</span>
                <span class="word-count">{{ article.commentNum }}</span>
                <span class="post-meta-separator"></span>
                <i class="haofont hao-icon-clock post-meta-icon" title="阅读耗时"></i>
                <span class="post-meta-label">阅读耗时:</span>
                <span>{{ article.commentNum }} 分钟</span>
              </span>
              
              <!-- 发布日期 -->
              <span class="post-meta-date">
                <i class="haofont hao-icon-calendar-days post-meta-icon"></i>
                <time :title="article.addTime" :datetime="article.addTime">{{ formattedDate }}</time>
              </span>
              
              <!-- 首发标识 -->
              <span class="post-meta-wechat" title="该文章在博客首发">
                <i class="haofont hao-icon-rss post-meta-icon"></i>博客独享
              </span>
              
              <!-- 热度 -->
              <a class="post-meta-pv" data-flag-title="热度" title="热度">
                <i class="haofont hao-icon-fire post-meta-icon"></i>
                <span class="post-meta-label">热度:</span>
                <span id="visit">{{ article.hits }}</span>
              </a>
              
              <!-- 评论数 -->
              <a class="post-meta-commentcount" data-flag-title="评论数" title="评论数" href="#post-comment">
                <i class="haofont hao-icon-chat--fill post-meta-icon" style="font-size: 17px;"></i>
                <span class="post-meta-label">评论:</span>
                <span id="comment-count">{{ article.commentNum }}</span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- 波浪装饰 -->
        <section class="main-hero-waves-area waves-area">
          <svg class="waves-svg" preserveAspectRatio="none" shape-rendering="auto" viewBox="0 24 150 28" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <path d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z" id="gentle-wave"></path>
            </defs>
            <g class="parallax">
              <use href="#gentle-wave" x="48" y="0"></use>
              <use href="#gentle-wave" x="48" y="3"></use>
              <use href="#gentle-wave" x="48" y="5"></use>
              <use href="#gentle-wave" x="48" y="7"></use>
            </g>
          </svg>
        </section>
      </header>
      
      <main class="layout right-aside" id="content-inner">
        <div id="post">
          <!-- 文章AI摘要 -->
          <div class="post-ai">
            <div class="ai-title">
              <i class="haofont hao-icon-bilibili"></i>
              <div class="ai-title-text">AI-摘要</div>
              <i class="haofont hao-icon-arrow-rotate-right"></i>
              <div class="ai-tag" id="ai-tag">IceCMS GPT</div>
            </div>
            <div class="ai-explanation" style="display: block;">{{ article.aiSummary || 'AI初始化中...' }}</div>
            <div class="ai-btn-box">
              <div class="ai-btn-item" @click="askAI('introduce')">介绍自己</div>
              <div class="ai-btn-item" @click="askAI('summary')">生成本文简介</div>
              <div class="ai-btn-item" @click="askAI('related')">推荐相关文章</div>
              <div class="ai-btn-item" @click="goHome">前往主页</div>
            </div>
          </div>

          <!-- 文章内容 -->
          <article class="post-content line-numbers" id="article-container">
            <div v-html="article.content"></div>
          </article>

          <!-- 版权声明 -->
          <div class="post-copyright">
            <div class="post-copyright__author_group">
              <div>
                <a class="post-copyright__author_img" href="/about" data-pjax-state="">
                  <img class="post-copyright__author_img_back entered loading" :src="author.avatar">
                </a>
              </div>
              <div class="post-copyright__author_name">{{ author.name }}</div>
              <div class="post-copyright__author_desc">{{ author.description }}</div>
            </div>
            
            <div class="post-tools" id="post-tools">
              <div class="post-tools-left">
                <div class="rewardLeftButton">
                  <div class="post-reward" @click="showReward = !showReward">
                    <div class="reward-button button--animated" title="打赏作者">
                      <i class="haofont hao-icon-hand-heart-fill"></i> 打赏作者
                    </div>
                    <div class="reward-main" v-show="showReward">
                      <ul class="reward-all">
                        <span class="reward-title">感谢你赐予我前进的力量</span>
                        <ul class="reward-group">
                          <li class="reward-item">
                            <a href="/static/picture/vZWztN.webp" target="_blank">
                              <img alt="微信" class="post-qr-code-img" src="/static/picture/vZWztN.webp">
                            </a>
                            <div class="post-qr-code-desc">微信</div>
                          </li>
                          <li class="reward-item">
                            <a href="/static/picture/UJ6Np5.webp" target="_blank">
                              <img alt="支付宝" class="post-qr-code-img" src="/static/picture/UJ6Np5.webp">
                            </a>
                            <div class="post-qr-code-desc">支付宝</div>
                          </li>
                        </ul>
                        <a class="reward-main-btn" href="/sponsors" target="_blank">
                          <div class="reward-text">赞赏者名单</div>
                          <div class="reward-dec">因为你们的支持让我意识到写文章的价值🙏</div>
                        </a>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div class="shareRight">
                  <div class="share-link mobile">
                    <div class="share-qrcode">
                      <div class="share-button" title="使用手机访问这篇文章">
                        <i class="haofont hao-icon-qrcode"></i>
                      </div>
                      <div class="share-main">
                        <div class="share-main-all">
                          <div id="qrcode"></div>
                          <div class="reward-dec">使用手机访问这篇文章</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="share-link copyurl">
                    <div class="share-button" id="post-share-url" @click="copyUrl" title="复制链接">
                      <i class="haofont hao-icon-link"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="post-copyright__notice">
              <span class="post-copyright-info">本文是原创文章，采用 
                <a target="_blank" href="/cc">CC BY-NC-ND 4.0</a> 协议，完整转载请注明来自 
                <a href="/" target="_blank">Carol 小屋</a>
              </span>
            </div>
          </div>
          
          <div class="post-tools-right">
            <div class="tag_share">
              <div class="post-meta__tag-list">
                <a class="post-meta__tags" 
                   v-for="tag in articleTags" 
                   :key="tag.name"
                   :href="tag.link">
                  <span class="tags-punctuation">{{ tag.name }}</span>
                  <span class="tagsPageCount">{{ tag.count }}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- 上下篇导航 -->
          <nav class="pagination-post needEndHide" id="pagination" v-if="navigation.prev || navigation.next">
            <div class="prev-post pull-left" v-if="navigation.prev">
              <a :href="navigation.prev.link">
                <img alt="cover" id="preimg" class="nolazyload" :src="navigation.prev.thumb">
                <div class="pagination-info">
                  <div class="label">上一篇</div>
                  <div class="prev_info">{{ navigation.prev.title }}</div>
                </div>
              </a>
            </div>
            <div class="next-post pull-right" v-if="navigation.next">
              <a :href="navigation.next.link">
                <img alt="cover" id="nextimg" class="nolazyload" :src="navigation.next.thumb">
                <div class="pagination-info">
                  <div class="label">下一篇</div>
                  <div class="next_info">{{ navigation.next.title }}</div>
                </div>
              </a>
            </div>
          </nav>

          <!-- 阅读建议 -->
          <div class="relatedPosts">
            <div class="headline">
              <i class="haofont hao-icon-cainixihuan" style="font-size: 1.1rem;"></i>
              <span>阅读建议</span>
            </div>
            <div class="relatedPosts-list">
              <div v-for="post in relatedPosts" :key="post.id">
                <a :href="post.link" :title="post.title">
                  <img alt="cover" class="cover" id="preimg" :src="post.thumb">
                  <div class="content is-center">
                    <div class="date" style="color: white">
                      <i class="far fa-calendar-alt fa-fw"></i>
                      {{ post.addTime }}
                    </div>
                    <div class="title" style="color: white">{{ post.title }}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <hr>

          <!-- 评论区 -->
          <div id="post-comment">
            <div class="comment-head">
              <div class="comment-headline">
                <i class="haofont hao-icon-chat--fill" style="font-size: 20px;"></i> 
                <span>评论</span>
              </div>
              <div class="comment-randomInfo">
                <a @click="anonymousComment" href="javascript:void(0)">匿名评论</a>
                <a href="/privacy">隐私政策</a>
              </div>
              <div class="comment-tips" id="comment-tips">
                <span>你无需删除空行，直接评论以获取最佳展示效果</span>
              </div>
            </div>

            <!-- 评论组件占位 -->
            <div class="comment-container">
              <div class="comment-placeholder">
                <p>评论加载中...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="aside-content" id="aside-content">
          <!-- 目录 -->
          <div class="sticky_layout">
            <div class="card-widget" id="card-toc">
              <div class="item-headline">
                <i class="haofont hao-icon-bars"></i>
                <span>文章目录</span>
                <span class="toc-percentage">{{ tocPercentage }}%</span>
              </div>
              <div class="toc-content">
                <div v-if="toc.length === 0" class="toc-empty">
                  <p>正在生成目录...</p>
                  <p>文章内容长度: {{ article.content?.length || 0 }}</p>
                </div>
                <div v-for="heading in toc" :key="heading.id" 
                     :class="['toc-item', `toc-level-${heading.level}`]"
                     @click="scrollToHeading(heading.id)">
                  {{ heading.text }}
                </div>
              </div>
            </div>

            <!-- 广告位 -->
            <div class="card-widget card-announcement">
              <div class="item-headline">
                <span>微信赞赏</span>
              </div>
              <img src="/static/picture/vZWztN.webp" alt="微信赞赏">
            </div>

            <div class="card-widget card-announcement">
              <div class="item-headline">
                <span>支付宝赞赏</span>
              </div>
              <img src="/static/picture/UJ6Np5.webp" alt="支付宝赞赏">
            </div>

            <div class="card-widget card-announcement">
              <div class="item-headline">
                <span>咸鱼小卖场</span>
              </div>
              <a href='https://www.goofish.com/personal?spm=a21ybx.item.itemHeader.1.63a83da6TsMl1B&userId=1030797366' target="_blank">
                <img src="/static/picture/6RxR6r.webp" alt="咸鱼" title="咸鱼">
              </a>
            </div>

            <div class="card-widget card-announcement">
              <div class="item-headline">
                <span>爱发电</span>
              </div>
              <a href='https://afdian.com/a/carolcoral' target="_blank">
                <img src="/static/picture/uMC59e.webp" alt="爱发电">
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
        <button class="close" id="mobile-toc-button" type="button" title="目录">
          <i class="haofont hao-icon-list-ul"></i>
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

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '~/stores/blog'
import { postApi } from '~/utils/apiService'
import HeaderNavigation from '../../components/HeaderNavigation.vue'
import Footer from '../../components/Footer.vue'

// 获取路由信息
const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

// 响应式数据
const isLoading = ref(true)
const darkMode = ref(false)
const showReward = ref(false)
const tocPercentage = ref(0)
const articleLoading = ref(false)
const error = ref(null)

// 文章数据 - 初始默认值
const article = ref({
  id: null,
  title: '加载中...',
  content: '<p>正在加载文章内容...</p>',
  intro: '',
  thumb: '/static/picture/placeholder.webp',
  authorName: '加载中...',
  sortClass: '',
  hits: 0,
  loveNum: 0,
  commentNum: 0,
  addTime: '',
  keyword: '',
  aiSummary: 'AI摘要生成中...'
})

// 其他数据
const author = ref({
  name: 'IceCMS',
  description: '@Copyright Carol from CNKJ',
  avatar: '/static/picture/bec87140-723c-4b33-bc26-35603174a4cc.png'
})

const navigation = ref({
  prev: null,
  next: null
})

const recentComments = ref([
  {
    id: 1,
    author: '访客1',
    content: '这篇文章写得很好！',
    avatar: '/static/picture/avatar-blue.png',
    link: '#comment-1',
    datetime: '2023-12-01T10:00:00Z',
    formattedTime: '2023-12-1'
  },
  {
    id: 2,
    author: '访客2',
    content: '学到了很多新知识',
    avatar: '/static/picture/avatar-blue.png',
    link: '#comment-2',
    datetime: '2023-12-02T14:30:00Z',
    formattedTime: '2023-12-2'
  }
])

const tags = ref([
  { name: 'Java', link: '/tags/java', count: 15 },
  { name: '后端开发', link: '/tags/backend', count: 28 },
  { name: '编程', link: '/tags/programming', count: 42 }
])

const relatedPosts = ref([])

// 目录相关数据
const toc = ref([])
const scrollHandler = ref(null)

// 生成文章目录
const generateToc = () => {
  console.log('开始生成目录...')
  
  // 等待DOM更新完成后生成目录
  nextTick(() => {
    console.log('nextTick执行，查找article-container...')
    const container = document.getElementById('article-container')
    console.log('找到container:', container)
    
    if (!container) {
      console.warn('未找到article-container')
      return
    }
    
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
    console.log('找到标题:', headings.length, '个')
    
    const tocItems = []
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const text = heading.textContent || heading.innerText
      let id = heading.id
      
      console.log(`标题 ${index}:`, {
        tagName: heading.tagName,
        level,
        text: text.slice(0, 50),
        id
      })
      
      // 如果没有id，生成一个
      if (!id) {
        // 处理中文标题，生成简单的id
        id = `heading-${index}`
        heading.id = id
      }
      
      tocItems.push({
        id,
        level,
        text: text.trim(),
        element: heading
      })
    })
    
    toc.value = tocItems
    console.log('最终生成目录:', tocItems.length, '项')
    console.log('目录详情:', tocItems)
    
    // 如果没有找到标题，尝试从文章内容中手动创建
    if (tocItems.length === 0) {
      console.log('没有找到标题，尝试手动创建目录...')
      createManualToc()
    }
  })
}

// 手动创建目录（当文章内容中没有标题标签时）
const createManualToc = () => {
  console.log('创建手动目录...')
  const content = article.value.content
  if (!content) return
  
  const manualTocItems = []
  
  // 1. 尝试匹配强调文本作为标题
  const strongMatches = content.match(/<strong>(.+?)<\/strong>/g)
  if (strongMatches) {
    strongMatches.forEach((match, i) => {
      const text = match.replace(/<\/?strong>/g, '').trim()
      if (text.length > 0 && text.length < 50) { // 只取较短的作为标题
        manualTocItems.push({
          id: `strong-heading-${i}`,
          level: 2,
          text: text
        })
      }
    })
  }
  
  // 2. 如果没有强调文本，尝试匹配短段落
  if (manualTocItems.length === 0) {
    const paragraphMatches = content.match(/<p>(.{1,40}?)<\/p>/g)
    if (paragraphMatches) {
      paragraphMatches.slice(0, 8).forEach((match, i) => { // 最多取前8个
        const text = match.replace(/<\/?p>/g, '').replace(/&nbsp;/g, ' ').trim()
        if (text.length > 0 && !text.includes('<') && !text.includes('function')) {
          manualTocItems.push({
            id: `para-heading-${i}`,
            level: 3,
            text: text.length > 30 ? text.substring(0, 30) + '...' : text
          })
        }
      })
    }
  }
  
  // 3. 如果还是没有，按内容结构创建
  if (manualTocItems.length === 0) {
    // 分析文章内容的结构
    const sections = content.split(/<\/p><p>|<\/p>\s*<p>/)
    if (sections.length > 3) {
      sections.slice(0, 6).forEach((section, i) => {
        const cleanText = section.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
        if (cleanText.length > 10) {
          const title = cleanText.length > 25 ? cleanText.substring(0, 25) + '...' : cleanText
          manualTocItems.push({
            id: `section-${i}`,
            level: 2,
            text: `第${i + 1}节: ${title}`
          })
        }
      })
    }
  }
  
  // 4. 最后的备选方案
  if (manualTocItems.length === 0) {
    manualTocItems.push(
      {
        id: 'article-start',
        level: 1,
        text: '文章开头'
      },
      {
        id: 'article-content',
        level: 1,
        text: '文章内容'
      }
    )
  }
  
  toc.value = manualTocItems
  console.log('手动目录创建完成:', manualTocItems)
}

// 更新滚动进度
const updateTocPercentage = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  
  if (documentHeight > 0) {
    tocPercentage.value = Math.round((scrollTop / documentHeight) * 100)
  } else {
    tocPercentage.value = 0
  }
}

// 滚动到指定标题
const scrollToHeading = (id) => {
  console.log('尝试滚动到:', id)
  
  // 首先尝试通过ID找到元素
  let element = document.getElementById(id)
  console.log('通过ID找到元素:', element)
  
  // 如果没找到，尝试通过文本内容查找
  if (!element) {
    const tocItem = toc.value.find(item => item.id === id)
    if (tocItem) {
      console.log('在目录中找到项目:', tocItem)
      
      // 在文章容器中查找包含相同文本的元素
      const container = document.getElementById('article-container')
      if (container) {
        const allElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, strong')
        
        for (const el of allElements) {
          const text = el.textContent || el.innerText
          if (text && text.trim().includes(tocItem.text.trim())) {
            element = el
            console.log('通过文本匹配找到元素:', element)
            break
          }
        }
      }
    }
  }
  
  // 如果找到元素，滚动到该位置
  if (element) {
    console.log('执行滚动到:', element)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    
    // 高亮显示目标元素（可选）
    element.style.backgroundColor = '#fff3cd'
    setTimeout(() => {
      element.style.backgroundColor = ''
    }, 2000)
  } else {
    console.warn('未找到目标元素:', id)
    
    // 如果都找不到，至少滚动到文章开头
    const articleContainer = document.getElementById('article-container')
    if (articleContainer) {
      articleContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}

// 获取文章详情
const fetchArticleDetail = async (id) => {
  try {
    articleLoading.value = true
    error.value = null
    
    console.log('正在获取文章详情，ID:', id)
    
         const response = await postApi.getPost(id)
    console.log('API响应:', response)
    
    if (response && response.id) {
      // 更新文章数据
      article.value = {
        id: response.id,
        title: response.title || '无标题',
        content: response.content || '<p>暂无内容</p>',
        intro: response.intro || '',
        thumb: response.thumb || '/static/picture/placeholder.webp',
        authorName: response.authorName || '未知作者',
        sortClass: response.sortClass || '',
        hits: response.hits || 0,
        loveNum: response.loveNum || 0,
        commentNum: response.commentNum || 0,
        addTime: response.addTime || '',
        keyword: response.keyword || '',
        aiSummary: response.intro || 'AI摘要生成中...'
      }
      
      // 更新作者信息
      if (response.authorName) {
        author.value.name = response.authorName
      }
      
      console.log('文章数据更新完成:', article.value)
      
      // 延迟生成文章目录，确保DOM完全渲染
      setTimeout(() => {
        generateToc()
      }, 500)
    } else {
      throw new Error('文章数据格式错误')
    }
  } catch (err) {
    console.error('获取文章详情失败:', err)
    error.value = err.message || '获取文章详情失败'
    
    // 使用模拟数据
    article.value = {
      id: id,
      title: '文章加载失败',
      content: '<p>抱歉，无法加载文章内容，请稍后再试。</p>',
      intro: '文章加载失败',
      thumb: '/static/picture/placeholder.webp',
      authorName: '系统',
      sortClass: '系统消息',
      hits: 0,
      loveNum: 0,
      commentNum: 0,
      addTime: new Date().toISOString(),
      keyword: '',
      aiSummary: '文章加载失败，请稍后再试。'
    }
  } finally {
    articleLoading.value = false
    isLoading.value = false
  }
}

// 格式化时间
const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

// 获取文章标签
const getPostTags = (keyword) => {
  if (!keyword) return []
  const tagIds = keyword.split(',').filter(id => id.trim())
  
  // 标签ID到名称的映射
  const tagMap = {
    '1': '设计笔记',
    '2': 'iceCMS', 
    '3': '我的网站',
    '4': '资源下载',
    '5': '编程',
    '6': '新手必备',
    '7': 'office',
    '8': '优化',
    '9': 'vip'
  }
  
  return tagIds.map(id => ({
    name: tagMap[id] || `标签${id}`,
    link: `/tags/${id}`,
    count: 1
  }))
}

// 计算属性
const formattedDate = computed(() => {
  return formatDate(article.value.addTime)
})

const articleTags = computed(() => {
  return getPostTags(article.value.keyword)
})

// 计算字数
const wordCount = computed(() => {
  if (!article.value.content) return 0
  // 移除HTML标签后计算字数
  const textContent = article.value.content.replace(/<[^>]*>/g, '')
  return textContent.length
})

// 计算阅读时间（按每分钟500字计算）
const readTime = computed(() => {
  const words = wordCount.value
  return Math.ceil(words / 500) || 1
})

// 界面操作方法
const hideConsole = () => {
  // 隐藏控制台逻辑
  const console = document.getElementById('console')
  if (console) {
    console.style.display = 'none'
  }
}

const askAI = (type) => {
  console.log('AI操作:', type)
  // 这里可以添加AI相关的逻辑
}

const goHome = () => {
  router.push('/')
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const switchDarkMode = () => {
  darkMode.value = !darkMode.value
  // 可以添加主题切换逻辑
}

const toggleAside = () => {
  // 切换侧边栏显示
  const aside = document.querySelector('.aside-content')
  if (aside) {
    aside.classList.toggle('hidden')
  }
}

// 初始化应用
const initApp = () => {
  initTheme()
  endLoading()
}

const initTheme = () => {
  // 主题初始化逻辑
  console.log('主题初始化')
}

const endLoading = () => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const initToc = () => {
  // 目录初始化逻辑
  console.log('目录初始化')
}

const initScrollListener = () => {
  // 滚动监听初始化
  scrollHandler.value = () => {
    updateTocPercentage()
  }
  window.addEventListener('scroll', scrollHandler.value)
  console.log('滚动监听初始化')
}

const removeScrollListener = () => {
  // 移除滚动监听
  if (scrollHandler.value) {
    window.removeEventListener('scroll', scrollHandler.value)
    scrollHandler.value = null
  }
  console.log('移除滚动监听')
}

// 监听路由变化
watch(() => route.params.id, async (newId) => {
  if (newId) {
    await fetchArticleDetail(newId)
  }
}, { immediate: true })

// 组件挂载时获取文章详情
onMounted(async () => {
  initApp()
  initToc()
  initScrollListener()
  
  const articleId = route.params.id
  if (articleId) {
    await fetchArticleDetail(articleId)
  } else {
    console.error('未找到文章ID')
    error.value = '未找到文章ID'
    isLoading.value = false
  }
})

// 组件卸载前清理
onBeforeUnmount(() => {
  removeScrollListener()
})
</script>

<style scoped>
/* 文章详情页特有样式 */
.post-bg {
  background: linear-gradient(135deg, var(--heo-theme) 0%, var(--heo-theme-op-deep) 100%);
  position: relative;
  overflow: hidden;
}

.coverdiv {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.coverdiv img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
}

#post-info {
  position: relative;
  z-index: 2;
  padding: 4rem 2rem 2rem;
  text-align: center;
  color: var(--heo-white);
}

.meta-firstline {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.post-meta-original {
  background: var(--heo-theme-op);
  color: var(--heo-white);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.post-meta-categories a {
  background: rgba(255, 255, 255, 0.2);
  color: var(--heo-white);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.post-meta__tag-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-meta__tags {
  background: rgba(255, 255, 255, 0.15);
  color: var(--heo-white);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.post-meta__tags:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.post-title {
  font-size: 3rem;
  font-weight: bold;
  margin: 2rem 0;
  color: var(--heo-white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.meta-secondline {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
}

.meta-secondline > * {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
}

.post-meta-icon {
  margin-right: 0.3rem;
}

.waves-area {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.waves-svg {
  position: relative;
  display: block;
  width: calc(138% + 1.3px);
  height: 63px;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
  fill: var(--heo-card-bg);
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% { transform: translate3d(-90px, 0, 0); }
  100% { transform: translate3d(85px, 0, 0); }
}

/* AI摘要样式 */
.post-ai {
  background: var(--heo-card-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: var(--heo-shadow-border);
  border: var(--style-border);
}

.ai-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: var(--heo-theme);
}

.ai-explanation {
  color: var(--heo-fontcolor);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.ai-btn-box {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.ai-btn-item {
  background: var(--heo-theme-op);
  color: var(--heo-theme);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--heo-theme-op);
}

.ai-btn-item:hover {
  background: var(--heo-theme);
  color: var(--heo-white);
  transform: translateY(-2px);
}

/* 文章内容样式 */
.post-content {
  background: var(--heo-card-bg);
  border-radius: 12px;
  padding: 3rem;
  margin: 2rem 0;
  box-shadow: var(--heo-shadow-border);
  border: var(--style-border);
  line-height: 1.8;
  color: var(--heo-fontcolor);
}

.post-content h1,
.post-content h2,
.post-content h3,
.post-content h4,
.post-content h5,
.post-content h6 {
  color: var(--heo-fontcolor);
  margin: 2rem 0 1rem 0;
  font-weight: bold;
}

.post-content h1 { font-size: 2.2rem; }
.post-content h2 { font-size: 1.8rem; }
.post-content h3 { font-size: 1.5rem; }
.post-content h4 { font-size: 1.3rem; }
.post-content h5 { font-size: 1.2rem; }
.post-content h6 { font-size: 1.1rem; }

.post-content p {
  margin: 1rem 0;
}

.post-content code {
  background: var(--heo-secondbg);
  color: var(--heo-theme);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.post-content pre {
  background: var(--heo-secondbg);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.post-content pre code {
  background: none;
  padding: 0;
  color: var(--heo-fontcolor);
}

.post-content ol,
.post-content ul {
  padding-left: 2rem;
  margin: 1rem 0;
}

.post-content li {
  margin: 0.5rem 0;
}

.post-content blockquote {
  border-left: 4px solid var(--heo-theme);
  padding-left: 1rem;
  margin: 1.5rem 0;
  background: var(--heo-theme-op);
  border-radius: 0 8px 8px 0;
}

/* 版权声明样式 */
.post-copyright {
  background: var(--heo-card-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: var(--heo-shadow-border);
  border: var(--style-border);
}

.post-copyright__author_group {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.post-copyright__author_img img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.post-copyright__author_name {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--heo-fontcolor);
}

.post-copyright__author_desc {
  color: var(--heo-secondtext);
  font-size: 0.9rem;
}

.post-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
}

.post-tools-left {
  display: flex;
  gap: 1rem;
}

.reward-button {
  background: var(--heo-theme);
  color: var(--heo-white);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.reward-button:hover {
  background: var(--heo-theme-op-deep);
  transform: translateY(-2px);
}

.share-button {
  background: var(--heo-secondbg);
  color: var(--heo-fontcolor);
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-button:hover {
  background: var(--heo-theme);
  color: var(--heo-white);
  transform: translateY(-2px);
}

/* 上下篇导航样式 */
.pagination-post {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin: 3rem 0;
}

.prev-post,
.next-post {
  flex: 1;
  background: var(--heo-card-bg);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--heo-shadow-border);
  border: var(--style-border);
}

.prev-post:hover,
.next-post:hover {
  transform: translateY(-5px);
  box-shadow: var(--heo-shadow-lightblack);
}

.prev-post a,
.next-post a {
  display: flex;
  text-decoration: none;
  color: inherit;
}

.prev-post img,
.next-post img {
  width: 150px;
  height: 100px;
  object-fit: cover;
}

.pagination-info {
  padding: 1rem;
  flex: 1;
}

.pagination-info .label {
  font-size: 0.9rem;
  color: var(--heo-secondtext);
  margin-bottom: 0.5rem;
}

.prev_info,
.next_info {
  font-size: 1.1rem;
  color: var(--heo-fontcolor);
  font-weight: 500;
}

/* 相关文章推荐样式 */
.relatedPosts {
  background: var(--heo-card-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: var(--heo-shadow-border);
  border: var(--style-border);
}

.relatedPosts .headline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--heo-fontcolor);
}

.relatedPosts-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.relatedPosts-list > div {
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
}

.relatedPosts-list > div:hover {
  transform: translateY(-5px);
}

.relatedPosts-list img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.relatedPosts-list .content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1rem 1rem;
}

.relatedPosts-list .date {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.relatedPosts-list .title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.4;
}

/* 评论区样式 */
#post-comment {
  background: var(--heo-card-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: var(--heo-shadow-border);
  border: var(--style-border);
}

.comment-head {
  margin-bottom: 2rem;
}

.comment-headline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--heo-fontcolor);
  margin-bottom: 1rem;
}

.comment-randomInfo {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.comment-randomInfo a {
  color: var(--heo-theme);
  text-decoration: none;
  font-size: 0.9rem;
}

.comment-tips {
  color: var(--heo-secondtext);
  font-size: 0.9rem;
}

.comment-container {
  min-height: 200px;
}

.comment-placeholder {
  text-align: center;
  padding: 3rem;
  color: var(--heo-secondtext);
}

/* 侧边栏样式 */
.aside-content {
  width: 300px;
  margin-left: 2rem;
}

.sticky_layout {
  position: sticky;
  top: 2rem;
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

/* 目录样式 */
.toc-content {
  max-height: 400px;
  overflow-y: auto;
}

.toc-item {
  padding: 0.3rem 0;
  cursor: pointer;
  color: var(--heo-secondtext);
  transition: all 0.3s ease;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
}

.toc-item:hover {
  color: var(--heo-theme);
  border-left-color: var(--heo-theme);
}

.toc-level-1 { margin-left: 0; font-weight: bold; }
.toc-level-2 { margin-left: 1rem; }
.toc-level-3 { margin-left: 2rem; }
.toc-level-4 { margin-left: 3rem; }
.toc-level-5 { margin-left: 4rem; }

.toc-percentage {
  margin-left: auto;
  color: var(--heo-theme);
  font-weight: bold;
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
  .layout.right-aside {
    flex-direction: column;
  }
  
  .aside-content {
    width: 100%;
    margin-left: 0;
    margin-top: 2rem;
  }
  
  .sticky_layout {
    position: static;
  }
}

@media screen and (max-width: 768px) {
  .post-title {
    font-size: 2rem;
  }
  
  .meta-secondline {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .post-content {
    padding: 1.5rem;
  }
  
  .pagination-post {
    flex-direction: column;
  }
  
  .relatedPosts-list {
    grid-template-columns: 1fr;
  }
}

/* 暗色模式下的文本对比度优化 */
[data-theme="dark"] .post-content {
  color: rgba(255, 255, 255, 0.85);
}

[data-theme="dark"] .post-content h1,
[data-theme="dark"] .post-content h2,
[data-theme="dark"] .post-content h3,
[data-theme="dark"] .post-content h4,
[data-theme="dark"] .post-content h5,
[data-theme="dark"] .post-content h6 {
  color: rgba(255, 255, 255, 0.9);
}

/* 文章元信息样式优化 */
.meta-firstline {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: nowrap;
  margin-bottom: 1rem;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  min-width: 0;
}

.post-meta-original {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;
  flex-shrink: 0;
  white-space: nowrap;
}

.post-meta-original:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 107, 107, 0.4);
}

.post-meta-categories {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.post-meta-categories a {
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(78, 205, 196, 0.3);
  transition: all 0.3s ease;
  margin: 0;
  flex-shrink: 0;
  white-space: nowrap;
}

.post-meta-categories a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(78, 205, 196, 0.4);
}

.tag_share {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.post-meta__tag-list {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  white-space: nowrap;
}

.post-meta__tags {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
  flex-shrink: 0;
  white-space: nowrap;
}

.post-meta__tags:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.4);
}

.tags-name {
  font-weight: 500;
}

/* 响应式优化 */
@media screen and (max-width: 768px) {
  .meta-firstline {
    gap: 0.5rem;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  
  .post-meta-original,
  .post-meta-categories a,
  .post-meta__tags {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
    flex-shrink: 0;
  }
}

@media screen and (min-width: 769px) {
  .meta-firstline {
    flex-wrap: nowrap;
  }
  
  .post-meta-original,
  .post-meta-categories a,
  .post-meta__tags {
    flex-shrink: 0;
  }
}
</style>