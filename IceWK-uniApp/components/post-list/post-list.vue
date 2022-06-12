<template>
	<view>
		<block v-for="(item, index) in list" :key="index">
			<view @click="jump(item)">
				<view class="post-item">
					<view class="post-item-top-user">
						<view @click.stop="toUcenter(item.uid)">
							<u-avatar class="avatar" :src="item.userInfo.avatar" :show-level="item.userInfo.type == 1"
								level-bg-color="#8072f3"></u-avatar>
						</view>
						<view class="center">
							<view style="display: flex;align-items: center;">
								<text v-if="item.userInfo.type == 1" class="official">官方</text>
								<text v-if="item.userInfo.vip_expire_time > timestamp" style="color: red;"
									class="username">{{ item.userInfo.username.substring(0, 12) }}</text>
								<text v-else class="username">{{ item.userInfo.username.substring(0, 12) }}</text>
							</view>
							<view>
								<text class="time">{{ item.create_time | timeFrom }}</text>
							</view>
						</view>
						<view class="right">
							<u-icon v-if="handle && sessionUid == uid" @tap.stop="onActive(item, index)"
								class="arrow-down" size="40" name="more-dot-fill"></u-icon>
							<u-icon v-else-if="admin" @tap.stop="onActive(item, index)" class="arrow-down" size="40"
								name="more-dot-fill"></u-icon>
							<u-icon v-else-if="sessionUid == item.uid" @tap.stop="onActive(item, index)"
								class="arrow-down" size="40" name="more-dot-fill"></u-icon>
						</view>
					</view>
					<text class="discuss-title" :data-id="item.discuss_id" v-if="item.discuss_id > 0"
						@tap.stop="toDiscuss">#{{ item.discuss_title }}</text>
					<view class="post-content">
						<rich-text class="post-text" :nodes="item.content"></rich-text>
						<!-- 帖子类型 -->
						<block v-if="item.type == 1">
							<!--一张图片-->
							<block v-if="item.media.length == 1">
								<image :lazy-load="true" mode="aspectFill" class="img-style-1" :src="item.media[0]"
									@tap.stop="previewImage(item.media[0], item.media, item.integral, item.id)"></image>
							</block>
							<!--二张图片-->
							<block v-if="item.media.length == 2">
								<view class="img-style-2">
									<image :lazy-load="true" v-for="(mediaItem, index2) in item.media" :key="index2"
										@tap.stop="previewImage(mediaItem, item.media, item.integral, item.id)"
										mode="aspectFill" :src="mediaItem"></image>
								</view>
							</block>
							<!--三张以上图片-->
							<block v-if="item.media.length > 2">
								<view class="img-style-3">
									<image :lazy-load="true" v-for="(mediaItem, index2) in item.media" :key="index2"
										@tap.stop="previewImage(mediaItem, item.media, item.integral, item.id)"
										mode="aspectFill" :src="mediaItem"></image>
								</view>
							</block>
						</block>
						<!-- 视频 -->
						<view class="video-wrap" v-if="item.type == 2 && item.media.length > 0">
							<image class="icon" src="/static/play.png"></image>
							<image mode="aspectFill" :src="item.media[0] + '?x-oss-process=video/snapshot,t_0,f_jpg'">
							</image>
							<!-- <video :show-center-play-btn="false" :controls="false" :src="item.media[0]"></video> -->
						</view>
					</view>
					<!-- 投票 -->
					<view v-if="item.type === 4" class="vote-box">
						<view class="title">{{ item.vote_info.title }}</view>
						<view class="expire-time">截止：{{ item.vote_info.expire_time | date('yyyy年mm月dd日hh时MM分') }}</view>
						<view class="vote-item" v-for="(item2, index2) in item.vote_info.options" :key="index2">
							{{ item2.content }}
						</view>
					</view>
					<!-- 位置 -->
					<view class="address" v-if="item.address">
						<u-icon class="icon" name="map-fill"></u-icon>
						<text>{{ item.address }}</text>
					</view>
					<!-- 底部 -->
					<view class="p-footer">
						<view class="p-item ">
							<button @click.stop="showShares(index)" class="u-reset-button" open-type="share">
								<u-icon name="share-square"></u-icon>
								<text class="count">分享</text>
							</button>
						</view>
						<view class="p-item margin50">
							<u-icon name="chat"></u-icon>
							<text class="count">{{ item.comment_count }}</text>
						</view>
						<view v-show="item.is_collection" class="p-item" @click.stop="cancelCollection(item.id, index)">
							<u-icon name="heart-fill" color="#cc0000"></u-icon>
							<text class="count">{{ item.collection_count }}</text>
						</view>
						<view v-show="!item.is_collection" class="p-item" @click.stop="addCollection(item.id, index)">
							<u-icon name="heart"></u-icon>
							<text class="count">{{ item.collection_count }}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 广告 -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="container" v-if="index % 20 == 0 && !userInfo.is_vip">
				<ad unit-id="adunit-637ffe5b2f2873d5" ad-type="video" ad-theme="white"></ad>
			</view>
			<!-- #endif -->
		</block>
		<!-- 操作弹窗 -->
		<u-action-sheet :list="actionList" v-model="showAction" @click="actionCon"></u-action-sheet>
		<!-- 加载状态 -->
		<block v-if="list.length === 0 && loadStatus == 'nomore'">
			<u-empty margin-top="100" text="暂无内容" mode="favor"></u-empty>
		</block>
		<block v-else>
			<view style="margin: 30rpx 0;">
				<u-loadmore :status="loadStatus" />
			</view>
		</block>
		<u-popup v-model="showShare" height="240rpx" mode="bottom">
			<view class="share-wrap" @click="showShare = false">
				<button open-type="share" @click="appShare('WXSceneSession')" class="share-item u-reset-button">
					<image src="/static/wechat.png"></image>
					<text>微信好友</text>
				</button>
				<view @click="appShare('WXSenceTimeline')" class="share-item">
					<image src="/static/pyq.png"></image>
					<text>朋友圈</text>
				</view>
				<view @click="appShares('qq')" class="share-item">
					<image src="/static/qq.png"></image>
					<text>QQ</text>
				</view>

			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: 'post-list',
		props: {
			list: Array,
			loadStatus: String,
			handle: {
				default: false,
				type: Boolean
			},
			showTopic: {
				default: true,
				type: Boolean
			},
			uid: Number,
			admin: {
				default: false,
				type: Boolean
			},
		},
		data() {
			return {
				showAction: false,
				indexPostAd: this.$c.indexPostAd,
				actionList: [{
						text: '关注TA',
						key: 'follow'
					},
					{
						text: '删除',
						color: 'red',
						key: 'delete'
					}
				],
				choosePost: '',
				chooseIndex: '',
				sessionUid: '',
				showShare: false,
			};
		},
		watch: {
			uid(n) {
				if (this.sessionUid == n) {
					this.actionList.unshift({
						text: '置顶',
						key: 'top'
					});
				}
			}
		},
		computed: {
			userInfo() {
				return uni.getStorageSync('userInfo');
			},
			timestamp() {
				return Date.parse(new Date()) / 1000;
			}
		},
		created() {
			let userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.sessionUid = userInfo.uid;
			}
		},
		methods: {
			toMy() {
				uni.switchTab({
					url: '/pages/my/my'
				});
			},
			showShares(index) {
				this.showShare = true;
				this.postDetail = this.list[index];
			},
			appShares() {
				let imgURL = (imgURL = this.postDetail.media[0]);
				let that = this
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				uni.share({
					provider: "qq", //分享服务提供商（即weixin|qq|sinaweibo）
					type: 0, //分享形式
					href: 'http://xy.tujingzg.com/api/post/detail?id=' + that.postId, //跳转链接
					summary: that.postDetail.content, //分享内容的摘要
					title: that.postDetail.content, //分享内容的标题
					imageUrl: imgURL, //图片地址
					success: function(res) {
						uni.showToast({
							title: '分享成功',
							icon: 'none',
							duration: 2000
						})
						that.posters = false; //成功后关闭底部弹框
					},
					fail: function(err) {
						uni.showToast({
							title: '分享失败',
							icon: 'none',
							duration: 2000
						})
						that.posters = false;
					}
				});
			},
			appShare(scene) {
				let imgURL = (imgURL = this.postDetail.media[0]);
				let that = this
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				uni.share({
					provider: "weixin", //分享服务提供商（即weixin|qq|sinaweibo）
					scene: scene, //场景，可取值参考下面说明。
					type: 0, //分享形式
					href: 'http://xy.tujingzg.com/api/post/detail?id=' + that.postId, //跳转链接
					summary: that.postDetail.content, //分享内容的摘要
					title: that.postDetail.content, //分享内容的标题
					imageUrl: imgURL, //图片地址
					success: function(res) {
						uni.showToast({
							title: '分享成功',
							icon: 'none',
							duration: 2000
						})
						that.posters = false; //成功后关闭底部弹框
					},
					fail: function(err) {
						uni.showToast({
							title: '分享失败',
							icon: 'none',
							duration: 2000
						})
						that.posters = false;
					}
				});
			},
			onActive(postInfo, index) {
				this.showAction = true;
				this.choosePost = postInfo;
				this.chooseIndex = index;
			},
			actionCon(index) {
				let key = this.actionList[index].key;
				if (key == 'follow') {
					this.follow();
				}

				if (key == 'delete') {
					this.postDel();
				}

				if (key == 'top') {
					this.postTop();
				}
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
				if (!this.$store.state.userInfo.uid) {
					this.toMy();
				}
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
			// 置顶帖子
			postTop() {
				this.$H
					.post('post/setTop', {
						post_id: this.choosePost.id,
						topic_id: this.choosePost.topic_id
					})
					.then(res => {
						if (res.code == 200) {
							this.$q.toast('成功设为置顶', 'success');
						}
					});
			},
			postDel() {
				this.$H
					.post('post/del', {
						id: this.choosePost.id
					})
					.then(res => {
						if (res.code == 200) {
							this.list.splice(this.chooseIndex, 1);
						}
					});
			},
			follow() {
				this.$H
					.post('user/addFollow', {
						id: this.choosePost.uid
					})
					.then(res => {
						this.$u.toast(res.msg);
					});
			},
			previewImage(url, urls, integral, post_id) {
				let that = this;
				this.$H.post("post/checkint", {
					post_id: post_id
				}).then(res3 => {
					if (res3.code == 200) {
						that.$u.toast('');
						uni.previewImage({
							current: url, // 当前显示图片的http链接
							urls: urls // 需要预览的图片http链接列表
						});
					} else {
						that.$u.toast('');
						if (integral == 0) {
							uni.previewImage({
								current: url, // 当前显示图片的http链接
								urls: urls // 需要预览的图片http链接列表
							});
						} else {
							that.$u.toast('');
							uni.showModal({
								title: '下载将消耗一次下载次数,确认后长按保存图片即可',
								content: '原创作者拍摄不易，未经原创作者授权，禁止任何商业用途',
								success: function(res) {
									if (res.confirm) {
										that.$H
											.post('post/numdownimg', {
												post_id: post_id
											})
											.then(res1 => {
												console.log(res1)
												if (res1.code === 200) {
													uni.previewImage({
														current: url, // 当前显示图片的http链接
														urls: urls // 需要预览的图片http链接列表
													});
												} else {
													uni.showModal({
														title: '你的下载次数不足',
														content: '此内容需打赏[' + integral +
															']音叶',
														success: function(res) {
															if (res.confirm) {
																that.$H
																	.post(
																		'post/jfdownimg', {
																			post_id: post_id
																		})
																	.then(res3 => {
																		if (res3
																			.code ===
																			200) {
																			uni.previewImage({
																				current: url, // 当前显示图片的http链接
																				urls: urls // 需要预览的图片http链接列表
																			});
																		} else {
																			that.$u
																				.toast(
																					'音叶不足，请充值音叶或成为会员'
																				);
																			that
																				.jumpVip();
																		}
																	});
															} else if (res.cancel) {
																console.log('用户点击取消');
															}
														}
													});
												}
											});
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					}
				})
			},
			jumpTopic(id) {
				uni.navigateTo({
					url: '/pages/topic/detail?id=' + id
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
			},
			toDiscuss(e) {
				uni.navigateTo({
					url: '/pages/discuss/detail?id=' + e.currentTarget.dataset.id
				});
			},
			jumpVip() {
				uni.navigateTo({
					url: '/pages/my/vip'
				});
			},
			toUcenter(uid) {
				uni.navigateTo({
					url: '/pages/user/home?uid=' + uid
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	// 分享弹窗
	.share-wrap {
		display: flex;
		padding: 30rpx;
		width: 50%;
		margin: 0 auto;

		.share-item {

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			&:nth-child(1) {
				margin-right: auto;
			}

			image {
				width: 100rpx;
				height: 100rpx;
			}

			text {
				font-size: 24rpx;
				margin-top: 20rpx;
			}
		}
	}

	.post-item {
		background: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;

		.post-content {
			margin-top: 20rpx;

			.img-style-1 {
				display: block;
				width: 100%;
				max-height: 600rpx;
				border-radius: 5px;
				overflow: hidden;
			}

			.img-style-2 {
				display: flex;

				image {
					margin: 5rpx;
					border-radius: 5px;
					width: 100%;
					height: 294rpx;
				}
			}

			.img-style-3 {
				display: flex;
				flex-wrap: wrap;

				image {
					width: 31.3%;
					height: 200rpx;
					margin: 1%;
					border-radius: 5px;
				}
			}
		}

		.address {
			display: flex;
			font-size: 20rpx;
			background-color: #f5f5f5;
			border-radius: 20rpx;
			display: inline-block;
			padding: 5rpx 20rpx;
			margin: 20rpx 0;

			.icon {
				margin-right: 5rpx;
			}
		}
	}

	.post-item-top-user {
		display: flex;
		align-items: center;

		.avatar {
			width: 85rpx;
			height: 85rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}

		.center {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: 24rpx;
			color: #999;

			.username {
				font-size: 32rpx;
				font-weight: 600;
				color: #616161;
			}

			.official {
				display: inline-block;
				font-size: 20rpx;
				color: #fff;
				background-color: $themes-color;
				padding: 5rpx 10rpx;
				border-radius: 10rpx;
				margin-right: 10rpx;
			}
		}

		.right {
			height: 85rpx;

			.arrow-down {
				color: #999;
			}
		}
	}

	.post-text {
		display: block;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		white-space: pre-wrap;
		overflow: hidden;
	}

	.discuss-title {
		height: 30rpx;
		padding: 10rpx;
		line-height: 30rpx;
		border-radius: 20rpx;
		font-size: 12px;
		background: #f0f0f5;
		color: #68c778;
		text-align: center;
	}

	.p-footer {
		display: flex;
		margin: 20rpx 0;

		.p-item {
			margin: 0 auto;
			color: #616161;
			display: flex;
			align-items: center;

			.count {
				margin-left: 10rpx;
				font-size: 28rpx;
			}
		}

		.p-item[hidden] {
			display: none !important;
		}
	}

	.comment-wrap {
		font-size: 28rpx;
		padding-top: 20rpx;
		border-top: 1px solid #f5f5f5;

		.item {
			.name {
				color: #000;
				font-weight: 600;
			}
		}
	}

	.video-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100%;
		height: 500rpx;

		.icon {
			width: 100rpx;
			height: 100rpx;
			z-index: 999;
		}

		image {
			position: absolute;
		}
	}

	// 投票
	.vote-box {
		background-color: #f5f5f5;
		border-radius: 20rpx;
		padding: 20rpx;
		margin: 20rpx;

		.title {
			font-weight: bold;
		}

		.expire-time {
			font-size: 24rpx;
			margin: 20rpx 0;
		}

		.vote-item {
			font-size: 24rpx;
			font-weight: bold;
			padding: 20rpx;
			border-radius: 20rpx;
			border: 1px solid #999;
			text-align: center;
			margin-bottom: 20rpx;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
	.u-reset-button {
	    display: flex;
	    padding: 0;
	    background-color: transparent;
	    font-size: inherit;
	    line-height: inherit;
	    color: inherit;
	    justify-content: center;
	}
</style>
