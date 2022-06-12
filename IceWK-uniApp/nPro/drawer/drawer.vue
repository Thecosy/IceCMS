<template>
	<view bubble="true">
		<view v-if="hasOverlay" ref="n-popo-overlay" :class="['n-popo-over', 'n-bg-'+overlay.bgType]" @tap.stop="overlayClose" :style="mrOverlayStyle + overlayNoWeexAni">
			<slot name="overlay"></slot>
		</view>
		<view ref="n-popo" bubble="true" @touchstart="onAllTouchStart" @touchmove="onAllTouchMove" @touchcancel="onAllTouchCancel" @touchend="onAllTouchEnd" @tap.stop="toPrevent" :class="['n-flex-column', 'n-popo', 'n-bg-'+bgType]" :style="boxStyle+mrPopStyle + noWeexAni">
			<view v-if="!allowAll" ref="n-popo-stand" @touchstart="onStandTouchStart" @touchmove="onStandTouchMove" @touchcancel="onStandTouchCancel" @touchend="onStandTouchEnd" @tap.stop="toPrevent">
				<slot name="standout"></slot>
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	const bindingX = uni.requireNativePlugin('bindingx');
	// #endif
	// #ifndef APP-NVUE
	import {getTouchPoint} from '../utils/element.js'
	// #endif
	import {getHeight, getPx, getPlatform} from '../utils/system.js'
	
	let iosHack = null
	
	/**
	 * drawer
	 * @description 可跟手拖动的抽屉
	 * @property {String} pos 出现位置
	 * @property {String} bgType 内容背景主题
	 * @property {Number} duration 打开/关闭的动画周期
	 * @property {Boolean} auto 停止手势后是否自动打开
	 * @property {Boolean} allowAll 是否手势加在整个内容上
	 * @property {Boolean} allowSwipe 是否允许swipe动作来打开/关闭
	 * @property {Boolean} hasOverlay 是否存在遮罩层
	 * @property {Object} overlay 遮罩层的整体设置 timingFunction: ['ease-in', 'ease-out'],duration: 300,bg: '',bgType: 'mask'
	 * @property {Object} animation 打开/关闭动画 imingFunction: 'ease-in-out'
	 * @property {String} baseWidth 基准宽度
	 * @property {String} width 内容的宽度
	 * @property {String} baseHeight 基准高度
	 * @property {String} height 内容高度
	 * @property {String} standout 内容露出的高度
	 * @property {String} leftOffset 内容左侧偏移量，-1表示居中
	 * @property {String} rightOffset 内容右侧偏移量，-1表示居中
	 * @property {String} bottomOffset 内容底部偏移量，-1表示居中
	 * @property {String} topOffset 内容顶部偏移量，-1表示居中
	 * @property {String} left 遮罩左侧偏移量
	 * @property {String} top 遮罩顶部偏移量
	 * @property {String} right 遮罩右侧偏移量
	 * @property {String} bottom 遮罩底部偏移量
	 * @property {Boolean} initWithAni 是否具备初始动画
	 * @property {Number} initDelay 初始动画的延时
	 * @property {Number} initDuration 初始动画周期
	 * @property {Number} openRate 多少比例自动打开
	 * @property {Number} closeRate 多少比例自动关闭
	 * @property {Number} delay 关闭时有个delay 否则Android下点击事件存在问题
	 * @property {String} overlayStyle 遮罩层的外层样式 MP/H5可设置z-index
	 * @property {String} boxStyle 内容外层样式 MP/H5可设置z-index
	 */
	export default {
		props: {
			/**
			 * 出现位置
			 */
			pos: {
				type: String,
				default: 'bottom'
			},
			/**
			 * 内容背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 打开/关闭的动画周期
			 */
			duration: {
				type: Number,
				default: 300
			},
			/**
			 * 停止手势后是否自动打开/关闭
			 */
			auto: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否手势加在整个内容上
			 */
			allowAll: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否允许swipe动作来打开/关闭
			 */
			allowSwipe: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否只允许swipe动作，没有跟手
			 */
			onlySwipe: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否存在遮罩层
			 */
			hasOverlay: {
				type: Boolean,
				default: true
			},
			/**
			 * 遮罩层的整体设置
			 */
			overlay: {
				type: Object,
				default: () => ({
					timingFunction: ['ease-in', 'ease-out'],
					duration: 300,
					bg: '',
					bgType: 'mask'
				})
			},
			/**
			 * 基准高度，用于计算其他高度
			 */
			baseHeight: {
				type: String,
				default: 'screen'
			},
			/**
			 * 内容高度
			 */
			height: {
				type: String,
				default: '0'
			},
			/**
			 * 内容露出的高度
			 */
			standout: {
				type: String,
				default: '0'
			},
			/**
			 * 内容左侧偏移量，-1表示居中
			 */
			leftOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容右侧偏移量，-1表示居中
			 */
			rightOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容底部偏移量，-1表示居中
			 */
			bottomOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容顶部偏移量，-1表示居中
			 */
			topOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 基准宽度
			 */
			baseWidth: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 内容的宽度
			 */
			width: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 打开/关闭动画
			 */
			animation: {
				type: Object,
				default: () => ({
					timingFunction: 'ease-in-out'
				})
			},
			/**
			 * 是否具备初始动画
			 */
			initWithAni: {
				type: Boolean,
				default: true
			},
			/**
			 * 初始动画的延时
			 */
			initDelay: {
				type: Number,
				default: 200
			},
			/**
			 * 初始动画的周期
			 */
			initDuration: {
				type: Number,
				default: 300
			},
			/**
			 * 遮罩左侧偏移量
			 */
			left: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩顶部偏移量
			 */
			top: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩右侧偏移量
			 */
			right: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩底部偏移量
			 */
			bottom: {
				type: String,
				default: '0'
			},
			/**
			 * 多少比例自动打开
			 */
			openRate: {
				type: Number,
				default: 0.5
			},
			/**
			 * 多少比例自动关闭
			 */
			closeRate: {
				type: Number,
				default: 0.5
			},
			/**
			 * 关闭时有个delay
			 * 否则Android下点击事件存在问题
			 */
			delay: {
				type: Number,
				default: 150
			},
			/**
			 * 遮罩层的外层样式
			 * MP/H5可设置z-index
			 */
			overlayStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容外层样式
			 * MP/H5可设置z-index
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				overlayNoWeexAni: '',
				noWeexAni: '',
				isShow: false,
				lastOffset: 0 // 上一次的总offset
			}
		},
		computed: {
			screenHeight() {
				return getHeight(this.baseHeight)
			},
			screenWidth() {
				return getPx(this.baseWidth)
			},
			overlayHeight() {
				return this.screenHeight - this.topPx - this.bottomPx
			},
			mrOverlayStyle() {
				let style = `left:${this.leftPx}px;top:${this.topPx}px;right:${this.rightPx}px;`
				return style + this.overlayStyle
			},
			mrPopStyle() {
				let style = {
					width: `${this.widthPx}px`,
					height: `${this.heightPx}px`
				}
				// top: left/right-width-height-top  bottom: left/right-width-height-bottom
				if (this.pos === 'top' || this.pos === 'bottom') {
					if (this.leftOffsetPx < 0 && this.rightOffsetPx < 0) {
						style['left'] = (this.screenWidth - this.leftPx - this.rightPx - this.widthPx) * 0.5 + 'px'
					} else {
						if (this.leftOffsetPx >= 0) {
							style['left'] = (this.leftPx + this.leftOffsetPx) + 'px'
						} else if (this.rightOffsetPx >= 0) {
							style['right'] = (this.rightPx + this.rightOffsetPx) + 'px'
						}
					}
					style[this.pos] = -this.heightPx + 'px'
				}
				if (this.pos === 'left' || this.pos === 'right') {
					if (this.topOffsetPx < 0 && this.bottomOffsetPx < 0) {
						style['top'] = (this.screenHeight - this.topPx - this.bottomPx - this.heightPx) * 0.5 + 'px'
					} else {
						if (this.topOffsetPx >= 0) {
							style['top'] = (this.topPx + this.topOffsetPx) + 'px'
						} else if (this.bottomOffsetPx >= 0) {
							style['bottom'] = (this.bottomPx + this.bottomOffsetPx) + 'px'
						}
					}
					style[this.pos] = -this.widthPx + 'px'
				}
				let _style = ""
				for (const i in style) {
					_style += i + ":" + style[i] + ';'
				}
				return _style
			},
			heightPx() {
				const h = getHeight(this.height)
				if (h > 1) {
					return h
				}
				if (h <= 0) {
					return this.screenHeight - this.topPx - this.bottomPx - (this.topOffsetPx>=0?this.topOffsetPx:0) - (this.bottomOffsetPx>=0?this.bottomOffsetPx:0)
				}
				return this.screenHeight * h
			},
			widthPx() {
				const w = getPx(this.width)
				if (w <= 0) {
					return this.screenWidth - this.leftPx - this.rightPx - (this.leftOffsetPx>=0?this.leftOffsetPx:0) - (this.rightOffsetPx>=0?this.rightOffsetPx:0)
				}
				return w
			},
			standoutPx() {
				return getHeight(this.standout)
			},
			leftOffsetPx() {
				if (this.leftOffset === '-1') return -1;
				return getPx(this.leftOffset)
			},
			topOffsetPx() {
				if (this.topOffset === '-1') return -1;
				return getHeight(this.topOffset)
			},
			rightOffsetPx() {
				if (this.rightOffset === '-1') return -1;
				return getPx(this.rightOffset)
			},
			bottomOffsetPx() {
				if (this.bottomOffset === '-1') return -1;
				return getHeight(this.bottomOffset)
			},
			leftPx() {
				return getPx(this.left)
			},
			topPx() {
				return getHeight(this.top)
			},
			rightPx() {
				return getPx(this.right)
			},
			bottomPx() {
				return getHeight(this.bottom)
			}
		},
		methods: {
			// 组件创建后增加显示动画效果
			initShow() {
				let dur = 0
				if (this.initWithAni) {
					dur = this.initDuration || 0
				}
				// #ifndef APP-NVUE
				this.noWeexAni = `transition-property: transform;transition-duration:${dur}ms;transition-timing-function: ${this.animation.timingFunction};transform:translate${this.pos=='top'||this.pos=='bottom'?'Y':'X'}(${this.pos=='top'||this.pos=='left'?this.standoutPx:(-1*this.standoutPx)}px);`
				// #endif
				// #ifdef APP-NVUE
				animation.transition(this.$refs['n-popo'], {
					styles: {
						transform: `translate${this.pos=='top'||this.pos=='bottom'?'Y':'X'}(${this.pos=='top'||this.pos=='left'?this.standoutPx:(-1*this.standoutPx)}px)`
					},
					delay: 0,
					duration: dur,
					timingFunction: this.animation.timingFunction
				})
				// #endif
			},
			// ref method to open
			show(duration) {
				this.toHackShow(true, typeof duration === 'undefined' ? this.duration : duration)
			},
			// ref method to close
			hide(duration) {
				this.toHackShow(false, typeof duration === 'undefined' ? this.duration : duration)
			},
			onAllTouchStart(e) {
				this.allowAll && this.onTouchStart(e)
			},
			onAllTouchMove(e) {
				// #ifndef APP-NVUE
				this.allowAll && this.onTouchMove(e)
				// #endif
			},
			onAllTouchEnd(e) {
				// #ifndef APP-NVUE
				this.allowAll && this.onTouchEnd(e)
				// #endif
			},
			onAllTouchCancel(e) {
				this.allowAll && this.onTouchCancel(e)
			},
			onStandTouchStart(e) {
				this.onTouchStart(e)
			},
			onStandTouchMove(e) {
				// #ifndef APP-NVUE
				this.onTouchMove(e)
				// #endif
			},
			onStandTouchEnd(e) {
				// #ifndef APP-NVUE
				this.onTouchEnd(e)
				// #endif
			},
			onStandTouchCancel(e) {
				this.onTouchCancel(e)
			},
			onTouchStart(e) {
				this.$emit("start")
				// #ifdef APP-NVUE
				this.isShow ? this.closeWithDrag() : this.openWithDrag()
				// #endif
				// #ifndef APP-NVUE
				this.startPoint = getTouchPoint(e)
				// #endif
			},
			// #ifndef APP-NVUE
			onTouchMove(e) {
				if (!this.startPoint) return;
				const nowPoint = getTouchPoint(e)
				const maxSize = this.getTransformSize(this.pos, false)
				const moveSize = maxSize - this.standoutPx
				let offsetY = nowPoint.y - this.startPoint.y
				let offsetX = nowPoint.x - this.startPoint.x
				if (!this.auto) {
					offsetY += this.lastOffset
					offsetX += this.lastOffset
				}
				if (!this.isShow) {
					if (this.pos === 'top') {
						if (offsetY > 0) {
							offsetY += this.standoutPx
							const y = (offsetY >= maxSize) ? maxSize : offsetY
							this.noWeexAni = `transition-property: transform; transform: translateY(${y}px); transition-duration: 0ms;`
							if (this.hasOverlay) {
								this.overlayNoWeexAni = `transition-property:opacity; transition-duration: 0ms;opacity:${(y-this.standoutPx)/moveSize};height:${this.overlayHeight}px;`
							}
						} else {
						}
					} else if (this.pos === 'bottom') {
						if (offsetY >= 0) {
						} else {
							offsetY += -1*this.standoutPx
							const y = (-offsetY >= maxSize) ? (-1*maxSize) : offsetY
							this.noWeexAni = `transition-property: transform; transform: translateY(${y}px); transition-duration: 0ms;`
							if (this.hasOverlay) {
								this.overlayNoWeexAni = `transition-property:opacity; transition-duration: 0ms;opacity:${(-y-this.standoutPx)/moveSize};height:${this.overlayHeight}px;`
							}
						}
					} else if (this.pos === 'left') {
						if (offsetX > 0) {
							offsetX += this.standoutPx
							const x = (offsetX >= maxSize) ? maxSize : offsetX
							this.noWeexAni = `transition-property: transform; transform: translateX(${x}px); transition-duration: 0ms;`
							if (this.hasOverlay) {
								this.overlayNoWeexAni = `transition-property:opacity; transition-duration: 0ms;opacity:${(x-this.standoutPx)/moveSize};height:${this.overlayHeight}px;`
							}
						} else {
						}
					} else if (this.pos === 'right') {
						if (offsetX < 0) {
							offsetX += -1*this.standoutPx
							const x = (-offsetX >= maxSize) ? (-1*maxSize) : offsetX
							this.noWeexAni = `transition-property: transform; transform: translateX(${x}px); transition-duration: 0ms;`
							if (this.hasOverlay) {
								this.overlayNoWeexAni = `transition-property:opacity; transition-duration: 0ms;opacity:${(-x-this.standoutPx)/moveSize};height:${this.overlayHeight}px;`
							}
						} else {
						}
					}
				} else {
					if (this.pos === 'top') {
						if (offsetY <= 0) {
							const y = (-offsetY + this.standoutPx >= maxSize) ? this.standoutPx : (maxSize + offsetY)
							// in H5: we must use 0ms and not 0, or it will hold 300ms. i.e 0 can not change 300ms into 0, must use 0ms
							this.noWeexAni = `transition-property: transform; transform: translateY(${y}px); transition-duration: 0ms;`
							if (this.hasOverlay) {
								this.overlayNoWeexAni = `transition-property:opacity; transition-duration: 0ms;opacity:${(y - this.standoutPx)/moveSize};height:${this.overlayHeight}px;`
							}
						} else {
						}
					} else if (this.pos === 'bottom') {
						if (offsetY <= 0) {
						} else {
							const y = (offsetY + this.standoutPx >= maxSize) ? (-this.standoutPx) : (-maxSize + offsetY)
							this.noWeexAni = `transition-property: transform; transform: translateY(${y}px); transition-duration: 0ms;`
							if (this.hasOverlay) {
								this.overlayNoWeexAni = `transition-property:opacity; transition-duration: 0ms;opacity:${(-y-this.standoutPx)/moveSize};height:${this.overlayHeight}px;`
							}
						}
					} else if (this.pos === 'left') {
						if (offsetX <= 0) {
							const x = (-offsetX + this.standoutPx >= maxSize) ? this.standoutPx: (offsetX + maxSize)
							this.noWeexAni = `transition-property: transform; transform: translateX(${x}px); transition-duration: 0ms;`
							if (this.hasOverlay) {
								this.overlayNoWeexAni = `transition-property:opacity; transition-duration: 0ms;opacity:${(x-this.standoutPx)/moveSize};height:${this.overlayHeight}px;`
							}
						} else {
							
						}
					} else if (this.pos === 'right') {
						if (offsetX > 0) {
							const x = (offsetX + this.standoutPx >= maxSize) ? (-this.standoutPx) : (offsetX - maxSize)
							this.noWeexAni = `transition-property: transform; transform: translateX(${x}px); transition-duration: 0ms;`
							if (this.hasOverlay) {
								this.overlayNoWeexAni = `transition-property:opacity; transition-duration: 0ms;opacity:${(-x-this.standoutPx)/moveSize};height:${this.overlayHeight}px;`
							}
						} else {
							
						}
					}
				}
			},
			onTouchEnd(e) {
				if (!this.startPoint) return;
				const nowPoint = getTouchPoint(e)
				// 需要减去standout的高度
				const maxSize = this.getTransformSize(this.pos, false)
				const moveSize = maxSize - this.standoutPx
				const openLimit = this.openRate * moveSize
				const closeLimit = this.closeRate * moveSize
				const offsetY = nowPoint.y - this.startPoint.y
				const offsetYAbs = Math.abs(offsetY)
				const offsetX = nowPoint.x - this.startPoint.x
				const offsetXAbs = Math.abs(offsetX)
				if (!this.auto) {
					let lOff = this.lastOffset + ((this.pos === 'bottom' || this.pos === 'top') ? offsetY : offsetX)
					if (this.pos === 'bottom' || this.pos === 'right') {
						if (lOff >= 0) {
							lOff = 0
						} else if (-1*lOff >= moveSize) {
							lOff = -1*moveSize
						}
					} else if (this.pos === 'left' || this.pos === 'top') {
						if (lOff <= 0) {
							lOff = 0
						} else if (lOff >= moveSize) {
							lOff = moveSize
						}
					}
					this.lastOffset = lOff
					this.$emit("end", {offset: this.lastOffset, max: moveSize})
					return
				}
				if (!this.isShow) {
					// this.noWeexAni = ""
					if (this.pos === 'bottom' || this.pos === 'top') {
						if (offsetYAbs >= openLimit) {
							if (this.pos === 'top' && offsetY > 0) {
								this.toHackShow(true)
								return
							}
							if (this.pos === 'bottom' && offsetY < 0) {
								this.toHackShow(true)
								return
							}
						}
						this.toHackShow(false)
					} else if (this.pos === 'left' || this.pos === 'right') {
						if (offsetXAbs >= openLimit) {
							if (this.pos === 'left' && offsetX > 0) {
								this.toHackShow(true)
								return
							}
							if (this.pos === 'right' && offsetX < 0) {
								this.toHackShow(true)
								return
							}
						}
						this.toHackShow(false)
					}
				} else {
					// this.noWeexAni = ""
					if (this.pos === 'bottom' || this.pos === 'top') {
						if (offsetYAbs >= closeLimit) {
							if (this.pos === 'top' && offsetY < 0) {
								this.toHackShow(false)
								return
							}
							if (this.pos === 'bottom' && offsetY > 0) {
								this.toHackShow(false)
								return
							}
						}
						this.toHackShow(true)
					} else if (this.pos === 'left' || this.pos === 'right') {
						if (offsetXAbs >= closeLimit) {
							if (this.pos === 'left' && offsetX < 0) {
								this.toHackShow(false)
								return
							}
							if (this.pos === 'right' && offsetX > 0) {
								this.toHackShow(false)
								return
							}
						}
						this.toHackShow(true)
					}
				}
			},
			// #endif
			onTouchCancel(e) {
				// 直接关闭
				this.toHackShow(false)
			},
			// #ifdef APP-NVUE
			openWithDrag() {
				const that = this
				const maxSize = this.getTransformSize(this.pos, false)
				const moveSize = maxSize - this.standoutPx
				const openLimit = this.openRate * moveSize
				let standEl = this.$refs['n-popo'].ref
				if (!this.allowAll) {
					standEl = this.$refs['n-popo-stand'].ref
				}
				const popoEl = this.$refs['n-popo'].ref
				const overEl = (this.$refs['n-popo-overlay']||{}).ref
				let exp = ''
				let overExp = ''
				let offsetExp = (this.pos === 'top' || this.pos === 'bottom') ? 'y' : 'x'
				if (!this.auto) {
					offsetExp = (this.pos === 'top' || this.pos === 'bottom') ? `(${this.lastOffset} + y)` : `(${this.lastOffset} + x)`
				}
				if (this.pos === 'bottom' || this.pos === 'right') {
					const newOffsetExp = `(${offsetExp} - ${this.standoutPx})`
					// exp = `(${offsetExp} >= 0) ? 0 : ((${offsetExp} > (-${maxSize})) ? (${offsetExp}+0) : (-${maxSize}))`
					exp = `(${offsetExp} >= 0) ? (-${this.standoutPx}) : ((${newOffsetExp} > (-${maxSize})) ? ${newOffsetExp} : (-${maxSize}))`
					overExp = `(${offsetExp} >= 0) ? 0 : ((${newOffsetExp} > (-${maxSize})) ? ((-1*${offsetExp}) * ${1/moveSize}) : (1+0))`
				} else if (this.pos === 'top' || this.pos === 'left') {
					const newOffsetExp = `(${offsetExp} + ${this.standoutPx})`
					// exp = `(${offsetExp} > 0) ? ((${offsetExp} > ${maxSize}) ? ${maxSize} : (${offsetExp}+0)) : 0`
					exp = `(${offsetExp} > 0) ? ((${newOffsetExp} > ${maxSize}) ? ${maxSize} : ${newOffsetExp}) : (${this.standoutPx}+0)`
					overExp = `(${offsetExp} > 0) ? ((${newOffsetExp} > ${maxSize}) ? (1+0) : (${offsetExp} * ${1/moveSize})) : 0`
				}
				const props = [{
					element: popoEl,
					property: this.pos === 'top' || this.pos === 'bottom' ? 'transform.translateY' : 'transform.translateX',
					expression: exp
				}]
				if (this.hasOverlay) {
					props.push({
						element: overEl,
						property: 'opacity',
						expression: overExp
					})
					animation.transition(this.$refs['n-popo-overlay'], {styles: {height: `${this.overlayHeight}px`},duration: 0,delay: 0})
				}
				const result = bindingX.bind({
					eventType: 'pan',
					anchor: standEl,
					props: props
				}, (res) => {
					if (res.state === 'end' && !that.isShow) {
						if (result) {
						    bindingX.unbind({
						        token: result.token,
						        eventType: 'pan'
						    })
						}
						if (!that.auto) {
							let lOff = that.lastOffset + ((that.pos === 'top' || that.pos === 'bottom') ? res.deltaY : res.deltaX)
							if (that.pos === 'bottom' || that.pos === 'right') {
								if (lOff >= 0) {
									lOff = 0
								} else if (-1*lOff >= moveSize) {
									lOff = -1*moveSize
								}
							} else if (that.pos === 'top' || that.pos === 'left') {
								if (lOff <= 0) {
									lOff = 0
								} else if (lOff >= moveSize) {
									lOff = moveSize
								}
							}
							that.lastOffset = lOff
							that.$emit("end", {offset: that.lastOffset, max: moveSize})
							return
						}
						const offset = that.pos === 'top' || that.pos === 'bottom' ? res.deltaY : res.deltaX
						const offsetAbs = Math.abs(offset)
						if (offsetAbs >= openLimit) {
							if ((that.pos === 'top' || that.pos === 'left') && offset > 0) {
								that.toHackShow(true)
								return
							}
							if ((that.pos === 'bottom' || that.pos === 'right') && offset < 0) {
								that.toHackShow(true)
								return
							}
						}
						that.toHackShow(false)
					}
				})
			},
			closeWithDrag() {
				const that = this
				const maxSize = this.getTransformSize(this.pos, false)
				const moveSize = maxSize - this.standoutPx
				const closeLimit = this.closeRate * moveSize
				let standEl = this.$refs['n-popo'].ref
				if (!this.allowAll) {
					standEl = this.$refs['n-popo-stand'].ref
				}
				const popoEl = this.$refs['n-popo'].ref
				const overEl = (this.$refs['n-popo-overlay']||{}).ref
				let exp = ''
				let overExp = ''
				if (this.pos === 'bottom') {
					exp = `(y >= 0) ? ((y < ${maxSize-this.standoutPx}) ? (y - ${maxSize}) : (-${this.standoutPx})) : (-${maxSize})`
					overExp = `(y >= 0) ? ((y < ${maxSize-this.standoutPx}) ? ((${moveSize} - y) * ${1/moveSize}) : 0) : (1+0)`
				} else if (this.pos === 'top') {
					exp = `(y >= 0) ? ${maxSize} : ((y > (-${maxSize}+${this.standoutPx})) ? (${maxSize} + y) : (${this.standoutPx}+0))`
					overExp = `(y >= 0) ? (1+0) : ((y > (-${maxSize}+${this.standoutPx})) ? ((${moveSize} + y) * ${1/moveSize}) : 0)`
				} else if (this.pos === 'left') {
					exp = `(x >= 0) ? ${maxSize} : ((x > (-${maxSize}+${this.standoutPx})) ? (${maxSize} + x) : (${this.standoutPx}+0))`
					overExp = `(x >= 0) ? (1+0) : ((x > (-${maxSize}+${this.standoutPx})) ? ((${moveSize} + x) * ${1/moveSize}) : 0)`
				} else if (this.pos === 'right') {
					exp = `(x >= 0) ? ((x < ${maxSize-this.standoutPx}) ? (x - ${maxSize}) : (-${this.standoutPx})) : (-${maxSize})`
					overExp = `(x >= 0) ? ((x < ${maxSize-this.standoutPx}) ? ((${moveSize}-x) * ${1/moveSize}) : 0) : (1+0)`
				}
				const props = [{
					element: popoEl,
					property: this.pos === 'top' || this.pos === 'bottom' ? 'transform.translateY' : 'transform.translateX',
					expression: exp
				}]
				if (this.hasOverlay) {
					props.push({
						element: overEl,
						property: 'opacity',
						expression: overExp
					})
				}
				if (this.platform != 'ios') {
					setTimeout(()=>{
						const result = bindingX.bind({
							eventType: 'pan',
							anchor: standEl,
							props: props
						}, (res) => {
							if (res.state === 'end' && that.isShow) {
								if (result) {
								    bindingX.unbind({
								        token: result.token,
								        eventType: 'pan'
								    })
								}
								if (!that.auto) {
									return
								}
								const offset = that.pos === 'top' || that.pos === 'bottom' ? res.deltaY : res.deltaX
								const offsetAbs = Math.abs(offset)
								if (offsetAbs >= closeLimit) {
									if ((this.pos === 'top' || this.pos === 'left') && offset < 0) {
										this.toHackShow(false)
										return
									}
									if ((this.pos === 'bottom' || this.pos === 'right') && offset > 0) {
										this.toHackShow(false)
										return
									}
								}
								this.toHackShow(true)
							}
						})
					}, this.delay)
				} else {
					const result = bindingX.bind({
						eventType: 'pan',
						anchor: standEl,
						props: props
					}, (res) => {
						if (res.state === 'end' && that.isShow) {
							if (result) {
							    bindingX.unbind({
							        token: result.token,
							        eventType: 'pan'
							    })
							}
							if (!that.auto) {
								return
							}
							const offset = that.pos === 'top' || that.pos === 'bottom' ? res.deltaY : res.deltaX
							const offsetAbs = Math.abs(offset)
							if (offsetAbs >= closeLimit) {
								if ((this.pos === 'top' || this.pos === 'left') && offset < 0) {
									this.toHackShow(false)
									return
								}
								if ((this.pos === 'bottom' || this.pos === 'right') && offset > 0) {
									this.toHackShow(false)
									return
								}
							}
							this.toHackShow(true)
						}
					})
				}
			},
			// #endif
			toHackShow(bool) {
				this.appearPopup(bool)
			},
			overlayClose(e) {
				e.stopPropagation && e.stopPropagation()
				this.isShow && (this.$emit('overlayClicked', {}));
			},
			appearPopup(bool, duration = this.duration) {
				// #ifdef APP-NVUE
				this.weexAppearPopup(bool, duration)
				// #endif
				// #ifndef APP-NVUE
				this.noWeexAppearPopup(bool, duration)
				// #endif
			},
			// #ifdef APP-NVUE
			weexAppearPopup(bool, duration = this.duration) {
				this.isShow = bool;
				const popupEl = this.$refs['n-popo'];
				if (!popupEl) {
					return;
				}
				const that = this
				const styles = {transform: this.getTransform(this.pos, !bool)}
				animation.transition(popupEl, {
					styles: styles,
					duration,
					delay: 0,
					...this.animation
				}, () => {
					bool ? that.$emit("open") : that.$emit("close")
				})
				// overlay
				if (!this.hasOverlay) return;
				const popupOverEl = this.$refs['n-popo-overlay']
				if (!popupOverEl) return;
				bool && (animation.transition(popupOverEl, {styles: {height: `${this.overlayHeight}px`},duration: 0,delay: 0}))
				animation.transition(popupOverEl, {
					styles: {opacity: bool ? 1 : 0},
					duration: this.overlay.duration,
					delay: 0,
					timingFunction: bool ? this.overlay.timingFunction[0] : this.overlay.timingFunction[1]
				}, () => {
					!bool && (animation.transition(popupOverEl, {styles: {height: '0px'},duration: 0,delay: 0}))
				})
			},
			// #endif
			// #ifndef APP-NVUE
			noWeexAppearPopup(bool, duration = this.duration) {
				this.isShow = bool
				let _style = "transition-duration:" + duration + 'ms;'
				_style += "transition-timing-function:" + this.animation.timingFunction + ';'
				_style += 'transition-property:transform;'
				_style += "transform:" + this.getTransform(this.pos, !bool) + ';'
				this.noWeexAni = _style
				const that = this
				setTimeout(()=>{
					// !bool && (that.noWeexAni='')
					bool ? that.$emit("open") : that.$emit("close")
				}, duration)
				// overlay
				let _oStyle = "transition-duration:" + this.overlay.duration + 'ms;'
				bool && (_oStyle += `height:${this.overlayHeight}px;`)
				_oStyle += "transition-timing-function:" + (bool ? this.overlay.timingFunction[0] : this.overlay.timingFunction[1]) + ';'
				_oStyle += 'transition-property:opacity;'
				_oStyle += 'opacity:' + (bool ? 1 : 0) + ';'
				this.overlayNoWeexAni = _oStyle
				setTimeout(() => {
					!bool && (that.overlayNoWeexAni = '')
				}, this.overlay.duration)
			},
			// #endif
			getTransformSize(pos, toClose) {
				let _size = this.standoutPx
				let _transform = ''
				switch (pos) {
					case 'top':
						if (!toClose) {
							_size = this.heightPx + this.topPx + (this.topOffsetPx >= 0 ? this.topOffsetPx : 0)
						}
						break;
					case 'bottom':
						if (!toClose) {
							_size = this.heightPx + this.bottomPx + (this.bottomOffsetPx >= 0 ? this.bottomOffsetPx : 0)
						}
						break;
					case 'left':
						if (!toClose) {
							_size = this.widthPx + this.leftPx + (this.leftOffsetPx >= 0 ? this.leftOffsetPx : 0)
						}
						break;
					case 'right':
						if (!toClose) {
							_size = this.widthPx + this.rightPx + (this.rightOffsetPx >= 0 ? this.rightOffsetPx : 0)
						}
						break;
				}
				return _size
			},
			getTransform(pos, toClose) {
				let _size = this.getTransformSize(pos, toClose)
				let _transform = ''
				switch (pos) {
					case 'top':
						_transform = `translateY(${_size}px)`
						break
					case 'bottom':
						_transform = `translateY(-${_size}px)`
						break
					case 'left':
						_transform = `translateX(${_size}px)`
						break
					case 'right':
						_transform = `translateX(-${_size}px)`
						break
				}
				return _transform
			},
			toPrevent(e) {
				e.stopPropagation && e.stopPropagation()
			}
		},
		mounted() {
			if (this.initDelay >= 0) {
				setTimeout(()=>{
					this.initShow()
				}, this.initDelay)
				return
			}
			this.initShow()
		},
		created() {
			// #ifdef APP-NVUE
			this.platform = getPlatform()
			if (this.platform === 'ios') {
				setTimeout(()=>{
					iosHack = bindingX.bind({
						eventType: 'pan',
						anchor: this.allowAll ? this.$refs['n-popo'].ref : this.$refs['n-popo-stand'].ref,
						props: [
							{
								element: this.$refs['n-popo'].ref,
								property: 'transform.translateY',
								expression: 'y+0'
							}
						]
					})
				}, 10)
			}
			// #endif
		},
		beforeDestroy() {
			// #ifdef APP-NVUE
			if (iosHack) {
				bindingX.unbind({
				    token: iosHack.token,
				    eventType: 'pan'
				})
			}
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.n-popo {
		position: fixed;
		width: 750rpx;
		
		&-over {
			position: fixed;
			opacity: 0;
			height: 0px;
		}
	}
</style>
