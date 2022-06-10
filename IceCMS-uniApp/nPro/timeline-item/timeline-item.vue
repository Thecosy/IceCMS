<template>
	<view :class="['n-flex-row', 'n-wrap-nowrap', 'n-bg-'+bgType, 'n-border-'+border, 'n-radius-'+radius]" :style="boxStyle">
		<slot name="left"></slot>
		<view class="n-timeline-center n-flex-column n-align-center" :style="centerStyle">
			<view :class="['n-timeline-line', 'n-bg-'+lineBgType]" :style="lineStyle"></view>
			<slot name="badge"></slot>
		</view>
		<slot name="right"></slot>
	</view>
</template>

<script>
	/**
	 * timeline-item
	 * @description 时间轴
	 * @property {String} bgType 背景主题
	 * @property {String} border 边框主题
	 * @property {String} radius 圆角主题
	 * @property {String} centerStyle 中间线外层样式
	 * @property {String} lineBgType 中间线背景主题
	 * @property {String} lineStyle 中间线样式
	 * @property {String} boxStyle 外层样式
	 */
	export default {
		props: {
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: ''
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: ''
			},
			/**
			 * 中间线外层样式
			 */
			centerStyle: {
				type: String,
				default: ''
			},
			/**
			 * 中间线背景主题
			 */
			lineBgType: {
				type: String,
				default: 'border'
			},
			/**
			 * 中间线样式
			 */
			lineStyle: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-timeline {
		&-center {
			position: relative;
		}
		&-line {
			flex: 1;
			width: 1px;
		}
	}
</style>
