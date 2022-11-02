<template>
	<view :class="['n-flex-row', 'n-align-center', 'n-wrap-nowrap', 'n-bg-'+bgType, 'n-height-'+height, 'n-border-'+border, 'n-radius-'+radius]" :hover-class="'n-hover-'+hover" :style="boxStyle" @tap.stop="toSelect">
		<n-icon v-if="icon&&icon.length>0" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="toSelect"></n-icon>
		<slot name="label">
			<text v-if="label&&label.length>0" :class="['n-color-'+labelType, 'n-size-'+labelSize]" :style="'margin-right:'+space+';'+labelStyle">{{label}}</text>
		</slot>
		<slot>
			<text v-if="shouldShowPlace" :class="['n-lines-1', 'n-color-'+placeType, 'n-size-'+placeSize]" :style="'text-align:'+valueAlign+';'+placeStyle">{{placeholder}}</text>
			<text v-else :class="['n-lines-1', 'n-color-'+valueType, 'n-size-'+valueSize]" :style="'text-align:'+valueAlign+';'+valueStyle">{{value}}</text>
		</slot>
		<slot name="extra"></slot>
		<n-icon v-if="indicator&&indicator.length>0" :name="indicator" :type="indicatorType" :size="indicatorSize" :iconStyle="indicatorStyle" :boxStyle="'margin-left:'+space+';'+indicatorBoxStyle" @iconClicked="toSelect"></n-icon>
	</view>
</template>

<script>
	/**
	 * select-line
	 * @description 选择输入单元
	 * @property {String} icon 左侧图标
	 * @property {String} label 标签
	 * @property {String} value 值
	 * @property {String} indicator 右侧图标
	 * @property {String} height 高度主题
	 * @property {String} border 边框主题
	 * @property {String} radius 圆角主题
	 * @property {String} placeholder placeholder
	 * @property {String} valueAlign 内容排版方式
	 * @property {String} bgType 背景主题
	 * @property {String} iconType 左侧图标颜色主题
	 * @property {String} iconSize 左侧图标尺寸主题
	 * @property {String} valueType 内容颜色主题
	 * @property {String} valueSize 内容尺寸主题
	 * @property {String} labelType 标签颜色主题
	 * @property {String} labelSize 标签尺寸主题
	 * @property {String} placeType 占位颜色主题
	 * @property {String} placeSize 占位尺寸主题
	 * @property {String} indicatorType 右侧图标颜色主题
	 * @property {String} indicatorSize 右侧图标尺寸主题
	 * @property {String} space 各元素间距
	 * @property {String} hover hover主题
	 * @property {String} boxStyle 外层样式
	 * @property {String} labelStyle 标签样式
	 * @property {String} valueStyle 内容样式。默认铺满
	 * @property {String} placeStyle 占位内容样式
	 * @property {String} indicatorStyle 右侧图标样式
	 * @property {String} iconBoxStyle 左侧图标外层样式
	 * @property {String} indicatorBoxStyle 右侧图标外层样式
	 */
	export default {
		props: {
			/**
			 * 左侧图标
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * 标签
			 */
			label: {
				type: String,
				default: ""
			},
			/**
			 * 值
			 */
			value: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标
			 */
			indicator: {
				type: String,
				default: ''
			},
			/**
			 * 高度主题
			 */
			height: {
				type: String,
				default: "l"
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: ''
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: ''
			},
			/**
			 * placeholder
			 */
			placeholder: {
				type: String,
				default: "请选择"
			},
			/**
			 * 内容排版方式
			 */
			valueAlign: {
				type: String,
				default: "right"
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标颜色主题
			 */
			iconType: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'l'
			},
			/**
			 * 内容颜色主题
			 */
			valueType: {
				type: String,
				default: ''
			},
			/**
			 * 内容尺寸主题
			 */
			valueSize: {
				type: String,
				default: ""
			},
			/**
			 * 标签颜色主题
			 */
			labelType: {
				type: String,
				default: ''
			},
			/**
			 * 标签尺寸主题
			 */
			labelSize: {
				type: String,
				default: ''
			},
			/**
			 * 占位颜色主题
			 */
			placeType: {
				type: String,
				default: 'place'
			},
			/**
			 * 占位尺寸主题
			 */
			placeSize: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标颜色主题
			 */
			indicatorType: {
				type: String,
				default: 'third'
			},
			/**
			 * 右侧图标尺寸主题
			 */
			indicatorSize: {
				type: String,
				default: 'l'
			},
			/**
			 * 各元素间距
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * hover主题
			 */
			hover: {
				type: String,
				default: 'bg'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 标签样式
			 */
			labelStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容样式。默认铺满
			 */
			valueStyle: {
				type: String,
				default: 'flex:1;'
			},
			/**
			 * 占位内容样式
			 */
			placeStyle: {
				type: String,
				default: 'flex:1;'
			},
			/**
			 * 右侧图标样式
			 */
			indicatorStyle: {
				type: String,
				default: ''
			},
			/**
			 * 左侧图标外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标外层样式
			 */
			indicatorBoxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			shouldShowPlace() {
				if (!this.value || (this.value+'').trim().length === 0) {
					return true
				}
				return false
			}
		},
		methods: {
			toSelect(e) {
				e && e.stopPropagation && e.stopPropagation()
				this.$emit("selectClicked")
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
