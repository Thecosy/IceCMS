import { defineStore } from 'pinia'
import { mockThemeConfig, mockSiteConfig } from '~/mock/data'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 主题模式
    isDark: false,
    // 移动端菜单状态
    mobileMenuOpen: false,
    // 站点配置
    siteConfig: mockSiteConfig,
    // 主题配置
    themeConfig: mockThemeConfig,
    // 当前用户
    currentUser: null,
    // 搜索状态
    searchOpen: false,
  }),

  getters: {
    // 是否已登录
    isAuthenticated: (state) => !!state.currentUser,
    
    // 获取背景图片
    backgroundImages: (state) => {
      return state.isDark 
        ? state.themeConfig.common.mobileBackgroundImgs
        : state.themeConfig.common.backgroundImgs
    }
  },

  actions: {
    // 切换主题模式
    toggleDark() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark', this.isDark)
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },

    // 初始化主题
    initTheme() {
      const saved = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      this.isDark = saved ? saved === 'dark' : prefersDark
      document.documentElement.classList.toggle('dark', this.isDark)
      
      // 初始化时恢复用户状态
      this.restoreUserState()
    },

    // 切换移动端菜单
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },

    // 关闭移动端菜单
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },

    // 设置用户信息
    setCurrentUser(user) {
      this.currentUser = user
      // 同时保存到localStorage
      if (user) {
        localStorage.setItem('user_data', JSON.stringify(user))
      } else {
        localStorage.removeItem('user_data')
      }
    },

    // 恢复用户状态
    restoreUserState() {
      const token = localStorage.getItem('user_token')
      const userData = localStorage.getItem('user_data')
      
      if (token && userData) {
        try {
          this.currentUser = JSON.parse(userData)
        } catch (e) {
          // 如果数据损坏，清除本地存储
          this.logout()
        }
      }
    },

    // 退出登录
    logout() {
      this.currentUser = null
      localStorage.removeItem('user_token')
      localStorage.removeItem('user_data')
      
      // 如果在需要认证的页面，跳转到登录页
      if (window.location.pathname.startsWith('/console') && window.location.pathname !== '/console/login') {
        window.location.href = '/console/login'
      }
    },

    // 切换搜索状态
    toggleSearch() {
      this.searchOpen = !this.searchOpen
    },

    // 检查用户权限
    hasPermission(permission) {
      if (!this.currentUser) return false
      
      // 简单的权限检查逻辑
      const userPermissions = this.currentUser.permissions || ['read']
      return userPermissions.includes(permission) || userPermissions.includes('admin')
    }
  }
})