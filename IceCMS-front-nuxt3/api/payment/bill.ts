import httpRequest from "../../service/index";

// 定义 API 响应类型
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// 定义下载账单的返回类型（假设返回类型为一个包含文件 URL 的字符串）
interface DownloadBillResponse {
  url: string; // 假设返回的是一个文件的 URL
}

export default {
  // 下载账单
  downloadBill(billDate: string, type: string): Promise<ApiResponse<DownloadBillResponse>> {
    return httpRequest.get<ApiResponse<DownloadBillResponse>>(`/api/wx-pay/downloadbill/${billDate}/${type}`);
  }
};
