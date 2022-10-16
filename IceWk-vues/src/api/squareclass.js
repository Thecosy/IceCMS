import request from '@/utils/request'

export function getAllClassName() {
  return request({
    url: 'squareClass/getAllClassName',
    method: 'get'
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
      url: '/squareClass/newSquareClass',
      method: 'post',
      data: data,
      dataType: 'json',
      crossDomain: true,
      processData: false,
      contentType: false,
    })
  }
  