<template>
	<loading :class="['n-loading', 'n-flex-'+flex, 'n-align-center', flex==='row'&&'n-justify-center']" @loading="onloading" :display="isLoading ? 'show' : 'hide'" :style="boxStyle">
		<image v-if="hasMore&&isLoading" class="n-loading-img" :src="loadingSrc" mode="aspectFill"></image>
		<text v-if="isLoading || (!hasMore&&showNoMore)" class="n-loading-text">{{loadText}}</text>
		<text v-if="!isLoading&&hasMore" class="n-loading-text">{{mainText}}</text>
	</loading>
</template>

<script>
	/**
	 * loader-n
	 * @description 自定义的加载组件
	 * @property {Number}  maxTime 超时时间，0表示不限制
	 * @property {String} mainText 可以上提时的文字提示
	 * @property {String} loadingText 加载中的文字提示
	 * @property {String} noMoreText 没有更多时的文字提示
	 * @property {Boolean} hasMore 是否还有更多
	 * @property {Boolean} showNoMore 是否展示没有更多
	 * @property {String} loadingSrc 加载中的gif图片
	 * @property {String} flex 内容的布局方式
	 * @property {String} boxStyle 外层样式
	 */
	export default {
		props: {
			/**
			 * 超时时间，0表示不限制
			 */
			maxTime: {
				type: Number,
				default: 0
			},
			/**
			 * 可以上提时的文字提示
			 */
			mainText: {
				type: String,
				default: '继续上拉加载更多'
			},
			/**
			 * 加载中的文字提示
			 */
			loadingText: {
				type: String,
				default: '正在加载'
			},
			/**
			 * 没有更多时的文字提示
			 */
			noMoreText: {
				type: String,
				default: '没有更多啦'
			},
			/**
			 * 是否还有更多
			 */
			hasMore: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否展示没有更多
			 */
			showNoMore: {
				type: Boolean,
				default: true
			},
			/**
			 * 加载中的gif图片
			 */
			loadingSrc: {
				type: String,
				default: '/static/ui/loading-small.gif'
			},
			/**
			 * 内容的布局方式
			 */
			flex: {
				type: String,
				default: 'column'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isLoading: false
			}
		},
		computed: {
			loadText() {
				if (!this.hasMore) {
					return this.noMoreText
				}
				return this.isLoading ? this.loadingText : this.mainText
			}
		},
		methods: {
			// onLoading意味着触发了上提加载，正在请求数据
			onloading(e) {
				// console.log("正在加载")
				this.isLoading = true
				this.$emit("loading")
				if (!this.hasMore) return;
				// this.isLoading = true
				// this.$emit("loading")
				if (this.maxTime <= 0) return;
				this.loadTimeOut && clearTimeout(this.loadTimeOut)
				const that = this
				this.loadTimeOut = setTimeout(()=>{
					that.$emit("timeout")
					that.cancel()
				}, this.maxTime)
			},
			cancel() {
				this.isLoading = false
				this.loadTimeOut && clearTimeout(this.loadTimeOut)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.n-loading {
		width: 750rpx;
		padding: 20rpx;
		height: 120rpx;
		&-img {
			width: 40rpx;
			height: 40rpx;
		}
		&-text {
			font-size: 28rpx;
			color: #666666;
			line-height: 40rpx;
			padding-left: 12rpx;
			padding-right: 12rpx;
		}
	}
</style>
