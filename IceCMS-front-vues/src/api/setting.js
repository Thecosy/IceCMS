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

export function getCosSetting() {
  return request({
    url: 'Sitting/getCosSetting',
    method: 'get'
  })
}

export function setSettingCos(data) {
  return request({
    url: 'Sitting/setSettingCos',
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}

export function getAllDispositionCarousel() {
  return request({
    url: 'Sitting/getAllDispositionCarousel',
    method: 'get'
  })
}
