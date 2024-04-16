import { get, post } from '@/plugins/axios'
import baseUrl from '@/plugins/baseUrl'

// 接口前不加baseUrl的为浏览器渲染

// 查询所有数据列表
export async function GetArticleBtmatte(params, data) {
  let url = baseUrl + '/WebArticle/GetArticleBtmatter'
  const options = {}
  return get(url, data, options)
}

export async function getArticleById(params, data) {
  if (!params.page) {
    params.page = 1
  }
  let url = baseUrl + '/WebArticle/getArticleById/' + params.page
  const options = {}
  return get(url, data, options)
}

export async function getNewArticle(num, data) {
  let url = baseUrl + '/WebArticle/getNewArticle/' + num + '/' + data
  const options = {}
  return get(url, data, options)
}

// 通过分类查列表
export async function getListByCateApi(params, data) {
  if (!params.page) {
    params.page = 1
  }
  let url = baseUrl + '/pages/getList/cate/' + params.cate + '/page/' + params.page || 1
  const options = {}
  return get(url, data, options)
}
// 大事记，浏览器端渲染
export async function getListByCateApi4Brower(params, data) {
  if (!params.page) {
    params.page = 1
  }
  let url = '/bootService/pages/getList/cate/' + params.cate + '/page/' + params.page || 1
  const options = {}
  return get(url, data, options)
}
// 通过关键字查询列表
export async function getListByTagsApi(params, data) {
  if (!params.page) {
    params.page = 1
  }
  let url = baseUrl + '/pages/getList/tags/' + encodeURI(params.tag) + '/page/' + params.page || 1
  const options = {}
  return get(url, data, options)
}
// 查看推荐列表,浏览器渲染
export async function getRecomListApi4Brower(data) {
  const url = '/bootService/pages/getRecomList/' + data.type
  const options = {}
  return post(url, data, options)
}
// 查看详情
export async function getDetailApi(id, data) {
  const url = baseUrl + '/pages/getDetail/' + id
  const options = {}
  return get(url, data, options)
}
//  查看分类列表，用来查询分类名称
export async function getCateApi(id, data) {
  const url = baseUrl + '/pages/getCate'
  const options = {}
  return get(url, data, options)
}
//  查看分类列表,浏览器渲染
export async function getCateApi4Brower(id, data) {
  const url = '/bootService/pages/getCate'
  const options = {}
  return get(url, data, options)
}
// 获取所有标签，浏览器渲染
export async function getTagsApi4Brower(id, data) {
  const url = '/bootService/pages/getTags'
  const options = {}
  return get(url, data, options)
}
// 添加评论，浏览器渲染
export async function insertCommentApi(data) {
  const url = '/bootService/admin/getInsertComment'
  const options = {}
  return post(url, data, options)
}
// 获取评论，浏览器渲染
export async function getCommentApi(data) {
  const url = '/bootService/pages/getComment'
  const options = {}
  return get(url, data, options)
}
// 获取站点信息，主要用来查询轮播图等
export async function getSiteInfoApi(data) {
  const url = '/bootService/pages/getBasicSiteInfo'
  const options = {}
  return post(url, data, options)
}

// 获取专题数据
export async function getTopicListApi(data) {
  const url = '/bootService/admin/getTopicList'
  const options = {}
  return get(url, data, options)
}
// 单篇文章推荐列表
export async function getRecommendBySameTagsApi(data) {
  const url = "/bootService/pages/getRecommendBySameTags"
  const options = {}
  return get(url, data, options)
}