import httpRequest from "../service/index";

/**
 * @description 获取所有广场数据
 * @param query 查询参数，包含 page 和 limit
 * @return Promise<any>
 */
export const getAllSquare = (query: { page: number; limit: number }) => {
  return httpRequest.get<any>(`square/getAllSquare/circle/${query.page}/${query.limit}`);
};

/**
 * @description 根据 ID 删除广场数据
 * @param id 广场 ID
 * @return Promise<any>
 */
export const DelectSquareById = (id: number) => {
  return httpRequest.get<any>(`square/DelectSquareById/${id}`);
};

/**
 * @description 根据 ID 修改广场数据
 * @param id 广场 ID
 * @param content 修改内容
 * @return Promise<any>
 */
export const ChangeSquareById = (id: number, content: string) => {
  return httpRequest.get<any>(`square/ChangeSquareById/${id}/${content}`);
};

/**
 * @description 获取所有广场用户
 * @return Promise<any>
 */
export const GetAllSquareUser = () => {
  return httpRequest.get<any>('square/GetAllSquareUser');
};
