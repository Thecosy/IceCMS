<template>
	<view class="container">
		<topic-list :list="topicList" :loadStatus="loadStatus"></topic-list>

		<!-- 创建圈子按钮 -->
		<view style="height: 120rpx;"></view>
		<view class="f-fixed">
			<u-button @click="jump" class="fixed-bottom" type="error" shape="circle">
				<u-icon name="plus"></u-icon>
				<text>创建圈子</text>
			</u-button>
		</view>
	</view>
</template>

<script>
	import topicList from '../../components/topic-list/topic-list.vue';
	export default {
		components: {
			topicList
		},
		data() {
			return {
				topicList: [],
				loadStatus: "loading",
				page: 1
			};
		},
		onLoad() {
			this.getMyTopic();
		},
		onReachBottom() {
			this.page++;
			this.getMyTopic();
		},
		methods: {
			getMyTopic() {
				this.loadStatus = "loading";
				this.$H.get("topic/myCreateTopic", {
					page: this.page
				}).then(res => {
					this.topicList = this.topicList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			},
			jump() {
				uni.navigateTo({
					url: '/pages/topic/add'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
</style>
