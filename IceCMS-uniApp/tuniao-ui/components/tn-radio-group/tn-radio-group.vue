<template>
  <view class="tn-radio-group-class tn-radio-group">
    <slot></slot>
  </view>
</template>

<script>
  import Emitter from '../../libs/utils/emitter.js'
  
  export default {
    mixins: [ Emitter ],
    name: 'tn-radio-group',
    props: {
      // 单选组的值，会选中值相同的选项
      value: {
        type: String,
        default: ''
      },
      // 是否禁用
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
        default: 'circle'
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
      // 每个radio占的宽度
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
      // 这里computed的变量，都是子组件tn-radio需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
      // 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(tn-radio-group)
      // 拉取父组件新的变化后的参数
      parentData() {
        return [this.value, this.disabled, this.activeColor, this.size, this.disabledLabel, this.shape, this.iconSize, this.width, this.wrap]
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
            // 判断子组件(tn-radio)如果有updateParentData方法的话，子组件重新从父组件拉取了最新的值
            typeof(child.updateParentData) === 'function' && child.updateParentData()
          })
        }
      }
    },
    created() {
      // 如果将children定义在data中，在微信小程序会造成循环引用而报错
      this.children = []
    },
    methods: {
      // 改方法由子组件tn-radio调用，当一个tn-radio被选中的时候，给父组件设置value值（通知其他tn-radio组件）
      setValue(value) {
        // 通过子组件传递过来的value值(此被选中的子组件内部已将parentValue设置等于value的值)，将其他tn-radio设置未选中的状态
        this.children.map(child => {
          if (child.parentData.value !== value) child.parentData.value = ''
        })
        // 通过emit事件，设置父组件通过v-model双向绑定的值
        this.$emit('input', value)
        this.$emit('change', value)
        // 等待下一个周期再执行，因为this.$emit('input')作用于父组件，再反馈到子组件内部，需要时间
        // 由于头条小程序执行迟钝，故需要用几十毫秒的延时
        setTimeout(() => {
        	// 将当前的值发送到 tn-form-item 进行校验
        	this.dispatch('tn-form-item', 'on-form-change', value);
        }, 60)
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-radio-group {
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
