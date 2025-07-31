<template>
	<view class="template-login">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed alpha customBack>
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left'></text>
				<text class='icon tn-icon-home-capsule-fill'></text>
			</view>
		</tn-nav-bar>

		<view class="login">
			<!-- 顶部背景图片-->
			<view class="login__bg login__bg--top">
				<image class="bg" src="https://resource.tuniaokj.com/images/login/1/login_top2.jpg" mode="widthFix">
				</image>
			</view>
			<view class="login__bg login__bg--top">
				<image class="rocket rocket-sussuspension"
					src="https://resource.tuniaokj.com/images/login/1/login_top3.png" mode="widthFix"></image>
			</view>

			<view class="login__wrapper">
				<!-- 登录/注册切换 -->
				<view
					class="login__mode tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center">
					<view class="login__mode__item tn-flex-1"
						:class="[{'login__mode__item--active': currentModeIndex === 0}]" @tap.stop="modeSwitch(0)">
						登录
					</view>
					<view class="login__mode__item tn-flex-1"
						:class="[{'login__mode__item--active': currentModeIndex === 1}]" @tap.stop="modeSwitch(1)">
						注册
					</view>

					<!-- 滑块-->
					<view class="login__mode__slider tn-cool-bg-color-15--reverse" :style="[modeSliderStyle]"></view>
				</view>

				<!-- 输入框内容-->
				<view class="login__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
					<!-- 登录 -->
					<block v-if="currentModeIndex === 0">
						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-moon"></view>
							</view>
							<view class="login__info__item__input__content">
								<input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入登录账号"
									v-model="loginAccount" />
							</view>
						</view>

						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-lock"></view>
							</view>
							<view class="login__info__item__input__content">
								<input :password="!showPassword" placeholder-class="input-placeholder"
									placeholder="请输入登录密码" v-model="loginPassword" />
							</view>
							<view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
								<view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
							</view>
						</view>
					</block>
					<!-- 注册 -->
					<block v-if="currentModeIndex === 1">
						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-moon"></view>
							</view>
							<view class="login__info__item__input__content">
								<input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入注册邮箱" />
							</view>
						</view>

						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-code"></view>
							</view>
							<view
								class="login__info__item__input__content login__info__item__input__content--verify-code">
								<input placeholder-class="input-placeholder" placeholder="请输入验证码" />
							</view>
							<view class="login__info__item__input__right-verify-code" @tap.stop="getCode">
								<tn-button backgroundColor="#01BEFF" fontColor="#FFFFFF" size="sm" padding="5rpx 10rpx"
									width="100%" shape="round">{{ tips }}</tn-button>
							</view>
						</view>

						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-lock"></view>
							</view>
							<view class="login__info__item__input__content">
								<input :password="!showPassword" placeholder-class="input-placeholder"
									placeholder="请输入登录密码" />
							</view>
							<view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
								<view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
							</view>
						</view>
					</block>

					<view class="">

					</view>

					<view class="tn-flex login__info__item__button">
						<view class="tn-flex-1 justify-content-item tn-text-center">
							<tn-button v-if="currentModeIndex === 0" shape="round"
								backgroundColor="tn-cool-bg-color-7--reverse" padding="40rpx 0" width="100%" shadow
								fontBold @click="login()">
								<text class="tn-color-white" hover-class="tn-hover" :hover-stay-time="150">
									登 录
								</text>
							</tn-button>
							<tn-button v-if="currentModeIndex === 1" shape="round"
								backgroundColor="tn-cool-bg-color-7--reverse" padding="40rpx 0" width="100%" shadow
								fontBold>
								<text class="tn-color-white" hover-class="tn-hover" :hover-stay-time="150">
									注 册
								</text>
							</tn-button>
						</view>
					</view>

					<!-- <view class="login__info__item__button tn-cool-bg-color-7--reverse" hover-class="tn-hover" :hover-stay-time="150">{{ currentModeIndex === 0 ? '登录' : '注册'}}</view> -->

					<view v-if="currentModeIndex === 0" class="login__info__item__tips">忘记密码?</view>
				</view>

				<!-- 其他登录方式 -->
				<view class="login__way tn-flex tn-flex-col-center tn-flex-row-center">
					<view class="tn-padding-sm tn-margin-xs">
						<view
							class="login__way__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-green tn-color-white">
							<view class="tn-icon-wechat-fill"></view>
						</view>
					</view>
					<view class="tn-padding-sm tn-margin-xs">
						<view
							class="login__way__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-red tn-color-white">
							<view class="tn-icon-sina"></view>
						</view>
					</view>
					<view class="tn-padding-sm tn-margin-xs">
						<view
							class="login__way__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-blue tn-color-white">
							<view class="tn-icon-qq"></view>
						</view>
					</view>
				</view>
			</view>


			<!-- 底部背景图片-->
			<view class="login__bg login__bg--bottom">
				<image src="https://resource.tuniaokj.com/images/login/1/login_bottom_bg.jpg" mode="widthFix"></image>
			</view>
		</view>

		<!-- 验证码倒计时 -->
		<tn-verification-code ref="code" uniqueKey="login-demo-1" :seconds="60" @change="codeChange">
		</tn-verification-code>
	</view>
</template>

<script>
	import request from '@/common/request.js';

	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'templateLogin',
		mixins: [template_page_mixin],
		data() {
			return {
				loginAccount: '', // 用于存储登录账号的变量
				loginPassword: '', // 用于存储登录密码的变量
				// 当前选中的模式
				currentModeIndex: 0,
				// 模式选中滑块
				modeSliderStyle: {
					left: 0
				},
				// 是否显示密码
				showPassword: false,
				// 倒计时提示文字
				tips: '获取验证码'
			}
		},
		watch: {
			currentModeIndex(value) {
				const sliderWidth = uni.upx2px(476 / 2)
				this.modeSliderStyle.left = `${sliderWidth * value}px`
			}
		},
		methods: {
			login() {
				const datas = {
					username: this.loginAccount,
					password: this.loginPassword
				};
				let vm = this;
				request('/Websuser/login', {
					method: 'POST',
					params: datas // 将用户名和密码作为请求体数据发送
				}).then(response => {
					console.log('登录成功', response);
					if (response.code = 200) {
						// 可以在这里处理登录成功后的逻辑，比如跳转到其他页面
						// 存储用户数据
						// #ifdef MP-WEIXIN
						wx.setStorageSync('access-user', response.data);
						// #endif
						// #ifndef MP-WEIXIN
						localStorage.setItem('access-user', JSON.stringify(response.data));
						// #endif
						console.log('跳转');
						// 例如使用 uniapp 的页面跳转函数
						// #ifdef MP-WEIXIN
						// let pages = getCurrentPages(); // 当前页面
						// let beforePage = pages[pages.length - 2];
						// uni.navigateBack({
						// 	delta: 1,
						// 	success: function() {
						// 		console.log(beforePage)
						// 		beforePage.$vm.getData(); // 执行前一个页面的init 来实现刷新
						// 	}
						// });
						wx.reLaunch({
							url: '/pages/index/index', // 当前页面的路径
						})
						// #endif
						// #ifndef MP-WEIXIN
						// 在跳转后触发全局事件
						uni.redirectTo({
							url: '/',
							success: function() {
								// 在目标页面监听全局事件并执行逻辑
								uni.$emit('pageShow');
							}
						});
						// #endif

					} else {
						console.error('登录失败', error);
					}

				}).catch(error => {
					console.error('登录失败', error);
					// 可以在这里处理登录失败的情况，比如显示错误提示信息
				});
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
			// 切换模式
			modeSwitch(index) {
				this.currentModeIndex = index
				this.showPassword = false
			},
			// 获取验证码
			getCode() {
				if (this.$refs.code.canGetCode) {
					this.$t.message.loading('正在获取验证码')
					setTimeout(() => {
						this.$t.message.closeLoading()
						this.$t.message.toast('验证码已经发送')
						// 通知组件开始计时
						this.$refs.code.start()
					}, 2000)
				} else {
					this.$t.message.toast(this.$refs.code.secNum + '秒后再重试')
				}
			},
			// 获取验证码倒计时被修改
			codeChange(event) {
				this.tips = event
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 胶囊*/
	.tn-custom-nav-bar__back {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.15);
		border-radius: 1000rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.5);
		color: #FFFFFF;
		font-size: 18px;

		.icon {
			display: block;
			flex: 1;
			margin: auto;
			text-align: center;
		}

		&:before {
			content: " ";
			width: 1rpx;
			height: 110%;
			position: absolute;
			top: 22.5%;
			left: 0;
			right: 0;
			margin: auto;
			transform: scale(0.5);
			transform-origin: 0 0;
			pointer-events: none;
			box-sizing: border-box;
			opacity: 0.7;
			background-color: #FFFFFF;
		}
	}

	/* 悬浮 */
	.rocket-sussuspension {
		animation: suspension 3s ease-in-out infinite;
	}

	@keyframes suspension {

		0%,
		100% {
			transform: translate(0, 0);
		}

		50% {
			transform: translate(-0.8rem, 1rem);
		}
	}

	.login {
		position: relative;
		height: 100%;
		z-index: 1;

		/* 背景图片 start */
		&__bg {
			z-index: -1;
			position: fixed;

			&--top {
				top: 0;
				left: 0;
				right: 0;
				width: 100%;

				.bg {
					width: 750rpx;
					will-change: transform;
				}

				.rocket {
					margin: 50rpx 28%;
					width: 400rpx;
					will-change: transform;
				}
			}

			&--bottom {
				bottom: -10rpx;
				left: 0;
				right: 0;
				width: 100%;
				// height: 144px;
				// margin-bottom: env(safe-area-inset-bottom);

				image {
					width: 750rpx;
					will-change: transform;
				}
			}
		}

		/* 背景图片 end */

		/* 内容 start */
		&__wrapper {
			margin-top: 403rpx;
			width: 100%;
		}

		/* 切换 start */
		&__mode {
			position: relative;
			margin: 0 auto;
			width: 476rpx;
			height: 77rpx;
			background-color: rgba(255, 255, 255, 0.9);
			box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
			border-radius: 39rpx;

			&__item {
				height: 77rpx;
				width: 100%;
				line-height: 77rpx;
				text-align: center;
				font-size: 31rpx;
				color: #78909C;
				letter-spacing: 1em;
				text-indent: 1em;
				z-index: 2;
				transition: all 0.4s;

				&--active {
					font-weight: bold;
					color: #FFFFFF;
				}
			}

			&__slider {
				position: absolute;
				height: inherit;
				width: calc(476rpx / 2);
				border-radius: inherit;
				box-shadow: 0rpx 18rpx 72rpx 18rpx rgba(0, 195, 255, 0.1);
				z-index: 1;
				transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			}
		}

		/* 切换 end */

		/* 登录注册信息 start */
		&__info {
			margin: 0 30rpx;
			margin-top: 105rpx;
			padding: 30rpx 51rpx;
			padding-bottom: 0;
			border-radius: 20rpx;
			background-color: rgba(255, 255, 255, 0.9);
			box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.07);

			&__item {

				&__input {
					margin-top: 59rpx;
					width: 100%;
					height: 77rpx;
					border: 1rpx solid #C6D1D8;
					border-radius: 39rpx;

					&__left-icon {
						width: 10%;
						font-size: 44rpx;
						margin-left: 20rpx;
						color: #78909C;
					}

					&__content {
						width: 80%;
						padding-left: 10rpx;

						&--verify-code {
							width: 56%;
						}

						input {
							font-size: 30rpx;
							color: #78909C;
							// letter-spacing: 0.1em;
						}
					}

					&__right-icon {
						width: 10%;
						font-size: 44rpx;
						margin-right: 20rpx;
						color: #78909C;
					}

					&__right-verify-code {
						width: 34%;
						margin-right: 20rpx;
					}
				}

				&__button {
					margin-top: 75rpx;
					margin-bottom: 39rpx;
					width: 100%;
					letter-spacing: 0.5em;
				}

				&__tips {
					margin: 30rpx 0;
					color: #AAAAAA;
				}
			}
		}

		/* 登录注册信息 end */

		/* 登录方式切换 start */
		&__way {
			margin: 0 auto;
			margin-top: 110rpx;

			&__item {
				&--icon {
					width: 77rpx;
					height: 77rpx;
					font-size: 50rpx;
					border-radius: 100rpx;
					margin-bottom: 18rpx;
					position: relative;
					z-index: 1;

					&::after {
						content: " ";
						position: absolute;
						z-index: -1;
						width: 100%;
						height: 100%;
						left: 0;
						bottom: 0;
						border-radius: inherit;
						opacity: 1;
						transform: scale(1, 1);
						background-size: 100% 100%;
						background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg5.png);
					}
				}
			}
		}

		/* 登录方式切换 end */
		/* 内容 end */

	}

	/deep/.input-placeholder {
		font-size: 30rpx;
		color: #C6D1D8;
	}
</style>