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
          <el-option label="云存储" value="oss"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="storageMode === 'oss'" label="云服务提供商">
        <el-select v-model="cloudProvider" class="input-width" placeholder="选择云服务提供商">
          <el-option label="腾讯云" value="tencent"></el-option>
          <el-option label="七牛云" value="qiniu"></el-option>
        </el-select>
      </el-form-item>

      <div v-if="storageMode === 'oss' && cloudProvider === 'tencent'" class="cloud-config">
        <h3>腾讯云配置</h3>
        <el-form-item label="访问域名">
          <el-input v-model="tencentConfig.domain" class="input-width" placeholder="请输入访问域名"></el-input>
        </el-form-item>
        <el-form-item label="存储桶名称">
          <el-input v-model="tencentConfig.bucketName" class="input-width" placeholder="请输入存储桶名称"></el-input>
        </el-form-item>
        <el-form-item label="SecretId">
          <el-input v-model="tencentConfig.secretId" class="input-width" placeholder="请输入SecretId"></el-input>
        </el-form-item>
        <el-form-item label="SecretKey">
          <el-input v-model="tencentConfig.secretKey" class="input-width" placeholder="请输入SecretKey" show-password></el-input>
        </el-form-item>
        <el-form-item label="存储桶区域">
          <el-input v-model="tencentConfig.region" class="input-width" placeholder="请输入存储桶区域"></el-input>
        </el-form-item>
      </div>

      <div v-if="storageMode === 'oss' && cloudProvider === 'qiniu'" class="cloud-config">
        <h3>七牛云配置</h3>
        <el-form-item label="访问域名">
          <el-input v-model="qiniuConfig.domain" class="input-width" placeholder="请输入访问域名，如：img3.icecmspro.com"></el-input>
          <div class="tip-text">域名需要带上http://或https://前缀，如果不带则默认使用https://</div>
        </el-form-item>
        <el-form-item label="存储空间名称">
          <el-input v-model="qiniuConfig.bucketName" class="input-width" placeholder="请输入存储空间名称，如：resment"></el-input>
        </el-form-item>
        <el-form-item label="AccessKey">
          <el-input v-model="qiniuConfig.accessKey" class="input-width" placeholder="请输入AccessKey"></el-input>
        </el-form-item>
        <el-form-item label="SecretKey">
          <el-input v-model="qiniuConfig.secretKey" class="input-width" placeholder="请输入SecretKey" show-password></el-input>
        </el-form-item>
      </div>

      <el-form-item v-if="storageMode !== 'oss'" label="图片大小限制（MB）">
        <el-input-number v-model="imageSizeLimit" class="input-width" :min="1" :max="20"></el-input-number>
      </el-form-item>
      <el-form-item v-if="storageMode !== 'oss'" label="允许的图片类型">
        <el-select v-model="allowedImageTypes" class="input-width" multiple placeholder="选择图片类型">
          <el-option label="JPEG" value="jpeg"></el-option>
          <el-option label="PNG" value="png"></el-option>
          <el-option label="GIF" value="gif"></el-option>
          <el-option label="SVG" value="svg"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="storageMode !== 'oss'" label="启用自动图片压缩">
        <el-switch v-model="autoCompress"></el-switch>
      </el-form-item>
      <el-form-item v-if="storageMode !== 'oss'" label="启用网站域名地址">
        <el-switch v-model="useWebsiteDomain"></el-switch>
      </el-form-item>
      <div class="button-container">
        <el-button type="primary" @click="saveSettings">保存</el-button>
        <el-button @click="resetSettings">重置</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { ElMessageBox, ElNotification } from 'element-plus';

import * as CosAPI from "@/api/setting/cos";

const storageMode = ref('local'); // 默认存储模式为本地
const imageSizeLimit = ref(5);
const allowedImageTypes = ref(['jpeg', 'png']);
const autoCompress = ref(true);
const useWebsiteDomain = ref(false);
const cloudProvider = ref('tencent'); // 默认云服务提供商为腾讯云

const tencentConfig = ref({
  domain: '',
  bucketName: '',
  secretId: '',
  secretKey: '',
  region: ''
});

const qiniuConfig = ref({
  domain: '',
  bucketName: '',
  accessKey: '',
  secretKey: ''
});

// 初始化函数
const fetchSettings = async () => {
  try {
    const response = await CosAPI.getCosSetting();

    if (response.code === 200 && response.data) {
      const data = response.data;

      // 根据存储类型设置界面
      if (data.storageType === 3) {
        // 七牛云
        storageMode.value = 'oss';
        cloudProvider.value = 'qiniu';
        qiniuConfig.value.domain = data.qiniuDomain || '';
        qiniuConfig.value.bucketName = data.qiniuBucketName || '';
        qiniuConfig.value.accessKey = data.qiniuAccessKey || '';
        qiniuConfig.value.secretKey = data.qiniuSecretKey || '';
      } else if (data.storageType === 2 || data.isCos) {
        // 腾讯云
        storageMode.value = 'oss';
        cloudProvider.value = 'tencent';
        tencentConfig.value.domain = data.cosIntage || '';
        tencentConfig.value.bucketName = data.cosBucketName || '';
        tencentConfig.value.secretId = data.cosSecretId || '';
        tencentConfig.value.secretKey = data.cosSecretKey || '';
        tencentConfig.value.region = data.cosClientConfig || '';
      } else {
        // 本地存储
        storageMode.value = 'local';
      }
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
  }
};

// 在组件挂载时调用初始化函数
onMounted(() => {
  fetchSettings();
});

// 监听云服务提供商变化
watch(cloudProvider, (newVal) => {
  console.log('Cloud provider changed to:', newVal);
});

const saveSettings = () => {
  // 构造请求数据
  const requestData = {
    isCos: storageMode.value === 'oss'
  };

  if (storageMode.value === 'oss') {
    if (cloudProvider.value === 'tencent') {
      // 腾讯云配置
      requestData.cosIntage = tencentConfig.value.domain;
      requestData.cosBucketName = tencentConfig.value.bucketName;
      requestData.cosSecretId = tencentConfig.value.secretId;
      requestData.cosSecretKey = tencentConfig.value.secretKey;
      requestData.cosClientConfig = tencentConfig.value.region;
      requestData.storageType = 2;
    } else if (cloudProvider.value === 'qiniu') {
      // 七牛云配置
      requestData.qiniuDomain = qiniuConfig.value.domain;
      requestData.qiniuBucketName = qiniuConfig.value.bucketName;
      requestData.qiniuAccessKey = qiniuConfig.value.accessKey;
      requestData.qiniuSecretKey = qiniuConfig.value.secretKey;
      requestData.storageType = 3;
    }
  } else {
    // 本地存储配置
    requestData.storageType = 1;
  }

  // 调用接口保存设置
  CosAPI.setCosInfo(requestData)
    .then(({ code, msg }) => {
      if (code === 200) {
        ElNotification({
          title: '成功',
          message: '图片上传设置保存成功',
          type: 'success',
        });
      } else {
        ElNotification({
          title: '错误',
          message: msg || '保存失败',
          type: 'error',
        });
      }
    })
    .catch((error) => {
      ElNotification({
        title: '错误',
        message: '保存失败: ' + error.message,
        type: 'error',
      });
    });
};

const resetSettings = () => {
  ElMessageBox.confirm('确定要重置所有设置吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 重置设置到默认值
    storageMode.value = 'local';
    imageSizeLimit.value = 5;
    allowedImageTypes.value = ['jpeg', 'png'];
    autoCompress.value = true;
    useWebsiteDomain.value = false;
    cloudProvider.value = 'tencent';

    tencentConfig.value = {
      domain: '',
      bucketName: '',
      secretId: '',
      secretKey: '',
      region: ''
    };

    qiniuConfig.value = {
      domain: '',
      bucketName: '',
      accessKey: '',
      secretKey: ''
    };

    ElNotification({
      title: '成功',
      message: '设置已重置',
      type: 'success',
    });
  }).catch(() => {
    // 取消重置
  });
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
  margin-top: 20px;
}

.cloud-config {
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.cloud-config h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #409EFF;
}

.tip-text {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}
</style>
