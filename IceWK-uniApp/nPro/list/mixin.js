// #ifndef APP-NVUE
import {getTouchPoint} from '../utils/element.js'
// #endif

export default {
	data() {
		return {
			// #ifdef APP-NVUE
			platform: '',
			// #endif
			// #ifndef APP-NVUE
			nScrollable: true,
			nDownHeight: 0,
			nStartPoint: null,
			nLastPoint: null,
			nTheScrollHeight: 0,  // scroll content height
			nTheScrollTop: 0,  // 记录滚动条的位置，并不是用来重置scrolltop
			nStartTop: 0,  // 记录开始时滚动条的位置
			nInTouchend: false,
			nPreScrollY: 0,
			// 节流设置
			nFps: 40,  // 1s内屏幕刷新的频数
			nMoveTime: 0,
			nMoveTimeDiff: 0,
			nScrollTopDeviation: 100,  // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
			nIsMoveDown: false,
			nDownMoveType: 0,
			nIsDownReset: false,  // 下拉刷新，是否显示重置的过渡动画
			// #endif
			nIsDownLoading: false,  // 是否正在下拉刷新中
			nIsUpLoading: false,  // 是否正在上提加载
			// down
			nDown: {
				use: true,
				offset: uni.upx2px(140),
				inRate: 0.8,  // 下拉的距离小于offset时,改变下拉区域高度比例;0-1,越小,越难拉
				outRate: 0.2  // 下拉的距离大于offset时,改变下拉区域高度比例;0-1,越小,越难拉
			},
			// up
			nUp: {
				use: true,
				offset: 80
			},
			nHasMore: true,
			// u need to manage the page-state yourself, we do not manage the page-state for u
			nCurrentPage: 0,  // start with 0. if > 0, it means data inited
			nPrePage: 0
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
			} else if (this.nTheScrollTop === this.nStartTop) {  // 到顶/左/右/底的滑动事件
				const isScrollUp = getTouchPoint(e).y - this.nStartPoint.y < 0;  // 和起点比,移动的距离,大于0向下拉,小于0向上拉
				// 上滑 && 检查并触发上拉
				isScrollUp && this.nTriggerUpScroll();
			}
		},
		// scrollview滚动事件
		nScroll(e) {
			this.$emit('scroll', e)
			this.nTheScrollTop = e.detail.scrollTop
			this.nTheScrollHeight = e.detail.scrollHeight
			
			// 向上滑还是向下滑动
			const isScrollUp = e.detail.scrollTop - this.nPreScrollY > 0;
			this.nPreScrollY = e.detail.scrollTop;
			
			// 上滑 && 检查并触发上拉
			isScrollUp && this.nTriggerUpScroll();
			if (this.nCurrentView) {
				this.nCurrentView = null
			}
		},
		// 进入下拉区域的那一刻
		nDownInOffset() {
			this.nScrollable = false
			this.nIsDownReset = false
			this.nIsDownLoading = false
		},
		// 超出下拉区域的那一刻
		nDownOutOffset() {
			this.nScrollable = false
			this.nIsDownReset = false
			this.nIsDownLoading = false
		},
		// 正在下拉的回调
		nOnDownMoving(rate, downHeight) {
			
		},
		nRefresh() {
			this.nPrePage = this.nCurrentPage
			this.nCurrentPage = 1
			this.nGetContentList('refresh')
		},
		nLoad() {
			this.nPrePage = this.nCurrentPage
			this.nCurrentPage += 1
			this.nGetContentList('load')
		},
		nReload() {
			this.nPrePage = this.nCurrentPage
			this.nCurrentPage = 1
			this.nGetContentList('load')
		},
		nInitContentList() {
			this.nPrePage = 0
			this.nCurrentPage = 1
			this.nGetContentList('refresh')
		},
		nGetContentList(type='refresh') {
			if (type === 'refresh') {
				this.$emit('down')
			} else {
				this.$emit('up')
			}
		},
		// 刷新
		nTriggerDownScroll() {
			this.nScrollable = true
			this.nIsDownReset = true
			this.nIsDownLoading = true
			this.nDownHeight = this.nDown.offset
			this.nRefresh()
		},
		nEndDownScroll() {
			this.nScrollable = true
			this.nIsDownReset = true
			this.nIsDownLoading = false
			this.nDownHeight = 0
		},
		// 加载更多
		nTriggerUpScroll() {
			if (this.nIsDownLoading || this.nIsUpLoading || !this.nHasMore || !this.nUp.use) return;
			let canUp = false
			// we should check if reached bottom
			if (this.nGetScrollBottom() <= this.nUp.offset) {  // 到底部
				canUp = true;  // 标记可上拉
			}
			if (!canUp) return;
			this.nIsUpLoading = true
			this.nLoad()
		},
		nEndUpScroll() {
			this.nIsUpLoading = false
		},
		nEndSuccess(hasMore=true) {
			this.nHasMore = hasMore
			if (this.nIsDownLoading) {
				this.nEndDownScroll()
			}
			if (this.nIsUpLoading) {
				this.nEndUpScroll()
			}
		},
		// 下拉刷新/上提加载，失败之后使用
		nEndError() {
			// reback the current page
			this.nCurrentPage = this.nPrePage
			if (this.nIsDownLoading) {
				this.nEndDownScroll()
			}
			if (this.nIsUpLoading) {
				this.nEndUpScroll()
			}
		},
		nGetScrollBottom() {
			// important!
			// if u want to use this mixin, u must supply a nScrollHeight in your props or computed or data
			let contentHeight = this.nScrollHeight
			if (this.nTheScrollHeight > 0) {
				contentHeight = this.nTheScrollHeight
			}
			return contentHeight - this.nTheScrollTop - this.nScrollHeight
		}
		// #endif
	}
}
