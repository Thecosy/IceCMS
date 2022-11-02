<template>
	<view :class="[fixed?'n-position-fixed':'n-position-absolute', 'n-bg-'+bgType]" :style="mrBoxStyle">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * position
	 * @description 便捷定位盒子
	 * @property {Boolean} fixed 是否fixed定位
	 * @property {String} pos 定位的位置
	 * @property {String} offset 定位的偏移量
	 * @property {String} bgType 背景主题
	 * @property {String} boxStyle 外层样式
	 */
	import {getHeight} from '../utils/system.js'
	
	export default {
		props: {
			/**
			 * 是否fixed定位
			 */
			fixed: {
				type: Boolean,
				default: false
			},
			/**
			 * 定位的位置
			 */
			pos: {
				type: String,
				default: 'bottom'
			},
			/**
			 * 定位的偏移量
			 */
			offset: {
				type: String,
				default: '0px'
			},
			/**
			 * 背景主题
			 */
			bgType: {
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
		},
		computed: {
			offsetPx() {
				return getHeight(this.offset)
			},
			mrBoxStyle() {
				return (this.pos === 'top' ? `top:${this.offsetPx}px;` : `bottom:${this.offsetPx}px;`) + this.boxStyle
			}
		}
	}
</script>

<style>
</style>
