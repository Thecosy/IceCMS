<template>
	<view>
		<!-- 收货地址 -->
		<navigator class="addres-wrap" url="/pages/shop/address/choose" hover-class="none">
			<view class="text" v-if="address_id">
				<view>{{ addresTxt }}</view>
				<view>{{ moblie }}</view>
			</view>
			<view class="text" v-else>请填写收货信息</view>
			<u-icon class="icon" name="arrow-right"></u-icon>
		</navigator>
		<!-- 商品列表 -->
		<view class="product-item" v-for="(item, index) in product" :key="index">
			<image class="cover-img" mode="aspectFill" :src="item.product_info.cover_img"></image>
			<view class="right">
				<view class="u-line-2">{{ item.product_info.title }}</view>
				<view v-if="item.sku_txt" class="sku_txt">{{ item.sku_txt }}</view>
				<view class="num-wrap">
					<text v-if="item.sku_id > 0" class="price">￥{{ item.sku_info.price }}</text>
					<text v-else class="price">￥{{ item.product_info.price }}</text>
					<text class="number">x {{ item.product_num }}</text>
				</view>
			</view>
		</view>
		<!--结算工具栏 -->
		<view class="tool">
			<view class="left">
				<text class="txt">合计：</text>
				<text class="RMB">￥</text>
				<text class="price">{{ amountMoney }}</text>
			</view>
			<view @click="wxPay" class="pay-btn">去付款</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			product: [],
			amountMoney: 0,
			ids: null,
			address_id: null,
			addresTxt: '',
			moblie: ''
		};
	},
	onLoad(options) {
		this.ids = options.ids.split(',');
		this.getProduct();
	},
	methods: {
		wxPay() {
			let that = this;

			if (!this.address_id) {
				uni.showToast({
					title: '请填写收货信息',
					icon: 'none'
				});
				return;
			}

			uni.showLoading({
				title: '加载中',
				mask: true
			});

			this.$H
				.post('ShopCar/carPay', {
					ids: this.ids,
					address_id: this.address_id
				})
				.then(res => {
					console.log(res)
						uni.requestPayment({
							provider: "alipay",
							orderInfo: res,
							success: function(res1) {
								that.$u.toast("下单成功");
									uni.navigateTo({
										url: '/pages/shop/order/list'
									});
							},
							fail: function(err) {
								console.log(err)
								that.$u.toast("已取消支付或支付失败");
							}
						});
					uni.hideLoading();
				});
		},
		// 计算合计价格
		computePrice() {
			let amountMoney = 0;
			this.product.forEach(item => {
				if (item.sku_id > 0) {
					amountMoney += item.sku_info.price * item.product_num;
				} else {
					amountMoney += item.product_info.price * item.product_num;
				}
			});

			this.amountMoney = amountMoney;
		},
		getProduct() {
			this.$H
				.post('ShopCar/product', {
					ids: this.ids
				})
				.then(res => {
					this.product = res.result;
					this.computePrice();
				});
		}
	}
};
</script>

<style>
page {
	background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
// 收货地址
.addres-wrap {
	display: flex;
	align-items: center;
	background-color: #fff;
	padding: 30rpx;
	margin-bottom: 20rpx;

	.text {
		color: #999;
	}

	.icon {
		margin-left: auto;
	}
}

// 商品信息
.product-item {
	display: flex;
	background-color: #fff;
	padding: 20rpx;
	margin-bottom: 20rpx;
	font-size: 24rpx;
	.cover-img {
		width: 150rpx;
		height: 150rpx;
		margin-right: 20rpx;
		border-radius: 10rpx;
	}

	.right {
		flex: 1;
		.sku_txt {
			color: #999;
			font-size: 20rpx;
		}

		.price {
			color: #ff66cd;
			font-weight: bold;
		}
		.num-wrap {
			display: flex;
			.number {
				margin-left: auto;
			}
		}
	}
}

// 结算工具栏
.tool {
	display: flex;
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 20rpx;
	border-top: 1px solid #eee;
	background-color: #fff;
	.left {
		flex: 1;
		display: flex;
		align-items: center;
		.RMB {
			color: #ff66cd;
			font-size: 20rpx;
		}

		.price {
			color: #ff66cd;
			font-size: 38rpx;
			font-weight: bold;
		}
	}
	.pay-btn {
		margin-left: auto;
		background-color: #a16afc;
		color: #fff;
		padding: 10rpx 50rpx;
		border-radius: 100rpx;
	}
}
</style>
