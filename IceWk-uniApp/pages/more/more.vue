<template>
	<view>
		<!-- navbar -->
		<u-navbar :is-back="false" :border-bottom="false">
			<u-icon class="search-wrap" name="search" :size="40" @click="toSearch"></u-icon>
			<!-- page-tabs -->
			<u-tabs :list="pageTab" :current="pageCurrent" @change="pageTabChange"></u-tabs>
		</u-navbar>
		<!-- page广场 -->
		<view v-show="pageCurrent == 0">
			<!-- tabs -->
			<view class="tabs-wrap" :style="{ top: navbarHeight + 'px' }"><u-tabs :list="classList" name="cate_name" :current="current" @change="tabChange"></u-tabs></view>
			<view v-show="current == 0">
				<!-- 轮播图 -->
				<view class="swiper-box"><u-swiper @click="onSwiper" :list="swiperList" name="img" border-radius="20" mode="rect"></u-swiper></view>
			</view>
			<q-post-waterfall ref="pWaterfall" :list="postList" :loadStatus="loadPostStatus"></q-post-waterfall>
		</view>

		<!-- 图集 -->
		<view v-show="pageCurrent == 1">
			<navigator :url="'/pages/user/home?uid=' + item.uid" class="user-item" hover-class="none" v-for="(item, index) in userList" :key="index">
				<view v-if="index < 10" class="user-index-hot">{{ index + 1 }}</view>
				<view v-else class="user-index">{{ index + 1 }}</view>
				<image class="avatar" mode="aspectFill" :src="item.avatar"></image>
				<view class="right">
					<text class="username">{{ item.username }}</text>
					<view class="tag-wrap">
						<text class="tag" v-for="(item2, index2) in item.tag_str" :key="index2">{{ item2 }}</text>
					</view>
				</view>
			</navigator>
			<!-- 加载状态 -->
			<block v-if="userList.length === 0 && loadStatus == 'nomore'"><u-empty margin-top="100" text="暂无内容" mode="favor"></u-empty></block>
			<block v-else>
				<view style="margin: 30rpx 0;"><u-loadmore :status="loadStatus" /></view>
			</block>
		</view>
		
		<!-- tabbar -->
		<!-- <q-tabbar :active="1" :count="msgCount"></q-tabbar> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			pageUser: 1,
			pageTab: [
				{
					name: '创作广场'
				},
				{
					name: '排行榜'
				}
			],
			pageCurrent: 0,
			classList: [
				{
					cate_id: '',
					cate_name: '推荐'
				}
			],
			classId: '',
			loadStatus: 'loadmore',
			loadPostStatus: 'loadmore',
			current: 0,
			swiperList: [],
			postList: [],
			userList: []
		};
	},
	computed: {
		navbarHeight() {
			let sysInfo = uni.getSystemInfoSync();

			let height = 44;

			// #ifdef MP
			height = sysInfo.platform == 'ios' ? 44 : 48;
			// #endif

			return height + sysInfo.statusBarHeight;
		},
		msgCount() {
			return this.$store.state.messegeNum;
		}
	},
	onLoad() {
		this.getClassList();
		this.getLinkList();
		this.getPostList();
		this.getUserRanking();
	},
	onShow() {
		if (this.$store.state.userInfo.uid) {
			this.getMsgNum();
		}
	},
	onReachBottom() {
		if (this.pageCurrent == 0) {
			this.page++;
			this.getPostList();
		}

		if (this.pageCurrent == 1) {
			this.pageUser++;
			this.getUserRanking();
		}
	},
	onPullDownRefresh() {
		if (this.pageCurrent == 0) {
			this.page = 1;
			this.postList = [];
			this.$refs.pWaterfall.clear();
			this.getPostList();
		}
		
		if (this.pageCurrent == 1) {
			this.pageUser = 1;
			this.userList = [];
			this.getUserRanking();
		}
		
		uni.stopPullDownRefresh();
	},
	methods: {
		getMsgNum() {
			this.$H.post('message/num').then(res => {
				this.$store.state.messegeNum = [0, 0, 0, res.result.all_count, 0];
			});
		},
		getUserRanking() {
			this.loadStatus = 'loading';
			this.$H
				.get('user/ranking', {
					page: this.pageUser
				})
				.then(res => {
					this.userList = this.userList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loadmore';
					}
				});
		},
		getPostList() {
			this.loadPostStatus = 'loading';
			this.$H
				.get('post/imageRecommend', {
					class_id: this.classId,
					page: this.page
				})
				.then(res => {
					this.postList = this.postList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadPostStatus = 'nomore';
					} else {
						this.loadPostStatus = 'loadmore';
					}
				});
		},
		pageTabChange(index) {
			this.pageCurrent = index;
		},
		previewImage(url, urls) {
			uni.previewImage({
				current: url, // 当前显示图片的http链接
				urls: urls // 需要预览的图片http链接列表
			});
		},
		// 处理点击轮播图跳转
		onSwiper(index) {
			let link = this.swiperList[index];

			//跳转页面
			if (link.open == 1) {
				uni.navigateTo({
					url: '/pages/webview/webview?src=' + link.url
				});
			}

			//跳转小程序
			if (link.open == 2) {
				uni.navigateToMiniProgram({
					appId: link.appid,
					path: link.url
				});
			}

			//跳转小程序
			if (link.open == 3) {
				uni.navigateTo({
					url: link.url
				});
			}
		},
		// 获取轮播图
		getLinkList() {
			this.$H
				.post('link/list', {
					type: 3,
					page: 1
				})
				.then(res => {
					this.swiperList = res.result.data;
				});
		},
		getClassList() {
			let that = this;
			this.$H.get('topic/classList').then(res => {
				this.classList = this.classList.concat(res.result);
			});
		},
		tabChange(index) {
			this.page = 1;
			this.current = index;
			this.classId = this.classList[index].cate_id;
			this.postList = [];
			this.$refs.pWaterfall.clear();

			this.getPostList();
		},
		toSearch() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.search-wrap {
	margin-left: 20rpx;
	margin-right: 30%;
}

.tabs-wrap {
	position: sticky;
	z-index: 999;
}
.swiper-box {
	padding: 0 30rpx;
}
// 热门圈子
.hot-topic {
	padding: 30rpx;
	display: flex;
	.topic-item {
		margin: 0 20rpx;
		.cover-box {
			position: relative;
			.cover-img {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
		}

		.footer {
			font-size: 24rpx;
			.name {
				display: inline-block;
				width: 120rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.user-num {
				color: #999;
			}
		}
	}
}
// 块标题
.block-title {
	font-weight: bold;
	padding: 20rpx;
	color: #616161;
	display: flex;
	font-size: 28rpx;
	.right {
		margin-left: auto;
		color: #999;
		font-size: 24rpx;
		display: flex;
		align-items: center;
	}
}

// 帖子
.topic-wrap {
	background-color: #fff;
	margin: 30rpx;
	padding: 20rpx;
	border-radius: 20rpx;
	.info-wrap {
		display: flex;
		.cover-img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}

		.right {
			.name {
				font-weight: bold;
			}
			.count-wrap {
				font-size: 24rpx;
				color: #616161;
				text {
					margin-right: 10rpx;
				}
			}
		}
	}

	.post-img-wrap {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 10rpx;
		margin-top: 20rpx;
		image {
			width: 100%;
			height: 200rpx;
			border-radius: 10rpx;
		}
	}
}

// 用户列表
.user-item {
	margin: 30rpx;
	padding: 20rpx;
	display: flex;
	border-bottom: 1px solid #f5f5f5;
	.user-index-hot {
		margin-right: 20rpx;
		color: #fff;
		background-image: linear-gradient($themes-color, $sub-color);
		width: 55rpx;
		height: 55rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 55rpx;
	}

	.user-index {
		margin-right: 20rpx;
		color: $themes-color;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}

	.right {
		flex: 1;
		.username {
			font-weight: bold;
		}
		.tag-wrap {
			font-size: 20rpx;
			.tag {
				display: inline-block;
				padding: 5rpx 20rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				background-color: #99ccff;

				&:nth-child(2n) {
					background-color: #ccb3ff;
				}

				&:nth-child(3n) {
					background-color: #ffe7b3;
				}

				&:nth-child(5n) {
					background-color: #b3e0ff;
				}
			}
		}
	}
}
</style>
