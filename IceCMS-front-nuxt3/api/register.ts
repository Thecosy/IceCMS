import httpRequest from "../service/index";

/**
 * @description 用户注册
 * @param data 注册数据
 * @return Promise<any>
 */
export const register = (data: any) => {
  return httpRequest.get<any>('/Websuser/Create', {
    params: data,
  });
};
