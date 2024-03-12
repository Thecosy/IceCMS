<template>
  <el-card shadow="never" class="tag-management">
    <template #header>
      <div class="clearfix">
        <span>标签管理</span>
      </div>
    </template>
    <el-form label-position="top" class="form-container">
      <el-form-item label="添加标签">
        <el-input v-model="newTag" placeholder="输入新标签" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="当前标签">
        <div class="tag-list">
          <el-tag v-for="tag in tags" :key="tag.id" closable @close="removeTag(tag)" class="tag-item"
            :style="{ backgroundColor: tag.color }">{{ tag.tagName }}</el-tag>
        </div>
      </el-form-item>
      <div class="button-container">
        <el-button type="primary" @click="addTag">添加</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllTag, setSTag, deleteSTag } from '@/api/setting/tag'; // 确保路径正确

const newTag = ref('');
const tags = ref('');

// 获取所有标签并为每个标签添加随机颜色
const fetchTags = async () => {
  try {
    const response = await getAllTag();
    if (response.code === 200 && response.data) {
      // 遍历每个标签并添加随机颜色
      tags.value = response.data.map(tag => ({
        ...tag,
        color: getRandomColor() // 调用 getRandomColor 函数获取随机颜色
      }));
    }
  } catch (error) {
    console.error('Error fetching tags:', error);
  }
};

// 添加标签
const addTag = async () => {
  if (newTag.value.trim() !== '') {
    try {
      await setSTag({ tagName: newTag.value.trim() });
      fetchTags(); // 重新获取标签
      newTag.value = ''; // 清空输入框
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  }
};

// 页面挂载时获取标签
onMounted(fetchTags);

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 删除标签
const removeTag = async (tagToRemove) => {
  try {
    await deleteSTag(tagToRemove.id); // 调用删除标签的 API
    fetchTags(); // 重新获取标签
  } catch (error) {
    console.error('Error deleting tag:', error);
  }
};

</script>

<style scoped>
.input-width {
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  padding: 6px 10px;
  border-radius: 15px;
  cursor: pointer;
  color: #fff;
}
</style>
