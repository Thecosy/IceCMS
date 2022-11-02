<template>
	<view>
		<u-list @scrolltolower="scrolltolower">
			<u-list-item v-for="(item, index) in indexList" :key="index">
				
				<view class="shoplists">
					<image v-if="item.gtype=='vip'" class="shop" src="/static/my/shopvip.png"></image>
					<image v-else class="shop" src="/static/my/shopjifen.png"></image>
					<view class="texts">
						<text>{{item.gname}}</text>
						<view>{{item.order}}</view>
					</view>
					<text class="pays" v-if="item.state=='2'">已支付</text>
					<text class="pay" v-else-if="item.state=='0'">未支付</text>
				</view>
				<u-divider></u-divider>
			</u-list-item>
		</u-list>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				oin:'',
				indexList:[]
			}
		},
		onLoad(e) {
			this.oin =e.oin
			this.loadmore()			
		},
		methods: {
			scrolltolower() {
				this.loadmore()
			},
			loadmore() {
				uni.request({
					url: 'http://易如意后台域名/api.php?act=order' + '&app=10000' + '&oin=' + this.oin,
					success: (res) => {
						console.log(res.data)
						this.indexList =res.data.msg
					},
					fail: (res) => {}
				});
			}
		}
	}
</script>
<style>
	page{
		margin: 30rpx;
		width: 690rpx;
	}
	.pay{
		padding: 8rpx;
		font-size: 20rpx;
		text-align: center;
		background-color: #ff0000;
		position:absolute;
		right:0px;
		border-radius: 10rpx;
		color: #FFFFFF;
	}
	.pays{
		padding: 8rpx;
		margin-left: 100rpx;
		font-size: 20rpx;
		text-align: center;
		position:absolute;
		right:0px;
		background-color: #02ffcd;
		border-radius: 10rpx;
		color: #ffffff;
	}
	.shoplists{
		display: flex;
		align-items: center;
	}
	.texts{
		margin-left: 15rpx;
	}
	.shop {
		width: 80rpx;
		height: 80rpx;
	}
</style>
