import request from '@/utils/request'

export function getAllSquare(query) {
  return request({
    url: 'squareComment/getAllSquare/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function DelectSquareById(id) {
  return request({
    url: 'squareComment/DelectSquareById/' + id,
    method: 'get'
  })
}

export function ChangeSquareById(id,conteent) {
  return request({
    url: 'squareComment/ChangeSquareById/' + id + '/' + conteent,
    method: 'get'
  })
}


