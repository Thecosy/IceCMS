import { http } from "@/utils/http";

// 获取公告
export const getAnnouncementslist = () => {
  return http.request<ResponseData<[]>>("get", "/Announcements/getAnnouncementslist");
};

// 新增公告
export const newAnnouncements = (data: object) => {
  return http.request<ResponseData<[]>>("post", "/Announcements/newAnnouncements", {
    data
  });
};

// 删除公告
export const deleteAnnouncements = (id) => {
  // 创建包含id的对象
  const data = { id };
  return http.request<ResponseData<[]>>("post", "/Announcements/deleteAnnouncements", {
    data
  });
};

// 修改公告
export const updateAnnouncements = (id, data: object) => {
  // 确保data中包含id
  const updateData = { ...data, id };
  return http.request<ResponseData<[]>>("post", "/Announcements/updateAnnouncements", {
    data: updateData
  });
};
