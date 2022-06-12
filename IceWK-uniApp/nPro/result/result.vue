<template>
	<view class="n-flex-column n-align-center" :style="boxStyle">
		<view :style="{height: top}"></view>
		<slot name="icon">
			<n-icon :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="iconBoxStyle"></n-icon>
		</slot>
		<slot name="title">
			<text :class="['n-color-'+titleType, 'n-size-'+titleSize]" :style="titleStyle">{{title}}</text>
		</slot>
		<slot name="desc">
			<text :class="['n-color-'+descType, 'n-size-'+descSize]" :style="descStyle">{{desc}}</text>
		</slot>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	/**
	 * result
	 * @description 结果展示/空白展示
	 * @property {String} top 自定义距离顶部的距离
	 * @property {String} icon 图标
	 * @property {String} title 标题
	 * @property {String} desc 描述
	 * @property {String} titleType 标题颜色主题
	 * @property {String} titleSize 标题尺寸主题
	 * @property {String} titleStyle 标题样式
	 * @property {String} descType 描述颜色主题
	 * @property {String} descSize 描述尺寸主题
	 * @property {String} descStyle 描述样式
	 * @property {String} iconType 图标颜色主题
	 * @property {String} iconSize图标尺寸主题
	 * @property {String} iconStyle 图标样式
	 * @property {String} iconBoxStyle 图标外层样式
	 * @property {String} boxStyle 外层样式
	 */
	export default {
		props: {
			/**
			 * 自定义距离顶部的距离
			 */
			top: {
				type: String,
				default: '260rpx'
			},
			/**
			 * 图标
			 */
			icon: {
				type: String,
				default: ''
			},
			/**
			 * 标题
			 */
			title: {
				type: String,
				default: ''
			},
			/**
			 * 描述
			 */
			desc: {
				type: String,
				default: '暂时还没有数据'
			},
			/**
			 * 标题颜色主题
			 */
			titleType: {
				type: String,
				default: 'second'
			},
			/**
			 * 标题尺寸主题
			 */
			titleSize: {
				type: String,
				default: 'll'
			},
			/**
			 * 标题样式
			 */
			titleStyle: {
				type: String,
				default: ''
			},
			/**
			 * 描述颜色主题
			 */
			descType: {
				type: String,
				default: 'second'
			},
			/**
			 * 描述尺寸主题
			 */
			descSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 描述样式
			 */
			descStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标颜色主题
			 */
			iconType: {
				type: String,
				default: 'second'
			},
			/**
			 * 图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'll'
			},
			/**
			 * 图标样式
			 */
			iconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标外层样式
			 */
			iconBoxStyle: {
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
		}
	}
</script>

<style lang="scss" scoped>
</style>
