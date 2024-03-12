<template>
  <el-container style="height: 100vh; background-color: #f3f4f6;">
    <el-main>
      <el-row gutter="20">
        <el-col :span="6">
          <el-card class="gradient-total-sales">
            <div>总销售额</div>
            <div>{{ listInfos.total }}¥</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="gradient-today-sales">
            <div>今日销售额</div>
            <div>{{ listInfos.today }}¥</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="gradient-user-count">
            <div>用户数量</div>
            <div>{{ listUserCount }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="gradient-new-orders">
            <div>新增订单</div>
            <div>{{ listInfos.newOrder }}</div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 最近订单列表 -->
      <el-card class="recent-orders">
        <template #header>
          <div class="card-header">
            <span class="font-medium">最近订单列表</span>
          </div>
        </template>
        <el-table :data="orders" style="width: 100%" stripe>
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
      </el-card>

      <!-- 用户列表 -->
      <el-card class="user-list">
        <template #header>
          <div class="card-header">
            <span class="font-medium">最近用户</span>
          </div>
        </template>
        <el-table :data="userList" style="width: 100%" stripe>
          <el-table-column prop="id" label="用户ID" width="100"></el-table-column>
          <el-table-column prop="name" label="用户名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="createdAt" label="注册时间"></el-table-column>
        </el-table>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { listByPage } from '@/api/store_function/order'; // 请确保路径正确
import { listInfo } from '@/api/store_function/store'; // 请确保路径正确
import { getUserCount } from '@/api/common/user'; // 请确保路径正确

// 页面挂载时获取数据
onMounted(() => {
  fetchOrder();
  fetchInfo();
  fetchUserCount();

});

const listUserCount = ref([]);

const fetchUserCount = async () => {
  try {
    const response = await getUserCount();
    if (response.code === 200) {
      console.log(response)
      const res = response.data;
      listUserCount.value = res;
      console.log(123, listUserCount)
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

const listInfos = ref([]);

const fetchInfo = async () => {
  try {
    const response = await listInfo();
    if (response.code === 200) {
      console.log(response)
      const res = response.data;
      listInfos.value = res;
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

// 订单数据
const orders = ref([]);

// 分页改变时获取文章
const fetchOrder = async (limit = 6) => {
  try {
    const response = await listByPage(limit);
    if (response.code === 200) {
      console.log(response)
      const res = response.data;
      orders.value = res.list;
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

</script>



<style>
/* 样式 */
.gradient-total-sales {
  background: linear-gradient(to right, #ff9a9e, #fad0c4);
  color: #fff;
}

.gradient-today-sales {
  background: linear-gradient(to right, #a1c4fd, #c2e9fb);
  color: #fff;
}

.gradient-user-count {
  background: linear-gradient(to right, #b6d66c, #85d18f);
  color: #fff;
}

.gradient-new-orders {
  background: linear-gradient(to right, #f9d423, #ff4e50);
  color: #fff;
}

.recent-orders, .user-list {
  margin-top: 20px;
}
/* 
.el-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-card__header {
  background-color: #f3f4f6;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
}

.el-card__body {
  padding: 20px;
}

.el-table {
  border-radius: 10px;
} */

</style>  