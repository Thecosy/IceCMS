import request from '@/utils/request'

export function setSetting(data) {
  return request({
    url: '/Sitting/setSetting',
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}