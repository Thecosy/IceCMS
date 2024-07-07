// axios 发送ajax请求
import request from '@/utils/request'

export default {
  //ftof下单(测试)
  ftofPay(productId) {
    return request({
      url: '/Pay-api/ali-pay/test-ftof/' + productId,
      method: 'post'
    })
  },
  //ftof下单(临时)
  ftofPayTemp(resourceId) {
    return request({
      url: '/Pay-api/ali-pay/temp-ftof/' + resourceId,
      method: 'post'
    })
  },

  //ftof下单(登录)
  ftofPayLogin(resourceId, userid) {
    return request({
      url: '/Pay-api/ali-pay/login-ftof/' + resourceId + '/' + userid,
      method: 'post'
    })
  },

  //ftof下单(VipIntegral)
  ftofPayVipIntegralLogin(price, userid) {
    return request({
      url: '/Pay-api/ali-pay/vipIntegral-ftof/' + price + '/' + userid,
      method: 'post'
    })
  },

  //ftof下单(Vip)
  ftofPayForVipLogin(price, userid, payid) {
    return request({
      url: '/Pay-api/ali-pay/vip-ftof/' + price + '/' + userid + '/' + payid,
      method: 'post'
    })
  },

  cancel(orderNo) {
    return request({
      url: '/Pay-api/ali-pay/cancel/' + orderNo,
      method: 'post'
    })
  },

  refunds(orderNo, reason) {
    return request({
      url: '/Pay-api/ali-pay/refunds/' + orderNo + '/' + reason,
      method: 'post'
    })
  }
}
