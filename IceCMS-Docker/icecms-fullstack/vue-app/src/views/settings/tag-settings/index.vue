<template>
  <el-card shadow="hover" class="tag-management">
    <template #header>
      <div class="card-header">
        <el-row align="middle" justify="space-between">
          <el-col :span="12">
            <h3><el-icon><el-icon-collection-tag /></el-icon> 标签管理</h3>
          </el-col>
          <el-col :span="12" class="header-right">
            <el-button type="primary" size="small" @click="showAddTagDialog">
              <el-icon><el-icon-plus /></el-icon> 新建标签
            </el-button>
          </el-col>
        </el-row>
      </div>
    </template>

    <!-- 标签过滤和搜索 -->
    <div class="filter-section">
      <el-input
        v-model="searchQuery"
        placeholder="搜索标签"
        class="search-input"
        clearable
        prefix-icon="el-icon-search"
        @input="filterTags"
      />
      <el-select v-model="colorFilter" placeholder="按颜色筛选" clearable @change="filterTags" class="color-filter">
        <el-option
          v-for="color in availableColors"
          :key="color.value"
          :label="color.label"
          :value="color.value"
        >
          <div class="color-option">
            <div class="color-preview" :style="{ backgroundColor: color.value }"></div>
            <span>{{ color.label }}</span>
          </div>
        </el-option>
      </el-select>
    </div>

    <!-- 标签展示区域 -->
    <div v-if="filteredTags.length > 0" class="tag-container">
      <el-empty v-if="filteredTags.length === 0" description="没有找到标签" />
      <transition-group name="tag-list" tag="div" class="tag-list">
        <el-tag
          v-for="tag in filteredTags"
          :key="tag.id"
          closable
          :disable-transitions="false"
          @close="confirmRemoveTag(tag)"
          class="tag-item"
          :effect="tag.effect || 'light'"
          :color="tag.color"
          :style="getTagStyle(tag)"
          @click="editTag(tag)"
        >
          {{ tag.tagName }}
        </el-tag>
      </transition-group>
    </div>
    <el-empty v-else description="暂无标签，请添加新标签" />

    <!-- 添加/编辑标签对话框 -->
    <el-dialog
      v-model="tagDialogVisible"
      :title="isEditMode ? '编辑标签' : '添加新标签'"
      width="500px"
      destroy-on-close
    >
      <el-form :model="tagForm" label-width="80px" :rules="tagRules" ref="tagFormRef">
        <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="tagForm.tagName" placeholder="请输入标签名称" />
        </el-form-item>
        <el-form-item label="标签颜色">
          <el-color-picker v-model="tagForm.color" show-alpha />
          <div class="preset-colors">
            <div
              v-for="(color, index) in presetColors"
              :key="index"
              class="color-box"
              :style="{ backgroundColor: color }"
              @click="tagForm.color = color"
            ></div>
          </div>
        </el-form-item>
        <el-form-item label="标签样式">
          <el-radio-group v-model="tagForm.effect">
            <el-radio label="dark">深色</el-radio>
            <el-radio label="light">浅色</el-radio>
            <el-radio label="plain">朴素</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="tagDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitTagForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getAllTag, setSTag, deleteSTag, updateSTag } from '@/api/setting/tag'; // 添加updateSTag引用

// 标签数据
const tags = ref([]);
const searchQuery = ref('');
const colorFilter = ref('');
const tagDialogVisible = ref(false);
const isEditMode = ref(false);
const tagFormRef = ref(null);

// 预设颜色
const presetColors = [
  '#409EFF', // 蓝色
  '#67C23A', // 绿色
  '#E6A23C', // 黄色
  '#F56C6C', // 红色
  '#909399', // 灰色
  '#8E44AD', // 紫色
  '#16A085', // 青色
  '#FF9800', // 橙色
  '#795548', // 棕色
  '#607D8B'  // 蓝灰色
];

// 可用的颜色选项
const availableColors = [
  { label: '蓝色', value: '#409EFF' },
  { label: '绿色', value: '#67C23A' },
  { label: '黄色', value: '#E6A23C' },
  { label: '红色', value: '#F56C6C' },
  { label: '灰色', value: '#909399' },
  { label: '紫色', value: '#8E44AD' },
  { label: '青色', value: '#16A085' },
  { label: '橙色', value: '#FF9800' },
  { label: '棕色', value: '#795548' },
  { label: '蓝灰色', value: '#607D8B' }
];

// 标签表单
const tagForm = reactive({
  id: null,
  tagName: '',
  color: presetColors[0],
  effect: 'light'
});

// 表单验证规则
const tagRules = {
  tagName: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
  ]
};

// 过滤后的标签列表
const filteredTags = computed(() => {
  return tags.value.filter(tag => {
    const matchesSearch = searchQuery.value ? tag.tagName.toLowerCase().includes(searchQuery.value.toLowerCase()) : true;
    const matchesColor = colorFilter.value ? tag.color === colorFilter.value : true;
    return matchesSearch && matchesColor;
  });
});

// 获取所有标签
const fetchTags = async () => {
  try {
    const response = await getAllTag();
    if (response.code === 200 && response.data) {
      // 遍历每个标签并添加颜色和样式
      tags.value = response.data.map(tag => ({
        ...tag,
        color: tag.color || getRandomColor(),
        effect: tag.effect || 'light'
      }));
    }
  } catch (error) {
    console.error('获取标签失败:', error);
    ElMessage.error('获取标签失败');
  }
};

// 显示添加标签对话框
const showAddTagDialog = () => {
  isEditMode.value = false;
  tagForm.id = null;
  tagForm.tagName = '';
  tagForm.color = presetColors[0];
  tagForm.effect = 'light';
  tagDialogVisible.value = true;
};

// 编辑标签
const editTag = (tag) => {
  isEditMode.value = true;
  tagForm.id = tag.id;
  tagForm.tagName = tag.tagName;
  tagForm.color = tag.color;
  tagForm.effect = tag.effect || 'light';
  tagDialogVisible.value = true;
};

// 提交标签表单
const submitTagForm = async () => {
  if (!tagFormRef.value) return;

  await tagFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (isEditMode.value) {
          // 更新标签
          await updateSTag({
            id: tagForm.id,
            tagName: tagForm.tagName,
            color: tagForm.color,
            effect: tagForm.effect
          });
          ElMessage.success('标签更新成功');
        } else {
          // 添加标签
          await setSTag({
            tagName: tagForm.tagName,
            color: tagForm.color,
            effect: tagForm.effect
          });
          ElMessage.success('标签添加成功');
        }
        tagDialogVisible.value = false;
        fetchTags(); // 重新获取标签
      } catch (error) {
        console.error('保存标签失败:', error);
        ElMessage.error('保存标签失败');
      }
    }
  });
};

// 确认删除标签
const confirmRemoveTag = (tag) => {
  ElMessageBox.confirm(`确定要删除标签 "${tag.tagName}" 吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    removeTag(tag);
  }).catch(() => {});
};

// 删除标签
const removeTag = async (tag) => {
  try {
    await deleteSTag(tag.id);
    ElMessage.success('标签删除成功');
    fetchTags(); // 重新获取标签
  } catch (error) {
    console.error('删除标签失败:', error);
    ElMessage.error('删除标签失败');
  }
};

// 过滤标签
const filterTags = () => {
  // 通过计算属性自动过滤
};

// 获取随机颜色
const getRandomColor = () => {
  return presetColors[Math.floor(Math.random() * presetColors.length)];
};

// 获取标签样式
const getTagStyle = (tag) => {
  if (tag.effect === 'light') {
    // 浅色模式：背景色为颜色的浅色版本，文字为深色
    return {
      backgroundColor: tag.color + '33', // 添加透明度
      color: tag.color,
      borderColor: tag.color
    };
  } else if (tag.effect === 'dark') {
    // 深色模式：背景色为颜色，文字为白色
    return {
      backgroundColor: tag.color,
      color: '#ffffff',
      borderColor: tag.color
    };
  } else {
    // 朴素模式：背景为透明，边框和文字为颜色
    return {
      backgroundColor: 'transparent',
      color: tag.color,
      borderColor: tag.color
    };
  }
};

// 页面挂载时获取标签
onMounted(fetchTags);
</script>

<style scoped>
.tag-management {
  margin: 20px;
}

.card-header {
  padding: 0;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-right {
  display: flex;
  justify-content: flex-end;
}

.filter-section {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.search-input {
  width: 250px;
}

.color-filter {
  width: 150px;
}

.color-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-preview {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.tag-container {
  margin-top: 20px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-item {
  margin: 5px 0;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.tag-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preset-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.color-box {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  transition: transform 0.2s;
}

.color-box:hover {
  transform: scale(1.1);
}

/* 标签动画效果 */
.tag-list-enter-active,
.tag-list-leave-active {
  transition: all 0.3s ease;
}

.tag-list-enter-from,
.tag-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.tag-list-move {
  transition: transform 0.3s ease;
}
</style>
