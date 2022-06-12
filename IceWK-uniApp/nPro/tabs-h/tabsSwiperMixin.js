//
// 用于tabs-swiper联动参考
//
export default {
	data() {
		return {
			nIsTap: false,
			nDx: 0,
			nLastTabIndex: 0,
			nTapIndex: 0,
			nCurrentTab: 0
		}
	},
	methods: {
		// @change
		nOnSwiperChange(e) {
			// this.current = e.detail.current
			// #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
			const index = e.detail.current
			this.nToSwitchTab(index)
			// #endif
		},
		// @transition
		nOnSwiperScroll(e) {
			if (this.nIsTap) return;
			// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
			const offsetX = e.detail.dx
			this.nDx = offsetX
			// #endif
		},
		// @onAnimationEnd and @animationfinish
		nOnSwiperAnimationFinish(e) {
			// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
			const index = e.detail.current
			this.nLastTabIndex = index
			this.nToSwitchTab(index)
			if (this.nTapIndex === index) {
				this.nIsTap = false
			}
			// #endif
		},
		// @change for n-tabs-h
		nOnTabChange(i) {
			this.nIsTap = true
			this.nTapIndex = i
			this.nToSwitchTab(i)
		},
		nToSwitchTab(i) {
			this.nCurrentTab = i
		}
	}
}
