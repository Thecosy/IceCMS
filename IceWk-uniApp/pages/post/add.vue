<template>
	<view class="container">
		<block v-if="form.type==1">
		<u-navbar title="发布图文" :border-bottom="false" title-color="#000">
		</u-navbar>
		</block>
		<block v-else>
		<u-navbar title="发布视频" :border-bottom="false" title-color="#000">
		</u-navbar>
		</block>
		<textarea placeholder="文本,标题......" :auto-height="true" maxlength="-1" v-model="form.content"
			class="post-txt"></textarea>


		<!-- 上传图片 -->
		<block v-if="form.type == 1">
			<uni-file-picker ref="fileImage" :limit="9" v-model="mediaList" :auto-upload="false" fileMediatype="image"
				mode="grid" @select="select" @progress="progress" @success="success" @fail="fail"></uni-file-picker>
		</block>
		<!-- 上传视频 -->
		<block v-if="form.type == 2">
			<uni-file-picker ref="fileVideo" :limit="1" v-model="mediaList" :auto-upload="false" fileMediatype="video"
				mode="grid" @select="select" @progress="progress" @success="success" @fail="fail"></uni-file-picker>
		</block>
		<u-line />
		<view style="margin: 0 20rpx;">积分的80%直接到你账户上</view>
		<view class="choose-item">
			<image class="icon" src="/static/jf_1.png"></image>
			<input style="margin: 0 20rpx;" type="number" v-model="form.integral" placeholder="下载所需积分" />
		</view>
		<view class="choose-item">
			<image class="icon" src="/static/ys.png"> <text style="margin-left: 20rpx;">隐私发布</text></image>
			<u-switch style="margin-left: auto;" v-model="checked"></u-switch>
		</view>
		<!-- 选择圈子 -->
		<navigator v-if="isTopic" url="/pages/post/choose-topic/choose-topic" class="choose-item">
			<image class="icon" src="/static/p_1.png"></image>
			<text class="txt">{{ SortName }}</text>
			<u-icon class="u-icon" name="arrow-right"></u-icon>
		</navigator>
		<!-- 选择话题 -->
		<navigator v-if="!isTopic" :url="'/pages/post/choose-discuss/choose-discuss?topic_id=' + form.topic_id"
			class="choose-item">
			<image class="icon" src="/static/m_1.png"></image>
			<text class="txt">{{ disName }}</text>
			<u-icon class="u-icon" name="arrow-right"></u-icon>
		</navigator>
		<!-- 所在位置 -->
		<view @click="chooseLocation" class="choose-item" v-show="false">
			<u-icon class="icon add-icon" name="map" color="#999" size="40"></u-icon>
			<text class="txt">{{ form.address || '所在位置' }}</text>
			<u-icon class="u-icon" name="arrow-right"></u-icon>
		</view>
		<view class="submit-btn">
			<q-button @click="uploadMedia" shape="circle">发布</q-button>
		</view>
	</view>
</template>

<script>
	import API from '../../utils/api.js';
	export default {
		data() {
			return {
				SortName: '选择圈子',
				disName: '选择话题',
				form: {
					title: '',
					author: '',
					type: 1,
					topic_id: '',
					discuss_id: '',
					content: '',
					media: [],
					integral: '',
					longitude: 0,
					latitude: 0,
					isys: 0,
					address: ''
				},
				checked: false,
				isTopic: true,
				mediaList: []
			};
		},
		onLoad(options) {
			this.form.type = options.type;

			if (options.is_topic) {
				this.isTopic = options.is_topic;
			}

			if (options.topic_id) {
				this.form.topic_id = options.topic_id;
				this.disName = options.dis_name
				this.isTopic = false;
			}
			if (options.discuss_id) {
				this.form.discuss_id = options.discuss_id;
			}

			let location = uni.getStorageSync('location_info');
			this.form.longitude = location.longitude;
			this.form.latitude = location.latitude;
		},
		methods: {
			// 获取上传状态
			select(e) {
				// console.log('选择文件：', e);
			},
			// 获取上传进度
			progress(e) {
				// console.log('上传进度：', e);
			},

			// 上传成功
			success(e) {
				this.submit();
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e);
			},
			uploadMedia() {
				if (!this.form.content) {
					this.$u.toast('内容不能为空');
					return;
				}

				if (this.form.integral < 0) {
					this.$u.toast('音叶最小为0');
					return;
				}

				uni.showLoading({
					mask: true,
					title: '发布中'
				});

				// 如果选择图片或者视频
				let mediaLength;
				if (this.form.type == 1) {
					mediaLength = this.$refs.fileImage.filesList.length;
				} else {
					mediaLength = this.$refs.fileVideo.filesList.length;
				}

				if (mediaLength > 0) {
					if (this.form.type == 1) {
						this.$refs.fileImage.upload();
					} else {
						this.$refs.fileVideo.upload();
					}
				} else {
					this.submit();
				}
			},
			chooseLocation() {
				let that = this;
				uni.chooseLocation({
					success: function(res) {
						// console.log('位置名称：' + res.name);
						// console.log('详细地址：' + res.address);
						// console.log('纬度：' + res.latitude);
						// console.log('经度：' + res.longitude);
						that.form.address = res.name;
						that.form.latitude = res.latitude;
						that.form.longitude = res.longitude;
					}
				});
			},
			submit(e) {
				if (this.checked == true) {
					this.form.isys = 1
				} else {
					this.form.isys = 0
				}

				uni.showLoading({
					mask: true,
					title: '发布中'
				});

				let mediaList = [];
				this.mediaList.forEach(function(item, index) {
					mediaList.push(item.url);
				});

				this.form.media = mediaList;
				if(this.SortName = "选择圈子"){
					this.SortName = "circle";
				}else{
				this.SortName = this.SortName;
				}
				this.form.author = this.$store.state.userInfo.userid;
				console.log(this.form)
				uni.request({
					url: API.CreateSquare(this.SortName),
					data : this.form,
					method: 'POST',
					success: res => {
						if(res.statusCode = 200){
							console.log(res)
									let url;
									
										url = '/pages/post/circle-detail?id=';
								
							
									uni.redirectTo({
										url: url + res.data
									});
						}
						
					}
				
				});
				// this.$H.post('post/addPost', this.form).then(res => {
				// 	if (res.code == 200) {
				// 		let url;
				// 		if (this.form.type == 1) {
				// 			url = '/pages/post/detail?id=';
				// 		} else {
				// 			url = '/pages/post/video-detail?id=';
				// 		}

				// 		uni.redirectTo({
				// 			url: url + res.result.id
				// 		});
				// 	}
				// 	uni.hideLoading();
				// });
			}
		}
	};
</script>

<style lang="scss" scoped>
	.title-input {
		border-bottom: 1px solid #F5F5F5;
		margin: 20rpx 0;
		padding: 20rpx 0;
	}

	.post-txt {
		width: 100%;
		padding: 20rpx 0;
		min-height: 300rpx;
	}

	.upload-wrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 180rpx;
		height: 180rpx;
		background-color: #F5F5F5;
		margin-top: 30rpx;
		border-radius: 10rpx;

		.icon {
			width: 50rpx;
			height: 50rpx;
		}

		text {
			font-size: 24rpx;
		}
	}

	.upload-video {
		width: 180rpx;
		height: 180rpx;
		margin-top: 30rpx;
	}

	.choose-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1px solid #F5F5F5;

		&:last-child {
			border: 0;
		}

		.txt {
			margin-left: 20rpx;
		}

		.icon {
			width: 40rpx;
			height: 40rpx;
		}

		.u-icon {
			margin-left: auto;
			color: #999;
		}

		.add-icon {
			margin-left: 0;
		}
	}

	.submit-btn {
		margin-top: 50rpx;
	}
</style>
