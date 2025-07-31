import { useDollarGet, useFetchPost } from "../service/useDollarFetchRequest";

/**
 * @description 获取指定资源的所有评论
 * @param id 资源ID
 * @return Promise<any>
 */
export const getallResourceComment = (id: string | number) => {
  return useDollarGet(`/WebResourceComment/getallResourceComment/${id}`);
};

/**
 * @description 添加资源评论
 * @param data 评论数据
 * @return Promise<any>
 */
export const addResourceComment = (data: any) => {
  return useFetchPost('/WebResourceComment/addResourceComment', data);
};

/**
 * @description 获取指定资源的评论数量
 * @param id 资源ID
 * @return Promise<any>
 */
export const getResourceCommentnum = (id: string | number) => {
  return useDollarGet(`/WebResourceComment/getResourceCommentnum/${id}`);
};

/**
 * @description 获取最新的资源评论
 * @param num 获取数量
 * @return Promise<any>
 */
export const getNewResourceComment = (num: number) => {
  return useDollarGet(`/WebResourceComment/getNewResourceComment/${num}`);
};
