import request from '@/utils/request'

export function getUserInfobyid(id) {
  return request({
    url: 'Websuser/getUserInfobyid/' + id,
    method: 'get',
  })
}

export function ChangeUser(form) {
  return request({
    url: '/Websuser/ChangeUser',
    method: 'post',
    data: form
  })
}

export function testemail(email) {
    return request({
      url: 'Websuser/testemail/' + email,
      method: 'get',
    })
  }
  