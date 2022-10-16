import request from '@/utils/request'

export function getPlanetIdComment(id) {
  return request({
    url: 'WebSquareComment/getPlanetIdComment/' + id,
    method: 'get',
  })
}

export function getPlanetCommentnum(id) {
    return request({
      url: 'WebSquareComment/getPlanetCommentnum/' + id,
      method: 'get',
    })
}
  
export function addPlanetComment(data) {
    return request({
      url: 'WebSquareComment/addPlanetComment',
      method: 'post',
      data: data,
      dataType: 'json',
      crossDomain: true,
      processData: false,
      contentType: false,
    })
  }

export function likeClickComment(id) {
  return request({
    url: 'WebSquareComment/likeClickComment/' + id,
    method: 'get',
  })
}