import request from '@/utils/request'

export function getAllResourceComments() {
  return request({
    url: 'ResourceComment/getAllResourceComments',
    method: 'get',
  })
}