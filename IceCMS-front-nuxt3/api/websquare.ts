import httpRequest from "../service/index";
import { useDollarGet, useFetchPost } from  "../service/useDollarFetchRequest";

/**
 * @description 创建广场
 * @param data 广场数据
 * @param SortName 分类名称
 * @return Promise<any>
 */
export const createSquare = (data: any) => {
  console.log("发送了1次")
  return useFetchPost('/Websquare/create', data);
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
