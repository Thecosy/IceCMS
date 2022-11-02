<template>
	<scroll-view :scroll="false" :scroll-x="true" :scroll-left="leftPx" :scroll-with-animation="true" :show-scrollbar="false" :class="['n-bg-'+bgType]" :style="mrScrollStyle">
		<view class="n-flex-row n-wrap-nowrap" :style="contentStyle">
			<slot></slot>
		</view>
	</scroll-view>
</template>

<script>
	/**
	 * scroll-h
	 * @description 横向滚动
	 * @property {String} bgType 背景主题
	 * @property {String} width 自定义宽度
	 * @property {String} height 自定义高度
	 * @property {String} left scroll-left
	 * @property {String} boxStyle 外层样式
	 * @property {String} contentStyle 内容样式。如果vue页面下无法滚动（内容有压缩），请设置内容总宽度
	 */
	import {getPx} from '../utils/system.js'
	
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
			 * 自定义宽度
			 */
			width: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 自定义高度
			 */
			height: {
				type: String,
				default: '260px'
			},
			/**
			 * scroll-left
			 */
			left: {
				type: String,
				default: '0'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容样式。如果vue页面下无法滚动（内容有压缩），
			 * 请设置内容总宽度
			 */
			contentStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			leftPx() {
				return getPx(this.left)
			},
			mrScrollStyle() {
				let _style = "width:" + this.width + ';'
				_style += "height:" + this.height + ';'
				// #ifdef APP-NVUE
				_style += `flex-direction:row;`
				// #endif
				return _style + this.boxStyle
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
