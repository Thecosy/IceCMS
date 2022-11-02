<template>
	<view class="wrap">
		<u-waterfall v-model="list" ref="uWaterfall">
			<template v-slot:left="{ leftList }">
				<view @click="jump(item.id)" class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="1000" border-radius="10 10 0 0" :image="item.thumb" :index="index"></u-lazy-load>
					<view class="footer-wrap">
						<view class="p-title">{{ item.title }}</view>
						<view class="g-price">
							<text>￥{{ item.price }}</text>
						</view>
					</view>
				</view>
			</template>
			<template v-slot:right="{ rightList }">
				<view @click="jump(item.id)" class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<u-lazy-load threshold="1000" border-radius="10 10 0 0" :image="item.thumb" :index="index"></u-lazy-load>
					<view class="footer-wrap">
						<view class="p-title">{{ item.title }}</view>
						<view class="g-price">
							<text>￥{{ item.price }}</text>
						</view>
					</view>
				</view>
			</template>
		</u-waterfall>
		<u-loadmore v-if="loadStatus != 'none'" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		},
		loadStatus: {
			type: String,
			default: 'loadmore'
		}
	},
	methods: {
		jump(id) {
			uni.navigateTo({
				url: '/pages/shop/product/detail?id=' + id
			});
		},
		clear() {
			this.$refs.uWaterfall.clear();
		}
	}
};
</script>
<style>
/* page不能写带scope的style标签中，否则无效 */
page {
	background-color: rgb(240, 240, 240);
}
</style>

<style lang="scss" scoped>
.demo-warter {
	border-radius: 8px;
	margin: 5px;
	background-color: #ffffff;
	position: relative;
	overflow: hidden;
}

.demo-title {
	font-size: 30rpx;
	margin-top: 5px;
	color: $u-main-color;
}

.footer-wrap {
	padding: 20rpx;
	color: #616161;

	.g-price {
		color: red;
		font-size: 24rpx;
		font-weight: bold;
	}

	.p-title {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
}

.footer-wrap .p-user {
	display: flex;
	align-items: center;
	line-height: 20rpx;
	font-size: 22rpx;
	margin-top: 20rpx;
}

.footer-wrap .p-user .username {
	font-size: 20rpx;
	margin-left: 10rpx;
}

.footer-wrap .p-user .distance {
	display: flex;
	align-items: center;
	margin-left: auto;
}

.post-video {
	width: 100%;
}
</style>
