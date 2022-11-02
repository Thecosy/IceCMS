import {
	styleObjToStr
} from '../../utils/utils.js';
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif
export default {
	data() {
		return {
			timingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			isAnimated: false,
			isScrolling: false,
			customDuration: 0,
			left: 0,
			mCurrent: this.current
		};
	},
	created() {},
	mounted() {
		// #ifdef MP
		this.swiperViews = this.$children
		// #endif
		// #ifdef APP-PLUS || H5
		this.swiperViews = this.$slots.default.map(it => it.child)
		// #endif
		this._setLeft();
		this.mCurrent = this.current
		this._notifyCurrentForItems(this.current, this.position)
	},
	watch: {
		mCurrent() {
			let current = this.mCurrent
			if (this.circular) {
				if (this.position == 1) {
					current = this.actualSize - (this.plus - 1)
					// console.log('最前了', current)
				} else if (this.position == this._size - 2) {
					current = this.plus - 2;
					// console.log('最后了', current)
				}
				if (current < 0) {
					current = this.position + 1
				}
				current %= this.actualSize
			}
			// console.log('position', this.position, current)
			this.$emit('update:current', current)
			this.$emit('change', current)
			this._notifyCurrentForItems(current, this.position)
		}
	},
	computed: {
		is3D() {
			return this.mode == '3d'
		},
		position() {
			return this.circular ? (this.mCurrent + this.plus) : this.mCurrent
		},
		manualDuration() {
			if (this.customDuration > 0)
				return this.customDuration
			return this.isAnimated ? this.duration : 0
		},
		boxStyle() {
			return styleObjToStr({
				width: this.width + 'rpx',
				height: this.height + 'rpx'
			});
		},
		containerStyle() {
			const style = {
				height: this.height + 'rpx'
			};
			// #ifdef APP-NVUE
			// FIXME: 理论isAnimated=false应该不设置transform,但是ios有个奇怪的问题，top不为0导致布局错位
			const isIOS = uni.getSystemInfoSync().platform == 'ios'
			if (isIOS) {
				style.transform = 'translate(' + uni.upx2px(this.left) + 'px' + ',0px)'
			} else {
				if (this.isAnimated == false) {
					style.transform = 'translate(' + uni.upx2px(this.left) + 'px' + ',0px)'
				}
			}
			// #endif
			// #ifndef APP-NVUE
			style.left = this.left + 'rpx'
			style.transition = 'left ' + this.manualDuration + 'ms ' + this.timingFunction
			// #endif
			return styleObjToStr(style);
		},
		_size() {
			return (this.$slots && this.$slots.default && this.$slots.default.length) || this.size;
		},
		// plus * 2
		plusSize() {
			return this.circular ? this.plus * 2 : 0;
		},
		// 真实长度
		actualSize() {
			return this._size - this.plusSize;
		}
	},
	methods: {
		prev() {
			if (this.isAnimated) return;
			if (this.isScrolling) return;
			if (this.mCurrent == 0 && this.circular == false) return
			this.mCurrent--;
			this._run()
		},
		next() {
			if (this.isAnimated) return;
			if (this.isScrolling) return;
			if (this.circular == true) {
				this.mCurrent++;
				if (this.mCurrent == this._size) {
					this.mCurrent = 0;
				}
			} else {
				if (this.mCurrent == this._size - 1) return
				this.mCurrent++;
			}
			this._run()
		},
		moveTo(e) {
			if (this.isAnimated) return
			const {
				deltaX,
				left
			} = e
			this.isScrolling = true
			if (!this.circular) {
				if (
					// 第一项，不能向右滑(上一项)
					(deltaX > 0 && this.mCurrent == 0) ||
					// 最后一项，不能向左滑(下一项)
					(deltaX < 0 && this.mCurrent == this._size - 1)
				) {
					if (!this.bounce) return
					// 添加阻尼滑动
					const _left = this._left || this.wxsData.left
					this.left = _left + (deltaX * (1 - Math.abs(deltaX) * 3 / (this.width * 5)))
					this._set3DScale(deltaX)
					return
				}
			}
			this.left = left
			this._set3DScale(deltaX)
		},
		moveEnd(e) {
			const {
				velocity,
				deltaX,
				deltaY
			} = e
			this.isScrolling = false

			if (!this.circular) {
				// 第一项，不能向右滑(上一项)
				if (deltaX > 0 && this.mCurrent == 0) {
					this._restoreStartTouch()
					return
				}
				// 最后一项，不能向左滑(下一项)
				if (deltaX < 0 && this.mCurrent == this._size - 1) {
					this._restoreStartTouch()
					return
				}
			}

			const isTurnPage = Math.abs(deltaX) > this.itemWidth / 2
			if (isTurnPage || velocity > 0.2) {
				if (deltaX < 0) {
					this.customDuration = 350
					this.next()
				} else if (deltaX > 0) {
					this.customDuration = 350
					this.prev()
				}
			} else {
				this._restoreStartTouch()
			}
		},
		_set3DScale(deltaX) {
			if (this.is3D) {
				const min = Math.min
				const maxScale = Math.abs(this.scale - 1)
				const mScale = deltaX * maxScale / this.width
				const mRealScale = min(this.scale, this.scale - Math.abs(mScale))
				this.swiperViews[this.position].mScale = mRealScale < 1 ? 1 : mRealScale
				if (this.position - 1 > -1) {
					this.swiperViews[this.position - 1].mScale = mScale > 0 ? min(this.scale, 1 + mScale) : min(1, 1 + mScale)
				}
				if (this.position + 1 < this._size) {
					this.swiperViews[this.position + 1].mScale = mScale > 0 ? min(1, 1 - mScale) : min(this.scale, 1 - mScale)
				}
			}
		},
		_restoreStartTouch() {
			const self = this
			this.customDuration = 300
			// #ifdef APP-VUE || MP-WEIXIN || H5
			this.left = this.wxsData.left
			// #endif
			// #ifndef APP-PLUS || MP-WEIXIN || H5
			this.left = this._left
			// #endif
			this._run(false)
			if (this.is3D) {
				this.swiperViews[this.position].restoreScale(this.manualDuration)
				if (this.position - 1 > -1) {
					this.swiperViews[this.position - 1].restoreScale(this.manualDuration)
				}
				if (this.position + 1 < this._size) {
					this.swiperViews[this.position + 1].restoreScale(this.manualDuration)
				}
			}
		},
		_notifyCurrentForItems(current, position) {
			this.swiperViews && this.swiperViews.forEach(it => {
				it.current = current
				it.position = position
			})
		},
		_run(isSet = true) {
			this.isAnimated = true;
			if (isSet)
				this._setLeft();
			const self = this;
			if (this.is3D) {
				this.swiperViews[this.position].restoreToScale(this.scale, this.manualDuration)
				if (this.position - 1 > -1) {
					this.swiperViews[this.position - 1].restoreToScale(1, this.manualDuration)
				}
				if (this.position + 1 < this._size) {
					this.swiperViews[this.position + 1].restoreToScale(1, this.manualDuration)
				}
			}
			// #ifdef APP-NVUE
			animation.transition(this.$refs.container, {
				styles: {
					transform: 'translate(' + uni.upx2px(this.left) + 'px' + ',0px)',
				},
				duration: this.manualDuration, //ms
				timingFunction: this.timingFunction,
				needLayout: false,
				delay: 0 //ms
			}, function() {
				self._reset();
			})
			// #endif
			// #ifndef APP-NVUE
			setTimeout(() => {
				this._reset();
			}, this.manualDuration);
			// #endif
		},
		_setLeft() {
			if (this.circular == true) {
				const s1 = (this.width - this.itemWidth - this.space * 2) / 2;
				let left = (this.plus + this.mCurrent) * (this.space + this.itemWidth) - s1;
				this.left = -left;
			} else {
				this.left = -(this.itemWidth + this.space) * this.mCurrent
			}
			// #ifdef APP-VUE || MP-WEIXIN || H5
			this.wxsData = {
				left: this.left,
				bounce: this.bounce
			}
			// #endif
		},
		_reset() {
			this.isScrolling = false
			this.isAnimated = false
			this.customDuration = 0
			if (this.circular == true) {
				if (this.position == 1) {
					this.mCurrent = this.actualSize - (this.plus - 1);
					this._setLeft();
					this._restoreScale()
				}
				// -2：原数组索引-1 + plus数组索引-1
				if (this.position == this._size - 2) {
					this.mCurrent = this.plus - 2;
					this._setLeft();
					this._restoreScale()
				}
			}
		},
		_restoreScale() {
			if (this.is3D) {
				this.swiperViews[this.position].restoreToScale(this.scale, 0)
				if (this.position - 1 > -1) {
					this.swiperViews[this.position - 1].restoreToScale(1, 0)
				}
				if (this.position + 1 < this._size) {
					this.swiperViews[this.position + 1].restoreToScale(1, 0)
				}
			}
		}
	}
}
