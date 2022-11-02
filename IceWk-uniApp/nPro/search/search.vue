<template>
	<view>
		<view v-if="position==='left'&&fixIcon" :class="['n-search', 'n-bg-'+bgType, 'n-border-'+border, 'n-radius-'+radius, 'n-height-'+height, 'n-flex-row', 'n-align-center']" :style="boxStyle">
			<n-icon v-if="icon&&icon.length>0" :name="icon" :type="showPlaceholder?placeIconType:iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+iconTextSpace+';'"></n-icon>
			<view :class="['n-search-fix-full', 'n-height-'+height]" :style="mrFixBoxStyle">
				<view :class="['n-search-place', 'n-flex-row', 'n-align-center']" :style="placeBoxStyle">
					<text :class="['n-search-place-text', 'n-color-'+placeType, 'n-size-'+placeSize]" :style="placeStyle">{{showPlaceholder?placeholder:''}}</text>
				</view>
				<view :class="['n-search-input', 'n-flex-row', 'n-align-center']" :style="valueBoxStyle">
					<input :disabled="disabled" :value="inputValue" :focus="focus" :adjust-position="adjust" :confirm-type="confirmType" :class="['n-search-input-input', 'n-color-'+valueType, 'n-size-'+valueSize]" :style="valueStyle" @input="toInput" @confirm="toConfirm" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
				</view>
			</view>
			<slot name="extra"></slot>
		</view>
		<view v-else :class="['n-search', 'n-bg-'+bgType, 'n-border-'+border, 'n-radius-'+radius, 'n-height-'+height, 'n-align-center', 'n-wrap-nowrap']" :style="mrBoxStyle">
			<view :class="['n-search-place', 'n-flex-row', 'n-align-center', 'n-search-place-'+position]" :style="mrPlaceBoxStyle">
				<view v-if="showPlaceholder&&icon&&icon.length>0" :style="{'margin-right': iconTextSpace}">
					<n-icon :name="icon" :type="placeIconType" :size="iconSize" :iconStyle="iconStyle"></n-icon>
				</view>
				<text :class="['n-color-'+placeType, 'n-size-'+placeSize]" :style="placeStyle">{{showPlaceholder?placeholder:''}}</text>
			</view>
			<view :class="['n-search-input', 'n-flex-row', 'n-align-center']" :style="mrValueBoxStyle">
				<input :disabled="disabled" :value="inputValue" :focus="focus" :adjust-position="adjust" :confirm-type="confirmType" :class="['n-search-input-input', 'n-search-input-'+position, 'n-color-'+valueType, 'n-size-'+valueSize]" :style="valueStyle" @input="toInput" @confirm="toConfirm" @focus="toFocus" @blur="toBlur" @keyboardheightchange="toChangeKb" />
			</view>
			<slot name="extra"></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * search
	 * @description 搜索输入框
	 * @property {String,Number} value 值
	 * @property {String} icon 图标
	 * @property {String} placeholder placeholder
	 * @property {String} position 内容位置：left/center
	 * @property {Boolean} focus 是否focus
	 * @property {Boolean} adjust 键盘弹出方式：adjust-position
	 * @property {Boolean} disabled 是否禁用
	 * @property {String} confirmType confirm-type
	 * @property {Boolean} fixIcon 是否固定图标。position为left时可以将icon固定在左侧
	 * @property {String} iconTextSpace 图标与文字的间距
	 * @property {String} bgType 背景色主题
	 * @property {String} valueType 内容颜色主题
	 * @property {String} placeIconType placeholder显示时图标的颜色主题
	 * @property {String} iconType 图标的颜色主题
	 * @property {String} placeType placeholder的颜色主题
	 * @property {String} height 高度主题
	 * @property {String} border 边框主题
	 * @property {String} radius 圆角主题
	 * @property {String} space 左右padding
	 * @property {String} valueSize 内容的尺寸主题
	 * @property {String} iconSize 图标的尺寸主题
	 * @property {String} placeSize placeholder的尺寸主题
	 * @property {String} boxStyle 外层样式
	 * @property {String} iconStyle 图标样式
	 * @property {String} placeStyle placeholder的样式
	 * @property {String} valueBoxStyle 内容的外层样式
	 * @property {String} valueStyle 内容的样式
	 * @property {String} placeBoxStyle placeholder的外层样式
	 */
	import {cssToJs} from '../utils/utils.js'
	
	export default {
		props: {
			/**
			 * 值
			 */
			value: {
				type: [String, Number],
				default: ''
			},
			/**
			 * 图标
			 */
			icon: {
				type: String,
				default: 'search'
			},
			/**
			 * placeholder
			 */
			placeholder: {
				type: String,
				default: "输入内容开始搜索"
			},
			/**
			 * 内容位置：left/center
			 */
			position: {
				type: String,
				default: 'left'
			},
			/**
			 * 是否focus
			 */
			focus: {
				type: Boolean,
				default: false
			},
			/**
			 * 键盘弹出方式：adjust-position
			 */
			adjust: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否禁用
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * confirm-type
			 */
			confirmType: {
				type: String,
				default: 'search'
			},
			/**
			 * 是否固定图标。position为left时可以将icon固定在左侧
			 */
			fixIcon: {
				type: Boolean,
				default: false
			},
			/**
			 * 图标与文字的间距
			 */
			iconTextSpace: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 背景色主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 内容颜色主题
			 */
			valueType: {
				type: String,
				default: 'text'
			},
			/**
			 * placeholder显示时图标的颜色主题
			 */
			placeIconType: {
				type: String,
				default: 'place'
			},
			/**
			 * 图标的颜色主题
			 */
			iconType: {
				type: String,
				default: 'text'
			},
			/**
			 * placeholder的颜色主题
			 */
			placeType: {
				type: String,
				default: 'place'
			},
			/**
			 * 高度主题
			 */
			height: {
				type: String,
				default: 'base'
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
				default: 'll'
			},
			/**
			 * 左右padding
			 */
			space: {
				type: String,
				default: '32rpx'
			},
			/**
			 * 内容的尺寸主题
			 */
			valueSize: {
				type: String,
				default: ''
			},
			/**
			 * 图标的尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'l'
			},
			/**
			 * placeholder的尺寸主题
			 */
			placeSize: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: 'padding-left:32rpx;padding-right:32rpx;'
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * placeholder的样式
			 */
			placeStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容的外层样式
			 */
			valueBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容的样式
			 */
			valueStyle: {
				type: String,
				default: ''
			},
			/**
			 * placeholder的外层样式
			 */
			placeBoxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				inputValue: this.value
			}
		},
		computed: {
			showPlaceholder() {
				return !this.inputValue || this.inputValue.length === 0
			},
			mrBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.boxStyle
			},
			mrValueBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.valueBoxStyle
			},
			mrPlaceBoxStyle() {
				return `padding-left:${this.space};padding-right:${this.space};` + this.placeBoxStyle
			},
			mrFixBoxStyle() {
				if (this.fixIcon) {
					if (this.boxStyle && this.boxStyle.length >= 10) {
						const cssJs = cssToJs(this.boxStyle)
						if (cssJs.height) {
							return `height:${cssJs.height};`
						}
					}
				}
				return ''
			}
		},
		watch: {
			value(newV) {
				this.inputValue = newV
			}
		},
		methods: {
			toInput(e) {
				this.inputValue = e.detail.value
				this.$emit("input", e.detail.value)
			},
			toConfirm(e) {
				this.$emit("confirm", e.detail.value)
			},
			toFocus(e) {
				this.$emit("focus", e)
			},
			toBlur(e) {
				this.$emit("blur", e)
			},
			toChangeKb(e) {
				this.$emit("keyboardHeightChange", e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-search {
		position: relative;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		
		&-fix {
			&-full {
				flex: 1;
				position: relative;
			}
		}
		&-place {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			
			&-text {
				flex: 1;
			}
			&-left {
				justify-content: flex-start;
			}
			&-center {
				justify-content: center;
			}
		}
		&-input {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			
			&-input {
				flex: 1;
			}
			&-left {
				text-align: left;
			}
			&-center {
				text-align: center;
			}
		}
	}
</style>
