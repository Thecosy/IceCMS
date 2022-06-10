<template>
	<view :class="['n-bg-'+boxBgType]" :style="mrBoxStyle">
		<view :class="['n-bg-'+bgType]" :style="mrDividerStyle"></view>
	</view>
</template>

<script>
	/**
	 * divider
	 * @description 线条分割器
	 * @property {Boolean} vertical 是否竖向
	 * @property {String} bgType 分割线背景主题
	 * @property {String} boxBgType 外层背景主题
	 * @property {String} boxBg 外层背景色
	 * @property {String} bg 分割线背景色
	 * @property {String} left 分割线左侧间距
	 * @property {String} right 分割线右侧间距
	 * @property {String} width 分割线宽度
	 * @property {String} height 分割线高度
	 */
	export default {
		props: {
			/**
			 * 是否竖向
			 */
			vertical: {
				type: Boolean,
				default: false
			},
			/**
			 * 分割线背景主题
			 */
			bgType: {
				type: String,
				default: 'border'
			},
			/**
			 * 外层背景主题
			 */
			boxBgType: {
				type: String,
				default: 'inverse'
			},
			/**
			 * 外层背景色
			 */
			boxBg: {
				type: String,
				default: ''
			},
			/**
			 * 分割线背景色
			 */
			bg: {
				type: String,
				default: ''
			},
			/**
			 * 分割线左侧间距
			 */
			left: {
				type: String,
				default: '0'
			},
			/**
			 * 分割线右侧间距
			 */
			right: {
				type: String,
				default: '0'
			},
			/**
			 * 分割线宽度
			 */
			width: {
				type: String,
				default: '1px'
			},
			/**
			 * 分割线高度
			 */
			height: {
				type: String,
				default: '1px'
			}
		},
		computed: {
			mrBoxStyle() {
				if (this.boxBg && this.boxBg.length > 0) {
					return `background-color:${this.boxBg};`
				}
				return ""
			},
			mrDividerStyle() {
				let _style = `height:${this.height};margin-left:${this.left};margin-right:${this.right};`
				if (this.bg && this.bg.length > 0) {
					_style += `background-color:${this.bg};`
				}
				if (this.vertical) {
					_style += `width:${this.width};`
				}
				return _style
			}
		}
	}
</script>

<style lang="scss">
</style>
