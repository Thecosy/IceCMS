import request from '@/utils/request'

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}

export function updateArticle(id) {
  return request({
    url: '/article/ReviseArticleById/' + id,
    method: 'post',
    id
  })
}

export function getAllArticle(query) {
  return request({
    url: 'article/getAllArticle/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function getArticleById(id) {
  return request({
    url: 'article/getArticleById/' + id,
    method: 'get'
  })
}

export function DelectArticleById(id) {
  return request({
    url: 'article/DelectArticleById/' + id,
    method: 'get'
  })
}

export function newArticleClass(data) {
  return request({
    url: '/articleClass/newArticleClass',
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}

export function allArticleClass(query) {
  return request({
    url: 'articleClass/allArticleClass/' + query.page + '/' + query.limit,
    method: 'post'
  })
}

export function DeleteArticleClass(id) {
  return request({
    url: 'articleClass/DeleteArticleClass/' + id,
    method: 'get'
  })
}

export function getAllClassName(data) {
  return request({
    url: 'articleClass/getAllClassName',
    method: 'get',
    data
  })
}

export function getClassNameById(id) {
  return request({
    url: 'articleClass/getClassNameById/'+ id,
    method: 'get',
  })
}





