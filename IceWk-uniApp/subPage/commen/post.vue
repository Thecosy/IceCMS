<template>
	<view class="m20">
		<u-alert :show-icon="true" title="APP支持APP在线投稿,如果你需要进行投稿,需要开通永久会员即可进行投稿." type="primary">
		</u-alert>
		<u-alert :show-icon="true" class="mt20"
			title="投稿软件可带个人版权,以及官方BUG反馈群,严禁任何形式强制引流弹窗,强制分享跳转,以及强制更新,远程控制弹窗,一经发现永久取消投稿权限." type="error"></u-alert>
		<u-alert :show-icon="true" class="mt20" title="欢迎大家踊跃投稿,携手共建一个健康绿色的软件库,投搞软件请添加我们软件库相关关键词,谢谢合作!!!"
			type="success"></u-alert>
		<picker @change="change" :value="index" :range="columns" range-key="name">
			<u-button class="mt20" type="primary" :text="names" color="#50A1FF"></u-button>
			<!-- <view style="padding: 20rpx;background-color: white;">{{ columns[index].name }}</view> -->
		</picker>
		<u--input class="mt20" placeholder="请输入软件名" clearable v-model="appname"></u--input>
		<view class="content mt20">
			<bgyxedit @bgyxchange="getbgyxinfo" :showdone="true"
				uploadurl="https://qsd.haoleen.com/getdata/getdata/appupimg" filename="img"></bgyxedit>
		</view>
		<u-input class="mt20" placeholder="请输入软件图标链接" v-model="appthum" prefixIcon="camera">
			<template slot="suffix">
				<u-icon name="plus-circle" size="30" @click="upicon"></u-icon>
			</template>
		</u-input>
		<u-input class="mt20" placeholder="请输入软件横幅图链接" v-model="apppostlunbo" prefixIcon="camera">
			<template slot="suffix">
				<u-icon name="plus-circle" size="30" @click="upbanner"></u-icon>
			</template>
		</u-input>
		<!-- <u--input class="mt20" placeholder="请输入软件图标链接" clearable v-model="appthum" prefixIcon="photo"></u--input> -->
		<!-- <u--input class="mt20" placeholder="请输入软件横幅图链接" clearable v-model="apppostlunbo" prefixIcon="photo"></u--input> -->
		<!-- <u--input class="mt20" placeholder="请输入软件免费下载地址" clearable v-model="appfreedownurl" prefixIcon="download"> -->
		</u--input>
		<u--input class="mt20" placeholder="请输入软件付费下载地址" clearable v-model="appdownurl" prefixIcon="level">
		</u--input>
		<u--input class="mt20" placeholder="请输入软件标签" clearable v-model="apptag" prefixIcon="tags"></u--input>
		<u--input class="mt20" placeholder="请输入软件描述" clearable v-model="appmiaoshu" prefixIcon="fingerprint"></u--input>
		<u--input class="mt20" placeholder="请输入投稿作者" clearable v-model="appuser" prefixIcon="account"></u--input>
		<u-button class="mt60" type="primary" text="联系管理" color="#50A1FF" @click="joinqq()"></u-button>
		<u-button class="mb20" type="primary" text="提交投稿" color="#50A1FF" @click="topost()"></u-button>
		<view class="wt20"></view>
	</view>
</template>
<script>
	
	import API from '../../utils/api.js';
	// import bgyxedit from '@/components/bgyxedit/bgyxedit.vue';
	export default {
		data() {
			return {
				index: 0,
				names:'请选择软件分类',
				qq: '779259529',
				appname: '',
				appcontent: '',
				appthum: '',
				apppostlunbo: '',
				appdownurl: '',
				appfreedownurl: '',
				apptag: '',
				appsort: '',
				appmiaoshu: '',
				appuser: '',
				appmima: 123456,
				columns: []
			};
		},
		components: {
			bgyxedit
		},
		onLoad() {
			this.loadcat()
		},
		methods: {
			loadcat: function() {
				// console.log(this.columns6)
				var that = this;
				uni.request({
					url: API.GetCat()
				}).then(res => {
					var ress = res[1].data.data;
					if (typeof(ress) != 'undefined' && ress != "none" && ress != "NULL") {
						that.columns = ress
						console.log(this.columns)
					} else {}
				})
			},
			joinqq: function() {
				plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + this.qq + '&version=1&src_type=web');
			},
			upicon: function() {
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading({
							title: '上传中...'
						})
						uni.uploadFile({
							url: 'https://qsd.haoleen.com/getdata/getdata/appupimg', //上传后返回文件保存的路径即可
							filePath: tempFilePaths[0],
							name: 'img',
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
								var upimg = uploadFileRes.data
								this.appthum = upimg;
								uni.hideLoading()
							}
						});
					}
				});
			},
			upbanner: function() {
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading({
							title: '上传中...'
						})
						uni.uploadFile({
							url: 'https://qsd.haoleen.com/getdata/getdata/appupimg', //上传后返回文件保存的路径即可
							filePath: tempFilePaths[0],
							name: 'img',
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
								var upimg = uploadFileRes.data
								this.apppostlunbo = upimg;
								uni.hideLoading()
							}
						});
					}
				});
			},
			getbgyxinfo: function(e) {
				// console.log(e.html)
				this.appcontent = e.html
			},
			topost: function() {
				let token = uni.getStorageSync('Token');
				if (token !== null && token !== '') {
					uni.request({
						url: 'http://易如意后台域名/api.php?act=get_info' + '&app=10000' + '&token=' +
							token,
						method: 'GET',
						data: {},
						success: res => {
							// console.log(this.appcontent +'6666'+this.appdownurl + '6666'+this.appfreedownurl + '6666'+this
							// 	.appmiaoshu + '6666'+this.appname + '6666'+this.apppostlunbo+'6666'+this.appsort)
							if (res.data.msg.vip == '999999999') {
								if (this.appcontent != '' && this.appdownurl != '' && this.appmiaoshu != '' && this.appname != '' &&
									this.apppostlunbo != '' && this.apptag != '' && this.appthum != ''&& this.appsort != '') {
									uni.request({
										url: 'http://typecho后台域名/locoy.php?pw=123456' +
											'&title=' + this.appname + '&content=' + this
											.appcontent + '&cid='+this.appsort+'&Uid=1' + '&thumb=' + this
											.appthum + '&postlunbo=' + this.apppostlunbo + this.appfreedownurl + '&downurl=' +
											this.appdownurl + '&description=' + this.appmiaoshu +
											'&name=' + this.appuser + '&tag=' + this.apptag,
										method: 'POST',
										success: res => {
											console.log(res.data)
											if (res.data.code === '666') {
												uni.showToast({
													title: '投稿成功！请联系管理审核！',
													icon: 'none'
												})
											} else if (res.data.code === '404') {
												uni.showToast({
													title: '已有此软件！',
													icon: 'none'
												})
											} else {
												uni.showToast({
													title: '请点击投稿按钮重试！！',
													icon: 'none'
												})
											}
										}
									});
								} else {
									uni.showToast({
										title: '请确保每项填写完成！！！',
										icon: 'none'
									})
								}
							} else {
								uni.showModal({
									title: '友情提示',
									content: '软件暂时只支持永久会员投稿，是否开通永久会员进行投稿？',
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定');
											uni.switchTab({
												url: '/pages/vip/shop'
											})
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									},
								})
							}
						}
					});
				} else {
					uni.showModal({
						title: '未登录账号',
						content: '您没有登录账号，暂时不能使用软件功能，是否去登陆？',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '../my/account/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						},
					});
				}
			},
			change:function(e) {
				// console.log('change', e);
				var num=e.detail.value;
				this.names=this.columns[num].name;
				this.appsort=this.columns[num].mid;
				console.log(this.appsort)
			},
			toJSON() {},
		},
	}
</script>
<style>
	.m20 {
		margin: 30rpx;
	}
	.mb20 {
		margin-top: 20rpx;
		/* margin-bottom: 60rpx; */
	}
	.mt20 {
		margin-top: 20rpx;
	}
	.wt20 {
		margin-top: 10rpx;
		height: 10rpx;
	}
	.mt60 {
		margin-top: 60rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
