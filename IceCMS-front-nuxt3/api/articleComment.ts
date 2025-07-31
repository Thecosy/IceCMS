import { useDollarGet, useFetchPost } from "../service/useDollarFetchRequest";

/**
 * @description 获取所有文章评论
 * @return Promise<any>
 */
export const getAllArticleComments = (): Promise<any> => {
  return useDollarGet('ArticleComment/getallArticleComments');
};
