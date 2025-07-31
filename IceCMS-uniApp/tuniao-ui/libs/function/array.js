/**
 * 打乱传入的数组
 * 
 * @param {Array} array 待打乱的数组 
 */
function random(array = []) {
  return array.sort(() => Math.random() - 0.5)
}

/**
 * 判断是否为数组
 * 
 * @param {Object} arr
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export default {
  random,
  isArray
}