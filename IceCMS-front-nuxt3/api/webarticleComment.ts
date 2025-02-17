import httpRequest from "../service/index";

/**
 * @description 获取指定文章的所有评论
 * @param id 文章ID
 * @return Promise<any>
 */
export const getallArticleComment = (id: string | number) => {
  return httpRequest.get<any>(`/WebArticleComment/getallArticleComment/${id}`);
};

/**
 * @description 添加文章评论
 * @param data 评论数据
 * @return Promise<any>
 */
export const addArticleComment = (data: any) => {
  return httpRequest.post<any>('/WebArticleComment/addArticleComment', data, {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      dataType: 'json',
      crossDomain: true,
      processData: false,
      contentType: false,
    }
  });
};

/**
 * @description 获取指定文章的评论数量
 * @param id 文章ID
 * @return Promise<any>
 */
export const getArticleCommentnum = (id: string | number) => {
  return httpRequest.get<any>(`/WebArticleComment/getArticleCommentnum/${id}`);
};

/**
 * @description 获取最新的文章评论
 * @param num 获取评论的数量
 * @return Promise<any>
 */
export const getNewArticleComment = (num: number) => {
  return httpRequest.get<any>(`/WebArticleComment/getNewArticleComment/${num}`);
};
