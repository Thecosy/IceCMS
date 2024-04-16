import request from '@/utils/request'

export function getallResourceComment(id) {
  return request({
    url: 'WebResourceComment/getallResourceComment/' + id,
    method: 'get',
  })
}

export function addResourceComment(data) {
  return request({
    url: 'WebResourceComment/addResourceComment',
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}

export function getResourceCommentnum(id) {
  return request({
    url: 'WebResourceComment/getResourceCommentnum/' + id,
    method: 'get',
  })
}

export function getNewResourceComment(num) {
  return request({
    url: 'WebResourceComment/getNewResourceComment/' + num,
    method: 'get',
  })
}