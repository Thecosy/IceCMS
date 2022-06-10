<template>
	<scroll-view ref="scroll" id="scroll" :scroll-x="true" :scroll-left="scrollLeft" :scroll-with-animation="true" :show-scrollbar="false" :class="['n-bg-'+bgType, 'n-border-'+border, 'n-flex-row', 'n-tabs-scroll']" :style="mrScrollStyle">
		<view class="n-flex-column n-position-relative">
			<view v-if="hasIndicator&&!hoverTop" ref="n-underline" :class="[absIndicator&&'n-tab-item-underline', 'n-bg-'+indicatorType, isTap?'n-tab-item-animation':'']" :style="mrIndStyle">
				<slot name="indicator"></slot>
			</view>
			<view :class="['n-flex-row', 'n-justify-'+justify, 'n-wrap-nowrap']" :style="mrTabsStyle">
				<view :style="{width: left}"></view>
				<view v-for="(item, index) in items" :key="index" :ref="'item'+index" :id="'item'+index" class="n-flex-column n-justify-center n-align-center n-position-relative" :style="mrItemStyle + (index===value ? activeItemStyle:'') + (index===items.length-1?'margin-right:0;':'')" @click="changeTab(index)">
					<text :class="['n-color-'+(index===value?activeTextType:textType), 'n-size-'+(index===value?activeTextSize:textSize)]" :style="textStyle + (index===value ? activeTextStyle : '')">{{ textLabel ? item[textLabel] : item }}</text>
					<n-badge v-if="item.badge" :size="item.badge.size||badgeConfig.size||'12rpx'" :bgType="item.badge.bgType||badgeConfig.bgType||'error'" :text="item.badge.text||''" :border="item.badge.border||badgeConfig.border||'none'" :textType="item.badge.textType||badgeConfig.textType||'inverse'" :textSize="item.badge.textSize||badgeConfig.textSize||'ss'" :textStyle="item.badge.textStyle||badgeConfig.textStyle||''" :boxStyle="item.badge.boxStyle||badgeConfig.boxStyle||''"></n-badge>
				</view>
				<view :style="{width: right}"></view>
			</view>
			<view v-if="hasIndicator&&hoverTop" ref="n-underline" :class="[absIndicator&&'n-tab-item-underline', 'n-bg-'+indicatorType, isTap?'n-tab-item-animation':'']" :style="mrIndStyle">
				<slot name="indicator"></slot>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	/**
	 * tabs-h
	 * @description 横向tabs。item/indicator有固定宽度和动态宽度两种
	 * @property {Array} items tabs内容
	 * @property {Number} value 当前index
	 * @property {Number} last 联动时需要。因为scroll的过程中，current就会发生变化，我们需要用另外一个来记录
	 * @property {String} textLabel 文字内容的字段
	 * @property {Number} offset 联动时swiper的偏移量。px. swiperScroll dx
	 * @property {String} swiperWidth swiper的宽度。联动时需要
	 * @property {Boolean} isTap 是否是点击tab。不联动时一直设置为true
	 * @property {String} justify center或者end的时候，请注意items的数量不要超过总尺寸
	 * @property {String} scrollSize scroll的自定义宽度
	 * @property {String} textSize 文字的尺寸主题
	 * @property {String} activeTextSize 当前项文字的尺寸主题
	 * @property {String} bgType 背景主题
	 * @property {String} textType 文字颜色主题
	 * @property {String} activeTextType 当前项的文字颜色主题
	 * @property {String} height 自定义高度
	 * @property {String} width tab项的宽度。0的时候，自适应宽度
	 * @property {String} left 左侧空白占位
	 * @property {String} right 右侧空白占位
	 * @property {String} space 各个tab之间的间隙
	 * @property {String} border 边框主题
	 * @property {Boolean} hasIndicator 是否有底下指示器
	 * @property {String} indicatorType 指示器的背景主题
	 * @property {String} indicatorWidth 指示器的自定义宽度。0的时候动态宽度，自适应宽度
	 * @property {String} indicatorHeight 指示器的自定义高度
	 * @property {String} indicatorRadius 指示器的自定义圆角
	 * @property {Boolean} absIndicator indicator是否绝对定位
	 * @property {String} absIndicator indicator是否绝对定位
	 * @property {String} boxStyle 外层样式，也是scroll的样式
	 * @property {String} tabsStyle tabs的内容样式
	 * @property {String} textStyle 文字样式
	 * @property {String} activeTextStyle 当前项的文字样式
	 * @property {String} itemStyle tab项的样式
	 * @property {String} activeItemStyle 当前项的tab样式
	 * @property {String} indicatorStyle 指示器的样式
	 * @property {Number} updateTime 通过改变该值触发位置的重新计算。主要是为了兼容各大平台位置获取的时机问题。在弹层里面，items能够很快拿到，但是不一定位置信息就可以立马拿到
	 * @property {Number} delay 延迟获取元素内容，只影响mounted里面的调用，-1表示不延迟。其他情况使用updateTime
	 * @property {Number} updateDelay 延迟获取元素内容，只影响items改变时的调用，-1表示不延迟。其他情况使用updateTime
	 * @property {Boolean} hoverTop indicator是否在最上层
	 */
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom');
	const animation = uni.requireNativePlugin('animation')
	// #endif
	import {getPx} from '../utils/system.js'
	
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
			 * 联动时需要。因为scroll的过程中，current就会发生变化，
			 * 我们需要用另外一个来记录
			 */
			last: {
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
			 * 联动时swiper的偏移量。px. swiperScroll dx
			 */
			offset: {
				type: Number,
				default: 0
			},
			/**
			 * swiper的宽度。联动时需要
			 */
			swiperWidth: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 是否是点击tab。不联动时一直设置为true
			 */
			isTap: {
				type: Boolean,
				default: false
			},
			/**
			 * justify主题。center或者end的时候，请注意items的数量不要超过总尺寸
			 */
			justify: {
				type: String,
				default: 'start'
			},
			/**
			 * scroll的自定义宽度
			 */
			scrollSize: {
				type: String,
				default: '750rpx'
			},
			/**
			 * 文字的尺寸主题
			 */
			textSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 当前项文字的尺寸主题
			 */
			activeTextSize: {
				type: String,
				default: 'base'
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: 'inverse'
			},
			/**
			 * 文字颜色主题
			 */
			textType: {
				type: String,
				default: ''
			},
			/**
			 * 当前项的文字颜色主题
			 */
			activeTextType: {
				type: String,
				default: ''
			},
			/**
			 * 自定义高度
			 */
			height: {
				type: String,
				default: '80rpx'
			},
			/**
			 * tab项的宽度。0的时候，自适应宽度
			 */
			width: {
				type: String,
				default: '120rpx'
			},
			/**
			 * 左侧空白占位
			 */
			left: {
				type: String,
				default: '0'
			},
			/**
			 * 右侧空白占位
			 */
			right: {
				type: String,
				default: '0'
			},
			/**
			 * 各个tab之间的间隙
			 */
			space: {
				type: String,
				default: '0px'
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: ''
			},
			/**
			 * badge配置信息
			 */
			badgeConfig: {
				type: Object,
				default: ()=>{
					return {}
				}
			},
			/**
			 * 是否有底下指示器
			 */
			hasIndicator: {
				type: Boolean,
				default: true
			},
			/**
			 * 指示器的背景主题
			 */
			indicatorType: {
				type: String,
				default: 'primary'
			},
			/**
			 * 指示器的自定义宽度。0的时候动态宽度，自适应宽度
			 */
			indicatorWidth: {
				type: String,
				default: '80rpx'
			},
			/**
			 * 指示器的自定义高度
			 */
			indicatorHeight: {
				type: String,
				default: '5rpx'
			},
			/**
			 * 指示器的自定义圆角
			 */
			indicatorRadius: {
				type: String,
				default: '4rpx'
			},
			/**
			 * indicator是否绝对定位
			 */
			absIndicator: {
				type: Boolean,
				default: true
			},
			/**
			 * 外层样式，也是scroll的样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * tabs的内容样式
			 */
			tabsStyle: {
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
			 * 当前项的tab样式
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
				// px.为了更好的设置indicator
				dyIndicatorWidth: 0,
				dyIndicatorLeft: 0,
				// 缓存宽度信息，为了减少计算
				dyItems: {},
				scrollLeft: 0,
				timer: null
			}
		},
		computed: {
			mrIndStyle() {
				let _style = `border-radius:${this.indicatorRadius};`
				_style += `height:${this.indicatorHeight};`
				// #ifndef APP-NVUE
				_style += `width:${this.dyIndicatorWidth}px;`
				_style += `left:${this.dyIndicatorLeft}px;`
				// #endif
				return _style + this.indicatorStyle
			},
			spacePx() {
				return getPx(this.space)
			},
			scrollSizePx() {
				return getPx(this.scrollSize)
			},
			widthPx() {
				return getPx(this.width)
			},
			heightPx() {
				return getPx(this.height)
			},
			fixedInd() {
				const indW = parseInt(this.indicatorWidth)
				if (indW > 0) {
					return true
				}
				const iw = parseInt(this.width)
				if (iw > 0) {
					return true
				}
				return false
			},
			fixedIndWidth() {
				const indW = parseInt(this.indicatorWidth)
				if (indW > 0) {
					return this.indicatorWidth
				}
				const iw = parseInt(this.width)
				if (iw > 0) {
					return this.width
				}
				return '0'
			},
			fixedIndWidthPx() {
				return getPx(this.fixedIndWidth)
			},
			mrScrollStyle() {
				return "width:" + this.scrollSizePx + 'px;' + this.boxStyle
			},
			mrTabsStyle() {
				let _style = ''
				if (this.justify != 'start') {
					_style += "width:" + this.scrollSizePx + 'px;'
				}
				return _style + this.tabsStyle
			},
			mrItemStyle() {
				let _style = `height:${this.heightPx}px;`
				const w = parseInt(this.width)
				if (w > 0) {
					_style += `width:${this.widthPx}px;margin-right:${this.spacePx}px;`
				} else {
					_style += `margin-right:${this.spacePx}px;`
				}
				return _style + this.itemStyle
			},
			swiperWidthPx() {
				return getPx(this.swiperWidth)
			}
		},
		mounted() {
			if (this.delay >= 0) {
				const that = this
				setTimeout(()=>{
					that.toCacheItemsSize()
					that.toCurrentIndex(that.value, true)
				}, this.delay)
			} else {
				this.toCacheItemsSize()
				this.toCurrentIndex(this.value, true)
			}
		},
		watch: {
			value(newV) {
				// #ifdef APP-NVUE
				this.toCurrentIndex(newV)
				// #endif
				// #ifndef APP-NVUE
				// 否则在点击过程中可能响应不正确
				this.timer && clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.toCurrentIndex(newV)
					this.timer = null
				}, 0)
				// #endif
			},
			items() {
				// 清缓存
				this.dyItems = {}
				const that = this
				this.$nextTick(()=>{
					if (that.updateDelay >= 0) {
						setTimeout(()=>{
							that.toCacheItemsSize()
							that.toCurrentIndex(this.value, true)
						}, that.updateDelay)
					} else {
						that.toCacheItemsSize()
						that.toCurrentIndex(this.value, true)
					}
				})
			},
			offset(newV) {
				this.toHandleSwiperScroll(newV)
			},
			updateTime() {
				this.dyItems = {}
				this.toCacheItemsSize()
				this.toCurrentIndex(this.value, true)
			}
		},
		methods: {
			changeTab(index) {
				this.$emit('change', index)
			},
			async toCurrentIndex(index, isInit=false) {
				let nowWidth = 0
				let _left = 0
				let indWidth = 0
				let indLeft = 0
				let scrollL = 0
				// first to get scroll position
				const cachedScroll = this.dyItems['scroll']
				if (cachedScroll) {
					scrollL = cachedScroll.left
				} else {
					try{
						const res = await this.getElSize(-100)
						scrollL = res.left
						this.dyItems['scroll'] = {left: scrollL}
					}catch(e){
						//TODO handle the exception
					}
				}
				const cached = this.dyItems['item'+index]
				if (cached) {
					_left = cached.left
					nowWidth = cached.width
					indWidth = cached.ind
					indLeft = cached.indLeft
				} else {
					try{
						const result = await this.getElSize(index)
						_left = result.left - scrollL
						nowWidth = result.width
						if (this.fixedInd) {
							indWidth = this.fixedIndWidthPx
						} else {
							indWidth = nowWidth
						}
						indLeft = _left + (nowWidth - indWidth) * 0.5
						// into cache
						this.dyItems['item'+index] = {width: nowWidth, left: _left, ind: indWidth, indLeft: indLeft}
					}catch(e){
						//TODO handle the exception
					}
				}
				const _width = _left + nowWidth + this.spacePx
				// 移动indicator
				this.dyIndicatorWidth = indWidth
				this.dyIndicatorLeft = indLeft
				// #ifdef APP-NVUE
				const indEl = this.$refs['n-underline']
				if (isInit) {
					// ios下刚打开时发现总是靠最左侧。去掉duration就好了
					animation.transition(indEl, {
						styles: {
							width: `${this.dyIndicatorWidth}px`,
							transform: `translateX(${this.dyIndicatorLeft}px)`
						},
						duration: 0
					})
				} else {
					animation.transition(indEl, {
						styles: {
							width: `${this.dyIndicatorWidth}px`,
							transform: `translateX(${this.dyIndicatorLeft}px)`
						},
						duration: 200
					})
				}
				// #endif
				// 居中当前item
				const scrollWidth = this.scrollSizePx
				const offset = _width - (nowWidth / 2 + this.spacePx) - scrollWidth / 2
				if (offset > 0) {
					// app端scrollTo会导致右边已经不足以居中的时候也居中，需要额外判断右边剩下的长度
					// 我们这里采用dom.scrollToElement. dom.scrollToElement是滑动到最左侧
					// #ifdef APP-NVUE
					const refName = "item" + index
					const el = this.$refs[refName][0]
					dom.scrollToElement(el, {
						offset: -0.5 * scrollWidth + nowWidth * 0.5,
						animated: true
					})
					// #endif
					// #ifndef APP-NVUE
					this.scrollLeft = offset;
					// #endif
				} else {
					if (this.scrollLeft === 0) {
						this.scrollLeft = 0.1
					} else {
						this.scrollLeft = 0;
					}
				}
			},
			async toHandleSwiperScroll(dx) {
				// 在mp-wx里面scroll的过程中，实际上也会引起current的变化，所以不能通过this.value来获取当前的tab
				// const nowIndex = this.value
				const nowIndex = this.last
				let nextIndex = nowIndex
				// 至少 1px 才做判断
				if (dx > -1 && dx < 1) return;
				if (dx > 0) {
					nextIndex += 1
				} else if (dx < 0) {
					nextIndex -= 1
				}
				const pg = Math.abs(this.swiperWidthPx / dx)
				if (nextIndex>=this.items.length || nextIndex < 0 || nowIndex === nextIndex) {
					return
				}
				const theItem = this.dyItems['item'+nowIndex]
				const nextItem = this.dyItems['item'+nextIndex]
				
				this.dyIndicatorLeft = theItem.indLeft + (nextItem.indLeft - theItem.indLeft) / pg
				this.dyIndicatorWidth = theItem.ind + (nextItem.ind - theItem.ind) / pg
				
				// #ifdef APP-NVUE
				const indEl = this.$refs['n-underline']
				animation.transition(indEl, {
					styles: {
						width: `${this.dyIndicatorWidth}px`,
						transform: `translateX(${this.dyIndicatorLeft}px)`
					}
				})
				// #endif
			},
			async toCacheItemsSize() {
				let scrollL = 0
				try{
					const res = await this.getElSize(-100)
					scrollL = res.left
					this.dyItems['scroll'] = {left: scrollL}
				}catch(e){
					//TODO handle the exception
				}
				for (const i in this.items) {
					try{
						const result = await this.getElSize(i)
						let indWidth = result.width
						if (this.fixedInd) {
							indWidth = this.fixedIndWidthPx
						}
						this.dyItems['item'+i] = {width:result.width, left: result.left-scrollL, ind: indWidth, indLeft: result.left-scrollL+(result.width-indWidth)*0.5}
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
		color: transparent;
	    -webkit-appearance: none;
	    background: transparent;
	}
	/* #endif */
	
	.n-tab-item {
		&-underline {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 0;
		}
		&-animation {
			/* #ifndef APP-NVUE */
			transition-property: left, width;
			transition-duration: 0.2s;
			transition-timing-function: ease;
			/* #endif */
		}
		&-noani {
			transition-duration: 0s;
		}
	}
</style>
