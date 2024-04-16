/**
 * 删除html标签
 * @param {*} str 
 * @returns 
 */
export function delHtmlTag(str) {
  return str.replace(/<\/?.+?>/g, "").replace(/&nbsp;/g, "").replace(/&lt;/g, "").replace(/&gt;/g, "");
}