const MIN_DISTANCE = 10;
export default {
	methods: {
		touchstart(e) {
			this._left = this.left
			this.stopTouchStart(e)
		},
		touchmove(e) {
			// 是否可以滑动页面
			this.stopTouchMove(e);
			if (this.direction == 'horizontal') {
				this.moveTo({
					deltaX: this.deltaX,
					deltaY: this.deltaY || 0,
					left: this._left + this.deltaX
				})
			}
			// FIXME: 冒泡
			return false
		},
		touchend() {
			this.moveEnd({
				velocity: Math.abs(this.deltaX / this.timing),
				direction: this.direction,
				deltaX: this.deltaX,
				deltaY: this.deltaY,
			})
		},
		stopTouchStart(event) {
			this.resetTouchStatus();
			const touch = event.touches[0];
			this.startTime = new Date().getTime();
			this.startX = touch.clientX;
			this.startY = touch.clientY;
		},
		stopTouchMove(event) {
			const touch = event.touches[0];
			this.timing = new Date().getTime() - this.startTime;
			this.deltaX = touch.clientX - this.startX;
			this.deltaY = touch.clientY - this.startY;
			this.offsetX = Math.abs(this.deltaX);
			this.offsetY = Math.abs(this.deltaY);
			this.direction = this.direction || this.getDirection(this.offsetX, this.offsetY);
		},
		getDirection(x, y) {
			if (x > y && x > MIN_DISTANCE) {
				return 'horizontal';
			}
			if (y > x && y > MIN_DISTANCE) {
				return 'vertical';
			}
			return '';
		},
		resetTouchStatus() {
			this.direction = '';
			this.deltaX = 0;
			this.deltaY = 0;
			this.offsetX = 0;
			this.offsetY = 0;
		}
	}
}
