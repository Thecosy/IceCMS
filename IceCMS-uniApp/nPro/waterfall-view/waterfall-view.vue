<template>
	<view class="n-flex-row n-wrap-nowrap" :style="boxStyle">
		<view :style="{width: leftGap}"></view>
		<view class="n-flex-column n-flex-one">
			<slot name="left" :lefts="leftItems"></slot>
		</view>
		<view :style="{width: columnGap}"></view>
		<view class="n-flex-column n-flex-one">
			<slot name="right" :rights="rightItems"></slot>
		</view>
		<view :style="{width: rightGap}"></view>
	</view>
</template>

<script>
	/**
	* waterfall-view
	* @description vue页面高性能瀑布。支持左右两列.头条小程序不支持作用域插槽,头条小程序直接写
	* @property {String} idLabel item的唯一值键
	* @property {Function} calculator 高度计算方法.不使用自动计算高度的，体验太差.高度难以确定的，根据元素内容预估高度即可.不提供就直接是左右各一个排下去
	* @property {String} columnGap 栏目之间的间距
	* @property {String} leftGap 内容距离左侧的间距
	* @property {String} rightGap 内容距离右侧的间距
	*/
	export default {
		props: {
			/**
			 * item的唯一值键
			 */
			idLabel: {
				type: String,
				default: 'id'
			},
			/**
			 * 高度计算方法.
			 * 不使用自动计算高度的，体验太差.
			 * 高度难以确定的，根据元素内容预估高度即可.
			 * 不提供就直接是左右各一个排下去
			 */
			calculator: {
				type: Function,
				default: null
			},
			/**
			 * 栏目之间的间距
			 */
			columnGap: {
				type: String,
				default: '0'
			},
			/**
			 * 内容距离左侧的间距
			 */
			leftGap: {
				type: String,
				default: '0'
			},
			/**
			 * 内容距离右侧的间距
			 */
			rightGap: {
				type: String,
				default: '0'
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				cached: {},  // 根据id缓存的高度信息
				leftItems: [],
				rightItems: [],
				leftH: 0,
				rightH: 0
			}
		},
		methods: {
			clearCache(id) {
				if (typeof id === 'undefined') {
					delete this.cached['i_'+id]
					return
				}
				this.cached = {}
			},
			clear() {
				this.leftItems = []
				this.rightItems = []
				this.leftH = 0
				this.rightH = 0
			},
			// 重新生成布局
			set(arr) {
				this.toGenerateItems(arr)
			},
			// 追加内容
			concat(arr) {
				this.toGenerateItems(arr)
			},
			// waterfall里面很少涉及移除内容，也不建议
			remove(id) {
				const that = this
				let idx = this.leftItems.findIndex((val)=>{val[that.idLabel] === id})
				if (idx >= 0) {
					this.leftItems.splice(idx, 1)
					const h = this.leftH - (this.cached['i_'+id] || 0)
					delete this.cached['i_'+id]
					this.leftH = h >= 0 ? h : 0
					return
				}
				idx = this.rightItems.findIndex((val)=>{val[that.idLabel] === id})
				if (idx >= 0) {
					this.rightItems.splice(idx, 1)
					const h = this.rightH - (this.cached['i_'+id] || 0)
					delete this.cached['i_'+id]
					this.rightH = h >= 0 ? h : 0
				}
			},
			// 在MP端，哪怕我们直接使用的items里面的对象
			// 在作用域插槽下取得的值也不是那个对象
			// (实际上，MP上哪怕是props传递过去的对象，传过去之后修改某个属性，也不会同步到原对象)
			// 在这里，我们只改变插槽内的内容，外部内容用户自己处理
			// waterfall只用来展示/不对数据进行修改/或者修改之后不影响样式宽高 是比较好的
			modify(id, key, value) {
				const that = this
				let idx = this.leftItems.findIndex((val)=>{val[that.idLabel] === id})
				if (idx >= 0) {
					const theI = this.leftItems[idx]
					theI[key] = value
					return
				}
				idx = this.rightItems.findIndex((val)=>{val[that.idLabel] === id})
				if (idx >= 0) {
					this.rightItems[idx][key] = value
				}
			},
			async toGenerateItems(arr) {
				if (arr.length===0) return;
				if (this.calculator) {
					for (const i in arr) {
						const theI = arr[i]
						const id = theI[this.idLabel]
						let h = 0
						const _cached = this.cached['i_'+id]
						if (!_cached || _cached.h === 0) {
							const _cal = this.calculator(theI)
							h = _cal.h
							this.cached['i_'+id] = _cal
							theI['mH'] = h
							theI['m'] = {..._cal}
						} else {
							h = _cached.h
							theI['mH'] = h
							theI['m'] = {..._cached}
						}
						if (this.leftH <= this.rightH) {
							this.leftItems.push(theI)
							this.leftH += h
						} else {
							this.rightItems.push(theI)
							this.rightH += h
						}
					}
					return
				}
				// 不提供计算器，直接左右左右...
				for (const i in arr) {
					if (this.leftItems.length <= this.rightItems.length) {
						this.leftItems.push(arr[i])
					} else {
						this.rightItems.push(arr[i])
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-water {
		white-space: nowrap;
		
		&-column {
			display: inline;
		}
	}
</style>
