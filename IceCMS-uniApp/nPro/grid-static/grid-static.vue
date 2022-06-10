<template>
	<view :class="['n-flex-column', 'n-border-'+border, 'n-radius-'+radius]" :style="boxStyle">
		<view v-for="(rows, idx) in rowArr" class="n-flex-row n-wrap-nowrap" :key="idx">
			<view v-for="(item, index)  in rows" :class="[flexDirection==='row'?'n-flex-row':'n-flex-column', 'n-position-relative', 'n-justify-center', 'n-align-center', 'n-flex-one', index !==0 && hasLine && 'n-grid-item-left', idx !== 0 && hasLine && 'n-grid-item-top']" :key="index" :style="mrItemStyle" :hover-class="'n-hover-'+hover" bubble="true" @tap.stop="clickedItem(idx, index, item)">
				<text v-if="textFirst&&item" :class="['n-color-'+textType, 'n-size-'+textSize]" :style="(item.textStyle||'')+mrTextStyle">{{item[textLabel]}}</text>
				<n-icon v-if="isIcon&&item" :name="item[iconLabel]" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="iconBoxStyle" @iconClicked="clickedItem(idx, index, item)"></n-icon>
				<text v-if="!isIcon&&item" :class="['n-color-'+iconType, 'n-size-'+iconSize]" :style="(item.iconStyle||'')+iconStyle">{{item[iconLabel]}}</text>
				<text v-if="!textFirst&&item" :class="['n-color-'+textType, 'n-size-'+textSize]" :style="(item.textStyle||'')+mrTextStyle">{{item[textLabel]}}</text>
				<n-badge v-if="item.badge" :size="item.badge.size||badgeConfig.size||'12rpx'" :bgType="item.badge.bgType||badgeConfig.bgType||'error'" :text="item.badge.text||''" :border="item.badge.border||badgeConfig.border||'none'" :textType="item.badge.textType||badgeConfig.textType||'inverse'" :textSize="item.badge.textSize||badgeConfig.textSize||'ss'" :textStyle="item.badge.textStyle||badgeConfig.textStyle||''" :boxStyle="item.badge.boxStyle||badgeConfig.boxStyle||''"></n-badge>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * grid-static
	 * @description 宫格
	 * @property {Array} items 数据源
	 * @property {String} mode grid-item的布局方式
	 * @property {Number} columns 每一行的数量
	 * @property {String} itemHeight 自定义的高度
	 * @property {Boolean} hasLine 是否带有分割线
	 * @property {String} space grid-item的space
	 * @property {String} textType item的文字颜色主题
	 * @property {String} textSize item的文字尺寸主题
	 * @property {String} iconType item的图标颜色主题
	 * @property {String} iconSize item的图标尺寸主题
	 * @property {String} border 边框主题
	 * @property {String} radius 圆角主题
	 * @property {String} hover hover主题
	 * @property {String} iconLabel item的icon字段
	 * @property {Boolean} isIcon item的icon是否是图标
	 * @property {Object} badgeConfig badge样式的全局配置
	 * @property {String} boxStyle badge样式的全局配置
	 * @property {String} boxStyle 外层样式
	 * @property {String} itemBoxStyle item的外层样式
	 * @property {String} iconStyle 图标样式
	 * @property {String} iconBoxStyle 图标的外层样式
	 * @property {String} textStyle 文字样式
	 */
	export default {
		props: {
			/**
			 * 数据源
			 */
			items: {
				type: Array,
				default: ()=>{return []}
			},
			/**
			 * grid-item的布局方式
			 */
			mode: {
				type: String,
				default: 'top'
			},
			/**
			 * 每一行的数量
			 */
			columns: {
				type: Number,
				default: 4
			},
			/**
			 * 自定义的高度
			 */
			itemHeight: {
				type: String,
				default: ''
			},
			/**
			 * 是否带有分割线
			 */
			hasLine: {
				type: Boolean,
				default: true
			},
			/**
			 * grid-item的space
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * item的文字颜色主题
			 */
			textType: {
				type: String,
				default: ''
			},
			/**
			 * item的文字尺寸主题
			 */
			textSize: {
				type: String,
				default: ''
			},
			/**
			 * item的图标颜色主题
			 */
			iconType: {
				type: String,
				default: ''
			},
			/**
			 * item的图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'll'
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
			 * hover主题
			 */
			hover: {
				type: String,
				default: 'opacity'
			},
			/**
			 * item的icon字段
			 */
			iconLabel: {
				type: String,
				default: 'icon'
			},
			/**
			 * item的text字段
			 */
			textLabel: {
				type: String,
				default: 'text'
			},
			/**
			 * item的icon是否是图标
			 */
			isIcon: {
				type: Boolean,
				default: true
			},
			/**
			 * badge样式的全局配置
			 */
			badgeConfig: {
				type: Object,
				default: ()=>{
					return {}
				}
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * item的外层样式
			 */
			itemBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标的外层样式
			 */
			iconBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 文字样式
			 */
			textStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			rowArr() {
			  const rowArr = []
			  let rowCount = 0
			  this.items.forEach((item, index) => {
			    rowCount = Math.floor(index / this.columns)
			    if (!rowArr[rowCount]) {
			      rowArr[rowCount] = []
			    }
			    rowArr[rowCount].push(item)
			  })
			  if (rowArr.length > 0) {
				  while (rowArr[rowCount].length !== this.columns) {
				    rowArr[rowCount].push(false)
				  }
			  }
			  return rowArr
			},
			mrItemStyle() {
				return (this.itemHeight ? ("height:" + this.itemHeight + ';') : '') + this.itemBoxStyle
			},
			flexDirection() {
				if (this.mode === 'left' || this.mode === 'right') {
					return 'row'
				}
				return 'column'
			},
			textFirst() {
				if (this.mode === 'left' || this.mode === 'top') {
					return false
				}
				return true
			},
			mrTextStyle() {
				const _space = "margin-" + this.mode + ':' + this.space + ';'
				return _space + this.textStyle
			}
		},
		methods: {
			clickedItem(row, column, item) {
				this.$emit("itemClicked", {
					row: row,
					column: column,
					item: item
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../var.scss';
	@import '@/uni.scss';
	
	.n-grid {
		&-item {
			&-left {
				border-left-color: $n-border-color;
				border-left-width: 1px;
				border-left-style: solid;
			}
			&-top {
				border-top-color: $n-border-color;
				border-top-width: 1px;
				border-top-style: solid;
			}
		}
	}
</style>
