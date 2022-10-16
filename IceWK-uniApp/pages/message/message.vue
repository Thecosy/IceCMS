<template>
	<view>
		<u-grid :col="3" :border="false" @click="toNav">
			<u-grid-item index="1">
				<u-badge :count="msgNum.thumb_collect" :offset="[10, 50]"></u-badge>
				<image class="nav-icon" src="/static/images/icon/souc.png"></image>
				<view class="grid-text">收到的赞</view>
			</u-grid-item>
			<u-grid-item index="2">
				<u-badge :count="msgNum.follow" :offset="[10, 50]"></u-badge>
				<image class="nav-icon" src="/static/images/icon/gz.png"></image>
				<view class="grid-text">新增关注</view>
			</u-grid-item>
			<u-grid-item index="3">
				<u-badge :count="msgNum.comment" :offset="[10, 50]"></u-badge>
				<image class="nav-icon" src="/static/images/icon/pl.png"></image>
				<view class="grid-text">评论</view>
			</u-grid-item>
		</u-grid>
		<view class="msg-wrap">
			<view class="title"><view class="left">系统消息</view></view>
			<block v-if="msgNum.sys_msg_list.length > 0">
				<navigator
					:url="'/pages/message/list?type=' + 7"
					class="msg-item">
					<view class="avatar-box">
						<u-badge :count="msgNum.sys_msg_len" :offset="[5, 15]"></u-badge>
						<u-avatar class="avatar" src="/static/xtxx.png"></u-avatar>
					</view>
					<view class="right">
						<view>
							<text style="margin-right: 10rpx;">系统消息</text>
							<u-tag bg-color="#8687fd" text="官方" type="error" size="mini" mode="dark" />
							
						</view>
						<view class="desc">
							<text>{{msgNum.sys_msg_list[0].title }}</text>
							<text class="time">{{ msgNum.sys_msg_list[0].create_time | timeFrom }}</text>
						</view>
					</view>
				</navigator>
			</block>
			<view class="title"><view class="left">私信</view></view>
			<!-- 图文消息 -->
			<block v-if="msgNum.article_msg_list.length > 0">
				<navigator
					@longpress="onPressArticle(item.m_id, index)"
					:url="'/pages/webview/webview?src=' + item.content"
					class="msg-item"
					v-for="(item, index) in msgNum.article_msg_list"
					:key="index"
					@click="articleMsgState(item.m_id)"
				>
					<view class="avatar-box">
						<u-badge v-if="item.status == 0" :is-dot="true" :offset="[5, 10]" type="error"></u-badge>
						<u-avatar class="avatar" :src="item.user_info.avatar"></u-avatar>
					</view>
					<view class="right">
						<view>
							<text style="margin-right: 10rpx;">{{ item.user_info.username }}</text>
							<u-tag bg-color="#8687fd" text="官方" type="error" size="mini" mode="dark" />
						</view>
						<view class="desc">
							<text>{{ item.title }}</text>
							<text class="time">{{ item.create_time | timeFrom }}</text>
						</view>
					</view>
				</navigator>
			</block>
			<block v-if="msgNum.chat_msg_list.length > 0">
				<navigator
					@longpress="onPressChat(item.user_info.uid, index)"
					:url="'/pages/chat/chat?user=' + $f.tostring(item.user_info)"
					class="msg-item"
					v-for="(item, index) in msgNum.chat_msg_list"
					:key="index"
				>
					<view class="avatar-box">
						<u-badge v-if="item.msg.from_uid==item.user_info.uid" :count="item.count" :offset="[5, 10]" type="error"></u-badge>
						<u-avatar class="avatar" :src="item.user_info.avatar"></u-avatar>
					</view>
					<view class="right">
						<view>
							<text style="margin-right: 10rpx;">{{ item.user_info.username }}</text>
						</view>
						<view class="desc">
							<text>{{ item.msg.content }}</text>
							<text class="time">{{ item.msg.create_time | timeFrom }}</text>
						</view>
					</view>
				</navigator>
			</block>
			<block v-if="msgNum.chat_msg_list.length == 0 && msgNum.article_msg_list.length == 0">
				<view class="msg-empty">
					<image class="img" mode="widthFix" src="/static/empty.png"></image>
					<text class="txt">暂无新消息</text>
				</view>
			</block>
		</view>
		<!-- 删除图文消息弹窗 -->
		<u-action-sheet :list="sheetList" v-model="showSheet" @click="onSheetItem"></u-action-sheet>
		<!-- 删除私信消息弹窗 -->
		<u-action-sheet :list="sheetList1" v-model="showChatSheet" @click="onSheeChat"></u-action-sheet>
		
		<!-- tabbar -->
		<!-- <q-tabbar :active="3" :count="msgCount"></q-tabbar> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			showSheet: false,
			showChatSheet: false,
			sheetList: [
				{
					text: '删除',
					color: 'red'
				}
			],
			sheetList1: [
				{
					text: '删除',
					color: 'red'
				}
			],
			msgNum: {
				thumb_collect: 0,
				follow: 0,
				comment: 0,
				article_msg_list: [],
				sys_msg_list:[],
				chat_msg_list: []
			},
			checkedMsgId: '',
			checkedIndex: '',
			checkedMsgUid: ''
		};
	},
	computed: {
		msgCount() {
			return this.$store.state.messegeNum;
		}
	},
	onShow() {
		// if (this.$store.state.userInfo.uid) {
		// 	this.getMsgNum();
		// }else{
		// 	setTimeout(() => {
		// 		this.toMy();
		// 	 }, 1500)

		// }
	},
	methods: {
		toMy() {
			uni.switchTab({
				url: '/pages/my/my'
			});
		},
		getMsgNum() {
			this.$H.post('message/num').then(res => {
				this.msgNum = res.result;
				this.$store.state.messegeNum = [0, 0, 0, res.result.all_count, 0];
			});
		},
		// 更新阅读状态
		articleMsgState(id) {
			this.$H.post('message/articleMsgState', {
				post_id: id
			});
		},
		// 长按图文消息
		onPressArticle(id, index) {
			this.showSheet = true;
			this.checkedMsgId = id;
			this.checkedIndex = index;
		},
		// 长按系统消息
		onPressSys(id, index) {
			this.showSys = true;
			this.checkedMsgId = id;
			this.checkedIndex = index;
		},
		onPressChat(uid, index) {
			this.showChatSheet = true;
			this.checkedMsgUid = uid;
			this.checkedIndex = index;
		},
		// 删除图文消息
		onSheetItem(index) {
			if (index == 0) {
				this.$H
					.post('message/delMsg', {
						id: this.checkedMsgId
					})
					.then(res => {
						if (res.code == 200) {
							this.msgNum.article_msg_list.splice(this.checkedIndex, 1);
						}
					});
			}
		},
		// 删除私信消息
		onSheeChat(index) {
			if (index == 0) {
				this.$H
					.post('message/delChat', {
						uid: this.checkedMsgUid
					})
					.then(res => {
						console.log(res)
						if (res.code == 200) {
							this.msgNum.chat_msg_list.splice(this.checkedIndex, 1);
						}
					});
			}
		},
		toNav(e) {
			uni.navigateTo({
				url: '/pages/message/list?type=' + e
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.nav-icon {
	width: 90rpx;
	height: 90rpx;
	margin-bottom: 10rpx;
}

.msg-wrap {
	background-color: #ffffff;
	margin-top: 20rpx;
	.title {
		margin: 20rpx;
	}
	.msg-item {
		padding: 20rpx;
		display: flex;
		.avatar-box {
			position: relative;
			.avatar {
				margin-right: 20rpx;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			flex: 1;
			.desc {
				font-size: 24rpx;
				color: #999;
				display: flex;
				.time {
					white-space: nowrap;
					margin-left: auto;
				}
			}
		}
	}
}

//
.msg-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 800rpx;
	.img {
		width: 200rpx;
		margin-top: 100rpx;
	}
	.txt {
		color: #999;
		font-size: 20rpx;
		margin-top: 20rpx;
	}
}
</style>
