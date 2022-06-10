<template>
	<view class="index">
		<view class="sm"></view>
		<u-alert title="修改你的昵称，用户名哦!" type="success"></u-alert>
		<u--input class="mt20" placeholder="请输入昵称" clearable v-model="nic" prefixIcon="account"></u--input>
		<u-button class="mt20" type="primary" text="修改昵称" color="#50A1FF" @click="nics()"></u-button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				nic: ""
			}
		},
		methods: {
			nics() {
				var nic = this.nic.toString();
				console.log(nic)
				let token = uni.getStorageSync('Token');
				console.log("用户的token是" + token);
				if (token !== null && token !== '') {
					uni.request({
						url: 'http://易如意后台域名/api.php?act=alter_name' + '&app=10000' + '&token=' +
							token + '&name=' + nic,
						success: (res) => {
							console.log(res.data)
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						},
						fail: (res) => {	
						}
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
