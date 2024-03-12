<template>
  <el-container style="height: 100vh;">
    <el-main>
      <!-- 帖子列表 -->
      <el-card class="post-table">
        <template #header>
          <div class="card-header">
            <span class="font-medium">帖子列表</span>
          </div>
        </template>
        <el-table :data="postList" style="width: 100%" stripe>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="author" label="作者"></el-table-column>
          <el-table-column prop="date" label="发布日期"></el-table-column>
        </el-table>
      </el-card>
    </el-main>
    <el-footer>
      <!-- 用户列表 -->
      <el-card class="user-table">
        <template #header>
          <div class="card-header">
            <span class="font-medium">用户列表</span>
          </div>
        </template>
        <el-table :data="userList" style="width: 100%" stripe>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="registeredDate" label="注册日期"></el-table-column>
        </el-table>
      </el-card>
    </el-footer>
  </el-container>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CommunityManagement',
  setup() {
    // 假设有帖子列表和用户列表数据
    const postList = ref([
      { title: '帖子标题1', author: '作者1', date: '2024-02-16' },
      { title: '帖子标题2', author: '作者2', date: '2024-02-15' },
      // 添加更多示例数据...
    ]);

    const userList = ref([
      { username: '用户1', email: 'user1@example.com', registeredDate: '2024-01-01' },
      { username: '用户2', email: 'user2@example.com', registeredDate: '2024-01-02' },
      // 添加更多示例数据...
    ]);

    return { postList, userList };
  }
}
</script>

<style>
.card-header {
  font-size: 18px;
  font-weight: bold;
}

.post-table, .user-table {
  margin: 20px;
}

.el-main {
  padding: 20px;
}

.el-footer {
  margin-top: auto;
}
</style>
