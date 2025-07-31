/**
 * 去掉字符串中空格
 * 
 * @param {String} str 待处理的字符串
 * @param {String} type 处理类型
 */
function trim(str, type = 'both') {
  if (type === 'both') {
    return str.replace(/^\s+|\s+$/g, "")
  } else if (type === 'left') {
    return str.replace(/^\s*/g, "")
  } else if (type === 'right') {
    return str.replace(/(\s*$)/g, "")
  } else if (type === 'all') {
    return str.replace(/\s+/g, "")
  } else {
    return str
  }
}

/**
 * 获取带单位的长度值
 * 
 * @param {String} value 待处理的值
 * @param {String} unit 单位
 */
function getLengthUnitValue(value, unit = 'rpx') {
  if (!value) {
    return ''
  }
  if (/(%|px|rpx|auto)$/.test(value)) return value
  else return value + unit
}

/**
 * 将驼峰命名的字符串转换为指定连接符来进行连接
 * 
 * @param {Object} string 待转换的字符串
 * @param {Object} replace 进行连接的字符
 */
function humpConvertChar(string, replace = '_') {
  if (!string || !replace) {
    return ''
  }
  return string.replace(/([A-Z])/g, `${replace}$1`).toLowerCase()
}

/**
 * 将用指定连接符来进行连接的字符串转为驼峰命名的字符串
 * 
 * @param {Object} string 待转换的字符串
 * @param {Object} replace 进行连接的字符
 */
function charConvertHump(string, replace = '_') {
  if (!string || !replace) {
    return ''
  }
  let reg = RegExp(replace + "(\\w)", "g")
  return string.replace(reg, function(all, letter) {
    return letter.toUpperCase()
  })
}

export default {
  trim,
  getLengthUnitValue,
  humpConvertChar,
  charConvertHump
}