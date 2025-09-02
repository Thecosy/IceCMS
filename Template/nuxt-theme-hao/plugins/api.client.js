// API配置插件
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // 设置全局API配置
  const apiConfig = {
    baseURL: config.public.apiBase || 'http://localhost:3003/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  
  // 创建API客户端
  const apiClient = $fetch.create({
    baseURL: apiConfig.baseURL,
    timeout: apiConfig.timeout,
    headers: apiConfig.headers,
    onResponseError: ({ error, response }) => {
      console.error('API Response Error:', {
        status: response?.status,
        statusText: response?.statusText,
        data: response?._data
      })
    }
  })
  
  // 提供给全局使用
  return {
    provide: {
      api: apiClient,
      apiConfig
    }
  }
})