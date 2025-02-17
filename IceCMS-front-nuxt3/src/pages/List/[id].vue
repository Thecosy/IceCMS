<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getResourceById } from '../../../api/webresource';
import { getResourceCommentnum } from '../../../api/webresourceComment';
import { loveresource } from '../../../api/webresource';
import { getResourceClassNameByid } from '../../../api/webresourceclass';
// import { formatDate, GetWeekdate } from '@/utils/date';
import { formatDate, GetWeekdate } from '../../utils/date.js'
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
import { useUserStore } from "../../../stores/useUserStore";

import wxPayApi from '../../../api/payment/wxPay';
import aliPayApi from '../../../api/payment/aliPay';
import orderInfoApi from '../../../api/payment/orderInfo';
// import Comment from '@/components/ResComment.vue';

// 获取路由参数
const route = useRoute();
const router = useRouter();

// 定义响应式数据
const isDark = ref(false);
const videoSource = ref<{ src: string; resolution: string }[]>([]);
const Resource = ref<any[]>([]);
const loveCheck = ref(false);
const firstLoveFlag = ref(true);
const loveNum = ref<number>(0);
const hits = ref<number>(0);
const carouselNum = ref<number>(0);
const commentNum = ref<number>(0);
const MyEmoge = ref('');
const showDialog = ref(false);
const mycomment = ref(true);
const IsvideoSource = ref(false);
const carousel = ref<string[]>([]);
const className = ref('');
const sortClasss = ref<number | string>('');
const addTime = ref('');
const createTime = ref('');
const Theweeks = ref('');
const payJudge = ref(false);
const IsFreePrice = ref('');
const payBtnDisabled = ref(false);
const orderNo = ref('');
const codeUrl = ref('');
const payOrder = reactive({
  productId: '',
  payType: 'wxpay',
});
const PaymentDialogVisibleLogin = ref(false);
const PaymentDialogVisibleTemp = ref(false);
const wxDialogVisible = ref(false);
const aliDialogVisible = ref(false);
const intro = ref('');
const content = ref('');
const price = ref('');
const title = ref('');
const author = ref('');
// Define the weeks object with numeric keys (0 to 6)
const weeks: { [key: number]: string } = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
};

definePageMeta({
  validate: async (route) => {
    // 检查id是否由数字组成
    return /^\d+$/.test(route.params.id)
  }
})

// 标题栏默认值为 'nav-link active'
const acticve = ref<string>("nav-link active");
const setting = ref<any>({});

import { useSettingStore } from '../../../stores/setting';
const settingStore = useSettingStore();
setting.value = settingStore.settings

const onSelectEmoji = (emoji: any) => {
  console.log(emoji.i)
  MyEmoge.value += emoji.i;
  /* 结果示例
  { 
      i: "ernes", // 表情图标
      n: ["kissing face"], 
      r: "1f61a", // 包含肤色
      t: "neutral", // 肤色
      u: "1f61a" // 不带肤色
  }
  */
};
// 判断用户是否已购买
await judgeResource();
async function judgeResource() {
  if (process.client) {
    const userStore = useUserStore();  // 获取 Pinia store 实例
    // 判断用户是否已登录
    if (userStore.userid) {
      const result = await orderInfoApi.queryOrderStatusBytrue(route.params.id, userStore.userid);
      const IsOrder = result.data.value;
      const rawIsOrder = toRaw(IsOrder);
      //检查已登录用户是否购买过此资源，根据userid和resourceid判断
      if (rawIsOrder?.code == 0) {
        payJudge.value = true
      }
      if (rawIsOrder?.code == 101) {
        payJudge.value = false
      }
    } else {
      console.log("用户未登录");
      // 可以在这里做一些跳转，或者显示登录提示等
      payJudge.value = false
    }

  }
};

// 获取资源数据
await handlegetResourceById();
async function handlegetResourceById() {
  try {
    const result = await getResourceById(route.params.id);
    Resource.value = result.data.value;
    console.log(Resource)
    hits.value = Resource.value.hits ?? 0;
    loveNum.value = Resource.value.loveNum ?? 0;
    videoSource.value = Resource.value.resAddress ? [{ src: Resource.value.resAddress, resolution: '1080p' }] : [];
    if (Resource.value.resAddress) {
      IsvideoSource.value = true;
    } else {
      IsvideoSource.value = false;

    }
    IsFreePrice.value = Resource.value.price;
    carouselNum.value = Resource.value.carousel ? JSON.parse(Resource.value.carousel).length : 0;
    carousel.value = Resource.value.carousel ? JSON.parse(Resource.value.carousel) : [];
    sortClasss.value = Resource.value.sortClass;
    await handlegetclassName(sortClasss.value);
    // className.value = (await getResourceClassNameByid(Resource.value.sortClass))?.data ?? '';
    intro.value = Resource.value.intro ?? '';
    content.value = Resource.value.content ?? '';
    price.value = Resource.value.price ?? '';
    title.value = Resource.value.title ?? '';
    author.value = Resource.value.author ?? '';
    addTime.value = formatDate(Resource.value.addTime);

    createTime.value = Resource.value.createTime ? formatDate(Resource.value.createTime) : formatDate(Resource.value.addTime);
    const createTimetest = Resource.value.createTime ? Resource.value.createTime : Resource.value.addTime;

    Theweeks.value = weeks[GetWeekdate(formatDate(createTimetest))];
  } catch (error) {
    console.error('获取资源列表出错:', error);
  }
}

// 获取资源评论数量
await handlegetResourceCommentnum();
async function handlegetResourceCommentnum() {
  try {
    const result = await getResourceCommentnum(route.params.id as string);
    commentNum.value = result.data.value ?? 0;
  } catch (error) {
    console.error('获取资源评论数量出错:', error);
  }
}

// 获取className
async function handlegetclassName(id: number) {
  try {
    const result = await getResourceClassNameByid(id);
    className.value = result.data.value;
  } catch (error) {
    console.error('获取className出错:', error);
  }
}
const showemoge = () => {
  showDialog.value = !showDialog.value;
};

const sendMsg = () => {
  mycomment.value = false;
};

const updateDate = () => {
  showDialog.value = false;
  mycomment.value = true;
};

// 获取资源数据
// const { data: Resource } = useAsyncData(() => getResourceById({ page: route.params.id || 1 }));

// 监听资源数据变化并更新 UI
// watch(Resource, async (res) => {
//   if (!res) return;

//   hits.value = res.hits ?? 0;
//   loveNum.value = res.loveNum ?? 0;
//   videoSource.value = res.videoAddress ? [{ src: res.videoAddress, resolution: '1080p' }] : [];
//   carouselNum.value = res.carousel ? JSON.parse(res.carousel).length : 0;
//   carousel.value = res.carousel ? JSON.parse(res.carousel) : [];
//   sortClasss.value = res.sortClass;
//   className.value = (await getResourceClassNameByid(res.sortClass))?.data ?? '';
//   intro.value = res.intro ?? '';
//   content.value = res.content ?? '';
//   price.value = res.price ?? '';
//   title.value = res.title ?? '';
//   author.value = res.author ?? '';

//   const createTime = res.createTime ? new Date(res.createTime) : new Date(res.addTime);
//   Theweeks.value = weeks[GetWeekdate(formatDate(createTime, 'yyyy-MM-dd'))];

//   // getResourceCommentnum(route.params.id as string).then((resp) => {
//   //   commentNum.value = resp.data ?? 0;
//   // });
// });

// 点赞功能
const loveClick = () => {
  if (!loveCheck.value) {
    if (firstLoveFlag.value) {
      loveresource(route.params.id as string);
      firstLoveFlag.value = false;
    }
    loveNum.value++;
    loveCheck.value = true;
  } else {
    loveNum.value--;
    loveCheck.value = false;
  }
};

// 选择支付方式（登录用户）
const selectPayTypeLogin = (type: 'wxpay' | 'alipay') => {
  payOrder.payType = type;
  PaymentDialogVisibleLogin.value = false;

  if (type === 'alipay') {
    aliDialogVisible.value = true;
    aliPayApi.ftofPayLogin(route.params.id as string, payOrder.productId).then((response) => {
      codeUrl.value = response.data.data.codeUrl;
      orderNo.value = response.data.data.orderNo;
    });
  } else {
    wxDialogVisible.value = true;
    wxPayApi.nativePayLogin(route.params.id as string, payOrder.productId).then((response) => {
      codeUrl.value = response.data.data.codeUrl;
      orderNo.value = response.data.data.orderNo;
    });
  }
};

// 选择支付方式（临时用户）
const selectPayType = (type: 'wxpay' | 'alipay') => {
  payOrder.payType = type;
  PaymentDialogVisibleTemp.value = false;

  if (type === 'alipay') {
    aliDialogVisible.value = true;
    aliPayApi.ftofPayTemp(route.params.id as string).then((response) => {
      codeUrl.value = response.data.data.codeUrl;
      orderNo.value = response.data.data.orderNo;
    });
  } else {
    wxDialogVisible.value = true;
    wxPayApi.nativePayTemp(route.params.id as string).then((response) => {
      codeUrl.value = response.data.data.codeUrl;
      orderNo.value = response.data.data.orderNo;
    });
  }
};

// 查询订单状态
const queryOrderStatus = () => {
  orderInfoApi.queryOrderStatus(orderNo.value).then((response) => {
    if (response.data.code === 0) {
      wxDialogVisible.value = false;
      aliDialogVisible.value = false;
      setTimeout(() => {
        router.push({ path: `/download/${route.params.id}` });
      }, 500);
    }
  });
};

// 关闭支付对话框
const closeDialog = () => {
  payBtnDisabled.value = false;
};

// 初始化数据
onMounted(() => {
  const savedMode = localStorage.getItem('darkMode');
  isDark.value = savedMode === 'true';

  if (process.client) {
    judgeResource();
  }
});
</script>
<template>
  <div class="Resource">
    <!-- 选择支付方式（登录） -->
    <el-dialog :visible.sync="PaymentDialogVisibleLogin" :show-close="false" @close="closeDialog" width="320px" center>
      <h6 class="outh5">请选择支付方式</h6>
      <div class="swal2-content">
        <div id="swal2-content" style="display: block">
          <div class="pay-button-box">
            <div @click="selectPayTypeLogin('alipay')" class="pay-item" id="alipay" data-type="1">
              <img style="margin-right: 14px" height="40" width="40"
                src="../../static/image/pay/zhifubaorenzheng.svg" /><span>支付宝</span>
            </div>
            <div @click="selectPayTypeLogin('wxpay')" class="pay-item" id="weixinpay" data-type="2">
              <img style="margin: 12px" height="40" width="40"
                src="../../static/image/pay/weixinzhifu.svg" /><span>微信支付</span>
            </div>
            <div @click="selectPayTypeLogin('wxpay')" class="pay-item" id="weixinpay" data-type="2">
              <img style="margin: 12px" height="40" width="40"
                src="../../static/image/pay/jifen.svg" /><span>积分支付</span>
            </div>
          </div>
          <p style="font-size: 13px; padding: 0; margin: 0"></p>
        </div>
        <input class="swal2-input" style="display: none" /><input type="file" class="swal2-file"
          style="display: none" />
        <div class="swal2-range" style="display: none">
          <input type="range" /><output></output>
        </div>
        <select class="swal2-select" style="display: none"></select>
        <div class="swal2-radio" style="display: none"></div>
        <label for="swal2-checkbox" class="swal2-checkbox" style="display: none"><input type="checkbox" /><span
            class="swal2-label"></span></label><textarea class="swal2-textarea" style="display: none"></textarea>
        <div class="swal2-validation-message" id="swal2-validation-message" style="display: none"></div>
      </div>
    </el-dialog>
    <!-- 选择支付方式（临时） -->
    <el-dialog :visible.sync="PaymentDialogVisibleTemp" :show-close="false" @close="closeDialog" width="320px" center>
      <h6 class="outh5">请选择支付方式</h6>
      <div class="swal2-content">
        <div id="swal2-content" style="display: block">
          <div class="pay-button-box">
            <div @click="selectPayType('alipay')" class="pay-item" id="alipay" data-type="1">
              <img style="margin-right: 14px" height="40" width="40"
                src="../../static/image/pay/zhifubaorenzheng.svg" /><span>支付宝</span>
            </div>
            <div @click="selectPayType('wxpay')" class="pay-item" id="weixinpay" data-type="2">
              <img style="margin: 12px" height="40" width="40"
                src="../../static/image/pay/weixinzhifu.svg" /><span>微信支付</span>
            </div>
          </div>
          <p style="font-size: 13px; padding: 0; margin: 0">
            当前为游客购买模式
          </p>
        </div>
        <input class="swal2-input" style="display: none" /><input type="file" class="swal2-file"
          style="display: none" />
        <div class="swal2-range" style="display: none">
          <input type="range" /><output></output>
        </div>
        <select class="swal2-select" style="display: none"></select>
        <div class="swal2-radio" style="display: none"></div>
        <label for="swal2-checkbox" class="swal2-checkbox" style="display: none"><input type="checkbox" /><span
            class="swal2-label"></span></label><textarea class="swal2-textarea" style="display: none"></textarea>
        <div class="swal2-validation-message" id="swal2-validation-message" style="display: none"></div>
      </div>
    </el-dialog>
    <!-- 微信支付二维码 -->
    <div>
      <el-dialog :visible.sync="wxDialogVisible" :show-close="false" @close="closeDialog" width="320px" center>
        <h5 class="outh5">
          <img src="../../static/image/pay/weixinbig.png" class="alipaybig_icon" />
        </h5>
        <h5 class="outh5">
          <div class="bottom alipay">使用扫码支付 {{ price / 100 }}元</div>
        </h5>
        <h5 class="outh5">
          <!-- <qriously :value="codeUrl" :size="190" /> -->
        </h5>
        <div style="height: 40px"></div>
        <h5 class="outh7">
          <div style="color: #e0e0e0" class="bottom alipay">
            请使用微信扫一扫<br />扫描二维码支付<br />
          </div>
        </h5>
      </el-dialog>
    </div>
    <!-- 支付宝支付二维码 -->
    <div>
      <el-dialog :visible.sync="aliDialogVisible" :show-close="false" @close="closeDialog" width="320px" center>
        <h5 class="outh5">
          <img src="../../static/image/pay/alipaybig.png" class="alipaybig_icon" />
        </h5>
        <h5 class="outh5">
          <div class="bottom alipay">使用扫码支付 {{ price / 100 }}元</div>
        </h5>
        <h5 class="outh5">
          <!-- <qriously :value="codeUrl" :size="190" /> -->
        </h5>
        <div style="height: 40px"></div>
        <h5 class="outh6">
          <div style="color: #e0e0e0" class="bottom alipay">
            请使用支付宝扫一扫<br />扫描二维码支付<br />
          </div>
        </h5>
      </el-dialog>
    </div>
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app macwk-animation">
          <top :message2="acticve" />
          <div class="overflow-hidden pt-5">

            <div class="layout-header pt-5 pb-5 position-relative pc-model">
              <!-- ../static/image/loding.gif -->
              <div>
                <img src="../../static/image/shape-1.svg" class="shape-three" /><img
                  src="../../static/image/shape-55.svg" class="shape-four" /><img src="../../static/image/shape-56.svg"
                  class="shape-five" /><img src="../../static/image/shape-57.svg" class="shape-six" /><img
                  src="../../static/image/shape-58.svg" class="shape-seven" /><img src="../../static/image/shape-59.svg"
                  class="shape-eight" /><img src="../../static/image/shape-60.svg" class="shape-nine" /><img
                  src="../../static/image/shape-61.svg" class="shape-ten" /><img src="../../static/image/shape-62.svg"
                  class="shape-eleven" /><img src="../../static/image/shape-10.svg" class="shape-10" /><img
                  src="../../static/image/shape-11.svg" class="shape-11" />
              </div>
              <!-- 视频模式 -->
              <div v-if="IsvideoSource" class="container">
                <div class="row align-items-center">
                  <div class="col-xs-12 col-lg-6 col-xl-6">
                    <div class="header-app">
                      <img class="app-icon mr-3" />
                      <div class="list-body">
                        <h2 class="mb-4">
                          {{ title }}
                        </h2>
                        <div class="mb-15">
                          <el-button v-if="!IsFreePrice || IsFreePrice == '0'" :disabled="payBtnDisabled"
                            @click="Download()" class="large-btn btn btn-theme btn-round w-200 cursor mr-4" round><i
                              class="el-icon-download"></i>
                            免费下载</el-button>
                          <div v-else>
                            <el-button v-if="!payJudge" :disabled="payBtnDisabled" @click="Download()"
                              class="large-btn btn btn-theme btn-round w-200 cursor mr-4" round><i
                                class="el-icon-download"></i>
                              支付下载</el-button>
                            <el-button v-else :disabled="payBtnDisabled" @click="NowDownload()"
                              class="large-btn btn btn-theme btn-round w-200 cursor mr-4" round><i
                                class="el-icon-download"></i>
                              立即下载(已支付)</el-button>
                          </div>
                          <button v-if="!loveCheck" @click="loveClick()" class="
                              btn btn-outline-theme btn-round
                              px-5
                              zanUp
                              position-relative
                            ">
                            <img class="dianzan" src="../../static/image/dianzan.svg" />
                            赞 ({{ loveNum }})
                            <span class="likeanimation">+1</span>
                          </button>
                          <button v-else @click="loveClick()" class="
                              btn btn-outline-theme btn-round
                              px-5
                              zanUp
                              position-relative
                            ">
                            <img class="dianzan" src="../../static/image/dianzanred.svg" />
                            赞 ({{ loveNum }})
                            <span class="likeanimation">+1</span>
                          </button>
                        </div>
                        <div class="mt-4 mb-6"></div>

                        <div class="mt-6 fs-13">
                          <!---->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-6 col-xl-6 text-center">
                    <!-- <vue-core-video-player :src="videoSource" :title="title" theme="#50A1FF"></vue-core-video-player> -->

                    <!-- <div class="
                        device device-macbook-pro device-silver device-silver
                      ">
                      <div class="device-frame">


                      </div>
                      <div class="device-stripe"></div>
                      <div class="device-header"></div>
                      <div class="device-sensors"></div>
                      <div class="device-btns"></div>
                      <div class="device-power"></div>
                    </div> -->
                  </div>

                </div>
              </div>
              <!-- 普通模式 -->
              <div v-else class="container">
                <div class="row align-items-center">
                  <div class="col-xs-12 col-lg-6 col-xl-6">
                    <div class="header-app">
                      <img class="app-icon mr-3" />
                      <div class="list-body">
                        <h2 class="mb-4">
                          {{ title }}
                        </h2>
                        <div class="mb-15">
                          <el-button v-if="!IsFreePrice || IsFreePrice == '0'" :disabled="payBtnDisabled"
                            @click="Download()" class="large-btn btn btn-theme btn-round w-200 cursor mr-4" round><i
                              class="el-icon-download"></i>
                            免费下载</el-button>
                          <div v-else>
                          <el-button v-if="!payJudge" :disabled="payBtnDisabled" @click="Download()"
                            class="large-btn btn btn-theme btn-round w-200 cursor mr-4" round><i
                              class="el-icon-download"></i>
                            支付下载</el-button>
                          <el-button v-else :disabled="payBtnDisabled" @click="NowDownload()"
                            class="large-btn btn btn-theme btn-round w-200 cursor mr-4" round><i
                              class="el-icon-download"></i>
                            立即下载(已支付)</el-button>
                          </div>
                          <button v-if="!loveCheck" @click="loveClick()" class="
                              btn btn-outline-theme btn-round
                              px-5
                              zanUp
                              position-relative
                            ">
                            <img class="dianzan" src="../../static/image/dianzan.svg" />
                            赞 ({{ loveNum }})
                            <span class="likeanimation">+1</span>
                          </button>
                          <button v-else @click="loveClick()" class="
                              btn btn-outline-theme btn-round
                              px-5
                              zanUp
                              position-relative
                            ">
                            <img class="dianzan" src="../../static/image/dianzanred.svg" />
                            赞 ({{ loveNum }})
                            <span class="likeanimation">+1</span>
                          </button>
                        </div>
                        <div class="mt-4 mb-6"></div>

                        <div class="mt-6 fs-13">
                          <!---->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-6 col-xl-6 text-center">
                    <div class="
                        device device-macbook-pro device-silver device-silver
                      ">
                      <div v-if="carouselNum === 0" class="device-frame">
                        <el-carousel height="350px">
                          <el-carousel-item v-for="item in 1" :key="item.id">
                            <img style="height: 360px; width: 620px" :src="thumb" /><img />
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                      <div v-else class="device-frame">
                        <el-carousel height="350px">
                          <el-carousel-item v-for="item in carousel" :key="item.id">
                            <img style="height: 360px; width: 620px" :src="item.url" /><img />
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                      <div class="device-stripe"></div>
                      <div class="device-header"></div>
                      <div class="device-sensors"></div>
                      <div class="device-btns"></div>
                      <div class="device-power"></div>
                      <!---->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="soft-layout white bg mb-8 pc-model">
              <section class="layout-info">
                <div class="app-info shadow-2 white bg text-center">
                  <div class="w-r">
                    <div class="w-c w-c-4">
                      <div class="border-right my-4">
                        <p class="text-muted text-uppercase fs-10 ls-2 mb-0">
                          其他
                        </p>
                        <p class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          ">

                        </p>
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-70">

                        </p>
                      </div>
                    </div>
                    <div class="w-c w-c-4">
                      <div class="border-right my-4">
                        <p class="text-muted text-uppercase fs-10 ls-2 mb-0">
                          下载
                        </p>
                        <p v-if="hits == null" class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          ">

                          0
                        </p>
                        <p v-else class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          ">

                          {{ hits }}
                        </p>
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-70">
                          次
                        </p>
                      </div>
                    </div>
                    <div class="w-c w-c-4">
                      <div class="border-right my-4">
                        <p class="text-muted text-uppercase fs-10 ls-2 mb-0">
                          语言
                        </p>
                        <p class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          ">
                          <span class="text-inherit"> 中文 </span>
                        </p>
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-70">
                          cn
                        </p>
                      </div>
                    </div>
                    <div class="w-c w-c-4">
                      <div class="border-right my-4">
                        <p class="text-muted text-uppercase fs-10 ls-2 mb-0">
                          价格
                        </p>
                        <p class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          ">
                          {{ price }}积分
                        </p>
                        <p class="fs-10 ls-2 mb-0 opacity-70">money</p>
                      </div>
                    </div>
                    <div class="w-c w-c-4">
                      <div class="border-right my-4">
                        <p class="text-muted text-uppercase fs-10 ls-2 mb-0">
                          类别
                        </p>
                        <client-only>
                        <p  class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                            hover-opacity-normal
                          ">

                          <NuxtLink :to="'/classdetal/' + sortClasss">
                            {{ className }}
                            <i class="icon-arrow-r text-muted"></i></NuxtLink>
                        </p></client-only>
                        <p class="fs-10 ls-2 mb-0 opacity-70">enhancement</p>
                      </div>
                    </div>
                    <div class="w-c w-c-4">
                      <div class="my-4">
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-40">
                          更新日期
                        </p>

                        <p class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          " v-if="createTime != null" v-text="createTime"></p>
                        <p class="
                            mb-0
                            fs-20
                            font-weight-bolder
                            line-height-3
                            opacity-70
                          " v-else v-text="addTime"></p>
                        <p class="text-uppercase fs-10 ls-2 mb-0 opacity-70">
                          {{ Theweeks }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="layout-content">
                <div id="step-read" class="layout-content-install pt-7 mb-5"></div>
                <!---->
                <!---->
                <div id="step-content" class="layout-content-infos">
                  <div class="container">
                    <div class="content-header">
                      <div class="h-150 w-r is-align-middle w-r--flex">
                        <div class="w-c w-c-2">
                          <svg width="80" height="70" viewBox="0 0 125 107" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd">
                              <circle cx="48" cy="59" r="48" class="circle-fill"></circle>
                              <path
                                d="M58.536 39.713c0-6.884 1.72-14.007 5.163-21.368 3.443-7.36 8.167-13.458 14.173-18.292l11.645 7.91c-3.589 4.98-6.262 10.016-8.02 15.106S78.86 33.598 78.86 39.384v13.623H58.536V39.713z"
                                class="path-fill"></path>
                              <path
                                d="M93.252 39.713c0-6.884 1.722-14.007 5.164-21.368 3.442-7.36 8.166-13.458 14.172-18.292l11.646 7.91c-3.589 4.98-6.262 10.016-8.02 15.106s-2.637 10.529-2.637 16.315v13.623H93.252V39.713z"
                                class="path-fill-1"></path>
                            </g>
                          </svg>
                        </div>
                        <div class="w-c w-c-22">
                          <h3>
                            正文概述
                            <!---->
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="soft-blockquote fw-400">
                        <div>
                          <p>{{ intro }}</p>
                        </div>
                      </div>
                      <!---->
                      <!---->
                    </div>
                    <!-- 内容区域 -->
                    <div id="sidelist" v-html="content"></div>
                  </div>
                </div>
                <!---->
                <!---->
              </section>
            </div>
            <mobile />
            <div class="el-dialog__wrapper text-center" style="display: none">
              <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog no-bg no-shadow"
                style="margin-top: 15vh; width: 1300px">
                <div class="el-dialog__header">
                  <span class="el-dialog__title"></span><button type="button" aria-label="Close"
                    class="el-dialog__headerbtn">
                    <i class="el-dialog__close el-icon el-icon-close"></i>
                  </button>
                </div>
                <!---->
                <!---->
              </div>
            </div>
            <!---->
            <div id="sidetools" class="macwk-animation tinUpIn" style="display: none">
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a href="https://t.me/macwk" target="_blank" class="cursor"><span
                      class="sidetools-icon kfqq"></span></a>
                </div>
              </div>
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a class="el-tooltip cursor"><span class="sidetools-icon back-top"></span></a>
                </div>
              </div>
              <span>
                <div role="tooltip" id="el-popover-6929" aria-hidden="true" class="el-popover el-popper"
                  style="width: 200px; display: none">
                  <!---->
                  <div class="text-center">
                    <a href="/feedback" class="mt-15 mb-0">在线留言</a>
                  </div>
                </div>
                <span class="el-popover__reference-wrapper"></span>
              </span>
              <span>
                <div role="tooltip" id="el-popover-3926" aria-hidden="true" class="el-popover el-popper"
                  style="width: 200px; display: none">
                  <!---->
                  <div class="text-center">
                    <a href="/feedback" class="mt-15 mb-0">在线留言</a>
                  </div>
                </div>
                <span class="el-popover__reference-wrapper"></span>
              </span>
            </div>
            <!---->
            <!---->
          </div>
          <!-- v-on:click="show = !show"
                v-if="!show" -->
          <client-only>
            <div class="myVEmojiPicker">
              <EmojiPicker v-show="showDialog" :style="{ width: '340px', height: '200' }" labelSearch="Search"
                lang="pt-BR" :native="true" @select="onSelectEmoji" />
            </div>
          </client-only>
          <!-- 后台控制是否显示评论 -->
          <!-- <div v-if="!glabledata.glableCommentShow">
            <div v-show="!judjeComment"> -->
          <section v-if="mycomment" @click="sendMsg" class="
              fiexd-comments-bar
              d-flex
              align-items-center
              is-scroll
              macwk-animation
              slow
              pc-model
              tinRightIn
            ">
            <div class="
                d-flex
                align-items-center
                fs-20
                fw-700
                cursor-pointer
                w-full
                pl-3
              ">
              <div class="flex">
                共
                <span class="fs-36 mx-1">{{ commentNum || 0 }}</span>
                条评论
              </div>
              <svg color="inherit" viewbox="0 0 32 32" class="w-32" style="
                  width: 1.5em;
                  height: 1.5em;
                  font-size: 2rem;
                  vertical-align: -6px;
                ">
                <path fill="#FFFFFF"
                  d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46">
                </path>
                <path
                  d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z"
                  class="comment-icon-path"></path>
              </svg>
            </div>
          </section>
          <!-- </div>
          </div> -->
          <ResComment v-if="!mycomment" :articleId="$route.params.id" :theEmoge="MyEmoge" ref="child"
            @closethecpmmentName="updateDate()" @openthecpmmentName="showemoge()" /> -->
          <!--
          <!---->
          <foot />
          <div infos="0">
            <div class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 
<script>

import { getResourceById } from "../../asyncApi/webresource";

import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";

import comment from '../components/ResComment.vue'

import { getResourceCommentnum } from '@/api/webresourceComment'
import { loveresource } from '@/api/webresource'
import { getResourceClassNameByid } from '@/api/webresourceclass'

import { formatDate, GetWeekdate } from '@/utils/date.js'

import wxPayApi from '../../api/payment/wxPay'
import aliPayApi from '../../api/payment/aliPay'
import orderInfoApi from '../../api/payment/orderInfo'
export default {

  name: 'Resource',
  components: {
    top: () => import("../components/Top.vue"),
    foot: () => import("../components/Foots.vue"),
    comment, VEmojiPicker

  },
  // 当你想要动态页面内容有利于SEO或者是提升首屏渲染速度的时候，就在asyncData中请求数据
  // 所有接口通过服务端调用渲染
  // 只有列表通过服务端调用渲染，分类跟推荐接口在浏览器调用
  async asyncData({ route }) {
    let [Resource] = await Promise.all([
      getResourceById({ page: route.params.id || 1 }),
    ]);
    return {
      Resource: Resource,
      createTime: Resource.createTime,
      addTime: Resource.addTime,
      page: parseInt(route.params.id || 1),
    };
  },
  methods: {
    loveClick() {
      if (!lovecheck) {
        if (firstLoveFlag) {
          loveresource($route.params.id).then(resp => {
          })
          firstLoveFlag = false
        }
        $notify({
          title: '点赞成功👍',
          message: '您的赞我们已经收到🫡',
          type: 'success',
          offset: 50
        });
        loveNum += 1
        lovecheck = true
      }
      else {
        $notify({
          title: '取消点赞',
          message: '是什么让您不喜欢了吗，我道歉',
          type: 'success',
          offset: 50
        });
        loveNum -= 1
        lovecheck = false
      }
    },
    onSelectEmoji(emoji) {
      MyEmoge = emoji.data;
    },
    showemoge() {
      // console.log("show")
      showDialog = !showDialog;
    },
    sendMsg() {
      $refs.child.getMsg('true');
      mycomment = false;
    },
    updateDate() {
      //关闭表情
      showDialog = false
      // console.log(data.show)
      mycomment = true;
      // console.log("调用了父组件的方法")
      // show1 = data.show;
      //改变了父组件的值
      // console.log('toCity:'+show1)
    },
    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd ')
    },
    // 查询订单状态
    queryOrderStatus() {
      orderInfoApi.queryOrderStatus(orderNo).then(response => {
        console.log('查询订单状态：' + response.data.code)

        // 支付成功后的页面跳转
        if (response.data.code === 0) {
          console.log('清除定时器')
          clearInterval(timer)
          // 关闭页面支付框
          wxDialogVisible = false
          aliDialogVisible = false
          $notify({
            title: '支付成功',
            message: '您已成功购买',
            type: 'success',
            offset: 50
          });
          // 三秒后跳转到订单列表
          setTimeout(() => {
            $router.push({ path: '/download/' + $route.params.id })
          }, 500)
        }
      })
    },

    //关闭微信支付二维码对话框时让“确认支付”按钮可用
    closeDialog() {
      console.log('close.................')
      payBtnDisabled = false
      console.log('清除定时器')
      clearInterval(timer)
    },

    //选择支付方式(登录)
    selectPayTypeLogin(type) {
      console.log('支付方式：' + type)
      payOrder.payType = type
      //关闭支付方式选择
      PaymentDialogVisibleTemp = false
      PaymentDialogVisibleLogin = false
      //打开对应支付页面

      //支付宝支付
      if (payOrder.payType === 'alipay') {
        aliDialogVisible = true
        //调用统一下单接口
        aliPayApi.ftofPayLogin($route.params.id, userid).then(response => {
          codeUrl = response.data.data.codeUrl
          orderNo = response.data.data.orderNo

          //启动定时器
          timer = setInterval(() => {
            //查询订单是否支付成功
            queryOrderStatus()
          }, 3000)

        })
      }
      //微信支付
      if (payOrder.payType === 'wxpay') {
        //打开支付二维码
        wxDialogVisible = true
        //调用统一下单接口
        wxPayApi.nativePayLogin($route.params.id, userid).then(response => {
          console.log(response.data.data.codeUrl)
          codeUrl = response.data.data.codeUrl
          orderNo = response.data.data.orderNo

          //启动定时器
          timer = setInterval(() => {
            //查询订单是否支付成功
            queryOrderStatus()
          }, 3000)

        })

      }
    },
    //选择支付方式(临时)
    selectPayType(type) {
      console.log('支付方式：' + type)
      payOrder.payType = type
      //关闭支付方式选择
      PaymentDialogVisibleTemp = false
      PaymentDialogVisibleLogin = false
      //打开对应支付页面
      //支付宝支付
      if (payOrder.payType === 'alipay') {
        aliDialogVisible = true
        //调用统一下单接口
        aliPayApi.ftofPayTemp($route.params.id).then(response => {
          codeUrl = response.data.data.codeUrl
          orderNo = response.data.data.orderNo

          //启动定时器
          timer = setInterval(() => {
            //查询订单是否支付成功
            queryOrderStatus()
          }, 3000)

        })
      }
      //微信支付
      if (payOrder.payType === 'wxpay') {
        //打开支付二维码
        wxDialogVisible = true

        //调用统一下单接口
        wxPayApi.nativePayTemp($route.params.id).then(response => {
          console.log(response.data.data.codeUrl)
          codeUrl = response.data.data.codeUrl
          orderNo = response.data.data.orderNo

          //启动定时器
          timer = setInterval(() => {
            //查询订单是否支付成功
            queryOrderStatus()
          }, 3000)

        })

      }
    },
    NowDownload() {
      setTimeout(() => {
        $router.push({ path: '/download/' + $route.params.id })
      }, 500)

    },
    Download() {
      if (process.client) {
        if (process.client) {
        const user = $cookies.get("access-user")
      }
              userJudje = (user == null)
        if (!userJudje) { userid = user.data.userid }
        if (userJudje) {
          //游客购买
          console.log("游客购买")
          //禁用按钮，防止重复提交
          payBtnDisabled = true
          //打开支付方式选择
          PaymentDialogVisibleTemp = true
        }
        else {
          //登录用户购买
          console.log("登录用户购买")
          //禁用按钮，防止重复提交
          payBtnDisabled = true

          //打开支付方式选择
          PaymentDialogVisibleLogin = true
        }
      }
    },
    async judgeResource() {
      if (process.client) {
        const user = $cookies.get("access-user")
      }
      userJudje = (user == null)
      if (!userJudje) {
        userid = user.data.userid
        let [res] = await orderInfoApi.queryOrderStatusBytrue($route.params.id, userid);
        if (res) {
          //检查已登录用户是否购买过此资源，根据userid和resourceid判断
          if (res.data.code == 0) {
            payJudej = false
          }
          if (res.data.code == 101) {
            payJudej = true
          }
        }
      }
    },
    async fetchData() {

      hits = Resource.hits
      loveNum = Resource.loveNum
      if (loveNum == null) {
        loveNum = 0
      }
      videoAddress = Resource.videoAddress
      // 将videoAddress封装为videoSource形式
      videoSource = [{
        src: videoAddress,
        resolution: '1080p' // 你也可以根据需求添加其他分辨率
      }];

      thumb = Resource.thumb
      title = Resource.title
      price = Resource.price
      author = Resource.author
      content = Resource.content
      intro = Resource.intro

      var str = JSON.parse(Resource.carousel)
      carouselNum = str.length
      carousel = str
      var sortClasss = Resource.sortClass
      sortClasss = sortClasss
      //根据classid获取分类名称
      var res = await getResourceClassNameByid(sortClasss);
      if (res) {
        className = res.data;
      }
      //获取资源评论数量
      getResourceCommentnum($route.params.id).then(resp => {
        commentnum = resp.data
      })
      if (createTime != null) {
        let data = new Date(createTime)
        var intime = formatDate(data, 'yyyy-MM-dd')
        var tiems = GetWeekdate(intime)
        Theweeks = weeks[tiems]
      } else {
        let data = new Date(addTime)
        var intime = formatDate(data, 'yyyy-MM-dd')
        var tiems = GetWeekdate(intime)
        Theweeks = weeks[tiems]
      }
      intro = Resource.intro
    },
  },
  data() {
    return {
      isDark: false,
      videoSource: [],
      videoAddress: "",
      lovecheck: false,
      firstLoveFlag: true,
      loveNum: "",
      hits: "",
      carouselNum: "",
      commentnum: "",
      MyEmoge: "",
      showDialog: false,
      mycomment: true,
      carousel: [],
      className: "",
      sortClasss: "",
      sortClass: "",
      Theweeks: "",
      weeks: {
        "0": '星期日',
        "1": '星期一',
        "2": '星期二',
        "3": '星期三',
        "4": '星期四',
        "5": '星期五',
        "6": '星期六',
      },

      payJudej: true,
      payBtnDisabled: false,
      orderNo: "",
      codeUrl: "url",
      payOrder: { //订单信息
        productId: '', //商品id
        payType: 'wxpay' //支付方式
      },
      PaymentDialogVisibleLogin: false, //支付方式弹窗
      PaymentDialogVisibleTemp: false, //支付方式弹窗
      wxDialogVisible: false, //微信支付二维码弹窗
      aliDialogVisible: false, //支付宝支付二维码弹窗
      intro: "",
      content: "",
      price: "",
      title: "",
      acticve: 'nav-link active',
    }
  },
  computed: {
  themeClass() {
      console.log(isDark)
      return isDark ? 'black' : 'light';
    }
  },
  mounted() {
    // 判断是否在服务端
    if (process.client) {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === 'true') {
        isDark = true;
      } else {
        isDark = false;
      }
      // lazyLoad();
      // 在浏览器端调接口，需要服务端做反向代理
      // //数据回填
      fetchData()
    } else {
      //根据Id查询用户是否购买过此资源
      judgeResource()
    }

    // 顶部广告
    // (window.slotbydup = window.slotbydup || []).push({
    //   id: "u6324930",
    //   container: "_utrtw8kq5so",
    //   async: true,
    // });
  },
}
</script> -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-container {
  z-index: 20 !important;
  border-radius: 10px !important;
  -webkit-box-shadow: 0 5px 25px 0 rgb(0 0 0 / 13%) !important;
  box-shadow: 0 5px 25px 0 rgb(0 0 0 / 13%) !important;
  background-color: #fff !important;
  width: 360px !important;
  height: 80% !important;
  left: auto !important;
  right: 20px !important;
  bottom: 20px !important;
}
</style>

<style scoped>
.myVEmojiPicker :deep(.category) {
  background: none;
}

.myVEmojiPicker :deep(.border) {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker :deep(.myVEmojiPicker[data-v-3bfe90b7]) .border {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker :deep(.category.active[data-v-6d975e7c]) {
  border-bottom: 3px solid #50a1ff;
}

.myVEmojiPicker :deep(.grid-emojis[data-v-5c988bee]) {
  background: #ffffff;
}

.myVEmojiPicker :deep(.emoji-picker[data-v-f1d527bc]) {
  --ep-color-bg: #ffffff;
  --ep-color-sbg: none;
}

.myVEmojiPicker {
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 390px;
  bottom: 20px;
  z-index: 10;
}

.alipaybig_icon {
  display: inline-block;
  width: 120px;
  margin: 0;
  padding: 0;
  text-align: center;
}

.outh5 {
  padding: 0px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
}

.outh6 {
  height: 66px;
  text-align: center;
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 320px;
  background-color: #01a7ef;
  padding: 7px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 0 0 10px 10px;
}

.outh7 {
  height: 66px;
  text-align: center;
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 320px;
  background-color: #09bb21;
  padding: 7px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 0 0 10px 10px;
}
</style>
<style>
.el-dialog--center {
  border-radius: 10px;
}

.el-dialog--center .el-dialog__body {
  border-radius: 10px;
  text-align: initial;
  background-color: #fff;
}

.el-dialog__header {
  display: none;
  background-color: #e0e0e0;
}
</style>
<style scoped>
.pay-button-box {
  padding: 12px 30px;
  z-index: 1;
  text-align: center;
}

.swal2-content {
  z-index: 1;
  justify-content: center;
  margin: 0;
  padding: 0;
  color: #545454;
  font-size: 1.125em;
  font-weight: 300;
  line-height: normal;
  text-align: center;
  word-wrap: break-word;
}

.pay-item {
  width: 100%;
  height: 60px;
  border: 0;
  cursor: pointer;
  font-size: 1.25rem;
  display: inline-block;
  line-height: 60px;
  text-align: center;
}

.device-macbook-pro .device-frame:before {
  bottom: 10px;
  color: #c8cacb;
  content: "IceCMS.cn";
  font-size: 12px;
  height: 16px;
  left: 50%;
  line-height: 16px;
  margin-left: -100px;
  position: absolute;
  text-align: center;
  width: 200px;
  z-index: 1;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.dianzan {
  weight: 25px;
  height: 25px;
}

.player-container-out {
  width: 70%;
  display: flex;
}

/* 自定义样式 */
.large-btn {
  font-size: 18px;
  /* 调整字体大小 */
  padding: 15px 30px;
  /* 调整按钮内边距 */
  height: 45px;
  /* 设置按钮高度 */
  line-height: 50px;
  /* 使文本垂直居中 */
}
</style>
