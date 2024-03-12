import { http } from "@/utils/http";

// 获取所有分类列表
export const getChartData = () => {
  return http.request<ResponseData<''>>("get", "/Panel/chartData");
};