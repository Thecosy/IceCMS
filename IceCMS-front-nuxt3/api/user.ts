import httpRequest from "../service/index";
import { useDollarGet } from  "../service/useDollarFetchRequest";

/**
 * @description 获取所有用户名
 * @return Promise<any>
 */
export const getAllUserName = () => {
  return httpRequest.get<any>('/UserRole/getAllUserName');
};

/**
 * @description 获取所有用户角色
 * @return Promise<any>
 */
export const getAllUserRole = () => {
  return httpRequest.get<any>('/UserRole/getAllUserRole');
};

/**
 * @description 根据ID获取用户信息
 * @param id 用户ID
 * @return Promise<any>
 */
export const GetUserInfoByid = (id: string | number) => useDollarGet(`/Websuser/getUserInfobyid/${id}`);

/**
 * @description 修改用户信息
 * @param jwt 用户JWT
 * @param form 用户信息表单
 * @return Promise<any>
 */
export const ChangeUser = (jwt: string, form: any) => {
  return httpRequest.post<any>(`/User/ChangeUser/${jwt}`, form);
};

/**
 * @description 修改密码
 * @param jwt 用户JWT
 * @param yuanPassWord 旧密码
 * @param NewPassWord 新密码
 * @param userid 用户ID
 * @return Promise<any>
 */
export const ChangePassword = (jwt: string, yuanPassWord: string, NewPassWord: string, userid: string | number) => {
  return httpRequest.post<any>(`/User/ChangePassword/${jwt}/${yuanPassWord}/${NewPassWord}/${userid}`);
};

/**
 * @description 创建VIP用户
 * @param id 用户ID
 * @param payid 支付ID
 * @param order 订单信息
 * @return Promise<any>
 */
export const CreateVip = (id: string | number, payid: string | number, order: string) => {
  return httpRequest.get<any>(`/User/CreateVip/${id}/${payid}/${order}`);
};

/**
 * @description 更新积分
 * @param id 用户ID
 * @param integral 积分
 * @param order 订单信息
 * @return Promise<any>
 */
export const UpdateIntegral = (id: string | number, integral: number, order: string) => {
  return httpRequest.get<any>(`/User/UpdateIntegral/${id}/${integral}/${order}`);
};

/**
 * @description 检查VIP状态
 * @param id 用户ID
 * @return Promise<any>
 */
export const CheckVip = (id: string | number) => {
  return httpRequest.get<any>(`/User/CheckVip/${id}`);
};
