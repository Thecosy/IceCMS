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
		<!-- 商品信息 -->
		<view class="product-info">
			<image class="cover-img" :src="productInfo.cover_img" mode="aspectFill"></image>
			<view class="right">
				<view class="title u-line-2">{{ productInfo.title }}</view>
				<view v-if="productInfo.specs_text" class="specs-text">{{ productInfo.specs_text }}</view>
				<view class="number-wrap">
					<text class="price">￥{{ productInfo.price }}</text>
					<text class="num">x {{ productInfo.goods_num }}</text>
				</view>
			</view>
		</view>
		<!-- 备注 -->
		<view class="remarks"><textarea v-model="remark" placeholder="给卖家留言"></textarea></view>
		<!-- 支付工具栏 -->
		<view class="tool">
			<view class="left">
				<text>合计：</text>
				<text class="RMB">￥</text>
				<text class="price">{{ productInfo.price * productInfo.goods_num }}</text>
			</view>
			<view @click="wxPay" class="pay-btn">去付款</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			productInfo: null,
			moblie: null,
			addresTxt: null,
			address_id: null,
			remark: ''
		};
	},
	onLoad(options) {
		this.productInfo = options;
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

			let form = {
				product_id: this.productInfo.product_id,
				address_id: this.address_id,
				product_number: this.productInfo.goods_num,
				remark: this.remark
			};

			if (this.productInfo.specs_type == 2) {
				form.sku_id = this.productInfo.sku_id;
			}
			  
			this.$H.post('order/create',form).then(payInfo => {
						uni.requestPayment({
							provider: "alipay",
							orderInfo: payInfo,
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

	.text {
		color: #999;
	}

	.icon {
		margin-left: auto;
	}
}
// 商品信息
.product-info {
	display: flex;
	background-color: #fff;
	margin: 20rpx 0;
	padding: 30rpx;
	font-size: 28rpx;
	.cover-img {
		width: 180rpx;
		height: 180rpx;
		margin-right: 20rpx;
		border-radius: 10rpx;
	}
	.right {
		flex: 1;
		.specs-text {
			font-size: 20rpx;
			color: #999;
		}
		.number-wrap {
			display: flex;
			.price {
				color: #ff66cd;
			}

			.num {
				margin-left: auto;
				color: #999;
			}
		}
	}
}

.remarks {
	padding: 30rpx;
	background-color: #fff;
	textarea {
		width: calc(100% - 40rpx);
		height: 100rpx;
		background-color: #f5f5f5;
		font-size: 22rpx;
		padding: 20rpx;
		border-radius: 10rpx;
	}
}

.tool {
	display: flex;
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 20rpx;
	border-top: 1px solid #eee;
	background-color: #fff;
	.left {
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
