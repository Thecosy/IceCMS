<!-- 排行榜软件列表 -->
<template>
	<view>
		<u-sticky bgColor="#50A1FF">
			<u-tabs :list="ranklist" scrollable inactiveStyle="color: #ffffff;font-weight: 500;"
				activeStyle="color: #ffffff;font-weight: 600;font-size:35rpx" lineColor="#ffffff" lineWidth="100"
				lineHeight="3" :current="current" @change="toggle" @click="changes">
			</u-tabs>
		</u-sticky>
		<view class="mt50">
			<swiper :duration="150" :current="current" :data-index='current' @change="toggle" circular class="swiper">
				<!-- 最新发布 -->
				<swiper-item>
					<scroll-view scroll-y="true" class="scroll" refresher-enabled="true" :refresher-threshold="100"
						:refresher-triggered="newtriggered" refresher-background="white" @refresherpulling="onnewPulling"
						@refresherrefresh="onnewRefresh" @refresherrestore="onnewRestore" @refresherabort="onnewAbort"
						@scrolltolower="newlists()">
						<view class="ranks">
							<image src="../../static/rank/new.png" mode="widthFix" style="width: 100%;"></image>
							<view class="rankgg">展示最新发布的软件，掌握最新软件发布信息，关注最新发布，使用最新破解软件。</view>
						</view>
						<view class="article_list">
							<view v-for="(news, newsindex) in newList" :key="newsindex"
								@click="goDetails(news.cid,news.title)">
								<view class="article2">
									<view>
										<image :src="news.thumb[0].str_value" class="thumbs" mode="widthFix"></image>
									</view>
									<view class="you">
										<view class="title">{{ news.title }}</view>
										<view class="tags">
											<view class="tagss" v-for="(newsitems, newsindexs) in news.tag"
												:key="newsindexs">
												{{ newsitems.name }}
											</view>
										</view>
										<view class="other">
											<view class="views">{{news.views[0].views}}次下载</view>
										</view>
									</view>
									<view class="down">
										<text class="text">下载</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 热门软件 -->
				<swiper-item>
					<scroll-view scroll-y="true" class="scroll" refresher-enabled="true" :refresher-threshold="100"
						:refresher-triggered="hottriggered" refresher-background="white" @refresherpulling="onhotPulling"
						@refresherrefresh="onhotRefresh" @refresherrestore="onhotRestore" @refresherabort="onhotAbort"
						 @scrolltolower="postlists()">
						<view class="ranks">
							<image src="../../static/rank/down.png" mode="widthFix" style="width: 100%;"></image>
							<view class="rankgg">展示下载量最高的软件，关注热门榜单就能知道大家最爱那些应用啦！</view>
						</view>
						<view class="article_list">
							<view v-for="(hot, hotindex) in hotList" :key="hotindex"
								@click="goDetails(hot.cid,hot.title)">
								<view class="article2">
									<view>
										<image :src="hot.thumb[0].str_value" class="thumbs" mode="widthFix"></image>
									</view>
									<view class="you">
										<view class="title">{{ hot.title }}</view>
										<view class="tags">
											<view class="tagss" v-for="(hotitems, hotindexs) in hot.tag"
												:key="hotindexs">
												{{ hotitems.name }}
											</view>
										</view>
										<view class="other">
											<view class="views">{{hot.views[0].views}}次下载</view>
										</view>
									</view>
									<view class="down">
										<text class="text">下载</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 最多评论 -->
				<swiper-item>
					<scroll-view scroll-y="true" class="scroll" refresher-enabled="true" :refresher-threshold="100"
						:refresher-triggered="comtriggered" refresher-background="white" @refresherpulling="oncomPulling"
						@refresherrefresh="oncomRefresh" @refresherrestore="oncomRestore" @refresherabort="oncomAbort"
						@scrolltolower="commentlists()">
						<!-- <view class="navbarheight"></view> -->
						<view class="ranks">
							<image src="../../static/rank/comment.png" mode="widthFix" style="width: 100%;"></image>
							<view class="rankgg">展示评论量最高的软件，第一时间掌握软件信息，参与讨论！</view>
						</view>
						<view class="article_list">
							<view v-for="(comment, commentindex) in commentList" :key="commentindex"
								@click="goDetails(comment.cid,comment.title)">
								<view class="article2">
									<view>
										<image :src="comment.thumb[0].str_value" class="thumbs" mode="widthFix"></image>
									</view>
									<view class="you">
										<view class="title">{{ comment.title }}</view>
										<view class="tags">
											<view class="tagss" v-for="(commentitems, commentindexs) in comment.tag"
												:key="commentindexs">
												{{ commentitems.name }}
											</view>
										</view>
										<view class="other">
											<view class="views">{{comment.views[0].views}}次下载</view>
										</view>
									</view>
									<view class="down">
										<text class="text">下载</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<u-no-network></u-no-network>
	</view>
</template>
<script>
	var page = 2;
	import API from '../../utils/api.js';
	export default {
		data() {
			return {
				hotscrollTop:0,
				newtriggered: true,
				hottriggered: true,
				comtriggered: true,
				current: 0,
				mid: "99999999",
				name: "",
				newList: [],
				hotList: [],
				commentList: [],
				ranklist: [{
					id: 'tab01',
					name: '最新发布'
				}, {
					id: 'tab02',
					name: '最多下载'
				}, {
					id: 'tab02',
					name: '最多讨论'
				}]
			}
		},
		onLoad(e) {
			// console.log(e)
			this.current = e.current;
			this.getnewlist();
			this.gethotlist();
			this.getcommentlist();
		},
		methods: {
			onnewPulling(e) {
				console.log("onpulling", e);
				if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
				this.newtriggered = true;
			},
			onnewRefresh() {
				// if (this.scrollTop === 0) {
					if (this._freshing) return;
					this._freshing = true;
					this.getnewlist();
					setTimeout(() => {
						this.newtriggered = false;
						this._freshing = false;
						uni.showToast({
							icon: 'success',
							title: '刷新成功'
						});
					}, 2000);
				// }
			},
			onnewRestore() {
				this.newtriggered = 'restore'; // 需要重置
				// console.log("onRestore");
			},
			onnewAbort() {
				console.log("onAbort");
			},
			// 监听页面是否滚动 
			// onhotScroll(e) {
			// 	scrollTop: number = 0
			// 	this.hotscrollTop = e.detail.scrollTop
			// },
			onhotPulling(e) {
				console.log("onpulling", e);
				if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
				this.hottriggered = true;
			},
			onhotRefresh() {
				// if (this.scrollTop === 0) {
					if (this._freshing) return;
					this._freshing = true;
					this.gethotlist();
					setTimeout(() => {
						this.hottriggered = false;
						this._freshing = false;
						uni.showToast({
							icon: 'success',
							title: '刷新成功'
						});
					}, 2000);
				// }
			},
			onhotRestore() {
				this.hottriggered = 'restore'; // 需要重置
				// console.log("onRestore");
			},
			onhotAbort() {
				console.log("onAbort");
			},
			oncomPulling(e) {
				console.log("onpulling", e);
				if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
				this.comtriggered = true;
			},
			oncomRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				this.getcommentlist();
				setTimeout(() => {
					this.comtriggered = false;
					this._freshing = false;
					uni.showToast({
						icon: 'success',
						title: '刷新成功'
					});
				}, 2000);
			},
			oncomRestore() {
				this.comtriggered = 'restore'; // 需要重置
				// console.log("onRestore");
			},
			oncomAbort() {
				// console.log("onAbort");
			},
			goDetails: function(cid, name) {
				uni.navigateTo({
					url: '/subPage/commen/appdetails?cid=' + cid + '&name=' + name
				});
			},
			newlists: function() {
				uni.showToast({
					icon: 'loading',
					title: '加载中...'
				})
				uni.request({
					url: API.GetPosts(),
					data: {
						page: page
					},
					success: res => {
						if (res.data.status == '403') {
							//没有数据
							uni.showToast({
								icon: 'none',
								title: '暂无更多'
							});
							return;
						}
						page++; //每触底一次 page +1
						// console.log(page);
						this.newList = this.newList.concat(res.data.data); //将数据拼接在一起
						console.log(res.data.data)
						uni.hideLoading();
						setTimeout(function() {
							uni.stopPullDownRefresh();
							uni.showToast({
								icon: 'success',
								title: '刷新成功'
							});
						}, 100);
					}
				});
			},
			postlists: function() {
				uni.showToast({
					icon: 'loading',
					title: '加载中...'
				})
				uni.request({
					url: API.GetHot(),
					data: {
						page: page
					},
					success: res => {
						if (res.data.status == '403') {
							//没有数据
							uni.showToast({
								icon: 'none',
								title: '暂无更多'
							});
							return;
						}
						page++; //每触底一次 page +1
						console.log(res.data.data);
						this.hotList = this.hotList.concat(res.data.data); //将数据拼接在一起
						uni.hideLoading();
						setTimeout(function() {
							uni.stopPullDownRefresh();
							uni.showToast({
								icon: 'success',
								title: '刷新成功'
							});
						}, 100);
					}
				});
			},
			commentlists: function() {
				uni.showToast({
					icon: 'loading',
					title: '加载中...'
				})
				uni.request({
					url: API.GetComment(),
					data: {
						page: page
					},
					success: res => {
						if (res.data.status == '403') {
							//没有数据
							uni.showToast({
								icon: 'none',
								title: '暂无更多'
							});
							return;
						}
						page++; //每触底一次 page +1
						// console.log(page);
						this.commentList = this.commentList.concat(res.data.data); //将数据拼接在一起
						uni.hideLoading();
						setTimeout(function() {
							uni.stopPullDownRefresh();
							uni.showToast({
								icon: 'success',
								title: '刷新成功'
							});
						}, 100);
					}
				});
			},
			// 切换触发的事件
			toggle(e) {
				console.log(e.detail.current)
				this.current = e.detail.current;
			},
			changes(e) {
				// console.log(e.index)
				this.current = e.index
			},
			gethotlist: function() {
				uni.request({
					url: API.GetHot(),
					success: res => {
						// console.log(res)
						this.hotList = res.data.data;
						// console.log(res.data.data);
					}
				});
			},
			getnewlist: function() {
				uni.request({
					url: API.GetPosts(),
					success: res => {
						// console.log(res)
						this.newList = res.data.data;
						// console.log(res.data.data);
					}
				});
			},
			getcommentlist: function() {
				uni.request({
					url: API.GetComment(),
					success: res => {
						// console.log(res)
						this.commentList = res.data.data;
						// console.log(res.data.data);
					}
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
	.swiper {
		/* margin-top: 50rpx; */
		height: calc(100vh - 85rpx);
	}

	.mt50 {
		top: 50rpx;
	}

	.scroll {
		height: 100%;
	}

	.article_list {
		margin: 30rpx;
	}

	.ranks {
		padding: 20rpx;
		position: relative;
		width: 710rpx;
		height: 150rpx;
		margin-top: 1rpx;
	}

	.rankgg {
		position: absolute;
		top: 60rpx;
		left: 240rpx;
		color: #FFFFFF;
		font-size: 25rpx;
		width: 470rpx;
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
