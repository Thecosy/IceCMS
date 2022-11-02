// #ifndef APP-NVUE
import {getTouchPoint} from '../../utils/element.js'
// #endif

export default {
	data() {
		return {
			// #ifdef APP-NVUE
			nListId: 'head_swiper_list',
			// #endif
			// header
			nAllHeight: uni.upx2px(248),
			// #ifndef APP-NVUE
			nChildScrollable: false,
			nParentScrollTop: 0,
			// scroll/refresh
			nParentScrollable: true,
			nDownHeight: 0,
			nStartPoint: null,
			nLastPoint: null,
			nTheScrollHeight: 0,  // scroll content height
			nTheScrollTop: 0,  // 记录滚动条的位置，并不是用来重置scrolltop
			nStartTop: 0,  // 记录开始时滚动条的位置
			nInTouchend: false,
			// 节流设置
			nFps: 40,  // 1s内屏幕刷新的频数
			nMoveTime: 0,
			nMoveTimeDiff: 0,
			nScrollTopDeviation: 100,  // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
			nIsDownLoading: false,  // 是否正在下拉刷新中
			// down
			nDown: {
				use: true,
				offset: uni.upx2px(140),
				inRate: 0.8,  // 下拉的距离小于offset时,改变下拉区域高度比例;0-1,越小,越难拉
				outRate: 0.2  // 下拉的距离大于offset时,改变下拉区域高度比例;0-1,越小,越难拉
			},
			nIsMoveDown: false,
			nDownMoveType: 0,
			nIsDownReset: false  // 下拉刷新，是否显示重置的过渡动画
			// #endif
		}
	},
	// #ifndef APP-NVUE
	computed: {
		nMrScrollContentStyle() {
			let _style = 'position: relative;'
			_style += this.nIsDownReset ? 'transition-property: transform; transition-duration: 300ms;' : ''
			_style += this.nDownHeight > 0 ? `transform: translateY(${this.nDownHeight}px);` : ''
			return _style
		},
		nMrRefreshStyle() {
			return 'position: absolute; transform: translateY(-100%); left:0;'
		},
		nCouldUnLash() {
			return this.nDownHeight >= (this.nDown.offset || 80)
		},
		nDownRate() {
			return this.nDownHeight / (this.nDown.offset || 80)
		}
	},
	// #endif
	methods: {
		// #ifdef APP-NVUE
		nSetScrollRef(ref) {
			ref && ref.setScrollRef(this.nAllHeight)
		},
		// #endif
		nHandleRefresh(ref) {
			// #ifdef APP-NVUE
			const refresher = this.$refs['n-refresher']
			ref &&ref.toRefresh(refresher, (val) => {
				val && val.cancel()
			}, (val) => {
				val && val.cancel()
			})
			// #endif
			// #ifndef APP-NVUE
			uni.$emit("swiperScrollRefresh")
			// #endif
		},
		// #ifndef APP-NVUE
		// 手指开始触摸屏幕
		nTouchstartEvent(e) {
			this.nStartPoint = getTouchPoint(e)
			this.nStartTop = this.nTheScrollTop || 0
			this.nLastPoint = this.nStartPoint
			this.nInTouchend = false
		},
		// 手指在屏幕上滑动
		// 注意：是手指位置的变化触发的。在scroll中，手指拖动scroll滚动，其实手指位置不变，scroll的滚动是不会触发touchmove的
		nTouchmoveEvent(e) {
			if (!this.nDown.use) return;
			if (!this.nStartPoint) return;
			// 限制/节流，可以使用时间，也可以使用高度
			// 小于节流时间,则不处理
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
			
			// (向下拉&&在顶部) scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
			// scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
			if (moveY > 0 && (scrollTop <= 0 || (scrollTop <= this.nScrollTopDeviation && scrollTop === this.nStartTop))) {
				// 是否可以下拉
				if (!this.nInTouchend && !this.nIsDownLoading && !this.nIsUpLoading) {
					let diff = currentPoint.y - this.nLastPoint.y;  // 和上次比,移动的距离 (大于0向下,小于0向上)
					
					// 下拉距离  < 指定距离
					if (this.nDownHeight < this.nDown.offset) {
						if (this.nDownMoveType !== 1) {
							this.nDownMoveType = 1;  // 加入标记,保证只执行一次
							this.nDownInOffset()  // 进入指定距离范围内那一刻的回调,只执行一次
							this.nIsMoveDown = true;  // 标记下拉区域高度改变,在touchend重置回来
						}
						this.nDownHeight += diff * this.nDown.inRate;  // 越往下,高度变化越小
					
					// 下拉距离 >= 指定距离
					} else {
						if (this.nDownMoveType !== 2) {
							this.nDownMoveType = 2;  // 加入标记,保证只执行一次
							this.nDownOutOffset();  // 下拉超过指定距离那一刻的回调,只执行一次
							this.nIsMoveDown = true;  // 标记下拉区域高度改变,在touchend重置回来
						}
						if (diff > 0) {  // 向下拉
							this.nDownHeight += Math.round(diff * this.nDown.outRate);  // 越往下,高度变化越小
						} else {  // 向上收
							this.nDownHeight += diff;  // 向上收回高度,则向上滑多少收多少高度
						}
					}
					
					const rate = this.nDownHeight / this.nDown.offset; // 下拉区域当前高度与指定距离的比值
					this.nOnDownMoving(rate, this.nDownHeight)  // 下拉过程中的回调,一直在执行
				}
			}
			this.nLastPoint = currentPoint
		},
		// 手指移开屏幕
		nTouchendEvent(e) {
			// 如果下拉区域高度已改变,则需重置回来
			if (this.nIsMoveDown) {
				if (this.nDownHeight >= this.nDown.offset) {
					// 符合触发刷新的条件
					this.nTriggerDownScroll()
				} else {
					// 不符合的话 则重置
					this.nDownHeight = 0;
					this.nEndDownScroll()
				}
				this.nDownMoveType = 0;
				this.nIsMoveDown = false;
			}
		},
		// scrollview滚动事件
		nScroll(e) {
			this.nTheScrollTop = e.detail.scrollTop
			this.nTheScrollHeight = e.detail.scrollHeight
			this.nHandleParentScroll(e)
		},
		nHandleParentScroll(e) {
			const scrollTop = e.detail.scrollTop
			// 缓冲8px
			if (scrollTop >= this.nAllHeight - 8) {
				// #ifdef H5
				if (!this.nParentScrollable) return;
				if (this.nParentScrollTop === this.nAllHeight) {
					this.nParentScrollTop = this.nAllHeight + 0.1
				} else {
					this.nParentScrollTop = this.nAllHeight
				}
				setTimeout(()=>{
					this.nParentScrollable = false
					this.nChildScrollable = true
				}, 0)
				return
				// #endif
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
		},
		// 进入下拉区域的那一刻
		nDownInOffset() {
			this.nParentScrollable = false
			this.nIsDownReset = false
			this.nIsDownLoading = false
		},
		// 超出下拉区域的那一刻
		nDownOutOffset() {
			this.nParentScrollable = false
			this.nIsDownReset = false
			this.nIsDownLoading = false
		},
		// 正在下拉的回调
		nOnDownMoving(rate, downHeight) {
			
		},
		// 刷新
		nTriggerDownScroll() {
			this.nParentScrollable = true
			this.nIsDownReset = true
			this.nIsDownLoading = true
			this.nDownHeight = this.nDown.offset
			this.nHandleRefresh()
		},
		nEndDownScroll() {
			this.nParentScrollable = true
			this.nIsDownReset = true
			this.nIsDownLoading = false
			this.nDownHeight = 0
		},
		nEndSuccess() {
			if (this.nIsDownLoading) {
				this.nEndDownScroll()
			}
		},
		// 下拉刷新/上提加载，失败之后使用
		nEndError() {
			if (this.nIsDownLoading) {
				this.nEndDownScroll()
			}
		},
		// for child-back event
		nChildTouchMove(downHeight) {
			// console.log("move", downHeight)
			let dh = downHeight
			if (downHeight >= this.nAllHeight) {
				dh = this.nAllHeight
			}
			if (downHeight <= 0) {
				dh = 0
			}
			// console.log(this.Scrollable, this.childScrollable)
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
	},
	onLoad() {
		// #ifndef APP-NVUE
		const that = this
		uni.$on("swiperScrollRefreshSuc", ()=>{
			that.nEndSuccess()
		})
		uni.$on("swiperScrollRefreshErr", ()=>{
			that.nEndError()
		})
		// #endif
	},
	onUnload() {
		// #ifndef APP-NVUE
		uni.$off("swiperScrollRefreshSuc")
		uni.$off("swiperScrollRefreshErr")
		// #endif
	}
}

