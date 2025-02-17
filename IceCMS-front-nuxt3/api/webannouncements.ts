import httpRequest from "../service/index";

/**
 * @description 获取全部公告列表
 * @return Promise<any>
 */
export const getAnnouncementslist = () => {
  return httpRequest.get<any>('/WebAnnouncements/getAnnouncementslist');
};

/**
 * @description 获取指定数量的公告列表
 * @param num 获取的数量
 * @return Promise<any>
 */
export const getAnnouncementslistByNum = (num: number) => {
  return httpRequest.get<any>(`/WebAnnouncements/getAnnouncementslistByNum/${num}`);
};
