export interface Article {
  id: number;
  title: string;
  author: string;
  addTime: string;
  thumb: string;
  profile: string;
  className: string;
  sortClass?: number | string; // 分类ID，可选，支持字符串或数字类型
  sortName?: string; // 分类名称，可选
}
