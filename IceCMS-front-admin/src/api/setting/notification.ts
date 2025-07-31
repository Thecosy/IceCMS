import { http } from "@/utils/http";

/**
 * 创建通知
 */
export const addNotification = (data?: object) => {
  return http.request<ResponseData<[]>>("post", "/Notification/addNotification", { data });
};

/**
 * 获取通知列表
 */
export const getNotificationList = (params?: object) => {
  return http.request<ResponseData<[]>>("get", "/Notification/getNotificationList", { params });
};

/**
 * 获取通知详情
 */
export const getNotification = (id: number) => {
  return http.request<ResponseData<[]>>("get", `/Notification/getNotification/${id}`);
};

/**
 * 更新通知
 */
export const updateNotification = (data?: object) => {
  return http.request<ResponseData<[]>>("post", "/Notification/updateNotification", { data });
};

/**
 * 删除通知
 */
export const deleteNotification = (id: number) => {
  return http.request<ResponseData<[]>>("get", `/Notification/deleteNotification/${id}`);
};

/**
 * 发送通知
 */
export const sendNotification = (id: number) => {
  return http.request<ResponseData<[]>>("get", `/Notification/sendNotification/${id}`);
};

/**
 * 批量删除通知
 */
export const batchDeleteNotification = (data?: object) => {
  return http.request<ResponseData<[]>>("post", "/Notification/batchDeleteNotification", { data });
};

/**
 * 获取未读通知
 */
export const getUnreadNotifications = () => {
  return http.request<ResponseData<[]>>("get", "/Notification/getUnreadNotifications");
};

/**
 * 标记通知为已读
 */
export const markNotificationAsRead = (id: number) => {
  return http.request<ResponseData<[]>>("get", `/Notification/markAsRead/${id}`);
};

/**
 * 标记所有通知为已读
 */
export const markAllNotificationsAsRead = () => {
  return http.request<ResponseData<[]>>("get", "/Notification/markAllAsRead");
};
