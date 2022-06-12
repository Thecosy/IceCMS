<template>
	<view :class="['n-flex-row', 'n-align-center', 'n-bg-'+bgType, 'n-border-'+border, 'n-radius-'+radius]" :style="boxStyle">
		<view v-if="indexOfDays !== -1" :class="['n-flex-row', 'n-justify-center', 'n-align-center', 'n-height-'+itemHeight, 'n-bg-'+itemBgType, 'n-border-'+itemBorder, 'n-radius-'+itemRadius]" :style="mrItemBoxStyle">
			<text :class="['n-color-'+itemTextType, 'n-size-'+itemTextSize]" :style="itemTextStyle">{{countDownData.day}}</text>
		</view>
		<view v-if="indexOfDays !== -1" class="n-flex-row n-justify-center n-align-center" :style="mrIndicatorBoxStyle">
			<text :class="['n-color-'+indicatorTextType, 'n-size-'+indicatorTextSize]" :style="indicatorTextStyle">{{getDot(indexOfDays, indexOfHours)}}</text>
		</view>
		<view v-if="indexOfHours !== -1" :class="['n-flex-row', 'n-justify-center', 'n-align-center', 'n-height-'+itemHeight, 'n-bg-'+itemBgType, 'n-border-'+itemBorder, 'n-radius-'+itemRadius]" :style="mrItemBoxStyle">
			<text :class="['n-color-'+itemTextType, 'n-size-'+itemTextSize]" :style="itemTextStyle">{{countDownData.hour}}</text>
		</view>
		<view v-if="indexOfHours !== -1" class="n-flex-row n-justify-center n-align-center" :style="mrIndicatorBoxStyle">
			<text :class="['n-color-'+indicatorTextType, 'n-size-'+indicatorTextSize]" :style="indicatorTextStyle">{{getDot(indexOfHours, indexOfMinutes)}}</text>
		</view>
		<view v-if="indexOfMinutes !== -1" :class="['n-flex-row', 'n-justify-center', 'n-align-center', 'n-height-'+itemHeight, 'n-bg-'+itemBgType, 'n-border-'+itemBorder, 'n-radius-'+itemRadius]" :style="mrItemBoxStyle">
			<text :class="['n-color-'+itemTextType, 'n-size-'+itemTextSize]" :style="itemTextStyle">{{countDownData.minute}}</text>
		</view>
		<view v-if="indexOfMinutes !== -1&&getDot(indexOfMinutes, indexOfSeconds)" class="n-flex-row n-justify-center n-align-center" :style="mrIndicatorBoxStyle">
			<text :class="['n-color-'+indicatorTextType, 'n-size-'+indicatorTextSize]" :style="indicatorTextStyle">{{getDot(indexOfMinutes, indexOfSeconds)}}</text>
		</view>
		<view v-if="indexOfSeconds !== -1" :class="['n-flex-row', 'n-justify-center', 'n-align-center', 'n-height-'+itemHeight, 'n-bg-'+itemBgType, 'n-border-'+itemBorder, 'n-radius-'+itemRadius]" :style="mrItemBoxStyle">
			<text :class="['n-color-'+itemTextType, 'n-size-'+itemTextSize]" :style="itemTextStyle">{{countDownData.second}}</text>
		</view>
		<view v-if="indexOfSeconds !== -1&&getDot(indexOfSeconds, -1)" class="n-flex-row n-justify-center n-align-center" :style="mrIndicatorBoxStyle">
			<text :class="['n-color-'+indicatorTextType, 'n-size-'+indicatorTextSize]" :style="indicatorTextStyle">{{getDot(indexOfSeconds, -1)}}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * countdown
	 * @description 倒计时。支持自定义
	 * @property {Number} time 目标时间戳
	 * @property {Number} interval 计时周期
	 * @property {String} tpl 内容显示格式
	 * @property {String} bgType 背景主题
	 * @property {String} border 边框主题
	 * @property {String} radius 圆角主题
	 * @property {String} itemBgType item的背景主题
	 * @property {String} itemBorder item的边框主题
	 * @property {String} itemRadius item的圆角主题
	 * @property {String} itemTextType item的文字颜色主题
	 * @property {String} itemTextSize item的文字尺寸主题
	 * @property {String} itemHeight item的高度主题
	 * @property {String} itemWidth item的宽度。0时会有左右各24rpx的padding
	 * @property {String} indicatorTextType 分隔符的颜色主题
	 * @property {String} indicatorTextSize 分隔符的尺寸主题
	 * @property {String} indicatorWidth 分隔符的宽度
	 * @property {String} boxStyle 外层样式
	 * @property {String} itemBoxStyle item外层样式
	 * @property {String} indicatorBoxStyle 分隔符的外层样式
	 * @property {String} itemTextStyle item文字样式
	 * @property {String} indicatorTextStyle 分隔符的文字样式
	*/
	export default {
		props: {
			/**
			 * 目标时间戳
			 */
			time: {
				type: Number,
				default: 1600000000000
			},
			/**
			 * 计时周期
			 */
			interval: {
				type: Number,
				default: 1000
			},
			/**
			 * 内容显示格式:{d}天 {h}:{m}:{s}
			 */
			tpl: {
				type: String,
				default: '{h}:{m}:{s}'
			},
			/**
			 * 背景主题
			 */
			bgType: {
				type: String,
				default: 'none'
			},
			/**
			 * 边框主题
			 */
			border: {
				type: String,
				default: ''
			},
			/**
			 * 圆角主题
			 */
			radius: {
				type: String,
				default: ''
			},
			/**
			 * item的背景主题
			 */
			itemBgType: {
				type: String,
				default: ''
			},
			/**
			 * item的边框主题
			 */
			itemBorder: {
				type: String,
				default: ''
			},
			/**
			 * item的圆角主题
			 */
			itemRadius: {
				type: String,
				default: 's'
			},
			/**
			 * item的文字颜色主题
			 */
			itemTextType: {
				type: String,
				default: 'text'
			},
			/**
			 * item的文字尺寸主题
			 */
			itemTextSize: {
				type: String,
				default: 'l'
			},
			/**
			 * item的高度主题
			 */
			itemHeight: {
				type: String,
				default: 'base'
			},
			/**
			 * item的宽度。0时会有左右各24rpx的padding
			 */
			itemWidth: {
				type: String,
				default: '0'
			},
			/**
			 * 分隔符的颜色主题
			 */
			indicatorTextType: {
				type: String,
				default: 'text'
			},
			/**
			 * 分隔符的尺寸主题
			 */
			indicatorTextSize: {
				type: String,
				default: 'l'
			},
			/**
			 * 分隔符的宽度
			 */
			indicatorWidth: {
				type: String,
				default: '60rpx'
			},
			/**
			 * 外层样式
			 */
			boxStyle: {
				type: String,
				default: ''
			},
			/**
			 * item外层样式
			 */
			itemBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * 分隔符的外层样式
			 */
			indicatorBoxStyle: {
				type: String,
				default: ''
			},
			/**
			 * item的文字样式
			 */
			itemTextStyle: {
				type: String,
				default: ''
			},
			/**
			 * 分隔符的文字样式
			 */
			indicatorTextStyle: {
				type: String,
				default: ''
			}
		},
		data: () => ({
			NOW_DATE: Date.now(),
			completed: false,
			indexOfDays: -1,
			indexOfHours: -1,
			indexOfMinutes: -1,
			indexOfSeconds: -1
		}),
		mounted() {
			setInterval(() => {
				this.NOW_DATE = Date.now();
			}, this.interval);
			this.indexOfDays = this.tpl.indexOf('d');
			this.indexOfHours = this.tpl.indexOf('h');
			this.indexOfMinutes = this.tpl.indexOf('m');
			this.indexOfSeconds = this.tpl.indexOf('s');
		},
		computed: {
			countDownData() {
				const timeSpacing = this.time - this.NOW_DATE;
				if (timeSpacing < 0) {
					if (this.completed === false) {
						this.$emit('completed');
					}
					this.setCompleted()
					return {
						day: '00',
						hour: '00',
						minute: '00',
						second: '00'
					}
				}
				let day = 0;
				let hour = 0;
				let minute = 0;
				let second = 0;
				if (this.indexOfDays !== -1) {
					day = Math.floor(timeSpacing / (24 * 60 * 60 * 1000));
					hour = Math.floor(timeSpacing % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
				} else {
					day = 0;
					hour = Math.floor(timeSpacing / (60 * 60 * 1000));
				}
				if (this.indexOfHours !== -1) {
					hour = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
					minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
				} else {
					hour = 0;
					minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 1000));
				}
				if (this.indexOfMinutes !== -1) {
					minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / (60 * 1000));
					second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) % (60 * 1000) / 1000);
				} else {
					minute = 0;
					second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / 1000);
				}
				return {
					day: day < 10 ? '0' + day : '' + day,
					hour: hour < 10 ? '0' + hour : '' + hour,
					minute: minute < 10 ? '0' + minute : '' + minute,
					second: second < 10 ? '0' + second : '' + second
				}
			},
			mrItemBoxStyle() {
				const _width = parseInt(this.itemWidth)
				let _style = ''
				if (_width <= 0) {
					_style += `padding-left:24rpx;padding-right:24rpx;`
				} else {
					_style += `width:${this.itemWidth};`
				}
				return _style + this.itemBoxStyle
			},
			mrIndicatorBoxStyle() {
				let _style = ''
				if (this.indicatorWidth && this.indicatorWidth.length > 0) {
					_style = `width:${this.indicatorWidth};`
				}
				return _style + this.indicatorBoxStyle
			}
		},
		methods: {
			getDot(prevTagIndex, nextTagIndex = -1) {
				if (nextTagIndex === -1) {
					return this.tpl.slice(prevTagIndex + 2)
				}
				return this.tpl.slice(prevTagIndex + 2, nextTagIndex - 1)
			},
			setCompleted() {
				this.completed = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
