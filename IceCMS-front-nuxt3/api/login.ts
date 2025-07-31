import { useDollarGet, useFetchPost } from "../service/useDollarFetchRequest";

/**
 * @description 用户登录
 * @param data 登录数据
 * @return Promise<any>
 */
export const login = (data: any) => {
  return useFetchPost('/Websuser/login', {
    params: data
  });
};

/**
 * @description 微信登录
 * @param data 登录数据
 * @return Promise<any>
 */
export const WeChatLogin = (data: any) => {
  return useFetchPost('/Websuser/WeChatLogin', {
    params: data
  });
};

/**
 * @description 检查微信登录
 * @param accountId 账号ID
 * @return Promise<any>
 */
export const WeChatLoginCheck = (accountId: string) => {
  return useFetchPost('Websuser/WeChatLoginCheck/' + accountId);
};

/**
 * @description 手机号登录
 * @param phone 手机号码
 * @return Promise<any>
 */
export const Messagelogin = (phone: string) => {
  return useFetchPost('/Websuser/Messagelogin/' + phone);
};

/**
 * @description 校验短信验证码登录
 * @param phone 手机号码
 * @param code 验证码
 * @return Promise<any>
 */
export const MessageloginCheck = (phone: string, code: string) => {
  return useFetchPost('/Websuser/MessageloginCheck/' + phone + '/' + code);
};
