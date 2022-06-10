<template>
	<view v-if="showLoading" :class="['n-loading', showLoading&&needMask&&'n-bg-'+maskType, showLoading&&needMask&&'n-loading-mask']" @tap.stop="maskClicked" :style="maskStyle+cMaskStyle">
		<view :class="['n-flex-column', 'n-align-center', 'n-justify-center', 'n-loading-content', 'n-bg-'+bgType]" :style="boxStyle+mrContentStyle">
			<image :src="icon" mode="aspectFill" class="n-loading-content-image" :style="iconStyle"></image>
			<text v-if="text" :class="['n-lines-1', 'n-loading-content-text', 'n-color-'+textType, 'n-size-'+textSize]" :style="textStyle">{{text}}</text>
		</view>
	</view>
</template>

<script>
	import {getHeight} from '../utils/system.js'
	
	/**
	 * loading
	 * @description 以私有化配置为主的loading组件
	 * @property {String} maskStyle 遮罩层样式
	 * @property {String} boxStyle 外层样式
	 * @property {String} baseHeight 基准高度
	 * @property {String} baseWidth 基准宽度
	 * @property {String} height 高度
	 * @property {String} width 宽度
	 */
	export default {
		props: {
			/**
			 * 遮罩层样式
			 */
			maskStyle: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 基准高度
			 */
			baseHeight: {
				type: String,
				default: 'window'
			},
			/**
			 * 基准宽度
			 */
			baseWidth: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 内容宽度
			 */
			width: {
				type: String,
				default: '200rpx'
			},
			/**
			 * 内容高度
			 */
			height: {
				type: String,
				default: '200rpx'
			}
		},
		data() {
			return {
				showLoading: false,
				pos: 'center',
				offset: '0',
				needMask: false,
				maskType: '',
				cMaskStyle: '',
				bgType: '',
				icon: '',
				text: '',
				iconStyle: '',
				textType: '',
				textSize: '',
				textStyle: '',
				contentStyle: '',
				delay: 0,
				tid: 0
			}
		},
		computed: {
			screenHeight() {
				return getHeight(this.baseHeight)
			},
			screenWidth() {
				return getHeight(this.baseWidth)
			},
			offsetPx() {
				return getHeight(this.offset)
			},
			mrContentStyle() {
				let style = `margin-left:${this.screenWidth*0.5}px;`
				if (this.width) {
					style += `width:${this.width};`
				}
				if (this.height) {
					style += `height:${this.height};`
				}
				if (this.pos === 'center') {
					style += 'transform:translate(-50%,-50%);'
					style += `top:${this.screenHeight*0.5+this.offsetPx}px;`
				} else if (this.pos === 'bottom') {
					style += 'transform:translateX(-50%);'
					style += `bottom:${this.offsetPx}px;`
				} else {
					style += 'transform:translateX(-50%);'
					style += `top:${this.offsetPx}px;`
				}
				return this.contentStyle + style
			}
		},
		methods: {
			show(options) {
				this.tid && clearTimeout(this.tid)
				const opts = Object.assign({}, options)
				this.pos = opts.pos || 'center'
				this.offset = opts.offset || '0px'
				this.needMask = (typeof opts.needMask === 'boolean') ? opts.needMask : false
				this.maskType = opts.maskType || 'mask'
				this.cMaskStyle = opts.maskStyle || ''
				this.bgType = opts.bgType || 'mask-dark'
				this.icon = opts.icon || '/static/ui/loading.gif'
				this.text = opts.text || ''
				this.textType = opts.textType || 'inverse'
				this.textSize = opts.textSize || 'ss'
				this.textStyle = opts.textStyle || ''
				this.iconStyle = opts.iconStyle || ''
				this.contentStyle = opts.contentStyle || ''
				this.delay = opts.delay || 0
				if (this.delay === 0) {
					this.showLoading = true
				} else {
					const that = this
					this.tid = setTimeout(() => {
						that.showLoading = true
					}, this.delay)
				}
			},
			hide() {
				this.showLoading = false
			},
			maskClicked(e) {
				e.stopPropagation && e.stopPropagation()
				this.needMask && (this.$emit('maskClicked', {}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-loading {
		position: relative;
		
		&-mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
		&-content {
			position: fixed;
			border-radius: 20rpx;

			&-image {
				width: 75rpx;
				height: 75rpx;
			}
			&-text {
				text-align: center;
				color: #FFFFFF;
				font-size: 24rpx;
				line-height: 30rpx;
				height: 30rpx;
				margin-top: 16rpx;
				width: 140rpx;
			}
		}
	}
</style>
