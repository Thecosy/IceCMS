import { ref, onMounted, reactive } from "vue";
import { delay } from "@pureadmin/utils";
import type { PaginationProps } from "@pureadmin/table";
import ThumbUp from "@iconify-icons/ri/thumb-up-line";
import Hearts from "@iconify-icons/ri/hearts-line";
import Empty from "./empty.svg?component";
import { getSystemOverview } from '@/api/common/panel';
import dayjs from "dayjs";

export function useColumns() {
  const dataList = ref([]);
  const loading = ref(true);
  const columns: TableColumnList = [
    {
      sortable: true,
      label: "日期",
      prop: "date"
    },
    {
      sortable: true,
      label: "用户数",
      prop: "users",
      filterMultiple: false,
      filterClassName: "pure-table-filter",
      filters: [
        { text: "≥5", value: "more" },
        { text: "<5", value: "less" }
      ],
      filterMethod: (value, { users }) => {
        return value === "more" ? users >= 5 : users < 5;
      }
    },
    {
      sortable: true,
      label: "文章数",
      prop: "articles"
    },
    {
      sortable: true,
      label: "资源数",
      prop: "resources"
    },
    {
      sortable: true,
      label: "订单数",
      prop: "orders"
    },
    {
      sortable: true,
      label: "活跃度",
      minWidth: 100,
      prop: "activity",
      cellRenderer: ({ row }) => (
        <div class="flex justify-center w-full">
          <span class="flex items-center w-[60px]">
            <span class="ml-auto mr-2">{row.activity}%</span>
            <iconifyIconOffline
              icon={row.activity > 50 ? Hearts : ThumbUp}
              color="#e85f33"
            />
          </span>
        </div>
      )
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation"
    }
  ];

  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 10,
    currentPage: 1,
    layout: "prev, pager, next",
    total: 0,
    align: "center"
  });

  function onCurrentChange(page: number) {
    console.log("onCurrentChange", page);
    loading.value = true;
    delay(300).then(() => {
      loading.value = false;
    });
  }

  // 获取系统数据
  const fetchSystemData = async () => {
    try {
      loading.value = true;
      const response = await getSystemOverview();
      if (response.code === 200) {
        // 使用类型断言处理数据
        const data = response.data as any;

        // 检查weeklyTrend是否存在且是数组
        if (data && data.weeklyTrend && Array.isArray(data.weeklyTrend)) {
          dataList.value = data.weeklyTrend.map((day: any) => {
            // 计算活跃度：评论数与用户数、文章数的比例
            const users = Number(day.users) || 0;
            const articles = Number(day.articles) || 0;
            const resources = Number(day.resources) || 0;
            const orders = Number(day.orders) || 0;

            const totalActivity = users + articles + resources + orders;
            const activity = totalActivity > 0 ? Math.min(100, Math.round((articles + orders) / totalActivity * 100)) : 0;

            return {
              date: day.date || '',
              users: users,
              articles: articles,
              resources: resources,
              orders: orders,
              activity: activity
            };
          });

          // 按日期排序（最新的在前）
          dataList.value.sort((a, b) => {
            return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
          });

          pagination.total = dataList.value.length;
        } else {
          console.warn("获取到的数据中没有weeklyTrend数组");
          dataList.value = [];
        }
      }
      loading.value = false;
    } catch (error) {
      console.error("获取系统数据失败:", error);
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchSystemData();
  });

  return {
    Empty,
    loading,
    columns,
    dataList,
    pagination,
    onCurrentChange
  };
}
