<template>
	<view :class="[flex==='row'?'n-flex-column':'n-flex-row', flex==='row'?'n-justify-center':'n-align-center']" :style="boxStyle">
		<view v-for="(item, idx) in updatedItems" :key="idx" :class="['n-flex-row', 'n-align-center', 'n-wrap-nowrap', 'n-height-'+height]" :style="'margin-right:'+((flex==='column'&&idx !== updatedItems.length-1) ? itemSpace : '0')+';'+itemBoxStyle" bubble="true" @tap.stop="toUpdateItemCheck(idx)">
			<n-icon v-if="direction==='left'" :name="item['n-checked']?checkedIcon:icon" :type="disabled||item[dl]?disabledIconType:(item['n-checked']?checkedIconType:iconType)" :size="iconSize" :iconStyle="iconStyle+(item['n-checked']?checkedIconStyle:'')+(disabled||item[dl]?disabledIconStyle:'')" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="toUpdateItemCheck(idx)"></n-icon>
			<view :style="isBetween?'flex:1;':''">
				<text :class="['n-color-'+(disabled||item[dl]?disabledTextType:(item['n-checked']?checkedTextType:textType)), 'n-size-'+textSize]" :style="textStyle+(item['n-checked']?checkedTextStyle:'')+(disabled||item[dl]?disabledTextStyle:'')">{{item[tl]}}</text>
			</view>
			<n-icon v-if="direction==='right'" :name="item['n-checked']?checkedIcon:icon" :type="disabled||item[dl]?disabledIconType:(item['n-checked']?checkedIconType:iconType)" :size="iconSize" :iconStyle="iconStyle+(item['n-checked']?checkedIconStyle:'')+(disabled||item[dl]?disabledIconStyle:'')" :boxStyle="'margin-left:'+space+';'+iconBoxStyle" @iconClicked="toUpdateItemCheck(idx)"></n-icon>
		</view>
	</view>
</template>

<script>
	/**
	 * check-static
	 * @description 单多选，支持样式有限
	 * @property {String} icon 未选中时图标
	 * @property {String} checkedIcon 选中时图标
	 * @property {String} direction 图标左右位置
	 * @property {String} flex 选项布局方式
	 * @property {Boolean} isBetween flex为row时，图标与文字是否space-between
	 * @property {Array} items items内容
	 * @property {Array} value 选中的值
	 * @property {Number} limits 限制最多可选数量。0表示不限制
	 * @property {Boolean} disabled 全部禁用
	 * @property {String} textLabel text内容的字段
	 * @property {String} textFormat 格式化输出，允许输出多个字段内容，比如 '{name} (ID:{id})'
	 * @property {String} valueLabel 唯一值的字段
	 * @property {String} disabledLabel 禁用的字段
	 * @property {String} boxStyle 外层样式
	 * @property {String} itemBoxStyle 选项外层样式
	 * @property {String} itemSpace flex为column时各选项的间距
	 * @property {String} textType 文字颜色主题
	 * @property {String} checkedTextType 选中时文字颜色主题
	 * @property {String} disabledTextType 禁用时文字颜色主题
	 * @property {String} iconType 图标颜色主题
	 * @property {String} checkedIconType 选中时图标颜色主题
	 * @property {String} disabledIconType 禁用时图标颜色主题
	 * @property {String} textSize 文字尺寸主题
	 * @property {String} height 选项高度主题
	 * @property {String} space 文字与图标的间距
	 * @property {String} textStyle 文字样式
	 * @property {String} disabledTextStyle  禁用时文字样式
	 * @property {String} checkedTextStyle 选中时文字样式
	 * @property {String} iconSize 图标尺寸主题
	 * @property {String} iconStyle 图标样式
	 * @property {String} iconBoxStyle 图标外层样式
	 * @property {String} disabledIconStyle 禁用时图标样式
	 * @property {String} checkedIconStyle 选中时图标样式
	*/
	export default {
		props: {
			/**
			 * 未选中时图标
			 */
			icon: {
				type: String,
				default: 'circle'
			},
			/**
			 * 选中时图标
			 */
			checkedIcon: {
				type: String,
				default: 'radio'
			},
			/**
			 * 图标左右位置
			 */
			direction: {
				type: String,
				default: 'left'
			},
			/**
			 * 选项布局方式
			 */
			flex: {
				type: String,
				default: 'row'
			},
			/**
			 * flex为row时，图标与文字是否space-between
			 */
			isBetween: {
				type: Boolean,
				default: false
			},
			/**
			 * items内容
			 */
			items: {
				type: Array,
				default: ()=>{return []}
			},
			/**
			 * 选中的值
			 */
			value: {
				type: Array,
				default: ()=>{return []}
			},
			/**
			 * 限制最多可选数量。0表示不限制
			 */
			limits: {
				type: Number,
				default: 0
			},
			/**
			 * 全部禁用
			 */
			disabled: {
				type: Boolean,
				default: false
			},
			/**
			 * text内容的字段
			 */
			textLabel: {
				type: String,
				default: null
			},
			/**
			 * 格式化输出，允许输出多个字段内容，比如 '{name} (ID:{id})'
			 */
			textFormat: {
				type: String,
				default: ''
			},
			/**
			 * 唯一值的字段
			 */
			valueLabel: {
				type: String,
				default: null
			},
			/**
			 * 禁用的字段
			 */
			disabledLabel: {
				type: String,
				default: null
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 选项外层样式
			 */
			itemBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * flex为column时各选项的间距
			 */
			itemSpace: {
				type: String,
				default: '16rpx'
			},
			/**
			 * 文字颜色主题
			 */
			textType: {
				type: String,
				default: 'text'
			},
			/**
			 * 选中时文字颜色主题
			 */
			checkedTextType: {
				type: String,
				default: 'text'
			},
			/**
			 * 禁用时文字颜色主题
			 */
			disabledTextType: {
				type: String,
				default: 'disabled'
			},
			/**
			 * 图标颜色主题
			 */
			iconType: {
				type: String,
				default: 'text'
			},
			/**
			 * 选中时图标颜色主题
			 */
			checkedIconType: {
				type: String,
				default: 'text'
			},
			/**
			 * 禁用时图标颜色主题
			 */
			disabledIconType: {
				type: String,
				default: 'disabled'
			},
			/**
			 * 文字尺寸主题
			 */
			textSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 选项高度主题
			 */
			height: {
				type: String,
				default: 'base'
			},
			/**
			 * 文字与图标的间距
			 */
			space: {
				type: String,
				default: '12rpx'
			},
			/**
			 * 文字样式
			 */
			textStyle: {
				type: String,
				default: ''
			},
			/**
			 * 禁用时文字样式
			 */
			disabledTextStyle: {
				type: String,
				default: ''
			},
			/**
			 * 选中时文字样式
			 */
			checkedTextStyle: {
				type: String,
				default: ''
			},
			/**
			 * 图标尺寸主题
			 */
			iconSize: {
				type: String,
				default: 'l'
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
			 * 禁用时图标样式
			 */
			disabledIconStyle: {
				type: String,
				default: ''
			},
			/**
			 * 选中时图标样式
			 */
			checkedIconStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			tl() {
				return 'text'
			},
			vl() {
				return 'value'
			},
			dl() {
				return 'disabled'
			}
		},
		data() {
			return {
				updatedItems: []
			}
		},
		created() {
			this.toGenerateUpdatedItems()
		},
		watch: {
			items() {
				this.toGenerateUpdatedItems()
			}
		},
		methods: {
			toUpdateItemCheck(idx) {
				const item = this.updatedItems[idx]
				const isToCheck = !item['n-checked']
				if (this.limits > 0 && isToCheck) {
					// limits 为 1 的时候，允许直接选择另一项
					if (this.value && this.value.length >= this.limits && this.limits !== 1) {
						this.$emit("overed")
						return
					}
				}
				let _vals = []
				if (this.limits === 1) {
					if (isToCheck) {
						this.updatedItems.forEach(item => {
							item['n-checked'] = false
						})
						item['n-checked'] = isToCheck
						_vals.push(item[this.vl])
					} else {
						item['n-checked'] = isToCheck
						_vals = []
					}
				} else {
					item['n-checked'] = isToCheck
					this.updatedItems.forEach(item => {
						if (item['n-checked']) {
							_vals.push(item[this.vl])
						}
					})
				}
				// just for v-model
				this.$emit("input", _vals)
				this.$emit("change", _vals)
			},
			toGenerateUpdatedItems() {
				const upList = []
				const that = this
				this.items && this.items.forEach((item, i) => {
					// judge if checked
					const itemValue = that.valueLabel ? item[that.valueLabel] : item
					let flag = false
					for (const i in (that.value || [])) {
						const _val = that.value[i]
						if (_val === itemValue) {
							flag = true
							break
						}
					}
					if (that.textFormat) {
						const text_str = that.textFormat.replace(/{\w+}/g, result => {
							const key = result.substring(1, result.length-1)
							const _str = item[key]
							return _str || ''
						})
						upList.push({
							[this.tl]: text_str,
							[this.vl]: item[that.valueLabel],
							[this.dl]: item[that.disabledLabel],
							'n-checked': flag
						})
					} else {
						if (that.textLabel) {
							upList.push({
								[this.tl]: item[that.textLabel],
								[this.vl]: item[that.valueLabel],
								[this.dl]: item[that.disabledLabel],
								'n-checked': flag
							})
						} else {
							upList.push({
								[this.tl]: item,
								[this.vl]: item,
								[this.dl]: false,
								'n-checked': flag
							})
						}
					}
				})
				this.updatedItems = upList
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
