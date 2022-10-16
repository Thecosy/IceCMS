<template>
	<view class="card_swiper_out">
		<scroll-view @scroll="changeScroll" :show-scrollbar="false" :enable-flex="true" :scroll-x="true"
			class="card_swiper">
			<block v-if="platformList.length <= 10">
				<view class="item" v-for="(item,index) in platformList" :key="index"
					>
					 <circle-card :key="index" :item="item" @detail="item.page"></circle-card>
				</view>
				<!-- <circle-card v-for="(item,idx) in platformList" :key="idx" :item="item" :boxStyle="idx===displays.length-1?'':'margin-right:20rpx;'" @detail="toPage"></circle-card>
				 -->
			</block>
			<block v-else>
				<view class="u-margin-bottom-26">
					<view class="item" v-for="(item,index) in firstColumn" :key="index"
						>
						<img class="item_img" :src="item" />
						<view>{{index+ 1}}</view>
					</view>
				</view>
				<view class="u-padding-bottom-26">
					<view class="item" v-for="(item,index) in towColumn" :key="index"
						@click.stop="goClassiFication(item)">
						<img class="item_img" :src="item" />
						<view>{{index+ 1}}</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view v-if="platformList.length > 10" class="scroll_bar" :style="{width:scrollwidth}">
			<view class="left_line" :style="{left:scrollLeft}"></view>
		</view>
	</view>
</template>

<script>
	import circleCard from '@/components/circleCard/circleCard.vue'
	export default {
		data() {
			return {
				firstColumn: [],
				towColumn: [],
				scrollwidth: 0,
				scrollLeft: 0
			}
		},
		components: {
			circleCard,
		},
		props: {
			platformList: {
				type: Array,
				default: [],
				required: true
			}
		},
		watch: {
			platformList(arr) {
				this.firstColumn = this.getFirstColumn(arr)
				this.scrollwidth = this.getScrollwidth(arr)
				this.towColumn = this.getTowColumn(arr)
			}
		},
		methods: {
			getFirstColumn(arr) {
				return arr.slice(0, Math.ceil(arr.length / 2))
			},
			// 计算滚动条的长度
			getScrollwidth(arr) {
				let height = (arr.length - 10) / 2
				let one = 10 * height + 24
				return one + 'rpx'
			},
			getTowColumn(arr) {
				let list = arr.slice(Math.ceil(arr.length / 2), arr.length)
				if (list.length) {
					// let obj = {
					// 	gt_id: 0,
					// 	gt_name: "全部分类",
					// 	icon_url: "",
					// }
					// list.splice(4, 0, obj)
					return list
				}
			},
			
			changeScroll(e) {
				console.log(e)
				let columnLength = this.firstColumn.length
				this.scrollLeft = e.detail.scrollLeft / columnLength + 'rpx'
				console.log(this.scrollLeft)
			},
		}
	}
</script>

<style scoped lang="scss">
	// 菜单
	.scroll_box {
		width: calc(100% - 48upx);
		height: 376upx;
		background: #ffffff;
		border-radius: 24upx;
		padding: 24upx;
	}
	.scroll_item {
		text-align: center;
		width: 96upx;
		color:#666666;
	}
	.item_img {
		width: 96upx;
		height: 96upx;
		background: #EFEFEF;
		border-radius: 50%;
		margin-bottom: 16upx;
		font-size: 24upx;
		display: block;
	}
	
	.card_swiper_out {
		position: relative;
		padding: 32upx 20upx 16upx 20upx;
		
		border-radius: 32upx;
		width: 100%;
		overflow-y: auto;
	}

	.card_swiper {
		white-space: nowrap;
		width: 100%;
	}

	.item {
		width: 305upx;
		display: inline-block;
		color: #767780;
		font-size: 24upx;
		margin-right: 44upx;
	}

	.item:nth-last-child(1) {
		margin-right: 0;
	}

	.scroll_bar {
		background: rgba(242, 169, 64, 0.2);
		height: 8upx;
		border-radius: 5upx;
		position: relative;
		left: 50%;
		transform: translate(-50%, 0);
		z-index: 9;
		bottom: 0;
		transition: all 0.5s ease-in;
	}

	.left_line {
		content: ' ';
		width: 24upx;
		height: 8upx;
		background: red;
		border-radius: 5upx;
		position: absolute;
		top: 0;
	}
</style>
