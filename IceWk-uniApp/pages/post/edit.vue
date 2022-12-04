<template>
	<view class="container">
		<textarea placeholder="文本,标题..." :auto-height="true" maxlength="-1" v-model="form.content"
			class="post-txt"></textarea>

		<!-- 上传图片 -->
		<block v-if="form.type == 1">
			<uni-file-picker ref="fileImage" :limit="9" v-model="mediaList" :auto-upload="false" fileMediatype="image"
				mode="grid" @select="select" @progress="progress" @success="success" @fail="fail"></uni-file-picker>
			<block v-if="form.media.length>0">
			<view style="margin:30rpx 20rpx;">点击图片删除</view>
				<block v-for="(item, index) in form.media" :key="index">
					<image @click="onDel(index)" style="margin: 0 20rpx; width: 200rpx;height: 200rpx;border-radius: 20rpx;" :src="item">
					</image>
					
				</block>
			</block>
		</block>
		<!-- 上传视频 -->
		<block v-if="form.type == 2">
			<uni-file-picker ref="fileVideo" :limit="1" v-model="mediaList" :auto-upload="false" fileMediatype="video"
				mode="grid" @select="select" @progress="progress" @success="success" @fail="fail"></uni-file-picker>
			<video v-if="form.media.length>0" style="width: 200px;height: 200px; margin-top: 20rpx;" show-center-play-btn controls :src="form.media[0]"></video>
		</block>
		<u-line />
		<view style="margin: 0 20rpx;">音叶的80%直接到你账上</view>
		<view class="choose-item">
			<image class="icon" src="/static/jf_1.png"></image>
			<input style="margin: 0 20rpx;" type="number" v-model="form.integral" placeholder="所需下载音叶" />
		</view>
		<view class="choose-item">
			<image class="icon" src="/static/ys.png"> <text style="margin-left: 20rpx;">隐私发布</text></image>
			<u-switch style="margin-left: auto;" v-model="checked"></u-switch>
		</view>
		<!-- 选择圈子 -->
		<navigator v-if="isTopic" url="/pages/choose-topic/choose-topic" class="choose-item">
			<image class="icon" src="/static/p_1.png"></image>
			<text class="txt">{{ topicName }}</text>
			<u-icon class="u-icon" name="arrow-right"></u-icon>
		</navigator>
		<!-- 选择话题 -->
		<navigator v-if="!isTopic" :url="'/pages/choose-discuss/choose-discuss?topic_id=' + form.topic_id"
			class="choose-item">
			<image class="icon" src="/static/m_1.png"></image>
			<text class="txt">{{ disName }}</text>
			<u-icon class="u-icon" name="arrow-right"></u-icon>
		</navigator>
		<!-- 所在位置 -->
		<view @click="chooseLocation" class="choose-item">
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
	export default {
		data() {
			return {
				topicName: '选择圈子',
				disName: '选择话题',
				form: {
					title: '',
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
			this.postId = options.id;
			this.getPostDetail();
			this.isTopic = false;
			let location = uni.getStorageSync('location_info');
			this.form.longitude = location.longitude;
			this.form.latitude = location.latitude;
		},
		methods: {
			getPostDetail() {
				this.$H
					.get('post/detail', {
						id: this.postId
					})
					.then(res => {
						this.form = res.result;
						if(this.form.isys==1){
							this.checked=true;
						}
						// 投票帖子
						if (res.result.vote_id > 0) {
							res.result.vote_info.options.forEach(item => {
								this.$set(item, 'checked', false);
							});

							let timestamp = Date.parse(new Date()) / 1000;
							if (res.result.vote_info.expire_time < timestamp) {
								this.isVoteExpire = true;
							}
						}
					});
			},
			onDel(index){
				console.log(index)
				this.form.media.splice(index,1);
				
			},
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
				if (this.form.type == 2) {
				if (this.mediaList.length>0) {
				let mediaList = this.form.media;
				this.mediaList.forEach(function(item, index) {
					mediaList.push(item.url);
				});
				this.form.media = mediaList;
				}
				
				}else{
					let mediaList = this.form.media;
					this.mediaList.forEach(function(item, index) {
						mediaList.push(item.url);
					});
					this.form.media = mediaList;
				}

				this.$H.post('post/editPost', this.form).then(res => {
					console.log(res)
					if (res.code == 200) {
						let url;
						if (this.form.type == 1) {
							url = '/pages/post/detail?id=';
						} else {
							url = '/pages/post/video-detail?id=';
						}

						uni.redirectTo({
							url: url + this.form.id
						});
					}
					uni.hideLoading();
				});
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
