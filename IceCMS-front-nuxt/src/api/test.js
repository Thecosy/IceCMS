import request from '@/utils/request'

export function test(data) {
  return request({
    url: '/test',
    method: 'get',
    data
  })
}
