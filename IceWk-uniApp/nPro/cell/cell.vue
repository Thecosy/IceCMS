<template>
	<view :class="['n-cell', 'n-position-relative', 'n-flex-row', 'n-align-center', 'n-wrap-nowrap', 'n-bg-'+bgType, 'n-height-'+height, 'n-radius-'+radius, 'n-border-'+border]" :style="boxStyle" :hover-class="'n-hover-'+hover" bubble="true" @tap.stop="toSelect">
		<n-icon v-if="icon&&icon.length > 0" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="toSelect"></n-icon>
		<slot name="label">
			<text v-if="title&&title.length>0" :class="['n-color-'+titleType, 'n-size-'+titleSize]" :style="'margin-right:'+space+';'+titleStyle">{{title}}</text>
		</slot>
		<slot>
			<text :class="['n-text-align-'+valueAlign, 'n-flex-one', 'n-lines-'+valueLines, 'n-color-'+valueType, 'n-size-'+valueSize, 'n-lh-'+valueLh]" :style="valueStyle">{{value}}</text>
		</slot>
		<!-- custom right extra view -->
		<slot name="extra"></slot>
		<n-icon v-if="indicator&&indicator.length>0" :name="indicator" :type="indicatorType" :size="indicatorSize" :iconStyle="indicatorStyle" :boxStyle="'margin-left:'+space+';'+indicatorBoxStyle" @iconClicked="toSelect"></n-icon>
		<slot name="more"></slot>
	</view>
</template>

<script>
	/**
	 * cell
	 * @description 横向单元
	 * @property {String} icon 左侧图标
	 * @property {String} title 左侧标题
	 * @property {String} value 具体/描述内容
	 * @property {String} indicator 右侧图标
	 * @property {String} bgType 背景主题
	 * @property {String} titleType 标题颜色主题
	 * @property {String} valueType 内容颜色主题
	 * @property {String} iconType 左侧图标颜色主题
	 * @property {String} indicatorType 右侧图标颜色主题
	 * @property {String} titleSize 标题尺寸主题
	 * @property {String} valueSize 内容尺寸主题
	 * @property {String} valueAlign 内容排版主题
	 * @property {String} valueLines 内容的最大行数
	 * @property {String} valueLh 内容的行高
	 * @property {String} iconSize 左侧图标尺寸主题
	 * @property {String} indicatorSize 右侧图标尺寸主题
	 * @property {String} height 高度主题
	 * @property {String} radius 圆角主题
	 * @property {String} border 边框主题
	 * @property {String} hover hover点击效果
	 * @property {String} space 文字与图标间距
	 * @property {String} iconStyle 左侧图标样式
	 * @property {String} indicatorStyle 右侧图标样式
	 * @property {String} boxStyle 外层样式
	 * @property {String} titleStyle 标题样式
	 * @property {String} valueStyle 内容样式
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
				default: ""
			},
			/**
			 * 左侧标题
			 */
			title: {
				type: String,
				default: ""
			},
			/**
			 * 具体/描述内容
			 */
			value: {
				type: String,
				default: ""
			},
			/**
			 * 右侧图标
			 */
			indicator: {
				type: String,
				default: ""
			},
			/**
			 * 背景主题
			 */
			bgType: {
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
			 * 内容颜色主题
			 */
			valueType: {
				type: String,
				default: 'second'
			},
			/**
			 * 左侧图标颜色主题
			 */
			iconType: {
				type: String,
				default: 'text'
			},
			/**
			 * 右侧图标颜色主题
			 */
			indicatorType: {
				type: String,
				default: 'second'
			},
			/**
			 * 标题尺寸主题
			 */
			titleSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 内容尺寸主题
			 */
			valueSize: {
				type: String,
				default: 's'
			},
			/**
			 * 内容排版主题
			 */
			valueAlign: {
				type: String,
				default: 'right'
			},
			/**
			 * 内容的最大行数
			 */
			valueLines: {
				type: String,
				default: '1'
			},
			/**
			 * 内容的行高
			 */
			valueLh: {
				type: String,
				default: 's'
			},
			/**
			 * 左侧图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: "l"
			},
			/**
			 * 右侧图标尺寸主题
			 */
			indicatorSize: {
				type: String,
				default: "l"
			},
			/**
			 * 高度主题
			 */
			height: {
				type: String,
				default: 'l'
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: 'base'
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: ''
			},
			/**
			 * hover点击效果
			 */
			hover: {
				type: String,
				default: 'bg'
			},
			/**
			 * 文字与图标间距
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 左侧图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 右侧图标样式
			 */
			indicatorStyle: {
				type: String,
				default: ''
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 标题样式
			 */
			titleStyle: {
				type: String,
				default: ''
			},
			/**
			 * 内容样式
			 */
			valueStyle: {
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
		methods: {
			toSelect(e) {
				this.$emit("cellClicked")
				e && e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-cell {
		padding-left: 32rpx;
		padding-right: 32rpx;
	}
</style>
