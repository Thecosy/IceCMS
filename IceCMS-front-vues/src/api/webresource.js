import request from '@/utils/request'

export function getAllResource(query) {
  return request({
    url: 'WebResource/getAllResource/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function getAllResourcebyAuthor(author) {
  return request({
    url: 'WebResource/getAllResourcebyAuthor/' + author,
    method: 'get'
  })
}

export function getResourceFilter(query,filter) {
  return request({
    url: 'WebResource/getResourceFilter/' + query.page + '/' + query.limit + '/' + query.class + '/' + filter,
    method: 'get'
  })
}

export function getAllResourceNumber() {
  return request({
    url: 'WebResource/getAllResourceNumber',
    method: 'get'
  })
}

export function getResourceById(id) {
  return request({
    url: 'WebResource/getResourceById/'+id,
    method: 'get'
  })
}

export function getNewResource(num,filter) {
  return request({
    url: 'WebResource/getNewResource/' + num + '/' + filter,
    method: 'get'
  })
}

export function FindresourceByNum(title,num) {
  return request({
    url: 'WebResource/findresourcebynum/'+ title +"/" + num,
    method: 'get'
  })
}

export function loveresource(id) {
  return request({
    url: '/WebResource/resource/'+ id +'/love',
    method: 'get',
  })
}

export function getResourceByClass(id) {
  return request({
    url: '/WebResource/getResourceByClassId/'+ id ,
    method: 'get',
  })
}

export function FindAllResource(query) {
  return request({
    url: 'WebResource/FindAllResource/'+query.content + '/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function getPrenewsResource(id) {
  return request({
    url: '/WebResource/getPrenewsResource/' + id,
    method: 'get',
  })
}

export function getLastnewsResource(id) {
  return request({
    url: '/WebResource/getLastnewsResource/' + id,
    method: 'get',
  })
}

export function viewresource(id) {
  return request({
    url: '/WebResource/resource/'+ id +'/view',
    method: 'get',
  })
}