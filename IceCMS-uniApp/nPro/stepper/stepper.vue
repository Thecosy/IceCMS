<template>
	<view class="n-flex-row n-align-center n-wrap-nowrap" :style="boxStyle">
		<view :class="['n-stepper-action', 'n-flex-row', 'n-align-center', 'n-justify-center', 'n-bg-'+minusBgType, 'n-radius-'+radius, (disabled||isLess)&&'n-disabled']" :hover-class="'n-hover-'+hover" :style="mrMinusBoxStyle" bubble="true" @click="minusClicked">
			<n-icon :name="minus" :type="minusType" :iconStyle="mrMinusStyle" @iconClicked="minusClicked"></n-icon>
		</view>
		<input :class="['n-stepper-input', 'n-size-'+valueSize, 'n-color-'+valueType]" type="number" :style="mrValueStyle" :disabled="disabled||readOnly" :value="value" @input="onInput" @blur="onBlur" />
		<view :class="['n-stepper-action', 'n-flex-row', 'n-align-center', 'n-justify-center', 'n-bg-'+plusBgType, 'n-radius-'+radius, (disabled||isOver)&&'n-disabled']" :hover-class="'n-hover-'+hover" :style="mrPlusBoxStyle" bubble="true" @click="plusClicked">
			<n-icon :name="plus" :type="plusType" :iconStyle="mrPlusStyle" @iconClicked="plusClicked"></n-icon>
		</view>
	</view>
</template>

<script>
	/**
	 * stepper
	 * @description 步进器
	 * @property {Number} min 最小值
	 * @property {Number} max 最大值
	 * @property {Number} step 步进长度/步长
	 * @property {Number} value 值
	 * @property {Boolean} disabled 是否禁用
	 * @property {Boolean} readOnly 输入框是否只读
	 * @property {String} minus 左侧减少的图标
	 * @property {String} plus 右侧增加的图标
	 * @property {String} radius 加减按钮的圆角主题
	 * @property {String} minusBgType 左侧减按钮的背景主题
	 * @property {String} plusBgType 右侧加按钮的背景主题
	 * @property {String} hover 加减按钮的hover主题
	 * @property {String} valueType 中间值的颜色主题
	 * @property {String} valueSize 中间值的尺寸主题
	 * @property {String} valueStyle 值的样式
	 * @property {String} valueDisabledStyle 禁用时值的样式
	 * @property {String} minusType 减少图标的颜色主题
	 * @property {String} minusStyle 减少图标的样式
	 * @property {String} minusDisabledStyle
	 * @property {String} 禁用时减少图标的样式
	 * @property {String} minusBoxStyle 减少图标的外层样式
	 * @property {String} minusBoxDisabledStyle 禁用时减少图标的外层样式
	 * @property {String} plusType 增加图标的颜色主题
	 * @property {String} plusStyle 增加图标的样式
	 * @property {String} plusDisabledStyle 禁用时增加图标的样式
	 * @property {String} plusBoxStyle 增加图标的外层样式
	 * @property {String} plusBoxDisabledStyle 禁用时增加图标的外层样式
	 * @property {String} boxStyle 外层样式
	 */
	export default {
		props: {
			/**
			 * 最小值
			 */
			min: {
				type: Number,
				default: 1
			},
			/**
			 * 最大值
			 */
			max: {
				type: Number,
				default: 100
			},
			/**
			 * 步进长度/步长
			 */
			step: {
				type: Number,
				default: 1
			},
			/**
			 * 值
			 */
			value: {
				type: Number,
				default: 1
			},
			/**
			 * 是否禁用
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * 输入框是否只读
			 */
			readOnly: {
				type: Boolean,
				default: true
			},
			/**
			 * 左侧减少的图标
			 */
			minus: {
				type: String,
				default: 'minus-bold'
			},
			/**
			 * 右侧增加的图标
			 */
			plus: {
				type: String,
				default: 'add-bold'
			},
			/**
			 * 加减按钮的圆角主题
			 */
			radius: {
				type: String,
				default: 's'
			},
			/**
			 * 左侧减按钮的背景主题
			 */
			minusBgType: {
				type: String,
				default: ''
			},
			/**
			 * 右侧加按钮的背景主题
			 */
			plusBgType: {
				type: String,
				default: ''
			},
			/**
			 * 加减按钮的hover主题
			 */
			hover: {
				type: String,
				default: 'opacity'
			},
			/**
			 * 中间值的颜色主题
			 */
			valueType: {
				type: String,
				default: 'text'
			},
			/**
			 * 中间值的尺寸主题
			 */
			valueSize: {
				type: String,
				default: 'l'
			},
			/**
			 * 值的样式
			 */
			valueStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时值的样式
			 */
			valueDisabledStyle: {
				type: String,
				default: ''
			},
			/**
			 * 减少图标的颜色主题
			 */
			minusType: {
				type: String,
				default: 'text'
			},
			/**
			 * 减少图标的样式
			 */
			minusStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时减少图标的样式
			 */
			minusDisabledStyle: {
				type: String,
				default: ''
			},
			/**
			 * 减少图标的外层样式
			 */
			minusBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时减少图标的外层样式
			 */
			minusBoxDisabledStyle: {
				type: String,
				default: ''
			},
			/**
			 * 增加图标的颜色主题
			 */
			plusType: {
				type: String,
				default: 'text'
			},
			/**
			 * 增加图标的样式
			 */
			plusStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时增加图标的样式
			 */
			plusDisabledStyle: {
				type: String,
				default: ''
			},
			/**
			 * 增加图标的外层样式
			 */
			plusBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时增加图标的外层样式
			 */
			plusBoxDisabledStyle: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrValueStyle() {
				let _style = this.valueStyle
				if (this.disabled || this.readOnly) {
					_style += this.valueDisabledStyle
				}
				return _style
			},
			mrMinusBoxStyle() {
				let _style = this.minusBoxStyle
				if (this.disabled || this.isLess) {
					_style += this.minusBoxDisabledStyle
				}
				return _style
			},
			mrMinusStyle() {
				let _style = this.minusStyle
				if (this.disabled || this.isLess) {
					_style += this.minusDisabledStyle
				}
				return _style
			},
			mrPlusBoxStyle() {
				let _style = this.plusBoxStyle
				if (this.disabled || this.isOver) {
					_style += this.plusBoxDisabledStyle
				}
				return _style
			},
			mrPlusStyle() {
				let _style = this.plusStyle
				if (this.disabled || this.isOver) {
					_style += this.plusDisabledStyle
				}
				return _style
			}
		},
		data: () => ({
			isLess: false,
			isOver: false
		}),
		created() {
			if (this.disabled) {
				this.isLess = true
				this.isOver = true
			}
		},
		watch: {
			value(newV) {
				if (newV <= this.min) {
					this.isLess = true
				} else if (newV >= this.max) {
					this.isOver = true
				} else {
					this.isLess = false
					this.isOver = false
				}
			}
		},
		methods: {
			minusClicked() {
				if (this.disabled) {
					return
				}
				const isMinOver = this.value <= this.min
				if (isMinOver) {
					this.$emit("less", this.value)
				} else {
					let nowNum = this.value - this.step
					if (nowNum <= this.min) {
						nowNum = this.min
					}
					this.$emit("input", nowNum)
					this.$emit("change", nowNum)
				}
			},
			plusClicked() {
				if (this.disabled) {
					return;
				}
				const isMaxOver = this.value >= this.max
				if (isMaxOver) {
					this.$emit("over", this.value)
				} else {
					let nowNum = this.value + this.step
					if (nowNum >= this.max) {
						nowNum = this.max
					}
					this.$emit("input", nowNum)
					this.$emit("change", nowNum)
				}
			},
			onInput(e) {
				this.correctInputValue(e.detail.value);
			},
			onBlur(e) {
				this.correctInputValue(e.detail.value);
			},
			correctInputValue(v) {
				const lastValue = this.value
				if (/^[1-9]\d{0,}$/.test(v)) {
					this.$emit("input", lastValue)
					this.$emit("change", lastValue)
					return
				}
				const vInt = parseInt(v, 10)
				if (vInt >= this.min && vInt <= this.max) {
					this.$emit("input", vInt)
					this.$emit("change", vInt)
				} else if (vInt < this.min) {
					this.$emit("input", this.min)
					this.$emit("change", this.min)
				} else {
					this.$emit("input", this.max)
					this.$emit("change", this.max)
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.n-stepper {
		&-action {
			width: 60rpx;
			height: 60rpx;
		}
		&-input {
			border-width: 0;
			text-align: center;
			width: 90rpx;
			height: 60rpx;
		}
	}
</style>
