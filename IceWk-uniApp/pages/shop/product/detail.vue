<template>
	<view>
		<u-swiper :height="sysInfo.screenWidth * 2" mode="number" indicator-pos="bottomRight" :border-radius="0" img-mode="aspectFill" :list="goodsInfo.carousel"></u-swiper>
		<view class="goods-title">{{ goodsInfo.title }}</view>
		<view class="price-cell-wrap">
			<view class="price">
				<text>￥</text>
				<text>{{ goodsInfo.price }}</text>
				<!-- <text v-if="goodsInfo.specs_type == 1">{{ goodsInfo.price }}</text>
				<text v-if="goodsInfo.specs_type == 2">{{ goodsInfo.price_min }}</text>
 -->			</view>
			<text class="sales">已售{{ goodsInfo.sales }}</text>
		</view>
		<!-- 商品详情 -->
		<view class="goods-detail"><rich-text :nodes="goodsInfo.content | formatRichText"></rich-text></view>
		<view style="height: 150rpx;"></view>
		<view class="goods-nav">
			<view class="left">
				<button @click="$f.jump('/pages/chat/chat?user=' + userJson)" class="u-reset-button n-item" open-type="contact">
					<u-icon name="kefu-ermai" :size="40"></u-icon>
					<text>客服</text>
				</button>
				<navigator url="/pages/shop/car" class="n-item" hover-class="none">
					<u-icon name="shopping-cart" :size="40"></u-icon>
					<text>购物车</text>
				</navigator>
			</view>
			<view class="right">
				<view
					class="nav-btn cat-btn"
					@click="
						showPopup = true;
						isCar = true;
					"
				>
					加入购物车
				</view>
				<view class="nav-btn buy-btn" @click="showPopup = true">立即购买</view>
			</view>
		</view>
		<!-- 立即购买弹窗 -->
		<u-popup v-model="showPopup" mode="bottom" :border-radius="20">
			<view class="container">
				<view class="goods-info">
					<u-image class="cover-img" width="150rpx" height="150rpx" :src="goodsInfo.cover_img"></u-image>
					<view class="right">
						<!-- 单规格模式 -->
						<block v-if="goodsInfo.specs_type == 1">
							<view class="price">
								<text>￥</text>
								<text>{{ goodsInfo.price }}</text>
							</view>
							<view class="stock">剩余{{ goodsInfo.stock }}件</view>
						</block>
						<!-- 多规格模式 -->
						<block v-if="goodsInfo.specs_type == 2">
							<view class="price">
								<text>￥</text>
								<text v-if="skuInfo">{{ skuInfo.price }}</text>
								<text v-else>{{ goodsInfo.price_min }}</text>
							</view>
							<view v-if="skuInfo" class="stock">剩余{{ skuInfo.stock }}件</view>
							<view v-if="skuInfo.name" class="choose-sku">已选：{{ skuInfo.name }}</view>
							<view v-else class="choose-sku">请选择规格</view>
						</block>
					</view>
				</view>
				<!-- 规格 -->
				<view class="sku-wrap">
					<view class="title">规格</view>
					<view class="sku-list">
						<view class="sku-item" @click="checkSku(item, index)" :class="{ active: item.checked }" v-for="(item, index) in goodsInfo.sku_list" :key="index">
							{{ item.name }}
						</view>
					</view>
				</view>
				<!-- 数量 -->
				<view class="pay-num">
					<text class="lable">购买数量</text>
					<q-number-box class="number" v-model="goodsNum"></q-number-box>
				</view>
				<block v-if="isCar"><q-button bg-color="#a16afc" color="#fff" @click="joinCar">确定</q-button></block>
				<block v-else><q-button bg-color="#a16afc" color="#fff" @click="jumpOrder">确定</q-button></block>
			</view>
		</u-popup>
	</view>
</template>

<script>
import API from '../../../utils/api.js';
export default {
	data() {
		return {
			addresTxt: '请选择',
			showAddress: false,
			goodsId: '',
			goodsInfo: {
				detail: ''
			},
			sysInfo: this.$u.sys(),
			showPopup: false,
			address: {},
			goodsNum: 1,
			specsText: '',
			skuInfo: {},
			isCar: false,
			userJson:'',
		};
	},
	onLoad(options) {
		this.goodsId = options.id;
		this.getGoodsInfo();
		this.getUserInfo();
	},
	methods: {
		getUserInfo() {
			this.$H
				.get('user/userInfoById', {
					uid: 3
				})
				.then(res => {
					let user = {
						uid: res.result.uid,
						username: res.result.username,
						avatar: res.result.avatar
					};
					this.userJson = JSON.stringify(user);
				});
		},
		joinCar() {
			let params = {};

			// 多规格模式
			if (this.goodsInfo.specs_type == 2) {
				if (!this.skuInfo) {
					uni.showToast({
						title: '请选择规格',
						icon: 'none'
					});

					return;
				}

				params.sku_id = this.skuInfo.id;
				params.sku_txt = this.specsText;
			}

			params.product_id = this.goodsInfo.id;
			params.product_num = this.goodsNum;

			this.$H.post('ShopCar/carAdd', params).then(res => {
				this.$u.toast(res.msg);
				this.showPopup = false;
			});
		},
		jumpOrder() {
			let params = {};
			// 单规格模式
			if (this.goodsInfo.specs_type == 1) {
				params.price = this.goodsInfo.price;
			}

			// 多规格模式
			if (this.goodsInfo.specs_type == 2) {
				if (!this.skuInfo) {
					uni.showToast({
						title: '请选择规格',
						icon: 'none'
					});

					return;
				}

				params.price = this.skuInfo.price;
				params.specs_text = this.skuInfo.name;
				params.sku_id = this.skuInfo.id;
			}

			params.product_id = this.goodsInfo.id;
			params.title = this.goodsInfo.title;
			params.cover_img = this.goodsInfo.cover_img;
			params.specs_type = this.goodsInfo.specs_type;
			params.goods_num = this.goodsNum;

			uni.navigateTo({
				url: '/pages/shop/order/create' + this.$u.queryParams(params)
			});
		},
		//选择规格时
		checkSku(e, index) {
			console.log(e)
			this.skuInfo = e;

			this.goodsInfo.sku_list.forEach(item => {
				this.$set(item, 'checked', false);
			});

			this.goodsInfo.sku_list[index].checked = true;
		},
		getGoodsInfo() {
			uni.request({
				url: API.GetResourceById(this.goodsId),
				success: res => {
					console.log(res)
					this.goodsInfo = res.data;
				}
			});
			// this.$H
			// 	.get('product/detail', {
			// 		id: this.goodsId
			// 	})
			// 	.then(res => {
			// 		// 多规格模式
			// 		if (res.result.specs_type == 2) {
			// 			res.result.sku_list.forEach(item => {
			// 				this.$set(item, 'checked', false);
			// 			});
			// 		}

			// 		this.goodsInfo = res.result;
			// 	});
		}
	},
	filters: {
		//控制富文本中图片大小
		// formatRichText(html) {
		// 	let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
		// 		if (match.search(/style=/gi) == -1) {
		// 			match = match.replace(/\<img/gi, '<img style=""');
		// 		}
		// 		return match;
		// 	});

		// 	newContent = newContent.replace(/style="/gi, '$& max-width:100% !important; ');
		// 	newContent = newContent.replace(/<br[^>]*\/>/gi, '');
		// 	return newContent;
		// }
	}
};
</script>
<style>
page {
	background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.goods-detail {
	background-color: #ffffff;
	margin-top: 20rpx;
}
.goods-title {
	background-color: #fff;
	font-weight: bold;
	padding: 20rpx;
}

.price-cell-wrap {
	display: flex;
	align-items: center;
	padding: 0 20rpx 20rpx 20rpx;
	background-color: #fff;
	.sales {
		color: #999;
		margin-left: auto;
		font-size: 28rpx;
	}
}

.price {
	color: red;
	margin-top: 20rpx;

	text:nth-child(1) {
		font-size: 24rpx;
	}

	text:nth-child(2) {
		font-size: 36rpx;
	}

	text:nth-child(3) {
		color: #999;
		font-size: 24rpx;
	}
}

.goods-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx;
	background-color: #ffffff;
	z-index: 999;
	display: flex;
	border-top: 1px solid #f5f5f5;
	.left {
		display: flex;
		.n-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-right: 50rpx;
			text {
				font-size: 20rpx;
			}
		}
	}
	.right {
		display: flex;
		margin-left: auto;
		.nav-btn {
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 70rpx;
			font-size: 24rpx;
		}

		.cat-btn {
			background-color: #06AFFE;
			border-radius: 100rpx 0 0 100rpx;
		}

		.buy-btn {
			background-color: #FF7A94;
			border-radius: 0 100rpx 100rpx 0;
		}
	}
}

/* 弹窗 */
.goods-info {
	display: flex;
	.cover-img {
		margin-right: 20rpx;
		border-radius: 10rpx;
	}
	.right {
		font-size: 20rpx;
		.stock {
			color: #999;
		}
	}

	.number-box {
		display: flex;
		margin-top: 30rpx;

		.number {
			margin-left: auto;
		}
	}
}

// 规格
.sku-wrap {
	font-size: 28rpx;
	.title {
		color: #999;
		margin: 20rpx 0;
	}

	.sku-list {
		.sku-item {
			font-size: 24rpx;
			display: inline-block;
			background-color: #f5f5f5;
			border: 1px solid #f5f5f5;
			margin-bottom: 30rpx;
			margin-right: 30rpx;
			border-radius: 100rpx;
			padding: 10rpx 40rpx;
		}

		.active {
			border: 1px solid #a16afc;
		}
	}
}

// 购买数量
.pay-num {
	display: flex;
	margin-top: 30rpx;
	margin-bottom: 60rpx;
	.lable {
		font-size: 28rpx;
		color: #999;
	}

	.number {
		margin-left: auto;
	}
}
</style>
