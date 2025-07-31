import { useDollarGet, useFetchPost } from "../service/useDollarFetchRequest";

/**
 * @description 创建文章
 * @param data 文章数据
 * @returns Promise<any>
 */
export const createArticle = (data: any): Promise<any> => {
  return useFetchPost('/article/create', data);
};

/**
 * @description 更新文章
 * @param id 文章ID
 * @returns Promise<any>
 */
export const updateArticle = (id: number): Promise<any> => {
  return useFetchPost(`/article/ReviseArticleById/${id}`, { id });
};

/**
 * @description 获取所有文章
 * @param query 查询参数，包含 page 和 limit
 * @returns Promise<any>
 */
export const getAllArticle = (query: { page: number, limit: number }): Promise<any> => {
  return useDollarGet(`article/getAllArticle/${query.page}/${query.limit}`);
};

/**
 * @description 获取文章详情
 * @param id 文章ID
 * @returns Promise<any>
 */
export const getArticleById = (id: number): Promise<any> => {
  return useDollarGet(`article/getArticleById/${id}`);
};

/**
 * @description 删除文章
 * @param id 文章ID
 * @returns Promise<any>
 */
export const DelectArticleById = (id: number): Promise<any> => {
  return useDollarGet(`article/DelectArticleById/${id}`);
};

/**
 * @description 创建文章分类
 * @param data 分类数据
 * @returns Promise<any>
 */
export const newArticleClass = (data: any): Promise<any> => {
  return useFetchPost('/articleClass/newArticleClass', data);
};

/**
 * @description 获取所有文章分类
 * @param query 查询参数，包含 page 和 limit
 * @returns Promise<any>
 */
export const allArticleClass = (query: { page: number, limit: number }): Promise<any> => {
  return useFetchPost(`articleClass/allArticleClass/${query.page}/${query.limit}`);
};

/**
 * @description 删除文章分类
 * @param id 分类ID
 * @returns Promise<any>
 */
export const DeleteArticleClass = (id: number): Promise<any> => {
  return useDollarGet(`articleClass/DeleteArticleClass/${id}`);
};

/**
 * @description 获取所有分类名称
 * @param data 数据
 * @returns Promise<any>
 */
export const getAllClassName = (data: any): Promise<any> => {
  return useDollarGet('articleClass/getAllClassName', data);
};

/**
 * @description 根据ID获取分类名称
 * @param id 分类ID
 * @returns Promise<any>
 */
export const getClassNameById = (id: number): Promise<any> => {
  return useDollarGet(`articleClass/getClassNameById/${id}`);
};
