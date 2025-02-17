import type internal from "stream";
import httpRequest from "../service/index";
import { useDollarGet } from  "../service/useDollarFetchRequest";

/**
 * @description 获取广场分类列表
 * @return Promise<any>
 */
export const getSquareClasslist = () => {
  return httpRequest.get<any>('/WebaSquareClass/getSquareClasslist');
};

/**
 * @description 根据其他名称获取文章分类
 * @param otherName 其他名称
 * @return Promise<any>
 */
export const getArticleClassByotherName = (otherName: internal) => useDollarGet(`/WebaSquareClass/getArticleClassByotherName/${otherName}`);

