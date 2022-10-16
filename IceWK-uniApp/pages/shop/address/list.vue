<template>
	<view class="container">
		<block v-if="addressList.length > 0">
			<view class="address-item" v-for="(item, index) in addressList" :key="index">
				<view class="user-txt">
					<text>{{ item.name }}</text>
					<text>{{ item.moblie }}</text>
				</view>
				<view class="address-txt">
					<text v-if="item.is_default == 1" class="default">[默认地址]</text>
					<text>{{ item.region }}{{ item.address }}</text>
					<view class="btn-wrap">
						<u-button @click="editDefault(item.id)" v-if="item.is_default != 1" type="error" size="mini" plain>设为默认</u-button>
						<u-button @click="jumpEdit(item.id)" style="margin-left: 10rpx;" plain size="mini">编辑</u-button>
					</view>
				</view>
			</view>
		</block>
		<block v-else><u-empty text="暂无收货地址" mode="address"></u-empty></block>

		<view style="height: 120rpx;"></view>
		<view class="f-fixed"><u-button @click="$f.jump('/pages/shop/address/add')">新建收货地址</u-button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addressValue: 0,
			addressList: []
		};
	},
	onShow() {
		this.getAddress();
	},
	methods: {
		jumpEdit(id) {
			uni.navigateTo({
				url: '/pages/shop/address/edit?id=' + id
			});
		},
		getAddress() {
			this.$H.post('user/addressList.html').then(res => {
				this.addressList = res.result;
			});
		},
		editDefault(id) {
			this.$H
				.post('user/setAddressEdit', {
					address_id: id
				})
				.then(res => {
					if (res.code === 200) {
						this.$u.toast('修改默认地址成功');
						this.getAddress();
					}
				});
		}
	}
};
</script>

<style>
page {
	background-color: #ffffff;
}
</style>
<style lang="scss" scoped>
.btn-address-add {
	position: fixed;
	bottom: 20rpx;
	left: 20rpx;
	right: 20rpx;
	background-color: #19be6b;
	color: #fff;
	padding: 20rpx;
	border-radius: 10rpx;
	text-align: center;
}

.btn-address-add .icon {
	display: inline;
}
.address-item {
	padding: 20rpx 10rpx;
	border-bottom: 1px solid #f5f5f5;
	width: calc(100vw - 20rpx);
}

.address-item .user-txt text {
	margin-right: 20rpx;
}

.address-item .address-txt {
	display: flex;
}
.address-item .address-txt .btn-wrap {
	margin-left: auto;
}

.address-item .address-txt .btn-edit {
	margin-right: 0;
	margin-left: auto;
}
.address-item .address-txt .default {
	color: #19be6b;
	margin-right: 10rpx;
}
</style>
