import { http } from "@/utils/http";

// 获取最近订单
export const listInfo = () => {
  return http.request<ResponseData<[]>>("get", `/Pay-api/order-info/info`);
};