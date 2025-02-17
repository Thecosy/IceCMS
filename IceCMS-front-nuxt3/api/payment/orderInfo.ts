import httpRequest from "../../service/index";

// 定义订单信息的类型
interface Order {
  orderNo: string; // 订单号
  userid: string; // 用户 ID
  resourceid: string; // 资源 ID
  status: string; // 订单状态
  // 根据实际需求添加更多字段
}

// 定义 API 响应的基础结构
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T; // 泛型数据类型
}

export default {
  // 查询订单列表
  list(): Promise<ApiResponse<Order[]>> {
    return httpRequest.get<ApiResponse<Order[]>>('/Pay-api/order-info/list');
  },

  // 根据用户 ID 查询订单列表
  PaylistById(userid: string): Promise<ApiResponse<Order[]>> {
    return httpRequest.get<ApiResponse<Order[]>>(`/Pay-api/order-info/PaylistById/${userid}`);
  },

  // 查询订单状态
  queryOrderStatus(orderNo: string): Promise<ApiResponse<{ status: string }>> {
    return httpRequest.get<ApiResponse<{ status: string }>>(`/Pay-api/order-info/query-order-status/${orderNo}`);
  },

  // 查询订单状态（通过用户和资源 ID）
  queryOrderStatusBytrue(userid: string, resourceid: string): Promise<ApiResponse<{ status: string }>> {
    return httpRequest.get<ApiResponse<any>>(`/Pay-api/order-info/query-order-status-Bytrue/${userid}/${resourceid}`);
  }
};
