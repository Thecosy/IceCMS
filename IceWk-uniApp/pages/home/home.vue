<!-- 首页 -->
<template>
	<view style="background-color: #F6F7F9;" class="tabs">
		<view style="margin-top: 4px;margin-bottom: 3px;">
			<!-- <n-navbar title="IceCMS" ></n-navbar> -->
			<div class="u-sev-searchs">
				<!-- 		<n-list-cell>
			<view style="height: 50rpx;"></view>
			<view style="margin-left: 32rpx; margin-right: 232rpx;">
				<n-search :fixIcon="true" iconType="place" placeIconType="place" ></n-search>
			</view>
			<view style="height: 20rpx;"></view>
		</n-list-cell> -->
			</div>

			<div class="u-nav-searchs">
				<view class="u-nav-slots" slot="left">
					<!-- <u-icon name="plus-circle" color="#b0b0b0" size="60rpx"></u-icon> -->
					<img style="height: 60rpx;height: 60rpx;" src="/static/login-registration/ice.png"/>
				</view>
				<u-search placeholder="搜素" :show-action="false" height="65" searchIcon="search" placeholderColor="#b0b0b0"
					searchIconColor="#c2c2c2" v-model="keyword" @search="goSearch(keyword)"></u-search>

			</div>

		</view>
		<!-- <view class="navbarheight"></view> -->
		<view class="pa20">
			<u-swiper :list="swiper" keyName="image" :height="385" radius="20rpx" showTitle autoplay circular
				@click="goSwiper">
			</u-swiper>
			<o-grid col="4" size="md" gutter="true" radius square bg="#fff">
				<o-grid-item  text="资讯" icon="icon-feeds"></o-grid-item>
				<o-grid-item @click="goTo('/pages/shop/index')"  text="商城" icon="icon-zijin"></o-grid-item>
				<o-grid-item text="专题" icon="icon-all"></o-grid-item>
				<o-grid-item @click="goTo('/pages/my/chong')" text="钱包" dot icon="icon-wallet"></o-grid-item>
			</o-grid>

			<!-- 	<u-cell-group>
			 <view class="vides-text" style="margin-left: 12px;margin-right: 12px;"><u-cell title="找软件" value="查看更多" isLink url="/subPage/commen/apptaglist"></u-cell></view>
			</u-cell-group>
			<u-scroll-list indicator>
				<view class="u-demo-block__content">
					<view class="u-page__tag-item" v-for="(item, index) in tag" :key="index">
						<u-tag :text="item.name" plainFill :plain="index!=0" shape="circle" :name="index"
							@click="radioClick(item.name,item.mid)">
						</u-tag>
					</view>
				</view>
			</u-scroll-list> -->


			<view style="height: 20rpx;"></view>
			<u-cell-group :border="false" class="mt10">
				<view class="vides-text" style="margin-left: 10px;margin-right: 6px;">
					<u-cell-item title="精彩推荐" value="查看更多" isLink url="/subPage/commen/apprank?current=1"></u-cell-item>
				</view>
			</u-cell-group>
			<zjc-scroll-nav :platformList="displays">
			</zjc-scroll-nav>
			<view style="width: 32rpx;"></view>
			<u-cell-group class="mt10">
				<view class="vides-text" style="margin-left: 10px;margin-right: 6px;">
					<u-cell-item title="最新文章" value="查看更多" isLink url="/subPage/commen/apprank"></u-cell-item>
				</view>
			</u-cell-group>
			<view class="post-list">
				<view v-for="(item, index) in newList" :key="index" @click="goDetails(item.id,item.author)" class="post-item">
					<view   class="post-item-in">
						<view   class="post-info">
							<view   class="post-title lin-1 lin-2">
								<uni-text  ><span>{{ item.title }}</span>
								</uni-text>
							</view>
							<!---->
							<view   class="desc">
								<uni-text   class="fs12 lin-1">
									<span>前言<br><br><br><br>移动端页面调试一直是好多朋友头疼的问题，iOS&nbsp;由于其封闭的特性和整体较高的性能，整体适配相对.</span>
								</uni-text>
							</view>
							<view   class="post-3-meta flex-center fs12 gray">
								<view   class="author flex-center">
									<view >
										<img
										class="avatar b2img"
											:src="item.profile"
											draggable="false">
									</view>
									<uni-text  ><span>{{item.author}}</span></uni-text>
								</view>
								<view   class="views">
									<view  >{{item.hits}} 浏览</view>
								</view>
							</view>
							<!---->
						</view>
						<view  class="post-thumb-box">
							<view   class="post-thumb-in" style="padding-top: 75%;">
								<uni-image v-if="item.thumb"  class="post-thumb-image b2radius b2img">
									<div
									
										:style="{backgroundImage:`url(${item.thumb})`}"
										style="background-size: cover; background-position: center center; background-repeat: no-repeat no-repeat;">
									</div>
									<!----><img :src="item.thumb"
										draggable="false">
								</uni-image>
								<uni-image v-else  class="post-thumb-image b2radius b2img">
									<div style="background-image: url(/static/empty.png); background-size: cover; background-position: center center; background-repeat: no-repeat no-repeat;"></div>
									<!----><img :src="item.thumb"
										draggable="false">
								</uni-image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 120rpx;"></view>
		</view>
	</view>
</template>
<script>
	import API from '../../utils/api.js';
	var page = 1;
	var size = 4;

	export default {
		data() {
			return {
				displays: [{
					cover: '/static/home/query.jpeg',
					title: '圈子社区',
					desc: '公共区域，文明发言',
					label: '最新',
					page: '/pages/circle/circle'
				}, {
					cover: '/static/home/news.jpeg',
					title: '每日快讯',
					desc: '让你瞬间了解世界大事',
					label: '最新',
					page: 'base_cell'
				}, {
					cover: '/static/home/web.jpeg',
					title: '互联网资源',
					desc: '你想要的应有尽有',
					label: '最新',
					page: 'base_icon'
				}, {
					cover: '/static/home/vip.jpeg',
					title: '开通会员',
					desc: '尊享会员服务',
					label: '最新',
					page: 'base_icon'
				}],
				showlist: '',
				swiper: [],
				tag: [],
				hotlist: [],
				newList: [],
				// sortList: [],
				recommend: [],
				indexList: [],
				urls: ['https://cdn.uviewui.com/uview/album/1.jpg', 'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg', 'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg', 'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg', 'https://cdn.uviewui.com/uview/album/8.jpg',
					'https://cdn.uviewui.com/uview/album/9.jpg', 'https://cdn.uviewui.com/uview/album/10.jpg',
				],
				keyword: ''
			}
		},
		onLoad() {

			this.getswiper();
			this.gettag();
			this.getnewlist();
			this.gethotlist()

		},
		onPullDownRefresh() {
			this.getswiper();
			this.gettag();
			this.getnewlist();
			this.gethotlist();

			this.page = 1;

			setTimeout(function() {
				uni.showToast({
					title: '刷新成功'
				});
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			uni.request({
				url: API.GetPosts(page, size),
				success: res => {
					console.log(res)
					if (res.data.data.length == '0') {
						//没有数据
						uni.showToast({
							icon: 'none',
							title: '暂无更多'
						});
						return;
					}
					page += 1; //每触底一次 page +1
					// console.log(page);
					// this.MergeArray(this.newList,res.data.data)
					this.newList = this.newList.concat(res.data.data)
					// = this.newList.concat(); //将数据拼接在一起
					uni.hideLoading();
					setTimeout(function() {
						uni.stopPullDownRefresh();
					}, 100);
				}
			});
		},
		methods: {
			goTo(url){
				uni.navigateTo({ url:url});
                 
            },
			MergeArray: function(arr1, arr2) {
				var _arr = new Array();
				for (var i = 0; i < arr1.length; i++) {
					_arr.push(arr1[i]);
				}
				for (var i = 0; i < arr2.length; i++) {
					var flag = true;
					for (var j = 0; j < arr1.length; j++) {
						if (arr2[i] == arr1[j]) {
							flag = false;
							break;
						}
					}
					if (flag) {
						_arr.push(arr2[i]);
					}
				}
				return _arr;
			},

			goSwiper: function(e) {
				var a = e;
				var cids = this.swiper[a].post[0].cid;
				var name = this.swiper[a].post[0].title;
				uni.navigateTo({
					url: '/subPage/commen/appdetails?cid=' + cids + '&name=' + name
				});
				console.log(cids)
			},
			goDetails: function(id, author) {
				uni.navigateTo({
					url: '/subPage/commen/appdetails?id=' + id + '&name=' + author
				});
			},
			goPost: function() {
				// console.log(this.swiper)
				var posts = this.swiper[0].posts;
				
				if (posts === '0') {
					var key = this.swiper[0].qqfurm;
					plus.runtime.openURL(
						'mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26jump_from%3Dwebapi%26k%3D' +
						key)
				} else {
					uni.navigateTo({
						url: '/subPage/commen/post'
					});
				}
			},
			goSearch: function(e) {
				uni.navigateTo({
					url: '/subPage/commen/appsearchlist?keyword=' + e
				});
			},
			tolink: function() {
				uni.navigateTo({
					url: '/subPage/commen/apptaglist'
				})
			},
			getnewlist: function() {
				//获取初始数据
				uni.request({
					url: API.GetPosts(1, size),
					success: res => {
						console.log(res)
						var ress = res.data;
						if (typeof(ress) != 'undefined' || res.data != "none") {
							this.showlist = true;
							this.newList = res.data.data;
						} else {
							this.showlist = false;
						}
					}

				});
			},
			gethotlist: function() {
				var that = this;
				uni.request({
					url: API.GetHot(),
					success: function(res) {
						that.hotlist = res.data.data;
						// console.log(that.hotlist);
					}
				});
			},
			getswiper: function() {
				uni.request({
					url: API.GetSwiperPost(),
					success: res => {
						for (var i = 0; i < res.data.length; i++) {
							this.swiper.unshift(res.data[i].img)
						}
					}
				});
			},
			gettag: function() {
				uni.request({
					url: API.GetTag(),
					success: res => {
						// console.log(res)
						this.tag = res.data.data;
						// console.log(res.data.data);
					}
				});
			},
			left() {
				console.log('left');
			},
			right() {
				console.log('right');
			},
			showMore() {
				uni.$u.toast('查看更多')
			},
			click() {
				console.log('Cell is clicked.');
			},
			rightClick() {
				console.log('rightClick');
			},
			radioClick: function(a, b) {
				// console.log(a, b)
				uni.navigateTo({
					url: '/subPage/commen/commenlist?mid=' + b + '&name=' + a
				})
			},
		}
	}
</script>
<style>
	.post-list{
		display: flex;
		flex-flow: wrap;
		margin: 4px;
		position: relative;
	}
	.post-item{
		width: 50%;
	}
	.post-item-in {
	flex-flow: column;
	flex-direction: column-reverse;
	margin: 4px;
	padding: 0;
	border: 0;
	
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	align-items: stretch;
	padding-top: 10px;
	border-top: 1px solid #efefef;
	}
	.post-info{
		flex-direction: column;
		display: flex;
	background-color: #fff;
	border-bottom-right-radius: 5px;
	border-bottom-left-radius: 5px;
	height: 108px;
	padding: 8px 10px 12px;
	width: auto;
	box-sizing: border-box;
	}
	.post-thumb-box{
	position: relative;
	width: 100%;
	}
	.post-thumb-in {
	height: 0;
	}
	.post-thumb-image {
	border-radius: 5px 5px 0 0;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	margin: 0;
	}
	.b2radius {
	border-radius: 5px;
	overflow: hidden;
	transform: rotate(0deg);
	-webkit-transform: rotate(0deg);
	}
	.b2img {
	object-fit: cover;
	}
	.post-title {
	font-size: 14px;
	height: 36px;
	-webkit-line-clamp: 2!important;
	lines: 2!important;
	flex: 0 0 auto;
	line-height: 1.3;
	}
	.lin-1 {
	overflow: hidden;
	word-break: break-all;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	lines: 1;
	}
	.desc {
	color: #92929d;
	margin-top: 4px;
	}
	.post-3-meta {
	justify-content: space-between;
	margin-top: 12px;
	}
	.gray {
	color: #999;
	}
	.flex-center {
	display: flex;
	align-items: center;
	}
	.fs12 {
	font-size: 12px;
	}
	.avatar {
	margin-right: 4px;
	width: 20px;
	height: 20px;
	display: block;
	border-radius: 100%;
	}
	.uni-view {
	display: block;
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

	.thumbs {
		width: 120rpx;
		height: 120rpx;
		border-radius: 25rpx;
		align-items: center;
	}

	.scroll-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		text-align: center;
		margin-top: 10rpx;
	}

	.demo-layout {
		height: 70px;
		border-radius: 4px;
	}

	.demoimg {
		height: 45rpx;
	}

	.goods-item {
		margin-right: 15rpx;
		/* display: block; */
	}

	.goods-image {
		width: 65px;
		height: 65px;
		border-radius: 15px;
		border: 1rpx solid #f1f1f1;
	}

	.goods-text {
		/* width: 30rpx; */
		text-align: center;
		font-size: 12px;
		margin-top: 5px;
		overflow: hidden;
		text-overflow: clip;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.sort-item {
		margin-right: 20rpx;
	}

	.sort-image {
		width: 460rpx;
		height: 230rpx;
		border-radius: 15px;
	}

	.viewsss {
		width: 100%;
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



	.mt10 {
		margin-top: 10rpx;
	}

	.mt30 {
		margin-top: 10rpx;
	}

	.navbarheight {
		height: 14px;
		padding-top: var(--status-bar-height);
	}

	.mr20 {
		margin-right: 20rpx;
	}

	.u-nav-slot {
		align-items: center;
		border-width: 0.5px;
		border-radius: 100px;
		padding: 3px 7px;
		opacity: 1;
	}

	.u-nav-slots {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-width: 0.5px;
		border-radius: 100px;
		padding: 3px 7px;
		opacity: 1;
		/* width: 60%; */
	}


	.swiper {
		height: 220px;
	}

	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}

	.card {
		display: flex;
		height: 130rpx;
		margin: 13rpx 23rpx;
		box-shadow: 0 0 100rpx #ececec;
		padding: 10rpx;
		border-radius: 20rpx;
	}

	.c-title {

		font-size: 15px;
		font-weight: 600;
		color: #333;
		background-color: #f6f6f6;
		height: 50rpx;
		line-height: 30rpx;
		position: relative;
		padding-left: $u * 5;
		padding-top: $u * 4;
		box-sizing: content-box;

	}

	.c-title::after {
		position: absolute;
		content: "";
		left: 7px;
		top: 2px;
		height: 12px;
		width: 3px;
		border-radius: 30px;
		background-color: #999;
		z-index: 2;
	}

	.c-title::after {
		position: absolute;
		content: "";
		left: 7px;
		top: 6px;
		height: 12px;
		width: 3px;
		border-radius: 30px;
		background-color: #999;
		z-index: 2;
	}

	.u-nav-searchs {
		display: flex;
	}

	/* #ifdef MP-WEIXIN || APP-PLUS */
	.u-nav-searchs {
		display: flex;
	}

	/* #endif */

	/* #ifdef H5 || APP-PLUS */
	.u-sev-searchs {
		display: none;
		margin-bottom: 3px;
	}

	/* #endif */
	.scroll-nav {
		display: flex;
	}
</style>
