import httpRequest from "../service/index";

/**
 * @description 更新图片
 * @param form 图片表单数据
 * @return Promise<any>
 */
export const updateImage = (form: FormData) => {
  return httpRequest.post<any>('/ImageApi/updateimage', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000,
  });
};

/**
 * @description 上传带水印的图片
 * @param form 图片表单数据
 * @param title 水印标题
 * @param content 水印内容
 * @return Promise<any>
 */
export const addwatermarkimageUpload = (form: FormData, title: string, content: string) => {
  return httpRequest.post<any>(`/ImageApi/addwatermarkimageUpload/${title}/${content}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000,
  });
};
