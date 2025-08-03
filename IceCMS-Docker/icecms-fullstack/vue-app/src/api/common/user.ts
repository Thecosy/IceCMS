import { http } from "@/utils/http";

// 获取所有分类列表
export const getUserCount = () => {
  return http.request<ResponseData<[]>>("get", "/User/getUserCount");
};