<template>
  <view class="template-photo">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed>山庄相册</tn-nav-bar>
      
    <!-- 页面内容 -->
    <view :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="content">
        <block v-for="(item, index) in list" :key="index">
          <view class="item">
            <tn-lazy-load
              :index="index"
              :image="item.src"
              :threshold="-450"
              :height="400"
              imgMode="aspectFill"
            ></tn-lazy-load>
          </view>
        </block>
      </view>
      
      <!-- <tn-load-more :status="status" @loadmore="getData"></tn-load-more> -->
    </view>
  </view>
</template>

<script>
  export default {
    name: 'TemplatePhoto',
    data() {
      return {
        status: 'loadmore',
        list: [],
        data: [
          { src: 'https://resource.tuniaokj.com/images/shop/bag1.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/bag2.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/banner1.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/banner2.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/banner3.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/card.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/computer1.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/computer2.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/content.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/cup1.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/cup2.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/office.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/pillow.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/computer1.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/pillow2.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/prototype2.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/sticker.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/watch1.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/watch2.jpg' },
          { src: 'https://resource.tuniaokj.com/images/shop/pillow.jpg' }
        ]
      }
    },
    onLoad() {
      this.getData()
    },
    onReachBottom() {
      uni.$emit('tOnLazyLoadReachBottom')
      this.getData()
    },
    methods: {
      getData() {
        let index = 0
        this.status = 'loading'
        setTimeout(() => {
          for (let i = 0; i < 30; i++) {
            index = this.$t.number.randomInt(0, this.data.length - 1)
            this.list.push({
              src: this.data[index].src
            })
          }
          this.status = 'loadmore'
        }, 1500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 30rpx;
    
    .item {
      border: 1rpx solid #FAFAFA;
      flex: 0 0 335rpx;
      height: 400rpx;
      margin-bottom: 30rpx;
      border-radius: 10rpx;
      overflow: hidden;
    }
  }
</style>
