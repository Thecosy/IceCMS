<template>
  <view class="tn-waterfall-class tn-waterfall">
    <view id="tn-waterfall-left" class="tn-waterfall__column"><slot name="left" :leftList="leftList"></slot></view>
    <view id="tn-waterfall-right" class="tn-waterfall__column"><slot name="right" :rightList="rightList"></slot></view>
  </view>
</template>

<script>
  export default {
    name: 'tn-waterfall',
    props: {
      // 瀑布流数据
      value: {
        type: Array,
        default() {
          return []
        }
      },
      // 数据的id值，根据id值对数据执行删除操作
      // 如数据为：{id: 1, name: 'tuniao'}，那么该值设置为id
      idKey: {
        type: String,
        default: 'id'
      },
      // 每次插入数据的事件间隔，间隔越长能保证两列高度相近，但是用户体验不好
      // 单位ms
      addTime: {
        type: Number,
        default: 200
      }
    },
    computed: {
      // 破坏value变量引用，否则数据会保持不变
      copyValue() {
        return this.cloneData(this.value)
      }
    },
    watch: {
      copyValue(nVal, oVal) {
        // 取出数组发生变化的部分
        let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0
        // 拼接原有数据
        this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)))
        this.splitData()
      }
    },
    data() {
      return {
        // 左列表
        leftList: [],
        // 右列表
        rightList: [],
        // 临时列表
        tempList: []
      }
    },
    mounted() {
      this.tempList = this.cloneData(this.copyValue)
      this.splitData()
    },
    methods: {
      // 拆分数据
      async splitData() {
        if (!this.tempList.length) return
        
        let leftRect = await this._tGetRect('#tn-waterfall-left')
        let rightRect = await this._tGetRect('#tn-waterfall-right')
        
        let item = this.tempList[0]
        // 因为经过上面两个await节点查询和定时器，数组有可能会变成空[]，导致item的值为undefined
        // 解决多次快速滚动会导致数据乱的问题
        if (!item) return
        
        // 如果左边小于或者等于右边，就添加到左边，否则添加到右边
        if (leftRect.height < rightRect.height) {
          this.leftList.push(item)
        } else if (leftRect.height > rightRect.height) {
          this.rightList.push(item)
        } else {
          // 为了保证前两项添加时，左右两边都还没有内容，这时候根据队列长度判断下一项该放在哪一边
          if (this.leftList.length <= this.rightList.length) {
            this.leftList.push(item)
          } else {
            this.rightList.push(item)
          }
        }
        
        // 移除临时数组中已处理的数据
        this.tempList.splice(0, 1)
        // 如果还有数据则继续执行
        if (this.tempList.length) {
          setTimeout(() => {
            this.splitData()
          }, this.addTime)
        } else {
          this.$emit('finish')
        }
      },
      // 复制对象和数组（深度复制不会影响原对象和数组）
      cloneData(data) {
        return JSON.parse(JSON.stringify(data))
      },
      // 清空数据列表
      clear() {
        this.leftList = []
        this.rightList = []
        this.$emit('input', [])
        this.tempList = []
      },
      // 清除指定的某一条数据，根据id来实现
      remove(id) {
        // 如果查找不到就返回-1
        let index = -1
        index = this.leftList.findIndex(val => val[this.idKey] == id)
        if (index != -1) {
          // 如果index不等于-1，说明已经找到了指定的数据
          this.leftList.splice(index, 1)
        } else {
          // 同理于上面的方法
          index = this.rightList.findIndex(val => val[this.idKey] == id)
          if (index != -1) this.rightList.splice(index, 1)
        }
        // 同时删除父组件对应的数据
        index = this.value.findIndex(val => val[this.idKey] == id)
        if (index != -1) this.$emit('input', this.value.splice(index, 1))
      },
      // 修改指定数据的属性
      modify(id, key, value) {
        // 如果查找不到就返回-1
        let index = -1
        index = this.leftList.findIndex(val => val[this.idKey] == id)
        if (index != -1) {
          // 如果index不等于-1，说明已经找到了指定的数据
          this.leftList[index][key] = value
        } else {
          // 同理于上面的方法
          index = this.rightList.findIndex(val => val[this.idKey] == id)
          if (index != -1) this.rightList[index][key] = value
        }
        // 同时删除父组件对应的数据
        index = this.value.findIndex(val => val[this.idKey] == id)
        if(index != -1) {
          let data = this.cloneData(this.value)
          data[index][key] = value
          this.$emit('input', data)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-waterfall {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    
    &__column {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: auto;
    }
  }
</style>
