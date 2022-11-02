<template>
	<view style="background-color: #F6F7F9;">
		<view>
		<!-- 	<u-navbar :is-back="false" title="我的" :border-bottom="false" title-color="#000">
				<view class="slot-wrap" slot="right">
					<u-icon name="setting" size="42" @click="toSet"></u-icon>
				</view>
			</u-navbar> -->
			<view class="head">
				<view style="width: 100%;" class="setting-view">	
				
					<u-icon style="" name="setting" size="42" @click="toSet"></u-icon>
					<u-icon style="margin-right: 12rpx;" name="bell" size="42" @click="toSet"></u-icon>
					
				</view>
				<block v-if="hasLogin">
					<view class="userinfo" @click="toUcenter">
						<u-avatar :src="userInfos.avatar"></u-avatar>
						<view class="username">
							<text>{{ userInfos.username }}</text>
							<view class="sub-txt">
								<text>等级：平民{{ userInfos.level }}</text>
								<view @click.stop="jumpVip" v-if="userInfos.is_vip" url="vip" class="vip-tips">vip会员</view>
							</view>
						</view>
						<u-icon class="arrow-right" name="arrow-right"></u-icon>
					</view>
				</block>
				<block v-else>
					<view class="btn-login">
						<q-button @click="jumpLogin" plain>登录</q-button>
						
					</view>
				</block>
				<u-grid v-if="!hasLogin" :col="5" :border="false" style="margin: 20rpx 0;background:none;" @click="toNav">
					<u-grid-item  index="/pages/my/fans">
						<text>0</text>
						<view class="grid-text">粉丝</view>
					</u-grid-item>
					<u-grid-item index="/pages/my/follow">
						<text>0</text>
						<view class="grid-text">关注</view>
					</u-grid-item>
					<u-grid-item index="/pages/my/post">
						<text>0</text>
						<view class="grid-text">发布</view>
					</u-grid-item>
					<u-grid-item index="/pages/my/chong">
						<text>0</text>
						<view class="grid-text">积分</view>
					</u-grid-item>
					<u-grid-item index="/pages/my/numdown">
						<text>0</text>
						<view class="grid-text">下载</view>
					</u-grid-item>
				</u-grid>
				<u-grid v-else :col="5" :border="false" style="margin: 20rpx 0;background:none;" @click="toNav">
					<u-grid-item  index="/pages/my/fans">
						<text>{{ userInfos.fans }}</text>
						<view class="grid-text">粉丝</view>
					</u-grid-item>
					<u-grid-item index="/pages/my/follow">
						<text>{{ userInfos.follow }}</text>
						<view class="grid-text">关注</view>
					</u-grid-item>
					<u-grid-item index="/pages/my/post">
						<text>{{ userInfos.post_num }}</text>
						<view class="grid-text">发布</view>
					</u-grid-item>
					<u-grid-item index="/pages/my/chong">
						<text>{{ userInfos.integral }}</text>
						<view class="grid-text">积分</view>
					</u-grid-item>
					<u-grid-item index="/pages/my/numdown">
						<text>{{ userInfos.downs }}</text>
						<view class="grid-text">下载</view>
					</u-grid-item>
				</u-grid>
			</view>
			<!-- VIP会员 -->
			<block v-if="platform != 'ios'&& userInfos.is_vip == false">
				<navigator v-if="hasLogin" url="vip" hover-class="none" class="vip-wrap">
					<view class="left">
						<view class="title">社区项目项目会员</view>
						<view class="sub">开通社区项目项目会员，尽享权益</view>
					</view>
					<view class="right">
						<view class="kt-btn">开通会员</view>
					</view>
				</navigator>
			</block>
			<block v-else>
				<navigator v-if="hasLogin" url="vip" hover-class="none" class="vip-wrap">
					<view class="left" style="margin-left: 50rpx;">
						<view style="margin-left: 20rpx;" class="title">{{userInfos.vipname}}</view>
						<view class="sub">会员优享精品服务{{userInfos.down}}{{userInfos.downz}}</view>
					</view>
					<view class="right">
						<view class="kt-btn">立即开通</view>
					</view>
				</navigator>
			</block>
			<!-- 社区服务 -->
			<view class="block-wrap">
				<view class="block-title">社区服务</view>
				<u-grid :col="4" :border="false" style="margin: 20rpx 0;" @click="toNav">
					<u-grid-item index="/pages/my/discuss">
						<image class="gn-icon" src="/static/m_1.png"></image>
						<view class="grid-text">我的话题</view>
					</u-grid-item>
		
					<u-grid-item index="/pages/my/topic">
						<image class="gn-icon" src="/static/m_2.png"></image>
						<view class="grid-text">我的圈子</view>
					</u-grid-item>
		
					<u-grid-item index="/pages/my/post">
						<image class="gn-icon" src="/static/m_3.png"></image>
						<view class="grid-text">我的发布</view>
					</u-grid-item>
		
					<u-grid-item index="/pages/my/thumb">
						<image class="gn-icon" src="/static/m_4.png"></image>
						<view class="grid-text">点赞记录</view>
					</u-grid-item>
				</u-grid>
			</view>
			<!-- 市集服务 -->
			<view class="block-wrap">
				<view class="block-title">商城服务</view>
				<u-grid :col="4" :border="false" style="margin: 20rpx 0;" @click="toNav">
					<u-grid-item index="/pages/shop/index">
						<image class="gn-icon" src="/static/m_5.png"></image>
						<view class="grid-text">商城</view>
					</u-grid-item>
					<u-grid-item index="/pages/shop/order/list">
						<image class="gn-icon" src="/static/m_6.png"></image>
						<view class="grid-text">我的订单</view>
					</u-grid-item>
					<u-grid-item index="/pages/shop/car">
						<image class="gn-icon" src="/static/m_9.png"></image>
						<view class="grid-text">购物车</view>
					</u-grid-item>
					<u-grid-item index="/pages/shop/address/list">
						<image class="gn-icon" src="/static/m_7.png"></image>
						<view class="grid-text">收货地址</view>
					</u-grid-item>
				</u-grid>
			</view>
			<!-- 帮助 -->
			<view class="block-wrap">
				<view class="block-title">帮助</view>
				<u-grid :col="4" :border="false" style="margin: 20rpx 0;" @click="toNav">
					<u-grid-item>
						<button open-type="contact" class="u-reset-button">
							<image class="gn-icon" style="margin-bottom: unset;width: 55rpx; height: 55rpx;" src="/static/m_8.png"></image>
							<view class="grid-text">帮助与反馈</view>
						</button>
					</u-grid-item>
					<u-grid-item>
						<button open-type="contact" @click="clearCache" class="u-reset-button">
							<image class="gn-icon" style="margin-bottom: unset;width: 60rpx; height: 60rpx;" src="/static/clear.png"></image>
							<view class="grid-text">清除缓存</view>
						</button>
					</u-grid-item>
					<u-grid-item>
						<button open-type="contact" @click="showShare = true" class="u-reset-button">
							<image class="gn-icon" style="margin-bottom: unset;width: 70rpx; height: 70rpx;"  src="/static/bbh.png"></image>
							<view class="grid-text">版本</view>
						</button>
					</u-grid-item>
					<u-grid-item>
						<button open-type="contact" @click="showShare1 = true"  class="u-reset-button">
							<image class="gn-icon" style="margin-bottom: unset;width: 75rpx; height: 75rpx;" src="/static/gy.png"></image>
							<view class="grid-text">关于我们</view>
						</button>
					</u-grid-item>
				</u-grid>
			</view>
			
			<view style="height: 120rpx;"></view>
			<u-popup v-model="showShare" mode="center" border-radius="20">
				<view style="margin: 30px; padding: 30px;">
					v1.0.0
				</view>
			</u-popup>
			<u-popup v-model="showShare1" mode="center" border-radius="20">
				<view style="margin: 30px; padding: 30px;">
					IceCMS
				</view>
			</u-popup>
			<!-- tabbar -->
			<!-- <q-tabbar :active="4" :count="msgCount"></q-tabbar> -->
		</view>
		<u-button v-show="isLogin" class="mt60" shape="circle" size="large" text="退出登录" @click="tuichu()"></u-button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfos:{},
				mAd: '',
				showShare: false,
				showShare1: false,
				cacheSize: 0,
					//#ifdef APP-PLUS
								isH5Plus:true,
								//#endif
								//#ifndef APP-PLUS
								isH5Plus:false,
								//#endif
								userinfo:{},				
				vipicon:'/static/vip/novip.png',
				isVip: false,
				isLogin: false,
				user: {
					name: '',
					id: '',
					email: '',
					profile: '',
				},
				notice:''
			}
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin;
			},
			timestamp() {
				return Date.parse(new Date()) / 1000;
			},
			platform() {
				return this.$u.os();
			},
			userInfo() {
				return this.$store.state.userInfo;
			},
			msgCount() {
				return this.$store.state.messegeNum;
			},
			getMenus() {
				let arr = new Array;
				for (var a in this.memberMenus) {
					if (this.memberMenus[a].show == 1) {
						arr.push(this.memberMenus[a]);
					}
				}
				return arr;
			}
		},
		onLoad() {
			this.getIsLogin();
			
		},
		onShow() {
			this.getIsLogin();
			if (this.$store.state.userInfo) {
				
				this.getMsgNum();
				this.getUserInfo();
			} else {
				this.jumpLogin();
			}
		},
		onShareAppMessage(e) {},
		onShareTimeline(e) {},
		onPullDownRefresh() {
			this.getIsLogin();
			if (this.$store.state.userInfo) {
				this.getUserInfo();
			}
			uni.stopPullDownRefresh();
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getMsgNum() {
				this.$H.post('message/num').then(res => {
					this.$store.state.messegeNum = [0, 0, 0, res.result.all_count, 0];
				});
			},
			jumpVip() {
				uni.navigateTo({
					url: 'vip'
				});
			},
			getUserInfo() {
				// this.$H.get('user/userInfo').then(res => {
				// 	this.userInfos = res.result;
				// });
				let userInfo= this.$store.state.userInfo
					this.userInfos.email = userInfo.email
					this.userInfos.username = userInfo.name
					this.userInfos.id = userInfo.userid
					this.userInfos.avatar = userInfo.profile
			},
			jumpLogin() {
				let that = this;
				uni.navigateTo({
					url: "/pages/user/login"
				})
			},
			// 微信登录
			wechatLogin() {
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(res) {
								console.log(res);
								that.$H.post('user/appWxLogin', {
									openid: res.userInfo.openId,
									username: res.userInfo.nickName,
									avatar: res.userInfo.avatarUrl,
									province: res.userInfo.province,
									city: res.userInfo.city,
									gender: res.userInfo.gender,
									unionid: res.userInfo.unionId
								}).then(res2 => {
									console.log(res2);
									if (res2.code === 200) {
										that.$store.commit('login', res2.result);
										that.getUserInfo();
										uni.closeAuthView();
									} else {
										uni.navigateBack();
									}
								})
							}
						});
					},
					fail(err) {
						console.error('授权登录失败:' + JSON.stringify(err));
					}
				});
			},
			jumpLogin() {
				let that = this;
				uni.navigateTo({
					url: "/pages/user/login"
				})
			},
			toUcenter() {
				uni.navigateTo({
					url: '/pages/user/edit-info/edit'
				});
			},
			toChong() {
				uni.navigateTo({
					url: '/pages/my/chong'
				});
			},
			toSet() {
				uni.navigateTo({
					url: '/pages/my/setting'
				});
			},
			toAgr(i) {
				uni.navigateTo({
					url: '/pages/my/agr?type=' + i
				});
			},
			toNav(url) {
				uni.navigateTo({
					url: url
				});
			},
				//用户点击订单类型
						toOrderType(index){
							uni.showToast({title: this.orderTypeLise[index].name});
						},
						//用户点击列表项
						toPage(list_i,li_i){
							uni.showToast({title: this.severList[list_i][li_i].name});
						},
			getIsLogin:function(){
				let IsLogin= uni.getStorageSync('SET_ISLOGIN');
				this.IsLoginJudje = (IsLogin == null)
				if (!this.IsLoginJudje) {
				this.isLogin = IsLogin
				}
			},
			memberLinkTo(e) {
				let index = parseInt(e.currentTarget.dataset.index);
				uni.navigateTo({
					url: this.getMenus[index].link
				})
			},
			vips: function() {
				uni.navigateTo({
					url: "../vip/vip"
				})
			},
			vajraTap: function(index) {
				console.log(index)
				if (index == 0) {
					var that = this;
					that.key = "yR1zcrfS6Lqjgr2QGxHr98bq66NJT-7Q"; //修改的key
					plus.runtime.openURL(
						'mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26jump_from%3Dwebapi%26k%3D' +
						that.key)
				} else if (index == 1) {
					uni.navigateTo({
						url: "/subPage/commen/post"
					})
				} else if (index == 2) {
					var oin =this.userid
					uni.navigateTo({
						url: "/pages/my/vip/shoplist?oin=" + oin
					})
				}
			},
			// getInfo() {
			// 	let userInfo= JSON.parse(uni.getStorageSync('access-admin'));
			// 	this.user.email = userInfo.email
			// 	this.user.name = userInfo.name
			// 	this.user.id = userInfo.userid
			// 	this.user.profile = userInfo.profile
			// 	console.log(userInfo)
			// },
			
			upimg() {
				var t = this;
				let token = uni.getStorageSync('Token');
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album"],
					success: function(e) {
						uni.showLoading({
							title: '正在上传..'
						})
						var o = e.tempFilePaths[0];
						uni.uploadFile({
							url: 'http://易如意后台域名/api.php?act=upic' + '&app=10000' +
								'&token=' + token + '&upt=bbp',
							filePath: o,
							name: "file",
							success: (res) => {
								var json = JSON.parse(res.data)
								console.log(res.data)
								if (json.code === 200) {
									uni.showToast({
										title: '头像上传成功'
									});
									uni.hideLoading();
									t.getInfo();
								} else {
									uni.showToast({
										title: '头像上传失败',
										icon: 'none'
									});
									uni.hideLoading();
								}
							},
						});
					}
				});
			},
			tuichu: function() {
				console.log("用户点击退出了")
				uni.setStorageSync('SET_ISLOGIN', false);
				uni.removeStorageSync('Token');
				uni.showToast({
					title: "已退出登录！"
				})
				uni.switchTab({
					url: "/pages/appdown/appdown"
				})
				this.userimg = '/static/logo/yclogo.png';
				this.getInfo();
			},
			qiandao: function() {
				// console.log('qqqq')
				var that = this;
				let token = uni.getStorageSync('Token');
				uni.request({
					url: 'http://易如意后台域名/api.php?act=clock' + '&app=10000' + '&token=' + token,
					success: res => {
						console.log(res.data)
						uni.showToast({
							title:res.data.msg + '，积分+10',
							icon:'none'
						})
						this.getInfo()
					}
				})
			},
		},
	}
</script>
<style lang="scss" scoped>
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 38rpx;
	}

	.head {
		padding: 20rpx;
		background-image: url(/static/my/bg_member.png);
		   background-position: 10% 40%;
		            /*这个是按从左往右，从上往下的百分比位置进行调整*/
		            background-size: 100% 100%;
		            /*按比例缩放*/
		            /*background-size: 100px 100px;!*这个是按数值缩放*!*/
		            background-repeat: no-repeat;
		
		.sub-txt {
			font-size: 24rpx;
			color: #616161;

			.vip-tips {
				display: inline-block;
				background-image: linear-gradient(to right, #f4e4cb, #e9caad, #dfb492);
				color: #fff;
				padding: 0rpx 10rpx;
				border-radius: 100rpx;
				margin-left: 10rpx;
			}
		}

		margin-bottom: 20rpx;
	}

	.userinfo {
		display: flex;
		align-items: center;
		padding: 20rpx;
	}

	.userinfo .username {
		display: flex;
		flex-direction: column;
		margin-left: 15px;
	}

	.grid-text {
		color: #999;
		font-size: 12px;
		margin-bottom: 20rpx;
	}

	.userinfo u-avatar {
		margin-right: 20rpx;
	}

	.userinfo .arrow-right {
		margin-left: auto;
	}

	.btn-login {
		margin: 40rpx 0;
	}

	.gn-icon {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 20rpx;
	}

	/*服务按钮*/
	.btn-wrap {
		display: flex;
		margin-top: 30rpx;
	}

	.btn-wrap .btn-contact {
		background-color: #fff;
		margin-left: 15rpx;
		margin-right: 15rpx;
		padding: 20rpx;
		line-height: unset;
		font-size: 12px;
		color: #999;
	}

	.btn-wrap .btn-contact:active {
		background-color: #f5f5f5;
	}

	.btn-wrap .btn-contact .txt {
		margin-top: 20rpx;
	}

	.btn-wrap .btn-contact::after {
		border: unset;
		position: unset;
	}

	.icon-size {
		font-size: 50rpx;
	}

	.block-wrap {
		background-color: #fff;
		border-radius: 20rpx;
		margin: 20rpx;
		overflow: hidden;

		.block-title {
			background-color: #fff;
			padding: 20rpx;
		}
	}

	// 开通会员
	.vip-wrap {
		display: flex;
		align-items: center;
		margin: 30rpx;
		background-image: linear-gradient(to right, #f6f2e7, #f5ecdd, #f3e4d1);
		border: 1px solid #d6c6b5;
		padding: 20rpx;
		border-radius: 20rpx;
		color: #8a5d39;

		.left {
			.title {
				font-weight: bold;
			}

			.sub {
				font-size: 24rpx;
			}
		}

		.right {
			margin-left: auto;

			.kt-btn {
				color: #F1CFA1;
				background-color: #384048;
				border-radius: 100rpx;
				padding: 10rpx 30rpx;
				font-size: 28rpx;
			}
		}
	}
</style>

<style lang="scss">
page{background-color:#fff}
.header{
	&.status{padding-top:var(--status-bar-height);}
	
	
	background-color:#50A1FF;width:92%;height:30vw;padding:0 4%;display:flex;align-items:center;
	.userinfo{
		width:90%;display:flex;
		.face{flex-shrink:0;width:15vw;height:15vw;
			image{width:100%;height:100%;border-radius:100%}
		}
		.info{
			display:flex;flex-flow:wrap;padding-left:30upx;
			.username{width:100%;color:#fff;font-size:40upx}
			.integral{display:flex;align-items:center;padding:0 20upx;height:40upx;color:#fff;background-color:rgba(0,0,0,0.1);border-radius:20upx;font-size:24upx}
		}
	}
	.setting{
		flex-shrink:0;width:6vw;height:6vw;
		image{width:100%;height:100%}
	}
}
.hover{background-color:#eee}
.orders{
	background-color:#50A1FF;width:92%;height:11vw;padding:0 4%;margin-bottom:calc(11vw + 40upx);display:flex;align-items:flex-start;border-radius:0 0 100% 100%;margin-top: -1upx;
	.box{
		width:98%;padding:0 1%;height:22vw;background-color:#fefefe;border-radius:24upx;box-shadow:0 0 20upx rgba(0,0,0,0.15);margin-bottom:40upx;display:flex;align-items:center;justify-content:center;
		.label{
			display:flex;align-items:center;justify-content:center;flex-flow:wrap;width:100%;height:16vw;color:#666666;font-size:26upx;
			.icon{
				position:relative;width:7vw;height:7vw;margin:0 1vw;
				.badge{position:absolute;width:4vw;height:4vw;background-color:#ec6d2c;top:-1vw;right:-1vw;border-radius:100%;font-size:20upx;color:#fff;display:flex;align-items:center;justify-content:center;z-index: 10;}
				image{width:7vw;height:7vw;z-index: 9;}
			}
		}
	}
}
.list{
	width:100%;border-bottom:solid 26upx #f1f1f1;
	.li{
		width:92%;height:100upx;padding:0 4%;border-bottom:solid 1upx #e7e7e7;display:flex;align-items:center;
	&.noborder{border-bottom:0}
		.icon{
			flex-shrink:0;width:50upx;height:50upx;
			image{width:50upx;height:50upx}
		}
		.text{padding-left:20upx;width:100%;color:#666}
		.to{flex-shrink:0;width:40upx;height:40upx}
	}
}
	.mt60 {
		margin-top: 40rpx;
		box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(0, 0, 0, 0.04);
	}
	.mt12 {
		margin-top: 24rpx;
	}
	.cl-notice {
		color: #ff0000;
	}
	
	.ft12 {
		font-size: 24rpx;
	}
	.setting-view {
		display: flex;
		
		    flex-wrap: nowrap;
		    align-content: center;
		    align-items: center;
		flex-direction: row-reverse;
		padding: 13rpx;
		    // width:110px;
		    // height:90px;
		    // margin:5px;
	}
</style>

