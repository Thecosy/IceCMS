<template>
  <view
    class="tn-drag-class tn-drag"
    :style="{
      height: wrapHeight + 'rpx'
    }"
    :list="listData"
    :basedata="baseData"
    :change:list="wxs.listObserver"
    :change:basedata="wxs.baseDataObserver"
  >
    <!-- #ifdef MP-WEIXIN -->
    <view
      v-for="(item, index) in listData"
      :key="item.id"
      class="tn-drag__item"
      :style="{
        width: 100 / columns + '%',
        height: itemHeight + 'rpx'
      }"
      :data-index="index"
      :data-basedata="baseData"
      :data-edit="edit"
      @longpress="wxs.longPress"
      @touchstart="wxs.touchStart"
      :catch:touchmove="dragging?wxs.touchMove:''"
      :catch:touchend="dragging?wxs.touchEnd:''"
    >
      <slot :entity="item.data" :fixed="item.fixed" :index="index" :height="itemHeight" :isEdit="edit"></slot>
    </view>
    <!-- #endif -->

    <!-- #ifndef MP-WEIXIN -->
    <view
      v-for="(item, index) in listData"
      :key="item.id"
      class="tn-drag__item"
      :style="{
        width: 100 / columns + '%',
        height: itemHeight + 'rpx' 
      }"
      @longpress="wxs.longPress"
      :data-index="index"
      :data-basedata="baseData"
      :data-edit="edit"
      @touchstart="wxs.touchStart"
      @touchmove="wxs.touchMove"
      @touchend="wxs.touchEnd"
    >
      <slot :entity="item.data" :fixed="item.fixed" :index="index" :height="itemHeight" :isEdit="edit"></slot>
    </view>
    <!-- #endif -->
  </view>
</template>
<script src="./index.wxs" lang="wxs" module="wxs"></script>
<script>
  export default {
    name: 'tn-drag',
    props: {
      // 数据源
      // 如果属性中包含fixed，则标识当前数据不允许拖动
      list: {
        type: Array,
        default () {
          return []
        }
      },
      // 是否允许拖动编辑
      edit: {
        type: Boolean,
        default: true
      },
      // 列数
      columns: {
        type: Number,
        default: 3
      },
      // item元素高度, 单位rpx
      itemHeight: {
        type: Number,
        default: 0
      },
      // 当前父元素滚动的高度
      scrollTop: {
        type: Number,
        default: 0
      }
    },
    computed: {
      wrapHeight() {
        return this.rows * this.itemHeight
      }
    },
    data() {
      return {
        // 未渲染前节点数据
        baseData: {},
        // 拖动后的数据
        dragData: [],
        // 行数
        rows: 0,
        // 渲染数据
        listData: [],
        // 标记是否正在拖动
        dragging: false
      }
    },
    watch: {
      list(val) {
        this.listData = []
        this.$nextTick(() => {
          this.init()
        })
      },
      columns(val) {
        this.listData = []
        this.$nextTick(() => {
          this.init()
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      // 初始化
      init() {
        this.dragging = true
        const initDragItem = item => {
          const obj = {
            ...item
          }
          const fixed = obj?.fixed || false
          delete obj["fixed"]
          return {
            id: this.unique(),
            fixed,
            data: {
              ...obj
            }
          }
        }
        
        let i = 0
        const listData = (this.list || []).map((item, index) => {
          let listItem = initDragItem(item)
          // 真实排序
          listItem.realKey = i++
          // 整体排序
          listItem.sortKey = index
          listItem.translateX = `${(listItem.sortKey % this.columns) * 100}%`
          listItem.translateY = `${Math.floor(listItem.sortKey / this.columns) * 100}%`
          return listItem
        })
        this.rows = Math.ceil(listData.length / this.columns)
        this.listData = listData
        this.dragData = listData
        
        if (listData.length === 0) return
        // console.log(listData);
        
        // 初始化dom元素
        this.$nextTick(() => {
          this.initRect()
        })
      },
      // 初始化dom元素
      initRect() {
        const {
          windowWidth,
          windowHeight
        } = uni.getSystemInfoSync()
        
        let baseData = {}
        baseData.windowHeight = windowHeight
        baseData.realTopSize = 0
        baseData.realBottomSize = 0
        baseData.columns = this.columns
        baseData.rows = this.rows
        
        const query = uni.createSelectorQuery().in(this)
        query.select('.tn-drag').boundingClientRect()
        query.select('.tn-drag__item').boundingClientRect()
        query.exec(res => {
          if (!res) {
            setTimeout(() => {
              this.initRect()
            }, 10)
            return
          }
          
          baseData.itemWidth = res[1].width
          baseData.itemHeight = res[1].height
          baseData.left = res[0].left
          baseData.top = res[0].top + this.scrollTop
          this.dragging = false
          this.baseData = baseData
        })
        
      },
      
      // 触发震动
      vibrate() {
        uni.vibrateShort()
      },
      // 滚动到指定的位置
      pageScroll(e) {
        uni.pageScrollTo({
          scrollTop: e.scrollTop,
          duration: 0
        })
      },
      // 修改拖动状态
      drag(e) {
        this.dragging = e.dragging
      },
      // 拖拽数据发生改变
      listDataChange(e) {
        this.dragData = e.data
      },
      // item被点击
      itemClick(index) {
        const item = this.dragData[index]
        this.$emit('click', {
          key: item.realKey,
          data: item.data
        })
      },
      
      // 拖拽结束事件
      sortEnd(e) {
        this.$emit('end', {
          data: e.data
        })
      },
      // 排序发生改变事件
      change(e) {
        this.$emit('change', {
          data: e.data
        })
      },
      
      // 生成元素唯一id
      unique(n = 6) {
        let id = ''
        for (let i = 0; i < n; i++) id += Math.floor(Math.random() * 10)
        return 'tn_' + new Date().getTime() + id
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tn-drag {
    position: relative;
    
    &__item {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
    }
    
    &__transition {
      transition: transform 0.25s !important;
    }
    
    &__current {
      z-index: 10 !important;
    }
    
    &__fixed {
      z-index: 1 !important;
    }
  }
</style>
