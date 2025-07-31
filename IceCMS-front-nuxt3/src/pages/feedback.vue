<script setup lang="ts">
import { ref } from 'vue';

// 标题栏默认值为 'nav-link active'
const acticve = ref<string>("nav-link active");
const setting = ref<any>({});

// 表单数据
const feedbackForm = ref({
  name: '',
  email: '',
  phone: '',
  type: 'suggestion', // suggestion, bug, complaint, other
  subject: '',
  content: '',
  attachments: []
});

// 表单验证状态
const formErrors = ref({
  name: '',
  email: '',
  subject: '',
  content: ''
});

// 提交状态
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitMessage = ref('');

import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();
setting.value = settingStore.settings;

// 表单验证
const validateForm = () => {
  let isValid = true;
  formErrors.value = { name: '', email: '', subject: '', content: '' };

  if (!feedbackForm.value.name.trim()) {
    formErrors.value.name = '请输入您的姓名';
    isValid = false;
  }

  if (!feedbackForm.value.email.trim()) {
    formErrors.value.email = '请输入邮箱地址';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackForm.value.email)) {
    formErrors.value.email = '请输入有效的邮箱地址';
    isValid = false;
  }

  if (!feedbackForm.value.subject.trim()) {
    formErrors.value.subject = '请输入反馈主题';
    isValid = false;
  }

  if (!feedbackForm.value.content.trim()) {
    formErrors.value.content = '请输入反馈内容';
    isValid = false;
  } else if (feedbackForm.value.content.trim().length < 10) {
    formErrors.value.content = '反馈内容至少需要10个字符';
    isValid = false;
  }

  return isValid;
};

// 提交表单
const submitFeedback = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 模拟成功提交
    console.log('反馈提交成功:', feedbackForm.value);
    submitSuccess.value = true;
    submitMessage.value = '感谢您的反馈！我们会尽快处理您的建议。';
    
    // 重置表单
    feedbackForm.value = {
      name: '',
      email: '',
      phone: '',
      type: 'suggestion',
      subject: '',
      content: '',
      attachments: []
    };
  } catch (error) {
    submitMessage.value = '提交失败，请稍后重试。';
    console.error('提交反馈失败:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// 重置表单
const resetForm = () => {
  feedbackForm.value = {
    name: '',
    email: '',
    phone: '',
    type: 'suggestion',
    subject: '',
    content: '',
    attachments: []
  };
  formErrors.value = { name: '', email: '', subject: '', content: '' };
  submitSuccess.value = false;
  submitMessage.value = '';
};

// 关闭成功提示
const closeSuccessMessage = () => {
  submitSuccess.value = false;
  submitMessage.value = '';
};
</script>

<template>
  <div class="feedback">
    <div id="__nuxt" data-server-rendered="true">
      <div id="__layout">
        <div data-fetch-key="0" class="app macwk-animation">
          <top :message11="acticve" />
          <div class="layout-min-full-height">
            <div class="macwk-feedback-section">
              <!-- 背景装饰图片 -->
              <img src="../static/picture/downie-4.png" alt="" class="people people-1">
              <img src="../static/picture/xmin-zen.png" alt="" class="people people-2">
              <img src="../static/picture/sketch-1.png" alt="" class="people people-3">
              <img src="../static/picture/imazing.png" alt="" class="people people-4">
              <img src="../static/picture/alfred-powerpack.png" alt="" class="people people-5">
              <img src="../static/picture/movist.png" alt="" class="people people-6">
              
              <div class="container">
                <h1 class="fw-600 text-center">意见反馈</h1>
                <p class="sub-title text-center fs-20">您的建议是我们改进的动力，期待听到您的声音。</p>
                
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

                    <!-- 反馈表单 -->
                    <div class="feedback-form-container">
                      <div class="form-header">
                        <h3>请填写您的反馈信息</h3>
                        <p class="form-description">我们重视每一条反馈，您的意见将帮助我们提供更好的服务。</p>
                      </div>

                      <form @submit.prevent="submitFeedback" class="feedback-form">
                        <div class="form-row">
                          <div class="form-group">
                            <label for="name">姓名 <span class="required">*</span></label>
                            <input 
                              type="text" 
                              id="name" 
                              v-model="feedbackForm.name"
                              placeholder="请输入您的姓名"
                              :class="{ 'error': formErrors.name }"
                            >
                            <span v-if="formErrors.name" class="error-message">{{ formErrors.name }}</span>
                          </div>
                          
                          <div class="form-group">
                            <label for="email">邮箱 <span class="required">*</span></label>
                            <input 
                              type="email" 
                              id="email" 
                              v-model="feedbackForm.email"
                              placeholder="请输入您的邮箱地址"
                              :class="{ 'error': formErrors.email }"
                            >
                            <span v-if="formErrors.email" class="error-message">{{ formErrors.email }}</span>
                          </div>
                        </div>

                        <div class="form-row">
                          <div class="form-group">
                            <label for="phone">手机号码</label>
                            <input 
                              type="tel" 
                              id="phone" 
                              v-model="feedbackForm.phone"
                              placeholder="请输入您的手机号码（可选）"
                            >
                          </div>
                          
                          <div class="form-group">
                            <label for="type">反馈类型</label>
                            <select id="type" v-model="feedbackForm.type">
                              <option value="suggestion">建议</option>
                              <option value="bug">BUG反馈</option>
                              <option value="complaint">投诉</option>
                              <option value="praise">表扬</option>
                              <option value="other">其他</option>
                            </select>
                          </div>
                        </div>

                        <div class="form-group">
                          <label for="subject">反馈主题 <span class="required">*</span></label>
                          <input 
                            type="text" 
                            id="subject" 
                            v-model="feedbackForm.subject"
                            placeholder="请简要描述您的反馈主题"
                            :class="{ 'error': formErrors.subject }"
                          >
                          <span v-if="formErrors.subject" class="error-message">{{ formErrors.subject }}</span>
                        </div>

                        <div class="form-group">
                          <label for="content">详细内容 <span class="required">*</span></label>
                          <textarea 
                            id="content" 
                            v-model="feedbackForm.content"
                            placeholder="请详细描述您的反馈内容，我们会认真阅读并处理..."
                            rows="6"
                            :class="{ 'error': formErrors.content }"
                          ></textarea>
                          <span v-if="formErrors.content" class="error-message">{{ formErrors.content }}</span>
                          <div class="char-count">{{ feedbackForm.content.length }}/1000</div>
                        </div>

                        <div class="form-actions">
                          <button type="button" @click="resetForm" class="btn-secondary" :disabled="isSubmitting">
                            重置
                          </button>
                          <button type="submit" class="btn-primary" :disabled="isSubmitting">
                            <span v-if="isSubmitting">提交中...</span>
                            <span v-else>提交反馈</span>
                          </button>
                        </div>
                      </form>
                    </div>

                    <!-- 联系方式 -->
                    <div class="contact-info">
                      <h4>其他联系方式</h4>
                      <div class="contact-methods">
                        <div class="contact-item">
                          <i class="icon-mail"></i>
                          <div>
                            <strong>邮箱</strong>
                            <p>feedback@icecms.cn</p>
                          </div>
                        </div>
                        <div class="contact-item">
                          <i class="icon-wechat"></i>
                          <div>
                            <strong>微信</strong>
                            <p>IceCMS_Official</p>
                          </div>
                        </div>
                        <div class="contact-item">
                          <i class="icon-qq"></i>
                          <div>
                            <strong>QQ群</strong>
                            <p>123456789</p>
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

/* 继承 about 页面的基础样式 */
.macwk-feedback-section {
  position: relative;
  padding: 80px 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #4f8ff7 0%, #2563eb 100%);
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
  max-width: 800px;
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
  background: #2563eb;
  transform: translateY(-2px);
}

/* 表单容器样式 */
.feedback-form-container {
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
.feedback-form {
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

/* 联系信息样式 */
.contact-info {
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
}

.contact-info h4 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.contact-item i {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.contact-item strong {
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.contact-item p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .contact-methods {
    grid-template-columns: 1fr;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  .feedback-form-container,
  .contact-info {
    padding: 25px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  
  .sub-title {
    font-size: 1rem;
  }
  
  .feedback-form-container,
  .contact-info {
    padding: 20px;
  }
}
</style>