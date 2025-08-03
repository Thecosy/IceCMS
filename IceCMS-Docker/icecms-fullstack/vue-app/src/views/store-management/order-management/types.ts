// types.ts

export interface Order {
  orderId: string;
  customerName: string;
  totalAmount: number;
  status: string;
  // 其他订单相关的字段
}
