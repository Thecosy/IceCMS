import request from '@/utils/request'

export function createResource(data) {
  return request({
    url: '/resource/create',
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}

export function getAllResource(query) {
  return request({
    url: 'resource/getAllResource/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function DelectResourceById(id) {
  return request({
    url: 'resource/DelectResourceById/' + id,
    method: 'get'
  })
}

export function getResourceById(id) {
  return request({
    url: 'resource/getResourceById/' + id,
    method: 'get'
  })
}

export function newResourceClass(data) {
  return request({
    url: '/ResourceClass/newResourceClass',
    method: 'post',
    data: data,
    // dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}

export function allResourceClass(query) {
  return request({
    url: 'ResourceClass/allResourceClass/' + query.page + '/' + query.limit,
    method: 'post'
  })
}

export function DeleteResourceClass(id) {
  return request({
    url: 'ResourceClass/DeleteResourceClass/' + id,
    method: 'get'
  })
}

export function getClassNameById(id) {
  return request({
    url: 'ResourceClass/getClassNameById/'+ id,
    method: 'get',
  })
}

export function getAllClassName(data) {
  return request({
    url: 'ResourceClass/getAllClassName',
    method: 'get',
    data
  })
}