<template>
	<view class="template-news tn-safe-area-inset-bottom">

		<view class="tn-navbg" :style="{height: vuex_custom_bar_height + 'px'}">
			<!-- 顶部自定义导航 -->
			<tn-nav-bar fixed alpha customBack>
				<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
					<text class='icon tn-icon-left'></text>
					<text class='icon tn-icon-home-capsule-fill'></text>
				</view>
			</tn-nav-bar>
		</view>

		<view class="tn-margin-top-xs" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
			<view class="nav_title--wrap">
				<view class="nav_title tn-cool-bg-color-6">
					<!-- <text class="tn-icon-fire tn-padding-right-sm"></text> -->
					{{ articleList.title }}
					<!-- <text class="tn-icon-fire tn-padding-left-sm"></text> -->
				</view>
			</view>
			<!-- #ifndef MP-WEIXIN -->

		<view style="margin-top: 50rpx;" class="news-img tn-padding">
		    <rich-text :nodes="articleList.content"></rich-text>
		</view>
			<!-- #endif-->
			<!-- #ifdef MP-WEIXIN -->
		<view style="margin-top: 50rpx;" class="news-img tn-padding">
		    <rich-text :nodes="articleList.content"></rich-text>
		</view>

			<!-- #endif-->



		</view>

		<view class="tn-margin-top tn-padding-top-sm tn-margin-bottom">
			<view class="see">

				<view class="justify-content-item tn-flex tn-flex-col-center">
					<view style="margin-right: 10rpx;margin-left: 30rpx;">
						<tn-avatar-group :lists="groupList" size="sm"></tn-avatar-group>
					</view>
				</view>
				<view class="tn-margin-right">
					<text class='tn-color-grey tn-text-df tn-margin-right-sm'>{{articleList.hits}} 查看 </text>
					<text class='tn-color-grey tn-text-df'> {{articleList.loveNum}} 点赞</text>
				</view>

			</view>
		</view>

		<!-- 边距间隔 -->
		<view class="tn-strip-bottom"></view>

		<view class="tn-flex tn-flex-row-between">
			<view class="justify-content-item tn-margin tn-text-bold tn-text-xl">
				Ta们都在看
			</view>
			<view class="justify-content-item tn-margin tn-text-lg tn-color-grey" @click="tn('/homePages/hot')">
				<text class="tn-padding-xs">全部</text>
				<text class="tn-icon-topics"></text>
			</view>
		</view>


		<!-- 不建议写时间，因为写了时间，你就要经常更新文章了鸭-->
		<view class="">
			<block v-for="(item, index) in content" :key="index">
				<view class="article-shadow tn-margin">
					<view class="tn-flex">
						<view class="tn-margin-sm tn-padding-top-xs" style="width: 100%;">
							<view class="tn-text-lg tn-text-bold clamp-text-1 tn-text-justify">
								<text class="">{{ item.title }}</text>
							</view>
							<view class="tn-padding-top-xs" style="min-height: 90rpx;">
								<text class="tn-text-df tn-color-gray clamp-text-2 tn-text-justify">
									{{ item.desc }}
								</text>
							</view>
							<view class="tn-flex tn-flex-row-between tn-flex-col-between">
								<view v-for="(label_item,label_index) in item.label" :key="label_index"
									style="transform: translate(0rpx,6rpx);"
									class="justify-content-item tn-tag-content__item tn-margin-right-xs tn-round tn-text-sm tn-text-bold"
									:class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
									<text class="tn-tag-content__item--prefix">#</text> {{ label_item }}
								</view>
								<view class="justify-content-item tn-color-gray tn-text-center tn-color-gray--disabled"
									style="padding-top: 15rpx;">
									<text class="tn-icon-footprint tn-padding-right-xs tn-text-lg"></text>
									<text class="tn-padding-right tn-text-df">{{ item.collectionCount }}</text>
									<text class="tn-icon-like-lack tn-padding-right-xs tn-text-lg"></text>
									<text class="tn-text-df">{{ item.likeCount }}</text>
								</view>
							</view>
						</view>
						<view class="image-pic tn-margin-sm" :style="'background-image:url(' + item.userAvatar + ')'">
							<view class="image-article">
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>


		<!-- 悬浮按钮-->
		<view class="tn-flex tn-flex-row-between tn-footerfixed">
			<view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
				<tn-button backgroundColor="#00FFC6" padding="40rpx 0" width="90%" shadow fontBold>
					<text class="tn-icon-like-lack tn-padding-right-xs tn-color-black"></text>
					<text class="tn-color-black">点 赞</text>
				</tn-button>
			</view>
			<view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
				<tn-button backgroundColor="#FFF00D" padding="40rpx 0" width="90%" shadow fontBold open-type="share">
					<text class="tn-icon-share-triangle tn-padding-right-xs tn-color-black"></text>
					<text class="tn-color-black">分 享</text>
				</tn-button>
			</view>
		</view>

		<view class='tn-tabbar-height'></view>

	</view>
</template>

<script>
	import request from '@/common/request.js';
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js';
	export default {
		name: 'TemplateNews',
		mixins: [template_page_mixin],
		data() {
			return {
				getUrl: '',
				groupList: [{
						src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
					},
					{
						src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
					},
					{
						src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
					},
					{
						src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
					},
					{
						src: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg'
					},
				],
				articleList: [],
				content: [{
						userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
						userName: '可我会像',
						date: '2021年12月20日',
						color: 'red',
						label: ['小程序'],
						title: '小程序官网源码，开源欢迎白嫖嗷嗷',
						desc: '小程序前端源码开源，欢迎白嫖嗷嗷，可以的话，插件市场三连支持一下',
						mainImage: 'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 567
						},
						collectionCount: 543,
						commentCount: 543,
						likeCount: 206
					},
					{
						userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
						userName: '可我会像',
						date: '2021年12月20日',
						color: 'brown',
						label: ['工具'],
						title: '小程序任意页面生成二维码',
						desc: '二维码生成器',
						mainImage: 'https://resource.tuniaokj.com/images/shop/card.jpg',
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 129
						},
						collectionCount: 265,
						commentCount: 22,
						likeCount: 62
					}
				],
			}
		},
		onLoad(url) {
			this.getUrl = url.url
			console.log(url.url)
			this.getDataById(this.getUrl)
		},
		created() {},
		methods: {
			getDataById(id) {
				request(`/Mini/getArticleById/` + id, {
					method: 'GET',
				}).then(response => {
					console.log(response);
					this.articleList = response;
				}).catch(error => {
					console.error('Request failed', error);
				});
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
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

	/* 顶部渐变*/
	.tn-navbg {
		background: linear-gradient(-120deg, #F15BB5, #9A5CE5, #01BEFF, #00F5D4);
		/* background: linear-gradient(-120deg,  #9A5CE5, #01BEFF, #00F5D4, #43e97b); */
		/* background: linear-gradient(-120deg,#c471f5, #ec008c, #ff4e50,#f9d423); */
		/* background: linear-gradient(-120deg, #0976ea, #c471f5, #f956b6, #ea7e0a); */
		background-size: 500% 500%;
		animation: gradientBG 15s ease infinite;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
	}

	@keyframes gradientBG {
		0% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0% 50%;
		}
	}

	/* 标题 start */
	.nav_title {
		margin-top: 80rpx;
		padding: 81rpx;
		-webkit-background-clip: text;
		color: transparent;

		&--wrap {
			position: relative;
			display: flex;
			height: 120rpx;
			font-size: 42rpx;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			background-image: url(https://resource.tuniaokj.com/images/title_bg/title00.png);
			background-size: cover;
		}
	}

	/* 标题 end */

	/* 富文本图示意 start */
	.news-img {
		z-index: -1;
		padding-bottom: 40rpx;

		image {
			width: 100%;
			margin: 20rpx 0;
			// height: 3373rpx;
			// z-index: -1;
		}
	}

	/* 资讯主图 start*/
	.image-article {
		border-radius: 8rpx;
		border: 1rpx solid #F8F7F8;
		width: 200rpx;
		height: 200rpx;
		position: relative;
	}

	.image-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border-radius: 10rpx;
	}

	.article-shadow {
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	/* 文字截取*/
	.clamp-text-1 {
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.clamp-text-2 {
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	/* 标签内容 start*/
	.tn-tag-content {
		&__item {
			display: inline-block;
			line-height: 35rpx;
			padding: 7rpx 25rpx 5rpx 25rpx;

			&--prefix {
				padding-right: 10rpx;
			}
		}
	}

	/* 标签内容 end*/

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

	/* 查看*/
	.see {
		display: flex;
		justify-content: space-between;
		padding-top: 10rpx;
		border-radius: 6rpx;
		color: #666;
		line-height: 1.6;
	}

	/* 间隔线 start*/
	.tn-strip-bottom {
		width: 100%;
		border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
	}

	/* 间隔线 end*/
	.news-img {
		padding: 16px;
	}

	.html-text-box p {
		font-size: 16px;
		line-height: 1.6;
		color: #333;
		margin-bottom: 16px;
	}

	.html-text-box h1,
	.html-text-box h2,
	.html-text-box h3,
	.html-text-box h4,
	.html-text-box h5,
	.html-text-box h6 {
		font-weight: bold;
		color: #333;
		margin-top: 24px;
		margin-bottom: 16px;
	}

	.html-text-box h1 {
		font-size: 24px;
	}

	.html-text-box h2 {
		font-size: 20px;
	}

	.html-text-box h3 {
		font-size: 18px;
	}

	.html-text-box a {
		color: #1e90ff;
		text-decoration: underline;
	}

	.html-text-box img {
		max-width: 100%;
		height: auto;
		margin-bottom: 16px;
	}

	.html-text-box ul,
	.html-text-box ol {
		padding-left: 20px;
		margin-bottom: 16px;
	}

	.html-text-box ul li,
	.html-text-box ol li {
		margin-bottom: 8px;
	}

	.html-text-box blockquote {
		border-left: 4px solid #ddd;
		padding-left: 16px;
		color: #666;
		margin: 16px 0;
		font-style: italic;
	}
</style>