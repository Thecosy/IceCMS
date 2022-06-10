<template>
	<view :class="['n-border-'+border, 'n-radius-'+radius, 'n-bg-'+bgType]" :style="boxStyle" :hover-class="'n-hover-'+hover" bubble="true" @tap="toSelect">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * check-item
	 * @description 自定义内容单多选的选择项
	 * @property {Number, String} value 唯一值/返回的内容
	 * @property {Boolean} disabled 是否禁用
	 * @property {String} border 边框主题
	 * @property {String} radius 圆角主题
	 * @property {String} bgType 背景主题
	 * @property {String} hover hover效果
	 * @property {String} boxStyle 外层样式
	*/
	export default {
		props: {
			/**
			 * 唯一值/返回的内容
			 */
			value: {
				type: [Number, String],
				default: ''
			},
			/**
			 * 是否禁用
			 */
			disabled: {
				type: Boolean,
				default: false
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
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: ''
			},
			/**
			 * hover效果
			 */
			hover: {
				type: String,
				default: 'opacity'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		inject: ['mCheck'],
		methods: {
			toSelect() {
				if (this.disabled) {
					return
				}
				this.mCheck.toSelect(this.value)
			}
		}
	}
</script>

<style>
</style>
