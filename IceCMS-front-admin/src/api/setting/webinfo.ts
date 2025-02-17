import { http } from "@/utils/http";

// 获取设置信息
export const getSettingInfo = () => {
  return http.request<ResponseData<[]>>("post", "/Sitting/getSetting");
};

// 修改设置信息
export const setSettingInfo = (data: object) => {
  return http.request<ResponseData<[]>>("post", "/Sitting/setSetting", { data });
};

// 获取轮播图
export const getAllDispositionCarousel = (data: object) => {
  return http.request<ResponseData<[]>>("get", "/Sitting/getAllDispositionCarousel", { data });
};

// 新增轮播图
export const addDispositionCarousel = (data: object) => {
  return http.request<ResponseData<[]>>("post", "/Sitting/addDispositionCarousel", { data });
};

// 删除轮播图
export const deleteAllDispositionCarousel = (id) => {
  return http.request<ResponseData<[]>>("get", `/Sitting/deleteAllDispositionCarousel/${id}`);
};

// 修改轮播图
export const setAllDispositionCarousel = (id, data: object) => {
  return http.request<ResponseData<[]>>("post", `/Sitting/setAllDispositionCarousel/${id}`, { data });
};

// 获取特色区域
export const getAllFeature = (data: object) => {
  return http.request<ResponseData<[]>>("get", "/Sitting/getAllFeature", { data });
};

// 修改特色区域
export const setAllFeature = (data: object) => {
  return http.request<ResponseData<[]>>("post", "/Sitting/setAllFeature", { data });
};