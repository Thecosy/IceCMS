// API服务 - 根据实际后端接口调整
const getBaseURL = () => {
  // 直接使用环境变量，不依赖Nuxt的composable
  if (typeof window !== 'undefined') {
    // 浏览器环境，使用从服务端渲染传递的配置
    return window.__NUXT__?.config?.public?.apiBase || 'http://127.0.0.1:8181/'
  }
  // 服务端环境
  return process.env.NUXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8181/'
}

const apiRequest = async (endpoint, options = {}) => {
  const baseURL = getBaseURL()
  const url = `${baseURL}${endpoint}`
  
  try {
    const response = await $fetch(url, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    return response
  } catch (error) {
    console.error(`API请求失败: ${endpoint}`, error)
    throw error
  }
}

// 文章相关API接口 - 根据实际后端接口调整
export const postApi = {
  // 获取文章列表 - 使用实际的getAllArticle接口
  async getPosts(params = {}) {
    const page = params.page || 1
    const limit = params.size || 12
    const status = params.status || 0  // 添加状态参数，默认为0
    
    return await apiRequest(`/WebArticle/getAllArticle/${page}/${limit}/${status}`)
  },

  // 获取文章详情 - 使用实际的getArticleById接口
  async getPost(id) {
    return await apiRequest(`/WebArticle/getArticleById/${id}`)
  },

  // 获取热门文章 - 暂时使用获取文章列表，后续可扩展
  async getHotPosts(limit = 5) {
    const status = 0  // 添加状态参数，默认为0
    return await apiRequest(`/WebArticle/getAllArticle/1/${limit}/${status}`)
  },

  // 获取推荐文章 - 暂时使用获取文章列表，后续可扩展
  async getFeaturedPosts(limit = 6) {
    const status = 0  // 添加状态参数，默认为0
    return await apiRequest(`/WebArticle/getAllArticle/1/${limit}/${status}`)
  },

  // 获取文章总数
  async getArticleCount() {
    return await apiRequest('/WebArticle/getAllArticleNumber')
  },

  // 搜索文章 - 使用真实的findarticles接口
  async searchPosts(keyword, params = {}) {
    if (!keyword || !keyword.trim()) {
      throw new Error('搜索关键词不能为空')
    }
    
    // 使用真实的搜索接口
    return await apiRequest(`/WebArticle/findarticles/${encodeURIComponent(keyword.trim())}`)
  },

  // 创建文章
  async createArticle(data) {
    return await apiRequest('/WebArticle/create', {
      method: 'POST',
      body: data
    })
  },

  // 更新文章
  async updateArticle(id, data) {
    return await apiRequest(`/WebArticle/ReviseArticleById/${id}`, {
      method: 'POST',
      body: { id, ...data }
    })
  },

  // 删除文章
  async deleteArticle(id) {
    return await apiRequest(`/WebArticle/DelectArticleById/${id}`)
  }
}

// 分类相关API接口 - 根据实际后端接口调整
export const categoryApi = {
  // 获取所有分类 - 使用实际的allArticleClass接口
  async getCategories(params = {}) {
    const page = params.page || 1
    const limit = params.limit || 50  // 分类通常数量不多，可以设置大一些
    
    return await apiRequest(`/WebarticleClass/allArticleClassByPage/${page}/${limit}`, {
      method: 'POST'
    })
  },

  // 获取所有分类名称
  async getAllClassName() {
    return await apiRequest('/WebarticleClass/getAllClassName')
  },

  // 获取分类详情 - 根据ID获取分类名称
  async getCategory(id) {
    return await apiRequest(`/WebarticleClass/getClassNameById/${id}`)
  },

  // 获取分类下的文章 - 目前后端可能没有此接口，暂时使用文章列表
  async getCategoryPosts(categoryId, params = {}) {
    const page = params.page || 1
    const limit = params.size || 12
    const status = params.status || 0  // 添加状态参数，默认为0
    
    // 先获取所有文章，然后根据分类ID过滤
    return await apiRequest(`/WebArticle/getAllArticle/${page}/${limit}/${status}`)
  },

  // 创建分类
  async createCategory(data) {
    return await apiRequest('/WebArticleClass/newArticleClass', {
      method: 'POST',
      body: data
    })
  },

  // 删除分类
  async deleteCategory(id) {
    return await apiRequest(`/WebArticleClass/DeleteArticleClass/${id}`)
  }
}

// 标签相关API接口 - 使用真实的标签接口
export const tagApi = {
  // 获取所有标签 - 使用真实的getAllTag接口
  async getTags() {
    return await apiRequest('/WebTag/getAllTag')
  },

  // 获取标签详情
  async getTag(id) {
    return await apiRequest(`/WebTag/getTagByList/${id}`)
  },

  // 获取标签下的文章 - 目前后端可能没有此接口，暂时使用文章列表过滤
  async getTagPosts(tagId, params = {}) {
    const page = params.page || 1
    const limit = params.size || 12
    const status = params.status || 0
    
    // 先获取所有文章，然后根据标签ID过滤（需要前端处理）
    return await apiRequest(`/WebArticle/getAllArticle/${page}/${limit}/${status}`)
  },

  // 获取标签云（按文章数排序）
  async getTagCloud() {
    return await apiRequest('/WebTag/getAllTag')
  }
}

// 站点配置API接口 - 目前后端可能没有这些接口
export const siteApi = {
  // 获取站点配置 - 目前使用默认值
  async getSiteConfig() {
    return {
      title: 'Ideaflow Blog',
      description: '基于Nuxt 3的现代博客系统',
      logo: '/assets/img/default-avatar.png'
    }
  },

  // 获取菜单配置
  async getMenuConfig() {
    return {
      menuItems: [
        { name: '首页', path: '/', icon: 'home' },
        { name: '文章', path: '/posts', icon: 'article' },
        { name: '分类', path: '/categories', icon: 'category' },
        { name: '关于', path: '/about', icon: 'about' }
      ]
    }
  },

  // 获取主题配置
  async getThemeConfig() {
    return {
      primaryColor: '#3b82f6',
      darkMode: true,
      layout: 'default'
    }
  }
}