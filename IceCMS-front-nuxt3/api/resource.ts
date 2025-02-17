import httpRequest from "../service/index";

/**
 * @description 创建资源
 * @param data 资源数据
 * @return Promise<any>
 */
export const createResource = (data: any) => {
  return httpRequest.post<any>('/resource/create', data, {
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  });
};

/**
 * @description 获取所有资源
 * @param query 查询参数
 * @return Promise<any>
 */
export const getAllResource = (query: { page: number, limit: number }) => {
  return httpRequest.get<any>(`resource/getAllResource/${query.page}/${query.limit}`);
};

/**
 * @description 删除指定 ID 的资源
 * @param id 资源 ID
 * @return Promise<any>
 */
export const DelectResourceById = (id: number) => {
  return httpRequest.get<any>(`resource/DelectResourceById/${id}`);
};

/**
 * @description 根据 ID 获取资源
 * @param id 资源 ID
 * @return Promise<any>
 */
export const getResourceById = (id: number) => {
  return httpRequest.get<any>(`resource/getResourceById/${id}`);
};

/**
 * @description 创建新资源分类
 * @param data 分类数据
 * @return Promise<any>
 */
export const newResourceClass = (data: any) => {
  return httpRequest.post<any>('/ResourceClass/newResourceClass', data, {
    crossDomain: true,
    processData: false,
    contentType: false,
  });
};

/**
 * @description 获取所有资源分类
 * @param query 查询参数
 * @return Promise<any>
 */
export const allResourceClass = (query: { page: number, limit: number }) => {
  return httpRequest.post<any>(`ResourceClass/allResourceClass/${query.page}/${query.limit}`);
};

/**
 * @description 删除指定 ID 的资源分类
 * @param id 分类 ID
 * @return Promise<any>
 */
export const DeleteResourceClass = (id: number) => {
  return httpRequest.get<any>(`ResourceClass/DeleteResourceClass/${id}`);
};

/**
 * @description 根据 ID 获取资源分类名称
 * @param id 分类 ID
 * @return Promise<any>
 */
export const getClassNameById = (id: number) => {
  return httpRequest.get<any>(`ResourceClass/getClassNameById/${id}`);
};

/**
 * @description 获取所有资源分类名称
 * @param data 请求数据
 * @return Promise<any>
 */
export const getAllClassName = (data: any) => {
  return httpRequest.get<any>('ResourceClass/getAllClassName', data);
};
