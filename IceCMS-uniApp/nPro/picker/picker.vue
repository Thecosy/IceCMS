<template>
	<n-popup-always :show="show" pos="bottom" height="600rpx" @overlayClicked="toCancel">
		<slot name="header">
			<view :class="['n-picker-header', 'n-flex-row', 'n-align-center', 'n-justify-center', 'n-bg-'+headerBgType, 'n-border-'+headerBorder, 'n-radius-'+headerRadius]" :style="headerStyle">
				<text :class="['n-color-'+cancelType, 'n-size-'+cancelSize]" :style="cancelStyle" @tap="toCancel">{{cancelText}}</text>
				<text :class="['n-flex-one', 'n-color-'+titleType, 'n-size-'+titleSize, 'n-text-align-center']" :style="titleStyle">{{title}}</text>
				<text :class="['n-color-'+confirmType, 'n-size-'+confirmSize]" :style="confirmStyle" @tap="toConfirm">{{confirmText}}</text>
			</view>
		</slot>
		<n-picker-content :mode="mode" :selections="selections" :labelProps="labelProps" :value="value" :bgType="bgType" :textType="textType" :textSize="textSize" :height="height" :itemHeight="itemHeight" :boxStyle="boxStyle" :itemStyle="itemStyle" :textStyle="textStyle" :indicatorStyle="indicatorStyle" @inited="pickerInited" @change="pickerChanged"></n-picker-content>
	</n-popup-always>
</template>

<script>
	/**
	 * picker
	 * @description 选择器
	 * @property {Boolean} show 是否打开/显示
	 * @property {String} mode s1/s2/s3
	 * @property {String} cancelText 左侧取消文字
	 * @property {String} confirmText 右侧确认文字
	 * @property {String} title 中间标题
	 * @property {String} cancelType 取消文字颜色主题
	 * @property {String} cancelSize 取消文字尺寸主题
	 * @property {String} cancelStyle 取消文字样式
	 * @property {String} confirmType 确认文字颜色主题
	 * @property {String} confirmSize 确认文字尺寸主题
	 * @property {String} confirmStyle 确认文字样式
	 * @property {String} titleType 标题颜色主题
	 * @property {String} titleSize 标题尺寸主题
	 * @property {String} titleStyle 标题样式
	 * @property {String} headerBorder 头部的边框主题
	 * @property {String} headerRadius 头部的圆角主题
	 * @property {String} headerBgType 头部的背景主题
	 * @property {String} headerStyle 头部样式
	 * @property {Array}  value 值，不是索引
	 * @property {String} bgType content的背景色主题
	 * @property {String} textType content的文字颜色主题
	 * @property {String} textSize content的文字尺寸主题
	 * @property {String} height content的自定义高度
	 * @property {String} itemHeight 选择item的自定义高度
	 * @property {String} boxStyle content的外层样式
	 * @property {String} itemStyle 选择item的外层样式
	 * @property {String} textStyle 选择item的文字样式
	 * @property {String} indicatorStyle content的indicator-style
	 * @property {Array} selections 可选择内容
	 * @property {Object} labelProps 自定义的相应内容对应字段
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
			 * s1/s2/s3
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
			 * 头部的边框主题
			 */
			headerBorder: {
				type: String,
				default: 'bottom'
			},
			/**
			 * 头部的圆角主题
			 */
			headerRadius: {
				type: String,
				default: 'top-base'
			},
			/**
			 * 头部的背景主题
			 */
			headerBgType: {
				type: String,
				default: 'inverse'
			},
			/**
			 * 头部样式
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
			 * content的背景色主题
			 */
			bgType: {
				type: String,
				default: 'inverse'
			},
			/**
			 * content的文字颜色主题
			 */
			textType: {
				type: String,
				default: 'text'
			},
			/**
			 * content的文字尺寸主题
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
			 * 选择item的自定义高度
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
			 * 选择item的外层样式
			 */
			itemStyle: {
				type: String,
				default: ''
			},
			/**
			 * 选择item的文字样式
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
			 * 可选择内容
			 */
			selections: {
				type: Array,
				default: () => {
					return []
				}
			},
			/**
			 * 自定义的相应内容对应字段
			 */
			labelProps: {
				type: Object,
				default: () => {
					return {
						s1: {
							label: 'name',
							value: 'id'
						},
						s2: {
							label: 'name',
							value: 'id',
							// the tag is for to get s2 selections in s1
							tag: "c"
						},
						s3: {
							label: 'name',
							value: 'id',
							// the tag is for to get get s3 in selections in s2
							tag: "a"
						}
					}
				}
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
				// console.log(val)
				this.result = JSON.parse(JSON.stringify(val))
			},
			pickerChanged(val) {
				// console.log(val)
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
