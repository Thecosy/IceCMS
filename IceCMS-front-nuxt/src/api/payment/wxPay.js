// axios 发送ajax请求
import request from '@/utils/request'

export default {

  //Native下单
  nativePay(productId) {
    return request({
      url: '/Pay-api/wx-pay/test-native/' + productId,
      method: 'post'
    })
  },

  //Native下单(临时)
  nativePayTemp(resourceId) {
    return request({
      url: '/Pay-api/wx-pay/temp-native/' + resourceId,
      method: 'post'
    })
  },
  //Native下单(登录)
  nativePayLogin(resourceId, userid) {
    return request({
      url: '/Pay-api/wx-pay/login-native/' + resourceId + '/' + userid,
      method: 'post'
    })
  },

  //Native下单(VipIntegral)
  nativePayVipIntegralLogin(price, userid) {
    return request({
      url: '/Pay-api/wx-pay/vipIntegral-native/' + price + '/' + userid,
      method: 'post'
    })
  },

  //Native下单(Vip)
  nativePayVipLogin(price, userid , payid) {
    return request({
      url: '/Pay-api/wx-pay/vip-native/' + price + '/' + userid + '/' + payid,
      method: 'post'
    })
  },

  cancel(orderNo) {
    return request({
      url: '/Pay-api/wx-pay/cancel/' + orderNo,
      method: 'post'
    })
  },

  refunds(orderNo, reason) {
    return request({
      url: '/Pay-api/wx-pay/refunds/' + orderNo + '/' + reason,
      method: 'post'
    })
  }
}

