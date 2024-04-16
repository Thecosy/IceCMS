import request from '@/utils/request'

export function getAllTag() {
  return request({
    url: 'WebTag/getAllTag',
    method: 'get'
  })
}

export function getTagByList(keyword) {
    return request({
      url: 'WebTag/getTagByList/' + keyword,
      method: 'get',
    })
  }