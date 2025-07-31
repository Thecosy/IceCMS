import { http } from "@/utils/http";

// 获取图表数据
export const getChartData = () => {
  return http.request<ResponseData<''>>("get", "/Panel/chartData");
};

// 获取文章统计数据
export const getArticleStats = () => {
  return http.request<ResponseData<[]>>("get", "/article/getArticleStats");
};

// 获取资源统计数据
export const getResourceStats = () => {
  return http.request<ResponseData<[]>>("get", "/resource/getResourceStats");
};

// 获取用户活跃度数据
export const getUserActivityStats = () => {
  return http.request<ResponseData<[]>>("get", "/User/getUserActivityStats");
};

// 获取最近订单数据
export const getRecentOrders = () => {
  return http.request<ResponseData<[]>>("get", "/order/getRecentOrders");
};

// 获取系统概览数据
export const getSystemOverview = () => {
  return http.request<ResponseData<[]>>("get", "/Panel/getSystemOverview");
};
