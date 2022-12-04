<template>
	<view class="container">
		<!-- 轮播图 -->
		<view class="swiper-box"><u-swiper name="img" mode="none" height="280" :list="swiperList" :border-radius="20"></u-swiper></view>
		<!-- 分类 -->
		<u-tabs :list="goodsClassList" name="name" bg-color="#f5f5f5" active-color="#000" :current="current" @change="tabChange"></u-tabs>
		<!-- 商品列表 -->
		<goods-waterfall ref="waterfall" :list="goodsList" :loadStatus="loadStatus"></goods-waterfall>
	</view>
</template>

<script>
import API from '../../utils/api.js';
import goodsWaterfall from '@/components/goods-waterfall/goods-waterfall';
export default {
	components: {
		goodsWaterfall
	},
	data() {
		return {
			current: 0,
			swiperList: [],
			loadStatus: 'loadmore',
			goodsList: [],
			goodsClassList: [
				{
					id: '',
					name: '推荐'
				}
			],
			goodsClassId: '',
			page: 1,
			keyword: '',
			navList: []
		};
	},
	onLoad() {
		this.getGoodsClass();
		this.getGoodsList();
		this.getLinkList(); 
	},
	onReachBottom() {
		this.page++;
		this.getGoodsList();
	},
	onPullDownRefresh() {
		this.page = 1;
		this.goodsList = [];
		this.getGoodsClass();
		this.getGoodsList();
	
		this.getLinkList();

		uni.stopPullDownRefresh();
	},
	methods: {
		getLinkList() {
			let that = this;
			this.$H.post('link/listAll').then(res => {
				res.result.forEach((item, index) => {
					if (item.type == 1) {
						that.swiperList.push(item);
					}
				});
			});
		},
		tabChange(index) {
			this.current = index;
			this.goodsList = [];
			this.goodsClassId = this.goodsClassList[index].id;
			this.page = 1;
			this.$refs.waterfall.clear();
			this.getGoodsList();
		},
		getGoodsClass() {
			this.$H.get('product/classList').then(res => {
				this.goodsClassList = res.result;
			});
		},
		getGoodsList() {
			this.loadStatus = 'loading';

			uni.request({
				url: API.GetAllResource(this.page, 5),
				success: res => {
					console.log(res)
					this.goodsList = this.goodsList.concat(res.data.data);
							if (this.goodsList.length >= res.data.total) {
								this.loadStatus = 'nomore';
							}
							else {
								this.loadStatus = 'loadmore';
							}
				}
			});
			// this.$H
			// 	.get('product/list', {
			// 		class_id: this.goodsClassId,
			// 		page: this.page
			// 	})
			// 	.then(res => {
			// 		this.goodsList = this.goodsList.concat(res.result.data);
			// 		if (res.result.current_page >= res.result.last_page) {
			// 			this.loadStatus = 'nomore';
			// 		}
			// 		else {
			// 			this.loadStatus = 'loadmore';
			// 		}
			// 	});
		}
	}
};
</script>
<style lang="scss" scoped>
.swiper-box {
	margin-bottom: 20rpx;
}
</style>
