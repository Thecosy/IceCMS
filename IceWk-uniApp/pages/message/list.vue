<template>
	<view>
		<view class="read-tips">
			<text @click="readStatus">标记已读</text>
		</view>
		<block v-if="msgList[0].userInfo.avatar" v-for="(item,index) in msgList" :key="index">
			<view class="comment-msg-item">
				<navigator :url="'/pages/user/home?uid='+ item.from_uid" hover-class="none">
					<u-avatar class="avatar" :src="item.userInfo.avatar"></u-avatar>
				</navigator>
				<view class="msg-c">
					<view class="msg-c-t">
						<text class="username">{{item.userInfo.username}}</text>
						<text class="time">{{item.create_time | timeFrom}}</text>
					</view>
					<view class="msg-c-txt">
						<text>{{item.content}}</text>
						<text v-if="item.status == 0" class="dot"></text>
					</view>
					<block v-if="item.post_id !=1">
						<navigator v-if="msgType != 2" :url="'/pages/post/detail?id='+item.post_id" hover-class="none">
							<view class="post-c">
								<view @click="dstatus(item.m_id,item.status)" class="post-c-txt">{{item.postInfo.content}}</view>
							</view>
						</navigator>
					</block>
					<navigator v-if="item.post_id == 1" :url="'/pages/my/chong'" hover-class="none">
						<view class="post-c">
							<view @click="dstatus(item.m_id,item.status)" class="post-c-txt">{{item.postInfo.content}}</view>
						</view>
					</navigator>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgType: 0,
				msgList: {
					m_id: 357774,
					from_uid: 2,
					to_uid: 10434,
					post_id: 1,
					title: "提现申请",
					content: "您发起了1音叶提现,请耐心等待管理员审核",
					status: 1,
					type: 7,
					create_time: 1637508965,
					userInfo: {
						username: "社区项目项目小助手",
						avatar: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-202a1b86-90c8-405c-8fd7-6f817978bab6/1bccf31c-995f-4772-a808-8707ee8f4273.jpg"
					},
					postInfo: {
						id: 1,
						content: "您的音叶有变化，更多信息请到【我的】->【音叶】查看",
					}
				}
			};
		},
		onLoad(options) {
			this.msgType = options.type;
			
		},
		onShow() {
			this.getMsgList();
		},
		methods: {
			dstatus(id,status){
				console.log(id);
				this.$H.get("message/dstatus", {
					id: id
				}).then(res => {
					if(status!=1){  
						// this.$u.toast(''); 
					}else{
						this.$u.toast('');
					}
				})
			},
			getMsgList() {
				this.$H.get("message/list", {
					type: this.msgType
				}).then(res => {
					this.msgList = res.result;
				})
			},
			readStatus() {
				let that = this;
				this.$H.get("message/status", {
					type: this.msgType
				}).then(res => {
					this.msgList.forEach(function(item, index) {
						that.msgList[index].status = 1;
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.img-style-1 {
		display: block;
		width: 100%;
		max-height: 600rpx;
		border-radius: 5px;
		overflow: hidden;
	}

	.comment-msg-item {
		display: flex;
		background-color: #fff;
		border-bottom: 1px solid #f5f5f5;
		padding: 20rpx;
	}

	.comment-msg-item .msg-c {
		width: 100%;
	}

	.comment-msg-item .avatar {
		margin-right: 10rpx;
	}

	.comment-msg-item .post-c {
		background-color: #eee;
		margin-top: 20rpx;
		padding: 20rpx;
		font-size: 12px;
		line-height: 1.8;
		border-radius: 10rpx;
	}

	.comment-msg-item .post-c .post-c-txt {
		text-overflow: ellipsis;
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		overflow: hidden;
	}

	.comment-msg-item .msg-c {
		display: flex;
		flex-direction: column;
	}

	.comment-msg-item .msg-c .msg-c-t {
		display: flex;
	}

	.comment-msg-item .msg-c .msg-c-t .time {
		font-size: 10px;
		color: #999;
		margin-left: auto;
	}

	.comment-msg-item .msg-c .username {
		margin-bottom: 20rpx;
		color: #2B85E4;
	}

	.comment-msg-item .msg-c .msg-c-txt {
		display: flex;
		align-items: center;
	}

	.comment-msg-item .msg-c .msg-c-txt .dot {
		width: 10rpx;
		height: 10rpx;
		background-color: #FA3534;
		border-radius: 50%;
		display: block;
		margin-left: 20rpx;
	}

	/*标记已读*/
	.read-tips {
		padding: 20rpx;
		background-color: #f5f5f5;
		display: flex;
	}

	.read-tips text {
		margin-left: auto;
	}
</style>
