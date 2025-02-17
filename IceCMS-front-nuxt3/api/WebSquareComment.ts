import httpRequest from "../service/index";

/**
 * @description 获取指定星球的评论
 * @param id 星球ID
 * @return Promise<any>
 */
export const getPlanetIdComment = (id: string | number) => {
  return httpRequest.get<any>(`/WebSquareComment/getPlanetIdComment/${id}`);
};

/**
 * @description 获取指定星球的评论数量
 * @param id 星球ID
 * @return Promise<any>
 */
export const getPlanetCommentnum = (id: string | number) => {
  return httpRequest.get<any>(`/WebSquareComment/getPlanetCommentnum/${id}`);
};

/**
 * @description 添加星球评论
 * @param data 评论数据
 * @return Promise<any>
 */
export const addPlanetComment = (data: any) => {
  return httpRequest.post<any>('/WebSquareComment/addPlanetComment', data, {
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
 * @description 点赞指定评论
 * @param id 评论ID
 * @return Promise<any>
 */
export const likeClickComment = (id: string | number) => {
  return httpRequest.get<any>(`/WebSquareComment/likeClickComment/${id}`);
};
