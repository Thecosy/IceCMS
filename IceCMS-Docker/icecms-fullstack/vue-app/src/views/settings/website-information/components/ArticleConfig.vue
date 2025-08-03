<template>
  <el-card shadow="never" class="article-config">
    <template #header>
      <div class="clearfix">
        <span>文章管理设置</span>
      </div>
    </template>
    <el-form label-position="top" class="form-container">
      <el-form-item label="文章列表显示数量">
        <el-input-number v-model="articlesPerPage" class="input-width" :min="1" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="自动保存草稿间隔（分钟）">
        <el-input-number v-model="autoSaveInterval" class="input-width" :min="1" :max="60"></el-input-number>
      </el-form-item>
      <el-form-item label="是否允许评论">
        <el-switch v-model="commentsEnabled"></el-switch>
      </el-form-item>
      <el-form-item label="启用文章评分">
        <el-switch v-model="ratingsEnabled"></el-switch>
      </el-form-item>
      <div class="button-container">
        <el-button type="primary" @click="saveSettings">保存</el-button>
        <el-button @click="resetSettings">取消</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';

const articlesPerPage = ref(10);
const autoSaveInterval = ref(5);
const commentsEnabled = ref(true);
const ratingsEnabled = ref(false);

const saveSettings = () => {
  // 实现保存设置的逻辑
  console.log('Settings saved:', { articlesPerPage, autoSaveInterval, commentsEnabled, ratingsEnabled });
};

const resetSettings = () => {
  // 实现重置设置到默认值的逻辑
  articlesPerPage.value = 10;
  autoSaveInterval.value = 5;
  commentsEnabled.value = true;
  ratingsEnabled.value = false;
};
</script>

<style scoped>
.input-width {
  width: 100%; /* 在移动端视图下占满宽度 */
}

@media (min-width: 769px) {
  .input-width {
    width: 35%; /* 在桌面视图下调整宽度为页面的 35% */
  }
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
