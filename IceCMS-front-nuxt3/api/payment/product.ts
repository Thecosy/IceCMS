import httpRequest from "../../service/index";

// 定义商品列表的响应类型
interface Product {
  id: string; // 商品的唯一标识符
  name: string; // 商品名称
  price: number; // 商品价格
  // 根据需要可以扩展更多商品的属性
}

interface ApiResponse {
  success: boolean; // 请求是否成功
  message: string;  // 请求响应的消息
  data: Product[];  // 商品列表数据
}

export default {
  // 查询商品列表
  list(): Promise<ApiResponse> {
    return httpRequest.get<ApiResponse>('/api/product/list');
  }
};
