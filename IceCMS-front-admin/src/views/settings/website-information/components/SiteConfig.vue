<template>
  <el-card shadow="never" class="site-config">
    <template #header>
      <div class="clearfix">
        <span>网站配置</span>
      </div>
    </template>
    <el-form label-position="top" class="form-container">
      <el-form-item label="网站标题">
        <el-input v-model="siteConfig.sitTitle" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="网站LOGO">
        <el-input v-model="siteConfig.sitLogo" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="版权信息">
        <el-input v-model="siteConfig.banquan" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="备案号">
        <el-input v-model="siteConfig.beian" class="input-width"></el-input>
      </el-form-item>
      <div class="button-container">
        <el-button type="primary" @click="saveSettings">保存</el-button>
        <el-button @click="resetSettings">取消</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getSettingInfo, setSettingInfo } from '@/api/setting/webinfo';

import { ElMessageBox, ElNotification } from 'element-plus';
const siteConfig = ref({
  sitTitle: '',
  sitLogo: '',
  banquan: '',
  beian: ''
});

// 初始化网站配置
const initSiteConfig = async () => {
  try {
    const response = await getSettingInfo();
    if (response && response.data) {
      siteConfig.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching site config:', error);
  }
};

// 保存设置
const saveSettings = async () => {
  try {
    await setSettingInfo(siteConfig.value);
    console.log('Settings saved successfully');
    ElNotification({
      title: '成功',
      message: '保存成功',
      type: 'success',
    });
  } catch (error) {
    console.error('Error saving site config:', error);
  }
};

// 重置设置
const resetSettings = () => {
  initSiteConfig(); // 重新加载初始配置
};

onMounted(initSiteConfig);
</script>

<style scoped>
.input-width {
  width: 35%;
  /* 默认情况下，输入框宽度为页面宽度的 35% */
}

/* 媒体查询 */
@media (max-width: 768px) {

  /* 在屏幕宽度小于或等于 768px 的设备上，输入框宽度调整为 100% */
  .input-width {
    width: 100%;
  }
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  /* 按钮之间的间隔 */
}</style>
