/**
 * 动态参数演示mixin
 */
module.exports = {
  data() {
    return {
      // 效果显示框top的值
      contentContainerTop: '0px',
      contentContainerIsTop: false,
      
      // 参数显示框top的值
      sectionContainerTop: '0px'
    }
  },
  onReady() {
    this.updateSectionContainerTop()
  },
  methods: {
    // 处理演示效果框的位置
    async _handleContentConatinerPosition() {
      // 获取效果演示框的节点信息
      const contentContainer = await this._tGetRect('#content_container')
      // 获取参数框的节点信息
      this._tGetRect('#section_container').then((res) => {
        // 判断参数框是否在移动，如果是则更新效果框的位置
        // 如果效果框的顶部已经触控到顶部导航栏就停止跟随
        if (res.top - contentContainer.bottom != 15) {
          const newTop = res.top - (contentContainer.height + uni.upx2px(20))
          const minTop = this.vuex_custom_bar_height + 1
          if (newTop < minTop) {
            this.contentContainerTop = minTop + 'px'
            this.contentContainerIsTop = true
          } else {
            this.contentContainerTop = newTop + 'px'
            this.contentContainerIsTop = false
          }
        }
      })
    },
    // 更新状态切换栏位置信息
    updateSectionContainerTop() {
      this._tGetRect('#content_container').then((res) => {
        this.contentContainerTop = (this.vuex_custom_bar_height + 148) + 'px'
        this.sectionContainerTop = (res.height + 20) + 'px'
      })
    }
  },
  // 监听页面滚动
  onPageScroll() {
    this._handleContentConatinerPosition()
  }
}
