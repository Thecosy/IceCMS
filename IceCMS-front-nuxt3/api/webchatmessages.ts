import httpRequest from "../service/index";

/**
 * @description 获取聊天消息
 * @param sender 发送者ID
 * @param receiver 接收者ID
 * @return Promise<any>
 */
export const getChatMessages = (sender: string | number, receiver: string | number) => {
  return httpRequest.get<any>(`/WebchatMessages/getChatMessages/${sender}/${receiver}`);
};

/**
 * @description 发送聊天消息
 * @param sender 发送者ID
 * @param receiver 接收者ID
 * @param message 消息内容
 * @return Promise<any>
 */
export const sendChatMessage = (sender: string | number, receiver: string | number, message: string) => {
  return httpRequest.get<any>(`/WebchatMessages/sendChatMessage/${sender}/${receiver}/${message}`);
};

/**
 * @description 获取用户消息列表
 * @param userid 用户ID
 * @return Promise<any>
 */
export const getMessageList = (userid: string | number) => {
  return httpRequest.get<any>(`/WebchatMessages/getMessageList/${userid}`);
};
