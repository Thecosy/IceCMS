import request from '@/utils/request'

export function getAllArticle(query,click) {
  return request({
    url: 'WebArticle/getAllArticle/' + query.page + '/' + query.limit + '/' + click,
    method: 'get'
  })
}

export function getArticleById(id) {
  return request({
    url: 'WebArticle/getArticleById/' + id,
    method: 'get'
  })
}

export function getAllArticlebyAuthor(author) {
  return request({
    url: 'WebArticle/getAllArticlebyAuthor/' + author,
    method: 'get'
  })
}

export function getNewArticle(num,click) {
  return request({
    url: 'WebArticle/getNewArticle/' + num + '/' + click,
    method: 'get'
  })
}

export function getAllArticleNumber() {
  return request({
    url: 'WebArticle/getAllArticleNumber/',
    method: 'get'
  })
}

export function Findarticles(title) {
  return request({
    url: 'WebArticle/findarticles/'+ title,
    method: 'get'
  })
}

export function FindarticlesByNum(title,num) {
  return request({
    url: 'WebArticle/findarticlesbynum/'+ title +"/" + num,
    method: 'get'
  })
}

export function FindAllArticle(query) {
  return request({
    url: 'WebArticle/FindAllArticle/'+query.content + '/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function FindProfileByName(name) {
  return request({
    url: '/WebArticle/FindProfileByName/'+name,
    method: 'get'
  })
}

export function viewarticle(id) {
  return request({
    url: '/WebArticle/articles/'+ id +'/view',
    method: 'get',
  })
}

export function lovearticle(id) {
  return request({
    url: '/WebArticle/articles/'+ id +'/love',
    method: 'get',
  })
}

export function GetArticleBtmatte() {
  return request({
    url: '/WebArticle/GetArticleBtmatter',
    method: 'get',
  })
}

export function getPrenewsArticle(id) {
  return request({
    url: '/WebArticle/getPrenewsArticle/' + id,
    method: 'get',
  })
}

export function getLastnewsArticle(id) {
  return request({
    url: '/WebArticle/getLastnewsArticle/' + id,
    method: 'get',
  })
}
