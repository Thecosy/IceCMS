import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/User/login',
    method: 'post',
    params: data
  })
}

export function loginAdmin(data) {
  return request({
    url: '/User/loginAdmin',
    method: 'get',
    params: data
  })
}