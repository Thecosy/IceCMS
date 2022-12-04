<template>
	<view>
		<view class="head">
			<view class="user-info">
				<image mode="aspectFill" class="avatar" :src="userInfo.avatar"></image>
				<view class="right">
					<view class="name">{{userInfo.username}}</view>
					<text v-if="userInfo.vip_expire_time > timestamp" class="txt">到期时间：{{userInfo.vip_expire_time | date}}</text>
					<text v-else class="txt">您还不是VIP会员</text>
				</view>
			</view>
		</view>
		<!-- 选项 -->
		<view  class="kai-wrap">
			<view class="option-wrap">
				<view class="option-item" @click="activeIndex = index" :class="{'active':activeIndex == index}" v-for="(item,index) in vipList" :key="index">
					<text class="type-txt">{{item.name}}</text>
					<view class="price-box">
						<text class="RMB">￥</text>
						<text class="num">{{item.price}}</text>
					</view>
					<view class="month-price">{{item.explain}}</view>
					<view class="month-price" style="color: green;">创建圈子数+5</view>
					<view class="month-price" style="color: red;">每天免费下载{{item.num}}次</view>
					<view v-if="item.discount" class="activi-txt" style="background-color: #37414b;">{{item.discount}}</view>
				</view>
			</view>
			<view class="agreement">
				<text>开通会员即代表同意</text>
				<navigator url="/pages/agreement/agreement?id=3">《会员服务协议》</navigator>
			</view>
			<view class="pay-btn" @click="onPay">立即开通</view>
		</view>
		<!-- 会员权益 -->
		<view class="benefit-wrap">
			<view class="b-head">会员权益</view>
			<view class="grid-wrap">
				<view class="benefit-item">
					<image mode="aspectFill" src="../../static/vip/v_1.png"></image>
					<text class="title">提现特权</text>
					<text class="sub">尊享提现特权</text>
				</view>
				<view class="benefit-item">
					<image mode="aspectFill" src="../../static/vip/v_2.png"></image>
					<text class="title">改名次数</text>
					<text class="sub">更改昵称次数：3次/月</text>
				</view>
				<view class="benefit-item">
					<image mode="aspectFill" src="../../static/vip/v_3.png"></image>
					<text class="title">圈子数量</text>
					<text class="sub">每个用户可创建10个圈子</text>
				</view>
				<view class="benefit-item">
					<image mode="aspectFill" src="../../static/vip/v_4.png"></image>
					<text class="title">专属标志</text>
					<text class="sub">会员专属身份标志</text>
				</view>
				<view class="benefit-item">
					<image mode="aspectFill" src="../../static/vip/v_5.png"></image>
					<text class="title">免费下载</text>
					<text class="sub">可获得免费下载次数</text>
				</view>
				<view class="benefit-item">
					<image mode="aspectFill" src="../../static/vip/v_6.png"></image>
					<text class="title">更多权益</text>
					<text class="sub">发现更多会员权益</text>
				</view>
				<view style="color: #fff;height: 30px;">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				activeIndex:0,
				vipList:[],
				orderId:0
			};
		},
		computed:{
			timestamp(){
				return Date.parse(new Date()) / 1000
			}
		},
		onLoad() {
			this.getUserInfo();
			this.getVipList();
		},
		methods:{
			onPay(){
				let that = this;
				uni.showLoading({
					mask:true,
					title:"请稍后"
				})
				
				this.$H.post("vip/renewVip",{
					vip_id:this.vipList[this.activeIndex].id
				}).then(res =>{
					this.orderId=res.result
					if(res.code == 200){
						this.$H.get("vip/pay", {
							order_id: this.orderId,	
						}).then(payInfo => {
							uni.requestPayment({
								provider: "alipay",
								orderInfo: payInfo,
								success: function(res1) {
									that.$u.toast("充值成功");
									that.getUserInfo();
								},
								fail: function(err) {
									console.log(err)
									that.$u.toast("已取消支付或支付失败");
								}
							});
						})
					}
					
					uni.hideLoading();
				})
			},
			getVipList(){
				this.$H.get("vip/vipList").then( res =>{
					this.vipList = res.result;
				})
			},
			getUserInfo() {
				this.$H.get('user/userInfo').then(res => {
					this.userInfo = res.result;
				});
			},
		}
	}
</script>
<style>
	page{
		background-color: #F5F5F5;
	}
</style>
<style lang="scss" scoped>
.head{
	background-color: #37414b;
	padding: 100rpx 30rpx;
	.user-info{
		color: #fff;
		display: flex;
		.avatar{
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		
		.right{
			.name{}
			.txt{
				background-color: #202529;
				border-radius: 100rpx;
				font-size: 20rpx;
				padding: 10rpx 20rpx;
			}
		}
	}
}

.kai-wrap{
	background-color: #fff;
	margin: 30rpx;
	border-radius: 20rpx;
	padding: 20rpx;
	.option-wrap{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		grid-gap: 20rpx;
		.option-item{
			border: 1px solid #999;
			border-radius: 10rpx;
			padding: 50rpx 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			.price-box{
				color: #fa5051;
				.RMB{
					font-size: 20rpx;
				}
				
				.num{
					font-size: 40rpx;
					font-weight: bold;
				}
			}
			
			.month-price{
				font-size: 24rpx;
				color: #999;
			}
			
			.activi-txt{
				position: absolute;
				left: -1px;
				top: -1px;
				background-color: #fa5051;
				color: #fff;
				font-size: 20rpx;
				padding: 5rpx 10rpx;
				border-radius: 10rpx 0 10rpx 0;
			}
		}
		
		.active{
			background-color: #f5ebe2;
			border: 1px solid #dabca5;
		}
	}
	
	.pay-btn{
		padding: 20rpx;
		border-radius: 100rpx;
		background-image: linear-gradient(to right ,#f4e4cb,#e9caad,#dfb492);
		color: #3d3f42;
		margin-top: 30rpx;
		text-align: center;
	}
}

.agreement{
	font-size: 24rpx;
	color: #999;
	margin: 30rpx 0;
	navigator{
		display: inline-block;
		color: #2B85E4;
	}
}

// 权益
.benefit-wrap{
	margin: 30rpx;
	border-radius: 20rpx;
	background-color: #fff;
	.b-head{
		background-color: #3d3f42;
		color: #e2bda0;
		padding: 20rpx;
		border-radius: 20rpx 20rpx 0 0;
	}
	
	.grid-wrap{
		margin-top: 30rpx;
		display: grid;
		grid-template-columns: repeat(2,1fr);
		grid-gap: 60rpx 20rpx;
		padding: 20rpx;
		.benefit-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			image{
				width: 100rpx;
				height: 100rpx;
				margin-bottom: 10rpx;
			}
			.title{
				color: #000;
				font-size: 28rpx;
			}
			.sub{
				color: #616161;
				font-size: 20rpx;
			}
		}
	}
}
</style>
