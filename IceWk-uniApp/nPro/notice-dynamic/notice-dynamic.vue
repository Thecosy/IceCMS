<template>
	<view ref="n-notice" v-if="showing" :hack="hackShow" :class="['n-notice', 'n-flex-row', 'n-align-center', 'n-justify-center', 'n-bg-'+mrBgType]" :style="mrBoxStyle + noWeexAnimation">
		<slot>
			<n-icon :name="mrIcon" :iconStyle="iconStyle" :type="iconType" :size="iconSize" :boxStyle="iconBoxStyle"></n-icon>
			<text :class="['n-size-'+textSize, 'n-color-'+textType]" :style="mrTextStyle">{{text}}</text>
		</slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation')
	// #endif
	import {getHeight, getScreenHeight} from '../utils/system.js'
	
	/**
	 * notice-dynamic
	 * @description 动态提示
	 */
	export default {
		data() {
			return {
				showing: false,
				pos: 'top', // top/bottom/top-center/bottom-center
				offset: 'status-nav',  // status/nav/status-nav/status-nav-xxx/number/rpx/px/x-xxx
				type: 'primary',
				bgType: 'primary',
				bg: '',
				text: '欢迎使用nPro',
				textType: 'inverse',
				textSize: 'base',
				textStyle: '',
				icon: '',
				iconType: 'inverse',
				iconSize: 'll',
				iconBoxStyle: '',
				iconStyle: '',
				height: '44px',
				boxStyle: '',
				duration: 2400,
				animation: 'ease-out',
				space: '12rpx',
				noWeexAnimation: ""
			}
		},
		computed: {
			screenHeight() {
				return getScreenHeight()
			},
			offsetPx() {
				return getHeight(this.offset)
			},
			heightPx() {
				return getHeight(this.height)
			},
			hackShow() {
				this.handleHackShow()
				return this.showing
			},
			mrBgType() {
				if (this.bgType && this.bgType.length > 0) return this.bgType
				return this.type
			},
			mrIcon() {
				if (this.icon && this.icon.length > 0) return this.icon
				return 'toast-'+this.type
			},
			mrTextStyle() {
				return `margin-left:${this.space};` + this.textStyle
			},
			mrBoxStyle() {
				let style = ''
				style += `height:${this.heightPx}px;`
				if (this.pos === 'top') {
					style += `top:${-this.heightPx}px;`
				} else if (this.pos === 'bottom') {
					style += `bottom:${-this.heightPx}px;`
				} else if (this.pos === 'center' || this.pos === 'top-center' || this.pos === 'center-top') {
					style += `top:${-this.heightPx}px;`
				} else if (this.pos === 'bottom-center' || this.pos === 'center-bottom') {
					style += `bottom:${-this.heightPx}px;`
				} else {
					style += `top:${-this.heightPx}px;`
				}
				if (this.bg && this.bg.length > 0) {
					style += `background-color:${this.bg};`
				}
				return style + this.boxStyle
			}
		},
		methods: {
			show(info) {
				for (const i in info) {
					this[i] = info[i]
				}
				this.showing = true
				if (!this.duration) return
				setTimeout(() => {
					this.hide()
				}, this.duration)
			},
			handleHackShow() {
				const that = this
				// since we used v-if, the element may not exist
				setTimeout(() => {
					that.appearPopup(that.showing)
				}, 50)
			},
			hide() {
				this.appearPopup(false, 300);
			},
			appearPopup(bool, duration = 300) {
				// #ifdef APP-NVUE
				this.weexAppearPopup(bool, duration)
				// #endif
				// #ifndef APP-NVUE
				this.noWeexAppearPopup(bool, duration)
				// #endif
			},
			// #ifndef APP-NVUE
			noWeexAppearPopup(bool, duration = 300) {
				// add css transition properties
				let _style = "transform:" + this.getTransform(!bool) + ';'
				_style += "transition: all " + duration + "ms " + this.animation + ';'
				this.noWeexAnimation = _style
				const that = this
				setTimeout(()=>{
					if (!bool) {
						that.showing = false
						that.$emit("close")
					}
				}, duration)
			},
			// #endif
			// #ifdef APP-NVUE
			weexAppearPopup(bool, duration = 300) {
				const popupEl = this.$refs['n-notice']
				if (!popupEl) {
					return
				}
				animation.transition(popupEl, {
					styles: {
						transform: this.getTransform(!bool)
					},
					duration,
					delay: 0,
					timingFunction: this.animation
				}, () => {
					if (!bool) {
						this.showing = false
						this.$emit('close')
					}
				})
			},
			// #endif
			getTransform(toClose) {
				let _size = 0
				if (!toClose) {
					if (this.pos === 'center' || this.pos === 'top-center' || this.pos === 'center-top' || this.pos === 'bottom-center' || this.pos === 'center-bottom') {
						_size = this.screenHeight * 0.5 - this.heightPx * 0.5 + this.offsetPx
					} else {
						_size = this.heightPx + this.offsetPx
					}
				}
				if (this.pos === 'top' || this.pos === 'center' || this.pos === 'center-top' || this.pos === 'top-center') {
					return `translateY(${_size}px)`
				}
				return `translateY(${-_size}px)`
			}
		}
	};
</script>

<style lang="scss" scoped>
	.n-notice {
		position: fixed;
		left: 0;
		right: 0;
	}
</style>
