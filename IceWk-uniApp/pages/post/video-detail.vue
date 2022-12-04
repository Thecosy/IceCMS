<template>
	<view>
		<video
			class="video_"
			:enable-danmu="true"
			:danmu-btn="true"
			:autoplay="true"
			:enable-play-gesture="true"
			:controls="false"
			:show-fullscreen-btn="false"
			:loop="true"
			:src="postDetail.media[0]"
		>
			<cover-image class="aiPk" style="width: 30px; height: 30px;" v-if="postDetail.is_collection" @click="cancelCollection" src="/static/fav-1.png"></cover-image>
			<cover-image class="aiPk" style="width: 30px; height: 30px;" v-else @click="addCollection" src="/static/fav.png"></cover-image>
			<cover-view class="modelStar1" style="color: #FFFFFF;text-align: center;font-size: 24rpx;">{{ postDetail.collection_count }}</cover-view>

			<cover-image @click="onComment" class="modelStar" style="width: 30px; height: 30px;" src="/static/comment.png"></cover-image>
			<cover-view class="modelStar2" style="color: #FFFFFF;text-align: center;font-size: 24rpx;">{{ postDetail.comment_count }}</cover-view>

			<cover-image class="share" @click="onComments" style="width: 30px; height: 30px;" src="/static/share.png"></cover-image>

			<cover-image class="modelPk " @click="down" style="width: 34px; height: 34px;" src="/static/down.png" mode=""></cover-image>

			<cover-view v-if="postDetail.userInfo.vip_expire_time > timestamp" style="color: red;" @click="toUser()" class="usernames">
				@{{ postDetail.userInfo.username }}
			</cover-view>
			<cover-view v-else @click="toUser()" class="usernames">@{{ postDetail.userInfo.username }}</cover-view>
			<cover-view class="usernamet" style="color: #fff;margin: 20px;font-size: 25rpx;">{{ postDetail.content | replace }}</cover-view>
			<cover-image @click="toUser" class="avatar-img" :src="postDetail.userInfo.avatar" mode=""></cover-image>
		</video>
	</view>
</template>

<script>
export default {
	data() {
		return {
			postDetail: {
				content: '',
				media: [],
				userInfo: {
					username: ''
				}
			},
			isSubmitD: false,
			commentPopup: false,
			commentList: [],
			focus: false,
			placeholder: '说点什么...',
			page: 1,
			form: {
				pid: 0,
				type: 1,
				to_uid: '',
				post_id: '',
				content: ''
			},
			loadStatus: 'loadmore'
		};
	},
	filters: {
		replace(str) {
			str = str.replace(/\n/g, '');
			if (str.length > 20) {
				str = str.substring(0, 20) + '...';
			}

			return str;
		}
	},
	computed: {
		timestamp() {
			return Date.parse(new Date()) / 1000;
		}
	},
	onLoad(options) {
		this.postId = options.id;

		if (options.scene) {
			this.postId = options.scene;
		}

		this.form.post_id = this.postId;

		this.getPostDetail();
		this.getCommentList();
	},
	methods: {
		appShare(scene) {
			let imgURL = (imgURL = this.postDetail.media[0]);
			let that = this;
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].$page.fullPath; // 获取当前页面路由，也就是最后一个打开的页面路由
			uni.share({
				provider: 'weixin', //分享服务提供商（即weixin|qq|sinaweibo）
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
					});
					that.posters = false; //成功后关闭底部弹框
				},
				fail: function(err) {
					uni.showToast({
						title: '分享失败',
						icon: 'none',
						duration: 2000
					});
					that.posters = false;
				}
			});
		},
		// 删除评论
		delComment(e, index, index2) {
			let that = this;
			let user = uni.getStorageSync('userInfo');

			if (e.uid != user.uid) {
				return;
			}

			uni.showModal({
				title: '提示',
				content: '确定删除该评论？',
				success: function(res) {
					if (res.confirm) {
						that.$H
							.post('comment/del', {
								id: e.id
							})
							.then(res2 => {
								if (res2.code == 200) {
									if (index2 || index2 === 0) {
										that.commentList[index].children.splice(index2, 1);
									} else {
										that.commentList.splice(index, 1);
									}
								}
							});
					} else if (res.cancel) {
						// console.log('用户点击取消');
					}
				}
			});
		},
		onCopy() {
			let that = this;
			uni.setClipboardData({
				data: this.postDetail.content,
				success: function() {
					uni.hideToast();
					that.$q.toast('复制成功', 'success');
				}
			});
		},
		// 评论触底
		reachBottom() {
			this.page++;
			this.getCommentList();
		},
		jumpUser(uid) {
			uni.navigateTo({
				url: '/pages/user/home?uid=' + uid
			});
		},
		// 点赞
		onThumbs(id, index, index2) {
			this.$H
				.post('comment/thumbs', {
					id: id
				})
				.then(res => {
					if (res.code == 200) {
						if (index2 || index2 == 0) {
							this.commentList[index].children[index2].is_thumbs = true;
							this.commentList[index].children[index2].thumbs++;
						} else {
							this.commentList[index].is_thumbs = true;
							this.commentList[index].thumbs++;
						}
					}
				});
		},
		// 取消点赞
		cancelThumbs(id, index, index2) {
			console.log(index + ',' + index2);
			this.$H
				.post('comment/cancelThumbs', {
					id: id
				})
				.then(res => {
					if (res.code == 200) {
						if (index2 || index2 == 0) {
							this.commentList[index].children[index2].is_thumbs = false;
							this.commentList[index].children[index2].thumbs--;
						} else {
							this.commentList[index].is_thumbs = false;
							this.commentList[index].thumbs--;
						}
					}
				});
		},
		// 回复评论
		onReply(e) {
			this.placeholder = '回复：' + e.userInfo.username;
			this.focus = true;

			let pid = e.pid;
			if (pid === 0) {
				this.form.pid = e.id;
			} else {
				this.form.pid = e.pid;
			}

			this.form.to_uid = e.userInfo.uid;
			this.form.post_id = this.postId;
		},
		// 输入框失去焦点时
		onBlur() {
			this.placeholder = '说点什么...';
			this.focus = false;
			this.pid = 0;
		},
		// 获取评论列表
		getCommentList() {
			this.loadStatus = 'loading';
			this.$H
				.get('comment/list', {
					post_id: this.postId,
					page: this.page
				})
				.then(res => {
					if (res.code == 200) {
						this.commentList = this.commentList.concat(res.result.data);

						if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
							this.loadStatus = 'nomore';
						} else {
							this.loadStatus = 'loadmore';
						}
					}
				});
		},
		cancelCollection() {
			this.$H
				.post('post/cancelCollection', {
					id: this.postId
				})
				.then(res => {
					if (res.code === 200) {
						this.postDetail.collection_count--;
						this.postDetail.is_collection = false;
					}
				});
		},
		addCollection() {
			this.$H
				.post('post/addCollection', {
					id: this.postId,
					uid: this.postDetail.uid
				})
				.then(res => {
					if (res.code === 200) {
						this.postDetail.collection_count++;
						this.postDetail.is_collection = true;
					}
				});
		},
		addComment() {
			this.isSubmitD = true;
			if (this.form.content == '') {
				this.$u.toast('评论不能为空');
				this.isSubmitD = false;
				return;
			}

			uni.showLoading({
				mask: true,
				title: '发布中'
			});

			this.$H.post('post/addComment', this.form).then(res => {
				if (res.code == 200) {
					this.form.content = '';
					this.$u.toast('评论成功');
					this.page = 1;
					this.commentList = [];
					this.getCommentList();
				}
				this.isSubmitD = false;
				uni.hideLoading();
			});
		},
		getPostDetail() {
			this.$H
				.get('post/detail', {
					id: this.postId
				})
				.then(res => {
					this.postDetail = res.result;
				});
		},
		down() {
			let that = this;
			this.$H
				.post('post/checkint', {
					post_id: this.postId
				})
				.then(res3 => {
					that.$u.toast('');
					if (res3.code == 200) {
						uni.downloadFile({
							url: that.postDetail.media[0],
							success: res => {
								if (res.statusCode === 200) {
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function() {
											uni.hideLoading();
											uni.showToast({
												title: '保存成功',
												icon: 'none'
											});
										},
										fail: function() {
											uni.hideLoading();
											uni.showToast({
												title: '保存失败，请稍后重试',
												icon: 'none'
											});
										}
									});
								}
							}
						});
					} else {
						that.$u.toast('');
						if (that.postDetail.integral == 0) {
							uni.downloadFile({
								url: that.postDetail.media[0],
								success: res => {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												uni.hideLoading();
												uni.showToast({
													title: '保存成功',
													icon: 'none'
												});
											},
											fail: function() {
												uni.hideLoading();
												uni.showToast({
													title: '保存失败，请稍后重试',
													icon: 'none'
												});
											}
										});
									}
								}
							});
						} else {
							uni.showModal({
								title: '下载将消耗一次下载次数',
								content: '原创作者拍摄不易，未经原创作者授权，禁止任何商业用途',
								success: function(res2) {
									if (res2.confirm) {
										that.$H
											.post('post/numdownimg', {
												post_id: that.postId
											})
											.then(res1 => {
												console.log(res1);
												if (res1.code === 200) {
													uni.downloadFile({
														url: that.postDetail.media[0],
														success: res => {
															if (res.statusCode === 200) {
																uni.saveImageToPhotosAlbum({
																	filePath: res.tempFilePath,
																	success: function() {
																		uni.hideLoading();
																		uni.showToast({
																			title: '保存成功',
																			icon: 'none'
																		});
																	},
																	fail: function() {
																		uni.hideLoading();
																		uni.showToast({
																			title: '保存失败，请稍后重试',
																			icon: 'none'
																		});
																	}
																});
															}
														}
													});
												} else {
													uni.showModal({
														title: '你的下载次数不足',
														content: '此内容需打赏[' + that.postDetail.integral + ']音叶',
														success: function(res) {
															if (res.confirm) {
																that.$H
																	.post('post/jfdownimg', {
																		post_id: that.postId
																	})

																	.then(res3 => {
																		if (res3.code === 200) {
																			uni.downloadFile({
																				url: that.postDetail.media[0],
																				success: res => {
																					if (res.statusCode === 200) {
																						uni.saveImageToPhotosAlbum({
																							filePath: res.tempFilePath,
																							success: function() {
																								uni.hideLoading();
																								uni.showToast({
																									title: '保存成功',
																									icon: 'none'
																								});
																							},
																							fail: function() {
																								uni.hideLoading();
																								uni.showToast({
																									title: '保存失败，请稍后重试',
																									icon: 'none'
																								});
																							}
																						});
																					}
																				}
																			});
																		} else {
																			that.$u.toast('音叶不足，请充值音叶或成为会员');
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
				});
		},
		toUser() {
			uni.navigateTo({
				url: '/pages/user/home?uid=' + this.postDetail.uid
			});
		},
		onComment() {
			uni.navigateTo({
				url: '/pages/post/comment?id=' + this.postDetail.id
			});
		},
		onComments() {
			uni.navigateTo({
				url: '/pages/post/comment?id=' + this.postDetail.id + '&statu=1'
			});
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内分享按钮
			console.log(res.target);
		}
		let imgURL;
		if (this.postDetail.media.length > 0) {
			imgURL = this.postDetail.media[0];
		}
		return {
			title: this.postDetail.content,
			path: '/pages/post/video-detail?id=' + this.postId
		};
	},
	onShareTimeline() {
		let imgURL = (imgURL = this.postDetail.media[0]);
		return {
			title: this.postDetail.content,
			query: 'id=' + this.postId
		};
	}
};
</script>

<style>
page {
	background-color: #000;
}
</style>
<style lang="scss" scoped>
.video_ {
	width: 100%;
	height: 100vh;
}

.avatar-image {
	width: 40px;
	height: 40px;
	border-radius: 50%;
}

/* .items{
		
		float:right;
		text-align:right; 
		background:rgba(0,0,0,0.2);
		color:#FFFFFF; 
		top:30px;
		
	 } */

.usernames {
	position: absolute;
	bottom: 50px;
	color: #fff;
	color: #fff;
	margin-left: 20px;
	font-size: 28rpx;
	margin-bottom: 20rpx;
}
.usernamet {
	position: absolute;
	bottom: 20px;
	color: #fff;
	color: #fff;
	margin-bottom: 20rpx;
}

.texts {
	/* position:absolute; */
	color: #fff;
	font-size: 14px;
	text-align: center;
	bottom: 0;
	width: 54px;
	margin-left: -12%;

	/* left:10%; */
}

.avatar-img {
	position: absolute;
	right: 10px;
	top: 300px;
	width: 35px;
	height: 35px;
	border-radius: 50%;
}

.aiPk {
	position: absolute;
	right: 0;
	top: 360px;
	width: 54px;
	height: 54px;
	padding: 2px 13px;
	/* margin:0 14px; */
}

.modelStar {
	position: absolute;
	right: 0;
	top: 420px;
	width: 54px;
	height: 54px;
	padding: 3px 13px;
}
.modelStar1 {
	position: absolute;
	right: 0;
	top: 390px;
	width: 54px;
	height: 54px;
	padding: 3px 1px;
}

.modelStar2 {
	position: absolute;
	right: 0;
	top: 450px;
	width: 54px;
	height: 54px;
	padding: 3px 1px;
}

.commit {
	position: absolute;
	right: 0;
	top: 480px;
	width: 54px;
	height: 54px;
	padding: 3px 13px;
}

.share {
	position: absolute;
	right: 0;
	top: 480px;
	width: 54px;
	height: 54px;
	padding: 3px 13px;
}

.modelPk {
	position: absolute;
	right: 0;
	top: 540px;
	width: 54px;
	height: 54px;
	padding: 1px 8px;
}

.view1 {
	flex: 1;
}

.active {
	background-color: #fff;
}

.slideWrap {
	height: 25px;
	width: 246px;
	border: 1px solid #fff;
	border-radius: 10px;
	font-size: 26px;
	position: absolute;
	background: #fff;
	flex-direction: row;
	border-color: #fff;
	border-width: 1px;
	/* left:-50%; */
	transform: translateX(50%);
}

.slideText {
	color: #fff;
	font-size: 14px;
	text-align: center;
	line-height: 23px;
}

.activeText {
	color: #000;
}
.tool-box {
	position: absolute;
	bottom: 100rpx;
	right: 30rpx;
	color: #fff;
	font-size: 24rpx;
	z-index: 999;

	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 30rpx;

		.iconfont {
			font-size: 60rpx;
		}

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}
}

/* 评论tool */
.comment-tool {
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color: #fff;
	padding: 20rpx;
	display: flex;
	z-index: 999;
}

.comment-tool textarea {
	padding: 20rpx;
	border-radius: 10rpx;
	min-height: 40rpx;
}

.comment-tool .u-btn {
	margin-left: 10rpx;
}

/*评论列表*/

/*评论列表*/
.comment-box {
	background-color: #ffffff;
	margin-top: 20rpx;
}

.comment-box > .title {
	margin: 20rpx;
}

.comment-item {
	display: flex;
	padding: 20rpx;

	&:active {
		background-color: #f5f5f5;
	}

	.c-content {
		display: flex;
		flex-direction: column;
		flex: 1;

		.time {
			color: #999;
			font-size: 10px;
		}

		.user {
			display: flex;

			.thumbs {
				margin-left: auto;
				display: flex;
				align-items: center;
				color: #bfbfbf;

				.num {
					margin-right: 10rpx;
				}
			}
		}
	}

	.avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border: 1px solid #dd524d;
		margin-right: 20rpx;
	}
}

.sub-comment-item {
	margin-left: 100rpx;
	padding: 20rpx;

	&:active {
		background-color: #f5f5f5;
	}

	.user {
		display: flex;
		align-items: center;

		.name {
			color: #616161;
		}

		.avatar {
			margin-right: 10rpx;
		}

		.u-head {
			flex: 1;
			display: flex;

			.thumbs {
				margin-left: auto;
				display: flex;
				align-items: center;
				color: #bfbfbf;

				.num {
					margin-right: 10rpx;
				}
			}
		}
	}

	.reply {
		.time {
			margin-left: auto;
			font-size: 20rpx;
			color: #999;
		}

		.name {
			display: inline-block;
			color: #2b85e4;
			font-weight: 600;
		}
	}
}

// 底部内容框
.footer {
	position: absolute;
	bottom: 0;
	width: 100%;
	color: #fff;
	padding: 20rpx;

	.username {
		margin-bottom: 20rpx;
	}
}
</style>
