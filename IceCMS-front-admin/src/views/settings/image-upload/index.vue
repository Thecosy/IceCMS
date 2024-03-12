<template>
  <el-card shadow="never" class="image-upload-config">
    <template #header>
      <div class="clearfix">
        <span>图片上传设置</span>
      </div>
    </template>
    <el-form label-position="top" class="form-container">
      <el-form-item label="存储模式">
        <el-select v-model="storageMode" class="input-width" placeholder="选择存储模式">
          <el-option label="本地" value="local"></el-option>
          <el-option label="OSS" value="oss"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="storageMode === 'oss' && cloudProvider === 'tencent'" label="云服务提供商">
        <el-select v-model="cloudProvider" class="input-width" placeholder="选择云服务提供商">
          <el-option label="腾讯云" value="tencent"></el-option>
          <el-option label="阿里云" value="aliyun"></el-option>
          <el-option label="七牛云" value="qiniu"></el-option>
        </el-select>
      </el-form-item>

      <div v-if="storageMode === 'oss' && cloudProvider === 'tencent'" label="腾讯云配置">
        <!-- 腾讯云相关设置项 -->
        <el-form-item v-if="storageMode === 'oss'" label="访问域名">
          <el-input v-model="ossConfig.domain" class="input-width" placeholder="请输入访问域名"></el-input>
        </el-form-item>
        <el-form-item v-if="storageMode === 'oss'" label="存储桶名称">
          <el-input v-model="ossConfig.bucketName" class="input-width" placeholder="请输入存储桶名称"></el-input>
        </el-form-item>
        <el-form-item v-if="storageMode === 'oss'" label="SecretId">
          <el-input v-model="ossConfig.secretId" class="input-width" placeholder="请输入SecretId"></el-input>
        </el-form-item>
        <el-form-item v-if="storageMode === 'oss'" label="SecretKey">
          <el-input v-model="ossConfig.secretKey" class="input-width" placeholder="请输入SecretKey"></el-input>
        </el-form-item>
        <el-form-item v-if="storageMode === 'oss'" label="存储桶区域">
          <el-input v-model="ossConfig.region" class="input-width" placeholder="请输入存储桶区域"></el-input>
        </el-form-item>
      </div>
      <el-form-item v-if="storageMode === 'oss' && cloudProvider === 'aliyun'" label="阿里云配置">
        <!-- 阿里云相关设置项 -->
      </el-form-item>
      <el-form-item v-if="storageMode === 'oss' && cloudProvider === 'qiniu'" label="七牛云配置">
        <!-- 七牛云相关设置项 -->
      </el-form-item>



      <el-form-item label="图片大小限制（MB）">
        <el-input-number v-model="imageSizeLimit" class="input-width" :min="1" :max="20"></el-input-number>
      </el-form-item>
      <el-form-item label="允许的图片类型">
        <el-select v-model="allowedImageTypes" class="input-width" multiple placeholder="选择图片类型">
          <el-option label="JPEG" value="jpeg"></el-option>
          <el-option label="PNG" value="png"></el-option>
          <el-option label="GIF" value="gif"></el-option>
          <el-option label="SVG" value="svg"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用自动图片压缩">
        <el-switch v-model="autoCompress"></el-switch>
      </el-form-item>
      <div class="button-container">
        <el-button type="primary" @click="saveSettings">保存</el-button>
        <el-button @click="resetSettings">重置</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessageBox, ElNotification } from 'element-plus';

import * as CosAPI from "@/api/setting/cos";

const storageMode = ref('local'); // 默认存储模式为本地
const imageSizeLimit = ref(5);
const allowedImageTypes = ref(['jpeg', 'png']);
const autoCompress = ref(true);
const cloudProvider = ref('tencent'); // 默认云服务提供商为腾讯云
const tencentConfig = ref({
  // 腾讯云相关配置项
});

const aliyunConfig = ref({
  // 阿里云相关配置项
});

const qiniuConfig = ref({
  // 七牛云相关配置项
});
const ossConfig = ref({
  domain: '',
  bucketName: '',
  secretId: '',
  secretKey: '',
  region: ''
});

// 初始化函数
const fetchSettings = async () => {
  try {
    const response = await CosAPI.getCosSetting();
    // console.log(response);
    // 根据 isCos 的值更新存储模式
    storageMode.value = response.data.isCos ? 'oss' : 'local';

    if (response.code === 200 && response.data) {
      // 更新响应式变量的值
      ossConfig.value.domain = response.data.cosIntage;
      ossConfig.value.bucketName = response.data.cosBucketName;
      ossConfig.value.secretId = response.data.cosSecretId;
      ossConfig.value.secretKey = response.data.cosSecretKey;
      ossConfig.value.region = response.data.cosClientConfig;

      // 根据获取的数据更新其他变量（例如 storageMode）
      // storageMode.value = 'oss'; // 假设您想将存储模式设为 OSS
      // cloudProvider.value = 'tencent'; // 假设您的云提供商是腾讯云
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
  }
};


// 在组件挂载时调用初始化函数
onMounted(() => {
  fetchSettings();
});

const saveSettings = () => {
  // 实现保存设置的逻辑
  console.log('Settings saved:', { storageMode, imageSizeLimit, allowedImageTypes, autoCompress, ossConfig });
  // 构造请求数据
  const requestData = {
    // id: ossConfig.value.id,  // 如果有 id 的话
    cosIntage: ossConfig.value.domain,
    cosBucketName: ossConfig.value.bucketName,
    cosSecretId: ossConfig.value.secretId,
    cosSecretKey: ossConfig.value.secretKey,
    cosClientConfig: ossConfig.value.region,
    isCos: storageMode.value === 'oss'
  };
  // console.log('requestData:', requestData);
  // 调用接口
  CosAPI.setCosInfo(requestData)
    .then(({ code, msg }) => {
      if (code === 200) {
        console.log('Settings saved successfully');
        // 这里可以添加更多的成功处理逻辑
        ElNotification({
          title: '成功',
          message: '图片上传设置保存成功',
          type: 'success',
        });
      } else {
        console.error('Error saving settings:', msg);
      }
    })
    .catch((error) => {
      console.error('Error saving settings:', error);
    });
};

const resetSettings = () => {
  // 实现重置设置到默认值的逻辑
  storageMode.value = 'local';
  imageSizeLimit.value = 5;
  allowedImageTypes.value = ['jpeg', 'png'];
  autoCompress.value = true;
  ossConfig.value = {
    domain: '',
    bucketName: '',
    secretId: '',
    secretKey: '',
    region: ''
  };
  cloudProvider.value = 'tencent';
  tencentConfig.value = { /* 重置腾讯云配置项 */ };
  aliyunConfig.value = { /* 重置阿里云配置项 */ };
  qiniuConfig.value = { /* 重置七牛云配置项 */ };
};

</script>

<style scoped>
.input-width {
  width: 100%;
  /* 在移动端视图下占满宽度 */

  @media (min-width: 769px) {
    width: 35%;
    /* 在桌面视图下调整宽度为页面的 35% */
  }
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
