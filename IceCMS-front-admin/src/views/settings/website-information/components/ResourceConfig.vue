<template>
  <el-card shadow="never" class="resource-config">
    <template #header>
      <div class="clearfix">
        <span>资源管理设置</span>
      </div>
    </template>
    <el-form label-position="top" class="form-container">
      <el-form-item label="资源上传大小限制（MB）">
        <el-input-number v-model="uploadSizeLimit" class="input-width" :min="1" :max="500"></el-input-number>
      </el-form-item>
      <el-form-item label="允许的资源类型">
        <el-select v-model="allowedResourceTypes" class="input-width" multiple placeholder="选择资源类型">
          <el-option label="图片" value="image"></el-option>
          <el-option label="视频" value="video"></el-option>
          <el-option label="文档" value="document"></el-option>
          <el-option label="音频" value="audio"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用自动资源优化">
        <el-switch v-model="autoOptimizeResources"></el-switch>
      </el-form-item>
      <el-form-item label="资源图片显示模式">
  <el-switch
    v-model="ResourcesThumbMode"
    active-text="资源模式"
    inactive-text="主图模式"
  ></el-switch>
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
import { id } from 'element-plus/es/locale/index.mjs';

const uploadSizeLimit = ref(100); // 默认100MB
const allowedResourceTypes = ref(['image', 'video']); // 默认允许图片和视频
const autoOptimizeResources = ref(true);
const ResourcesThumbMode = ref(true);

const siteConfig = ref({
  id: "1",
  imageFormat: '',
  commentShow: '',
  h5Show: '',
});

// 初始化网站配置
const initSiteConfig = async () => {
  try {
    const response = await getSettingInfo();
    if (response && response.data) {
      console.log(response)
      siteConfig.value = response.data;
      ResourcesThumbMode.value = response.data.imageFormat;
      // fileList.value = [{ name: 'image', url: siteConfig.value.sitLogo }];
    }
  } catch (error) {
    console.error('Error fetching site config:', error);
  }
};
onMounted(initSiteConfig);

const saveSettings = async () => {
  // 实现保存设置的逻辑
  console.log('Settings saved:', { uploadSizeLimit, allowedResourceTypes, autoOptimizeResources });

  try {
    // siteConfig.value.sitLogo = fileList.value[0].url;
    console.log(ResourcesThumbMode.value,"ResourcesThumbMode.value;")
    siteConfig.value.imageFormat = ResourcesThumbMode.value;
    console.log('siteConfig.value:', siteConfig.value);
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

const resetSettings = () => {
  // 实现重置设置到默认值的逻辑
  uploadSizeLimit.value = 100;
  allowedResourceTypes.value = ['image', 'video'];
  autoOptimizeResources.value = true;
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
