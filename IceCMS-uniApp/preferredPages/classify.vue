<template>
  <view class="template-classify">
    
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed :bottomShadow="false">商品分类</tn-nav-bar>
    
    <view class="tn-classify__wrap" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      
      <!-- 搜索框 -->
      <view class="tn-classify__search--wrap tn-flex tn-flex-col-center tn-flex-row-center tn-border-solids-bottom" @click="tn('/homePages/search')">
        <view class="tn-classify__search__box tn-flex tn-flex-col-center tn-flex-row-center tn-bg-gray--light tn-color-gray--dark">
          <view class="tn-classify__search__icon tn-icon-search"></view>
          <view class="tn-classify__search__text">请输入商品名称</view>
        </view>
      </view>
      
      <!-- 分类列表和内容 -->
      <view class="tn-classify__container tn-bg-gray--light">
        <view class="tn-classify__container__wrap tn-flex tn-flex-nowrap tn-flex-row-around tn-bg-white">
          <!-- 左边容器 -->
          <scroll-view class="tn-classify__left-box tn-flex-basic-sm" :scroll-top="leftScrollViewTop" scroll-y scroll-with-animation :style="{height: scrollViewHeight + 'px'}">
            <view
              v-for="(item, index) in tabbar"
              :key="index"
              :id="`tabbar_item_${index}`"
              class="tn-classify__tabbar__item tn-flex tn-flex-col-center tn-flex-row-center"
              :class="[tabbarItemClass(index)]"
              @tap.stop="clickClassifyNav(index)">
              <view class="tn-classify__tabbar__item__title">{{ item }}</view>
            </view>
          </scroll-view>
          
          <!-- 右边容器 -->
          <scroll-view class="tn-classify__right-box" scroll-y :scroll-top="rightScrollViewTop" :style="{height: scrollViewHeight + 'px'}">
            <block v-if="classifyContent.subClassify && classifyContent.subClassify.length > 0">
              <view class="tn-classify__content" @click="tn('/preferredPages/product')">
                <!-- 推荐商品轮播图 -->
                <view class="tn-classify__content__recomm">
                  <tn-swiper v-if="classifyContent.recommendProduct.length > 0" class="tn-classify__content__recomm__swiper" :list="classifyContent.recommendProduct" :height="100" :effect3d="true" mode=""></tn-swiper>
                </view>
                
                <!-- 分类内容子栏目 -->
                <view v-for="(item,index) in classifyContent.subClassify" :key="index" class="tn-classify__content__sub-classify">
                  <view class="tn-classify__content__sub-classify--title tn-text-lg tn-padding-top-sm">{{ item.title }}</view>
                  
                  <view class="tn-classify__content__sub-classify__content tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-left">
                    <view
                      v-for="(sub_item,sub_index) in item.classify"
                      :key="sub_index"
                      class="tn-classify__content__sub-classify__content__item tn-flex tn-flex-wrap tn-flex-row-center"
                    >
                      <view class="tn-classify__content__sub-classify__content__image tn-flex tn-flex-col-center tn-flex-row-center">
                        <image :src="sub_item.image" mode="aspectFill"></image>
                      </view>
                      <view class="tn-classify__content__sub-classify__content__title tn-margin-bottom-sm">{{ sub_item.title }}</view>
                    </view>
                  </view>
                </view>
              </view>
              
              <view class="tn-padding-bottom"></view>
            </block>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'templateShopClassify',
    data() {
      return {
        // 侧边栏分类数据
        tabbar: [
          '推荐分类',
          '医疗保健',
          '运动户外',
          '电脑办公',
          '家电',
          '宠物鲜花',
          '食品酒饮',
          '个护清洁',
          '手机',
          '数码',
          '母婴童装',
          '京东国际',
          '汽摩生活',
          '美妆护肤',
          '箱包',
          '鞋靴',
          '钟表珠宝',
          '玩具乐器',
          '内衣配饰',
          '生鲜',
          '家居厨具',
          '男装',
          '二手商品',
          '女装',
          '家具家装',
          '奢侈品',
          '计生情趣',
          '医药',
          '生活旅行',
          'IceCMS服务',
        ],
        // 分类里面的内容信息
        classifyContent: {
          // 推荐商品
          recommendProduct: [
            {image: 'https://resource.tuniaokj.com/images/shop/banner1.jpg', title: '推荐商品1'},
            {image: 'https://resource.tuniaokj.com/images/new/banner1.jpg', title: '推荐商品2'},
            {image: 'https://resource.tuniaokj.com/images/shop/banner2.jpg', title: '推荐商品3'}
          ],
          // 子栏目
          subClassifyTabbar: [],
          // 显示子栏目分类选项
          showSubClassifyTabbar: false,
          // 每个子栏目下的内容
          subClassify: [
            {
              title: '推荐分类',
              classify: [
                { image: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg', title: '海报设计'},
                { image: 'https://resource.tuniaokj.com/images/shop/prototype2.jpg', title: '精美页面'},
                { image: 'https://resource.tuniaokj.com/images/shop/computer1.jpg', title: '设计师电脑'},
                { image: 'https://resource.tuniaokj.com/images/shop/computer2.jpg', title: '轻薄本'},
                { image: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg', title: '5G手机'},
                { image: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg', title: '游戏手机'},
                { image: 'https://resource.tuniaokj.com/images/shop/watch1.jpg', title: '智能手表'},
                { image: 'https://resource.tuniaokj.com/images/shop/watch2.jpg', title: '运动手表'},
                
              ]
            },
            {
              title: '专场推荐',
              classify: [
                { image: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg', title: '5G手机'},
                { image: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg', title: '游戏手机'},
                { image: 'https://resource.tuniaokj.com/images/shop/watch1.jpg', title: '智能手表'},
                { image: 'https://resource.tuniaokj.com/images/shop/watch2.jpg', title: '运动手表'},
                { image: 'https://resource.tuniaokj.com/images/shop/card.jpg', title: 'IceCMS服务'}
              ]
            },
            {
              title: '专场推荐',
              classify: [
                { image: 'https://resource.tuniaokj.com/images/shop/bag1.jpg', title: '环保袋'},
                { image: 'https://resource.tuniaokj.com/images/shop/bag2.jpg', title: '手提袋'},
                { image: 'https://resource.tuniaokj.com/images/shop/cup1.jpg', title: '奶茶杯'},
                { image: 'https://resource.tuniaokj.com/images/shop/cup2.jpg', title: '纸杯'},
                { image: 'https://resource.tuniaokj.com/images/shop/pillow.jpg', title: '抱枕'},
                { image: 'https://resource.tuniaokj.com/images/shop/sticker.jpg', title: '贴纸'}
              ]
            },
            {
              title: '专场推荐',
              classify: [
                { image: 'https://resource.tuniaokj.com/images/shop/bag1.jpg', title: '环保袋'},
                { image: 'https://resource.tuniaokj.com/images/shop/bag2.jpg', title: '手提袋'},
                { image: 'https://resource.tuniaokj.com/images/shop/cup1.jpg', title: '奶茶杯'},
                { image: 'https://resource.tuniaokj.com/images/shop/cup2.jpg', title: '纸杯'},
                { image: 'https://resource.tuniaokj.com/images/shop/pillow.jpg', title: '抱枕'},
                { image: 'https://resource.tuniaokj.com/images/shop/pillow2.jpg', title: '蓝色抱枕'}
              ]
            }
          ]
        },
        // 分类菜单item的信息
        tabbarItemInfo: [],
        // scrollView的top值
        scrollViewBasicTop: 0,
        // scrollView的高度
        scrollViewHeight: 0,
        // 左边scrollView的滚动高度
        leftScrollViewTop: 0,
        // 右边scrollView的滚动高度
        rightScrollViewTop: 0,
        // 当前选中的tabbar序号
        currentTabbarIndex: 0
      }
    },
    computed: {
      tabbarItemClass() {
        return index => {
          if (index === this.currentTabbarIndex) {
            return 'tn-classify__tabbar__item--active tn-bg-white'
          } else {
            let clazz = 'tn-bg-gray--light'
            if (this.currentTabbarIndex > 0 && index === this.currentTabbarIndex - 1) {
              clazz += ' tn-classify__tabbar__item--active--prev'
            }
            if (this.currentTabbarIndex < this.tabbar.length && index === this.currentTabbarIndex + 1) {
              clazz += ' tn-classify__tabbar__item--active--next'
            }
            return clazz
          }
        }
      }
    },
    onReady() {
      this.$nextTick(() => {
        this.getScrollViewInfo()
        this.getTabbarItemRect()
      })
    },
    methods: {
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
      
      // 获取scrollView的高度信息
      getScrollViewInfo() {
        // 获取搜索栏的bottom信息，然后用整个屏幕的可用高度减去bottom的值即可获取scrollView的高度(防止双重滚动)
        this._tGetRect('.tn-classify__search--wrap').then((rect) => {
          // 如果获取失败重新获取
          if (!rect) {
            setTimeout(() => {
              this.getScrollViewInfo()
            }, 10)
            return
          }
          // 获取当前屏幕的可用高度
          const systemInfo = uni.getSystemInfoSync()
          this.scrollViewBasicTop = systemInfo.statusBarHeight + rect.bottom + uni.upx2px(10)
          this.scrollViewHeight = systemInfo.safeArea.height + systemInfo.statusBarHeight - rect.bottom - uni.upx2px(10)
        })
      },
      // 获取分类菜单每个item的信息
      getTabbarItemRect() {
        let view = uni.createSelectorQuery().in(this)
        for (let i = 0; i < this.tabbar.length; i++) {
          view.select('#tabbar_item_' + i).boundingClientRect()
        }
        view.exec(res => {
          if (!res.length) {
            setTimeout(() => {
              this.getTabbarItemRect()
            }, 10)
            return
          }
          
          // 将每个分类item的相关信息
          res.map((item) => {
            this.tabbarItemInfo.push({
              top: item.top,
              height: item.height
            })
          })
        })
      },
      // 点击了分类导航
      clickClassifyNav(index) {
        if (this.currentTabbarIndex === index) {
          return
        }
        this.currentTabbarIndex = index
        
        this.handleLeftScrollView(index)
        this.switchClassifyContent()
      },
      // 点击分类后，处理scrollView滚动到居中位置
      handleLeftScrollView(index) {
        const tabbarItemTop = this.tabbarItemInfo[index].top - this.scrollViewBasicTop
        if (tabbarItemTop > this.scrollViewHeight / 2) {
          this.leftScrollViewTop = tabbarItemTop - (this.scrollViewHeight / 2) + this.tabbarItemInfo[index].height
        } else {
          this.leftScrollViewTop = 0
        }
      },
      // 切换对应分类的数据
      switchClassifyContent() {
        this.rightScrollViewTop = 1
        this.$nextTick(() => {
          this.rightScrollViewTop = 0
        })
        this.classifyContent.subClassify[0].title = this.tabbar[this.currentTabbarIndex]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-classify {
    
    /* 搜索栏 start */
    &__search {
      &--wrap {
        height: 126rpx;
      }
      
      &__box {
        flex: 1;
        text-align: center;
        padding: 20rpx 0;
        margin: 0 30rpx;
        border-radius: 60rpx;
        font-size: 26rpx;
      }
      
      &__icon {
        padding-right: 10rpx;
      }
    }
    /* 搜索栏 end */
    
    /* 分类列表和内容 strat */
    &__container {
      padding-top: 10rpx;
    }
    
    &__left-box {
      
    }
    
    &__right-box {
      background-color: #FFFFFF;
    }
    /* 分类列表和内容 end */
    
    /* 侧边导航 start */
    &__tabbar {
      &__item {
        height: 90rpx;
        
        &:first-child {
          border-top-right-radius: 0rpx;
        }
        
        &:last-child {
          border-bottom-right-radius: 0rpx;
        }
        
        &--active {
          background-color: #FFFFFF;
          position: relative;
          font-weight: bold;
          
          &::before {
            content: '';
            position: absolute;
            width: 12rpx;
            height: 40rpx;
            top: 50%;
            left: 0;
            background-color: #FBBD12;
            border-radius: 12rpx;
            transform: translateY(-50%) translateX(-50%);
          }
          
          &--prev {
            border-bottom-right-radius: 26rpx;
          }
          
          &--next {
            border-top-right-radius: 26rpx;
          }
        }
      }
    }
    /* 侧边导航 end */
    
    /* 分类内容 start */
    &__content {
      margin: 18rpx;
      
      /* 推荐商品 start */
      &__recomm {
        margin-bottom: 40rpx;
        
        &__swiper {
          
        }
      }
      /* 推荐商品 end */
      
      /* 子栏目 start */
      &__sub-classify {
        margin-bottom: 20rpx;
        
        &--title {
          font-weight: bold;
          margin-bottom: 18rpx;
        }
        
        &__content {
          
          &__item {
            width: 33%;
          }
          
          &__image {
            background-color: rgba(188, 188, 188, 0.1);
            border-radius: 12rpx;
            margin: 10rpx;
            margin-left: 0;
            width: 100%;
            height: 160rpx;
            overflow: hidden;
            border: 1rpx solid rgba(0,0,0,0.02);
            
            image {
              width: 100%;
              height: 160rpx;
            }
          }
          
          &__title {
            margin-right: 10rpx;
          }
        }
      }
      /* 子栏目 end */
    }
    /* 分类内容 end */
  }
</style>
