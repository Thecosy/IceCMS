import request from '@/utils/request'

export function checkToken(data) {
  return request({
    url: '/User/checkToken',
    method: 'get',
    headers: {
      token: data
    }
  })
}
