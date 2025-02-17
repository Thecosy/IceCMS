import httpRequest from "../service/index";

/**
 * @description 获取指定资源的所有评论
 * @param id 资源ID
 * @return Promise<any>
 */
export const getallResourceComment = (id: string | number) => {
  return httpRequest.get<any>(`/WebResourceComment/getallResourceComment/${id}`);
};

/**
 * @description 添加资源评论
 * @param data 评论数据
 * @return Promise<any>
 */
export const addResourceComment = (data: any) => {
  return httpRequest.post<any>('/WebResourceComment/addResourceComment', data, {
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
 * @description 获取指定资源的评论数量
 * @param id 资源ID
 * @return Promise<any>
 */
export const getResourceCommentnum = (id: string | number) => {
  return httpRequest.get<any>(`/WebResourceComment/getResourceCommentnum/${id}`);
};

/**
 * @description 获取最新的资源评论
 * @param num 获取数量
 * @return Promise<any>
 */
export const getNewResourceComment = (num: number) => {
  return httpRequest.get<any>(`/WebResourceComment/getNewResourceComment/${num}`);
};
