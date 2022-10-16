<template>
	<view>
		<view class="head">
			<text class="text">购物车管理</text>
			<view class="handle-btn" @click="handelAdmin">
				<text v-show="!isAdmin">管理</text>
				<text v-show="isAdmin">完成</text>
			</view>
		</view>
		<!-- 商品列表 -->
		<u-checkbox-group @change="computePrice" active-color="#ff66cd">
			<view class="product-item" v-for="(item, index) in product" :key="index">
				<u-checkbox v-model="item.checked" :name="index"></u-checkbox>
				<image class="cover-img" mode="aspectFill" :src="item.product_info.cover_img"></image>
				<view class="right">
					<view class="u-line-2">{{ item.product_info.title }}</view>
					<view v-if="item.sku_txt" class="sku_txt">{{ item.sku_txt }}</view>
					<view class="num-wrap">
						<text v-if="item.sku_id > 0" class="price">￥{{ item.sku_info.price }}</text>
						<text v-else class="price">￥{{ item.product_info.price }}</text>
						<q-number-box
							@change="computePrice"
							class="number"
							v-model="item.product_num"
							:disabled-input="true"
							m-width="40rpx"
							m-height="40rpx"
							:size="20"
						></q-number-box>
					</view>
				</view>
			</view>
		</u-checkbox-group>
		<!--结算工具栏 -->
		<view class="tool">
			<view class="left">
				<u-checkbox @change="checkAllChange" shape="circle" v-model="checkAll" active-color="#ff66cd">全选</u-checkbox>
				<block v-if="!isAdmin">
					<text class="txt">合计：</text>
					<text class="RMB">￥</text>
					<text class="price">{{ amountMoney }}</text>
				</block>
			</view>
			<view v-if="isAdmin" @click="carDel" class="pay-btn">删除</view>
			<view v-else @click="jumpOrder" class="pay-btn">结算</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			product: [],
			checkAll: false,
			amountMoney: 0,
			isAdmin: false
		};
	},
	onLoad() {
		this.getProduct();
	},
	methods: {
		jumpOrder() {
			let carIds = [];
			this.product.forEach(item => {
				if (item.checked) {
					carIds.push(item.id);
				}
			});

			if (carIds.length == 0) {
				uni.showToast({
					title: '请选择商品',
					icon: 'none'
				});

				return;
			}

			uni.navigateTo({
				url: '/pages/shop/car-total?ids=' + carIds.toString()
			});
		},
		carDel() {
			let carIds = [];
			this.product.forEach(item => {
				if (item.checked) {
					carIds.push(item.id);
				}
			});

			this.$H
				.post('shopCar/carDel', {
					id: carIds
				})
				.then(res => {
					if (res.code == 200) {
						this.product.forEach((item, index) => {
							if (item.checked) {
								this.product.splice(index, 1);
							}
						});
					}
				});
		},
		handelAdmin() {
			if (this.isAdmin) {
				this.isAdmin = false;
			} else {
				this.isAdmin = true;
			}
		},
		// 计算合计价格
		computePrice() {
			let amountMoney = 0;
			this.product.forEach(item => {
				if (item.checked) {
					if (item.sku_id > 0) {
						amountMoney += item.sku_info.price * item.product_num;
					} else {
						amountMoney += item.product_info.price * item.product_num;
					}
				}
			});

			this.amountMoney = amountMoney;
		},
		checkAllChange(e) {
			if (e.value) {
				this.product.forEach(item => {
					this.$set(item, 'checked', true);
				});
			} else {
				this.product.forEach(item => {
					this.$set(item, 'checked', false);
				});
			}

			this.computePrice();
		},
		getProduct() {
			this.$H.get('ShopCar/product').then(res => {
				res.result.forEach(item => {
					this.$set(item, 'checked', false);
				});

				this.product = res.result;
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
.head {
	display: flex;
	font-size: 24rpx;
	padding: 30rpx;
	.handle-btn {
		margin-left: auto;
		background-color: #fff;
		padding: 5rpx 20rpx;
		border-radius: 100rpx;
	}
}

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
		.txt {
			margin-left: auto;
		}
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
		margin-left: 20rpx;
		background-color: #a16afc;
		color: #fff;
		padding: 10rpx 50rpx;
		border-radius: 100rpx;
	}
}
</style>
