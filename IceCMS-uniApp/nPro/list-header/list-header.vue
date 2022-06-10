<template>
	<!-- #ifndef APP-NVUE -->
	<view>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<header>
	<!-- #endif -->
		<slot></slot>
	<!-- #ifdef APP-NVUE -->
	</header>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
	}
</script>

<style lang="scss" scoped>
</style>
