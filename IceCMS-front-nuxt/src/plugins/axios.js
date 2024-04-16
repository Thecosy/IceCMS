import axios from 'axios'

const myaxios = axios.create({})
myaxios.defaults.timeout = 15000
myaxios.defaults.headers.post['Content-Type'] = 'application/json'


// 在请求或响应被 then 或 catch 处理前拦截它们。
// 添加请求拦截器
myaxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
// myaxios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })

/*
 *  axios 别名请求
 *  get
 *  post
 * */

// get请求
export function get(url, params) {

  return new Promise((resolve, reject) => {
    myaxios({
      method: 'get',
      url: url, // 在使用别名方法时， url、method、data 这些属性都不必在配置中指定。
      params: params // params是要与请求一起发送的URL参数
    }).then(res => {
      handleData(res, resolve, reject)
    }) // 捕获异常
  })
}

// post请求
export function post(url, param) {
  return new Promise((resolve, reject) => {
    myaxios({
      method: 'post',
      url: url,
      data: param // data是要作为请求主体发送的数据,仅适用于请求方法“PUT”，“POST”和“PATCH”
    }).then(res => {
      handleData(res, resolve, reject)
    }) // 捕获异常
  })
}

function handleData(res, resolve, reject) {
  if (res.data.code === 0) {
    resolve(res.data)
  } else {
    // reject(res)
    // 此处不抛出错误，在页面通过不同code显示错误页面
    resolve(res.data)
  }
}
