export interface Article {
  id: number;
  content: string;
  title: string;
  author: number;
  addTime: string;
  thumb: string;
  profile: string;
  className: string;
  authorId?: string; // 作者ID，可选
  authorImg?: string; // 作者头像，可选
  sortClass?: number | string; // 分类ID，可选，支持字符串或数字类型
  sortId?: number | string; // 分类ID，可选，支持字符串或数字类型
  sortName?: string; // 分类名称，可选
}
