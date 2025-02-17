import httpRequest from "../service/index";

/**
 * @description 获取所有文章评论
 * @return Promise<any>
 */
export const getAllArticleComments = (): Promise<any> => {
  return httpRequest.get<any>('ArticleComment/getallArticleComments');
};
