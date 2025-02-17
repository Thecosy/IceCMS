import httpRequest from "../service/index";
import { useDollarGet } from  "../service/useDollarFetchRequest";

/**
 * @description 获取所有资源
 * @param query 查询参数，包括分页信息
 * @return Promise<any>
 */
export const getAllResource = (query: { page: number, limit: number }) => {
  return httpRequest.get<any>(`/WebResource/getAllResource/${query.page}/${query.limit}`);
};

/**
 * @description 根据作者获取所有资源
 * @param author 作者名称
 * @return Promise<any>
 */
export const getAllResourcebyAuthor = (author: string) => {
  return httpRequest.get<any>(`/WebResource/getAllResourcebyAuthor/${author}`);
};

/**
 * @description 获取带过滤条件的资源
 * @param query 查询参数，包括分页信息和分类信息
 * @param filter 过滤条件
 * @return Promise<any>
 */
export const getResourceFilter = (query: { page: number, limit: number, class: string }, filter: string) => {
  return httpRequest.get<any>(`/WebResource/getResourceFilter/${query.page}/${query.limit}/${query.class}/${filter}`);
};

/**
 * @description 获取所有资源的总数
 * @return Promise<any>
 */
export const getAllResourceNumber = () => {
  return httpRequest.get<any>('/WebResource/getAllResourceNumber');
};

/**
 * @description 根据资源ID获取资源
 * @param id 资源ID
 * @return Promise<any>
 */
export const getResourceById = (id: string | number) => {
  return httpRequest.get<any>(`/WebResource/getResourceById/${id}`);
};

/**
 * @description 获取最新的资源
 * @param num 获取数量
 * @param filter 过滤条件
 * @return Promise<any>
 */
export const getNewResource = (num: number, filter: string) => {
  return httpRequest.get<any>(`/WebResource/getNewResource/${num}/${filter}`);
};

/**
 * @description 根据标题和数量查找资源
 * @param title 资源标题
 * @param num 查找数量
 * @return Promise<any>
 */
// export const FindresourceByNum = (title: string, num: number) => {
//   return httpRequest.get<any>(`/WebResource/findresourcebynum/${title}/${num}`);
// };
export const FindresourceByNum = (title: string, num: number) => useDollarGet(`/WebResource/findresourcebynum/${title}/${num}`);

/**
 * @description 给资源点赞
 * @param id 资源ID
 * @return Promise<any>
 */
export const loveresource = (id: string | number) => {
  return httpRequest.get<any>(`/WebResource/resource/${id}/love`);
};

/**
 * @description 根据分类ID获取资源
 * @param id 分类ID
 * @return Promise<any>
 */
export const getResourceByClass = (id: string | number) => {
  return httpRequest.get<any>(`/WebResource/getResourceByClassId/${id}`);
};

/**
 * @description 根据查询条件查找资源
 * @param query 查询条件，包括内容、分页信息
 * @return Promise<any>
 */
export const FindAllResource = (query: { content: string, page: number, limit: number }) => {
  return httpRequest.get<any>(`/WebResource/FindAllResource/${query.content}/${query.page}/${query.limit}`);
};

/**
 * @description 获取上一篇资源
 * @param id 资源ID
 * @return Promise<any>
 */
export const getPrenewsResource = (id: string | number) => {
  return httpRequest.get<any>(`/WebResource/getPrenewsResource/${id}`);
};

/**
 * @description 获取下一篇资源
 * @param id 资源ID
 * @return Promise<any>
 */
export const getLastnewsResource = (id: string | number) => {
  return httpRequest.get<any>(`/WebResource/getLastnewsResource/${id}`);
};

/**
 * @description 查看资源
 * @param id 资源ID
 * @return Promise<any>
 */
export const viewresource = (id: string | number) => {
  return httpRequest.get<any>(`/WebResource/resource/${id}/view`);
};
