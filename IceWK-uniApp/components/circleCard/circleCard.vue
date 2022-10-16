<template>
	<view class="cc" :style="boxStyle" bubble="true" @tap="toDetail(item)">
		<image class="cc-img" :src="item.cover" mode="aspectFill"></image>
		<text class="cc-title">{{item.title}}</text>
		<text class="cc-desc">{{item.desc}}</text>
		<view class="cc-label">
			<!-- <myp-icon name="comment-dots" type="inverse" size="base"></myp-icon> -->
			<text class="cc-label-text">{{item.label}}</text>
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
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		methods: {
			toDetail(item) {
				console.log(item)
			uni.switchTab({
				
		
				url: item.page
			})
				
				// this.$emit("detail", this.item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cc {
		height: 360rpx;
		border-width: 1px;
		border-color: #F3F4F5;
		border-style: solid;
		border-radius: 12rpx;
		box-shadow: 0 6rpx 6rpx 0 rgba(240,240,240,0.50);
		background-color: #FFFFFF;
		position: relative;
		
		&-img {
			width: 300rpx;
			height: 200rpx;
			border-top-left-radius: 12rpx;
			border-top-right-radius: 12rpx;
		}
		&-title {
			display:flex;
			margin-top: 24rpx;
			margin-left: 24rpx;
			width: 252rpx;
			font-size: 32rpx;
			color: #333333;
			line-height: 45rpx;
			lines: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */
		}
		&-desc {
			display:flex;
			margin-top: 10rpx;
			margin-left: 24rpx;
			width: 252rpx;
			font-size: 24rpx;
			color: #666666;
			line-height: 32rpx;
			overflow: hidden;
			/* #ifdef APP-NVUE */
			lines: 2;
			text-overflow: ellipsis;
			/* #endif */
			/* #ifndef APP-NVUE */
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			/* #endif */
		}
		&-label {
			position: absolute;
			right: 24rpx;
			top: 20rpx;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			align-items: center;
			flex-wrap: nowrap;
			
			&-text {
				margin-left: 10rpx;
				font-size: 24rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
