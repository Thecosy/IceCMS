<template>
  <div class="main-content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="font-medium">公告设置</span>
          <div class="right-menu">
            <el-button type="primary" @click="openAddDialog">
              <el-icon class="mr-5"><Plus /></el-icon>新建公告
            </el-button>
          </div>
        </div>
      </template>

      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="announcementsList"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" min-width="150" />
        <el-table-column prop="content" label="内容" min-width="200" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column label="状态" width="130">
          <template #default="scope">
            <el-switch
              :model-value="getActiveStatus(scope.row.isActive) === 0"
              @change="(val) => handleStatusChange(scope.row, val)"
              :active-value="true"
              :inactive-value="false"
              active-text="已启用"
              inactive-text="已停用"
              inline-prompt
              :style="switchStyle"
            />
          </template>
        </el-table-column>
        <el-table-column prop="created" label="创建时间" width="180" />
        <el-table-column prop="updated" label="更新时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑公告' : '新建公告'"
      width="650px"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="announcement-form"
      >
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入公告标题" />
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="6"
            placeholder="请输入公告内容"
          />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="状态" prop="isActive">
          <el-switch
            v-model="switchValue"
            @change="handleSwitchChange"
            active-text="已启用"
            inactive-text="已停用"
            inline-prompt
            :style="switchStyle"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import {
  getAnnouncementslist,
  newAnnouncements,
  deleteAnnouncements,
  updateAnnouncements
} from "@/api/setting/announcements";

// 定义公告类型接口
interface Announcement {
  id?: number;
  title: string;
  content: string;
  author: string;
  isActive: number | null;
  created?: string;
  updated?: string;
}

// 表格加载状态
const loading = ref(false);

// 公告列表
const announcementsList = ref<Announcement[]>([]);

// 是否初始化完成的标志
const initialized = ref(false);

// 弹窗控制
const dialogVisible = ref(false);
const isEdit = ref(false);
const formRef = ref();

// 开关样式
const switchStyle = computed(() => {
  return {
    "--el-switch-on-color": "#13ce66",
    "--el-switch-off-color": "#ff4949"
  };
});

// 获取活动状态，处理null值
const getActiveStatus = (status: number | null): number => {
  return status === null ? 0 : status;
};

// 表单数据
const form = reactive<Announcement>({
  title: "",
  content: "",
  author: "管理员",
  isActive: 0  // 默认启用（0表示启用）
});

// 开关值（用于表单中的开关）
const switchValue = ref(true);

// 处理表单中的开关变化
const handleSwitchChange = (val: boolean) => {
  form.isActive = val ? 0 : 1;
};

// 表单验证规则
const rules = {
  title: [{ required: true, message: "请输入公告标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入公告内容", trigger: "blur" }],
  author: [{ required: true, message: "请输入作者", trigger: "blur" }]
};

// 获取公告列表
const fetchAnnouncementsList = async () => {
  loading.value = true;
  try {
    const res = await getAnnouncementslist();
    if (res.code === 200) {
      announcementsList.value = res.data;
      console.log("获取到的公告列表:", JSON.stringify(announcementsList.value));
      // 数据加载完成后设置初始化标志
      setTimeout(() => {
        initialized.value = true;
      }, 500);
    } else {
      ElMessage.error(res.msg || "获取公告列表失败");
    }
  } catch (error) {
    console.error("获取公告列表出错:", error);
    ElMessage.error("获取公告列表失败");
  } finally {
    loading.value = false;
  }
};

// 打开添加弹窗
const openAddDialog = () => {
  isEdit.value = false;
  Object.assign(form, {
    title: "",
    content: "",
    author: "管理员",
    isActive: 0  // 默认启用（0表示启用）
  });
  switchValue.value = true;  // 开关默认开启
  dialogVisible.value = true;
};

// 处理编辑
const handleEdit = (row: Announcement) => {
  isEdit.value = true;
  Object.assign(form, { ...row });
  switchValue.value = getActiveStatus(form.isActive) === 0;  // 0表示启用，对应开关为true
  dialogVisible.value = true;
};

// 处理删除
const handleDelete = (row: Announcement) => {
  ElMessageBox.confirm("确定要删除该公告吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const res = await deleteAnnouncements(row.id);
        if (res.code === 200) {
          ElMessage.success("删除成功");
          fetchAnnouncementsList();
        } else {
          ElMessage.error(res.msg || "删除失败");
        }
      } catch (error) {
        console.error("删除公告出错:", error);
        ElMessage.error("删除失败");
      }
    })
    .catch(() => {});
};

// 处理状态变更
const handleStatusChange = async (row: Announcement, newValue: boolean | string | number) => {
  // 如果还没有初始化完成，不执行更新操作
  if (!initialized.value) return;

  // 将布尔值转换为整数（修正转换逻辑）
  const newStatus = newValue === true ? 0 : 1;

  console.log("状态变更前:", JSON.stringify(row));

  // 更新行数据
  row.isActive = newStatus;

  console.log("状态变更后:", JSON.stringify(row));
  console.log("发送到后端的数据:", JSON.stringify({ ...row, id: row.id }));

  try {
    const res = await updateAnnouncements(row.id, row);
    console.log("后端响应:", JSON.stringify(res));
    if (res.code === 200) {
      ElMessage.success("状态更新成功");
    } else {
      // 如果失败，回滚状态
      row.isActive = newStatus === 0 ? 1 : 0;
      ElMessage.error(res.msg || "状态更新失败");
    }
  } catch (error) {
    // 如果出错，回滚状态
    row.isActive = newStatus === 0 ? 1 : 0;
    console.error("更新公告状态出错:", error);
    ElMessage.error("状态更新失败");
  }
};

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        let res;
        if (isEdit.value) {
          res = await updateAnnouncements(form.id, form);
        } else {
          res = await newAnnouncements(form);
        }

        if (res.code === 200) {
          ElMessage.success(isEdit.value ? "更新成功" : "添加成功");
          dialogVisible.value = false;
          fetchAnnouncementsList();
        } else {
          ElMessage.error(res.msg || (isEdit.value ? "更新失败" : "添加失败"));
        }
      } catch (error) {
        console.error(isEdit.value ? "更新公告出错:" : "添加公告出错:", error);
        ElMessage.error(isEdit.value ? "更新失败" : "添加失败");
      }
    }
  });
};

// 页面加载时获取数据
onMounted(() => {
  fetchAnnouncementsList();
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

.announcement-form {
  max-width: 100%;
}

.status-switch {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.switch-label {
  font-size: 13px;
  color: #606266;
}
</style>
