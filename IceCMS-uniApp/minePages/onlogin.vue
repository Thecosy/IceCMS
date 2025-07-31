<template>
	<view class="container">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed :bottomShadow="false" backTitle=" ">
		  <view class="" @click="showModal">
		    <text class="tn-text-lg">登录</text>
		    <text class="tn-text-xl tn-padding-left-sm tn-icon-group-circle"></text>  
		  </view>
		</tn-nav-bar>
		<!-- 返回按钮 -->
		<view class="back-button" @click="goBack" :style="{ height: getTopMenuHeight() + 'px' }">
			<uni-icons type="left" size="24" class=""></uni-icons>
		</view>
		<!-- 手机号提示 -->
		<view class="phone-number dp-c">
			<text class="login-old">登录后，体验更多功能</text>
			<text class="masked-number">IceCMS</text>
			<text class="verification-info">内容管理系统</text>
		</view>

		<!-- 一键登录按钮 -->
		<view class="button-container">
			<button class="login-button" @click="login">一键登录</button>
			<button class="other-login-button" @click="otherLogin">取消</button>
		</view>

		<!-- 用户协议和隐私政策 -->
		<view class="agreement ">
			<!-- <checkbox class="round-checkbox"></checkbox> -->
			<view class="custom-checkbox" @click="toggleCheckbox" :class="{ checked: isChecked }"></view>
			<!-- 自定义复选框 -->
			<text style="margin-left: 10rpx;">已阅读并同意</text>
			<text url="/path-to-agreement" class="link">用户协议</text>
			<text>和</text>
			<text url="/path-to-privacy-policy" class="link">隐私政策</text>
		</view>

		<!-- 底部图标 -->
	<!-- 	<view class="icon-container">
			<image class="icon" src="/static/icons/toutiao.png" />
			<image class="icon" src="/static/icons/apple.png" />
			<view class="icon dp-a">
				<image style="width: 40rpx;height: 8rpx;" src="/static/icons/other.png" />
			</view>
		</view> -->
	</view>
</template>

<script>
	import request from '@/common/request.js';
	export default {
		data() {
			return {
				isChecked: false ,// 添加复选框状态
				scene: '',
			};
		},
		created() {
			const obj = uni.getLaunchOptionsSync();
			if (obj.query != null && Object.keys(obj.query).length > 0) {
				console.log('启动小程序 query', obj.query.scene);
				this.scene = obj.query.scene;

			}
		},
		methods: {
			toggleCheckbox() {
				this.isChecked = !this.isChecked; // 切换复选框状态
			},
			goBack() {
				// 返回上一页的逻辑
				uni.navigateBack();
			},
			login() {
				// 一键登录逻辑
				console.log("一键登录");
				    // 检查复选框是否已勾选
				    if (!this.isChecked) {
				        uni.showToast({
				            title: '请先阅读并同意用户协议和隐私政策',
				            icon: 'none'
				        });
				        return; // 阻止后续操作
				    }
				    // 如果复选框已选中，继续执行操作
				    console.log("执行操作");
					this.weChatLogin(this.scene, {
						profile: 'user_profile',
						name: 'user_name',
						gender: 'user_gender'
					});
				    uni.reLaunch({
				        url: '/pages/index/index'
				    })
			},
			otherLogin() {
				// 其他登录方式逻辑
				console.log("返回上一级页面");
				uni.exitMiniProgram();
				uni.reLaunch({
				    url: '/pages/index/index'
				})
			},
			weChatLogin(scene, user) {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log("dtrd");
						if (res.code) {
							console.log(res.code)
							request(`/User/CreateWeChatLogin?scene=${scene}&code=${res.code}`, {
								method: 'POST',
							}).then(response => {
								// this.data = response;
							}).catch(error => {
								console.error('Request failed', error);
							});
						} else {
							console.log('登录失败！' + res.errMsg);
						}
					},
					fail: (err) => {
						console.log('uni.login调用失败', err);
					}
				})
			},
			getTopMenuHeight() {
				// 获取顶部菜单高度的方法
				let topMenuHeight = 0;
				// 小程序环境
				if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
					topMenuHeight = uni.getSystemInfoSync().statusBarHeight + 44; // statusBarHeight + 导航栏高度
				}
				// app环境
				else {
					topMenuHeight = uni.getSystemInfoSync().statusBarHeight + 44; // statusBarHeight + 导航栏高度
				}
				return topMenuHeight;
			}
		}
	}
</script>
<style lang="scss">
	.dp-c {
		display: flex;
		flex-direction: column;
	}

	.dp-a {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		background-color: #fff;
		height: 100vh;
	}

	.back-button {
		display: flex;
		padding-top: 54px;
		padding-left: 14px;
	}



	.phone-number {
		margin-top: 15%;
		text-align: center;
	}

	.masked-number {
		font-size: 68rpx;
		font-weight: 400;
	}

	.login-old {
		color: #888;
		margin-top: 20rpx;
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}

	.verification-info {
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #888;
		font-weight: 400;
	}

	.button-container {
		margin-top: 80rpx;
		margin-left: 80rpx;
		margin-right: 80rpx;
		margin-bottom: 40rpx;
	}

	.login-button {
		background-color: #08A0F7;
		color: white;
		/* padding: 24rpx 0; */
		border-radius: 20rpx;
		text-align: center;
		font-size: 32rpx;
		margin-bottom: 20rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-weight: bold;
	}

	.other-login-button {
		border: 2rpx solid #888;
		border-radius: 20rpx;
		text-align: center;
		font-size: 32rpx;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #fff;
	}

	.agreement {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #888;
		padding-left: 80rpx;
	}

	.agreement .link {
		color: #007aff;
		margin: 0 10rpx;
	}

	.agreement .custom-checkbox {
		width: 30rpx;
		/* 设置复选框宽度 */
		height: 30rpx;
		/* 设置复选框高度 */
		border-radius: 50%;
		/* 使复选框圆形 */
		border: 2rpx solid #888;
		/* 边框颜色 */
		background-color: transparent;
		/* 默认背景透明 */
		cursor: pointer;
		/* 鼠标指针样式 */
		transition: background-color 0.3s;
		/* 背景颜色过渡效果 */
	}

	.agreement .custom-checkbox.checked {
		background-color: #333;
		/* 选中时的背景颜色 */
	}

	.icon-container {
		width: 100%;
		position: fixed;
		bottom: 100rpx;
		display: flex;
		justify-content: center;
		text-align: center;
		margin-top: auto;
		padding-bottom: 40rpx;
	}

	.icon {
		width: 80rpx;
		height: 80rpx;
		margin: 0 20rpx;
		border: 2rpx solid #ececec;
		border-radius: 90rpx;
	}
</style>