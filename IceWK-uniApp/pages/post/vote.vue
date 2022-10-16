<template>
	<view>
		<!-- 投票弹窗 -->
		<u-popup v-model="showVotePopup" height="100%" mode="bottom">
			<scroll-view scroll-y style="height: 100%;">
				<view class="vote-wrap">
					<q-field v-model="title" placeholder="添加标题"></q-field>
					<q-field
						v-model="item.value"
						v-for="(item, index) in voteOption"
						:key="index"
						:placeholder="'选项' + (index + 1)"
						right-icon="close-circle-fill"
						@onRightIcon="onRightIcon(index)"
					></q-field>
					<view class="option-add" @click="optionAdd">
						<u-icon name="plus" color="#333"></u-icon>
						<text class="txt">添加选项</text>
					</view>
					<!-- 投票类型 -->
					<view class="block-title">投票类型</view>
					<view class="choose-wrap">
						<view class="item" @click="type = 1" :class="{ active: type === 1 }">单选</view>
						<view class="item" @click="type = 2" :class="{ active: type === 2 }">多选</view>
					</view>
					<!-- 投票有效期 -->
					<view class="block-title">投票有效期</view>
					<view class="choose-wrap">
						<view class="item" @click="expireTime = 1" :class="{ active: expireTime === 1 }">一天</view>
						<view class="item" @click="expireTime = 2" :class="{ active: expireTime === 2 }">7天</view>
						<view class="item" @click="expireTime = 3" :class="{ active: expireTime === 3 }">30天</view>
						<view class="item" @click="expireTime = 4" :class="{ active: expireTime === 4 }">90天</view>
					</view>
					<view v-if="title && voteOption[0].value && voteOption[1].value" @click="showVotePopup = false" style="margin-top: 50rpx;"><q-button>下一步</q-button></view>
					<view v-else style="margin: 50rpx;"><button style="border-radius: 20rpx;">下一步</button></view>
				</view>
			</scroll-view>
		</u-popup>
		<!-- 帖子 -->
		<view class="container">
			<textarea placeholder="文本,标题..." :auto-height="true" maxlength="-1" v-model="content" class="post-txt"></textarea>
			<view class="vote-preview" @click="showVotePopup = true">
				<view class="title">{{ title }}</view>
				<view v-if="type === 1" class="type">单选</view>
				<view v-if="type === 2" class="type">多选</view>
				<view class="option-item" v-for="(item, index) in voteOption" :key="index">{{ item.value }}</view>
			</view>
			<!-- 选择圈子 -->
			<navigator v-if="isTopic" url="/pages/choose-topic/choose-topic" class="choose-item">
				<image class="icon" src="/static/p_1.png"></image>
				<text class="txt">{{ topicName }}</text>
				<u-icon class="u-icon" name="arrow-right"></u-icon>
			</navigator>
			<!-- 选择话题 -->
			<navigator v-if="!isTopic" :url="'/pages/choose-discuss/choose-discuss?topic_id=' + form.topic_id" class="choose-item">
				<image class="icon" src="/static/p_1.png"></image>
				<text class="txt">{{ disName }}</text>
				<u-icon class="u-icon" name="arrow-right"></u-icon>
			</navigator>
			<!-- 所在位置 -->
			<view @click="chooseLocation" class="choose-item">
				<u-icon class="icon add-icon" name="map" color="#999" size="40"></u-icon>
				<text class="txt">{{ form.address || '所在位置' }}</text>
				<u-icon class="u-icon" name="arrow-right"></u-icon>
			</view>
			<q-button @click="submit">发布</q-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			showVotePopup: true,
			voteOption: [
				{
					value: ''
				},
				{
					value: ''
				}
			],
			type: 1,
			expireTime: 1,
			content: '',
			form: {
				topic_id: '',
				discuss_id: '',
				address: ''
			},
			topicName: '选择圈子',
			disName: '选择话题',
			isTopic: true
		};
	},
	onLoad(options) {
		if (options.topic_id) {
			this.form.topic_id = options.topic_id;
			this.isTopic = false;
		}
	},
	methods: {
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
		optionAdd() {
			this.voteOption.push({
				value: ''
			});
		},
		onRightIcon(index) {
			this.voteOption.splice(index, 1);
		},
		submit() {
			if (!this.form.topic_id) {
				uni.showToast({
					title: '请选择圈子',
					icon: 'none'
				});

				return;
			}
			this.$H
				.post('post/voteAdd', {
					topic_id: this.form.topic_id,
					address: this.form.address,
					content: this.content,
					vote_title: this.title,
					vote_type: this.type,
					expire_time: this.expireTime,
					vote_options: this.voteOption
				})
				.then(res => {
					if (res.code == 200) {
						uni.redirectTo({
							url: '/pages/post/detail?id=' + res.result.id
						});
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.vote-wrap {
	.block-title {
		margin-bottom: 20rpx;
		margin-left: 20rpx;
	}

	.option-add {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #333;
		background-color: #f5f5f5;
		margin: 30rpx;
		padding: 20rpx;
		border-radius: 20rpx;

		.txt {
			margin-left: 10rpx;
		}
	}

	.choose-wrap {
		display: flex;
		margin: 20rpx;

		.item {
			padding: 20rpx 40rpx;
			font-size: 24rpx;
			margin-right: 20rpx;
			background-color: #f5f5f5;
			border-radius: 10rpx;
		}

		.active {
			background-color: #333;
			color: #fff;
		}
	}
}

.post-txt {
	width: 100%;
	padding: 20rpx 0;
	min-height: 300rpx;
}

.vote-preview {
	background-color: #f5f5f5;
	padding: 30rpx;
	border-radius: 20rpx;

	.type {
		font-size: 24rpx;
		color: #999;
		margin: 20rpx 0;
	}

	.option-item {
		background-color: #fff;
		border: 1px solid #999;
		border-radius: 10rpx;
		text-align: center;
		margin-bottom: 20rpx;
	}
}

.choose-item {
	display: flex;
	align-items: center;
	padding: 20rpx;
	border-bottom: 1px solid #f5f5f5;

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
</style>
