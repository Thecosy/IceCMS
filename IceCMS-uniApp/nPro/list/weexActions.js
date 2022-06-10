export default {
	methods: {
		// #ifdef APP-NVUE
		nResetLoadmore() {
			this.$refs['n-scroller'].resetLoadmore()
		},
		nScroll(e) {
			this.$emit("scroll", e)
		},
		nMoreLoad() {
			if (!this.nUp.use) {
				return
			}
			if (this.useLoading) {
				return
			}
			this.nLoad()
		},
		nRefresh() {
			this.nPrePage = this.nCurrentPage
			this.nCurrentPage = 1
			if (this.nDown.use) {
				this.nIsDownLoading = true
			}
			this.nGetContentList('refresh')
		},
		nLoad() {
			if (!this.nUp.use) return;
			if (this.nIsDownLoading) {
				if (this.platform === 'ios') {
					this.$refs['n-loader'] && this.$refs['n-loader'].cancel()
					return
				}
				const that = this
				setTimeout(()=>{
					that.$refs['n-loader'] && that.$refs['n-loader'].cancel()
				}, 0)
				return
			}
			if (this.nIsUpLoading) {
				return
			}
			if (!this.nHasMore) {
				if (this.platform === 'ios') {
					this.$refs['n-loader'] && this.$refs['n-loader'].cancel()
					return
				}
				const that = this
				setTimeout(()=>{
					that.$refs['n-loader'] && that.$refs['n-loader'].cancel()
				}, 0)
				return
			}
			this.nPrePage = this.nCurrentPage
			this.nCurrentPage += 1
			
			if (this.nUp.use) {
				this.nIsUpLoading = true
			}
			this.nGetContentList('load')
		},
		nReload() {
			if (!this.nUp.use) return;
			if (this.nIsDownLoading) {
				if (this.platform === 'ios') {
					this.$refs['n-loader'] && this.$refs['n-loader'].cancel()
					return
				}
				const that = this
				setTimeout(()=>{
					that.$refs['n-loader'] && that.$refs['n-loader'].cancel()
				}, 0)
				return
			}
			if (this.nIsUpLoading) {
				return
			}
			this.nPrePage = this.nCurrentPage
			this.nCurrentPage = 1
			
			if (this.nUp.use) {
				this.nIsUpLoading = true
			}
			this.nGetContentList('load')
		},
		// default has no more
		// ref method: call when refresh/load success
		nEndSuccess(hasMore=false) {
			this.nHasMore = hasMore
			if (this.nIsDownLoading) {
				this.$refs['n-refresher'] && this.$refs['n-refresher'].cancel()
				this.nIsDownLoading = false
				// 重置 loadMore 
				this.nResetLoadmore()
			}
			if (this.nIsUpLoading) {
				this.$refs['n-loader'] && this.$refs['n-loader'].cancel()
				this.nIsUpLoading = false
				// 重置 loadMore
				// this.nResetLoadmore()
			}
		},
		// ref method: call when refresh/load fail
		nEndError() {
			this.nCurrentPage = this.nPrePage
			if (this.nIsDownLoading) {
				this.$refs['n-refresher'] && this.$refs['n-refresher'].cancel()
				this.nIsDownLoading = false
			}
			if (this.nIsUpLoading) {
				this.$refs['n-loader'] && this.$refs['n-loader'].cancel()
				this.nIsUpLoading = false
			}
		},
		nInitContentList() {
			this.nPrePage = 0
			this.nCurrentPage = 1
			if (this.nDown.use) {
				this.nIsDownLoading = true
				this.nGetContentList('refresh')
			} else {
				if (this.nUp.use) {
					this.nIsUpLoading = true
					this.nGetContentList('load')
				}
			}
		},
		nGetContentList(type='refresh') {
			if (type === 'refresh') {
				this.$emit('down')
			} else {
				this.$emit('up')
			}
		}
		// #endif
	}
}
