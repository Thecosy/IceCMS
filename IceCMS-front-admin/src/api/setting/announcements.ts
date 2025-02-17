import { http } from "@/utils/http";

// 获取公告
export const getAnnouncementslist = (data: object) => {
  return http.request<ResponseData<[]>>("get", "/Announcements/getAnnouncementslist", { data });
};

// 新增公告
export const newAnnouncements = (data: object) => {
  return http.request<ResponseData<[]>>("post", "/Announcements/newAnnouncements", { data });
};

// 删除公告
export const deleteAnnouncements = (id) => {
  return http.request<ResponseData<[]>>("get", `/Announcements/deleteAnnouncements/${id}`);
};

// 修改公告
export const updateAnnouncements = (id, data: object) => {
  return http.request<ResponseData<[]>>("post", `/Announcements/updateAnnouncements/${id}`, { data });
};
