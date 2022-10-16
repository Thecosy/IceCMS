<!-- 分类、标签软件列表 -->
<template>
	<view>
		<u-navbar :title="category" :fixed="true" :safeAreaInsetTop="true" leftIcon="arrow-left" border @leftClick="leftClick()"></u-navbar>
		<view class="navbarheight"></view>
		<view class="article_list">
			<u-empty v-if="!showlist" mode="sortlist" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
			<view v-else v-for="(item, index) in articleList" :key="index" @click="goDetails(item.id,item.author)">
				<view class="article2 card">
					<view>
						<image :src="item.thumb" class="thumbs" mode="widthFix"></image>
					</view>
					<view class="you">
						<view class="title">{{ item.title }}</view>
						<view class="tags">
							<view class="tagss" v-for="(items, indexs) in item.tag" :key="indexs">{{ items.name }}
							</view>
						</view>
						<view class="other">
							<view class="views">{{item.views}}次下载</view>
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
				mid:'',
				category:'',
				articleList: [],
				showlist:''
			}
		},
		onLoad(e) {
			// console.log(e)
			this.id = e.id;
			this.category = e.category;
			this.getCategoriesList();
		},
		onPullDownRefresh() {
			this.getCategoriesList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getCategoriesList: function() {
				var that = this;
				var id = this.id;
				uni.request({
					url: API.GetPostsbyClassID(id),
					success: function(res) {
						console.log(res.data)
						var ress = res.data;
						if (typeof(ress) != 'undefined'&&ress != "none"&&ress!="NULL") {
							that.showlist =true;
							that.articleList = res.data;
						}else{
							that.showlist=false;
						}
					}
				})
			},
			goDetails: function(id,author) {
				uni.navigateTo({
					url: '/subPage/commen/appdetails?id=' + id +'&name=' + author
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
	.nores{
		width: 100%;
		/* align-items: center; */
		justify-content: center;
	}
	.imgs{
		margin-left: 285rpx;
		align-items: center;
	}
	.tip{
		text-align: center;
		color: #8799A3;
		font-size: 40rpx;
	}
	.article_list{
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
	.card {
		display: flex;
		height: 130rpx;
		margin: 13rpx 5rpx;
		box-shadow: 0 0 100rpx #ececec;
		padding: 10rpx;
		border-radius: 20rpx;
	}
</style>
