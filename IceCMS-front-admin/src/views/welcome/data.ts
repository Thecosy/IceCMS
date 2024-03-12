import { dayjs, cloneDeep, getRandomIntBetween } from "./utils";

const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

/** 分析概览 */
const barChartData = [
  {
    requireData: [2101, 5288, 4239, 4962, 6752, 5208, 7450],
    questionData: [2216, 1148, 1255, 1788, 4821, 1973, 4379]
  },
  {
    requireData: [2101, 3280, 4400, 4962, 5752, 6889, 7600],
    questionData: [2116, 3148, 3255, 3788, 4821, 4970, 5390]
  }
];

/** 解决概率 */
const progressData = [
  {
    week: "周一",
    percentage: 85,
    duration: 110,
    color: "#41b6ff"
  },
  {
    week: "周二",
    percentage: 86,
    duration: 105,
    color: "#41b6ff"
  },
  {
    week: "周三",
    percentage: 88,
    duration: 100,
    color: "#41b6ff"
  },
  {
    week: "周四",
    percentage: 89,
    duration: 95,
    color: "#41b6ff"
  },
  {
    week: "周五",
    percentage: 94,
    duration: 90,
    color: "#26ce83"
  },
  {
    week: "周六",
    percentage: 96,
    duration: 85,
    color: "#26ce83"
  },
  {
    week: "周日",
    percentage: 100,
    duration: 80,
    color: "#26ce83"
  }
].reverse();

/** 数据统计 */
const tableData = Array.from({ length: 30 }).map((_, index) => {
  return {
    id: index + 1,
    requiredNumber: getRandomIntBetween(13500, 19999),
    questionNumber: getRandomIntBetween(12600, 16999),
    resolveNumber: getRandomIntBetween(13500, 17999),
    satisfaction: getRandomIntBetween(95, 100),
    date: dayjs().subtract(index, "day").format("YYYY-MM-DD")
  };
});

/** 最新动态 */
const latestNewsData = cloneDeep(tableData)
  .slice(0, 14)
  .map((item, index) => {
    return Object.assign(item, {
      date: `${dayjs().subtract(index, "day").format("YYYY-MM-DD")} ${days[dayjs().subtract(index, "day").day()]
        }`
    });
  });

export { barChartData, progressData, tableData, latestNewsData };
