<template>
	<view style="padding-bottom: 30rpx;" bubble="true" @click="toDetail">
		<image :src="item.cover" class="gtc-cover" :style="{height: height+'rpx'}"></image>
		<view class="n-flex-row n-align-center" style="margin-top: 16rpx;margin-left: 12rpx;">
			<view class="n-bg-error gtc-label n-flex-row n-wrap-nowrap n-align-center">
				<view class="n-bg-inverse n-flex-row n-align-center n-justify-center n-radius-ll" style="width: 30rpx;height: 30rpx;">
					<n-icon name="love-solid" type="error" size="ss" iconStyle="font-size:20rpx;"></n-icon>
				</view>
				<text class="n-color-inverse n-size-ss" style="margin-left: 12rpx;line-height: 30rpx;">{{item.label}}</text>
			</view>
		</view>
		<text class="n-color-text n-size-s n-weight-7 n-lh-s n-lines-1" style="margin-top: 10rpx;margin-left: 12rpx;width: 336rpx;">{{item.name}}</text>
		<text class="n-color-text n-size-ss n-lh-ss" style="margin-left: 12rpx;">{{item.topic}}</text>
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
	.gtc {
		&-cover {
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			width: 350rpx;
		}
		&-label {
			height: 36rpx;
			padding-left: 3rpx;
			padding-right: 16rpx;
			border-radius: 30rpx;
		}
	}
</style>
