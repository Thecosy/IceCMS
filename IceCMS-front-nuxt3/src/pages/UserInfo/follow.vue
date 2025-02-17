<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { GetUserFollowList } from '../../../api/user';
// const followList = ref<any[]>([]);  // 存储关注的用户列表
const isLoading = ref<boolean>(true);  // 控制加载状态
// 模拟的关注列表数据
const followList = [
  {
    userid: 'user001',
    name: '张三',
    profile: 'https://randomuser.me/api/portraits/men/1.jpg',  // 头像
    intro: '爱好编程，喜欢探索新技术',
  },
  {
    userid: 'user002',
    name: '李四',
    profile: 'https://randomuser.me/api/portraits/men/2.jpg',
    intro: '前端开发工程师，热爱开源',
  },
  {
    userid: 'user003',
    name: '王五',
    profile: 'https://randomuser.me/api/portraits/men/3.jpg',
    intro: '全栈开发者，喜欢分享技术文章',
  },
  {
    userid: 'user004',
    name: '赵六',
    profile: 'https://randomuser.me/api/portraits/men/4.jpg',
    intro: '后端开发，Java和Python的忠实粉丝',
  },
  {
    userid: 'user005',
    name: '孙七',
    profile: 'https://randomuser.me/api/portraits/men/5.jpg',
    intro: '移动开发，Android开发者，爱旅游',
  },
];
// 获取用户的关注列表
async function getFollowList() {
//   try {
//     if (userStore.userid) {
//       const result = await GetUserFollowList(userStore.userid);  // API 调用获取关注列表
//       followList.value = result.data || [];
//     } else {
//       console.error('用户未登录');
//     }
//   } catch (error) {
//     console.error('获取关注列表失败:', error);
//   } finally {
//     isLoading.value = false;
//   }
}

// 取消关注
async function handleUnfollow(followUserId: string) {
  try {
    const result = await axios.post('/api/user/unfollow', {
      userId: userStore.userid,
      followUserId
    });

    if (result.data.code === 200) {
      // 取消成功，重新获取关注列表
      followList.value = followList.value.filter(f => f.userid !== followUserId);
      this.$notify({
        title: '成功',
        message: '取消关注成功',
        type: 'success',
        offset: 50
      });
    } else {
      this.$notify({
        title: '失败',
        message: '取消关注失败',
        type: 'error',
        offset: 50
      });
    }
  } catch (error) {
    console.error('取消关注失败:', error);
    this.$notify({
      title: '错误',
      message: '取消关注时发生错误',
      type: 'error',
      offset: 50
    });
  }
}

// 组件加载时调用
onMounted(() => {
//   getFollowList();
});
</script>

<template>
  <div class="follow-list home">
    <h2>我的关注</h2>
    <el-row >
      <el-col :span="8" v-for="follow in followList" :key="follow.userid">
        <el-card class="user-card" shadow="hover">
          <div class="user-info">
            <img :src="follow.profile" alt="头像" class="avatar" />
            <div class="user-details">
              <p class="username">{{ follow.name }}</p>
              <p class="intro">{{ follow.intro || '暂无简介' }}</p>
              <el-button @click="goToProfile(follow.userid)" type="text" size="small">查看个人主页</el-button>
            </div>
          </div>
          <el-button @click="handleUnfollow(follow.userid)" type="danger" size="small" class="unfollow-btn">取消关注</el-button>
        </el-card>
      </el-col>
    </el-row>

    <!-- <p v-if="!followList.length && !isLoading" class="no-follow-msg">您还没有关注任何人。</p> -->
  </div>
</template>

<style scoped>
.follow-list {
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
}

.user-card {
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-details {
  flex-grow: 1;
}

.username {
  font-weight: bold;
  margin: 5px 0;
}

.intro {
  color: #888;
  font-size: 14px;
}

.no-follow-msg {
  text-align: center;
  color: #888;
}

.unfollow-btn {
  width: 100%;
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