import { http } from "@/utils/http";

// 获取所有文章分类（分页）
export const getallSquareClass = (page, limit) => {
  return http.request<ResponseData<[]>>("get", `/squareClass/allSquareClass/${page}/${limit}`);
};

// 新增文章分类
export const addArticleCategory = (data: object) => {
  return http.request<ResponseData<[]>>("post", "/squareClass/newSquareClass", { data });
};

// 修改文章分类
export const updateArticlesCategory = (data: object, id) => {
  return http.request<ResponseData<[]>>("post", `/squareClass/ReviseSquareClassById/${id}`, { data });
};

// 删除文章分类
export const deleteArticleCategoryById = (id: number) => {
  return http.request<ResponseData<[]>>("get", `/squareClass/DelectSquareClassById/${id}`);
};

// 顶置分类
export const topSquareClass = (id: number) => {
  return http.request<ResponseData<[]>>("get", `/squareClass/topSquareClass/${id}`);
};

// 获取所有分类列表
export const getAllClassName = () => {
  return http.request<ResponseData<[]>>("get", "/squareClass/getAllClassName");
};