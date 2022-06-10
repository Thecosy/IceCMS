export default {
	props: {
		/**
		 * 可以继续加载时的文字提示
		 */
		loadMainText: {
			type: String,
			default: '继续加载更多'
		},
		/**
		 * 正在加载时的文字提示
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
		 * loading的外层样式
		 */
		loadingStyle: {
			type: String,
			default: ''
		},
		/**
		 * 下拉时提示文字
		 */
		refreshMainText: {
			type: String,
			default: '下拉即可刷新...'
		},
		/**
		 * 下拉时提示文字
		 */
		pullingText: {
			type: String,
			default: '释放即可刷新...'
		},
		/**
		 * 正在刷新的提示文字
		 */
		refreshingText: {
			type: String,
			default: '正在努力加载...'
		},
		/**
		 * 刷新组件的外层样式
		 */
		refreshStyle: {
			type: String,
			default: ''
		}
	}
}
