/**
 * 递归使用call方式 this指向
 * 
 * @param {String} componentName 需要查找的组件的名称
 * @param {String} eventName 事件名称
 * @param {Object} params 需要传递的参数
 */
function broadcast(componentName, eventName, params) {
  // 循环子节点找到需要的节点，没有查找到就递归进行查找
  this.$children.map(child => {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params))
    }
  })
}

export default {
  methods: {
    /**
     * 派发 向上查找一个
     * @param {Object} componentName 需要查找的组件的名称
     * @param {Object} eventName 事件名称
     * @param {Object} params 需要传递的参数
     */
    dispatch(componentName, eventName, params) {
      // 找到最近父节点 $root 根节点
      let parent = this.$parent || this.$root
      // 获取当前实例的名称
      let name = parent.$options.name
      
      // 当前存在节点并且当前节点没有名称或者名称不等于我们要查找的节点名称，则继续遍历
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      // 如果有节点则表示找到
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    /**
     * 广播 向下查找多个
     * @param {Object} componentName 需要查找的组件的名称
     * @param {Object} eventName 事件名称
     * @param {Object} params 需要传递的参数
     */
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}