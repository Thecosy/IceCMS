<template>
	<view>
		<u-tabs :list="tabsList" :is-scroll="false" active-color="#00b264" :current="current" @change="tabChange"></u-tabs>
		<block v-for="(item, index) in orderList" :key="index">
			<view class="order-item">
				<view class="head-wrap">
					<text class="status">{{ item.status }}</text>
				</view>
				<navigator class="goods-info" :url="'/pages/shop/order/detail?id=' + item.id" hover-class="none">
					<image mode="aspectFill" :src="item.productInfo.cover_img"></image>
					<view class="info-c">
						<view class="goods-title u-line-2">{{ item.productInfo.title }}</view>
						<view class="specs-list">
							<view class="item">
								<text v-if="item.sku_id > 0">￥{{ item.suk_info.price }} x {{ item.product_number }}</text>
								<text v-else>￥{{ item.productInfo.price }} x {{ item.product_number }}</text>
							</view>
						</view>
					</view>
				</navigator>
				<view class="total-amount">
					<text class="tip">结算金额</text>
					<text class="money">￥{{ item.total_money }}</text>
				</view>
			</view>
			<!-- 付款方式弹窗 -->
			<u-popup v-model="isPay" mode="bottom">
				<view style="padding: 100rpx;"><u-button style="margin-bottom: 50rpx;" @click="payment(item.pay_sn)" type="success">微信支付</u-button></view>
			</u-popup>
		</block>
		<!-- 加载状态 -->
		<block v-if="loadStatus == 'nomore' && orderList.length === 0">
			<view style="margin-top: 30%;"><u-empty text="暂无订单" mode="favor"></u-empty></view>
		</block>
		<block v-else>
			<view style="margin: 30rpx 0;"><u-loadmore bg-color="#f5f5f5" icon-color="#00b264" :status="loadStatus" /></view>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loadStatus: 'loadmore',
			tabsList: [
				{
					name: '全部'
				},
				{
					name: '待付款'
				},
				{
					name: '待发货'
				},
				{
					name: '待收货'
				},
				{
					name: '已完成'
				}
			],
			current: 0,
			orderList: [],
			page: 1
		};
	},
	onLoad(options) {
		this.getOrderList();
	},
	onReachBottom() {
		this.page++;
		this.getOrderList();
	},
	methods: {
		jumpRefund(url) {
			uni.navigateTo({
				url: url
			});
		},
		jumpComment(id) {
			uni.navigateTo({
				url: '/pages/goods-comment-add/goods-comment-add?id=' + id
			});
		},

		cancelOrder(id, index) {
			id = parseInt(id);
			this.$H
				.post('shop.order/order_cancel.html', {
					key: uni.getStorageSync('sessionKey'),
					order_id: id
				})
				.then(res => {
					if (res.code === 200) {
						let arr = this.orderList;
						arr.splice(index, 1);

						this.orderList = arr;
					}
				});
		},
		confirmOrder(id, index) {
			id = parseInt(id);
			let that = this;
			this.$H
				.post('shop.order/order_receive.html', {
					key: uni.getStorageSync('sessionKey'),
					order_id: id
				})
				.then(res => {
					if (res.code === 200) {
						this.$u.toast('已成功确认收货');

						setTimeout(function() {
							let arr = that.orderList;
							arr.splice(index, 1);

							that.orderList = arr;
						}, 1000);
					}
				});
		},
		tabChange(index) {
			this.current = index;
			this.orderList = [];
			this.page = 1;
			this.getOrderList();
		},
		getOrderList() {
			this.loadStatus = 'loading';

			let status = this.current;

			this.$H
				.get('order/userOrderList', {
					page: this.page,
					status: status
				})
				.then(res => {
					this.orderList = this.orderList.concat(res.result.data);
					if (res.result.current_page >= res.result.last_page) {
						this.loadStatus = 'nomore';
					}
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
.order-item {
	display: flex;
	flex-direction: column;
	padding: 20rpx;
	background-color: #fff;
	margin: 20rpx;
	border-radius: 10rpx;
}

.order-item .head-wrap {
	display: flex;
	margin-bottom: 20rpx;
	align-items: center;
}

.order-item .head-wrap .status {
	margin-left: auto;
	color: #999;
	font-size: 28rpx;
}

.order-item .head-wrap image {
	width: 30rpx;
	height: 30rpx;
}

.order-item .goods-info {
	display: flex;
}

.order-item .goods-info .info-c {
	width: 70%;
}
.order-item .goods-info .info-c .goods-title {
	margin-bottom: 20rpx;
}

.order-item .goods-info .info-c .specs-list .item {
	display: flex;
	font-size: 10px;
	margin-bottom: 10rpx;
}

.order-item .goods-info .info-c .specs-list .item > text {
	margin-left: auto;
	color: #616161;
}

.order-item .goods-info > image {
	margin-right: 20rpx;
	width: 120rpx;
	height: 120rpx;
}

.order-item .total-amount {
	margin: 20rpx;
	text-align: right;
}

.order-item .total-amount .money {
	color: #ec5151;
	margin-left: 10rpx;
}

.order-item .order-footer {
	display: flex;
	justify-content: flex-end;
	padding-top: 20rpx;
}

.order-item .order-footer .u-btn {
	margin: 0 10rpx 0 0;
}
</style>
