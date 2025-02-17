import { http } from "@/utils/http";

/**  sms(获取)  */
export const getSmsSetting = () => {
  return http.request<ResponseData<[]>>("get", "/Sitting/getSmsSetting");
};

/**  sms(修改)  */
export const updateSmsSetting = (data?: object) => {
  return http.request<ResponseData<[]>>("post", "/Sitting/updateSmsSetting", { data });
};
