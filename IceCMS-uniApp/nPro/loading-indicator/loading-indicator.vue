<template>
	<image :src="src" :style="{width: width, height: height}" mode="aspectFit"></image>
</template>

<script>
	/**
	 * loading-indicator
	 * @description 加载中组件
	 * @property {String} src 提示gif图片
	 * @property {String} width 自定义宽度
	 * @property {String} height 自定义高度
	 */
	export default {
		props: {
			/**
			 * 提示gif图片
			 */
			src: {
				type: String,
				default: '/static/ui/loading.gif'
			},
			/**
			 * 自定义宽度
			 */
			width: {
				type: String,
				default: '36rpx'
			},
			/**
			 * 自定义高度
			 */
			height: {
				type: String,
				default: '36rpx'
			}
		}
	}
</script>

<style>
</style>
