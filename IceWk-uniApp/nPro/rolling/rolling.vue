<template>
	<view :class="['n-overflow-hidden', 'n-flex-row', 'n-align-center', 'n-wrap-nowrap', 'n-height-'+height]" :style="boxStyle">
		<slot name="left"></slot>
		<view class="n-flex-row n-align-center n-flex-one n-wrap-nowrap">
			<!-- #ifndef APP-NVUE -->
			<view :class="['rl-text', rolling&&'rl-rolling']" :style="rolling?mrRollingStyle:''">
				<slot>
					<text :class="['n-lines-nowrap', 'n-color-'+textType, 'n-size-'+textSize]" :style="textStyle">{{text}}</text>
				</slot>
			</view>
			<!-- #endif -->
			<!-- #ifdef APP-NVUE -->
			<view ref="rolling-text">
				<slot>
					<text :class="['n-lines-nowrap', 'n-color-'+textType, 'n-size-'+textSize]" :style="textStyle">{{text}}</text>
				</slot>
			</view>
			<!-- #endif -->
		</view>
		<slot name="right"></slot>
	</view>
</template>

<script>
	let _self = null
	import {animate} from '@/nPro/utils/animate.js'
	
	export default {
		props: {
			rolling: {
				type: Boolean,
				default: false
			},
			text: {
				type: String,
				default: ''
			},
			textType: {
				type: String,
				default: 'error'
			},
			textSize: {
				type: String,
				default: 'base'
			},
			textStyle: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: 'base'
			},
			duration: {
				type: Number,
				default: 8000
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			// #ifndef APP-NVUE
			mrRollingStyle() {
				return `animation-duration: ${this.duration}ms;`
			}
			// #endif
		},
		watch: {
			// #ifdef APP-NVUE
			rolling(newV) {
				newV && this.toStart()
			}
			// #endif
		},
		created() {
			_self = this
		},
		mounted() {
			// #ifdef APP-NVUE
			if (this.rolling) {
				setTimeout(()=>{
					this.toStart()
				}, 0)
			}
			// #endif
		},
		methods: {
			// #ifdef APP-NVUE
			toStart() {
				const el = this.$refs['rolling-text']
				animate(el, {
					styles: {
						transform: 'translateX(100%)'
					},
					duration: 0
				}).then(()=>{
					animate(el, {
						styles: {
							transform: 'translateX(-100%)'
						},
						duration: _self.duration,
						timingFunction: 'linear'
					}).then(()=>{
						_self.toStart()
					}).catch(err=>{
						console.log(err)
					})
				}).catch(err=>{
					console.log(err)
				})
			}
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.rl {
		/* #ifndef APP-NVUE */
		&-text {
			transform: translateX(100%);
		}
		&-rolling {
			animation: rl-rolling 10000ms linear infinite;
		}
		/* #endif */
	}
	/* #ifndef APP-NVUE */
	@keyframes rl-rolling {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
	/* #endif */
</style>
