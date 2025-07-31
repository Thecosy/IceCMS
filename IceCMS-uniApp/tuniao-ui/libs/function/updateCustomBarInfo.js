/**
 * 更新自定义顶部导航栏的高度
 */
function updateCustomBarInfo () {
  return new Promise((resolve, reject) => {
    uni.getSystemInfo({
      success: (e) => {
        let statusBarHeight = 0
        let customBarHeight = 0
        // #ifndef MP
        statusBarHeight = e.statusBarHeight
        if (e.platform == 'android') {
          customBarHeight = e.statusBarHeight + 50
        } else {
          customBarHeight = e.statusBarHeight + 45
        };
        // #endif

        // #ifdef MP-WEIXIN
        statusBarHeight = e.statusBarHeight
        let custom = wx.getMenuButtonBoundingClientRect()
        customBarHeight = custom.bottom + ((custom.top - e.statusBarHeight) <= 4 ? (custom.top - e
          .statusBarHeight) + 4 : (custom.top - e.statusBarHeight))
        // #endif		

        // #ifdef MP-ALIPAY
        statusBarHeight = e.statusBarHeight
        customBarHeight = e.statusBarHeight + e.titleBarHeight
        // #endif
        resolve({
          statusBarHeight,
          customBarHeight
        })
      },
      fail: (err) => {
        console.log("获取设备信息失败", err);
        reject()
      }
    })

  })
}

export default updateCustomBarInfo
