import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 主题模式
    darkMode: false,
    // 侧边栏状态
    sidebarOpen: false,
    // 搜索模态框状态
    searchModalOpen: false,
    // 移动端菜单状态
    mobileMenuOpen: false,
    // 页面加载状态
    loading: false,
    // 滚动位置
    scrollY: 0,
    // 是否显示回到顶部按钮
    showBackToTop: false
  }),
  
  getters: {
    // 是否为暗色模式
    isDark: (state) => state.darkMode,
    // 是否为移动端
    isMobile: () => {
      if (process.client) {
        return window.innerWidth < 768
      }
      return false
    }
  },
  
  actions: {
    // 切换主题模式
    toggleTheme() {
      this.darkMode = !this.darkMode
      if (process.client) {
        document.documentElement.classList.toggle('dark', this.darkMode)
        localStorage.setItem('darkMode', this.darkMode.toString())
      }
    },
    
    // 初始化主题
    initTheme() {
      if (process.client) {
        const savedTheme = localStorage.getItem('darkMode')
        if (savedTheme !== null) {
          this.darkMode = savedTheme === 'true'
        } else {
          // 检查系统主题偏好
          this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        document.documentElement.classList.toggle('dark', this.darkMode)
      }
    },
    
    // 切换侧边栏
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    
    // 切换搜索模态框
    toggleSearchModal() {
      this.searchModalOpen = !this.searchModalOpen
    },
    
    // 切换移动端菜单
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    
    // 关闭所有模态框
    closeAllModals() {
      this.searchModalOpen = false
      this.mobileMenuOpen = false
      this.sidebarOpen = false
    },
    
    // 更新滚动位置
    updateScrollY(scrollY) {
      this.scrollY = scrollY
      this.showBackToTop = scrollY > 300
    },
    
    // 回到顶部
    scrollToTop() {
      if (process.client) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    },
    
    // 设置页面加载状态
    setLoading(loading) {
      this.loading = loading
    }
  }
})