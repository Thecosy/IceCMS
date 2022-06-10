import {getHeight} from '../utils/system.js'

// #ifdef APP-NVUE
const dom = uni.requireNativePlugin("dom")
// #endif

export default {
	props: {
		/**
		 * 是否显示scrollbar
		 */
		showScrollbar: {
			type: Boolean,
			default: true
		},
		/**
		 * 背景主题
		 */
		bgType: {
			type: String,
			default: 'page'
		},
		/**
		 * 定位
		 */
		position: {
			type: String,
			default: 'static'
		},
		/**
		 * 定位的top
		 */
		top: {
			type: String,
			default: '0'
		},
		/**
		 * 定位的bottom
		 */
		bottom: {
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
		// #ifndef APP-NVUE
		/**
		 * 只开放非nvue-app下设置高度，nvue-app通过flex来实现高度继承。
		 * 允许高度组合：screen-!status-!nav-!100rpx
		 */
		height: {
			type: String,
			default: 'window-!status-!nav'
		},
		// #endif
		/**
		 * 是否颠倒列表
		 */
		reverse: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		mrBoxStyle() {
			// #ifdef APP-NVUE
			if (this.position != 'absolute' && this.position != 'fixed') {
				return this.boxStyle
			}
			// #endif
			let _style = ''
			// #ifndef APP-NVUE
			if (this.height != '-1') {
				_style += 'height:'+getHeight(this.height)+'px;'
			}
			// #endif
			if (this.top != '-1') {
				_style += 'top:' + getHeight(this.top) + 'px;'
			}
			if (this.bottom != '-1') {
				_style += 'bottom:' + getHeight(this.bottom) + 'px;'
			}
			return _style + this.boxStyle
		},
		// #ifndef APP-NVUE
		nScrollHeight() {
			return getHeight(this.height)
		}
		// #endif
	},
	data() {
		return {
			// #ifndef APP-NVUE
			nCurrentView: null,
			nScrollTop: 0
			// #endif
		}
	},
	methods: {
		nScrollToBottom() {
			// #ifdef APP-NVUE
			const ref = this.$refs['n-list-bottom']
			dom.scrollToElement(ref, {offset: 0, animated: true})
			// #endif
			// #ifndef APP-NVUE
			this.nCurrentView = 'n-list-bottom'
			// #endif
		},
		nScrollToTop() {
			// #ifdef APP-NVUE
			const ref = this.$refs['n-list-top']
			dom.scrollToElement(ref, {offset: 0, animated: true})
			// #endif
			// #ifndef APP-NVUE
			this.nCurrentView = 'n-list-top'
			// #endif
		},
		nScrollToElement(ref, options={offset: 0, animated: true}) {
			// #ifdef APP-NVUE
			dom.scrollToElement(ref, options)
			// #endif
			// #ifndef APP-NVUE
			this.nCurrentView = null
			if (this.nScrollTop === ref) {
				this.nScrollTop = ref + 0.1
			} else {
				this.nScrollTop = ref
			}
			// #endif
		}
	}
}
