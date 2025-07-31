<template>
  <view class="tn-checkbox-group-class tn-checkbox-group">
    <slot></slot>
  </view>
</template>

<script>
  import Emitter from '../../libs/utils/emitter.js'
  
  export default {
    mixins: [ Emitter ],
    name: 'tn-checkbox-group',
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      },
      // 可以选中多少个checkbox
      max: {
        type: Number,
        default: 999
      },
      // 表单提交时的标识符
      name: {
        type: String,
        default: ''
      },
      // 禁用选择
      disabled: {
        type: Boolean,
        default: false
      },
      // 禁用点击标签进行选择
      disabledLabel: {
        type: Boolean,
        default: false
      },
      // 选择框的形状 square 方形 circle 圆形
      shape: {
        type: String,
        default: 'square'
      },
      // 选中时的颜色
      activeColor: {
        type: String,
        default: '#01BEFF'
      },
      // 组件大小
      size: {
        type: Number,
        default: 34
      },
      // 每个checkbox占的宽度
      width: {
        type: String,
        default: 'auto'
      },
      // 是否换行
      wrap: {
        type: Boolean,
        default: false
      },
      // 图标大小
      iconSize: {
        type: Number,
        default: 20
      }
    },
    computed: {
      // 这里computed的变量，都是子组件tn-checkbox需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
      // 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(tn-checkbox-group)
      // 拉取父组件新的变化后的参数
      parentData() {
        return [this.value, this.disabled, this.disabledLabel, this.shape, this.activeColor, this.size, this.width, this.wrap, this.iconSize]
      }
    },
    data() {
      return {
        
      }
    },
    watch: {
      // 当父组件中的子组件需要共享的参数发生了变化，手动通知子组件
      parentData() {
        if (this.children.length) {
          this.children.map(child => {
            // 判断子组件(tn-checkbox)如果有updateParentData方法的话，子组件重新从父组件拉取了最新的值
            typeof(child.updateParentData) === 'function' && child.updateParentData()
          })
        }
      }
    },
    created() {
      this.children = []
    },
    methods: {
      initValue(values) {
        this.$emit('input', values)
      },
      // 触发事件
      emitEvent() {
        let values = []
        this.children.map(child => {
          if (child.checkValue) values.push(child.name)
        })
        this.$emit('change', values)
        this.$emit('input', values)
        // 发出事件，用于在表单组件中嵌入checkbox的情况，进行验证
        // 由于头条小程序执行迟钝，故需要用几十毫秒的延时
        setTimeout(() => {
        	// 将当前的值发送到 tn-form-item 进行校验
        	this.dispatch('tn-form-item', 'on-form-change', values)
        }, 60)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-checkbox-group {
    /* #ifndef MP || APP-NVUE */
    display: inline-flex;
    flex-wrap: wrap;
    /* #endif */
    &::after {
      content: " ";
      display: table;
      clear: both;
    }
  }
</style>
