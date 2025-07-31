/**
 * 演示页面mixin
 */
module.exports = {
  data() {
    return {
      
    }
  },
  onLoad() {
    // 更新顶部导航栏信息
    this.updateCustomBarInfo()
  },
  methods: {
    // 点击左上角返回按钮时触发事件
    goBack() {
      // 通过判断当前页面的页面栈信息，是否有上一页进行返回，如果没有则跳转到首页
      const pages = getCurrentPages()
      if (pages && pages.length > 0) {
        const firstPage = pages[0]
        if (pages.length == 1 && (!firstPage.route || firstPage.route != 'pages/index')) {
          uni.reLaunch({
            url: '/pages/index'
          })
        } else {
          uni.navigateBack({
            delta: 1
          })
        }
      } else {
        uni.reLaunch({
          url: '/pages/index'
        })
      }
    },
    // 更新顶部导航栏信息
    async updateCustomBarInfo() {
      // 获取vuex中的自定义顶栏的高度
      let customBarHeight = this.vuex_custom_bar_height
      let statusBarHeight = this.vuex_status_bar_height
      // 如果获取失败则重新获取
      if (!customBarHeight) {
        try {
          const navBarInfo = await this.$t.updateCustomBar()
          customBarHeight = navBarInfo.customBarHeight
          statusBarHeight = navBarInfo.statusBarHeight
        } catch(e) {
          setTimeout(() => {
            this.updateCustomBarInfo()
          }, 10)
          return
        }
      }
      
      // 更新vuex中的导航栏信息
      this.$t.vuex('vuex_status_bar_height', statusBarHeight)
      this.$t.vuex('vuex_custom_bar_height', customBarHeight)
    }
  }
}