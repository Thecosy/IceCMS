const BindingX = uni.requireNativePlugin('bindingx');
const animation = uni.requireNativePlugin('animation');
export default {
	mounted() {
		this.container = this.getEl(this.$refs['container'])
	},
	methods: {
		_notifyTouchChangeForItems(isTouchEnd) {
			this.swiperViews && this.swiperViews.forEach(it => {
				it.canClick = isTouchEnd
			})
		},
		touchstart(e) {
			if (this.isAnimated) return;
			if (this.stop) return
			this.isScrolling = true
			this._notifyTouchChangeForItems(false)
			this.stop = true
			this.startTime = new Date().getTime()
			const props = [{
				element: this.container,
				property: 'transform.translateX',
				expression: uni.upx2px(this.left) + '+x'
			}]
			if (this.is3D) {
				const deltaScale = `${this.scale}/${this.width}*x`
				const currentScale = `${this.scale}-abs(x)/${this.width}*1`
				const realScale = `min(${currentScale},${this.scale})`
				const currentCardExp = `${realScale} < 1 ? 1 : ${realScale}`;
				const leftCardExp = `${deltaScale} > 0 ? min(${this.scale},(1 + ${deltaScale})) : min(1,(1 + ${deltaScale}))`;
				const rightCardExp = `${deltaScale} > 0 ? min(1,(1 - ${deltaScale})) : min(${this.scale},(1 - ${deltaScale}))`;
				props.push({
					element: this.getSwipteItemEl(this.position),
					property: 'transform.scale',
					expression: currentCardExp
				})
				if (this.position - 1 > -1) {
					props.push({
						element: this.getSwipteItemEl(this.position - 1),
						property: 'transform.scale',
						expression: leftCardExp
					})
				}
				if (this.position + 1 > this._size) {
					props.push({
						element: this.getSwipteItemEl(this.position + 1),
						property: 'transform.scale',
						expression: rightCardExp
					})
				}
			}
			this.eventpan = BindingX.bind({
				anchor: this.container,
				eventType: 'pan',
				props
			}, (e) => {
				if (e.state === 'end' ||
					e.state === 'exit') {
					setTimeout(() => {
						this._notifyTouchChangeForItems(true)
					}, 10)
					const timing = new Date().getTime() - this.startTime
					const velocity = Math.abs(e.deltaX / timing)
					this.stop = false
					this.isScrolling = false
					if (this.eventpan && this.eventpan.token) {
						BindingX.unbind({
							token: this.eventpan.token,
							eventType: 'pan'
						})
					}
					this.moveEnd({
						velocity,
						deltaX: e.deltaX,
						deltaY: e.deltaY
					})
				}
			})
		},
		getSwipteItemEl(idx) {
			return this.swiperViews[idx].$el.ref
		},
		/**
		 * 获取ref
		 * @param {Object} el
		 */
		getEl(el) {
			return el.ref
		}
	}
}
