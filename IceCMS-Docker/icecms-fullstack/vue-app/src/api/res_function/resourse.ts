import { http } from "@/utils/http";

// id获取文章详情
export const getArticleById = (id: string) => {
  return http.request<ResponseData<[]>>("get", `/resource/getResourceById/${id}`);
};

/**  新增文章(修改)  */
export const newAaticle = (data?: object) => {
  return http.request<ResponseData<[]>>("post", "/resource/create", { data });
};

// 获取所有文章（分页）
export const getAllArticles = (page, limit) => {
  return http.request<ResponseData<[]>>("get", `/resource/getAllResource/${page}/${limit}`);
};

// 新增文章
export const createArticle = (data: object) => {
  return http.request<ResponseData<[]>>("post", "/resource/create", { data });
};

// 修改文章
export const updateArticles = (data: object, id) => {
  return http.request<ResponseData<[]>>("post", `/resource/ReviseResourceById/${id}`, { data });
};

// 删除文章
export const deleteArticle = (id: string) => {
  return http.request<ResponseData<[]>>("get", `/resource/DelectResourceById/${id}`);
};

// 获取文章详情
export const getArticleDetail = (id: string) => {
  return http.request<ResponseData<[]>>("get", `/article/getArticleById/${id}`);
};

// 批量删除资源
export const deleteArticlesBatch = (ids: number[]) => {
  return http.request<ResponseData<[]>>("post", "/article/DeleteArticleBatch", { data: ids });
};