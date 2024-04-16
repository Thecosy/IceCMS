import request from '@/utils/request'

export function getArticleClasslist() {
  return request({
    url: 'WebarticleClass/getArticleClasslist',
    method: 'get'
  })
}