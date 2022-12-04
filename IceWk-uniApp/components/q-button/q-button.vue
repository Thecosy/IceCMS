<template>
	<view>
		<button
			class="reset-button button"
			@click="onClick"
			hover-class="button-hover"
			:class="[shape == 'circle' ? 'round-circle' : '']"
		>
			<slot></slot>
		</button>
	</view>
</template>

<script>
/**
 * m-field button 按钮组件
 * @description 常用按钮组件。
 * @tutorial https://ui.ymeoo.cn
 * @property {String} color 按钮主题色
 * @property {String} shape 设置为circle，则按钮两边为半圆形
 * @event {Function} click 组件自定义点击事件
 * @example <u-form-item label="姓名"><u-input v-model="form.name" /></u-form-item>
 */
export default {
	name: 'q-button',
	props: {
		shape: {
			type: String,
			default: 'circle'
		}
	},
	data() {
		return {};
	},
	methods: {
		onClick() {
			this.$emit('click', '');
		}
	}
};
</script>

<style lang="scss" scoped>
// 去除button的所有默认样式
.reset-button {
	padding: 0;
	font-size: inherit;
	line-height: inherit;
	background-color: transparent;
	color: inherit;
}

.reset-button::after {
	border: none;
}

// button样式
.button {
	display: block;
	padding: 20rpx;
	margin: 20rpx;
	background-image: -moz-linear-gradient(135deg, rgb(0, 255, 255), rgb(29, 147, 251));
	
	background-image: -webkit-linear-gradient(135deg, rgb(0, 255, 255), rgb(29, 147, 251));
	
	background-image: linear-gradient(135deg, rgb(0, 255, 255), rgb(29, 147, 251));
	color: #fff;
}

.button-hover {
	background-color: #f5f5f5 !important;
}

.round-circle {
	border-radius: 100rpx;
}
</style>
