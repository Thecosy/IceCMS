<template>
	<view>
		<u-form>
			<view class="container">
				<u-form-item label="姓名">
					<u-input v-model="form.name" placeholder="请填写" />
				</u-form-item>
				<u-form-item label="手机">
					<u-input v-model="form.moblie" placeholder="请填写" />
				</u-form-item>
				<u-form-item label="地区">
					<u-input v-model="form.region" @click="addressShow = true" type="select" placeholder="请选择" />
				</u-form-item>
				<u-form-item label-width="auto">
					<u-input v-model="form.address" type="textarea" placeholder="请填写详细地址" />
				</u-form-item>
			</view>
			<view class="container">
				<u-form-item label="设为默认地址" label-width="auto">
					<u-switch slot="right" v-model="switchStatus" @change="switchChange" active-value="1" inactive-value="0"
					 active-color="#4cd964"></u-switch>
				</u-form-item>
			</view>
			<!-- 地区选择器 -->
			<u-picker mode="region" v-model="addressShow" @confirm="confirm"></u-picker>
			<view style="height: 120rpx;"></view>
			<view class="f-fixed">
				<u-button @click="submit">保存</u-button>
			</view>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchStatus: false,
				form: {
					name: '',
					moblie: "",
					region: "",
					address: "",
					is_default: 0
				},
				addressShow: false
			};
		},
		onLoad() {

		},
		methods: {
			submit() {
				if (!this.$u.test.mobile(this.form.moblie)) {
					this.$u.toast("请输入正确手机号");
						return;
				}
				
				this.$H.post("user/addressAdd", this.form).then(res => {
					if (res.code === 200) {
						uni.navigateBack();
					}
				})
			},
			confirm(e) {
				this.form.region = e.province.label + e.city.label + e.area.label
			},
			switchChange(value) {
				this.form.is_default = value;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
	
	.container {
		background-color: #fff;
		margin-bottom: 20rpx;
	}
	
	.btn-submit {
		position: fixed;
		bottom: 20rpx;
		left: 20rpx;
		right: 20rpx;
		z-index: 999;
	}
</style>
