import { http } from "@/utils/http";

/**  pay(获取)  */
export const getPayInfo = () => {
  return http.request<ResponseData<[]>>("get", "/PayInfoApi/getPayInfo");
};

/**  pay(修改)  */
export const setPayInfo = (data?: object) => {
  return http.request<ResponseData<[]>>("post", "/PayInfoApi/setPayInfo", { data });
};
