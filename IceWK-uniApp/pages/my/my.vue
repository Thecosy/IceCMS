<template>
	<view>
		<view style="height: 40px;background-color: #50A1FF;display: fixed;"></view>
		<view v-if="!isLogin" @click="logins" class="flex alcenter space">
	<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo">
				<view class="face"><image src="/static/logo/yclogo.png"></image></view>
				<view class="info">
					<view class="username">暂未登录</view>
					<view class="mt12 ft12 cl-notice">点击登录 享受更多会员功能</view>
				</view>
			</view>
			<view class="setting"><image src="../../static/HM-PersonalCenter/setting.png"></image></view>
		</view>
 </view>
		<view v-else class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo">
				<view class="face"><image :src="user.profile"></image></view>
				<view class="info">
					<view class="username">{{user.name}}</view>
					<view class="integral">积分:{{user.integral}}</view>
				</view>
			</view>
			<view class="setting"><image src="../../static/HM-PersonalCenter/setting.png"></image></view>
		</view>
		
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(row,index) in orderTypeLise" :key="row.name" hover-class="hover"  @tap="toOrderType(index)">
					<view class="icon"><view class="badge" v-if="row.badge>0">{{row.badge}}</view><image :src="'../../static/HM-PersonalCenter/'+row.icon"></image></view>
					{{row.name}}
				</view>
				
			</view>
		</view> 
		<view class="list" v-for="(list,list_i) in severList" :key="list_i">
			<view class="li" v-for="(li,li_i) in list" @tap="toPage(list_i,li_i)" v-bind:class="{'noborder':li_i==list.length-1}"  hover-class="hover" :key="li.name" >
				<view class="icon"><image :src="'../../static/HM-PersonalCenter/sever/'+li.icon"></image></view>
				<view class="text">{{li.name}}</view>
				<image class="to" src="../../static/HM-PersonalCenter/to.png"></image>
			</view>
		</view>
		<u-button v-show="isLogin" class="mt60" shape="circle" size="large" text="退出登录" @click="tuichu()"></u-button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
					//#ifdef APP-PLUS
								isH5Plus:true,
								//#endif
								//#ifndef APP-PLUS
								isH5Plus:false,
								//#endif
								userinfo:{},
								orderTypeLise:[
									//name-标题 icon-图标 badge-角标
									{name:'订单查询',icon:'l1.png',badge:1},
									{name:'软件投稿',icon:'l2.png',badge:2},
									{name:'待收货',icon:'l3.png',badge:6},
									{name:'待评价',icon:'l4.png',badge:9},
									{name:'加官方群',icon:'l5.png',badge:0}
								],
								severList:[
									[
										{name:'兑换会员',icon:'point.png'},
										{name:'修改密码',icon:'quan.png'},
										{name:'绑定邮箱',icon:'momey.png'},
										{name:'修改昵称',icon:'renw.png'},
									],
									[
										{name:'积分明细',icon:'mingxi.png'},
										{name:'清除缓存',icon:'choujiang.png'},
										// {name:'收货地址',icon:'addr.png'},
										// {name:'银行卡',icon:'bank.png'},
										// {name:'安全中心',icon:'security.png'},
										{name:'在线客服',icon:'kefu.png'}
									]
								],
							
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
			this.getInfo();
			this.getgg()
		},
		onShow() {
			this.getIsLogin();
			this.getInfo()
			this.getgg()
		},
		onShareAppMessage(e) {},
		onShareTimeline(e) {},
		onPullDownRefresh() {
			this.getIsLogin();
			this.getInfo();
			this.getgg()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
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
			getgg:function(){
				uni.request({
					url: '',
					success: (res) => {
						if (res.data.msg != '') {
							this.notice = res.data.msg[0].content;
						}
					}
				});
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
			getInfo() {
				let userInfo= JSON.parse(uni.getStorageSync('access-admin'));
				this.user.email = userInfo.email
				this.user.name = userInfo.name
				this.user.id = userInfo.userid
				this.user.profile = userInfo.profile
				console.log(this.user)
			},
			logins() {
				uni.navigateTo({
					url: '/subPage/my/account/login'
				})
			},
			loginYes() {},
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
</style>

