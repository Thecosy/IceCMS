<template>
	<view :style="boxStyle">
		<view v-if="fixed&&isSeize" :style="{height: seizeHeight + 'px', width: '750rpx'}"></view>
		<view :class="['n-bg-'+bgType, 'n-border-'+border, 'n-nav-box', fixed&&'n-nav-fixed']" :style="statusNavStyle" @tap.stop="toPrevent">
			<view v-if="includeStatus" :style="{width: '750rpx', height: statusHeight + 'px'}"></view>
			<view class="n-flex-row n-wrap-nowrap n-align-center" :style="mrNavStyle">
				<view :class="['n-flex-row', 'n-wrap-nowrap', 'n-justify-start', 'n-align-center', 'n-nav-lefts', leftBgType&&('n-bg-'+leftBgType)]" :style="leftStyle">
					<slot name="left">
						<view v-if="lefts && lefts.length > 0" v-for="(left, idx) in lefts" :key="idx" :class="['n-position-relative', 'n-flex-row', 'n-align-center', left.bgType&&('n-bg-'+left.bgType)]" :style="leftItemStyle+(left.style||'')" bubble="true" @tap="goLeft(idx)">
							<n-icon v-if="left.icon" :name="left.icon" :type="left.iconType||itemIconType" :size="left.iconSize||itemIconSize" :iconStyle="itemIconStyle+(left.iconStyle||'')" @iconClicked="goLeft(idx)"></n-icon>
							<text v-if="left.text" :class="['n-color-'+(left.textType||itemTextType), 'n-size-'+(left.textSize||itemTextSize)]" :style="itemTextStyle+(left.textStyle||'')">{{left.text}}</text>
							<n-badge v-if="left.badge" :size="left.badge.size||badgeConfig.size||'12rpx'" :bgType="left.badge.bgType||badgeConfig.bgType||'error'" :text="left.badge.text||''" :border="left.badge.border||badgeConfig.border||'none'" :textType="left.badge.textType||badgeConfig.textType||'inverse'" :textSize="left.badge.textSize||badgeConfig.textSize||'ss'" :textStyle="left.badge.textStyle||badgeConfig.textStyle||''" :boxStyle="left.badge.boxStyle||badgeConfig.boxStyle||''"></n-badge>
						</view>
					</slot>
				</view>
				<view class="n-flex-row n-wrap-nowrap n-align-center n-justify-center n-nav-title" :style="centerStyle">
					<slot name="center">
						<text v-if="title" :class="['n-lines-1', 'n-nav-title-text', 'n-color-'+titleType, 'n-size-'+titleSize]" :style="titleStyle" @tap.stop="clickCenter">{{ title }}</text>
						<n-icon v-if="icon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" @iconClicked="clickCenter"></n-icon>
					</slot>
				</view>
				<view :class="['n-flex-row', 'n-align-center', 'n-wrap-nowrap', 'n-justify-end', 'n-nav-rights', rightBgType&&('n-bg-'+rightBgType)]" :style="rightStyle">
					<slot name="right">
						<view v-if="rights && rights.length > 0" v-for="(right, idx) in rights" :key="idx" :class="['n-position-relative', 'n-flex-row', 'n-align-center', 'n-wrap-nowrap', 'n-justify-end', right.bgType&&('n-bg-'+right.bgType)]" :style="rightItemStyle+(right.style||'')" bubble="true" @tap="goRight(idx)">
							<n-icon v-if="right.icon" :name="right.icon" :type="right.iconType||itemIconType" :size="right.iconSize||itemIconSize" :iconStyle="itemIconStyle+(right.iconStyle||'')" @iconClicked="goRight(idx)"></n-icon>
							<text v-if="right.text" :class="['n-color-'+(right.textType||itemTextType), 'n-size-'+(right.textSize||itemTextSize)]" :style="itemTextStyle+(right.textStyle||'')">{{right.text}}</text>
							<n-badge v-if="right.badge" :size="right.badge.size||badgeConfig.size||'12rpx'" :bgType="right.badge.bgType||badgeConfig.bgType||'error'" :text="right.badge.text||''" :border="right.badge.border||badgeConfig.border||'none'" :textType="right.badge.textType||badgeConfig.textType||'inverse'" :textSize="right.badge.textSize||badgeConfig.textSize||'ss'" :textStyle="right.badge.textStyle||badgeConfig.textStyle||''" :boxStyle="right.badge.boxStyle||badgeConfig.boxStyle||''"></n-badge>
						</view>
					</slot>
				</view>
			</view>
			<slot name="extra"></slot>
		</view>
	</view>
</template>

<script>
	import {getStatusBarHeight} from '../utils/system.js'
	
	/**
	 * navbar
	 * @description 自定义导航栏
	 * @property {Array}  lefts 左侧item集
	 * @property {String} title 标题
	 * @property {String} icon 标题右侧图标
	 * @property {Array} rights 右侧item集
	 * @property {String} bgType 背景主题
	 * @property {String} border 边框主题
	 * @property {String} titleType 标题颜色主题
	 * @property {String} titleSize 标题尺寸主题
	 * @property {String} titleStyle 标题样式
	 * @property {String} iconType 标题图标颜色主题
	 * @property {String} iconSize 标题图标尺寸主题
	 * @property {String} iconStyle 标题图标样式
	 * @property {String} itemIconType item图标颜色主题
	 * @property {String} itemIconSize item图标尺寸主题
	 * @property {String} itemIconStyle item图标样式
	 * @property {String} itemTextType item文字颜色主题
	 * @property {String} itemTextSize item文字尺寸主题
	 * @property {String} itemTextStyle item文字样式
	 * @property {Number} height 自定义px高度
	 * @property {Boolean} includeStatus 是否包含状态栏
	 * @property {Boolean} isSeize 是否占位
	 * @property {Boolean} fixed 是否fixed定位
	 * @property {String} leftStyle lefts整体样式
	 * @property {String} leftBgType lefts整体的背景主题
	 * @property {String} leftItemStyle lefts中item的样式
	 * @property {String} rightStyle rights整体样式
	 * @property {String} rightBgType rights整体背景主题
	 * @property {String} rightItemStyle rights中item的样式
	 * @property {String} centerStyle 中间title外层的样式
	 * @property {String} boxStyle 外层样式
	 * @property {String} statusNavStyle status与nav的外层样式
	 * @property {String} navStyle nav的外层样式
	 * @property {Object} badgeConfig badge整体设置
	 */
	export default {
		props: {
			/**
			 * 左侧item集
			 */
			lefts: {
				type: Array,
				default: ()=>{return []}
			},
			/**
			 * 标题
			 */
			title: {
				type: String,
				default: null
			},
			/**
			 * 标题右侧图标
			 */
			icon: {
				type: String,
				default: null
			},
			/**
			 * 右侧item集
			 */
			rights: {
				type: Array,
				default: ()=>{return []}
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: 'nav'
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: ''
			},
			/**
			 * 标题颜色主题
			 */
			titleType: {
				type: String,
				default: 'nav-title'
			},
			/**
			 * 标题尺寸主题
			 */
			titleSize: {
				type: String,
				default: 'nav-title'
			},
			/**
			 * 标题样式
			 */
			titleStyle: {
				type: String,
				default: ''
			},
			/**
			 * 标题图标颜色主题
			 */
			iconType: {
				type: String,
				default: 'nav-title'
			},
			/**
			 * 标题图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'nav-title'
			},
			/**
			 * 标题图标样式
			 */
			iconStyle: {
				type: String,
				default: ""
			},
			/**
			 * item图标颜色主题
			 */
			itemIconType: {
				type: String,
				default: 'nav-icon'
			},
			/**
			 * item图标尺寸主题
			 */
			itemIconSize: {
				type: String,
				default: 'nav-icon'
			},
			/**
			 * item图标样式
			 */
			itemIconStyle: {
				type: String,
				default: ""
			},
			/**
			 * item文字颜色主题
			 */
			itemTextType: {
				type: String,
				default: 'nav-item'
			},
			/**
			 * item文字尺寸主题
			 */
			itemTextSize: {
				type: String,
				default: 'nav-item'
			},
			/**
			 * item文字样式
			 */
			itemTextStyle: {
				type: String,
				default: ''
			},
			/**
			 * 自定义px高度
			 */
			height: {
				type: Number,
				default: 44
			},
			/**
			 * 是否包含状态栏
			 */
			includeStatus: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否占位
			 */
			isSeize: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否fixed定位
			 */
			fixed: {
				type: Boolean,
				default: true
			},
			/**
			 * lefts整体样式
			 */
			leftStyle: {
				type: String,
				default: ''
			},
			/**
			 * lefts整体的背景主题
			 */
			leftBgType: {
				type: String,
				default: ''
			},
			/**
			 * lefts中item的样式
			 */
			leftItemStyle: {
				type: String,
				default: ''
			},
			/**
			 * rights整体样式
			 */
			rightStyle: {
				type: String,
				default: ''
			},
			/**
			 * rights整体背景主题
			 */
			rightBgType: {
				type: String,
				default: ''
			},
			/**
			 * rights中item的样式
			 */
			rightItemStyle: {
				type: String,
				default: ''
			},
			/**
			 * 中间title外层的样式
			 */
			centerStyle: {
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
			 * status与nav的外层样式
			 */
			statusNavStyle: {
				type: String,
				default: ''
			},
			/**
			 * nav的外层样式
			 */
			navStyle: {
				type: String,
				default: ''
			},
			/**
			 * badge整体设置
			 */
			badgeConfig: {
				type: Object,
				default: ()=>{
					return {}
				}
			}
		},
		data() {
			return {
			}
		},
		computed: {
			statusHeight() {
				if (this.includeStatus) {
					return getStatusBarHeight()
				}
				return 0
			},
			seizeHeight() {
				return this.statusHeight + this.height
			},
			mrNavStyle() {
				let _style = "height:" + this.height + 'px;'
				_style += this.navStyle
				return _style
			}
		},
		methods: {
			goLeft(i) {
				this.$emit("leftAction", i)
			},
			clickCenter(e) {
				e && e.stopPropagation && e.stopPropagation()
				this.$emit("centerAction")
			},
			goRight(i) {
				this.$emit("rightAction", i)
			},
			toPrevent(e) {
				e && e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-nav {
		&-box {
			width: 750rpx;
			left: 0;
			top: 0;
		}
		&-fixed {
			position: fixed;
		}
		&-lefts {
			padding-left: 30rpx;
			width: 200rpx;
		}
		&-title {
			width: 350rpx;
			
			&-text {
				// max-width: 350rpx;
			}
		}
		&-rights {
			padding-right: 30rpx;
			width: 200rpx;
		}
	}
</style>
