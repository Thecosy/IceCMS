<template>
	<view>
		<view class="c-wrap">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="头像"><u-avatar @click="onAvatar" mode="square" slot="right" :src="userInfo.profile" size="100"></u-avatar></u-form-item>
				<u-form-item label="昵称" right-icon="arrow-right">
					<u-input @click="jump(userInfo.username, 'username')" :placeholder="userInfo.name" :disabled="true" input-align="right" />
				</u-form-item>
				<u-form-item label="性别" right-icon="arrow-right">
					<u-input @click="showGender = true" :placeholder="userInfo.gender" :disabled="true" input-align="right" />
				</u-form-item>
				<u-form-item label="地区" right-icon="arrow-right">
					<u-input @click="showRegion = true"  :disabled="true" input-align="right" />
					<!-- <u-input @click="showRegion = true" :placeholder="userInfo.province + userInfo.city" :disabled="true" input-align="right" /> -->
				</u-form-item>
				<u-form-item label="生日" right-icon="arrow-right">
					<u-input @click="showBirthday = true" :placeholder="userInfo.birthday || '请填写生日'" :disabled="true" input-align="right" />
				</u-form-item>
				<u-form-item label="个性签名" right-icon="arrow-right">
					<u-input @click="jump(userInfo.intro, 'intro')" :placeholder="userInfo.intro" :disabled="true" input-align="right" />
				</u-form-item>
				<u-form-item label="标签" label-position="top" :border-bottom="false">
					<view @click="jump(userInfo.tag_str, 'tag_str')" class="tag-box">
						<view v-for="(item, index) in userInfo.tag_str" :key="index" class="tag">{{ item }}</view>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<view><q-button @click="outlogin">退出登录</q-button></view>
		<!-- 性别选择 -->
		<u-select v-model="showGender" :list="gender" @confirm="saveGender"></u-select>
		<!-- 地区选择 -->
		<u-picker v-model="showRegion" mode="region" @confirm="saveRegion"></u-picker>
		<!-- 生日选择器 -->
		<u-picker v-model="showBirthday" @confirm="saveBirthday"></u-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {},
			showGender: false,
			showRegion: false,
			showBirthday: false,
			gender: [
				{
					label: '男',
					value: 1
				},
				{
					label: '女',
					value: 2
				},
				{
					label: '保密',
					value: 0
				}
			]
		};
	},
	computed:{
		userInfo(){
			return this.$store.state.userInfo
		}
	},
	onLoad()  {
		console.log(this.$store.state.userInfo)
	},
	methods: {
		// 生日修改
		saveBirthday(obj) {
			let date = obj.year + '-' + obj.month + '-' + obj.day
			let form = {
				birthday: date
			};

			this.$H.post('user/userInfoEdit', form).then(res => {
				if (res.code == 200) {
					this.$store.state.userInfo.birthday = date;
				}
			});
		},
		// 地区修改
		saveRegion(obj) {
			let province = obj.province.label;
			let city = obj.city.label;

			let form = {
				province: province,
				city: city
			};

			this.$H.post('user/userInfoEdit', form).then(res => {
				if (res.code == 200) {
					this.$store.state.userInfo.province = province;
					this.$store.state.userInfo.city = city;
				}
			});
		},
		// 修改性别
		saveGender(e) {
			let gender = e[0].value;

			this.$H
				.post('user/userInfoEdit', {
					gender: gender
				})
				.then(res => {
					if (res.code == 200) {
						this.$store.state.userInfo.gender = e[0].label;
					}
				});
		},
		jump(value, type) {
			uni.navigateTo({
				url: 'submit?value=' + JSON.stringify(value) + '&type=' + type
			});
		},
		outlogin() {
			this.$store.commit("logout");
			uni.switchTab({
				url: '/pages/home/home'
			});
		},
		onAvatar() {
			let that = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],
				success: function(res) {
					uni.showLoading({
						mask: true,
						title: '上传头像中'
					});
					uni.uploadFile({
						url: that.$c.domain + 'common/upload',
						filePath: res.tempFilePaths[0],
						name: 'Image',
						header: {
							token: that.$store.state.userInfo.token
						},
						success: uploadFileRes => {
							let data = JSON.parse(uploadFileRes.data);
							if (data.code == 200) {
								that.updateAvatar(data.result.url);
								uni.hideLoading();
							}
						}
					});
				}
			});
		},
		updateAvatar(avatar) {
			this.$H
				.post('user/userInfoEdit', {
					avatar: avatar
				})
				.then(res => {
					if (res.code == 200) {
						this.$store.state.userInfo.avatar = avatar;
					}
				});
		}
	}
};
</script>
<style scoped>
.c-wrap {
	padding: 20rpx;
	background-color: #ffffff;
}

.bind-mobile {
	display: flex;
}

/* 标签 */
.tag-box {
}

.tag-box .tag {
	padding: 10rpx 20rpx;
	border-radius: 20rpx;
	font-size: 24rpx;
	display: inline-block;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	background-color: #ffebe5;
}

.tag-box .tag:nth-child(2n) {
	background-color: #ecf9f2;
}

.tag-box .tag:nth-child(3n) {
	background-color: #fff7e5;
}

.tag-box .tag:nth-child(5n) {
	background-color: #b3e0ff;
}
</style>
