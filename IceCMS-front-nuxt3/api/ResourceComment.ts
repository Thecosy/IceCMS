import httpRequest from "../service/index";

/**
 * @description 获取所有资源评论
 * @return Promise<any>
 */
export const getAllResourceComments = () => {
  return httpRequest.get<any>('ResourceComment/getAllResourceComments');
};
