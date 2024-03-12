<template>
  <el-card shadow="never" class="payment-config">
    <template #header>
      <div class="clearfix">
        <span>支付配置</span>
      </div>
    </template>
    <el-form label-position="top" class="form-container">
      <!-- 微信支付相关参数 -->
      <div class="section-title">微信支付配置</div>
      <!-- 添加分隔符 -->
      <div class="divider"></div>
      <el-form-item label="微信支付商户号">
        <el-input v-model="payConfig.wxpayMchId" class="input-width" placeholder="请输入微信支付商户号"></el-input>
      </el-form-item>
      <el-form-item label="商户API证书序列号">
        <el-input v-model="payConfig.wxpayMchSerialNo" class="input-width" placeholder="请输入商户API证书序列号"></el-input>
      </el-form-item>
      <el-form-item label="商户私钥文件">
        <el-input v-model="payConfig.wxpayPrivateKeyPath" type="textarea" class="input-width"
          placeholder="请输入商户私钥文件路径"></el-input>
      </el-form-item>
      <el-form-item label="APIv3密钥">
        <el-input v-model="payConfig.wxpayApiV3Key" class="input-width" placeholder="请输入APIv3密钥"></el-input>
      </el-form-item>
      <el-form-item label="APPID">
        <el-input v-model="payConfig.wxpayAppid" class="input-width" placeholder="请输入APPID"></el-input>
      </el-form-item>
      <el-form-item label="微信服务器地址">
        <el-input v-model="payConfig.wxpayDomain" class="input-width" placeholder="请输入微信服务器地址"></el-input>
      </el-form-item>
      <el-form-item label="接收结果通知地址">
        <el-input v-model="payConfig.wxpayNotifyDomain" class="input-width" placeholder="请输入接收结果通知地址"></el-input>
      </el-form-item>

      <!-- 支付宝支付相关参数 -->
      <div class="section-title">支付宝支付配置</div>
      <!-- 添加分隔符 -->
      <div class="divider"></div>
      <el-form-item label="支付宝APP_ID">
        <el-input v-model="payConfig.alipayAppId" class="input-width" placeholder="请输入支付宝APP_ID"></el-input>
      </el-form-item>
      <el-form-item label="支付宝应用私钥">
        <el-input v-model="payConfig.alipayPrivateKey" type="textarea" class="input-width"
          placeholder="请输入支付宝应用私钥"></el-input>
      </el-form-item>
      <el-form-item label="支付宝应用公钥">
        <el-input v-model="payConfig.alipayPublicKey" type="textarea" class="input-width"
          placeholder="请输入支付宝应用公钥"></el-input>
      </el-form-item>
      <el-form-item label="支付宝异步回调地址">
        <el-input v-model="payConfig.alipayNotifyUrl" class="input-width" placeholder="请输入支付宝异步回调地址"></el-input>
      </el-form-item>
      <el-form-item label="支付宝同步回调地址">
        <el-input v-model="payConfig.alipayReturnUrl" class="input-width" placeholder="请输入支付宝同步回调地址"></el-input>
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
import { getPayInfo, setPayInfo } from '@/api/setting/pay'; // 确保路径正确
import { ElMessageBox, ElNotification } from 'element-plus';

const alipayConfig = ref(''); // 支付宝配置信息
const wechatPayConfig = ref(''); // 微信支付配置信息

// 支付配置数据
const payConfig = ref({
  // 微信支付配置
  wxpayMchId: '',
  wxpayMchSerialNo: '',
  wxpayPrivateKeyPath: '',
  wxpayApiV3Key: '',
  wxpayAppid: '',
  wxpayDomain: '',
  wxpayNotifyDomain: '',
  // 支付宝支付配置
  alipayAppId: '',
  alipayPrivateKey: '',
  alipayPublicKey: '',
  alipayNotifyUrl: '',
  alipayReturnUrl: ''
});


// 初始化函数，用于获取当前支付配置
const initPayConfig = async () => {
  try {
    const response = await getPayInfo();
    if (response && response.data) {
      payConfig.value = {
        wxpayMchId: response.data.list.weMchId,
        wxpayMchSerialNo: response.data.list.weMchSerialNo,
        wxpayPrivateKeyPath: response.data.list.wePrivateKeyPath,
        wxpayApiV3Key: response.data.list.weApiV3Key,
        wxpayAppid: response.data.list.weAppid,
        wxpayDomain: response.data.list.weDomain,
        wxpayNotifyDomain: response.data.list.weNotifyDomain,
        alipayAppId: response.data.list.aliAppId,
        alipayPrivateKey: response.data.list.aliPrivateKey,
        alipayPublicKey: response.data.list.aliPublicKey,
        alipayNotifyUrl: response.data.list.aliNotifyUrl,
        alipayReturnUrl: response.data.list.aliReturnUrl
      };
    }
  } catch (error) {
    console.error('Error fetching pay config:', error);
  }
};

// 组件挂载时调用初始化函数
onMounted(() => {
  initPayConfig();
});

// 保存支付配置
const saveSettings = async () => {
  try {
    // 构造请求数据
    const requestData = {
      weMchId: payConfig.value.wxpayMchId,
      weMchSerialNo: payConfig.value.wxpayMchSerialNo,
      wePrivateKeyPath: payConfig.value.wxpayPrivateKeyPath,
      weApiV3Key: payConfig.value.wxpayApiV3Key,
      weAppid: payConfig.value.wxpayAppid,
      weDomain: payConfig.value.wxpayDomain,
      weNotifyDomain: payConfig.value.wxpayNotifyDomain,
      aliAppId: payConfig.value.alipayAppId,
      aliPrivateKey: payConfig.value.alipayPrivateKey,
      aliPublicKey: payConfig.value.alipayPublicKey,
      aliAlipayPublicKey: payConfig.value.alipayNotifyUrl,
      aliNotifyUrl: payConfig.value.alipayReturnUrl
    };

    // 调用 API
    const response = await setPayInfo(requestData);

    // 检查响应并处理
    if (response && response.code === 0) {
      console.log('支付配置保存成功');
      // 可以添加进一步的成功处理逻辑
      ElNotification({
        title: '成功',
        message: '保存成功',
        type: 'success',
      });
    } else {
      console.error('保存失败:', response.msg);
      // 可以添加错误处理逻辑
    }
  } catch (error) {
    console.error('保存支付配置时出现错误:', error);
    // 可以添加异常处理逻辑
  }
};

// 重置支付配置
const resetSettings = () => {
  initPayConfig(); // 重新加载配置以重置
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

.divider {
  margin: 20px 0;
  border-bottom: 1px solid #ebeef5;
}
</style>
