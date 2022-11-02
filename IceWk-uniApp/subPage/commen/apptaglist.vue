<template>
	<u-scroll-list indicator>
		<u-empty v-if="!showlist" mode="taglist" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
		<view v-else class="u-demo-block__content">
			<view class="u-page__tag-item" v-for="(item, index) in taglist" :key="index">
				<u-tag :text="item.name" plain plainFill shape="circle" :name="index"
					@click="radioClick(item.name,item.mid)">
				</u-tag>
			</view>
		</view>
		
		<u-no-network></u-no-network>
	</u-scroll-list>
</template>

<script>
	import API from '../../utils/api.js';
	export default {
		data() {
			return {
				showlist:'',
				taglist: []
			}
		},
		onLoad() {
			this.getTaglist();
		},
		onPullDownRefresh() {
			this.getTaglist();
			setTimeout(function() {
				uni.showToast({
					title: '刷新成功'
				});
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getTaglist: function() {
				uni.request({
					url: API.GetTag(),
					success: res => {
						var ress = res.data.data;
						if (typeof(ress) != 'undefined'||res.data.data != "none") {
							this.showlist =true;
							this.taglist = res.data.data;
							console.log(this.taglist)
						}else{
							this.showlist=false;
						}
					}
				});
			},
			
			radioClick: function(a, b) {
				console.log(a, b)
				uni.navigateTo({
					url: '/subPage/commen/commenlist?mid=' + b + '&name=' + a
				})
			}
		}
	}
</script>

<style>
	.u-demo-block__content {
		line-height: 40px;
		/* max-height: 35px; */
		white-space: normal;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		margin: 20rpx;
	}
	.u-page__tag-item {
		margin: 5px;
	}
</style>
