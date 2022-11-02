<template>
	<view>
		<block v-for="(item, index) in userList" :key="index">
			<navigator :url="'/pages/user/home?uid=' + item.uid" class="member-item">
				<u-avatar class="avatar" :src="item.avatar"></u-avatar>
				<view class="user">
					<text class="name">{{ item.username }}</text>
					<text v-if="item.gender == '男'" class="iconfont icon-nan"></text>
					<text v-if="item.gender == '女'" class="iconfont icon-nv"></text>
				</view>
				<u-button @click="follow(index, item.uid)" v-if="item.has_follow === 0" class="btn-gz" type="default" size="mini">关注</u-button>
				<u-button @click="cancelFollow(index, item.uid)" v-if="item.has_follow === 1" class="btn-gz" type="default" size="mini" plain>互相关注</u-button>
				<u-button @click="cancelFollow(index, item.uid)" v-if="item.has_follow === 2" class="btn-gz" type="default" size="mini" plain>已关注</u-button>
			</navigator>
		</block>
		<!-- 加载状态 -->
		<block v-if="loadStatus != 'none'">
			<block v-if="list.length === 0 && loadStatus == 'nomore'"><u-empty margin-top="100" text="暂无用户" mode="favor"></u-empty></block>
			<block v-else><u-loadmore margin-bottom="50" margin-top="50" :status="loadStatus" /></block>
		</block>
	</view>
</template>

<script>
export default {
	props: {
		list: Array,
		loadStatus: String
	},
	data() {
		return {
			userList: []
		};
	},
	watch: {
		list() {
			this.userList = this.list;
		}
	},
	methods: {
		follow(index, uid) {
			this.$H
				.post('user/addFollow', {
					id: uid
				})
				.then(res => {
					if (res.code == 200) {
						this.userList[index].has_follow = 1;
					}
				});
		},
		cancelFollow(index, uid) {
			this.$H
				.post('user/cancelFollow', {
					id: uid
				})
				.then(res => {
					if (res.code === 200) {
						this.userList[index].has_follow = 0;
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.member-item {
	display: flex;
	align-items: center;
	padding: 20rpx;
	border-bottom: 1px solid #f5f5f5;
	background-color: #ffffff;
	&:last-child{
		border-bottom: 0;
	}
	
}

.member-item .icon-nv {
	color: #ff4d94;
}

.member-item .icon-nan {
	color: #0091ff;
}

.member-item .avatar {
	margin-right: 20rpx;
}

.member-item .user .name {
	margin-right: 20rpx;
}

.member-item .user .iconfont {
	font-size: 12px;
}

.member-item .btn-gz {
	margin-left: auto;
	margin-right: 0;
}
</style>
