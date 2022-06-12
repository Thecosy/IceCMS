<template>
	<view :class="['n-bg-'+bgType, 'n-flex-'+flex, 'n-justify-'+justify, 'n-align-'+align, 'n-border-'+border, 'n-radius-'+radius]" :style="'height:'+heightPx+'px;'+boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * height
	 * @description 高度
	 * @property {String} flex 布局方式
	 * @property {String} justify justify主题
	 * @property {String} align align主题
	 * @property {String} bgType 背景主题
	 * @property {String} border 边框主题
	 * @property {String} radius 圆角主题
	 * @property {String} height 链式高度：status-nav-32rpx
	 * @property {String} boxStyle 外层样式
	 */
	import {getHeight} from '../utils/system.js'
	
	export default {
		props: {
			/**
			 * 布局方式
			 */
			flex: {
				type: String,
				default: 'column'
			},
			/**
			 * justify主题
			 */
			justify: {
				
			},
			/**
			 * align主题
			 */
			align: {
				
			},
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
			 * 链式高度：status-nav-32rpx
			 */
			height: {
				type: String,
				default: '0'
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
			heightPx() {
				return getHeight(this.height)
			}
		}
	}
</script>

<style>
</style>
