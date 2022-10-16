<template>
	<view>
		<!-- 弥补底部陷入 -->
		<view style="height: 52px;"></view>
		<view class="tabbar-wrap">
			<block v-for="(item, index) in list" :key="index">
				<view @click="onTab(item, index)" v-show="active !== index" class="tab-item">
					<image class="icon" :class="{ 'mid-button': item.midButton }" :src="item.iconPath"></image>
					<text class="txt" :style="{ color: color }">{{ item.text }}</text>
					<text v-if="count[index] > 0" class="number">{{ count[index] | maxNum }}</text>
				</view>
				<view @click="onTab(item, index)" v-show="active === index" class="tab-item">
					<image class="icon" :class="{ 'mid-button': item.midButton }" :src="item.selectedIconPath"></image>
					<text class="txt" :style="{ color: selectedColor }">{{ item.text }}</text>
					<text v-if="count[index] > 0" class="number">{{ count[index] | maxNum }}</text>
				</view>
			</block>
		</view>
		<!-- 中间按钮弹窗 -->
		<u-popup v-model="showPopup" mode="bottom">
			<view class="handle-wrap">
				<view @click="handleJump(item)" class="item" v-for="(item, index) in popup" :key="index">
					<image mode="widthFix" class="icon" :src="item.icon"></image>
					<text class="txt">{{ item.text }}</text>
				</view>
			</view>
			<view class="handle-close"><u-icon @click="onClose" name="close"></u-icon></view>
		</u-popup>
	</view>
</template>

<script>
/**
 * m-field tabbar 底部菜单
 * @description 用于自定义底部菜单。
 * @tutorial https://ui.ymeoo.cn
 * @property {Array} list 菜单数据列表
 * @property {String} color 文字颜色
 * @property {Array} count 提示数字角标
 * @property {String} selectedColor 菜单选中时文字的颜色
 * @event {Function} click 菜单项点击事件
 */
import tabbar from '@/utils/tabbar.js';
export default {
	name: 'q-tabbar',
	props: {
		//tab 上的文字默认颜色
		color: {
			type: String,
			default: '#7A7E83'
		},
		//tab 上的文字选中时的颜色
		selectedColor: {
			type: String,
			default: '#515151'
		},
		active: {
			type: Number,
			default: 0
		},
		count: {
			type: Array,
			default: []
		}
	},
	beforeCreate() {
		uni.hideTabBar();
	},
	filters: {
		maxNum(num) {
			if (num > 99) {
				return '99+';
			} else {
				return num;
			}
		}
	},
	data() {
		return {
			list: tabbar.list,
			popup: tabbar.popup,
			showPopup: false
		};
	},
	computed: {
		hasLogin() {
			return this.$store.state.hasLogin;
		}
	},
	methods: {
		onTab(e, index) {
			if (e.midButton) {
				if (this.hasLogin) {
					this.showPopup = true;
				} else {
					uni.navigateTo({
						url:"/pages/user/login"
					})
				}
			} else {
				uni.switchTab({
					url: e.pagePath
				});
			}
		},
		onClose() {
			this.showPopup = false;
		},
		handleJump(e) {
			uni.navigateTo({
				url: e.url
			});

			this.showPopup = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.tabbar-wrap {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 999;
	background-color: #fff;
	height: 52px;
	display: flex;
	align-items: center;
	border-top: 1px solid #f5f5f5;
	.tab-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 100%;
		border-radius: 8px;
		position: relative;
		.icon {
			width: 24px;
			height: 24px;
		}
		.txt {
			font-size: 10px;
		}
		.number {
			background-color: #fa3534;
			color: #fff;
			border-radius: 50%;
			position: absolute;
			right: 25rpx;
			top: 10rpx;
			display: inline-block;
			width: 40rpx;
			height: 40rpx;
			font-size: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.mid-button {
			width: 43px;
			height: 43px;
		}
	}

	.tab-item[hidden] {
		display: none !important;
	}
}

// 中间按钮弹出框
.handle-wrap {
	display: flex;
	padding: 50rpx 0;
	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		padding: 20rpx 0;
		border-radius: 20rpx;
		.icon {
			width: 100rpx;
			margin-bottom: 20rpx;
		}
		.txt {
			font-size: 28rpx;
		}
	}
}

.handle-close {
	display: flex;
	justify-content: center;
	margin-bottom: 50rpx;
}
</style>
