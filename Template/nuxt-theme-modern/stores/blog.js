import { defineStore } from 'pinia'
import { mockPosts, mockCategories, mockTags, mockMenu, mockSiteConfig } from '~/mock/data'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    // 文章列表
    posts: {
      items: [],
      total: 0,
      page: 1,
      size: 12,
      hasNext: false
    },
    // 当前文章
    currentPost: null,
    // 热门文章
    hotPosts: [],
    // 分类数据
    categories: [],
    // 标签数据
    tags: [],
    // 当前分类
    currentCategory: null,
    // 当前标签
    currentTag: null,
    // 菜单数据
    menu: mockMenu,
    // 站点配置
    siteConfig: mockSiteConfig,
    // 加载状态
    loading: false
  }),
  
  getters: {
    // 置顶文章
    pinnedPosts: (state) => state.posts.items.filter(post => post.pinned),
    
    // 普通文章
    normalPosts: (state) => state.posts.items.filter(post => !post.pinned),
    
    // 主菜单项
    menuItems: (state) => state.menu.menuItems,
    
    // 按文章数量排序的分类
    categoriesOrderedByCount: (state) => {
      return [...state.categories].sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
    },
    
    // 按文章数量排序的标签
    tagsOrderedByCount: (state) => {
      return [...state.tags].sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
    },
    
    // 热门标签（前10个）
    popularTags: (state) => {
      return [...state.tags]
        .sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
        .slice(0, 10)
    }
  },
  
  actions: {
    // 初始化数据
    async initializeData() {
      this.loading = true
      try {
        // 模拟异步加载延迟
        await new Promise(resolve => setTimeout(resolve, 500))
        
        this.categories = mockCategories
        this.tags = mockTags
        this.hotPosts = mockPosts.slice(0, 5)
        
        // 获取首页文章
        await this.fetchPosts()
      } catch (error) {
        console.error('初始化数据失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    // 获取文章列表
    async fetchPosts(page = 1, categorySlug = null, tagSlug = null) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        let filteredPosts = [...mockPosts]
        
        // 分类筛选
        if (categorySlug) {
          filteredPosts = filteredPosts.filter(post => 
            post.categories && post.categories.some(cat => cat.slug === categorySlug)
          )
        }
        
        // 标签筛选
        if (tagSlug) {
          filteredPosts = filteredPosts.filter(post => 
            post.tags && post.tags.some(tag => tag.slug === tagSlug)
          )
        }
        
        // 分页处理
        const start = (page - 1) * this.posts.size
        const end = start + this.posts.size
        
        this.posts.items = filteredPosts.slice(start, end)
        this.posts.total = filteredPosts.length
        this.posts.page = page
        this.posts.hasNext = end < filteredPosts.length
        
      } catch (error) {
        console.error('获取文章列表失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    // 获取文章详情
    async fetchPost(id) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 200))
        this.currentPost = mockPosts.find(post => post.id === parseInt(id))
      } catch (error) {
        console.error('获取文章详情失败:', error)
        this.currentPost = null
      } finally {
        this.loading = false
      }
    },
    
    // 获取分类信息
    async fetchCategory(slug) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 200))
        this.currentCategory = this.categories.find(cat => cat.slug === slug)
      } catch (error) {
        console.error('获取分类信息失败:', error)
        this.currentCategory = null
      } finally {
        this.loading = false
      }
    },
    
    // 获取标签信息
    async fetchTag(slug) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 200))
        this.currentTag = this.tags.find(tag => tag.slug === slug)
      } catch (error) {
        console.error('获取标签信息失败:', error)
        this.currentTag = null
      } finally {
        this.loading = false
      }
    },
    
    // 搜索文章
    async searchPosts(keyword) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const filtered = mockPosts.filter(post => 
          post.title.toLowerCase().includes(keyword.toLowerCase()) || 
          post.summary.toLowerCase().includes(keyword.toLowerCase())
        )
        
        this.posts.items = filtered
        this.posts.total = filtered.length
        this.posts.page = 1
        this.posts.hasNext = false
        
      } catch (error) {
        console.error('搜索文章失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    // 根据ID获取文章
    getPostById(id) {
      return mockPosts.find(post => post.id === parseInt(id)) || null
    }
  }
})