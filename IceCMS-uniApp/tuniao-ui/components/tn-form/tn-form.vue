<template>
  <view class="tn-form-class tn-form">
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: 'tn-form',
    props: {
      // 表单数据对象（需要验证的表单数据）
      model: {
        type: Object,
        default() {
          return {}
        }
      },
      // 发生错误时的提示方式
      // toast - 弹出toast框
      // message - 提示信息
      // border - 如果设置了边框，边框会变成红色
      // border-bottom - 下边框会呈现红色
      // none - 无提示
      errorType: {
        type: Array,
        default() {
          return ['message', 'toast']
        }
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type:Boolean,
        default: true
      },
      // label(标签名称)的位置
      // left - 左边
      // top - 上边
      labelPosition: {
        type: String,
        default: 'left'
      },
      // label的宽度
      labelWidth: {
        type: Number,
        default: 90
      },
      // label的对齐方式
      // left - 左对齐
      // center - 居中对齐
      // right - 右对齐
      labelAlign: {
        type: String,
        default: 'left'
      },
      // label 的样式
      labelStyle: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    // 向子孙传递数据
    provide() {
      return {
        tnForm: this
      }
    },
    data() {
      return {
        rules: {}
      }
    },
    created() {
      // 存储当前form下的所有form-item的实例
      // 不能定义再data中，否则小程序会循环引用而报错
      this.fields = []
    },
    methods: {
      /**
       * 设置规则
       * 
       * @param {Object} rules
       */
      setRules(rules) {
        this.rules = rules
      },
      /**
       * 清空form-item组件
       */
      resetFields() {
        this.fields.map(field => {
          field.resetField()
        })
      },
      /**
       * 校验数据
       * @param {Object} callback 校验回调方法
       */
      validate(callback) {
        return new Promise(resolve => {
          // 标记校验是否通过
          let valid = true
          // 标记是否检查完毕
          let count = 0
          // 存放错误信息
          let errors = []
          
          // 对所有form-item进行校验
          this.fields.map(field => {
            // 调用对应form-item实例的validation校验方法
            field.validation('', error => {
              // 如果有一个form-item校验不通过，则整个表单校验不通过
              if (error) {
                valid = false
                errors.push(error)
              }
              // 当遍历完所有的form-item的校验规则，返回信息
              if (++count === this.fields.length) {
                resolve(valid)
                // 判断是否设置了toast的提示方式，只提示表单域中最前面的一条错误信息
                if (this.errorType.indexOf('none') === -1 && 
                    this.errorType.indexOf('toast') >= 0 &&
                    errors.length > 0) {
                  this.$t.message.toast(errors[0])
                }
                // 调用回调方法
                if (typeof callback == 'function') callback(valid)
              }
            })
          })
        })
      }
    }
  }
</script>

<style>
</style>
