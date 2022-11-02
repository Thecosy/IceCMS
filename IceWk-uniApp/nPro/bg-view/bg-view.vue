<template>
	<view class="n-position-relative" :style="boxStyle">
		<image class="n-position-absolute" :style="'left:0;top:0;right:0;bottom:0;'+imageStyle" :src="src" :mode="mode||'scaleToFill'" />
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * bg-view 用于快速设置图片背景
	 * @description 带背景的View
	 * @property {String} src 背景图
	 * @property {String} boxStyle 图片宽高设置
	 * @property {String} imageStyle 图片宽高设置
	 */
	export default {
		props: {
			src: {
				type: String,
				required: true
			},
			mode: {
				type: String,
				default: 'scaleToFill'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			imageStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
