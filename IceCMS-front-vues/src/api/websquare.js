import request from '@/utils/request'

export function createSquare(data,SortName) {
  return request({
    url: '/Websquare/create/' + SortName,
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}

export function getAllSquare(otherName,page,limit) {
  return request({
    url: 'Websquare/getAllSquare/' + otherName + '/' + page + '/' + limit,
    method: 'get'
  })
}

export function likeClickComments(id) {
  return request({
    url: 'Websquare/likeClickComment/' + id,
    method: 'get',
  })
}