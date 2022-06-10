<template>
	<scroll-view ref="scroll" id="scroll" :scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true" :show-scrollbar="false" :class="['n-bg-'+bgType, 'n-tabs-scroll']" :style="mrScrollStyle">
		<view class="n-tabs" :style="mrTabsStyle">
			<view v-if="hasIndicator&&!hoverTop" :class="['n-tab-item-indicator', 'n-bg-'+(indicatorType&&indicatorType.length>0?indicatorType:'text')]" :style="mrIndStyle">
				<slot name="indicator"></slot>
			</view>
			<view :style="{height: top}"></view>
			<view v-for="(item, index) in items" :key="index" :ref="'item'+index" :id="'item'+index" class="n-flex-row n-align-center" :style="mrItemStyle + (index===value ? activeItemStyle:'')" @click="changeTab(index)">
				<text :class="['n-color-'+(index===value?activeTextType:textType), 'n-size-'+(index===value?activeTextSize:textSize)]" :style="textStyle + (index===value ? activeTextStyle : '')">{{ textLabel ? item[textLabel] : item }}</text>
			</view>
			<view :style="{height: bottom}"></view>
			<view v-if="hasIndicator&&hoverTop" :class="['n-tab-item-indicator', 'n-bg-'+(indicatorType&&indicatorType.length>0?indicatorType:'text')]" :style="mrIndStyle">
				<slot name="indicator"></slot>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	/**
	 * tabs-v
	 * @description 竖向tabs。item有固定高度和动态高度两种
	 * @property {Array} items tabs内容
	 * @property {Number} value 当前index
	 * @property {String} textLabel 文字内容的字段
	 * @property {String} scrollSize scroll的自定义高度
	 * @property {String} justify center或者end的时候，请注意items的数量不要超过总尺寸
	 * @property {String} textSize 文字尺寸主题
	 * @property {String} activeTextSize 当前项文字尺寸主题
	 * @property {String} bgType 背景主题
	 * @property {String} textType 文字颜色主题
	 * @property {String} activeTextType 当前项文字颜色主题
	 * @property {String} height tab项的自定义高度。0的时候，自适应高度
	 * @property {String} width tab项的自定义宽度
	 * @property {String} top 顶部空白占位
	 * @property {String} bottom 底部空白占位
	 * @property {Boolean} hasIndicator 是否有指示器
	 * @property {String} indicatorType 指示器背景主题
	 * @property {String} indicatorWidth 指示器自定义宽度
	 * @property {String} indicatorHeight 指示器自定义高度。0的时候动态高度，自适应高度
	 * @property {String} indicatorRadius 指示器自定义圆角
	 * @property {String} indicatorLeft 指示器与左侧的距离
	 * @property {String} boxStyle 外层样式。也是scroll的样式
	 * @property {String} textStyle 文字样式
	 * @property {String} activeTextStyle 当前项的文字样式
	 * @property {String} itemStyle tab项的样式
	 * @property {String} activeItemStyle 当前tab项的样式
	 * @property {String} indicatorStyle 指示器的样式
	 * @property {Number} updateTime 通过改变该值触发位置的重新计算。主要是为了兼容各大平台位置获取的时机问题。在弹层里面，items能够很快拿到，但是不一定位置信息就可以立马拿到
	 * @property {Number} delay 延迟获取元素内容，只影响mounted里面的调用，-1表示不延迟。其他情况使用updateTime
	 * @property {Number} updateDelay 延迟获取元素内容，只影响items改变时的调用，-1表示不延迟。其他情况使用updateTime
	 * @property {Boolean} indicator是否在最上层
	 */
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom');
	const animation = uni.requireNativePlugin('animation')
	// #endif
	
	export default {
		props: {
			/**
			 * tabs内容
			 */
			items: {
				type: Array,
				default: function() {
					return []
				}
			},
			/**
			 * 当前index
			 */
			value: {
				type: Number,
				default: 0
			},
			/**
			 * 文字内容的字段
			 */
			textLabel: {
				type: String,
				default: null
			},
			/**
			 * scroll的自定义高度
			 */
			scrollSize: {
				type: String,
				default: '750rpx'
			},
			/**
			 * center或者end的时候，请注意items的数量不要超过总尺寸
			 */
			justify: {
				type: String,
				default: 'flex-start'
			},
			/**
			 * 文字尺寸主题
			 */
			textSize: {
				type: String,
				default: ''
			},
			/**
			 * 当前项文字尺寸主题
			 */
			activeTextSize: {
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
			 * 文字颜色主题
			 */
			textType: {
				type: String,
				default: ''
			},
			/**
			 * 当前项文字颜色主题
			 */
			activeTextType: {
				type: String,
				default: ''
			},
			/**
			 * tab项的自定义高度。0的时候，自适应高度
			 */
			height: {
				type: String,
				default: '80rpx'
			},
			/**
			 * tab项的自定义宽度
			 */
			width: {
				type: String,
				default: '120rpx'
			},
			/**
			 * 顶部空白占位
			 */
			top: {
				type: String,
				default: '0'
			},
			/**
			 * 底部空白占位
			 */
			bottom: {
				type: String,
				default: '0'
			},
			/**
			 * 是否有指示器
			 */
			hasIndicator: {
				type: Boolean,
				default: true
			},
			/**
			 * 指示器背景主题
			 */
			indicatorType: {
				type: String,
				default: ''
			},
			/**
			 * 指示器自定义宽度
			 */
			indicatorWidth: {
				type: String,
				default: '5rpx'
			},
			/**
			 * 指示器自定义高度。0的时候动态高度，自适应高度
			 */
			indicatorHeight: {
				type: String,
				default: '40rpx'
			},
			/**
			 * 指示器自定义圆角
			 */
			indicatorRadius: {
				type: String,
				default: '4rpx'
			},
			/**
			 * 指示器与左侧的距离
			 */
			indicatorLeft: {
				type: String,
				default: '6rpx'
			},
			/**
			 * 外层样式。也是scroll的样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 文字样式
			 */
			textStyle: {
				type: String,
				default: ''
			},
			/**
			 * 当前项的文字样式
			 */
			activeTextStyle: {
				type: String,
				default: ''
			},
			/**
			 * tab项的样式
			 */
			itemStyle: {
				type: String,
				default: ''
			},
			/**
			 * 当前tab项的样式
			 */
			activeItemStyle: {
				type: String,
				default: ''
			},
			/**
			 * 指示器的样式
			 */
			indicatorStyle: {
				type: String,
				default: ''
			},
			/**
			 * 通过改变该值触发位置的重新计算。
			 * 主要是为了兼容各大平台位置获取的时机问题。
			 * 在弹层里面，items能够很快拿到，
			 * 但是不一定位置信息就可以立马拿到
			 */
			updateTime: {
				type: Number,
				default: 0
			},
			/**
			 * 延迟获取元素内容，
			 * 只影响mounted里面的调用，
			 * -1表示不延迟。
			 * 其他情况使用updateTime
			 */
			delay: {
				type: Number,
				default: -1
			},
			/**
			 * 延迟获取元素内容，
			 * 只影响items改变时的调用，
			 * -1表示不延迟。
			 * 其他情况使用updateTime
			 */
			updateDelay: {
				type: Number,
				default: -1
			},
			/**
			 * indicator是否在最上层
			 */
			hoverTop: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// px. 动态宽度的item，获取其宽度，为了更好的设置indicator
				dyIndicatorHeight: 0,
				dyIndicatorTop: 0,
				// 缓存宽度信息，为了减少计算
				dyItems: {},
				scrollTop: 0,
				firstTop: 0
			}
		},
		computed: {
			mrIndStyle() {
				let _style = `width:${this.indicatorWidth};border-radius:${this.indicatorRadius};`
				_style += `top:${this.dyIndicatorTop}px;`
				_style += `height:${this.dyIndicatorHeight}px;`
				_style += `left:${this.indicatorLeft};`
				return _style + this.indicatorStyle
			},
			scrollSizePx() {
				if (this.scrollSize.indexOf('rpx') > 0) {
					return uni.upx2px(parseInt(this.scrollSize||0))
				}
				return parseInt(this.scrollSize||0)
			},
			fixedInd() {
				const indH = parseInt(this.indicatorHeight)
				if (indH > 0) {
					return true
				}
				return false
			},
			fixedIndHeight() {
				const indH = parseInt(this.indicatorHeight)
				if (indH > 0) {
					return this.indicatorHeight
				}
				return '0'
			},
			fixedIndHeightPx() {
				const indH = parseInt(this.fixedIndHeight)
				return uni.upx2px(indH)
			},
			mrScrollStyle() {
				let _style = ""
				_style += "height:" + this.scrollSize + ';'
				_style += "width:" + this.width + ';'
				// #ifdef APP-NVUE
				_style += `flex-direction:column;justify-content:${this.justify};`
				// #endif
				return _style + this.boxStyle
			},
			mrTabsStyle() {
				let _style = `flex-direction:column;justify-content:${this.justify};`
				// 只有在column排布的时候center或者end才需要设置高度，而且这个时候注意，内容不要超过实际高度
				if (this.justify === 'center' || this.justify === 'flex-end' || this.justify === 'space-between') {
					_style += "height:" + this.scrollSize + ';'
				}
				return _style
			},
			mrItemStyle() {
				let _style = `width:${this.width};`
				const h = parseInt(this.height)
				if (h > 0) {
					_style += `height:${this.height};`
				}
				return _style + this.itemStyle
			}
		},
		mounted() {
			if (this.delay >= 0) {
				const that = this
				setTimeout(()=>{
					that.toCurrentIndex(that.value)
					that.toCacheItemsSize()
				}, this.delay)
			} else {
				this.toCurrentIndex(this.value)
				this.toCacheItemsSize()
			}
		},
		watch: {
			value(newV) {
				this.toCurrentIndex(newV)
			},
			items() {
				// 清缓存
				this.dyItems = {}
				const that = this
				this.$nextTick(function(){
					if (that.updateDelay >= 0) {
						setTimeout(()=>{
							that.toCacheItemsSize()
							that.toCurrentIndex(that.value)
						}, that.updateDelay)
					} else {
						that.toCacheItemsSize()
						that.toCurrentIndex(that.value)
					}
				})
			},
			updateTime() {
				this.dyItems = {}
				this.toCacheItemsSize()
				this.toCurrentIndex(this.value)
			}
		},
		methods: {
			changeTab(index, animated = true) {
				this.$emit('change', index)
			},
			async toCurrentIndex(index) {
				let nowHeight = 0
				let _top = 0
				let indHeight = 0
				let indTop = 0
				let scrollT = 0
				const cachedScroll = this.dyItems['scroll']
				if (cachedScroll) {
					scrollT = cachedScroll.top
				} else {
					try{
						const res = await this.getElSize(-100)
						scrollT = res.top
						this.dyItems['scroll'] = {top: scrollT}
					}catch(e){
						//TODO handle the exception
					}
				}
				const cached = this.dyItems['item'+index]
				if (cached) {
					_top = cached.top
					nowHeight = cached.height
					indHeight = cached.ind
					indTop = cached.indTop
				} else {
					try{
						const result = await this.getElSize(index)
						_top = result.top - scrollT
						nowHeight = result.height
						if (this.fixedInd) {
							indHeight = this.fixedIndHeightPx
						} else {
							indHeight = nowHeight
						}
						indTop = _top + (nowHeight - indHeight) * 0.5
						// into cache
						this.dyItems['item'+index] = {height: nowHeight, top: _top, ind: indHeight, indTop: indTop}
					}catch(e){
						//TODO handle the exception
					}
				}
				const _height = _top + nowHeight
				// 移动indicator
				this.dyIndicatorHeight = indHeight
				this.dyIndicatorTop = indTop
				// 居中
				const scrollHeight = this.scrollSizePx
				const offset = _height - nowHeight / 2 - scrollHeight / 2
				if (offset > 0) {
					// #ifdef APP-NVUE
					const refName = "item" + index
					const el = this.$refs[refName][0]
					dom.scrollToElement(el, {
						offset: -0.5 * scrollHeight + nowHeight * 0.5,
						animated: true
					})
					// #endif
					// #ifndef APP-NVUE
					this.scrollTop = offset
					// #endif
				} else {
					if (this.scrollTop === 0) {
						this.scrollTop = 0.1
					} else {
						this.scrollTop = 0;
					}
				}
			},
			async toCacheItemsSize() {
				let scrollT = 0
				try{
					const res = await this.getElSize(-100)
					scrollT = res.top
					this.dyItems['scroll'] = {top: scrollT}
				}catch(e){
					//TODO handle the exception
				}
				for (const i in this.items) {
					try{
						const result = await this.getElSize(i)
						let indHeight = result.height
						if (this.fixedInd) {
							indHeight = this.fixedIndHeightPx
						}
						const top = result.top - scrollT
						this.dyItems['item'+i] = {height:result.height, top: top, ind: indHeight, indTop: top+(result.height-indHeight)*0.5}
					}catch(e){
						//TODO handle the exception
					}
				}
			},
			getElSize(index) {
				return new Promise((res, rej) => {
					// #ifndef APP-NVUE
					let idName = '#item' + index
					if (index===-100) {
						idName = "#scroll"
					}
					const el = uni.createSelectorQuery().in(this).select(idName)
					el.fields({
						size: true,
						rect: true
					}, (data) => {
						if (data) {
							res(data);
						} else {
							rej({})
						}
					}).exec();
					// #endif
					// #ifdef APP-NVUE
					let refName = "item" + index
					let _el = null
					if(index===-100) {
						_el = this.$refs["scroll"]
					} else {
						_el = this.$refs[refName][0]
					}
					dom.getComponentRect(_el, (data) => {
						if (data.result) {
							res(data.size)
						} else {
							rej({})
						}
					})
					// #endif
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	/* #ifndef APP-NVUE */
	.n-tabs-scroll ::-webkit-scrollbar {
	    display: none;
	    width: 0 !important;
	    height: 0 !important;
	    -webkit-appearance: none;
	    background: transparent;
	}
	/* #endif */
	
	.n-tabs {
		position: relative;
	}
	.n-tab-item {
		&-indicator {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 0;
			height: 0;
			overflow: hidden;
			transition-property: height, top;
			transition-duration: 200ms;
			transition-timing-function: ease;
		}
	}
</style>
