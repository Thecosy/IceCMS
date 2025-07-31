module.exports = {
  onLoad() {
    // 设置默认的转发参数
    this.$t.mpShare = {
      // 分享的标题，默认为小程序名称
      title: '',
      // 分享的路径，默认为当前页面
      path: '',
      // 分享时显示的图片，默认为当前页面截图
      imageUrl: '',
      // 当前页面是否可以分享
      share: true
    }
    if (!this.$t.mpShare.share) {
      uni.hideShareMenu()
    }
  },
  onShareAppMessage() {
    return this.$t.mpShare
  },
  // #ifdef MP-WEIXIN
  onShareTimeline() {
    return {
      title: this.$t.mpShare.title,
      query: this.$t.mpShare.path.substring(this.$t.mpShare.path.indexOf('?') + 1, this.$t.mpShare.path.length),
      imageUrl: this.$t.mpShare.imageUrl
    }
  }
  // #endif
}