<template>
	<view :class="[value?'n-bg-'+onBgType:'n-bg-'+bgType, disabled&&'n-disabled']" :style="mrSwitchStyle" @click.stop="handleClick">
		<slot name="on"></slot>
		<view :class="['n-bg-'+animateBgType]" :style="mrAnimateStyle">
			<slot name="off"></slot>
		</view>
		<view :class="['n-bg-'+ballBgType]" :style="mrBallStyle"></view>
	</view>
</template>

<script>
	/**
	 * switch
	 * @description 开关
	 * @property {Boolean} value 值/是否打开
	 * @property {Boolean} disabled 是否禁用
	 * @property {String} bgType 关闭时的背景主题
	 * @property {String} onBgType 打开时的背景主题
	 * @property {String} ballBgType 移动球的背景主题
	 * @property {String} animateBgType 动画层背景主题
	 * @property {String} width 自定义宽度
	 * @property {String} height 自定义高度
	 * @property {String} ballSize 移动球的自定义宽高
	 * @property {String} ballBg 移动球的自定义背景色
	 * @property {String} animateBg 动画层的自定义背景色
	 * @property {String} bg 关闭时的自定义背景色
	 * @property {String} onBg 打开时的自定义背景色
	 */
	export default {
		props: {
			/**
			 * 值/是否打开
			 */
			value: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否禁用
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * 关闭时的背景主题
			 */
			bgType: {
				type: String,
				default: 'light'
			},
			/**
			 * 打开时的背景主题
			 */
			onBgType: {
				type: String,
				default: 'primary'
			},
			/**
			 * 移动球的背景主题
			 */
			ballBgType: {
				type: String,
				default: 'inverse'
			},
			/**
			 * 动画层背景主题
			 */
			animateBgType: {
				type: String,
				default: ''
			},
			/**
			 * 自定义宽度
			 */
			width: {
				type: String,
				default: '102rpx'
			},
			/**
			 * 自定义高度
			 */
			height: {
				type: String,
				default: '62rpx'
			},
			/**
			 * 移动球的自定义宽高
			 */
			ballSize: {
				type: String,
				default: '58rpx'
			},
			/**
			 * 移动球的自定义背景色
			 */
			ballBg: {
				type: String,
				default: ''
			},
			/**
			 * 动画层的自定义背景色
			 */
			animateBg: {
				type: String,
				default: ''
			},
			/**
			 * 关闭时的自定义背景色
			 */
			bg: {
				type: String,
				default: ''
			},
			/**
			 * 打开时的自定义背景色
			 */
			onBg: {
				type: String,
				default: ''
			}
		},
		computed: {
			switchNormalStyle() {
				let _style = `width:${this.width};height:${this.height};position:relative;overflow:hidden;`
				_style += `border-radius:${this.height};`
				if (this.bg && this.bg.length > 0) {
					_style += `background-color:${this.bg};`
				}
				return _style
			},
			switchOnStyle() {
				let _style = ""
				if (this.onBg && this.onBg.length > 0) {
					_style += `background-color:${this.onBg};`
				}
				return _style
			},
			mrSwitchStyle() {
				let _style = this.switchNormalStyle
				if (this.value) {
					_style += this.switchOnStyle
				}
				return _style
			},
			ballStyle() {
				let _style = `width:${this.ballSize};height:${this.ballSize};border-radius:${this.ballSize};`
				if (this.ballBg && this.ballBg.length > 0) {
					_style += `background-color:${this.ballBg};`
				}
				_style += `position:absolute;transition-property:left;transition-duration: 200ms;transition-timing-function:ease;box-shadow:4rpx 4rpx 8rpx rgba(0, 0, 0, 0.2);`
				_style += `left:${this.ballSpace}rpx;`
				return _style
			},
			ballOnStyle() {
				return `left:${this.ballOnSpace}rpx;`
			},
			mrBallStyle() {
				return this.value ? (this.ballStyle + this.ballOnStyle) : this.ballStyle
			},
			ballSpace() {
				const sh = parseInt(this.height)
				const bh = parseInt(this.ballSize)
				return (sh - bh) * 0.5
			},
			ballOnSpace() {
				const sw = parseInt(this.width)
				const bw = parseInt(this.ballSize)
				return sw - bw - this.ballSpace
			},
			animateWidth() {
				const sw = parseInt(this.width)
				return sw - this.ballSpace * 2
			},
			animateStyle() {
				let _style = `position:absolute;transition-property:transform;transition-duration:200ms;transition-timing-function:ease;transform:scale(1);`
				_style += `width:${this.animateWidth}rpx;height:${this.ballSize};border-radius:${this.ballSize};`
				if (this.animateBg && this.animateBg.length > 0) {
					_style += `background-color:${this.animateBg};`
				}
				_style += `left:${this.ballSpace}rpx;top:${this.ballSpace}rpx;`
				return _style
			},
			mrAnimateStyle() {
				const aniCS = "transform:scale(0);"
				return this.value ? (this.animateStyle + aniCS) : this.animateStyle
			}
		},
		methods: {
			handleClick(e) {
				if (!this.disabled) {
					this.$emit('input', !this.value)
					this.$emit('change', !this.value)
				}
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
