import request from '@/utils/request'

export function getResourceClasslist() {
  return request({
    url: 'WebResourceClass/getResourceClasslist',
    method: 'get'
  })
}
export function getResourceClassNameByid(classid) {
  return request({
    url: 'WebResourceClass/getResourceClassNameByid/' + classid,
    method: 'get'
  })
}