import { useDollarGet, useFetchPost } from "../service/useDollarFetchRequest";

/**
 * @description 获取文章分类列表
 * @return Promise<any>
 */
export const getArticleClasslist = () => {
  return useDollarGet('/WebarticleClass/getArticleClasslist');
};
