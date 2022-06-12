<!-- 软件详情 -->
<template>
	<view class="top">
		<view :class="'menu_scroll_top_' + [topBar]">
			<view class="menu-scroll">
				<view class="menu-scroll-leat">
					<view>
						{{ title }}
					</view>
				</view>
			</view>
		</view>
		<image class="headimg" :src="postlunbo" mode="widthFix"></image>
		<view class="app" style="display: flex;">
			<image class="appimg" :src="thumb"></image>
			<view class="others">
				<view class="title">{{ title }}</view>
				<view class="author"><text class="zuoz">软件作者</text> ： <text class="zzname">{{ name }}</text></view>
			</view>
		</view>
		<view class="tims" style="display: flex;">
			<view class="time">{{ time }}</view>
			<view class="views">
				<u-icon name="download" :label="down"></u-icon>
			</view>
		</view>
		<view class="mg20">
			<u-cell-group>
				<u-cell title="应用介绍"></u-cell>
			</u-cell-group>
			<u-scroll-list indicator style="margin-top: 10rpx;">
				<view class="u-demo-block__content">
					<view class="u-page__tag-item" v-for="(item, index) in tag" :key="index">
						<u-tag :text="item.name" plainFill plain shape="circle" size="mini" :name="index"
							@click="radioClick(item.name)">
						</u-tag>
					</view>
				</view>
			</u-scroll-list>
			<!-- <u-parse :content="content"></u-parse> -->
			<MDParserHighlight :resource="content"></MDParserHighlight>
		</view>
		<view class="mg20">
			<u-cell-group>
				<u-cell title="推荐内容"></u-cell>
			</u-cell-group>
			
		</view>
		<!-- v-if="showshare == '1'" -->
		<view >
			<view class="comments">
				<view class="comments_title">评论列表</view>
				<u-empty v-if="!showlist" mode="comment" icon="http://cdn.uviewui.com/uview/empty/comment.png">
				</u-empty>
				<view v-else class="comments_des" v-for="(item, index) in comments" :key="index">
					<view class="comments_flex">
						<image class="fleximg" :src="item.authorImg+'&spec=100'" mode="widthFix"></image>
						<!-- <view class="author">A</view> -->
						<view class="comments_name">{{ item.author }}</view>
						<view class="comments_time">{{ formatDate(item.created) }}</view>
					</view>
					<view class="comment">{{ item.text }}</view>
					<view class="replays" v-if="item.replays">
						<view class="replays_author">{{ item.replays[0].author }}</view>
						<view class="replays_text">{{ item.replays[0].text }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btm">
			<!-- <button class="downbtn">积分下载</button> -->
			<!-- <progress border-radius="50rpx" stroke-width="550rpx" active-color="#50A1FF" backgroundColor="#28ffd1" percent="60"
			></progress> -->
			<button v-if="!showdown" class="downbtn" @click="downss">开始下载</button>
			<view v-else-if="showdown" class="downbtns">
				<!-- <progress stroke-width="40" active-color="#50A1FF" backgroundColor="rgba(33, 211, 173, 0.1)"
					percent="60"></progress> -->
				<u-line-progress :percentage="sleep" activeColor="#50A1FF" inactiveColor="rgba(33, 211, 173, 0.1)"
					showText height="40"></u-line-progress>
			</view>
			<!-- <button class="likes" @click="fabulous" v-if="freedownurl != ''">
				<image class="btmimg" src="/static/details/down.png" mode="widthFix"></image>
				<view class="btmview">免费下载</view>
			</button>
			<button class="likes1" @click="nodown" v-if="freedownurl == ''">
				<image class="btmimg1" src="/static/details/no.png" mode="widthFix"></image>
				<view class="btmview">暂无免费</view>
			</button>
			<button class="likess" @click="downs" v-if="downurl != ''">
				<image class="btmimg" src="/static/details/qd.png" mode="widthFix"></image>
				<view class="btmview">快速下载</view>
			</button>
			<button class="likes2" @click="nodown" v-if="downurl == ''">
				<image class="btmimg" src="/static/details/no.png" mode="widthFix"></image>
				<view class="btmview">暂无资源</view>
			</button> -->
			<button @click="showInp">
				<image class="btmimg" src="/static/details/pinglun.png" mode="widthFix" v-if="!showCmt"></image>
				<image class="btmimg" src="/static/details/pinglun_c.png" mode="widthFix" v-else></image>
			</button>
			<view class="cmt_input" v-if="showCmt">
				<view class="heads">
					<button class="closes" @click="closes">取消</button>
					<button class="saves" @click="addComment">发送</button>
				</view>
				<input v-model="qqnumber" placeholder="请输入QQ号码" placeholder-class="placeholder" />
				<input v-model="commentText" placeholder="请输入评论内容" placeholder-class="placeholder" />
			</view>
		</view>
		<appUpdate v-if="show" :upTit="title" :infosrc="thumb" :downUrl="downUrls" @close="close"
			@updateSucc="updateSucc" @updateErro="updateErro" @downOver="downOver" @maskClick="maskClick"></appUpdate>
		<u-no-network></u-no-network>
		
	</view>
</template>
<script>
	import MDParserHighlight from './cmder-MDParserHighlight/index.vue';
	import API from '../../utils/api.js';
	export default {
		data() {
			return {
				showdown: false,
				sleep: 0,
				downloadTask: null,
				// 会员下载真实地址
				downUrls: '',
				// 显示下载
				show: false,
				// 顶部导航栏
				topBar: 'one',
				// 软件cid
				cid: '',
				//软件名
				name: '',
				// 顶部横幅图
				postlunbo: '',
				//软件图标
				thumb: '',
				//软件名
				title: '',
				//软件标签
				tag: [],
				//软件下载次数
				down: '',
				// 发布时间
				time: '',
				//软件介绍
				content: '',
				//评论显示
				showshare: '',
				//评论数
				commentsNum: '0',
				// 评论列表
				comments: [],
				// 发表评论文字
				commentText: '',
				// 打开评论
				showCmt: false,
				//评论用户名
				yonghuming: "",
				// 评论QQ号码
				qqnumber: "",
				// 评论QQ头像
				nameimg: "",
				// 软件下载地址
				downurl: '',
				//软件免费下载地址
				freedownurl: '',
				//文章评论
				showlist: ''
			}
		},
		components: {
			MDParserHighlight
		},
		onLoad(e) {
			// console.log(e)
			this.topMenu();
			this.id = e.id;
			this.name = e.name;
			this.getCategoriesList();
			this.getComments();
		},
		
		onPullDownRefresh() {
			//下拉刷新
			this.getCategoriesList();
			setTimeout(function() {
				uni.showToast({
					title: '刷新成功'
				});
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onPageScroll: function(e) {
			// 判断型号 显示不同标题栏高度
			var that = this;
			if (e.scrollTop > 120) {
				that.topBar = 'tow';
			} else {
				that.topBar = 'one';
			}
		},
		methods: {
			downss: function() {
				let token = uni.getStorageSync('Token');
				console.log(token)
				if (token !== null && token !== '') {
					uni.request({
						url: 'http://易如意后台域名/api.php?act=get_info' + '&app=10000' + '&token=' +
							token,
						method: 'GET',
						data: {},
						success: res => {
							console.log(res.data.msg.vip)
							var date = new Date()							
							if (res.data.msg.vip-date>0) {
								this.showdown = true
								var downurls = this.downurl;
								// console.log(this.downurl)
								if (downurls.indexOf('lanzou') != -1) {
									uni.request({
										url: 'http://蓝奏云解析域名/lanzou.php?url=' + this
											.downurl,
										method: 'GET',
										success: (res) => {
											this.downUrls = res.data.download
											// console.log(this.downUrls)
											this.downapk()
										}
									});
								} else if (downurls.indexOf('.apk') != -1) {
									this.showdown = true
									this.downUrls = this.downurl
									// console.log(this.downUrls)
									this.downapk()
								} else {
									uni.showToast({
										title: '不支持此链接下载方式！！'
									})
								}
							}else if (res.data.msg.vip=='999999999') {
								this.showdown = true
								var downurls = this.downurl;
								// console.log(this.downurl)
								if (downurls.indexOf('lanzou') != -1) {
									uni.request({
										url: 'http://蓝奏云解析域名/lanzou.php?url=' + this
											.downurl,
										method: 'GET',
										success: (res) => {
											this.downUrls = res.data.download
											// console.log(this.downUrls)
											this.downapk()
										}
									});
								} else if (downurls.indexOf('.apk') != -1) {
									this.showdown = true
									this.downUrls = this.downurl
									// console.log(this.downUrls)
									this.downapk()
								} else {
									uni.showToast({
										title: '不支持此链接下载方式！！'
									})
								}
							} else {
								uni.request({
									url: 'http://易如意后台域名/api.php?act=get_fen&app=10000&token=' + token +'&fid=4',
									method: 'GET',
									data: {},
									success: (res) => {
										// this.downUrls = res.data.download
										console.log(res.data)
										if(res.data.code=='200'){
											uni.showToast({
												title:'扣除10积分，开始下载！',
												icon:'none'
											})
											this.showdown = true
											var downurls = this.downurl;
											// console.log(this.downurl)
											if (downurls.indexOf('lanzou') != -1) {
												uni.request({
													url: 'http://蓝奏云解析域名/lanzou.php?url=' + this
														.downurl,
													method: 'GET',
													success: (res) => {
														this.downUrls = res.data.download
														console.log(this.downUrls)
														this.downapk()
													}
												});
											} else if (downurls.indexOf('.apk') != -1) {
												this.showdown = true
												this.downUrls = this.downurl
												console.log(this.downUrls)
												this.downapk()
											} else {
												uni.showToast({
													title: '不支持此链接下载方式！！'
												})
											}
										}else{
											uni.showToast({
												title:'积分不足',
												icon:'error'
											})
											uni.showModal({
												title: '友情提示',
												content: '您积分不足，是否前去购买积分？或者购买会员即可免积分下载？',
												success: function(res) {
													if (res.confirm) {
														console.log('用户点击确定');
														uni.switchTab({
															url:'../my/vip/shop'
														})
													} else if (res.cancel) {
														console.log('用户点击取消');
													}
												},
											})
										}
									}
								});
							}
						}
					})
				} else {
					uni.showModal({
						title: '友情提示',
						content: '您未登录软件，登录后即可享受软件下载功能，是否前去登录？',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '../my/account/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						},
					})
				}
			},
			downapk: function() {
				this.downloadTask = uni.downloadFile({
					url: this.downUrls,
					success: (res) => {
						console.log(res)
						if (res.statusCode == 200) {
							uni.showModal({
								title: '',
								content: '下载完成，确定现在安装吗？',
								confirmText: '安装',
								confirmColor: '#EE8F57',
								success: (res2) => {
									if (res2.confirm) {
										console.log("开始安装")
										plus.runtime.install( //安装
											res.tempFilePath, {},
											(res) => {
												console.log(res,
													'**************************')
												this.$emit('updateSucc')
												plus.runtime.restart();
											},
											(err) => {
												console.log(err)
												this.$emit('updateErro')
											});
									}
								}
							});
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
				this.downloadTask.onProgressUpdate((res) => {
					// console.log('下载进度' + res.progress);
					this.sleep = res.progress
					if (res.progress == 100) {
						this.showdown = false
						this.$emit('downOver')
					}
				});
			},
			//加载软件内容
			getCategoriesList: function() {
				var that = this;
				var id = this.id;
				// console.log(id)
				console.log(API.GetPostsbyID(id))
				
				uni.request({
					url: API.GetPostsbyID(id),
					success: function(res) {
						console.log(res)
						var a = res.data;
						// console.log(res);
						that.title = a.title;
						that.content = a.content;
						that.thumb = a.thumb;
						that.postlunbo = a.postlunbo[0].str_value;
						that.time = a.year + '年' + a.month + '月' + a.day + '日';
						that.name = a.name.screenName;
						that.down = a.views[0].views;
						that.commentsNum = a.commentsNum;
						that.freedownurl = a.freedownurl[0].str_value;
						that.downurl = a.downurl[0].str_value;
						that.description = a.description[0].str_value;
						that.tag = a.tag;
						that.commentsNum = a.commentsNum;
						that.showshare = a.showshare;
						console.log(that.commentsNum)
					}
				});
			},
			//获取顶部导航高度
			topMenu: function() {
				var that = this;
				uni.getSystemInfo({
					success: function(res) {
						that.BarHeight = res.statusBarHeight;
					}
				});
			},
			//标签点击
			radioClick: function(name) {
				console.log(name)
				uni.navigateTo({
					url: '/subPage/commen/commenlist?name=' + name
				})
			},
			//获取评论信息
			getComments: function() {
				var that = this;
				uni.request({
					url: API.GetPostsCommentbyCID(that.cid),
					success: function(res) {
						var ress = res.data.data;
						// var yyy = typeof(ress);
						// console.log(ress)
						if (typeof(ress) != 'undefined' && ress != "none" && ress != "NULL") {
							that.showlist = true;
							that.comments = res.data.data;
							console.log(that.comments)
						} else {
							that.showlist = false;
						}
						// console.log(that.showlist)
					}
				});
			},
			//点击下载
			downs: function() {
				let token = uni.getStorageSync('Token');
				// console.log(token)
				if (token !== null && token !== '') {
					uni.request({
						url: 'http://易如意后台域名/api.php?act=get_info' + '&app=10000' + '&token=' +
							token,
						method: 'GET',
						data: {},
						success: res => {
							// console.log(res)
							if (res.data.msg.vip == '999999999') {
								var downurls = this.downurl;
								// console.log(this.downurl)
								if (downurls.indexOf('lanzou') != -1) {
									uni.request({
										url: 'http://114.115.164.207/lanzou.php?url=' + this
											.downurl,
										method: 'GET',
										data: {},
										success: (res) => {
											this.downUrls = res.data.download
											// console.log(res.data)
											this.show = true
										}
									});
								} else {
									this.downUrls = this.downurl
									console.log(this.downUrls)
									this.show = true
								}
							} else {
								var dates = new Date();
								var date = new Date(res.data.msg.vip * 1000);
								var vipdate = date - dates;
								if (vipdate > 0) {
									var downurls = this.downurl;
									// console.log(this.downurl)
									if (downurls.indexOf('lanzou') != -1) {
										uni.request({
											url: 'http://114.115.164.207/lanzou.php?url=' + this
												.downurl,
											method: 'GET',
											data: {},
											success: (res) => {
												this.downUrls = res.data.download
												// console.log(res.data)
												this.show = true
											}
										});
									} else if (downurls.indexOf('.apk') != -1) {
										this.downUrls = this.downurl
										// console.log(this.downUrls)
										this.show = true
									} else {
										uni.showToast({
											title: '不支持此链接下载方式！！'
										})
									}
								} else {}
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.showModal({
						title: '未登录账号',
						content: '您没有登录账号，暂时不能使用软件功能，是否去登陆？',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '../my/account/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						},
					});
				}
			},
			//无资源点击
			nodown: function() {
				uni.showToast({
					title: '暂无此资源',
					icon: 'none'
				})
			},
			// 打开评论输入
			showInp: function() {
				this.showCmt = !this.showCmt;
			},
			// 关闭评论输入
			closes: function() {
				this.showCmt = !this.showCmt;
			},
			//发表评论
			addComment: function() {
				// uni.showToast({
				// 	icon:'none',
				// 	title:'暂未开通',
				// })
				var that = this;
				var qq = that.qqnumber;
				var names = that.yonghuming;
				var cmt = that.commentText;
				if (qq == '') {
					uni.showToast({
						icon: 'none',
						title: '请填写QQ'
					});
				} else {
					uni.request({
						url: 'https://api.linhun.vip/api/NicknameAvatar?qq=' + qq,
						success: function(res) {
							that.nameimg = res.data.imgurl;
							that.yonghuming = res.data.name;
							console.log(that.nameimg)
							if (cmt == '') {
								uni.showToast({
									icon: 'none',
									title: '总得写些什么吧'
								});
							} else {
								// https://www.diysqq.cn/api/addcomment?cid=418&author=&text=&icon=&apisec=xumijiezi
								uni.request({
									url: API.Postcomment(that.cid, that.yonghuming, cmt, that
										.nameimg),
									success: function(res) {
										console.log(res.data)
										that.getComments(that.cid);
										that.commentText = '';
										uni.showToast({
											title: '评论需要审核才可以显示',
											icon: 'none'
										});
									}
								});
							}
						}
					})
				}
			},
			//免费下载
			fabulous: function() {
				plus.runtime.openURL(this.freedownurl);
			},
			//评论时间解析
			formatDate(datetime) {
				var datetime = new Date(parseInt(datetime * 1000));
				// 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
				var year = datetime.getFullYear(),
					month = ('0' + (datetime.getMonth() + 1)).slice(-2),
					date = ('0' + datetime.getDate()).slice(-2),
					hour = ('0' + datetime.getHours()).slice(-2),
					minute = ('0' + datetime.getMinutes()).slice(-2);
				//second = ("0" + date.getSeconds()).slice(-2);
				// 拼接
				var result = year + '-' + month + '-' + date;
				// 返回
				return result;
			},
			//关闭下载
			close() {
				console.log("关闭弹窗")
				this.show = false
			},
			updateSucc() {
				console.log("监听安装成功")
			},
			updateErro() {
				console.log("监听安装失败")
			},
			downOver() {
				console.log("监听文件下载成功")
			},
			maskClick() {
				console.log("遮罩层呗点击")
				this.show = false
			},
		}
	}
</script>
<style>
	.top {
		padding-bottom: 50rpx;
	}

	.heads {
		display: flex;
		width: 100%;
		margin-bottom: 30rpx;
	}

	.saves {
		width: 25%;
		background: #0081FF;
		box-shadow: 1px 1px 3px #1184ff;
		color: #FFFFFF;
		border-radius: 40rpx;
		font-size: 30rpx;
		margin-right: 0rpx;
	}

	.closes {
		width: 25%;
		background: #dd4a40;
		box-shadow: 1px 1px 3px #dd7167;
		color: #FFFFFF;
		border-radius: 40rpx;
		font-size: 30rpx;
		margin-left: 0rpx;
	}

	input {
		box-shadow: 0 0 8rpx #cccccc;
		border-radius: 30rpx;
		width: 100%;
		margin-bottom: 20px;
		padding: 0 30rpx;
		height: 80rpx;
		font-size: 28rpx;
		box-sizing: 1rpx;
	}

	.cmt_input {
		background-color: #ffffff;
		position: fixed;
		bottom: 0rpx;
		padding: 30rpx;
		width: 100%;
		box-shadow: 0px -4px 7px rgba(0, 0, 0, 0.2);
		border-radius: 30px 30px 0 0;
	}

	.placeholder {
		color: #626262;
	}

	.btmimg {
		width: 45rpx;
	}

	.btmimg1 {
		width: 42rpx;
	}

	button::after {
		border: none;
	}

	button {
		background-color: #ffffff;
		height: 70rpx;
	}

	.btmview {
		padding-left: 11rpx;
		line-height: 50rpx;
		font-size: 30rpx;
		color: #ffffff;
	}

	.downbtns {
		width: 550rpx;
		height: 80rpx;
		margin-left: 40rpx;
	}

	.downbtn {
		background-color: #50A1FF;
		width: 550rpx;
		margin-top: 3rpx;
		/* display: flex; */
		border-radius: 50rpx;
		color: #FFFFFF;
		/* box-shadow: 0 0 15rpx #50A1FF; */
		height: 80rpx;
		line-height: 80rpx;
		font-size: 40rpx;
	}

	.uni-progress-bar {
		border-radius: 50rpx;
	}

	.uni-progress-inner-bar {
		border-radius: 50rpx;
	}

	.likes {
		display: flex;
		background-color: #0081FF;
		width: 240rpx;
		margin-top: 7rpx;
		border-radius: 30rpx;
		height: 60rpx;
		box-shadow: 0 0 15rpx #1184ff;
		align-items: center;
	}

	.likes1 {
		display: flex;
		background-color: #0081FF;
		width: 240rpx;
		margin-top: 7rpx;
		border-radius: 30rpx;
		height: 60rpx;
		box-shadow: 0 0 15rpx #1184ff;
		align-items: center;
	}

	.likes2 {
		display: flex;
		background-color: #ffaa00;
		width: 240rpx;
		margin-top: 7rpx;
		border-radius: 30rpx;
		height: 60rpx;
		box-shadow: 0 0 15rpx #ffaa00;
		align-items: center;
	}

	.likess {
		display: flex;
		background-color: #ffaa00;
		width: 240rpx;
		margin-top: 7rpx;
		border-radius: 30rpx;
		height: 60rpx;
		box-shadow: 0 0 15rpx #ffaa00;
		align-items: center;
	}

	.btm {
		/* border: #000000; */
		/* border:; */
		border-top: solid 1rpx #efefef;
		position: fixed;
		background-color: #ffffff;
		width: 750rpx;
		bottom: 0;
		height: 100rpx;
		display: flex;
		justify-content: space-around;
		/* margin-top: 20rpx; */
		align-items: center;
		z-index: 9999;
	}

	.comments_title {
		font-size: 35rpx;
		width: 140rpx;
		padding-bottom: 10rpx;
		border-bottom: 5rpx solid #000000;
		margin-bottom: 30rpx;
	}

	.comments_flex {
		display: flex;
		margin-top: 20rpx
	}

	.fleximg {
		width: 100rpx;
		border-radius: 10rpx;
	}

	.comments_author {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		font-size: 20rpx;
		background-color: #888888;
		line-height: 70rpx;
		text-align: center;
		color: #ffffff;
	}

	.comments_name {
		line-height: 70rpx;
		margin-left: 20rpx;
		font-size: 30rpx;
		color: #8c8c8c;
	}

	.comments_time {
		margin-left: auto;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #8c8c8c;
	}

	.comment {
		margin: 30rpx;
		margin-left: 80rpx;
		font-size: 30rpx;
	}

	.replays {
		display: flex;
		margin: 20rpx;
		border: 1rpx solid #d5d5d5;
		font-size: 28rpx;
		padding: 10rpx;
	}

	.replays_author {
		background-color: #b8d0dd;
		padding: 5rpx;
		margin-right: 10rpx;
	}

	.replays_text {
		line-height: 48rpx;
	}

	.comments_des {
		border-bottom: 1rpx solid #f5f5f5;
	}

	.comments_des:last-child {
		border: none;
	}

	.comments {
		margin: 30rpx 20rpx 100rpx 20rpx;
	}

	.u-demo-block__content {
		line-height: 35px;
		max-height: 35px;
		white-space: normal;
		/* flex-direction: row; */
		flex-wrap: wrap;
		align-items: center;
		margin-top: 10rpx;
	}

	.u-page__tag-item {
		margin-right: 10px;
	}

	.menu-scroll-leat {
		align-items: flex-end;
		white-space: nowrap;
		color: #027CFF;
		border-radius: 20upx;
		padding: 5upx;
		width: 100%;
		text-align: center;
		font-size: 23px;
	}

	.menu-scroll {
		display: flex;
		justify-content: space-between;
		padding: 0upx 30upx 10upx 30upx;
		justify-content: flex-start;
	}

	.headimg {
		width: 100%;
		height: auto;
	}

	.app {
		width: 710rpx;
		height: 120rpx;
		margin: 40rpx;
	}

	.mg20 {
		margin: 20rpx 40rpx 40rpx 40rpx;
	}

	.appimg {
		margin: 5rpx;
		width: 110rpx;
		height: 110rpx;
		border-radius: 20rpx;
		box-shadow: 1px 1px 6px rgba(11, 11, 11, 0.6);
	}

	.others {
		margin-left: 35rpx;
		height: 100%;
	}

	.title {
		font-size: 40rpx;
		font-weight: bold;
	}

	.zuoz {
		border-radius: 20rpx;
		// color: #FFFFFF;
		// padding: 0 10rpx;
		// background: #0081FF;
		margin-right: 10rpx;
		// box-shadow: 0px 0px 3px #189bff;
	}

	.zzname {
		border-radius: 20rpx;
		color: #FFFFFF;
		padding: 0 10rpx;
		background: #ff557f;
		box-shadow: 0px 0px 5px #ff6ca0;
	}

	.author {
		font-size: 30rpx;
		margin-top: 30rpx;
	}

	.tims {
		width: 710rpx;
		margin: 40rpx 40rpx 0rpx 40rpx;
	}

	.time {
		font-size: 30rpx;
		color: #8799a3;
	}

	.views {
		font-size: 30rpx;
		color: #8799a3;
		margin-left: auto;
		margin-right: 30rpx;
	}

	.menu_scroll_top_one {
		position: fixed;
		top: -300upx;
		left: 0;
		width: 100%;
		z-index: 90;
		padding-top: 60upx;
	}

	.menu_scroll_top_tow {
		position: fixed;
		top: -1upx;
		left: 0;
		background-color: #ffffff;
		width: 100%;
		z-index: 90;
		padding-top: 60upx;
		border-radius: 0upx 0upx 30upx 30upx;
	}
</style>
