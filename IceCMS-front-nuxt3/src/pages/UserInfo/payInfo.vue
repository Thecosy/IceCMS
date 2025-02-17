<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { GetUserOrderList, CancelOrder } from '../../../api/order';

// const orderList = ref<any[]>([]);  // 存储订单列表
const isLoading = ref<boolean>(true);  // 控制加载状态
  const orderList = ref([
  {
    orderId: 'ORD001',
    productName: 'iPhone 13 Pro Max',
    orderDate: '2025-02-01',
    price: 1099.99,
    quantity: 1,
    status: 'Shipped',
    deliveryDate: '2025-02-05',
  },
  {
    orderId: 'ORD002',
    productName: 'MacBook Pro M2',
    orderDate: '2025-02-02',
    price: 2399.99,
    quantity: 1,
    status: 'Processing',
    deliveryDate: 'TBD',
  },
  {
    orderId: 'ORD003',
    productName: 'Apple Watch Series 7',
    orderDate: '2025-02-03',
    price: 399.99,
    quantity: 2,
    status: 'Delivered',
    deliveryDate: '2025-02-04',
  },
  {
    orderId: 'ORD004',
    productName: 'AirPods Pro 2',
    orderDate: '2025-02-01',
    price: 249.99,
    quantity: 1,
    status: 'Cancelled',
    deliveryDate: 'N/A',
  },
  {
    orderId: 'ORD005',
    productName: 'iPad Air 2022',
    orderDate: '2025-02-02',
    price: 599.99,
    quantity: 1,
    status: 'Shipped',
    deliveryDate: '2025-02-06',
  },
]);
// 获取用户的订单列表
async function getOrderList() {
  // try {
  //   if (userStore.userid) {
  //     const result = await GetUserOrderList(userStore.userid);  // API 调用获取订单列表
  //     orderList.value = result.data || [];
  //   } else {
  //     console.error('用户未登录');
  //   }
  // } catch (error) {
  //   console.error('获取订单列表失败:', error);
  // } finally {
  //   isLoading.value = false;
  // }
}

// 取消订单操作
async function handleCancelOrder(orderId: string) {
  // try {
  //   const result = await CancelOrder(orderId);  // API 调用取消订单
  //   if (result.code === 200) {
  //     orderList.value = orderList.value.filter(order => order.id !== orderId);  // 移除已取消的订单
  //     console.log('订单取消成功');
  //   } else {
  //     console.error('取消订单失败');
  //   }
  // } catch (error) {
  //   console.error('取消订单失败:', error);
  // }
}

// 组件加载时调用
onMounted(() => {
  // getOrderList();
});
</script>

<template>
  <div class="order-list home">
    <h2>我的订单</h2>


    <el-row v-loading="loading">
      <el-col :span="8" v-for="order in orderList" :key="order.id">
        <el-card class="order-card" shadow="hover">
          <div class="order-info">
            <div class="order-header">
              <p class="order-id">订单号: {{ order.id }}</p>
              <p class="order-status" :class="['status', order.status]">{{ order.status }}</p>
            </div>
            <div class="order-details">
              <p><strong>商品:</strong> {{ order.productName }}</p>
              <p><strong>数量:</strong> {{ order.quantity }}</p>
              <p><strong>总金额:</strong> ¥{{ order.totalAmount }}</p>
            </div>
            <el-button @click="viewOrderDetails(order.id)" type="primary" size="small">查看详情</el-button>
            <el-button 
              v-if="order.status === '待付款'" 
              @click="handleCancelOrder(order.id)" 
              type="danger" 
              size="small" 
              class="cancel-btn">取消订单</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- <p v-if="!orderList ==null && !isLoading" class="no-order-msg">您没有任何订单。</p> -->
  </div>
</template>

<style scoped>
.order-list {
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
}

.order-card {
  margin-bottom: 20px;
}

.order-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.order-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}

.order-id {
  font-weight: bold;
  color: #333;
}

.order-status {
  font-weight: bold;
}

.status {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
}

.status.待付款 {
  background-color: #ff9900;
  color: white;
}

.status.已发货 {
  background-color: #4caf50;
  color: white;
}

.status.已完成 {
  background-color: #2196f3;
  color: white;
}

.order-details {
  margin-bottom: 10px;
}

.no-order-msg {
  text-align: center;
  color: #888;
}

.cancel-btn {
  margin-top: 10px;
}
.homeContent {
    margin-top: 40px;
  }
  .home {
    padding: 22px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 13px;
  }
</style>