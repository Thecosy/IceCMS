<template>
	<view class="index">
		<u-alert title="请输入你购买的卡密哦!" type="success"></u-alert>
		<u--input class="mt20" placeholder="请输入购买的卡密" clearable v-model="kami" prefixIcon="fingerprint"></u--input>
		<u-button class="mt20" type="primary" text="兑换会员" color="#50A1FF" @click="card()"></u-button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				kami: "",
			}
		},
		methods: {
			card() {
				console.log(this.kami);
				let token = uni.getStorageSync('Token');
				// console.log("用户的token是"+token);
				if (token !== null && token !== '') {
					uni.showLoading({
						title: "兑换中..."
					});
					uni.request({
						url: 'http://易如意后台域名/api.php?act=get_info' + '&app=10000' + '&token=' +
							token,
						method: 'GET',
						data: {},
						success: res => {
							console.log("获取的用户信息是" + JSON.stringify(res.data.msg.user))
							uni.request({
								url: 'http://易如意后台域名/api.php?act=card' + '&app=10000' +
									'&account=' + res.data.msg.user + '&kami=' + this.kami,
								success: (res) => {
									if (res.data.code == 200) {
										uni.hideLoading();
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										});
									} else {
										uni.hideLoading();
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										})
									}
								},
								fail: (res) => {
									// console.log(res.data);
									console.log(res.data);
									uni.showToast({
										title: '服务器错误！',
										icon: 'none'
									})
								}
							});
						},
						fail: (res) => {
							console.log(res.data);
							uni.showToast({
								title: '服务器错误！',
								icon: 'none'
							})
						},
						complete: () => {}
					});
				} else {
					this.user = ''
					this.isLogin = false
				};
			},
		}
	}
</script>
<style>
	.mt20 {
		margin-top: 20rpx;
		height: 60rpx;
	}

	.index {
		margin: 30rpx;
	}
</style>
