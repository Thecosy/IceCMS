/**
 * getSwiperList
 * @description 获取Swiper数据
 * @param {Array} list 原数据
 * @param {Object} options 配置
 * @param {Boolean} options.circular 是否循环
 * @param {Number} options.plus 左右追加个数(开启循环必填，至少为2)
 * @return {Array}
 */
export function getSwiperList(list, options = {
	circular: true,
	plus: 2
}) {
	if (!options.circular) {
		return list
	}
	const plus = options.plus || 2
	const leftPlusList = [...list].reverse().slice(0, plus).reverse();
	const rightPlusList = [...list].slice(0, plus);
	return [].concat(leftPlusList).concat(list).concat(rightPlusList);
}
