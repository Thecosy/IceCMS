<template>
  <div class="main-content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="font-medium">通知管理</span>
          <div class="right-menu">
            <el-button type="primary" @click="openAddDialog">
              <el-icon class="mr-5"><Plus /></el-icon>新建通知
            </el-button>
          </div>
        </div>
      </template>

      <!-- 搜索区域 -->
      <div class="search-container mb-20">
        <el-form :inline="true" :model="searchForm" class="search-form">
          <el-form-item label="通知类型">
            <el-select v-model="searchForm.type" placeholder="全部类型" clearable>
              <el-option label="系统通知" :value="1" />
              <el-option label="用户通知" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="通知状态">
            <el-select v-model="searchForm.status" placeholder="全部状态" clearable>
              <el-option label="草稿" :value="0" />
              <el-option label="已发送" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="notificationList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" min-width="150" />
        <el-table-column prop="type" label="类型" width="120">
          <template #default="scope">
            <el-tag v-if="scope.row.type === 1" type="success">系统通知</el-tag>
            <el-tag v-else-if="scope.row.type === 2" type="info">用户通知</el-tag>
            <el-tag v-else type="info">未知类型</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="receiverId" label="接收者" width="120">
          <template #default="scope">
            <span v-if="scope.row.receiverId === 0">全部用户</span>
            <span v-else>用户ID: {{ scope.row.receiverId }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="success">已发送</el-tag>
            <el-tag v-else type="info">未知状态</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="scope">
            <el-button v-if="scope.row.status === 0" type="success" size="small" @click="handleSend(scope.row)">发送</el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑通知' : '新建通知'"
      width="650px"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="notification-form"
      >
        <el-form-item label="通知标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入通知标题" />
        </el-form-item>
        <el-form-item label="通知类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择通知类型" style="width: 100%">
            <el-option label="系统通知" :value="1" />
            <el-option label="用户通知" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="接收者" prop="receiverId">
          <el-input-number
            v-model="form.receiverId"
            :min="0"
            controls-position="right"
            placeholder="0表示全部用户"
            style="width: 100%"
          />
          <div class="text-gray-500 text-sm mt-1">0表示发送给所有用户，其他数字表示特定用户ID</div>
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="6"
            placeholder="请输入通知内容"
          />
        </el-form-item>
        <el-form-item label="发送者" prop="sender">
          <el-input v-model="form.sender" placeholder="请输入发送者" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button v-if="!isEdit || form.status === 0" type="success" @click="submitAndSend">保存并发送</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import {
  getNotificationList,
  addNotification,
  updateNotification,
  deleteNotification,
  sendNotification,
  batchDeleteNotification
} from "@/api/setting/notification";

// 定义通知类型接口
interface Notification {
  id?: number;
  title: string;
  content: string;
  type: number;
  receiverId: number;
  isRead?: number;
  createTime?: string;
  updateTime?: string;
  sender: string;
  status?: number;
}

// 表格加载状态
const loading = ref(false);

// 分页参数
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 通知列表
const notificationList = ref<Notification[]>([]);

// 搜索表单
const searchForm = reactive({
  type: null,
  status: null
});

// 选中的行
const selectedRows = ref<Notification[]>([]);

// 弹窗控制
const dialogVisible = ref(false);
const isEdit = ref(false);
const formRef = ref();

// 表单数据
const form = reactive<Notification>({
  title: "",
  content: "",
  type: 1,
  receiverId: 0,
  sender: "管理员"
});

// 表单验证规则
const rules = {
  title: [{ required: true, message: "请输入通知标题", trigger: "blur" }],
  type: [{ required: true, message: "请选择通知类型", trigger: "change" }],
  content: [{ required: true, message: "请输入通知内容", trigger: "blur" }],
  sender: [{ required: true, message: "请输入发送者", trigger: "blur" }]
};

// 获取通知列表
const fetchNotificationList = async () => {
  loading.value = true;
  try {
    const params = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      type: searchForm.type,
      status: searchForm.status
    };

    const res = await getNotificationList(params);
    if (res.code === 200) {
      // 使用类型断言处理分页数据
      const pageData = res.data as any;
      notificationList.value = pageData.records || [];
      total.value = pageData.total || 0;
    } else {
      ElMessage.error(res.msg || "获取通知列表失败");
    }
  } catch (error) {
    console.error("获取通知列表出错:", error);
    ElMessage.error("获取通知列表失败");
  } finally {
    loading.value = false;
  }
};

// 搜索
const handleSearch = () => {
  currentPage.value = 1;
  fetchNotificationList();
};

// 重置搜索
const resetSearch = () => {
  searchForm.type = null;
  searchForm.status = null;
  handleSearch();
};

// 处理分页大小变化
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  fetchNotificationList();
};

// 处理页码变化
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchNotificationList();
};

// 处理多选变化
const handleSelectionChange = (rows: Notification[]) => {
  selectedRows.value = rows;
};

// 打开添加弹窗
const openAddDialog = () => {
  isEdit.value = false;
  Object.assign(form, {
    title: "",
    content: "",
    type: 1,
    receiverId: 0,
    sender: "管理员"
  });
  dialogVisible.value = true;
};

// 处理编辑
const handleEdit = (row: Notification) => {
  isEdit.value = true;
  Object.assign(form, { ...row });
  dialogVisible.value = true;
};

// 处理删除
const handleDelete = (row: Notification) => {
  ElMessageBox.confirm("确定要删除该通知吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const res = await deleteNotification(row.id);
        if (res.code === 200) {
          ElMessage.success("删除成功");
          fetchNotificationList();
        } else {
          ElMessage.error(res.msg || "删除失败");
        }
      } catch (error) {
        console.error("删除通知出错:", error);
        ElMessage.error("删除失败");
      }
    })
    .catch(() => {});
};

// 处理发送
const handleSend = (row: Notification) => {
  ElMessageBox.confirm("确定要发送该通知吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "info"
  })
    .then(async () => {
      try {
        const res = await sendNotification(row.id);
        if (res.code === 200) {
          ElMessage.success("发送成功");
          fetchNotificationList();
        } else {
          ElMessage.error(res.msg || "发送失败");
        }
      } catch (error) {
        console.error("发送通知出错:", error);
        ElMessage.error("发送失败");
      }
    })
    .catch(() => {});
};

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        let res;
        if (isEdit.value) {
          res = await updateNotification(form);
        } else {
          res = await addNotification(form);
        }

        if (res.code === 200) {
          ElMessage.success(isEdit.value ? "更新成功" : "添加成功");
          dialogVisible.value = false;
          fetchNotificationList();
        } else {
          ElMessage.error(res.msg || (isEdit.value ? "更新失败" : "添加失败"));
        }
      } catch (error) {
        console.error(isEdit.value ? "更新通知出错:" : "添加通知出错:", error);
        ElMessage.error(isEdit.value ? "更新失败" : "添加失败");
      }
    }
  });
};

// 保存并发送
const submitAndSend = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        // 设置状态为已发送
        form.status = 1;

        let res;
        if (isEdit.value) {
          res = await updateNotification(form);
        } else {
          res = await addNotification(form);
        }

        if (res.code === 200) {
          ElMessage.success(isEdit.value ? "更新并发送成功" : "添加并发送成功");
          dialogVisible.value = false;
          fetchNotificationList();
        } else {
          ElMessage.error(res.msg || (isEdit.value ? "更新失败" : "添加失败"));
        }
      } catch (error) {
        console.error(isEdit.value ? "更新通知出错:" : "添加通知出错:", error);
        ElMessage.error(isEdit.value ? "更新失败" : "添加失败");
      }
    }
  });
};

// 页面加载时获取数据
onMounted(() => {
  fetchNotificationList();
});
</script>

<style scoped>
.main-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-container {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.notification-form {
  max-width: 100%;
}
</style>
