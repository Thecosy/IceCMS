<template>
  <view class="tn-cascade-selection tn-cascade-selection-class">
    <scroll-view
      class="selection__scroll-view"
      :class="[{'tn-border-solid-bottom': headerLine}]"
      :style="[scrollViewStyle]"
      scroll-x
      scroll-with-animation
      :scroll-into-view="scrollViewId"
    >
      <view class="selection__header" :class="[backgroundColorClass]" :style="[headerStyle]">
        <view
          v-for="(item, index) in selectedArr"
          :key="index"
          :id="`select__${index}`"
          class="selection__header__item"
          :class="[headerItemClass(index)]"
          :style="[headerItemStyle(index)]"
          @tap.stop="clickNav(index)"
        >
          {{ item.text }}
          <view
            v-if="index===currentTab && showActiveLine"
            class="selection__header__line"
            :style="{backgroundColor: activeLineColor}"
          ></view>
        </view>
      </view>
    </scroll-view>
    
    <swiper
      class="selection__list"
      :class="[backgroundColorClass]"
      :style="[listStyle]"
      :current="currentTab"
      :duration="300"
      @change="switchTab"
    >
      <swiper-item
        v-for="(item, index) in selectedArr"
        :key="index"
      >
        <scroll-view
          class="selection__list__item"
          :style="{height: selectionContainerHeight + 'rpx'}"
          scroll-y
          :scroll-into-view="item.scrollViewId"
        >
          <view class="selection__list__item--first"></view>
          <view
            v-for="(subItem, subIndex) in item.list"
            :key="subIndex"
            :id="`select__${subIndex}`"
            class="selection__list__item__cell"
            :style="[itemStyle]"
            @tap="change(index, subIndex, subItem)"
          >
            <view
              v-if="item.index === subIndex"
              class="selection__list__item__icon tn-icon-success"
              :style="[itemIconStyle]"
            ></view>
            <image
              v-if="subItem.src"
              class="selection__list__item__image"
              :style="[itemImageStyle]"
              :src="subItem.src"
            ></image>
            <view
              class="selection__list__item__title"
              :class="[{'tn-text-bold': item.index === subIndex && itemActiveBold}]"
              :style="[itemTitleStyle(index, subIndex)]"
            >
              {{ subItem.text }}
            </view>
            <view
              v-if="subItem.subText"
              class="selection__list__item__title--sub"
              :style="[itemSubTitleStyle]"
            >
              {{ subItem.subText }}
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import componentsColorMixin from '../../libs/mixin/components_color.js'
  export default {
    name: 'tn-cascade-selection',
    mixins: [ componentsColorMixin ],
    props: {
      // 如果下一级是请求返回，则为第一级数据，否则为所有数据
      /* {
        text: '', // 标题
        subText: '', // 子标题
        src: '', // 图片地址
        value: 0, // 选中的值
        children: [
          {
            text: '',
            subText: '',
            value: 0,
            children: []
          }
        ]
      } */
      list: {
        type: Array,
        default() {
          return []
        }
      },
      // 默认选中值
      // ['value1','value2','value3']
      defaultValue: {
        type: Array,
        default() {
          return []
        }
      },
      // 子集数据通过请求来获取
      request: {
        type: Boolean,
        default: false
      },
      // request为true时生效, 获取到的子集数据
      receiveData: {
        type: Array,
        default() {
          return []
        }
      },
      // 显示header底部细线
      headerLine: {
        type: Boolean,
        default: true
      },
      // header背景颜色
      headerBgColor: {
        type: String,
        default: ''
      },
      // 顶部标签栏高度,单位rpx
      tabsHeight: {
        type: Number,
        default: 88
      },
      // 默认显示文字
      text: {
        type: String,
        default: '请选择'
      },
      // 选中的颜色
      activeColor: {
        type: String,
        default: '#01BEFF'
      },
      // 选中后加粗
      activeBold: {
        type: Boolean,
        default: true
      },
      // 选中显示底部线条
      showActiveLine: {
        type: Boolean,
        default: true
      },
      // 线条颜色
      activeLineColor: {
        type: String,
        default: '#01BEFF'
      },
      // icon大小,单位rpx
      activeIconSize: {
        type: Number,
        default: 0
      },
      // icon颜色
      activeIconColor: {
        type: String,
        default: '#01BEFF'
      },
      // item图片宽度, 单位rpx
      itemImgWidth: {
        type: Number,
        default: 0
      },
      // item图片高度, 单位rpx
      itemImgHeight: {
        type: Number,
        default: 0
      },
      // item图片圆角
      itemImgRadius: {
        type: String,
        default: '50%'
      },
      // item text颜色
      itemTextColor: {
        type: String,
        default: ''
      },
      // item text选中颜色
      itemActiveTextColor: {
        type: String,
        default: ''
      },
      // item text选中加粗
      itemActiveBold: {
        type: Boolean,
        default: true
      },
      // item text文字大小, 单位rpx
      itemTextSize: {
        type: Number,
        default: 0
      },
      // item subText颜色
      itemSubTextColor: {
        type: String,
        default: ''
      },
      // item subText字体大小, 单位rpx
      itemSubTextSize: {
        type: Number,
        default: 0
      },
      // item样式
      itemStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      // selection选项容器高度, 单位rpx
      selectionContainerHeight: {
        type: Number,
        default: 300
      }
    },
    computed: {
      scrollViewStyle() {
        let style = {}
        if (this.headerBgColor) {
          style.backgroundColor = this.headerBgColor
        }
        return style
      },
      headerStyle() {
        let style = {}
        style.height = `${this.tabsHeight}rpx`
        if (this.backgroundColorStyle) {
          style.backgroundColor = this.backgroundColorStyle
        }
        return style
      },
      headerItemClass() {
        return (index) => {
          let clazz = ''
          if (index !== this.currentTab) {
            clazz += ` ${this.fontColorClass}`
          } else {
            if (this.activeBold) {
              clazz += ' tn-text-bold'
            }
          }
          return clazz
        }
      },
      headerItemStyle() {
        return (index) => {
          let style = {}
          style.color = index === this.currentTab ? this.activeColor : (this.fontColorStyle ? this.fontColorStyle : '')
          if (this.fontSizeStyle) {
            style.fontSize = this.fontSizeStyle
          }
          return style
        }
      },
      listStyle() {
        let style = {}
        style.height = `${this.selectionContainerHeight}rpx`
        if (this.backgroundColorStyle) {
          style.color = this.backgroundColorStyle
        }
        return style
      },
      itemIconStyle() {
        let style = {}
        if (this.activeIconColor) {
          style.color = this.activeIconColor
        }
        if (this.activeIconSize) {
          style.fontSize = this.activeIconSize + 'rpx'
        }
        return style
      },
      itemImageStyle() {
        let style = {}
        if (this.itemImgWidth) {
          style.width = this.itemImgWidth + 'rpx'
        }
        if (this.itemImgHeight) {
          style.height = this.itemImgHeight + 'rpx'
        }
        if (this.itemImgRadius) {
          style.borderRadius = this.itemImgRadius
        }
        return style
      },
      itemTitleStyle() {
        return (index, subIndex) => {
          let style = {}
          if (index === subIndex) {
            if (this.itemActiveTextColor) {
              style.color = this.itemActiveTextColor
            }
          } else {
            if (this.itemTextColor) {
              style.color = this.itemTextColor
            }
          }
          if (this.itemTextSize) {
            style.fontSize = this.itemTextSize + 'rpx'
          }
          return style
        }
      },
      itemSubTitleStyle() {
        let style = {}
        if (this.itemSubTextColor) {
          style.color = this.itemSubTextColor
        }
        if (this.itemSubTextSize) {
          style.fontSize = this.itemSubTextSize + 'rpx'
        }
        return {}
      }
    },
    watch: {
      list(val) {
        this.initData(val, -1)
      },
      defaultValue(val) {
        this.setDefaultValue(val)
      },
      receiveData(val) {
        this.addSubData(val, this.currentTab)
      },
    },
    data() {
      return {
        // 当前选中的子集
        currentTab: 0,
        // tabs栏scrollView滚动的位置
        scrollViewId: 'select__0',
        // 选项数组
        selectedArr: []
      }
    },
    created() {
      this.setDefaultValue(this.defaultValue)
    },
    methods: {
      // 初始化数据
      initData(data, index) {
        if (!data || data.length === 0) return
        if (this.request) {
          // 第一级数据
          this.addSubData(data, index)
        } else {
          this.addSubData(this.getItemList(index, -1), index)
        }
      },
      // 重置数据
      reset() {
        this.initData(this.list, -1)
      },
      // 滚动切换
      switchTab(e) {
        this.currentTab = e.detail.current
        this.checkSelectPosition()
      },
      // 点击标题切换
      clickNav(index) {
        if (this.currentTab !== index) {
          this.currentTab = index
        }
      },
      // 列表数据发生改变
      change(index, subIndex, subItem) {
        let item = this.selectedArr[index]
        if (item.index === subIndex) return
        item.index = subIndex
        item.text = subItem.text
        item.subText = subItem.subText || ''
        item.value = subItem.value
        item.src = subItem.src || ''
        this.$emit('change', {
          index: index,
          subIndex: subIndex,
          ...subItem
        })
        
        // 如果不是异步加载，则取出对应的数据
        if (!this.request) {
          let data = this.getItemList(index, subIndex)
          this.addSubData(data, index)
        }
      },
      // 设置默认的数据
      setDefaultValue(val) {
        let defaultValues = val || []
        if (defaultValues.length > 0) {
          this.selectedArr = this.getItemListWithValues(JSON.parse(JSON.stringify(this.list)), defaultValues)
          if (!this.selectedArr) return
          this.currentTab = this.selectedArr.length - 1
          this.$nextTick(() => {
            this.checkSelectPosition()
          })
          // defaultItemList.map((item) => {
          //   item.scrollViewId = `select__${item.index}`
          // })
          // this.selectedArr = defaultItemList
          // this.currentTab = defaultItemList.length - 1
          // this.$nextTick(() => {
          //   this.checkSelectPosition()
          // })
        } else {
          this.initData(this.list, -1)
        }
      },
      // 获取对应选项的item数据
      getItemList(index, subIndex) {
        let list = []
        let arr = JSON.parse(JSON.stringify(this.list))
        // 初始化数据
        if (index === -1) {
          list = this.removeChildren(arr)
        } else {
          // 判断第一项是否已经选择
          let value = this.selectedArr[0].index
          value = value === -1 ? subIndex : value
          list = arr[value].children || []
          if (index > 0) {
            for (let i = 1; i < index + 1; i++) {
              // 获取当前数据选中的序号
              let val = index === i ? subIndex : this.selectedArr[i].index
              list = list[val].children || []
              if (list.length === 0) break
            }
          }
          list = this.removeChildren(list)
        }
        return list
      },
      // 根据数组中的值获取对应的item数据
      getItemListWithValues(data, values) {
        const defaultValues = JSON.parse(JSON.stringify(values))
        if (!defaultValues || defaultValues.length === 0) return
        // 取出第一个值所对应的item
        const itemIndex = data.findIndex((item) => {
          return item.value === defaultValues[0]
        })
        if (itemIndex === -1) return
        const item = data[itemIndex]
        item.index = itemIndex
        item.scrollViewId = `select__${itemIndex}`
        item.list = this.removeChildren(JSON.parse(JSON.stringify(data)))
        // 判断是否只有1个值
        if (defaultValues.length === 1 || (!item.hasOwnProperty('children') || item.children.length === 0)) {
          return this.removeChildren([item])
        } else {
          let selectItemList = []
          const children = item.children
          selectItemList.push(item)
          // 移除已经获取的值
          defaultValues.splice(0, 1)
          const childrenValue = this.getItemListWithValues(children, defaultValues)
          selectItemList = selectItemList.concat(childrenValue)
          
          return this.removeChildren(selectItemList)
        }
      },
      // 删除子元素
      removeChildren(data) {
        let list = data.map((item) => {
          if (item.hasOwnProperty('children')) {
            delete item['children']
          }
          return item
        })
        return list
      },
      // 新增子集数据时处理
      addSubData(data, index) {
        // 判断是否已经完成选择数据或者为初始化数据
        if (!data || data.length === 0) {
          if (index == -1) return
          // 完成选择
          let arr = this.selectedArr
          // 如果当前选中项的序号比已选数据的长度小，则表示当前重新选择了数据
          if (index < arr.length - 1) {
            let newArr = arr.slice(0, index + 1)
            this.selectedArr = newArr
          }
          let result = JSON.parse(JSON.stringify(this.selectedArr))
          let lastItem = result[result.length - 1] || {}
          let text = ''
          result.map(item => {
            text += item.text
            delete item['list']
            delete item['scrollViewId']
            return item
          })
          this.$emit('complete', {
            result: result,
            value: lastItem.value,
            text: text,
            subText: lastItem.subText,
            src: lastItem.src
          })
        } else {
          // 重置数据
          let item = [{
            text: this.text,
            subText: '',
            value: '',
            src: '',
            index: -1,
            scrollViewId: 'select__0',
            list: data
          }]
          // 初始化数据
          if (index === -1) {
            this.selectedArr = item
          } else {
            // 拼接新旧数据并且判断是否为重新选择了数据（如果为重新选择了数据则重置之后的选项数据）
            let retainArr = this.selectedArr.slice(0, index + 1)
            this.selectedArr = retainArr.concat(item)
          }
          this.$nextTick(() => {
            this.currentTab = this.selectedArr.length - 1
          })
        }
      },
      // 检查当前选中项，并将选项设置位置信息
      checkSelectPosition() {
        let item = this.selectedArr[this.currentTab]
        item.scrollViewId = 'select__0'
        this.$nextTick(() => {
          setTimeout(() => {
            // 设置当前数据滚动到的位置
            let val = item.index < 2 ? 0 : Number(item.index - 2)
            item.scrollViewId = `select__${val}`
          }, 10)
        })
        
        // 设置选项滚动到所在的位置
        if (this.currentTab > 1) {
          this.scrollViewId = `select__${this.currentTab - 1}`
        } else {
          this.scrollViewId = `select__0`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-cascade-selection {
    width: 100%;
  }
  
  .selection {
    &__scroll-view {
      background-color: #FFFFFF;
    }
    
    &__header {
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
      
      &__item {
        max-width: 240rpx;
        padding: 15rpx 30rpx;
        flex-shrink: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
      }
      
      &__line {
        width: 60rpx;
        height: 6rpx;
        border-radius: 4rpx;
        position: absolute;
        bottom: 0;
        right: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    
    &__list {
      background-color: #FFFFFF;
      &__item {
        &--first {
          width: 100%;
          height: 20rpx;
        }
        
        &__cell {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 20rpx 30rpx;
        }
        
        &__icon {
          margin-right: 12rpx;
          font-size: 24rpx;
        }
        
        &__image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 12rpx;
          flex-shrink: 0;
        }
        
        &__title {
          word-break: break-all;
          color: #333333;
          font-size: 28rpx;
          
          &--sub {
            margin-left: 20rpx;
            word-break: break-all;
            color: $tn-font-sub-color;
            font-size: 24rpx;
          }
        }
      }
    }
  }
</style>
