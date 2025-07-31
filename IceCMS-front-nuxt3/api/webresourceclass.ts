import httpRequest from "../service/index";
import { useFetchGet } from "../service/useDollarFetchRequest";

/**
 * @description 获取资源分类列表
 * @return Promise<any>
 */
export const getResourceClasslist = () => {
  return useFetchGet('/WebResourceClass/getResourceClasslist');
};

/**
 * @description 根据分类ID获取资源分类名称
 * @param classid 分类ID
 * @return Promise<any>
 */
export const getResourceClassNameByid = (classid: string | number) => {
  return useFetchGet(`/WebResourceClass/getResourceClassNameByid/${classid}`);
};
