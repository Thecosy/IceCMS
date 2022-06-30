import request from '@/utils/request'

export function createSquare(data) {
  return request({
    url: '/Websquare/create',
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}


// export function getAllArticle(query) {
//   return request({
//     url: 'WebArticle/getAllArticle/' + query.page + '/' + query.limit,
//     method: 'get'
//   })
// }
export function getAllSquare() {
  return request({
    url: 'Websquare/getAllSquare',
    method: 'get'
  })
}