<template>
  <view class="dynamic-demo">

    <!-- 效果预览窗口 -->
    <view v-if="!noDemo" class="demo-container" :class="{'demo-container--full': full}">
      <view class="demo">
        <slot></slot>
      </view>
      <!-- 提示信息 -->
      <view v-if="haveTips">
        <view class="demo__tips__icon" @click="demoTipsClick">
          <view class="icon tn-icon-help"></view>
        </view>
        <view class="demo__tips__content"
          :class="[showContentTips ? 'demo__tips__content--show' : 'demo__tips__content--hide']">
          <view v-for="(item,index) in tipsData" :key="index" class="demo__tips__content--item">{{ item }}</view>
        </view>
      </view>
    </view>

    <!-- 模式切换 -->
    <view v-if="multiMode" class="mode-switch">
      <view class="mode-switch__container">
        <view v-for="(item, index) in sectionModeListInfos" :key="index" class="mode-switch__item"
          :class="[`mode-switch-item-${index}`,{'mode-switch__item--active': modeIndex === index}]"
          @click="switchMode(index)">{{ item.name }}</view>

        <!-- 滑块样式 -->
        <view class="mode-switch__slider" :style="[modeSwitchSliderStyle]"></view>
      </view>
    </view>

    <!-- 组件对应可选项容器 -->
    <view class="section-container">
      <scroll-view
        class="section__scroll-view"
        :class="{'section__scroll-view--auto': sectionScrollViewStyle.height === 'auto'}"
        :style="[sectionScrollViewStyle]"
        :scroll-y="sectionScrollViewStyle.height !== 'auto'"
      >
        <block v-for="(item,index) in btnsList" :key="index">
          <view class="section__content" :class="{'section__content--visible': item.show}">
            <view class="section__content__title">
              <view class="section__content__title__left-line" :class="[`tn-main-gradient-${tuniaoColorList[index]}`]"></view>
              <view class="section__content__title--text tn-text-ellipsis" :class="[`tn-main-gradient-${tuniaoColorList[index]}`]">{{ item.title }}</view>
              <view class="section__content__title__right-line" :class="[`tn-main-gradient-${tuniaoColorList[index]}`]"></view>
            </view>
            <view class="section__content__btns">
              <view v-for="(section_btn,section_index) in item.optional" :key="section_index"
                class="section__content__btns__item" :class="[`tn-main-gradient-${tuniaoColorList[index]}--light`]" @click="sectionBtnClick(index, section_index)">
                <view class="section__content__btns__item__bg"
                  :class="[`tn-main-gradient-${tuniaoColorList[index]}`, {'section__content__btns__item__bg--active':sectionIndex[modeIndex][index]['value'] === section_index}]"></view>
                <view class="section__content__btns__item--text tn-text-ellipsis"
                  :class="[sectionIndex[modeIndex][index]['value'] === section_index ? 'section__content__btns__item--text--active' : `tn-color-${tuniaoColorList[index]}`]">{{ section_btn }}</view>
              </view>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'dynamic-demo-template',
    props: {
      // 可选项列表数据
      sectionList: {
        type: Array,
        default() {
          return []
        }
      },
      // 提示信息
      tips: {
        type: [String, Array],
        default: ''
      },
      // 演示框的内容是否为铺满
      full: {
        type: Boolean,
        default: false
      },
      // 是否使用了自定义顶部导航栏
      customBar: {
        type: Boolean,
        default: true
      },
      // 是否全屏滚动
      fullWindowsScroll: {
        type: Boolean,
        default: false
      },
      // 没有演示内容
      noDemo: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      tipsData() {
        if (typeof this.tips === 'string') {
          return [this.tips]
        }
        return this.tips
      },
      haveTips() {
        return this.tips && this.tips.length > 0
      },
      multiMode() {
        return this.sectionList.length > 1
      },
      sectionModeList() {
        return this.sectionList.map((item) => {
          return item.name
        })
      }
    },
    data() {
      return {
        // IceCMS颜色列表
        tuniaoColorList: this.$t.color.getTuniaoColorList(),
        // 保存选项列表信息（由于prop中的数据时不能被修改的）
        _sectionList: [],
        // 模式列表信息
        sectionModeListInfos: [],
        // 所选模式的序号
        modeIndex: 0,
        // 模式选择滑块样式
        modeSwitchSliderStyle: {
          width: 0,
          left: 0
        },
        // 显示组件相关提示信息
        showContentTips: false,
        // 可选项滚动容器样式
        sectionScrollViewStyle: {
          height: 0
        },
        // 按钮列表信息
        btnsList: [],
        // 标记当前所选按钮
        sectionIndex: [],
        // 标记选项按钮是否可以滑动（使用scroll-view进行包裹）
        sectionScrollFlag: true
      }
    },
    watch: {
      sectionList: {
        handler(value) {
          // 如果sectionList发生改变，重新初始化选项列表信息
          this.initSectionBtns()
        },
        deep: true
      },
      sectionScrollFlag(value) {
        if (!value) {
          this.sectionScrollViewStyle.height = 'auto'
        }
      },
      fullWindowsScroll: {
        handler(value) {
          if (value) {
            this.sectionScrollViewStyle.height = 'auto'
          }
        },
        immediate: true
      }
    },
    created() {
      // 初始化可选项模式列表
      this.sectionModeListInfos = this.sectionModeList.map((item) => {
        return {
          name: item
        }
      })
      // 初始化选项按钮默认信息
      this.initSectionBtns()
    },
    mounted() {
      // 等待加载组件完成
      // setTimeout(() => {
      //   // 计算出底部scroll-view的高度
      //   this.initSectionScrollView()

      //   if (this.multiMode) {
      //     // 获取模式切换标签的信息
      //     this.getModeTabsInfo()
      //   }
      // }, 10)
      this.$nextTick(() => {
        // 计算出底部scroll-view的高度
        this.initSectionScrollView()
        
        if (this.multiMode) {
          // 获取模式切换标签的信息
          this.getModeTabsInfo()
        }
      })
    },
    methods: {
      // 初始化选项滑动窗口的高度
      initSectionScrollView() {
        // 全屏滚动时不进行任何的操作
        if (this.fullWindowsScroll) {
          return
        }
        // 获取屏幕的高度
        uni.getSystemInfo({
          success: (systemInfo) => {
            // 通过当前屏幕的安全高度减去上一个元素的底部和距离上一个元素的外边距，然后减获取到的值减去标题栏的高度即可
            const navBarHeight = this.customBar ? 0 : this.vuex_custom_bar_height
            if (this.multiMode) {
              uni.createSelectorQuery().in(this).select('.mode-switch').boundingClientRect(data => {
                if (data.bottom >= systemInfo.safeArea.height) {
                  this.sectionScrollFlag = false
                } else {
                  this.sectionScrollFlag = true
                  const containerBaseHeight = systemInfo.safeArea.height - data.bottom
                  this.sectionScrollViewStyle.height = (containerBaseHeight - navBarHeight) + systemInfo.statusBarHeight - uni.upx2px(75) + 'px'
                }
              }).exec()
            } else {
              if (!this.noDemo) {
                uni.createSelectorQuery().in(this).select('.demo-container').boundingClientRect(data => {
                  if (data.bottom >= systemInfo.safeArea.height) {
                    this.sectionScrollFlag = false
                  } else {
                    this.sectionScrollFlag = true
                    const containerBaseHeight = systemInfo.safeArea.height - data.bottom
                    this.sectionScrollViewStyle.height = (containerBaseHeight - navBarHeight) + systemInfo.statusBarHeight - uni.upx2px(75) + 'px'
                  }
                }).exec()
              } else {
                this.sectionScrollFlag = false
              }
            }
            
          }
        })
      },
      // 更新选项滑动容器的高度
      updateSectionScrollView() {
        this.$nextTick(() => {
          this.initSectionScrollView()
        })
      },
      // 获取各个模式tab的节点信息
      getModeTabsInfo() {
        let view = uni.createSelectorQuery().in(this)
        for (let i = 0; i < this.sectionModeListInfos.length; i++) {
          view.select('.mode-switch-item-' + i).boundingClientRect()
        }
        view.exec(res => {
          // 如果没有获取到，则重新获取
          if (!res.length) {
            setTimeout(() => {
              this.getModeTabsInfo()
            }, 10)
            return
          }
          // 将每个模式的宽度放入list中
          res.map((item, index) => {
            this.sectionModeListInfos[index].width = item.width
          })
          // 初始化滑块的宽度
          this.modeSwitchSliderStyle.width = this.sectionModeListInfos[0].width + 'px'

          // 初始化滑块的位置
          this.modeSliderPosition()
        })
      },
      // 设置模式滑块的位置
      modeSliderPosition() {
        let left = 0
        // 计算当前所选模式选项到组件左边的距离
        this.sectionModeListInfos.map((item, index) => {
          if (index < this.modeIndex) left += item.width
        })

        this.modeSwitchSliderStyle.left = left + 'px'
      },
      // 切换模式
      switchMode(index) {
        // 不允许点击当前激活的选项
        if (index === this.modeIndex) return
        this.modeIndex = index
        this.modeSliderPosition()
        this.updateSectionBtns()
        this.$emit('modeClick', {
          index: index
        })
      },
      // 点击内容提示信息
      demoTipsClick() {
        this.showContentTips = !this.showContentTips
      },
      // 初始化被选中选项按钮
      initSectionBtns() {
        this.sectionIndex = []
        this.sectionIndex = this.sectionList.map((item) => {
          if (item.hasOwnProperty('section') && item.section.length > 0) {
            return Array(item.section.length).fill({
              value: 0,
              change: false
            })
          } else {
            return []
          }
        })
        
        this._sectionList = this.$t.deepClone(this.sectionList)
        // 给本地选项按钮列表给默认show属性
        this._sectionList.map((item) => {
          const section = item.section.map((section_item) => {
            if (!section_item.hasOwnProperty('show')) {
              section_item.show = true
            }
            return section_item
          })
          item.section = section
          return item
        })
        
        // 更新按钮信息
        this.updateSectionBtns()
      },
      // 跟新选项按钮信息
      updateSectionBtns(sectionIndex = -1, showState = true) {
        let sectionOptional = this._sectionList[this.modeIndex]['section']
        this.btnsList = sectionOptional.map((item, index) => {
          // 判断是否已经修改了对应的值
          let changeValue = this.sectionIndex[this.modeIndex][index]['change'] || false
          let currentSectionIndexValue = this.sectionIndex[this.modeIndex][index]['value'] || 0
          // 取出默认值(如果是已经修改过的选项，则使用之前的选项信息)
          let indexValue = changeValue ? currentSectionIndexValue : item.hasOwnProperty('current') ? item.current : 0
          // 取出是否显示当前选项
          let show = (sectionIndex !== -1 && sectionIndex === index) ? showState : item.hasOwnProperty('show') ? item.show : true
          // 处理最大最小值
          if (indexValue < 0) {
            indexValue = 0
          }
          if (indexValue >= item.optional.length) {
            indexValue = item.optional.length
          }
          // this.sectionIndex[this.modeIndex][index]['value'] = indexValue
          this.$set(this.sectionIndex[this.modeIndex], index, {value: indexValue, change: changeValue})
          item.show = show
          return item
        })
      },
      // 更新选项按钮状态信息
      updateSectionBtnsState(sectionIndex = -1, showState = true) {
        // 判断sectionIndex是否为数组
        if (this.$t.array.isArray(sectionIndex)) {
          if (sectionIndex.length === 0) {
            return
          }
          sectionIndex = sectionIndex.filter((item) => item >= 0 && item < this.sectionList[this.modeIndex]['section'].length)
          sectionIndex.map((item) => {
            this.btnsList[item]['show'] = showState
            this._sectionList[this.modeIndex]['section'][item]['show'] = showState
          })
        } else {
          if (sectionIndex < 0 || sectionIndex >= this.sectionList[this.modeIndex]['section'].length) {
            return
          }
          // 将按键的对应显示状态设置为对应的状态
          this.btnsList[sectionIndex]['show'] = showState
          this._sectionList[this.modeIndex]['section'][sectionIndex]['show'] = showState
        }
        
      },
      // 更新选项按钮选中信息
      updateSectionBtnsValue(modeIndex = 0, sectionIndex = -1, value = 0) {
        if (sectionIndex < 0 || sectionIndex >= this.sectionList[modeIndex]['section'].length) {
          return
        }
        // 如果showState为false则移除对应的选项按钮，否则往对应的位置添加上对应的选项按钮
        this.sectionIndex[modeIndex][sectionIndex] = {
          value,
          change: true
        }
      },
      // 选项按钮点击事件
      sectionBtnClick(index, sectionIndex) {
        // if (this.sectionIndex[this.modeIndex][index] === sectionIndex) {
        //   return
        // }
        this.$set(this.sectionIndex[this.modeIndex], index, {value: sectionIndex, change: true})
        this.$emit('click', {
          methods: this.btnsList[index]['methods'],
          index: sectionIndex,
          name: this.btnsList[index]['optional'][sectionIndex]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dynamic-demo {
    padding-top: 78rpx;

    /* 顶部模式切换start */
    .mode-switch {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 75rpx;
      padding: 0 30rpx;

      &__container {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 476rpx;
        height: 62rpx;
        background-color: #FFFFFF;
        box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
        border-radius: 31rpx;
      }

      &__item {
        flex: 1;
        height: 62rpx;
        width: 100%;
        line-height: 62rpx;
        text-align: center;
        font-size: 28rpx;
        color: $tn-font-sub-color;
        z-index: 2;
        transition: all 0.3s;

        &--active {
          color: #FFFFFF;
          font-weight: bold;
        }
      }

      &__slider {
        position: absolute;
        height: 62rpx;
        border-radius: 31rpx;
        // background-image: linear-gradient(-86deg, #FF8359 0%, #FFDF40 100%);
        background-image: linear-gradient(-86deg, #00C3FF 0%, #58FFF5 100%);
        box-shadow: 1rpx 10rpx 24rpx 0rpx #00C3FF77;
        z-index: 1;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }

    /* 顶部模式切换end */

    /* 演示内容展示start */
    .demo-container {
      min-height: 327rpx;
      width: calc(100% - 60rpx);
      background-color: #FFFFFF;
      box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
      margin: 0 30rpx 5rpx 30rpx;
      border-radius: 20rpx;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      &--full {
        display: inline-block;
        padding-bottom: 20rpx;
        min-height: 0rpx;
        padding: 10rpx 20rpx 30rpx;
      }

      .demo {
        padding-top: 70rpx;

        &__tips {
          &__icon {
            position: absolute;
            top: 20rpx;
            right: 16rpx;
            width: 39rpx;
            height: 39rpx;
            line-height: 39rpx;
            font-size: 39rpx;

            .icon {
              background: linear-gradient(-45deg, #FF8359 0%, #FFDF40 100%);
              -webkit-background-clip: text;
              color: transparent;
              text-shadow: 0rpx 10rpx 10rpx rgba(255, 156, 82, 0.2);
            }
          }

          &__content {
            position: absolute;
            top: 65rpx;
            right: 16rpx;
            font-size: 20rpx;
            margin-left: 20rpx;
            word-wrap: normal;
            display: flex;
            flex-direction: column;
            background-color: #E6E6E6;
            padding: 20rpx;
            border-radius: 10rpx;
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1);
            transform-origin: 0 0;
            z-index: 999999;

            &--hide {
              transform: scaleY(0);
            }

            &--show {
              transform: scaleY(100%);

              &::after {
                content: "";
                width: 0px;
                height: 0px;
                border-width: 4px;
                border-style: solid;
                border-color: transparent transparent rgba(149, 149, 149, 0.1) transparent;
                position: absolute;
                top: -8px;
                right: 6px;
              }
            }
          }
        }
      }
    }

    /* 演示内容展示end */

    /* 可选项start */
    .section-container {
      width: 100%;
      height: auto;
      margin-top: 70rpx;

      .section {
        &__content {
          margin-top: 70rpx;
          display: none;
          
          &--visible {
            display: block;
            
            &:last-child {
              padding-bottom: calc(70rpx + env(safe-area-inset-bottom));
            }
          }

          &:nth-child(1) {
            margin-top: 0rpx;
          }

          &__title {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 30rpx;
            text-align: center;

            &__left-line,
            &__right-line {

              width: 100rpx;
              height: 2rpx;
              position: relative;
            }

            &__left-line {
              &::after {
                content: '';
                background: inherit;
                width: 12rpx;
                height: 12rpx;
                position: absolute;
                top: -12rpx;
                right: 0rpx;
                border-radius: 50%;
                transform: translateY(50%);
              }
            }

            &__right-line {
              &::after {
                content: '';
                background: inherit;
                width: 12rpx;
                height: 12rpx;
                position: absolute;
                top: -12rpx;
                left: 0rpx;
                border-radius: 50%;
                transform: translateY(50%);
              }
            }

            &--text {
              -webkit-background-clip: text;
              color: transparent;
              min-width: 124rpx;
              height: 30rpx;
              font-size: 32rpx;
              line-height: 1;
              margin: 0 35rpx;
            }
          }

          &__btns {
            width: calc(100% - 60rpx);
            margin: 0 30rpx;
            margin-top: 29rpx;
            padding: 50rpx 30rpx 0rpx 0rpx;
            background-color: #FFFFFF;
            box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
            border-radius: 20rpx;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;

            &__item {
              max-width: 30%;
              padding: 17rpx 36rpx;
              border-radius: 10rpx;
              margin-bottom: 40rpx;
              margin-left: 40rpx;
              position: relative;
              z-index: 1;

              // &::before {
              //   content: " ";
              //   position: absolute;
              //   top: 10rpx;
              //   left: 1rpx;
              //   width: 100%;
              //   height: 100%;
              //   background: inherit;
              //   filter: blur(24rpx);
              //   opacity: 1;
              //   z-index: -1;
              // }

              &__bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: inherit;
                z-index: -1;
                opacity: 0;
                transform: scale(0);
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

                &--active {
                  opacity: 1;
                  transform: scale(1);
                }
              }

              &--text {
                font-size: 24rpx;
                line-height: 1.2em;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                
                &--active {
                  color: #FFFFFF;
                }
              }
            }
          }
        }
      }
    }

    /* 可选项end */
  }
</style>
