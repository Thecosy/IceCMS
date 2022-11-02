<template>
	<view class="index">

		<u-alert title="绑定邮箱才能找回密码哦!别忘了绑定哦!" type="success"></u-alert>
		<u-input class="mt20" placeholder="请输入你的邮箱" v-model="qqyxs" prefixIcon="email">
			<template slot="suffix">
				<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取"></u-code>
				<u-button @tap="yzms()" :text="tips" type="success" size="small" color="#50A1FF"></u-button>
			</template>
		</u-input>
		<u--input class="mt20" placeholder="请输入获取的验证码" clearable v-model="yzm" prefixIcon="fingerprint"></u--input>
		<u-button class="mt20" type="primary" text="绑定邮箱" color="#50A1FF" @click="emails()"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yzm:"",
				qqyxs:"",
				tips: ""
			}
		},
		
		methods: {
			codeChange(text) {
				this.tips = text;
				console.log(this.email)
			},
			yzms:function(){
				uni.request({
					url: 'http://易如意后台域名/api.php?act=afcrc' + '&app=10000' + '&email=' + this.qqyxs + '&type=bind',
					success: (res) => {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					},
					fail: (res) => {
						// console.log(res.data);	
					}
				});
			},
			emails(){
				let token= uni.getStorageSync('Token');
				console.log("用户的token是"+token);
				if(token!==null&&token!==''){
					uni.request({
						url: 'http://易如意后台域名/api.php?act=email_bind' + '&app=10000'+ '&token=' + token + '&email='+ this.qqyxs +'&crc=' + this.yzm,
						success: (res) => {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						},
						fail: (res) => {
						}
					});
				}else{
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
