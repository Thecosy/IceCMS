<template>
	<view style="padding-bottom: 30rpx;" bubble="true" @click="toDetail">
		<image :src="item.cover" class="gc-cover" :style="{height: height+'rpx'}"></image>
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
				<view v-if="vipSave" class="n-position-relative" style="width: 132rpx;height: 32rpx;margin-left: 12rpx;">
					<image src="/static/vip-save.png" style="width: 132rpx;height: 32rpx;"></image>
					<text class="n-position-absolute n-size-ss n-color-inverse" style="top: 0;right: 6rpx;line-height: 32rpx;font-size: 20rpx;">¥{{vipSave}}</text>
				</view>
				<text v-else class="n-color-third n-size-ss" style="margin-left: 12rpx;text-decoration: line-through;margin-top: 10rpx;line-height: 28rpx;">{{item.price.toFixed(2)}}</text>
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
			vipSave() {
				if (typeof this.item.vip === 'undefined') return 0;
				return (this.item.sale - this.item.vip).toFixed(1)
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
