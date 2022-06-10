export default {
	data() {
		return {
			// #ifdef APP-NVUE
			nListId: 'head_swiper_list',
			// #endif
			nAllHeight: uni.upx2px(248),
			// #ifndef APP-NVUE
			nChildScrollable: false,
			nParentScrollable: true,
			nParentScrollTop: 0
			// #endif
		}
	},
	methods: {
		// #ifdef APP-NVUE
		nSetScrollRef(ref) {
			ref && ref.setScrollRef(this.nAllHeight)
		},
		// #endif
		nHandleParentScroll(e) {
			// #ifndef APP-NVUE
			const scrollTop = e.detail.scrollTop
			if (scrollTop >= this.nAllHeight - 8) {
				this.nParentScrollable = false
				if (this.nParentScrollTop === this.nAllHeight) {
					this.nParentScrollTop = this.nAllHeight + 0.1
				} else {
					this.nParentScrollTop = this.nAllHeight
				}
				this.nChildScrollable = true
			} else {
				this.nParentScrollable = true
				this.nChildScrollable = false
			}
			// #endif
		},
		// #ifndef APP-NVUE
		nChildTouchMove(downHeight) {
			// console.log("move", downHeight)
			let dh = downHeight
			if (downHeight >= this.nAllHeight) {
				dh = this.nAllHeight
			}
			if (downHeight <= 0) {
				dh = 0
			}
			// console.log(this.parentScrollable, this.childScrollable)
			dh = this.nAllHeight - dh
			// 限制10px移动距离，否则不动
			// 一次性全部打开
			if (downHeight > 10) {
				this.nParentScrollable = true
				this.nChildScrollable = false
				setTimeout(()=>{
					this.nParentScrollTop = 0
				}, 0)
			}
		},
		nChildTouchEnd(downHeight) {
			// console.log("end", downHeight)
		}
		// #endif
	}
}
