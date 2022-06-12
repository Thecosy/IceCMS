<template>
	<view id="n-fold" ref="n-fold" :class="['n-bg-'+bgType, 'n-border-'+border, 'n-radius-'+radius]" :style="boxStyle">
		<view :style="headStyle" @tap="toToggleBody"><slot name="head"></slot></view>
		<view id="n-fold-body" ref="n-fold-body" :style="'overflow: hidden;'+bodyStyle+noWeexAni"><slot name="body"></slot></view>
	</view>
</template>

<script>
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
const animation = uni.requireNativePlugin('animation');
// #endif

import { getElSize } from '../utils/element.js';
import { getPx } from '../utils/system.js';

/**
 * fold
 * @description 展开/收起
 * @property {String} value 唯一值
 * @property {String} current 当前值
 * @property {Boolean} isOpen 初始状态,是否打开
 * @property {Number} duration 动画周期
 * @property {String} timingFunction 动画效果
 * @property {String} bgType 背景主题
 * @property {String} border 边框主题
 * @property {String} radius 圆角主题
 * @property {String} totalHeight 整体高度。不设置会自动获取
 * @property {String} bodyHeight 收展区的高度。不设置会自动获取
 * @property {String} boxStyle 外层样式
 * @property {String} headStyle head样式
 * @property {String} bodyStyle body样式
 */
export default {
	props: {
		/**
		 * 唯一值，用来判断是否收起自己
		 */
		value: {
			type: String,
			default: ''
		},
		/**
		 * 当前值
		 */
		current: {
			type: String,
			default: ''
		},
		/**
		 * 初始状态,是否打开
		 */
		isOpen: {
			type: Boolean,
			default: false
		},
		/**
		 * 动画周期
		 */
		duration: {
			type: Number,
			default: 300
		},
		/**
		 * 动画效果
		 */
		timingFunction: {
			type: String,
			default: 'ease-in'
		},
		bgType: {
			type: String,
			default: ''
		},
		/**
		 * 边框主题
		 */
		border: {
			type: String,
			default: 'all'
		},
		/**
		 * 圆角主题
		 */
		radius: {
			type: String,
			default: ''
		},
		/**
		 * 整体高度。不设置会自动获取
		 */
		totalHeight: {
			type: String,
			default: null
		},
		/**
		 * 收展区的高度。不设置会自动获取
		 */
		bodyHeight: {
			type: String,
			default: null
		},
		/**
		 * 外层样式
		 */
		boxStyle: {
			type: String,
			default: ''
		},
		/**
		 * head样式
		 */
		headStyle: {
			type: String,
			default: ''
		},
		/**
		 * body样式
		 */
		bodyStyle: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			opened: this.isOpen,
			// 是否正在打开/收起
			isAnimating: false,
			cth: null, // 获取到的totalHeight
			cbh: null, // 获取到的bodyHeight
			noWeexAni: ''
		};
	},
	created() {
		this.opened = this.isOpen;
	},
	mounted() {
		setTimeout(() => {
			this.initOpenState();
		}, 50);
	},
	computed: {
		th() {
			if (this.totalHeight) {
				return getPx(this.totalHeight);
			}
			return this.cth;
		},
		bh() {
			if (this.bodyHeight) {
				return getPx(this.bodyHeight);
			}
			return this.cbh;
		}
	},
	methods: {
		async resetHeight() {
			try {
				const abb = await getElSize('n-fold', this)
				this.cth = abb.height
				const cbb = await getElSize('n-fold-body')
				this.cbh = cbb.height
			} catch (e) {
				//TODO handle the exception
			}
		},
		async initOpenState() {
			if (!this.cth && !this.totalHeight) {
				try {
					const npxorp = await getElSize('n-fold', this)
					this.cth = npxorp.height
				} catch (e) {
					//TODO handle the exception
					return;
				}
			}
			if (!this.cbh && !this.bodyHeight) {
				try {
					const npxorp = await getElSize('n-fold-body', this)
					this.cbh = npxorp.height;
				} catch (e) {
					//TODO handle the exception
					return;
				}
			}
			// #ifdef APP-NVUE
			const foldEl = this.$refs['n-fold'];
			const bodyEl = this.$refs['n-fold-body'];
			const that = this;
			animation.transition(
				bodyEl,
				{
					styles: {
						height: this.opened ? this.bh + 'px' : '0px'
					},
					duration: 300,
					delay: 0,
					timingFunction: this.timingFunction
				},
				() => {
					that.noWeexAni = `height:${that.opened ? that.bh : 0}px;`;
				}
			);
			animation.transition(foldEl, {
				styles: {
					height: this.opened ? this.th + 'px' : this.th - this.bh + 'px'
				},
				duration: 300,
				delay: 0,
				timingFunction: this.timingFunction
			});
			// #endif
			// #ifndef APP-NVUE
			let _style = `transition-property:height;transition-duration:300ms;transition-timing-function:${this.timingFunction};`;
			if (this.opened) {
				_style += `height:${this.bh}px;`;
			} else {
				_style += `height:0;`;
			}
			this.noWeexAni = _style;
			// #endif
		},
		toToggleBody() {
			if (this.isAnimating) {
				return;
			}
			this.isAnimating = true;
			this.opened = !this.opened;
			// #ifdef APP-NVUE
			this.weexToggleBody(this.opened);
			// #endif
			// #ifndef APP-NVUE
			this.noWeexToggleBody(this.opened);
			// #endif
		},
		// #ifdef APP-NVUE
		async weexToggleBody(opened) {
			const foldEl = this.$refs['n-fold'];
			const bodyEl = this.$refs['n-fold-body'];
			const that = this;
			this.noWeexAni = opened ? `height:${this.bh}px;` : '';
			animation.transition(
				bodyEl,
				{
					styles: {
						height: opened ? this.bh + 'px' : '0px'
					},
					duration: this.duration,
					delay: 0,
					timingFunction: this.timingFunction
				},
				() => {
					that.isAnimating = false;
					that.$emit('toggle', opened);
					that.noWeexAni = opened ? `height:${that.bh}px;` : `height:0;`;
				}
			);
			animation.transition(foldEl, {
				styles: {
					height: opened ? this.th + 'px' : this.th - this.bh + 'px'
				},
				duration: this.duration,
				delay: 0,
				timingFunction: this.timingFunction
			});
		},
		// #endif
		// #ifndef APP-NVUE
		async noWeexToggleBody(opened) {
			let _style = `transition-property:height;transition-duration:${this.duration}ms;transition-timing-function:${this.timingFunction};`;
			if (opened) {
				_style += `height:${this.bh}px;`;
			} else {
				_style += `height:0;`;
			}
			this.noWeexAni = _style;
			const that = this;
			setTimeout(() => {
				that.isAnimating = false;
				that.$emit('toggle', opened);
			}, this.duration);
		}
		// #endif
	}
};
</script>

<style lang="scss"></style>
