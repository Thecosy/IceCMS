<template>
	<view>
		<view class="goods-info" v-for="(item, index) in orderInfo.goods_list" :key="index">
			<u-image width="150rpx" height="150rpx" :src="item.cover_img"></u-image>
			<view class="info-right">
				<text>{{ item.title }}</text>
				<view class="price">
					<text>￥{{ item.price }}</text>
					<text class="num">x {{ orderInfo.goods_info[index].num }}</text>
				</view>
			</view>
		</view>
		<view class="cell">
			<view class="cell-item">
				<text>订单状态</text>
				<text>{{ orderInfo.status }}</text>
			</view>
			<view class="cell-item">
				<text>结算金额</text>
				<text>{{ orderInfo.total_money }}</text>
			</view>
			<view class="cell-item">
				<text>下单时间</text>
				<text>{{ orderInfo.create_time | date }}</text>
			</view>
		</view>
		<view class="cell">
			<view class="cell-item">
				<text>联系人</text>
				<text>{{ orderInfo.address_info.name }}</text>
			</view>
			<view class="cell-item">
				<text>电话</text>
				<text>{{ orderInfo.address_info.moblie }}</text>
			</view>
			<view class="cell-item">
				<text>地址</text>
				<text>{{ orderInfo.address_info.region }}{{ orderInfo.address_info.address }}</text>
			</view>
		</view>
		<view class="cell" v-if="orderInfo.express_company">
			<view class="cell-item">
				<text>物流信息</text>
				<text>{{ orderInfo.express_company.label}}</text>
			</view>
			<view class="cell-item">
				<text>物流单号</text>
				<text>{{ orderInfo.express_number}}</text>
			</view>
		</view>
		<view class="cell" v-if="orderInfo.status == '已完成'">
			<view class="cell-item">
				<text>订单状态</text>
				<text style="color: red;">已完成</text>
			</view>
		</view>
		<view class="cell" v-if="orderInfo.status == '待收货'">
				<u-button style="margin:0 30rpx ;" shape="circle" type="success" @click="submit">收货</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderId: '',
			orderInfo: {}
		};
	},
	onLoad(options) {
		this.orderId = options.id;
		this.getOrderDetail();
	},
	methods: {
		getOrderDetail() {
			this.$H
				.get('order/detail', {
					id: this.orderId
				})
				.then(res => {
					this.orderInfo = res.result;
				});
		},
		submit(){
			this.$H
				.post('order/ordershou', this.orderInfo)
				.then(res => {
					if(res.code==200){
					this.$u.toast(res.msg);
					this.getOrderDetail(); 
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
.goods-info {
	display: flex;
	background-color: #fff;
	margin-bottom: 20rpx;
	padding: 20rpx;

	.info-right {
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		.price {
			color: red;
			margin-top: auto;
			.num {
				color: #999;
			}
		}
	}
}

.cell {
	background-color: #ffffff;
	padding: 20rpx;
	margin-bottom: 20rpx;
	.cell-item {
		display: flex;
		padding: 20rpx 0;
		border-bottom: 1px solid #f5f5f5;

		text:nth-child(1) {
			white-space: nowrap;
			color: #616161;
		}

		text:nth-child(2) {
			margin-left: auto;
		}
	}
	.cell-item:last-child {
		border-bottom: 0;
	}
}

.footer-btn-box {
	margin-top: 20rpx;
}
</style>
