import request from '@/utils/request'

export function allClassName(query) {
  return request({
    url: 'squareClass/allSquareClass/' + query.page + '/' + query.limit,
    method: 'post'
  })
}

export function DelectSquareClassById(id) {
    return request({
      url: 'squareClass/DelectSquareClassById' + '/' + id,
      method: 'get'
    })
}
export function newSquareClass(data) {
    return request({
      url: 'squareClass/newSquareClass',
      method: 'post',
      data: data,
      dataType: 'json',
      crossDomain: true,
      processData: false,
      contentType: false,
    })
  }
  