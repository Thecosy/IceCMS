import { http } from "@/utils/http";

// 获取所有文章分类（分页）
export const getallArticleCategorys = (page, limit) => {
  return http.request<ResponseData<[]>>("get", `/ResourceClass/allResourceClass/${page}/${limit}`);
};

// 新增文章分类
export const addArticleCategory = (data: object) => {
  return http.request<ResponseData<[]>>("post", "/ResourceClass/newResourceClass", { data });
};

// 修改文章分类
export const updateArticlesCategory = (data: object, id) => {
  return http.request<ResponseData<[]>>("post", `/ResourceClass/ReviseResourceClassById/${id}`, { data });
};

// 删除文章分类
export const deleteArticleCategoryById = (id: number) => {
  return http.request<ResponseData<[]>>("get", `/ResourceClass/DeleteResourceClass/${id}`);
};

// 顶置分类
export const topArticleClass = (id: number) => {
  return http.request<ResponseData<[]>>("get", `/ResourceClass/topResourceClass/${id}`);
};

// 获取所有分类列表
export const getAllClassName = () => {
  return http.request<ResponseData<[]>>("get", "/ResourceClass/getAllClassName");
};