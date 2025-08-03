import { http } from "@/utils/http";

// 获取所有tag列表
export const getAllTag = () => {
  return http.request<ResponseData<[]>>("get", "/Tag/getAllTag");
};