<template>
	<view>
		<u-line />
		<view style="margin: 35rpx;">
			<u-section :show-line="false" @click="toAgr(4)"  title="使用帮助"></u-section>
		</view>
		<u-line />
		<view style="margin: 35rpx;"  @click="tomess">
			<u-section :show-line="false" title="消息提醒">
			</u-section>
		</view>
		<u-line />
		<view style="margin: 35rpx;">
			<u-section :show-line="false" @click="$f.jump('/pages/chat/chat?user=' + userJson)"  title="客服"></u-section>
		</view>
		<u-line />
		<u-line />
		<view style="margin: 35rpx;">
			<u-section :show-line="false" @click="$f.jump('/pages/chat/chat?user=' + userJsons)" title="版权维权"></u-section>
		</view>
		<u-line />
		<view style="margin: 35rpx;">
			<u-section :show-line="false" @click="clearCache" :sub-title="cacheSize" title="清除缓存"></u-section>
		</view>
		<u-line />
		<view style="margin: 35rpx;">
			<u-section :show-line="false" @click="toAbout" title="关于"></u-section>
		</view>
		<u-line />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cacheSize:0,
				userJson:'',
				userJsons:''
			}
		},
		onLoad() {
			this.getUserInfo();
			this.getUserInfos();
		},
		onShow() {
			var self = this;
			plus.cache.calculate(function(size) { //size是多少个字节单位是b
			    //做下面相应的处理
			    if (size < 1024) {
			        self.cacheSize = size + 'B';
			    } else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
			        self.cacheSize = Math.floor(size / 1024 * 100) / 100 + 'KB';
			    } else if (size / 1024 / 1024 >= 1) {
			        self.cacheSize = Math.floor(size / 1024 / 1024 * 100) / 100 + 'M';
			    }
			});
		},
		methods: {
			tomess(){
				uni.navigateTo({
					url: '/pages/my/mess'
				});
			},
			getUserInfo() {
				this.$H
					.get('user/userInfoById', {
						uid: 2
					})
					.then(res => {
						let user = {
							uid: res.result.uid,
							username: res.result.username,
							avatar: res.result.avatar
						};
						this.userJson = JSON.stringify(user);
					});
			},
			getUserInfos() {
				this.$H
					.get('user/userInfoById', {
						uid: 4
					})
					.then(res => {
						let user = {
							uid: res.result.uid,
							username: res.result.username,
							avatar: res.result.avatar
						};
						this.userJsons = JSON.stringify(user);
					});
			},
			
			toAbout() {
				uni.navigateTo({
					url: '/pages/my/about'
				});
			},
			toAgr(i) {
				uni.navigateTo({
					url: '/pages/my/agr?type='+i
				});
			},
			clearCache() {
			    var self = this;
			    //使用plus.cache.clear 清除应用中的缓存数据
			    plus.cache.clear(function() {
			        uni.showToast({
			            title: '清除成功!',
			            icon: 'none',
			            success() {
			                self.cacheSize = '0B'
			            }
			        })
			    });
			},
		}
	}
</script>

<style>

</style>
