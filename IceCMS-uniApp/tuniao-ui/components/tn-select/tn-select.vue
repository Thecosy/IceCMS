<template>
  <view v-if="value" class="tn-select-class tn-select">
    <tn-popup
      v-model="value"
      mode="bottom"
      :popup="false"
      length="auto"
      :safeAreaInsetBottom="safeAreaInsetBottom"
      :maskCloseable="maskCloseable"
      :zIndex="elZIndex"
      @close="close"
    >
      <view class="tn-select__content">
        <!-- 头部 -->
        <view class="tn-select__content__header" @touchmove.stop.prevent>
          <view
            class="tn-select__content__header__btn tn-select__content__header--cancel"
            :style="{ color: cancelColor }"
            hover-class="tn-hover-class"
            hover-stay-time="150"
            @tap="getResult('cancel')"
          >{{ cancelText }}</view>
          <view class="tn-select__content__header__title">{{ title }}</view>
          <view
            class="tn-select__content__header__btn tn-select__content__header--confirm"
            :style="{ color: confirmColor }"
            hover-class="tn-hover-class"
            hover-stay-time="150"
            @tap="getResult('confirm')"
          >{{ confirmText }}</view>
        </view>
        <!-- 列表内容 -->
        <view class="tn-select__content__body">
          <picker-view
            class="tn-select__content__body__view"
            :value="defaultSelector"
            @pickstart="pickStart"
            @pickend="pickEnd"
            @change="columnChange"
          >
            <picker-view-column v-for="(item, index) in columnData" :key="index">
              <view class="tn-select__content__body__item" v-for="(sub_item, sub_index) in item" :key="sub_index">
                <view class="tn-text-ellipsis">
                  {{ sub_item[labelName] }}
                </view>
              </view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </tn-popup>
  </view>
</template>

<script>
  export default {
    name: 'tn-select',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      // 列表模式
      // single 单列 multi 多列 multi-auto 多列联动
      mode: {
        type: String,
        default: 'single'
      },
      // 列数据
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // value属性名
      valueName: {
        type: String,
        default: 'value'
      },
      // label属性名
      labelName: {
        type: String,
        default: 'label'
      },
      // 当mode=multi-auto时，children的属性名
      childName: {
        type: String,
        default: 'children'
      },
      // 默认值
      defaultValue: {
        type: Array,
        default() {
          return [0]
        }
      },
      // 顶部标题
      title: {
        type: String,
        default: ''
      },
      // 取消按钮文字
      cancelText: {
        type: String,
        default: '取消'
      },
      // 取消按钮文字颜色
      cancelColor: {
        type: String,
        default: ''
      },
      // 确认按钮文字
      confirmText: {
        type: String,
        default: '确认'
      },
      // 确认按钮文字颜色
      confirmColor: {
        type: String,
        default: ''
      },
      // 点击遮罩关闭
      maskCloseable: {
        type: Boolean,
        default: true
      },
      // 预留安全区域
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // zIndex
      zIndex: {
        type: Number,
        default: 0
      }
    },
    computed: {
      elZIndex() {
        return this.zIndex ? this.zIndex : this.$t.zIndex.popup
      }
    },
    data() {
      return {
        // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
        moving: false,
        // 用户保存当前列的索引，用于判断下一次变化时改变的列
        defaultSelector: [0],
        // picker-view数据
        columnData: [],
        // 保存用户选择的结果
        selectValue: [],
        // 上一次改变时的index
        lastSelectIndex: [],
        // 列数
        columnNum: 0
      }
    },
    watch: {
      // 在select弹起的时候，重新初始化所有数据
      value: {
        handler(val) {
          if (val) setTimeout(() => this.init(), 10)
        },
        immediate: true
      }
    },
    methods: {
      // 标识滑动开始，只有微信小程序才有这样的事件
      pickStart() {
      	// #ifdef MP-WEIXIN
      	this.moving = true;
      	// #endif
      },
      // 标识滑动结束
      pickEnd() {
      	// #ifdef MP-WEIXIN
      	this.moving = false;
      	// #endif
      },
      init() {
        this.setColumnNum()
        this.setDefaultSelector()
        this.setColumnData()
        this.setSelectValue()
      },
      // 获取默认选中列下标
      setDefaultSelector() {
        // 如果没有传入默认值，生成用0填充长度为columnNum的数组
        this.defaultSelector = this.defaultValue.length === this.columnNum ? this.defaultValue : Array(this.columnNum).fill(0)
        this.lastSelectIndex = this.$t.deepClone(this.defaultSelector)
      },
      // 计算列数
      setColumnNum() {
        // 单列的数量为1
        if (this.mode === 'single') this.columnNum = 1
        // 多列时取list的长度
        else if (this.mode === 'multi') this.columnNum = this.list.length
        // 多列联动时，通过遍历list的第一个元素，得出有多少列
        else if (this.mode === 'multi-auto') {
          let num = 1
          let column = this.list
          // 如果存在children属性，再次遍历
          while (column[0][this.childName]) {
            column = column[0] ? column[0][this.childName] : {},
            num++
          }
          this.columnNum = num
        }
      },
      // 获取需要展示在picker中的列数据
      setColumnData() {
        let data = []
        this.selectValue = []
        if (this.mode === 'multi-auto') {
          // 获取所有数据中的第一个元素
          let column = this.list[this.defaultSelector.length ? this.defaultSelector[0] : 0]
          // 通过循环所有列数，再根据设定列的数组，得出当前需要渲染的整个列数组
          for (let i = 0; i < this.columnNum; i++) {
            // 第一列默认为整个list数组
            if (i === 0) {
              data[i] = this.list
              column = column[this.childName]
            } else {
              // 大于第一列时，判断是否有默认选中的，如果没有就用该列的第一项
              data[i] = column
              column = column[this.defaultSelector[i]][this.childName]
            }
          }
        } else if (this.mode === 'single') {
          data[0] = this.list
        } else {
          data = this.list
        }
        this.columnData = data
      },
      // 获取默认选中的值，如果没有设置，则默认选中第一项
      setSelectValue() {
        let tmp = null
        for (let i = 0; i < this.columnNum; i++) {
          tmp = this.columnData[i][this.defaultSelector[i]]
          let data = {
            value: tmp ? tmp[this.valueName] : null,
            label: tmp ? tmp[this.labelName] : null
          }
          // 判断是否存在额外的参数
          if (tmp && tmp.extra) data.extra = tmp.extra
          this.selectValue.push(data)
        }
      },
      // 列选项
      columnChange(event) {
        let index = null
        let columnIndex = event.detail.value
        
        this.selectValue = []
        if (this.mode === 'multi-auto') {
          // 对比前后两个数组，判断变更的是那一列
          this.lastSelectIndex.map((v, idx) => {
            if (v != columnIndex[idx]) index = idx
          })
          this.defaultSelector = columnIndex
          // 当前变化列的下一列的数据，需要获取上一列的数据，同时需要指定是上一列的第几个的children，再往后的
          // 默认是队列的第一个为默认选项
          for (let i = index + 1; i < this.columnNum; i++) {
            this.columnData[i] = this.columnData[i - 1][i - 1 == index ? columnIndex[index] : 0][this.childName]
            this.defaultSelector[i] = 0
          }
          // 在历遍的过程中，可能由于上一步修改this.columnData，导致产生连锁反应，程序触发columnChange，会有多次调用
          // 只有在最后一次数据稳定后的结果是正确的，此前的历遍中，可能会产生undefined，故需要判断
          columnIndex.map((item, index) => {
            let data = this.columnData[index][columnIndex[index]]
            let tmp = {
              value: data ? data[this.valueName] : null,
              label: data ? data[this.labelName] : null
            }
            if (data && data.extra !== undefined) tmp.extra = data.extra
            this.selectValue.push(tmp)
          })
          this.lastSelectIndex = columnIndex
        } else if (this.mode === 'single') {
          let data = this.columnData[0][columnIndex[0]]
          let tmp = {
            value: data ? data[this.valueName] : null,
            label: data ? data[this.labelName] : null
          }
          if (data && data.extra !== undefined) tmp.extra = data.extra
          this.selectValue.push(tmp)
        } else if (this.mode === 'multi') {
          columnIndex.map((item, index) => {
            let data = this.columnData[index][columnIndex[index]]
            let tmp = {
              value: data ? data[this.valueName] : null,
              label: data ? data[this.labelName] : null
            }
            if (data && data.extra !== undefined) tmp.extra = data.extra
            this.selectValue.push(tmp)
          })
        }
      },
      close() {
        this.$emit('input', false)
      },
      getResult(event = null) {
        // #ifdef MP-WEIXIN
        if (this.moving) return;
        // #endif
        if (event) this.$emit(event, this.selectValue)
        this.close()
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .tn-select {
    
    &__content {
      position: relative;
      
      &__header {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 90rpx;
        padding: 0 40rpx;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        font-size: 30rpx;
        background-color: #FFFFFF;
        
        &__btn {
          padding: 16rpx;
          box-sizing: border-box;
          text-align: center;
          text-decoration: none;
        }
        
        &__title {
          color: $tn-font-color;
        }
        
        &--cancel {
          color: $tn-font-sub-color;
        }
        
        &--confirm {
          color: $tn-main-color;
        }
      }
      
      &__body {
        width: 100%;
        height: 500rpx;
        overflow: hidden;
        background-color: #FFFFFF;
        
        &__view {
          height: 100%;
          box-sizing: border-box;
        }
        
        &__item {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 32rpx;
          color: $tn-font-color;
          padding: 0 8rpx;
        }
      }
    }
    
  }
</style>
