<template>
	<view>
		<view class="info-box">
			<view class="user-item">
				<image @click="jumpUser(postDetail.uid)" mode="aspectFill" :src="postDetail.userInfo.avatar"></image>
				<view class="user-item-user">
					<text v-if="postDetail.userInfo.vip_expire_time > timestamp" style="color: red;" class="user-name">{{ postDetail.userInfo.username }}</text>
					<text v-else class="user-name">{{ postDetail.userInfo.username }}</text>
					
					<view class="cxplain">{{ postDetail.userInfo.intro }}</view>
				</view>
				<u-button v-show="postDetail.is_follow" size="mini" style="float:right;font-size: 14px;"
					@click="cancelFollow">已关注</u-button>
				<u-button v-show="!postDetail.is_follow" size="mini" style="float:right;font-size: 14px;"
					@click="follow">关注</u-button>
			</view>
			<view class="icon">
				<text>{{ postDetail.create_time | timeFrom }}</text>
				<text style="margin-left: 20rpx;color: red;">需打赏{{ postDetail.integral}}音叶</text>
			</view>
			<view class="hr"></view>
			<view class="post-title">{{ postDetail.title }}</view>
			<text class="post-text" @longpress="onCopy" :user-select="true">{{ postDetail.content }}</text>
			<!-- 图片 -->
			<block v-if="postDetail.type == 1">
				<!--一张图片-->
				<block v-if="postDetail.media.length == 1">
					<image class="img-style-1" @tap.stop="previewImage" mode="aspectFill"
						:data-current="postDetail.media[0]" :data-image="postDetail.media" :src="postDetail.media[0]">
					</image>
				</block>
				<!--二张图片-->
				<block v-if="postDetail.media.length == 2">
					<view class="img-style-2">
						<image v-for="(mediaItem, index2) in postDetail.media" :key="index2" @tap.stop="previewImage"
							mode="aspectFill" :data-current="mediaItem" :data-image="postDetail.media" :src="mediaItem">
						</image>
					</view>
				</block>
				<!--三张以上图片-->
				<block v-if="postDetail.media.length > 2">
					<view class="img-style-3">
						<image v-for="(mediaItem, index2) in postDetail.media" :key="index2" @tap.stop="previewImage"
							mode="aspectFill" :data-current="mediaItem" :data-image="postDetail.media" :src="mediaItem">
						</image>
					</view>
				</block>
			</block>
			<block v-if="postDetail.type == 2 && postDetail.media.length > 0"><video :controls="false" :autoplay="true"
					:src="postDetail.media[0]"></video></block>
			<!-- 投票 -->
			<view v-if="postDetail.type === 4" class="vote-box">
				<view class="title">{{ postDetail.vote_info.title }}</view>
				<view class="expire-time" v-if="postDetail.vote_info.type === 1">单选</view>
				<view class="expire-time" v-if="postDetail.vote_info.type === 2">多选</view>
				<!-- 是否投票失效 -->
				<view class="expire-box" v-if="isVoteExpire">投票过期了</view>
				<view v-else class="expire-time">截止：{{ postDetail.vote_info.expire_time | date('yyyy年mm月dd日hh时MM分') }}
				</view>
				<view class="vote-item" @click="castVote(index2, postDetail.vote_info.type)"
					:class="{ active: item2.checked }" v-for="(item2, index2) in postDetail.vote_info.options"
					:key="index2">
					<text v-if="postDetail.is_vote_result || isVoteExpire">
						{{ item2.content }}
						<text style="color: #999;margin-left: 20rpx;">({{ item2.ticket_num }}票)</text>
					</text>
					<text v-else="postDetail.is_vote_result">{{ item2.content }}</text>
				</view>
				<u-button v-if="!postDetail.is_vote_result && isVoteExpire === false" @click="voteSubmit">投票</u-button>
			</view>
			<!-- 圈子信息 -->
			<navigator v-if="postDetail.topic_id" class="topic-info"
				:url="'/pages/topic/detail?id=' + postDetail.topic_id">
				<image mode="aspectFill" class="cover" :src="postDetail.topic_info.cover_image"></image>
				<view class="center">
					<view class="desc">{{ postDetail.topic_info.topic_name.substring(0, 15) }}</view>
					<view class="count-txt">{{ postDetail.topic_info.user_count }}人加圈 |
						{{ postDetail.topic_info.post_count }}篇内容
					</view>
				</view>
				<view class="right">
					<text>去看看</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</navigator>
			<!--点赞、分享、评论-->
			<view class="p-footer">
				<block v-if="postDetail.is_collection">
					<view class="p-item" @click="cancelCollection">
						<u-icon name="thumb-up" color="#d81e06" class="icon" :size="35"></u-icon>
						<text>{{ postDetail.collection_count }}</text>
					</view>
				</block>
				<block v-else>
					<view class="p-item" @click="addCollection">
						<u-icon name="thumb-up" class="icon" :size="35"></u-icon>
						<text>{{ postDetail.collection_count }}</text>
					</view>
				</block>
				<view class="p-item" @click="focus = true">
					<u-icon name="chat" class="icon" :size="35"></u-icon>
					<text>{{ postDetail.comment_count }}</text>
				</view>
				<view class="p-item" @click="showShare = true">
					<u-icon name="zhuanfa" class="icon" :size="35"></u-icon>
					<text>分享</text>
				</view>
			</view>
		</view>
		<view class="comment-box">
			<view class="title">评论（{{ commentList.length }}）</view>
			<view style="margin-bottom: 40rpx;" v-for="(item, index) in commentList" :key="index">
				<view class="comment-item" @longpress="delComment(item, index)">
					<image @click="jumpUser(item.userInfo.uid)" class="avatar" :src="item.userInfo.avatar"></image>
					<view class="c-content" @click="onReply(item)">
						<view class="user">
							<text>{{ item.userInfo.username }}</text>
							<block v-if="item.is_thumbs">
								<view @click.stop="cancelThumbs(item.id, index)" class="thumbs">
									<text class="num">{{ item.thumbs }}</text>
									<u-icon class="icon" size="40" name="heart-fill" color="#e62e00"></u-icon>
								</view>
							</block>
							<block v-else>
								<view @click.stop="onThumbs(item.id, index)" class="thumbs">
									<text class="num">{{ item.thumbs }}</text>
									<u-icon class="icon" size="40" name="heart-fill" color="#bfbfbf"></u-icon>
								</view>
							</block>
						</view>
						<text class="c-txt">{{ item.content }}</text>
						<text class="time">{{ item.create_time | timeFrom }}</text>
					</view>
				</view>
				<view @longpress="delComment(item, index, index2)" @click="onReply(item2, index, index2)"
					v-if="item.children.length > 0" v-for="(item2, index2) in item.children" :key="item2.id"
					class="sub-comment-item">
					<view class="user">
						<u-avatar class="avatar" :size="40" :src="item2.userInfo.avatar"></u-avatar>
						<view class="u-head">
							<text>{{ item2.userInfo.username }}</text>
							<block v-if="item2.is_thumbs">
								<view class="thumbs" @click.stop="cancelThumbs(item2.id, index, index2)">
									<text class="num">{{ item2.thumbs }}</text>
									<u-icon class="icon" size="40" name="heart-fill" color="#e62e00"></u-icon>
								</view>
							</block>
							<block v-else>
								<view class="thumbs" @click.stop="onThumbs(item2.id, index, index2)">
									<text class="num">{{ item2.thumbs }}</text>
									<u-icon class="icon" size="40" name="heart-fill" color="#bfbfbf"></u-icon>
								</view>
							</block>
						</view>
					</view>
					<view class="reply">
						<text>回复</text>
						<navigator :url="'/pages/user/home?uid=' + item2.to_user.uid" hover-class="none" class="name">
							{{ item2.to_user.username }}
						</navigator>
						<text>：{{ item2.content }}</text>
						<view class="time">{{ item2.create_time | timeFrom }}</view>
					</view>
				</view>
			</view>
			<!-- 加载状态 -->
			<block v-if="commentList.length > 0">
				<view style="margin: 30rpx;">
					<u-loadmore :status="loadStatus" />
				</view>
			</block>
			<block v-else>
				<u-empty text="暂无评论" mode="message"></u-empty>
			</block>
		</view>
		<view style="height: 100rpx;"></view>
		<!-- 评论输入框 -->
		<view class="comment-tool">
			<textarea :placeholder="placeholder" @blur="onBlur" :focus="focus" fixed="true" cursor-spacing="10"
				v-model="form.content" auto-height="true" placeholder-class="txt-placeholder"></textarea>
			<u-button type="warning" @click="addComment" :disabled="isSubmitD" style="border-radius: 0;">发布</u-button>
		</view>
		<!-- 分享选择弹窗 -->
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
		<!-- 海报弹窗 -->
		<u-popup v-model="showCanvas" mode="center" width="80%">
			<view class="canvas-box">
				<canvas style="width: 300px;height: 450px;" canvas-id="shareCanvas"></canvas>
				<view class="footer">
					<q-button @click="saveImgToAlbum" type="success" shape="circle">保存/分享</q-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				unitId: this.$c.postDetailAd,
				postId: 0,
				postDetail: {
					comment: [],
					media: [],
					comment_list: {
						data: []
					},
					topic_info: {
						topic_name: ''
					},
					userInfo: {
						avatar: ''
					}
				},
				focus: false,
				isSubmitD: false,
				commentList: [],
				placeholder: '说点什么...',
				form: {
					pid: 0,
					type: 1,
					to_uid: '',
					post_id: '',
					content: ''
				},
				showShare: false,
				showCanvas: false,
				page: 1,
				loadStatus: 'loadmore',
				isVoteExpire: false
			};
		},
		computed:{
			timestamp(){
				return Date.parse(new Date()) / 1000
			}
		},
		onShow() {
			// if (!this.$store.state.userInfo.uid) {
			// 	this.toMy();
			// }
		},
		onLoad(options) {
			this.postId = options.id;

			if (options.scene) {
				this.postId = options.scene;
			}

			this.form.post_id = this.postId;
			this.getPostDetail();
			this.getCommentList();

			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			});
			//#endif
		},
		onReachBottom() {
			this.page++;
			this.getCommentList();
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
				path: '/pages/post/detail?id=' + this.postId,
				imageUrl: imgURL
			};
		},
		onShareTimeline() {
			let imgURL = (imgURL = this.postDetail.media[0]);
			return {
				title: this.postDetail.content,
				imageUrl: imgURL,
				query: 'id=' + this.postId
			};
		},
		methods: {
			toMy() {
				uni.switchTab({
					url: '/pages/my/my'
				});
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
			voteSubmit() {
				let voteDate = [];
				this.postDetail.vote_info.options.forEach(item => {
					if (item.checked) {
						voteDate.push(item.id);
					}
				});

				this.$H
					.post('vote/userVote', {
						id: this.postDetail.vote_info.id,
						vote: voteDate
					})
					.then(res => {
						if (res.code == 200) {
							this.getPostDetail();
						}
					});
			},
			castVote(index, type) {
				if (!this.postDetail.is_vote_result && !this.isVoteExpire) {
					if (type === 1) {
						this.postDetail.vote_info.options.forEach(item => {
							this.$set(item, 'checked', false);
						});
					}
					let checked = this.postDetail.vote_info.options[index].checked;
					if (checked) {
						this.$set(this.postDetail.vote_info.options[index], 'checked', false);
					} else {
						this.$set(this.postDetail.vote_info.options[index], 'checked', true);
					}
				}
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
						uni.showToast({
							title: '复制成功'
						});
					}
				});
			},
			// 保存海报到相册
			saveImgToAlbum() {
				let that = this;
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: 300,
					height: 450,
					canvasId: 'shareCanvas',
					success: function(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								that.showCanvas = false;
							}
						});
					}
				});
			},
			// 生成分享海报
			async shareCanvas() {
				uni.showLoading({
					mask: true,
					title: '正在生成海报'
				});

				this.showCanvas = true;
				this.showShare = false;
				var context = uni.createCanvasContext('shareCanvas');

				//白色背景矩形
				context.setFillStyle('#FFFFFF');
				context.fillRect(0, 0, 300, 450);

				//帖子封面
				let coverSrc;
				if (this.postDetail.media[0]) {
					coverSrc = this.postDetail.media[0];
				} else {
					coverSrc = 'https://' + this.$c.baseUrl + '/uploads/default_shre_bg.jpg';
				}

				let coverImg = await this.downloadFile(coverSrc);
				context.drawImage(coverImg, 0, 0, 300, 240);

				// 文字内容
				context.setFillStyle('#616161');
				context.setFontSize(14);
				this.drawText(context, this.postDetail['content'], 20, 270, 30, 260, 5);

				// 来源
				context.setFillStyle('#616161');
				context.setFontSize(14);
				context.fillText('来源：云喵圈子', 20, 430, 300);

				// 圈子二维码
				let qrCode = await this.getQrCode();
				let tempQrCode = await this.downloadFile(qrCode);
				context.drawImage(tempQrCode, 220, 370, 70, 70);

				context.draw();

				uni.hideLoading();
			},
			/**
			 * 绘制多行文本
			 * ctx canvas对象
			 * str 文本
			 * leftWidth 距离左侧的距离
			 * initHeight 距离顶部的距离
			 * titleHeight 文本的高度
			 * canvasWidth 文本的宽度
			 * canvasWidth 文本行数
			 * @returns {*}
			 */
			drawText(ctx, str, leftWidth, initHeight, titleHeight, canvasWidth, maxRow) {
				let rowNum = 1;
				let lineWidth = 0;
				let lastSubStrIndex = 0; //每次开始截取的字符串的索引
				for (let i = 0; i < str.length; i++) {
					lineWidth += ctx.measureText(str[i]).width;
					if (lineWidth > canvasWidth && rowNum <= maxRow) {
						ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
						initHeight += 22; //22为 文字大小20 + 2
						lineWidth = 0;
						lastSubStrIndex = i;
						titleHeight += 22;

						rowNum++;
					}
					if (i == str.length - 1 && rowNum <= maxRow) {
						//绘制剩余部分
						ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
					}
				}
				// 标题border-bottom 线距顶部距离
				titleHeight = titleHeight + 10;
				return titleHeight;
			},
			downloadFile(url) {
				return new Promise(resolve => {
					uni.downloadFile({
						url: url,
						success: res => {
							resolve(res.tempFilePath);
						}
					});
				});
			},
			getQrCode() {
				return new Promise(resolve => {
					this.$H
						.get('post/qrCode', {
							id: this.postId
						})
						.then(res => {
							resolve(res.result);
						});
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
				this.form.pid = 0;
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
			jumpUser(uid) {
				uni.navigateTo({
					url: '/pages/user/home?uid=' + uid
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
						this.getPostDetail();
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

						// 投票帖子
						if (res.result.vote_id > 0) {
							res.result.vote_info.options.forEach(item => {
								this.$set(item, 'checked', false);
							});

							let timestamp = Date.parse(new Date()) / 1000;
							if (res.result.vote_info.expire_time < timestamp) {
								this.isVoteExpire = true;
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
							this.postDetail.is_collection = false;
							this.postDetail.collection_count--;
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
							this.postDetail.is_collection = true;
							this.postDetail.collection_count++;
						}
					});
			},
			addThumb() {
				this.$H
					.post('post/addThumb', {
						id: this.postId
					})
					.then(res => {
						if (res.code === 200) {
							this.postDetail.is_thumb = true;
						}
					});
			},
			cancelThumb() {
				this.$H
					.post('post/cancelThumb', {
						id: this.postId,
						uid: this.postDetail.uid
					})
					.then(res => {
						if (res.code === 200) {
							this.postDetail.is_thumb = false;
						}
					});
			},
			follow() {
				this.$H
					.post('user/addFollow', {
						id: this.postDetail.uid
					})
					.then(res => {
						if (res.code === 200) {
							this.postDetail.is_follow = true;
						} else {
							this.$refs.uToast.show({
								title: res.msg,
								type: 'error'
							});
						}
					});
			},
			cancelFollow() {
				this.$H
					.post('user/cancelFollow', {
						id: this.postDetail.uid
					})
					.then(res => {
						if (res.code === 200) {
							this.postDetail.is_follow = false;
						}
					});
			},
			previewImage(e) {
				let that = this;
				this.$H.post("post/checkint",{
					post_id:this.postId
				}).then(res3 =>{
					if(res3.code==200){
						that.$u.toast('');
						uni.previewImage({
							current: e.currentTarget.dataset
								.current, // 当前显示图片的http链接
							urls: e.currentTarget.dataset.image // 需要预览的图片http链接列表
						});
					}else{
						that.$u.toast('');
				if (that.postDetail.integral == 0) {
					uni.previewImage({
						current: e.currentTarget.dataset
							.current, // 当前显示图片的http链接
						urls: e.currentTarget.dataset.image // 需要预览的图片http链接列表
					});
				} else {
					that.$u.toast('');
					uni.showModal({
						title: '下载将消耗一次下载次数,确认后长按保存图片即可',
						content: '原创作者拍摄不易，未经原创作者授权，禁止任何商业用途',
						success: function(res2) {
							if (res2.confirm) {
								that.$H
									.post('post/numdownimg', {
										post_id: that.postId
									})
									.then(res1 => {
										console.log(res1)
										if (res1.code === 200) {
											uni.previewImage({
												current: e.currentTarget.dataset
													.current, // 当前显示图片的http链接
												urls: e.currentTarget.dataset
													.image // 需要预览的图片http链接列表
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
																	uni.previewImage({
																		current: e
																			.currentTarget
																			.dataset
																			.current, // 当前显示图片的http链接
																		urls: e
																			.currentTarget
																			.dataset
																			.image // 需要预览的图片http链接列表
																	});
																} else {
																	that.$u.toast(
																		'音叶不足，请充值音叶或成为会员'
																	);
																	that.jumpVip();
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
			jumpVip() {
				uni.navigateTo({
					url: '/pages/my/vip'
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.post-title {
		margin: 20rpx 0;
	}

	.info-box {
		padding: 20rpx;
		background-color: #ffffff;
	}

	.icon text {
		font-size: 12px;
		color: #999;
		margin-right: 20rpx;
	}

	/*关注*/

	.user-item {
		display: flex;

		.user-item-user {
			flex: 1;

			.cxplain {
				font-size: 12px;
				color: #999;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}

		image {
			width: 80rpx;
			height: 80rpx;
			float: left;
			margin-right: 10rpx;
			border-radius: 50%;
		}
	}

	/*底部操作*/
	.p-footer {
		margin: 30rpx;
		display: flex;
		font-size: 24rpx;
		color: #616161;

		.p-item {
			display: flex;
			align-items: center;

			.icon {
				margin-right: 10rpx;
			}

			&:nth-child(2) {
				margin: 0 auto;
			}

			.iconfont {
				margin-right: 10rpx;
			}
		}
	}

	/*评论列表*/
	.comment-box {
		background-color: #ffffff;
		margin-top: 20rpx;
		padding: 20rpx;
	}

	.comment-box>.title {
		margin-bottom: 20rpx;
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
		background-color: #f5f5f5;
		padding: 20rpx;
		border-radius: 10rpx;
		min-height: 40rpx;
	}

	.comment-tool .u-btn {
		margin-left: 10rpx;
	}

	/*文章图片*/
	.img-style-1 {
		display: block;
		width: 100%;
		max-height: 600rpx;
		border-radius: 5px;
	}

	.img-style-2 {
		display: flex;
	}

	.img-style-2 image {
		margin: 5rpx;
		border-radius: 5px;
		width: 100%;
		height: 294rpx;
	}

	.img-style-3 {
		display: flex;
		flex-wrap: wrap;
	}

	.img-style-3 image {
		width: 31.3%;
		height: 200rpx;
		margin: 1%;
		border-radius: 5px;
	}

	// 圈子信息
	.topic-info {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		background-color: #f5f5f5;
		margin: 20rpx 0;

		.cover {
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
		}

		.center {
			flex: 1;

			.count-txt {
				color: #999;
			}
		}

		.right {
			margin-left: 20rpx;
			color: #f29100;
		}
	}

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

	//海报弹窗
	.canvas-box {
		height: 560px;
		position: relative;

		.footer {
			position: absolute;
			bottom: 20rpx;
			left: 20rpx;
			right: 20rpx;
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

		.active {
			background-color: #333;
			color: #fff;
		}
	}

	.expire-box {
		background-color: #999;
		color: #fff;
		font-size: 24rpx;
		display: inline-block;
		padding: 0 20rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}

	video {
		width: 100%;
	}

	.post-text {
		white-space: pre-wrap;
	}
</style>
