// 引入全局mixin
import mixin from './libs/mixin/mixin.js'

// 调试输出信息
function wranning(str) {
  // 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (process.env.NODE_ENV === 'development') {
  	console.warn(str)
  }
}

// 更新自定义状态栏的信息
import updateCustomBarInfo from './libs/function/updateCustomBarInfo.js'
// 获取颜色工具
import color from './libs/function/color.js'
// 消息工具
import message from './libs/function/message.js'
// 获取唯一id
import uuid from './libs/function/uuid.js'
// 数组工具
import array from './libs/function/array.js'

// 规则检验
import test from './libs/function/test.js'
// 获取整个父组件
import $parent from './libs/function/$parent.js'
// 格式化字符串工具
import string from './libs/function/string.js'
// 格式化数值工具
import number from './libs/function/number.js'
// 深度复制
import deepClone from './libs/function/deepClone.js'

// z-index配置信息
import zIndex from './libs/config/zIndex.js'
// 主题颜色信息
import colorInfo from './libs/config/color.js'

const $t = {
  updateCustomBar: updateCustomBarInfo,
  color,
  message,
  uuid,
  array,
  test,
  $parent,
  string,
  number,
  deepClone,
  zIndex,
  colorInfo,
}

// 挂载到uni对象上
uni.$t = $t

const install = Vue => {
  // 全局混入
  Vue.mixin(mixin)
  
  // Filter格式化
  
  Vue.prototype.$t = $t
}

export default {
  install
}
