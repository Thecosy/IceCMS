module.exports = {
  data() {
    return {}
  },
  onLoad() {
    // getRect挂载再$t上，用为这个方法需要使用in（this），所以无法把它独立层一个单独的文件导出
    this.$t.getRect = this._tGetRect
  },
  beforeDestory() {
    // 判断当前页面是否存在parent和children
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$t.test.array(this.parent.children)) {
      // 组件销毁时，移除子组件在父组件children数组中的实例
      const childrenList = this.parent.children
      childrenList.map((child, index) => {
        // 如果相对，则移除
        if (child === this) {
          childrenList.splice(index, 1)
        }
      })
    }
  },
  methods: {
    /**
     * 查询节点信息
     * 当前方法在支付宝小程序中无法获取组件跟接点的尺寸
     * 解决办法：为组件根部再套一个没有任何作用的view元素
     */
    _tGetRect(selector, all) {
      return new Promise((resolve) => {
        uni.createSelectorQuery()
          .in(this)[all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect)
            }
            if (!all && rect) {
              resolve(rect)
            }
          })
          .exec()
      })
    },
    /**
     * 获取父组件的数据
     */
    getParentData(parentName = '') {
      // 避免再created中定义parent变量
      if (!this.parent) this.parent = false
      // 通过获取父组件实例
      // 将父组件this中对应的参数，赋值给本组件的parentData对象中对应的属性
      // 头条小程序不支持通过this.parent.xxx去监听父组件参数的变化，所以需要本方法进行实现
      this.parent = this.$t.$parent.call(this, parentName)
      if (this.parent) {
        // 遍历parentData中的属性，将parent中同名的属性赋值给parentData
        Object.keys(this.parentData).map(key => {
          this.parentData[key] = this.parent[key]
        })
      }
    },
    /**
     * 阻止事件冒泡
     */
    preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation()
    }
  }
}