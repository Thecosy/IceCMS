import httpRequest from "../service/index";

/**
 * @description 获取所有标签
 * @return Promise<any>
 */
export const getAllTag = () => {
  return httpRequest.get<any>('/WebTag/getAllTag');
};

/**
 * @description 根据关键字获取标签列表
 * @param keyword 关键字
 * @return Promise<any>
 */
export const getTagByList = (keyword: string) => {
  return httpRequest.get<any>(`/WebTag/getTagByList/${keyword}`);
};
