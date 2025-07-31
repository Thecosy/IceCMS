import { defineStore } from 'pinia';
import { getNewArticle } from '../api/webarticle';

export const useResourceStore = defineStore('resource', () => {
    const activeTab = ref('new'); // 默认选中的选项
    const rlist = ref<Record<string, any[]>>({}); // 存放不同 tab 的数据
  
    // 获取资源数据
    const fetchResources = async (tab: string) => {
      try {
        const result = await getNewArticle(6, tab);
        rlist.value[tab] = result;
      } catch (error) {
        console.error(`获取 ${tab} 数据出错:`, error);
      }
    };
  
    return { activeTab, rlist, fetchResources }; // 确保 fetchResources 被返回
  });