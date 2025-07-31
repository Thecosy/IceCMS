<template>
    <div class="admin-info-container">
    <div class="page-header">
      <h1 class="page-title">个人中心</h1>
      <el-button type="primary" icon="Refresh" circle @click="refreshUserInfo" class="refresh-btn"></el-button>
    </div>

    <div class="admin-info-content">
      <!-- 左侧用户信息卡片 -->
      <el-card class="user-card" shadow="hover" v-if="!loading && !error">
        <div class="user-card-content">
          <div class="avatar-container">
            <el-avatar :size="120" :src="userInfo.profile || defaultAvatar" class="user-avatar"></el-avatar>
            <div class="user-status">
              <el-tag :type="userInfo.status === '正常' ? 'success' : 'danger'" effect="dark" class="status-tag">
                {{ userInfo.status }}
              </el-tag>
            </div>
          </div>

          <h2 class="username">{{ userInfo.username || '未知用户' }}</h2>
          <p class="user-name">{{ userInfo.name || '未设置姓名' }}</p>

          <div class="user-roles" v-if="userRoles.length > 0">
            <el-tag v-for="(role, index) in userRoles" :key="index" type="info" class="role-tag" effect="plain">
              {{ role }}
            </el-tag>
          </div>

          <div class="user-stats">
            <div class="stat-item">
              <div class="stat-value">{{ userInfo.integral || '0' }}</div>
              <div class="stat-label">积分</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-value">{{ userInfo.userage || '0' }}</div>
              <div class="stat-label">年龄</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-value">{{ userInfo.gender || '未知' }}</div>
              <div class="stat-label">性别</div>
            </div>
          </div>

          <div class="action-buttons">
            <el-button type="primary" @click="editUser" icon="Edit">编辑信息</el-button>
            <el-button type="warning" @click="changePassword" icon="Lock">修改密码</el-button>
          </div>
        </div>
      </el-card>

      <!-- 右侧详细信息 -->
      <div class="detail-section">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="10" animated />
        </div>

        <!-- 错误提示 -->
        <div v-else-if="error" class="error-container">
          <el-result
            icon="error"
            title="获取用户信息失败"
            :sub-title="error"
          >
            <template #extra>
              <el-button type="primary" @click="fetchUserInfo">重新获取</el-button>
            </template>
          </el-result>
        </div>

        <!-- 详细信息卡片 -->
        <el-card v-else class="detail-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>

          <el-descriptions :column="1" border>
            <el-descriptions-item label="用户ID">
              <el-tag type="info" effect="plain">{{ userInfo.userId || '无' }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="电子邮箱">
              <div class="info-item">
                <i class="el-icon-message"></i>
                {{ userInfo.email || '未设置邮箱' }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="联系电话">
              <div class="info-item">
                <i class="el-icon-phone"></i>
                {{ userInfo.phone || '未设置电话' }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="账号创建时间">
              <div class="info-item">
                <i class="el-icon-time"></i>
                {{ userInfo.createTime || '无记录' }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="最后登录时间">
              <div class="info-item">
                <i class="el-icon-time"></i>
                {{ new Date(userInfo.lastLogin).toLocaleString() || '无记录' }}
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card class="detail-card vip-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>会员信息</span>
              <el-tag type="warning" effect="dark">VIP</el-tag>
            </div>
          </template>

          <div class="vip-info">
            <div class="vip-dates">
              <div class="vip-date-item">
                <div class="date-label">开始日期</div>
                <div class="date-value">{{ userInfo.vipValidDate ? new Date(userInfo.vipValidDate).toLocaleDateString() : '未开通' }}</div>
              </div>
              <div class="vip-date-arrow">→</div>
              <div class="vip-date-item">
                <div class="date-label">到期日期</div>
                <div class="date-value">{{ userInfo.vipExpireDate ? new Date(userInfo.vipExpireDate).toLocaleDateString() : '未开通' }}</div>
              </div>
            </div>

            <el-progress
              :percentage="calculateVipPercentage()"
              :status="isVipActive() ? 'success' : 'exception'"
              :format="formatVipProgress"
              :stroke-width="15"
              class="vip-progress"
            ></el-progress>
          </div>
        </el-card>

        <el-card class="detail-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>个人简介</span>
            </div>
          </template>

          <div class="intro-content">
            <el-empty v-if="!userInfo.intro" description="暂无个人简介"></el-empty>
            <p v-else class="intro-text">{{ userInfo.intro }}</p>
          </div>
        </el-card>

        <el-card class="detail-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>头像预览</span>
            </div>
          </template>

          <div class="avatar-preview-container">
            <el-image
              :src="userInfo.profile || defaultAvatar"
              fit="cover"
              :preview-src-list="userInfo.profile ? [userInfo.profile] : []"
              class="avatar-preview-image"
            ></el-image>

            <div class="avatar-actions">
              <el-link type="primary" :href="userInfo.profile" target="_blank" v-if="userInfo.profile">
                <el-button type="primary" plain icon="Link">查看原图</el-button>
              </el-link>
              <el-button type="success" plain icon="Upload" @click="editUser">更换头像</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>


    <!-- 编辑用户对话框 -->
    <el-dialog v-model="editDialogVisible" title="编辑管理员信息" width="500px">
      <el-form :model="editForm" :rules="rules" ref="editFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editForm.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="保密" value="保密"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像URL">
          <el-input v-model="editForm.profile"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="editForm.intro" rows="3"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEdit">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog v-model="passwordDialogVisible" title="修改密码" width="500px">
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="100px">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="passwordForm.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" type="password" show-password></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPassword">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { GetUserInfoByid, updateUserProfileApi, updateUserPasswordApi } from '@/api/system/user';
import { ElMessage, ElNotification } from 'element-plus';
import { storageLocal } from "@pureadmin/utils";
import type { FormItemRule } from 'element-plus';

// 默认头像
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

// 用户信息
const userInfo = ref({
  userId: '',
  username: '',
  name: '',
  email: '',
  gender: '',
  status: '',
  profile: '',
  intro: '',
  phone: '',
  integral: 0,
  createTime: '',
  lastLogin: '',
  vipExpireDate: '',
  vipValidDate: '',
  userage: '',
});

// 用户角色
const userRoles = ref([]);

// 访问令牌
const accessToken = ref('');

// 加载状态和错误信息
const loading = ref(true);
const error = ref('');

// 获取当前用户ID
const getCurrentUserId = () => {
  const userKey = "user-info";
  const userInfo = storageLocal().getItem(userKey);
  console.log("存储的用户信息:", userInfo);
  if (userInfo && typeof userInfo === 'object' && 'userId' in userInfo) {
    return userInfo.userId;
  }
  return null;
};

// 获取用户信息
const fetchUserInfo = async () => {
  const userId = getCurrentUserId();
  if (!userId) {
    error.value = '无法获取当前用户ID';
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    console.log('获取用户信息，用户ID:', userId);

         // 尝试从本地存储获取用户信息
     const userKey = "user-info";
     const storedUserInfo = storageLocal().getItem(userKey);

     if (storedUserInfo) {
       // 直接使用本地存储的用户信息
       userInfo.value = {
         userId: storedUserInfo.userId || '',
         username: storedUserInfo.username || '',
         name: storedUserInfo.username || '', // 使用username作为name
         email: '',
         gender: '',
         status: '正常', // 假设用户状态为正常
         profile: storedUserInfo.avatar || '',
         intro: '',
       };

       // 设置用户角色
       if (storedUserInfo.roles && Array.isArray(storedUserInfo.roles)) {
         userRoles.value = storedUserInfo.roles;
       }

       // 设置访问令牌
       if (storedUserInfo.accessToken) {
         accessToken.value = storedUserInfo.accessToken;
       }

       console.log('从本地存储获取的用户信息:', userInfo.value);
       console.log('用户角色:', userRoles.value);
       loading.value = false;
       return;
            }

      // 如果本地存储没有用户信息，则尝试调用API获取
      try {
        // 尝试调用API获取用户信息
        console.log('尝试调用API获取用户信息...');
        const response = await GetUserInfoByid(userId);
      console.log('API响应:', response);

      // 详细记录API响应的数据结构
      if (response && response.data) {
        console.log('API响应数据类型:', typeof response.data);
        console.log('是否为数组:', Array.isArray(response.data));
        if (Array.isArray(response.data)) {
          console.log('数组长度:', response.data.length);
          if (response.data.length > 0) {
            console.log('第一个元素:', response.data[0]);
          }
        } else {
          console.log('对象属性:', Object.keys(response.data));
        }
      }

      if (response && response.code === 200 && response.data) {
        // 尝试从API响应中提取用户数据
        let userData = {};

        if (Array.isArray(response.data)) {
          if (response.data.length > 0) {
            userData = response.data[0] || {};
          }
        } else {
          userData = response.data;
        }

        // 安全地设置用户信息
        userInfo.value = {
          userId: userData.userId || '',
          username: userData.username || '',
          name: userData.name || '',
          email: userData.email || '',
          gender: userData.gender === 0 ? '男' : userData.gender === 1 ? '女' : '保密',
          status: userData.status === 1 ? '正常' : '禁用',
          profile: userData.profile || '',
          intro: userData.intro || '这个人很懒，什么都没有留下！',
          phone: userData.phone || '',
          integral: userData.integral || 0,
          createTime: userData.createTime || '',
          lastLogin: userData.lastLogin || '',
          vipExpireDate: userData.vipExpireDate || '',
          vipValidDate: userData.vipValidDate || '',
          userage: userData.userage || '',
        };
        console.log('处理后的用户信息:', userInfo.value);
      } else {
        console.warn('API调用成功但未返回有效数据，使用本地存储的用户信息');
      }
    } catch (apiError) {
      console.error('API调用失败:', apiError);
      console.warn('使用本地存储的用户信息');
    }
  } catch (err) {
    console.error('获取用户信息出错:', err);
    error.value = '获取用户信息出错: ' + (err.message || '未知错误');
  } finally {
    loading.value = false;
  }
};

// 刷新用户信息
const refreshUserInfo = () => {
  fetchUserInfo();
};

// 计算VIP进度百分比
const calculateVipPercentage = () => {
  const validDate = userInfo.value.vipValidDate ? new Date(userInfo.value.vipValidDate).getTime() : 0;
  const expireDate = userInfo.value.vipExpireDate ? new Date(userInfo.value.vipExpireDate).getTime() : 0;
  const now = new Date().getTime();

  if (!validDate || !expireDate) return 0;

  // 如果已过期
  if (now > expireDate) return 100;

  // 计算已使用的时间占总时间的百分比
  const totalTime = expireDate - validDate;
  const usedTime = now - validDate;

  if (totalTime <= 0) return 0;

  return Math.floor((usedTime / totalTime) * 100);
};

// 格式化VIP进度条文本
const formatVipProgress = (percentage) => {
  if (isVipActive()) {
    return '会员有效';
  } else {
    return '已过期';
  }
};

// 判断VIP是否有效
const isVipActive = () => {
  const expireDate = userInfo.value.vipExpireDate ? new Date(userInfo.value.vipExpireDate).getTime() : 0;
  const now = new Date().getTime();

  return expireDate > now;
};

// 编辑用户信息相关
const editDialogVisible = ref(false);
const editFormRef = ref(null);
const editForm = ref({
  username: '',
  name: '',
  email: '',
  gender: '',
  profile: '',
  intro: '',
});

// 编辑表单验证规则
const rules = {
  email: [
    { type: 'email' as const, message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
};

// 打开编辑对话框
const editUser = () => {
  editForm.value = {
    username: userInfo.value.username || '',
    name: userInfo.value.name || '',
    email: userInfo.value.email || '',
    gender: userInfo.value.gender || '',
    profile: userInfo.value.profile || '',
    intro: userInfo.value.intro || '',
  };
  editDialogVisible.value = true;
};

// 提交编辑
const submitEdit = async () => {
  if (!editFormRef.value) return;

  await editFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const userId = getCurrentUserId();
        if (!userId) {
          ElMessage.error('无法获取当前用户ID');
          return;
        }

        const response = await updateUserProfileApi(userId, {
          nickName: editForm.value.name,
          email: editForm.value.email,
          // 其他字段根据API需求添加
        });

        if (response && response.code === 200) {
          ElNotification({
            title: '成功',
            message: '管理员信息更新成功',
            type: 'success',
          });
          editDialogVisible.value = false;
          fetchUserInfo(); // 刷新用户信息
        } else {
          ElMessage.error('更新失败: ' + (response?.msg || '未知错误'));
        }
      } catch (err) {
        console.error('更新用户信息出错:', err);
        ElMessage.error('更新出错: ' + (err.message || '未知错误'));
      }
    }
  });
};

// 修改密码相关
const passwordDialogVisible = ref(false);
const passwordFormRef = ref(null);
const passwordForm = ref({
  password: '',
  confirmPassword: '',
});

// 密码验证规则
const passwordRules = {
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

// 打开修改密码对话框
const changePassword = () => {
  passwordForm.value = {
    password: '',
    confirmPassword: '',
  };
  passwordDialogVisible.value = true;
};

// 提交密码修改
const submitPassword = async () => {
  if (!passwordFormRef.value) return;

  await passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const userId = getCurrentUserId();
        if (!userId) {
          ElMessage.error('无法获取当前用户ID');
          return;
        }

        const response = await updateUserPasswordApi({
          userId: Number(userId),
          password: passwordForm.value.password
        });

        if (response && response.code === 200) {
          ElNotification({
            title: '成功',
            message: '密码修改成功',
            type: 'success',
          });
          passwordDialogVisible.value = false;
        } else {
          ElMessage.error('密码修改失败: ' + (response?.msg || '未知错误'));
        }
      } catch (err) {
        console.error('修改密码出错:', err);
        ElMessage.error('修改密码出错: ' + (err.message || '未知错误'));
      }
    }
  });
};

// 页面加载时获取用户信息
onMounted(() => {
  fetchUserInfo();
});
</script>

<style scoped>
.admin-info-container {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.refresh-btn {
  transition: transform 0.3s;
  &:hover {
    transform: rotate(180deg);
  }
}

.admin-info-content {
  display: flex;
  gap: 30px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.user-card {
  width: 300px;
  height: fit-content;

  @media (max-width: 992px) {
    width: 100%;
  }
}

.user-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.avatar-container {
  position: relative;
  margin-bottom: 20px;
}

.user-avatar {
  border: 4px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-status {
  position: absolute;
  bottom: 0;
  right: 0;
}

.status-tag {
  border-radius: 12px;
}

.username {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 5px;
  color: #303133;
}

.user-name {
  font-size: 16px;
  color: #606266;
  margin: 0 0 15px;
}

.user-roles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.role-tag {
  margin: 0;
}

.user-stats {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
  padding: 15px 0;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: #409EFF;
}

.stat-label {
  font-size: 14px;
  color: #909399;
  margin-top: 5px;
}

.stat-divider {
  width: 1px;
  background-color: #ebeef5;
  margin: 0 15px;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  gap: 15px;
}

.detail-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.loading-container, .error-container {
  padding: 30px;
}

.detail-card {
  margin-bottom: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.vip-card {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
}

.vip-info {
  padding: 10px 0;
}

.vip-dates {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.vip-date-item {
  text-align: center;
}

.date-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.date-value {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.vip-date-arrow {
  margin: 0 20px;
  font-size: 24px;
  color: #909399;
}

.vip-progress {
  margin-top: 10px;
}

.intro-content {
  min-height: 100px;
  padding: 10px 0;
}

.intro-text {
  line-height: 1.8;
  color: #606266;
  white-space: pre-line;
}

.avatar-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.avatar-preview-image {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.avatar-actions {
  margin-top: 20px;
  display: flex;
  gap: 15px;
}

:deep(.el-descriptions__body .el-descriptions__table) {
  width: 100%;
}

:deep(.el-descriptions__label) {
  font-weight: 600;
  color: #606266;
  width: 120px;
}

:deep(.el-descriptions__content) {
  color: #303133;
}

:deep(.el-progress-bar__outer) {
  border-radius: 10px;
}

:deep(.el-progress-bar__inner) {
  border-radius: 10px;
}

:deep(.el-progress__text) {
  font-size: 14px !important;
  font-weight: 600;
}
</style>
