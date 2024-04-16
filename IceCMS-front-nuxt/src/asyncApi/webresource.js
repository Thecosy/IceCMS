import { get, post } from '@/plugins/axios'
import baseUrl from '@/plugins/baseUrl'

// 接口前不加baseUrl的为浏览器渲染

// 查询所有数据列表
export async function getResourceById(params, data) {
  if (!params.page) {
    params.page = 1
  }
  let url = baseUrl + '/WebResource/getResourceById/' + params.page
  const options = {}
  return get(url, data, options)
}

export async function getNewResource(num, data) {
  let url = baseUrl + '/WebResource/getNewResource/' + num + '/' + data
  const options = {}
  return get(url, data, options)
}

