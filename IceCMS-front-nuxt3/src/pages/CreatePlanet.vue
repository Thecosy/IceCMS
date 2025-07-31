<script setup lang="ts">
import { ref } from 'vue';

// 标题栏默认值为 'nav-link active'
const acticve = ref<string>("nav-link active");
const setting = ref<any>({});

// 表单数据
const planetForm = ref({
  name: '',
  description: '',
  category: 'tech', // tech, life, entertainment, study, sports, other
  avatar: '',
  banner: '',
  rules: '',
  isPublic: true,
  allowInvite: true,
  requireApproval: true
});

// 表单验证状态
const formErrors = ref({
  name: '',
  description: '',
  rules: ''
});

// 提交状态
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitMessage = ref('');

// 文件上传状态
const avatarUploading = ref(false);
const bannerUploading = ref(false);

import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();
setting.value = settingStore.settings;

// 圈子分类选项
const categoryOptions = [
  { value: 'tech', label: '科技数码' },
  { value: 'life', label: '生活日常' },
  { value: 'entertainment', label: '娱乐休闲' },
  { value: 'study', label: '学习成长' },
  { value: 'sports', label: '运动健身' },
  { value: 'travel', label: '旅行摄影' },
  { value: 'food', label: '美食烹饪' },
  { value: 'game', label: '游戏竞技' },
  { value: 'art', label: '艺术设计' },
  { value: 'business', label: '商业财经' },
  { value: 'other', label: '其他' }
];

// 表单验证
const validateForm = () => {
  let isValid = true;
  formErrors.value = { name: '', description: '', rules: '' };

  if (!planetForm.value.name.trim()) {
    formErrors.value.name = '请输入圈子名称';
    isValid = false;
  } else if (planetForm.value.name.trim().length < 2) {
    formErrors.value.name = '圈子名称至少需要2个字符';
    isValid = false;
  } else if (planetForm.value.name.trim().length > 20) {
    formErrors.value.name = '圈子名称不能超过20个字符';
    isValid = false;
  }

  if (!planetForm.value.description.trim()) {
    formErrors.value.description = '请输入圈子描述';
    isValid = false;
  } else if (planetForm.value.description.trim().length < 10) {
    formErrors.value.description = '圈子描述至少需要10个字符';
    isValid = false;
  } else if (planetForm.value.description.trim().length > 200) {
    formErrors.value.description = '圈子描述不能超过200个字符';
    isValid = false;
  }

  if (!planetForm.value.rules.trim()) {
    formErrors.value.rules = '请输入圈子规则';
    isValid = false;
  } else if (planetForm.value.rules.trim().length < 20) {
    formErrors.value.rules = '圈子规则至少需要20个字符';
    isValid = false;
  }

  return isValid;
};

// 提交表单
const submitPlanet = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 模拟成功提交
    console.log('圈子创建申请提交成功:', planetForm.value);
    submitSuccess.value = true;
    submitMessage.value = '您的圈子创建申请已提交成功！我们会在1-3个工作日内完成审核，请耐心等待。';
    
    // 重置表单
    planetForm.value = {
      name: '',
      description: '',
      category: 'tech',
      avatar: '',
      banner: '',
      rules: '',
      isPublic: true,
      allowInvite: true,
      requireApproval: true
    };
  } catch (error) {
    submitMessage.value = '提交失败，请稍后重试。';
    console.error('提交圈子创建申请失败:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// 重置表单
const resetForm = () => {
  planetForm.value = {
    name: '',
    description: '',
    category: 'tech',
    avatar: '',
    banner: '',
    rules: '',
    isPublic: true,
    allowInvite: true,
    requireApproval: true
  };
  formErrors.value = { name: '', description: '', rules: '' };
  submitSuccess.value = false;
  submitMessage.value = '';
};

// 关闭成功提示
const closeSuccessMessage = () => {
  submitSuccess.value = false;
  submitMessage.value = '';
};

// 文件上传处理
const handleAvatarUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    avatarUploading.value = true;
    // 模拟上传
    setTimeout(() => {
      planetForm.value.avatar = URL.createObjectURL(file);
      avatarUploading.value = false;
    }, 1000);
  }
};

const handleBannerUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    bannerUploading.value = true;
    // 模拟上传
    setTimeout(() => {
      planetForm.value.banner = URL.createObjectURL(file);
      bannerUploading.value = false;
    }, 1000);
  }
};
</script>

<template>
  <div class="create-planet">
    <div id="__nuxt" data-server-rendered="true">
      <div id="__layout">
        <div data-fetch-key="0" class="app macwk-animation">
          <top :message11="acticve" />
          <div class="layout-min-full-height">
            <div class="macwk-create-planet-section">
              <!-- 背景装饰图片 -->
              <img src="../static/picture/downie-4.png" alt="" class="people people-1">
              <img src="../static/picture/xmin-zen.png" alt="" class="people people-2">
              <img src="../static/picture/sketch-1.png" alt="" class="people people-3">
              <img src="../static/picture/imazing.png" alt="" class="people people-4">
              <img src="../static/picture/alfred-powerpack.png" alt="" class="people people-5">
              <img src="../static/picture/movist.png" alt="" class="people people-6">
              
              <div class="container">
                <h1 class="fw-600 text-center">创建圈子</h1>
                <p class="sub-title text-center fs-20">创建属于您的专属圈子，聚集志同道合的朋友。</p>
                
                <div class="inner-container">
                  <div class="main-content">
                    <!-- 成功提示 -->
                    <div v-if="submitSuccess" class="success-message">
                      <div class="success-content">
                        <i class="success-icon">✓</i>
                        <p>{{ submitMessage }}</p>
                        <button @click="closeSuccessMessage" class="close-btn">关闭</button>
                      </div>
                    </div>

                    <!-- 圈子创建表单 -->
                    <div class="create-planet-form-container">
                      <div class="form-header">
                        <h3>填写圈子信息</h3>
                        <p class="form-description">请详细填写圈子信息，我们会在1-3个工作日内完成审核。</p>
                      </div>

                      <form @submit.prevent="submitPlanet" class="create-planet-form">
                        <div class="form-row">
                          <div class="form-group">
                            <label for="name">圈子名称 <span class="required">*</span></label>
                            <input 
                              type="text" 
                              id="name" 
                              v-model="planetForm.name"
                              placeholder="请输入圈子名称（2-20个字符）"
                              :class="{ 'error': formErrors.name }"
                              maxlength="20"
                            >
                            <span v-if="formErrors.name" class="error-message">{{ formErrors.name }}</span>
                          </div>
                          
                          <div class="form-group">
                            <label for="category">圈子分类 <span class="required">*</span></label>
                            <select id="category" v-model="planetForm.category">
                              <option v-for="option in categoryOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                              </option>
                            </select>
                          </div>
                        </div>

                        <div class="form-group">
                          <label for="description">圈子描述 <span class="required">*</span></label>
                          <textarea 
                            id="description" 
                            v-model="planetForm.description"
                            placeholder="请详细描述您的圈子，包括主题、目标用户、活动内容等..."
                            rows="4"
                            :class="{ 'error': formErrors.description }"
                            maxlength="200"
                          ></textarea>
                          <span v-if="formErrors.description" class="error-message">{{ formErrors.description }}</span>
                          <div class="char-count">{{ planetForm.description.length }}/200</div>
                        </div>

                        <div class="form-row">
                          <div class="form-group">
                            <label for="avatar">圈子头像</label>
                            <div class="upload-area">
                              <div class="avatar-preview" v-if="planetForm.avatar">
                                <img :src="planetForm.avatar" alt="圈子头像" />
                                <button type="button" @click="planetForm.avatar = ''" class="remove-btn">×</button>
                              </div>
                              <div v-else class="upload-placeholder">
                                <input type="file" id="avatar" @change="handleAvatarUpload" accept="image/*" style="display: none;">
                                <label for="avatar" class="upload-btn" :class="{ 'uploading': avatarUploading }">
                                  <i class="el-icon-plus" v-if="!avatarUploading"></i>
                                  <i class="el-icon-loading" v-else></i>
                                  <span>{{ avatarUploading ? '上传中...' : '上传头像' }}</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div class="form-group">
                            <label for="banner">圈子横幅</label>
                            <div class="upload-area banner-upload">
                              <div class="banner-preview" v-if="planetForm.banner">
                                <img :src="planetForm.banner" alt="圈子横幅" />
                                <button type="button" @click="planetForm.banner = ''" class="remove-btn">×</button>
                              </div>
                              <div v-else class="upload-placeholder banner-placeholder">
                                <input type="file" id="banner" @change="handleBannerUpload" accept="image/*" style="display: none;">
                                <label for="banner" class="upload-btn" :class="{ 'uploading': bannerUploading }">
                                  <i class="el-icon-plus" v-if="!bannerUploading"></i>
                                  <i class="el-icon-loading" v-else></i>
                                  <span>{{ bannerUploading ? '上传中...' : '上传横幅' }}</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="form-group">
                          <label for="rules">圈子规则 <span class="required">*</span></label>
                          <textarea 
                            id="rules" 
                            v-model="planetForm.rules"
                            placeholder="请制定圈子规则，如：1. 保持友善讨论 2. 禁止广告刷屏 3. 尊重他人观点..."
                            rows="6"
                            :class="{ 'error': formErrors.rules }"
                            maxlength="500"
                          ></textarea>
                          <span v-if="formErrors.rules" class="error-message">{{ formErrors.rules }}</span>
                          <div class="char-count">{{ planetForm.rules.length }}/500</div>
                        </div>

                        <div class="form-group">
                          <label>圈子设置</label>
                          <div class="checkbox-group">
                            <label class="checkbox-item">
                              <input type="checkbox" v-model="planetForm.isPublic">
                              <span class="checkmark"></span>
                              公开圈子（其他用户可以搜索和查看）
                            </label>
                            <label class="checkbox-item">
                              <input type="checkbox" v-model="planetForm.allowInvite">
                              <span class="checkmark"></span>
                              允许成员邀请好友加入
                            </label>
                            <label class="checkbox-item">
                              <input type="checkbox" v-model="planetForm.requireApproval">
                              <span class="checkmark"></span>
                              新成员需要审核批准
                            </label>
                          </div>
                        </div>

                        <div class="form-actions">
                          <button type="button" @click="resetForm" class="btn-secondary" :disabled="isSubmitting">
                            重置
                          </button>
                          <button type="submit" class="btn-primary" :disabled="isSubmitting">
                            <span v-if="isSubmitting">提交中...</span>
                            <span v-else>提交申请</span>
                          </button>
                        </div>
                      </form>
                    </div>

                    <!-- 创建须知 -->
                    <div class="create-notice">
                      <h4>创建须知</h4>
                      <div class="notice-content">
                        <div class="notice-item">
                          <i class="icon-info"></i>
                          <div>
                            <strong>审核流程</strong>
                            <p>我们会在1-3个工作日内审核您的申请，审核通过后圈子将正式开放。</p>
                          </div>
                        </div>
                        <div class="notice-item">
                          <i class="icon-rules"></i>
                          <div>
                            <strong>管理责任</strong>
                            <p>作为圈主，您需要维护圈子秩序，确保内容健康积极，遵守平台规范。</p>
                          </div>
                        </div>
                        <div class="notice-item">
                          <i class="icon-community"></i>
                          <div>
                            <strong>社区建设</strong>
                            <p>建议定期发布优质内容，积极回复成员，营造良好的社区氛围。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 侧边工具栏 -->
            <div id="sidetools" class="macwk-animation tinUpIn" style="display:none;">
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a class="cursor"><span class="sidetools-icon kfwx" /></a>
                </div>
              </div>
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a class="cursor"><span class="sidetools-icon kfqq" /></a>
                </div>
              </div>
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a class="el-tooltip cursor"><span class="sidetools-icon back-top" /></a>
                </div>
              </div>
            </div>
          </div>
          <foot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../static/mycss/top.css';
@import '../static/mycss/body.css';

/* 继承 feedback 页面的基础样式 */
.macwk-create-planet-section {
  position: relative;
  padding: 80px 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  overflow: hidden;
}

/* 背景装饰图片 */
.people {
  position: absolute;
  opacity: 0.1;
  z-index: 1;
  animation: float 6s ease-in-out infinite;
}

.people-1 { top: 10%; left: 5%; width: 80px; animation-delay: 0s; }
.people-2 { top: 20%; right: 10%; width: 60px; animation-delay: 1s; }
.people-3 { top: 60%; left: 8%; width: 70px; animation-delay: 2s; }
.people-4 { top: 70%; right: 15%; width: 85px; animation-delay: 3s; }
.people-5 { bottom: 20%; left: 12%; width: 65px; animation-delay: 4s; }
.people-6 { bottom: 10%; right: 8%; width: 75px; animation-delay: 5s; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  color: white;
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.sub-title {
  color: rgba(255,255,255,0.9);
  margin-bottom: 60px;
  text-shadow: 0 1px 5px rgba(0,0,0,0.2);
}

.inner-container {
  display: flex;
  justify-content: center;
}

.main-content {
  width: 100%;
  max-width: 900px;
}

/* 成功提示样式 */
.success-message {
  background: rgba(255,255,255,0.95);
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
}

.success-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
}

.close-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

/* 表单容器样式 */
.create-planet-form-container {
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
  margin-bottom: 40px;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-header h3 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 10px;
}

.form-description {
  color: #666;
  font-size: 1rem;
  margin: 0;
}

/* 表单样式 */
.create-planet-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.required {
  color: #e74c3c;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 4px;
}

.char-count {
  text-align: right;
  font-size: 0.8rem;
  color: #999;
  margin-top: 5px;
}

/* 文件上传样式 */
.upload-area {
  position: relative;
  border: 2px dashed #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #3b82f6;
}

.avatar-preview,
.banner-preview {
  position: relative;
  display: inline-block;
}

.avatar-preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.banner-preview img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.remove-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}

.upload-placeholder {
  padding: 30px;
  text-align: center;
}

.banner-placeholder {
  padding: 50px 30px;
}

.upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.upload-btn:hover {
  color: #3b82f6;
}

.upload-btn.uploading {
  color: #3b82f6;
  pointer-events: none;
}

.upload-btn i {
  font-size: 24px;
}

/* 复选框组样式 */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #555;
}

.checkbox-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin: 0;
}

/* 表单按钮 */
.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f8f9fa;
  color: #666;
  border: 2px solid #e1e5e9;
}

.btn-secondary:hover:not(:disabled) {
  background: #e9ecef;
  transform: translateY(-1px);
}

/* 创建须知样式 */
.create-notice {
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
}

.create-notice h4 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.notice-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notice-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.notice-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.notice-item i {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.notice-item strong {
  color: #333;
  display: block;
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.notice-item p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  .create-planet-form-container,
  .create-notice {
    padding: 25px;
  }
  
  .notice-content {
    gap: 15px;
  }
  
  .notice-item {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  
  .sub-title {
    font-size: 1rem;
  }
  
  .create-planet-form-container,
  .create-notice {
    padding: 20px;
  }
  
  .upload-placeholder {
    padding: 20px;
  }
  
  .banner-placeholder {
    padding: 30px 20px;
  }
}
</style>