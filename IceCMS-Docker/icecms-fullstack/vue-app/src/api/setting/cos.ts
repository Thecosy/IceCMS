import { http } from "@/utils/http";

/**  oss(获取)  */
export const getCosSetting = () => {
  return http.request<ResponseData<[]>>("get", "/Sitting/getCosSetting");
};

/**  oss(修改)  */
export const setCosInfo = (data?: object) => {
  return http.request<ResponseData<[]>>("post", "/Sitting/setCosInfo", { data });
};
