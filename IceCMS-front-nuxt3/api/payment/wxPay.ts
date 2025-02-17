import httpRequest from "../../service/index";

// 定义请求的返回类型
interface ApiResponse {
  // 可以根据实际的 API 响应结构添加字段，例如：
  success: boolean;
  message: string;
  data?: any;
}

export default {
  // Native下单
  nativePay(productId: string): Promise<ApiResponse> {
    return httpRequest.post<ApiResponse>('/Pay-api/wx-pay/test-native/' + productId);
  },

  // Native下单(临时)
  nativePayTemp(resourceId: string): Promise<ApiResponse> {
    return httpRequest.post<ApiResponse>('/Pay-api/wx-pay/temp-native/' + resourceId);
  },

  // Native下单(登录)
  nativePayLogin(resourceId: string, userid: string): Promise<ApiResponse> {
    return httpRequest.post<ApiResponse>('/Pay-api/wx-pay/login-native/' + resourceId + '/' + userid);
  },

  // Native下单(VipIntegral)
  nativePayVipIntegralLogin(price: number, userid: string): Promise<ApiResponse> {
    return httpRequest.post<ApiResponse>('/Pay-api/wx-pay/vipIntegral-native/' + price + '/' + userid);
  },

  // Native下单(Vip)
  nativePayVipLogin(price: number, userid: string, payid: string): Promise<ApiResponse> {
    return httpRequest.post<ApiResponse>('/Pay-api/wx-pay/vip-native/' + price + '/' + userid + '/' + payid);
  },

  // 取消订单
  cancel(orderNo: string): Promise<ApiResponse> {
    return httpRequest.post<ApiResponse>('/Pay-api/wx-pay/cancel/' + orderNo);
  },

  // 退款
  refunds(orderNo: string, reason: string): Promise<ApiResponse> {
    return httpRequest.post<ApiResponse>('/Pay-api/wx-pay/refunds/' + orderNo + '/' + reason);
  }
};
