<template>
  <div class="order-list">
    <el-card shadow="never">
      <template #header>
        <div class="clearfix">
          <span>订单列表</span>
          <el-input v-model="searchQuery" class="search-input" placeholder="搜索订单"></el-input>
        </div>
      </template>
      <el-table :data="filteredOrders" v-loading="loading">
        <el-table-column prop="orderNo" label="订单编号" width="120"></el-table-column>
        <el-table-column prop="userId" label="用户id"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="payMent" label="支付方式" width="120"></el-table-column>
        <el-table-column prop="totalFee" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="120"></el-table-column>
        <el-table-column prop="updateTime" label="支付时间" width="120"></el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="text" @click="showOrderDetails(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next"
          :total="totalOrder"></el-pagination>
      </div>
    </el-card>

    <el-dialog :visible.sync="dialogVisible" title="订单详情" width="30%">
      <el-descriptions :items="orderDetails" column></el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getallorder } from '@/api/store_function/order'; // 请确保路径正确

// 引入分页所需的响应式变量
const currentPage = ref(1);
const pageSize = ref(5);
const totalOrder = ref(0);

// 页面大小变化时的处理函数
const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
  fetchOrder(currentPage.value, pageSize.value);
};

// 当前页面变化时的处理函数
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  fetchOrder(currentPage.value, pageSize.value);
};

// 页面挂载时获取文章数据
onMounted(() => {
  fetchOrder(currentPage.value, pageSize.value);
});

// 分页改变时获取文章
const fetchOrder = async (pageNum = 1, limit = pageSize.value) => {
  try {
    const response = await getallorder(pageNum, limit);
    if (response.code === 200) {
      console.log(response)
      const res = response.data;
      orders.value = res.rows;
      console.log(123, orders)

      totalOrder.value = res.total;
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

// 订单数据
const orders = ref([]);

const searchQuery = ref('');
const loading = ref(false);
const dialogVisible = ref(false);
const orderDetails = ref({});

const filteredOrders = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return orders.value;
  return orders.value.filter(order => order.orderId.toLowerCase().includes(query) || order.customerName.toLowerCase().includes(query));
});

const showOrderDetails = (order) => {
  orderDetails.value = order;
  dialogVisible.value = true;
};
</script>

<style scoped>
.search-input {
  width: 200px;
  float: right;
}

.order-list {
  padding-bottom: 20px;
}
</style>

<style scoped>
.box-card {
  margin: 20px;
}

.table-operations {
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
  margin-right: 10px;
}

/* 添加的样式 */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

.float-left {
  float: left;
}

.box-card {
  margin: 20px;
}

.table-operations {
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
  margin-right: 10px;
}
</style>
<style scoped>
/* 分页容器样式 */
.pagination-container {
  text-align: right;
  margin-top: 10px;
  margin-bottom: 40px;
}

:deep(.el-pager li) {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  color: #85899c;
  border: 0.1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  margin-right: 10px;
}

:deep(.btn-prev) {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  color: #4D84EA;
  border: 1px solid rgba(21, 158, 255, 0.2);
  border-radius: 6px;
  margin-right: 15px;
  font-size: 20px;
}

:deep(.btn-next) {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  color: #4D84EA;
  border: 1px solid rgba(21, 158, 255, 0.2);
  border-radius: 6px;
  margin-left: 5px;
}

:deep(.el-pager li.is-active) {
  background-color: #409EFF;
  color: #ffffff;
  border: 1px solid #409EFF;
  border-radius: 6px;
}

:deep(.el-pagination) {
  float: right;
}

/* 调整作者信息和头像的样式 */
.author-container {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  gap: 10px;
  /* 文字和头像之间的距离 */
}

/* Remove the empty ruleset */
/* 可以添加更多样式来调整文字显示 */
/* } */
</style>
