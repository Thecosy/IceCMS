import httpRequest from "../../service/index";

// Define types for request parameters
interface PaymentParams {
  productId?: string;
  resourceId?: string;
  userid?: string;
  price?: string;
  payid?: string;
  orderNo?: string;
  reason?: string;
}

export default {
  // ftof下单(测试) - Test ftof order
  ftofPay(productId: string): Promise<any> {
    return httpRequest.post<any>(`/Pay-api/ali-pay/test-ftof/${productId}`);
  },

  // ftof下单(临时) - Temporary ftof order
  ftofPayTemp(resourceId: string): Promise<any> {
    return httpRequest.post<any>(`/Pay-api/ali-pay/temp-ftof/${resourceId}`);
  },

  // ftof下单(登录) - ftof order with login
  ftofPayLogin(resourceId: string, userid: string): Promise<any> {
    return httpRequest.post<any>(`/Pay-api/ali-pay/login-ftof/${resourceId}/${userid}`);
  },

  // ftof下单(VipIntegral) - ftof order for Vip Integral login
  ftofPayVipIntegralLogin(price: string, userid: string): Promise<any> {
    return httpRequest.post<any>(`/Pay-api/ali-pay/vipIntegral-ftof/${price}/${userid}`);
  },

  // ftof下单(Vip) - ftof order for Vip login
  ftofPayForVipLogin(price: string, userid: string, payid: string): Promise<any> {
    return httpRequest.post<any>(`/Pay-api/ali-pay/vip-ftof/${price}/${userid}/${payid}`);
  },

  // 取消订单 - Cancel order
  cancel(orderNo: string): Promise<any> {
    return httpRequest.post<any>(`/Pay-api/ali-pay/cancel/${orderNo}`);
  },

  // 退款 - Refund order
  refunds(orderNo: string, reason: string): Promise<any> {
    return httpRequest.post<any>(`/Pay-api/ali-pay/refunds/${orderNo}/${reason}`);
  }
};
