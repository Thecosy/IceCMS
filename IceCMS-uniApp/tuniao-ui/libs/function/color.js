let color = [
  'red',
  'purplered',
  'purple',
  'bluepurple',
  'aquablue',
  'blue',
  'indigo',
  'cyan',
  'teal',
  'green',
  'yellowgreen',
  'lime',
  'yellow',
  'orangeyellow',
  'orange',
  'orangered',
  'brown',
  'grey',
  'gray'
]

// 酷炫颜色的数量
const COOL_BG_COLOR_COUNT = 16

/**
 * 获取IceCMS配色颜色列表
 */
function getTuniaoColorList() {
  return color
}

/**
 * 获取指定类型的随机颜色对应的类
 * @param {String} type 颜色类型
 */
function getRandomColorClass(type = 'bg') {
  const index = Math.floor(Math.random() * color.length)
  const colorValue = color[index]

  return 'tn-' + type + '-' + colorValue
}

/**
 * 随机获取酷炫背景对应的类
 */
function getRandomCoolBgClass() {
  const index = (Math.random() * COOL_BG_COLOR_COUNT) + 1
  return 'tn-cool-bg-color-' + Math.floor(index)
}

/**
 * 根据传入的值获取内部背景颜色类
 * 
 * @param {String} backgroundColor 背景颜色信息
 */
function getBackgroundColorInternalClass(backgroundColor = '') {
  if (!backgroundColor) return ''
  
  if (['tn-bg', 'tn-dynamic-bg', 'tn-main-gradient', 'tn-cool-bg'].some(item => {
    return backgroundColor.includes(item)
  })) {
    return backgroundColor
  }
  return ''
}

/**
 * 根据传入的值获取背景颜色样式
 * 
 * @param {String} backgroundColor 背景颜色信息
 */
function getBackgroundColorStyle(backgroundColor = '') {
  if (!backgroundColor) return ''
  
  if (!backgroundColor.startsWith('tn-') || ['#', 'rgb', 'rgba'].some(item => {
    return backgroundColor.includes(item)
  })) {
    return backgroundColor
  }
  return ''
}

/**
 * 根据传入的值获取内部字体颜色类
 * 
 * @param {String} fontColor 背景颜色信息
 */
function getFontColorInternalClass(fontColor = '') {
  if (!fontColor) return ''
  
  if (['tn-color'].some(item => {
    return fontColor.includes(item)
  })) {
    return fontColor
  }
  return ''
}

/**
 * 根据传入的值获取字体颜色样式
 * 
 * @param {String} fontColor 背景颜色信息
 */
function getFontColorStyle(fontColor = '') {
  if (!fontColor) return ''
  
  if (!fontColor.startsWith('tn-') || ['#', 'rgb', 'rgba'].some(item => {
    return fontColor.includes(item)
  })) {
    return fontColor
  }
  return ''
}

/**
 * 求两个颜色之间的渐变值
 * 
 * @param {String} startColor 开始颜色
 * @param {String} endColor 结束颜色
 * @param {Number} step 颜色等分的份额 
 */
function colorGradient(startColor = 'rgb(0, 0, 0)', endColor='rgb(255, 255, 255)', step = 10) {
  let startRGB = hexToRGB(startColor, false)
  let startR = startRGB[0]
  let startG = startRGB[1]
  let startB = startRGB[2]
  
  let endRGB = hexToRGB(endColor, false)
  let endR = endRGB[0]
  let endG = endRGB[1]
  let endB = endRGB[2]
  
  // 求差值
  let R = (endR - startR) / step
  let G = (endG - startG) / step
  let B = (endB - startB) / step
  
  let colorArr = []
  for (let i = 0; i < step; i++) {
    // 计算每一步的hex值
    let hex = rgbToHex(`rgb(${Math.round(R * i + startR)}, ${Math.round(G * i + startG)}, ${Math.round(B * i + startB)})`)
    colorArr.push(hex)
  }
  return colorArr
}

/**
 * 将hex的颜色表示方式转换为rgb表示方式
 * 
 * @param {String} color 颜色
 * @param {Boolean} str 是否返回字符串
 * @return {Array|String} rgb的值
 */
function hexToRGB(color, str = true) {
  let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  
  color = color.toLowerCase()
  if (color && reg.test(color)) {
    // #000 => #000000
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < 4; i++) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值
    let colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)))
    }
    if (!str) {
      return colorChange
    } else {
      return `rgb(${colorChange[0]}, ${colorChange[1]}, ${colorChange[2]})`
    }
  } else if (/^(rgb|RGB)/.test(color)) {
    let arr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(',')
    return arr.map(item => Number(item))
  } else {
    return color
  }
}

/**
 * 将rgb的颜色表示方式转换成hex表示方式
 * 
 * @param {Object} rgb rgb颜色值
 */
function rgbToHex(rgb) {
  let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  if (/^(rgb|RGB)/.test(rgb)) {
    let color = rgb.replace(/(?:\(|\)|rgb|GRB)*/g, "").split(',')
    let strHex = '#'
    for (let i = 0; i < color.length; i++) {
      let hex = Number(color[i]).toString(16)
      // 保证每个值否是两位数
      hex = String(hex).length === 1 ? 0 + '' + hex: hex
      if (hex === '0') {
        hex += hex
      }
      strHex += hex
    }
    if (strHex.length !== 7) {
      strHex = rgb
    }
    return strHex
  } else if (reg.test(rgb)) {
    let num = rgb.replace(/#/, '').split('')
    if (num.length === 6) {
      return rgb
    } else if (num.length === 3) {
      let numHex = '#'
      for (let i = 0; i < num.length; i++) {
        numHex += (num[i] + num[i])
      }
      return numHex
    }
  } else {
    return rgb
  }
}

/**
 * 将传入的颜色值转换为rgba字符串
 * 
 * @param {String} color 颜色
 * @param {Number} alpha 透明度
 */
function colorToRGBA(color, alpha = 0.3) {
  color = rgbToHex(color)
  // 十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  
  color = color.toLowerCase()
  if (color && reg.test(color)) {
    // #000 => #000000
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < 4; i++) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值
    let colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)))
    }
    return `rgba(${colorChange[0]}, ${colorChange[1]}, ${colorChange[2]}, ${alpha})`
  } else {
    return color
  }
}

export default {
  COOL_BG_COLOR_COUNT: COOL_BG_COLOR_COUNT,
  getTuniaoColorList,
  getRandomColorClass,
  getRandomCoolBgClass,
  getBackgroundColorInternalClass,
  getBackgroundColorStyle,
  getFontColorInternalClass,
  getFontColorStyle,
  colorGradient,
  hexToRGB,
  rgbToHex,
  colorToRGBA
}
