export interface Setting {
    readonly id: string; // 唯一标识符，假设是字符串类型
    banquan: string; // 版权信息
    beian: string; // 网站备案号
    comment_show: boolean; // 是否显示评论
    h5Show: boolean; // 是否显示 H5 页面
    imageFormat: boolean; // 是否支持图片格式
    sitLogo: string; // 网站 logo 的 URL
    sitSrc: string; // 网站源
    sitTitle: string; // 网站标题
  }