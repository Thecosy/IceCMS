/**
 * 格式化数字字符串
 * @param {String, Number} value 待格式化的字符串
 * @param {Number} digits 保留位数 
 */
function formatNumberString(value, digits = 2) {
  let number = 0
  // 判断是什么类型
  if (typeof value === 'string') {
    number = Number(value)
  } else if (typeof value === 'number') {
    number = value
  }
  if (isNaN(number) || number === 0) {
    return 0
  }
  
  let maxNumber = Math.pow(10, digits) - 1
  if (number > maxNumber) {
    return `${maxNumber}+`
  }
  
  return number
}

/**
 * 格式化数字字符串，往数字前添加0
 * 
 * @param {Object} num 待格式化的数值
 */
function formatNumberAddZero(value) {
  let number = 0
  // 判断是什么类型
  if (typeof value === 'string') {
    number = Number(value)
  } else if (typeof value === 'number') {
    number = value
  }
  if (isNaN(number) || +number < 10) {
    return '0' + number
  } else {
    return String(number)
  }
  
}

/**
 * 格式化数字，往数值后添加单位
 *
 * @param {Object} value 待格式化的数值
 * @param {Object} digits 保留位数
 */
function formatNumberAddPriceUnit(value, digits = 2) {
  // 数值分割点
  const unitSplit = [
    { value: 1, symbol: ''},
    { value: 1E3, symbol: 'K'},
    { value: 1E4, symbol: 'W'},
  ]
  
  const reg = /\.0+$|(\.[0=9]*[1-9])0+$/
  
  let number = 0
  // 判断是什么类型
  if (typeof value === 'string') {
    number = Number(value)
  } else if (typeof value === 'number') {
    number = value
  }
  
  let i
  for (i = unitSplit.length - 1; i > 0; i--) {
    if (number >= unitSplit[i].value) break
  }
  return (number / unitSplit[i].value).toFixed(digits).replace(reg, "$1") + unitSplit[i].symbol
}

/**
 * 获取数值的整数位数
 *
 * @param {Object} number 数值 
 */
function getDigit(number) {
  let digit = -1
  while (number >= 1) {
    digit++
    number = number / 10
  }
  return digit
}

/**
 * 获取指定范围的随机数(返回整数)
 
 * @param {Object} min 最小值
 * @param {Object} max 最大值
 */
function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    let gab = max - min
    return Math.random() * gab + min
  } else {
    return 0
  }
}

/**
 * 获取指定范围的随机数(返回整数)
 
 * @param {Object} min 最小值
 * @param {Object} max 最大值
 */
function randomInt(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    let gab = max - min + 1
    return Math.floor(Math.random() * gab + min)
  } else {
    return 0
  }
}

export default {
  formatNumberString,
  formatNumberAddZero,
  formatNumberAddPriceUnit,
  random,
  randomInt
}