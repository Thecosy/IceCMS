import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/User/Create',
    method: 'get',
    params: data
  })
}