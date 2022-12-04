<template>
	<view>
		<view
			class="topic-item"
			@click="chooseTopic(item.id, item.title)"
			v-for="(item, index) in disList"
			:key="index"
		>
			<view class="center">
				<view>{{ item.title}}</view>
			</view>
			<view class="count-box">
				<text>{{ item.read_count }}浏览</text>
			</view>
		</view>
		<!-- 加载状态 -->
		<block v-if="disList.length === 0 && loadStatus == 'nomore'">
			<u-empty margin-top="100" text="暂无话题" mode="favor"></u-empty>
		</block>
		<block v-else>
			<view style="margin: 30rpx 0;">
				<u-loadmore :status="loadStatus" />
			</view>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			disList: [],
			loadStatus: 'loadmore',
			page: 1,
			topicId:""
		};
	},
	onLoad(options) {
		this.topicId = options.topic_id;
		this.getDisList();
	},
	filters: {
		replace(str) {
			str = str.replace(/\n/g, '');
			return str.substring(0,40);
		}
	},
	onReachBottom() {
		this.page++;
		this.getDisList();
	},
	methods: {
		getDisList() {
			this.$H
				.get('discuss/list',{
					page:this.page,
					topic_id:this.topicId
				})
				.then(res => {
					this.disList = res.result.data;
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loadmore';
					}
				});
		},
		chooseTopic(id, name) {
			let pages = getCurrentPages(); //获取所有页面栈实例列表
			let nowPage = pages[pages.length - 1]; //当前页页面实例
			let prevPage = pages[pages.length - 2]; //上一页页面实例
			prevPage.$vm.form.discuss_id = id;
			prevPage.$vm.disName = name;
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
.topic-item {
	display: flex;
	align-items: center;
	background-color: #fff;
	padding: 30rpx;
	border-bottom: 1px solid #f5f5f5;
	.cover-img {
		margin-right: 20rpx;
	}
	.center {
		flex: 1;
		.desc {
			font-size: 20rpx;
			color: #999;
		}
	}
	.count-box {
		display: flex;
		flex-direction: column;
		font-size: 20rpx;
		color: #999;
		margin-left: 20rpx;
	}
}

</style>
