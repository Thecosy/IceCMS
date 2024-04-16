import request from '@/utils/request'

export function getSquareClasslist() {
  return request({
    url: 'WebaSquareClass/getSquareClasslist',
    method: 'get'
  })
}

export function getArticleClassByotherName(otherName) {
    return request({
      url: 'WebaSquareClass/getArticleClassByotherName/' + otherName,
      method: 'get'
    })
}

