import request from '@/utils/request'

export function getallArticleComments() {
  return request({
    url: 'ArticleComment/getallArticleComments',
    method: 'get',
  })
}