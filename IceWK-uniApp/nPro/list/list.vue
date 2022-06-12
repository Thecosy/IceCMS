<template>
	<!-- #ifndef APP-NVUE -->
	<scroll-view :scroll-into-view="nCurrentView" :scroll-top="nScrollTop" :scroll-with-animation="true" :class="['n-bg-'+bgType, reverse&&'n-list-reverse']" :style="mrBoxStyle" :scroll-y="nScrollable" :show-scrollbar="showScrollbar" :enable-back-to-top="true" @scroll="nScroll" @touchstart="nTouchstartEvent" @touchmove="nTouchmoveEvent" @touchend="nTouchendEvent" @touchcancel="nTouchendEvent">
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<list :class="['n-flex-one', 'n-bg-'+bgType, reverse&&'n-list-reverse']" :style="mrBoxStyle" :ref="refName" :scrollable="scrollable" :show-scrollbar="showScrollbar" :loadmoreoffset="(nUp.use&&!useLoading)?loadMoreOffset:0" @loadmore="nMoreLoad" @scroll="nScroll">
		<n-refresher-n v-if="nDown.use" ref="n-refresher" :scrollRef="refName" :mainText="refreshMainText" :pullingText="pullingText" :refreshingText="refreshingText" :boxStyle="(reverse?'transform: rotateX(180deg);':'')+refreshStyle" @refresh="nRefresh"></n-refresher-n>
		<cell>
			<view ref="n-list-top"></view>
		</cell>
		<slot></slot>
		<cell>
			<slot name="token"></slot>
		</cell>
		<cell>
			<view ref="n-list-bottom"></view>
		</cell>
		<!-- in android, we must put loading in the last, or it will not trigger loading next page. --> 
		<!-- it's the same in loadMore with loadMoreOffset -->
		<cell v-if="nUp.use&&!useLoading">
			<n-loader :isLoading="nIsUpLoading" :hasMore="nHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="(reverse?'transform: rotateX(180deg);':'')+loadingStyle"></n-loader>
		</cell>
		<n-loader-n v-if="nUp.use&&useLoading" ref="n-loader" :hasMore="nHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="(reverse?'transform: rotateX(180deg);':'')+loadingStyle" @loading="nLoad"></n-loader-n>
	</list>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
		<view :style="nMrScrollContentStyle">
			<view v-if="nDown.use" :style="nMrRefreshStyle">
				<n-refresher :refreshing="nIsDownLoading" :couldUnLash="nCouldUnLash" :rate="nDownRate" :mainText="refreshMainText" :pullingText="pullingText" :refreshingText="refreshingText" :boxStyle="(reverse?'transform: rotateX(180deg);':'')+refreshStyle"></n-refresher>
			</view>
			<view id="n-list-top" ref="n-list-top"></view>
			<!-- content of scroll -->
			<slot></slot>
			<view><slot name="token"></slot></view>
			<view id="n-list-bottom" ref="n-list-bottom"></view>
			<n-loader v-if="nUp.use" :isLoading="nIsUpLoading" :hasMore="nHasMore" :showNoMore="showNoMore" :mainText="loadMainText" :loadingText="loadingText" :noMoreText="noMoreText" :loadingSrc="loadingSrc" :boxStyle="(reverse?'transform: rotateX(180deg);':'')+loadingStyle"></n-loader>
		</view>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	import styleMixin from './styleMixin.js'
	import refreshLoadCustom from './custom.js'
	import scrollMixin from './mixin.js'
	import weexActions from './weexActions.js'
	import {getPlatform} from '../utils/system.js'
	
	/**
	 * list
	 * @description 滚动列表
	 * @property {String} refName 自定义ref
	 * @property {Boolean} useLoading 是否启用loading组件，而不是loadmoreoffset触发
	 * @property {Number} loadMoreOffset 使用loadmoreoffset时的触发偏移量
	 * @property {Boolean} autoUpdate 是否自动加载第一页数据
	 * @property {Object} down 上提加载的配置
	 * @property {Object} up 上提加载的配置
	 */
	export default {
		mixins: [styleMixin, refreshLoadCustom, scrollMixin, weexActions],
		props: {
			/**
			 * 是否允许滚动
			 */
			scrollable: {
				type: Boolean,
				default: true
			},
			/**
			 * 自定义ref
			 */
			refName: {
				type: String,
				default: 'n-scroller'
			},
			// #ifdef APP-NVUE
			/**
			 * 是否启用loading组件，而不是loadmoreoffset触发
			 */
			useLoading: {
				type: Boolean,
				default: false
			},
			/**
			 * 使用loadmoreoffset时的触发偏移量
			 */
			loadMoreOffset: {
				type: Number,
				default: 60
			},
			// #endif
			/**
			 * 是否自动加载第一页数据
			 */
			autoUpdate: {
				type: Boolean,
				default: false
			},
			/**
			 * 下拉刷新的配置
			 */
			down: {
				type: Object,
				default: ()=>{
					return {
						use: true,
						offset: uni.upx2px(140),
						inRate: 0.8,
						outRate: 0.2
					}
				}
			},
			/**
			 * 上提加载的配置
			 */
			up: {
				type: Object,
				default: ()=>{
					return {
						use: true,
						offset: 80
					}
				}
			}
		},
		created() {
			// config the down/up
			// #ifndef APP-NVUE
			this.nDown = Object.assign({use: true,offset: uni.upx2px(140),inRate: 0.8,outRate: 0.2}, this.down||{use:false})
			this.nUp = Object.assign({use: true,offset: 80}, this.up||{use:false})
			this.nScrollable = this.scrollable
			// #endif
			// #ifdef APP-NVUE
			this.nDown = Object.assign(this.down||{use:false})
			this.nUp = Object.assign(this.up||{use:false})
			this.platform = getPlatform()
			// #endif
			// emit this 会在mp端报错，且不建议
			// this.$emit("inited", this)
			// 注意：如果直接emit，外部监听到inited的时候，还不能通过ref获取到实例
			// this.$emit("inited")
			setTimeout(()=>{
				this.$emit("inited")
			}, 0)
			if (this.autoUpdate) {
				const that = this
				setTimeout(() => {
					// to refresh data
					this.nInitContentList()
				}, 10)
			}
		},
		watch: {
			// #ifndef APP-NVUE
			scrollable(newV) {
				this.nScrollable = newV
			}
			// #endif
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.n-list {
		&-reverse {
			transform: rotateX(180deg);
		}
	}
</style>
