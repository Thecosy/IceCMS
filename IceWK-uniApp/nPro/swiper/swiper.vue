<template>
	<!-- #ifdef APP-VUE || H5 -->
	<view class="box" :style="boxStyle">
		<view
			ref="container"
			class="container"
			:change:prop="swipe.changeData"
			:prop="wxsData"
			@touchstart.stop="swipe.touchstart"
			@touchmove.stop="swipe.touchmove"
			@touchend.stop="swipe.touchend"
			:style="containerStyle"
		>
			<slot></slot>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifdef MP-WEIXIN -->
	<view class="box" :style="boxStyle">
		<view
			ref="container"
			class="container"
			:change:prop="swipe.changeData"
			:prop="wxsData"
			@touchstart="swipe.touchstart"
			@touchmove="swipe.touchmove"
			@touchend="swipe.touchend"
			:style="containerStyle"
		>
			<slot></slot>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<view class="box" :style="boxStyle">
		<view ref="container" class="container" @horizontalpan="touchstart" :style="containerStyle"><slot></slot></view>
	</view>
	<!-- #endif -->
	<!-- 其他平台使用 js ，长列表性能可能会有影响-->
	<!-- #ifndef APP-PLUS || MP-WEIXIN || H5 -->
	<view class="box" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" :style="boxStyle">
		<view ref="container" class="container" :style="containerStyle"><slot></slot></view>
	</view>
	<!-- #endif -->
</template>
<script src="./mixins/index.wxs" module="swipe" lang="wxs"></script>
<script>
import SwiperMixin from './mixins/base.mixin.js';
// #ifdef APP-VUE || MP-WEIXIN || H5
import MpMixin from './mixins/mpwxs.js';
// #endif
// #ifdef APP-NVUE
import BindingxMixin from './mixins/bindingx.js';
// #endif
// #ifndef APP-PLUS || MP-WEIXIN || H5
import OtherMixin from './mixins/mpother.js';
// #endif

const mixins = [
	// #ifdef APP-VUE || MP-WEIXIN || H5
	MpMixin,
	// #endif
	// #ifdef APP-NVUE
	BindingxMixin,
	// #endif
	// #ifndef APP-PLUS || MP-WEIXIN || H5
	OtherMixin,
	// #endif
	SwiperMixin
];

/**
 * esc-swiper
 * @description 自定义swiper (不支持使用class)
 * @property {String} mode = [normal|3d]  模式
 * @property {Number} scale 3D模式选中项的scale
 * @property {Number} width 宽
 * @property {Number} height 高
 * @property {Number} itemWidth 项宽
 * @property {Number} itemHeight 项高
 * @property {Number} space 间距
 * @property {Number} plus 左右追加个数(开启循环必填，至少为2)
 * @property {Number} current 选中项索引
 * @property {Boolean} autoplay 自动轮播
 * @property {Boolean} circular 是否循环,如果开启，至少需要3项
 * @property {Boolean} bounce 阻尼效果 
 * @event {Function} change 索引变化
 */
export default {
	name: 'esc-swiper',
	mixins,
	props: {
		mode: {
			type: String,
			default: 'normal'
		},
		scale: Number,
		width: Number,
		height: Number,
		itemWidth: {
			type: Number,
			default: 0
		},
		itemHeight: {
			type: Number,
			default: 0
		},
		space: {
			type: Number,
			default: 0
		},
		plus: {
			type: Number,
			default: 0
		},
		autoplay: {
			type: Boolean,
			default: false
		},
		current: {
			type: Number,
			default: 0
		},
		interval: {
			type: Number,
			default: 5000
		},
		duration: {
			type: Number,
			default: 500
		},
		circular: {
			type: Boolean,
			default: false
		},
		bounce: {
			type: Boolean,
			default: true
		},
		size: {
			type: Number,
			default: 0
		}
	},
	provide() {
		return {
			config: {
				is3D: this.is3D,
				isCircular: this.circular,
				scale: this.scale,
				size: this._size,
				width: this.width,
				height: this.height,
				itemWidth: this.itemWidth,
				itemHeight: this.itemHeight,
				space: this.space,
				plus: this.plus
			}
		};
	},
	mounted() {
		if (this.autoplay) {
			this.autoplayInterval = setInterval(() => {
				this.next();
			}, this.interval);
		}
	},
	watch: {
		autoplay(newV) {
			if (!newV) {
				clearInterval(this.autoplayInterval);
			} else {
				this.autoplayInterval = setInterval(() => {
					this.next();
				}, this.interval);
			}
		}
	},
	methods: {}
};
</script>

<style scoped>
.box {
	position: relative;
	overflow: hidden;
}

.container {
	position: absolute;
	top: 0;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
}
</style>
