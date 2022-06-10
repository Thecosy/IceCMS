<template>
	<view class="swiper-item" ref="swiper_item" :style="itemStyle">
		<view class="item-cntent" bubble="true" @click.stop="onClick"><slot></slot></view>
	</view>
</template>

<script>
import { styleObjToStr } from '../utils/utils.js';
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation');
// #endif
/**
 * esc-swiper-item
 * @description esc-swiper-item (不支持使用class)
 * @property {Number} index 索引(必填)
 * @property {Boolean} clickAny 可以点击任意项
 * @event {Function} click 点击事件
 */
export default {
	name: 'esc-swiper-item',
	inject: ['config'],
	props: {
		index: {
			type: Number,
			default: 0
		},
		clickAny: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isAnimated: false,
			timingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			duration: 0,
			current: 0,
			position: 0,
			mScale: 0,
			canClick: true
		};
	},
	created() {},
	computed: {
		size() {
			return this.config.size;
		},
		width() {
			return this.config.width;
		},
		height() {
			return this.config.height;
		},
		itemWidth() {
			return this.config.itemWidth;
		},
		itemHeight() {
			return this.config.itemHeight;
		},
		space() {
			return this.config.space;
		},
		itemStyle() {
			if (this.index == this.size - 1) {
				return this.rightSpaceStyle();
			} else if (this.index == this.size - 2) {
				return this.centerSpaceStyle();
			} else {
				return this.leftSpaceStyle();
			}
		},
		scale() {
			if (!this.config.is3D) {
				return 1;
			}
			if (this.myCurrent == this.current) {
				return this.mScale || this.config.scale;
			} else {
				return this.mScale || 1;
			}
		},
		// 当前swiper-item所属current索引
		myCurrent() {
			if (!this.config.isCircular) {
				return this.index;
			}
			const p = this.index;
			const plus = this.config.plus;
			const actSize = this.size - plus * 2;
			let current = 0;
			if (p < plus) {
				current = p + (actSize - plus);
			} else if (p >= this.size - plus) {
				current = p - (actSize + plus);
			} else {
				current = p - plus;
			}
			return current;
		}
	},
	methods: {
		itemSize() {
			let style = {
				width: this.itemWidth + 'rpx',
				height: (this.itemHeight || this.height) + 'rpx'
			};

			if (this.config.is3D) {
				// #ifndef APP-NVUE
				if (this.isAnimated) {
					style.transition = 'transform ' + this.duration + 'ms ' + this.timingFunction;
				} else {
					style.transition = '';
				}
				style.transform = 'scale(' + this.scale + ')';
				// #endif
				// #ifdef APP-NVUE
				const isIOS = uni.getSystemInfoSync().platform == 'ios';
				if (isIOS) {
					style.transform = 'scale(' + this.scale + ')';
				} else {
					if (!this.isAnimated) style.transform = 'scale(' + this.scale + ')';
				}
				// #endif
			}

			return style;
		},
		leftSpaceStyle() {
			return styleObjToStr({
				...this.itemSize(),
				marginLeft: this.space + 'rpx'
			});
		},
		centerSpaceStyle() {
			return styleObjToStr({
				...this.itemSize(),
				marginLeft: this.space + 'rpx',
				marginRight: this.space + 'rpx'
			});
		},
		rightSpaceStyle() {
			return styleObjToStr({
				...this.itemSize(),
				marginRight: this.space + 'rpx'
			});
		},
		onClick(e) {
			if (!this.canClick) {
				return;
			}
			// #ifdef APP-NVUE
			e.stopPropagation();
			// #endif
			// 点击任意项
			if (this.clickAny) {
				this.$emit('click', e);
				return;
			}
			// 只能点击当前项
			if (this.myCurrent == this.current) {
				this.$emit('click', e);
			}
		},
		restoreScale(duration) {
			if (!this.config.is3D) {
				return;
			}
			// #ifndef APP-NVUE
			this.duration = duration;
			this.isAnimated = true;
			this.mScale = 0;
			setTimeout(() => {
				this.duration = 0;
				this.isAnimated = false;
			}, duration);
			// #endif
			// #ifdef APP-NVUE
			this.isAnimated = true;
			this.mScale = 0;
			animation.transition(
				this.$refs['swiper_item'].ref,
				{
					styles: {
						transform: 'scale(' + this.scale + ')'
					},
					duration, //ms
					timingFunction: this.timingFunction,
					needLayout: false,
					delay: 0 //ms
				},
				() => {
					this.isAnimated = false;
				}
			);
			// #endif
		},
		restoreToScale(scale, duration) {
			if (!this.config.is3D) {
				return;
			}
			// #ifndef APP-NVUE
			this.duration = duration;
			this.isAnimated = true;
			this.mScale = scale;
			setTimeout(() => {
				this.duration = 0;
				this.isAnimated = false;
				this.mScale = 0;
			}, duration);
			// #endif
			// #ifdef APP-NVUE
			this.isAnimated = true;
			animation.transition(
				this.$refs['swiper_item'].ref,
				{
					styles: {
						transform: 'scale(' + scale + ')'
					},
					duration, //ms
					timingFunction: this.timingFunction,
					needLayout: false,
					delay: 0 //ms
				},
				() => {
					this.isAnimated = false;
					this.mScale = 0;
				}
			);
			// #endif
		}
	}
};
</script>

<style scoped>
.swiper-item {
	position: relative;
}

.item-cntent {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
}
</style>
