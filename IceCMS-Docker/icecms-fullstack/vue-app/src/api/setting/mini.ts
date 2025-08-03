import { http } from "@/utils/http";

/**  mini(获取)  */
export const getMiniProgramSetting = () => {
  return http.request<ResponseData<[]>>("get", "/Sitting/getMiniProgramSetting");
};

/**  mini(修改)  */
export const updateMiniProgramSetting = (data?: object) => {
  return http.request<ResponseData<[]>>("post", "/Sitting/updateMiniProgramSetting", { data });
};
