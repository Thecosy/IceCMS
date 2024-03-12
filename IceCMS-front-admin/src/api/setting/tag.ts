import { http } from "@/utils/http";

/**  tag(获取)  */
export const getAllTag = () => {
  return http.request<ResponseData<[]>>("get", "/Tag/getAllTag");
};

/**  tag(修改)  */
export const setSTag = (data?: object) => {
  return http.request<ResponseData<[]>>("post", "/Tag/addSTag", { data });
};

// tag(删除)
export const deleteSTag = (id) => {
  return http.request<ResponseData<[]>>("get", `/Tag/deleteSTag/${id}`);
};