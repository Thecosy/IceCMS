import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Websuser/login',
    method: 'post',
    params: data
  })
}
export function WeChatLogin(data) {
  return request({
    url: '/Websuser/WeChatLogin',
    method: 'post',
    params: data
  })
}
export function WeChatLoginCheck(accountId) {
  return request({
    url: 'Websuser/WeChatLoginCheck/' + accountId,
    method: 'post'
  })
}