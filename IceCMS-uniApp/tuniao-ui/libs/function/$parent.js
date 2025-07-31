// 获取父组件的参数，在支付宝小程序中不支持provide/inject的写法
// 在非H5中this.$parent可以获取到父组件，但是在H5中需要多次调用this.$parent.$parent.xxx
// 传递默认值undefined表示查找最顶层的$parent
export default function $parent(name = undefined) {
  let parent = this.$parent
  // 通过whle遍历，这里主要是为了H5需要多层解析
  while(parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，则继续查找
      parent = parent.$parent
    } else {
      return parent
    }
  }
  
  return false
}