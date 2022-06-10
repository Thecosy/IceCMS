<template>
	<n-popup-always :show="show" pos="bottom" height="600rpx" @overlayClicked="toCancel">
		<slot name="header">
			<view :class="['n-picker-header', 'n-flex-row', 'n-align-center', 'n-justify-center', 'n-bg-'+headerBgType, 'n-border-'+headerBorder, 'n-radius-'+headerRadius]" :style="headerStyle">
				<text :class="['n-color-'+cancelType, 'n-size-'+cancelSize]" :style="cancelStyle" @tap="toCancel">{{cancelText}}</text>
				<text :class="['n-flex-one', 'n-color-'+titleType, 'n-size-'+titleSize, 'n-text-align-center']" :style="titleStyle">{{title}}</text>
				<text :class="['n-color-'+confirmType, 'n-size-'+confirmSize]" :style="confirmStyle" @tap="toConfirm">{{confirmText}}</text>
			</view>
		</slot>
		<n-picker-time-content :mode="mode" :value="value" :useCurrent="useCurrent" :start="start" :end="end" :includeBefore="includeBefore" :includeAfter="includeAfter" :range="range" :bgType="bgType" :textType="textType" :textSize="textSize" :height="height" :itemHeight="itemHeight" :boxStyle="boxStyle" :itemStyle="itemStyle" :textStyle="textStyle" :indicatorStyle="indicatorStyle" :rangeType="rangeType" :rangeSize="rangeSize" :rangeStyle="rangeStyle" :rangeBoxStyle="rangeBoxStyle" @inited="pickerInited" @change="pickerChanged"></n-picker-time-content>
	</n-popup-always>
</template>

<script>
	/**
	 * picker-time
	 * @description 时间选择器
	 * @property {Boolean} useCurrent 是否使用当前时间
	 * @property {String} start 年份的开始
	 * @property {String} end 年份的结束
	 * @property {Boolean} includeBefore 是否允许以前的年份。仅仅只是用在带年份选择的mode上
	 * @property {Boolean} includeAfter 是否允许以后的年份
	 * @property {String} range 范围选择时中间的分割器
	 * @property {String} bgType content的背景主题
	 * @property {String} textType 选择项文字颜色主题
	 * @property {String} textSize 选择项文字尺寸主题
	 * @property {String} height content的自定义高度
	 * @property {String} itemHeight 选择项的自定义高度
	 * @property {String} boxStyle content的外层样式
	 * @property {String} itemStyle 选择项的外层样式
	 * @property {String} textStyle 选择项的文字样式
	 * @property {String} indicatorStyle content的indicator-style
	 * @property {String} rangeType 范围分割器的颜色主题
	 * @property {String} rangeSize 范围分割器的尺寸主题
	 * @property {String} rangeStyle 范围分割器的样式
	 * @property {String} rangeBoxStyle 范围分割器的外层样式
	 */
	export default {
		props: {
			/**
			 * 是否打开/显示
			 */
			show: {
				type: Boolean,
				default: false
			},
			/**
			 * ['date'/年月日, 'dateTime'/年月日时分, 'yearMonth'/年月, 
			 * 'time'/时分, 'dateRange'/年月日, 'yearMonthRange'/年月, 'timeRange'/时分]
			 */
			mode: {
				type: String,
				default: 'date'
			},
			/**
			 * 左侧取消文字
			 */
			cancelText: {
				type: String,
				default: '取消'
			},
			/**
			 * 右侧确认文字
			 */
			confirmText: {
				type: String,
				default: '确认'
			},
			/**
			 * 中间标题
			 */
			title: {
				type: String,
				default: ''
			},
			/**
			 * 取消文字颜色主题
			 */
			cancelType: {
				type: String,
				default: 'third'
			},
			/**
			 * 取消文字尺寸主题
			 */
			cancelSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 取消文字样式
			 */
			cancelStyle: {
				type: String,
				default: ''
			},
			/**
			 * 确认文字颜色主题
			 */
			confirmType: {
				type: String,
				default: 'primary'
			},
			/**
			 * 确认文字尺寸主题
			 */
			confirmSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 确认文字样式
			 */
			confirmStyle: {
				type: String,
				default: ''
			},
			/**
			 * 标题颜色主题
			 */
			titleType: {
				type: String,
				default: 'text'
			},
			/**
			 * 标题尺寸主题
			 */
			titleSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 标题样式
			 */
			titleStyle: {
				type: String,
				default: ''
			},
			/**
			 * 头部边框主题
			 */
			headerBorder: {
				type: String,
				default: 'bottom'
			},
			/**
			 * 头部圆角主题
			 */
			headerRadius: {
				type: String,
				default: 'top-base'
			},
			/**
			 * 头部背景主题
			 */
			headerBgType: {
				type: String,
				default: 'inverse'
			},
			/**
			 * 头部外层样式
			 */
			headerStyle: {
				type: String,
				default: ''
			},
			/**
			 * 值，不是索引
			 */
			value: {
				type: Array,
				default: ()=>{
					return [0,0,0,0,0,0,0]
				}
			},
			/**
			 * 是否使用当前时间
			 */
			useCurrent: {
				type: Boolean,
				default: false
			},
			/**
			 * 年份的开始
			 */
			start: {
				type: String,
				default: "1970"
			},
			/**
			 * 年份的结束
			 */
			end: {
				type: String,
				default: new Date().getFullYear() + ''
			},
			/**
			 * 是否允许以前的年份。仅仅只是用在带年份选择的mode上
			 */
			includeBefore: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否允许以后的年份
			 */
			includeAfter: {
				type: Boolean,
				default: true
			},
			/**
			 * 范围选择时中间的分割器
			 */
			range: {
				type: String,
				default: '-'
			},
			/**
			 * content的背景主题
			 */
			bgType: {
				type: String,
				default: 'inverse'
			},
			/**
			 * 选择项文字颜色主题
			 */
			textType: {
				type: String,
				default: 'text'
			},
			/**
			 * 选择项文字尺寸主题
			 */
			textSize: {
				type: String,
				default: 'base'
			},
			/**
			 * content的自定义高度
			 */
			height: {
				type: String,
				default: '500rpx'
			},
			/**
			 * 选择项的自定义高度
			 */
			itemHeight: {
				type: String,
				default: '100rpx'
			},
			/**
			 * content的外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 选择项的外层样式
			 */
			itemStyle: {
				type: String,
				default: ''
			},
			/**
			 * 选择项的文字样式
			 */
			textStyle: {
				type: String,
				default: ''
			},
			/**
			 * content的indicator-style
			 */
			indicatorStyle: {
				type: String,
				default: ''
			},
			/**
			 * 范围分割器的颜色主题
			 */
			rangeType: {
				type: String,
				default: 'text'
			},
			/**
			 * 范围分割器的尺寸主题
			 */
			rangeSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 范围分割器的样式
			 */
			rangeStyle: {
				type: String,
				default: ''
			},
			/**
			 * 范围分割器的外层样式
			 */
			rangeBoxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				result: null
			}
		},
		methods: {
			toConfirm() {
				this.$emit("confirm", this.result)
			},
			toCancel() {
				this.$emit("cancel")
			},
			pickerInited(val) {
				this.result = JSON.parse(JSON.stringify(val))
			},
			pickerChanged(val) {
				this.result = JSON.parse(JSON.stringify(val))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-picker {
		&-header {
			height: 100rpx;
			width: 750rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;
		}
	}
</style>
