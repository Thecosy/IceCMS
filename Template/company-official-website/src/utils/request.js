import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/loading'
import store from '@/store'
import { baseUrl } from '@/config/index'
import { getToken, removeToken } from '@/utils/auth' // 添加 removeToken 导入
import router from '@/router' // 添加 router 导入

// 创建一个 axios 实例
const base = process.env.NODE_ENV === 'development' ? '/api' : baseUrl
console.log(base, 'base-------')
const service = axios.create({
    baseURL: base, // url = 基础 url + 请求 url
    // withCredentials: true, // 当跨域请求时发送 cookies
    timeout: 100000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        const token = getToken()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        config.headers['token'] = token
        // 在请求发送之前做一些处理
        if (config.headers.isLoading !== false) {
            // 如果配置了 isLoading: false，则不显示 loading
            showFullScreenLoading()
        }
        if (store.getters.token) {
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        // 处理请求错误
        tryHideFullScreenLoading()
        console.log(error) // 用于调试
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        tryHideFullScreenLoading()
        const res = response.data
        if (res.code !== 0) { // 修改为后端返回的成功状态码
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log(error, 'error-request')
        if (error.response && error.response.status === 302) {
            // 处理 302 状态码
            removeToken() // 清除存储中的 token
            store.dispatch('user/resetToken') // 清除 Vuex 中的 token
            // 提示登录超时
            Message({
                message: '登录超时，请重新登录',
                type: 'error',
                duration: 5 * 1000
            })
            // 跳转到登录页
            router.push('/login') // 跳转到登录页
        } else if (error.message.includes('Network Error')) {
            // 处理网络错误
            removeToken() // 清除存储中的 token
            store.dispatch('user/resetToken') // 清除 Vuex 中的 token
            // 提示网络错误
            Message({
                message: '登录超时，请重新登录',
                type: 'error',
                duration: 5 * 1000
            })
            // 跳转到登录页
            router.push('/login') // 跳转到登录页
        } else {
            Message({
                message: '内部错误，请联系管理员',
                type: 'error',
                duration: 5 * 1000
            })
        }
        tryHideFullScreenLoading()
        return Promise.reject(error)
    }
)

export default service