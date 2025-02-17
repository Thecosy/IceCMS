import httpRequest from "../service/index";

/**
 * @description 设置配置项
 * @param data 配置数据
 * @return Promise<any>
 */
export const setSetting = (data: any) => {
  return httpRequest.post<any>('/Sitting/setSetting', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/**
 * @description 获取 COS 配置
 * @return Promise<any>
 */
export const getCosSetting = () => {
  return httpRequest.get<any>('Sitting/getCosSetting');
};

/**
 * @description 设置 COS 配置
 * @param data 配置数据
 * @return Promise<any>
 */
export const setSettingCos = (data: any) => {
  return httpRequest.post<any>('Sitting/setSettingCos', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/**
 * @description 获取所有轮播配置
 * @return Promise<any>
 */
export const getAllDispositionCarousel = () => {
  return httpRequest.get<any>('Sitting/getAllDispositionCarousel');
};
