import { defineStore } from 'pinia'
import { postApi, categoryApi, tagApi } from '~/utils/apiService'
// 保留模拟数据作为备用
import { mockPosts, mockMenu, mockHotPosts, mockTags, mockCategories } from '~/mock/data'

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
    // 菜单数据
    menu: mockMenu,
    // 热门文章
    hotPosts: [],
    // 标签云
    tags: [],
    // 分类数据
    categories: [],
    // 当前文章
    currentPost: null,
    // 当前分类
    currentCategory: null,
    // 当前标签
    currentTag: null,
    // 加载状态
    loading: false,
    // API状态
    useApi: true // 是否使用真实API
  }),

  getters: {
    // 置顶文章
    pinnedPosts: (state) => state.posts.items.filter(post => post.spec?.pinned),
    
    // 普通文章
    normalPosts: (state) => state.posts.items.filter(post => !post.spec?.pinned),
    
    // 主菜单项
    primaryMenuItems: (state) => state.menu.menuItems,

    // 扁平化的所有分类
    allCategoriesFlat: (state) => {
      const flatten = (categories) => {
        let result = []
        for (const category of categories) {
          result.push(category)
          if (category.children && category.children.length > 0) {
            result = result.concat(flatten(category.children))
          }
        }
        return result
      }
      return flatten(state.categories)
    },

    // 按文章数量排序的标签
    tagsOrderedByCount: (state) => {
      return [...state.tags].sort((a, b) => (b.status?.postCount || b.postCount || 0) - (a.status?.postCount || a.postCount || 0))
    }
  },

  actions: {
    // 获取文章列表
    async fetchPosts(page = 1, categorySlug = null, tagSlug = null) {
      this.loading = true
      try {
        let data
        
        if (this.useApi) {
          // 使用真实API
          const params = { page, size: this.posts.size }
          if (categorySlug) params.category = categorySlug
          if (tagSlug) params.tag = tagSlug
          
          data = await postApi.getPosts(params)
          
          // 适配真实API的数据结构
          this.posts.items = data.data || data.items || []
          this.posts.total = data.total || data.count || 0
          this.posts.page = data.currentPage || page
          this.posts.hasNext = data.pages ? (page < data.pages) : false
        } else {
          // 使用模拟数据（备用）
          await new Promise(resolve => setTimeout(resolve, 500))
          
          let allPosts = mockPosts
          
          if (categorySlug) {
            allPosts = mockPosts.filter(post => 
              post.categories && post.categories.some(cat => cat.spec.slug === categorySlug)
            )
          }
          
          if (tagSlug) {
            allPosts = mockPosts.filter(post => 
              post.tags && post.tags.some(tag => tag.spec.slug === tagSlug)
            )
          }
          
          const start = (page - 1) * this.posts.size
          const end = start + this.posts.size
          
          this.posts.items = allPosts.slice(start, end)
          this.posts.total = allPosts.length
          this.posts.page = page
          this.posts.hasNext = end < allPosts.length
        }
        
      } catch (error) {
        console.error('获取文章列表失败:', error)
        // 出错时使用模拟数据
        if (this.useApi) {
          this.useApi = false
          await this.fetchPosts(page, categorySlug, tagSlug)
        }
      } finally {
        this.loading = false
      }
    },

    // 获取文章详情
    async fetchPost(id) {
      this.loading = true
      try {
        if (this.useApi) {
          this.currentPost = await postApi.getPost(id)
        } else {
          await new Promise(resolve => setTimeout(resolve, 300))
          this.currentPost = mockPosts.find(post => post.id === parseInt(id))
        }
      } catch (error) {
        console.error('获取文章详情失败:', error)
        // 出错时使用模拟数据
        this.currentPost = mockPosts.find(post => post.id === parseInt(id))
      } finally {
        this.loading = false
      }
    },

    // 获取分类信息
    async fetchCategory(slug) {
      this.loading = true
      try {
        if (this.useApi) {
          this.currentCategory = await categoryApi.getCategory(slug)
        } else {
          await new Promise(resolve => setTimeout(resolve, 300))
          this.currentCategory = this.allCategoriesFlat.find(cat => cat.spec.slug === slug)
        }
      } catch (error) {
        console.error('获取分类信息失败:', error)
        this.currentCategory = this.allCategoriesFlat.find(cat => cat.spec.slug === slug)
      } finally {
        this.loading = false
      }
    },

    // 获取标签信息
    async fetchTag(slug) {
      this.loading = true
      try {
        if (this.useApi) {
          this.currentTag = await tagApi.getTag(slug)
        } else {
          await new Promise(resolve => setTimeout(resolve, 300))
          this.currentTag = this.tags.find(tag => tag.spec.slug === slug)
        }
      } catch (error) {
        console.error('获取标签信息失败:', error)
        this.currentTag = this.tags.find(tag => tag.spec.slug === slug)
      } finally {
        this.loading = false
      }
    },

    // 搜索文章
    async searchPosts(keyword) {
      this.loading = true
      try {
        if (this.useApi) {
          const data = await postApi.searchPosts(keyword)
          // 适配搜索API的数据结构（直接返回数组）
          this.posts.items = Array.isArray(data) ? data : (data.data || data.items || [])
          this.posts.total = Array.isArray(data) ? data.length : (data.total || data.count || 0)
        } else {
          await new Promise(resolve => setTimeout(resolve, 300))
          const filtered = mockPosts.filter(post => 
            post.title.includes(keyword) || 
            post.excerpt.includes(keyword)
          )
          this.posts.items = filtered
          this.posts.total = filtered.length
        }
      } catch (error) {
        console.error('搜索文章失败:', error)
        const filtered = mockPosts.filter(post => 
          post.title.includes(keyword) || 
          post.excerpt.includes(keyword)
        )
        this.posts.items = filtered
        this.posts.total = filtered.length
      } finally {
        this.loading = false
      }
    },

    // 根据ID获取文章
    async getPostById(id) {
      try {
        if (this.useApi) {
          return await postApi.getPost(id)
        } else {
          const post = mockPosts.find(post => post.id === parseInt(id))
          return post || null
        }
      } catch (error) {
        console.error('获取文章失败:', error)
        const post = mockPosts.find(post => post.id === parseInt(id))
        return post || null
      }
    },

    // 初始化数据
    async initializeData() {
      try {
        if (this.useApi) {
          // 并行获取基础数据
          const [hotPosts, tags, categories] = await Promise.allSettled([
            postApi.getHotPosts(),
            tagApi.getTags(),
            categoryApi.getCategories()
          ])
          
          if (hotPosts.status === 'fulfilled') {
            // 适配热门文章API的数据结构
            const hotPostsData = hotPosts.value
            this.hotPosts = hotPostsData.data || hotPostsData.items || hotPostsData || []
          } else {
            this.hotPosts = mockHotPosts
          }
          
          if (tags.status === 'fulfilled') {
            // 标签API直接返回数组
            this.tags = tags.value || []
          } else {
            this.tags = mockTags
          }
          
          if (categories.status === 'fulfilled') {
            // 分类API直接返回数组
            this.categories = categories.value || []
          } else {
            this.categories = mockCategories
          }
        } else {
          // 使用模拟数据
          this.hotPosts = mockHotPosts
          this.tags = mockTags
          this.categories = mockCategories
        }
      } catch (error) {
        console.error('初始化数据失败:', error)
        // 使用模拟数据作为备用
        this.hotPosts = mockHotPosts
        this.tags = mockTags
        this.categories = mockCategories
      }
    },

    // 切换API模式
    toggleApiMode(useApi = true) {
      this.useApi = useApi
      console.log('API模式:', useApi ? '真实API' : '模拟数据')
    }
  }
})