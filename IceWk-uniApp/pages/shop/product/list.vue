<template>
	<view>
		<view style="padding: 20rpx;background-color: #FFFFFF;">
			<u-search placeholder="商品名称" v-model="keyword" @change="onChange"></u-search>
		</view>
		<goods-waterfall ref="waterfall" :list="goodsList" :loadStatus="loadStatus"></goods-waterfall>
	</view>
</template>

<script>
	import goodsWaterfall from '@/components/goods-waterfall/goods-waterfall';
	export default {
		components: {
			goodsWaterfall
		},
		data() {
			return {
				goodsList: [],
				loadStatus: "loadmore",
				keyword: "",
				page: 1
			}
		},
		onLoad(options) {
			this.keyword = options.keyword;
		},
		onReachBottom() {
			this.page++;
			this.getGoodsList();
		},
		methods: {
			onChange() {
				this.page = 1;
				this.goodsList = [];
				this.$refs.waterfall.clear();
				this.getGoodsList();
			},
			getGoodsList() {
				this.loadStatus = "loading";
				this.$H.get("product/list", {
					keyword: this.keyword,
					page: this.page
				}).then(res => {
					this.goodsList = this.goodsList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			}
		}
	}
</script>

<style>

</style>
