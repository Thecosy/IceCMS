<template>
	<view>
		<view class="choose-item">
			<view>消息提醒</view>
			<u-switch style="margin-left: auto;" v-model="checked"></u-switch>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked:false,
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.choose-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1px solid #F5F5F5;

		&:last-child {
			border: 0;
		}
}
</style>
