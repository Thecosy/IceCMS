import { defineStore } from 'pinia';

interface LayoutActiveState {
  grid: string;
  list: string;
  layout: string;
}

interface ContentState {
  activeTab: string;
  contentList: any[];
  layoutType: string;
  layoutActive: LayoutActiveState;
  showFootNext: boolean;
  isTargetBlank: boolean;
}

export const useContentStore = defineStore('allListContent', {
  state: (): ContentState => ({
    activeTab: 'new', // 当前选中的标签：new(最新)、hot(下载量)、commend(评论数)、like(喜欢数)、recommend(推荐)
    contentList: [],
    layoutType: 'grid-grid', // 添加布局类型状态
    layoutActive: {
      grid: 'active',
      list: '',
      layout: ''
    }, // 添加布局激活状态
    showFootNext: false, // 添加是否显示底部"下一页"的状态
    isTargetBlank: false // 添加是否在新窗口打开的状态
  }),
  actions: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
    setContentList(list: any[]) {
      this.contentList = list;
    },
    // 添加设置布局类型的方法
    setLayoutType(type: string) {
      this.layoutType = type;
    },
    // 添加设置布局激活状态的方法
    setLayoutActive(grid: string, list: string, layout: string) {
      this.layoutActive.grid = grid;
      this.layoutActive.list = list;
      this.layoutActive.layout = layout;
    },
    // 添加设置是否显示底部"下一页"的方法
    setShowFootNext(show: boolean) {
      this.showFootNext = show;
    },
    // 添加设置是否在新窗口打开的方法
    setIsTargetBlank(isBlank: boolean) {
      this.isTargetBlank = isBlank;
    }
  }
});