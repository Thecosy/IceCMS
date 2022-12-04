<template>
	<view>
		<view style="margin: 60px;text-align: center;">
			<image src="/static/logo.png" style="width: 120px;height: 120px;"></image>
			<view>当前版本：v1.0.0</view>
		</view>
		<u-line />
		<view style="margin: 35rpx;">
			<u-section :show-line="false" @click="jiance" title="新版本检测"></u-section>
		</view>
		<u-line />
		<view style="margin: 35rpx;">
			<u-section :show-line="false"  @click="toAgr(5)" title="版权协议"></u-section>
		</view>
		<u-line />
		<view style="margin: 35rpx;">
			<u-section :show-line="false"  @click="toAgr(1)" title="用户协议"></u-section>
		</view>
		<u-line />
		<view style="margin: 35rpx;">
			<u-section :show-line="false"  @click="toAgr(2)" title="隐私政策"></u-section>
		</view>
		<u-line />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			jiance(){
				let that = this
				uni.showLoading({
					mask: true,
					title: '检测中'
				});
				setTimeout(function() {
							that.$u.toast('您当前使用的已是最新版本！');
						}, 1500)
			},
			toAgr(i) {
				uni.navigateTo({
					url: '/pages/my/agr?type='+i
				});
			},
		}
	}
</script>

<style>

</style>
