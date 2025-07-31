import { useDollarGet, useFetchPost } from  "../service/useDollarFetchRequest";

/**
 * @description 根据用户ID获取用户信息
 * @param id 用户ID
 * @return Promise<any>
 */
export const getUserInfobyid = (id: string | number) => {
  return httpRequest.get<any>(`/Websuser/getUserInfobyid/${id}`);
};

/**
 * @description 修改用户信息
 * @param form 用户信息表单
 * @return Promise<any>
 */
export const ChangeUser = (form: any) => {
  return httpRequest.post<any>('/Websuser/ChangeUser', form);
};

/**
 * @description 测试邮箱是否有效
 * @param email 邮箱地址
 * @return Promise<any>
 */
export const testemail = (email: string) => {
  return httpRequest.get<any>(`/Websuser/testemail/${email}`);
};

/**
 * @description 登录
 * @param user 用户
 * @return Promise<any>
 */
export const login = (username: string, password: string) => {
  // 使用 GET 请求，并通过 query 传递参数
  return useFetchPost(`/Websuser/login?username=${username}&password=${password}`);
};