<template>
	<view class="waterfall-wrap">
		<u-waterfall v-model="list" ref="uWaterfall">
			<template v-slot:left="{ leftList }">
				<view @click="jump(item)" v-for="(item, index) in leftList" :key="item.id" class="post-item post-left">
					<u-lazy-load v-if="item.type == 1" loading-img="/static/img-load.png" threshold="100" border-radius="10" :image="item.media[0]" :index="item.id"></u-lazy-load>
					<view class="video-wrap">
						<image v-if="item.type == 2" :lazy-load="true" :src="item.media[0] + '?x-oss-process=video/snapshot,t_0,f_jpg'" mode="widthFix"></image>
						<image class="pay-icon" :lazy-load="true" src="../../static/images/play.png"></image>
					</view>
					<view class="post-title">{{ item.content.substring(0, 20) }}</view>
					<view class="footer">
						<image class="avatar" :lazy-load="true" :src="item.userInfo.avatar" mode="aspectFill"></image>
						<text class="username">{{ item.userInfo.username.substring(0, 10) }}</text>
						<text class="thumb-num">{{ item.fabulous_count }}</text>
						<u-icon class="thumb-icon" name="heart" :size="36"></u-icon>
					</view>
				</view>
			</template>
			<template v-slot:right="{ rightList }">
				<view @click="jump(item)" v-for="(item, index) in rightList" :key="item.id" class="post-item post-right">
					<u-lazy-load v-if="item.type == 1" threshold="100" loading-img="/static/img-load.png" border-radius="10" :image="item.media[0]" :index="item.id"></u-lazy-load>
					<view class="video-wrap">
						<image v-if="item.type == 2" :lazy-load="true" :src="item.media[0] + '?x-oss-process=video/snapshot,t_0,f_jpg'" mode="widthFix"></image>
						<image class="pay-icon" :lazy-load="true" src="../../static/images/play.png"></image>
					</view>
					<view class="post-title">{{ item.content.substring(0, 20) }}</view>
					<view class="footer">
						<image class="avatar" :lazy-load="true" :src="item.userInfo.avatar" mode="aspectFill"></image>
						<text class="username">{{ item.userInfo.username.substring(0, 10) }}</text>
						<text class="thumb-num">{{ item.fabulous_count }}</text>
						<u-icon class="thumb-icon" name="heart" :size="36"></u-icon>
					</view>
				</view>
			</template>
		</u-waterfall>
		<!-- 加载状态 -->
		<view style="margin: 30rpx 0;"><u-loadmore :status="loadStatus" /></view>
	</view>
</template>

<script>
export default {
	name: 'q-post-waterfall',
	props: {
		list: Array,
		loadStatus: {
			type: String,
			default: 'loadmore'
		}
	},
	methods: {
		remove(id) {
			this.$refs.uWaterfall.remove(id);
		},
		clear() {
			this.$refs.uWaterfall.clear();
		},
		cancelCollection(id, index) {
			this.$H
				.post('post/cancelCollection', {
					id: id
				})
				.then(res => {
					if (res.code === 200) {
						this.list[index].is_collection = false;
						this.list[index].collection_count--;
					}
				});
		},
		addCollection(id, index) {
			this.$H
				.post('post/addCollection', {
					id: id,
					uid: this.list[index].uid
				})
				.then(res => {
					if (res.code === 200) {
						this.list[index].is_collection = true;
						this.list[index].collection_count++;
					}
				});
		},
		jump(e) {
			let url;

			// 图文
			if (e.type == 1 || e.type == 4) {
				url = '/pages/post/detail?id=' + e.id;
			}

			//视频
			if (e.type == 2) {
				url = '/pages/post/video-detail?id=' + e.id;
			}

			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.waterfall-wrap {
	padding: 30rpx;
}
.post-left {
	margin-right: 15rpx;
}

.post-right {
	margin-left: 15rpx;
}
.post-item {
	margin-bottom: 50rpx;
	.cover-img {
		width: 100%;
		max-height: 600rpx;
		border-radius: 10rpx;
	}

	.video-wrap {
		position: relative;
		image {
			width: 100%;
			max-height: 600rpx;
			border-radius: 10rpx;
		}
		.pay-icon {
			position: absolute;
			right: 30rpx;
			top: 30rpx;
			width: 50rpx;
			height: 50rpx;
		}
	}
	.post-title {
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}

	.footer {
		display: flex;
		align-items: center;
		font-size: 20rpx;
		color: #999;
		.avatar {
			width: 30rpx;
			height: 30rpx;
			border-radius: 50%;
			margin-right: 10rpx;
		}
		.thumb-num {
			margin-left: auto;
			margin-right: 10rpx;
		}
	}
}
</style>
