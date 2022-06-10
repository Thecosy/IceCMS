<!-- 首页 -->
<template>
	<view class="tabs">
		<!-- <n-navbar title="IceCMS" ></n-navbar> -->
		<div class="u-sev-searchs">
		<n-list-cell>
			<view style="height: 50rpx;"></view>
			<view style="margin-left: 32rpx; margin-right: 232rpx;">
				<n-search :fixIcon="true" iconType="place" placeIconType="place" ></n-search>
			</view>
			<view style="height: 20rpx;"></view>
		</n-list-cell>
		</div>
		
		<div class="u-nav-searchs">
		<u-navbar  @rightClick="goPost()">
			<view class="u-nav-slot searchBox" slot="left">
				<u-search  :show-action="false" height="65" searchIcon="search" placeholderColor="#b0b0b0"
					searchIconColor="#c2c2c2" v-model="keyword" @search="goSearch(keyword)"></u-search>
			</view>
			<view class="u-nav-slots" slot="right">
				<u-icon name="plus-circle" color="#b0b0b0" size="60rpx"></u-icon>
			</view>
		</u-navbar>
		</div>
	
		<!-- <view class="navbarheight"></view> -->
		<view class="pa20">
			<u-swiper :list="swiper" keyName="image" height="355rpx" radius="20rpx" showTitle autoplay circular
				@click="goSwiper">
			</u-swiper>
		<o-grid col="4" size="md" gutter="true" radius square bg="#fff" >
			<o-grid-item text="资讯" icon="icon-feeds"></o-grid-item>
			<o-grid-item text="积分"  icon="icon-zijin"></o-grid-item>
			<o-grid-item text="应用" icon="icon-all"></o-grid-item>
			<o-grid-item text="钱包" dot icon="icon-wallet"></o-grid-item>
		</o-grid>
			<u-cell-group>
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
			</u-scroll-list>
			<u-cell-group class="mt10">
				 <view class="vides-text" style="margin-left: 12px;margin-right: 12px;"><u-cell title="热门榜单" value="查看更多" isLink url="/subPage/commen/apprank?current=1"></u-cell></view>
			</u-cell-group>
			<view style="height: 20rpx;"></view>
			<u-scroll-list>
			       <view style="width: 32rpx;"></view>
			       <circle-card v-for="(item,idx) in displays" :key="idx" :item="item" :boxStyle="idx===displays.length-1?'':'margin-right:20rpx;'" @detail="toPage"></circle-card>
			       		<view style="width: 32rpx;"></view>
			</u-scroll-list>
			<u-scroll-list indicator>
				<view class="scroll-list">
					<view class="goods-item" v-for="(item, index) in hotlist" :key="index"
						@click="goDetails(item.cid,item.title)">
						<image class="goods-image" :src="item.thumb[0].str_value" mode="">
						</image>
						<text class="goods-text">{{ item.title }}</text>
					</view>
				</view>
			</u-scroll-list>
			<u-cell-group class="mt10">
				 <view class="vides-text" style="margin-left: 12px;margin-right: 12px;"><u-cell title="最新发布" value="查看更多" isLink url="/subPage/commen/apprank"></u-cell></view>
			</u-cell-group>
			<view class="article_list">
				<u-empty v-if="!showlist" mode="list" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
				<view v-else v-for="(item, index) in newList" :key="index" @click="goDetails(item.id,item.author)">
				
					<view class="article2 card">
						<view>
							<image :src="item.thumb" class="thumbs" mode="widthFix"></image>
						</view>
						<view class="you">
							<view class="title">{{ item.title }}</view>
							<!-- <view class="tags">
								<view class="tagss" v-for="(items, indexs) in item.tag" :key="indexs">{{ items.name }}
								</view>
							</view> -->
							<!-- <view class="other">
								<view class="views">{{item.view}}次下载</view>
							</view> -->
						</view>
						<view class="down">
							<text class="text">下载</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import circleCard from '@/components/circleCard.vue'
	import API from '../../utils/api.js';
	
	var page = 2;
	var size = 4;
	
	export default {
		components: {
			circleCard,
		},
		data() {
			return {
displays : [{
	cover: '/static/logo/yclogo.png',
	title: 'myp-grid',
	desc: '宫格：支持badge',
	label: '宫格',
	page: 'base_grid'
}, {
	cover: '/static/logo/yclogo.png',
	title: 'myp-cell',
	desc: '单元：icon-label-value-indicator四段式',
	label: '单元',
	page: 'base_cell'
}, {
	cover: '/static/logo/yclogo.png',
	title: 'myp-icon',
	desc: '图标：字体图标，支持图片',
	label: '图标',
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
			
			this.page = 2;
			
			setTimeout(function() {
				uni.showToast({
					title: '刷新成功'
				});
				uni.stopPullDownRefresh();
			}, 1000);
		},
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
					this.newList  = this.newList.concat(res.data.data)
					 // = this.newList.concat(); //将数据拼接在一起
					uni.hideLoading();
					setTimeout(function() {
						uni.stopPullDownRefresh();
					}, 100);
				}
			});
		},
		methods: {
			
			MergeArray: function(arr1,arr2){
			    var _arr = new Array();
			    for(var i=0;i<arr1.length;i++){
			       _arr.push(arr1[i]);
			    }
			    for(var i=0;i<arr2.length;i++){
			        var flag = true;
			        for(var j=0;j<arr1.length;j++){
			            if(arr2[i]==arr1[j]){
			                flag=false;
			                break;
			            }
			        }
			        if(flag){
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
				console.log(posts)
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
					url: API.GetPosts(1,size),
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
						for (var i=0;i<res.data.length;i++)
						{ 
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
<style  >
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
	.c-title{
		
		font-size: 15px;
		font-weight: 600;
		color: #333;
		background-color: #f6f6f6;
		height:50rpx;
		line-height: 30rpx;
		position: relative;
		padding-left:$u * 5;
		padding-top: $u * 4;
		box-sizing:content-box;
	
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
	/* #ifdef MP-WEIXIN || APP-PLUS */
	.u-nav-searchs{
		display: none;
	}
	/* #endif */
	
	/* #ifdef H5 || APP-PLUS */
	.u-sev-searchs{
		display: none;
	}
	/* #endif */
</style>

