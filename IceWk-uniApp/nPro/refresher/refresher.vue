<template>
	<view class="n-refresher n-flex-row n-justify-center" :style="boxStyle">
		<view :class="['n-cycle-container', refreshing&&'n-scroll-rotate']">
			<view class="n-u-cover n-u-c2" :style="cover2Style">
				<view class="n-u-cover-cycle" :style="coverCycleStyle"></view>
			</view>
		</view>
		<text class="n-u-txt">{{ refresherText }}</text>
	</view>
</template>

<script>
	/**
	 * refresher
	 * @description 刷新组件
	 * @property {String} mainText 下拉时提示文字
	 * @property {String} pullingText 下拉时提示文字
	 * @property {String} refreshingText 正在刷新的提示文字
	 * @property {Boolean} refreshing 是否正在刷新
	 * @property {Boolean} couldUnLash 是否可以满足刷新
	 * @property {Number} rate 下拉的进度/比率
	 * @property {String} boxStyle 外层样式
	 */
	const HEIGHT = uni.upx2px(140)
	
	export default {
		props: {
			/**
			 * 下拉时提示文字
			 */
			mainText: {
				type: String,
				default: '下拉即可刷新...'
			},
			/**
			 * 下拉时提示文字
			 */
			pullingText: {
				type: String,
				default: '释放即可刷新...'
			},
			/**
			 * 正在刷新的提示文字
			 */
			refreshingText: {
				type: String,
				default: '正在努力加载...'
			},
			/**
			 * 是否正在刷新
			 */
			refreshing: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否可以满足刷新
			 */
			couldUnLash: {
				type: Boolean,
				default: false
			},
			/**
			 * 下拉的进度/比率
			 */
			rate: {
				type: Number,
				default: 0
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
			}
		},
		computed: {
			refresherText() {
				return this.refreshing ? this.refreshingText : this.pText;
			},
			pText() {
				return this.couldUnLash ? this.pullingText : this.mainText;
			},
			cover2Style() {
				const deg = this.rate >= 1 ? '360deg' : this.rate * 360 + 'deg'
				return `transition-property: transform; transition-duration: 300ms; transform: rotateZ(${deg});`
			},
			coverCycleStyle() {
				if (this.rate > 0.4) {
					return 'opacity: 1;'
				}
				return 'opacity: 0;'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-refresher {
		height: 140rpx;
		width: 750rpx;
		padding-top: 50rpx;
	}
	.n-cycle-container {
		position: relative;
		width: 60rpx;
		height: 60rpx;
	}
	.n-u {
		&-cover {
			position: absolute;
			width: 60rpx;
			height: 60rpx;
			top: 0;
			// background-color: #ffffff;
			overflow: hidden;
			right: 0;
			transform-origin: center center;
			transform: rotateZ(0deg);
			&-cycle {
				position: absolute;
				width: 60rpx;
				height: 60rpx;
				right: 0;
				top: 0;
				border-width: 2rpx;
				border-color: #666666;
				border-bottom-color: transparent;
				border-style: solid;
				border-radius: 30rpx;
				opacity: 0;
			}
		}
	}
	.n-arrow-down {
		position: relative;
		top: 15rpx;
		left: -45rpx;
		width: 30rpx;
		height: 30rpx;
	}
	.n-u-txt {
		font-size: 24rpx;
		line-height: 40rpx;
		color: #999999;
		margin-top: 10rpx;
		margin-left: 10rpx;
		height: 40rpx;
		lines: 1;
	}
	/* #ifndef APP-NVUE */
	/* 旋转动画 */
	.n-scroll-rotate {
		-webkit-animation: scrollRotate 0.6s linear infinite;
		animation: scrollRotate 0.6s linear infinite;
	}  
	@-webkit-keyframes scrollRotate {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	@keyframes mescrollRotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	/* #endif */
</style>
