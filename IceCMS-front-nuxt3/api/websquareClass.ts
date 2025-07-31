import type internal from "stream";
import { useDollarGet, useFetchPost } from  "../service/useDollarFetchRequest";

/**
 * @description 获取广场分类列表
 * @return Promise<any>
 */
export const getSquareClasslist = () => {
  return useDollarGet('/WebaSquareClass/getSquareClasslist');
};

/**
 * @description 根据其他名称获取文章分类
 * @param otherName 其他名称
 * @return Promise<any>
 */
export const getArticleClassByotherName = (otherName: internal) => useDollarGet(`/WebaSquareClass/getArticleClassByotherName/${otherName}`);

