<script setup lang="ts">
import { ref, computed, onMounted, watchEffect, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useContentStore } from '../../../stores/AlllistContent';

import { getResourceClasslist } from '../../../api/webresourceclass';
import { getAllResource, getAllResourceNumber, getResourceByType, getResourceByClassAndType, getResourceFilter, getRecommendedResources, getHotResources, getLatestResources } from '../../../api/webresource';

// 获取路由参数
const route = useRoute();
const router = useRouter();

const contentStore = useContentStore();
const { activeTab, contentList, layoutType, layoutActive, showFootNext, isTargetBlank } = storeToRefs(contentStore);

// Reactive state
const setting = ref<any>({});
const acticve = ref<string>("nav-link active");
const loading = ref(true);
const isAcitive = ref<number | null>(null);
const sortOrder = ref("new");
const allIndex = ref(true);
const classlist = ref<any[]>([]);
const istargetjudje = ref(isTargetBlank.value);
const istarget = ref(isTargetBlank.value ? "_blank" : "_self");
const ResourceNumber = ref("");
const list = ref<any[]>([]);
const total = ref(0);
// 相关推荐数据
const recommendedList = ref<any[]>([]);
const hotList = ref<any[]>([]);
const latestList = ref<any[]>([]);
// 使用 Pinia store 中的状态
const layoutactive = computed(() => layoutActive.value.layout);
const gridactive = computed(() => layoutActive.value.grid);
const listactive = computed(() => layoutActive.value.list);
const showfootnext = computed(() => showFootNext.value);
const gridOrlist = computed(() => layoutType.value);

const listQuery = ref({
  page: 1,
  limit: 10
});

const listQueryClass = ref({
  page: 1,
  limit: 20,
  class: ""
});

import { useSettingStore } from '../../../stores/setting';
const settingStore = useSettingStore();
setting.value = settingStore.settings;

// 当前选中的项
const clickIndex = ref<number | null>(null);

// 当路由变化时，设置 clickIndex 为当前路由中的 id
watchEffect(() => {
  const routeId = route.params.id ? Number(route.params.id) : null;
  clickIndex.value = routeId;
});

// 监听路由变化，重新获取数据
watch(() => route.params.id, () => {
  handleGetList();
});

// 监听标签变化，重新获取数据
watch(() => activeTab.value, () => {
  handleGetList();
});

// 点击时的处理方法
const handleClick = (id: number) => {
  clickIndex.value = id; // 改变高亮的项
  router.push(`/Alllist/${id}`); // 使用 Vue Router 跳转到对应页面
  // 重新获取数据
  handleGetList();
};

function handleClickIndex() {
  allIndex.value = true;
  clickIndex.value = null;
  router.push(`/Alllist`); // 使用 Vue Router 跳转到对应页面
  // 重新获取数据
  handleGetList();
}

// 获取资源列表
async function handleGetList() {
  try {
    loading.value = true;

    let result: any;
    const currentClassId = route.params.id ? Number(route.params.id) : null;

    // 标签到filter的映射
    const tabToFilterMap = {
      'new': 'news',
      'hot': 'download',
      'commend': 'discuss',
      'like': 'love',
      'recommend': 'recommend'
    };

    const filterType = tabToFilterMap[activeTab.value as keyof typeof tabToFilterMap] || 'news';

    // 根据是否有分类ID和当前激活的标签选择对应的接口
    if (currentClassId) {
      // 有分类ID，优先使用getResourceFilter接口
      const query = {
        page: listQuery.value.page,
        limit: listQuery.value.limit,
        class: currentClassId.toString()
      };
      result = await getResourceFilter(query, filterType);
      allIndex.value = false;
    } else if (activeTab.value !== 'new') {
      // 没有分类ID但有特定标签，使用类型接口
      result = await getResourceByType(listQuery.value, activeTab.value);
      allIndex.value = true;
    } else {
      // 默认情况，使用原有的全部资源接口
      result = await getAllResource(listQuery.value);
      allIndex.value = true;
    }

    console.log("API响应结果:", result);

    // useFetchGet 直接返回数据
    if (result) {
      if (Array.isArray(result)) {
        list.value = result;
        total.value = result.length;
      } else if (typeof result === 'object' && result.data) {
        list.value = result.data;
        total.value = result.total || result.data.length;
      } else {
        list.value = [];
        total.value = 0;
        console.warn('API返回的数据格式不符合预期:', result);
      }
    } else {
      console.warn('API返回的数据为空');
      list.value = [];
      total.value = 0;
    }
  } catch (error) {
    console.error('获取资源列表出错:', error);
    // 出错时设置空数组，保证页面可以正常渲染
    list.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
}

// 获取资源分类
async function handleGetClasslist() {
  try {
    const result = await getResourceClasslist();

    console.log("获取分类结果:", result);

    // useFetchGet 方法返回的是直接数据，不需要 .data
    if (result) {
      classlist.value = Array.isArray(result) ? result : [];
    } else {
      console.warn('获取分类数据为空');
      classlist.value = [];
    }
  } catch (error) {
    console.error('获取资源分类出错:', error);
    // 出错时设置空数组，保证页面可以正常渲染
    classlist.value = [];
  }
}

// 获取相关推荐数据
async function handleGetRecommendations() {
  try {
    const currentClassId = route.params.id ? Number(route.params.id) : null;

    // 获取相关推荐（基于当前分类或全局）
    const recommendedResult = await getRecommendedResources(6, currentClassId);
    recommendedList.value = Array.isArray(recommendedResult) ? recommendedResult : [];

    // 获取热门资源
    const hotResult = await getHotResources(5);
    hotList.value = Array.isArray(hotResult) ? hotResult : [];

    // 获取最新资源
    const latestResult = await getLatestResources(5);
    latestList.value = Array.isArray(latestResult) ? latestResult : [];

    console.log('相关推荐数据:', {
      recommended: recommendedList.value,
      hot: hotList.value,
      latest: latestList.value
    });
  } catch (error) {
    console.error('获取相关推荐数据出错:', error);
    recommendedList.value = [];
    hotList.value = [];
    latestList.value = [];
  }
}

// Pagination handlers
function handleSizeChange(val: number) {
  listQuery.value.limit = val;
  handleGetList();
}

function handleCurrentChange(val: number) {
  listQuery.value.page = val;
  handleGetList();
}

// Layout change functions
function changeGrid() {
  console.log("changeGrid");
  // 更新 Pinia store 中的状态
  contentStore.setLayoutActive("active", "", "");
  contentStore.setLayoutType("grid-grid");
  contentStore.setShowFootNext(false);
}

function changeList() {
  console.log("changeList");
  // 更新 Pinia store 中的状态
  contentStore.setLayoutActive("", "active", "");
  contentStore.setLayoutType("grid-list");
  contentStore.setShowFootNext(true);
}

function changeLayout() {
  console.log("changeLayout");
  // 更新 Pinia store 中的状态
  contentStore.setLayoutActive("", "", "active");
  contentStore.setLayoutType("horizontal-layout");
  contentStore.setShowFootNext(false);
}

// 新窗口打开切换
function istargetJudje() {
  // 更新 Pinia store 中的状态
  contentStore.setIsTargetBlank(istargetjudje.value);
  if (!istargetjudje.value) {
    istarget.value = "_self";
  } else {
    istarget.value = "_blank";
  }
}

// 获取随机样式
function getStyles() {
  const max = 8;
  const min = 1;
  const x = Math.floor(Math.random() * (max - min + 1)) + min;
  const backcolor = "randomColor" + x;

  const styles = {
    randomColor1: "background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);",
    randomColor2: "background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);",
    randomColor3: "background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);",
    randomColor4: "background-image: linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);",
    randomColor5: "background-image: linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);",
    randomColor6: "background-image: linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%);",
    randomColor7: "background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);",
    randomColor8: "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
  };

  return styles[backcolor as keyof typeof styles] || styles.randomColor8;
}

// 鼠标移入赋值index
async function dowmloadover(index: number) {
  isAcitive.value = index;
}
// 鼠标移出
async function downloadleave() {
  isAcitive.value = null;
}

// Date formatting function
function formatDate(time: string) {
  const date = new Date(time);
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();

  if (currentYear - year === 1) {
    return '去年 ' + date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
  } else if (currentYear - year === 2) {
    return '前年 ' + date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
  } else if (currentYear - year > 2) {
    return '多年前';
  } else {
    return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
  }
}

// 获取页面标题
function getPageTitle() {
  const currentClassId = route.params.id ? Number(route.params.id) : null;
  let title = '全部资源';

  // 如果有分类ID，查找对应的分类名称
  if (currentClassId && Array.isArray(classlist.value)) {
    const currentClass = classlist.value.find((item: any) => item.id === currentClassId);
    if (currentClass) {
      title = currentClass.name;
    }
  }

  // 根据激活的标签添加后缀
  const tabNames = {
    'new': '最新',
    'hot': '热门下载',
    'commend': '评论最多',
    'like': '最受喜欢',
    'recommend': '精品推荐'
  };

  if (activeTab.value !== 'new') {
    title += ` - ${tabNames[activeTab.value as keyof typeof tabNames] || activeTab.value}`;
  }

  return title;
}

// 在页面挂载后初始化数据
onMounted(async () => {
  await handleGetClasslist();
  await handleGetList();
  await handleGetRecommendations();
  // 初始化新窗口打开状态
  istargetjudje.value = isTargetBlank.value;
  istarget.value = isTargetBlank.value ? "_blank" : "_self";
});
</script>


<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <div id="__layout">
        <div data-fetch-key="0" class="app macwk-animation">
          <top :message2="acticve" />
          <div class="app-main mobile-layout">
            <div class="w-full bg auto d-flex layout-min-full-height" :class="gridOrlist">
              <div class="app-sidebar pc-model">
                <div class="pr-3 pl-2">
                  <p class="fs-12 opacity-40 mb-0 pt-1">分类</p>
                  <div class="macwk-sidebar mb-4 vsm_expanded">
                    <div class="vsm--scroll-wrapper">
                      <div class="vsm--list">
                        <div class="vsm--item" @click="handleClickIndex()">
                          <span role="link" href="[object Object]" class="vsm--link vsm--link_level-1"
                                :class="{ ' vsm--link_active': allIndex }"><span class="vsm--title">全部资源</span>
                          </span>
                        </div>
                        <div @click="handleClick(item.id)" class="vsm--item" v-for="(item, id) in classlist" :key="id">

                          <span role="link" :href="'/class/' + item.id" class="vsm--link vsm--link_level-1"
                                :class="{ 'vsm--link_active': item.id === clickIndex }">

                            <span class="vsm--title">{{ item.name }}</span>

                            <div class="vsm--arrow vsm--arrow_slot">
                              <span><i class="icon-chevron-right"></i></span>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="mb-5">
                    <p class="fs-12 opacity-40 mb-3">兼容性</p>
                    <a class="d-block mb-2 fs-15 cursor-pointer active"
                      ><i class="fs-14 mr-1 icon-check-circle"></i>
                      <span class="el-tooltip item">全部</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">Silicon M1</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">Big Sur</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">Monterey</span></a
                    >
                  </div>
                  <div class="mb-5">
                    <p class="fs-12 opacity-40 mb-3">语言</p>
                    <a class="d-block mb-2 fs-15 cursor-pointer active"
                      ><i class="fs-14 mr-1 icon-check-circle"></i>
                      <span class="el-tooltip item">全部</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">中文</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">英文</span></a
                    >
                  </div>
                  <div class="mb-5">
                    <p class="fs-12 opacity-40 mb-3">类型</p>
                    <a class="d-block mb-2 fs-15 cursor-pointer active"
                      ><i class="fs-14 mr-1 icon-check-circle"></i>
                      <span class="el-tooltip item">全部</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">开源</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">破解</span></a
                    >
                  </div>
                  <div class="mb-5">
                    <p class="fs-12 opacity-40 mb-3">过滤</p>
                    <a class="d-block mb-2 fs-15 cursor-pointer active"
                      ><i class="fs-14 mr-1 icon-check-circle"></i>
                      <span class="el-tooltip item">全部</span></a
                    ><a class="d-block mb-2 fs-15 cursor-pointer"
                      ><i class="fs-14 mr-1 icon-circle text-muted"></i>
                      <span class="el-tooltip item">侵权</span></a
                    >
                  </div> -->
                </div>
              </div>
              <div class="app-content pc-model">
                <div class="app-content-main">
                  <div class="app-content-list">
                    <div class="app-content-header">
                      <div class="main-title">
                        <h5 class="i-con-h-a">
                          {{ getPageTitle() }}
                          <span class="text-muted fs-13 v-1 ml-1">
                            {{ ResourceNumber }}
                          </span>
                        </h5>
                      </div>
                      <!-- 选项卡 -->
                      <nav class="menu menu--macwk-list macwk-soft-list-menu flex">
                        <ul class="menu__list">
                          <li style="display: flex;">
                            <button v-for="tab in ['new', 'hot', 'commend', 'like', 'recommend']" class="menu__link"
                                    :key="tab" :class="{ active: activeTab === tab }" @click="contentStore.setActiveTab(tab)">
                              {{ tab === 'new' ? '最新' : tab === 'hot' ? '下载' : tab === 'commend' ? '评论' : tab === 'like'
                                ? '喜欢' : tab === 'recommend' ? '推荐' : '' }}

                            </button>
                          </li>
                        </ul>
                      </nav>
                      <div class="target-blank">
                        <div role="switch" class="el-switch mr-6" style="margin-top: -3px">
                          <input type="checkbox" name="" true-value="true" class="el-switch__input" />
                          <!---->
                          <div>
                            <el-switch v-model="istargetjudje" @change="istargetJudje()" active-color="#13ce66"
                                       inactive-color="#ff4949">
                            </el-switch>
                          </div>

                          <span class="el-switch__label el-switch__label--right"><!----><span
                              aria-hidden="true">新窗口打开</span></span>
                        </div>
                      </div>
                      <div class="d-flex justify-content-end">
                        <div class="grid-change">
                          <a @click="changeLayout()" class="i-con-h-a position-relative cursor" :class="layoutactive"><i
                              class="i-con i-con-layout"><i></i></i></a>
                          <a @click="changeList()"
                             class="i-con-h-a position-relative cursor" :class="listactive"><i
                              class="i-con i-con-list"><i></i></i></a>
                          <a @click="changeGrid()"
                             class="i-con-h-a position-relative cursor" :class="gridactive"><i
                              class="i-con i-con-grid"><i></i></i></a>
                        </div>
                      </div>
                    </div>
                    <!---->
                    <div id="listAppContainer" class="app-content-body listAppContainer">
                      <div :class="['mw-row', gridOrlist]">
                        <!-- 水平布局时的特殊结构 -->
                        <template v-if="gridOrlist === 'horizontal-layout'">
                          <div class="horizontal-main-content">
                            <div v-for="item, index in list" :key="item?.id || index" class="mw-col list-animation-leftIn delay-3">
                              <div v-if="!setting.imageFormat">
                                <div v-if="item && item.status && item.status.includes('published')">
                                  <nuxt-link :target="istarget" :to="'/list/' + (item?.id || '')">
                                    <a class="macwk-app border white cursor-pointer">
                                      <el-image v-if="item.thumb != null" class="listtitleimg delay-3" :src="item.thumb" lazy>
                                        <div slot="placeholder" class="image-slot">
<!--                                          <img style="width: 100%; height: 100%; object-fit: cover;" src="../../static/image/loading.gif" />-->
                                        </div>
                                      </el-image>
                                      <div v-else class="delayImg" :style="getStyles()">
                                        <h3 class="flex text-center text-white opacity-50">NOPIC</h3>
                                      </div>
                                      <div class="macwk-app__body">
                                        <div class="card-meta">
                                          <div class="meta-item post-author">
                                            <el-avatar style="margin-bottom: 3px; margin-right: 3px;" :src="item.authorThumb"></el-avatar>
                                            <a class="author-name">{{ item.author }}</a>
                                          </div>
                                          <span v-if="item.createTime != null" class="meta-item">{{ formatDate(item.createTime) }}</span>
                                          <span v-else class="meta-item">{{ formatDate(item.addTime) }}</span>
                                          <span class="meta-item"><i class="el-icon-share"></i></span>
                                        </div>
                                        <h3 class="heading-tertiary-list">{{ item.title }}</h3>
                                        <p class="description">{{ item.intro || '暂无介绍' }}</p>
                                        <div class="tag-container">
                                          <span class="tag">{{ item.className || '未分类' }}</span>
                                        </div>
                                        <div class="stats-container">
                                          <div class="stat-item">
                                            <i class="icon-eye"></i>
                                            <span>{{ item.hits || 0 }}</span>
                                          </div>
                                          <div class="stat-item">
                                            <i class="icon-heart"></i>
                                            <span>{{ item.loveNum || 0 }}</span>
                                          </div>
                                          <div class="stat-item">
                                            <i class="icon-message"></i>
                                            <span>{{ item.postNum || 0 }}</span>
                                          </div>
                                        </div>
                                        <div class="extend">
                                          <div class="button">
                                            <div style="margin-left:12px">
                                              <span style="font-size: 36px;line-height: 1;">
                                                <i class="light-icon-more icon-next-arrow"></i>
                                              </span>
                                            </div>
                                            <div style="margin-right:12px">
                                              <span class="value">￥{{ item.price }}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </nuxt-link>
                                </div>
                              </div>
                              <div v-else>
                                <div @mouseover="dowmloadover(index)" @mouseleave="downloadleave()" v-if="item && item.status && item.status.includes('published')">
                                  <nuxt-link :target="istarget" :to="'/list/' + (item?.id || '')">
                                    <a class="macwk-app border white cursor-pointer padding-xl">
                                      <div class="soft-card">
                                        <div class="li-card-img-div">
                                          <img :src="item.thumb" class="budongImg img72 dingweiImg" />
                                          <transition name="fade">
                                            <img v-show="isAcitive == index" :src="item.thumb" class="gaosiImg img72 dingweiImg" />
                                          </transition>
                                        </div>
                                        <div class="size-12 text-B6BABF margin-top-90" style="min-height: 20px;">
                                          <span>{{ item.subhead }}</span>
                                        </div>
                                        <div class="margin-top size-18 text-bold text-block card-hover-red">
                                          <span>{{ item.title }}</span>
                                        </div>
                                        <div class="margin-top1 size-14 text-B6BABF limitText">
                                          <span>{{ item.intro }}</span>
                                        </div>
                                        <div class="margin-top2 text-B6BABF flex-row size-12" style="display: flex; flex-wrap: wrap; justify-content: space-between; width: 100%;">
                                          <div style="margin-left: 0px; display: flex; align-items: center;">
                                            <img class="view-icon--right" src="../../static/image/con-view.svg" />
                                            <span>{{ item.hits || 0 }}</span>
                                          </div>
                                          <div style="margin: auto; display: flex; align-items: center;">
                                            <span>{{ item.author }}</span>
                                          </div>
                                          <div style="position: relative; right: 0px; display: flex; align-items: center;">
                                            <span v-if="item.createTime != null">{{ formatDate(item.createTime) }}</span>
                                            <span v-else>{{ formatDate(item.addTime) }}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </nuxt-link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- 水平布局右侧侧边栏 -->
                          <div class="horizontal-sidebar">
                            <!-- 热门资源 -->
                            <div v-if="hotList.length > 0" class="sidebar-section mb-4">
                              <h6 class="sidebar-title">🔥 热门资源</h6>
                              <div v-for="(item, index) in hotList.slice(0, 8)" :key="item.id" class="sidebar-item">
                                <nuxt-link :target="istarget" :to="'/list/' + item.id" class="sidebar-link">
                                  <div class="d-flex align-items-center">
                                    <span class="sidebar-rank" :class="{ 'top-rank': index < 3 }">{{ index + 1 }}</span>
                                    <div class="sidebar-content">
                                      <h6 class="sidebar-item-title">{{ item.title }}</h6>
                                      <p class="sidebar-meta">
                                        <span>👁️ {{ item.hits || 0 }}</span>
                                        <span>❤️ {{ item.loveNum || 0 }}</span>
                                      </p>
                                    </div>
                                  </div>
                                </nuxt-link>
                              </div>
                            </div>

                            <!-- 最新资源 -->
                            <div v-if="latestList.length > 0" class="sidebar-section">
                              <h6 class="sidebar-title">✨ 最新资源</h6>
                              <div v-for="item in latestList.slice(0, 6)" :key="item.id" class="sidebar-item">
                                <nuxt-link :target="istarget" :to="'/list/' + item.id" class="sidebar-link">
                                  <div class="d-flex align-items-center">
                                    <img :src="item.thumb || '/default-thumb.png'" class="sidebar-thumb" alt="资源缩略图">
                                    <div class="sidebar-content">
                                      <h6 class="sidebar-item-title">{{ item.title }}</h6>
                                      <p class="sidebar-meta">
                                        <span class="sidebar-author">{{ item.author }}</span>
                                        <span class="sidebar-time">{{ formatDate(item.createTime || item.addTime) }}</span>
                                      </p>
                                    </div>
                                  </div>
                                </nuxt-link>
                              </div>
                            </div>
                          </div>
                        </template>

                        <!-- 其他布局的原有结构 -->
                        <template v-else>
                          <div v-for="item, index in list" :key="item?.id || index" class="mw-col list-animation-leftIn delay-3">
                            <div v-if="!setting.imageFormat">
                              <div v-if="item && item.status && item.status.includes('published')">
                                <nuxt-link :target="istarget" :to="'/list/' + (item?.id || '')">
                                  <a class="macwk-app border white cursor-pointer">
                                    <el-image v-if="item.thumb != null" class="listtitleimg delay-3" :src="item.thumb" lazy>
                                      <div slot="placeholder" class="image-slot">
<!--                                        <img style="width: 100%; height: 100%; object-fit: cover;" src="../../static/image/loading.gif" />-->
                                      </div>
                                    </el-image>
                                    <div v-else class="delayImg" :style="getStyles()">
                                      <h3 class="flex text-center text-white opacity-50">NOPIC</h3>
                                    </div>
                                    <div class="macwk-app__body">
                                      <div class="card-meta">
                                        <div class="meta-item post-author">
                                          <el-avatar style="margin-bottom: 3px; margin-right: 3px;" :src="item.authorThumb"></el-avatar>
                                          <a class="author-name">{{ item.author }}</a>
                                        </div>
                                        <span v-if="item.createTime != null" class="meta-item">{{ formatDate(item.createTime) }}</span>
                                        <span v-else class="meta-item">{{ formatDate(item.addTime) }}</span>
                                        <span class="meta-item"><i class="el-icon-share"></i></span>
                                      </div>
                                      <h3 class="heading-tertiary-list">{{ item.title }}</h3>
                                    </div>
                                    <div class="extend">
                                      <div class="button">
                                        <div style="margin-left:12px">
                                          <span style="font-size: 36px;line-height: 1;">
                                            <i class="light-icon-more icon-next-arrow"></i>
                                          </span>
                                        </div>
                                        <div style="margin-right:12px">
                                          <span class="value">￥{{ item.price }}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="macwk-app__footer">
                                      <div v-show="showfootnext" class="macwk-app__footer--more">
                                        <i class="light-icon-more icon-next-arrow"></i>
                                      </div>
                                    </div>
                                  </a>
                                </nuxt-link>
                              </div>
                            </div>
                            <div v-else>
                              <div @mouseover="dowmloadover(index)" @mouseleave="downloadleave()" v-if="item && item.status && item.status.includes('published')">
                                <nuxt-link :target="istarget" :to="'/list/' + (item?.id || '')">
                                  <a class="macwk-app border white cursor-pointer padding-xl">
                                    <div class="soft-card">
                                      <div class="li-card-img-div">
                                        <img :src="item.thumb" class="budongImg img72 dingweiImg" />
                                        <transition name="fade">
                                          <img v-show="isAcitive == index" :src="item.thumb" class="gaosiImg img72 dingweiImg" />
                                        </transition>
                                      </div>
                                      <div class="size-12 text-B6BABF margin-top-90" style="min-height: 20px;">
                                        <span>{{ item.subhead }}</span>
                                      </div>
                                      <div class="margin-top size-18 text-bold text-block card-hover-red">
                                        <span>{{ item.title }}</span>
                                      </div>
                                      <div class="margin-top1 size-14 text-B6BABF limitText">
                                        <span>{{ item.intro }}</span>
                                      </div>
                                      <div class="margin-top2 text-B6BABF flex-row size-12" style="display: flex; flex-wrap: wrap; justify-content: space-between; width: 100%;">
                                        <div style="margin-left: 0px; display: flex; align-items: center;">
                                          <img class="view-icon--right" src="../../static/image/con-view.svg" />
                                          <span>{{ item.hits || 0 }}</span>
                                        </div>
                                        <div style="margin: auto; display: flex; align-items: center;">
                                          <span>{{ item.author }}</span>
                                        </div>
                                        <div style="position: relative; right: 0px; display: flex; align-items: center;">
                                          <span v-if="item.createTime != null">{{ formatDate(item.createTime) }}</span>
                                          <span v-else>{{ formatDate(item.addTime) }}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                </nuxt-link>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                    <!---->
                    <el-pagination class="app-content-bottom" @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                                   :page-size="listQuery.limit" layout="prev, pager, next" :total="total" />
                  </div>
                  <div class="app-content-info">
                    <div class="siderbar-apps border d-flex flex-column mb-5">
                      <div class="siderbar-apps__header">
                        <h6 class="mb-0">相关推荐</h6>
                      </div>
                      <div class="siderbar-apps__body min-h-415">
                        <!-- 推荐资源列表 -->
                        <div v-if="recommendedList.length > 0" class="recommended-section mb-4">
                          <h6 class="section-title mb-3">🎆 精品推荐</h6>
                          <div v-for="item in recommendedList.slice(0, 3)" :key="item.id" class="recommend-item mb-3">
                            <nuxt-link :target="istarget" :to="'/list/' + item.id" class="recommend-link">
                              <div class="d-flex">
                                <img :src="item.thumb || '/default-thumb.png'" class="recommend-thumb" alt="资源缩略图">
                                <div class="recommend-content flex-1">
                                  <h6 class="recommend-title">{{ item.title }}</h6>
                                  <p class="recommend-meta">
                                    <span class="author">{{ item.author }}</span>
                                    <span class="category">{{ item.className }}</span>
                                  </p>
                                  <div class="recommend-stats">
                                    <span class="stat-item">
                                      <i class="icon-eye"></i>
                                      {{ item.hits || 0 }}
                                    </span>
                                    <span class="stat-item">
                                      <i class="icon-heart"></i>
                                      {{ item.loveNum || 0 }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <!-- 热门资源 -->
                        <div v-if="hotList.length > 0" class="hot-section mb-4">
                          <h6 class="section-title mb-3">🔥 热门资源</h6>
                          <div v-for="(item, index) in hotList.slice(0, 5)" :key="item.id" class="hot-item mb-2">
                            <nuxt-link :target="istarget" :to="'/list/' + item.id" class="hot-link d-flex align-items-center">
                              <span class="hot-rank" :class="{ 'top-rank': index < 3 }">{{ index + 1 }}</span>
                              <div class="hot-content flex-1">
                                <h6 class="hot-title">{{ item.title }}</h6>
                                <p class="hot-stats">
                                  <span>👁️ {{ item.hits || 0 }}</span>
                                  <span>❤️ {{ item.loveNum || 0 }}</span>
                                </p>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <!-- 最新资源 -->
                        <div v-if="latestList.length > 0" class="latest-section">
                          <h6 class="section-title mb-3">✨ 最新资源</h6>
                          <div v-for="item in latestList.slice(0, 4)" :key="item.id" class="latest-item mb-2">
                            <nuxt-link :target="istarget" :to="'/list/' + item.id" class="latest-link">
                              <div class="d-flex align-items-center">
                                <img :src="item.thumb || '/default-thumb.png'" class="latest-thumb" alt="资源缩略图">
                                <div class="latest-content flex-1">
                                  <h6 class="latest-title">{{ item.title }}</h6>
                                  <p class="latest-meta">
                                    <span class="latest-author">{{ item.author }}</span>
                                    <span class="latest-time">{{ formatDate(item.createTime || item.addTime) }}</span>
                                  </p>
                                </div>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <!-- 空状态 -->
                        <div v-if="recommendedList.length === 0 && hotList.length === 0 && latestList.length === 0" class="empty-state text-center py-4">
                          <p class="text-muted">暂无推荐内容</p>
                        </div>
                      </div>
                    </div>
                    <div class="siderbar-apps border d-flex flex-column">
                      <div class="van-tabs van-tabs--line">
                        <div class="van-tabs__wrap">
                          <div role="tablist" class="van-tabs__nav van-tabs__nav--line">
                            <div class="van-tabs__line"></div>
                          </div>
                        </div>
                        <div class="van-tabs__content">
                          <div role="tabpanel" class="van-tab__pane" style="display: none">
                            <!---->
                          </div>
                          <div role="tabpanel" class="van-tab__pane" style="display: none">
                            <!---->
                          </div>
                        </div>
                      </div>
                    </div>
                    <!---->
                  </div>
                </div>
              </div>
              <mobile />
            </div>
          </div>
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
import { getResourceClasslist } from '@/api/webresourceclass'

import { getAllResource, getAllResourceNumber } from '@/api/webresource'
import { getSetting } from '@/api/websetting'

import { formatDate, GetWeekdate } from '@/utils/date.js'

// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default ({
  name: 'List',
  components: {
    top: () => import("./components/Top.vue"),
    foot: () => import("./components/Foots.vue"),
  },
  computed: {
    themeClass() {
      console.log(this.isDark)
      return this.isDark ? 'black' : 'light';
    }
  },
  data() {
    return {
      isDark: false,
      setting: {},
      loading: true,
      isAcitive: false,
      news: "new",
      download: "download",
      discuss: "discuss",
      love: "love",
      recommend: "recommend",
      sortOrder: "new",
      allIndex: true,
      classlist: "",
      istargetjudje: !true,
      istarget: "_self",
      ResourceNumber: "",
      list: "",
      listQuery: {
        page: 1,
        limit: 20
      },
      listQueryClass: {
        page: 1,
        limit: 20,
        class: ""
      },
      total: 0,
      layoutactive: "",
      gridactive: "active",
      listactive: "",
      showfootnext: false,
      gridOrlist: "grid-grid",
      acticve: 'nav-link active',
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 20) {
        return value.slice(0, 20) + "...";
      }
      return value;
    }
  },
  methods: {
    // 鼠标移入赋值index
    dowmloadover(index) {
      this.isAcitive = index
    },
    // 鼠标移出
    downloadleave(index) {
      this.isAcitive = false
    },
    formatDate(time) {
      const date = new Date(time);
      const currentYear = new Date().getFullYear();
      const year = date.getFullYear();

      if (currentYear - year === 1) {
        return '去年 ' + date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
      } else if (currentYear - year === 2) {
        return '前年 ' + date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
      } else if (currentYear - year > 2) {
        return '多年前';
      } else {
        return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
      }
    },
    async getSetting() {

      let res1 = await getSetting();
      if (res1) {
        this.setting = res1.data
      }
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.listQuery.limit = val
      // 点击每页显示的条数时，显示第一页
      this.getData(val, 1)
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.listQuery.page = val
      // 切换页码时，要获取每页显示的条数
      this.getList()
    },
    changeNews() {
      this.sortOrder = "news"
    },
    changeDownload() {
      this.sortOrder = "download"
    },
    changeDiscuss() {
      this.sortOrder = "discuss"
    },
    changeLove() {
      this.sortOrder = "love"
    },
    changeRecommend() {
      this.sortOrder = "recommend"
    },
    getNewarticleclass(id) {
      console.log("启动")
      this.clickIndex = id
      this.allIndex = false
      //重新请求全部列表
      this.list = this.template
      //过滤器，过滤sortclass为id的
      setTimeout(() => {
        let lists = this.list.filter(item => item.sortClass == id)
        this.list = lists
      })
    },
    getStyles() {
      //生成随机颜色
      let max = 8;
      let min = 1;

      let x = Math.floor(Math.random() * (max - min + 1)) + min;

      const backcolor = "randomColor" + x;

      if (backcolor == "randomColor1") {
        return "background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);"
      }
      if (backcolor == "randomColor2") {
        return "background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);"
      }
      if (backcolor == "randomColor3") {
        return "background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);"
      }
      if (backcolor == "randomColor4") {
        return "background-image: linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);"
      }
      if (backcolor == "randomColor5") {
        return "background-image: linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);"
      }
      if (backcolor == "randomColor6") {
        return "background-image: linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%);"
      }
      if (backcolor == "randomColor7") {
        return "background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);"
      }
      if (backcolor == "randomColor8") {
        return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
      }


      return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
    },
    istargetJudje() {
      if (!this.istargetjudje) {
        this.istarget = "_self"
      } else {
        this.istarget = "_blank"
      }
    },
    async getNumber() {
      let res = await getAllResourceNumber();
      if (res) {
        this.ResourceNumber = res.data
      }
    },
    async getList() {
      this.allIndex = true
      this.clickIndex = false
      let res1 = await getAllResource(this.listQuery);
      if (res1) {
        console.log(res1)
        //获取文章
        this.list = res1.data.data
        this.template = res1.data.data
        this.total = res1.data.total
      }
      let res2 = await getResourceClasslist();
      if (res2) {
        //获取分类
        this.classlist = res2.data
      }
    },
    changegrid() {
      this.layoutactive = ""
      this.gridactive = "active"
      this.listactive = ""
      this.gridOrlist = "grid-grid"

      this.showfootnext = false
    },
    changelist() {
      this.layoutactive = ""
      this.gridactive = ""
      this.listactive = "active"
      this.gridOrlist = "grid-list"

      this.showfootnext = true
    },
    changelayout() {
      this.layoutactive = "active"
      this.gridactive = ""
      this.listactive = ""


    }
  },
  mounted() {
    // 判断是否在服务端
    if (process.client) {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === 'true') {
        this.isDark = true;
      } else {
        this.isDark = false;
      }
      // this.lazyLoad();
      // 在浏览器端调接口，需要服务端做反向代理
      this.getList()
      this.getNumber()
      this.getSetting()
    }
    // 顶部广告
    // (window.slotbydup = window.slotbydup || []).push({
    //   id: "u6324930",
    //   container: "_utrtw8kq5so",
    //   async: true,
    // });
  },
})
</script> -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.macwk-app__body {
  padding: 13px 9px 5px;
}

.macwk-animation .delay-3 {
  border-radius: 8px 8px 0px 0px;
}

.listtitleimg {
  height: 155px;
  width: 100%;
}

/* 网格视图样式 */
.grid-grid .macwk-app {
  display: block;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.grid-grid .macwk-app:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.grid-grid .listtitleimg,
.grid-grid .delayImg {
  width: 100%;
  height: 155px;
  border-radius: 8px 8px 0 0;
  object-fit: cover;
}

.grid-grid .macwk-app__body {
  padding: 13px 9px 5px;
}

.grid-grid .heading-tertiary-list {
  font-size: 15px;
  margin-top: 0;
}

/* 底部信息栏样式 */
.grid-grid .margin-top2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.grid-grid .margin-top2 > div:first-child {
  flex: 1;
  text-align: left;
  justify-content: flex-start;
}

.grid-grid .margin-top2 > div:nth-child(2) {
  flex: 1;
  text-align: center;
  justify-content: center;
  margin: 0;
}

.grid-grid .margin-top2 > div:last-child {
  flex: 1;
  text-align: right;
  justify-content: flex-end;
}

/* 列表视图样式 */
.grid-list .macwk-app {
  display: flex;
  flex-direction: row;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.grid-list .macwk-app:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.grid-list .listtitleimg,
.grid-list .delayImg {
  width: 200px;
  height: 100%;
  border-radius: 8px 0 0 8px;
  object-fit: cover;
}

.grid-list .macwk-app__body {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-list .heading-tertiary-list {
  font-size: 18px;
  margin-top: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.grid-list .card-meta {
  margin-bottom: 8px;
}

.grid-list .extend {
  margin-top: auto;
}

/* 布局视图样式 */
.layout-active .mw-row {
  column-count: 3;
  column-gap: 20px;
}

.layout-active .mw-col {
  break-inside: avoid;
  margin-bottom: 20px;
  display: inline-block;
  width: 100%;
}

.layout-active .macwk-app {
  display: block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.layout-active .macwk-app:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.layout-active .listtitleimg,
.layout-active .delayImg {
  width: 100%;
  height: 180px;
  border-radius: 8px 8px 0 0;
  object-fit: cover;
}

/* 选项卡样式 */
.menu__link {
  padding: 8px 15px;
  margin: 0 5px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu__link:hover {
  color: #1890ff;
  background-color: rgba(24, 144, 255, 0.1);
}

.menu__link.active {
  color: #fff;
  background-color: #1890ff;
  box-shadow: 0 2px 6px rgba(24, 144, 255, 0.4);
}

/* 水平条带布局样式 */
.horizontal-layout .mw-row {
  display: flex;
  padding: 0 15px;
  gap: 20px;
}

.horizontal-main-content {
  flex: 1;
  min-width: 0;
}

.horizontal-sidebar {
  width: 300px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-height: 80vh;
  overflow-y: auto;
  position: sticky;
  top: 20px;
}

.horizontal-layout .mw-col {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: #fff;
}

.horizontal-layout .mw-col:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.horizontal-layout .macwk-app {
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  height: 200px;
  border: none;
  background: #fff;
}

.horizontal-layout .listtitleimg,
.horizontal-layout .delayImg {
  width: 300px;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
  transition: all 0.3s ease;
}

.horizontal-layout .macwk-app__body {
  flex: 1;
  padding: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.horizontal-layout .card-meta {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

.horizontal-layout .post-author {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.horizontal-layout .author-name {
  font-weight: 600;
  font-size: 14px;
  color: #333;
  margin-left: 10px;
}

.horizontal-layout .heading-tertiary-list {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 15px;
  line-height: 1.3;
  color: #222;
}

.horizontal-layout .description {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.horizontal-layout .tag-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.horizontal-layout .tag {
  padding: 4px 12px;
  border-radius: 15px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(79, 172, 254, 0.3);
}

.horizontal-layout .tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.4);
}

.horizontal-layout .stats-container {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.horizontal-layout .stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 14px;
  padding: 6px 12px;
  background: #f8f9fa;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.horizontal-layout .stat-item:hover {
  background: rgba(79, 172, 254, 0.1);
  color: #1890ff;
}

.horizontal-layout .stat-item i {
  font-size: 16px;
}

.horizontal-layout .extend {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.horizontal-layout .value {
  font-size: 20px;
  font-weight: 700;
  color: #4facfe;
  text-shadow: 0 2px 4px rgba(79, 172, 254, 0.2);
}

/* 交替背景色 */
.horizontal-layout .mw-col:nth-child(5n+1) {
  background: linear-gradient(to right, rgba(79, 172, 254, 0.05), rgba(0, 242, 254, 0.05));
}

.horizontal-layout .mw-col:nth-child(5n+2) {
  background: linear-gradient(to right, rgba(0, 242, 254, 0.05), rgba(67, 233, 123, 0.05));
}

.horizontal-layout .mw-col:nth-child(5n+3) {
  background: linear-gradient(to right, rgba(67, 233, 123, 0.05), rgba(250, 112, 154, 0.05));
}

.horizontal-layout .mw-col:nth-child(5n+4) {
  background: linear-gradient(to right, rgba(250, 112, 154, 0.05), rgba(161, 140, 209, 0.05));
}

.horizontal-layout .mw-col:nth-child(5n+5) {
  background: linear-gradient(to right, rgba(161, 140, 209, 0.05), rgba(79, 172, 254, 0.05));
}

/* 左侧彩色边框 */
.horizontal-layout .mw-col:nth-child(5n+1) .macwk-app {
  border-left: 5px solid #4facfe;
}

.horizontal-layout .mw-col:nth-child(5n+2) .macwk-app {
  border-left: 5px solid #00f2fe;
}

.horizontal-layout .mw-col:nth-child(5n+3) .macwk-app {
  border-left: 5px solid #43e97b;
}

.horizontal-layout .mw-col:nth-child(5n+4) .macwk-app {
  border-left: 5px solid #fa709a;
}

.horizontal-layout .mw-col:nth-child(5n+5) .macwk-app {
  border-left: 5px solid #a18cd1;
}

/* 底部信息栏样式 */
.horizontal-layout .margin-top2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 15px;
}

.horizontal-layout .margin-top2 > div:first-child {
  flex: 1;
  text-align: left;
  display: flex;
  align-items: center;
}

.horizontal-layout .margin-top2 > div:first-child img {
  margin-right: 8px;
}

.horizontal-layout .margin-top2 > div:nth-child(2) {
  flex: 1;
  text-align: center;
}

.horizontal-layout .margin-top2 > div:last-child {
  flex: 1;
  text-align: right;
}

/* 水平布局侧边栏样式 */
.sidebar-section {
  margin-bottom: 30px;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 700;
  color: #1890ff;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #4facfe;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-item {
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.sidebar-item:hover {
  background: rgba(79, 172, 254, 0.05);
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.15);
}

.sidebar-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.sidebar-rank {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f0f0f0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  margin-right: 12px;
  flex-shrink: 0;
}

.sidebar-rank.top-rank {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.sidebar-thumb {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  margin-right: 12px;
  flex-shrink: 0;
}

.sidebar-content {
  flex: 1;
  min-width: 0;
}

.sidebar-item-title {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.sidebar-meta {
  font-size: 11px;
  color: #999;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-author {
  color: #666;
  font-weight: 500;
}

.sidebar-time {
  color: #999;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .horizontal-sidebar {
    width: 250px;
  }
}

@media (max-width: 992px) {
  .horizontal-layout .mw-row {
    flex-direction: column;
  }

  .horizontal-sidebar {
    width: 100%;
    position: static;
    max-height: none;
  }
}

/* 添加标签样式 */
.horizontal-layout .tag-container {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
}

.horizontal-layout .tag {
  padding: 4px 10px;
  border-radius: 15px;
  background: #f5f5f5;
  color: #666;
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, visibility 0.3s ease;
  /* 定义过渡效果 */
}

.fade-enter,
.fade-leave-to

  /* .fade-leave-active 在 Vue.js 2.1.8+ 中自动应用 */
{
  opacity: 0;
  visibility: hidden;
  /* 在过渡开始时隐藏元素 */
}

.gaosiImg {
  animation-delay: 50ms;
  animation-fill-mode: backwards !important;
  /* filter: blur(20px) opacity(70%) brightness(110%); */
  filter: blur(20px) opacity(0.7) brightness(110%);
  /* transition: filter 0.22s ease; 调整过渡时间和效果 */
  transition: all 900ms;
  /* transition: .22s; */
  z-index: 8;
}

.dingweiImg,
.recommendDingweiImg {
  position: absolute;
  top: 15px !important;
  left: 20px !important
}

.img72,
.imgQueXing3 {
  width: 72px;
  height: 72px;
}

.margin-top-90 {
  margin-top: 90px;
}

.text-block {
  color: #3c4248;
}

.text-bold {
  font-weight: 700;
}

.size-18 {
  font-size: 18px;
}

.margin-top {
  margin-top: 10px;
}

.cursor {
  cursor: pointer;
}

.padding-xl {
  padding: 20px;
}

.text-B6BABF {
  color: #b6babf;
}

.size-14 {
  font-size: 14px;
}

.margin-top {
  margin-top: 10px;
}

.limitText {
  max-width: 180px;
  height: 20px;
  overflow: hidden;
}

.flex-row {
  display: flex;
  flex-direction: row !important;
}

.size-12 {
  font-size: 12px;
}

.margin-top2 {
  margin-top: 20px;
}

:deep(.home) {
  display: flex;
  flex-wrap: wrap;
}

:deep(.el-skeleton) {
  display: flex;
  flex-wrap: wrap;
}

.view-icon--right {
  margin-right: 5px;
  width: 20px;
  height: 20px;
  transform: rotate(180deg);
}

/* 相关推荐样式 */
.siderbar-apps {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.siderbar-apps__header {
  padding: 15px 20px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.siderbar-apps__header h6 {
  font-weight: 600;
  margin: 0;
}

.siderbar-apps__body {
  padding: 20px;
  min-height: 415px;
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.02) 0%, rgba(0, 242, 254, 0.02) 100%);
}

/* 各个区块标题 */
.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

/* 推荐资源样式 */
.recommend-item {
  border-radius: 8px;
  transition: all 0.3s ease;
  padding: 12px;
  border: 1px solid #f0f0f0;
}

.recommend-item:hover {
  background: #fff5f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

}

.recommend-link {
  text-decoration: none;
  color: inherit;
}

.recommend-thumb {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
  margin-right: 12px;
}

.recommend-content {
  flex: 1;
}

.recommend-title {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
}

.recommend-meta {
  font-size: 11px;
  color: #666;
  margin: 0 0 6px 0;
}

.recommend-meta .author {
  margin-right: 8px;
}

.recommend-meta .category {
  color: #1890ff;
}

.recommend-stats {
  display: flex;
  gap: 12px;
}

.recommend-stats .stat-item {
  font-size: 11px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 热门资源样式 */
.hot-item {
  border-radius: 6px;
  transition: all 0.2s ease;
  padding: 8px 12px;
}

.hot-item:hover {
  background: #fff5f5;
}

.hot-link {
  text-decoration: none;
  color: inherit;
}

.hot-rank {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f0f0f0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-right: 10px;
  flex-shrink: 0;
}

.hot-rank.top-rank {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
}

.hot-title {
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hot-stats {
  font-size: 10px;
  color: #999;
  margin: 0;
  display: flex;
  gap: 12px;
}

/* 最新资源样式 */
.latest-item {
  border-radius: 6px;
  transition: all 0.2s ease;
  padding: 8px 12px;
}

.latest-item:hover {
  background: #f0f9ff;
}

.latest-link {
  text-decoration: none;
  color: inherit;
}

.latest-thumb {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 10px;
}

.latest-title {
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.latest-meta {
  font-size: 10px;
  color: #999;
  margin: 0;
  display: flex;
  justify-content: space-between;
}

.latest-author {
  color: #666;
}

.latest-time {
  color: #999;
}

/* 空状态 */
.empty-state {
  padding: 40px 20px;
  text-align: center;
}

.empty-state p {
  margin: 0;
  color: #999;
  font-size: 14px;
}
</style>