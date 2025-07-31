/**
 * 弹出系统内置的toast
 */
function toast(title, mask = false, cb = null, icon = 'none', duration = 1500) {
  uni.showToast({
    title: title,
    icon: icon,
    mask: mask,
    duration: duration,
    success: () => {
      setTimeout(() => {
        cb && cb()
      }, duration)
    }
  })
}

/**
 * 弹出内置的加载框
 */
function loading(title) {
  uni.showLoading({
    title: title,
    mask: true
  })
}

/**
 * 弹出系统内置的modal
 */
function modal(title,
  content,
  confirmCb,
  showCancel = false,
  cancelCb = null,
  confirmText = "确定",
  cancelText = "取消") {
  uni.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
    cancelText: cancelText,
    confirmText: confirmText,
    success: (res) => {
      if (res.cancel) {
        cancelCb && cancelCb()
      } else if (res.confirm) {
        confirmCb && confirmCb()
      }
    }
  })
}

/**
 * 关闭系统内置toast
 */
function closeToast() {
  uni.hideToast()
}

/**
 * 关闭系统内置的加载框
 */
function closeLoading() {
  uni.hideLoading()
}

export default {
  toast,
  loading,
  modal,
  closeToast,
  closeLoading
}
