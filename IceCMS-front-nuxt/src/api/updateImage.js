import request from '@/utils/request'

export function updateImage(form) {
  return request({
    url: '/ImageApi/updateimage',
    method: 'post',
    data: form,
    dataType: 'json',
    processData: false,
    contentType: false,
    timeout: 60000
  })
}

export function addwatermarkimageUpload(form,title,content) {
  return request({
    url: '/ImageApi/addwatermarkimageUpload/'+title+'/'+content,
    method: 'post',
    data: form,
    dataType: 'json',
    processData: false,
    contentType: false,
    timeout: 60000
  })
}


