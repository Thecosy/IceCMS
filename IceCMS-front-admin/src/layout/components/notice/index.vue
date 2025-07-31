<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { noticesData } from "./data";
import NoticeList from "./noticeList.vue";
import Bell from "@iconify-icons/ep/bell";
import { getUnreadNotifications, markAllNotificationsAsRead } from "@/api/setting/notification";
import { ElMessage } from "element-plus";

// 定义通知类型接口
interface NotificationItem {
  id: number;
  title: string;
  content: string;
  type: number;
  receiverId: number;
  isRead: number;
  createTime: string;
  updateTime: string;
  sender: string;
  status: number;
}

// 通知数据
const notices = ref(noticesData);
// 活动标签页
const activeKey = ref(noticesData[0].key);
// 未读通知数量
const noticesNum = computed(() => {
  let count = 0;
  notices.value.forEach(tab => {
    count += tab.list.length;
  });
  return count;
});

// 获取未读通知
const fetchUnreadNotifications = async () => {
  try {
    const res = await getUnreadNotifications();
    if (res.code === 200 && res.data) {
      // 使用类型断言
      const notificationData = res.data as NotificationItem[];

      // 转换通知数据为组件需要的格式
      const systemNotifications = notificationData
        .filter(item => item.type === 1)
        .map(item => ({
          avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
          title: item.title,
          description: item.content,
          datetime: formatDateTime(item.createTime),
          type: "1",
          id: item.id
        }));

      const userNotifications = notificationData
        .filter(item => item.type === 2)
        .map(item => ({
          avatar: "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
          title: item.title,
          description: item.content,
          datetime: formatDateTime(item.createTime),
          type: "2",
          id: item.id
        }));

      // 更新通知数据
      notices.value[0].list = systemNotifications;
      notices.value[1].list = userNotifications;
    }
  } catch (error) {
    console.error("获取未读通知失败:", error);
  }
};

// 格式化日期时间
const formatDateTime = (dateTimeStr: string): string => {
  if (!dateTimeStr) return '';

  const date = new Date(dateTimeStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  // 小于1小时，显示"xx分钟前"
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes}分钟前`;
  }

  // 小于24小时，显示"xx小时前"
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours}小时前`;
  }

  // 小于30天，显示"xx天前"
  if (diff < 30 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days}天前`;
  }

  // 大于30天，显示具体日期
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 标记所有通知为已读
const handleReadAll = async () => {
  try {
    const res = await markAllNotificationsAsRead();
    if (res.code === 200) {
      ElMessage.success("已全部标记为已读");
      // 清空通知列表
      notices.value.forEach(tab => {
        tab.list = [];
      });
    } else {
      ElMessage.error(res.msg || "操作失败");
    }
  } catch (error) {
    console.error("标记已读失败:", error);
    ElMessage.error("操作失败");
  }
};

// 处理单个通知标记为已读
const handleNoticeRead = (id: number) => {
  // 从通知列表中移除已读通知
  notices.value.forEach(tab => {
    tab.list = tab.list.filter(item => item.id !== id);
  });
};

// 页面加载时获取未读通知
onMounted(() => {
  fetchUnreadNotifications();
});
</script>

<template>
  <el-dropdown trigger="click" placement="bottom-end">
    <span class="dropdown-badge navbar-bg-hover select-none">
      <el-badge :value="noticesNum" :max="99" :hidden="noticesNum === 0">
        <span class="header-notice-icon">
          <IconifyIconOffline :icon="Bell" />
        </span>
      </el-badge>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <div class="notice-header">
          <span class="notice-title">通知中心</span>
          <span v-if="noticesNum > 0" class="notice-read-all" @click="handleReadAll">全部已读</span>
        </div>
        <el-tabs
          v-model="activeKey"
          :stretch="true"
          class="dropdown-tabs"
          :style="{ width: notices.length === 0 ? '200px' : '330px' }"
        >
          <el-empty
            v-if="noticesNum === 0"
            description="暂无消息"
            :image-size="60"
          />
          <span v-else>
            <template v-for="item in notices" :key="item.key">
              <el-tab-pane
                :label="`${item.name}(${item.list.length})`"
                :name="`${item.key}`"
              >
                <el-scrollbar max-height="330px">
                  <div class="noticeList-container">
                    <NoticeList :list="item.list" @read="handleNoticeRead" />
                  </div>
                </el-scrollbar>
              </el-tab-pane>
            </template>
          </span>
        </el-tabs>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.dropdown-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 48px;
  margin-right: 10px;
  cursor: pointer;

  .header-notice-icon {
    font-size: 18px;
  }
}

.dropdown-tabs {
  .noticeList-container {
    padding: 15px 24px 0;
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs__nav-wrap)::after {
    height: 1px;
  }

  :deep(.el-tabs__nav-wrap) {
    padding: 0 36px;
  }
}

.notice-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;

  .notice-title {
    font-size: 14px;
    font-weight: 500;
  }

  .notice-read-all {
    font-size: 12px;
    color: #1890ff;
    cursor: pointer;

    &:hover {
      color: #40a9ff;
    }
  }
}
</style>
