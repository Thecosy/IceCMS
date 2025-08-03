import { h as httpRequest } from './index-uy8e5Xzu.mjs';

const wxPayApi = {
  // Native下单
  nativePay(productId) {
    return httpRequest.post("/Pay-api/wx-pay/test-native/" + productId);
  },
  // Native下单(临时)
  nativePayTemp(resourceId) {
    return httpRequest.post("/Pay-api/wx-pay/temp-native/" + resourceId);
  },
  // Native下单(登录)
  nativePayLogin(resourceId, userid) {
    return httpRequest.post("/Pay-api/wx-pay/login-native/" + resourceId + "/" + userid);
  },
  // Native下单(VipIntegral)
  nativePayVipIntegralLogin(price, userid) {
    return httpRequest.post("/Pay-api/wx-pay/vipIntegral-native/" + price + "/" + userid);
  },
  // Native下单(Vip)
  nativePayVipLogin(price, userid, payid) {
    return httpRequest.post("/Pay-api/wx-pay/vip-native/" + price + "/" + userid + "/" + payid);
  },
  // 取消订单
  cancel(orderNo) {
    return httpRequest.post("/Pay-api/wx-pay/cancel/" + orderNo);
  },
  // 退款
  refunds(orderNo, reason) {
    return httpRequest.post("/Pay-api/wx-pay/refunds/" + orderNo + "/" + reason);
  }
};
const aliPayApi = {
  // ftof下单(测试) - Test ftof order
  ftofPay(productId) {
    return httpRequest.post(`/Pay-api/ali-pay/test-ftof/${productId}`);
  },
  // ftof下单(临时) - Temporary ftof order
  ftofPayTemp(resourceId) {
    return httpRequest.post(`/Pay-api/ali-pay/temp-ftof/${resourceId}`);
  },
  // ftof下单(登录) - ftof order with login
  ftofPayLogin(resourceId, userid) {
    return httpRequest.post(`/Pay-api/ali-pay/login-ftof/${resourceId}/${userid}`);
  },
  // ftof下单(VipIntegral) - ftof order for Vip Integral login
  ftofPayVipIntegralLogin(price, userid) {
    return httpRequest.post(`/Pay-api/ali-pay/vipIntegral-ftof/${price}/${userid}`);
  },
  // ftof下单(Vip) - ftof order for Vip login
  ftofPayForVipLogin(price, userid, payid) {
    return httpRequest.post(`/Pay-api/ali-pay/vip-ftof/${price}/${userid}/${payid}`);
  },
  // 取消订单 - Cancel order
  cancel(orderNo) {
    return httpRequest.post(`/Pay-api/ali-pay/cancel/${orderNo}`);
  },
  // 退款 - Refund order
  refunds(orderNo, reason) {
    return httpRequest.post(`/Pay-api/ali-pay/refunds/${orderNo}/${reason}`);
  }
};

export { aliPayApi as a, wxPayApi as w };
//# sourceMappingURL=aliPay-DnvXTR5T.mjs.map
