<template>
	<view>
		<view
			class="topic-item"
			@click="chooseTopic(item.id, item.topic_name)"
			v-for="(item, index) in topicList"
			:key="index"
		>
			<u-image class="cover-img" width="120rpx" height="120rpx" border-radius="10rpx" :src="item.cover_image"></u-image>
			<view class="center">
				<view>{{ item.topic_name.substring(0, 10) }}</view>
				<view class="desc">{{ item.description | replace }}</view>
			</view>
			<view class="count-box">
				<text>{{ item.user_count }}圈友</text>
				<text>{{ item.post_count }}动态</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			topicList: [],
			loadStatus: 'loadmore',
			page: 1
		};
	},
	onLoad(options) {
		this.getTopicList();
	},
	filters: {
		replace(str) {
			str = str.replace(/\n/g, '');
			return str.substring(0,40);
		}
	},
	onReachBottom() {
		this.page++;
		this.getTopicList();
	},
	methods: {
		getTopicList() {
			this.$H
				.get('topic/userJoinTopic',{
					page:this.page
				})
				.then(res => {
					this.topicList = this.topicList.concat(res.result.data);
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
			prevPage.$vm.form.topic_id = id;
			prevPage.$vm.topicName = name;
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
@import 'choose-topic.scss';
</style>
