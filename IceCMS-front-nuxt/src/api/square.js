import request from '@/utils/request'

export function getAllSquare(query) {
  return request({
    url: 'square/getAllSquare/' + 'circle' + '/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function DelectSquareById(id) {
  return request({
    url: 'square/DelectSquareById/' + id,
    method: 'get'
  })
}

export function ChangeSquareById(id,conteent) {
  return request({
    url: 'square/ChangeSquareById/' + id + '/' + conteent,
    method: 'get'
  })
}

export function GetAllSquareUser() {
  return request({
    url: 'square/GetAllSquareUser',
    method: 'get'
  })
}
