import { http } from "@/utils/http";

// 获取所有文章评论（分页）
export const getallArticleComments = (page, limit) => {
  return http.request<ResponseData<[]>>("get", `/ArticleComment/getallArticleComments/${page}/${limit}`);
};

// 新增文章评论
export const addArticleComment = (data: object) => {
  return http.request<ResponseData<[]>>("post", "/ArticleComment/addArticleComment", { data });
};

// 修改文章评论
export const updateArticlesComment = (data: object, id) => {
  return http.request<ResponseData<[]>>("post", `/ArticleComment/ReviseArticleCommentById/${id}`, { data });
};

// 删除文章评论
export const deleteArticleCommentById = (id: number) => {
  return http.request<ResponseData<[]>>("get", `/ArticleComment/DeleteArticleCommentById/${id}`);
};

// 获取所有文章列表
export const getAllArticleName = () => {
  return http.request<ResponseData<[]>>("get", "/article/getAllArticleName");
};
