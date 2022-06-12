<!-- 软件搜索结果 -->
<template>
	<view>
		<u-navbar :title="name" :fixed="true" :safeAreaInsetTop="true" leftIcon="arrow-left" border
			@leftClick="leftClick()"></u-navbar>
		<view class="navbarheight"></view>
		<view class="article_list">
			<u-empty v-if="!showlist" mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></u-empty>
			<view v-else v-for="(item, index) in searchlist" :key="index" @click="goDetails(item.cid,item.title)">
				<view class="article2">
					<view>
						<image :src="item.thumb[0].str_value" class="thumbs" mode="widthFix"></image>
					</view>
					<view class="you">
						<view class="title">{{ item.title }}</view>
						<view class="tags">
							<view class="tagss" v-for="(items, indexs) in item.tag" :key="indexs">{{ items.name }}
							</view>
						</view>
						<view class="other">
							<view class="views">{{item.views[0].views}}次下载</view>
						</view>
					</view>
					<view class="down">
						<text class="text">下载</text>
					</view>
				</view>
			</view>
		</view>
		<u-no-network></u-no-network>
	</view>
</template>
<script>
	import API from '../../utils/api.js';
	export default {
		data() {
			return {
				keyword: "",
				name: "搜索结果",
				searchlist: [],
				showlist: ''
			}
		},
		onLoad(e) {
			// console.log(e)
			this.keyword = e.keyword;
			this.getSearchList();
		},
		methods: {
			getSearchList: function() {
				var that = this;
			    var key = that.keyword;
				uni.request({
					url: API.Search(key),
					success: function(res) {
						var ress = res.data.data;
						if (typeof(ress) != 'undefined' && res.data.data != "none") {
							that.showlist =true;
							that.searchlist = res.data.data;
							console.log(res.data)
						}else{
							that.showlist=false;
						}
					}
				});
			},
			goDetails: function(cid,name) {
				uni.navigateTo({
					url: '/subPage/commen/appdetails?cid=' + cid +'&name=' +name
				});
			},
			leftClick() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>
<style>
	.nores {
		width: 100%;
		/* align-items: center; */
		justify-content: center;
	}

	.imgs {
		margin-left: 285rpx;
		align-items: center;
	}

	.tip {
		text-align: center;
		color: #8799A3;
		font-size: 40rpx;
	}

	.article_list {
		margin: 30rpx 30rpx 0 30rpx;
	}

	.navbarheight {
		height: 44px;
		padding-top: var(--status-bar-height);
	}

	.thumbs {
		width: 120rpx;
		height: 120rpx;
		border-radius: 25rpx;
		align-items: center;
	}

	.article2 {
		display: flex;
		/* padding: 10rpx; */
		justify-content: space-between;
		height: 120rpx;
		margin-top: 20rpx;
		/* background-color: #55ff00; */
	}

	.title {
		width: 400rpx;
		height: 40rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 30rpx;
		line-height: 40rpx;
	}

	.tagss {
		font-size: 25rpx;
		line-height: 40rpx;
		padding: 5rpx;
		color: #bababa;
	}

	.tags {
		width: 400rpx;
		height: 40rpx;
		display: flex;
		white-space: nowrap;
		overflow: hidden;
	}

	.other {
		display: flex;
		width: 400rpx;
		height: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 25rpx;
		margin-top: 15rpx;
		line-height: 30rpx;
		color: #303133;
	}

	.down {
		margin-top: 35rpx;
		/* margin-left: 10rpx; */
		width: 120rpx;
		height: 50rpx;
		background: #0081FF;
		display: flex;
		color: #FFFFFF;
		text-align: center;
		box-shadow: 1px 1px 3px #1184ff;
		border-radius: 50rpx;
	}

	.text {
		font-size: 30rpx;
		margin-top: 5rpx;
		margin-left: 30rpx;
	}

	.you {
		width: 400rpx;
		height: 100%;
		/* margin-left: 10rpx; */
		/* flex: 2; */
	}
</style>
