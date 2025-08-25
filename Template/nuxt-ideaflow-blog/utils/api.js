// API 基础配置
const getApiConfig = () => {
  // 优先使用环境变量，如果在Nuxt上下文中则使用runtimeConfig
  let baseURL = 'http://localhost:3003/api'
  
  try {
    // 尝试获取运行时配置（仅在Nuxt上下文中可用）
    if (process.client || process.server) {
      const config = useRuntimeConfig()
      baseURL = config.public.apiBase || baseURL
    }
  } catch (error) {
    // 不在Nuxt上下文中，使用默认值或环境变量
    baseURL = process.env.API_BASE_URL || baseURL
  }
  
  return {
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    }
  }
}

// API 错误处理
const handleError = (error) => {
  console.error('API Error:', error)
  const message = error?.data?.message || error?.message || '网络请求失败'
  throw new Error(message)
}

// 创建API实例
export const createApiClient = () => {
  const apiConfig = getApiConfig()
  
  return $fetch.create({
    baseURL: apiConfig.baseURL,
    timeout: apiConfig.timeout,
    headers: apiConfig.headers,
    onResponseError: ({ error, response }) => {
      console.error('API Response Error:', {
        status: response?.status,
        statusText: response?.statusText,
        data: response?._data
      })
      handleError(error)
    }
  })
}

// 导出单例实例
export const apiClient = createApiClient()