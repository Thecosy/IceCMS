<template>
	<view :class="['n-flex-row', 'n-align-center', 'n-bg-'+bgType]" :style="boxStyle+'width:'+width+';'+'height:'+height+';'">
		<view :class="['n-bg-'+progressBgType]" :style="progressStyle+'height:'+progressHeight+';'+runStyle"></view>
	</view>
</template>

<script>
	/**
	 * progress
	 * @description 进度条
	 * @property {Number} progress 进度。0-1
	 * @property {String} width  自定义宽度
	 * @property {String} height 自定义高度
	 * @property {String} bgType 背景主题
	 * @property {String} progressHeight 进度条的自定义高度
	 * @property {String} progressBgType进度条的背景主题
	 * @property {String} boxStyle 外层样式
	 * @property {String} progressStyle 进度条的样式
	 */
	export default {
		props: {
			/**
			 * 进度。0-1
			 */
			progress: {
				type: Number,
				default: 0
			},
			/**
			 * 自定义宽度
			 */
			width: {
				type: String,
				default: '600rpx'
			},
			/**
			 * 自定义高度
			 */
			height: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: 'light'
			},
			/**
			 * 进度条的自定义高度
			 */
			progressHeight: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 进度条的背景主题
			 */
			progressBgType: {
				type: String,
				default: 'primary'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 进度条的样式
			 */
			progressStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			runStyle() {
				if (this.progress === 0) {
					return 'width: 0;'
				}
				if (this.progress >= 1) {
					return `width:${this.width};`
				}
				if (this.width.indexOf('rpx') >= 0 || this.width.indexOf('upx') >= 0) {
					const w = parseInt(this.width) * this.progress
					return `width:${w}rpx;`
				}
				const w = parseInt(this.width) * this.progress
				return `width:${w}px;`
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
