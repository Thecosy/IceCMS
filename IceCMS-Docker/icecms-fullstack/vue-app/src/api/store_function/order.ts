import { http } from "@/utils/http";

// 获取所有商品订单（分页）
export const getallorder = (page, limit) => {
  return http.request<ResponseData<[]>>("get", `/Pay-api/order-info/listByPage/${page}/${limit}`);
};

// 获取最近订单
export const listByPage = (limit) => {
  return http.request<ResponseData<[]>>("get", `/Pay-api/order-info/listByPage/${limit}`);
};