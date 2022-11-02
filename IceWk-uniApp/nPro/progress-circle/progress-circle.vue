<template>
	<view :class="['n-cp', 'n-flex-column', 'n-align-center', 'n-justify-center', 'n-bg-'+bgType]" :style="mrBoxStyle">
		<slot></slot>
		<view class="n-cp-right" :style="{width: (evenWidth/2)+'px', height: evenWidth+'px'}">
			<view ref="n-right" class="n-cp-right-rotate" :style="mrRightStyle+noWeexRightAni+noWeexRightOpacity"></view>
		</view>
		<view class="n-cp-left" :style="{width: (evenWidth/2)+'px', height: evenWidth+'px'}">
			<view ref="n-left" class="n-cp-left-rotate" :style="mrLeftStyle+noWeexLeftAni+noWeexLeftOpacity"></view>
		</view>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	/**
	 * progress-circle
	 * @description 环形进度条
	 * @property {Number} progress 进度。0-1
	 * @property {String} width 自定义宽度
	 * @property {String} borderWidth 自定义边框宽度
	 * @property {String} borderColor 自定义边框颜色
	 * @property {String} bgType 背景主题
	 * @property {String} boxStyle 外层样式
	 * @property {Boolean} fromZero 是否每次从0开始
	 * @property {Boolean} aniToZero 是否动画回到0
	 * @property {Number} duration 0-100的整体动画周期
	 * @property {String} timingFunction 动画函数
	 * @property {Boolean} twoWay 是否同时动画
	 */
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	import {getPx} from '../utils/system.js'
	
	export default {
		props: {
			/**
			 * 进度。0-1
			 */
			progress: {
				type: Number,
				default: 0
			},
			/**
			 * 自定义宽度
			 */
			width: {
				type: String,
				default: '80px'
			},
			/**
			 * 自定义边框宽度
			 */
			borderWidth: {
				type: String,
				default: '6px'
			},
			/**
			 * 自定义边框颜色
			 */
			borderColor: {
				type: String,
				default: '#8F9CFF'
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: 'inverse'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 是否每次从0开始
			 */
			fromZero: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否动画回到0
			 */
			aniToZero: {
				type: Boolean,
				default: true
			},
			/**
			 * 0-100的整体动画周期
			 */
			duration: {
				type: Number,
				default: 2000
			},
			/**
			 * 动画函数
			 */
			timingFunction: {
				type: String,
				default: 'ease-out'
			},
			/**
			 * 是否同时动画
			 */
			twoWay: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				evenWidth: 0,
				lastPr: 0,
				noWeexLeftAni: '',
				noWeexRightAni: '',
				noWeexLeftOpacity: '',
				noWeexRightOpacity: ''
			}
		},
		computed: {
			mrBoxStyle() {
				const style = `width:${this.evenWidth}px;height:${this.evenWidth}px;border-radius:${this.evenWidth}px;`
				return style + this.boxStyle
			},
			mrRightStyle() {
				return `width:${this.evenWidth}px;height:${this.evenWidth}px;border-radius:${this.evenWidth}px;border-width:${this.borderWidth};border-left-color:${this.borderColor};border-bottom-color:${this.borderColor};`
			},
			mrLeftStyle() {
				return `width:${this.evenWidth}px;height:${this.evenWidth}px;border-radius:${this.evenWidth}px;border-width:${this.borderWidth};border-left-color:${this.borderColor};border-bottom-color:${this.borderColor};`
			}
		},
		methods: {
			toProgress(pr, duration) {
				const lastPr = this.lastPr
				this.lastPr = pr
				if (this.twoWay) {
					if (this.fromZero) {
						this.twoWayZeroProgress(pr, lastPr, duration)
					} else {
						this.twoWayProgress(pr, lastPr, duration)
					}
				} else {
					if (this.fromZero) {
						this.oneWayZeroProgress(pr, lastPr, duration)
					} else {
						this.oneWayProgress(pr, lastPr, duration)
					}
				}
			},
			getDeg(pr) {
				let rightDeg = 45
				let leftDeg = 225
				if (pr > 0.5) {
					rightDeg = 225
					leftDeg += (pr - 0.5) * 360
				} else {
					rightDeg += pr * 360
				}
				return {
					right: rightDeg,
					left: leftDeg
				}
			},
			// forward duration
			getDuration(pr, duration) {
				let right = 0
				let left = 0
				if (this.twoWay) {
					if (duration) {
						return {
							left: duration,
							right: duration
						}
					}
					if (pr >= 0.5) {
						return {
							left: this.duration * (pr - 0.5),
							right: this.duration * 0.5
						}
					}
					return {
						left: 0,
						right: this.duration * pr
					}
				} else {
					if (duration) {
						if (pr > 0.5) {
							return {
								left: parseInt(duration * (pr - 0.5) / pr),
								right: parseInt(duration * 0.5 / pr)
							}
						}
						return {
							left: 0,
							right: duration
						}
					}
					if (pr > 0.5) {
						return {
							left: this.duration * (pr - 0.5),
							right: this.duration * 0.5
						}
					} else {
						return {
							left: 0,
							right: this.duration * pr
						}
					}
				}
			},
			// back to zero duration. the duration is this.duration
			getBackDuration(pr, duration) {
				if (pr > 0.5) {
					return {
						left: duration * (pr - 0.5),
						right: duration * 0.5
					}
				} else {
					return {
						left: 0,
						right: duration * pr
					}
				}
			},
			// #ifndef APP-NVUE
			twoWayZeroProgress(pr, lastPr, duration) {
				let delay = 0
				if (this.aniToZero) {
					const lastDur = this.getBackDuration(lastPr, this.duration)
					delay = lastDur.left > lastDur.right ? lastDur.left : lastDur.right
				}
				const that = this
				this.noWeexRightAni = `transition-duration: ${delay}ms; transform: rotate(45deg);`
				this.noWeexLeftAni = `transition-duration: ${delay}ms; transform: rotate(225deg);`
				setTimeout(()=>{
					if (pr > 0.5) {
						that.noWeexLeftOpacity = 'opacity: 1;'
						that.noWeexRightOpacity = 'opacity:1;'
					} else {
						that.noWeexLeftOpacity = 'opacity:0;'
						if (pr <= 0) {
							that.noWeexRightOpacity = 'opacity:0;'
						} else {
							that.noWeexRightOpacity = 'opacity:1;'
						}
					}
					const newDur = that.getDuration(pr, duration)
					const dur = newDur.left > newDur.right ? newDur.left : newDur.right
					const newDeg = that.getDeg(pr)
					that.noWeexRightAni = `transition-duration: ${dur}ms; transform: rotate(${newDeg.right}deg);`
					that.noWeexLeftAni = `transition-duration: ${dur}ms; transform: rotate(${newDeg.left}deg);`
				}, delay)
			},
			twoWayProgress(pr, lastPr, duration) {
				// continue
				let dur = duration
				const newDeg = this.getDeg(pr)
				if (!duration) {
					const newDur = this.getDuration(pr, duration)
					const lastDur = this.getBackDuration(lastPr, this.duration)
					dur = Math.max(Math.abs(newDur.left - lastDur.left), Math.abs(newDur.right - lastDur.right))
				}
				if (lastPr > 0.5) {
					
				} else {
					if (pr > 0.5) {
						this.noWeexLeftOpacity = 'opacity:1;'
					}
					if (pr > 0) {
						this.noWeexRightOpacity = 'opacity:1;'
					}
				}
				this.noWeexRightAni = `transition-duration: ${dur}ms; transform: rotate(${newDeg.right}deg);`
				this.noWeexLeftAni = `transition-duration: ${dur}ms; transform: rotate(${newDeg.left}deg);`
				const that = this
				setTimeout(()=>{
					if (pr <= 0.5) {
						this.noWeexLeftOpacity = 'opacity:0;'
					}
					if (pr <= 0) {
						this.noWeexRightOpacity = 'opacity:0;'
					}
				}, dur)
			},
			oneWayZeroProgress(pr, lastPr, duration) {
				const that = this
				// back to zero
				let leftDelay = 0
				let rightDelay = 0
				if (this.aniToZero) {
					const lastDur = this.getBackDuration(lastPr, this.duration)
					leftDelay = lastDur.left
					rightDelay = lastDur.right
				}
				const newDur = this.getDuration(pr, duration)
				const newDeg = this.getDeg(pr)
				
				this.noWeexLeftAni = `transition-duration: ${leftDelay}ms; transform: rotate(225deg);`
				
				setTimeout(()=>{
					that.noWeexLeftOpacity = 'opacity:0;'
					that.noWeexRightAni = `transition-duration: ${rightDelay}ms; transform: rotate(45deg);`
				}, leftDelay)
				
				setTimeout(()=>{
					if (pr <= 0) {
						that.noWeexRightOpacity = 'opacity:0;'
					} else {
						that.noWeexRightOpacity = 'opacity:1;'
					}
					that.noWeexRightAni = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
				}, leftDelay+rightDelay)
				
				setTimeout(()=>{
					if (pr > 0.5) {
						that.noWeexLeftOpacity = 'opacity:1;'
					} else {
						that.noWeexLeftOpacity = 'opacity:0;'
					}
					that.noWeexLeftAni = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
				}, leftDelay+rightDelay+newDur.right)
			},
			oneWayProgress(pr, lastPr, duration) {
				const that = this
				const newDur = this.getDuration(pr, duration)
				const newDeg = this.getDeg(pr)
				if (pr > 0) {
					this.noWeexRightOpacity = 'opacity:1;'
				}
				if (duration) {
					if (pr >= lastPr) {
						this.noWeexRightAni = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
						setTimeout(()=>{
							if (pr <= 0) {
								that.noWeexRightOpacity = 'opacity:0;'
							}
							if (pr > 0.5 && lastPr <= 0.5) {
								that.noWeexLeftOpacity = 'opacity:1;'
							}
							that.noWeexLeftAni = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
						}, newDur.right)
					} else {
						this.noWeexLeftAni = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
						setTimeout(()=>{
							if (pr < 0.5) {
								that.noWeexLeftOpacity = 'opacity:0;'
							}
							that.noWeexRightAni = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
						}, newDur.left)
						setTimeout(()=>{
							if (pr <= 0) {
								that.noWeexRightOpacity = 'opacity:0;'
							}
						}, newDur.left + newDur.right)
					}
				} else {
					const lastDur = this.getBackDuration(lastPr, this.duration)
					if (pr >= lastPr) {
						this.noWeexRightAni = `transition-duration: ${newDur.right - lastDur.right}ms; transform: rotate(${newDeg.right}deg);`
						setTimeout(()=>{
							if (pr <= 0) {
								that.noWeexRightOpacity = 'opacity:0;'
							}
							if (pr > 0.5 && lastPr <= 0.5) {
								that.noWeexLeftOpacity = 'opacity:1;'
							}
							that.noWeexLeftAni = `transition-duration: ${newDur.left - lastDur.left}ms; transform: rotate(${newDeg.left}deg);`
						}, newDur.right - lastDur.right)
					} else {
						this.noWeexLeftAni = `transition-duration: ${lastDur.left - newDur.left}ms; transform: rotate(${newDeg.left}deg);`
						setTimeout(()=>{
							if (pr < 0.5) {
								that.noWeexLeftOpacity = 'opacity:0;'
							}
							that.noWeexRightAni = `transition-duration: ${lastDur.right - newDur.right}ms; transform: rotate(${newDeg.right}deg);`
						}, lastDur.left - newDur.left)
						setTimeout(()=>{
							if (pr <= 0) {
								that.noWeexRightOpacity = 'opacity:0;'
							}
						}, lastDur.left - newDur.left + lastDur.right - newDur.right)
					}
				}
			},
			// #endif
			// #ifdef APP-NVUE
			initOpacityState() {
				const rightEl = this.$refs['n-right']
				const leftEl = this.$refs['n-left']
				animation.transition(rightEl, {
					styles: {
						opacity: 0
					}
				})
				animation.transition(leftEl, {
					styles: {
						opacity: 0
					}
				})
			},
			twoWayZeroProgress(pr, lastPr, duration) {
				const rightEl = this.$refs['n-right']
				const leftEl = this.$refs['n-left']
				
				let delay = 0
				if (this.aniToZero) {
					const lastDur = this.getBackDuration(lastPr, this.duration)
					delay = lastDur.left > lastDur.right ? lastDur.left : lastDur.right
				}
				// back to zero
				animation.transition(leftEl, {
					styles: {
						transform: 'rotate(225deg)'
					},
					duration: delay,
					delay: 0
				})
				animation.transition(rightEl, {
					styles: {
						transform: 'rotate(45deg)'
					},
					duration: delay,
					delay: 0
				}, ()=>{
					if (pr > 0.5) {
						animation.transition(leftEl, {
							styles: {
								opacity: 1,
								transform: 'rotate(225deg)'
							}
						})
						animation.transition(rightEl, {
							styles: {
								opacity: 1,
								transform: 'rotate(45deg)'
							}
						})
					} else {
						animation.transition(leftEl, {
							styles: {
								opacity: 0,
								transform: 'rotate(225deg)'
							}
						})
						if (pr <= 0) {
							animation.transition(rightEl, {
								styles: {
									opacity: 0,
									transform: 'rotate(45deg)'
								}
							})
						} else {
							animation.transition(rightEl, {
								styles: {
									opacity: 1,
									transform: 'rotate(45deg)'
								}
							})
						}
					}
					// forward
					const newDur = this.getDuration(pr, duration)
					const dur = newDur.left > newDur.right ? newDur.left : newDur.right
					const newDeg = this.getDeg(pr)
					animation.transition(leftEl, {
						styles: {
							transform: `rotate(${newDeg.left}deg)`
						},
						duration: dur
					})
					animation.transition(rightEl, {
						styles: {
							transform: `rotate(${newDeg.right}deg)`
						},
						duration: dur
					})
				})
			},
			twoWayProgress(pr, lastPr, duration) {
				const rightEl = this.$refs['n-right']
				const leftEl = this.$refs['n-left']
				// continue
				let dur = duration
				const newDeg = this.getDeg(pr)
				if (!duration) {
					const newDur = this.getDuration(pr, duration)
					const lastDur = this.getBackDuration(lastPr, this.duration)
					dur = Math.max(Math.abs(newDur.left - lastDur.left), Math.abs(newDur.right - lastDur.right))
				}
				if (lastPr > 0.5) {
					
				} else {
					if (pr > 0.5) {
						animation.transition(leftEl, {
							styles: {
								opacity: 1,
								transform: 'rotate(225deg)'
							}
						})
					}
					if (lastPr <=0 && pr > 0) {
						animation.transition(rightEl, {
							styles: {
								opacity: 1,
								transform: 'rotate(45deg)'
							}
						})
					}
				}
				animation.transition(leftEl, {
					styles: {
						transform: `rotate(${newDeg.left}deg)`
					},
					duration: dur
				})
				animation.transition(rightEl, {
					styles: {
						transform: `rotate(${newDeg.right}deg)`
					},
					duration: dur
				}, ()=>{
					if (pr <= 0.5) {
						animation.transition(leftEl, {
							styles: {
								opacity: 0,
								transform: 'rotate(225deg)'
							}
						})
					}
					if (pr <= 0) {
						animation.transition(rightEl, {
							styles: {
								opacity: 0,
								transform: 'rotate(45deg)'
							}
						})
					}
				})
			},
			oneWayZeroProgress(pr, lastPr, duration) {
				const rightEl = this.$refs['n-right']
				const leftEl = this.$refs['n-left']
				const that = this
				// back to zero
				let leftDelay = 0
				let rightDelay = 0
				if (this.aniToZero) {
					const lastDur = this.getBackDuration(lastPr, this.duration)
					leftDelay = lastDur.left
					rightDelay = lastDur.right
				}
				animation.transition(leftEl, {
					styles: {
						transform: 'rotate(225deg)'
					},
					duration: leftDelay
				}, ()=>{
					animation.transition(leftEl, {
						styles: {
							opacity: 0,
							transform: 'rotate(225deg)'
						}
					})
					animation.transition(rightEl, {
						styles: {
							transform: 'rotate(45deg)'
						},
						duration: rightDelay
					}, ()=>{
						if (pr <= 0) {
							animation.transition(rightEl, {
								styles: {
									opacity: 0,
									transform: 'rotate(45deg)'
								}
							})
						} else {
							animation.transition(rightEl, {
								styles: {
									opacity: 1,
									transform: 'rotate(45deg)'
								}
							})
						}
						// forward
						const newDur = that.getDuration(pr, duration)
						const newDeg = that.getDeg(pr)
						animation.transition(rightEl, {
							styles: {
								transform: `rotate(${newDeg.right}deg)`
							},
							duration: newDur.right
						}, ()=>{
							if (pr > 0.5) {
								animation.transition(leftEl, {
									styles: {
										opacity: 1,
										transform: 'rotate(225deg)'
									}
								})
							} else {
								animation.transition(leftEl, {
									styles: {
										opacity: 0,
										transform: 'rotate(225deg)'
									}
								})
							}
							animation.transition(leftEl, {
								styles: {
									transform: `rotate(${newDeg.left}deg)`
								},
								duration: newDur.left
							})
						})
					})
				})
			},
			oneWayProgress(pr, lastPr, duration) {
				const rightEl = this.$refs['n-right']
				const leftEl = this.$refs['n-left']
				const that = this
				const newDur = this.getDuration(pr, duration)
				const newDeg = this.getDeg(pr)
				if (lastPr <=0 && pr > 0) {
					animation.transition(rightEl, {
						styles: {
							opacity: 1,
							transform: 'rotate(45deg)'
						}
					})
				}
				if (duration) {
					if (pr >= lastPr) {
						animation.transition(rightEl, {
							styles: {
								transform: `rotate(${newDeg.right}deg)`
							},
							duration: newDur.right
						}, ()=>{
							if (pr <= 0) {
								animation.transition(rightEl, {
									styles: {
										opacity: 0,
										transform: 'rotate(45deg)'
									}
								})
							}
							if (pr > 0.5 && lastPr <= 0.5) {
								animation.transition(leftEl, {
									styles: {
										opacity: 1,
										transform: 'rotate(225deg)'
									}
								})
							}
							animation.transition(leftEl, {
								styles: {
									transform: `rotate(${newDeg.left}deg)`
								},
								duration: newDur.left
							})
						})
					} else {
						animation.transition(leftEl, {
							styles: {
								transform: `rotate(${newDeg.left}deg)`
							},
							duration: newDur.left
						}, ()=>{
							if (pr < 0.5) {
								animation.transition(leftEl, {
									styles: {
										opacity: 0,
										transform: 'rotate(225deg)'
									}
								})
							}
							animation.transition(rightEl, {
								styles: {
									transform: `rotate(${newDeg.right}deg)`
								},
								duration: newDur.right
							}, ()=>{
								if (pr <= 0) {
									animation.transition(rightEl, {
										styles: {
											opacity: 0,
											transform: 'rotate(45deg)'
										}
									})
								}
							})
						})
					}
				} else {
					const lastDur = this.getBackDuration(lastPr, this.duration)
					if (pr >= lastPr) {
						animation.transition(rightEl, {
							styles: {
								transform: `rotate(${newDeg.right}deg)`
							},
							duration: newDur.right - lastDur.right
						}, ()=>{
							if (pr <= 0) {
								animation.transition(rightEl, {
									styles: {
										opacity: 0,
										transform: 'rotate(45deg)'
									}
								})
							}
							if (pr > 0.5 && lastPr <= 0.5) {
								animation.transition(leftEl, {
									styles: {
										opacity: 1,
										transform: 'rotate(225deg)'
									}
								})
							}
							animation.transition(leftEl, {
								styles: {
									transform: `rotate(${newDeg.left}deg)`
								},
								duration: newDur.left - lastDur.left
							})
						})
					} else {
						animation.transition(leftEl, {
							styles: {
								transform: `rotate(${newDeg.left}deg)`
							},
							duration: lastDur.left - newDur.left
						}, ()=>{
							if (pr < 0.5) {
								animation.transition(leftEl, {
									styles: {
										opacity: 0,
										transform: 'rotate(225deg)'
									}
								})
							}
							animation.transition(rightEl, {
								styles: {
									transform: `rotate(${newDeg.right}deg)`
								},
								duration: lastDur.right - newDur.right
							}, ()=>{
								if (pr <= 0) {
									animation.transition(rightEl, {
										styles: {
											opacity: 0,
											transform: 'rotate(45deg)'
										}
									})
								}
							})
						})
					}
				}
			}
			// #endif
		},
		created() {
			const w = getPx(this.width)
			this.evenWidth = parseInt(w/2)*2
			setTimeout(()=>{
				// #ifdef APP-NVUE
				this.initOpacityState()
				// #endif
				this.toProgress(this.progress)
			}, 0)
		},
		watch: {
			progress(newV, oldV) {
				if (this.fromZero) {
					this.toProgress(newV)
				} else {
					if (newV !== oldV) {
						this.toProgress(newV)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-cp {
		position: relative;
		overflow: hidden;
		
		&-right {
			position: absolute;
			overflow: hidden;
			top: 0;
			right: 0;
			
			&-rotate {
				position: absolute;
				/* #ifndef APP-NVUE */
				opacity: 0;
				/* #endif */
				top: 0;
				right: 0;
				border-top-color: transparent;
				border-right-color: transparent;
				transition-property: transform;
				transform-origin: center;
				transform: rotate(45deg);
			}
		}
		&-left {
			position: absolute;
			overflow: hidden;
			top: 0;
			left: 0;
			
			&-rotate {
				position: absolute;
				/* #ifndef APP-NVUE */
				opacity: 0;
				/* #endif */
				top: 0;
				left: 0;
				border-top-color: transparent;
				border-right-color: transparent;
				transition-property: transform;
				transform-origin: center;
				transform: rotate(225deg);
			}
		}
	}
</style>
