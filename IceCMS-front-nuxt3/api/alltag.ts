import httpRequest from "../service/index";

/**
 * @description 获取所有标签
 * @returns Promise<Tag[]>
 */
export const getAllTag = (): Promise<Tag[]> => {
  return httpRequest.get<any>('Tag/getAllTag');
};
