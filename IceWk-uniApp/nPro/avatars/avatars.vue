<template>
	<view :class="['n-flex-row', 'n-align-center', 'n-position-relative']" :style="mrBoxStyle+boxStyle">
		<image v-for="(item,idx) in updatedItems" :key="idx" :src="label?item[label]:item" :style="mrItemStyle(idx)+itemStyle" mode="aspectFill" @click.stop="toItem($event, item)"></image>
	</view>
</template>

<script>
	export default {
		props: {
			items: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			label: {
				type: String,
				default: ''
			},
			reverse: {
				type: Boolean,
				default: false
			},
			size: {
				type: String,
				default: '66rpx'
			},
			space: {
				type: String,
				default: '-16rpx'
			},
			itemStyle: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			inReverse() {
				return this.reverse && parseInt(this.space) < 0
			},
			updatedItems() {
				if (this.inReverse) {
					return this.items.slice().reverse()
				} else {
					return this.items
				}
			},
			sizeNum() {
				return parseInt(this.size)
			},
			spaceNum() {
				return parseInt(this.space)
			},
			spaceUnit() {
				if (this.space.indexOf('rpx') >= 0 || this.space.indexOf('upx') >= 0) {
					return 'rpx'
				}
				return 'px'
			},
			mrBoxStyle() {
				if (this.inReverse) {
					return `width:${(this.sizeNum+this.spaceNum)*this.items.length-this.spaceNum}${this.spaceUnit};height:${this.size};`
				}
				return ''
			}
		},
		methods: {
			mrItemStyle(idx) {
				let style = `width:${this.size};height:${this.size};border-radius:${this.size};`
				if (this.inReverse) {
					style += `position:absolute;right:${idx*(this.sizeNum + this.spaceNum)}${this.spaceUnit};`
				} else {
					style += (idx>0?`margin-left:${this.space};`:'margin-left:0;')
				}
				return style
			},
			toItem(e, val) {
				this.$emit("itemClicked", val)
				e && e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style>
</style>
