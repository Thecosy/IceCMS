import request from '@/utils/request'

export function getallArticleComment(id) {
  return request({
    url: 'WebArticleComment/getallArticleComment/' + id,
    method: 'get',
  })
}

export function addArticleComment(data) {
  return request({
    url: 'WebArticleComment/addArticleComment',
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}

export function getArticleCommentnum(id) {
  return request({
    url: 'WebArticleComment/getArticleCommentnum/' + id,
    method: 'get',
  })
}

export function getNewArticleComment(num) {
  return request({
    url: 'WebArticleComment/getNewArticleComment/' + num,
    method: 'get',
  })
}