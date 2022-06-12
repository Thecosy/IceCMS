<template>
	<view class="n-position-relative n-flex-row n-justify-center" :style="boxStyle">
		<view v-for="(item, index) in ranges" :key="index" class="n-position-relative" :style="mrItemStyle+(codeArr.length+1 == item?activeItemStyle:'')+(index!=ranges.length-1?('margin-right:'+space+';'):'')">
			<view v-if="mode === 'middle' && codeIndex <= item" :style="mrMiddleStyle"></view>
			<view v-if="mode === 'bottom'" :style="mrBottomStyle+(codeArr.length+1 == item?activeLineStyle:'')"></view>
			<view v-if="mode==='box' && codeArr.length+1 == item && cursor" class="n-one-cursor" :style="mrCursorStyle"></view>
			<!-- #ifdef APP-NVUE -->
			<view v-if="password" :class="['n-position-absolute', codeArr.length >= item?'n-opacity-1':'n-opacity-0']" :style="mrDotStyle"></view>
			<!-- #endif -->
			<!-- #ifndef APP-NVUE -->
			<view v-if="password && codeArr.length >= item" class="n-position-absolute" :style="mrDotStyle"></view>
			<!-- #endif -->
			<text v-if="!password" class="n-text-align-center" :style="'line-height:'+width+';'+valueStyle">{{ codeArr[index] ? codeArr[index] : ''}}</text>
		</view>
		<!-- #ifdef APP-NVUE -->
		<input :disabled="disabled" type="number" :adjust-position="adjust" :value="inputValue" :focus="focus" :maxlength="maxlength" class="n-one-hide-input" :style="{height: width}" @input="getVal" @blur="toBlur" @focus="toFocus" @confirm="toConfirm" @keyboardheightchange="toKbChange" />
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<input v-if="inputVisible" :disabled="disabled" type="number" :adjust-position="adjust" :value="inputValue" :focus="focus" :maxlength="maxlength" class="n-one-hide-input" :style="{height: width}" @input="getVal" @blur="toBlur" @focus="toFocus" @confirm="toConfirm" @keyboardheightchange="toKbChange" />
		<!-- #endif -->
	</view>
</template>

<script>
	/**
	 * input-one
	 * @description 验证码/支付密码框
	 * @property {String} value 值
	 * @property {Boolean} inputVisible 是否隐藏input
	 * @property {Number} maxlength 最大长度。4/5/6
	 * @property {Boolean} password 是否密码
	 * @property {Boolean} cursor 是否带有光标
	 * @property {Boolean} focus 是否focus
	 * @property {Boolean} disabled 是否禁用
	 * @property {String} mode middle-中间线, bottom-下划线, box-方框
	 * @property {Boolean} adjust adjust-position控制
	 * @property {String} width 自定义height/width
	 * @property {String} space 间隙
	 * @property {String} dotStyle password时圆点的样式 default: 'width:16rpx;height:16rpx;border-radius:16rpx;background-color:#000000;'
	 * @property {String} lineStyle middle或bottom时线条的样式 default: 'width:80rpx;height:8rpx;border-radius:12rpx;background-color:#000000;'
	 * @property {String} activeLineStyle 当前输入框线条的样式
	 * @property {String} cursorStyle 光标的样式 default: 'width:1px;height:42rpx;background-color:#8F9CFF;'
	 * @property {String} valueStyle 值的样式 default: 'font-size:70rpx;font-weight:700;color:#000000;'
	 * @property {String} boxStyle 外层样式
	 * @property {String} itemStyle 输入框样式
	 * @property {String} activeItemStyle 当前输入框的样式
	*/
	export default {
		props: {
			/**
			 * 值
			 */
			value: {
				type: String,
				default: ''
			},
			/**
			 * input是否可见
			 */
			inputVisible: {
				typ: Boolean,
				default: true
			},
			/**
			 * 最大长度。4/5/6
			 */
			maxlength: {
				type: Number,
				default: 4
			},
			/**
			 * 是否密码
			 */
			password: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否带有光标
			 */
			cursor: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否focus
			 */
			focus: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否禁用
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * middle-中间线, bottom-下划线, box-方框
			 */
			mode: {
				type: String,
				default: "middle"
			},
			/**
			 * adjust-position控制
			 */
			adjust: {
				type: Boolean,
				default: true
			},
			/**
			 * 自定义height/width
			 */
			width: {
				type: String,
				default: '100rpx'
			},
			/**
			 * 间隙
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * password时圆点的样式
			 */
			dotStyle: {
				type: String,
				default: 'width:16rpx;height:16rpx;border-radius:16rpx;background-color:#000000;'
			},
			/**
			 * middle或bottom时线条的样式
			 */
			lineStyle: {
				type: String,
				default: 'width:80rpx;height:8rpx;border-radius:12rpx;background-color:#000000;'
			},
			/**
			 * 当前输入框线条的样式
			 */
			activeLineStyle: {
				type: String,
				default: ''
			},
			/**
			 * 光标的样式
			 */
			cursorStyle: {
				type: String,
				default: 'width:1px;height:42rpx;background-color:#8F9CFF;'
			},
			/**
			 * 值的样式
			 */
			valueStyle: {
				type: String,
				default: 'font-size:70rpx;font-weight:700;color:#000000;'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 输入框样式
			 */
			itemStyle: {
				type: String,
				default: ''
			},
			/**
			 * 当前输入框的样式
			 */
			activeItemStyle: {
				type: String,
				default: ''
			}
		},
		watch: {
			maxlength: {
				immediate: true,
				handler: function(newV) {
					let _ranges = []
					for (let i = 1; i <= newV; i++) {
						_ranges.push(i)
					}
					this.ranges = _ranges
				}
			},
			value: {
				immediate: true,
				handler: function(newV) {
					if (newV !== this.inputValue) {
						this.inputValue = newV
						this.toMakeAndCheck(newV)
					}
				}
			}
		},
		data() {
			return {
				inputValue: '',
				codeIndex: 1,
				codeArr: [],
				ranges: []
			}
		},
		computed: {
			widthUnit() {
				if (this.width.indexOf('rpx') >= 0 || this.width.indexOf('upx') >= 0) {
					return 'rpx'
				}
				return 'px'
			},
			mrItemStyle() {
				let _style = `width:${this.width};height:${this.width};`
				if (this.mode === 'box') {
					_style += `border-radius:0;border-width:1px;border-style:solid;border-color:#000000;`
				}
				return _style + this.itemStyle
			},
			mrCursorStyle() {
				const iw = parseInt(this.width)
				const _style = `left:${iw*0.5}${this.widthUnit};top:${iw*0.5}${this.widthUnit};`
				return _style + this.cursorStyle
			},
			mrMiddleStyle() {
				const iw = parseInt(this.width)
				let _style = `position:absolute;left:${iw*0.5}${this.widthUnit};top:${iw*0.5}${this.widthUnit};`
				_style += `transform:translate(-50%,-50%);`
				return _style + this.lineStyle
			},
			mrBottomStyle() {
				const iw = parseInt(this.width)
				let _style = `position:absolute;left:${iw*0.5}${this.widthUnit};bottom:0;`
				_style += `transform:translateX(-50%);`
				return _style + this.lineStyle
			},
			mrDotStyle() {
				const iw = parseInt(this.width)
				let _style = `left:${iw*0.5}${this.widthUnit};top:${iw*0.5}${this.widthUnit};`
				_style += `transform:translate(-50%,-50%);`
				return _style + this.dotStyle
			}
		},
		methods: {
			getVal(e) {
				const val = e.detail.value
				this.inputValue = val
				this.$emit('input', val)
				this.toMakeAndCheck(val)
			},
			toMakeAndCheck(val) {
				const arr = val.split('')
				this.codeIndex = arr.length + 1
				this.codeArr = arr
				if (this.codeIndex > this.maxlength) {
					this.$emit('finish', this.codeArr.join(''))
				}
			},
			// refs 时不再提供 v-model 支持
			// 支持使用refs来设置value
			// 没有提供数据保护与检测，自己在外面对数据进行检测保护
			set(val) {
				this.inputValue = val
				this.toMakeAndCheck(val)
			},
			// 支持使用refs来清空
			clear() {
				this.inputValue = ''
				this.codeArr = []
				this.codeIndex = 1
			},
			toBlur(e) {
				this.$emit("blur", e)
			},
			toFocus(e) {
				this.$emit("focus", e)
			},
			toConfirm(e) {
				this.$emit("confirm", e.detail.value)
			},
			toKbChange(e) {
				this.$emit("keyboardHeightChange", e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-one {
		&-cursor {
			position: absolute;
			transform: translate(-50%, -50%);
			/* #ifndef APP-NVUE */
			animation: shaking 1s infinite ease;
			/* #endif */
		}
		/* #ifndef APP-NVUE */
		@keyframes shaking {
			0% {
				opacity: 0.2;
			}
			50% {
				opacity: 0.5;
			}
			100% {
				opacity: 0.2;
			}
		}
		/* #endif */
		&-hide-input {
			position: absolute;
			top: 0;
			left: -750rpx;
			width: 1500rpx;
			text-align: left;
			opacity: 1;
			background-color: transparent;
		}
	}
</style>
