<template>
	<view>
		<view class="m-field">
			<view class="label">
				<text>{{ label }}</text>
				<text class="required" v-if="required">*</text>
				<view @click="onClick" class="field-body">
					<block v-if="type == 'textarea'">
						<textarea
							style="min-height: 150rpx;"
							:auto-height="true"
							@input="onInput"
							@focus="onFocus"
							@confirm="onConfirm"
							:value="value"
							:placeholder="placeholder"
						></textarea>
					</block>
					<block v-else>
						<input
							:disabled="type == 'select' || disabled"
							class="input"
							@input="onInput"
							@focus="onFocus"
							@confirm="onConfirm"
							:value="value"
							:placeholder="placeholder"
						/>
						<view v-if="type == 'select'" class="right" @tap="onRightIcon"><u-icon name="arrow-down-fill"></u-icon></view>
						<view v-if="rightIcon" class="right" @tap="onRightIcon"><u-icon name="close-circle-fill"></u-icon></view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * m-field Field 输入框
 * @description 此组件一般用于Input输入框，Select弹出框等。
 * @tutorial https://ui.ymeoo.cn
 * @property {String} label 左侧提示文字
 * @property {Array} list 当type类型为select时选择列表数据
 * @property {Boolean} required 是否显示左边的"*"号，这里仅起展示作用(默认false)
 * @property {Boolean} disabled 是否禁用输入框
 * @property {Boolean} isClick 是否自定义点击，true则不触发select弹窗
 * @property {String} placeholder 输入框为空时占位符
 * @property {String} type 输入框类型,可选值：text、select、textarea
 * @property {String} right-icon 输入框右边图标
 * @property {String} mode 当type类型为select时选择器模式
 * @event {Function} selectConfirm 当type类型为select时选择框确认按钮返回值
 * @event {Function} click 组件自定义点击事件
 * @event {Function} onRightIcon 输入框右边图标点击事件
 * @example <u-form-item label="姓名"><u-input v-model="form.name" /></u-form-item>
 */

export default {
	name: 'q-field',
	props: {
		list: {
			type: Array,
			default: []
		},
		//输入类型
		type: {
			type: String,
			default: 'text'
		},
		// input的label提示语
		label: {
			type: String,
			default: ''
		},
		// 是否显示必填*号
		required: {
			type: Boolean,
			default: false
		},
		// placeholder
		placeholder: {
			type: String,
			default: '请填写内容'
		},
		value: {
			type: String,
			default: ''
		},
		mode: {
			type: String,
			default: 'selector'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		isClick: {
			type: Boolean,
			default: false
		},
		rightIcon: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			showPopup: false
		};
	},
	methods: {
		//Select时点击事件
		onClick() {
			if (this.type == 'select' && this.isClick === false) {
				if (this.showPopup) {
					this.showPopup = false;
				} else {
					this.showPopup = true;
				}
			} else {
				this.$emit('click', '');
			}
		},
		onInput(event) {
			let value = event.detail.value;
			this.$emit('input', value);
		},
		onFocus(event) {
			this.focused = true;
			this.$emit('focus', event);
		},
		onBlur(event) {
			this.$emit('blur', event);
		},
		onConfirm(e) {
			this.$emit('confirm', e.detail.value);
		},
		onRightIcon() {
			this.$emit('onRightIcon');
		}
	}
};
</script>

<style lang="scss" scoped>
.m-field {
	padding: 30rpx 30rpx 0 30rpx;
	background-color: #ffffff;

	.label {
		.required {
			color: red;
			margin-left: 8rpx;
		}

		.field-body {
			display: flex;
			align-items: center;
			background-color: #f5f5f5;
			padding: 30rpx;
			border-radius: 10rpx;
			font-size: 24rpx;
			margin-top: 10rpx;
			.right {
				margin-left: auto;
			}
			.input {
				flex: 1;
				margin-right: 20rpx;
			}
		}
	}
}
</style>
