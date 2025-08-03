import { http } from "@/utils/http";

// id获取文章详情
export const getArticleById = (id: string) => {
  return http.request<ResponseData<[]>>("get", `/article/getArticleById/${id}`);
};

/**  新增文章(修改)  */
export const newAaticle = (data?: object) => {
  return http.request<ResponseData<[]>>("post", "/article/create", { data });
};

// 获取所有圈子（分页）
export const getAllSquare = (squareId, page, limit) => {
  return http.request<ResponseData<[]>>("get", `/square/getAllSquare/${squareId}/${page}/${limit}`);
};

// 新增文章
export const createArticle = (data: object) => {
  return http.request<ResponseData<[]>>("post", "/square/create", { data });
};

// 修改文章
export const updateArticles = (data: object, id) => {
  return http.request<ResponseData<[]>>("post", `/square/ReviseSquareById/${id}`, { data });
};

// 删除文章
export const deleteArticle = (id: string) => {
  return http.request<ResponseData<[]>>("get", `/square/DelectSquareById/${id}`);
};

// 获取文章详情
export const getArticleDetail = (id: string) => {
  return http.request<ResponseData<[]>>("get", `/article/getArticleById/${id}`);
};

// 获取圈子详情 - 使用getAllSquare替代不存在的getSquareById
export const getSquareDetail = (id: number) => {
  return http.request<ResponseData<[]>>("get", `/square/getAllSquare/${id}/1/1`);
};

// 批量删除文章
export const deleteArticlesBatch = (ids: number[]) => {
  return http.request<ResponseData<[]>>("post", "/square/DeleteSquareBatch", { data: ids });
};

// 根据ID和内容修改圈子
export const changeSquareContent = (id: number, content: string) => {
  return http.request<ResponseData<[]>>("get", `/square/ChangeSquareById/${id}/${content}`);
};
