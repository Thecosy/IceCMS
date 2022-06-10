<template>
	<view>
		<n-navbar title="分类"></n-navbar>
		<!-- #ifdef APP-NVUE -->
		<n-waterfall ref="n-list" bgType="inverse" :autoUpdate="true" @down="toLoadData" @up="NewLoadData" :columnCount="2" leftGap="20rpx" rightGap="20rpx" columnGap="20rpx">
			<view slot="header" style="height: 20rpx;"></view>
			<n-list-cell v-for="(item,idx) in items" :key="idx">
				<goods-topic-cell v-if="item.type==='topic'" :item="item"></goods-topic-cell>
				<goods-cell v-if="item.type==='goods'" :item="item"></goods-cell>
				<goods-flash-cell v-if="item.type==='flash'" :item="item"></goods-flash-cell>
				<goods-club-cell v-if="item.type==='club'" :item="item"></goods-club-cell>
			</n-list-cell>
		</n-waterfall>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<n-waterfall ref="n-list" bgType="inverse" :autoUpdate="true" @down="toLoadData" @up="NewLoadData" :columnCount="2" leftGap="20rpx" rightGap="20rpx" columnGap="10rpx">
			<view slot="header" style="height: 20rpx;"></view>
			<n-waterfall-view ref="water" leftGap="20rpx" rightGap="20rpx" columnGap="10rpx" :calculator="calculateHeight">
				<template v-slot:left="{lefts}">
					<template v-for="(item,idx) in lefts"  @detail="goSortList(item.name,item.id)"  >
						<goods-topic-cell v-if="item.type==='topic'" @detail="goSortList(item.name,item.id)" :key="idx" :item="item"></goods-topic-cell>
						<goods-cell v-if="item.type==='goods'" @detail="goSortList(item.name,item.id)" :key="idx" :item="item"></goods-cell>
						<goods-flash-cell v-if="item.type==='flash'" @detail="goSortList(item.name,item.id)" :key="idx" :item="item"></goods-flash-cell>
						<goods-club-cell v-if="item.type==='club'" @detail="goSortList(item.name,item.id)" :key="idx" :item="item"></goods-club-cell>
					</template>
				</template>
				<template v-slot:right="{rights}">
					<template v-for="(item,idx) in rights">
						<goods-topic-cell v-if="item.type==='topic'" @detail="goSortList(item.name,item.id)" :key="idx" :item="item"></goods-topic-cell>
						<goods-cell v-if="item.type==='goods'" @detail="goSortList(item.name,item.id)" :key="idx" :item="item"></goods-cell>
						<goods-flash-cell v-if="item.type==='flash'" @detail="goSortList(item.name,item.id)" :key="idx" :item="item"></goods-flash-cell>
						<goods-club-cell v-if="item.type==='club'" @detail="goSortList(item.name,item.id)" :key="idx" :item="item"></goods-club-cell>
					</template>
				</template>
			</n-waterfall-view>
		</n-waterfall>
		<!-- #endif -->
	</view>
</template>

<script>
	import API from '../../utils/api.js';
		
	import goodsTopicCell from '@/components/goods/goodsTopicCell.vue'
	import goodsCell from '@/components/goods/goodsCell.vue'
	import goodsFlashCell from '@/components/goods/goodsFlashCell.vue'
	import goodsClubCell from '@/components/goods/goodsClubCell.vue'
	

	// const defaultData = [
	// 	{cover: '/static/sea.jpeg', name: '开发好工具，种草全世界', type: 'topic', topic: '#精选好物推荐#', label: '好物推荐', width: 575, height: 480},
	// 	{cover: '/static/house1.jpeg', name: '全新与优雅的设计', type: 'goods', topic: '#年度最佳设计#', label: '好物推荐', tags: '新品,最佳', price: 399.00, sale: 369, vip: 349, saleNum: 3699, width: 546, height: 410},
	// 	{cover: '/static/house2.jpeg', name: '高质量高效率高实用', type: 'flash', topic: '#年度最受欢迎#', label: '好物推荐', tags: '新品,热门', price: 399.00, sale: 369, saleNum: 3699, width: 1000, height: 1205},
	// 	{cover: '/static/bg-greek.png', name: '主题搭配优秀，一键换肤', type: 'club', topic: '#年度最佳搭配#', label: '好物推荐', tags: '热卖,3人团', price: 399.00, sale: 369, saleNum: 3699, width: 928, height: 1158},
	// 	{cover: '/static/bg-newyork.png', name: '国际化/动画/手势全面突破', type: 'goods', topic: '#msi冠军#', label: '好物推荐', tags: '新品,突破', price: 399.00, sale: 369, saleNum: 3699, width: 928, height: 1158},
	// 	{cover: '/static/bg-greek.png', name: '主题搭配优秀，一键换肤', type: 'club', topic: '#年度最佳搭配#', label: '好物推荐', tags: '热卖,3人团', price: 399.00, sale: 369, saleNum: 3699, width: 928, height: 1158},
	// 	{cover: '/static/bg-newyork.png', name: '国际化/动画/手势全面突破', type: 'goods', topic: '#msi冠军#', label: '好物推荐', tags: '新品,突破', price: 399.00, sale: 369, saleNum: 3699, width: 928, height: 1158},
	// 	{cover: '/static/house2.jpeg', name: '高质量高效率高实用', type: 'flash', topic: '#年度最受欢迎#', label: '好物推荐', tags: '新品,热门', price: 399.00, sale: 369, saleNum: 3699, width: 1000, height: 1205},
	// ]
	
	const defaultData = [

	]
	
	export default {
		components: {
			goodsTopicCell,
			goodsCell,
			goodsFlashCell,
			goodsClubCell
		},
		data() {
			return {
				items: []
			}
		},
		onShow() {
		},
		onLoad() {
			this.getCat();
		},
		methods: {
			goSortList: function(name,id) {
				console.log("go")
				uni.navigateTo({
					url: "/pages/appsort/appsortlist?category=" + name+"&id="+id
				})
			},
			getCat: function() {
				uni.request({
					url: API.GetCat()
				}).then(res => {
					var ress = res[1].data;
					if (typeof(ress) != 'undefined'&&ress != "none"&&ress!="NULL") {
						const catList = res[1].data
					
						for(var i=0 ; i<catList.length ; i++){
							const catLists = {
								cover:"",
								name:"",
								type:"",
								topic:"",
								label:"",
								width:"",
								height:"",
								id:""
							}
							catLists.id =  catList[i].id
							catLists.cover = catList[i].imgclass
							catLists.name = catList[i].name
							catLists.type = 'topic'
							catLists.topic = '#精选好物推荐#'
							catLists.label = '好物推荐'
							catLists.width = 575
							catLists.height =  480

							
							defaultData.push(catLists)
						}
					}else{
						this.showlist=false;
					}
				})
			},
			NewLoadData() {
				uni.$emit("刷新成功")
			},
			calculateHeight(val) {
				let h = val.height * 350 / val.width
				if (h > 400) {
					// 限制最高400
					h = 400
				}
				if (h < 100) {
					h = 100
				}
				// 只计算有差别的地方，高度相同的地方不做计算
				if (val.type != 'topic' ) {
					h += 10 + 32 + 24 + 38
				}
				return {h: h}
			},
			toLoadData() {
				const ins = this.$refs['n-list']
				const cp = ins.nCurrentPage
				setTimeout(()=>{
					if (cp===1) {
						this.items = defaultData
						// #ifndef APP-NVUE
						this.$refs['water'].clear()
						this.$refs['water'].set(defaultData)
						// #endif
					} else {
						this.items = this.items.concat(defaultData)
						// #ifndef APP-NVUE
						this.$refs['water'].concat(defaultData)
						// #endif
					}
					if (cp >= 4) {
						ins.nEndSuccess(false)
					} else {
						ins.nEndSuccess(true)
					}
				}, 300)
			}
		}
	}
</script>

<style>

</style>
