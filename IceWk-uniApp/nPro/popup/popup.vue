<template>
	<view>
		<view>
			<n-overlay :show="hasOverlay&&overlayShow" :bgType="overlay.bgType" :bg="overlay.bg" :duration="overlay.duration" :hasAnimation="overlay.hasAnimation" :timingFunction="overlay.timingFunction" :canAutoClose="false" :left="left" :top="top" :right="right" :bottom="bottom" :boxStyle="overlayStyle" @overlayClicked="overlayClicked"></n-overlay>
		</view>
		<view ref="n-popup" v-if="helpShow" @touchmove.stop="toPrevent" @click.stop="toPrevent" :class="['n-popup', 'n-flex-column', 'n-bg-'+bgType]" :style="boxStyle+mrPopStyle + noWeexAni">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * popup
	 * @description 受v-if控制，重新渲染的popup
	 * @property {Boolean} show 是否显示/打开
	 * @property {String} pos 定位位置
	 * @property {String} bgType 背景主题
	 * @property {Number} duration 动画周期
	 * @property {Boolean} hasOverlay 是否有overlay
	 * @property {Object} overlay 遮罩层设置
	 * @property {Object} animation 动画函数
	 * @property {String} baseWidth 基准宽度
	 * @property {String} baseHeight 基准高度
	 * @property {String} width 自定义宽度
	 * @property {String} height 自定义高度
	 * @property {String} leftOffset 内容与屏幕左侧的偏移量
	 * @property {String} rightOffset 内容与屏幕右侧的偏移量
	 * @property {String} bottomOffset 内容与屏幕底部的偏移量
	 * @property {String} topOffset 内容与屏幕顶部的偏移量
	 * @property {String} left 遮罩与屏幕左侧的偏移量
	 * @property {String} top 遮罩与屏幕顶部的偏移量
	 * @property {String} right 遮罩与屏幕右侧的偏移量
	 * @property {String} bottom 遮罩与屏幕底部的偏移量
	 * @property {Number} delay 确保存在动画 需要加延时
	 * @property {String} boxStyle 内容外层样式
	 * @property {String} overlayStyle overlay的外层样式
	 */
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	
	import {getHeight, getPx} from '../utils/system.js'

	export default {
		props: {
			/**
			 * 是否显示/打开
			 */
			show: {
				type: Boolean,
				default: false
			},
			/**
			 * 定位位置
			 */
			pos: {
				type: String,
				default: 'bottom'
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 动画周期
			 */
			duration: {
				type: Number,
				default: 300
			},
			/**
			 * 是否有overlay
			 */
			hasOverlay: {
				type: Boolean,
				default: true
			},
			/**
			 * 遮罩层设置
			 */
			overlay: {
				type: Object,
				default: () => ({
					hasAnimation: true,
					timingFunction: ['ease-in', 'ease-out'],
					duration: 300,
					bg: '',
					bgType: 'mask'
				})
			},
			/**
			 * 动画函数
			 */
			animation: {
				type: Object,
				default: () => ({
					timingFunction: 'ease-out'
				})
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
			},
			/**
			 * 自定义宽度
			 */
			width: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 自定义高度
			 */
			height: {
				type: String,
				default: '0'
			},
			/**
			 * 内容与屏幕左侧的偏移量
			 */
			leftOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容与屏幕右侧的偏移量
			 */
			rightOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容与屏幕底部的偏移量
			 */
			bottomOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 内容与屏幕顶部的偏移量
			 */
			topOffset: {
				type: String,
				default: '-1'
			},
			/**
			 * 遮罩与屏幕左侧的偏移量
			 */
			left: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩与屏幕顶部的偏移量
			 */
			top: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩与屏幕右侧的偏移量
			 */
			right: {
				type: String,
				default: '0'
			},
			/**
			 * 遮罩与屏幕底部的偏移量
			 */
			bottom: {
				type: String,
				default: '0'
			},
			/**
			 * 确保存在动画
			 * 需要加延时
			 */
			delay: {
				type: Number,
				default: 10
			},
			/**
			 * 内容外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * overlay的外层样式
			 */
			overlayStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				overlayShow: false,
				helpShow: false,
				noWeexAni: '',
				isShow: false
			}
		},
		watch: {
			show(newV) {
				this.toHackShow(newV)
			}
		},
		computed: {
			screenHeight() {
				return getHeight(this.baseHeight)
			},
			screenWidth() {
				return getHeight(this.baseWidth)
			},
			mrPopStyle() {
				let style = {
					width: `${this.widthPx}px`,
					height: `${this.heightPx}px`
				}
				// center/top-center/left-center/bottom-center/right-center/scale-center
				if (this.pos.endsWith('center')) {
					if (this.pos === 'center' || this.pos === 'scale-center') {
						// opacity
						// style['left'] = (this.screenWidth - this.widthPx) * 0.5 + 'px'
						if (this.topOffsetPx < 0 && this.bottomOffsetPx < 0) {
							style['top'] = (this.screenHeight - this.heightPx) * 0.5 + 'px'
						} else {
							if (this.topOffsetPx >= 0) {
								style['top'] = (this.screenHeight - this.heightPx) * 0.5 + this.topOffsetPx + 'px'
							} else if (this.bottomOffsetPx >= 0) {
								style['top'] = (this.screenHeight - this.heightPx) * 0.5 - this.bottomOffsetPx + 'px'
							}
						}
						if (this.leftOffsetPx < 0 && this.rightOffsetPx < 0) {
							style['left'] = (this.screenWidth - this.widthPx) * 0.5 + 'px'
						} else {
							if (this.leftOffsetPx >= 0) {
								style['left'] = (this.screenWidth - this.widthPx) * 0.5 + this.leftOffsetPx + 'px'
							} else if (this.rightOffsetPx >= 0) {
								style['left'] = (this.screenWidth - this.widthPx) * 0.5 - this.rightOffsetPx + 'px'
							}
						}
						this.pos === 'center' && (style['opacity'] = 0)
						this.pos === 'scale-center' && (style['transform'] = 'scale(0,0)')
					} else if (this.pos === 'left-center' || this.pos === 'right-center') {
						if (this.topOffsetPx < 0 && this.bottomOffsetPx < 0) {
							style['top'] = (this.screenHeight - this.heightPx) * 0.5 + 'px'
						} else {
							if (this.topOffsetPx >= 0) {
								style['top'] = (this.screenHeight - this.heightPx) * 0.5 + this.topOffsetPx + 'px'
							} else if (this.bottomOffsetPx >= 0) {
								style['top'] = (this.screenHeight - this.heightPx) * 0.5 - this.bottomOffsetPx + 'px'
							}
						}
						this.pos === 'left-center' && (style['left'] = -this.widthPx + 'px')
						this.pos === 'right-center' && (style['right'] = -this.widthPx + 'px')
					} else if (this.pos === 'top-center' || this.pos === 'bottom-center') {
						style['left'] = (this.screenWidth - this.widthPx) * 0.5 + 'px'
						this.pos === 'top-center' && (style['top'] = -this.heightPx + 'px')
						this.pos === 'bottom-center' && (style['bottom'] = -this.heightPx + 'px')
					}
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
					this.pos === 'top' && (style['top'] = -this.heightPx + 'px')
					this.pos === 'bottom' && (style['bottom'] = -this.heightPx + 'px')
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
					this.pos === 'left' && (style['left'] = -this.widthPx + 'px')
					this.pos === 'right' && (style['right'] = -this.widthPx + 'px')
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
			toHackShow(bool) {
				if (bool) {
					const that = this
					// 先渲染元素
					this.overlayShow = true
					// TODO:
					// 调整一下逻辑，利用 nextTick 之类的
					// 必须确保overlay先于popup-content渲染，将popup-content移入下一个loop
					// app端不能同一个loop同步执行，否则overlay始终在最上层
					// 为了能够获取到元素，且实现动画
					this.$nextTick(function(){
						that.helpShow = true
						that.$nextTick(function(){
							setTimeout(()=>{
								that.appearPopup(bool)
							}, that.delay)
						})
					})
				} else {
					// 关闭动画需要执行动画之后再关闭v-if
					this.overlayShow = false
					this.appearPopup(bool)
				}
			},
			showPopup() {
				// ref method
			},
			hidePopup() {
				// ref method
				this.appearPopup(false);
				this.$refs.overlay.appearOverlay(false);
			},
			// since we can not auto close the overlay in popup, the event is just overlayClicked.
			// and we do not close the popup auto, so we could use it as a modal
			overlayClicked() {
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
			weexAppearPopup(bool, duration = this.duration) {
				this.isShow = bool;
				const popupEl = this.$refs['n-popup'];
				if (!popupEl) {
					return;
				}
				const that = this
				let styles = {}
				if (this.pos === 'center') {
					styles = {opacity: bool ? 1 : 0}
				} else {
					styles = {transform: this.getTransform(this.pos, !bool)}
				}
				animation.transition(popupEl, {
					styles: styles,
					duration,
					delay: 0,
					...this.animation
				}, () => {
					if (!bool) {
						that.helpShow = false;
					}
				});
			},
			noWeexAppearPopup(bool, duration = this.duration) {
				this.isShow = bool
				let _style = "transition-duration:" + duration + 'ms;'
				_style += "transition-timing-function:" + this.animation.timingFunction + ';'
				if (this.pos === 'center') {
					_style += 'transition-property:opacity;'
					_style += 'opacity:' + (bool ? 1 : 0) + ';'
				} else {
					_style += 'transition-property:transform;'
					_style += "transform:" + this.getTransform(this.pos, !bool) + ';'
				}
				this.noWeexAni = _style
				const that = this
				setTimeout(()=>{
					if (!bool) {
						that.helpShow = false;
					}
				}, duration)
			},
			getTransform(pos, toClose) {
				let _size = 0
				let _transform = ''
				switch (pos) {
					case 'top':
						if (!toClose) {
							_size = this.heightPx + this.topPx + (this.topOffsetPx >= 0 ? this.topOffsetPx : 0)
						}
						_transform = `translateY(${_size}px)`;
						break;
					case 'bottom':
						if (!toClose) {
							_size = this.heightPx + this.bottomPx + (this.bottomOffsetPx >= 0 ? this.bottomOffsetPx : 0)
						}
						_transform = `translateY(-${_size}px)`;
						break;
					case 'left':
						if (!toClose) {
							_size = this.widthPx + this.leftPx + (this.leftOffsetPx >= 0 ? this.leftOffsetPx : 0)
						}
						_transform = `translateX(${_size}px)`;
						break;
					case 'right':
						if (!toClose) {
							_size = this.widthPx + this.rightPx + (this.rightOffsetPx >= 0 ? this.rightOffsetPx : 0)
						}
						_transform = `translateX(-${_size}px)`;
						break;
					case 'scale-center':
						_transform = toClose ? 'scale(0,0)' : 'scale(1,1)'
						break
					case 'left-center':
						if (!toClose) {
							_size = (this.screenWidth + this.widthPx) * 0.5
						}
						_transform = `translateX(${_size}px)`;
						break
					case 'right-center':
						if (!toClose) {
							_size = (this.screenWidth + this.widthPx) * 0.5
						}
						_transform = `translateX(-${_size}px)`;
						break
					case 'top-center':
						if (!toClose) {
							if (this.topOffsetPx < 0 && this.bottomOffsetPx < 0) {
								_size = (this.screenHeight + this.heightPx) * 0.5
							} else{
								 if (this.topOffsetPx >= 0) {
								    _size = (this.screenHeight + this.heightPx) * 0.5 + this.topOffsetPx
								} else if (this.bottomOffsetPx >= 0) {
								    _size = (this.screenHeight + this.heightPx) * 0.5 - this.bottomOffsetPx
								}
							}
						}
						_transform = `translateY(${_size}px)`;
						break
					case 'bottom-center':
						if (!toClose) {
							if (this.topOffsetPx < 0 && this.bottomOffsetPx < 0) {
								_size = (this.screenHeight + this.heightPx) * 0.5
							} else{
								 if (this.topOffsetPx >= 0) {
								    _size = (this.screenHeight + this.heightPx) * 0.5 - this.topOffsetPx
								} else if (this.bottomOffsetPx >= 0) {
								    _size = (this.screenHeight + this.heightPx) * 0.5 + this.bottomOffsetPx
								}
							}
						}
						_transform = `translateY(-${_size}px)`;
						break
				}
				return _transform;
			},
			toPrevent(e) {
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-popup {
		position: fixed;
		width: 750rpx;
	}
</style>
