<template>
	<view class="n-position-relative" style="padding-bottom: 30rpx;" bubble="true" @click="toDetail">
		<image :src="item.cover" class="gc-cover" :style="{height: height+'rpx'}"></image>
		<view class="n-position-absolute" :style="{height: '60rpx', left: '0', width: '350rpx', top: (height-60)+'rpx'}">
			<image src="/static/flash-bg.png" style="width: 350rpx;height: 60rpx;"></image>
			<view class="n-position-absolute n-flex-row n-wrap-nowrap" style="left: 0;width: 350rpx;height: 60rpx;">
				<view class="n-flex-column n-align-center" style="width: 98rpx;height: 60rpx;">
					<text class="n-size-ss n-color-inverse" style="line-height: 30rpx;">Pro来啦</text>
					<text class="n-size-ss n-color-inverse" style="font-size: 20rpx;line-height: 30rpx;">仅剩200份</text>
				</view>
				<text class="n-color-inverse n-size-ss" style="margin-left: 16rpx;margin-top: 10rpx;line-height: 50rpx;font-size: 20rpx;">限时秒杀 09:12:22后结束</text>
			</view>
		</view>
		<view class="n-flex-row n-align-center" style="margin-left: 12rpx;margin-top: 16rpx;">
			<image src="/static/vip.png" mode="aspectFill" style="width: 30rpx;height: 30rpx;"></image>
			<text class="n-color-second n-size-ss" style="margin-left: 12rpx;line-height: 30rpx;">{{item.label}}</text>
		</view>
		<text class="n-color-text n-size-s n-lh-s n-lines-1" style="margin-top: 10rpx;margin-left: 12rpx;width: 336rpx;">{{item.name}}</text>
		<text class="n-color-third n-size-ss n-lh-ss" style="margin-left: 12rpx;">{{item.topic}}</text>
		<view class="n-flex-row n-wrap-nowrap n-justify-between n-align-center" style="margin-left: 12rpx;margin-top: 10rpx;">
			<view class="n-flex-row n-wrap-nowrap n-align-center">
				<view v-for="(tag,idx) in tags" :key="idx" :class="['gc-tag', 'n-flex-row', 'n-align-center', idx%2===1&&'gc-tag-green']">
					<text class="n-color-text n-size-ss">{{tag}}</text>
				</view>
			</view>
			<text class="n-color-third" style="margin-right: 24rpx;font-size: 26rpx;line-height: 32rpx;">已售{{item.saleNum||1}}件</text>
		</view>
		<view class="n-flex-row n-align-center n-wrap-nowrap n-justify-between" style="margin-left: 12rpx;margin-top: 24rpx;">
			<view class="n-flex-row n-align-center n-wrap-nowrap">
				<text class="n-color-error n-size-base n-weight-9" style="line-height: 38rpx;">¥{{item.sale.toFixed(2)}}</text>
				<text class="n-color-third n-size-ss" style="margin-left: 12rpx;text-decoration: line-through;margin-top: 10rpx;line-height: 28rpx;">{{item.price.toFixed(2)}}</text>
			</view>
			<text class="n-size-ll n-color-third n-weight-7" style="line-height: 32rpx;">...</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: ()=>{
					return {}
				}
			}
		},
		computed: {
			height() {
				const h = this.item.height * 350 / this.item.width
				if (h > 400) {
					// 限制最高400
					return 400
				}
				if (h < 100) {
					return 100
				}
				return h
			},
			tags() {
				if (this.item.tags) {
					return this.item.tags.split(',')
				}
				return []
			},
			members() {
				return [{avatar: '/static/caiman.jpeg'}, {avatar: '/static/logo-dark.png'}, {avatar: '/static/caiman.jpeg'}]
			}
		},
		methods: {
			toDetail() {
				this.$emit("detail", this.item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.gc {
		&-cover {
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			width: 350rpx;
		}
		&-tag {
			padding-left: 8rpx;
			padding-right: 8rpx;
			height: 32rpx;
			margin-right: 8rpx;
			background-color: #efebff;
			
			&-green {
				background-color: #ebf7ff;
			}
			&-red {
				background-color: #ffedeb;
			}
			&-yellow {
				background-color: #fff0d4;
			}
		}
	}
</style>
