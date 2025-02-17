import httpRequest from "../service/index";

/**
 * @description 获取资源分类列表
 * @return Promise<any>
 */
export const getResourceClasslist = () => {
  return httpRequest.get<any>('/WebResourceClass/getResourceClasslist');
};

/**
 * @description 根据分类ID获取资源分类名称
 * @param classid 分类ID
 * @return Promise<any>
 */
export const getResourceClassNameByid = (classid: string | number) => {
  return httpRequest.get<any>(`/WebResourceClass/getResourceClassNameByid/${classid}`);
};
