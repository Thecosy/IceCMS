import request from '@/utils/request'

export function getAllTag() {
  return request({
    url: 'Tag/getAllTag',
    method: 'get'
  })
}