<template>
	<view class="template-index tn-safe-area-inset-bottom">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed alpha :isBack="false" :bottomShadow="false">
			<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
				<!-- 图标logo -->
				<!-- <view class="custom-nav__back" @click="tn('/homePages/about')"> -->
				<view class="custom-nav__back">
					<view class="logo-pic tn-shadow-blur"
						style="background-image:url('https://resource.tuniaokj.com/images/logo/logo2.png')">
						<view class="logo-image">
						</view>
					</view>
					<!-- <view class="tn-icon-left"></view> -->
				</view>
				<!-- 搜索框 -->
				<view class="custom-nav__search tn-flex tn-flex-col-center tn-flex-row-center"
					@click="tn('/homePages/search')">
					<view class="custom-nav__search__box tn-flex tn-flex-col-center tn-flex-row-left"
						style="background-color: rgba(230,230,230,0.3);">
						<view class="custom-nav__search__icon tn-icon-search tn-color-white"></view>
						<view class="custom-nav__search__text tn-padding-left-xs tn-color-white">搜索 IceCMS模板</view>
					</view>
				</view>
			</view>
		</tn-nav-bar>

		<swiper class="card-swiper" @click="tn('/homePages/navigation')" :circular="true" :autoplay="true"
			duration="500" interval="8000" @change="cardSwiper">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item image-banner">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				</view>
				<view class="swiper-item-text">
					<!-- <view class="tn-text-bold tn-color-white" style="font-size: 90rpx;">{{item.title}}</view> -->
					<!-- <view class="tn-color-white tn-padding-top" style="font-size: 30rpx;">{{item.name}}</view> -->
					<!-- 	<view class="tn-text-sm tn-text-bold tn-color-white tn-padding-top-sm tn-padding-bottom-sm">
						{{item.text}}</view> -->
				</view>
			</swiper-item>
		</swiper>
		<view class="indication">
			<block v-for="(item,index) in swiperList" :key="index">
				<view class="spot" :class="cardCur==index?'active':''"></view>
			</block>
		</view>


		<!-- 方式12 start-->
		<view v-if="isAndroid" class="tn-flex tn-margin-xs tn-padding-top-sm">
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/homePages/hot')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-purplered--light tn-color-purplered">
						<view class="tn-icon-fire-fill tn-three"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">热点资讯</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/preferredPages/classify')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-indigo--light tn-color-indigo">
						<view class="tn-icon-flower-fill tn-three"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">商品分类</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/circlePages/business')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-purple--light tn-color-purple">
						<view class="tn-icon-identity-fill tn-three"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">智能名片</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/preferredPages/website')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-orange--light tn-color-orange">
						<view class="tn-icon-star-fill tn-three"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">星选门户</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 方式12 end-->

		<!-- 方式12 start-->
		<view v-else class="tn-flex tn-margin-xs tn-padding-top-sm">
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/homePages/hot')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-purplered--light tn-color-purplered">
						<view class="tn-icon-fire-fill"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">热点资讯</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/preferredPages/classify')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-indigo--light tn-color-indigo">
						<view class="tn-icon-flower-fill"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">商品分类</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/circlePages/business')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-purple--light tn-color-purple">
						<view class="tn-icon-identity-fill"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">智能名片</text>
					</view>
				</view>
			</view>
			<view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/preferredPages/website')">
				<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
					<view
						class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-main-gradient-orange--light tn-color-orange">
						<view class="tn-icon-star-fill"></view>
					</view>
					<view class="tn-color-black tn-text-center">
						<text class="tn-text-ellipsis">星选门户</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 方式12 end-->

		<!-- banner start-->
		<!-- 	<view class="tn-flex tn-flex-wrap tn-padding-xs" @click="tn('/circlePages/advertise')">
			<view class="" style="width: 100%;">
				<view class="image-piccapsule tn-shadow-blur"
					style="background-image:url('https://resource.tuniaokj.com/images/capsule-banner/banner-tnmb.png');">
					<view class="image-capsule">
					</view>
				</view>
			</view>
		</view> -->
		<!-- banner end-->


		<!--    <view class="tn-margin-top">
      <view class="nav_title--wrap">
        <view class="nav_title tn-cool-bg-color-5">
          <text class="tn-icon-copy tn-padding-right-sm"></text>
          推 / 荐 / 博 / 主
          <text class="tn-icon-copy tn-padding-left-sm"></text>
        </view>
      </view>
    </view> -->

		<!-- <view class="tn-flex tn-flex-row-between tn-margin-top" @click="tn('/circlePages/business')">
			<view class="justify-content-item tn-margin tn-text-bold tn-text-xxl">
				推荐名片
			</view>
			<view class="justify-content-item tn-margin tn-text-lg tn-color-grey">
				<text class="tn-padding-xs">全部</text>
				<text class="tn-icon-topics"></text>
			</view>
		</view> -->

		<!-- 	<swiper class="card-swiper2 tn-margin-top-sm" :circular="true" :autoplay="false" duration="500" interval="5000"
			@change="resume">
			<swiper-item v-for="(item,index) in resumeList" :key="index" :class="cardCur2==index?'cur':''"
				@click="tn('/circlePages/king')">
				<view class="swiper-item image-banner">
          <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
        </view>
				<view class="swiper-item1 image-banner tn-shadow-blur"
					:style="'background-image:url('+ item.url + ');width: 660rpx;height: 100%;background-size: cover;border-radius: 15rpx;'">
				</view>
				<view class="swiper-item2 image-banner tn-shadow-blur"
					:style="'background-image:url('+ item.avatar +');width: 120rpx;height: 120rpx;background-size: cover;'">
				</view>
				<view class="swiper-item-text tn-text-shadow-indigo">
					<view class="tn-text-bold tn-color-blue--dark" style="font-size: 45rpx;">{{item.title}}</view>
					<view class="tn-color-blue--dark tn-padding-top-sm">{{item.name}}</view>
					<view class="tn-flex tn-padding-top-xl" style="margin-left: -50rpx;">
						<view class="tn-flex-1 tn-padding-sm tn-margin-right">
							<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
								<view class="">
									<view class="tn-text-xxl tn-color-blue">{{item.hot}}</view>
								</view>
								<view class="tn-margin-top-xs tn-color-grey tn-text-df tn-text-center">
									<text class="tn-icon-fire"></text>
									<text class="tn-padding-left-xs">人气</text>
								</view>
							</view>
						</view>
						<view class="tn-flex-1 tn-padding-sm tn-margin-left tn-margin-right">
							<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
								<view class="">
									<view class="tn-text-xxl tn-color-orange">{{item.share}}</view>
								</view>
								<view class="tn-margin-top-xs tn-color-grey tn-text-df tn-text-center">
									<text class="tn-icon-share-circle"></text>
									<text class="tn-padding-left-xs">分享</text>
								</view>
							</view>
						</view>
						<view class="tn-flex-1 tn-padding-sm tn-margin-left">
							<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
								<view class="">
									<view class="tn-text-xxl tn-color-red">{{item.love}}</view>
								</view>
								<view class="tn-margin-top-xs tn-color-grey tn-text-df tn-text-center">
									<text class="tn-icon-like"></text>
									<text class="tn-padding-left-xs">爱心</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper> -->
		<!--    <view class="indication">
        <block v-for="(item,index) in resumeList" :key="index">
            <view class="spot" :class="cardCur==index?'active':''"></view>
        </block>
    </view> -->


		<view class="">
			<view class="tn-flex tn-flex-row-between" @click="tn('/activityPages/project')">
				<view class="justify-content-item tn-margin tn-text-bold tn-text-xxl">
					热门项目
				</view>
				<view class="justify-content-item tn-margin tn-text-lg tn-color-grey">
					<text class="tn-padding-xs">全部</text>
					<text class="tn-icon-topics"></text>
				</view>
			</view>

			<view class="tn-flex tn-margin-left tn-margin-right tn-margin-top-sm" @click="tn('/circlePages/news')">
				<view class="tn-flex-2">
					<view class="image-pic tn-margin-right tn-shadow-blur"
						style="background-image:url('https://resource.tuniaokj.com/images/content/rodion.jpg')">
						<view class="image-tuniao1">
						</view>
					</view>
				</view>
				<view class="tn-flex-1">
					<view class="image-pic tn-shadow-blur"
						style="background-image:url('https://resource.tuniaokj.com/images/shop/phonecase1.jpg')">
						<view class="image-tuniao2">
						</view>
					</view>
					<view class="image-pic tn-margin-top tn-shadow-blur"
						style="background-image:url('https://resource.tuniaokj.com/images/shop/banner1.jpg')">
						<view class="image-tuniao2">
						</view>
					</view>
				</view>
			</view>


			<view class="tn-flex tn-flex-row-between tn-margin-top">
				<view class="justify-content-item tn-margin tn-text-bold tn-text-xxl">
					业务范围
				</view>
				<view class="justify-content-item tn-margin tn-text-lg tn-color-grey">
					<text class="tn-padding-xs">全部</text>
					<text class="tn-icon-topics"></text>
				</view>
			</view>

			<view
				class="tn-info__container tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-between tn-margin-left tn-margin-right">
				<block v-for="(item, index) in tuniaoData" :key="index">
					<view
						class="tn-info__item tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between tn-color-white tn-shadow-blur"
						:style="'background-color:'+ item.color +';'" @click="tn('/homePages/profession')">
						<view
							class="tn-info__item__left tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
							<!-- <view class="tn-info__item__left--icon tn-flex tn-flex-col-center tn-flex-row-center" :class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
                <view :class="[`tn-icon-${item.icon}`]"></view>
              </view> -->
							<view class="tn-info__item__left__content">
								<view class="tn-info__item__left__content--title tn-text-bold"
									style="font-size: 38rpx;">{{ item.title }}</view>
								<view class="tn-info__item__left__content--data tn-padding-top-xs">
									{{ item.value }}
									<text class="tn-icon-right tn-padding-left-xs"></text>
								</view>
							</view>
						</view>
						<view class="tn-info__item__right">
							<view class="tn-info__item__right--icon">
								<view :class="[`tn-icon-${item.icon}`]"></view>
							</view>
						</view>
						<view class="tn-info__item__bottom">
							<view class='name tn-text-sm tn-color-gray' style="margin-left: -10rpx;">
								<text class="tn-icon-code tn-padding-right-xs" style="opacity: 0;"></text>
							</view>
						</view>
					</view>
				</block>
			</view>

			<view class="" style="margin-top: 50rpx;">
				<view class="tn-flex tn-flex-row-between">
					<view class="justify-content-item tn-margin tn-text-bold tn-text-xl">
						热门资讯
					</view>
					<view class="tn-margin" style="font-size: 50rpx;">
						<text class="tn-icon-data"></text>
					</view>
				</view>
			</view>

			<view class="tn-margin-left tn-text-sm tn-color-gray" style="margin-top: -25rpx;">
				<text>这是今日热门资讯，请查收吖</text>
			</view>


			<!-- 不建议写时间，因为写了时间，你就要经常更新文章了鸭-->
			<view class="">
				<block v-for="(item, index) in news" :key="index">
					<view class="article-shadow tn-margin" @click="tn('/circlePages/news?url='+ item.id)">
						<view class="tn-flex">
							<view class="image-pic tn-margin-sm" :style="'background-image:url(' + item.thumb + ')'">
								<view class="image-article">
								</view>
							</view>
							<view class="tn-margin-sm tn-padding-top-xs" style="width: 100%;">
								<view class="tn-text-lg tn-text-bold clamp-text-1 tn-text-justify">
									{{ item.title }}
								</view>
								<view class="tn-padding-top-xs" style="min-height: 105rpx;">
									<text class="tn-text-df tn-color-gray clamp-text-2 tn-text-justify">
										{{ item.intro }}
									</text>
								</view>
								<view class="tn-flex tn-flex-row-between tn-flex-col-between">
									<view v-for="(keyword_item,keyword_index) in item.keyword" :key="keyword_index"
										class="justify-content-item tn-tag-content__item tn-margin-right tn-round tn-text-sm tn-text-bold"
										:class="[`tn-bg-${item.color}--light tn-color-${item.color}`]">
										<text class="tn-tag-content__item--prefix">#</text> {{ keyword_item }}
									</view>
									<view
										class="justify-content-item tn-color-gray tn-text-center tn-color-gray--disabled"
										style="padding-top: 5rpx;">
										<text class="tn-icon-footprint tn-padding-right-xs tn-text-lg"></text>
										<text class="tn-padding-right tn-text-df">{{ item.commentNum }}</text>
										<text class="tn-icon-like tn-padding-right-xs tn-text-lg"></text>
										<text class="tn-text-df">{{ item.loveNum }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>

		</view>

		<view class='tn-tabbar-height'></view>

	</view>
</template>

<script>
	import request from '@/common/request.js';
	export default {
		name: 'Index',
		data() {
			return {
				news: [{
					thumb: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
					userName: '可我会像',
					date: '2022年5月20日',
					color: 'red',
					keyword: ['小程序'],
					title: '全新出发，新版本已上线，欢迎三连',
					intro: '小程序前端源码，免费开源，欢迎白嫖嗷嗷，可以的话，插件市场三连支持一下',
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
					commentNum: 543,
					loveNum: 206
				}],
				cardCur: 0,
				isAndroid: true,
				swiperList: [],
				cardCur2: 0,
				resumeList: [{
					id: 0,
					type: 'image',
					title: '徐圆圆',
					name: '后端开发计师',
					hot: '1.29W',
					share: '216',
					love: '962',
					avatar: 'https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg',
					url: 'https://resource.tuniaokj.com/images/resume/resume-bg.jpg',
				}, {
					id: 1,
					type: 'image',
					title: 'IceCMS北北',
					name: '后端开发计师',
					hot: '964',
					share: '94',
					love: '186',
					avatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
					url: 'https://resource.tuniaokj.com/images/resume/resume-bg2.jpg',
				}],

				tuniaoData: [{
						title: '后端开发计',
						icon: 'image-text-fill',
						color: '#F33F5A',
						value: '前往咨询'
					},
					{
						title: '小程序',
						icon: 'data-fill',
						color: '#FFC32E',
						value: '前往咨询'
					},
					{
						title: '前端开发',
						icon: 'statistics-fill',
						color: '#954FF6',
						value: '前往咨询'
					},
					{
						title: '其他业务',
						icon: 'bankcard-fill',
						color: '#5177EE',
						value: '前往咨询'
					}
				],
			}
		},
		created() {
			const systemInfo = uni.getSystemInfoSync()
			if (systemInfo.system.toLocaleLowerCase().includes('ios')) {
				this.isAndroid = false
			} else {
				this.isAndroid = true
			}
			const obj = uni.getLaunchOptionsSync();
			if (obj.query != null && Object.keys(obj.query).length > 0) {
				console.log('启动小程序 query');
				this.weChatLogin(obj.query.scene, {
					profile: 'user_profile',
					name: 'user_name',
					gender: 'user_gender'
				});
			}
			request(`/Mini/getCarousel`, {
				method: 'GET',
			}).then(response => {
				console.log(response);
				this.swiperList = response;
			}).catch(error => {
				console.error('Request failed', error);
			});

			request(`/Mini/GetArticleBtmatter`, {
				method: 'GET',
			}).then(response => {


				// 定义一个颜色数组
				const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

				// 遍历每个文章对象，将keyword字符串转换为数组，并增加随机颜色属性
				this.news = response.map(article => {
					// 将关键词字符串转换为数组
					let keywordsArray = article.keyword.split(',').map(keyword => keyword.trim());
					article.keyword = keywordsArray;

					// 增加随机颜色属性
					let randomColor = colors[Math.floor(Math.random() * colors.length)];
					article.color = randomColor;

					return article;
				});
				console.log(this.news);

			}).catch(error => {
				console.error('Request failed', error);
			});
		},
		onLoad() {
			this.getData()

		},
		methods: {
			async getData() {

			},
			weChatLogin(scene, user) {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log("dtrd");
						if (res.code) {
							console.log(res.code)
							request(`/User/CreateWeChatLogin?scene=${scene}&code=${res.code}`, {
								method: 'GET',
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
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// resume
			resume(e) {
				this.cardCur2 = e.detail.current
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
	.template-index {
		max-height: 100vh;
	}

	.tn-tabbar-height {
		min-height: 100rpx;
		height: calc(120rpx + env(safe-area-inset-bottom) / 2);
	}


	/* 轮播视觉差 start */
	.card-swiper {
		height: 540rpx !important;
	}

	.card-swiper swiper-item {
		width: 750rpx !important;
		left: 0rpx;
		box-sizing: border-box;
		// padding: 0rpx 30rpx 90rpx 30rpx;
		overflow: initial;
	}

	.card-swiper swiper-item .swiper-item {
		width: 100%;
		display: block;
		height: 100%;
		transform: scale(1);
		transition: all 0.2s ease-in 0s;
		will-change: transform;
		overflow: hidden;
	}

	.card-swiper swiper-item.cur .swiper-item {
		transform: none;
		transition: all 0.2s ease-in 0s;
		will-change: transform;
	}

	.card-swiper swiper-item .swiper-item-text {
		margin-top: -320rpx;
		text-align: center;
		width: 100%;
		display: block;
		height: 50%;
		border-radius: 10rpx;
		transform: translate(100rpx, 0rpx) scale(0.9, 0.9);
		transition: all 0.6s ease 0s;
		will-change: transform;
		overflow: hidden;
	}

	.card-swiper swiper-item.cur .swiper-item-text {
		margin-top: -320rpx;
		width: 100%;
		transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
		transition: all 0.6s ease 0s;
		will-change: transform;
	}

	.image-banner {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image-banner image {
		width: 100%;
		height: 100%;
	}

	/* 轮播指示点 start*/
	.indication {
		z-index: 9999;
		width: 100%;
		height: 36rpx;
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.spot {
		background-color: #FFFFFF;
		opacity: 0.6;
		width: 10rpx;
		height: 10rpx;
		border-radius: 20rpx;
		top: -60rpx;
		margin: 0 8rpx !important;
		position: relative;
	}

	.spot.active {
		opacity: 1;
		width: 30rpx;
		background-color: #FFFFFF;
	}

	/* 简历推荐 start */
	.card-swiper2 {
		height: 420rpx !important;
		overflow: hidden;
	}

	.card-swiper2 swiper-item {
		width: 680rpx !important;
		left: 30rpx;
		box-sizing: border-box;
		overflow: initial;
		padding: 0 0rpx 40rpx 0;
	}

	.card-swiper2 swiper-item .swiper-item1 {
		width: 100%;
		display: block;
		height: 100%;
		transform: scale(0.97);
		transition: all 0.2s ease-in 0s;
		will-change: transform;
		background-color: #E7FAFE;
	}

	.card-swiper2 swiper-item.cur .swiper-item1 {
		transform: none;
		transition: all 0.2s ease-in 0s;
		will-change: transform;
	}

	.card-swiper2 swiper-item .swiper-item2 {
		margin-top: -180rpx;
		width: 100%;
		display: block;
		height: 50%;
		border-radius: 50%;
		transform: translate(510rpx, -160rpx) scale(0.9, 0.9);
		transition: all 0.3s ease 0s;
		will-change: transform;
	}

	.card-swiper2 swiper-item.cur .swiper-item2 {
		margin-top: -180rpx;
		width: 100%;
		transform: translate(510rpx, -150rpx) scale(0.9, 0.9);
		transition: all 0.3s ease 0s;
		will-change: transform;
	}

	.card-swiper2 swiper-item .swiper-item-text {
		margin-top: -270rpx;
		width: 100%;
		display: block;
		height: 100%;
		border-radius: 10rpx;
		transform: translate(30rpx, -20rpx) scale(0.8, 0.8);
		transition: all 0.6s ease 0s;
		will-change: transform;
		overflow: hidden;
	}

	.card-swiper2 swiper-item.cur .swiper-item-text {
		margin-top: -270rpx;
		width: 100%;
		transform: translate(20rpx, 0rpx) scale(0.9, 0.9);
		transition: all 0.6s ease 0s;
		will-change: transform;
	}



	/* 底部tabbar假阴影 start*/
	.bg-tabbar-shadow {
		background-image: repeating-linear-gradient(to top, rgba(0, 0, 0, 0.1) 10rpx, #FFFFFF, #FFFFFF);
		position: fixed;
		bottom: 0;
		height: 450rpx;
		width: 100vw;
		z-index: -1;
	}

	/* 图标容器12 start */
	.tn-three {
		position: absolute;
		top: 50%;
		right: 50%;
		bottom: 50%;
		left: 50%;
		transform: translate(-38rpx, -20rpx) rotateX(20deg) rotateY(10deg) rotateZ(-20deg);
		text-shadow: -1rpx 2rpx 0 #f0f0f0, -2rpx 4rpx 0 #f0f0f0, -10rpx 20rpx 30rpx rgba(0, 0, 0, 0.2);
	}

	.icon12 {
		&__item {
			width: 30%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 100rpx;
				height: 100rpx;
				font-size: 60rpx;
				border-radius: 50%;
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
					background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg6.png);


				}
			}
		}
	}

	/* 自定义导航栏内容 start */
	.custom-nav {
		height: 100%;

		&__back {
			margin: auto 5rpx;
			font-size: 40rpx;
			margin-right: 10rpx;
			margin-left: 30rpx;
			flex-basis: 5%;
		}

		&__search {
			flex-basis: 60%;
			width: 100%;
			height: 100%;

			&__box {
				width: 100%;
				height: 70%;
				padding: 10rpx 0;
				margin: 0 30rpx;
				border-radius: 60rpx 60rpx 0 60rpx;
				font-size: 24rpx;
			}

			&__icon {
				padding-right: 10rpx;
				margin-left: 20rpx;
				font-size: 30rpx;
			}

			&__text {
				// color: #AAAAAA;
			}
		}
	}

	.logo-image {
		width: 65rpx;
		height: 65rpx;
		position: relative;
	}

	.logo-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border-radius: 50%;
	}

	/* 自定义导航栏内容 end */


	/* 热门图片 start*/
	.image-tuniao1 {
		padding: 165rpx 0rpx;
		font-size: 40rpx;
		font-weight: 300;
		position: relative;
	}

	.image-tuniao2 {
		padding: 75rpx 0rpx;
		font-size: 40rpx;
		font-weight: 300;
		position: relative;
	}

	.image-tuniao3 {
		padding: 90rpx 0rpx;
		font-size: 40rpx;
		font-weight: 300;
		position: relative;
	}

	.image-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border-radius: 10rpx;
	}

	/* 胶囊banner*/
	.image-capsule {
		padding: 100rpx 0rpx;
		font-size: 40rpx;
		font-weight: 300;
		position: relative;
	}

	.image-piccapsule {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border-radius: 20rpx 20rpx 0 0;
	}

	/* 标题 start */
	.nav_title {
		-webkit-background-clip: text;
		color: transparent;

		&--wrap {
			position: relative;
			display: flex;
			height: 120rpx;
			font-size: 46rpx;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			background-image: url(https://resource.tuniaokj.com/images/title_bg/title00.png);
			background-size: cover;
		}
	}

	/* 标题 end */

	/* 业务展示 start */
	.tn-info {

		&__container {
			margin-top: 10rpx;
			margin-bottom: 50rpx;
		}

		&__item {
			width: 47.7%;
			margin: 15rpx 0rpx 30rpx 0rpx;
			padding: 40rpx 30rpx;
			border-radius: 10rpx;


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
				background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/2.png);
			}

			&__left {

				&--icon {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					font-size: 40rpx;
					margin-right: 20rpx;
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

				&__content {
					font-size: 25rpx;

					&--data {
						color: rgba(255, 255, 255, 0.5);
						margin-top: 5rpx;
						// font-weight: bold;
					}
				}
			}

			&__right {
				&--icon {
					position: absolute;
					right: 0rpx;
					top: 50rpx;
					font-size: 100rpx;
					width: 108rpx;
					height: 108rpx;
					text-align: center;
					line-height: 60rpx;
					opacity: 0.15;
				}
			}

			&__bottom {
				box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.12);
				border-radius: 0 0 10rpx 10rpx;
				position: absolute;
				width: 85%;
				line-height: 15rpx;
				left: 50%;
				bottom: -15rpx;
				transform: translateX(-50%);
				z-index: -1;
				text-align: center;
			}
		}
	}

	/* 业务展示 end */

	/* 底部tabbar start*/
	.footerfixed {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 999;
		background-color: #FFFFFF;
		box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	.tabbar {
		display: flex;
		align-items: center;
		min-height: 110rpx;
		justify-content: space-between;
		padding: 0;
		height: calc(110rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
	}

	.tabbar .action {
		font-size: 22rpx;
		position: relative;
		flex: 1;
		text-align: center;
		padding: 0;
		display: block;
		height: auto;
		line-height: 1;
		margin: 0;
		overflow: initial;
	}

	.bar-center {
		animation: suspension 3s ease-in-out infinite;
	}

	@keyframes suspension {

		0%,
		100% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(-0.8rem);
		}
	}

	.tabbar .action .bar-icon {
		width: 100rpx;
		position: relative;
		display: block;
		height: auto;
		margin: 0 auto 10rpx;
		text-align: center;
		font-size: 42rpx;
		// line-height: 50rpx;
	}

	.tabbar .action .bar-icon image {
		width: 50rpx;
		height: 50rpx;
		display: inline-block;
	}

	.tabbar .action .bar-circle {
		position: relative;
		display: block;
		margin: 0rpx auto 0rpx;
		text-align: center;
		font-size: 52rpx;
		line-height: 90rpx;
		// background-color: #01BEFF;
		width: 100rpx !important;
		height: 100rpx !important;
		overflow: hidden;
		// border-radius: 50%;
		// box-shadow: 0px 10px 30px rgba(70,23,129, 0.12),
		//   0px -8px 40px rgba(255, 255, 255, 1),
		//   inset 0px -10px 10px rgba(70,23,129, 0.05),
		//   inset 0px 10px 20px rgba(255, 255, 255, 1);
		// box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(1, 190, 255, 0.5);
	}

	.tabbar .action .bar-circle image {
		width: 100rpx;
		height: 100rpx;
		display: inline-block;
		margin: 0rpx auto 0rpx;
	}

	/* 流星+悬浮 */
	.nav-index-button {
		animation: suspension 3s ease-in-out infinite;
		z-index: 999999;


		&__content {
			position: absolute;
			width: 100rpx;
			height: 100rpx;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			&--icon {
				width: 100rpx;
				height: 100rpx;
				font-size: 60rpx;
				border-radius: 50%;
				margin-bottom: 18rpx;
				position: relative;
				z-index: 1;
				transform: scale(0.85);

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
					// background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg6.png);
				}
			}
		}

		&__meteor {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 100rpx;
			height: 100rpx;
			transform-style: preserve-3d;
			transform: translate(-50%, -50%) rotateY(75deg) rotateZ(10deg);

			&__wrapper {
				width: 100rpx;
				height: 100rpx;
				transform-style: preserve-3d;
				animation: spin 20s linear infinite;
			}

			&__item {
				position: absolute;
				width: 100rpx;
				height: 100rpx;
				border-radius: 1000rpx;
				left: 0;
				top: 0;

				&--pic {
					display: block;
					width: 100%;
					height: 100%;
					background: url(https://resource.tuniaokj.com/images/cool_bg_image/arc1.png) no-repeat center center;
					background-size: 100% 100%;
					animation: arc 4s linear infinite;
				}
			}
		}
	}


	@keyframes suspension {

		0%,
		100% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(-0.6rem);
		}
	}

	@keyframes spin {
		0% {
			transform: rotateX(0deg);
		}

		100% {
			transform: rotateX(-360deg);
		}
	}

	@keyframes arc {
		to {
			transform: rotate(360deg);
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
			padding: 5rpx 25rpx;

			&--prefix {
				padding-right: 10rpx;
			}
		}
	}
</style>