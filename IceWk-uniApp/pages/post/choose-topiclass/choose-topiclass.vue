<template>
	<view>
		<view class="topic-item" @click="chooseTopic(item.cate_id, item.cate_name)" v-for="(item, index) in topicList"
			:key="index">
			<u-image class="cover-img" width="120rpx" height="120rpx" border-radius="10rpx" :src="item.cover_image">
			</u-image>
			<view class="center">
				<view>{{ item.cate_name.substring(0, 10) }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topicList: []
			};
		},
		onLoad(options) {
			this.getTopicList();
		},
		filters: {
			replace(str) {
				str = str.replace(/\n/g, '');
				return str.substring(0, 40);
			}
		},
		onReachBottom() {
			this.getTopicList();
		},
		methods: {
			getTopicList() {
				this.$H
					.get('topic/classList')
					.then(res => {
						this.topicList = res.result;
					});
			},
			chooseTopic(id, name) {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.form.cate_id = id;
				prevPage.$vm.cateName = name;
				uni.navigateBack();
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'choose-topiclass.scss';
</style>
