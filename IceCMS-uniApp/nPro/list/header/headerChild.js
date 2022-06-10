// #ifndef APP-NVUE
import {getTouchPoint} from '../../utils/element.js'
// #endif

export default {
	props: {
		// #ifdef APP-NVUE
		parentId: {
		    type: String,
		    default: ''
		},
		// #endif
		// #ifndef APP-NVUE
		scrollable: {
			type: Boolean,
			default: false
		},
		// #endif
		current: {
			type: Number,
			default: 0
		},
		index: {
			type: Number,
			default: 0
		},
		refName: {
			type: String,
			default: 'n-list'
		}
	},
	data() {
		return {
			nInited: false,
			nCurrentPage: 0,
			nHasMore: true,
			nIsDownLoading: false,
			nIsUpLoading: false,
			// #ifndef APP-NVUE
			nStartPoint: null,
			nLastPoint: null,
			nFps: 40,
			nMoveTime: 0,
			nMoveTimeDiff: 0,
			nDownHeight: 0,
			nScrollTopDeviation: 100,
			nTheScrollTop: 0
			// #endif
		}
	},
	created() {
		const that = this
		if (this.index === this.current && !this.nInited) {
			setTimeout(()=>{
				that.nInited = true
				that.toRefresh()
			}, 30)
		}
		// 非app端swiper里面ref获取不到，采用互相通信
		// #ifndef APP-NVUE
		uni.$on("swiperScrollRefresh", ()=>{
			that.toRefresh()
		})
		// #endif
	},
	destroyed() {
		uni.$off("swiperScrollRefresh")
	},
	watch: {
		current(newV) {
			if (newV === this.index && !this.nInited) {
				this.nInited = true
				this.toRefresh()
			}
		}
	},
	methods: {
		// #ifdef APP-NVUE
		setScrollRef(height) {
		    if (this.$refs[this.refName].setSpecialEffects) {
		        this.$refs[this.refName].setSpecialEffects({
		            id: this.parentId,
		            headerHeight: height
		        })
		    }
		},
		nResetLoadmore() {
			const ins = this.$refs[this.refName]
			ins.resetLoadmore()
		},
		// #endif
		toRefresh(ref, sucH,  failH) {
			// u must override it to do your refresh logic
		},
		nStart(val) {
			// 加载数据之前的前置设置
			let cp = 1
			if (val === 'refresh') {
				cp = 1
			} else {
				cp = this.nCurrentPage + 1
			}
			if (cp > 1 && !this.nHasMore) {
				this.nIsUpLoading = false
				return false
			}
			if (cp === 1) {
				this.nIsDownLoading = true
			} else {
				this.nIsUpLoading = true
			}
			return cp
		},
		nEndSuccess(cp, hasMore, ref, sucH) {
			// 数据加载成功
			this.nCurrentPage = cp
			this.nHasMore = hasMore || false
			if (cp === 1) {
				ref && sucH && sucH(ref)
				// #ifndef APP-NVUE
				uni.$emit("swiperScrollRefreshSuc")
				// #endif
				this.nIsDownLoading = false
				// #ifdef APP-NVUE
				this.nResetLoadmore()
				// #endif
			} else {
				this.nIsUpLoading = false
			}
		},
		nEndError(cp, ref, failH) {
			// 数据加载失败
			if (cp === 1) {
				ref && failH && failH(ref)
				// #ifndef APP-NVUE
				uni.$emit("swiperScrollRefreshErr")
				// #endif
				this.nIsDownLoading = false
			} else {
				this.nIsUpLoading = false
			}
		},
		// #ifndef APP-NVUE
		nOnTouchStart(e) {
			if (!this.scrollable) return;
			this.nStartPoint = getTouchPoint(e)
			this.nStartTop = this.nTheScrollTop || 0
			this.nLastPoint = this.nStartPoint
			this.nInTouchend = false
		},
		nOnTouchMove(e) {
			if (!this.scrollable) return;
			if (!this.nStartPoint) return;
			const t = new Date().getTime();
			if (this.nMoveTime && t - this.nMoveTime < this.nMoveTimeDiff) {
				return;
			} else {
				this.nMoveTime = t
				this.nMoveTimeDiff = 1000 / this.nFps
			}
			const scrollTop = this.nTheScrollTop
			const currentPoint = getTouchPoint(e)
			const moveY = currentPoint.y - this.nStartPoint.y
			// console.log(scrollTop)
			// 往下拉
			if (moveY > 0 && !this.nInTouchend && (scrollTop <= 0 || (scrollTop <= this.nScrollTopDeviation && scrollTop === this.nStartTop))) {
				const diff = currentPoint.y - this.nLastPoint.y
				this.nDownHeight += diff
				// console.log('hello')
				this.$emit("move", this.nDownHeight)
			}
			this.nLastPoint = currentPoint
		},
		nOnTouchEnd(e) {
			if (!this.scrollable) return;
			const dh = this.nDownHeight
			this.nInTouchend = true
			this.nDownHeight = 0 // clear
			this.$emit("end", dh)
		},
		nOnScroll(e) {
			// console.log('child scroll')
			this.nTheScrollTop = e.detail.scrollTop
		}
		// #endif
	}
}
