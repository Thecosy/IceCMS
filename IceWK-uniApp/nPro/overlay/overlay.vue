<template>
	<view :class="['n-overlay', 'n-bg-'+bgType]" v-if="helpShow" ref="n-overlay" @touchmove.stop="toPrevent" @click.stop="overlayClose" :style="overlayStyle + noWeexTransition">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * overlay
	 * @description 遮罩层
	 * @property {Boolean} show 是否打开
	 * @property {Boolean} hasAnimation 是否有动画
	 * @property {Number} duration 动画周期
	 * @property {Array} timingFunction 动画函数
	 * @property {String} bgType 背景主题
	 * @property {String} bg 自定义背景色
	 * @property {Boolean} canAutoClose 点击之后是否自动关闭overlay
	 * @property {String} left 与屏幕左侧距离
	 * @property {String} top 与屏幕顶部距离
	 * @property {String} right 与屏幕右侧距离
	 * @property {String} bottom 与屏幕底部距离
	 * @property {String} boxStyle 外层样式。比如设置z-index
	 */
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	import {getPx, getHeight} from '../utils/system.js'
	
	export default {
		props: {
			/**
			 * 是否打开
			 */
			show: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否有动画
			 */
			hasAnimation: {
				type: Boolean,
				default: true
			},
			/**
			 * 动画周期
			 */
			duration: {
				type: Number,
				default: 400
			},
			/**
			 * 动画函数
			 */
			timingFunction: {
				type: Array,
				default: () => (['ease-in', 'ease-out'])
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: 'mask'
			},
			/**
			 * 自定义背景色
			 */
			bg: {
				type: String,
				default: ''
			},
			/**
			 * 点击之后是否自动关闭overlay
			 */
			canAutoClose: {
				type: Boolean,
				default: true
			},
			/**
			 * 与屏幕左侧距离
			 */
			left: {
				type: String,
				default: '0'
			},
			/**
			 * 与屏幕顶部距离
			 */
			top: {
				type: String,
				default: '0'
			},
			/**
			 * 与屏幕右侧距离
			 */
			right: {
				type: String,
				default: '0'
			},
			/**
			 * 与屏幕底部距离
			 */
			bottom: {
				type: String,
				default: '0'
			},
			/**
			 * 外层样式。比如设置z-index
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			overlayStyle() {
				let _style = "opacity:" + (this.hasAnimation ? 0 : 1) + ";"
				if (this.bg && this.bg.length > 0) {
					_style += `background-color:${this.bg};`
				}
				_style += `left:${this.leftPx}px;top:${this.topPx}px;right:${this.rightPx}px;bottom:${this.bottomPx}px;`
				return _style + this.boxStyle
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
		watch: {
			show(newV) {
				this.toHackShow(this.hasAnimation, newV)
			}
		},
		data() {
			return {
				// 为了增加关闭动画，通过内部属性来更改开关状态
				helpShow: false,
				noWeexTransition: '',
				// 内部已经完成了关闭，再次关闭不需要触发动画，不需要延时，只需要更改状态即可
				autoClosed: false
			}
		},
		methods: {
			// ref api to open
			showOverlay() {
				this.helpShow = true
			},
			// ref api to hide
			hideOverlay() {
				this.helpShow = false
			},
			// show prop to control the switch state
			toHackShow(hasAni, toShow) {
				if (!hasAni) {
					// 没有动画效果，直接开关就好
					toShow && (this.autoClosed = true)
					this.helpShow = toShow
					return
				}
				if (toShow) {
					this.autoClosed = false
					this.helpShow = true
					// 为了显示动画，v-if控制的组件，延时执行动画
					const that = this
					setTimeout(() => {
						that.appearOverlay(true);
					}, 40);
				} else {
					// 关闭动画，直接执行，不过需要执行动画完之后再关闭
					this.appearOverlay(false)
				}
			},
			// 点击关闭，执行完关闭动画之后发送关闭事件通知
			overlayClose(e) {
				this.canAutoClose ? this.appearOverlay(false, this.duration, true) : this.$emit('overlayClicked', {});
				e.stopPropagation && e.stopPropagation();
			},
			appearOverlay(bool, duration = this.duration, fromOverlay = false) {
				// #ifdef APP-NVUE
				this.weexAppearOverlay(bool, duration, fromOverlay)
				// #endif
				// #ifndef APP-NVUE
				this.noWeexAppearOverlay(bool, duration, fromOverlay)
				// #endif
			},
			// #ifndef APP-NVUE
			// fromOverlay means if clicked the overlay to close
			noWeexAppearOverlay(bool, duration = this.duration, fromOverlay = false) {
				const {
					hasAnimation,
					timingFunction,
					canAutoClose
				} = this;
				// 如果是手动。这里是有动画的情况，没有动画的已经被拦截执行
				if (!fromOverlay) {
					if (!bool && this.autoClosed) {
						// 已经关闭了overlay，不需要再延迟执行
						this.helpShow = false
					} else {
						let _style = "opacity:" + (bool ? 1 : 0) + ';'
						const ani = timingFunction[bool ? 0 : 1]
						_style += "transition: all " + duration + 'ms' + " " + ani + ';'
						this.noWeexTransition = _style
						// 动画执行完毕之后再确认关闭
						if (!bool) {
							const that = this
							setTimeout(() => {
								that.helpShow = false
							}, duration)
						}
					}
				} else {
					// 点击了overlay. 而且全是允许关闭overlay的情况，不允许的已经在overlayClose中拦截
					this.$emit('overlayClicking', {})
					if (hasAnimation) {
						let _style = "opacity:0;"
						const ani = timingFunction[bool ? 0 : 1]
						_style += "transition: all " + duration + 'ms' + " " + ani + ';'
						this.noWeexTransition = _style
						this.autoClosed = true
						// 动画执行完毕之后再通知
						const that = this
						setTimeout(() => {
							that.$emit('overlayClicked', {})
						}, duration)
					} else {
						// 虽然是要关闭，但是这种情况已经失去了意义，我们不再关闭，用户可以手动关闭
						//this.noWeexTransition = "opacity:0;"
						//this.autoClosed = true
						this.$emit('overlayClicked', {})
					}
				}
			},
			// #endif
			// #ifdef APP-NVUE
			// fromOverlay means if clicked the overlay to close
			weexAppearOverlay(bool, duration = this.duration, fromOverlay = false) {
				const {
					hasAnimation,
					timingFunction,
					canAutoClose
				} = this;
				if (fromOverlay) {
					// overlay clicked, and can auto close, and is to close
					this.$emit('overlayClicking', {})
					if (hasAnimation) {
						const overlayEl = this.$refs['n-overlay'];
						animation.transition(overlayEl, {
							styles: {
								opacity: bool ? 1 : 0
							},
							duration,
							timingFunction: timingFunction[bool ? 0 : 1],
							delay: 0
						}, () => {
							this.$emit('overlayClicked', {})
						});
						this.autoClosed = true
					} else {
						// 这里不关闭，虽然要求是关闭
						this.$emit('overlayClicked', {})
					}
				} else {
					if (!bool && this.autoClosed) {
						// 已经关闭了overlay，不需要再延迟执行
						this.helpShow = false
					} else {
						const overlayEl = this.$refs['n-overlay'];
						animation.transition(overlayEl, {
							styles: {
								opacity: bool ? 1 : 0
							},
							duration,
							timingFunction: timingFunction[bool ? 0 : 1],
							delay: 0
						}, () => {
							if (!bool) {
								this.helpShow = false
							}
						})
					}
				}
			},
			// #endif
			toPrevent(e) {
				e && e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-overlay {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>
