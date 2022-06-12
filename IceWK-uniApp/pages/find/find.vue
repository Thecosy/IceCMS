<template>
	<view class="index-ov">
		
		<n-navbar title="发现"></n-navbar>
		<!-- <u-cell-group class="p30">
			<u-cell title="会员购买"></u-cell>
		</u-cell-group>
		<view class="box">
			<block v-for="(items,index) in shops" :key="index">
				<view v-show="index<3" :data-index="index" class="boxs" :style="{background:tag_color[index]}" @click="shop(items.gid)">
					<text class="cates">{{items.gname}}</text>
					<text class="cates1">¥{{items.gmoney}}</text>
					<text class="cates2">仅支持支付宝</text>
				</view>
			</block> 
		</view>
		<u-cell-group class="p30">
			<u-cell title="积分购买"></u-cell>
		</u-cell-group>
		<view class="box">
			<block v-for="(items,index) in shops" :key="index">
				<view v-show="index>2&&index<6" :data-index="index" class="boxs" :style="{background:tag_color[index]}" @click="shop(items.gid)">
					<text class="cates">{{items.gname}}</text>
					<text class="cates1">¥{{items.gmoney}}</text>
					<text class="cates2">仅支持支付宝</text>
				</view>
			</block> 
		</view>
		<u-cell-group class="p30">
			<u-cell title="会员兑换"></u-cell>
		</u-cell-group> -->
		<view class="box">
			<block v-for="(items,index) in fens" :key="index">
				<view :data-index="index" class="boxss" :style="{background:tag_colors[index]}" @click="fen(items.fid)">
					<text class="cates">{{items.name}}</text>
					<text class="cates1s">{{items.money}}</text>
					<!-- <text class="cates2">仅支持支付宝</text> -->
				</view>
			</block> 
		</view>
<!-- 		<u-cell-group class="p30">
			<u-cell title="代理购买"></u-cell>
		</u-cell-group>
		<view class="card" v-for="(item,index) in list" :key="index" @click="joinqq(item.qq)">
			<image style="width: 118rpx;" :src="item.picture" mode="widthFix"></image>
			<view class="names">
				<view class="name">{{item.name}}</view>
				<view class="name1">QQ:{{item.qq}}</view>
			</view>
			<view class="code" :style="{background:item.color}">{{item.code}}</view>
			<view class="down" @click="joinqq(item.qq)">
				<text>立即购买</text>
			</view>
		</view> -->
		<!-- 数据列表 -->
		<view class="postlist-bg" >
			<block v-for="(newpos,index) in newPost" :key="index">
				<view class="menu-scroll-list" hover-class="fengrui-li-hover" @tap="newPostTap(newpos.id)" >
					<view class="menu-scroll-list-img" v-if="newpos.thumb == null ">
						<image class="fengrui-img"  mode="aspectFill"></image>
					</view>
					<view class="menu-scroll-list-img" v-else>
						<image class="fengrui-img" :src="newpos.thumb" mode="aspectFill"></image>
					</view>
					<view class="menu-scroll-list-right">
						<view class="menu-scroll-list-h">
							{{ newpos.title }}
						</view>
						<view class="menu-scroll-list-describe">
							<view>{{ newpos.intro }}</view>
						</view>
					</view>
				</view>
		
<!-- 				<view class="list-one-w" hover-class="fengrui-li-hover" @tap="newPostTap(newpos.id)" >
					<view class="list-one-img" v-if=" newpos.thumbnailurl == null ">
						<image class="fengrui-img" mode="aspectFill" ></image>
					</view>
					<view class="list-one-img" v-else>
						<image class="fengrui-img" mode="aspectFill" :src="newpos.thumbnailurl"></image>
					</view>
					<view class="list-one-data-w">
						<view class="list-one-title">
							{{ newpos.title}}
						</view>
						<view class="list-ona-abstract">
							<rich-text :nodes="newpos.excerpt.rendered"></rich-text>
						</view>
					</view>
				</view> -->
		
			</block>
		</view>
		
		
	</view>
</template>
<script>
	import API from '../../utils/api.js';
	
	var page = 2;
	var size = 4;
	
	export default {
		data() {
			return {
				// 最新文章数据
				newPost: [],
				list: [],
				shops: [],
				fens:[{
					fid:1,
					name:'天卡',
					money:'¥20积分'
				},{
					fid:2,
					name:'月卡',
					money:'¥69积分'
				},{
					fid:3,
					name:'年卡',
					money:'¥99积分'
				}],
				tag_color: ['linear-gradient( 135deg, #03d9ff, #0345ff)', 'linear-gradient( 135deg, #CE9FFC, #9708CC)',
					'linear-gradient( 135deg, #FEB692, #EA5455)', 'linear-gradient( 135deg, #8aeadf, #31bc92)',
					'linear-gradient( 135deg, #FCCF31, #F55555)', 'linear-gradient( 135deg, #FFF6B7, #F6416C)',
					'linear-gradient( 135deg, #aa55ff, #ff557f)', 'linear-gradient( 135deg, #00ff7f, #00aaff)',
					'linear-gradient( 135deg, #ffaa00, #ff557f)', 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
					'linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)',
					'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)',
					'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)', 'rgba(153, 204, 51, 0.6)',
					'rgba(217, 135, 25, 0.6)',
				],
				tag_colors: [
					'linear-gradient( 135deg, #aa55ff, #ff557f)', 'linear-gradient( 135deg, #00ff7f, #00aaff)',
					'linear-gradient( 135deg, #ffaa00, #ff557f)', 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
					'linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)',
					'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)',
					'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)', 'rgba(153, 204, 51, 0.6)',
					'rgba(217, 135, 25, 0.6)',
				]
			};
		},
		onLoad() {
			this.getArctivelist();
			this.codeList();
			this.shopList();
		},
		
		// 监听滑动
		onPageScroll: function(e) {
			// 判断型号 显示不同标题栏高度
			var that = this;
			that.scrollTopHightX = e.scrollTop;
		
		},
		
		// 监听触底----上啦刷新
		onReachBottom() {
			uni.request({
				url: API.GetPosts(page,size),
				success: res => {
					if (res.data.data.length == '0') {
						//没有数据
						uni.showToast({
							icon: 'none',
							title: '暂无更多'
						});
						return;
					}
					page+=1; //每触底一次 page +1
					// console.log(page);
					// this.MergeArray(this.newList,res.data.data)
					this.newPost  = this.newPost.concat(res.data.data)
					 // = this.newList.concat(); //将数据拼接在一起
					uni.hideLoading();
					setTimeout(function() {
						uni.stopPullDownRefresh();
					}, 100);
				}
			});
		},
		
		onPullDownRefresh() {
			console.log("!@3")
			this.codeList();
			this.shopList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},

		methods: {
			getArctivelist: function() {
				//获取初始数据
				uni.request({
					url: API.GetArctivelist(1,size),
					success: res => {
						var ress = res.data;
						if (typeof(ress) != 'undefined' || res.data != "none") {
							this.showlist = true;
							this.newPost = res.data.data;
							console.log(this.newPost)
						} else {
							this.showlist = false;
						}
					}
					
				});
			},
			//代理列表加载
			codeList: function() {
				uni.request({
					url: 'shop.json文件域名',
					success: res => {
						this.list = res.data;
						// console.log(res.data)
					}
				});
			},
			//会员列表加载
			shopList: function() {
				uni.request({
					url: 'http://易如意后台域名/api.php?act=goods&app=10000',
					success: res => {
						this.shops = res.data.msg;
						console.log(this.shops);
					}
				});
			},
			//添加管理QQ
			joinqq: function(e) {
				plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + e + '&version=1&src_type=web ');
			},
			//购买会员
			shop: function(e) {
				console.log(e)
				let token = uni.getStorageSync('Token');
				if (token !== null && token !== '') {
					var date = new Date(),
						year = date.getFullYear(),
						month = date.getMonth() + 1,
						day = date.getDate(),
						hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
						minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
						second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
					month >= 1 && month <= 9 ? (month = "0" + month) : "";
					day >= 0 && day <= 9 ? (day = "0" + day) : "";
					var dingdan = year + month + day + hour + minute + second + minute + second + '1';
					plus.runtime.openURL('http://易如意后台域名/api.php?app=10000&act=pay&order=' + dingdan +
						'&token=' + token + '&way=ali&gid='+ e +'&ua=0');
				} else {
					uni.showModal({
						title: '未登录账号',
						content: '您没有登录账号，暂时不能购买，是否去登陆？',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '../account/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						},
					});
				}
			},
			//兑换会员
			fen: function(e) {
				console.log(e)
				let token = uni.getStorageSync('Token');
				if (token !== null && token !== '') {
					uni.request({
						url: 'http://易如意后台域名/api.php?act=get_fen&app=10000&token='+token+'&fid='+e,
						success: res => {
							// this.shops = res.data.msg;
							
							if(res.data.code==200){
								uni.showToast({
									title:'兑换成功！'
								})
								uni.switchTab({
									url:'../my'
								})
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}
						}
					});
				} else {
					uni.showModal({
						title: '未登录账号',
						content: '您没有登录账号，暂时不能购买，是否去登陆？',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '../account/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						},
					});
				}
			}
		}
	};
</script>
<style lang="less">
	page {
		padding-top: 10rpx;
	}
	.p30{
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	.box {
		margin-top: 10rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 10rpx;
		box-sizing: border-box;
	}

	.boxs {
		width: 30%;
		height: 180rpx;
		flex: 1;
		min-width: 30%;
		max-width: 30%;
		border-radius: 10px;
		background: #FFFFFF;
		align-items: center;
	}
	.boxss {
		width: 30%;
		height: 130rpx;
		flex: 1;
		min-width: 30%;
		max-width: 30%;
		border-radius: 10px;
		background: #FFFFFF;
		align-items: center;
	}
	.cates {		
		font-weight: 500;
		color: #FFFFFF;
		font-size: 30rpx;
		display: flex;
		margin: 25rpx 0rpx 0rpx 20rpx;
	}
	.cates1 {
		font-weight: 500;
		color: #FFFFFF;
		font-size: 40rpx;
		display: flex;
		margin: 5rpx 0rpx 0rpx 20rpx;
	}
	.cates1s {
		font-weight: 500;
		color: #FFFFFF;
		font-size: 30rpx;
		display: flex;
		margin: 5rpx 0rpx 0rpx 20rpx;
	}
	.cates2 {
		font-weight: 500;
		color: #FFFFFF;
		font-size: 25rpx;
		display: flex;
		margin: 5rpx 0rpx 0rpx 20rpx;
	}
	.card {
		display: flex;
		height: 120rpx;
		margin: 10rpx 25rpx;
		box-shadow: 0 0 100rpx #ececec;
		padding: 10rpx;
		border-radius: 20rpx;
		image {
			width: 100rpx;
			border-radius: 20rpx;
		}

		.names {
			width: 250rpx;
			height: 120rpx;
		}

		.name {
			line-height: 50rpx;
			font-size: 30rpx;
			margin-left: 30rpx;
		}

		.name1 {
			margin-top: 33rpx;
			font-size: 30rpx;
			margin-left: 30rpx;
		}
		.code {
			height: 30rpx;
			font-size: 20rpx;
			padding: 0rpx 15rpx;
			border-radius: 30rpx;
			color: #FFFFFF;
			margin-bottom: 5rpx;
			margin-top: auto;
			margin-left: 10rpx;
		}

		.down {
			margin-top: 35rpx;
			margin-left: auto;
			margin-right: 10rpx;
			width: 170rpx;
			height: 50rpx;
			background: #50A1FF;
			display: flex;
			color: #FFFFFF;
			text-align: center;
			box-shadow: 0px 0px 5px #50A1FF;
			border-radius: 50rpx;

			text {
				font-size: 30rpx;
				margin-top: 5rpx;
				margin-left: 30rpx;
			}
		}
	}
	.postlist-bg {
		border-radius: 20upx;
		overflow: hidden;
		margin: 0upx 30upx;
	}
	.menu-scroll-list-describe {
		color: #ADADAD;
		font-size: 20upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.list-li-tag {
		color: #0BBDA6;
		font-size: 20upx;
	}
	
	.menu-scroll-list-h {
		font-size: 26upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.menu-scroll-list-right {
		margin-left: 32upx;
		width: 420upx;
		display: flex;
		justify-content: space-between;
		flex-flow: column;
	}
	
	.menu-scroll-list-img {
		width: 360upx;
		height: 180upx;
		border-radius: 16upx;
		overflow: hidden;
	}
	
	.menu-scroll-list {
		display: flex;
		padding: 30upx;
		background-color: #FFFFFF;
		margin: 30upx 0upx;
		border-radius: 20upx;
	}
	.fengrui-img {
		width: 100%;
		height: 100%;
	}
	
</style>
