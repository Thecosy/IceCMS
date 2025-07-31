import { useFetch, useRuntimeConfig } from '#app';
import type { UseFetchOptions } from 'nuxt/app';
 
interface RequestOptions extends UseFetchOptions<any> {
  customBaseURL?: string;
}
 
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type HandleRequestOptions = { request: Request; options: RequestOptions };
type HandleResponseOptions = { response: any };
 
// 请求拦截器
function handleRequest({ options }: HandleRequestOptions) {
  // 确保 headers 是一个普通对象，过滤掉可能的 Symbol 属性
  const cleanHeaders = options.headers ? 
    Object.fromEntries(
      Object.entries(options.headers).filter(([key, value]) => 
        typeof key === 'string' && (typeof value === 'string' || typeof value === 'number')
      ).map(([key, value]) => [key, String(value)])
    ) : {};
    
  options.headers = {
    ...cleanHeaders,
    'Content-Type': 'application/json',
  };
}
 
// 响应拦截器
function handleResponse({ response }: HandleResponseOptions) {
  if (response._data.error) {
    throw new Error(response._data.error.message || '响应错误');
  }
  return response._data;
}
 
/**
 * 创建请求方法
 * @param method
 */
function createUseFetchRequest(method: HttpMethod) {
  return async function (
    url: string,
    data?: any,
    options: RequestOptions = {}
  ) {
    const {
      public: {
        apiBaseUrl
      }
    } = useRuntimeConfig();
 
    const baseURL = apiBaseUrl;
    const requestUrl = new URL(
      url,
      options.customBaseURL || baseURL
    ).toString();
 
    return await $fetch(requestUrl, {
      ...options,
      method,
      body: data,
      onRequest: handleRequest,
      onResponse: handleResponse
    });
  };
}
 
// 提供 useFetch & HTTP 方法 - 统一管理请求 - 再到组件中使用
export const useFetchGet = createUseFetchRequest('GET');
export const useFetchPost = createUseFetchRequest('POST');
export const useFetchPut = createUseFetchRequest('PUT');
export const useFetchDelete = createUseFetchRequest('DELETE');

export const useDollarGet = createUseFetchRequest('GET');