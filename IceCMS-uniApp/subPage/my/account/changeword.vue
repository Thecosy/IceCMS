<template>
	<view class="index">
		<u-alert title="请牢记新密码哦!任何人都不要告诉哦!!!" type="success"></u-alert>
		<u--input class="mt20" placeholder="请输入旧密码" pawssword clearable v-model="old" prefixIcon="lock"></u--input>
		<u--input class="mt20" placeholder="请输入新密码" pawssword clearable v-model="news" :maxlength="18" prefixIcon="lock">
		</u--input>
		<u--input class="mt20" placeholder="请再次输入新密码" pawssword clearable v-model="news1" :maxlength="18"
			prefixIcon="lock"></u--input>
		<u-button class="mt20" type="primary" text="修改密码" color="#50A1FF" @click="pass()"></u-button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				old: "",
				news: "",
				news1: ""
			}
		},
		methods: {
			pass() {
				// console.log('111')
				let token = uni.getStorageSync('Token');
				console.log("用户的token是" + token);
				if (token !== null && token !== '') {
					if(this.news===this.news1){
						uni.request({
							url: 'http://易如意后台域名/api.php?act=get_info' + '&app=10000' + '&token=' +
								token,
							method: 'GET',
							data: {},
							success: res => {
								console.log("获取的用户信息是" + JSON.stringify(res.data.msg.user))
								uni.request({
									url: 'http://易如意后台域名/api.php?act=alter_pass' +
										'&app=10000' + '&user=' + res.data.msg.user + '&password=' + this
										.old + '&newpassword=' + this.news,
									success: (res) => {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										});
										uni.setStorageSync('SET_ISLOGIN', false);
										uni.removeStorageSync('Token');
										uni.navigateTo({
											url: "login"
										})
									},
									fail: (res) => {
										// console.log(res.data);	
									}
								});
							},
							fail: () => {},
							complete: () => {}
						});
					}else if(this.news1==''){
						uni.showToast({
							title:'请输入两次密码！！',
							icon:'none'
						})
					}else{
						uni.showToast({
							title:'两次密码输入不一致！！！',
							icon:'none'
						})						
					}
				} else {
					this.user = ''
					this.isLogin = false
				};
			},
		}
	}
</script>
<style>
	.index {
		margin: 30rpx;
	}

	.mt20 {
		margin-top: 20rpx;
		height: 60rpx;
	}
</style>
