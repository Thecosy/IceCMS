import request from '@/utils/request'

export function getCarousel(params) {
  return request({
    url: 'WebSitting/getCarousel',
    method: 'get',
    params
  })
}

export function getSetting(params) {
  return request({
    url: 'WebSitting/getSetting',
    method: 'get',
    params
  })
}

