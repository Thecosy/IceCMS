import request from '@/utils/request'

export function tofollow(followerId, followingId) {
  return request({
    url: 'follow/tofollow/' + followerId + '/' + followingId,
    method: 'get',
  })
}

export function unfollow(followerId, followingId) {
    return request({
      url: 'follow/unfollow/' + followerId + '/' + followingId,
      method: 'get',
    })
  }
  export function followers(followerId) {
    return request({
      url: 'follow/followers/' + followerId,
      method: 'get',
    })
  }
  
