<template>
	<view class="u-skeleton">
		<view style="position: absolute;"><u-navbar :custom-back="onBack" back-icon-color="#fff" :background="background" :border-bottom="false"></u-navbar></view>
		<image class="head-bg u-skeleton-rect" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F23%2F20170223111134_CmuzW.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664355406&t=b9b70d3e36009aed0454e5fbe579a767"></image>
		<view class="con-c">
			<view class="user-info">
				<!-- <image class="avatar" :src="userInfo.avatar"></image> -->
				<u-avatar class="avatar" :src="userInfo.profile" :show-level="userInfo.type == 1" level-bg-color="#8072f3" size="130"></u-avatar>
				<view class="user-c">
					<view class="username u-skeleton-fillet">
						<text>{{ userInfo.name }}</text>
						<navigator v-if="userInfo.is_vip" url="/pages/my/vip" class="vip-txt">VIP会员</navigator>
					</view>
					<view class="num-box u-skeleton-fillet">
						<text>
							{{ userInfo.follow }}
							<text class="txt">关注</text>
						</text>
						<text>
							{{ userInfo.fans }}
							<text class="txt">粉丝</text>
						</text>
						<text class="level">{{ userInfo.level }}</text>
					</view>
					<text class="desc u-skeleton-fillet u-line-2">{{ userInfo.intro }}</text>
					<view style="display: flex;align-content: center;align-items: center;" class="btn-box u-skeleton-fillet">
						<view v-show="!userInfo.is_follow" @click="follow" class="follow-btn">
							<u-icon name="plus"></u-icon>
							<text>关注</text>
						</view>
						<u-button style="margin: 10rpx 0;" v-show="userInfo.is_follow" @click="cancelFollow" :custom-style="btnStyle2" class="btn" shape="circle" size="mini"><text>已关注</text></u-button>
						<u-button style="margin: 10rpx 20rpx;" @click="$f.jump('/pages/chat/chat?user=' + userJson)" :custom-style="btnStyle2" shape="circle" size="mini">
							<text style="margin: 0 15rpx;">私信</text>
						</u-button>
					</view>
				</view>
			</view>
			<!-- tab -->
			<view class="tab-box u-skeleton-fillet">
				<u-tabs
					bg-color="#f5f5f5"
					inactive-color="#999"
					name="tab_name"
					:list="tabs"
					active-color="#616161"
					:is-scroll="false"
					c
					:current="current"
					@change="tabChange"
				></u-tabs>
			</view>
			<!-- 主页 -->
			<view v-show="current === 0">
				<!-- 基本信息 -->
				<view class="f-wrap u-skeleton-fillet">
					<view class="title">基本信息</view>
					<view class="info-c">
						<view v-if="userInfo.type === 1" class="level-box">
							<view class="level"><u-icon name="level"></u-icon></view>
							<text>景途官方账号</text>
						</view>
						<text v-if="!userInfo.gender" >性别：保密</text>
						<text v-else >性别：{{ userInfo.gender }}</text>
						<text v-if="userInfo.userAge === false">年龄：未知</text>
						<text v-else>年龄：{{ userInfo.userAge }}岁</text>
						<text v-if="!userInfo.province" >地区：未知</text>
						<text v-else>地区：{{ userInfo.province }} {{ userInfo.city }}</text>
						<text>个人简介：{{ userInfo.intro }}</text>
					</view>
				</view>
				<!-- 创建的圈子 -->
				<!-- <view v-if="userInfo.create_topic_list.length > 0" class="f-wrap u-skeleton-fillet">
					<view class="title">创建的圈子</view>
					<topic-list :list="userInfo.create_topic_list" loadStatus="none"></topic-list>
				</view> -->
				<!-- 个人标签 -->
				<view class="f-wrap u-skeleton-fillet">
					<view class="title">标签</view>
					<view class="tag-box">
						<view v-for="(item, index) in userInfo.tag_str" :key="index" class="tag">{{ item }}</view>
					</view>
				</view>
			</view>
			<!-- 帖子 -->
			<view v-show="current === 1"><post-list :list="postList" :loadStatus="loadStatus"></post-list></view>
			<view v-show="current === 2"><post-list :list="postLists" :loadStatus="loadStatus"></post-list></view>
			<!-- 加入的圈子 -->
			<view v-show="current === 3"><topic-list :list="topicList"></topic-list></view>
		</view>
		<!--骨架屏-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
import API from '../../utils/api.js';
import postList from '../../components/post-list/post-list.vue';
import topicList from '../../components/topic-list/topic-list.vue';
export default {
	components: {
		postList,
		topicList
	},
	data() {
		return {
			loading: true,
			btnStyle: {
				color: '#fff',
				backgroundColor: '#efd234'
			},
			btnStyle2: {
				border: '1px solid #efd234',
				color: '#efd234'
			},
			background: {
				backgroundColor: 'unset'
			},
			tabs: [
				{
					tab_name: '主页'
				},
				{
					tab_name: '图片'
				},
				{
					tab_name: '视频'
				},
				{
					tab_name: '加入圈子'
				}
			],
			current: 0,
			uid: 0,
			postList: [],
			postLists: [],
			topicList: [],
			userInfo: {
				create_topic_list:[]
			},
			userJson: '',
			loadStatus: 'loading',
			page: 1,
			pages: 1
		};
	},
	onLoad(options) {
		this.uid = options.uid;
		this.getUserInfo();
	},
	onReachBottom() {
		if (this.current == 1) {
			this.page++;
			this.getPostList();
		}
		if (this.current == 2) {
			this.pages++;
			this.getPostLists();
		}
	},
	methods: {
		onBack() {
			uni.navigateBack();
		},
		follow() {
			this.$H
				.post('user/addFollow', {
					id: this.userInfo.uid
				})
				.then(res => {
					if (res.code === 200) {
						this.userInfo.is_follow = true;
					} else {
						this.$u.toast(res.msg);
					}
				});
		},
		cancelFollow() {
			this.$H
				.post('user/cancelFollow', {
					id: this.userInfo.uid
				})
				.then(res => {
					if (res.code === 200) {
						this.userInfo.is_follow = false;
					}
				});
		},
		tabChange(index) {
			this.current = index;
			if (index === 1) {
				this.getPostList();
			}
			if (index === 2) {
				this.getPostLists();
			}
			if (index === 3) {
				this.getTopicList();
			}
		},
		getPostList() {
			this.loadStatus = 'loading';
			this.$H
				.get('post/list', {
					page: this.page,
					type:1,
					uid: this.uid
				})
				.then(res => {
					this.postList = this.postList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loadmore';
					}
				});
		},
		getPostLists() {
			this.loadStatus = 'loading';
			this.$H
				.get('post/list', {
					page: this.pages,
					type:2,
					uid: this.uid
				})
				.then(res => {
					this.postLists = this.postLists.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loadmore';
					}
				});
		},
		getTopicList() {
			this.$H
				.get('topic/userJoinTopic', {
					uid: this.uid
				})
				.then(res => {
					this.topicList = res.result.data;
				});
		},
		getUserInfo() {
			uni.request({
				url: API.GetUserInfoByid(this.uid),
				success: res => {
					
					this.userInfo = res.data;
					console.log(this.userInfo)
					let user = {
						uid:  res.data.uid,
						username:  res.data.name,
						avatar:  res.data.profile
					};
					this.userJson = JSON.stringify(user);
					uni.setNavigationBarTitle({
						title: this.userInfo.name
					});
					
					this.loading = false;
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
.f-wrap {
	margin-bottom: 30rpx;
}

.head-bg {
	width: 100%;
	height: 500rpx;
}

.con-c {
	padding: 30rpx;
	position: relative;
	top: -200rpx;
	width: 100%;
}

.user-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	height: 500rpx;
}

.avatar {
	width: 130rpx;
	height: 130rpx;
	border-radius: 50%;
	border: 2px solid #ffffff;
	z-index: 999;
}

.user-info .user-c {
	background-color: #ffffff;
	border-radius: 30rpx;
	padding: 30rpx;
	position: absolute;
	top: 70rpx;
	width: 100%;
	box-shadow: 5rpx 10rpx 20rpx #e6e6e6;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.user-info .user-c .username {
	font-size: 40rpx;
	font-weight: bold;
	margin-top: 70rpx;
}

.user-info .user-c .num-box {
	font-size: 24rpx;
	margin: 20rpx 0;
	text-align: center;
}

.user-info .user-c .num-box .txt {
	color: #999;
	margin-left: 5rpx;
}

.user-info .user-c .num-box text {
	margin-right: 30rpx;
}

.user-info .user-c .desc {
	font-size: 22rpx;
	color: #999;
}

.user-info .user-c .btn-box {
	margin-top: 20rpx;
}

.user-info .user-c .btn-box .btn {
	margin-right: 20rpx;
}

.tab-box {
	margin-top: 30rpx;
	margin-bottom: 30rpx;
}

.info-c {
	display: flex;
	flex-direction: column;
}

.info-c > text {
	margin-bottom: 20rpx;
	color: #999;
}

.info-c .level-box {
	margin-bottom: 20rpx;
	display: flex;
	align-items: center;
	color: #999;
	.level {
		font-size: 20rpx;
		color: #fff;
		padding: 5rpx 10rpx;
		background-color: $themes-color;
		border-radius: 10rpx;
		margin-right: 10rpx;
	}
}
/* 标签 */
.tag-box {
}

.tag-box .tag {
	padding: 10rpx 20rpx;
	border-radius: 20rpx;
	font-size: 24rpx;
	display: inline-block;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	background-color: #ffebe5;
}
.tag-box .tag:nth-child(2n) {
	background-color: #ecf9f2;
}
.tag-box .tag:nth-child(3n) {
	background-color: #fff7e5;
}
.tag-box .tag:nth-child(5n) {
	background-color: #b3e0ff;
}

.level {
	font-weight: bold;
}

.vip-txt {
	background-color: #000000;
	color: #fff;
	font-size: 20rpx;
	border-radius: 100rpx;
	padding: 5rpx 20rpx;
	display: inline-block;
	margin-left: 10rpx;
}

.follow-btn{
	background-image: -moz-linear-gradient(135deg, rgb(0, 255, 255), rgb(29, 147, 251));
	
	background-image: -webkit-linear-gradient(135deg, rgb(0, 255, 255), rgb(29, 147, 251));
	
	background-image: linear-gradient(135deg, rgb(0, 255, 255), rgb(29, 147, 251));
	height: 48rpx;
	font-size: 24rpx;
	border-radius: 100rpx;
	padding: 7rpx 30rpx;
	color: #fff;
}
</style>
