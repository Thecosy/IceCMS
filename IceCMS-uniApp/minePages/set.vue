<template>
	<view class="template-set">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed alpha customBack>
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left-arrow'></text>
			</view>
		</tn-nav-bar>

		<view class="tn-margin-top" :style="{paddingTop: vuex_custom_bar_height + 'px'}">


			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding" @click="tn('/minePages/avatar')">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						用户头像
					</view>
					<view class="tn-color-gray tn-padding-top-xs">
						有趣的头像，百里挑一
					</view>
				</view>
				<view class="justify-content-item tn-text-lg tn-color-grey">
					<view class="tn-icon-right tn-padding-top"></view>
				</view>
			</view>

			<view class="tn-flex tn-flex-row-between tn-strip-bottom tn-padding" @click="tn('/minePages/safety')">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						账号安全
					</view>
					<view class="tn-color-gray tn-padding-top-xs">
						修改用户昵称、密码
					</view>
				</view>
				<view class="justify-content-item tn-text-lg tn-color-grey">
					<view class="tn-icon-right tn-padding-top"></view>
				</view>
			</view>

			<view class="tn-flex tn-flex-row-between tn-strip-bottom-min tn-padding tn-margin-top-xs"
				v-for="(item, index) in setList" :key="index" @click="tn(item.url)">
				<view class="justify-content-item">
					<view class="tn-text-bold tn-text-lg">
						{{ item.title }}
					</view>
				</view>
				<view class="justify-content-item tn-text-lg tn-color-grey">
					<view class="tn-icon-right"></view>
				</view>
			</view>


			<!-- 悬浮按钮-->
			<view class="tn-flex  tn-footerfixed">
				<view class="tn-flex-1 justify-content-item tn-margin-sm tn-text-center" @click="loginOut()">
					<tn-button shape="round" backgroundColor="tn-cool-bg-color-15" padding="40rpx 0" width="60%" shadow
						fontBold>
						<!-- <text class="tn-icon-light tn-padding-right-xs tn-color-black"></text> -->
						<text class="tn-color-white">退出登录</text>
						<!-- <text class="tn-icon-light tn-padding-left-xs tn-color-black"></text> -->
					</tn-button>
				</view>
			</view>

		</view>


	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateSet',
		mixins: [template_page_mixin],
		data() {
			return {
				setList: [{
						title: "版权所属",
						url: "/minePages/content",
					},
					{
						title: "使用协议",
						url: "/minePages/content",
					},
					{
						title: "隐私政策",
						url: "/minePages/content",
					},
					{
						title: "帮助中心",
						url: "/minePages/help",
					},
					{
						title: "版本更新",
						url: "/minePages/version",
					}
				]
			}
		},
		methods: {
			loginOut() {
				// 清除本地存储中的登录信息
				// #ifdef MP-WEIXIN
				wx.removeStorageSync('access-user');
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
				localStorage.removeItem('access-user');
				// 可以执行其他登出相关的操作，比如重定向到登录页面
				// 例如使用 uniapp 的页面跳转函数
				// 在跳转后触发全局事件
				uni.reLaunch({
					url: '/',
					success: function() {
						// 在目标页面监听全局事件并执行逻辑
						uni.$emit('pageShow');
					}
				});
				// #endif

				console.log('用户已登出');
			},
			tn(url) {
				try {
					uni.navigateTo({
						url,
					});
				} catch (e) {
					console.error(e);
					uni.showToast({
						title: "跳转失败",
						icon: "none",
						mask: true,
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 胶囊*/
	.tn-custom-nav-bar__back {
		width: 60%;
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

	}


	/* 间隔线 start*/
	.tn-strip-bottom-min {
		width: 100%;
		border-bottom: 1rpx solid #F8F9FB;
	}

	.tn-strip-bottom {
		width: 100%;
		border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
	}

	/* 间隔线 end*/



	/* 底部悬浮按钮 start*/
	.tn-tabbar-height {
		min-height: 100rpx;
		height: calc(120rpx + env(safe-area-inset-bottom) / 2);
	}

	.tn-footerfixed {
		position: fixed;
		width: 100%;
		bottom: calc(30rpx + env(safe-area-inset-bottom));
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);

	}

	/* 底部悬浮按钮 end*/
</style>