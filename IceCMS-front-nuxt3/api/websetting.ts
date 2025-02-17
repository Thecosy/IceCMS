import httpRequest from "../service/index";
import type { Setting } from "../types/setting";

/**
 * @description 获取轮播图数据
 * @return Promise<any>
 */
export const getCarousel = (params: any) => {
  return httpRequest.get<any>('/WebSitting/getCarousel', { params });
};

/**
 * @description 获取设置
 * @return Promise<Setting[]>
 */
export const getSetting = (params: any) => {
  return httpRequest.get<Setting[]>('/WebSitting/getSetting', { params });
};

/**
 * @description 获取四大金刚数据
 * @return Promise<any>
 */
export const getFourKingKong = (params: any) => {
  return httpRequest.get<any>('/WebSitting/getFourKingKong', { params });
};
