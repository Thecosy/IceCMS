// axios 发送ajax请求
import request from '@/utils/request'

export default{

  //查询商品列表
  list() {
    return request({
      url: '/api/product/list',
      method: 'get'
    })
  }
}
