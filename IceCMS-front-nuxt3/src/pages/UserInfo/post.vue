<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { GetUserWorks } from '../../../api/user';

// const worksList = ref<any[]>([]); // 存储作品列表
const isLoading = ref<boolean>(true); // 控制加载状态
  const worksList = ref([
  {
    id: 'WORK001',
    title: '数字艺术作品一',
    description: '这是我创作的第一件数字艺术作品，表现了虚拟与现实的结合。',
    coverImage: 'https://via.placeholder.com/400x200.png?text=数字艺术作品一',
    creationDate: '2023-05-15',
    category: '数字艺术',
  },
  {
    id: 'WORK002',
    title: '插画作品二',
    description: '这幅插画展示了未来城市的景象，充满科技感。',
    coverImage: 'https://via.placeholder.com/400x200.png?text=插画作品二',
    creationDate: '2023-06-25',
    category: '插画',
  },
  {
    id: 'WORK003',
    title: '摄影作品三',
    description: '黑白摄影，展现了城市在清晨的安静氛围。',
    coverImage: 'https://via.placeholder.com/400x200.png?text=摄影作品三',
    creationDate: '2023-07-10',
    category: '摄影',
  },
  {
    id: 'WORK004',
    title: '手工艺术作品四',
    description: '我用天然木材创作的艺术品，展示了自然的美感。',
    coverImage: 'https://via.placeholder.com/400x200.png?text=手工艺术作品四',
    creationDate: '2023-08-20',
    category: '手工艺',
  },
  {
    id: 'WORK005',
    title: '油画作品五',
    description: '油画作品，描绘了乡村的宁静与温暖。',
    coverImage: 'https://via.placeholder.com/400x200.png?text=油画作品五',
    creationDate: '2023-09-05',
    category: '油画',
  },
  {
    id: 'WORK006',
    title: '雕塑作品六',
    description: '现代雕塑，传递着力量与动感的艺术语言。',
    coverImage: 'https://via.placeholder.com/400x200.png?text=雕塑作品六',
    creationDate: '2023-10-01',
    category: '雕塑',
  },
]);
// 获取用户的作品列表
async function getUserWorks() {
  // try {
  //   // 假设通过用户ID获取其所有作品
  //   const result = await GetUserWorks(); // API 调用获取用户的作品
  //   worksList.value = result.data || [];
  // } catch (error) {
  //   console.error('获取作品列表失败:', error);
  // } finally {
  //   isLoading.value = false;
  // }
}

// 组件加载时调用
onMounted(() => {
  getUserWorks();
});
</script>

<template>
  <div class="works-view home">
    <h2>我的作品</h2>
    
    <!-- 作品列表 -->
    <el-row >
      <el-col :span="8" v-for="work in worksList" :key="work.id">
        <el-card class="work-card" shadow="hover">
          <div class="work-info">
            <img :src="work.coverImage" alt="作品封面" class="work-cover" />
            <div class="work-details">
              <p class="work-title">{{ work.title }}</p>
              <p class="work-description">{{ work.description || '暂无描述' }}</p>
            </div>
          </div>
          <el-button @click="viewWorkDetails(work.id)" type="primary" size="small" class="view-btn">查看详情</el-button>
        </el-card>
      </el-col>
    </el-row>

    <!-- 没有作品时的提示信息 -->
    <!-- <p v-if="!worksList.length && !isLoading" class="no-works-msg">您还没有上传任何作品。</p> -->
  </div>
</template>

<style scoped>
.works-view {
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
}

.work-card {
  margin-bottom: 20px;
}

.work-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.work-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.work-details {
  text-align: center;
}

.work-title {
  font-weight: bold;
  margin: 10px 0;
}

.work-description {
  color: #888;
  font-size: 14px;
}

.no-works-msg {
  text-align: center;
  color: #888;
}

.view-btn {
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