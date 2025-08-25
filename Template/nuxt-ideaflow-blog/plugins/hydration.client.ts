// 客户端hydration完成后显示内容
if (process.client) {
  const nuxtEl = document.getElementById('__nuxt')
  if (nuxtEl) {
    // 等待DOM准备就绪
    const showContent = () => {
      nuxtEl.classList.add('hydrated')
    }
    
    // 如果DOM已经准备就绪，立即显示
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showContent)
    } else {
      showContent()
    }
    
    // 备用方案：最多延迟1秒后显示内容
    setTimeout(showContent, 1000)
  }
}