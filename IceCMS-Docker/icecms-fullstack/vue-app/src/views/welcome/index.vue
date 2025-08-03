<script setup lang="ts">
import { ref, markRaw, onMounted, computed } from "vue";
import ReCol from "@/components/ReCol";
import { useDark, randomGradient } from "./utils";
import PureTable from "./components/table/index.vue";
import { ReNormalCountTo } from "@/components/ReCountTo";
import { useRenderFlicker } from "@/components/ReFlicker";
import { barChart, lineChart, roundChart } from "./components/chart";
import Segmented, { type OptionsType } from "@/components/ReSegmented";
import { progressData } from "./data";

// 导入Element Plus图标
import {
  User,
  Document,
  Collection,
  ChatDotRound,
  ShoppingCart,
  Connection,
  ChatLineRound,
  DocumentChecked,
  Files,
  ShoppingBag
} from '@element-plus/icons-vue';

import { getChartData, getSystemOverview } from '@/api/common/panel';
import { ElLoading, ElMessage } from "element-plus";

// 导入IconifyIconOnline组件
import { IconifyIconOnline } from "@/components/ReIcon";

/** 图表数据 */
const chartData = ref([]);

/** 系统概览数据 */
const systemData = ref<{
  totalUsers: number;
  totalArticles: number;
  totalResources: number;
  totalComments: number;
  totalOrders: number;
  totalSquares: number;
  userGrowthRate: string;
  articleGrowthRate: string;
  resourceGrowthRate: string;
  orderGrowthRate: string;
  weeklyTrend: any[];
}>({
  totalUsers: 0,
  totalArticles: 0,
  totalResources: 0,
  totalComments: 0,
  totalOrders: 0,
  totalSquares: 0,
  userGrowthRate: "0",
  articleGrowthRate: "0",
  resourceGrowthRate: "0",
  orderGrowthRate: "0",
  weeklyTrend: []
});

/** 分析图表数据 */
const barChartData = computed(() => {
  if (!systemData.value.weeklyTrend || systemData.value.weeklyTrend.length === 0) {
    return [
      {
        requireData: [0, 0, 0, 0, 0, 0, 0],
        questionData: [0, 0, 0, 0, 0, 0, 0]
      },
      {
        requireData: [0, 0, 0, 0, 0, 0, 0],
        questionData: [0, 0, 0, 0, 0, 0, 0]
      }
    ];
  }

  // 从系统数据中提取每日数据
  const users = systemData.value.weeklyTrend.map(day => day.users);
  const articles = systemData.value.weeklyTrend.map(day => day.articles);
  const resources = systemData.value.weeklyTrend.map(day => day.resources);
  const orders = systemData.value.weeklyTrend.map(day => day.orders);

  return [
    {
      // 资源/订单数据
      requireData: resources,
      questionData: orders
    },
    {
      // 用户/文章数据
      requireData: users,
      questionData: articles
    }
  ];
});

/** 最新动态数据 */
const latestNewsData = computed(() => {
  if (!systemData.value.weeklyTrend || systemData.value.weeklyTrend.length === 0) {
    return [];
  }

  const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  return systemData.value.weeklyTrend.map((day, index) => {
    const date = new Date(day.date);
    const dayOfWeek = days[date.getDay()];

    return {
      date: `${day.date} ${dayOfWeek}`,
      users: day.users,
      articles: day.articles,
      resources: day.resources,
      orders: day.orders
    };
  }).reverse();
});

// 加载图表数据
const fetchChartData = async () => {
  try {
    const loading = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(255, 255, 255, 0.7)',
    });

    const response = await getChartData();
    if (response.code === 200) {
      const data = JSON.parse(response.data);
      // 替换图标名称为Element Plus图标组件
      chartData.value = data.map(item => {
        // 根据图标名称映射到Element Plus图标
        let iconComponent;
        switch(item.icon) {
          case "GroupLine":
            iconComponent = markRaw(User);
            break;
          case "Question":
            iconComponent = markRaw(ChatLineRound);
            break;
          case "CheckLine":
            iconComponent = markRaw(Files);
            break;
          case "Smile":
            iconComponent = markRaw(ShoppingBag);
            break;
          default:
            iconComponent = markRaw(Document);
        }
        return {
          ...item,
          iconComponent
        };
      });
    }

    loading.close();
  } catch (error) {
    console.error('获取图表数据失败:', error);
    ElMessage.error('获取图表数据失败');
  }
};

// 加载系统概览数据
const fetchSystemData = async () => {
  try {
    const response = await getSystemOverview();
    if (response.code === 200) {
      // 使用类型断言确保数据类型正确
      const data = response.data as any;

      // 将数据赋值给systemData
      systemData.value = {
        totalUsers: data.totalUsers || 0,
        totalArticles: data.totalArticles || 0,
        totalResources: data.totalResources || 0,
        totalComments: data.totalComments || 0,
        totalOrders: data.totalOrders || 0,
        totalSquares: data.totalSquares || 0,
        userGrowthRate: data.userGrowthRate || "0",
        articleGrowthRate: data.articleGrowthRate || "0",
        resourceGrowthRate: data.resourceGrowthRate || "0",
        orderGrowthRate: data.orderGrowthRate || "0",
        weeklyTrend: Array.isArray(data.weeklyTrend) ? data.weeklyTrend : []
      };
    }
  } catch (error) {
    console.error('获取系统概览数据失败:', error);
    ElMessage.error('获取系统概览数据失败');
  }
};

// 页面加载时获取数据
onMounted(() => {
  fetchChartData();
  fetchSystemData();
});

defineOptions({
  name: "Welcome"
});

const { isDark } = useDark();

let curWeek = ref(1); // 0上周、1本周
const optionsBasis: Array<OptionsType> = [
  {
    label: "资源/订单"
  },
  {
    label: "用户/文章"
  }
];
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around">
      <re-col v-for="(item, index) in chartData" :key="index" v-motion class="mb-[18px]" :value="6" :md="12" :sm="12"
        :xs="24" :initial="{
          opacity: 0,
          y: 100
        }" :enter="{
  opacity: 1,
  y: 0,
  transition: {
    delay: 80 * (index + 1)
  }
}">
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">
              {{ item.name }}
            </span>
            <div class="w-8 h-8 flex justify-center items-center rounded-md" :style="{
              backgroundColor: isDark ? 'transparent' : item.bgColor
            }">
              <el-icon :color="item.color" :size="18">
                <component :is="item.iconComponent" />
              </el-icon>
            </div>
          </div>
          <div class="flex justify-between items-start mt-3">
            <div class="w-1/2">
              <ReNormalCountTo :duration="item.duration" :fontSize="'1.6em'" :startVal="100"
                :endVal="Number(item.TheValue)" />
              <p class="font-medium" :style="{ color: item.color }">{{ item.percent }}</p>
            </div>
            <lineChart v-if="item.data.length > 1" class="!w-1/2" :color="item.color" :data="item.data" />
            <roundChart v-else class="!w-1/2" />
          </div>
        </el-card>
      </re-col>

      <re-col v-motion class="mb-[18px]" :value="18" :xs="24" :initial="{
        opacity: 0,
        y: 100
      }" :enter="{
  opacity: 1,
  y: 0,
  transition: {
    delay: 400
  }
}">
        <el-card class="bar-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">数据趋势分析</span>
            <Segmented v-model="curWeek" :options="optionsBasis" />
          </div>
          <div class="flex justify-between items-start mt-3">
            <barChart :requireData="barChartData[curWeek].requireData"
              :questionData="barChartData[curWeek].questionData"
              :chartType="curWeek" />
          </div>
        </el-card>
      </re-col>

      <re-col v-motion class="mb-[18px]" :value="6" :xs="24" :initial="{
        opacity: 0,
        y: 100
      }" :enter="{
  opacity: 1,
  y: 0,
  transition: {
    delay: 480
  }
}">
        <el-card shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">系统概览</span>
          </div>
          <div class="system-overview">
            <div class="stat-item">
              <div class="stat-icon" style="background-color: #effaff;">
                <el-icon><User /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-title">用户总数</div>
                <div class="stat-value">{{ systemData.totalUsers }}</div>
                <div class="stat-growth" :class="{ 'positive': parseFloat(systemData.userGrowthRate) > 0, 'negative': parseFloat(systemData.userGrowthRate) < 0 }">
                  {{ parseFloat(systemData.userGrowthRate) > 0 ? '+' : '' }}{{ systemData.userGrowthRate }}%
                </div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon" style="background-color: #fff5f4;">
                <el-icon><Document /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-title">文章总数</div>
                <div class="stat-value">{{ systemData.totalArticles }}</div>
                <div class="stat-growth" :class="{ 'positive': parseFloat(systemData.articleGrowthRate) > 0, 'negative': parseFloat(systemData.articleGrowthRate) < 0 }">
                  {{ parseFloat(systemData.articleGrowthRate) > 0 ? '+' : '' }}{{ systemData.articleGrowthRate }}%
                </div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon" style="background-color: #eff8f4;">
                <el-icon><Collection /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-title">资源总数</div>
                <div class="stat-value">{{ systemData.totalResources }}</div>
                <div class="stat-growth" :class="{ 'positive': parseFloat(systemData.resourceGrowthRate) > 0, 'negative': parseFloat(systemData.resourceGrowthRate) < 0 }">
                  {{ parseFloat(systemData.resourceGrowthRate) > 0 ? '+' : '' }}{{ systemData.resourceGrowthRate }}%
                </div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon" style="background-color: #f6f4fe;">
                <el-icon><ChatDotRound /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-title">评论总数</div>
                <div class="stat-value">{{ systemData.totalComments }}</div>
                <div class="stat-growth positive">
                  活跃度指标
                </div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon" style="background-color: #f5f5f5;">
                <el-icon><ShoppingCart /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-title">订单总数</div>
                <div class="stat-value">{{ systemData.totalOrders }}</div>
                <div class="stat-growth" :class="{ 'positive': parseFloat(systemData.orderGrowthRate) > 0, 'negative': parseFloat(systemData.orderGrowthRate) < 0 }">
                  {{ parseFloat(systemData.orderGrowthRate) > 0 ? '+' : '' }}{{ systemData.orderGrowthRate }}%
                </div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon" style="background-color: #f0f8ff;">
                <el-icon><Connection /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-title">圈子总数</div>
                <div class="stat-value">{{ systemData.totalSquares }}</div>
                <div class="stat-growth positive">
                  社区活跃度
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </re-col>

      <re-col v-motion class="mb-[18px]" :value="18" :xs="24" :initial="{
        opacity: 0,
        y: 100
      }" :enter="{
  opacity: 1,
  y: 0,
  transition: {
    delay: 560
  }
}">
        <el-card shadow="never" class="h-[580px]">
          <div class="flex justify-between">
            <span class="text-md font-medium">数据统计</span>
          </div>
          <PureTable class="mt-3" />
        </el-card>
      </re-col>

      <re-col v-motion class="mb-[18px]" :value="6" :xs="24" :initial="{
        opacity: 0,
        y: 100
      }" :enter="{
  opacity: 1,
  y: 0,
  transition: {
    delay: 640
  }
}">
        <el-card shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">最新动态</span>
          </div>
          <el-scrollbar max-height="504" class="mt-3">
            <el-timeline>
              <el-timeline-item v-for="(item, index) in latestNewsData" :key="index" center placement="top" :icon="markRaw(
                useRenderFlicker({
                  background: randomGradient({
                    randomizeHue: true
                  })
                })
              )
                " :timestamp="item.date">
                <p class="text-text_color_regular text-sm">
                  {{
                    `新增 ${item.users} 名用户，${item.articles} 篇文章，${item.resources} 个资源，${item.orders} 个订单`
                  }}
                </p>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </el-card>
      </re-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
  --el-card-border-color: none;

  /* 解决概率进度条宽度 */
  .el-progress--line {
    width: 85%;
  }

  /* 解决概率进度条字体大小 */
  .el-progress-bar__innerText {
    font-size: 15px;
  }

  /* 隐藏 el-scrollbar 滚动条 */
  .el-scrollbar__bar {
    display: none;
  }

  /* el-timeline 每一项上下、左右边距 */
  .el-timeline-item {
    margin: 0 6px;
  }
}

.main-content {
  margin: 20px 20px 0 !important;
}

.system-overview {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: var(--el-bg-color);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  margin: 4px 0;
}

.stat-growth {
  font-size: 12px;

  &.positive {
    color: #26ce83;
  }

  &.negative {
    color: #f56c6c;
  }
}
</style>
