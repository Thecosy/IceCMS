import { useDollarGet, useFetchPost } from "../service/useDollarFetchRequest";

/**
 * @description 获取指定文章的所有评论
 * @param id 文章ID
 * @return Promise<any>
 */
export const getallArticleComment = (id: string | number) => {
  return useDollarGet(`/WebArticleComment/getallArticleComment/${id}`);
};

/**
 * @description 添加文章评论
 * @param data 评论数据
 * @return Promise<any>
 */
export const addArticleComment = (data: any) => {
  return useFetchPost('/WebArticleComment/addArticleComment', data);
};

/**
 * @description 获取指定文章的评论数量
 * @param id 文章ID
 * @return Promise<any>
 */
export const getArticleCommentnum = (id: string | number) => {
  return useDollarGet(`/WebArticleComment/getArticleCommentnum/${id}`);
};

/**
 * @description 获取最新的文章评论
 * @param num 获取评论的数量
 * @return Promise<any>
 */
export const getNewArticleComment = (num: number) => {
  return useDollarGet(`/WebArticleComment/getNewArticleComment/${num}`);
};
