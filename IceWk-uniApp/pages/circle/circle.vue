<template>
	<view>
		<!-- navbar -->
		<u-navbar :is-back="false" z-index="99999">
			<!-- tabs -->
			<u-tabs :list="tabList" font-size="35" name="cate_name" bg-color="#fff" :current="current" @change="tabChange"></u-tabs>
		</u-navbar>
		<!-- 关注 -->
		<view v-if="current === 0"><post-list :list="followUserPost" :loadStatus="loadStatus1"></post-list></view>
		<view v-if="current === 1">
			<!-- 我的圈子 -->
			<view class="topic-wrap">
				<view class="head">
					<view class="left">我加入的圈子</view>
					<navigator url="/pages/topic/add" class="right">创建圈子</navigator>
				</view>
				<scroll-view scroll-x>
					<view class="topic-list">
						<navigator url="/pages/topic/more" class="more-topic" hover-class="none">
							<view class="bg-wrap"><image src="/static/more.png"></image></view>
							<text>广场</text>
						</navigator>
						<navigator class="topic-item" :url="'/pages/topic/detail?id=' + item.id" v-for="(item, index) in joinTopicList" :key="index" hover-class="none">
							<u-image width="110rpx" height="110rpx" :border-radius="10" :src="item.cover_image"></u-image>
							<view class="name">{{ item.topic_name.substring(0, 4) }}</view>
							<text v-if="sessionUid == item.uid" class="user">圈主</text>
						</navigator>
					</view>
				</scroll-view>
			</view>
			<circle-list :list="joinTopicPost" :loadStatus="loadStatus3"></circle-list>
		</view>
		<view v-if="current === 2"><post-list :list="imgPost" :loadStatus="loadStatus4"></post-list></view>
		<view v-if="current === 3"><post-list :list="videoPost" :loadStatus="loadStatus5"></post-list></view>
		<view v-if="current === 4"><post-list :list="touPost" :loadStatus="loadStatus6"></post-list></view>
		<!-- 发布弹窗 -->
		<u-popup v-model="showAddPopup" mode="bottom">
			<view class="handle-wrap">
				<view @click="handleJump(item)" class="item" v-for="(item, index) in addPopup" :key="index">
					<image mode="widthFix" class="icon" :src="item.icon"></image>
					<text class="txt">{{ item.text }}</text>
				</view>
			</view>
			<view class="handle-close"><u-icon @click="showAddPopup = false" name="close"></u-icon></view>
		</u-popup>

		<!-- tabbar -->
		<!-- <q-tabbar :active="0" :count="msgCount"></q-tabbar> -->
			<view @click="showAddPopup = !showAddPopup" class="addCircle">
				<image mode="widthFix" class="icon-add" src="/static/tabbar/add.png"></image>
			</view>
	</view>
</template>

<script>
import API from '../../utils/api.js';
import postList from '../../components/post-list/post-list.vue';
export default {
	components: {
		postList
	},
	data() {
		return {
			showAddPopup: false,
			sessionUid: uni.getStorageSync('userInfo').uid,
			loadStatus1: 'loadmore',
			loadStatus2: 'loadmore',
			loadStatus3: 'loadmore',
			loadStatus4: 'loadmore',
			loadStatus5: 'loadmore',
			loadStatus6: 'loadmore',
			page: 1,
			page2: 1,
			page3: 1,
			page4: 1,
			page5: 1,
			page6: 1,
			shareCover: '',
			topDisList: [],
			swiperList: [],
			followUserPost: [],
			joinTopicPost: [],
			touPost: [],
			tabList: [
				{
					name: '关注'
				},
				{
					name: '圈子'
				},
				{
					name: '图文'
				},
				{
					name: '视频'
				},
				{
					name: '投票'
				}
			],
			addPopup: [
				{
					icon: '/static/h_2.png',
					text: '动态',
					url: '/pages/post/add?type=1'
				},
				{
					icon: '/static/h_3.png',
					text: '视频',
					url: '/pages/post/add?type=2'
				},
				{
					icon: '/static/h_1.png',
					text: '投票',
					url: '/pages/post/vote'
				}
			],
			current: 1,
			joinTopicList: [],
			imgPost:[],
			videoPost:[],
		};
	},
	computed: {
		msgCount() {
			return this.$store.state.messegeNum;
		}
	},
	onLoad() {
		this.getSysInfo();
		this.getFollowUserPost();
		this.getJoinTopicPost();
		this.getUserJoinTopic();
		this.getimgPost();
		this.getvideoPost();
		this.gettouPost();
	},
	onShow() {
		if (this.$store.state.userInfo.uid) {
			this.getMsgNum();
		}
	},
	onReachBottom() {
		if (this.current === 0) {
			this.page2++;
			this.getFollowUserPost();
		}

		if (this.current === 1) {
			this.page3++;
			this.getJoinTopicPost();
		}
		if (this.current === 2) {
			this.page4++;
			this.getimgPost();
		}
		if (this.current === 3) {
			this.page5++;
			this.getvideoPost();
		}
		if (this.current === 4) {
			this.page6++;
			this.gettouPost();
		}
	},
	onPullDownRefresh() {
		
		if (this.current === 0) {
			this.page2 = 1;
			this.followUserPost = [];
			this.getFollowUserPost();
		}

		if (this.current === 1) {
			this.page3 = 1;
			this.joinTopicPost = [];
			this.getJoinTopicPost();
			this.getUserJoinTopic();
		}
		if (this.current === 2) {
			this.page4 = 1;
			this.imgPost = [];
			this.getimgPost();
		}
		if (this.current === 3) {
			this.page5 = 1;
			this.videoPost = [];
			this.getvideoPost();
		}
		if (this.current === 4) {
			this.page6 = 1;
			this.touPost = [];
			this.gettouPost();
		}
		
		uni.stopPullDownRefresh();
	},
	methods: {
		getMsgNum() {
			this.$H.post('message/num').then(res => {
				this.$store.state.messegeNum = [0, 0, 0, res.result.all_count, 0];
			});
		},
		handleJump(e) {
			uni.navigateTo({
				url: e.url
			});

			this.showAddPopup = false;
		},
		tabChange(index) {
			this.current = index;
		},
		// 用户加入的圈子
		getUserJoinTopic() {
			this.loadStatus = 'loading';
			this.$H
				.post('topic/userJoinTopic', {
					class_id: this.topicClassId
				})
				.then(res => {
					this.joinTopicList = res.result.data;
					uni.stopPullDownRefresh();
				});
		},
		getimgPost(){
			this.loadStatus4 = 'loading';
			this.$H
				.get('post/list', {
					page: this.page4,
					type:1
				})
				.then(res => {
					this.imgPost = this.imgPost.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus4 = 'nomore';
					} else {
						this.loadStatus4 = 'loadmore';
					}
				});
		},
		getvideoPost(){
			this.loadStatus5 = 'loading';
			this.$H
				.get('post/list', {
					page: this.page5,
					type:2
				})
				.then(res => {
					this.videoPost = this.videoPost.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus5 = 'nomore';
					} else {
						this.loadStatus5 = 'loadmore';
					}
				});
		},
		gettouPost(){
			this.loadStatus6 = 'loading';
			this.$H
				.get('post/list', {
					page: this.page6,
					type:4
				})
				.then(res => {
					this.touPost = this.touPost.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus6 = 'nomore';
					} else {
						this.loadStatus6 = 'loadmore';
					}
				});
		},
		jump(url) {
			uni.navigateTo({
				url: url
			});
		},
		getSysInfo() {
			this.$H.get('system/miniConfig').then(res => {
				this.shareCover = res.result.intro;
			});
		},
		// 获取加入的圈子动态
		getJoinTopicPost() {
			this.loadStatus3 = 'loading';
			uni.request({
				url: API.GetAllSquare("circle",this.page3,6),
				success: res => {
					this.joinTopicPost = this.joinTopicPost.concat(res.data.data);
					if (this.page3 === res.data.pages) {
								this.loadStatus3 = '暂无更多';
							} else {
								this.loadStatus3 = 'loadmore';
							}
				}
			});
		},
		// 获取关注用户帖子
		getFollowUserPost() {
			this.loadStatus1 = 'loading';
			this.$H
				.get('post/followUserPost', {
					page: this.page2
				})
				.then(res => {
					this.followUserPost = this.followUserPost.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus1 = 'nomore';
					} else {
						this.loadStatus1 = 'loadmore';
					}
				});
		}
	}
};
</script>

<style>
page {
	background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.swiper-body {
	height: calc(100vh - var(--status-bar-height) - 43px);
}

.body-scroll-view {
	width: 100%;
	height: 100%;
}

.tab-box {
	width: 80%;
}

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
	}
}

// 顶部圈子
.topic-wrap {
	background-color: #fff;
	margin-bottom: 20rpx;
	padding: 20rpx;
	.head {
		display: flex;
		margin-bottom: 20rpx;
		.right {
			margin-left: auto;
			color: #616161;
		}
	}

	.more-topic {
		margin-right: 20rpx;
		font-size: 24rpx;
		text-align: center;
		.bg-wrap {
			width: 110rpx;
			height: 110rpx;
			background-image: linear-gradient(to right, $themes-color, $sub-color);
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10rpx;
			image {
				width: 70%;
				height: 70%;
			}
		}
	}
	.topic-list {
		display: flex;
		.topic-item {
			font-size: 24rpx;
			text-align: center;
			margin-right: 20rpx;
			position: relative;
			.user {
				font-size: 20rpx;
				color: #fff;
				background-image: linear-gradient(to right, $themes-color, $sub-color);
				position: absolute;
				right: 0;
				top: 0;
				padding: 0 10rpx;
				border-top-right-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
			}
		}
	}
}

// 发布弹出框
.handle-wrap {
	display: flex;
	padding: 50rpx 0;

	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		padding: 20rpx 0;
		border-radius: 20rpx;

		.icon {
			width: 100rpx;
			margin-bottom: 20rpx;
		}

		.txt {
			font-size: 28rpx;
		}
	}
}

.handle-close {
	display: flex;
	justify-content: center;
	margin-bottom: 50rpx;
}
.addCircle{

    position:fixed;left:50%;top:84%;
    transform:translate(-50%,-50%);/*50%为自身尺寸的一半*/
}
.icon-add{
	z-index: 999;
	width: 90rpx;
	height: 90rpx;
}
</style>
