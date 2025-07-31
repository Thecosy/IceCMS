import { useDollarGet, useFetchPost } from  "../service/useDollarFetchRequest";
import httpRequest from "../service/index";

/**
 * @description 获取所有文章
 * @param query 查询参数
 * @param click 点击量
 * @return Promise<any>
 */
export const getAllArticle = (query: { page: number; limit: number }, click: number) => {
  return useDollarGet(`/WebArticle/getAllArticle/${query.page}/${query.limit}/${click}`);
};

/**
 * @description 根据ID获取文章
 * @param id 文章ID
 * @return Promise<any>
 */
export const getArticleById = (id: string | number) => {
  return useDollarGet(`/WebArticle/getArticleById/${id}`);
};

/**
 * @description 根据作者获取所有文章
 * @param author 作者名
 * @return Promise<any>
 */
export const getAllArticlebyAuthor = (author: string) => {
  return useDollarGet(`/WebArticle/getAllArticlebyAuthor/${author}`);
};

/**
 * @description 获取最新文章
 * @param num 获取的数量
 * @param click 点击量
 * @return Promise<any>
 */
export const getNewArticle = (num: number, click: string) => {
  return useDollarGet(`/WebArticle/getNewArticle/${num}/${click}`);
};

/**
 * @description 获取所有文章的总数
 * @return Promise<any>
 */
export const getAllArticleNumber = () => {
  return useDollarGet('/WebArticle/getAllArticleNumber');
};

/**
 * @description 根据标题搜索文章
 * @param title 文章标题
 * @return Promise<any>
 */
export const Findarticles = (title: string) => {
  return useDollarGet(`/WebArticle/findarticles/${title}`);
};

/**
 * @description 根据标题和数量搜索文章
 * @param title 文章标题
 * @param num 获取的数量
 * @return Promise<any>
 */
// export const FindarticlesByNum = (title: string, num: number) => {
//   return httpRequest.get<any>(`/WebArticle/findarticlesbynum/${title}/${num}`);
// };

export const FindarticlesByNum = (title: string, num: number) => useDollarGet(`/WebArticle/findarticlesbynum/${title}/${num}`);


/**
 * @description 查找所有文章
 * @param query 查询参数
 * @return Promise<any>
 */
export const FindAllArticle = (query: { content: string; page: number; limit: number }) => {
  return useDollarGet(`/WebArticle/FindAllArticle/${query.content}/${query.page}/${query.limit}`);
};

/**
 * @description 根据名称查找文章的个人资料
 * @param name 文章名称
 * @return Promise<any>
 */
export const FindProfileByName = (name: string) => {
  return useDollarGet(`/WebArticle/FindProfileByName/${name}`);
};

/**
 * @description 查看文章
 * @param id 文章ID
 * @return Promise<any>
 */
export const viewarticle = (id: string | number) => {
  return useDollarGet(`/WebArticle/articles/${id}/view`);
};

/**
 * @description 点赞文章
 * @param id 文章ID
 * @return Promise<any>
 */
export const lovearticle = (id: string | number) => {
  return useDollarGet(`/WebArticle/articles/${id}/love`);
};

/**
 * @description 获取文章底部信息
 * @return Promise<any>
 */
export const GetArticleBtmatte = () => {
  return useDollarGet('/WebArticle/GetArticleBtmatter');
};

/**
 * @description 获取上一篇文章
 * @param id 当前文章ID
 * @return Promise<any>
 */
export const getPrenewsArticle = (id: string | number) => {
  return useDollarGet(`/WebArticle/getPrenewsArticle/${id}`);
};

/**
 * @description 获取下一篇文章
 * @param id 当前文章ID
 * @return Promise<any>
 */
export const getLastnewsArticle = (id: string | number) => {
  return useDollarGet(`/WebArticle/getLastnewsArticle/${id}`);
};

/**
 * @description 获取文章的所有评论
 * @param articleId 文章ID
 * @return Promise<any>
 */
export const getallArticleComment = (articleId: string | number) => {
  return httpRequest.get<any>(`/WebArticleComment/getallArticleComment/${articleId}`);
};

/**
 * @description 添加文章评论
 * @param commentData 评论数据
 * @return Promise<any>
 */
export const addArticleComment = (commentData: any) => {
  return useFetchPost('/WebArticleComment/addArticleComment', commentData);
};
