<template>
	<view class="index">
		<u-alert title="绑定邮箱才能找回密码哦!下次别忘了!" type="success"></u-alert>
		<u-input class="mt20" placeholder="请输入你的邮箱" v-model="email" prefixIcon="email">
			<template slot="suffix">
				<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取"></u-code>
				<u-button @tap="nics()" :text="tips" type="success" size="small" color="#50A1FF"></u-button>
			</template>
		</u-input>
		<u--input class="mt20" placeholder="请输入获取的验证码" clearable v-model="yzm" prefixIcon="fingerprint"></u--input>
		<u--input class="mt20" placeholder="请输入新密码" pawssword clearable v-model="newmm" :maxlength="18"
			prefixIcon="lock"></u--input>
		<u--input class="mt20" placeholder="请再次输入新密码" pawssword clearable v-model="newmm1" :maxlength="18"
			prefixIcon="lock"></u--input>
		<u-button class="mt20" type="primary" text="修改密码" color="#50A1FF" @click="changes()"></u-button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				email: "",
				yzm: "",
				newmm: "",
				newmm1: "",
				tips: ''
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
				console.log(this.email)
			},
			nics() {
				if (this.$refs.uCode.canGetCode) {
					uni.request({
						url: 'http://易如意后台域名/api.php?act=afcrc' + '&app=10000' + '&email=' + this
							.email + '&type=seek',
						success: (res) => {
							// 这里此提示会被this.start()方法中的提示覆盖
							uni.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						},
						fail: (res) => {
							// console.log(res.data);	
						}
					});
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			changes: function() {
				if (this.newmm === this.newmm1) {
					uni.request({
						url: 'http://易如意后台域名/api.php?act=seek_pass' + '&app=10000' + '&email=' +
							this.email + '&crc=' + this.yzm + '&newpassword=' + this.newmm,
						success: (res) => {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							uni.navigateTo({
								url: 'login'
							});
						},
						fail: (res) => {}
					});
				} else if (this.newmm1 == '') {
					uni.showToast({
						title: '请输入两次密码！！',
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: '两次密码输入不一致！！！',
						icon: 'none'
					})
				}
			}
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
