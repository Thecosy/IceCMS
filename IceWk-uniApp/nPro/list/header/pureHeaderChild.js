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
		// #endif
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
