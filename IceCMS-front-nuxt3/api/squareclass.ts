import httpRequest from "../service/index";

/**
 * @description 获取所有广场分类
 * @param query 查询参数，包含 page 和 limit
 * @return Promise<any>
 */
export const allClassName = (query: { page: number; limit: number }) => {
  return httpRequest.post<any>(`squareClass/allSquareClass/${query.page}/${query.limit}`);
};

/**
 * @description 根据 ID 删除广场分类
 * @param id 分类 ID
 * @return Promise<any>
 */
export const DelectSquareClassById = (id: number) => {
  return httpRequest.get<any>(`squareClass/DelectSquareClassById/${id}`);
};

/**
 * @description 新建广场分类
 * @param data 分类数据
 * @return Promise<any>
 */
export const newSquareClass = (data: FormData) => {
  return httpRequest.post<any>('squareClass/newSquareClass', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
