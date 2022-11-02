<template>
	<view>
		<block v-for="(item,index) in disList" :key="item.id">
			<navigator :url="'/pages/discuss/detail?id=' + item.id">
				<view class="discuss-item">
					<view class="title">
						<text>{{item.title}}</text>
						<view v-if="sessionUid == item.uid" @tap.stop="onActive(item,index)" class="arrow-down">
							<u-icon size="40" name="more-dot-fill"></u-icon>
						</view>
					</view>
					<text class="desc">{{item.introduce}}</text>
					<view class="count">
						<text>浏览 {{item.read_count}}</text>
					</view>
				</view>
			</navigator>
		</block>
		<!-- 加载状态 -->
		<block v-if="list.length === 0 && loadStatus == 'nomore'">
			<u-empty margin-top="100" text="暂无内容" mode="favor"></u-empty>
		</block>
		<block v-else>
			<u-loadmore margin-bottom="50" margin-top="50" v-if="list.length > 10" bg-color="#f5f5f5"
				:status="loadStatus" />
		</block>
		<!-- 操作弹窗 -->
		<u-action-sheet :list="actionList" v-model="showAction" @click="confirm"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			loadStatus: {
				type: String,
				default: 'loading'
			}
		},
		watch:{
			list(n){
				this.disList = n;
			}
		},
		data() {
			return {
				showAction: false,
				sessionUid:"",
				actionList: [{
					text: '删除话题',
					color: 'red'
				}],
				chooseDis:{},
				chooseIndex:"",
				disList:[]
			};
		},
		created() {
			let userInfo = uni.getStorageSync("userInfo");
			if (userInfo) {
				this.sessionUid = userInfo.uid;
			}
		},
		methods:{
			onActive(e,index){
				this.showAction = true;
				this.chooseDis = e;
				this.chooseIndex = index;
			},
			confirm(index){
				if (index === 0) {
					this.disDel();
				}
			},
			disDel() {
				this.$H.post('discuss/del', {
					id: this.chooseDis.id
				}).then(res => {
					if (res.code == 200) {
						this.disList.splice(this.chooseIndex, 1)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.discuss-item {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		border-bottom: 1px solid #f5f5f5;
		background-color: #FFFFFF;
	}

	.title {
		margin-bottom: 20rpx;
		display: flex;
		.arrow-down{
			margin-left: auto;
		}
	}

	.desc {
		font-size: 12px;
		color: #616161;
	}

	.count {
		font-size: 12px;
		color: #999;
		margin-top: 20rpx;
	}

	.count text:nth-child(1) {
		margin-right: 20rpx;
	}
</style>
