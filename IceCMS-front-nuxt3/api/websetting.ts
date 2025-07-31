import { useDollarGet, useFetchPost } from "../service/useDollarFetchRequest";
import type { Setting } from "../types/setting";

/**
 * @description 获取轮播图数据
 * @return Promise<any>
 */
export const getCarousel = (params: any) => {
  return useDollarGet('/WebSitting/getCarousel');
};

/**
 * @description 获取设置
 * @return Promise<Setting[]>
 */
export const getSetting = (params: any) => {
  return useDollarGet('/WebSitting/getSetting');
};

/**
 * @description 获取四大金刚数据
 * @return Promise<any>
 */
export const getFourKingKong = (params: any) => {
  return useDollarGet('/WebSitting/getFourKingKong');
};
