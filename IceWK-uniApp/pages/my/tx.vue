<template>
	<view>
		<view style="color: #18B566; margin: 20rpx;padding: 20rpx;background-color: #fff;border-radius: 30rpx;text-align: center;">
			￥<text style="font-size: 40px;">1 </text><text style="color: #FFFFFF;">0</text>
			<text style="font-size: 40px;"> = 10</text>
			<text >音叶</text>
		</view>
		<view style="margin: 20rpx;padding: 20rpx;background-color: #fff;border-radius: 30rpx;">
			<view style="color:#19BE6B">请输入您要提现的金额数值</view>
			<input style="margin: 20rpx 0;padding: 30rpx 0; background-color: #F5F5F5;" type="digit" v-model="form.price" placeholder="请输入金额" />
		</view>
		<q-button shape="circle" @click="submit">提交</q-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					price: ''
				}
			}
		},
		methods: {
			submit() {
				let that = this;
				if (!this.form.price) {
					this.$u.toast('请输入您要充值的数额');
					return;
				}
				uni.showLoading({
					mask:true,
					title:"请稍后"
				})
				
				this.$H.post("order/tx",{
					money:this.form.price
				}).then(res =>{
					this.orderId=res.result 
					if(res.code == 200){
						this.$H.get("order/paytx", {
							order_id: this.orderId,	
						}).then(payInfo => {
							console.log(payInfo)
							
						})
					}
					
					uni.hideLoading();
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #F5F5F5;
	}
</style>
