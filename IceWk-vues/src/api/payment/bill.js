import request from '@/utils/request'

export default{

  downloadBill(billDate, type) {
    return request({
      url: '/api/wx-pay/downloadbill/' + billDate + '/' + type,
      method: 'get'
    })
  }
}
