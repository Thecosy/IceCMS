import httpRequest from "../service/index";

/**
 * @description 获取文章分类列表
 * @return Promise<any>
 */
export const getArticleClasslist = () => {
  return httpRequest.get<any>('/WebarticleClass/getArticleClasslist');
};
