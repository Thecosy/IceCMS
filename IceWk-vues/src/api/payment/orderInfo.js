import request from '@/utils/request'

export default{
 
  //查询订单列表
  
  list() {
    return request({
      url: '/Pay-api/order-info/list',
      method: 'get'
    })
  },

  PaylistById(userid) {
    return request({
      url: '/Pay-api/order-info/PaylistById/' + userid,
      method: 'get'
    })
  },

  queryOrderStatus(orderNo) {
    return request({
      url: '/Pay-api/order-info/query-order-status/' + orderNo,
      method: 'get'
    })
  },

  queryOrderStatusBytrue(userid,resourceid) {
    return request({
      url: '/Pay-api/order-info/query-order-status-Bytrue/' + userid + '/' + resourceid,
      method: 'get'
    })
  }
}
