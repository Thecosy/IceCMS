import { useDollarGet, useFetchPost } from "../service/useDollarFetchRequest";

/**
 * @description 获取指定星球的评论
 * @param id 星球ID
 * @return Promise<any>
 */
export const getPlanetIdComment = (id: string | number) => {
  return useDollarGet(`/WebSquareComment/getPlanetIdComment/${id}`);
};

/**
 * @description 获取指定星球的评论数量
 * @param id 星球ID
 * @return Promise<any>
 */
export const getPlanetCommentnum = (id: string | number) => {
  return useDollarGet(`/WebSquareComment/getPlanetCommentnum/${id}`);
};

/**
 * @description 添加星球评论
 * @param data 评论数据
 * @return Promise<any>
 */
export const addPlanetComment = (data: any) => {
  return useFetchPost('/WebSquareComment/addPlanetComment', data);
};

/**
 * @description 点赞指定评论
 * @param id 评论ID
 * @return Promise<any>
 */
export const likeClickComment = (id: string | number) => {
  return useDollarGet(`/WebSquareComment/likeClickComment/${id}`);
};
