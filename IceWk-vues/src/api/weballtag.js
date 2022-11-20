import request from '@/utils/request'

export function getAllTag() {
  return request({
    url: 'WebTag/getAllTag',
    method: 'get'
  })
}