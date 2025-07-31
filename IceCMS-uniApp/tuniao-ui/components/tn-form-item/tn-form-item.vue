<template>
  <view
    class="tn-form-item-class tn-form-item"
    :class="{
      'tn-border-solid-bottom': elBorderBottom,
      'tn-form-item__border-bottom--error': validateState === 'error' && showError('border-bottom')
    }"
  >
    <view
      class="tn-form-item__body"
      :style="{
        flexDirection: elLabelPosition == 'left' ? 'row' : 'column'
      }"
    >
      <!-- 处理微信小程序中设置属性的问题，不设置值的时候会变成true -->
      <view
        class="tn-form-item--left"
        :style="{
          width: wLabelWidth,
          flex: `0 0 ${wLabelWidth}`,
          marginBottom: elLabelPosition == 'left' ? 0 : '10rpx'
        }"
      >
        <!-- 块对齐 -->
        <view v-if="required || leftIcon || label" class="tn-form-item--left__content"
          :style="[leftContentStyle]"
        >
          <!-- nvue不支持伪元素before -->
          <view v-if="leftIcon" class="tn-form-item--left__content__icon">
            <view :class="[`tn-icon-${leftIcon}`]" :style="leftIconStyle"></view>
          </view>
          <!-- <view
            class="tn-form-item--left__content__label"
            :style="[elLabelStyle, {
              'justify-content': elLabelAlign === 'left' ? 'flex-satrt' : elLabelAlign === 'center' ? 'center' : 'flex-end'
            }]"
          >
            {{label}}
          </view> -->
          <view
            class="tn-form-item--left__content__label"
            :style="[elLabelStyle]"
          >
            {{label}}
          </view>
          <text v-if="required" class="tn-form-item--left__content--required">*</text>
        </view>
      </view>
      
      <view class="tn-form-item--right tn-flex">
        <view class="tn-form-item--right__content">
          <view class="tn-form-item--right__content__slot">
            <slot></slot>
          </view>
          <view v-if="$slots.right || rightIcon" class="tn-form-item--right__content__icon tn-flex">
            <view v-if="rightIcon" :class="[`tn-icon-${rightIcon}`]" :style="rightIconStyle"></view>
            <slot name="right"></slot>
          </view>
        </view>
      </view>
    </view>
    
    <view
      v-if="validateState === 'error' && showError('message')"
      class="tn-form-item__message"
      :style="{
        paddingLeft: elLabelPosition === 'left' ? elLabelWidth + 'rpx' : '0'
      }"
    >
      {{validateMessage}}
    </view>
  </view>
</template>

<script>
  import Emitter from '../../libs/utils/emitter.js'
  import schema from '../../libs/utils/async-validator.js'
  // 去除警告信息
  schema.warning = function() {}
  
  export default {
    mixins: [Emitter],
    name: 'tn-form-item',
    inject: {
      tnForm: {
        default() {
          return null
        }
      }
    },
    props: {
      // label提示语
      label: {
        type: String,
        default: ''
      },
      // 绑定的值
      prop: {
        type: String,
        default: ''
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
        default: ''
      },
      // label的宽度
      labelWidth: {
        type: Number,
        default: 0
      },
      // label的对齐方式
      // left - 左对齐
      // top - 上对齐
      // right - 右对齐
      // bottom - 下对齐
      labelAlign: {
        type: String,
        default: ''
      },
      // label 的样式
      labelStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 左侧图标
      leftIcon: {
        type: String,
        default: ''
      },
      // 右侧图标
      rightIcon: {
        type: String,
        default: ''
      },
      // 左侧图标样式
      leftIconStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 右侧图标样式
      rightIconStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // 是否显示必填项的*，不做校验用途
      required: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      // 处理微信小程序label的宽度
      wLabelWidth() {
        // 如果用户设置label为空字符串(微信小程序空字符串最终会变成字符串的'true')，意味着要将label的位置宽度设置为auto
        return this.elLabelPosition === 'left' ? (this.label === 'true' || this.label === '' ? 'auto' : this.elLabelWidth + 'rpx') : '100%'
      },
      // 是否显示错误提示
      showError() {
        return type => {
          if (this.errorType.indexOf('none') >= 0) return false
          else if (this.errorType.indexOf(type) >= 0) return true
          else return false
        }
      },
      // label的宽度(默认值为90)
      elLabelWidth() {
        return this.labelWidth != 0 ? this.labelWidth : (this.parentData.labelWidth != 0 ? this.parentData.labelWidth : 90)
      },
      // label的样式
      elLabelStyle() {
        return Object.keys(this.labelStyle).length ? this.labelStyle : (Object.keys(this.parentData.labelStyle).length ? this.parentData.labelStyle : {})
      },
      // label显示位置
      elLabelPosition() {
        return this.labelPosition ? this.labelPosition : (this.parentData.labelPosition ? this.parentData.labelPosition : 'left')
      },
      // label对齐方式
      elLabelAlign() {
        return this.labelAlign ? this.labelAlign : (this.parentData.labelAlign ? this.parentData.labelAlign : 'left')
      },
      // label下划线
      elBorderBottom() {
        return this.borderBottom !== '' ? this.borderBottom : (this.parentData.borderBottom !== '' ? this.parentData.borderBottom : true)
      },
      leftContentStyle() {
        let style = {}
        if (this.elLabelPosition === 'left') {
          switch(this.elLabelAlign) {
            case 'left':
              style.justifyContent = 'flex-start'
              break
            case 'center':
              style.justifyContent = 'center'
              break
            default:
              style.justifyContent = 'flex-end'
              break
          }
        }
        
        return style
      }
    },
    data() {
      return {
        // 默认值
        initialValue: '',
        // 是否校验成功
        validateState: '',
        // 校验失败提示信息
        validateMessage: '',
        // 错误的提示方式（参考form组件）
        errorType: ['message'],
        // 当前子组件输入的值
        fieldValue: '',
        // 父组件的参数
        // 由于再computed中无法得知this.parent的变化，所以放在data中
        parentData: {
          borderBottom: true,
          labelWidth: 90,
          labelPosition: 'left',
          labelAlign: 'left',
          labelStyle: {},
        }
      }
    },
    watch: {
      validateState(val) {
        this.broadcastInputError()
      },
      "tnForm.errorType"(val) {
        this.errorType = val
        this.broadcastInputError()
      }
    },
    mounted() {
      // 组件创建完成后，保存当前实例到form组件中
      // 支付宝、头条小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环应用\
      this.parent = this.$t.$parent.call(this, 'tn-form')
      if (this.parent) {
        // 遍历parentData属性，将parent中同名的属性赋值给parentData
        Object.keys(this.parentData).map(key => {
          this.parentData[key] = this.parent[key]
        })
        // 如果没有传入prop或者tnForm为空（单独使用form-item组件的时候），就不进行校验
        if (this.prop) {
          // 将本实例添加到父组件中
          this.parent.fields.push(this)
          this.errorType = this.parent.errorType
          // 设置初始值
          this.initialValue = this.fieldValue
          // 添加表单校验，这里必须要写在$nextTick中，因为tn-form的rules是通过ref手动传入的
          // 不在$nextTick中的话，可能会造成执行此处代码时，父组件还没通过ref把规则给tn-form，导致规则为空
          this.$nextTick(() => {
            this.setRules()
          })
        }
      }
    },
    beforeDestroy() {
      // 组件销毁前，将实例从tn-form的缓存中移除
      // 如果当前没有prop的话表示当前不进行删除
      if (this.parent && this.prop) {
        this.parent.fields.map((item, index) => {
          if (item === this) this.parent.fields.splice(index, 1)
        })
      }
    },
    methods: {
      // 向input组件发出错误事件
      broadcastInputError() {
        this.broadcast('tn-input', 'on-form-item-error', this.validateState === 'error' && this.showError('border'))
      },
      // 设置校验规则
      setRules() {
        let that = this
        // 从父组件tn-form拿到当前tn-form-item需要验证 的规则
        // let rules = this.getRules()
        // if (rules.length) {
        // 	this.isRequired = rules.some(rule => {
        // 		// 如果有必填项，就返回，没有的话，就是undefined
        // 		return rule.required
        // 	})
        // }
        
        // blur事件
        this.$on('on-form-blur', that.onFieldBlur)
        // change事件
        this.$on('on-form-change', that.onFieldChange)
      },
      // 从form的rules属性中取出当前form-item的校验规则
      getRules() {
        let rules = this.parent.rules
        rules = rules ? rules[this.prop] : []
        
        // 返回数值形式的值
        return [].concat(rules || [])
      },
      // blur事件时进行表单认证
      onFieldBlur() {
        this.validation('blur')
      },
      // change事件时进行表单认证
      onFieldChange() {
        this.validation('change')
      },
      // 过滤出符合要求的rule规则
      getFilterRule(triggerType = '') {
        let rules = this.getRules()
        // 整体验证表单时，triggerType为空字符串，此时返回所有规则进行验证
        if (!triggerType) return rules
        // 某些场景可能的判断规则，可能不存在trigger属性，故先判断是否存在此属性
        // 历遍判断规则是否有对应的事件，比如blur，change触发等的事件
        // 使用indexOf判断，是因为某些时候设置的验证规则的trigger属性可能为多个，比如['blur','change']
        return rules.filter(rule => rule.trigger && rule.trigger.indexOf(triggerType) !== -1)
      },
      // 校验数据
      validation(trigger, callback = ()=>{}) {
        // 校验之前先获取需要校验的值
        this.fieldValue = this.parent.model[this.prop]
        // blur和change是否有当前方式的校验规则
        let rules = this.getFilterRule(trigger)
        // 判断是否有验证规则，如果没有规则，也调用回调方法，否则父组件tn-form会因为
        // 对count变量的统计错误而无法进入上一层的回调 
        if (!rules || rules.length === 0) {
          return callback('')
        }
        // 设置当前为校验中
        this.validateState = 'validating'
        // 调用async-validator的方法
        let validator = new schema({
          [this.prop]: rules
        })
        validator.validate({
          [this.prop]: this.fieldValue
        }, {
          firstFields: true
        }, (errors, fields) => {
          // 记录状态和报错信息
          this.validateState = !errors ? 'success' : 'error'
          this.validateMessage = errors ? errors[0].message : ''
          
          callback(this.validateMessage)
        })
      },
      
      // 清空当前item信息
      resetField() {
        this.parent.model[this.prop] = this.initialValue
        // 清空错误标记
        this.validateState = 'success'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-form-item {
    display: flex;
    flex-direction: column;
    padding: 20rpx 0;
    font-size: 28rpx;
    color: $tn-font-color;
    box-sizing: border-box;
    line-height: $tn-form-item-height;
    
    &__border-bottom--error:after {
      border-color: $tn-color-red;
    }
    
    &__body {
      display: flex;
      flex-direction: row;
    }
    
    &--left {
      display: flex;
      flex-direction: row;
      align-items: center;
      
      &__content {
        display: flex;
        flex-direction: row;
        position: relative;
        align-items: center;
        padding-right: 18rpx;
        flex: 1;
        
        &--required {
          position: relative;
          right: 0;
          vertical-align: middle;
          color: $tn-color-red;
        }
        
        &__icon {
          color: $tn-font-sub-color;
          margin-right: 8rpx;
        }
        
        &__label {
          // display: flex;
          // flex-direction: row;
          // align-items: center;
          // flex: 1;
        }
      }
    }
    
    &--right {
      flex: 1;
      
      &__content {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1;
        
        &__slot {
          flex: 1;
          /* #ifndef MP */
          display: flex;
          flex-direction: row;
          align-items: center;
          /* #endif */
        }
        
        &__icon {
          margin-left: 10rpx;
          color: $tn-font-sub-color;
          font-size: 30rpx;
        }
      }
    }
    
    &__message {
      font-size: 24rpx;
      line-height: 24rpx;
      color: $tn-color-red;
      margin-top: 12rpx;
    }
  }
</style>
