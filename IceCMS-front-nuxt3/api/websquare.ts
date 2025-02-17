import httpRequest from "../service/index";
import { useDollarGet } from  "../service/useDollarFetchRequest";

/**
 * @description 创建广场
 * @param data 广场数据
 * @param SortName 分类名称
 * @return Promise<any>
 */
export const createSquare = (data: any, SortName: string) => {
  return httpRequest.post<any>('/Websquare/create/' + SortName, data, {
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
 * @description 获取所有广场
 * @param otherName 其他名称
 * @param page 页码
 * @param limit 每页数量
 * @return Promise<any>
 */
// export const getAllSquare = (otherName: string, page: number, limit: number) => {
//   return httpRequest.get<any>(`/Websquare/getAllSquare/${otherName}/${page}/${limit}`);
// };
export const getAllSquare = (otherName: string, page: number, limit: number) => useDollarGet(`/Websquare/getAllSquare/${otherName}/${page}/${limit}`);

/**
 * @description 点赞评论
 * @param id 评论ID
 * @return Promise<any>
 */
export const likeClickComments = (id: string | number) => {
  return httpRequest.get<any>(`/Websquare/likeClickComment/${id}`);
};
