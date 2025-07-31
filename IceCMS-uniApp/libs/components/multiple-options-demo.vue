<template>
  <view class="multiple-options">
    <view class="list">
      <block v-for="(item, index) in listData" :key="index">
        <view
          class="list__item"
          :class="[`tn-main-gradient-${tuniaoColorList[item.bgColorIndex]}--light`]"
          @tap="navOptionsPage(item.url)"
        >
          <view class="list__content">
            <view class="list__content__title">{{ item.title }}</view>
            <view class="list__content__desc">{{ item.desc }}</view>
          </view>
          <view class="list__icon">
            <view class="list__icon__main" :class="[`tn-icon-${item.mainIcon}`, `tn-main-gradient-${tuniaoColorList[item.bgColorIndex]}`]"></view>
            <view class="list__icon__sub" :class="[`tn-icon-${item.subIcon}`, `tn-main-gradient-${tuniaoColorList[item.bgColorIndex]}`]"></view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'multiple-options-demo',
    props: {
      // 显示的列表数据
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        // IceCMS颜色列表
        tuniaoColorList: [
          'red',
          'purplered',
          'purple',
          'bluepurple',
          'aquablue',
          'blue',
          'indigo',
          'cyan',
          'teal',
          'green',
          'orange',
          'orangered'
        ],
        listData: []
      }
    },
    watch: {
      list(val) {
        this.initList()
      }
    },
    created() {
      this.initList()
    },
    methods: {
      // 初始化列表数据
      initList() {
        // 给列表添加背景颜色数据
        this.listData = this.list.map((item, index) => {
          item.bgColorIndex = this.getBgNum()
          item.mainIcon = item?.mainIcon || 'computer-fill'
          item.subIcon = item?.subIcon || 'share'
          return item
        })
      },
      // 跳转到对应的选项页面
      navOptionsPage(url) {
        uni.navigateTo({
          url: url
        })
      },
      // 获取酷炫背景随机数
      getBgNum() {
        return Math.floor((Math.random() * this.tuniaoColorList.length))
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .list {
    
    &__item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: calc(100% - 60rpx);
      margin: 108rpx 30rpx 0rpx 30rpx;
      box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
      border-radius: 20rpx;
    }
    
    &__content {
      flex: 1;
      // color: $tn-font-color;
      margin: 34rpx 0rpx 27rpx 37rpx;
      
      &__title {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 12rpx;
      }
      &__desc {
        font-size: 28rpx;
      }
    }
    
    &__icon {
      flex: 1;
      margin-right: 26rpx;
      position: relative;
      
      &__main, &__sub {
        -webkit-background-clip: text;
        color: transparent;
        position: absolute;
        transition: transform 0.25s ease;
      }
      
      &__main {
        font-size: 200rpx;
        width: 190rpx;
        line-height: 200rpx;
        top: 0;
        right: 0rpx;
        transform: translateY(-60%);
      }
      &__sub {
        font-size: 70rpx;
        top: 0;
        right: 175rpx;
        transform: translateY(-5rpx);
      }
    }
  }
</style>
