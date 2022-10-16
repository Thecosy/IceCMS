<template>
	<view>
		<view class="con-wrap">
			<view class="logo"><image src="../../static/login-registration/ice.png" mode=""></image></view>
			<view class="list" style="margin-top: 20rpx;">
				<view class="list-call">
					<image class="img" src="/static/1.png"></image>
					<input class="sl-input" v-model="loginForm.username" type="text" maxlength="11" placeholder="输入账号" />
				</view>
				<view class="list-call">
					<image class="img" src="/static/2.png"></image>
					<input class="sl-input" v-model="loginForm.password" type="text" maxlength="32" placeholder="输入密码"
						password="true" />
				</view>
			</view>
			<view class="links"><view @click="gotoForgetPassword()">忘记密码？</view><view>|</view><view class="link-highlight" @click="gotoRegistration()">注册账号</view></view>
			<view class="bottom-wrap">
				
				<u-button @click="phoneLoginTest()" class="btn-gz" type="success" size="mini">测试登陆(正式上线请删除)</u-button>
				<q-button style="width: 550rpx;" @click="phoneLogin()">登录</q-button>
				<view class="agreement">
					<radio @click="onAgreement" class="agreement" color="#8687fd" :checked="isAgreement" />
					<text>同意</text>
					<navigator url="/pages/agreement/agreement?id=1" hover-class="none" class="txt">《用户服务协议》</navigator>
					<navigator url="/pages/agreement/agreement?id=2" hover-class="none" class="txt">《隐私政策》</navigator>
				</view>
				<view class="agreenment">
								</view>
				<view class="login-wrap">
					<u-icon style="padding: 8px;" @click="oauth('weixin')" size="65" color="#06c261" name="weixin-circle-fill"></u-icon>
					<u-icon style="padding: 8px;" @click="oauth('qq')" size="65" color="#1DA0FC" name="qq-circle-fill"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import API from '../../utils/api.js';
	export default {
		data() {
			return {
				isAgreement: false,
				flag: false,
				loginForm: {
					username: '', //账号
					password: '',
				},
				agreement: []
			}
		},
		onLoad() {
			this.insweixin();
			this.getAgreement();
		},
		methods: {
			gotoForgetPassword() {
				uni.navigateTo({
					url:'/pages/user/forget'
				})
			},
			gotoRegistration() {
				uni.navigateTo({
					url:'/pages/user/reg'
				})
			},
			getAgreement() {
				this.$H.get("agreement/list").then(res => {
					this.agreement = res.result;
				})
			},
			onAgreement() {
				if (this.isAgreement) {
					this.isAgreement = false;
				} else {
					this.isAgreement = true;
				}
			},
			//测试登陆
			phoneLoginTest() {
				let that = this;
				console.log("ok")
				var TestObj = {
					email:"23339097@qq.com",
					gender:null,
					intro:"这个人很懒，什么都没有留下！",
					name:"天天",
					profile:"https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg",
					token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwic3ViIjoiMyIsImV4cCI6MTY2Mzk0MjkzNywianRpIjoiMjc3ZmUzNmEtYmJhNC00YWYyLWJhNGUtYjYxZTg1MGZlNDkzIn0.urJBTWVWEXdC19Ieys4_itNHoN6qatNAjI7kGo2Qfa8",
					userid:"3",
					};
					console.log(TestObj)
				//拿到token 把token存起来
				that.$store.commit('login', TestObj);
				
				　uni.reLaunch({
				                                           url: "/pages/my/my",
				                                            success: function(e) {
				                                                var page = getCurrentPages()[0];
				                                                if (page == undefined || page == null) return;
				                                                    page.onLoad(); //或者其它操作
				                                                }
				                                        });
			},
			// 手机号登录
			phoneLogin() {
				let that = this;
				if (!this.isAgreement) {
					this.$u.toast('请勾选用户协议');
					return;
				}
				// if (this.phone.length != 11) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '手机号为11位数字'
				// 	});
				// 	return;
				// }
				// if (this.password.length < 6) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '密码不能小于6位'
				// 	});
				// 	return;
				// }
				uni.request({
					url: API.Login(),
					data: this.loginForm,
					 method: 'get',
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							console.log(res.data.data)
							//拿到token 把token存起来
							that.$store.commit('login', res.data.data);
							uni.reLaunch({
							                                           url: "/pages/my/my",
							                                            success: function(e) {
							                                                var page = getCurrentPages()[0];
							                                                if (page == undefined || page == null) return;
							                                                    page.onLoad(); //或者其它操作
							                                                }
							                                        });
					}
					}
				})
				// this.$H.get('user/phoneLogin', {
				// 	phone: this.phone,
				// 	password: this.password
				// }).then(res => {
				// 	if (res.code === 200) {
				// 		that.$store.commit('login', res.result);
				// 		uni.switchTab({
				// 			url: "/pages/index/index"
				// 		})
				// 	}
				// });
				
			},
			// 微信登录
			oauth(value) {
				let that = this;
				if (!this.isAgreement) {
					this.$u.toast('请勾选用户协议');
					return;
				}
				uni.login({
					provider: value,
					success: function(loginRes) {
						console.log(loginRes.authResult);
						// 获取用户信息
						uni.getUserInfo({
							provider: value,
							success: function(res) {
								that.$H.post('user/appWxLogin', {
									openid: res.userInfo.openId,
									username: res.userInfo.nickName,
									avatar: res.userInfo.avatarUrl,
									province: res.userInfo.province,
									city: res.userInfo.city,
									gender: res.userInfo.gender,
									unionid: res.userInfo.unionId
								}).then(res2 => {
									console.log(res2);
									if (res2.code === 200) {
										that.$store.commit('login', res2.result);
										// that.getUserInfo();
										uni.switchTab({
											url: "/pages/index/index"
										})
									} else {
										uni.navigateBack();
									}
								})
							}
						});
					},
					fail(err) {
						console.error('授权登录失败:' + JSON.stringify(err));
					}
				});
			},
			getUserInfo() {
				this.$H.get("user/userInfo").then(res => {
					uni.setStorageSync("userInfo", res.result)
				})
			},
			insweixin() {
				this.flag = plus.runtime.isApplicationExist({
					pname: 'com.tencent.mm',
					action: 'weixin://'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bg-img {
		width: 100vw;
		height: 100vh;
		display: block;
	}

	.list {
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		border-bottom: 1px solid #F5F5F5;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.yzm {
		color: #999;
		font-size: 24rpx;
		line-height: 50rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: auto;
		height: 50rpx;
		border: 1rpx solid #999;
		border-radius: 50rpx;
	}

	.yzms {
		color: #999999 !important;
		border: 1rpx solid #999999;
	}

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-top: 80rpx;
		color: #999;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.agreenment text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}

	.con-wrap {
		position: absolute;
		bottom: 30rpx;
		top: 30rpx;
		width: 100%;
		padding: 30rpx;
		text-align: center;

		.title {
			font-size: 90rpx;
			font-weight: bold;
			margin-top: 150rpx;
		}

		.sub-title {
			font-size: 32rpx;
		}

		.bottom-wrap {
			margin-top: 100rpx;
			display: flex;
		

    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    align-content: center;

			.agreement {
				display: flex;
				align-items: center;
				
				;
				font-size: 24rpx;
			}

			.login-wrap {
				position: absolute;
				bottom: 30rpx;
				width: calc(100% - 60rpx);
			}
		}
	}
</style>

<style lang="scss" scoped>
	$color-primary: #17BEFE;
	.content{
		padding: 100upx;
	}
	.logo{
	    text-align: center;
		image{
		    height: 200upx;
		    width: 200upx;
		    margin: 0 0 60upx;
		}
	}
	.uni-form-item{
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;
		.uni-input{
			font-size: 30upx;
			padding: 7px 0;
		}
	}
	button[type="primary"]{
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}
	.links{
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;
		view{
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}
		.link-highlight{
			color: $color-primary
		}
	}
</style>
