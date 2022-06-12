<template>
	<view v-if="showing" :class="['n-toast', needMask&&'n-toast-mask', needMask&&'n-bg-'+maskType]" @click.stop="toPrevent" :style="boxStyle+maskStyle">
		<view v-if="mode==='big'" class="n-toast-content" :style="mrContentStyle">
			<view :class="['n-toast-content-box', 'n-flex-column', 'n-align-center', 'n-justify-center', 'n-bg-'+bgType]" :style="contentStyle">
				<n-icon v-if="icon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="'font-size:60rpx;'+iconStyle"></n-icon>
				<text v-if="text" :class="['n-toast-content-text', 'n-lines-2', 'n-color-'+textType, 'n-size-'+textSize]" :style="textStyle">{{text}}</text>
			</view>
		</view>
		<view v-else class="n-toast-small" :style="mrContentStyle">
			<view :class="['n-toast-small-box', 'n-flex-row', 'n-align-center', 'n-bg-'+bgType]" :style="contentStyle">
				<view v-if="icon" style="margin-right: 24rpx;">
					<n-icon :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle"></n-icon>
				</view>
				<text v-if="text" :class="['n-toast-small-text', 'n-flex-one', 'n-lines-2', 'n-color-'+textType, 'n-size-'+textSize]" :style="textStyle">{{text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getHeight} from '../utils/system.js'

	export default {
		props: {
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 基准宽度
			 */
			baseWidth: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 基准高度
			 */
			baseHeight: {
				type: String,
				default: 'window'
			}
		},
		data() {
			return {
				needMask: false,
				maskType: 'mask',
				maskStyle: '',
				pos: 'center',   // top/center/bottom
				offset: '0',     // status/nav-status/status-nav/x/...
				mode: 'small',   // big/small. big is big icon, small is small icon
				type: '',
				bgType: '',
				icon: '',
				text: '',
				textType: 'inverse',
				textSize: 'base',
				iconType: 'inverse',
				iconSize: 'll',
				contentStyle: '',
				iconStyle: '',
				textStyle: '',
				showing: false,
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
				let style = `left:${this.screenWidth*0.5}px;`
				if (this.pos === 'center') {
					const h = this.screenHeight * 0.5 + this.offsetPx
					style += `top:${h}px;transform:translate(-50%, -50%);`
				} else if (this.pos === 'bottom') {
					style += `bottom:${this.offsetPx}px;transform:translateX(-50%);`
				} else {
					style += `top:${this.offsetPx}px;transform:translateX(-50%);`
				}
				return style
			}
		},
		methods: {
			show(info, cInterval=null, cFinish=null, errorOptions=null) {
				this.tid && clearTimeout(this.tid)
				if (this.showing) {
					this.showing = false
				}
				let _interval = 2000  // default 2000
				let _finish = null
				let _info = {}
				// Error
				if (info && info.message) {
					let _msg = info.message
					if (info.fileName) {
						_msg += " " + info.fileName
					}
					if (info.lineNumber) {
						_msg += " " + info.lineNumber
					}
					_info['text'] = _msg
					if (!errorOptions || typeof errorOptions != 'object') {
						_info = {text: _msg, type: 'error', bgType: 'error', icon: 'error', 'pos': 'center', offset: '0'}
					} else {
						_info = Object.assign({}, {text: _msg}, errorOptions)
					}
				} else {
					_info = Object.assign({}, info||{})
				}
				if (_info.interval) {
					_interval = _info.interval
				} else if (_info.interval === 0) {
					_interval = 0
				}
				delete _info.interval
				if (_info.finish) {
					_finish = _info.finish
					delete _info.finish
				}
				if (typeof _info.needMask === 'boolean') {
					this.needMask = _info.needMask
					delete _info.needMask
				} else {
					this.needMask = false
				}
				if (_info.mode) {
					this.mode = _info.mode
					delete _info.mode
				} else {
					this.mode = 'small'
				}
				if (_info.contentStyle) {
					this.contentStyle = _info.contentStyle
					delete _info.contentStyle
				} else {
					// reset to clear the before-set
					this.contentStyle = ''
				}
				if (_info.iconStyle) {
					this.iconStyle = _info.iconStyle
					delete _info.iconStyle
				} else {
					this.iconStyle = ''
				}
				if (_info.iconType) {
					this.iconType = _info.iconType
					delete _info.iconType
				} else {
					this.iconType = 'inverse'
				}
				if (_info.iconSize) {
					this.iconSize = _info.iconSize
					delete _info.iconSize
				} else {
					this.iconSize = 'll'
				}
				if (_info.textStyle) {
					this.textStyle = _info.textStyle
					delete _info.textStyle
				} else {
					this.textStyle = ''
				}
				if (_info.textType) {
					this.textType = _info.textType
					delete _info.textType
				} else {
					this.textType = 'inverse'
				}
				if (_info.textSize) {
					this.textSize = _info.textSize
					delete _info.textSize
				} else {
					this.textSize = 'base'
				}
				// type/bgType/icon/text/pos/offset
				for (const i in _info) {
					this[i] = _info[i]
				}
				if (!this.type) {
					this.type = "default"
				}
				if (!_info.bgType) {
					this.bgType = this.type
					if (this.type === 'default') {
						this.bgType = 'mask-dark'
					}
				}
				if (!_info.icon) {
					this.icon = 'toast-'+this.type
				}
				if (!_info.pos) {
					this.pos = 'center'
				}
				if (typeof _info.offset === 'undefined' || (typeof _info.offset === 'string' && _info.offset.length === 0)) {
					this.offset = '0'
				}
				if (cInterval) {
					_interval = cInterval
				}
				if (cFinish) {
					_finish = cFinish
				}
				this.showing = true
				const that = this
				this.tid = setTimeout(() => {
					that.showing = false;
					_finish && _finish()
				}, _interval);
			},
			toPrevent(e) {
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-toast {
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
			
			&-box {
				border-radius: 20rpx;
				width: 250rpx;
				height: 250rpx;
			}
			&-text {
				text-align: center;
				line-height: 42rpx;
				margin-top: 20rpx;
				width: 200rpx;
			}
		}
		&-small {
			position: fixed;
			
			&-box {
				border-radius: 20rpx;
				width: 600rpx;
				padding: 32rpx;
			}
			&-text {
				line-height: 42rpx;
			}
		}
	}
</style>
