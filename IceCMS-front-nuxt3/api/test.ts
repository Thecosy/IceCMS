import httpRequest from "../service/index";

/**
 * @description 测试接口
 * @param data 请求参数
 * @return Promise<any>
 */
export const test = (data: any) => {
  return httpRequest.get<any>('/test', { params: data });
};
