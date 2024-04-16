import request from '@/utils/request'

export function getChatMessages(sender, receiver) {
  return request({
    url: 'WebchatMessages/getChatMessages/' + sender + '/' + receiver,
    method: 'get',
  })
}

export function sendChatMessage(sender, receiver, message) {
    return request({
      url: 'WebchatMessages/sendChatMessage/' + sender + '/' + receiver + '/' + message,
      method: 'get',
    })
  }

export function getMessageList(userid) {
  return request({
    url: 'WebchatMessages/getMessageList/' + userid,
    method: 'get',
  })
}