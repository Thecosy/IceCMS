<template>
	<view>
		<view style="color: #50A0FF; margin: 20rpx;padding: 20rpx;background-color: #fff;border-radius: 30rpx;text-align: center;">
			音叶余额:
			<text style="color: #FFFFFF;">0</text>
			<text style="font-size: 35px;color: red;">{{userInfos.integral}}</text>
		</view>
		<!-- tab -->
		<view class="tab-box u-skeleton-fillet">
			<u-tabs
				bg-color="#f5f5f5"
				inactive-color="#999"
				name="tab_name"
				:list="tabs"
				active-color="#616161"
				:is-scroll="false"
				:current="current"
				@change="tabChange"
			></u-tabs>
		</view>
		<view v-show="current === 0">
		<view style="margin: 20rpx;padding: 20rpx;background-color: #fff;border-radius: 30rpx;">
			<view style="color:#50A0FF">请输入您要充值的金额</view>
			<input style="margin: 20rpx 0;padding: 30rpx 0; background-color: #F5F5F5;" type="digit" v-model="form.price" placeholder="请输入金额" />
		</view>
		<u-button style="margin:0 30rpx ;" shape="circle" type="warning" @click="submit">充值</u-button>
		<view style="color: #50A0FF; margin: 20rpx;padding: 20rpx;background-color: #fff;border-radius: 30rpx;text-align: center;">
			￥<text style="font-size: 30px;">1 </text><text style="color: #FFFFFF;">0</text>
			<text style="font-size: 30px;"> = 10</text>
			<text >音叶</text>
		</view>
		<view style="margin: 20rpx;padding: 20rpx;background-color: #fff;border-radius: 30rpx;">
			<view style="color:#50A0FF">音叶记录</view>
			<u-table>
					<u-tr>
						<u-th>音叶记录</u-th>
						<u-th>音叶</u-th>
						<u-th>类型</u-th>
						<u-th>时间</u-th>
					</u-tr>
					<u-tr v-for="(item, index) in jifenlist"
					:key="index">
						<u-td>{{item.integral}}</u-td>
						<u-td>{{item.num}}</u-td>
						<block v-if="item.utype==1">
						<u-td style="color: red;">使用</u-td>
						</block>
						<block v-if="item.utype==2">
						<u-td style="color: green;">赚取</u-td>
						</block>
						<block v-if="item.utype==3">
						<u-td>充值</u-td>
						</block>
						<u-td>{{item.create_time | timeFrom}}</u-td>
					</u-tr>
				</u-table>
		</view>
		</view>
		<view v-show="current === 1">
			<view style="margin: 20rpx;padding: 20rpx;background-color: #fff;border-radius: 30rpx;">
				<view style="color:#50A0FF">请输入您要提现的音叶数</view>
				<input style="margin: 20rpx 0;padding: 30rpx 0; background-color: #F5F5F5;" type="number" v-model="form.price" placeholder="请输入音叶(大于100)" />
			</view>
			<view style="margin: 20rpx;padding: 20rpx;background-color: #fff;border-radius: 30rpx;">
				<view style="color:#50A0FF">请输入您的姓名</view>
				<input style="margin: 20rpx 0;padding: 30rpx 0; background-color: #F5F5F5;" type="text" v-model="form.name" placeholder="请输入真实姓名" />
			</view>
			<view style="margin: 20rpx;padding: 20rpx;background-color: #fff;border-radius: 30rpx;">
				<view style="color:#50A0FF">请输入您的支付宝账号</view>
				<input style="margin: 20rpx 0;padding: 30rpx 0; background-color: #F5F5F5;" type="text" v-model="form.phone" placeholder="手机号/邮箱" />
			</view>
			<u-button style="margin:0 30rpx ;" shape="circle" type="success" @click="submittx">提现</u-button>
			<view style="color: #50A0FF; margin: 20rpx;padding: 20rpx;background-color: #fff;border-radius: 30rpx;text-align: center;">
				<text style="font-size: 30px;">10</text>
				<text>音叶</text>
								<text style="color: #FFFFFF;">0</text>
				<text style="font-size: 30px;"> = </text>
								<text style="color: #FFFFFF;">0</text>
				 ￥<text style="font-size: 30px;">1</text>
				
			</view>
			<view style="margin: 20rpx;">提现手续6%</view>
			<view style="margin: 20rpx;padding: 20rpx;background-color: #fff;border-radius: 30rpx;">
				<view style="color:#50A0FF">提现记录</view>
				<u-table>
						<u-tr>
							<u-th>提现音叶</u-th>
							<u-th>金额</u-th>
							<u-th>支付账户</u-th> 
							<u-th>状态</u-th>
							<u-th>时间</u-th>
						</u-tr>
						<u-tr v-for="(item, index) in txlist"
						:key="index">
							<u-td>{{item.integral}}</u-td>
							<u-td>{{item.money}}</u-td>
							<u-td>{{item.phone | testfile}}</u-td>
							<block v-if="item.status == 0">
							<u-td>待审核</u-td>
							</block>
							<block v-if ="item.status==1">
							<u-td style="color: green;">通过</u-td>
							</block>
							<block v-if ="item.status==2">
							<u-td style="color: red;">拒绝</u-td>
							</block>
							<u-td>{{item.create_time | timeFrom}}</u-td>
						</u-tr>
					</u-table>
			</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'loadmore',
				form: {
					price: '',
					name:''
				},
				orderId:0,
				jifenlist:{},
				txlist:{},
				tabs: [
					{
						tab_name: '充值'
					},
					{
						tab_name: '提现'
					}
				],
				current: 0,
				page: 1,
				userInfos:[],
			}
		},
		filters: {
		    testfile (value) {
		      const start = value.slice(0,3)
		      const end = value.slice(-4)
		      return `${start}***${end}`
		    }
		  },
		onLoad() {
			this.getjifenlist();
			this.gettxlist();
		},
		onShow() {
			if (this.$store.state.userInfo.uid) {
				this.getUserInfo();
			}
		},
		onReachBottom() {
			this.page++;
			this.gettxlist();
		},
		methods: {
			getUserInfo() {
				this.$H.get('user/userInfo').then(res => {
					this.userInfos = res.result;
				});
			},
			tabChange(index) {
				this.current = index;
				if (index === 0) {
					this.getjifenlist();
					this.page = 1;
					this.txlist=[];
					this.gettxlist();
				}
				if (index === 1) {
					this.page = 1;
					this.txlist=[];
					this.gettxlist();
				}
			},
			getjifenlist() {
				this.$H
					.get('post/jifenlist', {
						type: 2
					})
					.then(res => {
						this.jifenlist = res.result;
					});
			},
			gettxlist() { 
				this.loadStatus = 'loading';
				this.$H
					.get('order/usertxOrderList', {
					page: this.page
				}).then(res => {
						this.txlist = this.txlist.concat(res.result.data);
						if (res.result.current_page >= res.result.last_page) {
							this.loadStatus = 'nomore';
						}
					});
			},
			submit() {
				let that = this;
				if (!this.form.price) {
					this.$u.toast('请输入您要充值的数额');
					return;
				}
				// if (this.form.price < 1) {
				// 	this.$u.toast('充值最低1元哦');
				// 	return;
				// }
				uni.showLoading({
					mask:true,
					title:"请稍后"
				})
				
				this.$H.post("order/chong",{
					money:this.form.price
				}).then(res =>{
					this.orderId=res.result 
					if(res.code == 200){
						this.$H.get("order/payji", {
							order_id: this.orderId,	
						}).then(payInfo => {
							console.log(payInfo)
							uni.requestPayment({
								provider: "alipay",
								orderInfo: payInfo,
								success: function(res1) {
									that.$u.toast("充值成功!");
								},
								fail: function(err) {
									console.log(err)
									that.$u.toast("已取消支付或支付失败");
								}
							});
						})
					}
					
					uni.hideLoading();
				})
			},
			submittx() {
				let that = this;
				if (!this.form.price) {
					this.$u.toast('请输入您要提现的数额');
					return;
				}
				if (this.form.price < 100) {
					this.$u.toast('提现最低100音叶哦');
					return;
				}
				if (!this.form.name) {
					this.$u.toast('请输入您的姓名');
					return;
				}
				if (!this.form.phone) {
					this.$u.toast('请输入您的支付宝账号');
					return;
				}
				uni.showLoading({
					mask:true,
					title:"请稍后"
				})
				
				this.$H.post("order/tx",{
					money:this.form.price,
					phone:this.form.phone,
					name:this.form.name
				}).then(res =>{
					if(res.code==200){
						this.$u.toast(res.msg);
						this.page = 1;
						this.txlist=[];
						this.gettxlist();
						this.getUserInfo();
					}
					this.$u.toast(res.msg); 
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
