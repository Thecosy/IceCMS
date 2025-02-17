import { defineStore } from 'pinia';

export const useContentStore = defineStore('content', {
  state: () => ({
    activeTab: 'new', // 当前选中的标签
    contentList: {
      new: [
        { id: 1, title: '新鲜发布 1', description: '这是最新发布的内容' },
        { id: 2, title: '新鲜发布 2', description: '这是最新发布的内容' },
      ],
      hot: [
        { id: 3, title: '热门下载 1', description: '这是热门下载的内容' },
        { id: 4, title: '热门下载 2', description: '这是热门下载的内容' },
      ],
      recommend: [
        { id: 5, title: '站长推荐 1', description: '这是站长推荐的内容' },
        { id: 6, title: '站长推荐 2', description: '这是站长推荐的内容' },
      ],
      comments: [
        { id: 7, title: '最多评论 1', description: '这是评论最多的内容' },
        { id: 8, title: '最多评论 2', description: '这是评论最多的内容' },
      ],
    },
  }),
  actions: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
  },
});