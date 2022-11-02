import {getTouchPoint} from './element.js'

export default {
	data() {
		return {
			mSwipeMinTime: 60, // ms
			mSwipeMinOffset: 30, // px
			mSwipeStartPoint: null,
			mSwipeStartTime: 0
		}
	},
	methods: {
		mSwipeTouchStart(e) {
			this.mSwipeStartTime = Date.now()
			this.mSwipeStartPoint = getTouchPoint(e)
		},
		mSwipeTouchEnd(e) {
			const end = getTouchPoint(e)
			const endX = end.x
			const endY = end.y
			const time = Date.now() - this.mSwipeStartTime
			
			if (time >=this.mSwipeMinTime) {
				const xOffset = endX - this.mSwipeStartPoint.x
				const yOffset = endY - this.mSwipeStartPoint.y
				let xDirection = ''  // x方向
				let yDirection = ''  // y方向
				let xyDirection = ''  // 取间距最大的那个
				if (Math.abs(xOffset) >= this.mSwipeMinOffset) {
					if (xOffset < 0) {
						xDirection = 'left'
					} else {
						xDirection = 'right'
					}
				}
				if (Math.abs(yOffset) >= this.mSwipeMinOffset) {
					if (yOffset < 0) {
						yDirection = 'up'
					} else {
						yDirection = 'down'
					}
				}
				if (Math.abs(xOffset) >= Math.abs(yOffset)) {
					xyDirection = xDirection
				} else {
					xyDirection = yDirection
				}
				return {
					x: xDirection,
					y: yDirection,
					xy: xyDirection,
					time: time
				}
			} else {
				return {
					x: '',
					y: '',
					xy: '',
					time: time
				}
			}
		},
		mSwipeTouchCancel(e) {
			this.mSwipeStartTime = 0
			this.mSwipeStartPoint = null
		}
	}
}
